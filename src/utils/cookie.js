import cookie from "js-cookie";

export const setCookie = (key, value) => {
  cookie.set(key, value);
};

export const getCookie = (key) => {
  const value = cookie.get(key);
  return value === "null" ? null : value;
};

export const removeAllCookies = () => {
  const cookies = Object.keys(cookie.get());
  cookies.forEach((cookieName) => {
    cookie.remove(cookieName);
  });
};
