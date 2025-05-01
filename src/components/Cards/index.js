import React, { useState, useEffect, useMemo } from "react";
import "./style.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { places } from "../../data";
import Buttons from "../Buttons";
import { Link } from "react-router-dom";
import BannerAd from "../BannerAd";

const Cards = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [prevPage, setPrevPage] = useState(1);
  const [animationClass, setAnimationClass] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(3);

  // Мемоизируем отфильтрованные данные
  const filteredPlaces = useMemo(() => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    return places.filter((place) => {
      const addedDate = new Date(place.added);
      return addedDate >= startOfMonth && addedDate <= endOfMonth;
    });
  }, [places]);

  const totalPages = Math.ceil(filteredPlaces.length / itemsPerPage);

  // Мемоизируем пагинацию
  const paginatedPlaces = useMemo(() => {
    return filteredPlaces.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredPlaces, currentPage, itemsPerPage]);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(3); // Тут можно динамически менять значение в зависимости от ширины, если нужно
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (currentPage > prevPage) {
      setAnimationClass("fade-slide-left");
    } else if (currentPage < prevPage) {
      setAnimationClass("fade-slide-right");
    }

    const timer = setTimeout(() => {
      setAnimationClass("");
    }, 500);

    return () => clearTimeout(timer);
  }, [currentPage, prevPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setPrevPage(currentPage);
      setCurrentPage(page);
    }
  };

  return (
    <div className="cards-banner">
      <div className="cards-banner__content">
        <div className="cards-banner__main">
          <div className="cards-banner__header">
            <h2 className="cards-banner__title">Новые компании</h2>
          </div>
          <div className={`swiper-container ${animationClass}`}>
            <Swiper allowTouchMove={false}>
              {paginatedPlaces.map((place) => (
                <SwiperSlide key={place.id}>
                  <Link to={`/about/${place.id}`} className="cards-banner__link">
                    <div className="cards-banner__place">
                      <div className="cards-banner__header">
                        <div className="cards-banner__discount">
                          {place.discount}
                        </div>
                        <div className="cards-banner__image-container">
                          <img
                            src={place.image}
                            alt={place.name}
                            className="cards-banner__image"
                          />
                        </div>
                      </div>
                      <div className="cards-banner__info">
                        <span className="cards-banner__category">
                          {place.category}
                        </span>
                        <h3 className="cards-banner__name">{place.name}</h3>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <Buttons
            onPageChange={handlePageChange}
            currentPage={currentPage}
            totalPages={totalPages}
            className="cards-banner__buttons"
          />
        </div>
        <BannerAd />
      </div>
    </div>
  );
};

export default Cards;
