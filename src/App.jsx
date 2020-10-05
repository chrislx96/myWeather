import React from "react";
import CurrentWeather from "./CurrentWeather/CurrentWeather.jsx";
import Cities from "./Cities/Cities.jsx";
import Forecast from "./Forecast/Forecast.jsx";
import style from "./app.scss";
import config from "../config.js";
const DEFAULT_CITY = "Melbourne";
const DEFAULT_LAT = "-37.8136";
const DEFAULT_LON = "144.9631";
const FORECAST_DAY_NUMBER = 5;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCity: DEFAULT_CITY,
      currentTemp: "",
      currentWeatherDescrition: "",
      currentHumidity: "",
      currentWindSpeed: "",
      forecast: [],
    };
    this.changeCity = this.changeCity.bind(this);
  }

  componentDidMount() {
    this.fetchWeather(DEFAULT_LAT, DEFAULT_LON);
  }

  changeCity(clickedCity, lat, lon) {
    return (event) => {
      event.preventDefault();
      this.setState({
        currentCity: clickedCity,
      });
      this.fetchWeather(lat, lon);
    };
  }

  async fetchWeather(lat, lon) {
    const apiKey = config.weatherApiKey;
    const reponse = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${apiKey}`
    );
    const weatherInfo = await reponse.json();
    this.setCurrentWeather(weatherInfo);
    this.setForecast(weatherInfo);
  }

  setCurrentWeather(weatherInfo) {
    const {temp, humidity, wind_speed, weather} = weatherInfo.current
    this.setState({
      currentTemp: this.toCelcius(temp),
      currentWeatherDescrition: weather[0].main,
      currentHumidity: humidity,
      currentWindSpeed: this.toKmPerHour(wind_speed),
    });
  }

  setForecast(weatherInfo) {
    const forecast = weatherInfo.daily;
    const forecastArray = new Array(FORECAST_DAY_NUMBER);
    forecast.forEach((dailyForecast, i) => {
      forecastArray[i] = {
        maxTemp: this.toCelcius(dailyForecast.temp.max),
        minTemp: this.toCelcius(dailyForecast.temp.min),
      };
    });

    this.setState({
      forecast: forecastArray,
    });
  }

  toCelcius(inputTemp) {
    return (inputTemp - 273.15).toFixed(1);
  }

  toKmPerHour(inputSpeed) {
    return (inputSpeed * 3.6).toFixed(0);
  }

  render() {
    const {
      currentCity,
      currentTemp,
      currentWeatherDescrition,
      currentHumidity,
      currentWindSpeed,
      forecast,
    } = this.state;
    return (
      <div className={style.background}>
        <main className={style.container}>
          <CurrentWeather
            className={style.currentWeather}
            temp={currentTemp}
            city={currentCity}
            weatherDescrition={currentWeatherDescrition}
            humidity={currentHumidity}
            windSpeed={currentWindSpeed}
          />
          <div className={style.cityAndForecast}>
            <Cities
              currentCity={currentCity}
              onCityButtonClick={this.changeCity}
            />
            <Forecast currentCity={currentCity} forecast={forecast} />
          </div>
        </main>
      </div>
    );
  }
}

export default App;
