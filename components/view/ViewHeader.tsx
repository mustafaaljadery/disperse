import { DisperseLogoTiny } from '../logos/DisperseLogo';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';
import Link from 'next/link';
import fileDownload from 'js-file-download';
import axios from 'axios';
import axiosRetry from 'axios-retry';

import { apiUrl } from '../../utils/apiUrl';

interface ViewHeaderProps {
  value: any;
  userInfo: any;
}

async function handleDownload(viewId: string, valueName: string) {
  try {
    const result = await axios.get(`${apiUrl()}view/read/googleurl`, {
      params: { viewId: viewId },
    });
    await axios
      .get(result.data.url, { responseType: 'blob' })
      .then((res) => {
        fileDownload(res.data, valueName);
      });
  } catch (e) {
    console.log(e);
  }
}

export function ViewHeader({ value, userInfo }: any) {
  return (
    <header className="flex h-[4.5vh] flex-row justify-between items-between">
      <div className="flex flex-row py-1 md:py-2 divide-x px-4">
        <Link href={'https://trydisperse.com'} legacyBehavior>
          <button className="flex flex-row space-x-2 my-auto pr-4">
            <DisperseLogoTiny />
            <p className="silka-bold text-sm md:text-base my-auto text-gray-800">
              Disperse
            </p>
          </button>
        </Link>
        <p className="my-auto text-xs hidden sm:flex silka-medium text-gray-800 pl-4">
          {value.file.filename.length > 42
            ? value.file.filename.slice(0, 42) + '...'
            : value.file.filename}
        </p>
        {value.allowDownload ? (
          <button
            onClick={() => {
              handleDownload(value.id, value.file.filename);
            }}
            className="ml-4 bg-[#FF623D] my-auto h-fit text-[10px] px-5 py-1 hover:opacity-90 rounded md:text-[11px] text-white"
          >
            Download
          </button>
        ) : (
          <></>
        )}
      </div>
      {userInfo ? (
        <div className="flex flex-row space-x-4 px-2 md:px-4">
          {value.allowDownloads ? <button></button> : <></>}
          <DropdownMenuPrimitive.Root>
            <DropdownMenuPrimitive.Trigger asChild>
              <button className="bg-gray-800 my-auto h-fit px-5 py-1 rounded text-[10px] md:text-[11px] text-white">
                Share
              </button>
            </DropdownMenuPrimitive.Trigger>
            <DropdownMenuPrimitive.Content
              align="end"
              sideOffset={5}
              className={cx(
                'radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
                'rounded-lg p-4 shadow-md w-64 md:w-96',
                'bg-white'
              )}
            >
              <div className="flex flex-col space-y-3.5">
                <div className="flex flex-row">
                  <input
                    type="text"
                    className="w-4/5 focus:ring-0 focus:border-[#FF623D] rounded-l text-xs silka-regular text-gray-900 bg-gray-50 border-gray-200"
                    value={'www.trydisperse.com/view/' + value.id}
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        'www.trydisperse.com/view/' + value.id
                      );
                    }}
                    className="w-1/5 border-l-0 hover:bg-gray-100 text-xs silka-medium text-gray-900 border rounded-r"
                  >
                    Copy
                  </button>
                </div>
                <div className="flex flex-col mt-4 space-y-1.5">
                  <a
                    href={`https://api.whatsapp.com/send?text=${
                      'https://trydisperse.com/view/' + value.id
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="w-full hover:bg-gray-100 p-1.5 rounded-lg flex flex-row space-x-2.5">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_832_2)">
                          <path
                            d="M17.7589 13.7909C17.7121 13.7685 15.9624 12.9069 15.6515 12.795C15.5246 12.7494 15.3886 12.7049 15.244 12.7049C15.0077 12.7049 14.8093 12.8227 14.6547 13.0539C14.4799 13.3137 13.9508 13.9322 13.7873 14.117C13.766 14.1413 13.7368 14.1705 13.7194 14.1705C13.7037 14.1705 13.4329 14.059 13.351 14.0234C11.4741 13.2081 10.0494 11.2475 9.85405 10.9169C9.82616 10.8693 9.82499 10.8477 9.82476 10.8477C9.83161 10.8226 9.89473 10.7593 9.9273 10.7266C10.0226 10.6324 10.1258 10.5081 10.2257 10.3878C10.273 10.3309 10.3204 10.2738 10.3669 10.2201C10.5119 10.0515 10.5764 9.92054 10.6512 9.76891L10.6904 9.69013C10.873 9.32724 10.717 9.02101 10.6666 8.92213C10.6252 8.83937 9.88647 7.05636 9.80792 6.86904C9.61904 6.41701 9.36946 6.20654 9.02263 6.20654C8.99044 6.20654 9.02263 6.20654 8.88766 6.21223C8.72333 6.21917 7.82839 6.33698 7.4327 6.58641C7.01309 6.85096 6.30322 7.69423 6.30322 9.17724C6.30322 10.512 7.15024 11.7722 7.5139 12.2515C7.52294 12.2636 7.53953 12.2881 7.56361 12.3233C8.95631 14.3573 10.6925 15.8646 12.4525 16.5677C14.1469 17.2445 14.9493 17.3227 15.4055 17.3227C15.4055 17.3227 15.4055 17.3227 15.4055 17.3227C15.5972 17.3227 15.7507 17.3077 15.886 17.2944L15.9719 17.2862C16.5572 17.2343 17.8436 16.5678 18.1362 15.7546C18.3667 15.1142 18.4274 14.4145 18.2741 14.1605C18.169 13.9878 17.988 13.901 17.7589 13.7909Z"
                            fill="#1CD741"
                          />
                          <path
                            d="M12.213 0C5.71307 0 0.424969 5.24836 0.424969 11.6995C0.424969 13.786 0.983358 15.8284 2.04115 17.6159L0.0165014 23.5883C-0.0212129 23.6996 0.00683904 23.8227 0.0892027 23.9066C0.148657 23.9673 0.229307 24 0.31167 24C0.343229 24 0.375021 23.9952 0.406034 23.9854L6.63357 22.0064C8.33772 22.917 10.2638 23.3976 12.2131 23.3976C18.7124 23.3977 24 18.1498 24 11.6995C24 5.24836 18.7124 0 12.213 0ZM12.213 20.9606C10.3788 20.9606 8.60227 20.4309 7.07515 19.4289C7.0238 19.3951 6.96419 19.3778 6.90419 19.3778C6.87248 19.3778 6.84068 19.3826 6.80975 19.3925L3.69014 20.3841L4.6972 17.413C4.72977 17.3169 4.71349 17.2108 4.65349 17.1288C3.49058 15.5398 2.87585 13.6625 2.87585 11.6995C2.87585 6.59221 7.06448 2.43709 12.2129 2.43709C17.3608 2.43709 21.5489 6.59221 21.5489 11.6995C21.549 16.8061 17.3609 20.9606 12.213 20.9606Z"
                            fill="#1CD741"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_832_2">
                            <rect
                              width="24"
                              height="24"
                              fill="white"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                      <p className="silka-medium text-sm my-auto text-gray-900">
                        Whatsapp
                      </p>
                    </button>
                  </a>
                  <a
                    className="w-full"
                    href={`https://t.me/share/url?url=${
                      'https://trydisperse.com/view/' + value.id
                    }`}
                    target="blank"
                    rel="noopener noreferrer"
                  >
                    <button className="w-full hover:bg-gray-100 p-1.5 rounded-lg flex flex-row space-x-2.5">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 240 240"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_828_2)">
                          <path
                            d="M120 240C186.274 240 240 186.274 240 120C240 53.7258 186.274 0 120 0C53.7258 0 0 53.7258 0 120C0 186.274 53.7258 240 120 240Z"
                            fill="url(#paint0_linear_828_2)"
                          />
                          <path
                            d="M81.229 128.772L95.466 168.178C95.466 168.178 97.246 171.865 99.152 171.865C101.058 171.865 129.407 142.373 129.407 142.373L160.932 81.4834L81.737 118.6L81.229 128.772Z"
                            fill="#C8DAEA"
                          />
                          <path
                            d="M100.106 138.878L97.3731 167.924C97.3731 167.924 96.2291 176.824 105.127 167.924C114.025 159.024 122.542 152.161 122.542 152.161"
                            fill="#A9C6D8"
                          />
                          <path
                            d="M81.4861 130.178L52.2001 120.636C52.2001 120.636 48.7001 119.216 49.8271 115.996C50.0591 115.332 50.5271 114.767 51.9271 113.796C58.4161 109.273 172.033 68.4359 172.033 68.4359C172.033 68.4359 175.241 67.3549 177.133 68.0739C177.601 68.2188 178.022 68.4854 178.354 68.8465C178.685 69.2076 178.914 69.6501 179.018 70.1289C179.223 70.9746 179.308 71.8446 179.272 72.7139C179.263 73.4659 179.172 74.1629 179.103 75.2559C178.411 86.4209 157.703 169.749 157.703 169.749C157.703 169.749 156.464 174.625 152.025 174.792C150.934 174.827 149.847 174.642 148.829 174.249C147.812 173.855 146.883 173.26 146.1 172.5C137.389 165.007 107.281 144.773 100.628 140.323C100.478 140.221 100.352 140.087 100.257 139.932C100.163 139.777 100.103 139.603 100.082 139.423C99.9891 138.954 100.499 138.373 100.499 138.373C100.499 138.373 152.925 91.7729 154.32 86.8809C154.428 86.5019 154.02 86.3149 153.472 86.4809C149.99 87.7619 89.6281 125.881 82.9661 130.088C82.4866 130.233 81.9797 130.264 81.4861 130.178V130.178Z"
                            fill="white"
                          />
                        </g>
                        <defs>
                          <linearGradient
                            id="paint0_linear_828_2"
                            x1="120"
                            y1="240"
                            x2="120"
                            y2="0"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#1D93D2" />
                            <stop offset="1" stop-color="#38B0E3" />
                          </linearGradient>
                          <clipPath id="clip0_828_2">
                            <rect
                              width="240"
                              height="240"
                              fill="white"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                      <p className="silka-medium text-sm my-auto text-gray-900">
                        Telegram
                      </p>
                    </button>
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Ftrydisperse.com%2Fview%2F${value.id}&amp;src=sdkpreparse`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="w-full hover:bg-gray-100 p-1.5 rounded-lg flex flex-row space-x-2.5">
                      <div className="h-[24px] w-[24px] flex flex-col justify-center items-center">
                        <svg
                          width="12"
                          height="24"
                          viewBox="0 0 12 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3 8H0V12H3V24H8V12H11.642L12 8H8V6.333C8 5.378 8.192 5 9.115 5H12V0H8.192C4.596 0 3 1.583 3 4.615V8Z"
                            fill="#0674E8"
                          />
                        </svg>
                      </div>
                      <p className="silka-medium text-sm my-auto text-gray-900">
                        Facebook
                      </p>
                    </button>
                  </a>
                  <a
                    href={`https://reddit.com/submit?url=${
                      'https://trydisperse.com/view/' + value.id
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="w-full hover:bg-gray-100 p-1.5 rounded-lg flex flex-row space-x-2.5">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_829_2)">
                          <path
                            d="M14.238 15.348C14.323 15.432 14.323 15.569 14.238 15.654C13.773 16.116 13.044 16.341 12.007 16.341L11.999 16.339L11.991 16.341C10.955 16.341 10.225 16.116 9.76 15.653C9.675 15.569 9.675 15.432 9.76 15.348C9.844 15.264 9.982 15.264 10.067 15.348C10.446 15.725 11.075 15.909 11.991 15.909L11.999 15.911L12.007 15.909C12.922 15.909 13.551 15.725 13.931 15.348C14.016 15.264 14.154 15.264 14.238 15.348ZM10.798 12.93C10.798 12.423 10.384 12.011 9.876 12.011C9.367 12.011 8.953 12.423 8.953 12.93C8.953 13.436 9.367 13.848 9.876 13.848C10.384 13.849 10.798 13.437 10.798 12.93ZM24 12C24 18.627 18.627 24 12 24C5.373 24 0 18.627 0 12C0 5.373 5.373 0 12 0C18.627 0 24 5.373 24 12ZM19 11.871C19 11.02 18.305 10.328 17.45 10.328C17.033 10.328 16.655 10.495 16.376 10.763C15.32 10.068 13.891 9.626 12.31 9.569L13.175 6.845L15.518 7.394L15.515 7.428C15.515 8.124 16.084 8.69 16.783 8.69C17.482 8.69 18.05 8.124 18.05 7.428C18.05 6.732 17.482 6.166 16.783 6.166C16.246 6.166 15.789 6.501 15.604 6.97L13.079 6.378C12.969 6.351 12.856 6.415 12.822 6.523L11.857 9.561C10.201 9.581 8.702 10.027 7.599 10.742C7.322 10.487 6.955 10.327 6.549 10.327C5.695 10.328 5 11.02 5 11.871C5 12.437 5.311 12.927 5.768 13.196C5.738 13.36 5.718 13.527 5.718 13.696C5.718 15.977 8.523 17.833 11.971 17.833C15.419 17.833 18.224 15.977 18.224 13.696C18.224 13.536 18.207 13.379 18.18 13.224C18.666 12.963 19 12.458 19 11.871V11.871ZM14.128 12.012C13.619 12.012 13.206 12.424 13.206 12.931C13.206 13.437 13.62 13.849 14.128 13.849C14.636 13.849 15.05 13.437 15.05 12.931C15.05 12.424 14.637 12.012 14.128 12.012Z"
                            fill="#FF4500"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_829_2">
                            <rect
                              width="24"
                              height="24"
                              fill="white"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                      <p className="silka-medium text-sm my-auto text-gray-900">
                        Reddit
                      </p>
                    </button>
                  </a>
                  <a
                    href={
                      'https://twitter.com/intent/tweet?text=https://trydisperse.com/view/' +
                      value.id
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="w-full hover:bg-gray-100 p-1.5 rounded-lg flex flex-row space-x-2.5">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_833_2)">
                          <path
                            d="M12 0C5.373 0 0 5.373 0 12C0 18.627 5.373 24 12 24C18.627 24 24 18.627 24 12C24 5.373 18.627 0 12 0ZM18.066 9.645C18.249 13.685 15.236 18.189 9.902 18.189C8.28 18.189 6.771 17.713 5.5 16.898C7.024 17.078 8.545 16.654 9.752 15.709C8.496 15.686 7.435 14.855 7.068 13.714C7.519 13.8 7.963 13.775 8.366 13.665C6.985 13.387 6.031 12.143 6.062 10.812C6.45 11.027 6.892 11.156 7.363 11.171C6.084 10.316 5.722 8.627 6.474 7.336C7.89 9.074 10.007 10.217 12.394 10.337C11.975 8.541 13.338 6.81 15.193 6.81C16.018 6.81 16.765 7.159 17.289 7.717C17.943 7.589 18.559 7.349 19.113 7.02C18.898 7.691 18.443 8.253 17.85 8.609C18.431 8.539 18.985 8.385 19.499 8.156C19.115 8.734 18.629 9.24 18.066 9.645V9.645Z"
                            fill="#1D9BF0"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_833_2">
                            <rect
                              width="24"
                              height="24"
                              fill="white"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                      <p className="silka-medium text-sm my-auto text-gray-900">
                        Twitter
                      </p>
                    </button>
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${
                      'https://trydisperse.com/view/' + value.id
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="w-full hover:bg-gray-100 p-1.5 rounded-lg flex flex-row space-x-2.5">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.98 2.5C4.98 3.881 3.87 5 2.5 5C1.13 5 0.02 3.881 0.02 2.5C0.02 1.12 1.13 0 2.5 0C3.87 0 4.98 1.12 4.98 2.5ZM5 7H0V23H5V7ZM12.982 7H8.014V23H12.983V14.601C12.983 9.931 19.012 9.549 19.012 14.601V23H24V12.869C24 4.989 15.078 5.276 12.982 9.155V7Z"
                          fill="#0966C2"
                        />
                      </svg>
                      <p className="silka-medium text-sm my-auto text-gray-900">
                        Linkedin
                      </p>
                    </button>
                  </a>
                </div>
              </div>
            </DropdownMenuPrimitive.Content>
          </DropdownMenuPrimitive.Root>
          <DropdownMenuPrimitive.Root>
            <DropdownMenuPrimitive.Trigger asChild>
              <button className="my-auto hidden md:flex">
                <img
                  className="my-auto rounded-full"
                  height={30}
                  width={30}
                  src={userInfo.image}
                />
              </button>
            </DropdownMenuPrimitive.Trigger>
            <DropdownMenuPrimitive.Content
              align="end"
              sideOffset={4}
              className={cx(
                'radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
                'rounded-lg px-2 py-4 shadow-md md:w-56',
                'bg-white'
              )}
            >
              <div className="w-full flex flex-row space-x-3">
                <img
                  className="my-auto rounded-full"
                  width={28}
                  height={28}
                  src={userInfo.image}
                />
                <div className="flex-1 flex flex-col space-y-0.5">
                  <p className="text-sm silka-medium text-gray-900">
                    {userInfo.name}
                  </p>
                  <span className="silka-regular text-xs text-gray-500">
                    {userInfo.email}
                  </span>
                </div>
              </div>
            </DropdownMenuPrimitive.Content>
          </DropdownMenuPrimitive.Root>
        </div>
      ) : (
        <div className="flex flex-row space-x-4 px-2 md:px-4">
          <DropdownMenuPrimitive.Root>
            <DropdownMenuPrimitive.Trigger asChild>
              <button className="bg-gray-800 my-auto h-fit px-5 py-1 rounded text-[10px] md:text-[11px] text-white">
                Share
              </button>
            </DropdownMenuPrimitive.Trigger>
            <DropdownMenuPrimitive.Content
              align="end"
              sideOffset={4}
              className={cx(
                'radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
                'rounded-lg p-4 shadow-md w-64 md:w-96',
                'bg-white'
              )}
            >
              <div className="flex flex-col space-y-3.5">
                <div className="flex flex-row">
                  <input
                    type="text"
                    className="w-4/5 focus:ring-0 focus:border-[#FF623D] rounded-l text-xs silka-regular text-gray-900 bg-gray-50 border-gray-200"
                    value={'www.trydisperse.com/view/' + value.id}
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        'www.trydisperse.com/view/' + value.id
                      );
                    }}
                    className="w-1/5 border-l-0 hover:bg-gray-100 text-xs silka-medium text-gray-900 border rounded-r"
                  >
                    Copy
                  </button>
                </div>
                <div className="flex flex-col mt-4 space-y-1.5">
                  <a
                    href={`https://api.whatsapp.com/send?text=${
                      'https://trydisperse.com/view/' + value.id
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="w-full hover:bg-gray-100 p-1.5 rounded-lg flex flex-row space-x-2.5">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_832_2)">
                          <path
                            d="M17.7589 13.7909C17.7121 13.7685 15.9624 12.9069 15.6515 12.795C15.5246 12.7494 15.3886 12.7049 15.244 12.7049C15.0077 12.7049 14.8093 12.8227 14.6547 13.0539C14.4799 13.3137 13.9508 13.9322 13.7873 14.117C13.766 14.1413 13.7368 14.1705 13.7194 14.1705C13.7037 14.1705 13.4329 14.059 13.351 14.0234C11.4741 13.2081 10.0494 11.2475 9.85405 10.9169C9.82616 10.8693 9.82499 10.8477 9.82476 10.8477C9.83161 10.8226 9.89473 10.7593 9.9273 10.7266C10.0226 10.6324 10.1258 10.5081 10.2257 10.3878C10.273 10.3309 10.3204 10.2738 10.3669 10.2201C10.5119 10.0515 10.5764 9.92054 10.6512 9.76891L10.6904 9.69013C10.873 9.32724 10.717 9.02101 10.6666 8.92213C10.6252 8.83937 9.88647 7.05636 9.80792 6.86904C9.61904 6.41701 9.36946 6.20654 9.02263 6.20654C8.99044 6.20654 9.02263 6.20654 8.88766 6.21223C8.72333 6.21917 7.82839 6.33698 7.4327 6.58641C7.01309 6.85096 6.30322 7.69423 6.30322 9.17724C6.30322 10.512 7.15024 11.7722 7.5139 12.2515C7.52294 12.2636 7.53953 12.2881 7.56361 12.3233C8.95631 14.3573 10.6925 15.8646 12.4525 16.5677C14.1469 17.2445 14.9493 17.3227 15.4055 17.3227C15.4055 17.3227 15.4055 17.3227 15.4055 17.3227C15.5972 17.3227 15.7507 17.3077 15.886 17.2944L15.9719 17.2862C16.5572 17.2343 17.8436 16.5678 18.1362 15.7546C18.3667 15.1142 18.4274 14.4145 18.2741 14.1605C18.169 13.9878 17.988 13.901 17.7589 13.7909Z"
                            fill="#1CD741"
                          />
                          <path
                            d="M12.213 0C5.71307 0 0.424969 5.24836 0.424969 11.6995C0.424969 13.786 0.983358 15.8284 2.04115 17.6159L0.0165014 23.5883C-0.0212129 23.6996 0.00683904 23.8227 0.0892027 23.9066C0.148657 23.9673 0.229307 24 0.31167 24C0.343229 24 0.375021 23.9952 0.406034 23.9854L6.63357 22.0064C8.33772 22.917 10.2638 23.3976 12.2131 23.3976C18.7124 23.3977 24 18.1498 24 11.6995C24 5.24836 18.7124 0 12.213 0ZM12.213 20.9606C10.3788 20.9606 8.60227 20.4309 7.07515 19.4289C7.0238 19.3951 6.96419 19.3778 6.90419 19.3778C6.87248 19.3778 6.84068 19.3826 6.80975 19.3925L3.69014 20.3841L4.6972 17.413C4.72977 17.3169 4.71349 17.2108 4.65349 17.1288C3.49058 15.5398 2.87585 13.6625 2.87585 11.6995C2.87585 6.59221 7.06448 2.43709 12.2129 2.43709C17.3608 2.43709 21.5489 6.59221 21.5489 11.6995C21.549 16.8061 17.3609 20.9606 12.213 20.9606Z"
                            fill="#1CD741"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_832_2">
                            <rect
                              width="24"
                              height="24"
                              fill="white"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                      <p className="silka-medium text-sm my-auto text-gray-900">
                        Whatsapp
                      </p>
                    </button>
                  </a>
                  <a
                    className="w-full"
                    href={`https://t.me/share/url?url=${
                      'https://trydisperse.com/view/' + value.id
                    }`}
                    target="blank"
                    rel="noopener noreferrer"
                  >
                    <button className="w-full hover:bg-gray-100 p-1.5 rounded-lg flex flex-row space-x-2.5">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 240 240"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_828_2)">
                          <path
                            d="M120 240C186.274 240 240 186.274 240 120C240 53.7258 186.274 0 120 0C53.7258 0 0 53.7258 0 120C0 186.274 53.7258 240 120 240Z"
                            fill="url(#paint0_linear_828_2)"
                          />
                          <path
                            d="M81.229 128.772L95.466 168.178C95.466 168.178 97.246 171.865 99.152 171.865C101.058 171.865 129.407 142.373 129.407 142.373L160.932 81.4834L81.737 118.6L81.229 128.772Z"
                            fill="#C8DAEA"
                          />
                          <path
                            d="M100.106 138.878L97.3731 167.924C97.3731 167.924 96.2291 176.824 105.127 167.924C114.025 159.024 122.542 152.161 122.542 152.161"
                            fill="#A9C6D8"
                          />
                          <path
                            d="M81.4861 130.178L52.2001 120.636C52.2001 120.636 48.7001 119.216 49.8271 115.996C50.0591 115.332 50.5271 114.767 51.9271 113.796C58.4161 109.273 172.033 68.4359 172.033 68.4359C172.033 68.4359 175.241 67.3549 177.133 68.0739C177.601 68.2188 178.022 68.4854 178.354 68.8465C178.685 69.2076 178.914 69.6501 179.018 70.1289C179.223 70.9746 179.308 71.8446 179.272 72.7139C179.263 73.4659 179.172 74.1629 179.103 75.2559C178.411 86.4209 157.703 169.749 157.703 169.749C157.703 169.749 156.464 174.625 152.025 174.792C150.934 174.827 149.847 174.642 148.829 174.249C147.812 173.855 146.883 173.26 146.1 172.5C137.389 165.007 107.281 144.773 100.628 140.323C100.478 140.221 100.352 140.087 100.257 139.932C100.163 139.777 100.103 139.603 100.082 139.423C99.9891 138.954 100.499 138.373 100.499 138.373C100.499 138.373 152.925 91.7729 154.32 86.8809C154.428 86.5019 154.02 86.3149 153.472 86.4809C149.99 87.7619 89.6281 125.881 82.9661 130.088C82.4866 130.233 81.9797 130.264 81.4861 130.178V130.178Z"
                            fill="white"
                          />
                        </g>
                        <defs>
                          <linearGradient
                            id="paint0_linear_828_2"
                            x1="120"
                            y1="240"
                            x2="120"
                            y2="0"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#1D93D2" />
                            <stop offset="1" stop-color="#38B0E3" />
                          </linearGradient>
                          <clipPath id="clip0_828_2">
                            <rect
                              width="240"
                              height="240"
                              fill="white"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                      <p className="silka-medium text-sm my-auto text-gray-900">
                        Telegram
                      </p>
                    </button>
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Ftrydisperse.com%2Fview%2F${value.id}&amp;src=sdkpreparse`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="w-full hover:bg-gray-100 p-1.5 rounded-lg flex flex-row space-x-2.5">
                      <div className="h-[24px] w-[24px] flex flex-col justify-center items-center">
                        <svg
                          width="12"
                          height="24"
                          viewBox="0 0 12 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3 8H0V12H3V24H8V12H11.642L12 8H8V6.333C8 5.378 8.192 5 9.115 5H12V0H8.192C4.596 0 3 1.583 3 4.615V8Z"
                            fill="#0674E8"
                          />
                        </svg>
                      </div>
                      <p className="silka-medium text-sm my-auto text-gray-900">
                        Facebook
                      </p>
                    </button>
                  </a>
                  <a
                    href={`https://reddit.com/submit?url=${
                      'https://trydisperse.com/view/' + value.id
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="w-full hover:bg-gray-100 p-1.5 rounded-lg flex flex-row space-x-2.5">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_829_2)">
                          <path
                            d="M14.238 15.348C14.323 15.432 14.323 15.569 14.238 15.654C13.773 16.116 13.044 16.341 12.007 16.341L11.999 16.339L11.991 16.341C10.955 16.341 10.225 16.116 9.76 15.653C9.675 15.569 9.675 15.432 9.76 15.348C9.844 15.264 9.982 15.264 10.067 15.348C10.446 15.725 11.075 15.909 11.991 15.909L11.999 15.911L12.007 15.909C12.922 15.909 13.551 15.725 13.931 15.348C14.016 15.264 14.154 15.264 14.238 15.348ZM10.798 12.93C10.798 12.423 10.384 12.011 9.876 12.011C9.367 12.011 8.953 12.423 8.953 12.93C8.953 13.436 9.367 13.848 9.876 13.848C10.384 13.849 10.798 13.437 10.798 12.93ZM24 12C24 18.627 18.627 24 12 24C5.373 24 0 18.627 0 12C0 5.373 5.373 0 12 0C18.627 0 24 5.373 24 12ZM19 11.871C19 11.02 18.305 10.328 17.45 10.328C17.033 10.328 16.655 10.495 16.376 10.763C15.32 10.068 13.891 9.626 12.31 9.569L13.175 6.845L15.518 7.394L15.515 7.428C15.515 8.124 16.084 8.69 16.783 8.69C17.482 8.69 18.05 8.124 18.05 7.428C18.05 6.732 17.482 6.166 16.783 6.166C16.246 6.166 15.789 6.501 15.604 6.97L13.079 6.378C12.969 6.351 12.856 6.415 12.822 6.523L11.857 9.561C10.201 9.581 8.702 10.027 7.599 10.742C7.322 10.487 6.955 10.327 6.549 10.327C5.695 10.328 5 11.02 5 11.871C5 12.437 5.311 12.927 5.768 13.196C5.738 13.36 5.718 13.527 5.718 13.696C5.718 15.977 8.523 17.833 11.971 17.833C15.419 17.833 18.224 15.977 18.224 13.696C18.224 13.536 18.207 13.379 18.18 13.224C18.666 12.963 19 12.458 19 11.871V11.871ZM14.128 12.012C13.619 12.012 13.206 12.424 13.206 12.931C13.206 13.437 13.62 13.849 14.128 13.849C14.636 13.849 15.05 13.437 15.05 12.931C15.05 12.424 14.637 12.012 14.128 12.012Z"
                            fill="#FF4500"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_829_2">
                            <rect
                              width="24"
                              height="24"
                              fill="white"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                      <p className="silka-medium text-sm my-auto text-gray-900">
                        Reddit
                      </p>
                    </button>
                  </a>
                  <a
                    href={
                      'https://twitter.com/intent/tweet?text=https://trydisperse.com/view/' +
                      value.id
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="w-full hover:bg-gray-100 p-1.5 rounded-lg flex flex-row space-x-2.5">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_833_2)">
                          <path
                            d="M12 0C5.373 0 0 5.373 0 12C0 18.627 5.373 24 12 24C18.627 24 24 18.627 24 12C24 5.373 18.627 0 12 0ZM18.066 9.645C18.249 13.685 15.236 18.189 9.902 18.189C8.28 18.189 6.771 17.713 5.5 16.898C7.024 17.078 8.545 16.654 9.752 15.709C8.496 15.686 7.435 14.855 7.068 13.714C7.519 13.8 7.963 13.775 8.366 13.665C6.985 13.387 6.031 12.143 6.062 10.812C6.45 11.027 6.892 11.156 7.363 11.171C6.084 10.316 5.722 8.627 6.474 7.336C7.89 9.074 10.007 10.217 12.394 10.337C11.975 8.541 13.338 6.81 15.193 6.81C16.018 6.81 16.765 7.159 17.289 7.717C17.943 7.589 18.559 7.349 19.113 7.02C18.898 7.691 18.443 8.253 17.85 8.609C18.431 8.539 18.985 8.385 19.499 8.156C19.115 8.734 18.629 9.24 18.066 9.645V9.645Z"
                            fill="#1D9BF0"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_833_2">
                            <rect
                              width="24"
                              height="24"
                              fill="white"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                      <p className="silka-medium text-sm my-auto text-gray-900">
                        Twitter
                      </p>
                    </button>
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${
                      'https://trydisperse.com/view/' + value.id
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="w-full hover:bg-gray-100 p-1.5 rounded-lg flex flex-row space-x-2.5">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.98 2.5C4.98 3.881 3.87 5 2.5 5C1.13 5 0.02 3.881 0.02 2.5C0.02 1.12 1.13 0 2.5 0C3.87 0 4.98 1.12 4.98 2.5ZM5 7H0V23H5V7ZM12.982 7H8.014V23H12.983V14.601C12.983 9.931 19.012 9.549 19.012 14.601V23H24V12.869C24 4.989 15.078 5.276 12.982 9.155V7Z"
                          fill="#0966C2"
                        />
                      </svg>
                      <p className="silka-medium text-sm my-auto text-gray-900">
                        Linkedin
                      </p>
                    </button>
                  </a>
                </div>
              </div>
            </DropdownMenuPrimitive.Content>
          </DropdownMenuPrimitive.Root>
          <Link href={'/signin'} legacyBehavior>
            <button className="text-[11px] hidden md:flex px-4 py-1 h-fit my-auto hover:bg-gray-50 rounded-sm border text-gray-900 silka-medium">
              Sign In
            </button>
          </Link>
          <Link href={'/signup'} legacyBehavior>
            <button className="text-[11px] hidden md:flex px-4 py-1 h-fit my-auto hover:opacity-90 rounded-sm text-white silka-medium bg-[#FF623D]">
              Use Disperse Free
            </button>
          </Link>
        </div>
      )}
    </header>
  );
}
