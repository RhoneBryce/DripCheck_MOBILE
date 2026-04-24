import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, KeyboardAvoidingView, ScrollView, Modal, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../constants/colors';
import styles from '../styles/SignUpScreenStyles';
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

  // STEP 1: Request Registration OTP
  const handleSignUpRequest = async () => {
    if (!name || !email || !password) {
      alert('Please fill in all fields');
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
        // Even if the email exists, the backend returns success for privacy
        setShowOtpModal(true); 
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (err) {
      alert('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // STEP 2: Verify OTP and Create Account
  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      alert('Please enter the 6-digit code');
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
        alert('Account created successfully!');
        setShowOtpModal(false);
        navigation.replace('Login');
      } else {
        alert(data.message || 'Invalid OTP');
      }
    } catch (err) {
      alert('Verification error');
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
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>

        <KeyboardAvoidingView behavior="padding" style={styles.keyboardAvoid}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.content}>
              <Text style={styles.title}>Sign Up</Text>

              {/* Input Fields */}
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
                    placeholder="Password"
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

              {/* Sign Up Button */}
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleSignUpRequest}
                disabled={loading}
                activeOpacity={0.8}
              >
                <Text style={styles.loginButtonText}>{loading ? 'Sending Code...' : 'Sign Up'}</Text>
              </TouchableOpacity>
              {/* OTP MODAL */}
              <Modal visible={showOtpModal} transparent animationType="slide">
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 }}>
                  <View style={{ backgroundColor: 'white', padding: 30, borderRadius: 15, alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Verify Email</Text>
                    <Text style={{ textAlign: 'center', color: '#666', marginBottom: 20 }}>
                      Enter the 6-digit code sent to {email}
                    </Text>
                    
                    <TextInput
                      style={{ borderBottomWidth: 1, width: '100%', fontSize: 24, textAlign: 'center', letterSpacing: 5, marginBottom: 20 }}
                      placeholder="000000"
                      keyboardType="number-pad"
                      maxLength={6}
                      value={otp}
                      onChangeText={setOtp}
                    />

                    <TouchableOpacity 
                      style={[styles.loginButton, { width: '100%' }]} 
                      onPress={handleVerifyOtp}
                      disabled={verifying}
                    >
                      {verifying ? <ActivityIndicator color="white" /> : <Text style={styles.loginButtonText}>Confirm</Text>}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setShowOtpModal(false)} style={{ marginTop: 15 }}>
                      <Text style={{ color: 'red' }}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
              {/* Already have an account? Login */}
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