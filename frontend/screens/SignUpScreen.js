import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView, ScrollView, Modal, ActivityIndicator, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../constants/colors';
import styles from '../styles/SignUpScreenStyles';
import { Platform } from 'react-native';
const API_URL = process.env.EXPO_PUBLIC_API_URL;

const SignUpScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // OTP States
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [verifying, setVerifying] = useState(false);

  // Helper function to validate email format
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  // STEP 1: Request Registration OTP
  const handleSignUpRequest = async () => {
    // 1. Check for empty fields
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Validation Error', 'Please fill in all fields');
      return;
    }

    // 2. Validate Email Format
    if (!validateEmail(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address');
      return;
    }

    // 3. Validate Password Length (8 characters)
    if (password.length < 8) {
      Alert.alert('Validation Error', 'Password must be at least 8 characters long');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setShowOtpModal(true); 
      } else {
        Alert.alert('Registration Failed', data.message || 'Something went wrong');
      }
    } catch (err) {
      Alert.alert('Network Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  // STEP 2: Verify OTP and Create Account
  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      Alert.alert('Invalid Code', 'Please enter the 6-digit code');
      return;
    }

    setVerifying(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/verify-registration`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (res.ok) {
        Alert.alert('Success', 'Account created successfully!');
        setShowOtpModal(false);
        navigation.replace('Login');
      } else {
        Alert.alert('Error', data.message || 'Invalid OTP');
      }
    } catch (err) {
      Alert.alert('Error', 'Verification failed. Please try again.');
    } finally {
      setVerifying(false);
    }
  };

  return (
    <LinearGradient
      colors={[colors.mainWhite, colors.offWhiteBackground]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <StatusBar barStyle="dark-content" backgroundColor={colors.mainWhite} />
      <SafeAreaView style={styles.authSafeArea}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              } else {
                navigation.replace('Login'); // ✅ Fallback so it never crashes
              }
            }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>

        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardAvoid}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.content}>
              <Text style={styles.title}>Sign Up</Text>

              <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="Name"
                    placeholderTextColor={colors.textLight}
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor={colors.textLight}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="Password (min. 8 chars)"
                    placeholderTextColor={colors.textLight}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    style={styles.showButton}
                    onPress={() => setShowPassword(!showPassword)}
                    hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
                  >
                    <Text style={styles.showButtonText}>
                      {showPassword ? 'Hide' : 'Show'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleSignUpRequest}
                disabled={loading}
                activeOpacity={0.8}
              >
                <Text style={styles.loginButtonText}>{loading ? 'Sending Code...' : 'Sign Up'}</Text>
              </TouchableOpacity>

              <Modal visible={showOtpModal} transparent animationType="fade">
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', padding: 20 }}>
                  <View style={{ backgroundColor: 'white', padding: 30, borderRadius: 20, alignItems: 'center', elevation: 5 }}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10, color: '#333' }}>Verify Email</Text>
                    <Text style={{ textAlign: 'center', color: '#666', marginBottom: 25, lineHeight: 20 }}>
                      We sent a 6-digit code to{"\n"}<Text style={{fontWeight: 'bold', color: '#333'}}>{email}</Text>
                    </Text>
                    
                    <TextInput
                      style={{ 
                        borderBottomWidth: 2, 
                        borderColor: colors.primary || '#000',
                        width: '80%', 
                        fontSize: 32, 
                        textAlign: 'center', 
                        letterSpacing: 8, 
                        marginBottom: 30,
                        color: '#333'
                      }}
                      placeholder="000000"
                      placeholderTextColor="#ccc"
                      keyboardType="number-pad"
                      maxLength={6}
                      value={otp}
                      onChangeText={setOtp}
                    />

                    <TouchableOpacity 
                      style={[styles.loginButton, { width: '100%', marginBottom: 15 }]} 
                      onPress={handleVerifyOtp}
                      disabled={verifying}
                    >
                      {verifying ? <ActivityIndicator color="white" /> : <Text style={styles.loginButtonText}>Confirm</Text>}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { setShowOtpModal(false); setOtp(''); }} style={{ padding: 10 }}>
                      <Text style={{ color: '#FF3B30', fontWeight: '600' }}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>

              <View style={styles.alreadyAccountContainer}>
                <Text style={styles.alreadyAccountText}>Already have an Account? </Text>
                <TouchableOpacity
                  onPress={() => navigation.replace('Login')}
                  hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
                >
                  <Text style={styles.loginLinkText}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SignUpScreen;