import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import Loading from "./loading";
import { fetchCities } from "../util/city_api_util";
import { fetchWeather } from "../util/weather_api_util";
import {
  handleSubmit,
  handleEnter,
  concatCityName,
  setSearchOptions,
} from "../util/functions_util";

const customStyles = {
  content: {
    top: "25%",
    left: "25%",
    right: "25%",
    bottom: "25%",
  },
};

const CityCard = ({ idx, cityHolder, citiesDict }) => {
  const [query, setQuery] = useState(cityHolder);
  const [options, setOptions] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    prepopulateCard();
  }, []);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const prepopulateCard = () => {
    return fetchCities(query).then((res) => {
      setQuery("");
      const cityName = concatCityName(res[0]);
      const geo = [res[0]["lat"], res[0]["lon"]];
      return handleSelect(geo, cityName);
    });
  };

  const getCities = () => {
    fetchCities(query).then((res) => {
      setQuery("");
      return setOptions(setSearchOptions(res));
    });
  };

  const handleSelect = (geo, city, idx, citiesDict) => {
    setOptions([]);
    if (citiesDict && citiesDict[idx] !== city) {
      citiesDict[idx] = city;
      window.localStorage.setItem("cities", JSON.stringify(citiesDict));
    }
    return fetchWeather(geo).then((res) => {
      setWeatherData({
        location: city,
        id: res.id,
        main: res.weather[0].main,
        icon: res.weather[0].icon,
        temp: Math.round(res.main.temp),
      });
      closeModal();
      setLoading(true);
      return setTimeout(() => {
        setLoading(false);
      }, "200");
    });
  };

  return (
    <div className="city-card" id={`card-${idx}`}>
      {loading ? (
        <Loading />
      ) : (
        <React.Fragment>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div className="search">
              <input
                type="text"
                placeholder="Search city"
                value={query}
                onKeyDown={(e) => handleEnter(e, getCities)}
                onChange={(e) => setQuery(e.currentTarget.value)}
              />
              <input
                type="submit"
                value="Search"
                onClick={(e) => handleSubmit(e, getCities)}
              />
            </div>
            <ul className="search-options">
              {options.map((option, i) => {
                return (
                  <li
                    key={i}
                    onClick={() =>
                      handleSelect(option.geo, option.cityName, idx, citiesDict)
                    }
                  >
                    {option.cityName}
                  </li>
                );
              })}
            </ul>
          </Modal>
          <div className="card-summary">
            <h2>
              <Link to={`/${weatherData.id}`} className="detail-link">
                {weatherData.location}
              </Link>
            </h2>
            <h4>
              {weatherData.temp} {weatherData.temp ? "°F" : ""}
            </h4>
            <img
              src={`http://openweathermap.org/img/w/${weatherData.icon}.png`}
              alt={weatherData.weather}
            />
            <h4 className="modal-open" onClick={openModal}>
              Search different city
            </h4>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default CityCard;
