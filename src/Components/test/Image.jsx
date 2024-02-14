import React, { useState } from 'react';
import axios from 'axios';

function Image() {
    const [Url, setUrl] = useState("")
    const [img, setimg] = useState([]);

    const setbase = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setimg(reader.result);
        }
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setbase(file);
        console.log(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const timestamp = new Date();
        const res = await axios.post("http://localhost:8000/Image", { image: img, timestamp: timestamp });
        console.log(res.data.result.secure_url);
    };

    return (
        <div>
            <input type="file" onChange={handleImageUpload} />
            <button type="submit">Upload Image</button>
            {Url ? <h1>{Url}</h1> : ""}
            <button onClick={handleSubmit}>submit</button>
            <img src={img} alt='image' />
        </div>
    );
}

export default Image;
