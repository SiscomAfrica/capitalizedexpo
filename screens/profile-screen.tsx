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

interface ProfileScreenProps {
  onNavigate?: (screen: string) => void;
  onBack?: () => void;
}

// Stat component for Posts, Followers, Following
const StatCard = ({ number, label }: { number: string; label: string }) => {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statNumber}>{number}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
};

// Settings menu item component
const SettingsItem = ({ title, onPress }: { title: string; onPress?: () => void }) => {
  return (
    <TouchableOpacity style={styles.settingsItem} onPress={onPress}>
      <Text style={styles.settingsItemText}>{title}</Text>
      <Ionicons name="chevron-forward" size={20} color="#666666" />
    </TouchableOpacity>
  );
};

export default function ProfileScreen({ onNavigate, onBack }: ProfileScreenProps) {
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
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={[Typography.heading, styles.headerTitle]}>Settings</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          {/* Profile Image */}
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImage}>
              <View style={styles.profileImagePlaceholder} />
            </View>
            <TouchableOpacity style={styles.editIcon}>
              <Ionicons name="pencil" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          {/* User Info */}
          <Text style={styles.userName}>finley mwachia</Text>
          <Text style={styles.userTitle}>lead software engineer @siscom tech</Text>
          <Text style={styles.userLocation}>nairobi</Text>
          
          {/* Stats Row */}
          <View style={styles.statsRow}>
            <StatCard number="0" label="Posts" />
            <StatCard number="0" label="Followers" />
            <StatCard number="0" label="Following" />
          </View>
          
          {/* User Tag */}
          <View style={styles.userTag}>
            <Text style={styles.userTagText}>software dev</Text>
          </View>
        </View>
        
        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.insiderButton}
            onPress={() => onNavigate?.('insider')}
          >
            <Text style={styles.insiderButtonText}>BECOME AN INSIDER</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.resumeButton}>
            <Text style={styles.resumeButtonText}>Add Resume to Talent Infusion</Text>
            <View style={styles.resumeIcon}>
              <Text style={styles.resumeIconText}>b</Text>
            </View>
          </TouchableOpacity>
        </View>
        
        {/* Settings Menu */}
        <View style={styles.settingsMenu}>
          <SettingsItem 
            title="Messages" 
            onPress={() => onNavigate?.('messages')}
          />
          <SettingsItem 
            title="Manage Account Security" 
            onPress={() => console.log('Account Security')}
          />
          <SettingsItem 
            title="Privacy Settings" 
            onPress={() => console.log('Privacy Settings')}
          />
          <SettingsItem 
            title="Frequently Asked Questions" 
            onPress={() => console.log('FAQ')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#000000',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '400',
    fontFamily: 'Poppins_400Regular',
    marginLeft: 4,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Poppins_600SemiBold',
    textAlign: 'center',
    flex: 1,
  },
  headerSpacer: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  profileSection: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImagePlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#F5F5DC',
  },
  editIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    fontFamily: 'Poppins_700Bold',
    marginBottom: 8,
  },
  userTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#666666',
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
    marginBottom: 4,
  },
  userLocation: {
    fontSize: 16,
    fontWeight: '400',
    color: '#666666',
    fontFamily: 'Poppins_400Regular',
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#000000',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    minWidth: 80,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#A3E635',
    fontFamily: 'Poppins_700Bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: '#A3E635',
    fontFamily: 'Poppins_400Regular',
  },
  userTag: {
    backgroundColor: '#F0F0F0',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  userTagText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
    fontFamily: 'Poppins_400Regular',
  },
  actionButtons: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  insiderButton: {
    backgroundColor: '#A3E635',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  insiderButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'Poppins_600SemiBold',
    letterSpacing: 0.16,
  },
  resumeButton: {
    backgroundColor: '#000000',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  resumeButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    fontFamily: 'Poppins_500Medium',
    flex: 1,
  },
  resumeIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resumeIconText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    fontFamily: 'Poppins_700Bold',
  },
  settingsMenu: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingsItemText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    fontFamily: 'Poppins_400Regular',
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
