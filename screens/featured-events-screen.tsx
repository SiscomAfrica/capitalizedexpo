import { Typography, useCustomFonts } from '@/hooks/use-fonts';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface FeaturedEventsScreenProps {
  onNavigate?: (screen: string) => void;
}

export default function FeaturedEventsScreen({ onNavigate }: FeaturedEventsScreenProps) {
  const { fontsLoaded } = useCustomFonts();

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
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
        <TouchableOpacity onPress={() => onNavigate?.('home')} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={[Typography.heading, styles.headerTitle]}>Featured events</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#999999" style={styles.searchIcon} />
            <TextInput
              placeholder="Search Events..."
              placeholderTextColor="#999999"
              style={[Typography.body, styles.searchInput]}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options-outline" size={20} color="#666666" />
          </TouchableOpacity>
        </View>

        {/* Events List (static demo content) */}
        <Text style={[Typography.heading, styles.sectionLabel]}>Events</Text>

        <TouchableOpacity style={styles.eventItem}>
          <View style={styles.eventDate}>
            <Text style={styles.eventDateNumber}>27</Text>
            <Text style={styles.eventDateMonth}>Oct</Text>
          </View>
          <View style={styles.eventDetails}>
            <Text style={styles.eventTime}>Oct 27 (10:00 AM) to Nov 01 (9:59 AM)</Text>
            <Text style={[Typography.heading, styles.eventTitle]}>AFROTECH™ CONFERENCE 2025</Text>
            <View style={styles.locationContainer}>
              <Ionicons name="location-outline" size={16} color="#999999" />
              <Text style={styles.locationText}>Houston, TX</Text>
              <Text style={styles.distanceText}>~8735 miles</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.eventItem}>
          <View style={styles.eventDate}>
            <Text style={styles.eventDateNumber}>30</Text>
            <Text style={styles.eventDateMonth}>Oct</Text>
          </View>
          <View style={styles.eventDetails}>
            <Text style={styles.eventTime}>Oct 30 (4:00 AM) to Oct 30 (10:00 AM)</Text>
            <Text style={[Typography.heading, styles.eventTitle]}>BLAVITY HOUSE PARTY RNB EDITION</Text>
            <View style={styles.locationContainer}>
              <Ionicons name="location-outline" size={16} color="#999999" />
              <Text style={styles.locationText}>Houston, TX</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.eventItem}>
          <View style={styles.eventDate}>
            <Text style={styles.eventDateNumber}>01</Text>
            <Text style={styles.eventDateMonth}>Nov</Text>
          </View>
          <View style={styles.eventDetails}>
            <Text style={styles.eventTime}>Nov 01 (12:30 AM) to Nov 01 (4:30 AM)</Text>
            <Text style={[Typography.heading, styles.eventTitle]}>THE BLAVITY HOUSE PARTY BLOCK PARTY</Text>
            <View style={styles.locationContainer}>
              <Ionicons name="location-outline" size={16} color="#999999" />
              <Text style={styles.locationText}>Houston, TX</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Ad placeholder spacing */}
        <View style={styles.adPlaceholder} />

        <TouchableOpacity style={styles.eventItem}>
          <View style={styles.eventDate}>
            <Text style={styles.eventDateNumber}>07</Text>
            <Text style={styles.eventDateMonth}>Nov</Text>
          </View>
          <View style={styles.eventDetails}>
            <Text style={styles.eventTime}>Nov 07 (4:00 AM) to Nov 07 (7:00 AM)</Text>
            <Text style={[Typography.heading, styles.eventTitle]}>THE MEETUP: CHICAGO</Text>
            <View style={styles.locationContainer}>
              <Ionicons name="location-outline" size={16} color="#999999" />
              <Text style={styles.locationText}>Chicago, IL</Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: '#000000',
  },
  header: {
    backgroundColor: '#190046',
    paddingTop: 44,
    paddingHorizontal: 16,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  headerRight: {
    width: 40,
    height: 24,
  },
  content: {
    paddingHorizontal: 16,
    backgroundColor: '#f4f4f4',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 12,
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    color: '#000000',
    flex: 1,
    padding: 0,
  },
  filterButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 10,
  },
  sectionLabel: {
    color: '#000000',
    marginBottom: 8,
  },
  eventItem: {
    flexDirection: 'row',
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#F0F0F0',
    gap: 12,
  },
  eventDate: {
    width: 72,
    height: 72,
    borderRadius: 16,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventDateNumber: {
    color: '#000000',
    fontSize: 28,
    fontWeight: '700',
  },
  eventDateMonth: {
    color: '#000000',
    fontSize: 14,
  },
  eventDetails: {
    flex: 1,
  },
  eventTime: {
    color: '#9A9A9A',
    fontSize: 12,
    marginBottom: 6,
  },
  eventTitle: {
    color: '#000000',
    fontSize: 22,
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationText: {
    color: '#666666',
  },
  distanceText: {
    color: '#9A86C0',
    marginLeft: 8,
  },
  adPlaceholder: {
    height: 64,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    marginVertical: 8,
  },
});


