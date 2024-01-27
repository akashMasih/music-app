import Link from 'next/link';
import React, { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";

const DropdownInline = ({ list = [], label }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggleDropdown = (e) => {
        setIsOpen(!isOpen);
    };

    const handleCloseDropdown = () => {
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block" onMouseEnter={handleToggleDropdown} onMouseLeave={handleToggleDropdown}>
            <button
                className=" hover:text-primary flex items-center   py-2 rounded-full"

            >
                {label}
                <IoIosArrowDown size="19px" className='ml-1.5' />
            </button>

            {isOpen && (
                <div className="absolute -right-14 py-2 min-w-60 bg-white  shadow-md rounded-md">
                    {/* Dropdown content */}
                    <ul onClick={() => setTimeout(handleToggleDropdown, 500)}>
                        {
                            list && list.map(item => (
                                <Link key={item.text} href={item.textLink} ><li className="px-4 hover:text-primary  py-2">{item.text}</li></Link>
                            ))
                        }
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DropdownInline;
