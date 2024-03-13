import {
  Fragment,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Transition } from '@headlessui/react';
import { clsx } from 'clsx';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../../utils/apiUrl';
import toast from 'react-hot-toast';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  workspaceId: string;
  setRefetchConnected: Dispatch<SetStateAction<boolean>>;
}

async function connectSlack(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}automation/slack/auth`,
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
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function checkConnection(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}automation/slack/auth/check`,
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

export function AutoamtionConnectSlack({
  isOpen,
  setIsOpen,
  workspaceId,
  setRefetchConnected,
}: Props) {
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (connecting) {
      const testvalue = setInterval(() => {
        checkConnection(workspaceId).then((value) => {
          if (value.connected == true) {
            setRefetchConnected(true);
            setConnecting(false);
            setConnected(true);
            setIsOpen(false);
            clearInterval(testvalue);
            toast.success('Successfully Connected Slack!', {
              className: 'text-sm silka-medium text-gray-900',
            });
          }
        });
      }, 500);
    }
  }, [connecting]);

  return (
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
                Connect Slack
              </h2>
              <p className="mt-2 w-[90%] text-center text-xs silka-regular text-gray-400">
                Follow the instructions below to connect your Slack to
                Disperse.
              </p>
            </div>
            <div className="mt-4 flex flex-col">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="/guides/slack"
              >
                <button className="flex flex-row space-x-3 p-4 border w-full rounded-lg border-gray-200 hover:bg-gray-50">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="my-auto"
                  >
                    <g clipPath="url(#clip0_785_2)">
                      <path
                        d="M3.42657 10.0785C3.42657 10.9982 2.68326 11.7415 1.76358 11.7415C0.843893 11.7415 0.100586 10.9982 0.100586 10.0785C0.100586 9.15883 0.843893 8.41553 1.76358 8.41553H3.42657V10.0785ZM4.25807 10.0785C4.25807 9.15883 5.00137 8.41553 5.92106 8.41553C6.84074 8.41553 7.58405 9.15883 7.58405 10.0785V14.236C7.58405 15.1557 6.84074 15.899 5.92106 15.899C5.00137 15.899 4.25807 15.1557 4.25807 14.236V10.0785Z"
                        fill="#E01E5A"
                      />
                      <path
                        d="M5.92145 3.40167C5.00176 3.40167 4.25846 2.65836 4.25846 1.73868C4.25846 0.818991 5.00176 0.0756836 5.92145 0.0756836C6.84113 0.0756836 7.58444 0.818991 7.58444 1.73868V3.40167H5.92145ZM5.92145 4.24576C6.84113 4.24576 7.58444 4.98907 7.58444 5.90875C7.58444 6.82844 6.84113 7.57175 5.92145 7.57175H1.75137C0.831686 7.57175 0.0883789 6.82844 0.0883789 5.90875C0.0883789 4.98907 0.831686 4.24576 1.75137 4.24576H5.92145Z"
                        fill="#36C5F0"
                      />
                      <path
                        d="M12.5857 5.90875C12.5857 4.98907 13.329 4.24576 14.2487 4.24576C15.1684 4.24576 15.9117 4.98907 15.9117 5.90875C15.9117 6.82844 15.1684 7.57175 14.2487 7.57175H12.5857V5.90875ZM11.7542 5.90875C11.7542 6.82844 11.0109 7.57175 10.0912 7.57175C9.17153 7.57175 8.42822 6.82844 8.42822 5.90875V1.73868C8.42822 0.818991 9.17153 0.0756836 10.0912 0.0756836C11.0109 0.0756836 11.7542 0.818991 11.7542 1.73868V5.90875V5.90875Z"
                        fill="#2EB67D"
                      />
                      <path
                        d="M10.0912 12.573C11.0109 12.573 11.7542 13.3163 11.7542 14.236C11.7542 15.1557 11.0109 15.899 10.0912 15.899C9.17153 15.899 8.42822 15.1557 8.42822 14.236V12.573H10.0912ZM10.0912 11.7415C9.17153 11.7415 8.42822 10.9982 8.42822 10.0785C8.42822 9.15883 9.17153 8.41553 10.0912 8.41553H14.2613C15.181 8.41553 15.9243 9.15883 15.9243 10.0785C15.9243 10.9982 15.181 11.7415 14.2613 11.7415H10.0912Z"
                        fill="#ECB22E"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_785_2">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="my-auto flex flex-col justify-start items-start space-y-0.5">
                    <p className="text-xs silka-semibold text-gray-900">
                      Connect Slack Guide
                    </p>
                    <span className="text-[11px] silka-regular text-gray-400">
                      Follow the guide for the exact Slack setup.
                    </span>
                  </div>
                </button>
              </a>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setConnecting(true);
                  connectSlack(workspaceId);
                }}
                disabled={connected}
                className={
                  'py-2 w-full mt-4 bg-[#ECB22E] text-sm text-white silka-semibold rounded ' +
                  (connected ? 'opacity-60' : 'hover:opacity-80')
                }
              >
                {connected ? 'Connected' : 'Connect Slack'}
              </button>
              {connecting ? (
                <div className="mt-4 flex flex-row space-x-2 justify-center items-center">
                  <div className="flex flex-row space-x-3">
                    <span className="animate-ping h-2.5 w-2.5 my-auto rounded-full bg-[#ECB22E] opacity-75"></span>
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
  );
}
