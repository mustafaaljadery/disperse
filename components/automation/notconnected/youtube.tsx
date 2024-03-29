import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { clsx } from 'clsx';
import { useState, useEffect } from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../../utils/apiUrl';
import toast from 'react-hot-toast';
import { clear } from 'console';

interface Props {
  workspaceId: string;
}

async function connectYoutube(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(`${apiUrl()}youtube/auth`, {
      params: { workspaceId: workspaceId },
    });
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

    const result = await axios.get(`${apiUrl()}youtube/auth/check`, {
      params: {
        workspaceId: workspaceId,
      },
    });

    for (let value of result.data.errors) {
      toast.error(value.message, {
        className: 'text-sm silka-medium text-gray-900',
      });
    }
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

export function YoutubeNotConnected({ workspaceId }: Props) {
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
            toast.success('YouTube Connected!', {
              className: 'text-sm silka-medium text-gray-900',
            });
          }
        });
      }, 1500);
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
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="#FF0000"
                d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
              />
            </svg>
            <p className="text-sm silka-semibold text-gray-700 my-auto">
              Youtube
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
              <div className="flex flex-col w-full justify-start items-start">
                <div className="w-full flex flex-row justify-between items-between">
                  <h2 className="text-2xl silka-semibold text-gray-900">
                    Connect YouTube
                  </h2>
                  <DialogPrimitive.Close className="mt-0.5 mb-auto">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mb-auto hover:opacity-80"
                    >
                      <path
                        d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </DialogPrimitive.Close>
                </div>
                <p className="mt-2 w-[90%] text-start text-xs silka-regular text-gray-400">
                  Follow the instructions below to connect your
                  Youtube to Disperse.
                </p>
              </div>
              <div className="mt-6 flex flex-col">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="/guides/youtube"
                >
                  <button className="flex flex-row justify-between items-between p-4 border w-full rounded-lg border-gray-200 hover:bg-gray-50">
                    <div className="flex flex-row space-x-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className="my-auto"
                      >
                        <path
                          fill="#FF0000"
                          d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
                        />
                      </svg>
                      <div className="my-auto flex flex-col justify-start items-start space-y-0.5">
                        <p className="text-xs silka-semibold text-gray-900">
                          Connect YouTube Guide
                        </p>
                        <span className="text-[11px] silka-regular text-gray-400">
                          Follow the guide for the exact Youtube
                          setup.
                        </span>
                      </div>
                    </div>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="my-auto"
                    >
                      <path
                        d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
                        fill="#363636"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </a>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setConnecting(true);
                    connectYoutube(workspaceId);
                  }}
                  disabled={connected}
                  className={
                    'py-2 w-full mt-4 bg-[#FF0000] text-sm text-white silka-semibold rounded ' +
                    (connected ? 'opacity-60' : 'hover:opacity-80')
                  }
                >
                  {connected ? 'Connected' : 'Connect'}
                </button>
                {connecting ? (
                  <div className="mt-4 flex flex-row space-x-2 justify-center items-center">
                    <div className="flex flex-row space-x-3">
                      <span className="animate-ping h-2.5 w-2.5 my-auto rounded-full bg-[#FF0000] opacity-75"></span>
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
