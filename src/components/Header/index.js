import React, { useState, useEffect } from "react";
import "./style.css";

import logo from "../../assets/img/logo2.jpg";

import vk from "../../assets/img/vk-logo-svgrepo-com.svg";
import odnoklassniki from "../../assets/img/icons8-одноклассники.svg";
import instagram from "../../assets/img/instagram-svgrepo-com.svg";
import Banner from "../Banner";
import BurgerMenuHeader from "../BurgerMenuHeader";
import Promotions from "../Promotions";
import { Link } from "react-router-dom";


const cities = ["Минск", "Гомель", "Могилев", "Витебск", "Гродно", "Брест"];
const catalogs = ["1", "2", "3", "4", "5"];

const Header = ({ setIsLoginPopupVisible, setIsSignupPopupVisible }) => {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCatalog, setSelectedCatalog] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((response) => response.json())
      .then((data) => {
        const userCity = data.city;
        if (cities.includes(userCity)) {
          setSelectedCity(userCity);
        } else {
          setSelectedCity("Минск");
        }
      })
      .catch(() => {
        setSelectedCity("Минск");
      });
  }, []);

  const toggleCityDropdown = () => {
    setOpenDropdown(openDropdown === "city" ? null : "city");
  };

  const toggleCatalogDropdown = () => {
    setOpenDropdown(openDropdown === "catalog" ? null : "catalog");
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setOpenDropdown(null);
  };

  const handleCatalogSelect = (catalog) => {
    setSelectedCatalog(catalog);
    setOpenDropdown(null);
  };

  return (
    <header className="header">
      <Link to="/">
        <div className="header__logo">
          <img src={logo} alt="logo" />
        </div>
      </Link>

      <div className="header__nav">
        <div className="header__nav__top">
          {/* <div className="header__nav__top__serch">
            <input type="text" placeholder="Найти на сайте..." />
            <div className="header__nav__top__serch__icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                width="20px"
                height="20px"
              >
                <path
                  d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"
                  fill="#fff"
                />
              </svg>
            </div>  
          </div> */}
          <div className="header__nav__top__auth">
            <button
              className="header__nav__top__auth__btn"
              onClick={() => setIsSignupPopupVisible(true)}
            >
              Зарегистрироваться
            </button>
            <button
              className="header__nav__top__auth__btn"
              onClick={() => setIsLoginPopupVisible(true)}
            >
              Войти
            </button>
          </div>
          <BurgerMenuHeader />
        </div>
        <div className="header__nav__bottom">
          <ul className="header__nav__bottom__list">
            <li
              className="header__nav__bottom__list__item"
              onClick={toggleCityDropdown}
            >
              {/* <div className="custom-select">
                <div className="select-selected">
                  {selectedCity || "Выберите город"}
                </div>
                {openDropdown === "city" && (
                  <div className="select-items">
                    {cities.map((city) => (
                      <div key={city} onClick={() => handleCitySelect(city)}>
                        {city}
                      </div>
                    ))}
                  </div>
                )}
              </div> */}
            </li>
            <li className="header__nav__bottom__list__item">
              <Link to="/catalog">Каталог</Link>
            </li>
            <li className="header__nav__bottom__list__item">
              <a href="#">Карточки</a>
            </li>
            <li className="header__nav__bottom__list__item">
              <a href="#">Акции</a>
            </li>
            {/* <li className="header__nav__bottom__list__item">
              <Link to="/business">Сотрудничество</Link>
            </li> */}
            {/* <li className="header__nav__bottom__list__item">
              <a href="#">Контакты</a>
            </li>
            <li className="header__nav__bottom__list__item">
              <a href="#">FAQ</a>
            </li> */}
          </ul>
          <div className="header__nav__bottom__social">
            <div className="header__nav__bottom__phone">
              <span className="header__nav__bottom__phone__number">
                +375 (29) 123-45-67
              </span>
            </div>
            <div className="header__nav__bottom__social__icons">
              <a href="#">
                <img src={vk} alt="vk" />
              </a>
              <a href="#">
                <img src={odnoklassniki} alt="odnoklassniki" />
              </a>
              <a href="#">
                <img src={instagram} alt="instagram" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
