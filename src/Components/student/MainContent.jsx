import React, { useEffect, useState } from "react";
import themeHook from "../Context";
import axios from "axios";
import ProjectCard from "./ProjectCard";
import RightCard from "./RightCard";
import CollegeCard from "./CollegeCard";
import { IoIosSearch } from "react-icons/io";
import { Carousel } from "react-responsive-carousel";
import DropDown from "./DropDown";
import MobileSidebar from "./MobileSidebar";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ss from "./ss.jpg";
import tt from "./tt.jpg";
import rr from "./rr.jpg";
import jj from "./jj.jpg";

function MainContent() {
  const { sidebarvalue } = themeHook();
  const [project, setproject] = useState();
  const [projectData, setprojectData] = useState([]);
  const [collegeData, setcollegeData] = useState([]);
  const [search, setsrach] = useState("");
  const { setfiltertime, filtertime, setfilterbycollge, filterbycollge } =
    themeHook();

  const projectdata = async () => {
    const res = await axios.get(
      "http://localhost:8000/api/project/getallprojects"
    );
    //console.log(res.data.data.data);
    setprojectData(res.data.data.data);
  };

    // const filterdata = async () => {
    //     const res = await axios.post("http://localhost:8000/api/project/filter", { time: filtertime, type: filterbycollge });
    //     //console.log(res);
    //     setprojectData(res.data.data);
    // }

    useEffect(() => {
        projectdata()
    }, [search == " "])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:8000/api/project/search", {
      title: search,
    });
    //console.log(res.data.data.projects);
    setprojectData(res.data.data.projects);
  };

  const arr = ["Latest", "oldest"];
  const typearr = ["WEB", "APP", "hardware", "software", "AI", "ML"];
  return (
    <div className="w-full h-[90vh]  flex">
      <div className="flex flex-col p-4 gap-4 w-full border overflow-y-auto min-[900px]:h-[90vh]">
        {/* <MobileSidebar /> */}
        <h1 className=" text-darkgreen font-semibold text-lg text-center">
          Empowering Polytechnic Communities through Shared Knowledge: Building
          Bridges, Inspiring Innovation.
        </h1>
        <section className="w-full ">
          <Carousel
            axis="horizontal"
            showThumbs={false}
            autoPlay={true}
            interval={1000}
            infiniteLoop={true}
            swipeable={true}
          >
            <div>
              <img
                className=" bg-black rounded-md w-full h-[200px] object-cover"
                src={ss}
              />
            </div>
            <div>
              <img
                className=" bg-black rounded-md w-full h-[200px] object-cover"
                src={tt}
              />
            </div>
            
            <div>
              <img
                className=" bg-black rounded-md w-full h-[200px] object-cover"
                src={rr}
              />
            </div>
            <div>
              <img
                className=" bg-black rounded-md w-full h-[200px] object-cover"
                src={jj}
              />
            </div>
          </Carousel>
        </section>
    const arr = ['Latest', "oldest"];
    const typearr = ['WEB', 'APP', 'hardware', 'software', 'AI', 'ML']
    return (
        <div className="w-full h-[90vh]  flex flex-col">

            <div className='flex flex-col p-4 gap-4 w-full border overflow-y-auto min-[900px]:h-[90vh]'>
                {/* <MobileSidebar /> */}
                <h1 className=' text-darkgreen font-semibold text-lg text-center'>Empowering Polytechnic Communities through Shared Knowledge: Building Bridges, Inspiring Innovation.</h1>
                <section className='w-full'>
                    <img className=' bg-black rounded-md w-full h-[200px] object-cover'
                        src='https://www.itu.int/en/ITU-D/Environment/PublishingImages/Pages/Priority-Areas/Green-GovStack/Green%20gov%20banner.jpg' />
                </section>

        <section>
          <h1 className=" mx-2 font-semibold text-xl text-textgreen mb-2">
            Projects
          </h1>
          <div className=" flex px-2 py-1 justify-between rounded-m gap-4">
            <div className=" flex  gap-1 w-full">
              {/* <DropDown placeholder={"time"} data={arr} type={"time"} />
                            <DropDown placeholder={"type"} data={typearr} type={"college"} /> */}
                        </div>
                        <form onSubmit={handleSubmit} className='flex h-9'>
                            <input type="text" placeholder="search" onChange={(e) => setsrach(e.target.value)} className=' w-auto min-[800px]:w-60 bg-white border h-full rounded-md px-4 focus:outline-none text-sm text-gray-600' />
                        </form>
                    </div>
                    <div className=' mt-4 grid grid-cols-1 gap-4'>
                        {
                            projectData.length === 0 ? <div className=' flex justify-center items-center font-semibold'>
                                <img src={not_found} className=' w-40 h-40' />
                                <section>No Project Found</section>
                            </div> :
                                projectData.map((item, index) => (
                                    <ProjectCard key={index} data={item} />
                                ))
                        }
                    </div>
                </section>
            </div>
            {/* <div className=' h-[90vh] p-1 overflow-y-auto border '>
            </div>
            <form onSubmit={handleSubmit} className="flex h-9">
              <input
                type="text"
                placeholder="search"
                onChange={(e) => setsrach(e.target.value)}
                className=" w-auto min-[800px]:w-60 bg-white border h-full rounded-md px-4 focus:outline-none text-sm text-gray-600"
              />
            </form>
          </div>
          <div className=" mt-4 grid grid-cols-1 gap-4">
            {projectData.length === 0 ? (
              <div>No Project Found</div>
            ) : (
              projectData.map((item, index) => (
                <ProjectCard key={index} data={item} />
              ))
            )}
          </div>
        </section>
      </div>
      {/* <div className=' h-[90vh] p-1 overflow-y-auto border '>
                <h1 className='mx-2 font-bold text-lg text-textgreen mb-2'>Top Projects</h1>
                <div className=' flex flex-col gap-3'>
                    {
                        projectData?.map((item, index) => {
                            return <RightCard data={item} key={index} />
                        })
                    }
                </div>
            </div> */}
    </div>
  );
}

export default MainContent;
