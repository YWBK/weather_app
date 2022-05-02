import React, { useEffect } from "react";
import createStore from "runtime-memcache";
import { fetchCities } from "../util/city_api_util";
import { fetchWeather } from "../util/weather_api_util";

const CityCard = ({ cityHolder }) => {
  const [query, setQuery] = React.useState(cityHolder);
  const [options, setOptions] = React.useState([]);
  const [selectedCity, setSelectedCity] = React.useState("");
  const [weather, setWeather] = React.useState("");
  const [temp, setTemp] = React.useState("");

  useEffect(() => {
    prepopulateCard();
  }, []);

  const prepopulateCard = () => {
    return fetchCities(query).then(res => {
      setQuery("");
      const cityName = concatCityName(res[0]);
      const geo = [res[0]['lat'], res[0]['lon']];
      return handleSelect(geo, cityName);
    })
  }

  const getCities = () => {
    fetchCities(query).then(res => {
      setQuery("");
      return setOptions(
        res.map(cityGeo => {
          const cityName = concatCityName(cityGeo);
          const geo = [cityGeo['lat'], cityGeo['lon']]
          return { cityName: cityName, geo: geo}
        })
      )
    })
  }

  const concatCityName = (cityGeo) => {
    return (cityGeo['state']
      ? `${cityGeo['name']}, ${cityGeo['state']}, ${cityGeo['country']}`
      : `${cityGeo['name']}, ${cityGeo['country']}`
    );
  }

  const handleSubmit = e => {
    e.preventDefault();
    return getCities();
  }

  const handleSelect = (geo, city)  => {
    setOptions([]);
    return fetchWeather(geo)
      .then(res => {
        setSelectedCity(city);
        setWeather(res.weather[0].main);
        setTemp(kelvinToFahrenheit(res.main.temp));
      })
  }

  const kelvinToFahrenheit = k => {
    const f = Math.round(((k - 273.15) * 9) / 5 + 32);
    return f;
  }

  return (
    <React.Fragment>
      <div>
        <input 
          type="text" 
          placeholder="Search city"
          value={query}
          onChange={ e => setQuery(e.currentTarget.value) } />
        <input 
          type="submit"
          value="Search" 
          onClick={ e => handleSubmit(e) } />
      </div>
      <ul className="searchOptions">
      { options.map((option, idx) => {
          return (
            <li 
              key={idx}
              onClick={ () => handleSelect(option.geo, option.cityName) } >
                {option.cityName}
            </li>
          )
      })}
      </ul>
      <div>
        <h2>{selectedCity}</h2>
        <h4>{weather}</h4>
        <h4>{temp} {temp ? '°F' : ''}</h4>
      </div>
    </React.Fragment>
  )
}

export default CityCard