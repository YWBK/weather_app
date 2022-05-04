import React from "react";
import { Link } from "react-router-dom";
import NavSearch from "./nav_search";

const Navbar = () => {
  return (
      <div className="home-link-wrapper">
        <Link className="home-link" to="/">Weather App</Link>
        <NavSearch />
      </div>
  )
}

export default Navbar