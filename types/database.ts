/**
 * Database Schema Types
 *
 * These interfaces define the structure of all Firestore collections
 * used in the Elira dashboard system.
 */

import { Timestamp } from 'firebase/firestore';

// ============================================================================
// User Progress
// ============================================================================

export interface EnrolledCourse {
  courseId: string;
  courseTitle: string;
  enrolledAt: Timestamp | Date;
  lastAccessedAt: Timestamp | Date;
  progressPercentage: number;
  completedLessons: number;
  totalLessons: number;
  nextLessonId?: string;
  isCompleted: boolean;
  completedAt?: Timestamp | Date;
}

export interface UserProgress {
  userId: string;
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;

  // Learning Statistics
  totalCourses: number;
  completedCourses: number;
  totalLearningTime: number; // seconds
  lastActivityAt: Timestamp | Date;

  // Streak Tracking
  currentStreak: number; // consecutive days
  longestStreak: number;
  lastStreakDate: string; // YYYY-MM-DD format

  // Course-specific Progress
  enrolledCourses: EnrolledCourse[];
}

// ============================================================================
// Learning Activities
// ============================================================================

export type ActivityType =
  | 'lesson_started'
  | 'lesson_completed'
  | 'quiz_taken'
  | 'template_downloaded'
  | 'consultation_attended'
  | 'module_completed';

export interface ActivityMetadata {
  duration?: number; // seconds spent
  score?: number; // for quizzes
  templateId?: string;
  consultationId?: string;
  [key: string]: any;
}

export interface LearningActivity {
  activityId: string;
  userId: string;
  timestamp: Timestamp | Date;
  type: ActivityType;

  courseId: string;
  lessonId?: string;
  moduleId?: string;

  metadata: ActivityMetadata;
}

// ============================================================================
// Consultations
// ============================================================================

export type ConsultationStatus = 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
export type AttendanceStatus = 'attended' | 'no_show' | 'cancelled' | null;
export type MeetingPlatform = 'zoom' | 'google_meet' | 'teams';

export interface PrepTask {
  taskId: string;
  title: string;
  completed: boolean;
  completedAt?: Timestamp | Date;
}

export interface Consultation {
  consultationId: string;
  courseId: string;
  userId: string;
  instructorId: string;

  scheduledAt: Timestamp | Date;
  duration: number; // minutes
  status: ConsultationStatus;

  meetingLink?: string;
  meetingPlatform: MeetingPlatform;

  // Preparation
  prepTasks: PrepTask[];

  // Post-consultation
  notes?: string; // Instructor notes
  recordingUrl?: string;
  attendanceStatus: AttendanceStatus;
  attendedAt?: Timestamp | Date;

  // Notifications
  remindersSent: {
    '24h': boolean;
    '1h': boolean;
  };

  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
}

// ============================================================================
// Implementation Tracking
// ============================================================================

export interface Milestone {
  milestoneId: string;
  title: string;
  description: string;
  targetDay: number;
  completed: boolean;
  completedAt?: Timestamp | Date;
  proofUrl?: string; // screenshot/document upload
}

export interface BuyerPersona {
  personaId: string;
  name: string;
  createdAt: Timestamp | Date;
}

export interface Campaign {
  campaignId: string;
  type: 'email' | 'landing_page' | 'ad' | 'other';
  title: string;
  launchedAt: Timestamp | Date;
  status: 'draft' | 'active' | 'paused' | 'completed';
}

export interface ABTest {
  testId: string;
  title: string;
  startedAt: Timestamp | Date;
  status: 'running' | 'completed';
}

export interface Deliverables {
  marketResearchCompleted: boolean;
  marketResearchCompletedAt?: Timestamp | Date;

  buyerPersonasCreated: number;
  buyerPersonasData?: BuyerPersona[];

  campaignsLaunched: number;
  campaignsData?: Campaign[];

  abTestsRunning: number;
  abTestsData?: ABTest[];
}

export interface Implementation {
  userId: string;
  courseId: string;

  // 30-day program tracking
  programStartDate: string; // YYYY-MM-DD
  currentDay: number; // 1-30

  // Milestones
  milestones: Milestone[];

  // Deliverables
  deliverables: Deliverables;

  // Overall Progress
  implementationProgress: number; // 0-100

