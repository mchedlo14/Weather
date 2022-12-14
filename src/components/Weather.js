import React, { useEffect, useRef, useState } from 'react'
import './style/Weather.css'
import Geolocation from './Geolocation';
const Weather = ({locationWeather}) => {
    const [weatherData,setWeatherData] = useState({});
    const [city,setCity] = useState('');




    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1c372f473e535d74989e5ea3c80f1f80`)
        .then(response => response.json())
        .then(data => setWeatherData(data))
    },[city])


    const inputRef = useRef(null)
    const increaseWidth = (e) => {
        let numberOfCharacters = e.target.value.length;
        if(numberOfCharacters >=3){
            let length = numberOfCharacters + 'ch'
            inputRef.current.style.width = length;
        }else{
            inputRef.current.style.width = '30px';
        }
    }


  return (
    <section className="weather-wrapper">
      <div className="input-wrapper">
        <p>Right now in</p>
        <input
          type="text"
          onInput={increaseWidth}
          ref={inputRef}
          onChange={(e) => setCity(e.target.value)}
        />
        <p>,it's clear.</p>
      </div>
      {typeof weatherData.main !== "undefined" ? (
        <div>
          <div className="information-wrapper">
            <div className="icon-container">
              <p>
                {weatherData.weather[0].main === "Clear" ? (
                  <img
                    className="condition-icon"
                    src="/images/sunny.png"
                    alt="Clear"
                  />
                ) : weatherData.weather[0].main === "Rain" ? (
                  <img
                    className="condition-icon"
                    src="/images/raining.png"
                    alt="Rain"
                  />
                ) : weatherData.weather[0].main === "Clouds" ? (
                  <img
                    className="condition-icon"
                    src="/images/cloud.png"
                    alt="Clouds"
                  />
                ) : weatherData.weather[0].main === "Snow" ? (
                  <img
                    className="condition-icon"
                    src="/images/snow.png"
                    alt="Snow"
                  />
                ) : weatherData.weather[0].main === "Mist" ? (
                  <img
                    className="condition-icon"
                    src="/images/mist.png"
                    alt="Snow"
                  />
                ) : (
                  <></>
                )}
              </p>
            </div>

            <div className="celsius-container">
              <p>
                {Math.round(weatherData.main.temp - 273.15)}
                <span className="c">??C</span>
              </p>
            </div>

            <div className="detail-information">
              <div className="detail">
                <div className="detail-icon">
                  <img className="icon-image" src="/images/wind.png" />
                </div>
                <p>
                  14 <span>mph</span>
                </p>
              </div>
              <div className="detail">
                <div className="detail-icon">
                  <img className="icon-image" src="/images/umbrella.png" />
                </div>
                <p>
                  14 <span>%</span>
                </p>
              </div>
              <div className="detail">
                <div className="detail-icon">
                  <img className="icon-image" src="/images/humidity.png" />
                </div>
                <p>
                  {weatherData.main.humidity} <span>%</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Geolocation locationWeather={locationWeather}/>
      )}
    </section>
  );
}

export default Weather