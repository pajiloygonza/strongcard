import React from "react";
import { useTranslation } from "react-i18next";

export const SignupCodeView = ({
  smsCode,
  validateSmsCode,
  handleSmsCodeChange,
  resendTimer,
  handleResendClick,
  isLoading,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="inputPopup flex items-center rounded relative box-border bg-grey8 text-t2 border border-grey6 focus-within-border t-input-account mb-5 h-[50px] w-full px-3 h-md:text-h4">
        <input
          spellCheck="false"
          className="align-middle cursor-text text-t1 flex-grow text-black outline-none bg-transparent placeholder-grey4 w-full"
          type="text"
          maxLength={6}
          placeholder={t("POPUP.POPUP.ENTER_SMS_CODE")}
          value={smsCode}
          onChange={handleSmsCodeChange}
        />
      </div>
      <button
        disabled={!validateSmsCode(smsCode) || isLoading}
        className={`buttonlogin flex justify-center items-center rounded border outline-none bg-black1 border-black text-white dark:border-grey6 ${
          !validateSmsCode(smsCode) || isLoading
            ? "cursor-not-allowed opacity-30"
            : "cursor-pointer"
        } t-btn-login text-t1-medium mt-7 h-[50px] w-full sm:mt-3 h-md:text-h4`}
        type="submit"
      >
        213123123
      </button>
      {resendTimer > 0 ? (
        <div className="text-center mt-3 text-t2 text-grey4">
          {t("POPUP.POPUP.RESEND_CODE_IN")} {resendTimer}{" "}
          {t("POPUP.POPUP.SECONDS")}
        </div>
      ) : (
        <button
          className={`buttonlogin flex justify-center items-center rounded border outline-none bg-black1 border-black text-white dark:border-grey6 t-btn-login text-t1-medium mt-3 h-[50px] w-full ${
            isLoading ? "cursor-not-allowed opacity-30" : "cursor-pointer"
          }`}
          onClick={handleResendClick}
          type="button"
          disabled={isLoading}
        >
          1232112
        </button>
      )}
    </>
  );
};
