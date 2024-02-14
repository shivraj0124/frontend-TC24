import React from 'react'
import Navbar from '../Navbar'
import themeHook from '../Context'
import { Outlet } from 'react-router-dom'
import HodSidebar from './HodSidebar'

function HodHome() {
    const { sidebarvalue } = themeHook
    return (
        <div className='bg-[#f5f5f5] w-full max-h-screen'>
            <Navbar />
            <div className=' grid grid-col-1 min-[900px]:grid-cols-[15%_auto]'>
                <div className=' bg-white hidden min-[900px]:block'>
                    <HodSidebar />
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

export default HodHome