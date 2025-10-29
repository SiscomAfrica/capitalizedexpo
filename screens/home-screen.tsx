import { Typography, useCustomFonts } from '@/hooks/use-fonts';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState, useRef } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useInvestmentStore } from '@/stores/investment.store';
import { FeaturedInvestmentCard } from '@/components/investments/FeaturedInvestmentCard';
import { InvestmentCard } from '@/components/investments/InvestmentCard';
import { PaginationDots } from '@/components/investments/PaginationDots';
import { FeaturedCardSkeleton } from '@/components/skeletons/FeaturedCardSkeleton';
import { InvestmentCardSkeleton } from '@/components/skeletons/InvestmentCardSkeleton';
import { Investment } from '@/types/investment';

const { width } = Dimensions.get('window');

interface HomeScreenProps {
  onNavigate?: (screen: string, params?: any) => void;
}

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  const { fontsLoaded } = useCustomFonts();
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  // Zustand store
  const {
    featuredInvestments,
    featuredLoading,
    featuredError,
    investments,
    investmentsLoading,
    investmentsError,
    fetchFeaturedInvestments,
    fetchInvestments,
  } = useInvestmentStore();

  // Fetch data on mount
  useEffect(() => {
    fetchFeaturedInvestments();
    fetchInvestments();
  }, []);

  // Handle horizontal scroll for featured investments
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const cardWidth = width - 48; // Same as CARD_WIDTH in FeaturedInvestmentCard
    const currentIndex = Math.round(scrollPosition / (cardWidth + 16)); // 16 is the margin
    setActiveCardIndex(currentIndex);
  };

  const handleInvestmentPress = (investment: Investment) => {
    onNavigate?.('investmentDetails', { investmentId: investment.id });
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
        
        {/* Featured Investments Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Investments</Text>
            <TouchableOpacity 
              style={styles.viewAllButton} 
              onPress={() => onNavigate?.('featuredInvestments')}
            >
              <Text style={styles.viewAllText}>View All</Text>
              <Ionicons name="chevron-forward" size={16} color="#666666" />
            </TouchableOpacity>
          </View>
          
          {featuredLoading ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featuredScrollContent}
            >
              <FeaturedCardSkeleton />
              <FeaturedCardSkeleton />
            </ScrollView>
          ) : featuredError ? (
            <View style={styles.errorBox}>
              <Ionicons name="alert-circle-outline" size={40} color="#EF4444" />
              <Text style={styles.errorText}>{featuredError}</Text>
              <TouchableOpacity 
                style={styles.retryButton}
                onPress={fetchFeaturedInvestments}
              >
                <Text style={styles.retryText}>Retry</Text>
              </TouchableOpacity>
            </View>
          ) : featuredInvestments.length > 0 ? (
            <>
              <ScrollView
                ref={scrollViewRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={width - 32}
                decelerationRate="fast"
                contentContainerStyle={styles.featuredScrollContent}
                onScroll={handleScroll}
                scrollEventThrottle={16}
              >
                {featuredInvestments.map((investment) => (
                  <FeaturedInvestmentCard
                    key={investment.id}
                    investment={investment}
                    onPress={handleInvestmentPress}
                  />
                ))}
              </ScrollView>
              <PaginationDots 
                count={featuredInvestments.length} 
                activeIndex={activeCardIndex} 
              />
            </>
          ) : (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>No featured investments available</Text>
            </View>
          )}
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#999999" style={styles.searchIcon} />
            <TextInput
              placeholder="Search Investments..."
              placeholderTextColor="#999999"
              style={[Typography.body, styles.searchInput]}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options-outline" size={20} color="#666666" />
          </TouchableOpacity>
        </View>

        {/* Investments Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[Typography.heading, styles.sectionTitle]}>Investments</Text>
            <TouchableOpacity 
              style={styles.viewAllButton} 
              onPress={() => onNavigate?.('investments')}
            >
              <Text style={[Typography.body, styles.viewAllText]}>View All</Text>
              <Ionicons name="chevron-forward" size={16} color="#666666" />
            </TouchableOpacity>
          </View>
          
          {investmentsLoading ? (
            <View style={styles.investmentsList}>
              <InvestmentCardSkeleton />
              <InvestmentCardSkeleton />
              <InvestmentCardSkeleton />
            </View>
          ) : investmentsError ? (
            <View style={styles.errorBox}>
              <Ionicons name="alert-circle-outline" size={40} color="#EF4444" />
              <Text style={styles.errorText}>{investmentsError}</Text>
              <TouchableOpacity 
                style={styles.retryButton}
                onPress={() => fetchInvestments()}
              >
                <Text style={styles.retryText}>Retry</Text>
              </TouchableOpacity>
            </View>
          ) : investments.length > 0 ? (
            <View style={styles.investmentsList}>
              {investments.slice(0, 5).map((investment) => (
                <InvestmentCard
                  key={investment.id}
                  investment={investment}
                  onPress={handleInvestmentPress}
                />
              ))}
            </View>
          ) : (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>No investments available</Text>
            </View>
          )}
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
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 20,
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
  featuredScrollContent: {
    paddingRight: 16,
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
  investmentsList: {
    gap: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666666',
    marginTop: 12,
    fontFamily: 'Poppins_400Regular',
  },
  loadingBox: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
  },
  errorBox: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
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
  emptyBox: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
  },
  emptyText: {
    fontSize: 14,
    color: '#999999',
    fontFamily: 'Poppins_400Regular',
  },
});
