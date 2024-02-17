import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { Close, TokenOutlined } from "@mui/icons-material";
import axios from "axios";
import themeHook from "../Context";
import { toast } from "react-hot-toast";
function StudentProjects() {
  const projectTypes = [
    { id: 1, value: "Software" },
    { id: 2, value: "Hardware" },
    { id: 3, value: "AI/Ml" },
    { id: 4, value: "IOT" },
  ];
  const { userDetails } = themeHook();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [multimedia, setMultimedia] = useState([]);
  const [contributors, setContributors] = useState("");
  const [liveDemo, setLiveDemo] = useState("");
  const [codeLink, setCodeLink] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const setbase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setMultimedia(reader.result);
    };
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setbase(file);
    console.log(file);
  };
  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      const result = axios.post(
        "http://localhost:8000/api/project/addProjectByStudent",
        {
          title: title,
          description: description,
          multimedia: multimedia,
          contributors: contributors,
          liveDemo: liveDemo,
          codeLink: codeLink,
          type: selectedType,
          allocated_college: userDetails.allocated_college,
          created_By: userDetails._id,
          allocated_department: userDetails.allocated_department
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
  // const getAllProjects =async ()=>{
  //     try{

  //     }
  // }
  return (
    <div className="w-full flex h-[90vh]">
      <div className=" flex flex-col p-2 w-full h-[90vh] overflow-y-auto">
        <div className="flex flex-row w-[100%] items-center">
          <form className=" p-4 flex justify-center w-[100%]">
            <input
              type="search"
              className=" w-[80%] rounded-xl py-[6px] border px-4 focus:outline-none text-gray-500 "
              placeholder="serach project"
            />
          </form>
          <div>
            {" "}
            <Button
              variant="contained"
              style={{
                backgroundColor: "#327c1c",
                height: "max-content",
                width: "max-content",
              }}
              onClick={() => setIsModelOpen(true)}
            >
              Add Project
            </Button>
          </div>
        </div>
        <h1 className=" text-darkgreen font-semibold text-xl mx-2">
          Projects Uploaded By Students
        </h1>
        <div className=" grid grid-cols-1 min-[550px]:grid-cols-2 gap-4 p-2"></div>
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
                    Add Project
                  </h3>
                  <button
                    className="  p-1 ml-auto bg-transparent border-0 text-[#757575] float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setIsModelOpen(false)}
                  >
                    <Close />
                  </button>
                </div>
                <form onSubmit={handleAddProject}>
                  <div className="p-4">
                    <div className="flex flex-col">
                      <label className="mt-5">Project Title</label>
                      <input
                        type="text"
                        className="border-2 border-gray-300 rounded-md px-2 py-1 focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                        placeholder="Enter Project Title"
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="mt-5">Project Type</label>
                      <select
                        className="border-2 border-gray-300 rounded-md px-2 py-1 focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                        onChange={(event) => {
                          setSelectedType(event.target.value);
                        }}
                      >
                        <option value="">Select Project Type</option>
                        {projectTypes &&
                          projectTypes.map((item, index) => {
                            return (
                              <option
                                key={index + 1}
                                id={item.id}
                                value={item.value}
                              >
                                {item.value}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label className="mt-5">PRoject Description</label>
                      <textarea
                        className="border-2 border-gray-300 rounded-md px-2 py-1  focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                        placeholder="Enter Project Description"
                        onChange={(e) => setDescription(e.target.value)}
                        required
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="mt-5">Multimedia</label>
                      <input
                        type="file"
                        className="border-2 border-gray-300 rounded-md px-2 py-1  focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                        placeholder="Drop Multimedia"
                        onChange={handleImageUpload}
                        required
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="mt-5">Project Contributors</label>
                      <input
                        type="telephone"
                        className="border-2 border-gray-300 rounded-md px-2 py-1  focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                        placeholder="Ex. Mohan Rane, Satish Ratho"
                        onChange={(e) => setContributors(e.target.value)}
                        required
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="mt-5">Project Live Demo</label>
                      <input
                        type="telephone"
                        className="border-2 border-gray-300 rounded-md px-2 py-1  focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                        placeholder="Drop Live Project Link"
                        onChange={(e) => setLiveDemo(e.target.value)}
                        required
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="mt-5">Project Code Link</label>
                      <input
                        type="telephone"
                        className="border-2 border-gray-300 rounded-md px-2 py-1  focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                        placeholder="Drop Code Link"
                        onChange={(e) => setCodeLink(e.target.value)}
                        required
                      />
                    </div>

                    <div className="flex flex-col py-2 justify-between gap-3">
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

export default StudentProjects;
