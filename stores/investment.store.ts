/**
 * Investment Zustand Store
 */

import { create } from 'zustand';
import { Investment, InvestmentWithDetails } from '@/types/investment';
import { investmentService } from '@/services/investment.service';

interface InvestmentState {
  // Featured investments
  featuredInvestments: Investment[];
  featuredLoading: boolean;
  featuredError: string | null;

  // All investments
  investments: Investment[];
  investmentsLoading: boolean;
  investmentsError: string | null;
  investmentsPagination: {
    page: number;
    pageSize: number;
    total: number;
    hasMore: boolean;
  };

  // Selected investment detail
  selectedInvestment: InvestmentWithDetails | null;
  selectedInvestmentLoading: boolean;
  selectedInvestmentError: string | null;

  // Actions
  fetchFeaturedInvestments: () => Promise<void>;
  fetchInvestments: (page?: number, filters?: any) => Promise<void>;
  fetchInvestmentById: (id: string) => Promise<void>;
  toggleInterest: (id: string, isInterested: boolean) => Promise<void>;
  resetSelectedInvestment: () => void;
}

export const useInvestmentStore = create<InvestmentState>((set, get) => ({
  // Initial state
  featuredInvestments: [],
  featuredLoading: false,
  featuredError: null,

  investments: [],
  investmentsLoading: false,
  investmentsError: null,
  investmentsPagination: {
    page: 1,
    pageSize: 20,
    total: 0,
    hasMore: false,
  },

  selectedInvestment: null,
  selectedInvestmentLoading: false,
  selectedInvestmentError: null,

  // Fetch featured investments
  fetchFeaturedInvestments: async () => {
    set({ featuredLoading: true, featuredError: null });
    try {
      const data = await investmentService.getFeaturedInvestments();
      set({ featuredInvestments: data, featuredLoading: false });
    } catch (error: any) {
      set({ 
        featuredError: error.message || 'Failed to fetch featured investments',
        featuredLoading: false 
      });
    }
  },

  // Fetch all investments
  fetchInvestments: async (page = 1, filters = {}) => {
    set({ investmentsLoading: true, investmentsError: null });
    try {
      const response = await investmentService.getInvestments({
        ...filters,
        page,
        page_size: get().investmentsPagination.pageSize,
        featured: false, // Only non-featured investments
        status: 'active',
      });

      set({
        investments: response.items,
        investmentsLoading: false,
        investmentsPagination: {
          page: response.page,
          pageSize: response.page_size,
          total: response.total,
          hasMore: response.has_more,
        },
      });
    } catch (error: any) {
      set({
        investmentsError: error.message || 'Failed to fetch investments',
        investmentsLoading: false,
      });
    }
  },

  // Fetch investment by ID
  fetchInvestmentById: async (id: string) => {
    set({ selectedInvestmentLoading: true, selectedInvestmentError: null });
    try {
      const data = await investmentService.getInvestmentById(id);
      set({ selectedInvestment: data, selectedInvestmentLoading: false });
    } catch (error: any) {
      set({
        selectedInvestmentError: error.message || 'Failed to fetch investment details',
        selectedInvestmentLoading: false,
      });
    }
  },

  // Toggle interest
  toggleInterest: async (id: string, isInterested: boolean) => {
    try {
      await investmentService.toggleInterest(id, isInterested);
      
      // Update selected investment if it's the current one
      const { selectedInvestment } = get();
      if (selectedInvestment && selectedInvestment.id === id) {
        set({
          selectedInvestment: {
            ...selectedInvestment,
            user_interested: isInterested,
          },
        });
      }
    } catch (error: any) {
      console.error('Failed to toggle interest:', error);
      throw error;
    }
  },

  // Reset selected investment
  resetSelectedInvestment: () => {
    set({ 
      selectedInvestment: null,
      selectedInvestmentError: null 
    });
  },
}));

