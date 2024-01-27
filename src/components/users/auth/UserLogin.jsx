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
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setToken } from '@/redux/authSlice'
import { isEmpty } from '@/utility/Utils';
import { axios2 } from '@/services/axios';
import Link from 'next/link';
import { useRouter } from 'next/router';


const schema = yup
  .object({
    phoneNumber: yup.number("Must be a number").min(10, "Please enter valid 10 digit number").required(),
  }).required()


const LenderLogin = () => {
  const [isHideOTP, setIsHideOTP] = useState(true)
  const [errorOtp, setErrorOtp] = useState(false)
  const [mobileNumber, setMobileNumber] = useState("")
  const [OTP, setOTP] = useState("")
  const [isResend, setIsResend] = useState(true)
  const dispatch = useDispatch()
  const navigate = useRouter()
  const { user, token } = useSelector(st => st.auth)


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

    const response = axios2.post('/admin/admin-login', {
      "phone_number": data.phoneNumber,
      mode: "COMPARIFY"
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
    const response = axios2.post('/admin/verify', {
      "phone_number": String(mobileNumber),
      "otp": OTP,
      mode: "COMPARIFY"

    })

    toast.promise(response, {
      loading: 'Verifying OTP...',
      success: (data) => {
        const userData = data?.data?.data
        console.log(data)
        dispatch(setUser(userData?.user))
        dispatch(setToken(userData?.token))
        return "You are Successfully Login"
      },
      error: "Please Enter Valid OTP"
    })
  }


  const resendOTP = () => {
    setIsResend(true)
    submitMobileNumber()
  }



  return (
    <>
      <div className="rounded-sm border md:mt-20 mt-0 md:py-20 py-5 border-stroke bg-white   dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap md:h-full container w-full  justify-between items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-17.5 inline-block text-center">
              <h2 className="mb-6">Lenders Login</h2>
              <p className="mb-10">
                Loan Marketplace for Industry Professionals
              </p>
              <span className="mt-15 ">
                <img src="/images/loans/home/third.svg" alt="Logo" />
              </span>
            </div>
          </div>

          <div className="w-full border-stroke md:pl-20 pl-0 dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full mt-10 md:mt-0 p-0 md:p-17.5">
              {/* <span className="mb-1.5 block font-medium">Start for free</span> */}
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Login In to Comparify
              </h2>

              <form onSubmit={isHideOTP ? handleSubmit(submitMobileNumber) : submitOTP}>
                <InputField readOnly={!isHideOTP} register={register("phoneNumber")} error={errors.phoneNumber} label="Mobile Number" placeholder="Enter your phone number" icon={<MdOutlinePhoneEnabled size="24px" />} />
                {
                  !isHideOTP &&
                  <OTPInput label="Enter Six Digit Code" length={6} onInputChange={handleOTPChange} error={true} />
                }
                <div className="mb-5 mt-10">
                  <Button disabled={isHideOTP ? watch("phoneNumber") && watch("phoneNumber").length === 10 ? false : true : OTP.length === 6 ? false : true} type="submit">{isHideOTP ? 'Generate OTP' : 'Submit OTP'} </Button>
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
        </div >
      </div >
    </>
  );
};

export default LenderLogin;
