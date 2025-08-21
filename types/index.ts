// Lead capture types
export interface LeadData {
  email: string;
  firstName?: string;
  lastName?: string;
  careerGoals?: string;
  experience?: string;
  timestamp: string;
  source: string;
}

// Mailchimp merge fields
export interface MailchimpMergeFields {
  FNAME?: string;
  LNAME?: string;
  CAREER?: string;
  EXPERIENCE?: string;
}

// Analytics event types
export interface AnalyticsEvent {
  event_name: string;
  event_category?: string;
  event_label?: string;
  value?: number;
  user_id?: string;
  session_id?: string;
  timestamp: string;
}

// Form validation schemas
export interface EmailCaptureForm {
  email: string;
  firstName?: string;
  lastName?: string;
}

// Component prop types
export interface ButtonVariant {
  variant: 'primary' | 'ghost' | 'glow';
  size: 'sm' | 'md' | 'lg';
}

export interface CardVariant {
  variant: 'default' | 'glass' | 'elevated';
  padding: 'sm' | 'md' | 'lg';
}

// API response types
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Firebase document types
export interface FirestoreDocument {
  id: string;
  createdAt: any;
  updatedAt: any;
}

export interface Lead extends FirestoreDocument {
  email: string;
  firstName?: string;
  lastName?: string;
  careerGoals?: string;
  experience?: string;
  source: string;
  mailchimpId?: string;
}