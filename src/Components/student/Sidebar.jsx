import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { BiHome } from "react-icons/bi";
import { IoSchoolOutline } from "react-icons/io5";
import { BiUserCircle } from "react-icons/bi";
import { BiBookmark } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import themeHook from "../Context";
import { Link } from "react-router-dom";
import { GoProjectSymlink } from "react-icons/go";
import toast from "react-hot-toast";
import { CircularProgress } from "@mui/material";
import Cookies from "js-cookie";
function Sidebar({ data }) {
  const {
    sidebarvalue,
    setsidebarvalue,
    userDetails,
    token,
    setToken,
    setUserDetails,loadingMain,setLoadingMain
  } = themeHook();
 
  const handleItemClick = (e) => {
    const value = e.target.textContent.trim();
    setsidebarvalue(value);
    console.log("state", sidebarvalue);
  };

  const handleLogOut = async () => {
    setLoadingMain(true)
    try {
      setUserDetails(null);
      localStorage.removeItem("userDetails");
      localStorage.removeItem("userType")
      if (token) {
        Cookies.remove("token");
        setToken("")
      }
      toast.success("Logout Successfully");
      window.location.reload();
      //   window.location.reload();
    } catch (err) {
      toast.error(err);
    }
    setLoadingMain(false)
  };

  return (
    <div className=" flex flex-col border w-full p-4 h-full justify-between">
      {/* {loadingMain === true ? (
        <div className="text-center">
          <CircularProgress />
        </div>
      ) : (
        <> */}
          <ul className="flex flex-col w-full gap-2">
            <Link
              to={"/home"}
              className={` ${
                sidebarvalue == "Home" ? " bg-[#f5f5f5] text-textgreen" : ""
              } hover:bg-[#f5f5f5] cursor-pointer grid grid-cols-[auto_1fr] gap-4 px-4 py-2  font-semibold  rounded-lg`}
              onClick={handleItemClick}
            >
              <div className=" flex  items-center">
                {" "}
                <BiHome size={22} className="" />
              </div>
              <div> Home</div>
            </Link>

            <Link
              to={"/college"}
              className={` ${
                sidebarvalue == "College" ? " bg-[#f5f5f5] text-textgreen" : ""
              } hover:bg-[#f5f5f5] cursor-pointer grid grid-cols-[auto_1fr] gap-4 px-4 py-2  font-semibold  rounded-lg`}
              onClick={handleItemClick}
            >
              <div className=" flex  items-center">
                {" "}
                <IoSchoolOutline size={22} className="" />
              </div>
              <div> College</div>
            </Link>
            <Link
              to={"/StudentProjects"}
              className={` ${
                sidebarvalue == "Students Projects"
                  ? " bg-[#f5f5f5] text-textgreen"
                  : ""
              } hover:bg-[#f5f5f5] cursor-pointer grid grid-cols-[auto_1fr] gap-4 px-4 py-2  font-semibold  rounded-lg`}
              onClick={handleItemClick}
            >
              <div className=" flex  items-center">
                {" "}
                <GoProjectSymlink size={22} className="" />
              </div>
              <div>Students Projects</div>
            </Link>

            <Link
              to={"/profile"}
              className={` ${
                sidebarvalue == "Profile" ? "  bg-[#f5f5f5] text-textgreen" : ""
              } hover:bg-[#f5f5f5] cursor-pointer grid grid-cols-[auto_1fr] gap-4 px-4 py-2  font-semibold  rounded-lg`}
              onClick={handleItemClick}
            >
              <div className=" flex  items-center">
                {" "}
                <BiUserCircle size={22} className="  " />
              </div>
              <div> Profile</div>
            </Link>

            <Link
              className={` ${
                sidebarvalue == "Saved" ? "  bg-[#f5f5f5] text-textgreen" : ""
              } hover:bg-[#f5f5f5] cursor-pointer grid grid-cols-[auto_1fr] gap-4 px-4 py-2  font-semibold  rounded-lg`}
              onClick={handleItemClick}
            >
              <div className=" flex  items-center">
                {" "}
                <BiBookmark size={22} className="  " />
              </div>
              <div> Saved</div>
            </Link>
            <Link
              className={` ${
                sidebarvalue == "Settings"
                  ? "  bg-[#f5f5f5] text-textgreen"
                  : ""
              } hover:bg-[#f5f5f5] cursor-pointer grid grid-cols-[auto_1fr] gap-4 px-4 py-2  font-semibold  rounded-lg`}
              onClick={handleItemClick}
            >
              <div className=" flex  items-center">
                {" "}
                <IoSettingsOutline size={22} className="  " />
              </div>
              <div> Settings</div>
            </Link>
          </ul>
          {userDetails !== undefined && userDetails !== null ? (
            <div className=" flex flex-col gap-1 bg-bgwhite rounded-lg p-3 mb-10">
              <section className=" flex gap-2 justify-center items-center">
                <FaUserCircle
                  className=" text-darkgreen"
                  size={40}
                ></FaUserCircle>
                <section>
                  <p className=" font-semibold text-lg">
                    {userDetails?.username}
                  </p>
                </section>
              </section>
              <p className=" text-center text-xs text-gray-500">
                {/* <span className=" font-semibold">College: </span> */}
                {userDetails.email}
              </p>
              <button
                onClick={handleLogOut}
                className=" bg-buttongreen bg-opacity-30 w-full text-green-600 px-4 py-[5px] font-semibold rounded-full"
              >
                logout
              </button>
            </div>
          ) : (
            ""
          )}
        {/* </>
      )} */}
    </div>
  );
}

export default Sidebar;

function clearCookie(cookieName) {
  const [, , removeCookie] = useCookies([cookieName]);
  removeCookie(cookieName);
}
