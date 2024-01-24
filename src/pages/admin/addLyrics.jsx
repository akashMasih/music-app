import React from 'react';
import {
    Button,
    Label,
    Select,
    TextInput,
} from 'flowbite-react';

const AddLyrics = () => {
    return (
        <>
            <div className="p-4 sm:ml-64 mt-14">
                <form>
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email1" value="Lyrics Title" />
                            </div>
                            <TextInput id="email1" type="text" placeholder="Enter" />
                        </div>
                        <div className="max-w-md">
                            <div className="mb-2 block">
                                <Label htmlFor="countries" value="Select your country" />
                            </div>
                            <Select id="countries" required>
                                <option>United States</option>
                                <option>Canada</option>
                                <option>France</option>
                                <option>Germany</option>
                            </Select>
                        </div>

                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>
            </div>
        </>
    )
}

export default AddLyrics;