import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../constants/colors';
import ClothingCard from '../components/ClothingCard';

// Sample clothing items data
const clothingItems = [
  { id: '1', icon: '👕' },
  { id: '2', icon: '👖' },
  { id: '3', icon: '👗' },
  { id: '4', icon: '👟' },
  { id: '5', icon: '🧥' },
  { id: '6', icon: '👔' },
  { id: '7', icon: '👙' },
  { id: '8', icon: '👓' },
  { id: '9', icon: '🧣' },
];

const renderClothingItem = ({ item }) => (
  <ClothingCard icon={item.icon} />
);

const ClosetScreen = ({ setActiveTab }) => {
  return (
    <LinearGradient
      colors={[colors.offWhiteBackground, colors.mainWhite]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <StatusBar barStyle="dark-content" backgroundColor={colors.offWhiteBackground} />
      <SafeAreaView style={styles.safeArea}>
        {/* Header with Back Arrow and + Button */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setActiveTab('Home')}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.headerButtonText}>←</Text>
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>VIRTUAL CLOSET</Text>
          
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => console.log('Add item pressed')}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.headerButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* 3-Column Grid of Clothing Items */}
        <FlatList
          data={clothingItems}
          renderItem={renderClothingItem}
          keyExtractor={(item) => item.id}
          numColumns={3}
          contentContainerStyle={styles.gridContent}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.inputBorder,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerButtonText: {
    fontSize: 24,
    color: colors.primaryBlue,
    fontWeight: '300',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primaryBlue,
    letterSpacing: 1,
  },
  gridContent: {
    padding: 16,
  },
});

export default ClosetScreen;

