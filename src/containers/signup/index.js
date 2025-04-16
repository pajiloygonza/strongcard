import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { Popup } from "../../components/popup";

import { SignupView } from "./View";
import { signup } from "../../actions/signup";
import { getCookie } from "../../utils/cookie";
import { COOKIE_CODE, STORAGE_CURRENT_PHONE } from "../../constants";
import { isRequestPending } from "../../utils/store";

export const Signup = ({
  isVisible,
  setIsVisible,
  setIsSignupCodePopupVisible,
  setIsLoginPopupVisible,
}) => {
  const { isLoading } = useSelector(({ signup }) => ({
    isLoading: isRequestPending(signup.request),
  }));

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const validatePhone = (value) => {
    const re = /^\+?\d{6,}$/;
    return re.test(String(value));
  };
  const validateEmail = (value) => {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+){1,}$/;
    return re.test(String(value).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validatePhone(phone)) {
      const { success } = await dispatch(
        signup({ code: getCookie(COOKIE_CODE), phone_num: phone })
      );

      if (success) {
        setIsVisible(false);
        setIsSignupCodePopupVisible(true);
        localStorage.setItem(STORAGE_CURRENT_PHONE, phone);
      }
    }
    if (validateEmail(phone)) {
      const { success } = await dispatch(
        signup({ code: getCookie(COOKIE_CODE), phone_num: phone })
      );

      if (success) {
        setIsVisible(false);
        setIsSignupCodePopupVisible(true);
        localStorage.setItem(STORAGE_CURRENT_PHONE, phone);
      }
    }
  };

  const handlePhoneChange = (e) => {
    const { value } = e.target;

    setPhone(value);
    if (value && !validatePhone(value) && !validateEmail(value)) {
      setPhoneError(t("align-middle cursor-text text-t1 flex-grow text-black outline-none bg-transparent placeholder-grey4 w-full"));
    } else {
      setPhoneError("");
    }
  };

  useEffect(() => {
    if (!isVisible) {
      setPhone("");
      setPhoneError("");
    }
  }, [isVisible]);

  return (
    <Popup isVisible={isVisible} setIsVisible={setIsVisible}>
      <form onSubmit={handleSubmit}>
        <SignupView
          phone={phone}
          phoneError={phoneError}
          handlePhoneChange={handlePhoneChange}
          setIsLoginPopupVisible={setIsLoginPopupVisible}
          setIsVisible={setIsVisible}
          isLoading={isLoading}
        />
      </form>
    </Popup>
  );
};
