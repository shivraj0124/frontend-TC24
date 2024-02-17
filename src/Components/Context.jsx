import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
// import { useCookies } from "react-cookie";
const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [findForm, setFindForm] = useState("Student");
  const [token, setToken] = useState("");
  const [sidebarvalue, setsidebarvalue] = useState("Home");
  const [filtertime, setfiltertime] = useState("latest");
  const [filterbycollge, setfilterbycollge] = useState("all");
  const [loadingMain, setLoadingMain] = useState(false);
  const storedUserDetails = localStorage.getItem("userDetails");
  const [userDetails, setUserDetails] = useState(
    storedUserDetails ? JSON.parse(storedUserDetails) : null
  );
  console.log(userDetails);
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
    setfilterbycollge,
    userDetails,
    setUserDetails,
    loadingMain,
    setLoadingMain
  };
  useEffect(() => {
    const tokenFromCookie = Cookies.get("token");
    if (tokenFromCookie) {
      setToken(tokenFromCookie);
      console.log(tokenFromCookie);
    }

    // const tokenFromCookie = cookies.token;
    // if (tokenFromCookie) {
    //   setToken(tokenFromCookie);
    // }

  }, []);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const themeHook = () => {
  const context = useContext(Context);
  return context;
};

export default themeHook;
