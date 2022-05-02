export const fetchCities = query => {
  const cityStateCountry = query.split(",").map(part => part.trim());
  let city, state, country;
  switch(cityStateCountry.length) {
    case 1:
      [city] = cityStateCountry;
      break;
    case 2:
      [city, country] = cityStateCountry;
      break;
    case 3:
      [city, state, country] = cityStateCountry;
      break;
    default:
      break;
  }

  const stateQuery = state ? `&state=${state}` : '';
  const countryQuery = country ? `&country=${country}` : '';

  return ($.ajax({
    method: 'GET',
    url: `api/cities?city=${city}${stateQuery}${countryQuery}`
  }))
}
