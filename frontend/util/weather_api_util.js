export const fetchWeather = geo => {
  const [lat, lon] = geo;
  return ($.ajax({
    method: 'GET',
    url: `api/weather?lat=${lat}&lon=${lon}`
  }))
}