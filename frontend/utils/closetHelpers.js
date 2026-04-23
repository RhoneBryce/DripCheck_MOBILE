import * as FileSystem from 'expo-file-system/legacy';
import { Platform } from 'react-native';


export const categories = [
  'All', 'Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Footwear', 'Accessories', 'Swimwear', 'Traditional',
];

export const getCategoryIcon = (category) => {
  const icons = {
    Tops: '👕', Bottoms: '👖', Dresses: '👗', Outerwear: '🧥', Footwear: '👟', Accessories: '🧣', Swimwear: '👙', Traditional: '👘',
  };
  return icons[category] || '👕';
};

export const uploadImageToCloudinary = async (localUri) => {
  try {
    const data = new FormData();
    
    if (Platform.OS === 'web') {
      // THE FIX FOR WEB:
      // We must fetch the blob data and convert it to a format Cloudinary understands
      const response = await fetch(localUri);
      const blob = await response.blob();
      
      // Append the actual blob file
      data.append('file', blob);
    } else {
      // Standard Mobile Logic
      data.append('file', {
        uri: localUri,
        type: 'image/jpeg',
        name: 'upload.jpg',
      });
    }
    
    data.append('upload_preset', process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
    data.append('cloud_name', process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME);

    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

    const res = await fetch(cloudinaryUrl, {
      method: 'POST',
      body: data,
    });

    const cloudData = await res.json();

    if (cloudData.error) {
      console.error("Cloudinary Error:", cloudData.error.message);
      return null;
    }

    return cloudData.secure_url;
  } catch (error) {
    console.error("Upload process failed:", error);
    return null;
  }
};

// --- PURE API FUNCTIONS ---

export const apiFetchClothing = async (API_URL, userId) => {
  const response = await fetch(`${API_URL}/api/clothing?userId=${userId}`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to fetch items');
  return data.map((item) => ({ id: item._id, ...item }));
};

export const apiCreateClothing = async (API_URL, userId, payload) => {
  const response = await fetch(`${API_URL}/api/clothing`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload, userId }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to create item');
  return data;
};

export const apiUpdateClothing = async (API_URL, userId, id, payload) => {
  const response = await fetch(`${API_URL}/api/clothing/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload, userId }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to update item');
  return data;
};

export const apiDeleteClothing = async (API_URL, userId, itemId) => {
  const response = await fetch(`${API_URL}/api/clothing/${itemId}?userId=${userId}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to delete item');
  return data;
};

export const apiToggleFavorite = async (API_URL, userId, itemId, isFavorite) => {
  const response = await fetch(`${API_URL}/api/clothing/${itemId}/favorite`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, favorite: isFavorite }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to update favorite');
  return data;
};