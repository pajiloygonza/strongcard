import React, { useState } from "react";
import "./style.css";
import { places } from "../../data";
import BannerAd from "../BannerAd";
import CustomSelect from "../CustomSelect";

const sortOptions = [
  { value: "dateAdded", label: "Дате добавления" },
  { value: "releaseDate", label: "Алфавиту" },
];

const Catalog = () => {
  const [sortOption, setSortOption] = useState("dateAdded");
  const [minDiscount, setMinDiscount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(""); // Для фильтрации по категории

  // Извлекаем уникальные категории из places
  const categoryOptions = [
    { value: "", label: "Все" },
    ...Array.from(new Set(places.map((place) => place.category))).map(
      (category) => ({ value: category, label: category })
    ),
  ];

  // Фильтруем заведения по категории и скидке
  const filteredGoods = places.filter((item) => {
    const discountValue = parseInt(item.discount.replace(/\D/g, ""), 10); // Удаляем все нечисловые символы
    const matchesCategory =
      selectedCategory === "" || item.category === selectedCategory;
    return discountValue >= minDiscount && matchesCategory;
  });

  // Сортируем заведения
  const sortedGoods = [...filteredGoods].sort((a, b) => {
    if (sortOption === "dateAdded") {
      return new Date(b.added) - new Date(a.added); // Сортировка по дате добавления
    }
    if (sortOption === "releaseDate") {
      return a.name.localeCompare(b.name, "ru", { sensitivity: "base" }); // Сортировка по алфавиту
    }
    return 0;
  });

  const handleSliderChange = (e) => {
    setMinDiscount(Number(e.target.value));
    const slider = e.target;
    const value =
      ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
    slider.style.setProperty("--slider-value", `${value}%`);
  };

  return (
    <div className="catalog">
      <div className="catalog__container">
        <div className="catalog__filter">
          <div className="catalog__filter__options">
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
        </div>
        <div className="catalog__list">
          <h1 className="catalog__list__title">Список Услуг</h1>
          <div className="sorting__selects__and__filter">
            <div className="catalog__list__sorting">
              <CustomSelect
                label="Сортировать по:"
                options={sortOptions}
                selectedValue={sortOption}
                onChange={setSortOption}
              />
            </div>
            <div className="catalog__selects selects__in__catalog">
              <CustomSelect
                label="Категории"
                options={categoryOptions}
                selectedValue={selectedCategory}
                onChange={setSelectedCategory}
              />
            </div>
            <div className="catalog__filter__options filter__in__catalog">
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
          </div>
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
              <p className="catalog__list__goods__none">
                Нет заведений, соответствующих фильтрам :(
              </p>
            )}
          </div>
        </div>
        <BannerAd />
      </div>
    </div>
  );
};

export default Catalog;
