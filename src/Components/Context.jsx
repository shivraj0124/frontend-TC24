import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [findForm, setFindForm] = useState("Student");
  const [token, setToken] = useState("");
  const [sidebarvalue, setsidebarvalue] = useState("Home");
  const value = {
    findForm,
    setFindForm,
    token,
    setToken
  };
  useEffect(() => {
    const tokenFromCookie = Cookies.get("token");
    if (tokenFromCookie) {
      setToken(tokenFromCookie);
      console.log(tokenFromCookie);
    }
  }, [])
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
