import React from "react";
import WeatherElement from "./Components/WeatherElement.jsx";
import style from "./currentWeather.scss";
const DAY_LIST = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday ",
  "Thursday",
  "Friday",
  "Saturday",
];

class CurrentWeather extends React.Component {
  constructor(props) {
    super(props);
  }

  getDayOfToday() {
    const today = new Date();
    const day = today.getDay();
    return DAY_LIST[day];
  }

  render() {
    const { currentCity, currentCityInfo :{ temp, weatherDescrition, humidity, windSpeed} } = this.props;
    const cityInLowerCase = currentCity.toLowerCase();

    return (
      <div className={`${style.currentWeather} ${style[cityInLowerCase]}`}>
        <div className={style.weatherElements}>
          <WeatherElement elementStyle={style.temperature}>
            {temp}°C
          </WeatherElement>
          <WeatherElement elementStyle={style.weatherDescription}>
            {weatherDescrition}
          </WeatherElement>
          <div className={style.moreElements}>
            <WeatherElement>Humidity: {humidity}%</WeatherElement>
            <WeatherElement>Wind Speed: {windSpeed} km/h</WeatherElement>
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
