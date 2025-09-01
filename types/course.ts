/**
 * Course Management Type Definitions
 * Comprehensive types for course creation, management, and content
 */

import { Timestamp } from 'firebase/firestore';

// Course Status Types
export type CourseStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | 'UPCOMING';
export type CourseDifficulty = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
export type CourseLanguage = 'hu' | 'en';

// Course Visibility Types
export type CourseVisibility = 'PUBLIC' | 'PRIVATE' | 'UNLISTED';

/**
 * Main Course Interface
 */
export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  status: CourseStatus;
  visibility: CourseVisibility;
  
  // Instructor Information
  instructorId: string;
  instructorName?: string;
  instructorEmail?: string;
  instructorBio?: string;
  instructorPhotoUrl?: string;
  
  // Course Metadata
  categoryId: string;
  categoryName?: string;
  subcategoryId?: string;
  tags?: string[];
  language: CourseLanguage;
  difficulty: CourseDifficulty;
  
  // Media
  thumbnailUrl?: string;
  previewVideoUrl?: string;
  coverImageUrl?: string;
  
  // Pricing
  price: number;
  currency: string;
  originalPrice?: number;
  discount?: number;
  isFree?: boolean;
  stripePriceId?: string; // Stripe Price ID for checkout
  
  // Content Statistics
  totalModules: number;
  totalLessons: number;
  totalDuration: number; // in seconds
  totalQuizzes: number;
  totalAssignments: number;
  totalResources: number;
  
  // Learning Objectives
  objectives?: string[];
  prerequisites?: string[];
  
  // Certificate Settings
  certificateEnabled: boolean;
  certificateTemplate?: string;
  passingScore?: number;
  
  // SEO
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  
  // Analytics
  enrollmentCount: number;
  completionCount: number;
  averageRating?: number;
  totalReviews?: number;
  totalRevenue?: number;
  
  // Settings
  enableDiscussion?: boolean;
  enableQA?: boolean;
  autoEnroll?: boolean;
  maxStudents?: number;
  
  // Timestamps
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
  publishedAt?: Timestamp | Date;
  archivedAt?: Timestamp | Date;
  lastModifiedBy?: string;
}

/**
 * Course Module Interface
 */
export interface CourseModule {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  order: number;
  
  // Content Statistics
  totalLessons: number;
  totalDuration: number;
  completedLessons?: number;
  
  // Settings
  isLocked?: boolean;
  unlockDate?: Timestamp | Date;
  prerequisites?: string[]; // Module IDs that must be completed first
  
  // Timestamps
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
}

/**
 * Lesson Content Types
 */
export type LessonType = 
  | 'VIDEO' 
  | 'TEXT' 
  | 'QUIZ' 
  | 'ASSIGNMENT' 
  | 'PDF' 
  | 'AUDIO' 
  | 'SLIDES' 
  | 'LIVE_SESSION'
  | 'INTERACTIVE';

/**
 * Course Lesson Interface
 */
export interface CourseLesson {
  id: string;
  moduleId: string;
  courseId: string;
  title: string;
  description?: string;
  type: LessonType;
  order: number;
  
  // Content
  content?: LessonContent;
  
  // Duration
  duration: number; // in seconds
  estimatedTime?: number; // in minutes
  
  // Access Control
  isFreePreview: boolean;
  isPublished: boolean;
  isLocked?: boolean;
  unlockDate?: Timestamp | Date;
  
  // Resources
  resources?: LessonResource[];
  downloadableContent?: string[];
  
  // Completion Tracking
  requiresCompletion?: boolean;
  completionCriteria?: CompletionCriteria;
  
  // Settings
  allowComments?: boolean;
  allowDownload?: boolean;
  
  // Timestamps
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
}

/**
 * Lesson Content based on type
 */
export interface LessonContent {
  // For VIDEO type
  videoUrl?: string;
  videoProvider?: 'youtube' | 'vimeo' | 'mux' | 'custom';
  videoId?: string;
  videoDuration?: number;
  thumbnailUrl?: string;
  subtitles?: SubtitleTrack[];
  
  // For TEXT type
  htmlContent?: string;
  markdownContent?: string;
  readingTime?: number;
  
  // For QUIZ type
  quiz?: Quiz;
  
  // For ASSIGNMENT type
  assignment?: Assignment;
  
  // For PDF type
  pdfUrl?: string;
  pdfTitle?: string;
  pageCount?: number;
  
  // For AUDIO type
  audioUrl?: string;
  audioTranscript?: string;
  audioDuration?: number;
  
  // For SLIDES type
  slidesUrl?: string;
  slidesEmbedCode?: string;
  totalSlides?: number;
  
  // For LIVE_SESSION type
  liveSessionUrl?: string;
  scheduledDate?: Timestamp | Date;
  meetingId?: string;
  recordingUrl?: string;
  
  // For INTERACTIVE type
  interactiveContent?: any; // JSON data for interactive elements
  externalUrl?: string;
}

/**
 * Subtitle Track Interface
 */
export interface SubtitleTrack {
  language: string;
  label: string;
  url: string;
  default?: boolean;
}

/**
 * Lesson Resource Interface
 */
export interface LessonResource {
  id: string;
  title: string;
  description?: string;
  type: 'PDF' | 'DOC' | 'ZIP' | 'IMAGE' | 'VIDEO' | 'OTHER';
  url: string;
  size?: number; // in bytes
  downloadCount?: number;
  isPublic?: boolean;
}

/**
 * Quiz Interface
 */
export interface Quiz {
  id: string;
  title: string;
  description?: string;
  questions: QuizQuestion[];
  
