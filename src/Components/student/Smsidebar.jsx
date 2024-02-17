import React from 'react'
import { FaUserCircle } from "react-icons/fa";
import { BiHome } from "react-icons/bi";
import { IoSchoolOutline } from "react-icons/io5";
import { BiUserCircle } from "react-icons/bi";
import { BiBookmark } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import themeHook from '../Context';
import { Link } from 'react-router-dom'
import { GoProjectSymlink } from "react-icons/go";


function Smsidebar({ data }) {
    const { sidebarvalue, setsidebarvalue } = themeHook();

    const handleItemClick = (e) => {
        const value = e.target.textContent.trim();
        setsidebarvalue(value);
        console.log("state", sidebarvalue);
    };

    return (
        <div className=' flex flex-row  w-full overflow-x-auto  justify-between'>
            <ul className='flex flex-row w-full '>
                <Link to={"/home"} className={` ${sidebarvalue == "Home" ? " bg-[#f5f5f5] text-textgreen" : ""} hover:bg-[#f5f5f5] cursor-pointer grid grid-cols-[auto_1fr] gap-4 px-4 py-2  font-semibold  rounded-lg`} onClick={handleItemClick}>
                    <div className='flex items-start '> <BiHome size={22} className='' /></div>
                    <div> Home</div>
                </Link>

                <Link to={"/college"} className={` ${sidebarvalue == "College" ? " bg-[#f5f5f5] text-textgreen" : ""} hover:bg-[#f5f5f5] cursor-pointer grid grid-cols-[auto_1fr] gap-4 px-4 py-2  font-semibold  rounded-lg`} onClick={handleItemClick}>
                    <div className=' flex  items-start'> <IoSchoolOutline size={22} className='' /></div>
                    <div> College</div>
                </Link>
                <Link to={"/StudentProjects"} className={` ${sidebarvalue == "Students Projects" ? " bg-[#f5f5f5] text-textgreen" : ""} hover:bg-[#f5f5f5] cursor-pointer grid grid-cols-[auto_1fr] gap-4 px-4 py-2  font-semibold  rounded-lg`} onClick={handleItemClick}>
                    <div className=' flex  items-start'> <GoProjectSymlink size={22} className='' /></div>
                    <div className=''>Add</div>
                </Link>

                <Link to={"/profile"} className={` ${sidebarvalue == "Profile" ? "  bg-[#f5f5f5] text-textgreen" : ""} hover:bg-[#f5f5f5] cursor-pointer grid grid-cols-[auto_1fr] gap-4 px-4 py-2  font-semibold  rounded-lg`} onClick={handleItemClick}>
                    <div className=' flex  items-start'> <BiUserCircle size={22} className='  ' /></div>
                    <div> Profile</div>
                </Link>

                <Link className={` ${sidebarvalue == "Saved" ? "  bg-[#f5f5f5] text-textgreen" : ""} hover:bg-[#f5f5f5] cursor-pointer grid grid-cols-[auto_1fr] gap-4 px-4 py-2  font-semibold  rounded-lg`} onClick={handleItemClick}>
                    <div className=' flex  items-start'> <BiBookmark size={22} className='  ' /></div>
                    <div> Saved</div>
                </Link>
                <Link className={` ${sidebarvalue == "Settings" ? "  bg-[#f5f5f5] text-textgreen" : ""} hover:bg-[#f5f5f5] cursor-pointer grid grid-cols-[auto_1fr] gap-4 px-4 py-2  font-semibold  rounded-lg`} onClick={handleItemClick}>
                    <div className=' flex  items-start'> <IoSettingsOutline size={22} className='  ' /></div>
                    <div> Settings</div>
                </Link>
            </ul>
            {/* <div className=' flex flex-col gap-1 bg-bgwhite rounded-lg p-3 mb-10'>
                <section className=' flex gap-2 justify-center items-center'>
                    <FaUserCircle className=' text-darkgreen' size={40} ></FaUserCircle>
                    <section >
                        <p className=' font-semibold text-lg'>Yash Mulik</p>
                    </section>
                </section>
                <p className=' text-center text-xs text-gray-500'><span className=' font-semibold'>College: </span>Sardar Patel Institute of Technology, Mumbai</p>
                <button className=' bg-buttongreen bg-opacity-30 w-full text-green-600 px-4 py-[5px] font-semibold rounded-full'>
                    logout
                </button>
            </div> */}
          
        </div>
    )
}

export default Smsidebar