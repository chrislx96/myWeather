import React from "react";
import WeatherElement from "./Components/WeatherElement.jsx";
import style from "./currentWeather.scss";

class CurrentWeather extends React.Component {
  constructor(props) {
    super(props);
  }

  getDayOfToday() {
    const today = new Date();
    const day = today.getDay();
    const daylist = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday ",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return daylist[day];
  }

  render() {
    const {
      currentCity,
      currentTemp,
      currentWeatherDescrition,
      currentHumidity,
      currentWindSpeed,
    } = this.props;
    return (
      <div className={style.currentWeather}>
        <div className={style.weatherElements}>
          <WeatherElement
            elementStyle={style.temperature}
            currentCity={currentCity}
          >
            {currentTemp}°C
          </WeatherElement>
          <WeatherElement
            elementStyle={style.weatherDescription}
            currentCity={currentCity}
          >
            {currentWeatherDescrition}
          </WeatherElement>
          <div className={style.moreElements}>
            <WeatherElement currentCity={currentCity}>
              Humidity: {currentHumidity}%
            </WeatherElement>
            <WeatherElement currentCity={currentCity}>
              Wind Speed: {currentWindSpeed} km/h
            </WeatherElement>
          </div>
        </div>
        <div className={style.currentCity}>
          <div className={style.city}>{currentCity}</div>
          <div className={style.day}>{this.getDayOfToday()}</div>
        </div>
      </div>
    );
  }
}

export default CurrentWeather;
