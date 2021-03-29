import React from "react";
import "./App.css";
import Form from "./app_component/form.component";
import Weather from "./app_component/weather.component";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

import "weather-icons/css/weather-icons.css";

const Api_Key = "1687af61a88a7bf94b46ac9f7bc59595";

const App = () => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [icon, setIcon] = useState("");
  const [main, setMain] = useState("");
  const [celsius, setCelsius] = useState("");
  const [temp_max, setTemp_max] = useState("");
  const [temp_min, setTemp_min] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const weatherIcon = {
    Thunderstorm: "wi-thunderstorm",
    Drizzle: "wi-sleet",
    Rain: "wi-storm-showers",
    Snow: "wi-snow",
    Atmosphere: "wi-fog",
    Clear: "wi-day-sunny",
    Clouds: "wi-day-fog",
  };
  const get_WeatherIcon = (icons, rangeId) => {
    switch (rangeId) {
      case rangeId >= 200 && rangeId < 232:
        setIcon(icons.Thunderstorm);
        break;
      case rangeId >= 300 && rangeId <= 321:
        setIcon(icons.Drizzle);
        break;
      case rangeId >= 500 && rangeId <= 521:
        setIcon(icons.Rain);
        break;
      case rangeId >= 600 && rangeId <= 622:
        setIcon(icons.Snow);
        break;
      case rangeId >= 701 && rangeId <= 781:
        setIcon(icons.Atmosphere);
        break;
      case rangeId === 800:
        setIcon(icons.Clear);
        break;
      case rangeId >= 801 && rangeId <= 804:
        setIcon(icons.Clouds);
        break;
      default:
        setIcon(icons.Clouds);
    }
  };

  const calCelsius = (temp) => {
    let cell = Math.floor(temp - 273.15);
    return cell;
  };

  const getWeather = async (e) => {
    e.preventDefault();

    const country = e.target.elements.country.value;
    const city = e.target.elements.city.value;

    if (country && city) {
      const api_call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}`
      );

      const response = await api_call.json();

      setCity(`${response.name}, ${response.sys.country}`);
      setCountry(response.sys.country);
      setMain(response.weather[0].main);
      setCelsius(calCelsius(response.main.temp));
      setTemp_max(calCelsius(response.main.temp_max));
      setTemp_min(calCelsius(response.main.temp_min));
      setDescription(response.weather[0].description);
      setError(false);

      // seting icons
      get_WeatherIcon(weatherIcon, response.weather[0].id);

      console.log(response);
    } else {
      setIcon({
        error: true,
      });
    }
  };

  return (
    <div className="App">
      <Form loadweather={getWeather} error={error} />
      <Weather
        cityname={city}
        weatherIcon={icon}
        temp_celsius={celsius}
        temp_max={temp_max}
        temp_min={temp_min}
        description={description}
      />
    </div>
  );
};

export default App;
