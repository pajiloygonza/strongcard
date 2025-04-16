import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Popup } from "../../components/popup";
import { signup } from "../../actions/signup";
import { getCookie } from "../../utils/cookie";
import { isRequestPending } from "../../utils/store";
import { COOKIE_CODE, STORAGE_CURRENT_PHONE } from "../../constants";

import { SignupCodeView } from "./View";

const TIMER_VALUE = 120;

export const SignupCode = ({
  isVisible,
  setIsVisible,
  setIsSignupPasswordPopupVisible,
}) => {
  const dispatch = useDispatch();

  const { isLoading } = useSelector(({ signup }) => ({
    isLoading: isRequestPending(signup.request),
  }));

  const [resendTimer, setResendTimer] = useState(TIMER_VALUE);
  const [smsCode, setSmsCode] = useState("");

  const validateSmsCode = (code) => {
    return code.length === 6;
  };

  const handleSmsCodeChange = (e) => {
    const { value } = e.target;
    setSmsCode(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateSmsCode(smsCode)) {
      const phone = localStorage.getItem(STORAGE_CURRENT_PHONE);

      const { success } = await dispatch(
        signup({
          code: getCookie(COOKIE_CODE),
          phone_num: phone,
          sms_code: smsCode,
        })
      );

      if (success) {
        setIsVisible(false);
        setIsSignupPasswordPopupVisible(true);
      }
    }
  };

  useEffect(() => {
    if (isVisible) {
      setResendTimer(TIMER_VALUE);

      const timerInterval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timerInterval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        clearInterval(timerInterval);
      };
    }
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) {
      setSmsCode("");
      setResendTimer(0);
    }
  }, [isVisible]);

  const handleResendClick = async () => {
    if (resendTimer !== 0) {
      return;
    }

    const phone = localStorage.getItem(STORAGE_CURRENT_PHONE);

    await dispatch(signup({ code: getCookie(COOKIE_CODE), phone_num: phone }));

    setResendTimer(TIMER_VALUE);

    const timerInterval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <Popup isVisible={isVisible} setIsVisible={setIsVisible}>
      <form onSubmit={handleSubmit}>
        <SignupCodeView
          smsCode={smsCode}
          validateSmsCode={validateSmsCode}
          handleSmsCodeChange={handleSmsCodeChange}
          resendTimer={resendTimer}
          handleResendClick={handleResendClick}
          isLoading={isLoading}
        />
      </form>
    </Popup>
  );
};
