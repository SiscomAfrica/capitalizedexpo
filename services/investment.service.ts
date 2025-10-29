/**
 * Investment API service
 */

import { apiService } from './api';
import { API_ENDPOINTS } from '@/config/api';
import { Investment, InvestmentWithDetails, InvestmentListResponse } from '@/types/investment';

export interface InvestmentFilters {
  status?: 'active' | 'closed' | 'draft' | 'archived' | 'all';
  category?: string;
  featured?: boolean;
  page?: number;
  page_size?: number;
}

class InvestmentService {
  /**
   * Get list of investments with filters
   */
  async getInvestments(filters: InvestmentFilters = {}): Promise<InvestmentListResponse> {
    const params = new URLSearchParams();
    
    if (filters.status) params.append('status_filter', filters.status);
    if (filters.category) params.append('category', filters.category);
    if (filters.featured !== undefined) params.append('featured', String(filters.featured));
    if (filters.page) params.append('page', String(filters.page));
    if (filters.page_size) params.append('page_size', String(filters.page_size));

    const url = `${API_ENDPOINTS.investments.list}?${params.toString()}`;
    return apiService.get<InvestmentListResponse>(url);
  }

  /**
   * Get featured investments
   */
  async getFeaturedInvestments(): Promise<Investment[]> {
    const response = await this.getInvestments({ 
      featured: true, 
      status: 'active',
      page_size: 10
    });
    return response.items;
  }

  /**
   * Get investment detail by ID
   */
  async getInvestmentById(id: string): Promise<InvestmentWithDetails> {
    return apiService.get<InvestmentWithDetails>(API_ENDPOINTS.investments.detail(id));
  }

  /**
   * Toggle interest in investment
   */
  async toggleInterest(id: string, isInterested: boolean): Promise<any> {
    return apiService.post(API_ENDPOINTS.investments.toggleInterest(id), {
      is_interested: isInterested,
    });
  }

  /**
   * Get investment categories
   */
  async getCategories(): Promise<string[]> {
    return apiService.get<string[]>(API_ENDPOINTS.investments.categories);
  }
}

export const investmentService = new InvestmentService();

