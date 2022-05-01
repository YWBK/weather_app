import React from "react";
import Link from "react-router-dom";
import CityCard from "./city_card";

const Home = () => {
  return (
    <React.Fragment>
      <h1>Weather App</h1>
      <CityCard />
      <CityCard />
      <CityCard />
      <CityCard />
      <CityCard />
    </React.Fragment>
  )
}

export default Home