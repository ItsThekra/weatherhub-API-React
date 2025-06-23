import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import History from '../components/History';

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
      window.location.href = '/signin'; 
      return;
    }

    setLoading(true);
    setError(null);

    axios
      .get(`https://weatherhub-api.onrender.com/api/v1/weather?lat=${latitude}&lon=${longitude}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setWeatherData(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error occurred while fetching weather data');
        setLoading(false);
      });
  };

  return (
    <div>
      <Navbar />  
      
      <div className="max-w-md mx-auto p-4">
        <h2 className="text-2xl font-bold text-center mb-4">Weather Information</h2>
        <div>
          <label className="block font-semibold">Latitude:</label>
          <input
            type="number"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            placeholder="Enter latitude"
          />
        </div>

        <div>
          <label className="block font-semibold">Longitude:</label>
          <input
            type="number"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            placeholder="Enter longitude"
          />
        </div>

        <button
          onClick={handleGetWeather}
          className="w-full bg-blue-500 text-white py-2 rounded-md mt-4"
        >
          Get Weather
        </button>

        {loading && <p className="text-center mt-4">Loading...</p>}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {weatherData && (
          <div className="mt-6">
            <div className="bg-white shadow-md p-4 rounded-lg mb-4">
              <h3 className="text-xl font-semibold mb-2">Weather Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <strong>Temperature:</strong> {weatherData.tempC}°C
                </div>
                <div>
                  <strong>Humidity:</strong> {weatherData.humidity}%
                </div>
                <div>
                  <strong>Description:</strong> {weatherData.description}
                </div>
                <div>
                  <strong>Coordinates:</strong> Latitude: {weatherData.coordinates.lat}, Longitude: {weatherData.coordinates.lon}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <History />  

      <Footer /> 
    </div>
  );
}

export default WeatherPage;
