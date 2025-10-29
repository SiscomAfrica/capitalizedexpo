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

// Decorative pattern component for top right
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

interface SignupScreenProps {
  onBack: () => void;
  onLoginPress: () => void;
  onAccountCreated: () => void;
}

export default function SignupScreen({ onBack, onLoginPress, onAccountCreated }: SignupScreenProps) {
  const fontsLoaded = useCustomFonts();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(true);

  const handleCreateAccount = () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    if (!agreeToTerms) {
      Alert.alert('Error', 'Please agree to the terms and conditions');
      return;
    }
    
    console.log('Creating account with:', { email, password });
    // Navigate to profile setup instead of showing alert
    onAccountCreated();
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
          <Text style={styles.headerText}>Create account</Text>
          
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
                  placeholder="Password"
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

            {/* Confirm Password Field */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirm password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Confirm password"
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Ionicons
                    name={showConfirmPassword ? 'eye-off' : 'eye'}
                    size={20}
                    color="#666666"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Terms Checkbox */}
            <View style={styles.termsContainer}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => setAgreeToTerms(!agreeToTerms)}
              >
                <Ionicons
                  name={agreeToTerms ? 'checkmark' : 'square-outline'}
                  size={20}
                  color={agreeToTerms ? '#FFFFFF' : '#A3E635'}
                />
              </TouchableOpacity>
              <Text style={styles.termsText}>
                By creating an account you agree to our{' '}
                <Text style={styles.linkText}>Terms of Service</Text>,{' '}
                <Text style={styles.linkText}>Privacy Policy</Text>, and default{' '}
                <Text style={styles.linkText}>Notification Settings</Text>.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.createButton} onPress={handleCreateAccount}>
          <Text style={styles.createButtonText}>CREATE ACCOUNT</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginLink} onPress={onLoginPress}>
          <Text style={styles.loginLinkText}>
            I have an account. <Text style={styles.loginLinkAccent}>Log in</Text>
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
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    backgroundColor: '#A3E635',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#333333',
    lineHeight: 20,
  },
  linkText: {
    color: '#A3E635',
    textDecorationLine: 'underline',
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 34,
    paddingTop: 20,
  },
  createButton: {
    backgroundColor: '#A3E635',
    paddingVertical: 20,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 20,
  },
  createButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    fontWeight: '600',
    color: '#000000',
    letterSpacing: 0.16,
    textTransform: 'uppercase',
  },
  loginLink: {
    alignItems: 'center',
  },
  loginLinkText: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#333333',
  },
  loginLinkAccent: {
    color: '#A3E635',
    fontFamily: 'Poppins_600SemiBold',
    fontWeight: '600',
  },
});
