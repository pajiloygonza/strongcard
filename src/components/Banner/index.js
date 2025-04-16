import React from "react";
import banner from "../../assets/img/banner.jpg";
import "./style.css";

const Banner = () => {
  return (
    <>
      <div className="main__banner">
        <div className="main__banner__content">
          <img src={banner} alt="banner" />
        </div>
      </div>
    </>
  );
};

export default Banner;
