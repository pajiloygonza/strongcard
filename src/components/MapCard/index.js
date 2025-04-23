import React, { useState } from "react";
import "./style.css";

const MapCard = ({ place }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed((prevState) => !prevState);
  };

  const getImagePath = (img) => {
    try {
      return require(`../../assets/img/${img}`);
    } catch (error) {
      console.error(`Image not found: ${img}`);
      return ""; // Возвращаем пустую строку, если изображение не найдено
    }
  };

  return (
    <div className={`box__map__card ${isCollapsed ? "collapsed" : ""}`}>
      <div
        className="map__card"
        style={{
          width: isCollapsed ? "30px" : "300px",
        }}
      >
        <div
          className={`map__card__container ${isCollapsed ? "collapsed" : ""}`}
          style={{
            visibility: isCollapsed ? "hidden" : "visible",
            width: isCollapsed ? "0px" : "260px",
            overflow: "hidden",
            transition: "all 0.5s ease-in-out",
          }}
        >
          {place ? (
            <>
              <div className="map__card__discount">
                <p>{place.discount || "20%"}</p>
              </div>
              <div className="map__card__logo">
                <a href="#">
                  <img
                    src={getImagePath(place.img)}
                    alt={place.name || "Изображение"}
                  />
                </a>
              </div>
              <div className="map__card__title">
                <p className="map__card__title__p">
                  {place.type || "Ресторан"}
                </p>
                <h4 className="map__card__title__h4">
                  {place.name || "Название"}
                </h4>
              </div>
              <div className="map__card__address">
                <h4 className="map__card__address__h4">Адрес</h4>
                <p className="map__card__address__p">{place.address || ""}</p>
              </div>
              <div className="map__card__phone">
                <h4 className="map__card__phone__h4">Телефон</h4>
                <p className="map__card__phone__p">{place.phone || ""}</p>
                <p className="map__card__phone__p">{place.phone2 || ""}</p>
              </div>
              <div className="map__card__content">
                <div className="map__card__button">
                  <button className="map__card__button__button">
                    Подробнее
                  </button>
                </div>
              </div>
            </>
          ) : (
            <p className="map__card__first_p">Выберите место на карте</p>
          )}
        </div>
      </div>
      <button className="map__card__sliderButton" onClick={toggleCollapse}>
        <span
          className="map__card__sliderButton__icon"
          style={{
            transform: !isCollapsed ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          ▶
        </span>
      </button>
    </div>
  );
};

export default MapCard;
