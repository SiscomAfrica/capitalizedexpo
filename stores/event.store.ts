/**
 * Event Zustand Store
 */

import { create } from 'zustand';
import { Event, EventWithUserStatus } from '@/types/event';
import { eventService } from '@/services/event.service';

interface EventState {
  // All events
  events: Event[];
  eventsLoading: boolean;
  eventsError: string | null;
  eventsPagination: {
    page: number;
    pageSize: number;
    total: number;
    hasMore: boolean;
  };

  // Selected event detail
  selectedEvent: EventWithUserStatus | null;
  selectedEventLoading: boolean;
  selectedEventError: string | null;

  // Actions
  fetchEvents: (page?: number, filters?: any) => Promise<void>;
  fetchEventById: (id: string) => Promise<void>;
  attendEvent: (id: string, status: 'attending' | 'not_attending') => Promise<void>;
  resetSelectedEvent: () => void;
}

export const useEventStore = create<EventState>((set, get) => ({
  // Initial state
  events: [],
  eventsLoading: false,
  eventsError: null,
  eventsPagination: {
    page: 1,
    pageSize: 20,
    total: 0,
    hasMore: false,
  },

  selectedEvent: null,
  selectedEventLoading: false,
  selectedEventError: null,

  // Fetch all events
  fetchEvents: async (page = 1, filters = {}) => {
    set({ eventsLoading: true, eventsError: null });
    try {
      const response = await eventService.getEvents({
        ...filters,
        page,
        page_size: get().eventsPagination.pageSize,
      });

      set({
        events: response.items,
        eventsLoading: false,
        eventsPagination: {
          page: response.page,
          pageSize: response.page_size,
          total: response.total,
          hasMore: response.has_more,
        },
      });
    } catch (error: any) {
      set({
        eventsError: error.message || 'Failed to fetch events',
        eventsLoading: false,
      });
    }
  },

  // Fetch event by ID
  fetchEventById: async (id: string) => {
    set({ selectedEventLoading: true, selectedEventError: null });
    try {
      const data = await eventService.getEventById(id);
      set({ selectedEvent: data, selectedEventLoading: false });
    } catch (error: any) {
      set({
        selectedEventError: error.message || 'Failed to fetch event details',
        selectedEventLoading: false,
      });
    }
  },

  // Attend event
  attendEvent: async (id: string, status: 'attending' | 'not_attending') => {
    try {
      await eventService.attendEvent(id, status);
      
      // Update selected event if it's the current one
      const { selectedEvent } = get();
      if (selectedEvent && selectedEvent.id === id) {
        set({
          selectedEvent: {
            ...selectedEvent,
            user_status: status,
          },
        });
      }
    } catch (error: any) {
      console.error('Failed to attend event:', error);
      throw error;
    }
  },

  // Reset selected event
  resetSelectedEvent: () => {
    set({ 
      selectedEvent: null,
      selectedEventError: null 
    });
  },
}));

