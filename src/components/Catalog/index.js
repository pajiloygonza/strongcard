import React, { useState } from "react";
import "./style.css";
import goodscard from "../../assets/img/goodscard.jpg";
import sliderMenu from "../../assets/img/sliderMenu.png";
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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState("");

 const filteredGoods = places.filter((item) => {
   // Убедимся, что discount всегда корректно преобразуется в число
   const discountValue = parseInt(item.discount.replace(/\D/g, ""), 10); // Удаляем все нечисловые символы
   console.log(
     `Товар: ${item.name}, Скидка: ${discountValue}, minDiscount: ${minDiscount}`
   );
   return discountValue >= minDiscount;
 });

  // Сортируем заведения
  const sortedGoods = [...filteredGoods].sort((a, b) => {
    if (sortOption === "dateAdded") return b.id - a.id;
    if (sortOption === "releaseDate") return b.discount - a.discount;
    if (sortOption === "rating") return b.name.localeCompare(a.name);
    return 0;
  });

  // Обновляем стиль ползунка
  const handleSliderChange = (e) => {
    setMinDiscount(Number(e.target.value));
    const slider = e.target;
    const value =
      ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
    slider.style.setProperty("--slider-value", `${value}%`);
  };

  // Формируем список опций для CustomSelect из places
  const placeOptions = places.map((place) => ({
    value: place.id,
    label: place.name,
  }));

  return (
    <div className="catalog">
      <div className="catalog__container">
        <div className="catalog__filter">
          <div
            className="catalog__filter__back"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <img src={sliderMenu} alt="sliderMenu" />
            <h3>Фильтр</h3>
          </div>
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
              label="Заведения"
              options={placeOptions}
              selectedValue={selectedPlace}
              onChange={setSelectedPlace}
            />
          </div>
        </div>
        <div className="catalog__list">
          <h1 className="catalog__list__title">Список Услуг</h1>

          <div className="catalog__list__sorting">
            <CustomSelect
              label="Сортировать по:"
              options={sortOptions}
              selectedValue={sortOption}
              onChange={setSortOption}
            />
          </div>

          <div className="catalog__list__goods">
            {sortedGoods.length > 0 ? (
              sortedGoods.map((item) => (
                <div className="catalog__list__goods__card" key={item.id}>
                  <div className="catalog__list__goods__card__img">
                    <img src={item.image} />
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
                Нет товаров с такой скидкой :(
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
