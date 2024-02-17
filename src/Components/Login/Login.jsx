import React from "react";
import StudentLogin from "../Login/StudentLogin";
import POCForm from "./POCForm";
import HODForm from "./HODForm";
import themeHook from "../Context";
import { Link } from "react-router-dom";
function LoginForm() {
  const { findForm, setFindForm } = themeHook();
  // const navigate =useNavigate()
  return (
    <div className="pt-5  h-screen flex justify-center bg-blue-50 overflow-y-auto">
      <div className="flex flex-col fixed  bg-[#fcfcfe] shadow-xl rounded-xl mt-5 max-md:mt-2 pb-9 max-md:w-[90%] justify-center items-center w-max h-max py-5 px-8">
        <h1 className="font-semibold text-gray-500">Login As</h1>

        <div className="flex flex-row max-md:flex-col max-md:gap-y-2 gap-2  justify-between items-center w-[100%] mt-6">
          <button
            className={
              findForm === "Student"
                ? "p-2 px-4 drop-shadow-lg bg-green-600 text-white basis-1/4 rounded-md max-md:w-[100%]"
                : "p-2 px-4 bg-white text-blue-500 drop-shadow-lg hover:bg-green-600 hover:text-white basis-1/4 rounded-md max-md:w-[100%]"
            }
            onClick={() => setFindForm("Student")}
          >
            Student
          </button>
          <button
            className={
              findForm === "Admin"
                ? "p-2 px-4 drop-shadow-lg bg-green-600 text-white basis-1/4 rounded-md max-md:w-[100%]"
                : "p-2 px-4 bg-white text-blue-500 drop-shadow-lg hover:bg-green-600 hover:text-white basis-1/4 rounded-md max-md:w-[100%]"
            }
            onClick={() => setFindForm("Admin")}
          >
            Admin
          </button>
          <button
            className={
              findForm === "POC"
                ? "p-2 px-4 drop-shadow-lg bg-green-600 text-white basis-1/4 rounded-md max-md:w-[100%]"
                : "p-2 px-4 bg-white text-blue-500 drop-shadow-lg hover:bg-green-600 hover:text-white basis-1/4 rounded-md max-md:w-[100%]"
            }
            onClick={() => setFindForm("POC")}
          >
            POC
          </button>
          <button
            className={
              findForm === "HOD"
                ? "p-2 px-4 drop-shadow-lg bg-green-600 text-white basis-1/4 rounded-md max-md:w-[100%]"
                : "p-2 px-4 bg-white text-blue-500 drop-shadow-lg hover:bg-green-600 hover:text-white basis-1/4 rounded-md max-md:w-[100%]"
            }
            onClick={() => setFindForm("HOD")}
          >
            HOD
          </button>
        </div>
        <hr className="text-gray-300 h-[1px] mt-12 max-md:mt-5 w-[100%] bg-gray-200" />
        <div className="w-[96%] rounded-md mt-8 max-md:mt-2 ">
          {findForm === "POC" ? (
            <POCForm />
          ) : findForm === "HOD" ? (
            <HODForm />
          ) : (
            <StudentLogin />
          )}
        </div>

        {findForm == "Student" ? (
          <div>
            <h2>
              Don't have an account ?
              <Link
                className="cursor-pointer text-blue-500"
                onClick={() => setFindForm("Student")}
                to="/SignUp"
              >
                {" "}
                Register
              </Link>
            </h2>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default LoginForm;
