import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../constants/colors';

const BottomTabBar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'Home', label: 'Home', icon: '⌂' },
    { id: 'Closet', label: 'Closet', icon: '衣' },
    { id: 'Trend', label: 'Trend', icon: '↑' },
    { id: 'Profile', label: 'Profile', icon: '○' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={styles.tab}
          onPress={() => setActiveTab(tab.id)}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.icon,
              activeTab === tab.id ? styles.activeIcon : styles.inactiveIcon,
            ]}
          >
            {tab.icon}
          </Text>
          <Text
            style={[
              styles.label,
              activeTab === tab.id ? styles.activeLabel : styles.inactiveLabel,
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.primaryBlue,
    height: 70,
    paddingBottom: 10,
    paddingTop: 8,
    paddingHorizontal: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 22,
    marginBottom: 2,
  },
  activeIcon: {
    opacity: 1,
  },
  inactiveIcon: {
    opacity: 0.5,
  },
  label: {
    fontSize: 11,
    fontWeight: '500',
  },
  activeLabel: {
    color: colors.white,
    opacity: 1,
  },
  inactiveLabel: {
    color: colors.white,
    opacity: 0.6,
  },
});

export default BottomTabBar;

