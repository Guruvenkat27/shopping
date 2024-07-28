import React, { createContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Create the context
export const SearchContext = createContext();

// Create a provider component
export const SearchProvider = ({ children }) => {
  const navigate = useNavigate(); // Corrected hook
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const performSearch = async (query) => {
    setLoading(true);
    setError(null);

    const options = {
      method: 'GET',
      url: 'https://real-time-amazon-data.p.rapidapi.com/search',
      params: {
        query: `${query}`,
        page: '1',
        country: 'US',
        sort_by: 'RELEVANCE',
        product_condition: 'ALL'
      },
      headers: {
        'x-rapidapi-key': '739ce0b840msh494d1fdebf6c234p1c67a6jsn9ab49d0394d4',
        'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setResults(response.data);
      console.log(response);
      localStorage.setItem("productsdata", JSON.stringify(response.data));
      navigate('/products');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        results,
        loading,
        error,
        performSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
