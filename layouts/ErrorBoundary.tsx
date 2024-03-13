import React from 'react';
import Router from 'next/router';

class ErrorBoundary extends React.Component {
  //@ts-ignore
  constructor(props) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
    // print the rror
  }
  //@ts-ignore
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI

    return { hasError: true };
  }
  //@ts-ignore
  componentDidCatch(error, errorInfo) {
    // You can use your own error logging service here
    console.log({ error, errorInfo });
  }

  render() {
    //@ts-ignore
    if (this.state.hasError) {
      return (
        <div className="flex flex-col h-[100vh] w-[100vw]">
          <button
            onClick={() => {
              Router.push('https://trydisperse.com');
            }}
            className="flex flex-row space-x-3 py-6 lg:px-16 md:px-10 px-4 h-fit"
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="my-auto"
            >
              <g clipPath="url(#clip0_750_2)">
                <g filter="url(#filter0_d_750_2)">
                  <rect
                    x="24"
                    width="24"
                    height="24"
                    fill="#FF623D"
                  />
                </g>
                <g filter="url(#filter1_d_750_2)">
                  <rect
                    x="12"
                    y="12"
                    width="24"
                    height="24"
                    fill="#FF623D"
                  />
                </g>
                <g filter="url(#filter2_d_750_2)">
                  <rect
                    y="24"
                    width="24"
                    height="24"
                    fill="#FF623D"
                  />
                </g>
              </g>
              <defs>
                <filter
                  id="filter0_d_750_2"
                  x="20"
                  y="-3"
                  width="32"
                  height="32"
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
                  <feOffset dy="1" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_750_2"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_750_2"
                    result="shape"
                  />
                </filter>
                <filter
                  id="filter1_d_750_2"
                  x="8"
                  y="9"
                  width="32"
                  height="32"
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
                  <feOffset dy="1" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_750_2"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_750_2"
                    result="shape"
                  />
                </filter>
                <filter
                  id="filter2_d_750_2"
                  x="-4"
                  y="21"
                  width="32"
                  height="32"
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
                  <feOffset dy="1" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_750_2"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_750_2"
                    result="shape"
                  />
                </filter>
                <clipPath id="clip0_750_2">
                  <rect width="48" height="48" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <p className="text-xl silka-bold my-auto text-gray-800">
              Disperse
            </p>
          </button>
          <div className="h-full flex flex-col justify-center items-center">
            <p className="text-6xl mb-8">👀</p>
            <p className="silka-semibold text-xl text-gray-800">
              Something Went Wrong
            </p>
            <p className="mt-1 mb-5 text-sm silka-regular text-gray-500">
              Don&apos;t worry we are already working on fixing it!
            </p>
            <div className="flex flex-row space-x-3">
              <button
                onClick={() => {
                  Router.reload();
                }}
                className="text-xs px-4 py-1.5 hover:opacity-90 rounded silka-medium text-white bg-[#FF623D]"
              >
                Reload Page
              </button>
              <button
                onClick={() => {
                  Router.push('https://trydisperse.com/dashboard');
                  setTimeout(() => {
                    Router.reload();
                  }, 1000);
                }}
                className="text-xs px-4 py-1.5 hover:opacity-90 rounded silka-medium text-white bg-[#FF623D]"
              >
                Back to Dashboard
              </button>
            </div>
            <hr className="w-72 my-5" />
            <p className="text-[11px] silka-regular text-gray-500">
              If there is something wrong,{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://trydisperse.com/contact-us"
                className="underline underline-offset-2 hover:text-[#FF623D]"
              >
                Contact Support
              </a>
            </p>
          </div>
        </div>
      );
    }

    //@ts-ignore
    return this.props.children;
  }
}

export default ErrorBoundary;
