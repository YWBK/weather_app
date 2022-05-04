import React, { useEffect } from "react";
import Navbar from "./navbar";
import CityCard from "./city_card";

const Home = () => {
  const [citiesDict, setCitiesDict] = React.useState({});

  useEffect(() => {
    let cities = window.localStorage.getItem('cities')
    if (!!cities) {
      cities = JSON.parse(cities)
      setCitiesDict(cities);
    } else {
      cities = {
        0: "Manhattan, NY, US", 
        1: "Queens, NY, US",
        2: "Brooklyn, NY, US", 
        3: "Bronx, NY, US", 
        4: "Staten Island, NY, US"};
      
      setCards(cities);
      window.localStorage.setItem('cities', JSON.stringify(cities));
    }
  }, [])

  return (
    <React.Fragment>
      <Navbar />
      {Object.values(citiesDict).map((city, idx) => (
        <CityCard 
          key={idx}
          idx={idx}
          cityHolder={city}
          citiesDict={citiesDict} />  
    ))}
    </React.Fragment>
  )
}

export default Home