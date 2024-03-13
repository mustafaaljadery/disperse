import * as DialogPrimitive from '@radix-ui/react-dialog';
import {
  useState,
  useEffect,
  Fragment,
  Dispatch,
  SetStateAction,
} from 'react';
import { Transition } from '@headlessui/react';
import cx from 'classnames';
import axios from 'axios';
import axiosRetry from 'axios-retry';

import { apiUrl } from '../../../utils/apiUrl';
import toast from 'react-hot-toast';

interface Props {
  workspaceId: string;
  setRefetchNotConnected: Dispatch<SetStateAction<any>>;
  setRefetchConnected: Dispatch<SetStateAction<any>>;
}

async function getSlackProfile(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}automation/slack/read/profile`,
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

    toast.loading('Logging Out...', {
      className: 'text-sm silka-medium text-gray-900',
    });
    const result = await axios.get(
      `${apiUrl()}automation/slack/auth/revoke`,
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

export function SlackConnected({
  workspaceId,
  setRefetchConnected,
  setRefetchNotConnected,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    getSlackProfile(workspaceId).then((value) => {
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
              <p className="silka-semibold text-gray-700 my-auto text-lg">
                Slack
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
                  Slack
                </DialogPrimitive.Title>
                <p className="text-xs silka-regular mt-1 text-gray-400">
                  Remove Slack integration from Disperse
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
                          src={userProfile?.image}
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
                        {userProfile.name}
                      </p>
                    )}
                    {isLoading ? (
                      <div className="w-64 h-4 bg-gray-200 rounded animate-pulse" />
                    ) : (
                      <span className="silka-regular text-gray-500 text-[10px]">
                        {userProfile?.email.length > 42
                          ? userProfile.email.slice(0, 42) + '...'
                          : userProfile.email}
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
