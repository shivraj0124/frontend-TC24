import React, { createContext, useContext, useState } from "react";
const Context = createContext();
export const ContextProvider = ({ children }) => {
  const [findForm, setFindForm] = useState("Student");
  const value = {
    findForm,
    setFindForm,
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const themeHook = () => {
  const context = useContext(Context);
  return context;
};

export default themeHook;
