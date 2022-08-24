import { useState, useEffect } from 'react';
import './App.css';
import Weather from './components/Weather';
import Geolocation from './components/Geolocation';

function App() {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null)
  const [locationWeather,setLocationWeather] = useState({});
  const [status, setStatus] = useState(false);


  const geolocationFunction = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(true);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  }

      useEffect(() => {
        geolocationFunction()
      }, []);

      useEffect(() => {
          if(status){
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=1c372f473e535d74989e5ea3c80f1f80`)
            .then(response => response.json())
            .then(data => setLocationWeather(data))
          }
      },[geolocationFunction])

  return (
    <div className="App">
      <Weather locationWeather={locationWeather} status={status}/>
      {/* <Geolocation locationWeather={locationWeather}/> */}
    </div>
  );
}

export default App;
