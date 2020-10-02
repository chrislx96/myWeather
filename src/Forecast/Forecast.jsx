import React from "react";
import DailyForecast from "./Components/DailyForecast.jsx";
import style from "./forecast.scss";

class Forecast extends React.Component {
  constructor(props) {
    super(props);
  }

  getDayNDaysLater(n) {
    const today = new Date();
    const day = today.getDay();
    var daylist = [
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
    switch (n) {
      case 1:
        return daylist[day + 1];
      case 2:
        return daylist[day + 2];
      case 3:
        return daylist[day + 3];
      case 4:
        return daylist[day + 4];
    }
  }

  render() {
    const {
      currentCity,
      forecast
    } = this.props;
    return (
      <div className={style.fiveDayForecast}>
        <h1 className={style.forecastHeading}>{currentCity} 5 day forecast</h1>
        <DailyForecast dayForecast={forecast[0]}>Today</DailyForecast>
        <DailyForecast dayForecast={forecast[1]}>
          {this.getDayNDaysLater(1)}
        </DailyForecast>
        <DailyForecast dayForecast={forecast[2]}>
          {this.getDayNDaysLater(2)}
        </DailyForecast>
        <DailyForecast dayForecast={forecast[3]}>
          {this.getDayNDaysLater(3)}
        </DailyForecast>
        <DailyForecast dayForecast={forecast[4]}>
          {this.getDayNDaysLater(4)}
        </DailyForecast>
      </div>
    );
  }
}

export default Forecast;
