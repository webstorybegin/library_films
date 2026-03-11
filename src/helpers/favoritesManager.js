const FAVORITES_KEY = 'netflix-favorites';

export const getFavorites = () => {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading favorites:', error);
    return [];
  }
};

export const saveFavorites = (movies) => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(movies));
  } catch (error) {
    console.error('Error saving favorites:', error);
  }
};

export const addToFavorites = (movie) => {
  const favorites = getFavorites();

  // Check if movie already exists
  if (favorites.some(fav => fav.id === movie.id)) {
    return favorites;
  }

  const updatedFavorites = [...favorites, movie];
  saveFavorites(updatedFavorites);

  // Dispatch custom events
  window.dispatchEvent(new CustomEvent('favoritesUpdated', {
    detail: { favorites: updatedFavorites }
  }));
  window.dispatchEvent(new CustomEvent('showToast', {
    detail: { message: 'Added to My List', severity: 'success' }
  }));

  return updatedFavorites;
};

export const removeFromFavorites = (movieId) => {
  const favorites = getFavorites();
  const updatedFavorites = favorites.filter(movie => movie.id !== movieId);

  saveFavorites(updatedFavorites);

  // Dispatch custom events
  window.dispatchEvent(new CustomEvent('favoritesUpdated', {
    detail: { favorites: updatedFavorites }
  }));
  window.dispatchEvent(new CustomEvent('showToast', {
    detail: { message: 'Removed from My List', severity: 'info' }
  }));

  return updatedFavorites;
};

export const isFavorite = (movieId) => {
  const favorites = getFavorites();
  return favorites.some(movie => movie.id === movieId);
};

export const toggleFavorite = (movie) => {
  if (isFavorite(movie.id)) {
    return removeFromFavorites(movie.id);
  } else {
    return addToFavorites(movie);
  }
};
