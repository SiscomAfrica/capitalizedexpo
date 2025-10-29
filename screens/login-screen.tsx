import { useCustomFonts } from '@/hooks/use-fonts';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Decorative pattern component for top right (same as signup)
const DecorativePattern = () => {
  const squares = [
    { size: 20, top: 20, right: 20, opacity: 0.8 },
    { size: 15, top: 45, right: 45, opacity: 0.6 },
    { size: 25, top: 15, right: 50, opacity: 0.9 },
    { size: 18, top: 70, right: 25, opacity: 0.7 },
    { size: 22, top: 35, right: 75, opacity: 0.5 },
    { size: 16, top: 90, right: 55, opacity: 0.8 },
    { size: 12, top: 60, right: 15, opacity: 0.6 },
    { size: 28, top: 5, right: 80, opacity: 0.4 },
    { size: 14, top: 95, right: 35, opacity: 0.7 },
    { size: 20, top: 80, right: 80, opacity: 0.6 },
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

interface LoginScreenProps {
  onBack: () => void;
  onCreateAccountPress: () => void;
  onLoginSuccess: () => void;
}

export default function LoginScreen({ onBack, onCreateAccountPress, onLoginSuccess }: LoginScreenProps) {
  const fontsLoaded = useCustomFonts();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    setIsLoggingIn(true);
    console.log('Logging in with:', { email, password });
    // In a real app, you would validate credentials with your backend here
    // For now, we'll just simulate a successful login and navigate directly
    setTimeout(() => {
      setIsLoggingIn(false);
      onLoginSuccess();
    }, 1000); // Small delay to simulate network request
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Password reset functionality coming soon!');
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <DecorativePattern />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="chevron-back" size={24} color="#000000" />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.headerText}>Log in</Text>
          
          <View style={styles.brandContainer}>
            <Text style={styles.brandText}>SISCOM CAPITALIZED</Text>
          </View>

          <Text style={styles.descriptionText}>
            If you've purchased a SISCOM Conference 2025 ticket, use the same email address and password below.
          </Text>

          {/* Form */}
          <View style={styles.form}>
            {/* Email Field */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email address</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="email@gmail.com"
                placeholderTextColor="#999999"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>

            {/* Password Field */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••••"
                  placeholderTextColor="#999999"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={20}
                    color="#666666"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Forgot Password Link */}
            <TouchableOpacity 
              style={styles.forgotPasswordContainer}
              onPress={handleForgotPassword}
            >
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <TouchableOpacity 
          style={[styles.loginButton, isLoggingIn && styles.loginButtonDisabled]} 
          onPress={handleLogin}
          disabled={isLoggingIn}
        >
          <Text style={styles.loginButtonText}>
            {isLoggingIn ? 'LOGGING IN...' : 'LOG IN'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.createAccountLink} onPress={onCreateAccountPress}>
          <Text style={styles.createAccountLinkText}>
            Don't have an account?{' '}
            <Text style={styles.createAccountAccent}>Create account</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  patternContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 150,
    height: 150,
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
    paddingTop: 50,
    paddingHorizontal: 24,
    paddingBottom: 20,
    zIndex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  content: {
    paddingHorizontal: 24,
    zIndex: 1,
  },
  headerText: {
    fontSize: 32,
    fontFamily: 'Poppins_600SemiBold',
    fontWeight: '600',
    color: '#000000',
    marginBottom: 20,
  },
  brandContainer: {
    marginBottom: 25,
  },
  brandText: {
    fontSize: 28,
    fontFamily: 'Poppins_800ExtraBold',
    fontWeight: '800',
    color: '#000000',
    letterSpacing: -0.5,
    textTransform: 'uppercase',
  },
  descriptionText: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    fontWeight: '400',
    color: '#333333',
    lineHeight: 24,
    marginBottom: 40,
  },
  form: {
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 30,
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#000000',
    paddingVertical: 12,
    paddingHorizontal: 0,
  },
  eyeIcon: {
    padding: 8,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginTop: 15,
  },
  forgotPasswordText: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#000000',
    textDecorationLine: 'underline',
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 34,
    paddingTop: 20,
  },
  loginButton: {
    backgroundColor: '#E5E5E5', // Gray button like in reference
    paddingVertical: 20,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonDisabled: {
    backgroundColor: '#CCCCCC',
    opacity: 0.7,
  },
  loginButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    fontWeight: '600',
    color: '#000000',
    letterSpacing: 0.16,
    textTransform: 'uppercase',
  },
  createAccountLink: {
    alignItems: 'center',
  },
  createAccountLinkText: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#000000',
  },
  createAccountAccent: {
    color: '#A3E635', // Green accent like reference
    fontFamily: 'Poppins_600SemiBold',
    fontWeight: '600',
  },
});
