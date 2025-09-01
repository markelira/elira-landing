/**
 * Course Validation Schemas
 * Zod schemas for validating course data at various stages
 */

import { z } from 'zod';

// Enum schemas
export const CourseStatusSchema = z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED', 'UPCOMING']);
export const CourseDifficultySchema = z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']);
export const CourseLanguageSchema = z.enum(['hu', 'en']);
export const CourseVisibilitySchema = z.enum(['PUBLIC', 'PRIVATE', 'UNLISTED']);
export const LessonTypeSchema = z.enum([
  'VIDEO',
  'TEXT',
  'QUIZ',
  'ASSIGNMENT',
  'PDF',
  'AUDIO',
  'SLIDES',
  'LIVE_SESSION',
  'INTERACTIVE'
]);

/**
 * Basic Course Info Validation
 * Used in Step 1 of the wizard
 */
export const CourseBasicInfoSchema = z.object({
  title: z
    .string()
    .min(5, 'A kurzus címének legalább 5 karakter hosszúnak kell lennie')
    .max(100, 'A kurzus címe maximum 100 karakter lehet'),
  
  slug: z
    .string()
    .min(3, 'Az URL slug legalább 3 karakter hosszú legyen')
    .max(100, 'Az URL slug maximum 100 karakter lehet')
    .regex(/^[a-z0-9-]+$/, 'Az URL slug csak kisbetűket, számokat és kötőjelet tartalmazhat'),
  
  description: z
    .string()
    .min(50, 'A leírásnak legalább 50 karakter hosszúnak kell lennie')
    .max(5000, 'A leírás maximum 5000 karakter lehet'),
  
  shortDescription: z
    .string()
    .min(20, 'A rövid leírásnak legalább 20 karakter hosszúnak kell lennie')
    .max(200, 'A rövid leírás maximum 200 karakter lehet')
    .optional(),
  
  categoryId: z
    .string()
    .min(1, 'Válassz kategóriát'),
  
  subcategoryId: z.string().optional(),
  
  tags: z
    .array(z.string())
    .max(10, 'Maximum 10 címke adható meg')
    .optional(),
  
  language: CourseLanguageSchema,
  
  difficulty: CourseDifficultySchema,
  
  thumbnailUrl: z
    .string()
    .url('Érvényes URL szükséges')
    .optional(),
  
  previewVideoUrl: z
    .string()
    .url('Érvényes URL szükséges')
    .optional(),
});

/**
 * Course Module Validation
 */
export const CourseModuleSchema = z.object({
  id: z.string().optional(),
  courseId: z.string().optional(),
  title: z
    .string()
    .min(3, 'A modul címének legalább 3 karakter hosszúnak kell lennie')
    .max(100, 'A modul címe maximum 100 karakter lehet'),
  
  description: z
    .string()
    .max(500, 'A modul leírása maximum 500 karakter lehet')
    .optional(),
  
  order: z.number().int().min(0),
  
  totalLessons: z.number().int().min(0).default(0),
  totalDuration: z.number().int().min(0).default(0),
  
  isLocked: z.boolean().optional(),
  unlockDate: z.date().optional(),
  prerequisites: z.array(z.string()).optional(),
});

/**
 * Lesson Content Validation
 */
export const LessonContentSchema = z.object({
  // Video content
  videoUrl: z.string().url().optional(),
  videoProvider: z.enum(['youtube', 'vimeo', 'mux', 'custom']).optional(),
  videoId: z.string().optional(),
  videoDuration: z.number().optional(),
  thumbnailUrl: z.string().url().optional(),
  
  // Text content
  htmlContent: z.string().optional(),
  markdownContent: z.string().optional(),
  readingTime: z.number().optional(),
  
  // PDF content
  pdfUrl: z.string().url().optional(),
  pdfTitle: z.string().optional(),
  pageCount: z.number().optional(),
  
  // Audio content
  audioUrl: z.string().url().optional(),
  audioTranscript: z.string().optional(),
  audioDuration: z.number().optional(),
  
  // Slides content
  slidesUrl: z.string().url().optional(),
  slidesEmbedCode: z.string().optional(),
  totalSlides: z.number().optional(),
  
  // Live session
  liveSessionUrl: z.string().url().optional(),
  scheduledDate: z.date().optional(),
  meetingId: z.string().optional(),
  recordingUrl: z.string().url().optional(),
  
  // Interactive content
  interactiveContent: z.any().optional(),
  externalUrl: z.string().url().optional(),
});

