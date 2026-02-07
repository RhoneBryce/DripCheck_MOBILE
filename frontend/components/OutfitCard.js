import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../constants/colors';

// Reusable Outfit Card Component
const OutfitCard = ({ onPress }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Outfit of the Day</Text>
      <View style={styles.placeholder}>
        <Text style={styles.icon}>👔</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
        <Text style={styles.buttonText}>Find Affordable Matches</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    flex: 1,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  placeholder: {
    width: '100%',
    height: 250,
    backgroundColor: colors.offWhiteBackground,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    fontSize: 80,
  },
  button: {
    backgroundColor: colors.primaryBlue,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    shadowColor: colors.primaryBlue,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

export default OutfitCard;