  // Settings
  passingScore: number;
  maxAttempts?: number;
  timeLimit?: number; // in minutes
  shuffleQuestions?: boolean;
  shuffleAnswers?: boolean;
  showCorrectAnswers?: boolean;
  showExplanations?: boolean;
  
  // Grading
  totalPoints: number;
  gradingType: 'PERCENTAGE' | 'POINTS';
  
  // Feedback
  passFeedback?: string;
  failFeedback?: string;
}

/**
 * Quiz Question Interface
 */
export interface QuizQuestion {
  id: string;
  question: string;
  type: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'SHORT_ANSWER' | 'ESSAY';
  points: number;
  order?: number;
  
  // Options for choice questions
  options?: QuizOption[];
  
  // For short answer/essay
  correctAnswer?: string;
  acceptableAnswers?: string[];
  
  // Additional
  explanation?: string;
  hint?: string;
  imageUrl?: string;
  required?: boolean;
}

/**
 * Quiz Option Interface
 */
export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation?: string;
  imageUrl?: string;
}

/**
 * Assignment Interface
 */
export interface Assignment {
  id: string;
  title: string;
  instructions: string;
  
  // Submission Settings
  submissionType: 'FILE' | 'TEXT' | 'URL' | 'MULTIPLE';
  allowedFileTypes?: string[];
  maxFileSize?: number; // in MB
  maxFiles?: number;
  
  // Grading
  totalPoints: number;
  rubric?: GradingRubric;
  
  // Deadlines
  dueDate?: Timestamp | Date;
  availableFrom?: Timestamp | Date;
  availableUntil?: Timestamp | Date;
  latePenalty?: number; // percentage per day
  
  // Settings
  allowLateSubmission?: boolean;
  allowResubmission?: boolean;
  maxSubmissions?: number;
  peerReview?: boolean;
}

/**
 * Grading Rubric Interface
 */
export interface GradingRubric {
  criteria: RubricCriterion[];
  totalPoints: number;
}

/**
 * Rubric Criterion Interface
 */
export interface RubricCriterion {
  id: string;
  name: string;
  description: string;
  points: number;
  levels: RubricLevel[];
}

/**
 * Rubric Level Interface
 */
export interface RubricLevel {
  label: string;
  description: string;
  points: number;
}

/**
 * Completion Criteria Interface
 */
export interface CompletionCriteria {
  type: 'VIEW' | 'TIME' | 'INTERACTION' | 'QUIZ_PASS' | 'ASSIGNMENT_SUBMIT';
  minViewPercentage?: number;
  minTimeSpent?: number; // in seconds
  requiredInteractions?: string[];
  minQuizScore?: number;
}

/**
 * Course Creation Wizard State
 */
export interface CourseWizardState {
  currentStep: number;
  completedSteps: number[];
  courseId?: string;
  isDraft: boolean;
  
  // Step 1: Basic Info
  basicInfo: {
    title: string;
    slug: string;
    description: string;
    shortDescription: string;
    categoryId: string;
    subcategoryId?: string;
    tags: string[];
    language: CourseLanguage;
    difficulty: CourseDifficulty;
    thumbnailUrl?: string;
    previewVideoUrl?: string;
  };
  
  // Step 2: Curriculum
  curriculum: {
    modules: CourseModule[];
    lessons: Map<string, CourseLesson[]>; // moduleId -> lessons
  };
  
  // Step 3: Settings & Publishing
  settings: {
    instructorId: string;
    price: number;
    currency: string;
    isFree: boolean;
    certificateEnabled: boolean;
    maxStudents?: number;
    objectives: string[];
    prerequisites: string[];
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    status: CourseStatus;
    visibility: CourseVisibility;
  };
  
  // Validation
  validationErrors: Record<string, string[]>;
  isValid: boolean;
  
  // Progress
  lastSaved?: Date;
  autoSaveEnabled: boolean;
}

/**
 * Course Analytics Interface
 */
export interface CourseAnalytics {
  courseId: string;
  
  // Enrollment Metrics
  totalEnrollments: number;
  activeStudents: number;
  completedStudents: number;
  dropoutRate: number;
  
  // Engagement Metrics
  averageProgress: number;
  averageTimeSpent: number;
  totalVideoWatched: number;
  totalAssignmentsSubmitted: number;
  totalQuizzesCompleted: number;
  
  // Performance Metrics
  averageQuizScore: number;
  averageAssignmentScore: number;
  certificatesIssued: number;
  
  // Revenue Metrics
  totalRevenue: number;
  refundedAmount: number;
  netRevenue: number;
  averageRevenuePerStudent: number;
  
  // Satisfaction Metrics
  averageRating: number;
  totalReviews: number;
  recommendationRate: number;
  
  // Time Series Data
  enrollmentTrend: TimeSeries[];
  revenueTrend: TimeSeries[];
  completionTrend: TimeSeries[];
}

/**
 * Time Series Data Point
 */
export interface TimeSeries {
  date: Date;
  value: number;
  label?: string;
}

/**
 * Course Filter Options
 */
export interface CourseFilters {
  search?: string;
  status?: CourseStatus[];
  categoryId?: string;
  instructorId?: string;
  language?: CourseLanguage[];
  difficulty?: CourseDifficulty[];
  priceRange?: {
    min: number;
    max: number;
  };
  dateRange?: {
    start: Date;
    end: Date;
  };
  sortBy?: 'title' | 'createdAt' | 'updatedAt' | 'enrollments' | 'rating' | 'price';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

/**
 * Course List Response
 */
export interface CourseListResponse {
  courses: Course[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
  filters: CourseFilters;
}