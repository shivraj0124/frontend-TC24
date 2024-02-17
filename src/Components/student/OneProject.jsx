import axios from 'axios';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

function OneProject() {
    const { id } = useParams();
    console.log(id);

    const getprojectdata = async () => {
        const res = await axios.post("http://localhost:8000/api/project/getoneproject", { project_id: id });
        console.log(res);
    }
    useEffect(() => {
        getprojectdata();
    }, [])


    return (
        <div className=' h-[90vh]'>
            <div className='p-4 bg-white  m-3 rounded-md'>
                <h1>Text messaging, or texting, is the act of composing and sending electronic messages</h1>
                <section className=' flex'>
                    <h1>Software</h1>
                    <h1>time</h1>
                </section>
                <img src='' />
                <h1>Description</h1>
                <h1>Text messages are used for personal, family, business, and social purposes. Governmental and non-governmental organizations use text messaging for communication between colleagues. In the 2010s, the sending of short informal messages became an accepted part of many cultures, as happened earlier with emailing.[1] This makes texting a quick and easy way to communicate with friends, family, and colleagues, including in contexts where a call would be impolite or inappropriate (e.g., calling very late at night or when one knows the other person is busy with family or work activities). Like e-mail and voicemail, and unlike calls (in which the caller hopes to speak directly with the recipient), texting does not require the caller and recipient to both be free at the same moment; this permits communication even between busy individuals. Text messages can also be used to interact with automated systems, for example, to order products or services from e-commerce websites or to participate in online contests. Advertisers and service providers use direct text marketing to send messages to mobile users about promotions, payment due dates, and other notifications instead of using postal mail, email, or voicemail.</h1>

            </div>
        </div>
    )
}

export default OneProject