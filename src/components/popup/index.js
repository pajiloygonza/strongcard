import React from "react";
import "./assets/css/style.css";

import { Link } from "react-router-dom";

export const Popup = ({ isVisible, setIsVisible, children }) => {
  return (
    <>
      {isVisible && (
        <>
          <div
            className="fixed inset-0 bg-black/20 modal-mask-enter-done "
            style={{ zIndex: 1000, pointerEvents: "auto" }}
            onClick={() => {
              setIsVisible(false);
            }}
          />
          <div className="container__register" style={{ zIndex: 1001 }}>
            <div className="container__register__content">
              <div
                style={{
                  width: "100%",
                }}
              >
                <button
                  onClick={() => {
                    setIsVisible(false);
                  }}
                  className="Buttonstyle-gnoclh-1 iDqGUt undefined undefined"
                  theme="[object Object]"
                  style={{
                    border: "none",
                    background: "transparent",
                    padding: "2px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "25px",
                    height: "25px",
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25px"
                    height="25px"
                    viewBox="0 0 20 20"
                    type="close"
                    className="Iconstyle__StyledIcon-sc-8g7jb-0 fuoUvx"
                    cursor="pointer"
                    fill="#ffffff"
                    overflow="visible"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14.94 5.15a.5.5 0 010 .708L10.699 10.1l4.243 4.242a.5.5 0 01-.707.707L9.99 10.808 5.748 15.05a.5.5 0 01-.707-.707l4.243-4.242L5.04 5.858a.5.5 0 01.707-.707L9.99 9.393l4.243-4.242a.5.5 0 01.707 0z"
                    />
                  </svg>
                </button>

                <div className="flex w-full flex-col">
                  <div className="text__register">
                    {/* Регистрация */}
                  </div>
                  <div className="sm:px-5">{children}</div>
                  {/* <div className="sm:px-5">{"switcher"}</div> */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Popup;
