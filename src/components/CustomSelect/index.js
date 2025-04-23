import React, { useState, useRef, useEffect } from "react";

const CustomSelect = ({ options, selectedValue, onChange, label }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const selectRef = useRef(null);

  const handleOptionClick = (value) => {
    onChange(value);
    setIsDropdownVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <label className="custom-select__label">
      {label}
      <div className="custom-select" ref={selectRef}>
        <div
          className="custom-select__selected "
          onClick={() => setIsDropdownVisible((prev) => !prev)}
        >
          {options.find((option) => option.value === selectedValue)?.label ||
            "Все"}
        </div>
        {isDropdownVisible && (
          <ul className="custom-select__options">
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </label>
  );
};

export default CustomSelect;
