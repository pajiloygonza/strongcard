import React, { useState } from "react";
import "./style.css";
import { places } from "../../data";
import BannerAd from "../BannerAd";
import CustomSelect from "../CustomSelect";

const Promotions = () => {
  const [sortOption, setSortOption] = useState("dateAdded");

  const sortedGoods = [...places].sort((a, b) => {
    if (sortOption === "dateAdded") return b.id - a.id;
    if (sortOption === "releaseDate") return b.name.localeCompare(a.name);
    return 0;
  });

  return (
    <div className="catalog">
      <div className="catalog__container">
        <div className="catalog__list">
          <h1 className="catalog__list__title">Акции</h1>
          <div className="catalog__list__goods">
            {sortedGoods.length > 0 ? (
              sortedGoods.map((item) => (
                <div className="catalog__list__goods__card" key={item.id}>
                  <div className="catalog__list__goods__card__img">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="catalog__list__goods__card__info">
                    <h2>{item.name}</h2>
                    <p className="discount">Скидка: {item.discount}</p>
                    <p className="description">{item.description}</p>
                    <p className="address">{item.address}</p>
                    <p className="phone">Телефон: {item.phone}</p>
                    <p className="city">{item.city}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>Нет товаров с такой скидкой</p>
            )}
          </div>
        </div>
        <BannerAd />
      </div>
    </div>
  );
};

export default Promotions;
