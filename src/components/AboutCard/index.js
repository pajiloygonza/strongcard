import { useParams } from "react-router-dom";
import React, { useRef, useState, useEffect } from "react";
import "./style.css";
import Map from "../Map";

const AboutCard = ({ places }) => {
  const { id } = useParams();
  const place = places.find((place) => place.id === parseInt(id, 10));

  const mapRef = useRef(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const scrollToMap = () => {
    if (mapRef.current) {
      mapRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePhoneCopy = () => {
    navigator.clipboard.writeText(place.phone);
    alert("Телефон скопирован в буфер обмена!");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const dropdownMenu = document.querySelector(".dropdown-menu");
    if (dropdownMenu) {
      if (isDropdownOpen) {
        dropdownMenu.classList.add("open");
      } else {
        dropdownMenu.classList.remove("open");
      }
    }
  }, [isDropdownOpen]);

  if (!place) {
    return <p>Заведение не найдено</p>;
  }

  return (
    <div className="place-details">
      <div className="place-details__header">
        <div className="place-details__image-container">
          <img
            src={place.image}
            alt={place.name}
            className="place-details__image"
          />

          <div className="place-details__actions">
            <button className="place-details__button" onClick={scrollToMap}>
              Смотреть на карте
            </button>
            <button className="place-details__button">Написать отзыв</button>
            <div className="dropdown">
              <button
                className="place-details__button"
                onClick={toggleDropdown}
              >
                Добавить в список
              </button>

              <ul className={`dropdown-menu ${isDropdownOpen ? "open" : ""}`}>
                <li>Смотрю</li>
                <li>Просмотрено</li>
                <li>Отложено</li>
                <li>Брошено</li>
                <li>Запланировано</li>
                <li>Пересматриваю</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="place-details__info">
          <div className="place-details__discount">{place.discount}</div>
          <h2 className="place-details__name">{place.name}</h2>
          <p className="place-details__description">{place.description}</p>
          <div className="place-details__info-row">
            <span className="place-details__label">Адрес:</span>
            <span
              className="place-details__value"
            
          
            >
              {place.address}
            </span>
          </div>
          <div className="place-details__info-row">
            <span className="place-details__label">Город:</span>
            <span className="place-details__value">{place.city}</span>
          </div>
          <div className="place-details__info-row">
            <span className="place-details__label">Телефон:</span>
            <span
              className="place-details__value place-details__phone"
              onClick={handlePhoneCopy}
            >
              {place.phone}
            </span>
          </div>
          <div className="place-details__info-row">
            <span className="place-details__label">Категория:</span>
            <span className="place-details__value">{place.category}</span>
          </div>
        </div>
      </div>
      <div className="place-details__map" ref={mapRef}>
      <Map/> 
      </div>
    </div>
  );
};

export default AboutCard;