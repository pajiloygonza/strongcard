import React, { useState, useEffect } from "react";
import "./style.css";
import "swiper/css";
import Buttons from "../Buttons";
import { Swiper, SwiperSlide } from "swiper/react";
import PopOut from "../PopOut";

const PromotionCarousel = ({ promotions }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [prevPage, setPrevPage] = useState(1);
  const [animationClass, setAnimationClass] = useState("");
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const itemsPerPage = 3;

  const totalPages = Math.ceil(promotions.length / itemsPerPage);

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

  const paginatedPromotions = promotions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const calculateTimeLeft = (date) => {
    const now = new Date();
    const targetDate = new Date(date);
    const difference = targetDate - now;
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        isCritical: difference <= 24 * 60 * 60 * 1000,
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, isCritical: false };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(
    promotions.map((promotion) => calculateTimeLeft(promotion.date))
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(
        promotions.map((promotion) => calculateTimeLeft(promotion.date))
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [promotions]);

  return (
    <div className="promotion-carousel">
      <div className="promotion-content">
        <div className="promotion-main">
          <div className="promotion-header-container">
            <div className="promotion-header">
              <h2 className="promotion-header-text">Акции</h2>
              {/* <button className="view-all-button">Все акции</button> */}
            </div>
            <div className="advertisement-placeholder">
              <span>Здесь могла быть ваша реклама</span>
            </div>
          </div>

          <div className={`swiper-container ${animationClass}`}>
            <Swiper className="mySwiper">
              {paginatedPromotions.map((promotion, index) => {
                const { days, hours, minutes, isCritical } =
                  timeLeft[(currentPage - 1) * itemsPerPage + index];
                return (
                  <SwiperSlide key={index}>
                    <div
                      className="promotion-card"
                      onClick={() => setSelectedPromotion(promotion)}
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={promotion.image}
                        alt={promotion.title}
                        className={`promotion-image ${
                          promotion.type === "restaurant" ? "small-image" : ""
                        }`}
                      />
                      <div className="promotion-details">
                        <h3 className="promotion-details-header">
                          {promotion.title}
                        </h3>
                        <p className="promotion-details-description">
                          {promotion.description}
                        </p>
                        {promotion.type !== "promotion" && (
                          <div
                            className={`promotion-timer ${
                              isCritical ? "critical-timer" : ""
                            }`}
                          >
                          </div>
                        )}
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>

          <Buttons
            onPageChange={handlePageChange}
            currentPage={currentPage}
            totalPages={totalPages}
            className="promotion-buttons"
          />
        </div>
      </div>

      
      {selectedPromotion && (
        <PopOut
          item={selectedPromotion}
          onClose={() => setSelectedPromotion(null)}
        />
      )}
    </div>
  );
};

export default PromotionCarousel;
