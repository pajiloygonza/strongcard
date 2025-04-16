import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, useLocation } from "react-router-dom";
import { ReduxWrapper } from "./containers/redux-wrapper";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.body.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ReduxWrapper>
      <ScrollToTop />
      <App />
    </ReduxWrapper>
  </BrowserRouter>
);
