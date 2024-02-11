import React, { createContext, useContext, useState } from "react";
const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [findForm, setFindForm] = useState("Student");
  const [sidebarvalue, setsidebarvalue] = useState("Home");
  const value = {
    findForm,
    setFindForm,
    sidebarvalue,
    setsidebarvalue
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const themeHook = () => {
  const context = useContext(Context);
  return context;
};

export default themeHook;
