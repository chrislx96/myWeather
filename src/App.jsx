import React from "react";
import CurrentWeather from "./CurrentWeather/CurrentWeather.jsx";
import Cities from "./Cities/Cities.jsx";
import Forecast from "./Forecast/Forecast.jsx";
import style from "./app.scss";
import config from "../config.js";
const DEFAULT_LAT = "-37.8136";
const DEFAULT_LON = "144.9631";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCity: "Melbourne",
      currentTemp: "",
      currentWeatherDescrition: "",
      currentHumidity: "",
      currentWindSpeed: "",
      forecast: [
        {
          maxTemp: "High 1",
          minTemp: "Low 1",
        },
        {
          maxTemp: "High 2",
          minTemp: "Low 2",
        },
        {
          maxTemp: "High 3",
          minTemp: "Low 3",
        },
        {
          maxTemp: "High 4",
          minTemp: "Low 4",
        },
        {
          maxTemp: "High 5",
          minTemp: "Low 5",
        },
      ],
    };
    this.changeCity = this.changeCity.bind(this);
  }

  componentDidMount() {
    // this.fetchWeather(DEFAULT_LAT, DEFAULT_LON);
  }

  changeCity(clickedCity, lat, lon) {
    return (event) => {
      event.preventDefault();
      this.setState({
        currentCity: clickedCity,
      });
      // this.fetchWeather(lat, lon);
    };
  }

  async fetchWeather(lat, lon){
    const apiKey = config.weatherApiKey;
    const reponse = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${apiKey}`
    );
    const weatherInfo = await reponse.json();
    this.setCurrentWeather(weatherInfo);
    this.setForecast(weatherInfo);
  }

  setCurrentWeather(weatherInfo) {
    
    console.log(weatherInfo);
    this.setState({
      currentTemp: this.toCelcius(weatherInfo.current.temp).toFixed(1),
      currentWeatherDescrition: weatherInfo.current.weather[0].main,
      currentHumidity: weatherInfo.current.humidity,
      currentWindSpeed: this.toKmPerHour(weatherInfo.current.wind_speed),
    });
  }

  setForecast(weatherInfo) {
    this.setState({

      forecast: [
        {
          maxTemp: this.toCelcius(weatherInfo.daily[0].temp.max).toFixed(1),
          minTemp: this.toCelcius(weatherInfo.daily[0].temp.min).toFixed(1),
        },
        {
          maxTemp: this.toCelcius(weatherInfo.daily[1].temp.max).toFixed(1),
          minTemp: this.toCelcius(weatherInfo.daily[1].temp.min).toFixed(1),
        },
        {
          maxTemp: this.toCelcius(weatherInfo.daily[2].temp.max).toFixed(1),
          minTemp: this.toCelcius(weatherInfo.daily[2].temp.min).toFixed(1),
        },
        {
          maxTemp: this.toCelcius(weatherInfo.daily[3].temp.max).toFixed(1),
          minTemp: this.toCelcius(weatherInfo.daily[3].temp.min).toFixed(1),
        },
        {
          maxTemp: this.toCelcius(weatherInfo.daily[4].temp.max).toFixed(1),
          minTemp: this.toCelcius(weatherInfo.daily[4].temp.min).toFixed(1),
        },
      ]
    });
  }

  toCelcius(inputTemp) {
    return inputTemp - 273.15;
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
      forecast
    } = this.state;
    return (
      <div className={style.background}>
        <main className={style.container}>
          <CurrentWeather
            className={style.currentWeather}
            currentTemp={currentTemp}
            currentCity={currentCity}
            currentWeatherDescrition={currentWeatherDescrition}
            currentHumidity={currentHumidity}
            currentWindSpeed={currentWindSpeed}
          />
          <div className={style.cityAndForecast}>
            <Cities
              currentCity={currentCity}
              onCityButtonClick={this.changeCity}
            />
            <Forecast
              currentCity={currentCity}
              forecast={forecast}
            />
          </div>
        </main>
      </div>
    );
  }
}


export default App;
