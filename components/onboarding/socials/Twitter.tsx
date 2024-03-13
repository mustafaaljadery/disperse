import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Transition } from '@headlessui/react';
import { Fragment, Dispatch, SetStateAction } from 'react';
import { clsx } from 'clsx';
import { useState, useEffect } from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../../utils/apiUrl';
import toast from 'react-hot-toast';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  userId: string;
  setTwitterConnected: Dispatch<SetStateAction<boolean>>;
  workspaceId: string;
}

async function twitterAuth(
  clientId: string,
  clientSecret: string,
  workspaceId: string,
  setErrorOpen: Dispatch<SetStateAction<boolean>>,
  setConnecting: Dispatch<SetStateAction<boolean>>
) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(`${apiUrl()}twitter/auth/`, {
      params: {
        workspaceId: workspaceId,
        clientId: clientId,
        clientSecret: clientSecret,
      },
    });
    if (result.data.message == 'error') {
      setErrorOpen(true);
      setConnecting(false);
    } else {
      setTimeout(() => {
        window.open(
          result.data.url,
          '',
          'width=600,height=900,left=200,top=200'
        );
      });
    }
    return result.data;
  } catch (e) {
    console.log(e);
    setErrorOpen(true);
    setConnecting(false);
  }
}

async function checkConnection(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(`${apiUrl()}twitter/auth/check`, {
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

function ErrorMessage() {
  return (
    <div className="flex flex-row px-3 space-x-2 bg-[#FFCFCB] rounded w-full py-2 mt-4">
      <svg
        width="21"
        height="21"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="my-auto"
      >
        <path
          d="M12.0029 21.5341C17.5209 21.5341 22.0009 17.0541 22.0009 11.5361C22.0009 6.01806 17.5209 1.53906 12.0029 1.53906C6.48586 1.53906 2.00586 6.01806 2.00586 11.5361C2.00586 17.0541 6.48586 21.5341 12.0029 21.5341ZM12.0029 13.5341C11.5889 13.5341 11.2529 13.1981 11.2529 12.7841V7.28406C11.2529 6.87006 11.5889 6.53406 12.0029 6.53406C12.4169 6.53406 12.7529 6.87006 12.7529 7.28406V12.7841C12.7529 13.1981 12.4169 13.5341 12.0029 13.5341ZM12.0009 16.5341C11.4489 16.5341 11.0009 16.0861 11.0009 15.5341C11.0009 14.9821 11.4489 14.5341 12.0009 14.5341C12.5529 14.5341 13.0009 14.9821 13.0009 15.5341C13.0009 16.0861 12.5529 16.5341 12.0009 16.5341Z"
          fill="#E8594C"
        />
      </svg>

      <div className="flex flex-col space-y-1 my-auto">
        <p className="silka-medium text-xs">
          Make sure your Tokens are correct.
        </p>
      </div>
    </div>
  );
}

export function OnboardingTwitter({
  isOpen,
  setIsOpen,
  userId,
  setTwitterConnected,
  workspaceId,
}: Props) {
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    if (connecting) {
      const testvalue = setInterval(() => {
        checkConnection(workspaceId).then((value) => {
          if (value.connected == true) {
            setTwitterConnected(true);
            setConnecting(false);
            setConnected(true);
            setIsOpen(false);
            clearInterval(testvalue);
            toast.success('Twitter Connected!', {
              className: 'text-sm silka-medium text-gray-900',
            });
          }
        });
      }, 1000);
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
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setConnecting(true);
                twitterAuth(
                  clientId,
                  clientSecret,
                  workspaceId,
                  setErrorOpen,
                  setConnecting
                );
              }}
            >
              <div className="flex flex-col w-full justify-start items-start">
                <div className="flex flex-row w-full justify-between items-between">
                  <h2 className="text-2xl silka-semibold text-gray-900">
                    Connect Twitter
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
                  Follow the instructions below to connect your Twitte
                  to Disperse.
                </p>
              </div>
              {errorOpen ? <ErrorMessage /> : <></>}
              <input
                value={clientId}
                onChange={(e) => {
                  setClientId(e.target.value);
                }}
                placeholder="Client Id"
                type="text"
                className="w-full silka-medium text-xs text-gray-800 border border-gray-300 mt-6 rounded focus:ring-0 focus:border-[#1D9BF0]"
              />
              <input
                value={clientSecret}
                onChange={(e) => {
                  setClientSecret(e.target.value);
                }}
                placeholder="Client Secret"
                type="text"
                className="w-full silka-medium text-xs text-gray-800 border border-gray-300 mt-3 rounded focus:ring-0 focus:border-[#1D9BF0]"
              />
              <div className="mt-4 flex flex-col">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="/guides/twitter"
                  className="flex flex-col space-y-3"
                >
                  <div className="flex flex-row space-x-2">
                    <p className="silka-semibold text-[11px] text-[#D90100]">
                      IMPORTANT: Follow the guide below to get your
                      tokens
                    </p>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="my-auto"
                    >
                      <path
                        d="M7.5 2C7.77614 2 8 2.22386 8 2.5L8 11.2929L11.1464 8.14645C11.3417 7.95118 11.6583 7.95118 11.8536 8.14645C12.0488 8.34171 12.0488 8.65829 11.8536 8.85355L7.85355 12.8536C7.75979 12.9473 7.63261 13 7.5 13C7.36739 13 7.24021 12.9473 7.14645 12.8536L3.14645 8.85355C2.95118 8.65829 2.95118 8.34171 3.14645 8.14645C3.34171 7.95118 3.65829 7.95118 3.85355 8.14645L7 11.2929L7 2.5C7 2.22386 7.22386 2 7.5 2Z"
                        fill="#D90100"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <button
                    type="button"
                    className="flex flex-row justify-between items-between p-4 border w-full rounded-lg border-gray-200 hover:bg-gray-50"
                  >
                    <div className="flex flex-row space-x-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className="my-auto"
                      >
                        <path
                          fill="#1D9BF0"
                          d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                        />
                      </svg>
                      <div className="my-auto flex flex-col justify-start items-start space-y-0.5">
                        <p className="text-xs silka-semibold text-gray-900">
                          Connect Twitter Guide
                        </p>
                        <span className="text-[11px] silka-regular text-gray-400">
                          Follow the guide for the exact Twitter
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
                  type="submit"
                  disabled={
                    connected || clientId == '' || clientSecret == ''
                  }
                  className={
                    'py-2 w-full mt-4 bg-[#1D9BF0] text-sm text-white silka-semibold rounded ' +
                    (connected ? 'opacity-60' : 'hover:opacity-80')
                  }
                >
                  {connected ? 'Connected' : 'Connect Twitter'}
                </button>
                {connecting ? (
                  <div className="mt-4 flex flex-row space-x-2 justify-center items-center">
                    <div className="flex flex-row space-x-3">
                      <span className="animate-ping h-2.5 w-2.5 my-auto rounded-full bg-[#1D9BF0] opacity-75"></span>
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
            </form>
          </DialogPrimitive.Content>
        </Transition.Child>
      </Transition.Root>
    </DialogPrimitive.Portal>
  );
}
