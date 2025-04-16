import { removeAllCookies } from "./cookie";

export const handleLogout = () => {
  removeAllCookies();
  window.location.href = "/";
  // window.location.reload();
};
