import defaultAxios from "axios";
import { jwtDecode } from "jwt-decode";

import { getCookie, setCookie } from "./cookie";
import { COOKIE_AUTH, COOKIE_REFRESH } from "../constants";
import { logOut } from "../actions/login";
import { API } from "../constants/api";

const transformResponse = (data, headers) => {
  if (headers["content-type"] === "text/plain; charset=UTF-8") return data;
  if (!data) {
    return null;
  }
  data = JSON.parse(data);
  return data;
};

export const axios = defaultAxios.create({
  timeout: 100000,
  transformResponse: [transformResponse],
});

export const authDecode = (raw) => {
  try {
    jwtDecode(raw);
  } catch (e) {
    return {};
  }
};

export const AUTH_HEADER = "Authorization";

export const setAuthorizationHeader = (tokenHash) => {
  const token = `Bearer ${tokenHash}`;

  axios.defaults.headers.common[AUTH_HEADER] = token;
};

export const setAuthorization = (access, refresh) => {
  setAuthorizationHeader(access);
  setCookie(COOKIE_AUTH, access);

  if (refresh) {
    setCookie(COOKIE_REFRESH, refresh);
  }
};

const onResponseSuccess = (response) => {
  return response;
};

const onResponseError = async (error) => {
  if (!error.response) {
    error.response = { data: { message: "" } };
  }
  if (error.response) {
    if (
      error.response.status === 403 ||
      error.response.data.code === "token_not_valid"
    ) {
      return logOut();
    }

    const originalRequest = error.config;

    const refreshToken = getCookie(COOKIE_REFRESH);

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      refreshToken
    ) {
      originalRequest._retry = true;

      try {
        const { access } = await axios.post(API.REFRESH_TOKEN, {
          refresh: refreshToken,
        });

        setAuthorization(access);

        return axios(originalRequest);
      } catch (error) {
        return logOut();
      }
    }
  }

  return Promise.reject(error);
};

const authToken = getCookie(COOKIE_AUTH);

if (authToken) {
  setAuthorizationHeader(authToken);
}

axios.interceptors.response.use(onResponseSuccess, onResponseError);
