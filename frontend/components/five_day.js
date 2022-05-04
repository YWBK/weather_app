import React from "react";
import { convertWindDir, getDayAndDate } from "../util/functions_util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 

const FiveDay = ({day}) => {
  let date = getDayAndDate(day.dt_txt.slice(0,10));
  let temp = Math.round(day.main.temp);
  let icon = day.weather[0].icon;
  let desc = day.weather[0].main;
  let precip = Math.round(day.pop * 100);
  let windSpeed = Math.round(day.wind.speed);
  let windDir = convertWindDir(day.wind.deg);

  return (
    <li className="five-day">
      <div>{ date }</div>
      <div>{ temp } { temp ? '°F' : ''}</div>
      <div className="icon">
        <img src={`http://openweathermap.org/img/w/${icon}.png`} alt={desc}/>
        <div>{ desc }</div>
      </div>
      <div>
        <FontAwesomeIcon 
          icon="fa-solid fa-cloud-showers-heavy"
          className="icon" /> 
        { precip } %
      </div>
      <div>
        <FontAwesomeIcon 
          icon="fa-solid fa-wind"
          className="icon" /> 
        { windDir } { windSpeed } mph
      </div>
    </li>

  )
}

export default FiveDay;