import { MdOutlinePhoneEnabled } from "react-icons/md";
import OTPInput from '@/components/form/OTPInput';
import InputField from '@/components/form/InputField';
import { useEffect, useState } from 'react';
import Button from '@/components/form/Button';
import toast from 'react-hot-toast';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import CountDownTimer from './CountdownTimer';
import { isEmpty } from '@/utility/Utils';
import { axios2, publicAxios } from '@/services/axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useAuth from "@/hooks/useAuth";


const schema = yup
  .object({
    phoneNumber: yup.number("Must be a number").min(10, "Please enter valid 10 digit number").required(),
  }).required()


const UserLogin = () => {
  const [isHideOTP, setIsHideOTP] = useState(true)
  const [errorOtp, setErrorOtp] = useState(false)
  const [mobileNumber, setMobileNumber] = useState("")
  const [OTP, setOTP] = useState("")
  const [isResend, setIsResend] = useState(true)
  const router = useRouter()
  const { user, token, saveUser } = useAuth()


  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema)
  })
  const onSubmit = (data) => console.log(data)
  const handleOTPChange = (otp) => {
    setOTP(otp);
  }


  const submitMobileNumber = async (data) => {
    setMobileNumber(data.phoneNumber)

    const response = publicAxios.post('/login', {
      "mobileNumber": data.phoneNumber,
      "fullName": "Akash Masih"
    })

    toast.promise(response, {
      loading: 'Sending OTP....',
      success: (data) => {
        setIsHideOTP(false)
        return "OTP Sent Successfully"
      },
      error: "User Not Found"
    })
  }


  const submitOTP = (e) => {
    e.preventDefault()
    const response = publicAxios.post('/verify-otp', {
      "mobileNumber": mobileNumber,
      "OTP": OTP
    })

    toast.promise(response, {
      loading: 'Verifying OTP...',
      success: (res) => {
        saveUser(res?.data?.data)
        return "You are Successfully Login"
      },
      error: "Please Enter Valid OTP"
    })
  }


  const resendOTP = () => {
    setIsResend(true)
    submitMobileNumber({ phoneNumber: mobileNumber })
  }



  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
          Flowbite
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form onSubmit={isHideOTP ? handleSubmit(submitMobileNumber) : submitOTP}>
              <InputField readOnly={!isHideOTP} register={register("phoneNumber")} error={errors.phoneNumber} label="Mobile Number" placeholder="Enter your phone number" icon={<MdOutlinePhoneEnabled size="24px" />} />
              {
                !isHideOTP &&
                <OTPInput label="Enter 4 Digit Code" length={4} onInputChange={handleOTPChange} error={true} />
              }
              <div className="mb-5 mt-10">
                <Button disabled={isHideOTP ? watch("phoneNumber") && watch("phoneNumber").length === 10 ? false : true : OTP.length === 4 ? false : true} type="submit">{isHideOTP ? 'Generate OTP' : 'Submit OTP'} </Button>
              </div>
              {
                !isHideOTP &&

                < div className="mt-6 text-center">
                  {
                    isResend ?
                      <p onClick={resendOTP}>
                        Resend OTP in {" "}
                        <span className='text-primary'>
                          <CountDownTimer
                            callback={() => {
                              setIsResend(false);
                            }}
                          />
                        </span>
                      </p>
                      :
                      <p className='text-primary underline cursor-pointer' onClick={resendOTP}>
                        Resend OTP
                      </p>
                  }
                </div>
              }
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserLogin


