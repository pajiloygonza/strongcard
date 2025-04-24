import React from "react";
import { useTranslation } from "react-i18next";

export const SignupView = ({
  phone,
  phoneError,
  handlePhoneChange,
  setIsLoginPopupVisible,
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
          placeholder={t("Имя")}
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
          type="text"
          maxLength={-1}
          minLength={6}
          placeholder={t("Фамилия")}
          value={phone}
          onChange={handlePhoneChange}
        />
        {phoneError && (
          <span className="absolute -bottom-5 mb-0.5 text-red left-2 text-t4">
            {phoneError}
          </span>
        )}
      </div>

      <button
        disabled={!phone || phoneError || isLoading}
        className={`${
          !phone || phoneError || isLoading
            ? "cursor-not-allowed opacity-30"
            : "cursor-pointer"
        } t-btn-login text-t1-medium mt-7 h-[50px] w-full sm:mt-3 h-md:text-h4`}
        type="submit"
        style={{
          marginBottom: "10px",
        }}
      >
        Зарегистрироваться{" "}
      </button>
    </>
  );
};
