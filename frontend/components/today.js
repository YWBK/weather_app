import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Today = ({ cityName, weather }) => {
  return (
    <React.Fragment>
      <div className="detail-title">Weather Today in {cityName}</div>
      <ul className="today-detail">
        <li className="detail-item" id="detail-temp">
          <p>{weather.temp}°</p>
          <p id="detail-feels-like">Feels Like {weather.feel}°</p>
        </li>
        <li className="detail-item">
          <img src={weather.icon} alt={weather.main} />
          {weather.main}
        </li>
        <li className="detail-item">
          <p className="detail-high-low">
            <FontAwesomeIcon
              icon="fa-solid fa-temperature-high"
              className="icon"
            />
            {weather.high}° /
          </p>
          <p>
            <FontAwesomeIcon
              icon="fa-solid fa-temperature-low"
              className="icon"
            />
            {weather.low}°
          </p>
        </li>
      </ul>
      <ul className="today-detail">
        <li className="detail-item">
          <p className="detail-caption">Sunrise / Sunset</p>
          <p className="detail-high-low">
            <FontAwesomeIcon icon="fa-solid fa-sun" className="icon" />
            {weather.sunrise} /
          </p>
          <p>
            <FontAwesomeIcon icon="fa-solid fa-moon" className="icon" />
            {weather.sunset}
          </p>
        </li>
        <li className="detail-item">
          <p className="detail-caption">Wind</p>
          <p>
            <FontAwesomeIcon icon="fa-solid fa-wind" className="icon" />
            {weather.windDir} {weather.windSpeed} mph
          </p>
        </li>
        <li className="detail-item">
          <p className="detail-caption">Humidity</p>
          <p>
            <FontAwesomeIcon icon="fa-solid fa-water" className="icon" />
            {weather.humidity} %
          </p>
        </li>
        <li className="detail-item">
          <p className="detail-caption">Visibility</p>
          <p>
            <FontAwesomeIcon icon="fa-solid fa-eye" className="icon" />
            {weather.visibility} km
          </p>
        </li>
        <li className="detail-item">
          <p className="detail-caption">Pressure</p>
          <p>
            <FontAwesomeIcon
              icon="fa-solid fa-arrows-down-to-line"
              className="icon"
            />
            {weather.pressure} hPa
          </p>
        </li>
      </ul>
    </React.Fragment>
  );
};

export default Today;
