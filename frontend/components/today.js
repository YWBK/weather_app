import React from "react";


const Today = ({ cityName, weather }) => {
  // debugger
  return (
    <React.Fragment>
      <div className='today-title'>Weather Today in { cityName }</div>
      <div className='today-detail'>
        <div>{ weather.temp }°</div>
        <div>Feels Like { weather.feel }°</div>
        <div>
          <img src={ weather.icon } alt={ weather.main} />
          { weather.main }
        </div>
        <div>High / Low { weather.high}° { weather.low }°</div>
      </div>
      <div className='today-detail'>
        <div>Sunrise / Sunset { weather.sunrise} { weather.sunset }</div>
        <div>Wind { weather.windDir} { weather.windSpeed} mph </div>
        <div>Humidity { weather.humidity } %</div>
        <div>Visibility { weather.visibility } km</div>
        <div>Pressure { weather.pressure } hPa</div>
      </div>
    </React.Fragment>
  )
}

export default Today;