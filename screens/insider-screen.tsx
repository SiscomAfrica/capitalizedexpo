import { Typography, useCustomFonts } from '@/hooks/use-fonts';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface InsiderScreenProps {
  onNavigate?: (screen: string) => void;
}

// Checkmark component
const CheckmarkItem = ({ text }: { text: string }) => {
  return (
    <View style={styles.checkmarkItem}>
      <Ionicons name="checkmark" size={20} color="#666666" style={styles.checkmarkIcon} />
      <Text style={styles.checkmarkText}>{text}</Text>
    </View>
  );
};

export default function InsiderScreen({ onNavigate }: InsiderScreenProps) {
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
        <Text style={[Typography.heading, styles.headerTitle]}>Insider</Text>
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

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Subscription Card */}
        <View style={styles.subscriptionCard}>
          <Text style={styles.cardTitle}>AfroTech Insider</Text>
          
          <View style={styles.priceContainer}>
            <Text style={styles.price}>$599.00</Text>
            <Text style={styles.priceUnit}>/year</Text>
          </View>
          
          <View style={styles.benefitsList}>
            <CheckmarkItem text="AfroTech Conference Premier Ticket (Free)" />
            <CheckmarkItem text="AfroTech Meetups Access (Free)" />
            <CheckmarkItem text="Blavity Fest Ticket (Free)" />
            <CheckmarkItem text="Profile Review" />
            <CheckmarkItem text="Editorial Amplification" />
            <CheckmarkItem text="Curated Networking Opportunities" />
            <CheckmarkItem text="And More..." />
          </View>
          
          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyButtonText}>APPLY NOW</Text>
          </TouchableOpacity>
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
  },
  subscriptionCard: {
    margin: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000000',
    fontFamily: 'Poppins_700Bold',
    marginBottom: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 20,
  },
  price: {
    fontSize: 40,
    fontWeight: '700',
    color: '#000000',
    fontFamily: 'Poppins_700Bold',
  },
  priceUnit: {
    fontSize: 18,
    fontWeight: '400',
    color: '#666666',
    fontFamily: 'Poppins_400Regular',
    marginLeft: 4,
  },
  benefitsList: {
    marginBottom: 20,
  },
  checkmarkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkmarkIcon: {
    marginRight: 12,
    width: 20,
  },
  checkmarkText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    fontFamily: 'Poppins_400Regular',
    flex: 1,
  },
  applyButton: {
    backgroundColor: '#e6c79d',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'Poppins_600SemiBold',
    letterSpacing: 0.16,
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
