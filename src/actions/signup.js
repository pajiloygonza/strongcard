import { axios } from "../utils/request";
import { API } from "../constants/api";
import { login } from "./login";
import { notifyError } from "../components/notify";

export const SIGNUP = {
  LOADING: "SIGNUP.LOADING",
  SUCCESS: "SIGNUP.SUCCESS",
  ERROR: "SIGNUP.ERROR",
  RESET_STATUS: "SIGNUP.RESET_STATUS",
};

const setError = (message) => ({
  type: SIGNUP.ERROR,
  message,
});

const setSuccess = (token) => ({
  type: SIGNUP.SUCCESS,
  token,
});

const setLoading = () => ({
  type: SIGNUP.LOADING,
});

const setResetStatus = () => ({
  type: SIGNUP.RESET_STATUS,
});

export const signupReset = (value) => ({
  type: SIGNUP.RESET,
  reset: value,
});

export const signup = (payload, navigate) => {
  return (dispatch) => {
    dispatch(setLoading());

    return axios
      .post(API.SIGNUP, payload)
      .then(async (data) => {
        dispatch(setSuccess(data));

        if (payload.password) {
          dispatch(setResetStatus());

          dispatch(
            login(
              {
                username: payload.phone_num,
                password: payload.password,
              },
              navigate
            )
          );
        }

        return { success: true };
      })
      .catch(async ({ response: { data } }) => {
        let errorMessage =
          data.detail || data.non_field_errors?.[0] || data.error;

        if (data.seconds) {
          errorMessage += `. Try again in ${data.seconds} seconds`;
        }

        dispatch(setError(errorMessage));

        notifyError(errorMessage);

        return { success: false };
      });
  };
};
