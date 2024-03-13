import Link from 'next/link';
import { useState } from 'react';
import { clsx } from 'clsx';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';

function MobileHeader() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center w-full lg:hidden">
      <div className="py-3 w-[95%] z-50 flex flex-row justify-between items-between">
        <div className="flex flex-row space-x-4">
          <button
            onClick={() => {
              setOpen(!open);
            }}
            className="my-auto"
          >
            {open ? (
              <svg
                width="22"
                height="22"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                  fill="#363636"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            ) : (
              <svg
                width="22"
                height="22"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
                  fill="#363636"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            )}
          </button>
          <Link href="/" legacyBehavior>
            <button className="my-auto flex flex-row space-x-2">
              <svg
                width="24"
                height="24"
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
              <p className="my-auto text-xl silka-bold text-[#363636]">
                Disperse
              </p>
            </button>
          </Link>
        </div>
        <Link href="/signup" legacyBehavior>
          <button className="text-xs silka-medium text-white px-4 py-1.5 bg-[#FF623D] rounded">
            Get Started
          </button>
        </Link>
      </div>
      <hr className="w-full" />
      {open && (
        <div className="h-[200vh] z-40 bg-white flex flex-col justify-center items-center absolute w-full ">
          <div className="flex flex-col w-[95%]">
            <div className="flex flex-col mt-[485px] space-y-6">
              <Link
                href="/"
                className="text-4xl silka-bold text-[#363636]"
              >
                Home
              </Link>
              <Link
                href="/pricing"
                className="text-4xl silka-bold text-[#363636]"
              >
                Pricing
              </Link>
              <Link
                href="/blog"
                className="text-4xl silka-bold text-[#363636]"
              >
                Blog
              </Link>
            </div>
            <hr className="w-full mt-6 mb-4" />
            <div className="flex flex-row w-full">
              <div className="flex flex-col w-1/2 justify-start items-start space-y-5">
                <Link
                  href="/integrations"
                  className="text-[#363636] text-sm silka-semibold"
                >
                  Integrations
                </Link>
                <Link
                  href="/business"
                  className="text-[#363636] text-sm silka-semibold"
                >
                  Small Business
                </Link>
              </div>
              <div className="flex flex-col w-1/2 justify-start space-y-5 items-start">
                <Link
                  href="/creator"
                  className="text-[#363636] text-sm silka-semibold"
                >
                  Creator
                </Link>
                <Link
                  href="/enterprise"
                  className="text-[#363636] text-sm silka-semibold"
                >
                  Enterprise
                </Link>
              </div>
              <div className="flex flex-col w-1/2 justify-start space-y-5 items-start">
                <Link
                  href="/whitepaper"
                  className="text-[#363636] text-sm silka-semibold"
                >
                  Whitepaper
                </Link>
                <a
                  href="https://miro.com/app/board/uXjVM0tW0ng=/?share_link_id=936312693615"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#363636] text-sm silka-semibold"
                >
                  Flow-Chart
                </a>
              </div>
            </div>
            <hr className="w-full my-4" />
            <div className="flex flex-col mt-2 w-full space-y-4">
              <Link href="/signup" legacyBehavior>
                <button className="py-2 rounded border border-[#FF623D] bg-[#FF623D] text-white silka-medium text-xs">
                  Try Disperse Free
                </button>
              </Link>
              <a
                href="https://calendly.com/trydisperse/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <button className="py-2 w-full border border-[#FF623D] silka-medium text-xs text-[#FF673D] silka-medium rounded">
                  Book a Demo
                </button>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function Header() {
  const [solutionsHovered, setSolutionsHovered] = useState(false);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <MobileHeader />
      <div className="hidden w-[80%] lg:flex flex-row justify-between items-between py-5">
        <div className="flex flex-row space-x-8">
          <Link href="/" legacyBehavior>
            <button className="flex flex-row space-x-3.5 transition-all delay-75 ease-in-out hover:opacity-80">
              <svg
                width="32"
                height="32"
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
              <p className="text-[28px] my-auto text-[#363636] silka-bold">
                Disperse
              </p>
            </button>
          </Link>
          <div className="flex flex-row mt-1 space-x-7">
            <Link
              href="/whitepaper"
              className="my-auto text-[15px] hover:underline hover:underline-offset-2 silka-medium text-gray-700 transition-all ease-in-out delay-75 hover:text-gray-500"
            >
              Whitepaper
            </Link>
            <a
              href="https://miro.com/app/board/uXjVM0tW0ng=/?share_link_id=936312693615"
              target="_blank"
              rel="noopenner noreferrer"
              className="my-auto text-[15px] hover:underline hover:underline-offset-2 silka-medium text-gray-700 transition-all ease-in-out delay-75 hover:text-gray-500"
            >
              Flow-Chart
            </a>
            <div className="h-full my-auto">
              <NavigationMenuPrimitive.Root className="h-full flex flex-col justify-center items-center">
                <NavigationMenuPrimitive.List className="flex flex-row rounded-lg bg-white my-auto h-full space-x-2">
                  <NavigationMenuPrimitive.Item>
                    <NavigationMenuPrimitive.Trigger asChild>
                      <button
                        onMouseEnter={() => {
                          setSolutionsHovered(true);
                        }}
                        onMouseLeave={() => {
                          setSolutionsHovered(false);
                        }}
                        className="flex flex-row my-auto space-x-1"
                      >
                        <p className="my-auto text-[15px] silka-medium text-gray-700 transition-all ease-in-out delay-75 hover:text-gray-500">
                          Solutions
                        </p>
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className={
                            'my-auto transition-all ease-in-out delay-150 ' +
                            (solutionsHovered ? 'rotate-180' : '')
                          }
                        >
                          <path
                            d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </NavigationMenuPrimitive.Trigger>
                    <NavigationMenuPrimitive.Content
                      className={clsx(
                        'absolute w-48 z-10 shadow p-2 top-7 left-0 rounded',
                        'radix-motion-from-start:animate-enter-from-left',
                        'radix-motion-from-end:animate-enter-from-right',
                        'radix-motion-to-start:animate-exit-to-left',
                        'radix-motion-to-end:animate-exit-to-right bg-white'
                      )}
                    >
                      <div className="flex flex-col space-y-1">
                        <Link href="/creator" legacyBehavior>
                          <button className="flex flex-row px-2 space-x-2.5 py-2 hover:bg-gray-100 rounded-lg">
                            <svg
                              width="13"
                              height="13"
                              viewBox="0 0 15 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="my-auto"
                            >
                              <path
                                d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z"
                                fill="#363636"
                                fillRule="evenodd"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                            <p className="text-xs my-auto silka-semibold text-[#363636]">
                              Creator
                            </p>
                          </button>
                        </Link>
                        <Link href="/business" legacyBehavior>
                          <button className="flex flex-row px-2 space-x-2.5 py-2 hover:bg-gray-100 rounded-lg">
                            <svg
                              width="13"
                              height="13"
                              viewBox="0 0 15 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="my-auto"
                            >
                              <path
                                d="M5 1C5 0.447715 5.44772 0 6 0H9C9.55228 0 10 0.447715 10 1V2H14C14.5523 2 15 2.44772 15 3V6C15 6.8888 14.6131 7.68734 14 8.23608V11.5C14 12.3284 13.3284 13 12.5 13H2.5C1.67157 13 1 12.3284 1 11.5V8.2359C0.38697 7.68721 0 6.88883 0 6V3C0 2.44772 0.447716 2 1 2H5V1ZM9 1V2H6V1H9ZM1 3H5H5.5H9.5H10H14V6C14 6.654 13.6866 7.23467 13.1997 7.6004C12.8655 7.85144 12.4508 8 12 8H8V7.5C8 7.22386 7.77614 7 7.5 7C7.22386 7 7 7.22386 7 7.5V8H3C2.5493 8 2.1346 7.85133 1.80029 7.60022C1.31335 7.23446 1 6.65396 1 6V3ZM7 9H3C2.64961 9 2.31292 8.93972 2 8.82905V11.5C2 11.7761 2.22386 12 2.5 12H12.5C12.7761 12 13 11.7761 13 11.5V8.82915C12.6871 8.93978 12.3504 9 12 9H8V9.5C8 9.77614 7.77614 10 7.5 10C7.22386 10 7 9.77614 7 9.5V9Z"
                                fill="#363636"
                                fillRule="evenodd"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                            <p className="text-xs my-auto silka-semibold text-[#363636]">
                              Business
                            </p>
                          </button>
                        </Link>
                        <Link href="/enterprise" legacyBehavior>
                          <button className="flex flex-row px-2 space-x-2.5 py-2 hover:bg-gray-100 rounded-lg">
                            <svg
                              width="13"
                              height="13"
                              viewBox="0 0 13 13"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="my-auto"
                            >
                              <g clipPath="url(#clip0_1382_2)">
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M11.3748 11.9167H12.4582V13H0.541504V11.9167H1.62484V0H11.3748V11.9167ZM5.95817 10.2917H4.87484V12.4583H5.95817V10.2917ZM8.12484 10.2917H7.0415V12.4583H8.12484V10.2917ZM10.2915 1.08333H2.70817V11.9167H3.7915V9.20833H9.20817V11.9167H10.2915V1.08333ZM3.7915 7.04167H4.87484V8.125H3.7915V7.04167ZM5.95817 7.04167H7.0415V8.125H5.95817V7.04167ZM8.12484 7.04167H9.20817V8.125H8.12484V7.04167ZM3.7915 5.41667H4.87484V6.5H3.7915V5.41667ZM5.95817 5.41667H7.0415V6.5H5.95817V5.41667ZM8.12484 5.41667H9.20817V6.5H8.12484V5.41667ZM3.7915 3.79167H4.87484V4.875H3.7915V3.79167ZM5.95817 3.79167H7.0415V4.875H5.95817V3.79167ZM8.12484 3.79167H9.20817V4.875H8.12484V3.79167ZM3.7915 2.16667H4.87484V3.25H3.7915V2.16667ZM5.95817 2.16667H7.0415V3.25H5.95817V2.16667ZM8.12484 2.16667H9.20817V3.25H8.12484V2.16667Z"
                                  fill="#363636"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_1382_2">
                                  <rect
                                    width="13"
                                    height="13"
                                    fill="white"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                            <p className="text-xs my-auto silka-semibold text-[#363636]">
                              Enterprise
                            </p>
                          </button>
                        </Link>
                      </div>
                    </NavigationMenuPrimitive.Content>
                  </NavigationMenuPrimitive.Item>
                </NavigationMenuPrimitive.List>
              </NavigationMenuPrimitive.Root>
            </div>
            <Link
              href="/pricing"
              className="my-auto text-[15px] hover:underline hover:underline-offset-2 silka-medium text-gray-700 transition-all ease-in-out delay-75 hover:text-gray-500"
            >
              Pricing
            </Link>
            <Link
              href="/blog"
              className="my-auto text-[15px] hover:underline hover:underline-offset-2 silka-medium text-gray-700 transition-all ease-in-out delay-75 hover:text-gray-500"
            >
              Blog
            </Link>
          </div>
        </div>
        <div className="flex flex-row space-x-5">
          <Link
            href="/signin"
            className="my-auto text-sm silka-medium text-[#363636] transition-all ease-in-out delay-75 hover:text-gray-500"
          >
            Log In
          </Link>
          <Link href="/signup" legacyBehavior>
            <button className="bg-[#FF623D] rounded px-4 py-1.5 text-sm silka-medium text-white transition-all ease-in-out delay-75 h-fit my-auto hover:opacity-90">
              Try Disperse Free
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
