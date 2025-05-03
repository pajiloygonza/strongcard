import React, { useState } from "react";
import "./style.css";
import { places } from "../../data";
import BannerAd from "../BannerAd";
import CustomSelect from "../CustomSelect";

const sortOptions = [
  { value: "dateAdded", label: "Дате добавления" },
  { value: "releaseDate", label: "Алфавиту" },
];

const CatalogSales = () => {
  const [sortOption, setSortOption] = useState("dateAdded");
  const [minDiscount, setMinDiscount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(""); // Добавлено состояние для категории
  const [selectedPromotion, setSelectedPromotion] = useState("");

  // Опции для выбора категорий
  const categoryOptions = Array.from(
    new Set(places.map((place) => place.category || "Без категории"))
  ).map((category) => ({
    value: category,
    label: category,
  }));

  // Фильтрация акций по минимальной скидке и выбранной категории
  const filteredPromotions = places.filter((item) => {
    const discountValue = parseInt(
      item.discount?.replace(/\D/g, "") || "0",
      10
    );
    const matchesCategory =
      selectedCategory === "" || item.category === selectedCategory;
    return discountValue >= minDiscount && matchesCategory;
  });

  // Сортировка акций
  const sortedPromotions = [...filteredPromotions].sort((a, b) => {
    if (sortOption === "dateAdded") return new Date(b.date) - new Date(a.date);
    if (sortOption === "releaseDate")
      return (a.title || "").localeCompare(b.title || "");
    return 0;
  });

  // Обработчик изменения значения слайдера
  const handleSliderChange = (e) => {
    setMinDiscount(Number(e.target.value));
    const slider = e.target;
    const value =
      ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
    slider.style.setProperty("--slider-value", `${value}%`);
  };

  // Опции для выбора акций
  const promotionOptions = places.map((promotion) => ({
    value: promotion.title || promotion.description,
    label: promotion.title || promotion.description,
  }));

  return (
    <div className="catalog-sales">
      <div className="catalog-sales__container">
        <div className="catalog-sales__filter">
          <div className="catalog-sales__filter__options">
            <label>
              Скидка:
              <input
                type="range"
                className="slider"
                value={minDiscount}
                onChange={handleSliderChange}
                min="0"
                max="100"
                step="5"
                style={{ "--slider-value": `${minDiscount}%` }}
              />
              <div className="discount-value">{minDiscount}%</div>
            </label>
          </div>
          <div className="catalog__selects">
            <CustomSelect
              label="Категории"
              options={categoryOptions}
              selectedValue={selectedCategory}
              onChange={setSelectedCategory}
            />
          </div>
          <div className="catalog__selects">
            <CustomSelect
              label="Сортировать по:"
              options={sortOptions}
              selectedValue={sortOption}
              onChange={setSortOption}
            />
          </div>
        </div>
        <div className="catalog-sales__list">
          <h1 className="catalog-sales__list__title">Список Акций</h1>
          <div className="catalog__filter__options filter__in_main">
            <label className="filter__label">
              Скидка:
              <input
                type="range"
                className="slider"
                value={minDiscount}
                onChange={handleSliderChange}
                min="0"
                max="100"
                step="5"
                style={{ "--slider-value": `${minDiscount}%` }}
              />
              <div className="discount-value">{minDiscount}%</div>
            </label>
          </div>
          <div className="catalog__selects in_main">
            <CustomSelect
              label="Категории"
              options={categoryOptions}
              selectedValue={selectedCategory}
              onChange={setSelectedCategory}
            />
          </div>
          <div className="catalog__selects in_main">
            <CustomSelect
              label="Сортировать по:"
              options={sortOptions}
              selectedValue={sortOption}
              onChange={setSortOption}
            />
          </div>
          <div className="catalog-sales__list__promotions">
            {sortedPromotions.length > 0 ? (
              sortedPromotions.map((item, index) => (
                <div
                  className="catalog-sales__list__promotions__card"
                  key={index}
                >
                  <div className="catalog-sales__list__promotions__card__img">
                    <img
                      src={item.image}
                      alt={item.title || item.description}
                    />
                  </div>
                  <div className="catalog-sales__list__promotions__card__info">
                    <h2>{item.title || "Без названия"}</h2>
                    <p className="discount">
                      Скидка: {item.discount || "Нет данных"}
                    </p>
                    <p className="description">{item.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="catalog-sales__list__promotions__none">
                Нет акций с такой скидкой :(
              </p>
            )}
          </div>
        </div>
        <BannerAd />
      </div>
    </div>
  );
};

export default CatalogSales;
