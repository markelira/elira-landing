export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'STUDENT' | 'INSTRUCTOR' | 'ADMIN';
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
  title: string;
  description?: string;
  order: number;
  status: 'DRAFT' | 'PUBLISHED' | 'SOON' | 'ARCHIVED' | 'FREE' | 'PAID';
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
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
  slug?: string;
  reviews: Review[];
  createdAt: string;
  updatedAt: string;
  certificateEnabled?: boolean;
  language?: string;
  difficulty?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
  publishDate?: string;
  isPlus?: boolean;
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

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

export interface ApiError {
  message: string;
  status: number;
  code: string;
  timestamp: string;
  path: string;
  method: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LessonProgress {
  watchPercentage?: number;
  timeSpent?: number;
  quizScore?: number;
  interactionsCompleted?: number;
  scrollProgress?: number;
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