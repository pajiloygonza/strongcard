import React, { useState } from "react";
import "./style.css";
import SlideMenuBurger from "../SlideMenuBurger";

const BurgerMenuHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isContainerVisible, setIsContainerVisible] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setIsContainerVisible(!isContainerVisible);
    console.log("isOpen", isOpen);
  };

  return (
    <>
      <div
        className={`box__burgermenu ${isOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <div className="box__burgermenu__stripe"></div>
        <div className="box__burgermenu__stripe"></div>
        <div className="box__burgermenu__stripe"></div>
      </div>
      <SlideMenuBurger isOpen={isOpen} toggleMenu={toggleMenu}/>
    </>
  );
};

export default BurgerMenuHeader;
