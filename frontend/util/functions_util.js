export const handleSubmit = (e, req) => {
  // 
  e.preventDefault();
  return req();
}

export const handleEnter = (e, req) => {
  if (e.key === 'Enter') {
    e.target.blur();
    return handleSubmit(e, req);
  }
}

export const concatCityName = cityGeo => {
  return (cityGeo['state']
    ? `${cityGeo['name']}, ${cityGeo['state']}, ${cityGeo['country']}`
    : `${cityGeo['name']}, ${cityGeo['country']}`
  );
}

export const convertWindDir = deg => {
  if (deg >= 337.5 || deg < 22.5) {
    return 'N';
  } else if (deg < 67.5) {
    return 'NE';
  } else if (deg < 112.5) {
    return 'E';
  } else if (deg < 157.5) {
    return 'SE';
  } else if (deg < 202.5) {
    return 'S';
  } else if (deg < 247.5) {
    return 'SW';
  } else if (deg < 292.5) {
    return 'W';
  } else if (deg < 337.5) {
    return 'NW';
  }
}

export const getDayAndDate = timestamp => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let d = new Date(timestamp * 1000);
  let day = days[d.getDay()];
  let date = d.getDate();
  return `${day} ${date}`;
}

export const getTime = (timestamp, timezone) => {
  let localTimezone = new Date(timestamp * 1000);
  let offset = localTimezone.getTimezoneOffset() * 60;
  let localOffset = timezone + offset;
  let d = new Date((timestamp + localOffset) * 1000);
  return d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric' });
}

export const setSearchOptions = json => {
  if (json.length < 1) {
    return [{ cityName: 'No results. Search another city.'}];
  }
  return json.map(cityGeo => {
    const cityName = concatCityName(cityGeo);
    const geo = [cityGeo['lat'], cityGeo['lon']];
    return { cityName: cityName, geo: geo};
  })
}