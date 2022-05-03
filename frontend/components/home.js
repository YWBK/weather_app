import React from "react";
import Navbar from "./navbar";
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