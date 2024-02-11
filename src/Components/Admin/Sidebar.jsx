import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import {
  BiSolidDashboard,
  BiMenuAltRight,
  BiUpArrow,
  BiDownArrow,
  BiSolidSchool,
} from "react-icons/bi";
import { RiAdminFill } from "react-icons/ri";
import CollegesTable from "./CollegesTable";
function Sidebar() {
  const [component, setComponent] = useState("Dashboard");
  return (
    <div>
      <Navbar />
      <div className="w-[100%] flex flex-row justify-between">
        <div className="w-[200px] bg-white  h-screen  border-r-2 border-gray-300 fixed">
          <div className="p-4">
            <div
              className="flex flex-row items-center gap-2 cursor-pointer w-max"
              onClick={() => setComponent("Dashboard")}
            >
              <BiSolidDashboard size={22} />
              <h1 className="text-lg font-semibold hover:text-blue-400">
                Dashboard
              </h1>
            </div>
            <div
              className="flex flex-row items-center gap-2 cursor-pointer w-max mt-2"
              onClick={() => {
                setComponent("Colleges");
                console.log(component);
              }}
            >
              <BiSolidSchool size={22} />
              <h1 className="text-lg font-semibold hover:text-blue-400">
                Colleges
              </h1>
            </div>
            <div
              className="flex flex-row items-center gap-2 cursor-pointer w-max mt-2"
              onClick={() => setComponent("PocS")}
            >
              <RiAdminFill size={22} />
              <h1 className="text-lg font-semibold hover:text-blue-400">
                Poc's
              </h1>
            </div>
          </div>
        </div>
        <div className="bg-gray-100  w-[100%] h-screen fixed left-[200px] p-5">
          {component === "Dashboard" ? (
            ""
          ) : component === "Colleges" ? (
            <CollegesTable />
          ) : component === "PocS" ? (
            ""
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
