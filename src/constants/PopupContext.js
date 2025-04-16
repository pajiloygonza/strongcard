import React, { createContext, useContext } from "react";

const PopupContext = createContext();

export const usePopupContext = () => useContext(PopupContext);

export const PopupProvider = ({ children, value }) => {
  return (
    <PopupContext.Provider value={value}>{children}</PopupContext.Provider>
  );
};
