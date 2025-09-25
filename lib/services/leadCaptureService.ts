import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp,
  Timestamp,
  updateDoc,
  QueryConstraint
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

// TypeScript interfaces for consultation data
export interface MarketingSebesztConsultation {
  id?: string;
  // Contact Information
  name: string;
  phone: string;
  email: string;
  occupation: 'cegvezetes' | 'ertekesites' | 'marketing' | 'hr' | 'penzugy' | 'egyeb';
  
  // Consultation Status
  status: 'new' | 'contacted' | 'booked' | 'completed' | 'cancelled';
  
  // Timestamps
  createdAt: Timestamp | ReturnType<typeof serverTimestamp>;
  updatedAt: Timestamp | ReturnType<typeof serverTimestamp>;
  bookingDate?: Timestamp;
  completedDate?: Timestamp;
  
  // Marketing Attribution
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  referrer?: string;
  
  // Consultation Details
  consultationType: 'marketing_sebeszet';
  duration?: number; // in minutes, default 30
  meetingLink?: string; // Zoom/Meet link
  calendarEventId?: string; // From Minup/Google Calendar
  
  // Business Information
  businessName?: string;
  businessIndustry?: string;
  currentChallenges?: string[];
  monthlyRevenue?: string; // range like "0-10k", "10k-50k", etc.
  
  // Admin Notes and Actions
  adminNotes?: string;
  followUpActions?: string[];
  consultantId?: string; // Who handles this consultation
  
  // Outcome Tracking
  consultationOutcome?: 'completed' | 'no_show' | 'rescheduled';
  leadScore?: number; // 1-10 based on consultation quality
  conversionPotential?: 'low' | 'medium' | 'high';
  nextSteps?: string;
}

export interface LeadSubmissionData {
  name: string;
  phone: string;
  email: string;
  occupation: string;
  utmParams?: {
    source?: string;
    medium?: string;
    campaign?: string;
  };
}

// Lead capture service class
class LeadCaptureService {
  private collectionName = 'consultations';
  private maxRetries = 3;
  private retryDelay = 1000; // 1 second

