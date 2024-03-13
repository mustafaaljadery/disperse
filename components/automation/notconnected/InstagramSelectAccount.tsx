import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Transition } from '@headlessui/react';
import axios from 'axios';
import axiosRetry from 'axios-retry';

import { apiUrl } from '../../../utils/apiUrl';
import {
  Fragment,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { clsx } from 'clsx';
import toast from 'react-hot-toast';

interface Props {
  workspaceId: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

interface AccountProps {
  value: any;
  selectedAccount: any;
  setSelectedAccount: Dispatch<SetStateAction<any>>;
}

async function setAccount(accountId: string, workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    toast.loading('Setting Account...', {
      className: 'text-sm silka-medium text-gray-900',
    });
    const result = await axios.post(
      `${apiUrl()}instagram/update/staredaccount`,
      null,
      {
        params: {
          accountId: accountId,
          workspaceId: workspaceId,
        },
      }
    );
    window.location.href = '/' + workspaceId + '/automation/apps';
    console.log('set', result.data);
    return result.data;
  } catch (e) {
    console.log(e);
    toast.loading('Error setting account, please try again.', {
      className: 'text-sm silka-medium text-gray-900',
    });
  }
}

async function getAllInstagramAccounts(workspaceId: string) {
  try {
    const result = await axios.get(
      `${apiUrl()}instagram/read/allaccounts`,
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

function Account({
  value,
  selectedAccount,
  setSelectedAccount,
}: AccountProps) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        setSelectedAccount(value?.id);
      }}
      className="py-1 flex flex-row space-x-2"
    >
      <div
        className={
          'h-[16px] w-[16px] rounded-full my-auto ' +
          (selectedAccount == value?.id
            ? 'bg-[#FF623D]'
            : 'bg-gray-200')
        }
      />
      <div className="flex flex-col justify-start items-start space-y-0.5 my-auto">
        <p className="text-xs my-auto silka-semibold text-gray-900">
          {value?.name}
        </p>
        <span className="text-[10px] silka-medium text-gray-900">
          @{value?.username}
        </span>
      </div>
    </button>
  );
}

export function InstagramSelectAccountApps({
  workspaceId,
  isOpen,
  setIsOpen,
}: Props) {
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState(null);

  useEffect(() => {
    if (workspaceId) {
      setIsLoading(true);
      const getAccounts = setInterval(() => {
        getAllInstagramAccounts(workspaceId).then((value) => {
          setAccounts(value);
          setIsLoading(false);
        });
      }, 1000);
    }
  }, [workspaceId, isOpen]);

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
            <div className="flex flex-col justify-start w-full items-start">
              <div className="w-full flex flex-col justify-between items-between">
                <h2 className="text-2xl silka-semibold text-gray-900">
                  Select Account
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
              <p className="mt-2 w-[90%] text-center text-xs silka-regular text-gray-400">
                Select an Instagram account to connect to Disperse.
              </p>
            </div>
            {isLoading ? (
              <div className="flex flex-col space-y-1.5 py-6">
                <div className="h-3 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-3 w-[85%] bg-gray-200 rounded animate-pulse" />
                <div className="h-3 w-[70%] bg-gray-200 rounded animate-pulse" />
              </div>
            ) : (
              <div className="flex flex-col space-y-1 py-6">
                {accounts?.length == 0 ? (
                  <div className="w-full p-4 border flex flex-col justify-center items-center rounded-lg border-dashed border-gray-300">
                    <p className="text-sm silka-medium text-gray-900">
                      No Accounts found, follow the guide below.
                    </p>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="/guides/instagram"
                      className="mt-3 flex flex-col space-y-3 w-full"
                    >
                      <div className="flex flex-row space-x-2">
                        <p className="silka-semibold text-[11px] text-[#D90100]">
                          IMPORTANT: Must be a Business Account,
                          connected to a Facebook page
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
                      <button className="flex flex-row justify-between items-between p-4 border w-full rounded-lg border-gray-200 hover:bg-gray-50">
                        <div className="flex flex-row space-x-3">
                          <img
                            src="/images/integrations/instagram.png"
                            className="h-[24px] w-[24px] my-auto"
                          />
                          <div className="my-auto flex flex-col justify-start items-start space-y-0.5">
                            <p className="text-xs silka-semibold text-gray-900">
                              Connect Instagram Guide
                            </p>
                            <span className="text-[11px] silka-regular text-gray-400">
                              Follow the guide for the exact Instagram
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
                  </div>
                ) : (
                  <>
                    {accounts?.map((value: any, index: number) => {
                      return (
                        <Account
                          value={value}
                          selectedAccount={selectedAccount}
                          setSelectedAccount={setSelectedAccount}
                          key={index}
                        />
                      );
                    })}
                  </>
                )}
              </div>
            )}
            <div className="flex flex-row justify-end items-end space-x-3">
              <button
                onClick={(e) => {
                  if (selectedAccount) {
                    setIsOpen(false);
                    setAccount(selectedAccount, workspaceId).then();
                  } else {
                    toast.error('Select Account', {
                      className: 'text-sm silka-medium text-gray-900',
                    });
                  }
                }}
                className="bg-[#FF623D] text-white silka-medium text-xs px-4 py-1.5 rounded hover:opacity-90"
              >
                Select Account
              </button>
            </div>
          </DialogPrimitive.Content>
        </Transition.Child>
      </Transition.Root>
    </DialogPrimitive.Portal>
  );
}