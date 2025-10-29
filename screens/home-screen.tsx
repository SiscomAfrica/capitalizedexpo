import { Typography, useCustomFonts } from '@/hooks/use-fonts';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface HomeScreenProps {
  onNavigate?: (screen: string, params?: any) => void;
}

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
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
    <SafeAreaView style={styles.container} edges={['bottom']} mode="padding">
      <StatusBar barStyle="light-content" backgroundColor="#000000" translucent={true} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={[Typography.heading, styles.headerTitle]}>Home</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.notificationContainer} onPress={() => onNavigate?.('notifications')}>
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

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="never"
        scrollIndicatorInsets={{ right: 1 }}
        bounces={false}>
        {/* Featured Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured</Text>
            <TouchableOpacity style={styles.viewAllButton} onPress={() => onNavigate?.('featuredEvents')}>
              <Text style={styles.viewAllText}>View All</Text>
              <Ionicons name="chevron-forward" size={16} color="#666666" />
            </TouchableOpacity>
          </View>
          
          {/* Horizontal image carousel */}
          <View style={styles.carouselContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.carouselScroll}
            >
              {[
                require('@/assets/images/capitalized-1.jpeg'),
                require('@/assets/images/capitalized-2.jpeg'),
                require('@/assets/images/capitalized-3.jpeg'),
              ].map((src, index) => (
                <TouchableOpacity key={index} activeOpacity={0.9} onPress={() => onNavigate?.('eventDetails', { image: src })}>
                  <View style={styles.cardImageContainer}>
                    <Image source={src} style={styles.cardImage} resizeMode="cover" />
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
            </View>
        </View>

        {/* Search Bar */}
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

        {/* Events Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[Typography.heading, styles.sectionTitle]}>Events</Text>
            <TouchableOpacity style={styles.viewAllButton} onPress={() => onNavigate?.('events')}>
              <Text style={[Typography.body, styles.viewAllText]}>View All</Text>
              <Ionicons name="chevron-forward" size={16} color="#666666" />
            </TouchableOpacity>
          </View>
          
          {/* Event List */}
          <View style={styles.eventsList}>
            {/* Event 1 - AFROTECH Conference */}
            <TouchableOpacity style={styles.eventItem}>
              <View style={styles.eventDate}>
                <Text style={styles.eventDateNumber}>27</Text>
                <Text style={styles.eventDateMonth}>Oct</Text>
              </View>
              <View style={styles.eventDetails}>
                <Text style={styles.eventTime}>Oct 27 (10:00 AM) to Nov 01 (9:59 AM)</Text>
                <Text style={[Typography.heading, styles.eventTitle]}>AFROTECH™ Conference 2025</Text>
                <View style={styles.locationContainer}>
                  <Ionicons name="location-outline" size={16} color="#999999" />
                  <Text style={styles.locationText}>Houston, TX</Text>
                  <Text style={styles.distanceText}>~8735 miles</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Event 2 - Blavity House Party */}
            <TouchableOpacity style={styles.eventItem}>
              <View style={styles.eventDate}>
                <Text style={styles.eventDateNumber}>30</Text>
                <Text style={styles.eventDateMonth}>Oct</Text>
              </View>
              <View style={styles.eventDetails}>
                <Text style={styles.eventTime}>Oct 30 (4:00 AM) to Oct 30 (10:00 AM)</Text>
                <Text style={[Typography.heading, styles.eventTitle]}>Blavity House Party RNB Edition</Text>
                <View style={styles.locationContainer}>
                  <Ionicons name="location-outline" size={16} color="#999999" />
                  <Text style={styles.locationText}>Houston, TX</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Event 3 - Partial third event */}
            <TouchableOpacity style={styles.eventItem}>
              <View style={styles.eventDate}>
                <Text style={styles.eventDateNumber}>01</Text>
                <Text style={styles.eventDateMonth}>Nov</Text>
              </View>
              <View style={styles.eventDetails}>
                <Text style={styles.eventTime}>Nov 01 (12:30 AM) to Nov 01 (4:30 AM)</Text>
                <Text style={[Typography.heading, styles.eventTitle]}>The Blavity House Party</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
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
  content: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#000000',
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Poppins_700Bold',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewAllText: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '500',
  },
  featuredCard: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#FF4500',
    minHeight: 240,
  },
  featuredContent: {
    padding: 16,
    position: 'relative',
  },
  featuredHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  housePartyText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Poppins_700Bold',
  },
  dateLabel: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignItems: 'center',
    minWidth: 50,
  },
  dateLabelText: {
    color: '#FF6B35',
    fontSize: 8,
    fontWeight: '600',
    fontFamily: 'Poppins_600SemiBold',
  },
  dateLabelNumber: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Poppins_700Bold',
  },
  performersSection: {
    marginBottom: 16,
  },
  livePerformancesText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 6,
    fontFamily: 'Poppins_400Regular',
  },
  performersContainer: {
    backgroundColor: '#4169E1',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  performersText: {
    color: '#FFFF00',
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Poppins_700Bold',
    letterSpacing: 0.5,
  },
  artistGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
    marginTop: 8,
  },
  artistThumbnail: {
    width: 45,
    height: 45,
    borderRadius: 6,
    overflow: 'hidden',
  },
  artistImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  artistName: {
    color: '#FFFFFF',
    fontSize: 6,
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: 'Poppins_400Regular',
  },
  featuredFooter: {
    gap: 4,
  },
  partnerText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '400',
    fontFamily: 'Poppins_400Regular',
    opacity: 0.8,
  },
  conferenceText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
    fontFamily: 'Poppins_600SemiBold',
  },
  carouselContainer: {
    paddingVertical: 6,
  },
  carouselScroll: {
    paddingRight: 16,
    gap: 12,
  },
  cardImageContainer: {
    width: 345,
    height: 196,
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 12,
    backgroundColor: '#EEE',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 20,
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
    gap: 16,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
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
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 14,
    color: '#666666',
  },
  distanceText: {
    fontSize: 14,
    color: '#999999',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666666',
  },
});
