// components/LocationInput/LocationInput.js
import React, { useState } from 'react';
import axios from 'axios';

const LocationInput = ({ label, value, onChange, isStartingPoint }) => {
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

  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <div className="input-group">
        <input
          type="text"
          placeholder={`Choose ${label.toLowerCase()}`}
          className="form-control"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            fetchSuggestions(e.target.value);
          }}
        />
        {isLoading && <div className="loader"><div className="spinner"></div></div>}
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => onChange(suggestion.display_name)} className="suggestion-item">
                {suggestion.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default LocationInput;