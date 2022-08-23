import React, { useEffect, useRef, useState } from 'react'
import './style/Weather.css'
const Weather = () => {
    const [weatherData,setWeatherData] = useState({});
    const [city,setCity] = useState('');
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null)
    const [locationWeather,setLocationWeather] = useState({});
    const [status, setStatus] = useState(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setStatus('Geolocation is not supported by your browser');
          } else {
            setStatus('Locating...');
            navigator.geolocation.getCurrentPosition((position) => {
              setStatus(null);
              setLat(position.coords.latitude);
              setLng(position.coords.longitude);
            }, () => {
              setStatus('Unable to retrieve your location');
            });
          }
    },[])

    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=7c670146e0f9b6f274b52e8513984eb5`)
        .then(response => response.json())
        .then(data => setLocationWeather(data))
    })

    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7c670146e0f9b6f274b52e8513984eb5`)
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
      {typeof weatherData.main !== "undefined" ? (
        <div>
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
                <span className="c">°C</span>
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
      ) : typeof locationWeather.main !== "undefined" ? (
        <div>
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
        <div className="information-wrapper">
          <div className="icon-container">
            <p>
              {locationWeather.weather[0].main === "Clear" ? (
                <img
                  className="condition-icon"
                  src="/images/sunny.png"
                  alt="Clear"
                />
              ) : locationWeather.weather[0].main === "Rain" ? (
                <img
                  className="condition-icon"
                  src="/images/raining.png"
                  alt="Rain"
                />
              ) : locationWeather.weather[0].main === "Clouds" ? (
                <img
                  className="condition-icon"
                  src="/images/cloud.png"
                  alt="Clouds"
                />
              ) : locationWeather.weather[0].main === "Snow" ? (
                <img
                  className="condition-icon"
                  src="/images/snow.png"
                  alt="Snow"
                />
              ) : locationWeather.weather[0].main === "Mist" ? (
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
              {Math.round(locationWeather.main.temp - 273.15)}
              <span className="c">°C</span>
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
                {locationWeather.main.humidity} <span>%</span>
              </p>
            </div>
          </div>
        </div>
        </div>
      ) : (
        <></>
      )}
    </section>
  );
}

export default Weather