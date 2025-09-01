/**
 * Mux Video Processing API Routes
 * Handles Mux direct uploads and webhook processing
 */

import { Request, Response } from 'express';
import * as admin from 'firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { createDirectUpload, getUploadStatus, getMuxAsset } from '../../../lib/mux-client';

const db = admin.firestore();

/**
 * Create Mux direct upload URL
 * POST /api/mux/upload
 */
export const createMuxUploadHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.uid;
    const { lessonId, corsOrigin } = req.body;
    
    if (!userId) {
      res.status(401).json({ success: false, error: 'Authentication required' });
      return;
    }

    console.log('🎬 Creating Mux upload for lesson:', lessonId);

    // Create Mux direct upload with production settings
    const upload = await createDirectUpload({
      corsOrigin: corsOrigin || 'https://elira.hu',
      videoQuality: 'plus', // Enable all quality tiers (360p-4K)
      resolutionTier: 'smart', // Smart quality selection
      playbackPolicy: 'public',
    });

    // Store upload reference in Firestore
    const uploadRef = db.collection('mux_uploads').doc();
    await uploadRef.set({
      id: uploadRef.id,
      muxUploadId: upload.id,
      lessonId: lessonId || null,
      userId,
      status: upload.status,
      assetId: upload.asset_id || null,
      createdAt: FieldValue.serverTimestamp(),
    });

    console.log('✅ Mux upload created and stored:', {
      uploadId: upload.id,
      firestoreId: uploadRef.id,
    });

    res.json({
      success: true,
      upload: {
        id: upload.id,
        url: upload.url,
        timeout: upload.timeout,
      },
      firestoreId: uploadRef.id,
    });
  } catch (error) {
    console.error('❌ Failed to create Mux upload:', error);
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to create upload' 
    });
  }
};

/**
 * Check Mux upload status
 * GET /api/mux/upload/:uploadId/status
 */
export const getMuxUploadStatusHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.uid;
    const { uploadId } = req.params;
    
    if (!userId) {
      res.status(401).json({ success: false, error: 'Authentication required' });
      return;
    }

    console.log('🔍 Checking Mux upload status:', uploadId);

    // Get upload from Firestore first to verify ownership
    const uploadSnapshot = await db.collection('mux_uploads')
      .where('muxUploadId', '==', uploadId)
      .where('userId', '==', userId)
      .limit(1)
      .get();

    if (uploadSnapshot.empty) {
      res.status(404).json({ success: false, error: 'Upload not found' });
      return;
    }

    const uploadDoc = uploadSnapshot.docs[0];
    const uploadData = uploadDoc.data();

    // Get current status from Mux
    const muxStatus = await getUploadStatus(uploadId);
    
    // Update our record if status changed
    if (muxStatus.status !== uploadData.status) {
      await uploadDoc.ref.update({
        status: muxStatus.status,
        assetId: muxStatus.asset_id || uploadData.assetId,
        updatedAt: FieldValue.serverTimestamp(),
      });
    }

    let assetData = null;
    if (muxStatus.asset_id) {
      try {
        assetData = await getMuxAsset(muxStatus.asset_id);
      } catch (assetError) {
        console.warn('Could not fetch asset data:', assetError);
      }
    }

    res.json({
      success: true,
      upload: {
        id: muxStatus.id,
        status: muxStatus.status,
        asset_id: muxStatus.asset_id,
        error: muxStatus.error,
      },
      asset: assetData,
    });
  } catch (error) {
    console.error('❌ Failed to get upload status:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to get upload status' 
    });
  }
};

/**
 * Mux webhook handler
 * POST /api/mux/webhook
 */
