import React from "react";
import Navbar from "./navbar";
import CityCard from "./city_card";
import createStore from "runtime-memcache";

const Home = () => {
  // const config = {
  //   policy: "lru",
  //   lruSize: 5,
  // };

  // const userCache = createStore(config);

  const nyc = [
    // "Manhattan, NY", 
    // "Queens, NY", 
    // "Brooklyn, NY", 
    // "Bronx, NY", 
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