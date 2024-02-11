import React, { useEffect, useState } from 'react'
import themeHook from '../Context'
import axios from 'axios';
import ProjectCard from './ProjectCard';
import { IoIosSearch } from "react-icons/io";

import DropDown from './DropDown';

function MainContent() {
    const { sidebarvalue } = themeHook()
    const [project, setproject] = useState();
    const [college, setcollege] = useState();
    const [about, setabout] = useState();
    const [contact, setcontact] = useState();
    const [projectData, setprojectData] = useState()
    const [collegeData, setcollegeData] = useState()

    useEffect(() => {
        if (sidebarvalue == "Home") {
            setproject(true);
            setcollege(false);
            setabout(false);
            setcontact(false);
        }
        if (sidebarvalue == "College") {
            setproject(false);
            setcollege(true);
            setabout(false);
            setcontact(false);
        }
        if (sidebarvalue == "About") {
            setproject(false);
            setcollege(false);
            setabout(true);
            setcontact(false);
        }
        if (sidebarvalue == "Contact") {
            setproject(false);
            setcollege(false);
            setabout(false);
            setcontact(true);
        }
    }, [sidebarvalue])


    const projectdata = async () => {
        const res = await axios.get("http://localhost:8000/api/project/getallprojects");
        //console.log(res.data.data.data);
        setprojectData(res.data.data.data);
    }

    const collgedata = async () => {
        const res = await axios.get("http://localhost:8000/api/college/getAllColleges");
        //console.log(res.data.data.data);
        setcollegeData(res.data.data.data);
    }

    useEffect(() => {
        if (project) {
            projectdata()
        }
    }, [project])

    useEffect(() => {
        if (college) {
            collgedata()
        }
    }, [college])

    const hadlesubmit = (e) => {
        e.preventdDefault();
    }

    const arr = ['Latest', "oldest"];
    const typearr = ['web', 'app', 'hardware', 'softwre', 'AI', 'Ml']
    return (
        <div className="w-full h-[90vh] overflow-y-auto">
            {project && (
                <div className='flex flex-col p-4 gap-4 w-full'>
                    <section className='w-full'>
                        <img className=' bg-black rounded-md w-full h-[200px] object-cover'
                            src='https://www.itu.int/en/ITU-D/Environment/PublishingImages/Pages/Priority-Areas/Green-GovStack/Green%20gov%20banner.jpg' />
                    </section>

                    <section >
                        <h1 className=' mx-2 font-semibold text-xl text-textgreen mb-2'>Projects</h1>
                        <div className=' flex px-2 py-1 justify-between rounded-m gap-4' >
                            <div className=' flex  gap-1 w-full'>
                                <DropDown placeholder={"time"} data={arr} />
                                <DropDown placeholder={"type"} data={typearr} />
                            </div>
                            <form onSubmit={hadlesubmit} className='flex h-9'>

                                <input type="text" placeholder="search" className=' w-auto min-[800px]:w-60 bg-white border h-full rounded-md px-4 focus:outline-none text-sm text-gray-600' />
                            </form>
                        </div>
                        <div className=' mt-4 grid grid-cols-1 gap-4'>
                            {
                                projectData?.map((item, index) => {
                                    return <ProjectCard key={index} data={item} />
                                })
                            }
                            {/* <ProjectCard />
                            <ProjectCard /> */}
                        </div>
                    </section>
                </div>
            )}

            {college && (
                <h1>collage</h1>
            )}
        </div>
    )
}

export default MainContent