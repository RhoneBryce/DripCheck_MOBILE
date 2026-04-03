import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, Linking, RefreshControl, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../constants/colors';
import styles from '../styles/TrendScreenStyles';

// 1. Define our style categories (Reddit subreddits)
const STYLE_CATEGORIES = [
  { id: 'OUTFITS', label: 'All Fits' },
  { id: 'streetwear', label: 'Streetwear' },
  { id: 'SneakerFits', label: 'Sneakers' },
  { id: 'womensstreetwear', label: 'Womens' },
  { id: 'techwearclothing', label: 'Techwear' },
  { id: 'ThriftStoreHauls', label: 'Thrifted' }
];

const TrendScreen = () => {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); 
  
  // 2. Track the currently selected category
  const [activeCategory, setActiveCategory] = useState(STYLE_CATEGORIES[0].id);

  // 3. Re-fetch whenever the activeCategory changes
  useEffect(() => {
    fetchRedditTrends();
  }, [activeCategory]);

  const fetchRedditTrends = async () => {
    setLoading(true);
    setTrends([]); // Clear old images while loading new ones

    try {
      // 4. Inject the activeCategory into the Reddit URL dynamically
      const res = await fetch(`https://www.reddit.com/r/${activeCategory}/hot.json?limit=50`);
      const json = await res.json();
      
      if (json && json.data && json.data.children) {
        const validImagePosts = json.data.children
          .map(child => child.data)
          .filter(post => post.post_hint === 'image' || (post.url && post.url.match(/\.(jpeg|jpg|png)$/i)))
          .map(post => ({
            id: post.id,
            title: post.title,
            imageUrl: post.url,
            author: post.author,
            postLink: `https://www.reddit.com${post.permalink}` 
          }));

        setTrends(validImagePosts);
      }
    } catch (error) {
      console.error('Reddit fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchRedditTrends();
    setRefreshing(false);
  }, [activeCategory]);

  const renderTrendCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      activeOpacity={0.9}
      onPress={() => Linking.openURL(item.postLink)} 
    >
      <Image 
        source={{ uri: item.imageUrl }} 
        style={styles.cardImage} 
        resizeMode="cover"
      />
      <View style={styles.cardContent}>
        <Text style={styles.sourceText} numberOfLines={1}>
          u/{item.author.toUpperCase()}
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
        <Text style={styles.headerTitle}>Trending</Text>
        <Text style={styles.headerSubtitle}>Popular Outfit Posts</Text>
      </View>

      <View style={styles.categoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
          {STYLE_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[styles.categoryChip, isActive && styles.categoryChipActive]}
                onPress={() => setActiveCategory(cat.id)}
              >
                <Text style={[styles.categoryText, isActive && styles.categoryTextActive]}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {loading && !refreshing ? (
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
          keyExtractor={(item) => item.id}
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