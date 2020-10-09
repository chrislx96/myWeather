import React from "react";
import CityButton from "./Components/CityButton.jsx";
import style from "./cities.scss";
import { GPS_COORDINATES } from "../App.jsx";

class Cities extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { currentCity, onCityButtonClick, citiesBriefWeather } = this.props;
    const cityList = Object.keys(GPS_COORDINATES);
    return (
      <div className={style.cities}>
        <h2>Other Cities</h2>
        {cityList.map((city, i) => {
          {
            return (
              !(currentCity === city) && (
                <CityButton key={i} onClick={onCityButtonClick(city)}>
                  <h3>{city}</h3>
                  <h3>{citiesBriefWeather[city].temp}°C</h3>
                </CityButton>
              )
            );
          }
        })}
      </div>
    );
  }
}

export default Cities;
