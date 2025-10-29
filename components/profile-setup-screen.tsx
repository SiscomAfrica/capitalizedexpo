import { useCustomFonts } from '@/hooks/use-fonts';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// Progress bar component
const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>
    </View>
  );
};

// Decorative pattern component for top right
const DecorativePattern = () => {
  const squares = [
    { size: 20, top: 60, right: 20, opacity: 0.8 },
    { size: 15, top: 85, right: 45, opacity: 0.6 },
    { size: 25, top: 55, right: 50, opacity: 0.9 },
    { size: 18, top: 110, right: 25, opacity: 0.7 },
    { size: 22, top: 75, right: 75, opacity: 0.5 },
    { size: 16, top: 130, right: 55, opacity: 0.8 },
    { size: 12, top: 100, right: 15, opacity: 0.6 },
    { size: 28, top: 45, right: 80, opacity: 0.4 },
    { size: 14, top: 135, right: 35, opacity: 0.7 },
    { size: 20, top: 120, right: 80, opacity: 0.6 },
  ];

  return (
    <View style={styles.patternContainer}>
      {squares.map((square, index) => (
        <View
          key={index}
          style={[
            styles.patternSquare,
            {
              width: square.size,
              height: square.size,
              top: square.top,
              right: square.right,
              opacity: square.opacity,
            },
          ]}
        />
      ))}
    </View>
  );
};

// Profile avatar component
const ProfileAvatar = ({ onPress }: { onPress: () => void }) => {
  return (
    <View style={styles.avatarContainer}>
      <View style={styles.avatarCircle}>
        {/* Head - small white circle at top */}
        <View style={styles.avatarHead} />
        {/* Shoulders - large white semicircle at bottom */}
        <View style={styles.avatarShoulders} />
      </View>
      <TouchableOpacity style={styles.addButton} onPress={onPress}>
        <Ionicons name="add" size={24} color="#000000" />
      </TouchableOpacity>
    </View>
  );
};

interface ProfileSetupScreenProps {
  onNext: (profileData: { firstName: string; lastName: string }) => void;
  onBack?: () => void;
}

export default function ProfileSetupScreen({ onNext, onBack }: ProfileSetupScreenProps) {
  const fontsLoaded = useCustomFonts();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleNext = () => {
    if (!firstName.trim()) {
      Alert.alert('Error', 'Please fill in your first name');
      return;
    }
    
    onNext({ firstName: firstName.trim(), lastName: lastName.trim() });
  };

  const handleAvatarPress = () => {
    Alert.alert('Add Photo', 'Photo selection functionality coming soon!');
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <DecorativePattern />
      
      {/* Progress Bar */}
      <ProgressBar progress={33} />
      
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.headerText}>Nice to meet you!</Text>
          
          <Text style={styles.descriptionText}>
            Let's get your profile set up so others can connect with you.
          </Text>

          {/* Profile Avatar */}
          <View style={styles.avatarSection}>
            <ProfileAvatar onPress={handleAvatarPress} />
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* First Name Field */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>First name*</Text>
              <TextInput
                style={styles.input}
                value={firstName}
                onChangeText={setFirstName}
                placeholder="Name"
                placeholderTextColor="#999999"
                autoCapitalize="words"
                returnKeyType="next"
              />
            </View>

            {/* Last Name Field */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Last name</Text>
              <TextInput
                style={styles.input}
                value={lastName}
                onChangeText={setLastName}
                placeholder="Lastname"
                placeholderTextColor="#999999"
                autoCapitalize="words"
                returnKeyType="next"
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <TouchableOpacity 
          style={[
            styles.nextButton,
            firstName.trim() ? styles.nextButtonActive : styles.nextButtonInactive
          ]} 
          onPress={handleNext}
          activeOpacity={0.8}
        >
          <Text style={styles.nextButtonText}>NEXT</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  progressContainer: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 10,
    zIndex: 1,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E5E5E5',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#A3E635',
    borderRadius: 2,
  },
  patternContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 150,
    height: 200,
    zIndex: 0,
  },
  patternSquare: {
    position: 'absolute',
    backgroundColor: '#A3E635',
    borderRadius: 2,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 30,
    zIndex: 1,
  },
  headerText: {
    fontSize: 32,
    fontFamily: 'Poppins_600SemiBold',
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 15,
  },
  descriptionText: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    fontWeight: '400',
    color: '#333333',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 50,
    paddingHorizontal: 20,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 60,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatarCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#000000',
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarHead: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    top: 22,
  },
  avatarShoulders: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#FFFFFF',
    bottom: -25,
  },
  addButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#A3E635',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  form: {
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 35,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    fontWeight: '400',
    color: '#000000',
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#000000',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    paddingVertical: 12,
    paddingHorizontal: 0,
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 34,
    paddingTop: 20,
  },
  nextButton: {
    paddingVertical: 20,
    borderRadius: 6,
    alignItems: 'center',
  },
  nextButtonActive: {
    backgroundColor: '#A3E635',
  },
  nextButtonInactive: {
    backgroundColor: '#E5E5E5',
  },
  nextButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    fontWeight: '600',
    color: '#000000',
    letterSpacing: 0.16,
    textTransform: 'uppercase',
  },
});
