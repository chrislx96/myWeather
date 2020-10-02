import React from "react";
import CityButton from "./Components/CityButton.jsx";
import style from "./cities.scss";

class Cities extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { currentCity, onCityButtonClick } = this.props;

    return (
      <div className={style.cities}>
        <h2>Other Cities</h2>
        {!(currentCity === "Melbourne") && (
          <CityButton onClick={onCityButtonClick("Melbourne", "-37.8136", "144.9631")}>
            <h3>Melbourne</h3>
          </CityButton>
        )}
        {!(currentCity === "Sydney") && (
          <CityButton onClick={onCityButtonClick("Sydney", "-33.8688", "151.2093")}>
            <h3>Sydney</h3>
          </CityButton>
        )}
        {!(currentCity === "Brisbane") && (
          <CityButton onClick={onCityButtonClick("Brisbane", "-27.4698", "153.0251")}>
            <h3>Brisbane</h3>
          </CityButton>
        )}
        {!(currentCity === "Perth") && (
          <CityButton onClick={onCityButtonClick("Perth", "-31.9505", "115.8605")}>
            <h3>Perth</h3>
          </CityButton>
        )}
      </div>
    );
  }
}

export default Cities;

