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

// Role System Types
export type UserRole = 'STUDENT' | 'INSTRUCTOR' | 'ADMIN' | 'COMPANY_ADMIN' | 'COMPANY_EMPLOYEE';

export interface RolePermissions {
  // Course management
  canCreateCourses: boolean;
  canEditOwnCourses: boolean;
  canEditAllCourses: boolean;
  canDeleteCourses: boolean;
  canPublishCourses: boolean;
  
  // User management
  canViewAllUsers: boolean;
  canEditUserRoles: boolean;
  canDeactivateUsers: boolean;
  canDeleteUsers: boolean;
  
  // Analytics and reporting
  canViewOwnAnalytics: boolean;
  canViewPlatformAnalytics: boolean;
  canExportData: boolean;
  
  // Platform administration
  canModifyPlatformSettings: boolean;
  canManagePayments: boolean;
  canAccessAdminPanel: boolean;
  canManageCategories: boolean;
  canModerateContent: boolean;
}

export interface RoleConfig {
  role: UserRole;
  displayName: string;
  permissions: RolePermissions;
  defaultRoute: string;
  navigationItems: string[];
}

// Course Platform Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  profilePictureUrl?: string;
  title?: string;
  bio?: string;
  companyRole?: string;
  institution?: string;
  credentials?: string[];
  specialties?: string[];
  createdAt: string;
  updatedAt: string;
  courseAccess?: boolean;
  stripeCustomerId?: string;
  isActive?: boolean;
  lastLoginAt?: string;
  permissions?: RolePermissions;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface Module {
  id: string;
  courseId?: string;
  title: string;
  description?: string;
  order: number;
  status: 'DRAFT' | 'PUBLISHED' | 'SOON' | 'ARCHIVED' | 'FREE' | 'PAID';
  lessons: Lesson[];
  totalLessons?: number;
  totalDuration?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Lesson {
  id: string;
  moduleId?: string;
  courseId?: string;
  title: string;
  content: string;
  description?: string;
  type: 'TEXT' | 'VIDEO' | 'QUIZ' | 'READING' | 'PDF' | 'AUDIO';
  order: number;
  status: 'DRAFT' | 'PUBLISHED' | 'SOON' | 'ARCHIVED';
  videoUrl?: string;
  thumbnailUrl?: string;
  duration?: number;
  createdAt: string;
  updatedAt: string;
  quiz?: LessonQuiz | null;
  pdfUrl?: string;
  audioUrl?: string;
  resources?: LessonResource[];
  isFreePreview?: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  status: 'DRAFT' | 'PUBLISHED' | 'SOON' | 'ARCHIVED' | 'FREE' | 'PAID';
  instructor: User;
  category: Category;
  modules: Module[];
  averageRating?: number;
  reviewCount: number;
  enrollmentCount: number;
  thumbnailUrl?: string;
  previewVideoUrl?: string;
  slug?: string;
  reviews: Review[];
  createdAt: string;
  updatedAt: string;
  certificateEnabled?: boolean;
  language?: string;
  difficulty?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
  publishDate?: string;
  isPlus?: boolean;
  price: number;
  isFree?: boolean;
  stripePriceId?: string;
  currency?: string;
  shortDescription?: string;
  objectives?: string[];
  prerequisites?: string[];
  stats?: {
    modules?: number;
    lessons?: number;
    duration?: string;
    students?: number;
  };
}

export interface Review {
  id: string;
  user: User;
  course: Course;
  rating: number;
  comment?: string;
  approved: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LessonQuizAnswer {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback?: string | null;
}

export interface LessonQuizQuestion {
  id: string;
  questionText: string;
  answers: LessonQuizAnswer[];
  questionType: 'SINGLE' | 'MULTIPLE';
  explanation: string;
  points: number;
}

export interface LessonQuiz {
  passingScore: number;
  allowRetakes: boolean;
  timeLimitMinutes?: number | null;
  maxAttempts?: number | null;
  questions: LessonQuizQuestion[];
}

export interface LessonResource {
  id: string;
  title: string;
  description?: string;
  type: 'PDF' | 'DOC' | 'XLS' | 'PPT' | 'ZIP' | 'IMAGE' | 'OTHER';
  url: string;
  size?: number;
  mimeType?: string;
  createdAt: string;
}

export interface EnrolledCourse {
  courseId: string;
  title: string;
  thumbnailUrl?: string;
  totalLessons: number;
  completedLessons: number;
  completionPercentage: number;
  lastAccessedAt: string;
  certificateEarned: boolean;
  certificateId?: string;
  certificateUrl?: string | null;
  estimatedHours: number;
  instructorName: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
  category: string;
  description: string;
  language: string;
  averageRating: number;
  reviewCount: number;
  enrolledAt: string;
}

export interface UserProgressData {
  success: boolean;
  enrolledCourses: EnrolledCourse[];
  totalCoursesEnrolled: number;
  totalLessonsCompleted: number;
  totalCertificatesEarned: number;
  totalHoursLearned: number;
  coursesInProgress: number;
  coursesCompleted: number;
  overallCompletionRate: number;
}

// Admin and Role Management Types
export interface PlatformAnalytics {
  totalUsers: number;
  totalCourses: number;
  totalEnrollments: number;
  totalRevenue: number;
  activeUsers: number;
  newUsersThisMonth: number;
  courseCompletionRate: number;
  popularCourses: {
    id: string;
    title: string;
    enrollments: number;
  }[];
  revenueByMonth: {
    month: string;
    revenue: number;
  }[];
  usersByRole: {
    role: UserRole;
    count: number;
  }[];
}

export interface RoleUpdateRequest {
  userId: string;
  newRole: UserRole;
  reason?: string;
}

export interface UserManagementFilters {
  role?: UserRole;
  isActive?: boolean;
  searchQuery?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface AdminDashboardData {
  analytics: PlatformAnalytics;
  recentUsers: User[];
  pendingActions: {
    type: 'role_change_request' | 'course_approval' | 'user_report';
    count: number;
    description: string;
  }[];
  systemStatus: {
    server: 'healthy' | 'warning' | 'error';
    database: 'healthy' | 'warning' | 'error';
    payments: 'healthy' | 'warning' | 'error';
  };
}

export interface InstructorDashboardData {
  myCourses: Course[];
  totalStudents: number;
  totalRevenue: number;
  averageRating: number;
  recentEnrollments: {
    courseId: string;
    courseTitle: string;
    studentName: string;
    enrolledAt: string;
  }[];
  courseAnalytics: {
    courseId: string;
    title: string;
    enrollments: number;
    completionRate: number;
    averageRating: number;
  }[];
}