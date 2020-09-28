import React from "react";
import OtherCityButton from "./Components/OtherCityButton.jsx";
import style from "./otherCities.scss";

class OtherCities extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { currentCity, onCityButtonClick } = this.props;

    return (
      <div className={style.otherCities}>
        <h2>Other Cities</h2>
        {!(currentCity === "Melbourne") && (
          <OtherCityButton onClick={onCityButtonClick("Melbourne", "VIC")}>
            <h3>Melbourne</h3>
          </OtherCityButton>
        )}
        {!(currentCity === "Sydney") && (
          <OtherCityButton onClick={onCityButtonClick("Sydney", "NSW")}>
            <h3>Sydney</h3>
          </OtherCityButton>
        )}
        {!(currentCity === "Brisbane") && (
          <OtherCityButton onClick={onCityButtonClick("Brisbane", "QLD")}>
            <h3>Brisbane</h3>
          </OtherCityButton>
        )}
        {!(currentCity === "Perth") && (
          <OtherCityButton onClick={onCityButtonClick("Perth", "WA")}>
            <h3>Perth</h3>
          </OtherCityButton>
        )}
      </div>
    );
  }
}

export default OtherCities;

