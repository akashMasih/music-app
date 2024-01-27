import React from 'react'

const Footer = () => {
    return (
        <footer className="p-4 relative bottom-0 w-full  bg-white">
            <div className=" text-center">
                <span className="text-sm text-gray-500 ">© {new Date().getFullYear()} <a href="https://biblenotes.in" className="hover:underline">Bible Notes</a>. All Rights Reserved.
                </span>
            </div>
        </footer>

    )
}

export default Footer