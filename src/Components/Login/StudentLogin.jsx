import React, { useState, useEffect } from "react";
import themeHook from "../Context";
import axios from "axios";
import toast from "react-hot-toast";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
function StudentLogin() {
  const { findForm, setToken, setUserDetails } = themeHook();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  // const [cookies, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:8000/api/auth/login", {
        username: userName,
        password: password,
      });
      console.log(result);
      if (result.data.data.status === true) {
        toast.success(result.data.data.msg);
        console.log("token", result.data.data.token);
        // setCookie("token", result.data.data.token, { path: "/" });
        Cookies.set("token",result.data.data.token);
        localStorage.setItem(
          "userDetails",
          JSON.stringify(result.data.data.existuser)
        );
        setToken(result.data.data.token);
        setUserDetails(result.data.data.existuser);
        console.log(result.data);
        if (findForm === "Student") {
          localStorage.setItem("userType", "Student");
          navigate("/");
        } else {
          localStorage.setItem("userType", "Admin");
          navigate("/Admin/Dashboard");
        }
      } else {
        toast(result.data.data.msg, {
          iconTheme: {
            primary: "#facc15",
            secondary: "#fff",
          },
          icon: "⚠",
        });
      }
    } catch (err) {
      toast.error(err.message); // Use err.message to get the error message
    }
  };
  useEffect(() => { }, [findForm]);
  return (
    <div className="text-center flex flex-col items-center justify-center bg-white rounded-md pt-5 pb-5 ">
      <h1 className="text-2xl font-semibold ">{findForm} Login</h1>
      <form className="mt-10" onSubmit={handleLogin}>
        <input
          type="text"
          className="text-xl font-semibold placeholder:text-slate-500 border-b-2 border-blue-300  hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[80%] my-2"
          placeholder="Username"
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <input
          type="password"
          className="text-xl font-semibold placeholder:text-slate-500 border-b-2 border-blue-300  hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[80%] my-2"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <Button
          variant="contained"
          type="submit"
          style={{
            backgroundColor: "#22c55e",
          }}
        >
          Login
        </Button>
      </form>
    </div>
  );
}

export default StudentLogin;