export const muxWebhookHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const signature = req.headers['mux-signature'] as string;
    const rawBody = JSON.stringify(req.body);
    
    // Verify webhook signature
    if (!verifyMuxWebhookSignature(rawBody, signature)) {
      console.error('❌ Invalid Mux webhook signature');
      res.status(401).json({ error: 'Invalid signature' });
      return;
    }

    const { type, data } = req.body;
    console.log('📡 Mux webhook received:', { type, assetId: data?.id });

    switch (type) {
      case 'video.upload.asset_created':
        await handleUploadAssetCreated(data);
        break;
        
      case 'video.asset.ready':
        await handleAssetReady(data);
        break;
        
      case 'video.asset.errored':
        await handleAssetError(data);
        break;
        
      case 'video.upload.errored':
        await handleUploadError(data);
        break;
        
      default:
        console.log('🤷 Unhandled webhook type:', type);
    }

    res.json({ success: true });
  } catch (error) {
    console.error('❌ Webhook processing error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
};

// Webhook event handlers

async function handleUploadAssetCreated(data: any) {
  console.log('🎬 Upload asset created:', data.id);
  
  // Update upload record
  const uploadSnapshot = await db.collection('mux_uploads')
    .where('muxUploadId', '==', data.upload_id)
    .limit(1)
    .get();

  if (!uploadSnapshot.empty) {
    await uploadSnapshot.docs[0].ref.update({
      assetId: data.id,
      status: 'asset_created',
      updatedAt: FieldValue.serverTimestamp(),
    });
  }
}

async function handleAssetReady(data: any) {
  console.log('✅ Asset ready:', data.id);
  
  // Update all records with this asset
  const uploadSnapshot = await db.collection('mux_uploads')
    .where('assetId', '==', data.id)
    .get();

  const batch = db.batch();
  
  uploadSnapshot.docs.forEach(doc => {
    batch.update(doc.ref, {
      status: 'ready',
      duration: data.duration,
      playbackId: data.playback_ids?.[0]?.id,
      aspectRatio: data.aspect_ratio,
      maxResolution: data.max_resolution,
      readyAt: FieldValue.serverTimestamp(),
    });
  });

  await batch.commit();

  // Update lesson with video data if lessonId exists
  for (const doc of uploadSnapshot.docs) {
    const uploadData = doc.data();
    if (uploadData.lessonId) {
      await updateLessonWithVideoData(uploadData.lessonId, {
        muxAssetId: data.id,
        muxPlaybackId: data.playback_ids?.[0]?.id,
        videoDuration: data.duration,
        videoUrl: `https://stream.mux.com/${data.playback_ids?.[0]?.id}.m3u8`,
        thumbnailUrl: `https://image.mux.com/${data.playback_ids?.[0]?.id}/thumbnail.png`,
      });
    }
  }
}

async function handleAssetError(data: any) {
  console.error('❌ Asset error:', data.id, data.errors);
  
  const uploadSnapshot = await db.collection('mux_uploads')
    .where('assetId', '==', data.id)
    .get();

  const batch = db.batch();
  
  uploadSnapshot.docs.forEach(doc => {
    batch.update(doc.ref, {
      status: 'errored',
      error: data.errors,
      erroredAt: FieldValue.serverTimestamp(),
    });
  });

  await batch.commit();
}

async function handleUploadError(data: any) {
  console.error('❌ Upload error:', data.id, data.error);
  
  const uploadSnapshot = await db.collection('mux_uploads')
    .where('muxUploadId', '==', data.id)
    .get();

  if (!uploadSnapshot.empty) {
    await uploadSnapshot.docs[0].ref.update({
      status: 'errored',
      error: data.error,
      erroredAt: FieldValue.serverTimestamp(),
    });
  }
}

async function updateLessonWithVideoData(lessonId: string, videoData: any) {
  try {
    console.log('📝 Updating lesson with video data:', lessonId);
    
    await db.collection('lessons').doc(lessonId).update({
      videoUrl: videoData.videoUrl,
      muxAssetId: videoData.muxAssetId,
      muxPlaybackId: videoData.muxPlaybackId,
      videoDuration: videoData.videoDuration,
      thumbnailUrl: videoData.thumbnailUrl,
      content: {
        videoUrl: videoData.videoUrl,
        videoProvider: 'mux',
        videoId: videoData.muxPlaybackId,
        videoDuration: videoData.videoDuration,
      },
      updatedAt: FieldValue.serverTimestamp(),
    });
    
    console.log('✅ Lesson updated with video data');
  } catch (error) {
    console.error('❌ Failed to update lesson:', error);
  }
}

// Helper function to verify webhook signature
function verifyMuxWebhookSignature(body: string, signature: string): boolean {
  try {
    const crypto = require('crypto');
    const secret = process.env.MUX_WEBHOOK_SECRET;
    
    if (!secret) {
      console.error('❌ MUX_WEBHOOK_SECRET not configured');
      return false;
    }

    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body, 'utf8')
      .digest('hex');
    
    return signature === expectedSignature;
  } catch (error) {
    console.error('❌ Signature verification error:', error);
    return false;
  }
}