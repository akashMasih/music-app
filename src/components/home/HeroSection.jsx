import React from 'react';
import ReactDOM from 'react-dom';
import {
    Button,
    Label,
    Select,
    TextInput,
} from 'flowbite-react';


const HeroSection = () => {

    return (
        <>
            <div className="grid grid-cols-12 gap-8">
                <div className="pl-36 pt-28 pr-10 col-span-7">
                    <h1 className="text-[80px] text-black font-semibold mb-10">Listen <br /><br /> Enjoy <br /><br /> Download</h1>
                    <p className="text-xl font-medium mb-12">With Musica you can play music with lyrics, anywhere or anytime.</p>
                    <a href className="bg-red-400 text-white px-8 py-4 rounded-md text-lg">Explore</a>
                </div>
                <div className="bg-sky-300 h-screen col-span-5">
                </div>
            </div>


        </>
    )
}


export default HeroSection