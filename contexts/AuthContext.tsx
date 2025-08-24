'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { authUtils } from '@/lib/auth';
import { AuthContextType, UserDocument, RegisterRequest } from '@/types/auth';

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
  const [user, setUser] = useState<UserDocument | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state listener
  useEffect(() => {
    const unsubscribe = authUtils.onAuthStateChanged(async (firebaseUser: User | null) => {
      if (firebaseUser) {
        try {
          // Fetch full user profile from backend
          const userProfile = await authUtils.getUserProfile(firebaseUser.uid);
          setUser(userProfile);
        } catch (error) {
          console.error('Failed to load user profile:', error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      await authUtils.loginWithEmailAndPassword({ email, password });
      // User state will be updated by the auth state listener
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const register = async (data: RegisterRequest) => {
    setLoading(true);
    try {
      await authUtils.registerWithEmailAndPassword(data);
      // User state will be updated by the auth state listener
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      await authUtils.loginWithGoogle();
      // User state will be updated by the auth state listener
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authUtils.logout();
      // User state will be updated by the auth state listener
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const refreshUser = async () => {
    if (user) {
      try {
        const updatedUser = await authUtils.getUserProfile(user.uid);
        setUser(updatedUser);
      } catch (error) {
        console.error('Failed to refresh user profile:', error);
      }
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    loginWithGoogle,
    logout,
    refreshUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};