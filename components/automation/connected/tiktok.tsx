import { Fragment, useState, useEffect } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Transition } from '@headlessui/react';
import cx from 'classnames';
import axios from 'axios';
import axiosRetry from 'axios-retry';

import { apiUrl } from '../../../utils/apiUrl';
import toast from 'react-hot-toast';

interface Props {
  workspaceId: string;
}

async function getTiktokProfile(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}tiktok/read/userprofile`,
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

async function logOut(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    toast.loading('Logging out...', {
      className: 'text-sm silka-medium text-gray-900',
    });
    const result = await axios.get(`${apiUrl()}tiktok/auth/revoke`, {
      params: {
        workspaceId: workspaceId,
      },
    });
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

export function TiktokConnected({ workspaceId }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    getTiktokProfile(workspaceId).then((value) => {
      setUserProfile(value);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="w-full">
      <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
        <DialogPrimitive.Trigger asChild>
          <button className="border hover:border-[#FF623D] rounded py-5 px-6 flex flex-row justify-between items-between w-full">
            <div className="flex flex-row space-x-4">
              <svg
                width="28"
                height="28"
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
              <p className="silka-semibold text-gray-700 my-auto text-lg">
                Tiktok
              </p>
            </div>
            <div></div>
          </button>
        </DialogPrimitive.Trigger>
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
              className={cx(
                'fixed z-50',
                'w-[95vw] max-w-md rounded-lg p-4 md:w-full',
                'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
                'bg-white',
                'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
              )}
            >
              <div className="flex flex-col justify-center items-center">
                <DialogPrimitive.Title className="text-2xl silka-semibold text-gray-900">
                  TikTok
                </DialogPrimitive.Title>
                <p className="text-xs silka-regular mt-1 text-gray-400">
                  Remove TikTok integration from Disperse
                </p>
              </div>
              <div className="mt-2.5 flex flex-col space-y-2.5">
                <p className="text-xs silka-medium text-gray-500">
                  User Info
                </p>
                <div className="flex flex-row space-x-1.5">
                  {isLoading ? (
                    <div className="w-[38px] h-[38px] rounded-full my-auto bg-gray-200 animate-pulse" />
                  ) : (
                    <>
                      {userProfile.image == 'N/A' ? (
                        <div className="flex flex-col justify-center items-center w-[38px] h-[38px] rounded-full bg-gray-200 my-auto">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.07505 4.10001C5.07505 2.91103 6.25727 1.92502 7.50005 1.92502C8.74283 1.92502 9.92505 2.91103 9.92505 4.10001C9.92505 5.19861 9.36782 5.71436 8.61854 6.37884L8.58757 6.4063C7.84481 7.06467 6.92505 7.87995 6.92505 9.5C6.92505 9.81757 7.18248 10.075 7.50005 10.075C7.81761 10.075 8.07505 9.81757 8.07505 9.5C8.07505 8.41517 8.62945 7.90623 9.38156 7.23925L9.40238 7.22079C10.1496 6.55829 11.075 5.73775 11.075 4.10001C11.075 2.12757 9.21869 0.775024 7.50005 0.775024C5.7814 0.775024 3.92505 2.12757 3.92505 4.10001C3.92505 4.41758 4.18249 4.67501 4.50005 4.67501C4.81761 4.67501 5.07505 4.41758 5.07505 4.10001ZM7.50005 13.3575C7.9833 13.3575 8.37505 12.9657 8.37505 12.4825C8.37505 11.9992 7.9833 11.6075 7.50005 11.6075C7.0168 11.6075 6.62505 11.9992 6.62505 12.4825C6.62505 12.9657 7.0168 13.3575 7.50005 13.3575Z"
                              fill="#363636"
                              fillRule="evenodd"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                      ) : (
                        <img
                          src={userProfile?.user?.avatar_large_url}
                          //@ts-ignore
                          crossorigin="anonymous"
                          className="h-[38px] w-[38px] rounded-full my-auto"
                        />
                      )}
                    </>
                  )}
                  <div className="my-auto flex flex-col space-y-0.5">
                    {isLoading ? (
                      <div className="w-44 h-5 bg-gray-200 rounded animte-pulse" />
                    ) : (
                      <p className="silka-semibold text-gray-900 text-xs my-auto">
                        {userProfile.user?.display_name}
                      </p>
                    )}
                    {isLoading ? (
                      <div className="w-64 h-4 bg-gray-200 rounded animate-pulse" />
                    ) : (
                      <span
                        className={
                          'silka-regular text-[10px] ' +
                          (userProfile?.user?.bio_description
                            ? 'text-gray-500'
                            : 'italic text-gray-400')
                        }
                      >
                        {userProfile?.user?.bio_description
                          ? userProfile?.user?.bio_description
                          : 'No bio...'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-6 flex flex-col justify-center items-center">
                <p className="text-xl silka-semibold text-[#FF0000]">
                  DANGER
                </p>
                <span className="text-xs silka-medium text-[#FF0000] opacity-80 mt-1.5">
                  You will lose all of your analytics, automations,
                  and drafts!
                </span>
              </div>
              <div className="flex flex-row mt-6 justify-end items-end">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (confirmed) {
                      logOut(workspaceId).then(() => {
                        window.location.href =
                          '/' + workspaceId + '/automation/apps';
                        toast.remove();
                      });
                      setIsOpen(false);
                    } else {
                      setConfirmed(true);
                    }
                  }}
                  className={
                    'flex flex-row space-x-2 border rounded-2xl px-5 py-1.5 hover:bg-gray-50'
                  }
                >
                  {confirmed ? (
                    <>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="my-auto"
                      >
                        <path
                          d="M3 1C2.44771 1 2 1.44772 2 2V13C2 13.5523 2.44772 14 3 14H10.5C10.7761 14 11 13.7761 11 13.5C11 13.2239 10.7761 13 10.5 13H3V2L10.5 2C10.7761 2 11 1.77614 11 1.5C11 1.22386 10.7761 1 10.5 1H3ZM12.6036 4.89645C12.4083 4.70118 12.0917 4.70118 11.8964 4.89645C11.7012 5.09171 11.7012 5.40829 11.8964 5.60355L13.2929 7H6.5C6.22386 7 6 7.22386 6 7.5C6 7.77614 6.22386 8 6.5 8H13.2929L11.8964 9.39645C11.7012 9.59171 11.7012 9.90829 11.8964 10.1036C12.0917 10.2988 12.4083 10.2988 12.6036 10.1036L14.8536 7.85355C15.0488 7.65829 15.0488 7.34171 14.8536 7.14645L12.6036 4.89645Z"
                          fill="#FF0000"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <p className="text-sm silka-medium text-[#FF0000]">
                        Are you sure?
                      </p>
                    </>
                  ) : (
                    <>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="my-auto"
                      >
                        <path
                          d="M3 1C2.44771 1 2 1.44772 2 2V13C2 13.5523 2.44772 14 3 14H10.5C10.7761 14 11 13.7761 11 13.5C11 13.2239 10.7761 13 10.5 13H3V2L10.5 2C10.7761 2 11 1.77614 11 1.5C11 1.22386 10.7761 1 10.5 1H3ZM12.6036 4.89645C12.4083 4.70118 12.0917 4.70118 11.8964 4.89645C11.7012 5.09171 11.7012 5.40829 11.8964 5.60355L13.2929 7H6.5C6.22386 7 6 7.22386 6 7.5C6 7.77614 6.22386 8 6.5 8H13.2929L11.8964 9.39645C11.7012 9.59171 11.7012 9.90829 11.8964 10.1036C12.0917 10.2988 12.4083 10.2988 12.6036 10.1036L14.8536 7.85355C15.0488 7.65829 15.0488 7.34171 14.8536 7.14645L12.6036 4.89645Z"
                          fill="#363636"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <p className="text-sm silka-medium text-[#363636] my-auto">
                        Log out
                      </p>
                    </>
                  )}
                </button>
              </div>
            </DialogPrimitive.Content>
          </Transition.Child>
        </Transition.Root>
      </DialogPrimitive.Root>
    </div>
  );
}
