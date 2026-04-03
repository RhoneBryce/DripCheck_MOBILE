import React from 'react';
import { View, Text, TouchableOpacity, Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../constants/colors';
import styles from '../styles/LandingScreenStyles';

const LandingScreen = ({ navigation }) => (
  <LinearGradient
    colors={[colors.mainWhite, colors.offWhiteBackground]}
    style={styles.container}
    start={{ x: 0, y: 0 }}
    end={{ x: 0, y: 1 }}
  >
    <SafeAreaView style={styles.landingSafeArea}>
      <View style={styles.landingContent}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../image_upload/DripCheckLogo.png')} // Fixed relative path
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>HELLO I'M</Text>
          <Text style={styles.subtitle}>Your personal style assistant</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('SignUp')}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  </LinearGradient>
);



export default LandingScreen;