import {
  Fragment,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Transition } from '@headlessui/react';
import cx from 'classnames';
import axios from 'axios';
import axiosRetry from 'axios-retry';

import { apiUrl } from '../../../utils/apiUrl';
import toast from 'react-hot-toast';

interface Props {
  workspaceId: string;
  setRefetchNotConnected: Dispatch<SetStateAction<boolean>>;
  setRefetchConnected: Dispatch<SetStateAction<boolean>>;
}

async function getPinterestProfile(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}automation/pinterest/read/profile`,
      {
        params: {
          workspaceId: workspaceId,
        },
      }
    );
    return result.data;
  } catch (e: any) {
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
      `${apiUrl()}automation/pinterest/auth/revoke`,
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

export function PinterestConnected({
  workspaceId,
  setRefetchConnected,
  setRefetchNotConnected,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    getPinterestProfile(workspaceId).then((value) => {
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
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="my-auto"
              >
                <g clipPath="url(#clip0_1150_2)">
                  <path
                    d="M0 14.0002C0 19.733 3.44728 24.6579 8.3802 26.8232C8.34083 25.8456 8.3732 24.672 8.62389 23.6084C8.89306 22.4719 10.4253 15.9797 10.4253 15.9797C10.4253 15.9797 9.97806 15.0858 9.97806 13.7646C9.97806 11.6899 11.1805 10.1404 12.6781 10.1404C13.9515 10.1404 14.5668 11.0969 14.5668 12.2422C14.5668 13.5224 13.7503 15.4372 13.3304 17.2107C12.9796 18.6958 14.075 19.9071 15.5401 19.9071C18.1927 19.9071 19.9792 16.5002 19.9792 12.4636C19.9792 9.3952 17.9126 7.09855 14.1537 7.09855C9.90686 7.09855 7.26119 10.2656 7.26119 13.8032C7.26119 15.023 7.62081 15.8831 8.18409 16.5492C8.44309 16.8551 8.47908 16.9782 8.38534 17.3295C8.31819 17.5871 8.16397 18.2072 8.10009 18.453C8.00691 18.8076 7.71958 18.9343 7.39911 18.8034C5.44305 18.0049 4.53206 15.8628 4.53206 13.4548C4.53206 9.47778 7.88616 4.70903 14.5379 4.70903C19.8831 4.70903 23.4011 8.57697 23.4011 12.729C23.4011 18.221 20.3478 22.324 15.847 22.324C14.3356 22.324 12.9138 21.507 12.4267 20.5789C12.4267 20.5789 11.614 23.8046 11.4418 24.4275C11.145 25.5069 10.564 26.5858 10.0327 27.4267C11.2919 27.7983 12.622 28.0008 14.0005 28.0008C21.7316 28.0008 28.0001 21.7326 28.0001 14.0002C28.0001 6.26817 21.7316 0 14.0005 0C6.26872 0 0 6.26817 0 14.0002Z"
                    fill="#CB1F27"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1150_2">
                    <rect width="28" height="28" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <p className="silka-semibold text-gray-700 my-auto text-lg">
                Pinterest
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
                'w-[95vw] max-w-md rounded-lg p-5 md:w-full',
                'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
                'bg-white',
                'focus:outline-none focus-visible:ring-0'
              )}
            >
              <div className="flex flex-col justify-center items-center">
                <DialogPrimitive.Title className="text-2xl silka-semibold text-gray-900">
                  Pinterest
                </DialogPrimitive.Title>
                <p className="text-xs silka-regular mt-1 text-gray-400">
                  Remove Pinterst integration from Disperse
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
                      <div className="w-64 h-4 bg-gray-200 rounded animate-pulse" />
                    ) : (
                      <span className="silka-regular text-gray-500 text-[10px]">
                        @{userProfile?.username}
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
