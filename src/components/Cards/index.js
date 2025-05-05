import React, { useState, useEffect, useMemo } from "react";
import "./style.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { places } from "../../data";
import Buttons from "../Buttons";
import { Link } from "react-router-dom";
import BannerAd from "../BannerAd";
import { Pagination } from "swiper/modules";

const Cards = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [prevPage, setPrevPage] = useState(1);
  const [animationClass, setAnimationClass] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(3);

  // ❌ Удалил фильтрацию по дате
  const filteredPlaces = useMemo(() => places, []);

  const totalPages = Math.ceil(filteredPlaces.length / itemsPerPage);

  const paginatedPlaces = useMemo(() => {
    return filteredPlaces.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredPlaces, currentPage, itemsPerPage]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setItemsPerPage(1);
      } else if (window.innerWidth <= 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    handleResize();
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
            {paginatedPlaces.length > 0 ? (
              <Swiper
                slidesPerView={itemsPerPage}
                spaceBetween={30}
                pagination={{ clickable: true }}
                modules={[Pagination]}
                className="mySwiper"
              >
                {paginatedPlaces.map((place) => (
                  <SwiperSlide key={place.id}>
                    <Link
                      to={`/about/${place.id}`}
                      className="cards-banner__link"
                    >
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
            ) : (
              <p className="no-data">Нет данных для отображения</p>
            )}
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
