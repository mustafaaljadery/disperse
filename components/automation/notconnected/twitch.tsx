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

async function connectTwitch(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}automation/twitch/auth`,
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
      `${apiUrl()}automation/twitch/auth/check`,
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

export function TwitchNotConnected({ workspaceId }: Props) {
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
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="my-auto"
            >
              <g clipPath="url(#clip0_1142_2)">
                <path
                  d="M1.30283 0L0 3.47432V17.3699H4.77482V19.9769H7.38168L9.98594 17.3699H13.8934L19.1045 12.1608V0H1.30283ZM3.03856 1.73606H17.368V11.2904L14.3278 14.3309H9.55224L6.94871 16.9342V14.3309H3.03856V1.73606ZM7.8153 10.423H9.55223V5.21223H7.8153V10.423ZM12.5912 10.423H14.3278V5.21223H12.5912V10.423Z"
                  fill="#5A3E85"
                />
              </g>
              <defs>
                <clipPath id="clip0_1142_2">
                  <rect width="19.1045" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <p className="text-sm silka-semibold text-gray-700 my-auto">
              Twitch
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
                  Connect Twitch
                </h2>
                <p className="mt-2 w-[90%] text-center text-xs silka-regular text-gray-400">
                  Follow the instructions below to connect your Twitch
                  to Disperse.
                </p>
              </div>
              <div className="mt-4 flex flex-col">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="/guides/twitch"
                >
                  <button className="flex flex-row space-x-3 p-4 border w-full rounded-lg border-gray-200 hover:bg-gray-50">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="my-auto"
                    >
                      <g clipPath="url(#clip0_1142_2)">
                        <path
                          d="M1.30283 0L0 3.47432V17.3699H4.77482V19.9769H7.38168L9.98594 17.3699H13.8934L19.1045 12.1608V0H1.30283ZM3.03856 1.73606H17.368V11.2904L14.3278 14.3309H9.55224L6.94871 16.9342V14.3309H3.03856V1.73606ZM7.8153 10.423H9.55223V5.21223H7.8153V10.423ZM12.5912 10.423H14.3278V5.21223H12.5912V10.423Z"
                          fill="#5A3E85"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1142_2">
                          <rect
                            width="19.1045"
                            height="20"
                            fill="white"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    <div className="my-auto flex flex-col justify-start items-start space-y-0.5">
                      <p className="text-xs silka-semibold text-gray-900">
                        Connect Twitch Guide
                      </p>
                      <span className="text-[11px] silka-regular text-gray-400">
                        Follow the guide for the exact Twitch setup.
                      </span>
                    </div>
                  </button>
                </a>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setConnecting(true);
                    connectTwitch(workspaceId);
                  }}
                  disabled={connected}
                  className={
                    'py-2 w-full mt-4 bg-[#9146FF] text-sm text-white silka-semibold rounded ' +
                    (connected ? 'opacity-60' : 'hover:opacity-80')
                  }
                >
                  {connected ? 'Connected' : 'Connect Twitch'}
                </button>
                {connecting ? (
                  <div className="mt-4 flex flex-row space-x-2 justify-center items-center">
                    <div className="flex flex-row space-x-3">
                      <span className="animate-ping h-2.5 w-2.5 my-auto rounded-full bg-[#9146FF] opacity-75"></span>
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
