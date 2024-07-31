import React, { createContext, useState, useEffect, useMemo } from 'react';
import { db, auth } from '../database/Database'; // Adjust path as needed
import { collection, getDocs, setDoc, deleteDoc, doc, updateDoc, writeBatch } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export const Cartcontext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const localCartItems = getLocalCartItems();
        await mergeCartItems(currentUser.uid, localCartItems);
        fetchCartItems(currentUser.uid);
        clearLocalCartItems();
      } else {
        setCartItems(getLocalCartItems());
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchCartItems = async (userId) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users', userId, 'cart'));
      const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCartItems(items);
    } catch (error) {
      console.error('Error fetching cart items:', error.message);
    }
  };

  const getLocalCartItems = () => {
    const localCart = localStorage.getItem('cartItems');
    return localCart ? JSON.parse(localCart) : [];
  };

  const setLocalCartItems = (items) => {
    localStorage.setItem('cartItems', JSON.stringify(items));
  };

  const clearLocalCartItems = () => {
    localStorage.removeItem('cartItems');
  };

  const mergeCartItems = async (userId, localCartItems) => {
    if (!localCartItems.length) return;

    const firestoreCartItems = await getDocs(collection(db, 'users', userId, 'cart'));
    const firestoreCartItemsMap = firestoreCartItems.docs.reduce((acc, doc) => {
      acc[doc.id] = doc.data();
      return acc;
    }, {});

    const mergedItems = localCartItems.map(localItem => {
      const firestoreItem = firestoreCartItemsMap[localItem.id];
      if (firestoreItem) {
        firestoreItem.quantity += localItem.quantity;
        return firestoreItem;
      }
      return localItem;
    });

    const uniqueMergedItems = Object.values(
      mergedItems.reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
      }, {})
    );

    const batch = writeBatch(db);
    uniqueMergedItems.forEach(item => {
      const cartRef = doc(db, 'users', userId, 'cart', item.id);
      batch.set(cartRef, item, { merge: true });
    });

    await batch.commit();
  };

  const updateQuantity = async (id, newQuantity) => {
    if (!user) {
      const updatedItems = cartItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(updatedItems);
      setLocalCartItems(updatedItems);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );

    try {
      const cartRef = doc(db, 'users', user.uid, 'cart', id);
      await updateDoc(cartRef, { quantity: newQuantity });
    } catch (error) {
      console.error('Error updating quantity:', error.message);
    }
  };

  const addToCart = async (item) => {
    const itemId = item.asin || item.id;
    if (!itemId) {
      console.error('Invalid item or item ID missing:', item);
      return;
    }

    const addItem = (items) => {
      const existingItem = items.find(i => i.id === itemId);
      if (existingItem) {
        return items.map(i => i.id === itemId ? { ...i, quantity: i.quantity + 1 } : i);
      } else {
        return [...items, { ...item, id: itemId, quantity: 1 }];
      }
    };

    if (!user) {
      const updatedItems = addItem(cartItems);
      setCartItems(updatedItems);
      setLocalCartItems(updatedItems);
      return;
    }

    try {
      const cartRef = doc(db, 'users', user.uid, 'cart', itemId);
      await setDoc(cartRef, {
        ...item,
        quantity: 1
      }, { merge: true });

      setCartItems(prevItems => addItem(prevItems));
      console.log('Item added to cart:', item);
    } catch (error) {
      console.error('Error adding to cart:', error.message);
    }
  };

  const removeFromCart = async (itemId) => {
    if (!user) {
      const updatedItems = cartItems.filter(item => item.id !== itemId);
      setCartItems(updatedItems);
      setLocalCartItems(updatedItems);
      return;
    }

    try {
      await deleteDoc(doc(db, 'users', user.uid, 'cart', itemId));
      setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Error removing from cart:', error.message);
    }
  };

  const clearCart = async () => {
    if (!user) {
      setCartItems([]);
      clearLocalCartItems();
      return;
    }

    try {
      const batch = writeBatch(db);
      const cartRef = collection(db, 'users', user.uid, 'cart');
      const querySnapshot = await getDocs(cartRef);

      querySnapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });

      await batch.commit();
      setCartItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error.message);
    }
  };

  const cartCount = useMemo(() => cartItems.reduce((total, item) => total + (item.quantity || 1), 0), [cartItems]);

  return (
    <Cartcontext.Provider value={{ cartItems, updateQuantity, addToCart, removeFromCart, clearCart, cartCount }}>
      {children}
    </Cartcontext.Provider>
  );
};
