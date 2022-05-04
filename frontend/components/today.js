import React from "react";


const Today = ({ cityName, weather }) => {
  // debugger
  return (
    <React.Fragment>
      <div>Weather Today in { cityName }</div>
      <div>{ weather.feel }° Feels Like</div>
      <div>Sunrise / Sunset { weather.sunrise} { weather.sunset }</div>
      <div>High / Low { weather.high}° { weather.low }°</div>
      <div>Humidity { weather.humidity } %</div>
      <div>Pressure { weather.pressure } hPa</div>
      <div>Visibility { weather.visibility } km</div>
      <div>Wind { weather.windDir} { weather.windSpeed} mph </div>
    </React.Fragment>
  )
}

export default Today;