import Mux from '@mux/mux-node'

// Initialize Mux client with credentials from environment
const muxClient = process.env.MUX_TOKEN_ID && process.env.MUX_TOKEN_SECRET
  ? new Mux({
      tokenId: process.env.MUX_TOKEN_ID,
      tokenSecret: process.env.MUX_TOKEN_SECRET
    })
  : null

export interface MuxAsset {
  id: string
  status: 'preparing' | 'ready' | 'error'
  playbackId?: string
  duration?: number
  aspectRatio?: string
  createdAt: string
}

export interface MuxPlaybackPolicy {
  policy: 'public' | 'signed'
}

// Generate a signed URL for private playback
export const generateSignedUrl = (playbackId: string, type: 'thumbnail' | 'stream' = 'stream') => {
  if (!muxClient) {
    console.error('Mux client not initialized')
    return null
  }

  const baseUrl = type === 'thumbnail'
    ? `https://image.mux.com/${playbackId}/thumbnail.png`
    : `https://stream.mux.com/${playbackId}.m3u8`

  // For public playback IDs, no signing needed
  // For signed playback, would use JWT signing here
  return baseUrl
}

// Create a direct upload for video files
export const createDirectUpload = async (options: {
  corsOrigin?: string;
  test?: boolean;
  playbackPolicy?: 'public' | 'signed';
  videoQuality?: 'basic' | 'plus';
  resolutionTier?: 'smart' | '1080p' | '1440p' | '2160p';
} = {}) => {
  if (!muxClient) {
    throw new Error('Mux client not initialized')
  }

  try {
    console.log('🎬 Creating Mux direct upload with options:', options);
    
    const upload = await muxClient.video.uploads.create({
      cors_origin: options.corsOrigin || 'https://elira.hu',
      new_asset_settings: {
        playback_policy: [options.playbackPolicy || 'public'],
        video_quality: options.videoQuality || 'plus', // Enable all quality tiers
        max_resolution_tier: options.resolutionTier === 'smart' ? '2160p' : (options.resolutionTier || '2160p'),
        mp4_support: 'standard',
        normalize_audio: true,
      },
      test: options.test ?? false,
    });

    console.log('✅ Mux direct upload created:', {
      id: upload.id,
      url: upload.url,
      status: upload.status,
    });

    return {
      id: upload.id!,
      url: upload.url!,
      status: upload.status!,
      asset_id: upload.asset_id,
      timeout: upload.timeout || 3600,
    };
  } catch (error) {
    console.error('❌ Failed to create Mux direct upload:', error);
    throw error;
  }
}

// Get upload status
export const getUploadStatus = async (uploadId: string) => {
  if (!muxClient) {
    throw new Error('Mux client not initialized')
  }

  try {
    const upload = await muxClient.video.uploads.retrieve(uploadId);
    
    return {
      id: upload.id!,
      status: upload.status!,
      asset_id: upload.asset_id,
      error: upload.error,
    };
  } catch (error) {
    console.error('❌ Failed to get upload status:', error);
    throw error;
  }
}

// Create a new video asset
export const createMuxAsset = async (inputUrl: string, playbackPolicy: MuxPlaybackPolicy['policy'] = 'public') => {
  if (!muxClient) {
    throw new Error('Mux client not initialized')
  }

  try {
    const asset = await muxClient.video.assets.create({
      inputs: [{ url: inputUrl }],
      playback_policy: [playbackPolicy],
      video_quality: 'plus', // Enable all quality tiers
      max_resolution_tier: '2160p', // Enable up to 4K quality
      mp4_support: 'standard',
      normalize_audio: true,
    })

    return {
      id: asset.id,
      status: asset.status as MuxAsset['status'],
      playbackId: asset.playback_ids?.[0]?.id,
      duration: asset.duration,
      aspectRatio: asset.aspect_ratio,
      createdAt: asset.created_at
    } as MuxAsset
  } catch (error) {
    console.error('Error creating Mux asset:', error)
    throw error
  }
}

// Get asset details
export const getMuxAsset = async (assetId: string): Promise<MuxAsset | null> => {
  if (!muxClient) {
    throw new Error('Mux client not initialized')
  }

  try {
    const asset = await muxClient.video.assets.retrieve(assetId)
    
    return {
      id: asset.id,
      status: asset.status as MuxAsset['status'],
      playbackId: asset.playback_ids?.[0]?.id,
      duration: asset.duration,
      aspectRatio: asset.aspect_ratio,
      createdAt: asset.created_at
    }
  } catch (error) {
    console.error('Error getting Mux asset:', error)
    return null
  }
}

// Delete an asset
export const deleteMuxAsset = async (assetId: string) => {
  if (!muxClient) {
    throw new Error('Mux client not initialized')
  }

  try {
    await muxClient.video.assets.delete(assetId)
    return true
  } catch (error) {
    console.error('Error deleting Mux asset:', error)
    return false
  }
}

// Generate thumbnail URL
export const getMuxThumbnail = (playbackId: string, options?: {
  time?: number
  width?: number
  height?: number
  fitMode?: 'preserve' | 'stretch' | 'crop' | 'pad'
}) => {
  const params = new URLSearchParams()
  
  if (options?.time) params.append('time', options.time.toString())
  if (options?.width) params.append('width', options.width.toString())
  if (options?.height) params.append('height', options.height.toString())
  if (options?.fitMode) params.append('fit_mode', options.fitMode)

  const queryString = params.toString()
  return `https://image.mux.com/${playbackId}/thumbnail.png${queryString ? `?${queryString}` : ''}`
}

// Generate animated GIF URL
export const getMuxAnimatedGif = (playbackId: string, options?: {
  start?: number
  end?: number
  width?: number
  fps?: number
}) => {
  const params = new URLSearchParams()
  
  if (options?.start) params.append('start', options.start.toString())
  if (options?.end) params.append('end', options.end.toString())
  if (options?.width) params.append('width', options.width.toString())
  if (options?.fps) params.append('fps', options.fps.toString())

  const queryString = params.toString()
  return `https://image.mux.com/${playbackId}/animated.gif${queryString ? `?${queryString}` : ''}`
}

export default muxClient