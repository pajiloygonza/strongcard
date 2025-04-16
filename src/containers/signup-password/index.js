import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { Popup } from "../../components/popup";
import { notifySuccess } from "../../components/notify";
import { isRequestPending } from "../../utils/store";
import { COOKIE_CODE, STORAGE_CURRENT_PHONE } from "../../constants";
import { getCookie } from "../../utils/cookie";
import { signup } from "../../actions/signup";

import { SignupPasswordView } from "./View";
import { useNavigate } from "react-router-dom";

export const SignupPassword = ({ isVisible, setIsVisible }) => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { isLoading } = useSelector(({ signup }) => ({
    isLoading: isRequestPending(signup.request),
  }));

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validatePasswords = (newPasswordValue, confirmPasswordValue) => {
    if (newPasswordValue.length < 6) {
      setNewPasswordError(t("POPUP.POPUP.NEW_PASSWORD_ERROR"));
    } else {
      setNewPasswordError("");
    }

    if (newPasswordValue !== confirmPasswordValue) {
      setConfirmPasswordError(t("POPUP.POPUP.CONFIRM_PASSWORD_ERROR"));
    } else {
      setConfirmPasswordError("");
    }
  };

  const isPasswordsValid =
    newPassword.length >= 6 && newPassword === confirmPassword;

  const handleNewPasswordChange = (e) => {
    const { value } = e.target;

    setNewPassword(value);
    validatePasswords(value, confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;

    setConfirmPassword(value);
    validatePasswords(newPassword, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isPasswordsValid) {
      const phone = localStorage.getItem(STORAGE_CURRENT_PHONE);

      const { success } = await dispatch(
        signup(
          {
            code: getCookie(COOKIE_CODE),
            phone_num: phone,
            password: newPassword,
          },
          navigate
        )
      );

      if (success) {
        setIsVisible(false);
        notifySuccess(t("POPUP.POPUP.ACCOUNT_CREATED_SUCCESS"));
      }
    }
  };

  useEffect(() => {
    if (!isVisible) {
      setNewPassword("");
      setConfirmPassword("");
      setNewPasswordError("");
      setConfirmPasswordError("");
    }
  }, [isVisible]);

  return (
    <Popup isVisible={isVisible} setIsVisible={setIsVisible}>
      <form onSubmit={handleSubmit}>
        <SignupPasswordView
          newPassword={newPassword}
          confirmPassword={confirmPassword}
          newPasswordError={newPasswordError}
          confirmPasswordError={confirmPasswordError}
          handleNewPasswordChange={handleNewPasswordChange}
          handleConfirmPasswordChange={handleConfirmPasswordChange}
          isPasswordsValid={isPasswordsValid}
          isLoading={isLoading}
        />
      </form>
    </Popup>
  );
};
