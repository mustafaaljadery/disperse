import { useState, useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { PageHead } from '../layouts/PageHead';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { apiUrl } from '../utils/apiUrl';
import toast from 'react-hot-toast';

async function checkUser(email: string) {
  try {
    const result = await axios.get(`${apiUrl()}user/read/isuser`, {
      params: {
        email: email,
      },
    });
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

export default function Signup() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const { data: session, status } = useSession();

  async function submit() {
    setLoading(true);
    const result = await checkUser(email);
    if (result.user == 'not found') {
      Router.push(`/name_and_password?email=${email}`);
    } else {
      toast.error('Already a User', {
        className: 'text-sm silka-medium text-gray-900',
      });
      setLoading(false);
    }
  }

  useEffect(() => {
    if (status == 'authenticated') {
      Router.push('/dashboard');
    }
  }, [status]);

  return (
    <PageHead
      title="Sign Up - Disperse Content Automation"
      description="Create your free Disperse account to get started!"
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
            <p className="text-[28px] my-auto silka-bold text-[#363636]">
              Disperse
            </p>
          </div>
          <h1 className="text-[#363636] text-2xl md:text-3xl w-full silka-semibold mt-14">
            Create a free account
          </h1>
          <form
            className="flex flex-col w-full mt-6"
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
          >
            <label className="text-sm silka-semibold text-gray-600">
              Work Email
            </label>
            <input
              className="mt-3 text-sm silka-regular w-full py-2.5 rounded border border-gray-300 focus:ring-[#FF623D] focus:border-[#FF623D]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              type="email"
              required
            />
            <button
              type="submit"
              disabled={email.length == 0 || loading}
              className={
                'w-full mt-5 flex flex-col justify-center items-center text-white silka-semibold text-sm py-2.5 rounded ' +
                (email.length == 0 || loading
                  ? 'bg-[#F7E7E3]'
                  : 'bg-[#FF623D]')
              }
            >
              {loading ? (
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
                <p>Continue</p>
              )}
            </button>
          </form>
          {/*
          <div className="flex flex-row space-x-3 my-8 w-full">
            <hr className="w-1/2 border-px my-auto border-gray-300" />
            <p className="text-sm silka-regular my-auto text-gray-400">
              or
            </p>
            <hr className="w-1/2 border-px border-gray-300 my-auto" />
          </div>
          <button
            className="flex flex-row hover:bg-gray-50 justify-center items-center border rounded py-2.5 space-x-4 w-full"
            onClick={() =>
              signIn('google', {
                callbackUrl: 'https://trydisperse.com/dashboard',
              }).catch((err) => console.log(err))
            }
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="my-auto"
            >
              <g clipPath="url(#clip0_50_547)">
                <path
                  d="M23.745 12.27C23.745 11.48 23.675 10.73 23.555 10H12.255V14.51H18.725C18.435 15.99 17.585 17.24 16.325 18.09V21.09H20.185C22.445 19 23.745 15.92 23.745 12.27Z"
                  fill="#4285F4"
                />
                <path
                  d="M12.255 24C15.495 24 18.205 22.92 20.185 21.09L16.325 18.09C15.245 18.81 13.875 19.25 12.255 19.25C9.12504 19.25 6.47505 17.14 5.52505 14.29H1.54504V17.38C3.51504 21.3 7.56504 24 12.255 24Z"
                  fill="#34A853"
                />
                <path
                  d="M5.52501 14.29C5.27501 13.57 5.145 12.8 5.145 12C5.145 11.2 5.28501 10.43 5.52501 9.71V6.62H1.545C0.725004 8.24 0.255005 10.06 0.255005 12C0.255005 13.94 0.725004 15.76 1.545 17.38L5.52501 14.29Z"
                  fill="#FBBC05"
                />
                <path
                  d="M12.255 4.75C14.025 4.75 15.605 5.36 16.855 6.55L20.275 3.13C18.205 1.19 15.495 0 12.255 0C7.56504 0 3.51504 2.7 1.54504 6.62L5.52505 9.71C6.47505 6.86 9.12504 4.75 12.255 4.75Z"
                  fill="#EA4335"
                />
              </g>
              <defs>
                <clipPath id="clip0_50_547">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <p className="text-[#323232] silka-medium text-sm silka-medium">
              Continue with Google
            </p>
          </button>
          */}
          <p className="mt-8 text-[11px] silka-regular text-gray-500">
            By signing up you agree to the{' '}
            <Link
              href="/terms-of-service"
              className="underline underline-offset-2 text-gray-600 silka-semibold"
            >
              Terms of Service
            </Link>{' '}
            &amp;{' '}
            <Link
              href="/privacy-policy"
              className="underline underline-offset-2 text-gray-600 silka-semibold"
            >
              Privacy Policy
            </Link>
          </p>
          <div className="flex mt-12 flex-row space-x-2">
            <p className="text-xs silka-regular text-gray-400">
              Already have an account?
            </p>
            <Link
              href="/signin"
              className="underline text-xs silka-medium text-[#FF623D] underline-offset-2"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </PageHead>
  );
}
