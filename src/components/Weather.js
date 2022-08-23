import React, { useEffect, useRef, useState } from 'react'
import './style/Weather.css'
const Weather = () => {
    const [weatherData,setWeatherData] = useState({});
    const [city,setCity] = useState('');


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
    console.log(weatherData);
  return (
    <section className='weather-wrapper'>
        <div className='input-wrapper'>
            <p>Right now in</p>
            <input type='text' onInput={increaseWidth} ref={inputRef} onChange = {e => setCity(e.target.value)}/>
            <p>,it's clear.</p>
        </div>

        <div className='information-wrapper'>

        </div>

    </section>
  )
}

export default Weather