import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { Popup } from "../../components/popup";

import { LoginView } from "./View";
import { login } from "../../actions/login";
import { isRequestPending } from "../../utils/store";
import { useNavigate } from "react-router-dom";

export const Login = ({ isVisible, setIsVisible, setIsSignupPopupVisible }) => {
  const { t } = useTranslation();

  const { isLoading } = useSelector(({ login }) => ({
    isLoading: isRequestPending(login.request),
  }));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validatePhone = (value) => {
    const re = /^\+?\d{6,}$/;
    return re.test(String(value));
  };
  const validateEmail = (value) => {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+){1,}$/;
    return re.test(String(value).toLowerCase());
  };

  const handlePhoneChange = (e) => {
    const { value } = e.target;

    setPhone(value);

    if (value && !validatePhone(value) && !validateEmail(value)) {
      setPhoneError(t(""));
    } else {
      setPhoneError("");
    }
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;

    setPassword(value);

    if (value && value.length < 6) {
      setPasswordError(t("POPUP.POPUP.PASSWORD_ERROR"));
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { success } = await dispatch(
      login({ username: phone, password }, navigate)
    );

    if (success) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    if (!isVisible) {
      setPhone("");
      setPassword("");
      setIsPasswordVisible(false);
      setPhoneError("");
      setPasswordError("");
    }
  }, [isVisible]);

  return (
    <Popup isVisible={isVisible} setIsVisible={setIsVisible}>
      <form onSubmit={handleSubmit}>
        <LoginView
          phone={phone}
          password={password}
          phoneError={phoneError}
          passwordError={passwordError}
          isPasswordVisible={isPasswordVisible}
          setIsPasswordVisible={setIsPasswordVisible}
          handlePhoneChange={handlePhoneChange}
          handlePasswordChange={handlePasswordChange}
          setIsSignupPopupVisible={setIsSignupPopupVisible}
          setIsVisible={setIsVisible}
          isLoading={isLoading}
        />
      </form>
    </Popup>
  );
};
