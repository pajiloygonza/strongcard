// import React, { useState, useEffect } from "react";
import "./style.css";
import ButtonFilter from "../BurttonFilter";
import InputSearch from "../InputSearch";

const MapSearch = ({ onPlaceSelect }) => {
 

  return (
    <>
      <div className="map__search__box">
        <ButtonFilter />
        <InputSearch 
          onPlaceSelect={onPlaceSelect} 
        />
      </div>
    </>
  );
};

export default MapSearch;
