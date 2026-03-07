import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../constants/colors';
import TrendCard from '../components/TrendCard';
import { SafeAreaView } from 'react-native-safe-area-context';

// Sample trend data
const trends = [
  { id: '1', title: 'Streetwear Essentials', icon: '👟' },
  { id: '2', title: 'Vintage Vibes', icon: '🕶️' },
  { id: '3', title: 'Minimalist Chic', icon: '👗' },
  { id: '4', title: 'Urban Explorer', icon: '🧥' },
  { id: '5', title: 'Athleisure Update', icon: '👕' },
];

const TrendScreen = () => {
  return (
    <LinearGradient
      colors={[colors.offWhiteBackground, colors.mainWhite]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <StatusBar barStyle="dark-content" backgroundColor={colors.offWhiteBackground} />
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>TREND</Text>
        </View>

        {/* Vertical List of Trend Cards */}
        <FlatList
          data={trends}
          renderItem={({ item }) => <TrendCard icon={item.icon} title={item.title} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.inputBorder,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textPrimary,
    letterSpacing: 2,
  },
  listContent: {
    padding: 20,
  },
});

export default TrendScreen;

