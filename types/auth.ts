import { Timestamp } from 'firebase/firestore';

// User data stored in Firestore
export interface UserDocument {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  courseAccess: boolean;
  linkedDownloads: string[]; // IDs from leads collection
  stripeCustomerId?: string;
  createdAt: Timestamp;
  lastLogin: Timestamp;
}

// API Request/Response interfaces
export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  uid: string;
  linkedDownloads?: string[];
  error?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  uid: string;
  user: UserDocument;
  error?: string;
}

export interface GoogleAuthRequest {
  idToken: string;
}

export interface UserProfileResponse {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  courseAccess: boolean;
  linkedDownloads: string[];
  createdAt: string;
  lastLogin: string;
}

export interface LinkDownloadsRequest {
  uid: string;
  email: string;
}

// Form data interfaces
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Auth context interface
export interface AuthContextType {
  user: UserDocument | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}