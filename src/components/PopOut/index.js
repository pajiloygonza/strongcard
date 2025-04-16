import React from "react";
import "./style.css"; 

const PopOut = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="popout__overlay">
      <div className="popout__content">
        <button className="popout__close" onClick={onClose}>✖</button>
        <h2>{item.name}</h2>
        <img src={item.image} alt={item.name} />
        <p>{item.description}</p>
        <p>Скидка: {item.discount}</p>
        <p>{item.address}</p>
        <p>{item.phone}</p>
        <p>{item.city}</p>
      </div>
    </div>
  );
};

export default PopOut;