// components/OTPInput.js
import { useState, useRef, useEffect } from 'react';


const OTPInput = ({ length, onInputChange, error, label }) => {
    const [otp, setOtp] = useState(Array(length).fill(''));
    const [activeIndex, setActiveIndex] = useState(0);
    const inputRefs = useRef([]);

    const handleChange = (e, index) => {
        const value = e.target.value;

        if (/^\d+$/.test(value) || value === '') {
            const updatedOtp = [...otp];
            updatedOtp[index] = value;
            setOtp(updatedOtp);
            onInputChange(updatedOtp.join(''));

            // Move to the next input field
            if (index < length - 1 && value !== '') {
                inputRefs.current[index + 1].focus();
                setActiveIndex(index + 1);
            }
        }
    };

    const handleKeyDown = (e, index) => {
        // Move to the previous input field on backspace
        if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
            inputRefs.current[index - 1].focus();
            setActiveIndex(index - 1);
        }
    };

    useEffect(() => {
        inputRefs.current[0].focus()
    }, [])

    return (
        <div className="mb-6">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
                {label}
            </label>
            <div className="relative flex ">
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        ref={(ref) => (inputRefs.current[index] = ref)}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className={`!w-18 !h-12 !mx-2 !rounded-none !bg-transparent  !border-b-2 !border-x-0 !border-t-0 !shadow-none  !text-center focus:outline-none  ${activeIndex === index ? 'border-primary' : 'border-stroke'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default OTPInput;
