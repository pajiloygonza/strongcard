import React, { useState } from "react";
import Map from "../Map";
import "./style.css";
import Banner from "../Banner";
import Cards from "../Cards";
import PromotionCarousel from "../PromotionCarousel";
import { places, promotions } from "../../data";
import Catalog from "../Catalog";

const Main = () => {
  return (
    <div className="main">
      
      <Map places={places}/>
      <Cards />
      <PromotionCarousel promotions={promotions} />
    </div>
  );
};

export default Main;
