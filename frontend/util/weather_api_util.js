export const fetchWeather = geo => {
  const [lat, lon] = geo;
  return ($.ajax({
    method: 'GET',
    url: `api/weather?lat=${lat}&lon=${lon}`
  }))
}

export const fetchForecast = cityId => {
  const id = cityId.substring(1);
  return ($.ajax({
    method: 'GET',
    url: `api/weather?cityId=${id}`
  }))
}