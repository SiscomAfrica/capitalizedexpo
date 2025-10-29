import { useCustomFonts } from '@/hooks/use-fonts';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AboutScreen from './about-screen';
import LoginScreen from './login-screen';
import ProfileSetupScreen from './profile-setup-screen';
import SignupScreen from './signup-screen';

//

interface WelcomeScreenProps {
  onNavigateToHome?: () => void;
}

export default function WelcomeScreen({ onNavigateToHome }: WelcomeScreenProps = {}) {
  const { fontsLoaded } = useCustomFonts();
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'signup' | 'login' | 'profile-setup' | 'about'>('welcome');

  const handleLogin = () => {
    console.log('Login pressed');
    setCurrentScreen('login');
  };

  const handleCreateAccount = () => {
    console.log('Create Account pressed');
    setCurrentScreen('signup');
  };

  const handleBackToWelcome = () => {
    setCurrentScreen('welcome');
  };

  const handleAccountCreated = () => {
    setCurrentScreen('profile-setup');
  };

  const handleProfileSetupNext = (profileData: { firstName: string; lastName: string }) => {
    console.log('Profile data:', profileData);
    // Navigate to about screen
    setCurrentScreen('about');
  };

  const handleAboutDone = (aboutData: { about: string; jobTitle: string; company: string; location: string }) => {
    console.log('About data:', aboutData);
    // Here you would typically save all profile data and navigate to the main app
    alert(`Profile complete! Welcome to Capitalized!`);
    // Navigate to home screen after completing profile
    if (onNavigateToHome) {
      onNavigateToHome();
    }
  };

  const handleAboutSkip = () => {
    console.log('About section skipped');
    // Navigate to main app even if skipped
    alert(`Welcome to Capitalized!`);
    // Navigate to home screen after skipping
    if (onNavigateToHome) {
      onNavigateToHome();
    }
  };

  if (!fontsLoaded) {
    return null; // or a loading spinner
  }

  // Show signup screen
  if (currentScreen === 'signup') {
    return (
      <SignupScreen 
        onBack={handleBackToWelcome}
        onLoginPress={() => setCurrentScreen('login')}
        onAccountCreated={handleAccountCreated}
      />
    );
  }

  // Show profile setup screen
  if (currentScreen === 'profile-setup') {
    return (
      <ProfileSetupScreen 
        onNext={handleProfileSetupNext}
        onBack={handleBackToWelcome}
      />
    );
  }

  // Show about screen
  if (currentScreen === 'about') {
    return (
      <AboutScreen 
        onDone={handleAboutDone}
        onSkip={handleAboutSkip}
      />
    );
  }

  // Show login screen
  if (currentScreen === 'login') {
    return (
      <LoginScreen 
        onBack={handleBackToWelcome}
        onCreateAccountPress={() => setCurrentScreen('signup')}
        onLoginSuccess={() => {
          console.log('Login successful - navigating to home');
          if (onNavigateToHome) {
            onNavigateToHome();
          }
        }}
        onProfileCompletionNeeded={() => {
          console.log('Profile completion needed');
          setCurrentScreen('profile-setup');
        }}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style="light" backgroundColor="#000000" />

      {/* Content Section */}
      <View style={styles.contentSection}>
        <Text style={styles.welcomeText}>Welcome to</Text>

        <View style={styles.brandContainer}>
          <Image
            source={require('@/assets/images/image.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.brandText} numberOfLines={1} adjustsFontSizeToFit={true} minimumFontScale={0.5}>Capitalized</Text>
        </View>

        <Text style={styles.subtitleText}>
          Unlock the power of connection and navigate your Capitalized experience
        </Text>
      </View>

      {/* Buttons Section */}
      <View style={styles.buttonSection}>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>LOG IN</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.createAccountButton} onPress={handleCreateAccount}>
          <Text style={styles.createAccountButtonText}>CREATE ACCOUNT</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  contentSection: {
    flex: 1,
    alignItems: 'flex-start', // Left align content like reference
    justifyContent: 'center',
    paddingHorizontal: 28, // Slightly reduced padding to give more text space
    paddingBottom: 24,
  },
  welcomeText: {
    fontSize: 18, // small intro line
    fontFamily: 'Poppins_400Regular',
    fontWeight: '400',
    color: '#000000',
    letterSpacing: 0,
    marginBottom: 12,
    textAlign: 'left', // Left aligned like in reference
  },
  brandContainer: {
    alignItems: 'flex-start', // Left aligned like in reference
    marginBottom: 16,
    width: '100%',
    overflow: 'visible', // Ensure text isn't clipped
  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: 12,
  },
  brandText: {
    fontSize: 64,
    fontFamily: 'Poppins_800ExtraBold',
    fontWeight: '800',
    color: '#e6c79d',
    letterSpacing: -0.5,
    textAlign: 'left',
    lineHeight: 68,
    flexShrink: 0,
    flexWrap: 'nowrap',
  },
  subtitleText: {
    fontSize: 18, // supporting description
    fontFamily: 'Poppins_400Regular',
    fontWeight: '400',
    color: '#000000',
    lineHeight: 26,
    letterSpacing: 0,
    textAlign: 'left', // Left aligned like reference
    marginTop: 12,
    marginBottom: 32,
  },
  buttonSection: {
    paddingHorizontal: 28, // Match reduced content padding
    paddingBottom: 50,
    paddingTop: 20,
    gap: 15,
  },
  loginButton: {
    backgroundColor: '#e6c79d', // Updated brand button color
    paddingVertical: 20, // Slightly taller for better match
    borderRadius: 6, // Less rounded like reference
    alignItems: 'center',
    width: '100%',
  },
  loginButtonText: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    fontWeight: '600',
    letterSpacing: 0.16, // 1% of 16px
    textTransform: 'uppercase',
  },
  createAccountButton: {
    backgroundColor: '#e6c79d',
    borderWidth: 0,
    borderColor: 'transparent',
    paddingVertical: 18, // Match the visual height with login button
    borderRadius: 6, // Match login button radius
    alignItems: 'center',
    width: '100%',
  },
  createAccountButtonText: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    fontWeight: '600',
    letterSpacing: 0.16, // 1% of 16px
    textTransform: 'uppercase',
  },
});
