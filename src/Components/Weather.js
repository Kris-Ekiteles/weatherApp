import React from 'react'
import "./Weather.css"
import search_icon from '../assets/magnifying-glass-location-solid-full.svg'
import cloud_icon from "../assets/cloud-solid-full.svg";
import sun_icon from "../assets/sun-solid-full.svg";
import humidity_icon from "../assets/temperature-half-solid-full.svg";
import wind_icon from "../assets/wind-solid-full.svg";

const Weather = () => {
    const search= async (city)=>{
       try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
          import.meta.env.REACT_APP_API_KEY}`;
          const response=await fetch(url);
          const data = await response.json();

          console.log(data);
        
       } catch (error) {
        
       }
    }
  return (
    <div className="weather">
      <div className="search-bar">
        <input type="text" placeholder="search" />
        <img src={search_icon} alt="search" />
      </div>
      <img src={cloud_icon} alt="" className="weather-icon" />
      <p className="temperature">
        16 <sup>o</sup> c
      </p>
      <p className="location">London</p>
      <div className="weather-data">
        <div className="col">
         
          <img src={humidity_icon} alt="" />
          <div>
            <p>91 %</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          
          <img src={wind_icon} alt="" />
          <div>
            <p>3.6 km/h</p>
            <span>wind speed</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather
