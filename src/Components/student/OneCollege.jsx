import axios from 'axios';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import bannerimg from './CollegeBanner.jpg'
import { LuSchool } from "react-icons/lu";

function OneCollege() {
    const { id } = useParams();
    console.log(id);

    const getdata = async () => {
        const res = await axios.post("http://localhost:8000/api/college/onecollge", { college: id });
        console.log(res);
    }

    useEffect(() => {
        getdata();
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
                    <h1 className=' font-semibold text-xl'>college name</h1>
                    <h1 className=' text-gray-500 text-sm'>Within the field of literary criticism, "text" also refers to the original information content of a particular piece of writing; that is, the "text" of a work is that primal symbolic arrangement of letters as originally composed, apart from later alterations, deterioration, commentary, translations, paratext, etc. Therefore, when literary criticism is concerned with the determination of a "text", it is concerned with the distinguishing of the original information content from whatever has been added to or subtracted from that content as it appears in a given textual document</h1>
                    <h1 className=' text-gray-500'><span className=' font-semibold'>Address:</span> Mumbai</h1>
                </div>
            </div>
            <div className=' grid grid-cols-2 gap-4'>
                <div className=' flex flex-col gap-2 h-[50vh] overflow-y-auto'>
                    <h1 className=' text-darkgreen text-lg font-semibold'>Department</h1>
                    <div className=' flex flex-col gap-3'>
                        <div className=' flex items-center bg-white rounded-lg p-4 gap-4'>
                            <LuSchool size={35} className=' text-textgreen' />
                            <section>
                                <h1 className=' font-semibold'>Information technology</h1>
                                <h1 className=' text-gray-500 text-sm'><span className=' font-semibold'>HOD: </span>Yash Mulik</h1>
                            </section>
                        </div>

                        <div className=' flex items-center bg-white rounded-lg p-4 gap-4'>
                            <LuSchool size={35} className=' text-textgreen' />
                            <section>
                                <h1 className=' font-semibold'>Information technology</h1>
                                <h1 className=' text-gray-500 text-sm'><span className=' font-semibold'>HOD: </span>Yash Mulik</h1>
                            </section>
                        </div>
                    </div>
                </div>
                <div className=' flex flex-col gap-2 h-[50vh] overflow-y-auto'>
                    <h1 className=' text-darkgreen text-lg font-semibold'>Projects of college</h1>
                    <div className=' flex flex-col gap-3'>
                        <div className=' flex items-center bg-white rounded-lg p-4 gap-4'>
                            <LuSchool size={35} className=' text-textgreen' />
                            <section>
                                <h1 className=' font-semibold'>project name</h1>
                                <h1 className=' text-gray-500 text-sm'><span className=' font-semibold'>Department: </span>Information technology</h1>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OneCollege