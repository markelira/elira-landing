import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { auth } from './firebase';
import { RegisterRequest, LoginRequest, UserDocument } from '../src/types/auth';

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Auth utility functions
export const authUtils = {
  // Email/Password Registration
  async registerWithEmailAndPassword(userData: RegisterRequest): Promise<{ user: User; linkedDownloads?: string[] }> {
    try {
      // Create Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        userData.email, 
        userData.password
      );

      // Update Firebase Auth profile
      await updateProfile(userCredential.user, {
        displayName: `${userData.firstName} ${userData.lastName}`
      });

      // Call backend to create user document and link downloads
      const idToken = await userCredential.user.getIdToken();
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        throw new Error('Failed to create user profile');
      }

      const result = await response.json();
      return {
        user: userCredential.user,
        linkedDownloads: result.linkedDownloads
      };
    } catch (error: any) {
      console.error('Registration error:', error);
      throw new Error(error.message || 'Registration failed');
    }
  },

  // Email/Password Login
  async loginWithEmailAndPassword(loginData: LoginRequest): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth, 
        loginData.email, 
        loginData.password
      );

      // Update last login in backend
      await fetch('/api/user/update-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: userCredential.user.uid })
      });

      return userCredential.user;
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Login failed');
    }
  },

  // Google OAuth Login
  async loginWithGoogle(): Promise<{ user: User; isNewUser?: boolean }> {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check if this is a new user by calling backend
      const response = await fetch('/api/auth/google-callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idToken: await user.getIdToken(),
          email: user.email,
          firstName: user.displayName?.split(' ')[0] || '',
          lastName: user.displayName?.split(' ').slice(1).join(' ') || ''
        })
      });

      if (!response.ok) {
        throw new Error('Failed to process Google login');
      }

      const result_data = await response.json();
      return {
        user,
        isNewUser: result_data.isNewUser
      };
    } catch (error: any) {
      console.error('Google login error:', error);
      throw new Error(error.message || 'Google login failed');
    }
  },

  // Logout
  async logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error: any) {
      console.error('Logout error:', error);
      throw new Error('Logout failed');
    }
  },

  // Password Reset
  async sendPasswordReset(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      console.error('Password reset error:', error);
      throw new Error(error.message || 'Password reset failed');
    }
  },

  // Get user profile from backend
  async getUserProfile(uid: string): Promise<UserDocument> {
    try {
      const response = await fetch(`/api/user/profile?uid=${uid}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }
      return await response.json();
    } catch (error: any) {
      console.error('Get user profile error:', error);
      throw new Error('Failed to load user profile');
    }
  },

  // Auth state listener
  onAuthStateChanged: (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, callback);
  },

  // Get current user
  getCurrentUser: () => auth.currentUser,

  // Get ID token
  async getIdToken(): Promise<string | null> {
    const user = auth.currentUser;
    if (!user) return null;
    try {
      return await user.getIdToken();
    } catch (error) {
      console.error('Failed to get ID token:', error);
      return null;
    }
  }
};

export default authUtils;