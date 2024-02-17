import React from "react";
import themeHook from "./Context";
import { FaUserCircle } from "react-icons/fa";
import Button from "@mui/material/Button";
function Navbar() {
  const { userDetails } = themeHook();
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
          >
            Login
          </Button>
        </div>
      ) : (
        <div className="flex flex-row items-center gap-2">
          <h1 className="text-black">{userDetails?.username}</h1>
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
