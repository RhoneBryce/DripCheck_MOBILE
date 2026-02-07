import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../constants/colors';

const { width, height } = Dimensions.get('window');

const LandingScreen = ({ navigation }) => {
  return (
    <LinearGradient
      colors={[colors.mainWhite, colors.offWhiteBackground]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <StatusBar barStyle="dark-content" backgroundColor={colors.mainWhite} />
      <SafeAreaView style={styles.safeArea}>
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../image_upload/DripCheckLogo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Title Section */}
        <View style={styles.titleContainer}>

          <Text style={styles.subtitle}>
            Your personal style assistant
          </Text>
        </View>

        {/* Bottom Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={() => navigation.navigate('SignUp')}
            activeOpacity={0.8}
          >
            <Text style={styles.getStartedButtonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
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
    paddingTop: StatusBar.currentHeight || 0,
  },
  logoContainer: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: height * 0.08,
  },
  logo: {
    width: 120,
    height: 120,
  },
  titleContainer: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.textPrimary,
    letterSpacing: 2,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  buttonContainer: {
    flex: 0.6,
    justifyContent: 'flex-end',
    paddingBottom: 50,
    paddingHorizontal: 24,
  },
  getStartedButton: {
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
  getStartedButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 1,
  },
});

export default LandingScreen;

