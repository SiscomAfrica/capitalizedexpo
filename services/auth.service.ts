/**
 * Authentication API Service
 */

import { apiService } from './api';
import { API_ENDPOINTS } from '@/config/api';
import { 
  EmailVerificationResponse, 
  AuthToken, 
  User, 
  UserWithProfile,
  ProfileCompletionForm,
  Interest,
  ExpertiseArea
} from '@/types/auth';

class AuthService {
  /**
   * Register - Send OTP to email
   */
  async register(email: string): Promise<EmailVerificationResponse> {
    return apiService.post<EmailVerificationResponse>(API_ENDPOINTS.auth.register, { email });
  }

  /**
   * Login - Send OTP to email
   */
  async login(email: string): Promise<EmailVerificationResponse> {
    return apiService.post<EmailVerificationResponse>(API_ENDPOINTS.auth.login, { email });
  }

  /**
   * Verify OTP code and authenticate
   */
  async verifyCode(email: string, code: string): Promise<AuthToken> {
    return apiService.post<AuthToken>(API_ENDPOINTS.auth.verify, { email, code });
  }

  /**
   * Get current user info
   */
  async getCurrentUser(): Promise<User> {
    return apiService.get<User>(API_ENDPOINTS.auth.me);
  }

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string): Promise<AuthToken> {
    return apiService.post<AuthToken>(API_ENDPOINTS.auth.refresh, { refresh_token: refreshToken });
  }

  /**
   * Logout
   */
  async logout(): Promise<void> {
    await apiService.post(API_ENDPOINTS.auth.logout);
  }

  /**
   * Get user profile with completion status
   */
  async getUserProfile(): Promise<UserWithProfile> {
    return apiService.get<UserWithProfile>(API_ENDPOINTS.profile.me);
  }

  /**
   * Complete user profile
   */
  async completeProfile(data: ProfileCompletionForm): Promise<any> {
    return apiService.post(API_ENDPOINTS.profile.complete, data);
  }

  /**
   * Get all interests
   */
  async getInterests(): Promise<Interest[]> {
    return apiService.get<Interest[]>(API_ENDPOINTS.profile.interests);
  }

  /**
   * Get all expertise areas
   */
  async getExpertise(): Promise<ExpertiseArea[]> {
    return apiService.get<ExpertiseArea[]>(API_ENDPOINTS.profile.expertise);
  }
}

export const authService = new AuthService();

