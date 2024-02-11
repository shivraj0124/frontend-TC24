import React, { useEffect, useState } from 'react'
import signUpImage from "./cardImage.jpg";
import axios from 'axios';

function RightCard({ data }) {
    //console.log(data);
    const [college_name, setcollege_name] = useState("")
    const getcollege = async () => {
        const col = await axios.post("http://localhost:8000/api/college/onecollge", { college: data.allocated_college });
        //console.log(col.data.data);
        setcollege_name(col.data.data);
    }

    useEffect(() => {
        getcollege()
    }, [])

    return (
        <div className=' flex flex-col justify-center gap-1 items-center bg-[#ffffff] p-4 rounded-lg'>
            <img src={signUpImage} className=' object-cover w-[100%] h-32 rounded-lg' />
            <h1 className=' font-semibold'>{data.title}</h1>
            <p className=' text-gray-500 text-xs text-center'>
                <span className=' font-semibold'>Published By : </span>{college_name.name}</p>
            <div className=' bg-[#57CC99] rounded-full bg-opacity-25 px-3 py-[5px] text-green-600 text-xs  font-semibold'>Go to Project </div>
        </div>
    )
}

export default RightCard