import React, { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import signUpImage from "../assets/signUp.png";
import axios from "axios";
import toast from "react-hot-toast";
import themeHook from "./Context";
import { Link, useNavigate } from "react-router-dom";
function SignUp() {
  const { findForm, setFindForm } = themeHook();
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [eye, setEye] = useState(false);
  const navigate = useNavigate();
  const validateFullName = (name) => /^[a-zA-Z\s]*$/.test(name);
  const validateMobile = (number) => /^\d{10}$/.test(number);
  const validatePassword = (pass) => pass.length >= 8;

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!validateFullName(fullName)) {
      toast.error("Please enter a valid full name");
      return;
    }
    if (!validateMobile(mobile)) {
      toast.error("Please enter a valid mobile number");
      return;
    }
    if (!validatePassword(password)) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    try {
      const result = await axios.post("http://localhost:8000/api/auth/signup", {
        username: userName,
        password: password,
        fullName: fullName,
        email: email,
        userType: "student",
        mobileNo: mobile,
      });
      console.log(result);
      if (result.data.data.status === 200) {
        toast.success(result.data.data.msg);
        navigate("/Login");
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
    <div className="pt-5  h-screen flex justify-center bg-blue-50 overflow-y-auto">
      <div className="flex flex-row fixed  bg-[#fcfcfe] shadow-xl rounded-md mt-10 max-md:mt-2  max-md:w-[90%] justify-center items-center w-max h-max py-4 ">
        <div className="max-md:hidden">
          <img className="h-max w-[500px] " src={signUpImage} />
        </div>
        <div className="flex flex-col px-4">
          <h1 className="font-semibold text-black text-xl underline underline-offset-4 text-center">
            Student Registration
          </h1>
          <form className="flex flex-col mt-5 w-max" onSubmit={handleOnSubmit}>
            <div className="flex flex-row gap-4">
              <div className="flex flex-col">
                <label className="mt-5">Full Name</label>
                <input
                  type="text"
                  className="border-2 border-gray-300 rounded-md px-2 py-1 focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                  placeholder="Enter Your Full Name"
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="mt-5">Mobile No.</label>
                <input
                  type="telephone"
                  className="border-2 border-gray-300 rounded-md px-2 py-1  focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                  placeholder="Enter Your Mobile No."
                  onChange={(e) => setMobile(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <div className="flex flex-col">
                <label className="mt-5">Email</label>
                <input
                  type="email"
                  className="border-2 border-gray-300 rounded-md px-2 py-1  focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                  placeholder="Enter Your Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="mt-5">College Name</label>
                <input
                  type="text"
                  className="border-2 border-gray-300 rounded-md px-2 py-1 focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                  placeholder="Enter Your College Name"
                  onChange={(e) => setCollegeName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <div className="flex flex-col">
                <label className="mt-5">Username</label>
                <input
                  type="text"
                  className="border-2 border-gray-300 rounded-md px-2 py-1  focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                  placeholder="Enter Your Username"
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col relative">
                <label className="mt-5">Password</label>
                <input
                  type={eye ? "text" : "password"}
                  className="border-2 border-gray-300 rounded-md px-2 py-1 focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                  placeholder="Enter Your Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="absolute top-7 right-0 mt-6 mr-4">
                  {!eye ? (
                    <FaEye size={20} onClick={() => setEye(true)} />
                  ) : (
                    <FaEyeSlash size={20} onClick={() => setEye(false)} />
                  )}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="mt-10 px-5 py-2 bg-blue-500 text-white hover:bg-blue-700 text-xl rounded-md"
            >
              Submit
            </button>
            <div>
              <h2 className="text-center mt-5">
                Already have an account ?{" "}
                <Link
                  className="cursor-pointer text-blue-500"
                  onClick={() => setFindForm("Student")}
                  to="/Login "
                >
                  login
                </Link>
              </h2>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
