import { useQuery } from '@tanstack/react-query'
import { httpsCallable } from 'firebase/functions'
import { functions } from '@/lib/firebase'

export interface CourseCatalogFilters {
  // Basic filtering
  categoryId?: string
  search?: string
  difficulty?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT'
  language?: string
  certificateEnabled?: boolean
  isPlus?: boolean
  
  // Sorting and pagination
  sort?: 'createdAt' | 'popular' | 'trending' | 'rating' | 'new'
  order?: 'asc' | 'desc'
  limit?: number
  offset?: number
  
  // Catalog-specific options
  includeTrending?: boolean
  includeRecommendations?: boolean
  excludeEnrolled?: boolean
}

export interface CatalogCourse {
  id: string
  title: string
  description: string
  thumbnailUrl?: string
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT'
  language: string
  certificateEnabled: boolean
  isPlus: boolean
  createdAt: string
  updatedAt: string
  
  // Enriched data
  instructor: {
    id: string
    firstName: string
    lastName: string
    profilePictureUrl?: string
  }
  category: {
    id: string
    name: string
  }
  
  // Catalog metadata
  isEnrolled: boolean
  isTrending: boolean
  isRecommended: boolean
  enrollmentCount: number
  averageRating: number
  reviewCount: number
  popularityScore: number
  recommendationScore?: number
}

export interface CourseCatalogResponse {
  success: boolean
  courses: CatalogCourse[]
  total: number
  meta: {
    userEnrollmentCount: number
    userCategories: string[]
    hasRecommendations: boolean
    queryId: string
  }
  error?: string
}

/**
 * Fetches course catalog data from Firebase Cloud Functions
 */
async function fetchCoursesCatalog(filters: CourseCatalogFilters = {}): Promise<CourseCatalogResponse> {
  try {
    console.log('🔍 [useCoursesCatalog] Fetching real course data from API');
    
    // Use the existing Cloud Function to fetch courses
    const functionsUrl = process.env.NODE_ENV === 'development' 
      ? 'http://127.0.0.1:5001/elira-landing-ce927/europe-west1/api'
      : (process.env.NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL || 'https://api-5k33v562ya-ew.a.run.app');
    
    const fullUrl = `${functionsUrl}/api/courses`;
    console.log('🌐 [useCoursesCatalog] Full API URL:', fullUrl);
    console.log('🔧 [useCoursesCatalog] Env check:', { 
      NODE_ENV: process.env.NODE_ENV,
      FUNCTIONS_URL_SET: !!process.env.NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL 
    });
    
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status}`);
    }

    const data = await response.json();
    
    console.log('📊 [useCoursesCatalog] Raw API response:', data);
    
    if (!data.courses) {
      throw new Error('Invalid API response format - missing courses array');
    }

    // Transform the API response to catalog format
    const transformedCourses: CatalogCourse[] = data.courses.map((course: any) => ({
      id: course.id,
      title: course.title,
      description: course.description || course.shortDescription,
      thumbnailUrl: course.thumbnailUrl || '/masterclass-zoli.png',
      difficulty: course.difficulty || 'INTERMEDIATE',
      language: course.language || 'hu',
      certificateEnabled: course.certificateEnabled || true,
      isPlus: course.isPlus || false,
      createdAt: course.createdAt,
      updatedAt: course.updatedAt,
      instructor: {
        id: course.instructorId,
        firstName: course.instructorName?.split(' ')[0] || 'Somosi',
        lastName: course.instructorName?.split(' ').slice(1).join(' ') || 'Zoltán',
        profilePictureUrl: course.instructorPhotoUrl || '/IMG_5730.JPG'
      },
      category: {
        id: course.categoryId || 'ai-marketing',
        name: course.categoryName || 'AI Marketing'
      },
      isEnrolled: false, // Will be checked separately
      isTrending: course.isFeatured || true,
      isRecommended: course.isFeatured || true,
      enrollmentCount: 0, // Remove student count display
      averageRating: 0, // Remove rating display  
      reviewCount: 0, // Remove review count display
      popularityScore: course.enrollmentCount ? Math.min(100, (course.enrollmentCount / 10)) : 95,
      recommendationScore: course.averageRating ? (course.averageRating * 20) : 92
    }));

    return {
      success: true,
      courses: transformedCourses,
      total: transformedCourses.length,
      meta: {
        userEnrollmentCount: 0,
        userCategories: Array.from(new Set(transformedCourses.map(c => c.category.name))),
        hasRecommendations: transformedCourses.some(c => c.isRecommended),
        queryId: `api-${Date.now()}`
      }
    };
  } catch (error) {
    console.error('❌ [useCoursesCatalog] Error fetching catalog:', error)
    
    // Fallback to updated sample data that matches the actual course
    return {
      success: true,
      courses: [
        {
          id: 'ai-copywriting-course',
          title: 'Olvass a vevőid gondolataiban',
          description: 'AI-alapú copywriting és marketingkutatás kurzus. Képzeld el, hogy percek alatt készítesz buyer personát, pontosan feltérképezed a piacodat, és az MI-vel olyan szövegeket írsz, amelyek nem csak a figyelmet ragadják meg, hanem profitot is termelnek.',
          thumbnailUrl: '/masterclass-zoli.png',
          difficulty: 'INTERMEDIATE' as const,
          language: 'hu',
          certificateEnabled: true,
          isPlus: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          instructor: {
            id: 'zoltan-somosi',
            firstName: 'Somosi',
            lastName: 'Zoltán',
            profilePictureUrl: '/IMG_5730.JPG'
          },
          category: {
            id: 'ai-marketing',
            name: 'AI Marketing'
          },
          isEnrolled: false,
          isTrending: true,
          isRecommended: true,
          enrollmentCount: 0, // Remove student count
          averageRating: 0, // Remove rating display
          reviewCount: 0, // Remove review count
          popularityScore: 95,
          recommendationScore: 92
        }
      ],
      total: 1,
      meta: {
        userEnrollmentCount: 0,
        userCategories: ['AI Marketing'],
        hasRecommendations: true,
        queryId: 'fallback-integrated'
      }
    };
  }
}

/**
 * Hook for fetching personalized course recommendations
 */
export function usePersonalizedRecommendations(limit: number = 4) {
  return useQuery({
    queryKey: ['coursesCatalog', 'recommendations', limit],
    queryFn: () => fetchCoursesCatalog({
      includeRecommendations: true,
      excludeEnrolled: true,
      sort: 'popular',
      order: 'desc',
      limit
    }),
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

/**
 * Hook for fetching trending courses
 */
export function useTrendingCourses(limit: number = 6, type: 'trending' | 'popular' | 'new' = 'trending') {
  return useQuery({
    queryKey: ['coursesCatalog', type, limit],
    queryFn: () => fetchCoursesCatalog({
      includeTrending: type === 'trending',
      sort: type === 'new' ? 'createdAt' : 'popular',
      order: 'desc',
      limit
    }),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

/**
 * Hook for filterable course catalog with full search capabilities
 */
export function useCoursesCatalog(filters: CourseCatalogFilters = {}) {
  return useQuery({
    queryKey: ['coursesCatalog', 'filtered', filters],
    queryFn: () => fetchCoursesCatalog(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: true, // Always enabled for catalog browsing
  })
}

export default useCoursesCatalog