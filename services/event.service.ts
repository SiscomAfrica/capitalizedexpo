/**
 * Event API service
 */

import { apiService } from './api';
import { API_ENDPOINTS } from '@/config/api';
import { Event, EventWithUserStatus, EventListResponse } from '@/types/event';

export interface EventFilters {
  status?: 'draft' | 'upcoming' | 'ongoing' | 'past' | 'cancelled' | 'all';
  category?: string;
  page?: number;
  page_size?: number;
}

class EventService {
  /**
   * Get list of events with filters
   */
  async getEvents(filters: EventFilters = {}): Promise<EventListResponse> {
    const params = new URLSearchParams();
    
    if (filters.status) params.append('status_filter', filters.status);
    if (filters.category) params.append('category', filters.category);
    if (filters.page) params.append('page', String(filters.page));
    if (filters.page_size) params.append('page_size', String(filters.page_size));

    const url = `${API_ENDPOINTS.events.list}?${params.toString()}`;
    return apiService.get<EventListResponse>(url);
  }

  /**
   * Get event detail by ID
   */
  async getEventById(id: string): Promise<EventWithUserStatus> {
    return apiService.get<EventWithUserStatus>(API_ENDPOINTS.events.detail(id));
  }

  /**
   * Mark attendance for event
   */
  async attendEvent(id: string, status: 'attending' | 'not_attending'): Promise<any> {
    return apiService.post(API_ENDPOINTS.events.attend(id), { status });
  }

  /**
   * Join event group
   */
  async joinEventGroup(id: string): Promise<any> {
    return apiService.post(API_ENDPOINTS.events.joinGroup(id));
  }
}

export const eventService = new EventService();

