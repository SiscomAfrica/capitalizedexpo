import { useCustomFonts } from '@/hooks/use-fonts';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useRef, useEffect } from 'react';
import {
    Alert,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@/stores/auth.store';

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

export default function SignupScreen({ 
  onBack, 
  onLoginPress, 
  onAccountCreated 
}: SignupScreenProps) {
  const fontsLoaded = useCustomFonts();
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const codeInputRefs = useRef<(TextInput | null)[]>([]);

  const { register, verifyCode, isLoading, error, clearError } = useAuthStore();

  useEffect(() => {
    clearError();
  }, [step]);

  const handleSendCode = async () => {
    if (!email || !email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    if (!agreeToTerms) {
      Alert.alert('Error', 'Please agree to the terms and conditions');
      return;
    }

    const result = await register(email);
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
      // New users always need to complete profile
      onAccountCreated();
    } else {
      Alert.alert('Error', error || 'Invalid verification code');
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
    return null;
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <DecorativePattern />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => {
              if (step === 'code') {
                setStep('email');
                setCode(['', '', '', '', '', '']);
              } else {
                onBack();
              }
            }}
          >
            <Ionicons name="chevron-back" size={24} color="#000000" />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.headerText}>
            {step === 'email' ? 'Create account' : 'Verify Code'}
          </Text>
          
          <View style={styles.brandContainer}>
            <Text style={styles.brandText}>SISCOM CAPITALIZED</Text>
          </View>

          <Text style={styles.descriptionText}>
            {step === 'email' 
              ? 'Enter your email address to get started. You\'ll receive a verification code to continue.'
              : 'Enter the 6-digit code sent to your email'
            }
          </Text>

          {/* Email Step */}
          {step === 'email' && (
            <View style={styles.form}>
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
                  editable={!isLoading}
                />
              </View>

              {/* Terms Checkbox */}
              <View style={styles.termsContainer}>
                <TouchableOpacity
                  style={styles.checkbox}
                  onPress={() => setAgreeToTerms(!agreeToTerms)}
                >
                  <View style={[styles.checkboxInner, agreeToTerms && styles.checkboxChecked]}>
                    {agreeToTerms && (
                      <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                    )}
                  </View>
                </TouchableOpacity>
                <Text style={styles.termsText}>
                  By creating an account you agree to our{' '}
                  <Text style={styles.linkText}>Terms of Service</Text>,{' '}
                  <Text style={styles.linkText}>Privacy Policy</Text>, and default{' '}
                  <Text style={styles.linkText}>Notification Settings</Text>.
                </Text>
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

              <TouchableOpacity 
                style={styles.resendContainer}
                onPress={() => {
                  setStep('email');
                  setCode(['', '', '', '', '', '']);
                }}
              >
                <Text style={styles.resendText}>Change email or resend code</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Error Message */}
          {error && (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle" size={20} color="#EF4444" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <TouchableOpacity 
          style={[styles.createButton, isLoading && styles.createButtonDisabled]} 
          onPress={step === 'email' ? handleSendCode : handleVerifyCode}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#000000" />
          ) : (
            <Text style={styles.createButtonText}>
              {step === 'email' ? 'SEND CODE' : 'VERIFY & CONTINUE'}
            </Text>
          )}
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
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 24,
  },
  codeInput: {
    flex: 1,
    height: 56,
    backgroundColor: '#F5F5F5',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'Poppins_700Bold',
  },
  codeInputFilled: {
    borderColor: '#A3E635',
    backgroundColor: '#FFFFFF',
  },
  resendContainer: {
    alignSelf: 'center',
  },
  resendText: {
    fontSize: 14,
    color: '#A3E635',
    fontWeight: '600',
    fontFamily: 'Poppins_600SemiBold',
    textDecorationLine: 'underline',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 20,
  },
  checkbox: {
    marginRight: 12,
    marginTop: 2,
  },
  checkboxInner: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#A3E635',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#A3E635',
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
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FEF2F2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  errorText: {
    flex: 1,
    fontSize: 14,
    color: '#EF4444',
    fontFamily: 'Poppins_400Regular',
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
  createButtonDisabled: {
    backgroundColor: '#CCCCCC',
    opacity: 0.7,
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
