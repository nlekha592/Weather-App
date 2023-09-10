import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './App.css';
import { format } from 'date-fns'; 

function App() {
  const [weatherData, setWeatherData] = useState({
    main: {},
    weather: [],
  });

  const [city, setCity] = useState('');

  const handleSearch = async () => {
    if (city.trim() === '') {
      alert('Please enter a city name.');
      return;
    }

    const Api = `https://api.openweathermap.org/data/2.5/weather?&appid=ca96f300f8897ca15f0fde81ad1e0337&q=${city}&units=metric`;

    try {
      let response = await Axios.get(Api);
      console.log(response.data);
      setWeatherData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    async function getdata() {
      const Api =
        'https://api.openweathermap.org/data/2.5/weather?&appid=ca96f300f8897ca15f0fde81ad1e0337&q=palakkad,india&units=metric';
      try {
        let response = await Axios.get(Api);
        console.log(response.data);
        setWeatherData(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    getdata();
  }, []);
  const currentDate = format(new Date(), 'MMMM dd, yyyy hh:mm a');

  return (
    <div className="App">
     
      <div className="main_container">
      <div className="search_bar">
          <input className='input' type="text"  placeholder="Enter a city..."  value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button className='button' onClick={handleSearch}>Search</button>
          <p className="current_date">TODAY:{currentDate}</p> 
        <div className='image'>

        </div>

        </div>
       
        <div className="card">
          <h1>{weatherData.name}</h1>
          <h1>{`${Math.round(weatherData.main.temp)}`}&deg;C</h1>
          {weatherData.weather && weatherData.weather.length > 0 ? (
            weatherData.weather.map((weather, index) => (
              <div key={index}>
                <h1>{weather.main}</h1>
                <h6>{weather.description}</h6>
              </div>
            ))
          ) : (
            <p>No weather data available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
