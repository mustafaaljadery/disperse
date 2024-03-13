import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { clsx } from 'clsx';
import { useState, useEffect } from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../../utils/apiUrl';
import toast from 'react-hot-toast';

interface Props {
  workspaceId: string;
}

async function connectTiktok(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(`${apiUrl()}tiktok/auth`, {
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

    const result = await axios.get(`${apiUrl()}tiktok/auth/check`, {
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

export function TiktokNotConnected({ workspaceId }: Props) {
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
                d="M8.05777 7.88994V7.11938C7.79038 7.0814 7.52058 7.06186 7.25055 7.06055C3.94727 7.06055 1.25977 9.74849 1.25977 13.0518C1.25977 15.078 2.27246 16.8718 3.8173 17.9565C2.78287 16.8503 2.2077 15.3922 2.20858 13.8777C2.20858 10.6213 4.81968 7.96589 8.05777 7.88994Z"
                fill="#00F2EA"
              />
              <path
                d="M8.19937 16.6133C9.6733 16.6133 10.8755 15.4408 10.9303 13.9796L10.9354 0.93574H13.3184C13.2675 0.663302 13.2418 0.386912 13.2416 0.109863H9.98679L9.9813 13.1542C9.92708 14.615 8.72427 15.787 7.25078 15.787C6.80842 15.7873 6.37265 15.6795 5.98145 15.4729C6.49405 16.1881 7.31949 16.6125 8.19937 16.6133ZM17.7696 5.36347V4.63857C16.8939 4.63945 16.0369 4.38458 15.3038 3.90556C15.9466 4.6456 16.8118 5.15711 17.7701 5.36347"
                fill="#00F2EA"
              />
              <path
                d="M15.3037 3.90502C14.5854 3.0831 14.1896 2.02825 14.1901 0.936523H13.3181C13.5462 2.1558 14.2638 3.22865 15.3037 3.90502ZM7.25067 10.3153C5.74029 10.3171 4.5164 11.541 4.51465 13.0514C4.51553 14.0682 5.08016 15.0008 5.9809 15.4732C5.64436 15.0091 5.46324 14.4509 5.46324 13.8777C5.46478 12.3673 6.68867 11.143 8.19926 11.1412C8.48114 11.1412 8.75138 11.1878 9.00648 11.2679V7.94506C8.73909 7.90708 8.46928 7.88754 8.19926 7.88622C8.15184 7.88622 8.10508 7.88886 8.0581 7.88974V10.442C7.79686 10.359 7.52464 10.3162 7.25067 10.3153Z"
                fill="#FF004F"
              />
              <path
                d="M17.7693 5.36345V7.89311C16.0813 7.89311 14.518 7.35328 13.241 6.43696V13.0514C13.241 16.3547 10.5539 19.0422 7.25063 19.0422C5.97406 19.0422 4.79035 18.6394 3.81738 17.9562C4.94819 19.1757 6.53606 19.8685 8.19901 19.8681C11.5023 19.8681 14.1898 17.1806 14.1898 13.8778V7.26328C15.509 8.21187 17.0933 8.7214 18.7181 8.71943V5.46378C18.3923 5.46378 18.0755 5.42843 17.769 5.36279"
                fill="#FF004F"
              />
              <path
                d="M13.2408 13.0514V6.43688C14.56 7.38569 16.1443 7.89501 17.7691 7.89303V5.36359C16.8111 5.15701 15.9459 4.64528 15.3033 3.90502C14.2634 3.22865 13.5457 2.1558 13.3177 0.936523H10.9349L10.9298 13.9804C10.8752 15.4412 9.67278 16.6137 8.19885 16.6137C7.31918 16.6128 6.49353 16.1882 5.98114 15.4734C5.0804 15.0012 4.51555 14.0687 4.51445 13.0516C4.51621 11.5412 5.7401 10.3173 7.25047 10.3156C7.53191 10.3156 7.80215 10.3617 8.05769 10.4422V7.88996C4.8196 7.96591 2.2085 10.6214 2.2085 13.8777C2.2085 15.4524 2.82033 16.8859 3.81722 17.9566C4.82224 18.6641 6.02153 19.0432 7.25047 19.0421C10.554 19.0421 13.2408 16.3546 13.2408 13.0514Z"
                fill="black"
              />
            </svg>
            <p className="text-sm silka-semibold text-gray-700 my-auto">
              Tiktok
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
              <div className="flex flex-col justify-start w-full items-start">
                <div className="w-full flex flex-row justify-between items-between">
                  <h2 className="text-2xl silka-semibold text-gray-900">
                    Connect TikTok
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
                  Follow the instructions below to connect your TikTok
                  to Disperse.
                </p>
              </div>
              <div className="mt-6 flex flex-col">
                <a
                  href="/guides/tiktok"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="flex flex-row justify-between items-between p-4 border w-full rounded-lg border-gray-200 hover:bg-gray-50">
                    <div className="flex flex-row space-x-3">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="my-auto"
                      >
                        <path
                          d="M9.66932 9.46597V8.5413C9.34846 8.49573 9.02469 8.47228 8.70066 8.4707C4.73672 8.4707 1.51172 11.6962 1.51172 15.6602C1.51172 18.0917 2.72696 20.2443 4.58077 21.5459C3.33945 20.2184 2.64924 18.4687 2.6503 16.6512C2.6503 12.7437 5.78362 9.55712 9.66932 9.46597Z"
                          fill="#00F2EA"
                        />
                        <path
                          d="M9.83924 19.935C11.608 19.935 13.0505 18.528 13.1164 16.7746L13.1225 1.12191H15.9821C15.921 0.794985 15.8901 0.463318 15.8899 0.130859H11.9842L11.9776 15.7841C11.9125 17.537 10.4691 18.9435 8.70093 18.9435C8.1701 18.9437 7.64718 18.8144 7.17773 18.5665C7.79286 19.4248 8.78339 19.934 9.83924 19.935ZM21.3235 6.43518V5.56531C20.2727 5.56637 19.2442 5.26051 18.3646 4.68569C19.136 5.57374 20.1742 6.18755 21.3241 6.43518"
                          fill="#00F2EA"
                        />
                        <path
                          d="M18.3639 4.68525C17.5019 3.69894 17.0269 2.43312 17.0275 1.12305H15.9811C16.2548 2.58618 17.116 3.8736 18.3639 4.68525ZM8.70021 12.3776C6.88776 12.3797 5.4191 13.8484 5.41699 15.6608C5.41805 16.8811 6.09561 18.0002 7.17649 18.5671C6.77264 18.0102 6.55531 17.3403 6.55531 16.6524C6.55715 14.84 8.02581 13.3708 9.83853 13.3687C10.1768 13.3687 10.5011 13.4245 10.8072 13.5207V9.53329C10.4863 9.48771 10.1626 9.46427 9.83853 9.46269C9.78162 9.46269 9.72551 9.46585 9.66914 9.4669V12.5296C9.35565 12.43 9.02898 12.3787 8.70021 12.3776Z"
                          fill="#FF004F"
                        />
                        <path
                          d="M21.3233 6.43438V9.46997C19.2977 9.46997 17.4218 8.82218 15.8894 7.72259V15.66C15.8894 19.6239 12.6649 22.8489 8.70095 22.8489C7.16906 22.8489 5.74861 22.3655 4.58105 21.5457C5.93802 23.0091 7.84346 23.8405 9.839 23.84C13.8029 23.84 17.0279 20.615 17.0279 16.6515V8.71417C18.6109 9.85249 20.5122 10.4639 22.4619 10.4616V6.55477C22.0709 6.55477 21.6908 6.51236 21.323 6.43359"
                          fill="#FF004F"
                        />
                        <path
                          d="M15.8892 15.6608V7.72347C17.4722 8.86205 19.3734 9.47322 21.3231 9.47085V6.43553C20.1735 6.18763 19.1353 5.57356 18.3642 4.68525C17.1163 3.8736 16.2551 2.58618 15.9814 1.12305H13.122L13.116 16.7757C13.0504 18.5286 11.6075 19.9356 9.83881 19.9356C8.78322 19.9346 7.79243 19.4251 7.17756 18.5674C6.09668 18.0007 5.41886 16.8816 5.41754 15.6611C5.41965 13.8487 6.88831 12.38 8.70076 12.3779C9.03849 12.3779 9.36278 12.4332 9.66942 12.5299V9.46717C5.78372 9.55831 2.65039 12.7449 2.65039 16.6524C2.65039 18.5421 3.38459 20.2623 4.58086 21.5471C5.78688 22.3962 7.22604 22.8511 8.70076 22.8498C12.665 22.8498 15.8892 19.6248 15.8892 15.6608Z"
                          fill="black"
                        />
                      </svg>
                      <div className="flex flex-col justify-start items-start space-y-0.5">
                        <p className="text-xs silka-semibold text-gray-900">
                          Connect TikTok Guide
                        </p>
                        <span className="text-[11px] silka-regular text-gray-400">
                          Follow the guide for the exact TikTok setup.
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
                    connectTiktok(workspaceId);
                  }}
                  disabled={connected}
                  className={
                    'py-2 w-full mt-4 bg-[#363636] text-sm text-white silka-semibold rounded ' +
                    (connected ? 'opacity-60' : 'hover:opacity-80')
                  }
                >
                  {connected ? 'Connected' : 'Connect Tiktok'}
                </button>
                {connecting ? (
                  <div className="mt-4 flex flex-row space-x-2 justify-center items-center">
                    <div className="flex flex-row space-x-3">
                      <span className="animate-ping h-2.5 w-2.5 my-auto rounded-full bg-[#363636] opacity-75"></span>
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
