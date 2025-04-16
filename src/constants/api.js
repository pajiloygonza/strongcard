const API_SLUG = "api";

export const getDomain = () =>
  window.location.hostname.replace("www.", "").split(".").slice(0).join(".");

export const getApiServer = () => {
  if (process.env.NODE_ENV === "development") return process.env.REACT_APP_API;

  if (window.location.href.includes("netlify.app")) {
    return process.env.REACT_APP_API;
  }

  const domain = getDomain();

  return `https://${API_SLUG}.${domain}`;
};

const API_SERVER = getApiServer();

export const API = {
  LOGIN: `${API_SERVER}`,
  SIGNUP: `${API_SERVER}`,
  DOWNLOAD_LINK: `${API_SERVER}`,
  REFRESH_TOKEN: `${API_SERVER}`,
  FILES: `${API_SERVER}`,
};
