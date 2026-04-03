import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, Linking, RefreshControl} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../constants/colors';
import styles from '../styles/TrendScreenStyles';

const TrendScreen = ({API_URL }) => {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); 

  useEffect(() => {
    fetchTrends();
  }, []);

  const fetchTrends = async () => {
    try {
      const res = await fetch(`${API_URL}/api/trends/popular`);
      const data = await res.json();
      
      if (res.ok) {
        setTrends(data.trends);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Network error:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchTrends();
    setRefreshing(false);
  }, []);

  const renderTrendCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      activeOpacity={0.9}
      onPress={() => Linking.openURL(item.url)} 
    >
      <Image 
        source={{ uri: item.urlToImage }} 
        style={styles.cardImage} 
        resizeMode="cover"
      />
      <View style={styles.cardContent}>
        <Text style={styles.sourceText} numberOfLines={1}>
          {item.source.name.toUpperCase()}
        </Text>
        <Text style={styles.titleText} numberOfLines={3}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Trending Now</Text>
        <Text style={styles.headerSubtitle}>Discover global fashion inspiration</Text>
      </View>

      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primaryBlue} />
        </View>
      ) : trends.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>No trends found right now.</Text>
        </View>
      ) : (
        <FlatList
          data={trends}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderTrendCard}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          columnWrapperStyle={styles.row} 
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={onRefresh} 
              tintColor={colors.primaryBlue} 
              colors={[colors.primaryBlue]}
            />
          }
        />
      )}
    </SafeAreaView>
  );
};


export default TrendScreen;