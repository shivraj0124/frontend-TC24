import React from 'react'
import { Select } from '@mantine/core';

function DropDown({ placeholder, data }) {
    return (
        <Select className=' min-[950px]:w-[20%] focus:outline-none'
            placeholder={placeholder}
            data={data}
        />
    );
}

export default DropDown;

