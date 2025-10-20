import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { RolePermissions } from '@/types/index'

export interface User {
  id: string
  uid: string
  firstName: string
  lastName: string
  email: string
  role: 'STUDENT' | 'INSTRUCTOR' | 'ADMIN' | 'COMPANY_ADMIN'
  profilePictureUrl?: string
  courseAccess?: boolean
  stripeCustomerId?: string
  permissions?: RolePermissions
  isActive?: boolean
  companyId?: string
  companyRole?: string
}

export interface AuthResponse {
  user: User
  accessToken: string
}

interface AuthState {
  user: User | null
  accessToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
  authReady: boolean
  error: string | null
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  setAuth: (user: User, token: string) => void
  clearAuth: () => void
  logout: () => void
  setAuthReady: (ready: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: true,
      authReady: false,
      error: null,
      setUser: (user) => set({ user, isAuthenticated: !!user, isLoading: false }),
      setToken: (token) => set({ accessToken: token }),
      setAuth: (user, token) => set({ 
        user, 
        accessToken: token, 
        isAuthenticated: true, 
        isLoading: false 
      }),
      clearAuth: () => set({ 
        user: null, 
        accessToken: null, 
        isAuthenticated: false, 
        isLoading: false 
      }),
      logout: () => set({ 
        user: null, 
        accessToken: null, 
        isAuthenticated: false, 
        error: null 
      }),
      setAuthReady: (ready) => set({ authReady: ready })
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated 
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isLoading = false
        }
      },
    }
  )
)