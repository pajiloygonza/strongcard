import React from "react";
import "./style.css";

const SlideMenuBurger = ({ isOpen, toggleMenu }) => {
  return (
    <>
      <div
        className={`slide__left ${isOpen ? "open" : ""}`}
        onClick={toggleMenu}
      ></div>
      <div className={`slide__right ${isOpen ? "open" : ""}`}>
        <ul className="slide__right__ul">
          <div className="slide__right__all__li">
            <li className="slide__right__ul__li">
              Выберите город{" "}
              <svg
                className="slide__right__ul__svg"
                viewBox="-2.4 -2.4 28.80 28.80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                transform="rotate(180)"
                stroke="#ffffff"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M15 7L10 12L15 17"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />{" "}
                </g>
              </svg>
            </li>
            <li className="slide__right__ul__li">
              Карточки
              <svg
                className="slide__right__ul__svg"
                viewBox="-2.4 -2.4 28.80 28.80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                transform="rotate(180)"
                stroke="#ffffff"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M15 7L10 12L15 17"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />{" "}
                </g>
              </svg>
            </li>
            <li className="slide__right__ul__li">
              Акции
              <svg
                className="slide__right__ul__svg"
                viewBox="-2.4 -2.4 28.80 28.80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                transform="rotate(180)"
                stroke="#ffffff"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M15 7L10 12L15 17"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />{" "}
                </g>
              </svg>
            </li>
            <li className="slide__right__ul__li">
              Сотрудничество
              <svg
                className="slide__right__ul__svg"
                viewBox="-2.4 -2.4 28.80 28.80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                transform="rotate(180)"
                stroke="#ffffff"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M15 7L10 12L15 17"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />{" "}
                </g>
              </svg>
            </li>
            <li className="slide__right__ul__li">
              Контакты
              <svg
                className="slide__right__ul__svg"
                viewBox="-2.4 -2.4 28.80 28.80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                transform="rotate(180)"
                stroke="#ffffff"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M15 7L10 12L15 17"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />{" "}
                </g>
              </svg>
            </li>
            <li className="slide__right__ul__li">
              FAQ
              <svg
                className="slide__right__ul__svg"
                viewBox="-2.4 -2.4 28.80 28.80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                transform="rotate(180)"
                stroke="#ffffff"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M15 7L10 12L15 17"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />{" "}
                </g>
              </svg>
            </li>
          </div>
          <div className="slide__right__ul__buttons">
            <button className="slide__right__button">Зарегистрироваться</button>
            <button className="slide__right__button">Войти</button>
          </div>
        </ul>
        <div className="slide__right__ul__close" onClick={toggleMenu}>
          <span
            className={`slide__right__ul__close__span ${
              isOpen ? "rotate" : ""
            }`}
          >
            ▶
          </span>
        </div>
      </div>
    </>
  );
};

export default SlideMenuBurger;
