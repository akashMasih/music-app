import React from 'react';
import ReactDOM from 'react-dom';
import {
    Button,
    Label,
    Select,
    TextInput,
} from 'flowbite-react';
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';

const HeroSection = () => {
    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
    );
    return (
        <>
            {/* <div class="grid grid-cols-12 gap-8">
                <div class="pl-36 pt-28 pr-10 col-span-7">
                    <h1 class="text-[80px] text-black font-semibold mb-10">Listen <br></br> Enjoy <br></br> Download</h1>
                    <p class="text-xl font-medium mb-12">With Musica you can play music with lyrics, anywhere or anytime.</p>
                    <a href="" class="bg-red-400 text-white px-8 py-4 rounded-md text-lg">Explore</a>
                </div>
                <div class="bg-sky-300 h-screen col-span-5">

                </div>
            </div> */}

            <div className="p-4 sm:ml-64 mt-14">
                <form>
                    <div className="grid gap-6 mb-6 grid-cols-12">
                        <div className='col-span-4'>
                            <div className="mb-2 block">
                                <Label htmlFor="email1" value="Lyrics Title" />
                            </div>
                            <TextInput id="email1" type="text" placeholder="Enter" />
                        </div>
                        <div className="col-span-4">
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
                        <div className='col-span-12'>
                            {/* <Editor editorState={editorState} onChange={setEditorState} /> */}
                        </div>
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>
            </div>
        </>
    )
}

// ReactDOM.render(<HeroSection />, document.getElementById('container'));


export default HeroSection