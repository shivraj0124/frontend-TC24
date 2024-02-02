import React from "react";
import LoginFormFields from "../Login/LoginFormFields";
import themeHook from "../Context";
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
                ? "p-2 px-4 drop-shadow-lg bg-blue-600 text-white basis-1/4 rounded-md max-md:w-[100%]"
                : "p-2 px-4 bg-white text-blue-500 drop-shadow-lg hover:bg-blue-500 hover:text-white basis-1/4 rounded-md max-md:w-[100%]"
            }
            onClick={() => setFindForm("Student")}
          >
            Student
          </button>
          <button
            className={
              findForm === "Admin"
                ? "p-2 px-4 drop-shadow-lg bg-blue-600 text-white basis-1/4 rounded-md max-md:w-[100%]"
                : "p-2 px-4 bg-white text-blue-500 drop-shadow-lg hover:bg-blue-500 hover:text-white basis-1/4 rounded-md max-md:w-[100%]"
            }
            onClick={() => setFindForm("Admin")}
          >
            Admin
          </button>
          <button
            className={
              findForm === "POC"
                ? "p-2 px-4 drop-shadow-lg bg-blue-600 text-white basis-1/4 rounded-md max-md:w-[100%]"
                : "p-2 px-4 bg-white text-blue-500 drop-shadow-lg hover:bg-blue-500 hover:text-white basis-1/4 rounded-md max-md:w-[100%]"
            }
            onClick={() => setFindForm("POC")}
          >
            POC
          </button>
          <button
            className={
              findForm === "HOD"
                ? "p-2 px-4 drop-shadow-lg bg-blue-600 text-white basis-1/4 rounded-md max-md:w-[100%]"
                : "p-2 px-4 bg-white text-blue-500 drop-shadow-lg hover:bg-blue-500 hover:text-white basis-1/4 rounded-md max-md:w-[100%]"
            }
            onClick={() => setFindForm("HOD")}
          >
            HOD
          </button>
        </div>
        <hr className="text-gray-300 h-[1px] mt-12 max-md:mt-5 w-[100%] bg-gray-200" />
        <div className="w-[96%] rounded-md mt-8 max-md:mt-2 ">
          <LoginFormFields />
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
