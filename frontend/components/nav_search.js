import React from "react";
import { useHistory } from "react-router-dom";
import { debounce } from "lodash";
import { fetchCities } from "../util/city_api_util";
import { concatCityName, setSearchOptions } from "../util/functions_util";
import { fetchWeather } from "../util/weather_api_util";

const NavSearch = () => {
  const [query, setQuery] = React.useState("");
  const [options, setOptions] = React.useState([]);
  const [listOpen, setListOpen] = React.useState(false);
  const optionsList = React.useRef(null);
  const history = useHistory();

  const fetch = React.useMemo(() => {
    return debounce(query => {
      fetchCities(query).then(res => {
        setOptions(setSearchOptions(res))
        return setListOpen(true);
      })
    }, 300)
  }, [])

  React.useEffect(() => {
    if (query === "") return undefined;
    return fetch(query);
  }, [query])

  const closeList = e => {
    if (optionsList.current 
      && listOpen 
      && !optionsList.current.contains(e.target)) {
        return setListOpen(false);
      }
  }

  document.addEventListener('mousedown', closeList);

  const handleSelect = (geo, city)  => {
    setOptions([]);
    setQuery("");
    return fetchWeather(geo)
      .then(res => {
        let id = res.id;
        history.push(`/${id}`)
      })
  }

  return (
      <div className="nav-search-wrapper">
        <input
          type="text"
          placeholder="search city"
          value={query}
          onChange={ e => setQuery(e.currentTarget.value)}
        />
        { listOpen
            ? <ul className="search-options" ref={optionsList}>
                { options.map((option, i) => {
                  return (
                    <li 
                      key={i}
                      onClick={ () => handleSelect(option.geo, option.cityName)}
                    >
                        {option.cityName}
                    </li>
                  )
                })}
              </ul>
            : <ul className="search-options" ></ul>
        }
        
      </div>
  )
}

export default NavSearch