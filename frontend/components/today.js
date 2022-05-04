import React from "react";


const Today = ({ cityName, weather }) => {
  // debugger
  return (
    <React.Fragment>
      <div className='detail-title'>
        Weather Today in { cityName }
      </div>
      <ul className='today-detail'>
        <li className='detail-item' id='detail-temp'>
          <p>{ weather.temp }°</p>
          <p id='detail-feels-like'>Feels Like { weather.feel }°</p>
        </li>
        <li className='detail-item'>
          <img src={ weather.icon } alt={ weather.main} />
          { weather.main }
        </li>
        <li className='detail-item'>
          <p>High / Low { weather.high}° / { weather.low }°</p>
        </li>
      </ul>
      <ul className='today-detail'>
        <li className='detail-item'>
          <p className='detail-caption'>Sunrise / Sunset</p>
          <p>{ weather.sunrise} / { weather.sunset }</p>
        </li>
        <li className='detail-item'>
          <p className='detail-caption'>Wind</p> 
          <p>{ weather.windDir} { weather.windSpeed} mph</p>
        </li>
        <li className='detail-item'>
          <p className='detail-caption'>Humidity</p> 
          <p>{ weather.humidity } %</p>
        </li>
        <li className='detail-item'>
          <p className='detail-caption'>Visibility</p>
          <p>{ weather.visibility } km</p>
        </li>
        <li className='detail-item'>
          <p className='detail-caption'>Pressure</p>
          <p>{ weather.pressure } hPa</p>
        </li>
      </ul>
    </React.Fragment>
  )
}

export default Today;