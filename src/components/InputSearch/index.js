import React, { useEffect, useState } from "react";
import data from "../../data/data.json";

const InputSearch = ({ onPlaceSelect }) => {
  const [searchText, setSearchText] = useState("");
  const [isInputListVisible, setIsInputListVisible] = useState(false);

  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
    if (e.target.value) {
      setIsInputListVisible(true);
    } else {
      setIsInputListVisible(false);
    }
  };

  const handleItemClick = (item) => {
    setSearchText(item.name);
    setIsInputListVisible(false);
    onPlaceSelect(item.geo);
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().startsWith(searchText.toLowerCase())
  );

  useEffect(() => {
    if (isInputListVisible) {
      setHighlightedIndex(-1);
    }
  }, [isInputListVisible]);
  return (
    <>
      <div className="map__search">
        <input
          type="text"
          className="map__search__input"
          placeholder="Поиск по карте"
          value={searchText}
          onChange={handleInputChange}
        />
        <button className="map__search__icon">
         
        </button>
      </div>
      {isInputListVisible && (
        <div className="map__search__input__list">
          <ul>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <li
                  key={item.id}
                  className={highlightedIndex === index ? "highlighted" : ""}
                  onClick={() => handleItemClick(item)}
                >
                  {item.name}
                </li>
              ))
            ) : (
              <li>Ничего не найдено</li>
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default InputSearch;
