import React from "react";
import themeHook from "../Context";
function HODForm() {
  const { findForm } = themeHook();
  return (
    <div className="text-center flex flex-col items-center justify-center bg-white rounded-md pt-5 pb-5 ">
      <h1 className="text-2xl font-semibold ">HOD Login</h1>
      <form className="mt-10">
        <input
          type="text"
          className="text-xl font-semibold placeholder:text-slate-500 border-b-2 border-blue-300  hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[80%] my-2"
          placeholder="Username"
          required
        />
        <input
          type="password"
          className="text-xl font-semibold placeholder:text-slate-500 border-b-2 border-blue-300  hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[80%] my-2"
          placeholder="Password"
          required
        />
        <br />
        <button className="mt-5 py-2 px-5 bg-blue-600 rounded-lg text-white cursor-pointer hover:bg-blue-500">
          Login
        </button>
      </form>
    </div>
  );
}

export default HODForm;