/**
 * Course Lesson Validation
 */
export const CourseLessonSchema = z.object({
  id: z.string().optional(),
  moduleId: z.string(),
  courseId: z.string(),
  
  title: z
    .string()
    .min(3, 'A lecke címének legalább 3 karakter hosszúnak kell lennie')
    .max(100, 'A lecke címe maximum 100 karakter lehet'),
  
  description: z
    .string()
    .max(500, 'A lecke leírása maximum 500 karakter lehet')
    .optional(),
  
  type: LessonTypeSchema,
  order: z.number().int().min(0),
  
  content: LessonContentSchema.optional(),
  
  duration: z.number().int().min(0).default(0),
  estimatedTime: z.number().int().min(1).optional(),
  
  isFreePreview: z.boolean().default(false),
  isPublished: z.boolean().default(true),
  isLocked: z.boolean().optional(),
  unlockDate: z.date().optional(),
  
  requiresCompletion: z.boolean().optional(),
  allowComments: z.boolean().optional(),
  allowDownload: z.boolean().optional(),
});

/**
 * Quiz Question Validation
 */
export const QuizQuestionSchema = z.object({
  id: z.string(),
  question: z
    .string()
    .min(5, 'A kérdésnek legalább 5 karakter hosszúnak kell lennie')
    .max(500, 'A kérdés maximum 500 karakter lehet'),
  
  type: z.enum(['SINGLE_CHOICE', 'MULTIPLE_CHOICE', 'TRUE_FALSE', 'SHORT_ANSWER', 'ESSAY']),
  points: z.number().min(0).max(100),
  order: z.number().optional(),
  
  options: z.array(z.object({
    id: z.string(),
    text: z.string().min(1).max(200),
    isCorrect: z.boolean(),
    explanation: z.string().optional(),
    imageUrl: z.string().url().optional(),
  })).optional(),
  
  correctAnswer: z.string().optional(),
  acceptableAnswers: z.array(z.string()).optional(),
  
  explanation: z.string().max(1000).optional(),
  hint: z.string().max(200).optional(),
  imageUrl: z.string().url().optional(),
  required: z.boolean().optional(),
});

/**
 * Quiz Validation
 */
export const QuizSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(3, 'A kvíz címének legalább 3 karakter hosszúnak kell lennie')
    .max(100, 'A kvíz címe maximum 100 karakter lehet'),
  
  description: z.string().max(500).optional(),
  questions: z.array(QuizQuestionSchema).min(1, 'Legalább egy kérdés szükséges'),
  
  passingScore: z.number().min(0).max(100),
  maxAttempts: z.number().min(1).max(10).optional(),
  timeLimit: z.number().min(1).max(180).optional(), // in minutes
  
  shuffleQuestions: z.boolean().optional(),
  shuffleAnswers: z.boolean().optional(),
  showCorrectAnswers: z.boolean().optional(),
  showExplanations: z.boolean().optional(),
  
  totalPoints: z.number().min(0),
  gradingType: z.enum(['PERCENTAGE', 'POINTS']),
  
  passFeedback: z.string().max(500).optional(),
  failFeedback: z.string().max(500).optional(),
});

/**
 * Course Settings Validation
 * Used in Step 3 of the wizard
 */
