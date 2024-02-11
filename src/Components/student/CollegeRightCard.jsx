import React from 'react'

function CollegeRightCard() {
    return (
        <div className=' bg-white flex flex-col p-2 rounded-lg gap-1'>
            <h1 className=' font-semibold'>College name</h1>
            <h1 className=' line-clamp-3 text-sm '>This threshold consists of a peritext, consisting of elements such as titles, chapter titles, prefaces and notes. It also includes an epitext, which consists of elements such as interviews, publicity announcements, reviews by and addresses to critics, private letters and other authorial and editorial discussions – 'outside' of the text in question. The paratext is the sum of the peritext and epitext.</h1>
            <h1 className=' text-xs text-gray-500'><span className=' font-semibold'>address:</span> Mumbai</h1>
        </div>
    )
}

export default CollegeRightCard