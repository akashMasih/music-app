import React from 'react'

function InputField({ label, rows = 4, description = false, type = "text", icon, register, readOnly = false, error, ...rest }) {

    return (
        <div className="mb-1">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
                {label}
            </label>
            <div className="relative">
                {description ?

                    <textarea
                        rows={rows}
                        disabled={readOnly}
                        readOnly={readOnly}
                        type={type}
                        {...rest}
                        {...register}
                        className={`w-full !rounded-lg  border border-stroke bg-transparent !py-4 pl-6 pr-10 outline-none disabled:cursor-default disabled:bg-whiter focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input `}
                    />
                    :
                    <input
                        disabled={readOnly}
                        readOnly={readOnly}
                        type={type}
                        {...rest}
                        {...register}
                        className={`w-full !rounded-lg  border border-stroke bg-transparent !py-4 pl-6 pr-10 outline-none disabled:cursor-default disabled:bg-whiter focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input `}
                    />
                }
                <span className="absolute right-4 top-5 text-[#B2B9C5]">
                    {icon && icon}
                </span>
            </div>
            {error && <span className='text-danger text-sm mt-1.5'>{error?.message}</span>}
        </div>
    )
}

export default InputField