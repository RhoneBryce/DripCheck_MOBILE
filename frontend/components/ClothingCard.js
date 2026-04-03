import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image} from 'react-native';
import styles from '../styles/ClothingCardStyles';
const ClothingCard = ({
  icon,
  name,
  color,
  favorite,
  imageUri,
  onPress,
  onToggleFavorite,
  onDelete,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardContent}>
        {imageUri && !imageError ? (
          <Image
            source={{ uri: imageUri }}
            style={styles.itemImage}
            resizeMode="cover"
            onError={() => {
              console.log('Failed to load clothing image:', imageUri);
              setImageError(true);
            }}
          />
        ) : (
          <Text style={styles.itemIcon}>{icon}</Text>
        )}

        <Text style={styles.itemName} numberOfLines={1}>
          {name}
        </Text>

        {color ? (
          <Text style={styles.itemColor} numberOfLines={1}>
            {color}
          </Text>
        ) : null}

        <View style={styles.cardActions}>
          <TouchableOpacity
            onPress={onToggleFavorite}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={[styles.favoriteIcon, favorite && styles.favoriteActive]}>
              {favorite ? '⭐' : '☆'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onDelete}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.deleteIcon}>🗑️</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};


export default ClothingCard;