import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function OneProject() {
  const [projectdata, setProjectdata] = useState([]);
  const [collegename, setcollegename] = useState("");
  const [Dptname, setDptgename] = useState("");
  const { id } = useParams();
  console.log(id);

  const getProjectdata = async () => {
    const res = await axios.post(
      "http://localhost:8000/api/project/getoneproject",
      { project_id: id }
    );
    console.log(res?.data?.data?.data[0]);
    setProjectdata(res?.data?.data?.data[0]);
    //console.log(projectdata);
  };


  useEffect(() => {
    getProjectdata();
  }, []);

  return (
    <div className=" h-[90vh]">
      <div className='p-4 bg-white flex flex-col gap-2  m-3 rounded-md h-[95%] overflow-y-auto'>
                <h1 className=' font-semibold text-xl'>{projectdata?.title}</h1>
                <section className=' flex gap-5'>
                    <h1 className=' text-sm text-gray-500'><span className=' font-semibold'>Type:</span>{projectdata?.type}</h1>
                    <h1 className=' text-sm text-gray-500'><span className=' font-semibold'>posted at:</span> 24 jan 2023</h1>
                </section>
                <img src={projectdata?.multimedia}
                    className=' w-[100%] h-40 rounded-lg'
                />
                <h1 className=' font-semibold'>Description :</h1>
                <h1 className=' text-sm text-gray-500'>{projectdata?.description}</h1>
                <h1 className=' font-semibold'>Contibuters :</h1>
                <h1 className=' text-sm text-gray-500'>{projectdata?.contributers}</h1>
                <h1 className=' font-semibold'>collage name : </h1>
                <h1 className=' text-sm text-gray-500'>{projectdata?.allocated_college?.name}</h1>
                <h1 className=' font-semibold'>Department name : </h1>
                <h1 className=' text-sm text-gray-500'>{projectdata?.allocated_department?.name}</h1>
            </div>
    </div>
  );
}

export default OneProject;
