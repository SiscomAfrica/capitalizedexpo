/**
 * Event types based on backend models
 */

export interface Event {
  id: string;
  title: string;
  description: string;
  short_description: string | null;
  card_image_url: string | null;
  event_type: string | null;
  category: string | null;
  start_datetime: string;
  end_datetime: string;
  timezone: string;
  location_type: 'in_person' | 'virtual' | 'hybrid' | null;
  location_address: string | null;
  virtual_meeting_url: string | null;
  capacity: number | null;
  attendee_count: number;
  status: 'draft' | 'upcoming' | 'ongoing' | 'past' | 'cancelled';
  created_by: string | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

export interface EventWithUserStatus extends Event {
  user_status: 'attending' | 'not_attending' | null;
  user_joined_group: boolean;
  can_join_group: boolean;
}

export interface EventListResponse {
  items: Event[];
  total: number;
  page: number;
  page_size: number;
  has_more: boolean;
}

