import { useAuthStore } from '@/src/stores/authStore'

export const useAuth = () => {
  const { user, isAuthenticated, isLoading, authReady } = useAuthStore()
  
  return {
    user,
    isAuthenticated,
    isLoading,
    authReady
  }
}