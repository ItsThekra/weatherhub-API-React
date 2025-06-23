import React from 'react';
import WeatherCard from '../components/WeatherCard';
// import UserForm from '../components/UserForm';
// import HistoryCard from '../components/HistoryCard';

function HomePage() {
  return (
    <div>
      <h1>Wellcome to weatherHub API</h1>
      {/* <UserForm /> */}
      <WeatherCard />
      {/* <HistoryCard /> */}
    </div>
  );
}

export default HomePage;
