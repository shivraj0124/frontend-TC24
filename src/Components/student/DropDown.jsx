import React from 'react'
import { Select } from '@mantine/core';
import themeHook from '../Context';

function DropDown({ placeholder, data, type }) {
    const { setfiltertime, filtertime, setfilterbycollge, filterbycollge } = themeHook();

    const handleChange = (value) => {
        if (type == "time") {
            setfiltertime(value);
            console.log(filtertime);
        }

        if (type == "college") {
            setfilterbycollge(value);
            console.log(filterbycollge);
        }
    };

    return (
        <Select className=' focus:outline-none' onChange={handleChange}
            placeholder={placeholder}
            data={data}
        />
    );
}

export default DropDown;