export const CourseSettingsSchema = z.object({
  instructorId: z.string().min(1, 'Oktató kiválasztása kötelező'),
  
  price: z
    .number()
    .min(0, 'Az ár nem lehet negatív')
    .max(1000000, 'Az ár túl magas'),
  
  currency: z.string().default('HUF'),
  isFree: z.boolean().default(false),
  
  certificateEnabled: z.boolean().default(false),
  maxStudents: z.number().min(1).optional(),
  
  objectives: z
    .array(z.string().min(10).max(200))
    .min(1, 'Legalább egy tanulási cél megadása kötelező')
    .max(10, 'Maximum 10 tanulási cél adható meg'),
  
  prerequisites: z
    .array(z.string().min(10).max(200))
    .max(10, 'Maximum 10 előfeltétel adható meg')
    .optional(),
  
  targetAudience: z
    .array(z.string().min(10).max(200))
    .min(1, 'Legalább egy célcsoport megadása kötelező')
    .max(10, 'Maximum 10 célcsoport adható meg'),
  
  metaTitle: z
    .string()
    .min(10, 'A meta cím legalább 10 karakter legyen')
    .max(60, 'A meta cím maximum 60 karakter lehet')
    .optional(),
  
  metaDescription: z
    .string()
    .min(50, 'A meta leírás legalább 50 karakter legyen')
    .max(160, 'A meta leírás maximum 160 karakter lehet')
    .optional(),
  
  keywords: z
    .array(z.string())
    .max(10, 'Maximum 10 kulcsszó adható meg')
    .optional(),
  
  status: CourseStatusSchema.default('DRAFT'),
  visibility: CourseVisibilitySchema.default('PUBLIC'),
});

/**
 * Complete Course Creation Schema
 * Combines all steps for final validation
 */
export const CourseCreationSchema = z.object({
  basicInfo: CourseBasicInfoSchema,
  modules: z.array(CourseModuleSchema).min(1, 'Legalább egy modul szükséges'),
  lessons: z.record(z.array(CourseLessonSchema)), // moduleId -> lessons[]
  settings: CourseSettingsSchema,
}).refine(
  (data) => {
    // Ensure each module has at least one lesson
    for (const module of data.modules) {
      const moduleLessons = data.lessons[module.id || ''] || [];
      if (moduleLessons.length === 0) {
        return false;
      }
    }
    return true;
  },
  {
    message: 'Minden modulnak tartalmaznia kell legalább egy leckét',
    path: ['modules'],
  }
).refine(
  (data) => {
    // Ensure slug is unique (this would be checked server-side)
    return true; // Server-side validation required
  },
  {
    message: 'Ez az URL slug már foglalt',
    path: ['basicInfo', 'slug'],
  }
);

/**
 * Course Update Schema
 * Partial schema for updating existing courses
 */
export const CourseUpdateSchema = CourseBasicInfoSchema.partial().extend({
  status: CourseStatusSchema.optional(),
  visibility: CourseVisibilitySchema.optional(),
  price: z.number().min(0).optional(),
  instructorId: z.string().optional(),
});

/**
 * Course Filter Schema
 * Validation for course listing filters
 */
export const CourseFilterSchema = z.object({
  search: z.string().optional(),
  status: z.array(CourseStatusSchema).optional(),
  categoryId: z.string().optional(),
  instructorId: z.string().optional(),
  language: z.array(CourseLanguageSchema).optional(),
  difficulty: z.array(CourseDifficultySchema).optional(),
  priceRange: z.object({
    min: z.number().min(0),
    max: z.number().min(0),
  }).optional(),
  dateRange: z.object({
    start: z.date(),
    end: z.date(),
  }).optional(),
  sortBy: z.enum(['title', 'createdAt', 'updatedAt', 'enrollments', 'rating', 'price']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  page: z.number().min(1).optional(),
  limit: z.number().min(1).max(100).optional(),
});

/**
 * Helper function to validate course data
 */
export function validateCourseData(data: unknown, schema: z.ZodSchema) {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string[]> = {};
      error.errors.forEach((err) => {
        const path = err.path.join('.');
        if (!errors[path]) {
          errors[path] = [];
        }
        errors[path].push(err.message);
      });
      return { success: false, errors };
    }
    throw error;
  }
}

/**
 * Helper function to generate slug from title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}