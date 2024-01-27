import React from 'react'
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa6";


function LyricsCard() {
    return (
        <div className='bg-white shadow-lg p-5 flex space-x-5 items-center rounded '>
            <div className='h-20 w-20 bg-gray-50 rounded-full flex justify-center items-center'>
                <img src="/single-logo.png" alt="bible notes" className='w-10' />
            </div>
            <div>
                <p className='text-xl text-gray-800 mb-1'>Deepak Hai Meri Rahon Ka Tera Vachan</p>
                <p>Worshiper by <span className="text-gray-700">Sonia Gill</span></p>
                <div className='flex space-x-6 items-center'>
                    <div className='flex space-x-1 items-center'>
                        <MdOutlineRemoveRedEye size="18px" /> <span>100k</span>
                    </div>
                    <div className='flex space-x-1 items-center'>
                        <FaRegHeart /><span>10k</span>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default LyricsCard