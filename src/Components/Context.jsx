import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [findForm, setFindForm] = useState("Student");
  const [token, setToken] = useState("");
  const [sidebarvalue, setsidebarvalue] = useState("Home");
  const [filtertime, setfiltertime] = useState("latest");
  const [filterbycollge, setfilterbycollge] = useState("all");

  const value = {
    findForm,
    setFindForm,
    token,
    setToken,
    sidebarvalue,
    setsidebarvalue,
    setfiltertime,
    filtertime,
    filterbycollge,
    setfilterbycollge
  };
  useEffect(() => {
    const tokenFromCookie = Cookies.get("token");
    if (tokenFromCookie) {
      setToken(tokenFromCookie);
      console.log(tokenFromCookie);
    }
  }, [])

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const themeHook = () => {
  const context = useContext(Context);
  return context;
};

export default themeHook;
