import React from 'react'
import { GoChevronDown } from "react-icons/go";
import { isEmptyArray } from '../../utils';

function Select({ label, list, keyName, register, keyValue, placeholder }) {
    return (
        <div className="mb-3">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
                {label}
            </label>
            <div className="relative z-20 bg-white dark:bg-form-input ">
                <select {...register} className="relative z-20 w-full appearance-none rounded-lg border border-stroke bg-transparent py-4 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
                    <option value="">{placeholder}</option>
                    {
                        !isEmptyArray(list) && list.map((item, index) => (
                            <option key={index} value={keyValue ? item[keyValue] : item} >{keyName ? item[keyName] : item}</option>
                        ))
                    }
                </select>
                <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                    <GoChevronDown size="24px" />
                </span>
            </div>
        </div>
    )
}

export default Select