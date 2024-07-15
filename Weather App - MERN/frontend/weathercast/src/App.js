import { useState } from "react";
import "./App.css";
import PropTypes from 'prop-types';

// Images
import bg from './assets/bg.png';
import sunIcon from "./assets/sun.png";
import cloudIcon from "./assets/cloud.png";
import drizzleIcon from "./assets/drizzle.png";
import rainIcon from "./assets/rain.png";
import windIcon from "./assets/wind.png";
import snowIcon from "./assets/snow.png";
import humidityIcon from "./assets/humidity.png";
import { use } from "react";

const WeatherDetails = ({
  icon,
  temp,
  feelsLike,
  city,
  country,
  wind,
  humidity,
  lat,
  long,
}) => {
  return (
    <>
      <div className="image">
        <img src={icon} alt="Image" />
      </div>
      <div className="temperature">{temp} °C </div>
      <div className="feelslike">🌡Feels Like - {feelsLike}°C</div>
      <div className="city">{city}</div>
      <div className="country">{country}</div>
      <div className="cord">
        <div>
          <span className="lat">Latitude</span> <br />
          <span>{lat}</span>
        </div>
        <div>
          <span className="long">Longitude</span> <br />
          <span>{long}</span>
        </div>
      </div>
      <div className="data-container">
        <div className="element">
          <img src={humidityIcon} alt="Humidity" className="icon" />
          <div className="data">
            <div className="humidity-percent">{humidity} %</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={windIcon} alt="Wind" className="icon" />
          <div className="data">
            <div className="wind">{wind} kmph</div>
            <div className="text">Wind</div>
          </div>
        </div>
      </div>
    </>
  );
};

WeatherDetails.propTypes = {
  icon: PropTypes.string.isRequired,
  temp: PropTypes.number.isRequired,
  feelsLike: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  wind: PropTypes.number.isRequired,
  humidity: PropTypes.number.isRequired,
  lat: PropTypes.number.isRequired,
  long: PropTypes.number.isRequired,
};

function App() {
  const [text, setText] = useState("Eravur");
  const [icon, setIcon] = useState();
  const [temp, setTemp] = useState();
  const [feelsLike, setFeelsLike] = useState();
  const [city, setCity] = useState();
  const [country, setCountry] = useState();
  const [wind, setWind] = useState();
  const [humidity, setHumidity] = useState();
  const [lat, setLat] = useState();
  const [long, setLong] = useState();
  const [cityNotFound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const weatherIconCodes = {
    '01d' : sunIcon,
    '01n' : sunIcon,
    '02d' : cloudIcon,
    '02n' : cloudIcon,
    '03d' : drizzleIcon,
    '03n' : drizzleIcon,
    '04d' : drizzleIcon,
    '04n' : drizzleIcon,
    '09d' : rainIcon,
    '09n' : rainIcon,
    '10d' : rainIcon,
    '10n' : rainIcon,
    '11d' : rainIcon,
    '11n' : rainIcon,
    '13d' : snowIcon,
    '13n' : snowIcon,

  };

  const search = async () => {
    // setLoading(true);

    let API_KEY = "cf1a5f76e34b736c2fa594be47632753";
    let URL = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${API_KEY}&units=Metric`;

    try {
      let res = await fetch(URL);
      let data = await res.json();

      if (data.cod === "404") {
        console.error("City not found");
        setCityNotFound(true);
        setLoading(false);
        return;
      }

      setTemp(Math.floor(data.main.temp));
      setFeelsLike(Math.floor(data.main.feels_like));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLong(data.coord.lon);
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);

      const weatherIconDetails = data.weather[0].icon;
      setIcon(weatherIconCodes[weatherIconDetails] || sunIcon);
      setCityNotFound(false);


    } catch (error) {
      console.error(error.message);
      setError('An error occurred while fetching weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleCity = (e) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };
  return (
    <>
      <div className="container">
        <h1><center>WEATHER CAST</center></h1>
        <div className="input-container">
          <input
            type="text"
            className="cityInput"
            placeholder="Search City"
            onChange={handleCity}
            value={text}
            onKeyDown={handleKeyDown}
          />
          <button className="searchbtn" onClick={search()}>🔎</button>
        </div>
      

        { loading && <div className="loading-msg">Loading...</div>}
        { error && <div className="error-msg">{error}</div>}
        { cityNotFound && <div className="cityNotFound">City not found</div>}

        {!loading && !cityNotFound && <WeatherDetails
          icon={icon}
          temp={temp}
          feelsLike={feelsLike}
          city={city}
          country={country}
          wind={wind}
          humidity={humidity}
          lat={lat}
          long={long}
        />}

        <p className="copyright">
          Designed by <span>Faahith KRM</span>
        </p>
      </div>
    </>
  );
}

export default App;
