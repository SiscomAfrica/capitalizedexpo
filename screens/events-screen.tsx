import { Typography, useCustomFonts } from '@/hooks/use-fonts';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEventStore } from '@/stores/event.store';
import { EventCardSkeleton } from '@/components/skeletons/EventCardSkeleton';
import { Event } from '@/types/event';

interface EventsScreenProps {
  onNavigate?: (screen: string, params?: any) => void;
}

// Empty state icon component
const EmptyEventsIcon = () => (
  <View style={styles.emptyIconContainer}>
    <View style={styles.emptyIconBackground} />
    <Image
      source={require('@/assets/images/event-ticket-icon.png')}
      style={styles.emptyImage}
      resizeMode="contain"
    />
  </View>
);

// Event Card Component
const EventCard = ({ event, onPress }: { event: Event; onPress: (event: Event) => void }) => {
  const startDate = new Date(event.start_datetime);
  const endDate = new Date(event.end_datetime);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  return (
    <TouchableOpacity style={styles.eventCard} onPress={() => onPress(event)}>
      <View style={styles.eventDate}>
        <Text style={styles.eventDateNumber}>{startDate.getDate()}</Text>
        <Text style={styles.eventDateMonth}>
          {startDate.toLocaleDateString('en-US', { month: 'short' })}
        </Text>
      </View>
      <View style={styles.eventDetails}>
        <Text style={styles.eventTime}>
          {formatDate(startDate)} ({formatTime(startDate)}) to {formatDate(endDate)} (
          {formatTime(endDate)})
        </Text>
        <Text style={[Typography.heading, styles.eventTitle]} numberOfLines={2}>
          {event.title}
        </Text>
        {event.location_address && (
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={16} color="#999999" />
            <Text style={styles.locationText} numberOfLines={1}>
              {event.location_address}
            </Text>
          </View>
        )}
        {event.virtual_meeting_url && (
          <View style={styles.locationContainer}>
            <Ionicons name="videocam-outline" size={16} color="#999999" />
            <Text style={styles.locationText}>Virtual Event</Text>
          </View>
        )}
        <View style={styles.attendeeContainer}>
          <Ionicons name="people" size={16} color="#666666" />
          <Text style={styles.attendeeText}>
            {event.attendee_count} {event.attendee_count === 1 ? 'attendee' : 'attendees'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function EventsScreen({ onNavigate }: EventsScreenProps) {
  const { fontsLoaded } = useCustomFonts();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'interested' | 'past'>('upcoming');

  const { events, eventsLoading, eventsError, fetchEvents } = useEventStore();

  useEffect(() => {
    // Fetch events based on active tab
    const statusMap = {
      upcoming: 'upcoming',
      interested: 'upcoming', // For now, show upcoming events
      past: 'past',
    };
    fetchEvents(1, { status: statusMap[activeTab] });
  }, [activeTab]);

  const handleEventPress = (event: Event) => {
    onNavigate?.('eventDetails', { eventId: event.id });
  };

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#190046" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" translucent={true} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={[Typography.heading, styles.headerTitle]}>My Events</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.notificationContainer}>
            <Ionicons name="notifications-outline" size={24} color="#FFFFFF" />
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>9</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileAvatar} onPress={() => onNavigate?.('profile')}>
            <View style={styles.avatarPlaceholder} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>
            Upcoming
          </Text>
          {activeTab === 'upcoming' && <View style={styles.tabUnderline} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'interested' && styles.activeTab]}
          onPress={() => setActiveTab('interested')}
        >
          <Text style={[styles.tabText, activeTab === 'interested' && styles.activeTabText]}>
            Interested
          </Text>
          {activeTab === 'interested' && <View style={styles.tabUnderline} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'past' && styles.activeTab]}
          onPress={() => setActiveTab('past')}
        >
          <Text style={[styles.tabText, activeTab === 'past' && styles.activeTabText]}>
            Past Events
          </Text>
          {activeTab === 'past' && <View style={styles.tabUnderline} />}
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#999999" style={styles.searchIcon} />
            <TextInput
              placeholder="Search..."
              placeholderTextColor="#999999"
              style={[Typography.body, styles.searchInput]}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options-outline" size={20} color="#666666" />
          </TouchableOpacity>
        </View>

        {/* Content */}
        {eventsLoading ? (
          <View style={styles.eventsList}>
            <EventCardSkeleton />
            <EventCardSkeleton />
            <EventCardSkeleton />
            <EventCardSkeleton />
          </View>
        ) : eventsError ? (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle-outline" size={40} color="#EF4444" />
            <Text style={styles.errorText}>{eventsError}</Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={() => fetchEvents(1, { status: activeTab === 'past' ? 'past' : 'upcoming' })}
            >
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : events.length > 0 ? (
          <View style={styles.eventsList}>
            {events.map((event) => (
              <EventCard key={event.id} event={event} onPress={handleEventPress} />
            ))}
          </View>
        ) : (
          /* Empty State */
          <View style={styles.emptyState}>
            <EmptyEventsIcon />

            {activeTab === 'upcoming' && (
              <>
                <Text style={styles.emptyTitle}>No Upcoming Events</Text>
                <Text style={styles.emptySubtitle}>
                  You are not currently registered for{'\n'}any upcoming events
                </Text>
              </>
            )}

            {activeTab === 'interested' && (
              <>
                <Text style={styles.emptyTitle}>No Interested Events</Text>
                <Text style={styles.emptySubtitle}>You have not saved any events</Text>
              </>
            )}

            {activeTab === 'past' && (
              <>
                <Text style={styles.emptyTitle}>No Past Events</Text>
                <Text style={styles.emptySubtitle}>You do not have any past events</Text>
              </>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  header: {
    backgroundColor: '#190046',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
    fontFamily: 'Poppins_700Bold',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  notificationContainer: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5DC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F5DC',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    position: 'relative',
  },
  activeTab: {
    // Active tab styling handled by text and underline
  },
  tabText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#999999',
    fontFamily: 'Poppins_400Regular',
  },
  activeTabText: {
    color: '#000000',
    fontWeight: '600',
    fontFamily: 'Poppins_600SemiBold',
  },
  tabUnderline: {
    position: 'absolute',
    bottom: 0,
    left: '25%',
    right: '25%',
    height: 2,
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventsList: {
    paddingHorizontal: 16,
    gap: 16,
  },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
  },
  eventDate: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    minWidth: 70,
    height: 70,
  },
  eventDateNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
    fontFamily: 'Poppins_700Bold',
  },
  eventDateMonth: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666666',
    fontFamily: 'Poppins_400Regular',
  },
  eventDetails: {
    flex: 1,
    gap: 4,
  },
  eventTime: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
    fontFamily: 'Poppins_400Regular',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
    fontFamily: 'Poppins_600SemiBold',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Poppins_400Regular',
    flex: 1,
  },
  attendeeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  attendeeText: {
    fontSize: 13,
    color: '#666666',
    fontFamily: 'Poppins_400Regular',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingTop: 80,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    marginBottom: 40,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIconBackground: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F0F0F0',
  },
  emptyImage: { width: 72, height: 72 },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 12,
    fontFamily: 'Poppins_700Bold',
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#666666',
    textAlign: 'center',
    lineHeight: 22,
    fontFamily: 'Poppins_400Regular',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
  },
  loadingText: {
    fontSize: 16,
    color: '#666666',
    marginTop: 12,
    fontFamily: 'Poppins_400Regular',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: 40,
  },
  errorText: {
    fontSize: 14,
    color: '#EF4444',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 16,
    fontFamily: 'Poppins_400Regular',
  },
  retryButton: {
    backgroundColor: '#190046',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
  },
  retryText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Poppins_600SemiBold',
  },
});
