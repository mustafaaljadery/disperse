import { PageHead } from '../layouts/PageHead';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { apiUrl } from '../utils/apiUrl';
import Link from 'next/link';

async function handleSubmit(email: string) {
  try {
    toast.loading('Sending Link...', {
      className: 'text-sm silka-medium text-gray-900',
      duration: 80000,
    });
    const result = await axios.post(
      `${apiUrl()}other/forgotpassword`,
      null,
      {
        params: {
          email: email,
        },
      }
    );
    if (result.data.message == 'email not found') {
      toast.remove();
      toast.error('Email Not Found.', {
        className: 'text-sm silka-medium text-gray-900',
      });
    } else {
      toast.remove();
      toast.success('Reset link sent to email!', {
        className: 'text-sm silka-medium text-gray-900',
      });
    }
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <PageHead
      title="Reset Password · Disperse"
      description="Reset the password to your Disperse account."
    >
      <div className="flex flex-col justify-center items-center">
        <div className="mt-10 w-[95%] md:w-4/5 lg:w-1/2 xl:w-[30%] flex flex-col justify-center items-center px-4">
          <div className="flex flex-row space-x-3.5 w-full justify-center items-center">
            <svg
              width="30"
              height="30"
              viewBox="0 0 400 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="my-auto"
            >
              <g clipPath="url(#clip0_499_2)">
                <g filter="url(#filter0_d_499_2)">
                  <rect
                    y="200"
                    width="200"
                    height="200"
                    fill="#FF623D"
                  />
                </g>
                <g filter="url(#filter1_d_499_2)">
                  <rect
                    x="100"
                    y="100"
                    width="200"
                    height="200"
                    fill="#FF623D"
                  />
                </g>
                <g filter="url(#filter2_d_499_2)">
                  <rect
                    x="200"
                    width="200"
                    height="200"
                    fill="#FF623D"
                  />
                </g>
              </g>
              <defs>
                <filter
                  id="filter0_d_499_2"
                  x="-14"
                  y="200"
                  width="228"
                  height="228"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood
                    floodOpacity="0"
                    result="BackgroundImageFix"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="14" />
                  <feGaussianBlur stdDeviation="7" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_499_2"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_499_2"
                    result="shape"
                  />
                </filter>
                <filter
                  id="filter1_d_499_2"
                  x="86"
                  y="100"
                  width="228"
                  height="228"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood
                    floodOpacity="0"
                    result="BackgroundImageFix"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="14" />
                  <feGaussianBlur stdDeviation="7" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_499_2"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_499_2"
                    result="shape"
                  />
                </filter>
                <filter
                  id="filter2_d_499_2"
                  x="186"
                  y="0"
                  width="228"
                  height="228"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood
                    floodOpacity="0"
                    result="BackgroundImageFix"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="14" />
                  <feGaussianBlur stdDeviation="7" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_499_2"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_499_2"
                    result="shape"
                  />
                </filter>
                <clipPath id="clip0_499_2">
                  <rect width="400" height="400" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <span className="text-[28px] my-auto silka-bold text-[#363636]">
              Disperse
            </span>
          </div>
          <h1 className="text-[#363636] text-2xl md:text-3xl w-full silka-semibold mt-14">
            Reset Password
          </h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
              handleSubmit(email).then(() => {
                setSubmitted(false);
              });
            }}
            className="flex flex-col w-full mt-6"
          >
            <label className="text-sm silka-semibold text-gray-600">
              Email
            </label>
            <input
              className="mt-3 text-sm silka-regular w-full py-2.5 rounded border border-gray-300 focus:ring-[#FF623D] focus:border-[#FF623D]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="my@email.com"
              type="email"
              required
            />
            <button
              type="submit"
              disabled={email.length == 0 || submitted}
              className={
                'w-full mt-5 flex flex-col justify-center items-center text-white silka-semibold text-sm py-2.5 rounded ' +
                (email.length == 0 || submitted
                  ? 'bg-[#F7E7E3]'
                  : 'bg-[#FF623D]')
              }
            >
              {submitted ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="animate-spin"
                >
                  <g clipPath="url(#clip0_1405_2)">
                    <path
                      d="M4.84457 21.6005C4.13345 21.0227 3.95568 20.0005 4.53345 19.2449C5.11123 18.5338 6.13345 18.3116 6.88901 18.8894C7.24457 19.1116 7.55568 19.3783 7.95568 19.556C11.289 21.3783 15.4223 20.756 18.089 18.0449C18.7557 17.3783 19.7779 17.3783 20.4446 18.0449C21.0668 18.7116 21.0668 19.7783 20.4446 20.4005C16.7112 24.1783 10.9335 25.1116 6.31123 22.5338C5.7779 22.2671 5.28901 21.9116 4.84457 21.6005Z"
                      fill="#FF623D"
                    />
                    <path
                      d="M23.8224 13.9555C23.6891 14.8888 22.8002 15.511 21.8669 15.3777C20.9335 15.2444 20.3558 14.3555 20.4891 13.4221C20.578 12.9332 20.578 12.4444 20.578 11.9555C20.578 8.0888 18.0446 4.75547 14.4891 3.73325C13.6002 3.51103 13.0669 2.53325 13.3335 1.64436C13.6002 0.755471 14.4891 0.222137 15.4224 0.488804C20.4446 1.95547 23.9558 6.62214 23.9558 11.9999C23.9558 12.6666 23.9113 13.3332 23.8224 13.9555Z"
                      fill="#FF623D"
                    />
                    <path
                      d="M7.42222 0.843445C8.26667 0.487889 9.24445 0.932334 9.55556 1.82122C9.86667 2.71011 9.46667 3.68789 8.62222 4.04344C5.42222 5.33233 3.28889 8.48789 3.28889 12.0879C3.28889 12.799 3.37778 13.5101 3.55556 14.1768C3.77778 15.0657 3.24444 15.999 2.35556 16.2212C1.46667 16.4434 0.577778 15.9101 0.355556 14.9768C0.133333 13.999 0 13.0212 0 12.0434C0 7.02122 2.97778 2.62122 7.42222 0.843445Z"
                      fill="#FF623D"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1405_2">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              ) : (
                <p>Send Reset Email</p>
              )}
            </button>
            <div className="flex flex-col justify-center items-center mt-12 space-y-4">
              <div className="flex flex-row space-x-2">
                <p className="text-xs silka-regular text-gray-400">
                  Don't need to reset your password?
                </p>
                <Link
                  href="/signin"
                  className="underline text-xs silka-medium text-[#FF623D] underline-offset-2"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </PageHead>
  );
}
