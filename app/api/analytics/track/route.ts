import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';
import { Transaction, DocumentSnapshot } from 'firebase-admin/firestore';

export async function POST(request: NextRequest) {
  try {
    const { event_type, data, user_agent, page_url, referrer } = await request.json();

    // Validate required fields
    if (!event_type || !data) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get client IP (with proper headers for Vercel/other platforms)
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';

    // Prepare analytics document
    const analyticsDoc = {
      event_type,
      data,
      metadata: {
        user_agent,
        page_url,
        referrer,
        ip_address: ip,
        timestamp: new Date(),
        user_id: data.lead_id || null,
        session_id: data.session_id || null
      },
      // Extract key fields for easier querying
      lead_id: data.lead_id || null,
      utm_source: data.utm_source || null,
      utm_campaign: data.utm_campaign || null,
      category: data.category || 'uncategorized'
    };

    // Store in Firebase Analytics collection
    await db.collection('marketing_sebeszet_analytics').add(analyticsDoc);

    // Also store aggregated metrics for dashboard
    if (event_type === 'generate_lead' || event_type === 'consultation_request') {
      await updateDailyMetrics('consultations_requested');
    } else if (event_type === 'purchase' || event_type === 'booking_completed') {
      await updateDailyMetrics('consultations_booked');
    } else if (event_type === 'page_view') {
      await updateDailyMetrics('page_views');
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Analytics tracking error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function updateDailyMetrics(metric: string) {
  try {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const docRef = db.collection('marketing_sebeszet_daily_metrics').doc(today);
    
    await db.runTransaction(async (transaction: Transaction) => {
      const doc = await transaction.get(docRef);
      
      // @ts-ignore - Firebase Admin SDK type issue
      if (doc.exists) {
        // @ts-ignore - Firebase Admin SDK type issue
        const currentData = doc.data() || {};
        transaction.update(docRef, {
          [metric]: (currentData[metric] || 0) + 1,
          last_updated: new Date()
        });
      } else {
        transaction.set(docRef, {
          date: today,
          [metric]: 1,
          created_at: new Date(),
          last_updated: new Date()
        });
      }
    });
  } catch (error) {
    console.error('Error updating daily metrics:', error);
  }
}