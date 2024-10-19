import React from "react";
import Banner from "../Banner/Banner";
import RProverty from "../RProverty/RProverty";
import RentHouse from "../RentHouse/RentHouse";
import SaleHouse from "../SaleHouse/SaleHouse";
import Review from "../Review/Review";

const Home = (props) => {
  return (
    <div>
      <Banner></Banner>
      <RProverty></RProverty>
      <RentHouse></RentHouse>
      <SaleHouse></SaleHouse>
      <Review></Review>
    </div>
  );
};

export default Home;
