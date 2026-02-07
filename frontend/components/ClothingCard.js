import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';

// Reusable Clothing Card Component
const ClothingCard = ({ icon, size = 'medium' }) => {
  const cardSize = size === 'large' ? 120 : size === 'small' ? 80 : 100;

  return (
    <View style={[styles.card, { width: cardSize, height: cardSize }]}>
      <Text style={styles.icon}>{icon}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.offWhiteBackground,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.inputBorder,
    margin: 4,
  },
  icon: {
    fontSize: 40,
  },
});

export default ClothingCard;

