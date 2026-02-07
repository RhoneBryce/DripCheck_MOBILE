import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../constants/colors';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <LinearGradient
      colors={[colors.mainWhite, colors.offWhiteBackground]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <StatusBar barStyle="dark-content" backgroundColor={colors.mainWhite} />
      
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => navigation.replace('SignUp')}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.signUpLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <KeyboardAvoidingView
          behavior="padding"
          style={styles.keyboardAvoid}
        >
          <View style={styles.content}>
            {/* Title */}
            <Text style={styles.title}>Log In</Text>

            {/* Input Fields */}
            <View style={styles.inputContainer}>
              {/* Email Input */}
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

              {/* Password Input */}
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

            {/* Forgot Password Link */}
            <TouchableOpacity
              style={styles.forgotPassword}
              onPress={() => {
                // Add forgot password logic here
                console.log('Forgot password pressed');
              }}
              hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
            >
              <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
            </TouchableOpacity>

            {/* Log In Button */}
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => {
                // Hardcoded login: user@gmail.com / 1
                if (email === 'user@gmail.com' && password === '1') {
                  navigation.replace('Dashboard');
                } else {
                  alert('Invalid credentials. Use: user@gmail.com / 1');
                }
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.loginButtonText}>Log In</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  closeButton: {
    padding: 5,
  },
  closeText: {
    fontSize: 20,
    color: colors.textPrimary,
  },
  signUpLink: {
    fontSize: 16,
    color: colors.primaryBlue,
    fontWeight: '600',
  },
  keyboardAvoid: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 40,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputWrapper: {
    backgroundColor: colors.inputBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 56,
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
  },
  showButton: {
    position: 'absolute',
    right: 16,
  },
  showButtonText: {
    color: colors.primaryBlue,
    fontSize: 14,
    fontWeight: '600',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: colors.primaryBlue,
    fontSize: 14,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: colors.primaryBlue,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primaryBlue,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  loginButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

export default LoginScreen;

