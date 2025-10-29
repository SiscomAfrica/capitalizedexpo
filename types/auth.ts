/**
 * Authentication types based on backend
 */

export interface UserProfile {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  about: string | null;
  linkedin_url: string | null;
  profile_image_url: string | null;
  profile_completed: boolean;
  created_at: string;
  updated_at: string;
  interests: Interest[];
  expertise: ExpertiseArea[];
  professional_background: ProfessionalBackground[];
}

export interface Interest {
  id: string;
  name: string;
  category: string | null;
  created_at: string;
}

export interface ExpertiseArea {
  id: string;
  name: string;
  created_at: string;
}

export interface ProfessionalBackground {
  id: string;
  user_id: string;
  company_name: string;
  position: string | null;
  start_year: number;
  end_year: number | null;
  is_current: boolean;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  email_verified: boolean;
  role: 'user' | 'admin';
  is_active: boolean;
  created_at: string;
  updated_at: string;
  last_login: string | null;
}

export interface AuthToken {
  access_token: string;
  refresh_token: string;
  token_type: string;
  user: User;
}

export interface EmailVerificationResponse {
  email: string;
  message: string;
  expires_in_minutes: number;
}

export interface UserWithProfile extends User {
  profile: UserProfile | null;
}

// Form types
export interface ProfileCompletionForm {
  first_name: string;
  last_name: string;
  about?: string;
  linkedin_url?: string;
  profile_image_url?: string;
  interest_ids: string[];
  expertise_ids: string[];
  professional_background: ProfessionalBackgroundInput[];
}

export interface ProfessionalBackgroundInput {
  company_name: string;
  position?: string;
  start_year: number;
  end_year?: number;
  is_current: boolean;
  description?: string;
}

