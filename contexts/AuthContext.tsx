'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuthStore, User } from '@/src/stores/authStore';
import { toast } from 'sonner';
import { UserRole, RolePermissions } from '@/types/index';
import { getRolePermissions, getRoleDefaultRoute, isValidRole } from '@/lib/roleUtils';
import { getFirebaseFunctionsURL } from '@/lib/config';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  
  // Role-based methods
  updateUserRole: (userId: string, newRole: UserRole) => Promise<void>;
  getUserPermissions: () => RolePermissions;
  getRoleDefaultRoute: () => string;
  fetchUserWithRole: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { user, setUser, clearAuth, setAuthReady, isLoading } = useAuthStore();
  const [loading, setLoading] = useState(true);

  // Helper function to fetch complete user data from backend
  const fetchCompleteUserData = async (uid: string, token: string) => {
    const functionsUrl = getFirebaseFunctionsURL();

    const response = await fetch(`${functionsUrl}/user/profile?uid=${uid}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data.email) {
        // Update user with additional backend data, preserving existing role from custom claims
        if (user) {
          const updatedUser: User = {
            ...user,
            firstName: data.firstName || user.firstName,
            lastName: data.lastName || user.lastName,
            courseAccess: data.courseAccess || user.courseAccess,
            stripeCustomerId: data.stripeCustomerId,
            // Keep the role from custom claims, don't override it
          };
          setUser(updatedUser);
        }
        
        console.log('✅ Backend user data merged successfully');
        return;
      }
    }
    throw new Error('Failed to fetch user data');
  };

  // Initialize auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        try {
          // Get fresh ID token with custom claims (force refresh to get latest)
          const idTokenResult = await firebaseUser.getIdTokenResult(true);
          const customClaims = idTokenResult.claims;

          console.log('[AuthContext] Processing user:', firebaseUser.uid);
          console.log('[AuthContext] Custom claims:', {
            role: customClaims.role,
            companyId: customClaims.companyId,
            companyRole: customClaims.companyRole
          });

          // Use role from custom claims if available, otherwise default to STUDENT
          const roleFromClaims = customClaims.role as UserRole;
          const userRole = isValidRole(roleFromClaims) ? roleFromClaims : 'STUDENT';

          // Create user data with role from custom claims
          const userData: User = {
            id: firebaseUser.uid,
            uid: firebaseUser.uid,
            firstName: firebaseUser.displayName?.split(' ')[0] || '',
            lastName: firebaseUser.displayName?.split(' ')[1] || '',
            email: firebaseUser.email || '',
            role: userRole,
            profilePictureUrl: firebaseUser.photoURL || undefined,
            permissions: getRolePermissions(userRole),
            isActive: true,
            courseAccess: customClaims.admin === true || userRole === 'ADMIN',
            companyId: customClaims.companyId as string | undefined,
            companyRole: customClaims.companyRole as string | undefined
          };

          setUser(userData);
          console.log('✅ [AuthContext] User authenticated with role:', userRole, userData.companyId ? `(Company: ${userData.companyId})` : '');
          
          // Try to fetch additional user data from backend (non-blocking)
          try {
            const token = await firebaseUser.getIdToken();
            await fetchCompleteUserData(firebaseUser.uid, token);
          } catch (backendError) {
            console.warn('Backend user data fetch failed, using custom claims:', backendError);
            // Continue with claims-based data - this is now the primary method
          }
        } catch (error) {
          console.error('Failed to process Firebase user:', error);
          clearAuth();
        }
      } else {
        clearAuth();
      }
      setLoading(false);
      setAuthReady(true);
    });

    return () => unsubscribe();
  }, []); // Remove dependencies to prevent re-subscription

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Sikeres bejelentkezés!');
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error('Bejelentkezési hiba: ' + (error.message || 'Ismeretlen hiba'));
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    setLoading(true);
    try {
      const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update display name
      await updateProfile(firebaseUser, {
        displayName: `${firstName} ${lastName}`
      });
      
      toast.success('Sikeres regisztráció!');
    } catch (error: any) {
      console.error('Registration error:', error);
      toast.error('Regisztrációs hiba: ' + (error.message || 'Ismeretlen hiba'));
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success('Sikeres Google bejelentkezés!');
    } catch (error: any) {
      console.error('Google login error:', error);
      toast.error('Google bejelentkezési hiba: ' + (error.message || 'Ismeretlen hiba'));
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      toast.success('Sikeres kijelentkezés!');
    } catch (error: any) {
      console.error('Logout error:', error);
      toast.error('Kijelentkezési hiba: ' + (error.message || 'Ismeretlen hiba'));
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = async () => {
    if (!auth.currentUser) return;

    try {
      // Reload Firebase user to get latest token
      await auth.currentUser.reload();
      
      // Get fresh user data from our backend with role
      const token = await auth.currentUser.getIdToken(true); // Force refresh token
      await fetchCompleteUserData(auth.currentUser.uid, token);
    } catch (error) {
      console.error('Failed to refresh user data:', error);
      // Don't throw error - we don't want to break the flow if refresh fails
    }
  };

  // Role-based methods
  const updateUserRole = async (userId: string, newRole: UserRole) => {
    if (!auth.currentUser || !user) {
      throw new Error('User not authenticated');
    }

    const token = await auth.currentUser.getIdToken();
    const functionsUrl = getFirebaseFunctionsURL();

    const response = await fetch(`${functionsUrl}/admin/users/${userId}/role`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        newRole,
        reason: 'Admin role update'
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update user role');
    }

    // If updating own role, refresh user data
    if (userId === user.id) {
      await refreshUser();
    }

    toast.success(`Felhasználó szerepköre sikeresen frissítve: ${newRole}`);
  };

  const getUserPermissions = (): RolePermissions => {
    if (!user) {
      return getRolePermissions('STUDENT');
    }
    return user.permissions || getRolePermissions(user.role);
  };

  const getUserRoleDefaultRoute = (): string => {
    if (!user) {
      return '/dashboard';
    }
    return getRoleDefaultRoute(user.role);
  };

  const fetchUserWithRole = async () => {
    if (!auth.currentUser) return;
    
    try {
      const token = await auth.currentUser.getIdToken();
      await fetchCompleteUserData(auth.currentUser.uid, token);
    } catch (error) {
      console.error('Failed to fetch user with role:', error);
    }
  };

  const value: AuthContextType = {
    user,
    loading: loading || isLoading,
    login,
    register,
    loginWithGoogle,
    logout,
    refreshUser,
    updateUserRole,
    getUserPermissions,
    getRoleDefaultRoute: getUserRoleDefaultRoute,
    fetchUserWithRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};