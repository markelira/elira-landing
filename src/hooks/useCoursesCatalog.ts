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
 * Fetches course catalog data - MVP version with sample data
 */
async function fetchCoursesCatalog(filters: CourseCatalogFilters = {}): Promise<CourseCatalogResponse> {
  try {
    console.log('🔍 [useCoursesCatalog] MVP: Using sample data for development');
    
    // MVP: Return sample courses for development
    return {
      success: true,
      courses: [
        {
          id: 'ai-copywriting-course',
          title: 'AI Copywriting Mastery',
          description: 'Tanulj meg hatékony szövegeket írni AI eszközökkel',
          thumbnailUrl: '/images/course-ai-copywriting.jpg',
          difficulty: 'INTERMEDIATE' as const,
          language: 'hu',
          certificateEnabled: true,
          isPlus: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          instructor: {
            id: 'instructor-1',
            firstName: 'Márk',
            lastName: 'Eszterházy',
            profilePictureUrl: '/images/instructor-mark.jpg'
          },
          category: {
            id: 'marketing',
            name: 'Digital Marketing'
          },
          isEnrolled: false,
          isTrending: true,
          isRecommended: true,
          enrollmentCount: 1847,
          averageRating: 4.9,
          reviewCount: 234,
          popularityScore: 95,
          recommendationScore: 92
        }
      ],
      total: 1,
      meta: {
        userEnrollmentCount: 0,
        userCategories: ['Digital Marketing'],
        hasRecommendations: true,
        queryId: 'mvp-sample'
      }
    }
  } catch (error) {
    console.error('❌ [useCoursesCatalog] Error fetching catalog:', error)
    
    // Fallback with empty data
    return {
      success: true,
      courses: [],
      total: 0,
      meta: {
        userEnrollmentCount: 0,
        userCategories: [],
        hasRecommendations: false,
        queryId: 'fallback'
      }
    }
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