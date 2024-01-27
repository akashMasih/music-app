import Link from "next/link"
import LyricsCard from "../common/LyricsCard"
import { isEmptyArray } from "@/utility/Utils"


const HeroSection = ({ data }) => {

    return (
        <>
            <div className="grid md:grid-cols-12 gap-8  ">
                <div className="md:pl-36 pl-5 md:pt-28 pt-5 md:pr-10 pr-5 md:col-span-7 col-span-12">
                    <h1 className="text-title-2xxl font-extrabold text-black  mb-10">Read <br /> Worship <br />and Joy</h1>
                    <p className="text-xl font-medium mb-12">With Bible Notes You can get Lyrics of any Worship Song.</p>
                    <Link href="/" className="bg-red-400 text-white px-8 py-4 rounded-md text-lg">Explore</Link>
                </div>
                <div className="bg-sky-300 pb-20 pt-28  h-full md:col-span-5  col-span-12">

                    <h2 className='text-title-xxl text-center font-extrabold text-black  mb-4'>
                        Top 5 Songs In India
                    </h2>
                    <div className='flex flex-col gap-5 md:mx-10 mx-5 '>
                        {
                            !isEmptyArray(data) && data.slice(0, 4).map(item => (
                                <LyricsCard key={item?.slug} {...item} />
                            ))
                        }
                    </div>
                </div>
            </div>


        </>
    )
}


export default HeroSection