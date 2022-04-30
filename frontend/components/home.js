import React from "react";
import Link from "react-router-dom"

const Home = () => {
  const [searchStr, setSearchStr] = React.useState("");

  return (
    <React.Fragment>
      <h1>Weather App</h1>
      <input 
        type="text" 
        placeholder="Search city"
        value={searchStr}
        onChange={ (e) => setSearchStr(e.currentTarget.value) } />
      <input 
        type="submit"
        value="Search" />
    </React.Fragment>
  )
}

export default Home