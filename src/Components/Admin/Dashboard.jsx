import React, { useEffect, useState } from "react";
import { LuSchool2 } from "react-icons/lu";
import { FiUserCheck } from "react-icons/fi";
import { PiStudent } from "react-icons/pi";
import { LiaUserEditSolid } from "react-icons/lia";
import LineChartTest from "./LineChartTest";
import axios from "axios";
import CountUp from "react-countup";
import Bar from "../Charts/Chart";
import { AreaChart } from "recharts";
import Area from "../Charts/Ap";
import Ap from "../Charts/Ap";
import Select from "react-select";
function Dashboard() {
  const [data, setData] = useState();
  const [clg, setclg] = useState([]);
  const getTotalCount = async () => {
    try {
      const result = await axios.get(
        "http://localhost:8000/api/admin/getTotalCount"
      );
      console.log(result.data.totalCountCollege);
      setData(result.data);
    } catch (err) {
      toast.error(err.message); // Use err.message to get the error message
    }
  };

  const getcollege = async () => {
    try {
      const result = await axios.get(
        "http://localhost:8000/api/admin/getcolleges"
      );
      console.log(result.data.data);
      setclg(result.data.data);
    } catch (err) {
      toast.error(err.message); // Use err.message to get the error message
    }
  };
  useEffect(() => {
    getTotalCount();
    getcollege();
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
              <CountUp delay={2} end={data?.totalCountCollege} />
            </h1>
            <h1 className="text-xl font-bold ">Colleges</h1>
          </div>
          <div>
            <LuSchool2 className="text-darkgreen" size={60} />
          </div>
        </div>
        <div className="border-2 border-gray-300 bg=[#f5f5f5] flex flex-row justify-between items-center p-4 rounded-md ">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold text-darkgreen">
              <CountUp delay={2} end={data?.totalCountPoc} />
            </h1>
            <h1 className="text-xl font-bold ">Poc's</h1>
          </div>
          <div>
            <FiUserCheck className="text-darkgreen" size={60} />
          </div>
        </div>
        <div className="border-2 border-gray-300 bg=[#f5f5f5] flex flex-row justify-between items-center p-4 rounded-md ">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold text-darkgreen">
              <CountUp delay={2} end={data?.totalCountHod} />
            </h1>
            <h1 className="text-xl font-bold ">Hod's</h1>
          </div>
          <div>
            <LiaUserEditSolid className="text-darkgreen" size={60} />
          </div>
        </div>
        <div className="border-2 border-gray-300 bg=[#f5f5f5] flex flex-row justify-between items-center p-4 rounded-md ">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold text-darkgreen">
              <CountUp delay={2} end={data?.totalCountStudents} />
            </h1>
            <h1 className="text-xl font-bold ">Students</h1>
          </div>
          <div>
            <PiStudent className="text-darkgreen" size={60} />
          </div>
        </div>
      </div>
      <div className="flex flex-row w-full mt-10 border-2">
        {/* <div className="flex flex-col gap-10 w-full">
          <div className="border-2 border-gray-300 bg=[#f5f5f5] flex flex-row justify-between items-center p-4 rounded-md ">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-bold text-darkgreen">48</h1>
              <h1 className="text-xl font-bold ">Colleges</h1>
            </div>
            <div>
              <FaSchool className="text-darkgreen" size={60} />
            </div>
          </div>
          <div className="border-2 border-gray-300 bg=[#f5f5f5] flex flex-row justify-between items-center p-4 rounded-md ">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-bold text-darkgreen">48</h1>
              <h1 className="text-xl font-bold ">Colleges</h1>
            </div>
            <div>
              <FaSchool className="text-darkgreen" size={60} />
            </div>
          </div> 
  </div> */}
        <div className="w-[100%] flex justify-start  p-4">
          <Bar
            clg={data?.totalCountCollege}
            poc={data?.totalCountPoc}
            hod={data?.totalCountHod}
          />
          <div>
            <section className="  mx-10  w-full">
              <Select
                options={clg.map((item) => ({
                  value: item._id,
                  label: item.name,
                }))}
              />
            </section>

            <Ap />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
