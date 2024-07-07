import React, { createContext, useState, useEffect } from 'react';

// יצירת Context חדש
const FavoriteContext = createContext();

// Provider שיספק את ה-context לכל הרכיבים 
export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // שימוש ב-useEffect לטעון את המועדפים מה-localStorage בעת טעינת הרכיב
  useEffect(() => {
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

  return (
    <FavoriteContext.Provider value={{ favorites, handleToggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export { FavoriteContext };
