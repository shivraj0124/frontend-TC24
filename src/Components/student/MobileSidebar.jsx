import React from 'react'
import { FaUserCircle } from "react-icons/fa";
import { BiHome } from "react-icons/bi";
import { IoSchoolOutline } from "react-icons/io5";
import { BiUserCircle } from "react-icons/bi";
import { BiBookmark } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import themeHook from '../Context';
import { Link } from 'react-router-dom'


function MobileSidebar({ data }) {
    const { sidebarvalue, setsidebarvalue } = themeHook();

    const handleItemClick = (e) => {
        const value = e.target.textContent.trim();
        setsidebarvalue(value);
        console.log("state", sidebarvalue);
    };

    return (
        <div className='  min-[900px]:hidden w-full h-20  border-2'>
            <ul className=' flex overflow-x-auto gap-3'>
                <Link to={"/home"} className={` ${sidebarvalue == "Home" ? " bg-[#f5f5f5] text-textgreen" : ""} hover:bg-[#f5f5f5] cursor-pointer grid grid-cols-[auto_1fr] gap-2 px2 py-2  font-semibold  rounded-lg`} onClick={handleItemClick}>
                    <div className=' flex  items-center'> <BiHome size={22} className='' /></div>
                    <div> Home</div>
                </Link>

                <Link to={"/college"} className={` ${sidebarvalue == "College" ? " bg-[#f5f5f5] text-textgreen" : ""} hover:bg-[#f5f5f5] cursor-pointer grid grid-cols-[auto_1fr] gap-2 px2 py-2  font-semibold  rounded-lg`} onClick={handleItemClick}>
                    <div className=' flex  items-center'> <IoSchoolOutline size={22} className='' /></div>
                    <div> College</div>
                </Link>

                <Link to={"/profile"} className={` ${sidebarvalue == "Profile" ? "  bg-[#f5f5f5] text-textgreen" : ""} hover:bg-[#f5f5f5] cursor-pointer grid grid-cols-[auto_1fr] gap-2 px2 py-2 font-semibold  rounded-lg`} onClick={handleItemClick}>
                    <div className=' flex  items-center'> <BiUserCircle size={22} className='  ' /></div>
                    <div> Profile</div>
                </Link>

                <Link className={` ${sidebarvalue == "Saved" ? "  bg-[#f5f5f5] text-textgreen" : ""} hover:bg-[#f5f5f5] cursor-pointer grid grid-cols-[auto_1fr] gap-2 px2 py-2 font-semibold  rounded-lg`} onClick={handleItemClick}>
                    <div className=' flex  items-center'> <BiBookmark size={22} className='  ' /></div>
                    <div> Saved</div>
                </Link>
                <Link className={` ${sidebarvalue == "Settings" ? "  bg-[#f5f5f5] text-textgreen" : ""} hover:bg-[#f5f5f5] cursor-pointer grid grid-cols-[auto_1fr] gap-2 px2 py-2  font-semibold  rounded-lg`} onClick={handleItemClick}>
                    <div className=' flex  items-center'> <IoSettingsOutline size={22} className='  ' /></div>
                    <div> Settings</div>
                </Link>
            </ul>

        </div>
    )
}

export default MobileSidebar