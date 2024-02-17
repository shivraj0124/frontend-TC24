import React from 'react'
import { useNavigate } from 'react-router-dom';

function CollegeCard({ data }) {
    const navigate = useNavigate();
    console.log(data);
    const Navigate = useNavigate();
    return (
        <div className=' flex flex-col rounded-lg bg-white' onClick={() => navigate(`/collage/${data._id}`)}>
            <img src={data.photo ? data.photo : "https://www.festivalsfromindia.com/wp-content/uploads/2022/04/VJTI-Mumbai.-Photo-VJTI-Mumbai-1_11zon.jpg"}
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