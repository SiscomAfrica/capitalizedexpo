import BottomNavigation from '@/components/BottomNavigation';
import CommunitiesScreen from '@/screens/communities-screen';
import EventDetailsScreen from '@/screens/event-details-screen';
import EventsScreen from '@/screens/events-screen';
import FeaturedEventsScreen from '@/screens/featured-events-screen';
import HomeScreen from '@/screens/home-screen';
import InsiderScreen from '@/screens/insider-screen';
import MessagesScreen from '@/screens/messages-screen';
import NotificationsScreen from '@/screens/notifications-screen';
import ProfileScreen from '@/screens/profile-screen';
import WelcomeScreen from '@/screens/welcome-screen';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

type ScreenType = 'home' | 'featuredEvents' | 'eventDetails' | 'events' | 'communities' | 'messages' | 'insider' | 'notifications' | 'profile';

export default function TabHomeScreen() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [eventBannerImage, setEventBannerImage] = useState<any | null>(null);

  const navigateToScreen = (screen: ScreenType | 'welcome') => {
    if (isTransitioning) return; // Prevent multiple rapid navigations
    
    setIsTransitioning(true);
    
    if (screen === 'welcome') {
      setShowWelcome(true);
      setCurrentScreen('home');
    } else {
      setShowWelcome(false);
      setCurrentScreen(screen);
    }
    
    // Reset transition state after a brief delay
    setTimeout(() => setIsTransitioning(false), 100);
  };

  const handleNavigation = (screen: string, params?: any) => {
    switch (screen) {
      case 'home':
      case 'eventDetails':
      case 'featuredEvents':
      case 'events':
      case 'communities':
      case 'messages':
      case 'insider':
      case 'notifications':
      case 'profile':
      case 'welcome':
        if (screen === 'eventDetails' && params?.image) {
          setEventBannerImage(params.image);
        }
        navigateToScreen(screen as ScreenType | 'welcome');
        break;
      default:
        console.log('Unknown screen:', screen);
    }
  };

  if (showWelcome) {
    return (
      <View style={styles.container}>
        <WelcomeScreen onNavigateToHome={() => navigateToScreen('home')} />
      </View>
    );
  }

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'profile':
        return (
          <ProfileScreen 
            onBack={() => navigateToScreen('home')}
            onNavigate={handleNavigation}
          />
        );
      
      case 'featuredEvents':
        return <FeaturedEventsScreen onNavigate={handleNavigation} />;
      case 'eventDetails':
        return <EventDetailsScreen onNavigate={handleNavigation} bannerImage={eventBannerImage} />;
      case 'notifications':
        return <NotificationsScreen onNavigate={handleNavigation} />;
      case 'events':
        return <EventsScreen onNavigate={handleNavigation} />;
      
      case 'communities':
        return <CommunitiesScreen onNavigate={handleNavigation} />;
      
      case 'messages':
        return <MessagesScreen onNavigate={handleNavigation} />;
      
      case 'insider':
        return <InsiderScreen onNavigate={handleNavigation} />;
      
      case 'home':
      default:
        return <HomeScreen onNavigate={handleNavigation} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.screenContainer}>
        {renderCurrentScreen()}
      </View>
      {!showWelcome && <BottomNavigation currentScreen={currentScreen} onNavigate={handleNavigation} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  screenContainer: {
    flex: 1,
    overflow: 'hidden',
  },
});
