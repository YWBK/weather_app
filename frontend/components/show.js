import React, { useEffect, useInsertionEffect } from "react";
import { useLocation } from "react-router-dom";
import Today from "./today"
import FiveDay from "./five_day";
import Navbar from "./navbar";
import Loading from "./loading";
import { fetchReverse } from "../util/city_api_util";
import { fetchWeather, fetchForecast } from "../util/weather_api_util";
import { 
  kToF,
  concatCityName,
  convertWindDir,
  getTime
} from "../util/functions_util";


const Show = () => {
  let location = useLocation();
  const [loading, setLoading] = React.useState(true);
  const [currWeather, setCurrWeather] = React.useState({})
  const [forecast, setForecast] = React.useState({});
  const [currCity, setCurrCity] = React.useState({});

  useEffect(() => {
    getForecast();
  }, [location])

  const getForecast = () => {
    return fetchForecast(location.pathname).then(res => {
      let geo = [res.city.coord.lat, res.city.coord.lon];
      let hourly = res.list
      let [a, b, c, d, e] = hourly[0].sys.pod === 'd'
        ? [0, 8, 16, 24, 32]
        : [4, 12, 20, 28, 36];
      setForecast({
        0: hourly[a],
        1: hourly[b],
        2: hourly[c],
        3: hourly[d],
        4: hourly[e],

      });


      return getCurrDetails(geo)
    });
  }

  const getCurrDetails = geo => {
    getCurrCity(geo);
    return getCurrWeather(geo);
  }

  const getCurrWeather = geo => {
    return fetchWeather(geo).then(res => {
      setCurrWeather({
        temp: res.main.temp,
        icon: `http://openweathermap.org/img/w/${res.weather[0].icon}.png`,
        main: res.weather[0].main,
        sunrise: getTime(res.sys.sunrise),
        sunset: getTime(res.sys.sunset),
        feel: res.main.feels_like,
        high: Math.round(res.main.temp_max),
        low: Math.round(res.main.temp_min),
        humidity: res.main.humidity,
        pressure: res.main.pressure,
        visibility: Math.round(res.visibility / 1000),
        windDir: convertWindDir(res.wind.deg),
        windSpeed: Math.round(res.wind.speed),
      });
      return setTimeout(() => {
        setLoading(false);
      }, "200");
    })
  }

  const getCurrCity = geo => {
    return fetchReverse(geo).then(res => {
      return setCurrCity({
        name: res[0].name,
        state: res[0].state ? res[0].state : "",
        country: res[0].country
      });
    });
  }

  return (
    <React.Fragment>
      <Navbar />
      <div className="detail-wrapper">
        { loading 
          ? <div className="detail-card">
              <Loading />
            </div>
          : <React.Fragment>
            <div className="detail-card">
              <Today 
                cityName={concatCityName(currCity)} 
                weather={currWeather} /> 
            </div>
            <ol className="detail-card">
              <li>Daily Forecast</li>
              { [0, 1, 2, 3, 4].map(i => (
                  <FiveDay day={forecast[i]} key={i} />
              ))}
            </ol>
          </React.Fragment>
        }
        </div>
    </React.Fragment>
  )
}

export default Show;