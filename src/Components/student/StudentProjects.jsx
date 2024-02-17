import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { Close, TokenOutlined } from "@mui/icons-material";
import axios from "axios";
import themeHook from "../Context";
import { toast } from "react-hot-toast";
import ProjectCard2 from "./ProjectCard2";
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
  const [projectList, setProjectList] = useState([]);
  const [loading, setLoading] = useState("");
  const [search,setSearch]=useState("")
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
          allocated_department: userDetails.allocated_department,
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
  const getAllProjects = async () => {
    console.log(userDetails.allocated_college, "js");
    try {
      const result = await axios.get(
        "http://localhost:8000/api/auth/getAllProjects"
      );
      setProjectList(result.data.data.data);
      console.log(result.data);
    } catch (err) {
      toast.error(err.message); // Use err.message to get the error message
    }
    setLoading(false);
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:8000/api/project/searchStudentsProj", { title: search });
    console.log(res.data.data.projects);
    setProjectList(res.data.data.projects);
}
  useEffect(() => {
    getAllProjects();
  }, [userDetails]);
  return (
    <div className="w-full flex h-[90vh]">
      <div className=" flex flex-col p-2 w-full h-[90vh] overflow-y-auto">
        <div className="flex flex-row w-[100%] items-center">
          <form onSubmit={handleSearch} className=" p-4 flex justify-center w-[100%]">
            <input
              type="search"
              className=" w-[80%] rounded-xl py-[6px] border px-4 focus:outline-none text-gray-500 "
              placeholder="serach project"
              onChange={(e)=>setSearch(e.target.value)}
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
              onclick="my_modal_3.showModal()"
            >
              Add Project
            </Button>
          </div>
        </div>
        <h1 className=" text-darkgreen font-semibold text-xl mx-2">
          Projects Uploaded By Students
        </h1>
        <div className=" grid grid-cols-1 gap-4 p-2">
          {projectList.length === 0 ? (
            <div>No Project Found</div>
          ) : (
            projectList?.map((item, index) => (
              <ProjectCard2 key={index} data={item} />
            ))
          )}
        </div>
      </div>
      <dialog id="my_modal_3" class="modal">
        <div class="modal-box">
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 class="font-bold text-lg">Hello!</h3>
          <p class="py-4">Press ESC key or click on ✕ button to close</p>
        </div>
      </dialog>
    </div>
  );
}

export default StudentProjects;
