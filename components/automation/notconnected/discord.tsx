import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Transition } from '@headlessui/react';
import { useState, Fragment, useEffect } from 'react';
import { clsx } from 'clsx';
import axios from 'axios';
import axiosRetry from 'axios-retry';

import { apiUrl } from '../../../utils/apiUrl';

interface Props {
  workspaceId: string;
}

async function connectDiscord(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}automation/discord/auth`,
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
      `${apiUrl()}automation/discord/auth/check`,
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

export function DiscordNotConnected({ workspaceId }: Props) {
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
            >
              <path
                d="M16.9419 3.52317C15.6473 2.91744 14.263 2.47723 12.8157 2.22656C12.638 2.5479 12.4304 2.98012 12.2872 3.32394C10.7487 3.09258 9.22445 3.09258 7.7143 3.32394C7.57116 2.98012 7.3588 2.5479 7.17947 2.22656C5.73067 2.47723 4.3448 2.91906 3.05016 3.52638C0.438869 7.47238 -0.269009 11.3204 0.0849305 15.1137C1.81688 16.4071 3.49534 17.1928 5.14548 17.7069C5.55291 17.1462 5.91628 16.5501 6.22931 15.9219C5.63313 15.6954 5.06211 15.4158 4.52256 15.0912C4.6657 14.9852 4.80571 14.8743 4.94098 14.7603C8.23183 16.2995 11.8074 16.2995 15.0589 14.7603C15.1958 14.8743 15.3358 14.9852 15.4774 15.0912C14.9362 15.4174 14.3637 15.6969 13.7675 15.9235C14.0805 16.5501 14.4423 17.1478 14.8513 17.7085C16.503 17.1944 18.183 16.4087 19.915 15.1137C20.3303 10.7163 19.2056 6.90361 16.9419 3.52317ZM6.67765 12.7809C5.68977 12.7809 4.87963 11.8586 4.87963 10.7355C4.87963 9.61247 5.67247 8.68864 6.67765 8.68864C7.68285 8.68864 8.49297 9.61085 8.47567 10.7355C8.47723 11.8586 7.68285 12.7809 6.67765 12.7809ZM13.3223 12.7809C12.3344 12.7809 11.5243 11.8586 11.5243 10.7355C11.5243 9.61247 12.3171 8.68864 13.3223 8.68864C14.3275 8.68864 15.1376 9.61085 15.1203 10.7355C15.1203 11.8586 14.3275 12.7809 13.3223 12.7809Z"
                fill="#5865F2"
              />
            </svg>
            <p className="text-sm silka-semibold text-gray-700 my-auto">
              Discord
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
                  Connect Discord
                </h2>
                <p className="mt-2 w-[90%] text-center text-xs silka-regular text-gray-400">
                  Follow the instructions below to connect your
                  Discord to Disperse.
                </p>
              </div>
              <div className="mt-4 flex flex-col">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="/guides/discord"
                >
                  <button className="flex flex-row space-x-3 p-4 border w-full rounded-lg border-gray-200 hover:bg-gray-50">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.9419 3.52317C15.6473 2.91744 14.263 2.47723 12.8157 2.22656C12.638 2.5479 12.4304 2.98012 12.2872 3.32394C10.7487 3.09258 9.22445 3.09258 7.7143 3.32394C7.57116 2.98012 7.3588 2.5479 7.17947 2.22656C5.73067 2.47723 4.3448 2.91906 3.05016 3.52638C0.438869 7.47238 -0.269009 11.3204 0.0849305 15.1137C1.81688 16.4071 3.49534 17.1928 5.14548 17.7069C5.55291 17.1462 5.91628 16.5501 6.22931 15.9219C5.63313 15.6954 5.06211 15.4158 4.52256 15.0912C4.6657 14.9852 4.80571 14.8743 4.94098 14.7603C8.23183 16.2995 11.8074 16.2995 15.0589 14.7603C15.1958 14.8743 15.3358 14.9852 15.4774 15.0912C14.9362 15.4174 14.3637 15.6969 13.7675 15.9235C14.0805 16.5501 14.4423 17.1478 14.8513 17.7085C16.503 17.1944 18.183 16.4087 19.915 15.1137C20.3303 10.7163 19.2056 6.90361 16.9419 3.52317ZM6.67765 12.7809C5.68977 12.7809 4.87963 11.8586 4.87963 10.7355C4.87963 9.61247 5.67247 8.68864 6.67765 8.68864C7.68285 8.68864 8.49297 9.61085 8.47567 10.7355C8.47723 11.8586 7.68285 12.7809 6.67765 12.7809ZM13.3223 12.7809C12.3344 12.7809 11.5243 11.8586 11.5243 10.7355C11.5243 9.61247 12.3171 8.68864 13.3223 8.68864C14.3275 8.68864 15.1376 9.61085 15.1203 10.7355C15.1203 11.8586 14.3275 12.7809 13.3223 12.7809Z"
                        fill="#5865F2"
                      />
                    </svg>
                    <div className="my-auto flex flex-col justify-start items-start space-y-0.5">
                      <p className="text-xs silka-semibold text-gray-900">
                        Connect Discord Guide
                      </p>
                      <span className="text-[11px] silka-regular text-gray-400">
                        Follow the guide for the exact Discord setup.
                      </span>
                    </div>
                  </button>
                </a>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setConnecting(true);
                    connectDiscord(workspaceId);
                  }}
                  disabled={connected}
                  className={
                    'py-2 w-full mt-4 bg-[#5864F2] text-sm text-white silka-semibold rounded ' +
                    (connected ? 'opacity-60' : 'hover:opacity-80')
                  }
                >
                  {connected ? 'Connected' : 'Connect Discord'}
                </button>
                {connecting ? (
                  <div className="mt-4 flex flex-row space-x-2 justify-center items-center">
                    <div className="flex flex-row space-x-3">
                      <span className="animate-ping h-2.5 w-2.5 my-auto rounded-full bg-[#5864F2] opacity-75"></span>
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
