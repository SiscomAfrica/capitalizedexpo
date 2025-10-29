/**
 * Authentication Zustand Store with Persistence
 */

import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '@/services/auth.service';
import { apiService } from '@/services/api';
import { 
  User, 
  UserWithProfile, 
  AuthToken, 
  Interest, 
  ExpertiseArea,
  ProfileCompletionForm
} from '@/types/auth';

const STORAGE_KEYS = {
  ACCESS_TOKEN: '@auth/access_token',
  REFRESH_TOKEN: '@auth/refresh_token',
  USER: '@auth/user',
};

interface AuthState {
  // State
  user: User | null;
  userProfile: UserWithProfile | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Profile completion
  needsProfileCompletion: boolean;
  interests: Interest[];
  expertise: ExpertiseArea[];
  
  // Actions
  initialize: () => Promise<void>;
  login: (email: string) => Promise<{ success: boolean; message: string }>;
  register: (email: string) => Promise<{ success: boolean; message: string }>;
  verifyCode: (email: string, code: string) => Promise<{ success: boolean; needsProfile: boolean }>;
  logout: () => Promise<void>;
  completeProfile: (data: ProfileCompletionForm) => Promise<{ success: boolean; error?: string }>;
  fetchInterestsAndExpertise: () => Promise<void>;
  checkProfileStatus: () => Promise<void>;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearError: () => void;
  extractErrorMessage: (error: any, defaultMessage: string) => string;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  // Initial state
  user: null,
  userProfile: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  needsProfileCompletion: false,
  interests: [],
  expertise: [],

  // Initialize auth from storage
  initialize: async () => {
    try {
      set({ isLoading: true });
      
      const [accessToken, refreshToken, userStr] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN),
        AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN),
        AsyncStorage.getItem(STORAGE_KEYS.USER),
      ]);

      if (accessToken && refreshToken && userStr) {
        const user: User = JSON.parse(userStr);
        
        // Set token in API service
        apiService.setAuthToken(accessToken);
        
        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
          isLoading: false,
        });

        // Check profile status
        await get().checkProfileStatus();
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.error('Failed to initialize auth:', error);
      set({ isLoading: false });
      await get().logout();
    }
  },

  // Set tokens and persist
  setTokens: async (accessToken: string, refreshToken: string) => {
    await Promise.all([
      AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken),
      AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken),
    ]);
    
    apiService.setAuthToken(accessToken);
    
    set({ accessToken, refreshToken });
  },

  // Helper to extract error message from various error formats
  extractErrorMessage: (error: any, defaultMessage: string): string => {
    if (typeof error === 'string') return error;
    
    const detail = error?.response?.data?.detail;
    
    // Handle Pydantic validation errors (array of objects)
    if (Array.isArray(detail)) {
      return detail.map((err: any) => err.msg || err.message).join(', ');
    }
    
    // Handle object with msg key
    if (typeof detail === 'object' && detail?.msg) {
      return detail.msg;
    }
    
    // Handle string detail
    if (typeof detail === 'string') {
      return detail;
    }
    
    // Fallback
    return error?.message || defaultMessage;
  },

  // Register - send OTP
  register: async (email: string) => {
    try {
      set({ isLoading: true, error: null });
      const response = await authService.register(email);
      set({ isLoading: false });
      return { success: true, message: response.message };
    } catch (error: any) {
      const message = get().extractErrorMessage(error, 'Failed to send verification code');
      set({ error: message, isLoading: false });
      return { success: false, message };
    }
  },

  // Login - send OTP
  login: async (email: string) => {
    try {
      set({ isLoading: true, error: null });
      const response = await authService.login(email);
      set({ isLoading: false });
      return { success: true, message: response.message };
    } catch (error: any) {
      const message = get().extractErrorMessage(error, 'Failed to send verification code');
      set({ error: message, isLoading: false });
      return { success: false, message };
    }
  },

  // Verify OTP code
  verifyCode: async (email: string, code: string) => {
    try {
      set({ isLoading: true, error: null });
      const response: AuthToken = await authService.verifyCode(email, code);
      
      // Save tokens
      await get().setTokens(response.access_token, response.refresh_token);
      
      // Save user
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));
      
      set({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
      });

      // Check if profile is completed
      await get().checkProfileStatus();
      
      return { 
        success: true, 
        needsProfile: get().needsProfileCompletion 
      };
    } catch (error: any) {
      const message = get().extractErrorMessage(error, 'Invalid verification code');
      set({ error: message, isLoading: false });
      return { success: false, needsProfile: false };
    }
  },

  // Check profile completion status
  checkProfileStatus: async () => {
    try {
      const userProfile = await authService.getUserProfile();
      
      const needsProfile = !userProfile.profile || !userProfile.profile.profile_completed;
      
      set({
        userProfile,
        needsProfileCompletion: needsProfile,
      });
    } catch (error) {
      console.error('Failed to check profile status:', error);
    }
  },

  // Fetch interests and expertise for profile completion
  fetchInterestsAndExpertise: async () => {
    try {
      const [interests, expertise] = await Promise.all([
        authService.getInterests(),
        authService.getExpertise(),
      ]);
      
      set({ interests, expertise });
    } catch (error) {
      console.error('Failed to fetch interests/expertise:', error);
    }
  },

  // Complete profile
  completeProfile: async (data: ProfileCompletionForm) => {
    try {
      set({ isLoading: true, error: null });
      
      await authService.completeProfile(data);
      
      // Refresh profile status
      await get().checkProfileStatus();
      
      set({ isLoading: false, needsProfileCompletion: false });
      
      return { success: true };
    } catch (error: any) {
      const message = get().extractErrorMessage(error, 'Failed to complete profile');
      set({ error: message, isLoading: false });
      return { success: false, error: message };
    }
  },

  // Logout
  logout: async () => {
    try {
      if (get().accessToken) {
        await authService.logout();
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear storage
      await Promise.all([
        AsyncStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN),
        AsyncStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN),
        AsyncStorage.removeItem(STORAGE_KEYS.USER),
      ]);

      // Clear API token
      apiService.setAuthToken(null);

      // Reset state
      set({
        user: null,
        userProfile: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        needsProfileCompletion: false,
        error: null,
      });
    }
  },

  // Clear error
  clearError: () => set({ error: null }),
}));

