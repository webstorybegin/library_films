import { useState, useEffect } from 'react';
import {
  getFavorites,
  addToFavorites as addToFavoritesHelper,
  removeFromFavorites as removeFromFavoritesHelper,
  isFavorite as isFavoriteHelper,
  toggleFavorite as toggleFavoriteHelper
} from '../helpers/favoritesManager';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Load initial favorites
    setFavorites(getFavorites());

    // Listen for favorites updates
    const handleFavoritesUpdated = (event) => {
      setFavorites(event.detail.favorites);
    };

    window.addEventListener('favoritesUpdated', handleFavoritesUpdated);

    return () => {
      window.removeEventListener('favoritesUpdated', handleFavoritesUpdated);
    };
  }, []);

  return {
    favorites,
    addToFavorites: addToFavoritesHelper,
    removeFromFavorites: removeFromFavoritesHelper,
    isFavorite: isFavoriteHelper,
    toggleFavorite: toggleFavoriteHelper
  };
};
