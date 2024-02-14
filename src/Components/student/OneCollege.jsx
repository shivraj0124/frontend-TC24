import React from 'react'
import banner from './College_banner.jpg'

function OneCollege() {
    return (
        <div className=' h-[90vh] p-5'>
            <div className=' relative bg-white rounded-lg pb-3'>
                <img src={banner} alt='image' className=' w-full h-36' />
                <section>
                    <img src='https://www.festivalsfromindia.com/wp-content/uploads/2022/04/VJTI-Mumbai.-Photo-VJTI-Mumbai-1_11zon.jpg'
                        alt='logo' className=' w-28 h-28 absolute top-16 left-5 rounded-lg' />
                </section>
                <section className=' mt-9 ml-1 px-4 '>
                    <h1 className=' text-bold text-md'>college name</h1>
                    <h1 className=' text-sm'> information content of a particular piece of writing; that is, the "text" of a work is that primal symbolic arrangement of letters as originally composed, apart from later alterations, deterioration, commentary, translations, paratext, etc. Therefore, when literary criticism is concerned with the determination of a "text", it is concerned with the distinguishing of the original information content from whatever has been added to or subtracted from that content as it appears in a given textual document</h1>
                    <h1 className=' text-sm text-gray-500'>Address: <span className='font-semibold'>Mumbai</span></h1>
                </section>
            </div>
        </div>
    )
}

export default OneCollege