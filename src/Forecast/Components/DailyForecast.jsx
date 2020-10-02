import React from "react";
import style from "./dailyForecast.scss";

class DailyForecast extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children, dayForecast } = this.props;
    return (
      <div className={style.dailyForecast}>
        <h3>{children}</h3>
        <h3>H: {dayForecast.maxTemp}°C</h3>
        <h3>L: {dayForecast.minTemp}°C</h3>
      </div>
    );
  }
}

export default DailyForecast;
