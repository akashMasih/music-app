import Button from '../form/Button';
import InputField from '../form/InputField';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { publicAxios } from '../../services/axios';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { isEmpty } from '@/utility/Utils';
import dynamic from 'next/dynamic';
import "react-quill/dist/quill.snow.css";
import TagInput from '../form/TagInput';
import CheckboxGroup from '../form/CheckboxGroup';
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});


const schema = yup
    .object({
        title: yup.string().required(),
        slug: yup.string().required(),
        worshiper_name: yup.string().required(),
    }).required()

const LyricsForm = ({ isEdit = false, detail = {} }) => {
    const [notes, setNotes] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState(["Hindi", "English"]);
    const [tags, setTags] = useState([]);

    // const navigate = useNavigate()
    const {
        register,
        watch,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema)
    })


    const submitDetail = async (data) => {

        if (isEmpty(notes)) {
            toast.error("Lyrics is mandatory")
            return 0
        }


        const body = {
            "title": data?.title,
            "artists": [
                { "artType": "Worshiper", "name": data?.worshiper_name },
                { "artType": "Music Director", "name": data?.Music_director },

            ],
            "metaDescription": data?.metaDescription,
            "lyrics": notes,
            "slug": createSlug(data?.slug),
            "postedBy": { "userId": "657f21798636b50ce2397d0f", "name": "Akash Masih", "role": 1, "role_name": "Admin" },
            languages: selectedLanguage,
            tags: tags
        }
        // let response = publicAxios.post('/lyrics/post', body)

        // toast.promise(response, {
        //     loading: 'Processing...',
        //     success: (res) => {
        //         // reset()
        //         return res.data?.message
        //     },
        //     error: err => err?.response?.data?.message
        // })
    }




    // useEffect(() => {
    //     if (!isEmpty(detail)) {
    //         setValue("name", detail?.name)
    //         setValue("email", detail?.email)
    //         setValue("phone_number", detail?.phone_number)
    //         setValue("company_address", detail?.company_address?.address)
    //         setValue("company_state", detail?.company_address?.state)
    //         setValue("company_city", detail?.company_address?.city)
    //         setValue("user_address", detail?.permanent_address?.address)
    //         setValue("user_state", detail?.permanent_address?.state)
    //         setValue("user_city", detail?.permanent_address?.city)
    //         setValue("company_name", detail.company_name)
    //         setValue("company_pin_code", detail?.company_address?.pin_code)
    //         setValue("user_pin_code", detail?.permanent_address?.pin_code)
    //     }
    // }, [detail])

    function createSlug(title) {
        if (isEmpty(title)) return title
        return title
            .toLowerCase() // Convert to lowercase
            .replace(/[^\w\s-]/g, '') // Remove non-word characters (excluding spaces and hyphens)
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/--+/g, '-') // Replace multiple hyphens with a single hyphen
            .trim(); // Trim leading and trailing spaces (if any)
    }

    const languages = ["", "", "Punjabi"]
    const options = [
        { label: 'Hindi', value: 'Hindi' },
        { label: 'English', value: 'English' },
        { label: 'Punjabi', value: 'Punjabi' },
    ];



    const handleCheckboxChange = (values) => {
        setSelectedLanguage(values);
    };


    return (

        <div >
            <div className="grid grid-cols-1 gap-9 md:grid-cols-2">

                <div className="flex flex-col gap-9">
                    {/* <!-- Input Fields --> */}
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Song Detail
                            </h3>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5">
                            <div>
                                <InputField register={register("title")} error={errors.title} label="Song Name" placeholder="Enter Song Name" />
                                <span className='text-xs text-bodydark'>This Title will Help in Google Rank eg= Deepak Hai Meri Rahon Ka Tera Vachan ( दीपक है मेरी राहों का तेरा वचन ) Lyrics in Hindi And in English</span>
                            </div>
                            <div>
                                <InputField register={register("slug")} error={errors.slug} label="Enter a Song Slug" />
                                <span className='text-sm -mt-1 '>Slug Should be unique <span className='text-primary'>https://www.biblenotes.in/{createSlug(watch('slug'))}</span></span>
                            </div>

                            <InputField register={register("worshiper_name")} error={errors.worshiper_name} label="Worshiper Name" placeholder="Enter Worshiper Name" />
                            <InputField register={register("Music_director")} error={errors.Music_director} label="Music Director" placeholder="Enter Music Director Name" />
                            <div>
                                <InputField description register={register("metaDescription")} error={errors.metaDescription} label="Song Meta Description" placeholder="Enter Song Meta Description" />
                                <span className='text-xs text-primary'>Meta Description for better Ranking, If you leave this empty then Title will be consider</span>
                            </div>
                            <div>
                                <TagInput
                                    enteredTags={tags}
                                    onChange={setTags}
                                    label="Enter Tags"
                                />
                                <span className='text-xs text-primary'>After Entering A Keyword hit Enter key</span>
                            </div>

                            <CheckboxGroup
                                label="Languages"
                                options={options}
                                selectedValues={selectedLanguage}
                                onChange={handleCheckboxChange}
                            />
                            <Button onClick={handleSubmit(submitDetail)} type="submit">Add Lyrics</Button>
                        </div>
                    </div>

                </div>
                <div className="flex flex-col gap-9">
                    {/* <!-- Input Fields --> */}
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Lyrics Text Editor
                            </h3>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5">
                            <QuillNoSSRWrapper
                                theme="snow"
                                value={notes}
                                onChange={(data) => setNotes(data)}
                                className='h-[56rem] mb-10 text-lg'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LyricsForm;
