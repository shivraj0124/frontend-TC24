import React, { useEffect, useState } from "react";
import themeHook from "../Context";
import axios from "axios";
import { toast } from "react-hot-toast";
import { CircularProgress } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Close, TokenOutlined } from "@mui/icons-material";
import Button from "@mui/material/Button";
function CollegeInfo() {
  const { token, userDetails } = themeHook();
  const [loading, setLoading] = useState(true);
  const [college, setCollege] = useState();
  const [collegeName, setCollegeName] = useState("");
  const [about, setAbout] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState("");
  const [isModelOpen, setIsModelOpen] = useState(false);
  const getCollege = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        "http://localhost:8000/api/poc/getOneCollege",
        {
          college_id: userDetails.College,
        }
      );
      console.log(result.data.data.data[0]);
      setCollege(result.data.data.data[0]);
      setLoading(false);
    } catch (err) {
      toast.error(err.message); // Use err.message to get the error message
    }
    setLoading(false);
  };
  const setbase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPhoto(reader.result);
    };
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setbase(file);
    console.log(file);
  };
  const handleEditProjectModal = async (e) => {
    setCollegeName(college?.name);
    setAbout(college?.about);
    setAddress(college?.address);
    setIsModelOpen(true);
  };
  const handleEditCollege = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "http://localhost:8000/api/poc/editCollegeInfo",
        {
          id: college._id,
          name: collegeName,
          about: about,
          address: address,
          photo: photo,
          userType: "poc",
        },
        {
          headers: {
            authentication: `Bearer ${token}`,
          },
        }
      );
      if (result?.data?.data?.status) {
        toast.success(result?.data?.data?.msg);
      } else {
        toast.error(result?.data?.data?.msg);
      }
      setIsModelOpen(false);
    } catch (err) {
      toast.error(err.message); // Use err.message to get the error message
    }
  };
  useEffect(() => {
    getCollege();
  }, [isModelOpen]);
  return (
    <div className="flex flex-col w-full  h-[90vh] p-5">
      <div className="flex flex-row justify-between ">
        <div>
          <h1 className="text-lg font-semibold mt-5">College Information</h1>
        </div>
        <button
          className="  p-1  bg-transparent border-0 text-blue-500  top-0  text-3xl leading-none font-semibold outline-none focus:outline-none"
          onClick={handleEditProjectModal}
        >
          {" "}
          <EditIcon />
        </button>
      </div>

      <div className="flex flex-col mt-10 shadow-md w-[60%] p-4 rounded-md">
        {loading && (
          <div className="text-center">
            <CircularProgress />
          </div>
        )}

        <div>
          <img src={college?.photo} className="rounded-md" />
        </div>
        <div className="flex flex-col  ">
          <h1 className="text-2xl font-bold">{college?.name}</h1>
          <h1 className="text-gray-400">{college?.about}</h1>
          <h1>{college?.address}</h1>
        </div>
      </div>
      {isModelOpen && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none  bg-opacity-10 backdrop-filter backdrop-blur-lg">
            <div className="relative  my-6 mx-auto w-[50%]">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center justify-between p-3 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-xl font-semibold text-[#757575]">
                    Edit College
                  </h3>
                  <button
                    className="  p-1 ml-auto bg-transparent border-0 text-[#757575] float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setIsModelOpen(false)}
                  >
                    <Close />
                  </button>
                </div>
                <form onSubmit={handleEditCollege}>
                  <div className="p-4">
                    <div className="flex flex-col">
                      <label className="mt-5">College Name</label>
                      <input
                        type="text"
                        className="border-2 border-gray-300 rounded-md px-2 py-1 focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                        placeholder="Enter College Name"
                        value={collegeName}
                        onChange={(e) => setCollegeName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="mt-5">About</label>
                      <input
                        type="telephone"
                        className="border-2 border-gray-300 rounded-md px-2 py-1  focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                        placeholder="About The College"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        required
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="mt-5">Address</label>
                      <input
                        type="telephone"
                        className="border-2 border-gray-300 rounded-md px-2 py-1  focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                        placeholder="Enter College Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="mt-5">Upload Photo</label>
                      <input
                        type="file"
                        className="border-2 border-gray-300 rounded-md px-2 py-1  focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                        placeholder="Drop Multimedia"
                        onChange={handleImageUpload}
                      />
                    </div>
                    <div className="flex flex-col py-4 justify-between gap-3">
                      <div className="flex gap-2 mt-10">
                        <Button
                          variant="contained"
                          type="submit"
                          style={{
                            backgroundColor: "#16a34a",
                            height: "max-content",
                          }}
                        >
                          Submit
                        </Button>
                        <Button
                          onClick={() => setIsModelOpen(false)}
                          variant="contained"
                          style={{
                            backgroundColor: "#dcfce7",
                            height: "max-content",
                            color: "#16a34a",
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CollegeInfo;
