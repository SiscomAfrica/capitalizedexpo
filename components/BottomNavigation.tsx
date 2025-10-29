import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface BottomNavigationProps {
  currentScreen: 'home' | 'events' | 'communities' | 'messages' | 'insider';
  onNavigate: (screen: string) => void;
}

export default function BottomNavigation({ currentScreen, onNavigate }: BottomNavigationProps) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.bottomNav,
        {
          // Remove top padding to eliminate white space above the tab bar
          paddingTop: 0,
          // Bring the bar ~12% closer to Android system nav buttons
          paddingBottom:
            Platform.OS === 'android'
              ? Math.max(8, Math.round(insets.bottom * 0.88))
              : insets.bottom,
          // Avoid extra spacing outside the bar
          marginBottom: 0,
        },
      ]}
    >
      <TouchableOpacity 
        style={[styles.navItem, currentScreen === 'home' && styles.navItemActive]} 
        onPress={() => onNavigate('home')}
      >
        <Ionicons 
          name={currentScreen === 'home' ? 'apps' : 'apps'} 
          size={28} 
          color={currentScreen === 'home' ? '#000000' : '#666666'} 
        />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.navItem, currentScreen === 'events' && styles.navItemActive]} 
        onPress={() => onNavigate('events')}
      >
        <Image 
          source={require('@/assets/images/tickets-icon.png')} 
          style={[
            styles.ticketIcon,
            { opacity: currentScreen === 'events' ? 1 : 0.5 }
          ]} 
          resizeMode="contain"
        />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.navItem, currentScreen === 'communities' && styles.navItemActive]} 
        onPress={() => onNavigate('communities')}
      >
        <Image
          source={require('@/assets/images/community-icon.png')}
          style={[
            styles.ticketIcon,
            { opacity: currentScreen === 'communities' ? 1 : 0.5 }
          ]}
          resizeMode="contain"
        />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.navItem, currentScreen === 'messages' && styles.navItemActive]} 
        onPress={() => onNavigate('messages')}
      >
        <Image 
          source={require('@/assets/images/message-icon.png')} 
          style={[
            styles.ticketIcon,
            { opacity: currentScreen === 'messages' ? 1 : 0.5 }
          ]} 
          resizeMode="contain"
        />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.navItem, currentScreen === 'insider' && styles.navItemActive]} 
        onPress={() => onNavigate('insider')}
      >
        <Image
          source={require('@/assets/images/subscription-icon.png')}
          style={[
            styles.ticketIcon,
            { opacity: currentScreen === 'insider' ? 1 : 0.5 }
          ]}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    // No vertical padding; set per-edge padding dynamically
    paddingHorizontal: 16,
    // paddingBottom is set dynamically using safe area insets
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    ...(Platform.OS === 'ios' ? {
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
    } : {
      elevation: 0,
    }),
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navItemActive: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 8,
  },
  ticketIcon: {
    width: 28,
    height: 28,
  },
});
