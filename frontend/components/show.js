import React, { useEffect, useInsertionEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./navbar";
import { fetchForecast } from "../util/weather_api_util";


const Show = () => {
  let location = useLocation();
  const [weatherData, setWeatherData] = React.useState(location.state?.weatherData);

  useEffect(() => {
    getForecast();
  }, [location])

  const getForecast = () => {
    return fetchForecast(location.pathname).then(res => {
      debugger
    })
  }



  return (
    <React.Fragment>
      <Navbar />
      <div>
        Details of City
      </div>
    </React.Fragment>
  )
}

export default Show;