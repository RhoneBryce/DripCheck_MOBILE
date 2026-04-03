import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../constants/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/ProfileScreenStyles';

const ProfileScreen = ({user}) => {
  return (
    <LinearGradient
      colors={[colors.offWhiteBackground, colors.mainWhite]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <StatusBar barStyle="dark-content" backgroundColor={colors.offWhiteBackground} />
      <SafeAreaView style={styles.safeArea}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          {/* Large Circular Profile Picture */}
          <View style={styles.profilePicture}>
            <Text style={styles.profileIcon}>👤</Text>
          </View>

          {/* Handle */}
          <Text style={styles.handle}>{user.name}</Text>

          {/* Edit Profile Button */}
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => console.log('Edit Profile pressed')}
            activeOpacity={0.8}
          >
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Additional Profile Content */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Outfits</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>48</Text>
            <Text style={styles.statLabel}>Items</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>256</Text>
            <Text style={styles.statLabel}>Matches</Text>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};



export default ProfileScreen;

