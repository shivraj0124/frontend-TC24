import React, { useState } from "react";
import themeHook from "../Context";
import axios from "axios";
import toast from "react-hot-toast";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
function HODForm() {
  const { findForm, setUserDetails, setToken } = themeHook();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Hello", userName, password);
    try {
      const result = await axios.post(
        "http://localhost:8000/api/hod/HodLogin",
        {
          username: userName,
          password: password,
        }
      );
      console.log(result);
      if (result.data.data.status === true) {
        toast.success(result.data.data.msg);
        console.log("token", result.data.data.token);
        setCookie("token", result.data.data.token, { path: "/" });
        console.log(result.data.data.hodDetails);
        localStorage.setItem(
          "userDetails",
          JSON.stringify(result.data.data.hodDetails)
        );
        localStorage.setItem("userType", "HOD");
        setToken(result.data.data.token);
        setUserDetails(result.data.data.hodDetails);
        navigate("/Hod/Dashboard");
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
  return (
    <div className="text-center flex flex-col items-center justify-center bg-white rounded-md pt-5 pb-5 ">
      <h1 className="text-2xl font-semibold ">HOD Login</h1>
      <form className="mt-10" onSubmit={handleSubmit}>
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
        <button className="mt-5 py-2 px-5 bg-[#22c55e] rounded-lg text-white cursor-pointer hover:bg-blue-500">
          Login
        </button>
      </form>
    </div>
  );
}

export default HODForm;
