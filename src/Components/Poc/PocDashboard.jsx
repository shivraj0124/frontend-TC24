import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { LiaUserEditSolid } from "react-icons/lia";
import { BsBuildings } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import themeHook from "../Context";
import { toast } from "react-hot-toast";
import axios from "axios";
function PocDashboard() {
  const { userDetails } = themeHook();
  const [data, setData] = useState();
  const getAllCounts = async () => {
    try {
      const result = await axios.post(
        "http://localhost:8000/api/poc/pocDashboardDetails",
        {
          poc_id: userDetails._id,
          college_id: userDetails.College,
        }
      );
      console.log(result);
      setData(result.data);
    } catch (err) {
      toast.error(err.message); // Use err.message to get the error message
    }
  };
  useEffect(() => {
    getAllCounts();
  }, []);
  return (
    <div className="flex flex-col w-full  h-[90vh] p-5">
      <div className="flex flex-row justify-between ">
        <div>
          <h1 className="text-lg font-semibold ">Dashboard</h1>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-10 mt-5">
        <div className="border-2 border-gray-300 bg=[#f5f5f5] flex flex-row justify-between items-center p-4 rounded-md ">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold text-darkgreen">
              <CountUp delay={2} end={data?.totalDepartments} />
            </h1>
            <h1 className="text-xl font-bold ">Departments</h1>
          </div>
          <div>
            <BsBuildings className="text-darkgreen" size={60} />
          </div>
        </div>
        <div className="border-2 border-gray-300 bg=[#f5f5f5] flex flex-row justify-between items-center p-4 rounded-md ">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold text-darkgreen">
              <CountUp delay={2} end={data?.totalHod} />
            </h1>
            <h1 className="text-xl font-bold ">Hod's</h1>
          </div>
          <div>
            <LiaUserEditSolid className="text-darkgreen" size={60} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-10 mt-10">
        <div className="border-2 border-gray-300 bg=[#f5f5f5] flex flex-col justify-between items-center p-4 rounded-md">
          <div className="font-semibold text-gray-500">Profile</div>
          <hr className=" border-1 p-1  w-[100%]" />
          <section className=" flex gap-2 justify-center items-center">
            <FaUserCircle className=" text-darkgreen" size={40}></FaUserCircle>
          </section>
          <section className="text-center">
            <h1 className=" font-semibold text-2xl ">
              {data?.pocData[0]?.username}
            </h1>
            <h2 className="mt-3">{data?.pocData[0]?.mobileNo}</h2>
            <h2>{data?.pocData[0]?.email}</h2>
            <h2 className="font-bold">{data?.pocData[0]?.College.name}</h2>
          </section>
        </div>
      </div>
    </div>
  );
}

export default PocDashboard;
