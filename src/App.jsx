import React from "react";
import CurrentWeather from "./CurrentWeather/CurrentWeather.jsx";
import Cities from "./Cities/Cities.jsx";
import Forecast from "./Forecast/Forecast.jsx";
import style from "./app.scss";
import config from "../config.js";
const DEFAULT_CITY = "Melbourne";
const FORECAST_DAY_NUMBER = 5;
const API_KEY = config.weatherApiKey;
const GPS_COORDINATES = {
  Melbourne: {
    lat: "-37.8136",
    lon: "144.9631",
  },
  Sydney: {
    lat: "-33.8688",
    lon: "151.2093",
  },
  Brisbane: {
    lat: "-27.4698",
    lon: "153.0251",
  },
  Perth: {
    lat: "-31.9505",
    lon: "115.8605",
  },
};

class App extends React.Component {
  constructor(props) {
    const initCitiesWeather = {};
    Object.keys(GPS_COORDINATES).map((city) => {
      initCitiesWeather[city] = { temp: 0 };
    });
    super(props);
    this.state = {
      currentCity: DEFAULT_CITY,
      currentCityInfo: {
        temp: "",
        weatherDescrition: "",
        humidity: "",
        windSpeed: "",
      },
      forecast: [],
      citiesBriefWeather: initCitiesWeather,
    };
    this.changeCity = this.changeCity.bind(this);
  }

  componentDidMount() {
    this.fetchCurrentCityWeather(DEFAULT_CITY);

    let othercitiesList = Object.assign({}, GPS_COORDINATES);
    delete othercitiesList[DEFAULT_CITY];
    this.fetchOtherCitiesBriefWeather(othercitiesList);
  }

  changeCity(clickedCity) {
    return (event) => {
      event.preventDefault();
      this.setState({
        currentCity: clickedCity,
      });
      this.fetchCurrentCityWeather(clickedCity);
    };
  }

  async fetchCurrentCityWeather(city) {
    const reponse = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${GPS_COORDINATES[city].lat}&lon=${GPS_COORDINATES[city].lon}&exclude=hourly,minutely&appid=${API_KEY}`
    );
    const weatherInfo = await reponse.json();
    this.setCurrentWeather(city, weatherInfo);
    this.setForecast(weatherInfo);
  }

  fetchOtherCitiesBriefWeather(cityList) {
    Object.keys(cityList).map(async (city) => {
      const reponse = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${cityList[city].lat}&lon=${cityList[city].lon}&exclude=hourly,minutely&appid=${API_KEY}`
      );
      const weatherInfo = await reponse.json();
      const { temp } = weatherInfo.current;
      this.setState((prevState) => ({
        citiesBriefWeather: {
          ...prevState.citiesBriefWeather,
          [city]: {
            temp: this.toCelcius(temp),
          },
        },
      }));
    });
  }

  setCurrentWeather(city, weatherInfo) {
    const { temp, humidity, wind_speed, weather } = weatherInfo.current;
    this.setState((prevState) => ({
      currentCityInfo: {
        temp: this.toCelcius(temp),
        weatherDescrition: weather[0].main,
        humidity: humidity,
        windSpeed: this.toKmPerHour(wind_speed),
      },
      citiesBriefWeather: {
        ...prevState.citiesBriefWeather,
        [city]: {
          temp: this.toCelcius(temp),
        },
      },
    }));
  }

  setForecast(weatherInfo) {
    const forecast = weatherInfo.daily.slice(0, FORECAST_DAY_NUMBER);
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
      currentCityInfo,
      forecast,
      citiesBriefWeather,
    } = this.state;
    return (
      <div className={style.background}>
        <main className={style.container}>
          <CurrentWeather
            className={style.currentWeather}
            currentCity={currentCity}
            currentCityInfo={currentCityInfo}
          />
          <div className={style.cityAndForecast}>
            <Cities
              currentCity={currentCity}
              citiesBriefWeather={citiesBriefWeather}
              onCityButtonClick={this.changeCity}
            />
            <Forecast currentCity={currentCity} forecast={forecast} />
          </div>
        </main>
      </div>
    );
  }
}
export { GPS_COORDINATES };
export default App;
