import React from 'react'
import "./Weather.css"
import search_icon from '../assets/magnifying-glass-location-solid-full.svg'
import cloud_icon from "../assets/cloud-solid-full.svg";
import sun_icon from "../assets/sun-solid-full.svg";
import humidity_icon from "../assets/temperature-half-solid-full.svg";
import wind_icon from "../assets/wind-solid-full.svg";

const Weather = () => {
  return (
    <div className="weather">
      <div className="search-bar">
        <input type="text" placeholder="search" />
        <img src={search_icon} alt="search" />
      </div>
      <img src={cloud_icon} alt="" className="weather-icon" />
      <p className='temperature'>
        16 <sup>o</sup> celcius
      </p>
    </div>
  );
}

export default Weather
