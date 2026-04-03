import * as FileSystem from 'expo-file-system/legacy';

export const categories = [
  'All', 'Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Footwear', 'Accessories', 'Swimwear', 'Traditional',
];

export const getCategoryIcon = (category) => {
  const icons = {
    Tops: '👕', Bottoms: '👖', Dresses: '👗', Outerwear: '🧥', Footwear: '👟', Accessories: '🧣', Swimwear: '👙', Traditional: '👘',
  };
  return icons[category] || '👕';
};

export const saveImageToDocumentStorage = async (uri) => {
  if (!uri) return '';
  try {
    if (FileSystem.documentDirectory && uri.startsWith(FileSystem.documentDirectory)) {
      return uri;
    }
    const folderPath = `${FileSystem.documentDirectory}clothing-images/`;
    const folderInfo = await FileSystem.getInfoAsync(folderPath);
    if (!folderInfo.exists) {
      await FileSystem.makeDirectoryAsync(folderPath, { intermediates: true });
    }
    const originalName = uri.split('/').pop() || 'clothing.jpg';
    const cleanName = originalName.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    const newPath = `${folderPath}${Date.now()}-${cleanName}`;
    await FileSystem.copyAsync({ from: uri, to: newPath });
    return newPath;
  } catch (error) {
    console.error('Error saving image:', error);
    throw new Error('Failed to save image locally');
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