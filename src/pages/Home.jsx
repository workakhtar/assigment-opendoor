import React from "react";
import Listing from "../components/Listing";
import Map from "../components/Map";

const Home = () => {
  return (
    <div className="d-flex relative">
        <Map />
      <Listing />
      
    </div>
  );
};

export default Home;
