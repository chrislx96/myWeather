import React from "react";
import OneDayForecast from "./Components/OneDayForecast.jsx";
import style from "./fiveDayForecast.scss";

class FiveDayForecast extends React.Component {
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
      firstDayForecast,
      secondDayForecast,
      thirdDayForecast,
      fourthDayForecast,
      fifthDayForecast,
    } = this.props;
    return (
      <div className={style.fiveDayForecast}>
        <h1 className={style.forecastHeading}>{currentCity} 5 day forecast</h1>
        <OneDayForecast dayForecast={firstDayForecast}>Today</OneDayForecast>
        <OneDayForecast dayForecast={secondDayForecast}>
          {this.getDayNDaysLater(1)}
        </OneDayForecast>
        <OneDayForecast dayForecast={thirdDayForecast}>
          {this.getDayNDaysLater(2)}
        </OneDayForecast>
        <OneDayForecast dayForecast={fourthDayForecast}>
          {this.getDayNDaysLater(3)}
        </OneDayForecast>
        <OneDayForecast dayForecast={fifthDayForecast}>
          {this.getDayNDaysLater(4)}
        </OneDayForecast>
      </div>
    );
  }
}

export default FiveDayForecast;
