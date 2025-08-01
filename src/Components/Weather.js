import React, { useEffect, useState } from "react";
import "./Weather.css";
import search_icon from "../assets/magnifying-glass-location-solid-full.svg";
import cloud_icon from "../assets/cloud-solid-full.svg";
import sun_icon from "../assets/sun-solid-full.svg";
import humidity_icon from "../assets/temperature-half-solid-full.svg";
import wind_icon from "../assets/wind-solid-full.svg";

const Weather = () => {
  const [weatherData, setWeatherData] = useState({
    humidity:'',
    windSpeed:'',
    temperature:'',
    location:'',
    icon:cloud_icon,
    error:null,
    loading:true
  });

  const[city, setCity]=useState("New York");

  const allIcons = {
    "01d": cloud_icon,
    "01n": wind_icon,
    "02d": sun_icon,
    "02n":cloud_icon,
    "03n":cloud_icon,
    "03d":humidity_icon,
  };

  const search = async (city) => {
    try {

      setWeatherData(prev => ({...prev, loading:true, error:null}));

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        process.env.REACT_APP_API_KEY
      }`;

      const response = await fetch(url);
      if (!response.ok){
        throw new Error("city not found");
      }

      const data = await response.json();

      // console.log(data);

      const icon = allIcons[data.weather[0].icon] || humidity_icon;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: allIcons[data.weather[0].icon] || cloud_icon,
        loading:false,
        error:null
      });
    } catch (error) {
      setWeatherData(prev => ({...prev, loading:false, error:error.message ||"failed to fetch weather data"}));
    }
  };
  useEffect(() => {
    search(city);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    search(city);
  };
  return (
    <div className="weather">
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          placeholder="search"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">
          <img src={search_icon} alt="search" />
        </button>
      </form>

      {weatherData.loading ? (
        <p>loading...</p>
      ) : weatherData.error ? (
        <p className="error">{weatherData.error}</p>
      ) : (
        <>
          <img src={weatherData.icon} alt="" className="weather-icon" />
       
      

      <p className="temperature">
        {weatherData.temperature} <sup>o</sup> c
      </p>
      <p className="location">{weatherData.location}</p>
      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="" />
          <div>
            <p>{weatherData.humidity} %</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind_icon} alt="" />
          <div>
            <p>{weatherData.windSpeed} km/h</p>
            <span>wind speed</span>
          </div>
        </div>
      </div>
      </>
      )}
    </div>
  );
};

export default Weather;
