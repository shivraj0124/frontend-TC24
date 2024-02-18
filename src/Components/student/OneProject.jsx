import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import themeHook from "../Context";
import toast from "react-hot-toast";

function OneProject() {
  const [projectdata, setProjectdata] = useState([]);
  const [collegename, setcollegename] = useState("");
  const [Dptname, setDptgename] = useState("");
  const { id } = useParams();
  const { token, userDetails } = themeHook();
  console.log(userDetails);

    const getProjectdata = async () => {
        const res = await axios.post("http://localhost:8000/api/project/getoneproject", { project_id: id });
        console.log(res.data.data);
        setProjectdata(res.data.data);
        //console.log(projectdata);
    };

    const getcollege = async () => {
        const res = await axios.post("http://localhost:8000/api/college/onecollge", { college: projectdata.allocated_college });
        //console.log(res.data.data);
        setcollegename(res.data.data.name)
    }

    const getdpt = async () => {
        const res = await axios.post("http://localhost:8000/api/dpt/onedpt", { dpt: projectdata.allocated_department });
        console.log(res.data.data.data);
        setDptgename(res.data.data.data)
    }

  const save = async () => {
    const { data } = await axios.post(
      "http://localhost:8000/api/save/add",
      {
        project_id: id,
        user_id: userDetails._id,
      },
      {
        headers: {
          authentication: `Bearer ${token}`,
        },
      }
    );
    if (data.data.status) {
      toast.success("saved succesfully");
    }
    console.log(data);
  };

    useEffect(() => {
        getProjectdata();
        getcollege();
        getdpt();
    }, [])


    return (
        <div className=' h-[90vh]'>
            <div className="p-4 bg-white flex flex-col gap-2  m-3 rounded-md h-[95%] overflow-y-auto">
        <div className=" flex justify-between">
          <h1 className=" font-semibold text-xl">{projectdata.title}</h1>
          <button
            onClick={save}
            className="px-3 py-1 bg-green-500 text-white font-bold rounded-md"
          >
            Save
          </button>
        </div>

        <section className=" flex gap-5">
          <h1 className=" text-sm text-gray-500">
            <span className=" font-semibold">Type:</span>
            {projectdata.type}
          </h1>
          <h1 className=" text-sm text-gray-500">
            <span className=" font-semibold">posted at:</span> 24 jan 2023
          </h1>
        </section>
        <img
          src={projectdata.multimedia}
          className=" w-[100%] h-40 rounded-lg"
        />
        <h1 className=" font-semibold">Description :</h1>
        <h1 className=" text-sm text-gray-500">{projectdata.description}</h1>
        <h1 className=" font-semibold">Contibuters :</h1>
        <h1 className=" text-sm text-gray-500">{projectdata.contributers}</h1>
        <h1 className=" font-semibold">collage name : </h1>
        <h1 className=" text-sm text-gray-500">
          {collegename}
        </h1>
        <h1 className=" font-semibold">Department name : </h1>
        <h1 className=" text-sm text-gray-500">
          {Dptname.name}
        </h1>
      </div>
        </div>
    )
}

export default OneProject;
