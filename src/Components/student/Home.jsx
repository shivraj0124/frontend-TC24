import React from 'react'
import Navbar from '../Navbar'
import Sidebar from './Sidebar'
import themeHook from '../Context'
import MainContent from './MainContent'
import RightSideContent from './RightSideContent'


function Home() {
    const { sidebarvalue } = themeHook
    return (
        <div className='bg-[#f5f5f5] w-full max-h-screen'>
            <Navbar />
            <div className=' grid grid-col-1 min-[900px]:grid-cols-[15%_auto_20%]'>
                <div className=' bg-white hidden min-[900px]:block'>
                    <Sidebar />
                </div>
                <div >
                    <MainContent />
                </div>
                <div className=' hidden min-[900px]:block'>
                    <RightSideContent />
                </div>
            </div>
        </div>
    )
}

export default Home