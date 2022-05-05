## Background

Weather App is a free weather app that provides up to date weather and forecasts from [OpenWeather](https://openweathermap.org/).
Users are first taken to the home page where they can view weather summaries for 5 different cities. Users may also click for view details or use the search bar to find and view a city's weather details.


## Technologies Used

- React
- Ruby on Rails
- Javascript/HTML/SCSS
- Webpack
- Babel
- OpenWeather free APIs
- Icons from [Font Awesome](https://fontawesome.com/)

## Features

### Search Bar

Users can use the main search bar to search for and navigate to a different city's show page. The search bar makes use of the `useEffect` and `useMemo` hooks in combination with `lodash.debounce` to automatically make an API call to the backend and set the search result options.

```js
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

  const handleSelect = geo  => {
    setOptions([]);
    setQuery("");
    return fetchWeather(geo)
      .then(res => {
        let id = res.id;
        history.push(`/${id}`)
      })
  }
```

### City Cards

Initially, city cards are set to the five boroughs of NYC. Users can choose to search for and set a different city to any card through a modal. City cards make use of `Window.localStorage` to persist users' selected city cards. 

```js
  const handleSelect = (geo, city, idx, citiesDict)  => {
    setOptions([]);
    if (citiesDict && citiesDict[idx] !== city) {
      citiesDict[idx] = city;
      window.localStorage.setItem('cities', JSON.stringify(citiesDict));
    }
    return fetchWeather(geo)
      .then(res => {
        setWeatherData({
          location: city,
          id: res.id,
          main: res.weather[0].main,
          icon: res.weather[0].icon,
          temp: Math.round(res.main.temp)
        })
        closeModal();
        setLoading(true);
        return setTimeout(() => {
          setLoading(false);
        }, "200");
      })
  }
```

### API Endpoints

API endpoints use the REST Client gem to make API calls to OpenWeather. There are two controllers, CitiesController and WeathersController. 

The former fetches cities from OpenWeather based on city name or geographical coordinates.

```rb
class Api::WeathersController < ApplicationController
  require "rest-client"
  require "json"

  def show
    key = Rails.application.credentials.open_weather[:api_key]
    if params[:lat] && params[:lon]
      lat, lon = params[:lat], params[:lon]
      url = "https://api.openweathermap.org/data/2.5/weather?lat=#{lat}&lon=#{lon}&units=imperial&appid=#{key}"
    elsif params[:city_id]
      city_id = params[:city_id]
      url = "https://api.openweathermap.org/data/2.5/forecast?id=#{city_id}&units=imperial&appid=#{key}"
    end
      res = RestClient.get(url)
      render json: res
  end
end
```

The latter fetches current weather based on geographical coordinates or 5-day forecast based on city_id.

```rb
class Api::CitiesController < ApplicationController
  require "rest-client"
  require "json"

  def show
    key = Rails.application.credentials.open_weather[:api_key]
    if params[:city]
      city = params[:city]
      state = params[:state] ? ", #{params[:state]}" : ''
      country = params[:country] ? ", #{params[:country]}" : ''
      url = "http://api.openweathermap.org/geo/1.0/direct?q=#{city}#{state}#{country}&limit=5&appid=#{key}"
    elsif params[:lat] && params[:lon]
      lat, lon = params[:lat], params[:lon]
      url = "http://api.openweathermap.org/geo/1.0/reverse?lat=#{lat}&lon=#{lon}&limit=5&appid=#{key}"
    end
    res = RestClient.get(url)
    parsed = JSON.parse(res.body)
    parsed.map! { |city| city.except("local_names") }
    render json: parsed
  end
end
```