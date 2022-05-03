import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
      <div className="home-link-wrapper">
        <Link className="home-link" to="/">Weather App</Link>
      </div>
  )
}

export default Navbar