import React, { createContext, useState, useCallback, useEffect } from 'react';

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState(localStorage.getItem('city') || '');
  const [pinCode, setPinCode] = useState(localStorage.getItem('pinCode') || '');
  const [error, setError] = useState(null);
  const [locationFetched, setLocationFetched] = useState(false); // Track if location has been fetched

  const getLocation = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            resolve({ latitude, longitude });
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject(new Error("Geolocation is not supported by this browser."));
      }
    });
  }, []);

  const fetchLocation = useCallback(async () => {
    if (!locationFetched) {
      try {
        const loc = await getLocation();
        setLocation(loc);
        setLocationFetched(true); // Update state to prevent refetching
      } catch (err) {
        setError(err);
      }
    }
  }, [getLocation, locationFetched]);

  const setCityAndPinCode = (city, pinCode) => {
    setCity(city);
    setPinCode(pinCode);
    localStorage.setItem('city', city);
    localStorage.setItem('pinCode', pinCode);
  };

  useEffect(() => {
    const storedCity = localStorage.getItem('city');
    const storedPinCode = localStorage.getItem('pinCode');
    if (storedCity && storedPinCode) {
      setCity(storedCity);
      setPinCode(storedPinCode);
    }
  }, []);

  return (
    <LocationContext.Provider value={{ location, city, pinCode, error, fetchLocation, setCityAndPinCode }}>
      {children}
    </LocationContext.Provider>
  );
};
