/**
 * Investment types based on backend models
 */

export interface Investment {
  id: string;
  title: string;
  short_description: string;
  card_image_url: string | null;
  category: string | null;
  investment_type: string | null;
  featured: boolean;
  minimum_investment: number | null;
  expected_return: number | null;
  risk_level: 'low' | 'medium' | 'high' | null;
  status: 'active' | 'closed' | 'draft' | 'archived';
  interest_count: number;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

export interface InvestmentDetail {
  id: string;
  investment_id: string;
  detailed_description: string;
  images: string[] | null;
  documents: Array<{ name: string; url: string; size?: number }> | null;
  financial_data: Record<string, any>;
  terms_conditions: Record<string, any> | null;
  timeline: Record<string, any> | null;
  team_members: Array<{
    name: string;
    role: string;
    bio?: string;
    image?: string;
  }> | null;
  faqs: Array<{ question: string; answer: string }> | null;
  contact_info: {
    email?: string;
    phone?: string;
    website?: string;
  } | null;
  location: {
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    coordinates?: { lat: number; lng: number };
  } | null;
  created_at: string;
  updated_at: string;
}

export interface InvestmentWithDetails extends Investment {
  details: InvestmentDetail | null;
  user_interested: boolean;
}

export interface InvestmentListResponse {
  items: Investment[];
  total: number;
  page: number;
  page_size: number;
  has_more: boolean;
}

