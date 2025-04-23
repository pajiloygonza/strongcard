import React from "react";
import "./style.css";

import vk from "../../assets/img/vk-logo-svgrepo-com.svg";
import odnoklassniki from "../../assets/img/icons8-одноклассники.svg";
import instagram from "../../assets/img/instagram-svgrepo-com.svg";

const Footer = () => {
  return (
    <footer className="mainFooter">
      <div className="mainFooter__info mainFooter__blocks">
        <h4 className="mainFooter__info__h4">
          Информация
          <span className="mainFooter__info mainFooter__blocks__span">:</span>
        </h4>
        <ul className="mainFooter__info__ul">
          <li className="mainFooter__info__li">
            <span className="mainFooter__info__li__p">Карточки</span>
          </li>
          <li className="mainFooter__info__li">
            <span className="mainFooter__info__li__p">Сотрудничество</span>
          </li>
          <li className="mainFooter__info__li">
            <span className="mainFooter__info__li__p">FAQ</span>
          </li>
        </ul>
      </div>
      <div className="mainFooter__contacts mainFooter__blocks">
        <div className="mainFooter__contacts__inside">
          <h4 className="mainFooter__contacts__h4">
            Контакты
            <span className="mainFooter__info mainFooter__blocks__span">:</span>
          </h4>
          <ul className="mainFooter__contacts__ul">
            <li className="mainFooter__contacts__li">
              <span className="mainFooter__contacts__li__p">
                +375 (29) 123-45-67
              </span>
            </li>
            <li className="mainFooter__contacts__li">
              <span className="mainFooter__contacts__li__p">
                +375 (29) 123-45-67
              </span>
            </li>
            <li className="mainFooter__contacts__li">
              <span className="mainFooter__contacts__li__p">
                strongcard.by@gmail.com
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="mainFooter__media mainFooter__blocks">
        <div className="mainFooter__media__box">
          <div className="mainFooter__media__box__insideMedia">
            <a href="#">
              <img src={vk} alt="vk" />
            </a>
            <a href="#">
              <img src={odnoklassniki} alt="odnoklassniki" />
            </a>
            <a href="#">
              <img src={instagram} alt="instagram" />
            </a>
          </div>
          <p className="mainFooter__media__p">
            strongcard.by,{" "}
            {new Date().toLocaleString("en-US", {
              year: "numeric",
              month: "long",
            })}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
