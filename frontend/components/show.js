import React, { useEffect, useInsertionEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./navbar";

const Show = () => {
  let location = useLocation();
  // const { weatherData } = location?.state;

  // useEffect(() => {
  //   if (weatherData) {
  //     debugger
  //   }
  //   else {
  //     // let pathname = location.pathname
  //     debugger
  //   }
  // }, [location])


  return (
    <React.Fragment>
      <Navbar />
      <div>
        Details of City
      </div>
    </React.Fragment>
  )
}

export default Show;