import React from "react";
import Link from "react-router-dom";
import CityCard from "./city_card";

const Home = () => {
  const nyc = [
    "Manhattan, NY", 
    "Queens, NY", 
    "Brooklyn, NY", 
    "Bronx, NY", 
    "Staten Island, NY"];

  return (
    <React.Fragment>
      <h1>Weather App</h1>
      {nyc.map((borough, idx) => (
        <CityCard key={idx} cityHolder={borough} />  
    ))}
    </React.Fragment>
  )
}

export default Home