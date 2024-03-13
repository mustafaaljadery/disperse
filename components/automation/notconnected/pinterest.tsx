import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { clsx } from 'clsx';
import axios from 'axios';
import axiosRetry from 'axios-retry';

import { apiUrl } from '../../../utils/apiUrl';

interface Props {
  workspaceId: string;
}

async function connectPinterest(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}automation/pinterest/auth`,
      {
        params: {
          workspaceId: workspaceId,
        },
      }
    );
    setTimeout(() => {
      window.open(
        result.data.url,
        '',
        'width=600,height=900,left=200,top=200'
      );
    });
  } catch (e) {
    console.log(e);
  }
}

async function checkConnection(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}automation/pinterest/auth/check`,
      {
        params: {
          workspaceId: workspaceId,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

export function PinterestNotConnected({ workspaceId }: Props) {
  const [hovered, setHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (connecting) {
      const testvalue = setInterval(() => {
        checkConnection(workspaceId).then((value) => {
          if (value.connected == true) {
            setConnecting(false);
            setConnected(true);
            setIsOpen(false);
            clearInterval(testvalue);
            window.location.href =
              '/' + workspaceId + '/automation/apps';
          }
        });
      }, 500);
    }
  }, [connecting]);

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <DialogPrimitive.Trigger asChild>
        <button
          onMouseEnter={() => {
            setHovered(true);
          }}
          onMouseLeave={() => {
            setHovered(false);
          }}
          className="border hover:border-[#FF623D] py-2.5 px-4 rounded flex flex-row justify-between items-between"
        >
          <div className="flex flex-row space-x-3">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="my-auto"
            >
              <g clipPath="url(#clip0_1151_2)">
                <path
                  d="M0 12.0002C0 16.914 2.95481 21.1354 7.18303 22.9913C7.14928 22.1534 7.17703 21.1475 7.39191 20.2358C7.62263 19.2616 8.93597 13.6969 8.93597 13.6969C8.93597 13.6969 8.55262 12.9307 8.55262 11.7982C8.55262 10.0199 9.58331 8.69175 10.8669 8.69175C11.9585 8.69175 12.4858 9.51159 12.4858 10.4933C12.4858 11.5906 11.786 13.2319 11.4261 14.752C11.1254 16.025 12.0643 17.0632 13.3201 17.0632C15.5937 17.0632 17.125 14.143 17.125 10.6831C17.125 8.05303 15.3536 6.08447 12.1317 6.08447C8.49159 6.08447 6.22388 8.79909 6.22388 11.8313C6.22388 12.8768 6.53212 13.6141 7.01494 14.185C7.23694 14.4473 7.26778 14.5527 7.18744 14.8538C7.12988 15.0746 6.99769 15.6062 6.94294 15.8168C6.86306 16.1208 6.61678 16.2294 6.34209 16.1172C4.66547 15.4328 3.88463 13.5967 3.88463 11.5327C3.88463 8.12381 6.75956 4.03631 12.4611 4.03631C17.0426 4.03631 20.0581 7.35169 20.0581 10.9105C20.0581 15.618 17.441 19.1348 13.5832 19.1348C12.2876 19.1348 11.069 18.4345 10.6515 17.6391C10.6515 17.6391 9.95484 20.4039 9.80728 20.9378C9.55284 21.8631 9.05484 22.7878 8.5995 23.5086C9.67875 23.8271 10.8188 24.0007 12.0005 24.0007C18.6271 24.0007 24.0001 18.6279 24.0001 12.0002C24.0001 5.37272 18.6271 0 12.0005 0C5.37319 0 0 5.37272 0 12.0002Z"
                  fill="#CB1F27"
                />
              </g>
              <defs>
                <clipPath id="clip0_1151_2">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <p className="text-sm silka-semibold text-gray-700 my-auto">
              Pinterest
            </p>
          </div>
          {hovered ? (
            <div className="py-1 px-2 text-[8px] silka-medium text-gray-600 rounded bg-gray-50">
              Connect
            </div>
          ) : (
            <></>
          )}
        </button>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal forceMount>
        <Transition.Root show={isOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogPrimitive.Overlay
              forceMount
              className="fixed inset-0 z-20 bg-black/50"
            />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPrimitive.Content
              forceMount
              className={clsx(
                'fixed z-50',
                'w-[95vw] max-w-md rounded-lg p-5 md:w-full',
                'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
                'bg-white',
                'focus:outline-none focus-visible:ring-0'
              )}
            >
              <div className="flex flex-col justify-center items-center">
                <h2 className="text-2xl silka-semibold text-gray-900">
                  Connect Pinterest
                </h2>
                <p className="mt-2 w-[90%] text-center text-xs silka-regular text-gray-400">
                  Follow the instructions below to connect your
                  Pinterest to Disperse.
                </p>
              </div>
              <div className="mt-4 flex flex-col">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="/guides/pinterest"
                >
                  <button className="flex flex-row space-x-3 p-4 border w-full rounded-lg border-gray-200 hover:bg-gray-50">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="my-auto"
                    >
                      <g clipPath="url(#clip0_1151_2)">
                        <path
                          d="M0 12.0002C0 16.914 2.95481 21.1354 7.18303 22.9913C7.14928 22.1534 7.17703 21.1475 7.39191 20.2358C7.62263 19.2616 8.93597 13.6969 8.93597 13.6969C8.93597 13.6969 8.55262 12.9307 8.55262 11.7982C8.55262 10.0199 9.58331 8.69175 10.8669 8.69175C11.9585 8.69175 12.4858 9.51159 12.4858 10.4933C12.4858 11.5906 11.786 13.2319 11.4261 14.752C11.1254 16.025 12.0643 17.0632 13.3201 17.0632C15.5937 17.0632 17.125 14.143 17.125 10.6831C17.125 8.05303 15.3536 6.08447 12.1317 6.08447C8.49159 6.08447 6.22388 8.79909 6.22388 11.8313C6.22388 12.8768 6.53212 13.6141 7.01494 14.185C7.23694 14.4473 7.26778 14.5527 7.18744 14.8538C7.12988 15.0746 6.99769 15.6062 6.94294 15.8168C6.86306 16.1208 6.61678 16.2294 6.34209 16.1172C4.66547 15.4328 3.88463 13.5967 3.88463 11.5327C3.88463 8.12381 6.75956 4.03631 12.4611 4.03631C17.0426 4.03631 20.0581 7.35169 20.0581 10.9105C20.0581 15.618 17.441 19.1348 13.5832 19.1348C12.2876 19.1348 11.069 18.4345 10.6515 17.6391C10.6515 17.6391 9.95484 20.4039 9.80728 20.9378C9.55284 21.8631 9.05484 22.7878 8.5995 23.5086C9.67875 23.8271 10.8188 24.0007 12.0005 24.0007C18.6271 24.0007 24.0001 18.6279 24.0001 12.0002C24.0001 5.37272 18.6271 0 12.0005 0C5.37319 0 0 5.37272 0 12.0002Z"
                          fill="#CB1F27"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1151_2">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <div className="my-auto flex flex-col justify-start items-start space-y-0.5">
                      <p className="text-xs silka-semibold text-gray-900">
                        Connect Pinterest Guide
                      </p>
                      <span className="text-[11px] silka-regular text-gray-400">
                        Follow the guide for the exact Pinterest
                        setup.
                      </span>
                    </div>
                  </button>
                </a>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setConnecting(true);
                    connectPinterest(workspaceId);
                  }}
                  disabled={connected}
                  className={
                    'py-2 w-full mt-4 bg-[#E60023] text-sm text-white silka-semibold rounded ' +
                    (connected ? 'opacity-60' : 'hover:opacity-80')
                  }
                >
                  {connected ? 'Connected' : 'Connect Pinterest'}
                </button>
                {connecting ? (
                  <div className="mt-4 flex flex-row space-x-2 justify-center items-center">
                    <div className="flex flex-row space-x-3">
                      <span className="animate-ping h-2.5 w-2.5 my-auto rounded-full bg-[#E60023] opacity-75"></span>
                      <p className="text-xs my-auto silka-medium text-gray-800">
                        Confirming Connection...
                      </p>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                {connected ? (
                  <div className="mt-4 flex flex-row space-x-2 justify-center items-center">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="my-auto"
                    >
                      <path
                        d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                        fill="#218B22"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <p className="silka-semibold text-[#218B22] text-sm my-auto">
                      Connected
                    </p>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </DialogPrimitive.Content>
          </Transition.Child>
        </Transition.Root>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
