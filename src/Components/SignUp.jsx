import React, { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import signUpImage from "../assets/signUp.png";
function SignUp() {
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [eye, setEye] = useState(false);
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(fullName, mobile, email, collegeName, password, userName);
  };
  return (
    <div className="pt-5  h-screen flex justify-center bg-blue-50 overflow-y-auto">
      <div className="flex flex-row fixed  bg-[#fcfcfe] shadow-xl rounded-md mt-5 max-md:mt-2  max-md:w-[90%] justify-center items-center w-max h-max py-4">
        <div className="">
          <img className="h-max w-[500px]" src={signUpImage} />
        </div>
        <div className="flex flex-col px-4">
          <h1 className="font-semibold text-black text-xl underline underline-offset-4">
            Sign Up
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
                />
              </div>
              <div className="flex flex-col">
                <label className="mt-5">Mobile No.</label>
                <input
                  type="telephone"
                  className="border-2 border-gray-300 rounded-md px-2 py-1  focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                  placeholder="Enter Your Mobile No."
                  onChange={(e) => setMobile(e.target.value)}
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
                />
              </div>
              <div className="flex flex-col">
                <label className="mt-5">College Name</label>
                <input
                  type="text"
                  className="border-2 border-gray-300 rounded-md px-2 py-1 focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                  placeholder="Enter Your College Name"
                  onChange={(e) => setCollegeName(e.target.value)}
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
                />
              </div>
              <div className="flex flex-col relative">
                <label className="mt-5">Password</label>
                <input
                  type={eye ? "text" : "password"}
                  className="border-2 border-gray-300 rounded-md px-2 py-1 focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                  placeholder="Enter Your Password"
                  onChange={(e) => setPassword(e.target.value)}
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
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
