import React from 'react'

function CollegeCard({ data }) {
    console.log(data);
    return (
        <div className=' flex flex-col rounded-lg bg-white'>
            <img src={"https://www.festivalsfromindia.com/wp-content/uploads/2022/04/VJTI-Mumbai.-Photo-VJTI-Mumbai-1_11zon.jpg"}
                className='w-full h-40 object-cover'
            />
            <div className=' p-4'>
                <h1 className=' font-semibold text-darkgreen'>{data.name}</h1>
                <h1 className=' line-clamp-3 '>{data.about}</h1>
                <h1 className=' text-sm text-gray-500'><span className=' font-semibold'>address:</span> {data.address}</h1>
            </div>
        </div>
    )
}

export default CollegeCard