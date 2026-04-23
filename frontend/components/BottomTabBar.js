import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import colors from '../constants/colors';
// Import Ionicons - the gold standard for mobile tabs
import { Ionicons } from '@expo/vector-icons'; 

const BottomTabBar = ({ activeTab, setActiveTab, user }) => {
  const tabs = [
    { id: 'Home', label: 'Home', activeIcon: 'home', inactiveIcon: 'home-outline' },
    { id: 'Closet', label: 'Closet', activeIcon: 'shirt', inactiveIcon: 'shirt-outline' },
    { id: 'Trend', label: 'Trend', activeIcon: 'sparkles', inactiveIcon: 'sparkles-outline' },
    { id: 'Profile', label: 'Profile', activeIcon: 'person', inactiveIcon: 'person-outline' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tab}
            onPress={() => setActiveTab(tab.id)}
            activeOpacity={0.8}
          >
            {/* ICON SECTION */}
            <View style={styles.iconContainer}>
              {tab.id === 'Profile' && user?.profileImage ? (
                <Image 
                  source={{ uri: user.profileImage }} 
                  style={[styles.miniProfile, isActive && styles.activeProfileBorder]} 
                />
              ) : (
                <Ionicons 
                  name={isActive ? tab.activeIcon : tab.inactiveIcon} 
                  size={24} 
                  color={colors.white} 
                  style={{ opacity: isActive ? 1 : 0.6 }}
                />
              )}
            </View>

            {/* LABEL */}
            <Text
              style={[
                styles.label,
                isActive ? styles.activeLabel : styles.inactiveLabel,
              ]}
            >
              {tab.label}
            </Text>

            {/* PAGE INDICATOR (The Dot) */}
            {isActive && <View style={styles.indicator} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.primaryBlue,
    height: 75, // Slightly taller to fit the indicator
    paddingBottom: 12,
    paddingTop: 8,
    paddingHorizontal: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative', // Necessary for the indicator positioning
  },
  iconContainer: {
    marginBottom: 2,
  },
  miniProfile: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  activeProfileBorder: {
    borderColor: colors.white,
    borderWidth: 2,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
  },
  activeLabel: {
    color: colors.white,
    opacity: 1,
  },
  inactiveLabel: {
    color: colors.white,
    opacity: 0.6,
  },
  // THE INDICATOR
  indicator: {
    position: 'absolute',
    bottom: -4, // Sits right at the bottom of the bar
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.white,
  },
});

export default BottomTabBar;