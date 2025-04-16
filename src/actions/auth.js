import { authDecode } from "../utils/request";

export const AUTH = {
  SET_DATA: "AUTH.SET_DATA",
};

export const setAuthData = (token) => {
  const user = token ? authDecode(token) : {};

  return (dispatch) =>
    dispatch({
      type: AUTH.SET_DATA,
      token,
      logged: !!token,
      user,
    });
};
