import React from 'react';

const WeatherDisplay = ({ currentWeather, forecast }) => {
  if (!currentWeather) return <div>No data available</div>;

  return (
    <div>
      <h2>{currentWeather.name}</h2>
      <p>{currentWeather.weather[0].description}</p>
      <p>Temperature: {currentWeather.main.temp}°C</p>
      <h3>5-Day Forecast</h3>
      <ul>
        {forecast.map((weather, index) => (
          <li key={index}>
            {new Date(weather.dt_txt).toLocaleDateString()} - {weather.weather[0].description} - Temp: {weather.main.temp}°C
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeatherDisplay;