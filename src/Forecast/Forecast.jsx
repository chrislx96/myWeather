import React from "react";
import DailyForecast from "./Components/DailyForecast.jsx";
import style from "./forecast.scss";
const DAY_LIST = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday ",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday ",
  "Thursday",
  "Friday",
  "Saturday",
];

class Forecast extends React.Component {
  constructor(props) {
    super(props);
  }

  getDayNDaysLater(n) {
    const today = new Date();
    const day = today.getDay();
    switch (n) {
      case 0:
        return "Today";
      default:
        return DAY_LIST[day + n];
    }
  }

  render() {
    const { currentCity, forecast } = this.props;
    return (
      <div className={style.forecast}>
        <h2 className={style.forecastHeading}>{currentCity} Forecast</h2>
        {forecast.map((dailyForecast, i) => {
          return (
            <DailyForecast key={i} dayForecast={dailyForecast}>
              {this.getDayNDaysLater(i)}
            </DailyForecast>
          );
        })}
      </div>
    );
  }
}

export default Forecast;