  updatedAt: Timestamp | Date;
}

// ============================================================================
// Templates
// ============================================================================

export type TemplateCategory = 'landing_page' | 'email_campaign' | 'buyer_persona' | 'research_framework' | 'ad_copy';
export type FileType = 'pdf' | 'docx' | 'xlsx' | 'figma' | 'html';

export interface Template {
  templateId: string;
  title: string;
  description: string;
  category: TemplateCategory;

  fileUrl: string; // Firebase Storage URL
  fileType: FileType;
  thumbnailUrl?: string;

  courseId: string; // Which course this belongs to
  moduleId?: string; // Which module introduces this

  downloadCount: number;

  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
}

// ============================================================================
// Template Downloads
// ============================================================================

export interface TemplateFeedback {
  rating: number; // 1-5
  comment?: string;
}

export interface TemplateDownload {
  downloadId: string;
  userId: string;
  templateId: string;

  downloadedAt: Timestamp | Date;

  // Usage tracking
  used: boolean;
  usedAt?: Timestamp | Date;
  feedback?: TemplateFeedback;
}

// ============================================================================
// Notifications
// ============================================================================

export type NotificationType =
  | 'consultation_reminder'
  | 'new_module'
  | 'achievement'
  | 'system'
  | 'instructor_message';

export type NotificationPriority = 'low' | 'medium' | 'high';

export interface NotificationMetadata {
  consultationId?: string;
  courseId?: string;
  achievementId?: string;
  [key: string]: any;
}

export interface Notification {
  notificationId: string;
  userId: string;

  type: NotificationType;
  title: string;
  message: string;

  actionUrl?: string;
  actionText?: string;

  icon?: string; // Icon identifier
  priority: NotificationPriority;

  read: boolean;
  readAt?: Timestamp | Date;

  metadata?: NotificationMetadata;

  createdAt: Timestamp | Date;
  expiresAt?: Timestamp | Date; // Auto-delete after date
}

// ============================================================================
// Achievements
// ============================================================================

export type AchievementType =
  | 'first_module'
  | 'week_streak'
  | 'template_master'
  | 'consultation_champion'
  | 'course_complete';

export interface UserAchievement {
  achievementId: string;
  userId: string;

  achievementType: AchievementType;
  title: string;
  description: string;
  iconUrl: string;

  earnedAt: Timestamp | Date;
  progress: number; // 0-100 if in progress
  targetValue: number;
  currentValue: number;
}

// ============================================================================
// Weekly Insights
// ============================================================================

export type Trend = 'improving' | 'stable' | 'declining';

export interface WeeklyMetrics {
  totalLearningTime: number; // seconds
  lessonsCompleted: number;
  modulesCompleted: number;
  templatesDownloaded: number;
  consultationsAttended: number;
}

export interface WeeklyComparison {
  previousWeekLearningTime: number;
  percentageChange: number; // -100 to +100
  trend: Trend;
}

export interface WeeklyInsight {
  weekId: string; // YYYY-WW format
  userId: string;

  weekStartDate: string; // YYYY-MM-DD
  weekEndDate: string; // YYYY-MM-DD

  metrics: WeeklyMetrics;
  comparison: WeeklyComparison;

  recommendations: string[];

  generatedAt: Timestamp | Date;
}

// ============================================================================
// Course Timeline
// ============================================================================

export interface Lesson {
  lessonId: string;
  lessonNumber: number;
  title: string;
  duration: number; // minutes
  videoUrl?: string;
  unlockDay: number; // Day when lesson becomes available
}

export interface Module {
  moduleId: string;
  moduleNumber: number;
  title: string;
  targetDay: number; // When this should be completed
  lessons: Lesson[];
}

export type MilestoneType = 'module_complete' | 'consultation' | 'deliverable' | 'checkpoint';

export interface TimelineMilestone {
  milestoneId: string;
  title: string;
  day: number;
  description: string;
  type: MilestoneType;
}

export interface CourseTimeline {
  courseId: string;
  duration: number; // total days (e.g., 30)
  modules: Module[];
  milestones: TimelineMilestone[];
  updatedAt: Timestamp | Date;
}

// ============================================================================
// API Response Types
// ============================================================================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  page: number;
  pageSize: number;
  total: number;
  hasMore: boolean;
}
