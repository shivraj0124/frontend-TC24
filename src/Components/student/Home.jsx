import React, { useEffect } from 'react'
import Navbar from '../Navbar'
import Sidebar from './Sidebar'
import themeHook from '../Context'
import { Outlet, useNavigate } from 'react-router-dom'
import Smsidebar from './Smsidebar'

function Home() {
    const { sidebarvalue, userDetails } = themeHook
    const navigate = useNavigate();
    useEffect(() => {
        const userDetailsFromLocalStorage = JSON.parse(localStorage.getItem('userDetails'));
        console.log(userDetailsFromLocalStorage);
        if (!userDetailsFromLocalStorage) {
            navigate("/login")
        }
    }, [userDetails])

    return (
        <div className='bg-[#f5f5f5] w-full max-h-screen'>
            <Navbar />
            <div className='min-[900px]:hidden'>
                <Smsidebar />
            </div>
            <div className=' grid grid-col-1 min-[900px]:grid-cols-[20%_auto]'>
                <div className=' bg-white hidden min-[900px]:block'>
                    <Sidebar />
                </div>
                <div >
                    <Outlet />
                </div>
                {/* <div className=' hidden min-[900px]:block'>
                    <Outlet />
                </div> */}
            </div>
        </div>
    )
}

export default Home