import React, { useEffect, useState } from 'react'
import themeHook from '../Context'
import axios from 'axios';
import ProjectCard from './ProjectCard';
import RightCard from './RightCard';

function RightSideContent() {
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
        console.log(res.data.data.data);
        setprojectData(res.data.data.data)
    }

    const collgedata = async () => {
        const res = await axios.get("http://localhost:8000/api/college/getAllColleges");
        console.log(res.data.data.data);
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

    return (
        <div className=' h-full border p-2'>
            {project && (
                <div className=' h-[88vh]  overflow-y-auto '>
                    <h1 className='mx-2 font-bold text-lg text-textgreen mb-2'>Top Projects</h1>
                    <div className=' flex flex-col gap-3'>
                        {
                            projectData?.map((item, index) => {
                                return <RightCard data={item} key={index} />
                            })
                        }
                    </div>
                </div>
            )}
            {college && (
                <h1>collage</h1>
            )}
        </div>
    )
}

export default RightSideContent