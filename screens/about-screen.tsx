import { useCustomFonts } from '@/hooks/use-fonts';
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
import { SafeAreaView } from 'react-native-safe-area-context';

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

interface AboutScreenProps {
  onDone: (profileData: {
    about: string;
    jobTitle: string;
    company: string;
    location: string;
  }) => void;
  onSkip: () => void;
}

export default function AboutScreen({ onDone, onSkip }: AboutScreenProps) {
  const fontsLoaded = useCustomFonts();
  const [about, setAbout] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');

  const handleDone = () => {
    if (!location.trim()) {
      Alert.alert('Error', 'Please fill in your location');
      return;
    }
    
    onDone({
      about: about.trim(),
      jobTitle: jobTitle.trim(),
      company: company.trim(),
      location: location.trim(),
    });
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView 
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <DecorativePattern />
      
      {/* Progress Bar */}
      <ProgressBar progress={66} />
      
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Tell us more about you!</Text>
          <Text style={styles.descriptionText}>
            Share a little about yourself and choose your interests
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
            {/* About Field */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>About</Text>
              <TextInput
                style={styles.input}
                value={about}
                onChangeText={setAbout}
                placeholder="Write a short introduction about yourself..."
                placeholderTextColor="#999999"
                autoCapitalize="sentences"
                returnKeyType="next"
              />
            </View>

            {/* Job Title Field */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Job Title</Text>
              <TextInput
                style={styles.input}
                value={jobTitle}
                onChangeText={setJobTitle}
                placeholder="What's your job title?"
                placeholderTextColor="#999999"
                autoCapitalize="words"
                returnKeyType="next"
              />
            </View>

            {/* Company Field */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Company</Text>
              <TextInput
                style={styles.input}
                value={company}
                onChangeText={setCompany}
                placeholder="Which company do you work at?"
                placeholderTextColor="#999999"
                autoCapitalize="words"
                returnKeyType="next"
              />
            </View>

            {/* Location Field */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                Location <Text style={styles.asterisk}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                value={location}
                onChangeText={setLocation}
                placeholder="Where are you based?"
                placeholderTextColor="#999999"
                autoCapitalize="words"
                returnKeyType="done"
              />
            </View>
        </View>
      </ScrollView>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <TouchableOpacity 
          style={[
            styles.doneButton,
            location.trim() ? styles.doneButtonActive : styles.doneButtonInactive
          ]} 
          onPress={handleDone}
          activeOpacity={0.8}
        >
          <Text style={styles.doneButtonText}>DONE</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.skipButton} onPress={onSkip}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardContainer: {
    flex: 1,
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
  header: {
    paddingTop: 40,
    paddingBottom: 30,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 32,
    fontFamily: 'Poppins_600SemiBold',
    fontWeight: '600',
    color: '#000000',
    marginBottom: 15,
  },
  descriptionText: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    fontWeight: '400',
    color: '#333333',
    lineHeight: 24,
    textAlign: 'center',
  },
  form: {
    paddingHorizontal: 24,
    paddingBottom: 40,
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
  asterisk: {
    color: '#FF0000',
    fontSize: 16,
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
    alignItems: 'center',
  },
  doneButton: {
    paddingVertical: 20,
    borderRadius: 6,
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  doneButtonActive: {
    backgroundColor: '#A3E635',
  },
  doneButtonInactive: {
    backgroundColor: '#E5E5E5',
  },
  doneButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    fontWeight: '600',
    color: '#000000',
    letterSpacing: 0.16,
    textTransform: 'uppercase',
  },
  skipButton: {
    paddingVertical: 10,
  },
  skipButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#000000',
  },
});
