import React, { useState } from 'react';
import axios from 'axios';

function WeatherPage() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGetWeather = () => {
    if (!latitude || !longitude) {
      setError('Please enter both latitude and longitude');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/';
      return;
    }

    setLoading(true);
    setError(null);

    axios.get(`https://weatherhub-api.onrender.com/api/v1/weather?lat=${latitude}&lon=${longitude}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(response => {
      setWeatherData(response.data.data);
      setLoading(false);
    })
    .catch(error => {
      setError('Error occurred while fetching weather data');
      setLoading(false);
    });
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Weather Information</h2>
      <div>
        <label>Latitude:</label>
        <input
          type="number"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter latitude"
        />
      </div>

      <div>
        <label>Longitude:</label>
        <input
          type="number"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter longitude"
        />
      </div>

      <button
        onClick={handleGetWeather}
        className="w-full bg-blue-500 text-white py-2 rounded-md mt-4"
      >
        Get Weather
      </button>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {weatherData && (
        <div>
          <p>Temperature: {weatherData.tempC}°C</p>
          <p>Humidity: {weatherData.humidity}%</p>
          <p>Description: {weatherData.description}</p>
          <p>Coordinates: Latitude: {weatherData.coordinates.lat}, Longitude: {weatherData.coordinates.lon}</p>
        </div>
      )}
    </div>
  );
}

export default WeatherPage;
