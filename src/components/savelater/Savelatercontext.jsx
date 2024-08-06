import React, { createContext, useState, useContext, useEffect } from 'react';

const SavedItemsContext = createContext();

export const useSavedItems = () => {
  return useContext(SavedItemsContext);
};

export const SavedItemsProvider = ({ children }) => {
  const [savedItems, setSavedItems] = useState(JSON.parse(localStorage.getItem('savedItems')) || []);
  const [savedItemsCount, setSavedItemsCount] = useState(savedItems.length);

  useEffect(() => {
    // Update saved items count on mount
    setSavedItemsCount(savedItems.length);
  }, [savedItems]);

  const saveItem = (item) => {
    const alreadySaved = savedItems.find(savedItem => savedItem.data.asin === item.data.asin);

    if (!alreadySaved) {
      const newSavedItems = [item, ...savedItems].slice(0, 10); // Limit to 10 items
      setSavedItems(newSavedItems);
      localStorage.setItem('savedItems', JSON.stringify(newSavedItems));
      setSavedItemsCount(newSavedItems.length);
    }
  };

  const getSavedItemsCount = () => {
    return savedItemsCount;
  };

  const clearSavedItemsCount = () => {
    setSavedItemsCount(0);
  };

  return (
    <SavedItemsContext.Provider value={{ savedItems, saveItem, getSavedItemsCount, clearSavedItemsCount }}>
      {children}
    </SavedItemsContext.Provider>
  );
};
