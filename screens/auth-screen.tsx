/**
 * Combined Authentication Screen
 * Handles both Login and Signup with OTP verification
 */

import { Typography, useCustomFonts } from '@/hooks/use-fonts';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@/stores/auth.store';

interface AuthScreenProps {
  onNavigate?: (screen: string, params?: any) => void;
  mode?: 'login' | 'signup';
}

export default function AuthScreen({ onNavigate, mode = 'login' }: AuthScreenProps) {
  const { fontsLoaded } = useCustomFonts();
  const [authMode, setAuthMode] = useState<'login' | 'signup'>(mode);
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const codeInputRefs = useRef<(TextInput | null)[]>([]);

  const { login, register, verifyCode, isLoading, error, clearError } = useAuthStore();

  useEffect(() => {
    clearError();
  }, [authMode, step]);

  const handleSendCode = async () => {
    if (!email || !email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    const result = authMode === 'login' 
      ? await login(email)
      : await register(email);

    if (result.success) {
      setStep('code');
      Alert.alert('Success', result.message);
    } else {
      Alert.alert('Error', result.message);
    }
  };

  const handleVerifyCode = async () => {
    const fullCode = code.join('');
    if (fullCode.length !== 6) {
      Alert.alert('Error', 'Please enter the complete 6-digit code');
      return;
    }

    const result = await verifyCode(email, fullCode);
    
    if (result.success) {
      if (result.needsProfile) {
        onNavigate?.('profileCompletion');
      } else {
        onNavigate?.('home');
      }
    } else {
      Alert.alert('Error', 'Invalid verification code');
    }
  };

  const handleCodeInput = (text: string, index: number) => {
    if (text.length > 1) {
      text = text.slice(0, 1);
    }

    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 5) {
      codeInputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      codeInputRefs.current[index - 1]?.focus();
    }
  };

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#190046" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={[Typography.heading, styles.title]}>
              {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
            </Text>
            <Text style={styles.subtitle}>
              {step === 'email' 
                ? 'Enter your email to continue' 
                : 'Enter the 6-digit code sent to your email'}
            </Text>
          </View>

          {/* Email Step */}
          {step === 'email' && (
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email Address</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="mail-outline" size={20} color="#666666" style={styles.inputIcon} />
                  <TextInput
                    style={[Typography.body, styles.input]}
                    placeholder="you@example.com"
                    placeholderTextColor="#999999"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    editable={!isLoading}
                  />
                </View>
              </View>

              {error && (
                <View style={styles.errorContainer}>
                  <Ionicons name="alert-circle" size={20} color="#EF4444" />
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              )}

              <TouchableOpacity
                style={[styles.button, isLoading && styles.buttonDisabled]}
                onPress={handleSendCode}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={[Typography.body, styles.buttonText]}>Send Code</Text>
                )}
              </TouchableOpacity>

              <View style={styles.switchMode}>
                <Text style={styles.switchText}>
                  {authMode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                </Text>
                <TouchableOpacity onPress={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}>
                  <Text style={styles.switchLink}>
                    {authMode === 'login' ? 'Sign Up' : 'Log In'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Code Verification Step */}
          {step === 'code' && (
            <View style={styles.form}>
              <View style={styles.codeContainer}>
                {code.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(ref: TextInput | null) => {
                      codeInputRefs.current[index] = ref;
                    }}
                    style={[styles.codeInput, digit && styles.codeInputFilled]}
                    value={digit}
                    onChangeText={(text) => handleCodeInput(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    keyboardType="number-pad"
                    maxLength={1}
                    selectTextOnFocus
                    editable={!isLoading}
                  />
                ))}
              </View>

              <TouchableOpacity style={styles.resendButton} onPress={() => setStep('email')}>
                <Text style={styles.resendText}>Change email or resend code</Text>
              </TouchableOpacity>

              {error && (
                <View style={styles.errorContainer}>
                  <Ionicons name="alert-circle" size={20} color="#EF4444" />
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              )}

              <TouchableOpacity
                style={[styles.button, isLoading && styles.buttonDisabled]}
                onPress={handleVerifyCode}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={[Typography.body, styles.buttonText]}>Verify & Continue</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
    fontFamily: 'Poppins_700Bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    fontFamily: 'Poppins_400Regular',
  },
  form: {
    gap: 24,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'Poppins_600SemiBold',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  codeInput: {
    flex: 1,
    height: 56,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'Poppins_700Bold',
  },
  codeInputFilled: {
    borderColor: '#190046',
  },
  resendButton: {
    alignSelf: 'center',
  },
  resendText: {
    fontSize: 14,
    color: '#190046',
    fontWeight: '600',
    fontFamily: 'Poppins_600SemiBold',
  },
  button: {
    backgroundColor: '#190046',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins_600SemiBold',
  },
  switchMode: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchText: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Poppins_400Regular',
  },
  switchLink: {
    fontSize: 14,
    color: '#190046',
    fontWeight: '600',
    fontFamily: 'Poppins_600SemiBold',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FEF2F2',
    padding: 12,
    borderRadius: 8,
  },
  errorText: {
    flex: 1,
    fontSize: 14,
    color: '#EF4444',
    fontFamily: 'Poppins_400Regular',
  },
});

