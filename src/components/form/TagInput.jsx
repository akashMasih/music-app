import React, { useState } from 'react';

const TagInput = ({ enteredTags, onChange, label }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value.replace(/[^a-zA-Z0-9\s]/g, ''))
    };

    const handleInputKeyDown = (e) => {
        const val = inputValue
        // e.stopPropagation()
        // const { value } = e.target
        if ((e.key === ',' || e.key === "Enter") && val.trim() !== '') {
            // Add tag to the array
            const data = [...enteredTags]
            onChange([...data, val.trim()]);
            // Clear the input field
            setInputValue('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        const updatedTags = enteredTags.filter((tag) => tag !== tagToRemove);
        onChange(updatedTags);
    };

    return (
        <div className="relative">
            <label className="mb-1 block font-medium text-black dark:text-white">
                {label}
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
                {enteredTags.map((tag, index) => (
                    <div key={index} className="bg-primary text-white px-2 py-1 rounded">
                        {tag}
                        <button
                            className="ml-2 text-red-500"
                            onClick={() => handleRemoveTag(tag)}
                        >
                            x
                        </button>
                    </div>
                ))}
            </div>
            <input
                type="text"
                className={`w-full !rounded-lg  border border-stroke bg-transparent !py-4 pl-6 pr-10 outline-none disabled:cursor-default disabled:bg-whiter focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input `}
                placeholder="Enter tags and press Enter"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
            />
        </div>
    );
};

export default TagInput;
