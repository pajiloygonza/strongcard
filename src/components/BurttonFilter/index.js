import React, { useState, useRef, useEffect } from "react";
import sliderMenu from "../../assets/img/sliderMenu.png";
import "./style.css";

const ButtonFilter = () => {
  const [isButtonListVisible, setIsButtonListVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [discount, setDiscount] = useState(0);
  const [selectedCity, setSelectedCity] = useState("");
  const [isCategoryDropdownVisible, setIsCategoryDropdownVisible] =
    useState(false);
  const [isCityDropdownVisible, setIsCityDropdownVisible] = useState(false);

  const popupRef = useRef(null);
  const logoRef = useRef(null);

  const categories = [
    { value: "", label: "Все" },
    { value: "restaurant", label: "Ресторан" },
    { value: "cafe", label: "Кафе" },
    { value: "shop", label: "Магазин" },
    { value: "bar", label: "Бар" },
    { value: "barbershop", label: "Барбершоп" },
    { value: "gym", label: "Спортзал" },
    { value: "hotel", label: "Отель" },
  ];

  const cities = [
    { value: "", label: "Все" },
    { value: "Минск", label: "Минск" },
    { value: "Гомель", label: "Гомель" },
    { value: "Брест", label: "Брест" },
    { value: "Витебск", label: "Витебск" },
    { value: "Гродно", label: "Гродно" },
    { value: "Могилев", label: "Могилев" },
  ];

  const handleButtonClick = () => {
    setIsButtonListVisible((prev) => !prev);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setIsCategoryDropdownVisible(false);
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
    setIsCityDropdownVisible(false);
  };

  const handleSliderChange = (e) => {
    setDiscount(e.target.value);
  };

  useEffect(() => {
    const slider = document.querySelector(".discount-slider");
    if (slider) {
      slider.style.background = `linear-gradient(to right, #ffd700 ${discount}%, #ddd ${discount}%)`;
    }
  }, [discount]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        (!logoRef.current || !logoRef.current.contains(event.target))
      ) {
        setIsButtonListVisible(false);
        setIsCategoryDropdownVisible(false);
        setIsCityDropdownVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <button
        className="map__search__menu"
        onClick={handleButtonClick}
        ref={logoRef} // Реф для логотипа
      >
        <img
          className="map__search__menu__img"
          src={sliderMenu}
          alt="sliderMenu"
        />
      </button>
      {isButtonListVisible && (
        <div className="map__search__button__list" ref={popupRef}>
          <ul>
            <li>
              <label className="map__search__button__list__label">
                Выберите категорию:
                <div className="custom-select">
                  <div
                    className="custom-select__selected"
                    onClick={() =>
                      setIsCategoryDropdownVisible((prev) => !prev)
                    }
                  >
                    {categories.find((cat) => cat.value === selectedCategory)
                      ?.label || "Все"}
                  </div>
                  {isCategoryDropdownVisible && (
                    <ul className="custom-select__options">
                      {categories.map((category) => (
                        <li
                          key={category.value}
                          onClick={() => handleCategoryChange(category.value)}
                        >
                          {category.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </label>
            </li>
            <li>
              <label>
                Скидка:
                <input
                  type="range"
                  value={discount}
                  onChange={handleSliderChange}
                  min="0"
                  max="100"
                  step="5"
                  className="discount-slider"
                />
                <div className="discount-value">{discount}%</div>
              </label>
            </li>
            <li>
              <label className="map__search__button__list__label">
                Город:
                <div className="custom-select">
                  <div
                    className="custom-select__selected"
                    onClick={() => setIsCityDropdownVisible((prev) => !prev)}
                  >
                    {cities.find((city) => city.value === selectedCity)
                      ?.label || "Все"}
                  </div>
                  {isCityDropdownVisible && (
                    <ul className="custom-select__options">
                      {cities.map((city) => (
                        <li
                          key={city.value}
                          onClick={() => handleCityChange(city.value)}
                        >
                          {city.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </label>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default ButtonFilter;
