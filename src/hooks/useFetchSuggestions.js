// hooks/useFetchSuggestions.js
import { useState } from 'react';
import axios from 'axios';

const useFetchSuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&countrycodes=fr`);
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { suggestions, isLoading, fetchSuggestions };
};

export default useFetchSuggestions;