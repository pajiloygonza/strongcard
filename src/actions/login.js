import { axios, setAuthorization } from "../utils/request";
import { API } from "../constants/api";
import { setAuthData } from "./auth";
import { notifySuccess, notifyError } from "../components/notify";
import { toast } from "react-toastify";

export const LOGIN = {
  LOADING: "LOGIN.LOADING",
  SUCCESS: "LOGIN.SUCCESS",
  ERROR: "LOGIN.ERROR",
  RESET: "LOGIN.RESET",
};

const setLoading = () => ({
  type: LOGIN.LOADING,
});

const setSuccess = (data) => ({
  type: LOGIN.SUCCESS,
  data,
});

const setError = (message) => ({
  type: LOGIN.ERROR,
  message,
});

const setReset = () => ({
  type: LOGIN.RESET,
});

export const logOut = () => {
  setAuthorization(null);
  window.location = "/";
};

export const login = (payload, navigate) => {
  return (dispatch) => {
    dispatch(setLoading());

    return axios
      .post(API.LOGIN, payload)
      .then(async ({ data }) => {
        dispatch(setSuccess(data.access));
        setAuthorization(data.access, data.refresh);
        dispatch(setAuthData(data.access));
        dispatch(setReset());
        toast.success("Successfully logged in!", {
          className: "toast-message",
        });
        navigate("/app");

        return { success: true };
      })
      .catch((error) => {
        const data = error.response?.data;
        const errorMessage =
          data?.detail ||
          data?.non_field_errors?.[0] ||
          data?.error ||
          "Unknown error";

        dispatch(setError(errorMessage));
        notifyError(errorMessage);

        return { success: false };
      });
  };
};
