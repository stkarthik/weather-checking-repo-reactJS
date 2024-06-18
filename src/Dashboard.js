import React, { useState, useEffect } from 'react';
import Search from './Search';
import WeatherDisplay from './WeatherDisplay';
import Favorites from './Favorites';
import axios from 'axios';

const Dashboard = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Load favorites from JSON Server
    axios.get('http://localhost:3001/favorites')
      .then(response => setFavorites(response.data))
      .catch(error => console.error('Error fetching favorites:', error));
  }, []);

  const fetchWeather = (city) => {
    // Fetch current weather and 5-day forecast
    const apiKey = 'YOUR_API_KEY';
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
      .then(response => setCurrentWeather(response.data))
      .catch(error => console.error('Error fetching weather:', error));

    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
      .then(response => setForecast(response.data.list))
      .catch(error => console.error('Error fetching forecast:', error));
  };

  const addFavorite = (city) => {
    axios.post('http://localhost:3001/favorites', { city })
      .then(response => setFavorites([...favorites, response.data]))
      .catch(error => console.error('Error adding favorite:', error));
  };

  const removeFavorite = (city) => {
    axios.delete(`http://localhost:3001/favorites/${city.id}`)
      .then(() => setFavorites(favorites.filter(fav => fav.id !== city.id)))
      .catch(error => console.error('Error removing favorite:', error));
  };

  return (
    <div>
      <Search onSearch={fetchWeather} />
      <WeatherDisplay currentWeather={currentWeather} forecast={forecast} />
      <Favorites favorites={favorites} onRemove={removeFavorite} />
    </div>
  );
};

export default Dashboard;