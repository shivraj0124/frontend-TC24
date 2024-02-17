import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import themeHook from "../Context";
import { Link ,useNavigate} from "react-router-dom";
import { FiUserCheck } from "react-icons/fi";
import { LuSchool2 } from "react-icons/lu";
import { LiaUserEditSolid } from "react-icons/lia";
import { BsBuildings } from "react-icons/bs";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
function Sidebar({ data }) {
  const { sidebarvalue, setsidebarvalue ,userDetails,setUserDetails,token,setToken} = themeHook();
  const [sidebarValue2, setSidebarValue2] = useState("Dashboard");
  const navigate=useNavigate()
  const handleItemClick = (e) => {
    const value = e.target.textContent.trim();
    // setsidebarvalue(value);
    setSidebarValue2(value);
    console.log("state", sidebarvalue);
  };
  const handleLogOut = async () => {
    setUserDetails(null);
    localStorage.removeItem("userDetails");
    if (token) {
      Cookies.remove("token");
      setToken("")
    }
    toast.success("Logout Successfully");
    navigate("/") 
};
  return (
    <div className=" flex flex-col border w-full p-4 h-full justify-between">
      <ul className="flex flex-col w-full gap-2">
        <Link
          to={"/POC/Dashboard"}
          className={` ${
            sidebarValue2 == "Dashboard" ? " bg-[#f5f5f5] text-textgreen" : ""
          } hover:bg-[#f5f5f5] cursor-pointer grid grid-cols-[auto_1fr] gap-4 px-4 py-2  font-semibold  rounded-lg`}
          onClick={handleItemClick}
        >
          <div className=" flex  items-center">
            {" "}
            <RxDashboard size={22} className="" />
          </div>
          <div>Dashboard</div>
        </Link>

        <Link
          to={"/POC/DepartmentDetails"}
          className={` ${
            sidebarValue2 == "Departments Details"
              ? " bg-[#f5f5f5] text-textgreen"
              : ""
          } hover:bg-[#f5f5f5] cursor-pointer grid grid-cols-[auto_1fr] gap-4 px-4 py-2  font-semibold  rounded-lg`}
          onClick={handleItemClick}
        >
          <div className=" flex  items-center">
            {" "}
            <BsBuildings size={22} className="" />
          </div>
          <div>Departments Details</div>
        </Link>
        <Link
          to={"/POC/HodDetails"}
          className={` ${
            sidebarValue2 == "Hod Details" ? " bg-[#f5f5f5] text-textgreen" : ""
          } hover:bg-[#f5f5f5] cursor-pointer grid grid-cols-[auto_1fr] gap-4 px-4 py-2  font-semibold  rounded-lg`}
          onClick={handleItemClick}
        >
          <div className=" flex  items-center">
            {" "}
            <LiaUserEditSolid size={22} className="" />
          </div>
          <div>Hod Details</div>
        </Link>
        <Link
          to={"/POC/CollegeInfo"}
          className={` ${
            sidebarValue2 == "College Details" ? " bg-[#f5f5f5] text-textgreen" : ""
          } hover:bg-[#f5f5f5] cursor-pointer grid grid-cols-[auto_1fr] gap-4 px-4 py-2  font-semibold  rounded-lg`}
          onClick={handleItemClick}
        >
          <div className=" flex  items-center">
            {" "}
            <LuSchool2 size={22} className="" />
          </div>
          <div>College Details</div>
        </Link>
      </ul>
      <div className=" flex flex-col gap-1 bg-bgwhite rounded-lg p-3 mb-10">
        <section className=" flex gap-2 justify-center items-center">
          <FaUserCircle className=" text-darkgreen" size={40}></FaUserCircle>

          <section>
            <p className=" font-semibold text-lg">{userDetails?.username}</p>
          </section>
        </section>
        <button  onClick={handleLogOut} className=" bg-buttongreen bg-opacity-30 w-full text-green-600 px-4 py-[5px] font-semibold rounded-full mt-5">
          logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
