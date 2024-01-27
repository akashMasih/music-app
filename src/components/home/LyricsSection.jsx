import React, { useEffect } from 'react'
import LyricsCard from '../common/LyricsCard'
import { isEmptyArray } from '@/utility/Utils'

export default function LyricsSection({ data }) {

    return (
        <section className='bg-white py-20'>
            <div className="container">
                <h2 className='text-left md:text-center text-title-xxl font-bold text-gray-800 mb-10'>All Lyrics</h2>
                <div className="gap-5  grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 ">
                    {
                        !isEmptyArray(data) && data.map(item => (
                            <LyricsCard key={item?.slug} {...item} />

                        ))
                    }
                </div>
            </div>

        </section>
    )
}
