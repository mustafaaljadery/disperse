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
  setRefetchNotConnected: Dispatch<SetStateAction<boolean>>;
  setRefetchConnected: Dispatch<SetStateAction<boolean>>;
}

async function getUserProfile(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}automation/discord/read/userprofile`,
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
      `${apiUrl()}automation/discord/auth/revoke`,
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

export function DiscordConnected({
  workspaceId,
  setRefetchConnected,
  setRefetchNotConnected,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    getUserProfile(workspaceId).then((value) => {
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
                  d="M16.9419 3.52317C15.6473 2.91744 14.263 2.47723 12.8157 2.22656C12.638 2.5479 12.4304 2.98012 12.2872 3.32394C10.7487 3.09258 9.22445 3.09258 7.7143 3.32394C7.57116 2.98012 7.3588 2.5479 7.17947 2.22656C5.73067 2.47723 4.3448 2.91906 3.05016 3.52638C0.438869 7.47238 -0.269009 11.3204 0.0849305 15.1137C1.81688 16.4071 3.49534 17.1928 5.14548 17.7069C5.55291 17.1462 5.91628 16.5501 6.22931 15.9219C5.63313 15.6954 5.06211 15.4158 4.52256 15.0912C4.6657 14.9852 4.80571 14.8743 4.94098 14.7603C8.23183 16.2995 11.8074 16.2995 15.0589 14.7603C15.1958 14.8743 15.3358 14.9852 15.4774 15.0912C14.9362 15.4174 14.3637 15.6969 13.7675 15.9235C14.0805 16.5501 14.4423 17.1478 14.8513 17.7085C16.503 17.1944 18.183 16.4087 19.915 15.1137C20.3303 10.7163 19.2056 6.90361 16.9419 3.52317ZM6.67765 12.7809C5.68977 12.7809 4.87963 11.8586 4.87963 10.7355C4.87963 9.61247 5.67247 8.68864 6.67765 8.68864C7.68285 8.68864 8.49297 9.61085 8.47567 10.7355C8.47723 11.8586 7.68285 12.7809 6.67765 12.7809ZM13.3223 12.7809C12.3344 12.7809 11.5243 11.8586 11.5243 10.7355C11.5243 9.61247 12.3171 8.68864 13.3223 8.68864C14.3275 8.68864 15.1376 9.61085 15.1203 10.7355C15.1203 11.8586 14.3275 12.7809 13.3223 12.7809Z"
                  fill="#5865F2"
                />
              </svg>
              <p className="silka-semibold text-gray-700 my-auto text-lg">
                Discord
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
                  Discord
                </DialogPrimitive.Title>
                <p className="text-xs silka-regular mt-1 text-gray-400">
                  Remove Discord integration from Disperse
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
                        {userProfile?.email}
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
