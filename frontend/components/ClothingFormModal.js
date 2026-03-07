import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  Image,
  StyleSheet,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from '../styles/ClosetScreenStyles';
import colors from '../constants/colors';

const weatherOptions = ['hot', 'warm', 'cold', 'rainy'];
const layerWeights = ['light', 'medium', 'heavy'];
const occasionOptions = ['casual', 'school', 'formal', 'sports'];

const ClothingFormModal = ({
  visible,
  editingItem,
  itemForm,
  setItemForm,
  onSave,
  onClose,
  categories,
  getCategoryIcon,
}) => {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [itemForm.imageUri, visible]);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert('Permission required to access photos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.7,
    });

    if (!result.canceled) {
      setImageError(false);
      setItemForm({
        ...itemForm,
        imageUri: result.assets[0].uri,
      });
    }
  };

  const toggleWeatherTag = (tag) => {
    const selected = itemForm.weatherTags.includes(tag);

    const updatedTags = selected
      ? itemForm.weatherTags.filter((t) => t !== tag)
      : [...itemForm.weatherTags, tag];

    setItemForm({ ...itemForm, weatherTags: updatedTags });
  };

  const showImage = itemForm.imageUri && !imageError;

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {editingItem ? 'Edit Item' : 'Add New Item'}
            </Text>

            <TouchableOpacity onPress={onClose}>
              <Text style={styles.modalClose}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableOpacity
              style={localStyles.imagePickerContainer}
              onPress={pickImage}
              activeOpacity={0.85}
            >
              {showImage ? (
                <>
                  <Image
                    source={{ uri: itemForm.imageUri }}
                    style={localStyles.previewImage}
                    resizeMode="cover"
                    onError={() => setImageError(true)}
                  />
                  <Text style={localStyles.helperText}>Tap to replace image</Text>
                </>
              ) : (
                <>
                  <View style={localStyles.placeholderBox}>
                    <Text style={localStyles.placeholderIcon}>🖼️</Text>
                  </View>

                  <Text style={localStyles.placeholderTitle}>
                    {itemForm.imageUri ? 'Image not found' : 'No image selected'}
                  </Text>
                  <Text style={localStyles.placeholderSubtitle}>
                    Tap to Upload
                  </Text>
                </>
              )}
            </TouchableOpacity>

            <View style={styles.inputContainer}>
              <Text style={styles.modalLabel}>Name *</Text>
              <TextInput
                style={styles.modalInput}
                value={itemForm.name}
                onChangeText={(text) =>
                  setItemForm({ ...itemForm, name: text })
                }
                placeholder="e.g., Blue T-Shirt"
                placeholderTextColor={colors.textSecondary}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.modalLabel}>Category</Text>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.categoryOption,
                      itemForm.category === category &&
                        styles.categoryOptionActive,
                    ]}
                    onPress={() => setItemForm({ ...itemForm, category })}
                  >
                    <Text
                      style={[
                        styles.categoryOptionText,
                        itemForm.category === category &&
                          styles.categoryOptionTextActive,
                      ]}
                    >
                      {getCategoryIcon(category)} {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.modalLabel}>Color</Text>

              <TextInput
                style={styles.modalInput}
                value={itemForm.color}
                onChangeText={(text) =>
                  setItemForm({ ...itemForm, color: text })
                }
                placeholder="e.g., Blue, Black, Red"
                placeholderTextColor={colors.textSecondary}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.modalLabel}>Suitable Weather *</Text>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {weatherOptions.map((tag) => {
                  const selected = itemForm.weatherTags.includes(tag);

                  return (
                    <TouchableOpacity
                      key={tag}
                      style={[
                        styles.categoryOption,
                        selected && styles.categoryOptionActive,
                      ]}
                      onPress={() => toggleWeatherTag(tag)}
                    >
                      <Text
                        style={[
                          styles.categoryOptionText,
                          selected && styles.categoryOptionTextActive,
                        ]}
                      >
                        {tag}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.modalLabel}>Layer Weight</Text>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {layerWeights.map((weight) => (
                  <TouchableOpacity
                    key={weight}
                    style={[
                      styles.categoryOption,
                      itemForm.layerWeight === weight &&
                        styles.categoryOptionActive,
                    ]}
                    onPress={() =>
                      setItemForm({ ...itemForm, layerWeight: weight })
                    }
                  >
                    <Text
                      style={[
                        styles.categoryOptionText,
                        itemForm.layerWeight === weight &&
                          styles.categoryOptionTextActive,
                      ]}
                    >
                      {weight}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.modalLabel}>Occasion</Text>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {occasionOptions.map((occasion) => (
                  <TouchableOpacity
                    key={occasion}
                    style={[
                      styles.categoryOption,
                      itemForm.occasion === occasion &&
                        styles.categoryOptionActive,
                    ]}
                    onPress={() =>
                      setItemForm({ ...itemForm, occasion })
                    }
                  >
                    <Text
                      style={[
                        styles.categoryOptionText,
                        itemForm.occasion === occasion &&
                          styles.categoryOptionTextActive,
                      ]}
                    >
                      {occasion}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={onSave}
            >
              <Text style={styles.saveButtonText}>
                {editingItem ? 'Update Item' : 'Add to Closet'}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const localStyles = StyleSheet.create({
  imagePickerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  previewImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
    backgroundColor: '#D9D9D9',
  },
  helperText: {
    marginTop: 8,
    fontSize: 12,
    color: colors.primaryBlue,
    fontWeight: '600',
  },
  placeholderBox: {
    width: 120,
    height: 120,
    borderRadius: 12,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  placeholderIcon: {
    fontSize: 32,
    color: '#7A7A7A',
  },
  placeholderTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  placeholderSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 2,
  },
});

export default ClothingFormModal;