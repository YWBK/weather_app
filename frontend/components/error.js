import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <React.Fragment>
      <h1>Page Not Found</h1>
      <Link to="/">Return to Home</Link>
    </React.Fragment>
  );
};

export default Error;
