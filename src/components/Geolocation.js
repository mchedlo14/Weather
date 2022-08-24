import React,{useEffect, useRef, useState} from 'react'

const Geolocation = ({locationWeather}) => {
        
  return (
    <section>
        {typeof locationWeather.main !== "undefined"? (
        <div>
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
  )
}

export default Geolocation