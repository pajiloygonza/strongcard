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
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cartItems, setCartItems] = useState([]); // Состояние для корзины
  const [isCartOpen, setIsCartOpen] = useState(false); // Состояние для попапа корзины

  const categoryOptions = [
    { value: "", label: "Все" },
    ...Array.from(new Set(places.map((place) => place.category))).map(
      (category) => ({ value: category, label: category })
    ),
  ];

  const filteredGoods = places.filter((item) => {
    const discountValue = parseInt(item.discount.replace(/\D/g, ""), 10);
    const matchesCategory =
      selectedCategory === "" || item.category === selectedCategory;
    return discountValue >= minDiscount && matchesCategory;
  });

  const sortedGoods = [...filteredGoods].sort((a, b) => {
    if (sortOption === "dateAdded") {
      return new Date(b.added) - new Date(a.added);
    }
    if (sortOption === "releaseDate") {
      return a.name.localeCompare(b.name, "ru", { sensitivity: "base" });
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

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      if (prevItems.find((cartItem) => cartItem.id === item.id)) {
        return prevItems; // Если товар уже в корзине, не добавляем его снова
      }
      return [...prevItems, item];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
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
          <div className="catalog__selects">
            <CustomSelect
              label="Сортировать по:"
              options={sortOptions}
              selectedValue={sortOption}
              onChange={setSortOption}
            />
          </div>
        </div>
        <div className="catalog__list">
          <div className="title__and__cart">
            <h1 className="catalog__list__title">Список Услуг</h1>
            <button className="open-cart" onClick={toggleCart}>
              Открыть корзину
            </button>
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
                    <button className="add" onClick={() => addToCart(item)}>
                      Добавить в корзину
                    </button>
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
        {isCartOpen && (
          <div className="cart-popup">
            <div className="cart-popup__content">
              <button className="close-cart" onClick={toggleCart}>
                Закрыть
              </button>
              <h2>Корзина</h2>
              {cartItems.length === 0 ? (
                <p className="p__cart">Корзина пуста</p>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <h3 className="cart-popup__content__h3">{item.name}</h3>
                    <p>Скидка: {item.discount}</p>
                    <button
                      className="cart-item__remove"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Удалить
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
        <BannerAd />
      </div>
    </div>
  );
};

export default Catalog;
