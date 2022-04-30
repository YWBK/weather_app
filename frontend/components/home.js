import React from "react";
import Link from "react-router-dom"

const Home = () => {
  return (
    <React.Fragment>
      <h1>Weather App</h1>
      <input 
        type="text" 
        placeholder="Search city" />
      <input 
        type="submit"
        value="Search" />
    </React.Fragment>
  )
}

export default Home