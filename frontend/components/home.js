import React, { useEffect } from "react";
import Navbar from "./navbar";
import CityCard from "./city_card";

const Home = () => {
  // useEffect 
  // check if anything in localStorage
  // if not add const nyc to localStorage

  // useEffect(() => {
  //   window.localStorage.getItem(0)
  // })

  const nyc = [
    "Manhattan, NY, US", 
    "Queens, NY, US",
    "Brooklyn, NY, US", 
    "Bronx, NY, US", 
    "Staten Island, NY, US"];

  return (
    <React.Fragment>
      <Navbar />
      {nyc.map((borough, idx) => (
        <CityCard 
          key={idx}
          idx={idx}
          cityHolder={borough} />  
    ))}
    </React.Fragment>
  )
}

export default Home