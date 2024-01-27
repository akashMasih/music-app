import React from 'react'

function Button({ className, value, disabled, children, ...rest }) {
    return (
        <button
            disabled={disabled}
            {...rest}
            value={value}
            className={`w-full disabled:opacity-65 cursor-pointer rounded-lg border border-primary bg-primary p-3 text-white transition hover:bg-opacity-90 ${className}  `}
        >
            {children}
        </button>
    )
}

export default Button