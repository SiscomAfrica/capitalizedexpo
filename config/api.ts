/**
 * API Configuration
 * Update BASE_URL with your backend URL
 */

// Change this to your actual backend URL
export const BASE_URL = 'http://192.168.0.101:8001';

export const API_ENDPOINTS = {
  // Authentication
  auth: {
    register: '/api/v1/auth/register',
    login: '/api/v1/auth/login',
    verify: '/api/v1/auth/verify',
    refresh: '/api/v1/auth/refresh',
    me: '/api/v1/auth/me',
    logout: '/api/v1/auth/logout',
  },
  
  // Profile
  profile: {
    me: '/api/v1/profile/me',
    complete: '/api/v1/profile/complete',
    update: '/api/v1/profile/me',
    interests: '/api/v1/profile/interests/all',
    expertise: '/api/v1/profile/expertise/all',
  },
  
  // Investments
  investments: {
    list: '/api/v1/investments',
    detail: (id: string) => `/api/v1/investments/${id}`,
    toggleInterest: (id: string) => `/api/v1/investments/${id}/interested`,
    categories: '/api/v1/investments/categories/list',
  },
  
  // Events
  events: {
    list: '/api/v1/events',
    detail: (id: string) => `/api/v1/events/${id}`,
    attend: (id: string) => `/api/v1/events/${id}/attend`,
    joinGroup: (id: string) => `/api/v1/events/${id}/join-group`,
  },
};

/**
 * Get authorization header
 */
export const getAuthHeader = (token: string | null) => {
  if (!token) return {};
  return {
    Authorization: `Bearer ${token}`,
  };
};

