import React, { createContext, useState, useEffect, useLayoutEffect } from 'react';

// יצירת Context חדש
export const FavoriteContext = createContext();

// Provider שיספק את ה-context לכל הרכיבים 
export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // שימוש ב-useLayoutEffect לטעון את המועדפים מה-localStorage בעת טעינת הרכיב
  useLayoutEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  // פונקציה להוספה או הסרה של משתמש מהמועדפים
  const handleToggleFavorite = (employee) => {
    const updatedFavorites = favorites.some(fav => fav.login.uuid === employee.login.uuid)
      ? favorites.filter(fav => fav.login.uuid !== employee.login.uuid)
      : [...favorites, employee];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  // פונקציה לאיפוס כל המועדפים
  const resetFavorites = () => {
    setFavorites([]);
    localStorage.setItem('favorites', JSON.stringify([]));
  };

  const globalValue = {
    favorites,
    handleToggleFavorite,
    resetFavorites
  };

  return (
    <FavoriteContext.Provider value={globalValue}>
      {children}
    </FavoriteContext.Provider>
  );
};
