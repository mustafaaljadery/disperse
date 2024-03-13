import Link from 'next/link';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import cx from 'classnames';
import React, { useState } from 'react';
import { DisperseLogoDesktop } from '../logos/DisperseLogo';

export default function DesktopMenu() {
  const [productNav, setProductNav] = useState(false);
  const [solutionsNav, setSolutionsNav] = useState(false);
  const [resourcesNav, setResourcesNav] = useState(false);

  const [enterHome, setEnterHome] = useState(false);
  const [enterIntegrations, setEnterIntegrations] = useState(false);

  const [enterCreator, setEnterCreator] = useState(false);
  const [enterBusiness, setEnterBusiness] = useState(false);
  const [enterEnterprise, setEnterEnterprise] = useState(false);

  const [enterBlog, setEnterBlog] = useState(false);
  const [enterHelp, setEnterHelp] = useState(false);
  const [enterContact, setEnterContact] = useState(false);

  return (
    <header className="hidden lg:flex flex-col justify-center items-center mt-7">
      <div className="w-4/5 2xl:w-3/5">
        <div className="flex flex-row justify-between items-between">
          <div className="flex flex-row space-x-8">
            <div className="flex flex-row space-x-3">
              <DisperseLogoDesktop />
              <Link href="/" className="text-2xl silka-bold my-auto">
                
                  Disperse
                
              </Link>
            </div>
            <NavigationMenuPrimitive.Root className="relative my-auto">
              <NavigationMenuPrimitive.List className="flex flex-row space-x-2 mt-0.5">
                <NavigationMenuPrimitive.Item
                  className="my-auto"
                  onMouseEnter={() => {
                    setProductNav(true);
                  }}
                  onMouseLeave={() => {
                    setProductNav(false);
                  }}
                >
                  <NavigationMenuPrimitive.Trigger
                    className={cx(
                      'px-3 py-1.5 text-sm rounded-md hover:bg-gray-100',
                      'text-sm silka-medium z-20',
                      'text-gray-700',
                      'focus:outline-none focus-visible:ring-0'
                    )}
                  >
                    <div className="flex flex-row space-x-1">
                      <p className="">Product</p>
                      {productNav ? (
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          xmlns="http://www.w3.org/2000/svg"
                          className="my-auto"
                        >
                          <path
                            d="M4.18179 8.81819C4.00605 8.64245 4.00605 8.35753 4.18179 8.18179L7.18179 5.18179C7.26618 5.0974 7.38064 5.04999 7.49999 5.04999C7.61933 5.04999 7.73379 5.0974 7.81819 5.18179L10.8182 8.18179C10.9939 8.35753 10.9939 8.64245 10.8182 8.81819C10.6424 8.99392 10.3575 8.99392 10.1818 8.81819L7.49999 6.13638L4.81819 8.81819C4.64245 8.99392 4.35753 8.99392 4.18179 8.81819Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      ) : (
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          xmlns="http://www.w3.org/2000/svg"
                          className="my-auto"
                        >
                          <path
                            d="M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.73379 9.9026 7.61934 9.95001 7.49999 9.95001C7.38064 9.95001 7.26618 9.9026 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      )}
                    </div>
                  </NavigationMenuPrimitive.Trigger>

                  <NavigationMenuPrimitive.Content
                    className={cx(
                      'absolute bg-white z-30 w-auto top-0 bg-white left-0 rounded-lg',
                      'radix-motion-from-start:animate-enter-from-left',
                      'radix-motion-from-end:animate-enter-from-right',
                      'radix-motion-to-start:animate-exit-to-left',
                      'radix-motion-to-end:animate-exit-to-right'
                    )}
                  >
                    <div className="w-[21rem] p-3">
                      <div className="w-full flex flex-col space-y-2">
                        <p className="text-sm my-0.5 silka-semibold text-[#4B4B4B]">
                          PRODUCT
                        </p>
                        <NavigationMenuPrimitive.Link
                          onMouseEnter={() => {
                            setEnterHome(true);
                          }}
                          onMouseLeave={() => {
                            setEnterHome(false);
                          }}
                          className={cx(
                            'w-full px-4 py-3 z-10 hover:bg-gray-100 rounded-md',
                            'focus:outline-none focus-visible:ring-0'
                          )}
                          href="/"
                        >
                          <div className="flex flex-col space-y-1">
                            <div className="flex flex-row justify-between items-between">
                              <p className="silka-medium text-2xl">
                                Home
                              </p>
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className={
                                  'my-auto ' +
                                  (enterHome ? '' : 'hidden')
                                }
                              >
                                <path
                                  d="M14.523 18.7869C14.523 18.7869 19.024 14.2819 20.778 12.5269C20.924 12.3809 20.997 12.1889 20.997 11.9969C20.997 11.8049 20.924 11.6139 20.778 11.4669C19.025 9.71294 14.523 5.20894 14.523 5.20894C14.379 5.06394 14.189 4.99194 13.999 4.99194C13.806 4.99194 13.614 5.06594 13.467 5.21294C13.174 5.50494 13.172 5.97894 13.463 6.26894L18.441 11.2469H3.749C3.335 11.2469 2.999 11.5829 2.999 11.9969C2.999 12.4109 3.335 12.7469 3.749 12.7469H18.441L13.462 17.7259C13.173 18.0149 13.176 18.4879 13.468 18.7799C13.616 18.9279 13.809 19.0019 14.001 19.0019C14.191 19.0019 14.379 18.9299 14.523 18.7869Z"
                                  fill="#FF623D"
                                />
                              </svg>
                            </div>
                            <span className="text-[#8F8F8F] text-sm silka-regular">
                              Welcome to the product
                            </span>
                          </div>
                        </NavigationMenuPrimitive.Link>
                        <NavigationMenuPrimitive.Link
                          onMouseEnter={() => {
                            setEnterIntegrations(true);
                          }}
                          onMouseLeave={() => {
                            setEnterIntegrations(false);
                          }}
                          className={cx(
                            'w-full px-4 py-3 z-10 hover:bg-gray-100 rounded-md',
                            'focus:outline-none focus-visible:ring-0'
                          )}
                          href="/integrations"
                        >
                          <div className="flex flex-col space-y-1">
                            <div className="flex flex-row justify-between items-between">
                              <p className="silka-medium text-2xl">
                                Integrations
                              </p>
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className={
                                  'my-auto ' +
                                  (enterIntegrations ? '' : 'hidden')
                                }
                              >
                                <path
                                  d="M14.523 18.7869C14.523 18.7869 19.024 14.2819 20.778 12.5269C20.924 12.3809 20.997 12.1889 20.997 11.9969C20.997 11.8049 20.924 11.6139 20.778 11.4669C19.025 9.71294 14.523 5.20894 14.523 5.20894C14.379 5.06394 14.189 4.99194 13.999 4.99194C13.806 4.99194 13.614 5.06594 13.467 5.21294C13.174 5.50494 13.172 5.97894 13.463 6.26894L18.441 11.2469H3.749C3.335 11.2469 2.999 11.5829 2.999 11.9969C2.999 12.4109 3.335 12.7469 3.749 12.7469H18.441L13.462 17.7259C13.173 18.0149 13.176 18.4879 13.468 18.7799C13.616 18.9279 13.809 19.0019 14.001 19.0019C14.191 19.0019 14.379 18.9299 14.523 18.7869Z"
                                  fill="#FF623D"
                                />
                              </svg>
                            </div>
                            <span className="text-[#8F8F8F] text-sm silka-regular">
                              Enhance your Disperse experience
                            </span>
                          </div>
                        </NavigationMenuPrimitive.Link>
                      </div>
                    </div>
                  </NavigationMenuPrimitive.Content>
                </NavigationMenuPrimitive.Item>

                <NavigationMenuPrimitive.Item
                  className="my-auto"
                  onMouseEnter={() => {
                    setSolutionsNav(true);
                  }}
                  onMouseLeave={() => {
                    setSolutionsNav(false);
                  }}
                >
                  <NavigationMenuPrimitive.Trigger
                    className={cx(
                      'px-3 py-1.5 text-sm rounded-md hover:bg-gray-100',
                      'text-sm silka-medium text-gray-700 z-10',
                      'focus:outline-none focus-visible:ring-10'
                    )}
                  >
                    <div className="flex flex-row space-x-1.5">
                      <p>Solutions</p>
                      {solutionsNav ? (
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          xmlns="http://www.w3.org/2000/svg"
                          className="my-auto"
                        >
                          <path
                            d="M4.18179 8.81819C4.00605 8.64245 4.00605 8.35753 4.18179 8.18179L7.18179 5.18179C7.26618 5.0974 7.38064 5.04999 7.49999 5.04999C7.61933 5.04999 7.73379 5.0974 7.81819 5.18179L10.8182 8.18179C10.9939 8.35753 10.9939 8.64245 10.8182 8.81819C10.6424 8.99392 10.3575 8.99392 10.1818 8.81819L7.49999 6.13638L4.81819 8.81819C4.64245 8.99392 4.35753 8.99392 4.18179 8.81819Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      ) : (
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          xmlns="http://www.w3.org/2000/svg"
                          className="my-auto"
                        >
                          <path
                            d="M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.73379 9.9026 7.61934 9.95001 7.49999 9.95001C7.38064 9.95001 7.26618 9.9026 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      )}
                    </div>
                  </NavigationMenuPrimitive.Trigger>

                  <NavigationMenuPrimitive.Content
                    className={cx(
                      'absolute w-auto top-0 left-0 rounded-lg z-20 bg-white',
                      'radix-motion-from-start:animate-enter-from-left',
                      'radix-motion-from-end:animate-enter-from-right',
                      'radix-motion-to-start:animate-exit-to-left',
                      'radix-motion-to-end:animate-exit-to-right'
                    )}
                  >
                    <div className="w-[21rem] p-3">
                      <div className="w-full flex flex-col space-y-2">
                        <p className="text-sm my-0.5 silka-semibold text-[#4B4B4B]">
                          SOLUTIONS
                        </p>
                        <NavigationMenuPrimitive.Link
                          onMouseEnter={() => {
                            setEnterCreator(true);
                          }}
                          onMouseLeave={() => {
                            setEnterCreator(false);
                          }}
                          className={cx(
                            'w-full px-4 py-3 hover:bg-gray-100 rounded-md hover:text-[#FF623D]',
                            'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
                          )}
                          href="/creator"
                        >
                          <div className="flex flex-row space-x-3">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12.4862 0C13.2792 0 14.0402 0.315246 14.601 0.876175C15.1617 1.43681 15.4769 2.19772 15.4769 2.99081C15.4769 3.78415 15.1616 4.54481 14.601 5.10569C14.0401 5.66633 13.2792 5.98155 12.4862 5.98155C11.6931 5.98155 10.9322 5.6663 10.3713 5.10569C9.81064 4.54475 9.49542 3.78415 9.49542 2.99081C9.49542 2.19779 9.81067 1.43682 10.3713 0.876175C10.9322 0.31523 11.6931 0 12.4862 0Z"
                                fill={
                                  enterCreator ? '#FF623D' : 'black'
                                }
                              />
                              <path
                                d="M14.7292 6.76639H14.1936C13.1097 7.2646 11.8623 7.2646 10.7785 6.76639H10.2429C9.64824 6.76639 9.07767 7.00252 8.65707 7.42315C8.23613 7.84378 8 8.41428 8 9.00927V15.3692C8 15.6656 8.11776 15.9496 8.32699 16.1591C8.53653 16.3684 8.82056 16.4861 9.11695 16.4861H9.87385V22.846C9.86365 23.1486 9.97707 23.4425 10.1875 23.6598C10.398 23.8773 10.6879 24 10.9908 24H13.9816H13.9813C14.2777 24 14.5617 23.8823 14.7712 23.6728C14.9808 23.4632 15.0982 23.1792 15.0982 22.8831V16.4861H15.8551C16.1515 16.4861 16.4355 16.3683 16.6451 16.1591C16.8543 15.9496 16.9721 15.6655 16.9721 15.3691V9.00924C16.9721 8.41429 16.7359 7.8438 16.315 7.42312C15.8944 7.00248 15.3239 6.76636 14.7292 6.76636L14.7292 6.76639Z"
                                fill={
                                  enterCreator ? '#FF623D' : 'black'
                                }
                              />
                            </svg>

                            <div className="mt-4-">
                              <p
                                className={
                                  'text-xl silka-semibold ' +
                                  (enterCreator
                                    ? 'text-[#FF623D]'
                                    : 'text-gray-900')
                                }
                              >
                                Creator
                              </p>

                              <div className="mt-0.5 text-xs silka-regular text-gray-700">
                                <p
                                  className={
                                    enterCreator
                                      ? 'text-[#FF623D]'
                                      : ''
                                  }
                                >
                                  Maximize your personal brand
                                  potential.
                                </p>
                              </div>
                            </div>
                          </div>
                        </NavigationMenuPrimitive.Link>
                        <NavigationMenuPrimitive.Link
                          onMouseEnter={() => {
                            setEnterBusiness(true);
                          }}
                          onMouseLeave={() => {
                            setEnterBusiness(false);
                          }}
                          className={cx(
                            'w-full px-4 py-3 hover:bg-gray-100 rounded-md hover:text-[#FF623D]',
                            'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
                          )}
                          href="/business"
                        >
                          <div className="flex flex-row space-x-3">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_94_2)">
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M4.28353 6.18949e-06C4.09524 -0.000781617 3.91464 0.0736643 3.7815 0.206807C3.64856 0.339749 3.57411 0.520554 3.5749 0.708639V22.5882H0.708639C0.520352 22.5875 0.339749 22.6619 0.206611 22.795C0.0736694 22.928 -0.000780377 23.1088 6.16952e-06 23.2969C0.000597037 23.4842 0.0756354 23.6634 0.208577 23.7952C0.341518 23.9271 0.521335 24.0008 0.708639 24H23.036H23.0358C23.2231 24.0008 23.4029 23.9271 23.5358 23.7952C23.6688 23.6634 23.7438 23.4842 23.7444 23.2969C23.7452 23.1088 23.6707 22.928 23.5378 22.795C23.4047 22.6619 23.2241 22.5875 23.0358 22.5882H20.1697V0.708639C20.1703 0.520549 20.0959 0.339749 19.9629 0.206807C19.8298 0.0736693 19.6492 -0.000780357 19.4609 6.18949e-06H4.28353ZM4.98663 1.41176H18.7583V22.588H15.7886V18.4768C15.7871 18.0871 15.4698 17.7721 15.08 17.7737H8.6651C8.27513 17.7722 7.95786 18.0871 7.95625 18.4768V22.588H4.98678L4.98663 1.41176ZM7.35242 3.27708H7.35222C6.96462 3.27866 6.65068 3.5926 6.64932 3.98018V8.24301C6.6507 8.63061 6.96464 8.94455 7.35222 8.94611H10.3538C10.7435 8.94769 11.0608 8.63277 11.0622 8.24301V3.98018C11.0608 3.59041 10.7435 3.27547 10.3538 3.27708H7.35242ZM13.3912 3.27708H13.391C13.0012 3.27551 12.6839 3.59043 12.6823 3.98018V8.24301C12.6839 8.63278 13.0012 8.94773 13.391 8.94611H16.3923C16.7807 8.94533 17.0954 8.63119 17.0968 8.24301V3.98018C17.0955 3.59199 16.7807 3.27784 16.3923 3.27708H13.3912ZM8.06132 4.68883H9.6509V7.53442H8.06132V4.68883ZM14.0955 4.68883H15.6838V7.53442H14.0955V4.68883ZM7.35242 10.4009H7.35222C6.96462 10.4024 6.65068 10.7164 6.64932 11.104V15.3613C6.64775 15.7511 6.96247 16.0683 7.35222 16.07H10.3538C10.5418 16.0707 10.7224 15.9963 10.8556 15.8632C10.9885 15.7302 11.063 15.5494 11.0622 15.3613V11.104C11.0608 10.7142 10.7435 10.3993 10.3537 10.4009L7.35242 10.4009ZM13.3912 10.4009H13.391C13.0012 10.3993 12.6839 10.7142 12.6823 11.104V15.3613C12.6817 15.5494 12.7562 15.7302 12.8891 15.8631C13.0223 15.9963 13.2029 16.0707 13.391 16.0699H16.3923C16.5798 16.0695 16.7594 15.9947 16.8916 15.8618C17.0237 15.7288 17.0976 15.5488 17.0968 15.3613V11.104C17.0954 10.7158 16.7807 10.4016 16.3923 10.4009H13.3912ZM8.06132 11.8126H9.6509V14.6568H8.06132V11.8126ZM14.0955 11.8126H15.6838V14.6568H14.0955V11.8126ZM9.36951 19.1855H11.1659V22.588H9.36951V19.1855ZM12.579 19.1855H14.3768V22.588H12.579V19.1855Z"
                                  fill={
                                    enterBusiness
                                      ? '#FF623D'
                                      : 'black'
                                  }
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_94_2">
                                  <rect
                                    width="24"
                                    height="24"
                                    fill="white"
                                  />
                                </clipPath>
                              </defs>
                            </svg>

                            <div>
                              <p
                                className={
                                  'text-xl silka-semibold text-gray-900' +
                                  (enterBusiness
                                    ? 'text-[#FF623D]'
                                    : '')
                                }
                              >
                                Small Business
                              </p>

                              <div className="mt-0.5 text-xs silka-regular text-gray-700">
                                <p
                                  className={
                                    enterBusiness
                                      ? 'text-[#FF623D]'
                                      : ''
                                  }
                                >
                                  Build a brand that everyone
                                  remembers.
                                </p>
                              </div>
                            </div>
                          </div>
                        </NavigationMenuPrimitive.Link>
                        <NavigationMenuPrimitive.Link
                          onMouseEnter={() => {
                            setEnterEnterprise(true);
                          }}
                          onMouseLeave={() => {
                            setEnterEnterprise(false);
                          }}
                          className={cx(
                            'w-full px-4 py-3 hover:bg-gray-100 rounded-md hover:text-[#FF623D]',
                            'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
                          )}
                          href="/enterprise"
                        >
                          <div className="flex flex-row space-x-3">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_11_105)">
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M12 2H14V4H16V7.702L23 10.32V23H24V24H0V23H1V12H7V4H9V2H11V0H12V2ZM15 5H8V23H9V21H14V23H15V5ZM13 22H10V23H13V22ZM21 23H22V11.013L16 8.77V23H17V21H21V23ZM7 13H2V23H3V21H6V23H7V13ZM5 22H4V23H5V22ZM20 22H18V23H20V22ZM4 17V19H3V17H4ZM6 17V19H5V17H6ZM11 7V19H10V7H11ZM21 18V19H17V18H21ZM13 7V19H12V7H13ZM21 16V17H17V16H21ZM4 14V16H3V14H4ZM6 14V16H5V14H6ZM21 14V15H17V14H21ZM21 12V13H17V12H21ZM13 3H10V4H13V3Z"
                                  fill={
                                    enterEnterprise
                                      ? '#FF623D'
                                      : '#000000'
                                  }
                                  fill-opacity="0.9"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_11_105">
                                  <rect
                                    width="24"
                                    height="24"
                                    fill="white"
                                  />
                                </clipPath>
                              </defs>
                            </svg>

                            <div>
                              <p
                                className={
                                  'text-xl silka-semibold text-gray-900' +
                                  (enterEnterprise
                                    ? 'text-[#FF623D]'
                                    : '')
                                }
                              >
                                Enterprise
                              </p>

                              <div className="mt-0.5 text-xs silka-regular text-gray-700">
                                <p
                                  className={
                                    enterEnterprise
                                      ? 'text-[#FF623D]'
                                      : ''
                                  }
                                >
                                  Social growth for your organization.
                                </p>
                              </div>
                            </div>
                          </div>
                        </NavigationMenuPrimitive.Link>
                      </div>
                    </div>
                  </NavigationMenuPrimitive.Content>
                </NavigationMenuPrimitive.Item>

                <NavigationMenuPrimitive.Item
                  onMouseEnter={() => {
                    setResourcesNav(true);
                  }}
                  onMouseLeave={() => {
                    setResourcesNav(false);
                  }}
                  className="my-auto"
                >
                  <NavigationMenuPrimitive.Trigger
                    className={cx(
                      'px-3 py-1.5 text-sm rounded-md hover:bg-gray-100',
                      'text-sm silka-medium text-gray-700',
                      'focus:outline-none focus-visible:ring-0'
                    )}
                  >
                    <div className="flex flex-row space-x-1.5">
                      <p>Resources</p>
                      {resourcesNav ? (
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          xmlns="http://www.w3.org/2000/svg"
                          className="my-auto"
                        >
                          <path
                            d="M4.18179 8.81819C4.00605 8.64245 4.00605 8.35753 4.18179 8.18179L7.18179 5.18179C7.26618 5.0974 7.38064 5.04999 7.49999 5.04999C7.61933 5.04999 7.73379 5.0974 7.81819 5.18179L10.8182 8.18179C10.9939 8.35753 10.9939 8.64245 10.8182 8.81819C10.6424 8.99392 10.3575 8.99392 10.1818 8.81819L7.49999 6.13638L4.81819 8.81819C4.64245 8.99392 4.35753 8.99392 4.18179 8.81819Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      ) : (
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          xmlns="http://www.w3.org/2000/svg"
                          className="my-auto"
                        >
                          <path
                            d="M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.73379 9.9026 7.61934 9.95001 7.49999 9.95001C7.38064 9.95001 7.26618 9.9026 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      )}
                    </div>
                  </NavigationMenuPrimitive.Trigger>

                  <NavigationMenuPrimitive.Content
                    className={cx(
                      'absolute w-auto top-0 left-0 z-20 bg-white rounded-lg',
                      'radix-motion-from-start:animate-enter-from-left',
                      'radix-motion-from-end:animate-enter-from-right',
                      'radix-motion-to-start:animate-exit-to-left',
                      'radix-motion-to-end:animate-exit-to-right'
                    )}
                  >
                    <div className="w-[16rem] p-3">
                      <div className="w-full flex flex-col space-y-2">
                        <p className="my-1 text-sm text-[#4B4B4B] silka-semibold">
                          RESOURCES
                        </p>
                        <NavigationMenuPrimitive.Link
                          onMouseEnter={() => {
                            setEnterBlog(true);
                          }}
                          onMouseLeave={() => {
                            setEnterBlog(false);
                          }}
                          className={cx(
                            'w-full px-4 py-2 hover:bg-gray-100 rounded-md hover:text-[#FF623DD]',
                            'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
                          )}
                          href="/blog"
                        >
                          <div className="flex flex-row space-x-4">
                            <svg
                              width="26"
                              height="26"
                              viewBox="0 0 26 26"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M24.9167 5.41667V20.4566L23.8333 20.5833V3.25C19.6138 3.37892 15.7029 4.0755 12.9978 5.759C10.2938 4.0755 6.38733 3.37892 2.16667 3.25V20.5833L1.08333 20.4566V5.41667H0V21.6667H9.81175C11.414 21.6667 11.5895 22.75 12.9978 22.75C14.4105 22.75 14.5806 21.6667 16.185 21.6667H26V5.41667H24.9167ZM11.9167 20.1988C9.8085 19.3624 7.43492 18.824 4.33333 18.5911V5.53583C6.88133 5.74925 9.74567 6.26708 11.9167 7.618V20.1988ZM21.6667 18.5911C18.5651 18.824 16.1915 19.3624 14.0833 20.1988V7.618C16.2543 6.26708 19.1187 5.74925 21.6667 5.53583V18.5911V18.5911Z"
                                fill={enterBlog ? '#FF623D' : 'black'}
                              />
                            </svg>

                            <p
                              className={
                                'silka-semibold my-auto text-lg ' +
                                (enterBlog ? 'text-[#FF623D]' : '')
                              }
                            >
                              Blog
                            </p>
                          </div>
                        </NavigationMenuPrimitive.Link>
                        <NavigationMenuPrimitive.Link
                          onMouseEnter={() => {
                            setEnterHelp(true);
                          }}
                          onMouseLeave={() => {
                            setEnterHelp(false);
                          }}
                          className={cx(
                            'w-full px-4 py-2 hover:bg-gray-100 rounded-md hover:text-[#FF623DD]',
                            'focus:outline-none focus-visible:ring-0'
                          )}
                          href="/contact"
                        >
                          <div className="flex flex-row space-x-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="26"
                              height="26"
                              viewBox="0 0 26 26"
                            >
                              <path
                                fill={enterHelp ? '#FF623D' : 'black'}
                                d="M14.601 21.5c0 1.38-1.116 2.5-2.499 2.5-1.378 0-2.499-1.12-2.499-2.5s1.121-2.5 2.499-2.5c1.383 0 2.499 1.119 2.499 2.5zm-2.42-21.5c-4.029 0-7.06 2.693-7.06 8h3.955c0-2.304.906-4.189 3.024-4.189 1.247 0 2.57.828 2.684 2.411.123 1.666-.767 2.511-1.892 3.582-2.924 2.78-2.816 4.049-2.816 7.196h3.943c0-1.452-.157-2.508 1.838-4.659 1.331-1.436 2.986-3.222 3.021-5.943.047-3.963-2.751-6.398-6.697-6.398z"
                              />
                            </svg>
                            <p
                              className={
                                'silka-semibold my-auto text-lg ' +
                                (enterHelp ? 'text-[#FF623D]' : '')
                              }
                            >
                              Get Help
                            </p>
                          </div>
                        </NavigationMenuPrimitive.Link>
                        <NavigationMenuPrimitive.Link
                          onMouseEnter={() => {
                            setEnterContact(true);
                          }}
                          onMouseLeave={() => {
                            setEnterContact(false);
                          }}
                          className={cx(
                            'w-full px-4 py-2 hover:bg-gray-100 rounded-md hover:text-[#FF623DD]',
                            'focus:outline-none focus-visible:ring-0'
                          )}
                          href="/contact-sales"
                        >
                          <div className="flex flex-row space-x-4">
                            <svg
                              width="26"
                              height="26"
                              viewBox="0 0 26 26"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_11_119)">
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M2.80586 1.43217L5.88686 0L10.2646 8.54642L7.31361 10.0002C6.73077 11.3642 9.65252 16.8133 10.8854 16.9032C10.9829 16.8404 13.7789 15.4646 13.7789 15.4646L18.2314 24.0576C18.2314 24.0576 15.2371 25.5244 15.1396 25.5699C14.4918 25.8657 13.8234 26.0022 13.1441 26C7.02436 25.9794 0.0509399 14.7008 2.31938e-05 7.22583C-0.0173101 4.61825 0.807106 2.47325 2.80586 1.43217ZM4.89669 2.81233L3.78844 3.35833C-1.94673 6.3505 8.31352 26.3088 14.2404 23.6015L15.2934 23.088L12.8332 18.3398L11.7217 18.8825C8.29511 20.5584 2.77119 9.97858 6.24544 8.11633L7.33636 7.57683L4.89669 2.81233ZM21.6667 18.4167H20.5834V4.33333H21.6667V18.4167ZM19.5 16.25H18.4167V6.5H19.5V16.25ZM23.8334 15.1667H22.75V7.58333H23.8334V15.1667ZM17.3334 14.0833H16.25V8.66667H17.3334V14.0833ZM15.1667 13H14.0834V9.75H15.1667V13ZM26 13H24.9167V9.75H26V13ZM13 11.9167H11.9167V10.8333H13V11.9167Z"
                                  fill={
                                    enterContact ? '#FF623D' : 'black'
                                  }
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_11_119">
                                  <rect
                                    width="26"
                                    height="26"
                                    fill="white"
                                  />
                                </clipPath>
                              </defs>
                            </svg>

                            <p
                              className={
                                'silka-semibold my-auto text-lg ' +
                                (enterContact ? 'text-[#FF623D]' : '')
                              }
                            >
                              Contact Sales
                            </p>
                          </div>
                        </NavigationMenuPrimitive.Link>
                      </div>
                    </div>
                  </NavigationMenuPrimitive.Content>
                </NavigationMenuPrimitive.Item>

                <NavigationMenuPrimitive.Item asChild>
                  <NavigationMenuPrimitive.Link
                    href="/pricing"
                    className={cx(
                      'px-3 py-1.5 text-sm rounded-md hover:bg-gray-100',
                      'text-sm silka-medium text-gray-700'
                    )}
                  >
                    Pricing
                  </NavigationMenuPrimitive.Link>
                </NavigationMenuPrimitive.Item>

                <NavigationMenuPrimitive.Indicator
                  className={cx(
                    'z-10',
                    'top-[100%] flex items-end justify-center h-2 overflow-hidden',
                    'radix-state-visible:animate-fade-in',
                    'radix-state-hidden:animate-fade-out',
                    'transition-[width_transform] duration-[250ms] ease-[ease]'
                  )}
                >
                  <div className="top-1 relative bg-white w-2 h-2 rotate-45" />
                </NavigationMenuPrimitive.Indicator>
              </NavigationMenuPrimitive.List>

              <div
                className={cx(
                  'absolute flex justify-center',
                  'w-[140%] left-[-20%] top-[100%]'
                )}
                style={{
                  perspective: '2000px',
                }}
              >
                <NavigationMenuPrimitive.Viewport
                  className={cx(
                    'relative mt-2 shadow-lg rounded-md bg-white overflow-hidden',
                    'w-radix-navigation-menu-viewport',
                    'h-radix-navigation-menu-viewport',
                    'radix-state-open:animate-scale-in-content',
                    'radix-state-closed:animate-scale-out-content',
                    'origin-[top_center] transition-[width_height] duration-300 ease-[ease]'
                  )}
                />
              </div>
            </NavigationMenuPrimitive.Root>
          </div>
          <div className="flex flex-row space-x-3">
            <div className="px-3 py-1.5 hover:bg-gray-100 rounded-md">
              <Link href="/signin" className="text-sm silka-medium text-[#434343]">
                
                  Login
                
              </Link>
            </div>
            <Link href="/signup" legacyBehavior>
              <button className="bg-[#111111] h-fit px-5 py-1 my-auto rounded-lg hover:opacity-90">
                <a className="text-sm text-white silka-semibold">
                  Get Started
                </a>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
