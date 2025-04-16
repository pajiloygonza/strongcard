import React from "react";
import { useTranslation } from "react-i18next";

export const SignupPasswordView = ({
  newPassword,
  confirmPassword,
  newPasswordError,
  confirmPasswordError,
  handleNewPasswordChange,
  handleConfirmPasswordChange,
  isPasswordsValid,
  isLoading,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <div
        style={{
          border: newPasswordError ? "1px solid red" : "",
        }}
        className="inputPopup flex items-center rounded relative box-border bg-grey8 text-t2 border border-grey6 focus-within-border t-input-account mb-5 h-[50px] w-full px-3 h-md:text-h4"
      >
        <input
          spellCheck="false"
          className="align-middle cursor-text text-t1 flex-grow text-black outline-none bg-transparent placeholder-grey4 w-full"
          type="password"
          placeholder={t("POPUP.POPUP.ENTER_NEW_PASSWORD")}
          value={newPassword}
          onChange={handleNewPasswordChange}
        />
        {newPasswordError && (
          <span className="absolute -bottom-5 mb-0.5 text-red left-2 text-t4">
            {newPasswordError}
          </span>
        )}
      </div>
      <div
        style={{
          border: confirmPasswordError ? "1px solid red" : "",
        }}
        className="inputPopup flex items-center rounded relative box-border bg-grey8 text-t2 border border-grey6 focus-within-border t-input-account mb-5 h-[50px] w-full px-3 h-md:text-h4"
      >
        <input
          spellCheck="false"
          className="align-middle cursor-text text-t1 flex-grow text-black outline-none bg-transparent placeholder-grey4 w-full"
          type="password"
          placeholder={t("POPUP.POPUP.ENTER_CONFIRM_PASSWORD")}
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        {confirmPasswordError && (
          <span className="absolute -bottom-5 mb-0.5 text-red left-2 text-t4">
            {confirmPasswordError}
          </span>
        )}
      </div>
      <button
        disabled={!isPasswordsValid || isLoading}
        className={`buttonlogin flex justify-center items-center rounded border outline-none bg-black1 border-black text-white dark:border-grey6 ${
          !isPasswordsValid || isLoading
            ? "cursor-not-allowed opacity-30"
            : "cursor-pointer"
        } t-btn-login text-t1-medium mt-7 h-[50px] w-full sm:mt-3 h-md:text-h4`}
        type="submit"
      >
123213213      </button>
    </>
  );
};
