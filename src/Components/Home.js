import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="homeContainer">
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Link to="/login" className="smlCtn">
        Log In
      </Link>
      <Link to="/register" className="smlCtn">
        Register
      </Link>
    </div>
  );
};

export default Home;
