import React, { useEffect, useInsertionEffect } from "react";
import { useLocation } from "react-router-dom";
import FiveDay from "./five_day";
import Navbar from "./navbar";
import Loading from "./loading";
import { fetchReverse } from "../util/city_api_util";
import { fetchForecast } from "../util/weather_api_util";
import { 
  kToF,
  concatCityName 
} from "../util/functions_util";


const Show = () => {
  let location = useLocation();
  const [loading, setLoading] = React.useState(true);
  const [currWeather, setCurrWeather] = React.useState({})
  const [forecast, setForecast] = React.useState({});
  const [currCity, setCurrCity] = React.useState({});

  useEffect(() => {
    // getCurrentDetail();
    getForecast();
  }, [location])

  const getForecast = () => {
    return fetchForecast(location.pathname).then(res => {
      let geo = [res.city.coord.lat, res.city.coord.lon];
      let hourly = res.list
      // debugger
      setForecast({
        0: hourly[4],
        1: hourly[12],
        2: hourly[20],
        3: hourly[28],
        4: hourly[36],

      });
      return getCurrCity(geo)
    });
  }

  const getCurrCity = geo => {
    return fetchReverse(geo).then(res => {
      setCurrCity({
        name: res[0].name,
        state: res[0].state ? res[0].state : "",
        country: res[0].country
      });
      return setTimeout(() => {
        setLoading(false);
      }, "200");
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
              { concatCityName(currCity) }
            </div>
            <ol className="detail-card">
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