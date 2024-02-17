import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import bannerimg from './CollegeBanner.jpg'
import { LuSchool } from "react-icons/lu";

function OneCollege() {
    const [collegedata, setcollegedata] = useState([]);
    const [dpt, setdpt] = useState([]);
    const [project, setproject] = useState([]);
    const { id } = useParams();
    console.log(id);

    const getdata = async () => {
        const res = await axios.post("http://localhost:8000/api/college/onecollge", { college: id });
        //console.log(res.data.data);
        setcollegedata(res.data.data)
    }


    const getdptdata = async () => {
        const data = await axios.post("http://localhost:8000/api/auth/getDepartment", { college_id: id, })
        console.log(data.data.data.data);
        setdpt(data.data.data.data);
    }

    const getprojectdata = async () => {
        const data = await axios.post("http://localhost:8000/api/project/getAllProjectsByCollege", { college_id: id, })
        console.log(data.data.data.data);
        setproject(data.data.data.data);
    }

    useEffect(() => {
        getdata();
        getdptdata();
        getprojectdata();
    }, [])

    return (
        <div className=' w-full flex flex-col h-[90vh] px-8 py-4 overflow-y-auto gap-4'>
            <div className=' w-full bg-white rounded-lg'>
                <div className=' relative rounded-lg  bg-white'>
                    <img src={bannerimg} alt='image' className='h-40 w-full' />
                    <section className=' w-32 h-32 absolute rounded-lg top-20 left-7'>
                        <img className='rounded-lg h-full w-full object-cover'
                            src='https://www.festivalsfromindia.com/wp-content/uploads/2022/04/VJTI-Mumbai.-Photo-VJTI-Mumbai-1_11zon.jpg' alt='img' />
                    </section>
                </div>
                <div className=' pt-14 px-6 py-3'>
                    <h1 className=' font-semibold text-xl'>{collegedata.name}</h1>
                    <h1 className=' text-gray-500 text-sm line-clamp-3'>{collegedata.about}</h1>
                    <h1 className=' text-gray-500'><span className=' font-semibold'>Address:</span> {collegedata.address}</h1>
                </div>
            </div>
            <div className=' grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className=' flex flex-col gap-2 md:h-[50vh] overflow-y-auto'>
                    <h1 className=' text-darkgreen text-lg font-semibold'>Department</h1>
                    <div className=' flex flex-col gap-3'>
                        {
                            dpt?.map((item, index) => {
                                return <div className=' flex items-center bg-white rounded-lg p-4 gap-4'>
                                    <LuSchool size={35} className=' text-textgreen' />
                                    <section className=' w-[90%]'>
                                        <h1 className=' font-semibold'>{item.name}</h1>
                                        <h1 className=' text-gray-500 text-sm line-clamp-3'><span className=' font-semibold'>About: </span>{item.about}</h1>
                                    </section>
                                </div>
                            })
                        }

                    </div>
                </div>
                <div className=' flex flex-col gap-2 md:h-[50vh] overflow-y-auto'>
                    <h1 className=' text-darkgreen text-lg font-semibold'>Projects of college</h1>
                    <div className=' flex flex-col gap-3'>
                        {
                            project?.map((item, index) => {
                                return <div className=' flex items-center bg-white rounded-lg p-4 gap-4'>
                                    <LuSchool size={35} className=' text-textgreen' />
                                    <section className=' w-[90%]'>
                                        <h1 className=' font-semibold'>{item.title}</h1>
                                        <h1 className=' text-gray-500 text-sm line-clamp-3'><span className=' font-semibold'>Description: </span>{item.description}</h1>
                                    </section>
                                </div>
                            })
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default OneCollege