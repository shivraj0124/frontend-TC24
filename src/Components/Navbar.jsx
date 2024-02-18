import React from "react";
import themeHook from "./Context";
import { FaUserCircle } from "react-icons/fa";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Navbar() {
  const { userDetails } = themeHook();
  const navigate = useNavigate();
  return (
    <div className="flex flex-row bg-white px-10 py-3 justify-between border-b-2 border-gray-300 sticky top-0">
      <div>
        <h1 className="text-xl font-semibold text-black">ByteDevs</h1>
      </div>
      {userDetails === null ? (
        <div className="flex flex-row items-center gap-2">
          <Button
            variant="contained"
            type="submit"
            style={{
              backgroundColor: "#22c55e",
            }}
            onClick={() => navigate("/Login")}
          >
            Login
          </Button>
        </div>
      ) : (
        <div className="flex flex-row items-center gap-2">
          {userDetails?.userType === "admin" ?
            <h1 className="text-black">
              <Link to="/Admin/Dashboard">{userDetails?.username}</Link>
            </h1> :userDetails?.userType === "poc" ?  <h1 className="text-black">
              <Link to="/Poc/Dashboard">{userDetails?.username}</Link>
            </h1> : userDetails?.userType === "HOD" ?  <h1 className="text-black">
              <Link to="/Hod/Dashboard">{userDetails?.username}</Link>
            </h1> :  <h1 className="text-black">
              <Link to="/Profile">{userDetails?.username}</Link>
            </h1>
          }
          {/* <div className="text-white bg-gray-600 rounded-[50%] p-2 w-[40px] h-[40px] flex justify-center items-center">
                    A
                </div> */}
          <FaUserCircle className=" text-darkgreen" size={40}></FaUserCircle>
        </div>
      )}
    </div>
  );
}

export default Navbar;