  /**
   * Save a new lead to Firebase
   */
  async saveLead(data: LeadSubmissionData): Promise<string> {
    let retryCount = 0;
    
    while (retryCount < this.maxRetries) {
      try {
        // Validate phone number format
        const cleanPhone = this.validateAndCleanPhone(data.phone);
        
        // Generate a unique ID for the lead
        const leadId = this.generateLeadId(data.email);
        
        // Check if consultation already exists
        const existingConsultation = await this.getConsultationByEmail(data.email);
        if (existingConsultation) {
          // Update existing consultation instead of creating duplicate
          await this.updateConsultationStatus(existingConsultation.id!, 'new');
          return existingConsultation.id!;
        }
        
        // Prepare consultation data
        const consultationData: MarketingSebesztConsultation = {
          // Contact Information
          name: data.name.trim(),
          phone: cleanPhone,
          email: data.email.toLowerCase().trim(),
          occupation: data.occupation as MarketingSebesztConsultation['occupation'],
          
          // Consultation Status
          status: 'new',
          
          // Timestamps
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          
          // Marketing Attribution
          source: window.location.hostname,
          utm_source: data.utmParams?.source || '',
          utm_medium: data.utmParams?.medium || '',
          utm_campaign: data.utmParams?.campaign || '',
          referrer: typeof window !== 'undefined' ? document.referrer : '',
          
          // Consultation Details
          consultationType: 'marketing_sebeszet',
          duration: 30, // 30 minute consultation
          
          // Initialize admin fields
          adminNotes: '',
          followUpActions: [],
          currentChallenges: []
        };
        
        // Save to Firebase
        const consultationRef = doc(db, this.collectionName, leadId);
        await setDoc(consultationRef, consultationData);
        
        // Send notification (optional - integrate with your notification service)
        await this.sendNewConsultationNotification(consultationData);
        
        // Track analytics event
        this.trackConsultationSubmission(consultationData);
        
        return leadId;
        
      } catch (error) {
        console.error(`Lead save attempt ${retryCount + 1} failed:`, error);
        retryCount++;
        
        if (retryCount >= this.maxRetries) {
          throw new Error('Failed to save lead after multiple attempts');
        }
        
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, this.retryDelay));
      }
    }
    
    throw new Error('Failed to save lead');
  }

  /**
   * Get a consultation by email
   */
  async getConsultationByEmail(email: string): Promise<MarketingSebesztConsultation | null> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('email', '==', email.toLowerCase().trim()),
        limit(1)
      );
      
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) {
        return null;
      }
      
      const doc = snapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data()
      } as MarketingSebesztConsultation;
      
    } catch (error) {
      console.error('Error fetching lead by email:', error);
      return null;
    }
  }

  /**
   * Get a consultation by ID
   */
  async getConsultationById(consultationId: string): Promise<MarketingSebesztConsultation | null> {
    try {
      const consultationRef = doc(db, this.collectionName, consultationId);
      const consultationDoc = await getDoc(consultationRef);
      
      if (!consultationDoc.exists()) {
        return null;
      }
      
      return {
        id: consultationDoc.id,
        ...consultationDoc.data()
      } as MarketingSebesztConsultation;
      
    } catch (error) {
      console.error('Error fetching consultation by ID:', error);
      return null;
    }
  }

  // Backward compatibility alias
  async getLeadById(leadId: string): Promise<MarketingSebesztConsultation | null> {
    return this.getConsultationById(leadId);
  }

  async getLeadByEmail(email: string): Promise<MarketingSebesztConsultation | null> {
    return this.getConsultationByEmail(email);
  }

  /**
   * Update consultation status
   */
  async updateConsultationStatus(
    consultationId: string, 
    status: MarketingSebesztConsultation['status'],
    additionalData?: Partial<MarketingSebesztConsultation>
  ): Promise<void> {
    try {
      const consultationRef = doc(db, this.collectionName, consultationId);
      
      const updateData: any = {
        status,
        updatedAt: serverTimestamp()
      };

      // Add status-specific timestamp
      if (status === 'booked') {
        updateData.bookingDate = serverTimestamp();
      } else if (status === 'completed') {
        updateData.completedDate = serverTimestamp();
      }
      
      if (additionalData) {
        Object.assign(updateData, additionalData);
      }
      
      await updateDoc(consultationRef, updateData);
      
    } catch (error) {
      console.error('Error updating consultation status:', error);
      throw error;
    }
  }

  // Backward compatibility alias
  async updateLeadStatus(
    leadId: string, 
    status: MarketingSebesztConsultation['status'],
    additionalData?: Partial<MarketingSebesztConsultation>
  ): Promise<void> {
    return this.updateConsultationStatus(leadId, status, additionalData);
  }

  /**
   * Get all consultations with optional filtering
   */
  async getConsultations(filters?: {
    status?: MarketingSebesztConsultation['status'];
    startDate?: Date;
    endDate?: Date;
    limit?: number;
    consultationType?: string;
  }): Promise<MarketingSebesztConsultation[]> {
    try {
      // Try complex query first
      return await this.getConsultationsWithComplexQuery(filters);
    } catch (error) {
      console.warn('Complex query failed, falling back to simple query:', error);
      // Fallback to simple query and filter in memory
      return await this.getConsultationsWithFallback(filters);
    }
  }

  /**
   * Complex query with indexes (preferred method)
   */
  private async getConsultationsWithComplexQuery(filters?: {
    status?: MarketingSebesztConsultation['status'];
    startDate?: Date;
    endDate?: Date;
    limit?: number;
    consultationType?: string;
  }): Promise<MarketingSebesztConsultation[]> {
    const constraints: QueryConstraint[] = [];
    
    // Always filter by consultationType first for better performance
    if (filters?.consultationType) {
      constraints.push(where('consultationType', '==', filters.consultationType));
    }
    
    if (filters?.status) {
      constraints.push(where('status', '==', filters.status));
    }
    
    if (filters?.startDate) {
      constraints.push(where('createdAt', '>=', Timestamp.fromDate(filters.startDate)));
    }
    
    if (filters?.endDate) {
      constraints.push(where('createdAt', '<=', Timestamp.fromDate(filters.endDate)));
    }
    
    constraints.push(orderBy('createdAt', 'desc'));
    
    if (filters?.limit) {
      constraints.push(limit(filters.limit));
    }
    
    const q = query(collection(db, this.collectionName), ...constraints);
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as MarketingSebesztConsultation));
  }

  /**
   * Fallback method: simple query with in-memory filtering
   */
  private async getConsultationsWithFallback(filters?: {
    status?: MarketingSebesztConsultation['status'];
    startDate?: Date;
    endDate?: Date;
    limit?: number;
    consultationType?: string;
  }): Promise<MarketingSebesztConsultation[]> {
    // Get all consultations and filter in memory
    const snapshot = await getDocs(collection(db, this.collectionName));
    
    let consultations = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as MarketingSebesztConsultation));

    // Apply filters in memory
    consultations = consultations.filter(consultation => {
      // Filter by consultationType
      if (filters?.consultationType && consultation.consultationType !== filters.consultationType) {
        return false;
      }

      // Filter by status
      if (filters?.status && consultation.status !== filters.status) {
        return false;
      }

      // Filter by date range
      if (filters?.startDate || filters?.endDate) {
        const createdAt = consultation.createdAt instanceof Timestamp 
          ? consultation.createdAt.toDate() 
          : consultation.createdAt instanceof Date ? consultation.createdAt : new Date();

        if (filters.startDate && createdAt < filters.startDate) {
          return false;
        }

        if (filters.endDate && createdAt > filters.endDate) {
          return false;
        }
      }

      return true;
    });

    // Sort by createdAt descending
    consultations.sort((a, b) => {
      const aDate = a.createdAt instanceof Timestamp ? a.createdAt.toDate() : a.createdAt instanceof Date ? a.createdAt : new Date();
      const bDate = b.createdAt instanceof Timestamp ? b.createdAt.toDate() : b.createdAt instanceof Date ? b.createdAt : new Date();
      return bDate.getTime() - aDate.getTime();
    });

    // Apply limit
    if (filters?.limit) {
      consultations = consultations.slice(0, filters.limit);
    }

    return consultations;
  }

  // Backward compatibility alias
  async getLeads(filters?: {
    status?: MarketingSebesztConsultation['status'];
    startDate?: Date;
    endDate?: Date;
    limit?: number;
  }): Promise<MarketingSebesztConsultation[]> {
    return this.getConsultations({
      ...filters,
      consultationType: 'marketing_sebeszet'
    });
  }

  /**
   * Get consultation statistics
   */
  async getConsultationStats(): Promise<{
    total: number;
    new: number;
    contacted: number;
    booked: number;
    completed: number;
    cancelled: number;
    conversionRate: number;
    bookingRate: number;
  }> {
    try {
      const allConsultations = await this.getConsultations({
        consultationType: 'marketing_sebeszet'
      });
      
      const stats = {
        total: allConsultations.length,
        new: 0,
        contacted: 0,
        booked: 0,
        completed: 0,
        cancelled: 0,
        conversionRate: 0,
        bookingRate: 0
      };
      
      allConsultations.forEach(consultation => {
        stats[consultation.status]++;
      });
      
      if (stats.total > 0) {
        stats.conversionRate = (stats.completed / stats.total) * 100;
        stats.bookingRate = ((stats.booked + stats.completed) / stats.total) * 100;
      }
      
      return stats;
      
    } catch (error) {
      console.error('Error calculating consultation stats:', error);
      return {
        total: 0,
        new: 0,
        contacted: 0,
        booked: 0,
        completed: 0,
        cancelled: 0,
        conversionRate: 0,
        bookingRate: 0
      };
    }
  }

  // Backward compatibility alias
  async getLeadStats(): Promise<{
    total: number;
    new: number;
    contacted: number;
    booked: number;
    completed: number;
    conversionRate: number;
  }> {
    const stats = await this.getConsultationStats();
    return {
      total: stats.total,
      new: stats.new,
      contacted: stats.contacted,
      booked: stats.booked,
      completed: stats.completed,
      conversionRate: stats.conversionRate
    };
  }

  /**
   * Validate and clean Hungarian phone number
   */
  private validateAndCleanPhone(phone: string): string {
    // Remove spaces and dashes
    let clean = phone.replace(/[\s-]/g, '');
    
    // Add country code if missing
    if (clean.startsWith('06')) {
      clean = '+36' + clean.substring(2);
    } else if (clean.startsWith('6')) {
      clean = '+36' + clean;
    } else if (!clean.startsWith('+36')) {
      clean = '+36' + clean;
    }
    
    // Validate format
    const phoneRegex = /^\+36(20|30|31|50|70)\d{7}$/;
    if (!phoneRegex.test(clean)) {
      throw new Error('Invalid Hungarian phone number format');
    }
    
    return clean;
  }

  /**
   * Generate a unique lead ID
   */
  private generateLeadId(email: string): string {
    const timestamp = Date.now();
    const emailHash = email.toLowerCase().replace(/[^a-z0-9]/g, '');
    return `lead_${timestamp}_${emailHash}`;
  }

  /**
   * Send notification for new consultation (implement based on your notification service)
   */
  private async sendNewConsultationNotification(consultation: MarketingSebesztConsultation): Promise<void> {
    try {
      // This could be a webhook, email, or push notification
      // For now, just log it
      console.log('New consultation notification:', consultation);
      
      // You can integrate with your notification service here
      // Example: await sendEmailNotification(consultation);
      // Example: await sendSlackNotification(consultation);
      
    } catch (error) {
      console.error('Error sending notification:', error);
      // Don't throw - notification failure shouldn't block consultation save
    }
  }

  /**
   * Track consultation submission in analytics
   */
  private trackConsultationSubmission(consultation: MarketingSebesztConsultation): void {
    try {
      // Track with Google Analytics if available
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'consultation_request', {
          event_category: 'engagement',
          event_label: 'marketing_sebeszet',
          value: 1,
          occupation: consultation.occupation,
          source: consultation.utm_source,
          consultation_type: consultation.consultationType
        });
      }
      
      // Track with Facebook Pixel if available
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Lead', {
          content_name: 'Marketing Sebészet Consultation',
          content_category: 'consultation_request',
          status: 'new',
          occupation: consultation.occupation,
          consultation_type: consultation.consultationType
        });
      }
      
    } catch (error) {
      console.error('Error tracking consultation submission:', error);
      // Don't throw - analytics failure shouldn't block consultation save
    }
  }

  /**
   * Export consultations to CSV
   */
  async exportConsultationsToCSV(consultations?: MarketingSebesztConsultation[]): Promise<string> {
    try {
      const consultationsToExport = consultations || await this.getConsultations({ consultationType: 'marketing_sebeszet' });
      
      const headers = [
        'ID',
        'Név',
        'Telefon',
        'Email',
        'Foglalkozás',
        'Státusz',
        'Konzultáció típus',
        'Időtartam (perc)',
        'Létrehozva',
        'Frissítve',
        'Foglalás dátuma',
        'Befejezés dátuma',
        'Forrás',
        'UTM Source',
        'UTM Medium',
        'UTM Campaign',
        'Admin megjegyzések',
        'Következő lépések'
      ].join(',');
      
      const rows = consultationsToExport.map(consultation => {
        const createdDate = consultation.createdAt instanceof Timestamp 
          ? consultation.createdAt.toDate().toLocaleString('hu-HU')
          : new Date().toLocaleString('hu-HU');
        const updatedDate = consultation.updatedAt instanceof Timestamp 
          ? consultation.updatedAt.toDate().toLocaleString('hu-HU')
          : '';
        const bookingDate = consultation.bookingDate instanceof Timestamp
          ? consultation.bookingDate.toDate().toLocaleString('hu-HU')
          : '';
        const completedDate = consultation.completedDate instanceof Timestamp
          ? consultation.completedDate.toDate().toLocaleString('hu-HU')
          : '';
        
        return [
          consultation.id,
          consultation.name,
          consultation.phone,
          consultation.email,
          consultation.occupation,
          consultation.status,
          consultation.consultationType,
          consultation.duration || 30,
          createdDate,
          updatedDate,
          bookingDate,
          completedDate,
          consultation.source || '',
          consultation.utm_source || '',
          consultation.utm_medium || '',
          consultation.utm_campaign || '',
          consultation.adminNotes || '',
          consultation.nextSteps || ''
        ].map(field => `"${field}"`).join(',');
      });
      
      return [headers, ...rows].join('\n');
      
    } catch (error) {
      console.error('Error exporting consultations to CSV:', error);
      throw error;
    }
  }

  // Backward compatibility alias
  async exportLeadsToCSV(consultations?: MarketingSebesztConsultation[]): Promise<string> {
    return this.exportConsultationsToCSV(consultations);
  }
}

// Export singleton instance
export const leadCaptureService = new LeadCaptureService();

// Export default for easier imports
export default leadCaptureService;