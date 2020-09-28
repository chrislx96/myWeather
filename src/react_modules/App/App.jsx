import React from "react";
import ReactDOM from "react-dom";
import CurrentWeatherInfo from "../CurrentWeatherInfo/CurrentWeatherInfo.jsx";
import OtherCities from "../OtherCities/OtherCities.jsx";
import FiveDayForecast from "../FiveDayForecast/FiveDayForecast.jsx";
import style from "./app.scss";
const config = require("../../../config.js");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCity: "Melbourne",
      currentTemp: "Temperature in ",
      currentWeatherDescrition: "Weather Description",
      currentHumidity: " Humidity ",
      currentWindSpeed: " Wind Speed ",
      firstDayForecast: {
        maxTemp: "High",
        minTemp: "Low",
      },
      secondDayForecast: {
        maxTemp: "High",
        minTemp: "Low",
      },
      thirdDayForecast: {
        maxTemp: "High",
        minTemp: "Low",
      },
      fourthDayForecast: {
        maxTemp: "High",
        minTemp: "Low",
      },
      fifthDayForecast: {
        maxTemp: "High",
        minTemp: "Low",
      },
    };
    this.changeCity = this.changeCity.bind(this);
  }

  componentDidMount() {
    this.getCurrentWeatherInfo("Melbourne", "VIC");
    this.getForecast("Melbourne", "VIC");
  }

  changeCity(clickedCity, stateCode) {
    return (event) => {
      event.preventDefault();
      this.setState({
        currentCity: clickedCity,
      });
      this.getCurrentWeatherInfo(clickedCity, stateCode);
      this.getForecast(clickedCity, stateCode);
    };
  }

  async getCurrentWeatherInfo(currentCity, stateCode) {
    const apiKey = config.weatherApiKey;
    const countryCode = "AU";
    const apiCall = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${currentCity},${stateCode},${countryCode}}&appid=${apiKey}`
    );
    const response = await apiCall.json();
    this.setState({
      currentTemp: this.toCelcius(response.main.temp).toFixed(1),
      currentWeatherDescrition: response.weather[0].main,
      currentHumidity: response.main.humidity,
      currentWindSpeed: this.toKmPerHour(response.wind.speed),
    });
  }

  async getForecast(currentCity, stateCode) {
    const apiKey = config.weatherApiKey;
    const countryCode = "AU";
    const apiCall = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${currentCity},${stateCode},${countryCode}}&appid=${apiKey}`
    );
    const response = await apiCall.json();
    const fiveDayForecast = this.getTempForecastInFiveDays(response);
    this.setState({
      firstDayForecast: {
        maxTemp: fiveDayForecast.firstDayForecast.maxTemp,
        minTemp: fiveDayForecast.firstDayForecast.minTemp,
      },
      secondDayForecast: {
        maxTemp: fiveDayForecast.secondDayForecast.maxTemp,
        minTemp: fiveDayForecast.secondDayForecast.minTemp,
      },
      thirdDayForecast: {
        maxTemp: fiveDayForecast.thirdDayForecast.maxTemp,
        minTemp: fiveDayForecast.thirdDayForecast.minTemp,
      },
      fourthDayForecast: {
        maxTemp: fiveDayForecast.fourthDayForecast.maxTemp,
        minTemp: fiveDayForecast.fourthDayForecast.minTemp,
      },
      fifthDayForecast: {
        maxTemp: fiveDayForecast.fifthDayForecast.maxTemp,
        minTemp: fiveDayForecast.fifthDayForecast.minTemp,
      },
    });
  }

  getTempForecastInThreeHours(threeHourForecast) {
    const max = threeHourForecast.main.temp_max;
    const min = threeHourForecast.main.temp_min;
    return {
      max: this.toCelcius(max).toFixed(1),
      min: this.toCelcius(min).toFixed(1),
    };
  }

  getTempForecastInADay(forecastList) {
    let max = Number.NEGATIVE_INFINITY;
    let min = Number.POSITIVE_INFINITY;
    for (let i = 0; i < 8; i++) {
      let maxTempInThreeHours = this.getTempForecastInThreeHours(
        forecastList[i]
      ).max;
      let minTempInThreeHours = this.getTempForecastInThreeHours(
        forecastList[i]
      ).min;

      if (parseFloat(maxTempInThreeHours) > max) {
        max = parseFloat(maxTempInThreeHours);
      }

      if (parseFloat(minTempInThreeHours) < min) {
        min = parseFloat(minTempInThreeHours);
      }
    }
    return {
      max: max,
      min: min,
    };
  }

  getTempForecastInFiveDays(response) {
    const forecastList = response.list;
    const firstDay = forecastList.splice(0, 8);
    const secondDay = forecastList.splice(0, 8);
    const thirdDay = forecastList.splice(0, 8);
    const fourthDay = forecastList.splice(0, 8);
    const fifthDay = forecastList.splice(0, 8);
    return {
      firstDayForecast: {
        maxTemp: this.getTempForecastInADay(firstDay).max,
        minTemp: this.getTempForecastInADay(firstDay).min,
      },
      secondDayForecast: {
        maxTemp: this.getTempForecastInADay(secondDay).max,
        minTemp: this.getTempForecastInADay(secondDay).min,
      },
      thirdDayForecast: {
        maxTemp: this.getTempForecastInADay(thirdDay).max,
        minTemp: this.getTempForecastInADay(thirdDay).min,
      },
      fourthDayForecast: {
        maxTemp: this.getTempForecastInADay(fourthDay).max,
        minTemp: this.getTempForecastInADay(fourthDay).min,
      },
      fifthDayForecast: {
        maxTemp: this.getTempForecastInADay(fifthDay).max,
        minTemp: this.getTempForecastInADay(fifthDay).min,
      },
    };
  }

  toCelcius(inputTemp) {
    return inputTemp - 273.15;
  }

  toKmPerHour(inputSpeed) {
    return (inputSpeed * 3.6).toFixed(0);
  }

  render() {
    const {
      currentCity,
      currentTemp,
      currentWeatherDescrition,
      currentHumidity,
      currentWindSpeed,
      firstDayForecast,
      secondDayForecast,
      thirdDayForecast,
      fourthDayForecast,
      fifthDayForecast,
    } = this.state;
    return (
      <div className={style.background}>
        <main className={style.container}>
          <CurrentWeatherInfo
            className={style.currentWeatherInfo}
            currentTemp={currentTemp}
            currentCity={currentCity}
            currentWeatherDescrition={currentWeatherDescrition}
            currentHumidity={currentHumidity}
            currentWindSpeed={currentWindSpeed}
          />
          <div className={style.cityAndForecast}>
            <OtherCities
              currentCity={currentCity}
              onCityButtonClick={this.changeCity}
            />
            <FiveDayForecast
              currentCity={currentCity}
              firstDayForecast={firstDayForecast}
              secondDayForecast={secondDayForecast}
              thirdDayForecast={thirdDayForecast}
              fourthDayForecast={fourthDayForecast}
              fifthDayForecast={fifthDayForecast}
            />
          </div>
        </main>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
