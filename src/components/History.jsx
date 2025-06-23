import React, { useState, useEffect } from 'react';
import axios from 'axios';

const History = () => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // إذا لم يكن هناك توكن، أعد توجيه المستخدم إلى صفحة تسجيل الدخول
      window.location.href = '/signin';
      return;
    }

    setLoading(true);
    axios
      .get('https://weatherhub-api.onrender.com/api/v1/history', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setHistoryData(response.data.data); // تخزين البيانات المسترجعة
      })
      .catch((error) => {
        setError('Failed to fetch history');
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Search History</h2>
      <div>
        {historyData.length > 0 ? (
          historyData.map((item, index) => (
            <div key={index} className="border-b py-2">
              <p><strong>Date:</strong> {new Date(item.requestedAt).toLocaleDateString()}</p>
              <p><strong>Latitude:</strong> {item.lat}</p>
              <p><strong>Longitude:</strong> {item.lon}</p>
              <p><strong>Temperature:</strong> {item.tempC}°C</p>
              <p><strong>Description:</strong> {item.description}</p>
            </div>
          ))
        ) : (
          <p>No history found.</p>
        )}
      </div>
    </div>
  );
};

export default History;
