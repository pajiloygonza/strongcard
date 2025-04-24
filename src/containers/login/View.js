import React from "react";
import { useTranslation } from "react-i18next";
import icon1 from "./img/eye-close-svgrepo-com.svg";
import icon from "./img/eye-open-svgrepo-com.svg";
export const LoginView = ({
  phone,
  password,
  phoneError,
  passwordError,
  isPasswordVisible,
  setIsPasswordVisible,
  handlePhoneChange,
  handlePasswordChange,
  setIsSignupPopupVisible,
  setIsVisible,
  isLoading,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <div
        style={{
          border: phoneError ? "1px solid red" : "",
        }}
        className="inputPopup flex items-center rounded relative box-border bg-grey8 text-t2 border border-grey6 focus-within-border t-input-account mb-5 h-[50px] w-full px-3 h-md:text-h4"
      >
        <input
          spellCheck="false"
          className="inputLoginOrSingup align-middle cursor-text text-t1 flex-grow text-black outline-none bg-transparent placeholder-grey4 w-full"
          type="text"
          maxLength={-1}
          minLength={6}
          placeholder={t("Номер телефона или e-mail")}
          value={phone}
          onChange={handlePhoneChange}
        />
        {phoneError && (
          <span className="absolute -bottom-5 mb-0.5 text-red left-2 text-t4">
            {phoneError}
          </span>
        )}
      </div>
      <div className="inputPopup flex items-center rounded relative box-border bg-grey8 text-t2 border border-grey6 focus-within-border t-input-account mb-5 h-[50px] w-full px-3 h-md:text-h4">
        <input
          spellCheck="false"
          className="inputLoginOrSingup align-middle cursor-text text-t1 flex-grow text-black outline-none bg-transparent placeholder-grey4 w-full"
          type={isPasswordVisible ? "text" : "password"}
          maxLength={-1}
          minLength={5}
          placeholder={t("Пароль")}
          value={password}
          onChange={handlePasswordChange}
        />
        {passwordError && (
          <span className="absolute -bottom-5 mb-0.5 text-red left-2 text-t4">
            {passwordError}
          </span>
        )}
        <span
          className="flex items-center justify-center h-full pl-2 whitespace-nowrap"
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          {isPasswordVisible ? (
            <img
              src={icon}
              className=" imgcur absolute right-2.5 h-5 w-5 cursor-pointer text-grey3"
              alt="Toggle Password Visibility"
              style={{
                marginBottom: "0px",
              }}
            />
          ) : (
            <img
              src={icon1}
              className="imgcur absolute right-2.5 h-5 w-5 cursor-pointer text-grey3"
              alt="Toggle Password Visibility"
              style={{
                marginBottom: "0px",
              }}
            />
          )}
        </span>
      </div>
      <button
        disabled={
          !phone || phoneError || !password || passwordError || isLoading
        }
        className={`${
          !phone || phoneError || !password || passwordError || isLoading
            ? "cursor-not-allowed opacity-30"
            : "cursor-pointer"
        } t-btn-login text-t1-medium mt-7 h-[50px] w-full sm:mt-3 h-md:text-h4`}
        type="submit"
      >
        Войти
      </button>
      <div
        className="text-t1 mt-3 flex justify-center cursor: pointer;"
        style={{
          color: "rgb(88, 86, 213)",
          fontSize: "14px",
          marginTop: "10px",
          color: "var(--secondary-color)",
        }}
        onClick={() => {
          setIsVisible(false);
          setIsSignupPopupVisible(true);
        }}
      >
        Зарегистрироваться
      </div>
    </>
  );
};
