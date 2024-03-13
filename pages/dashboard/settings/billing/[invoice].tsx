import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { PageHead } from '../../../../layouts/PageHead';
import { DashboardTopbar } from '../../../../layouts/DashboardTopbar';
import { apiUrl } from '../../../../utils/apiUrl';
import Link from 'next/link';
import { LoadingScreen } from '../../../../components/Loading';
import * as ProgressPrimitive from '@radix-ui/react-progress';

async function getUserInfo(userId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}user/read/userinfobilling`,
      {
        params: { userId: userId },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function getInvoiceData(userId: string, inputDate: any) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(`${apiUrl()}user/read/statement`, {
      params: { userId: userId, inputDate: inputDate },
    });
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

interface WorkspaceComponentProps {
  value: any;
}

function WorkspaceComponent({ value }: WorkspaceComponentProps) {
  const [automationProgress, setAutomationProgress] = useState(60);
  const [storageProgress, setStorageProgress] = useState(60);
  const [teamProgress, setTeamProgress] = useState(60);
  const [guestProgress, setGuestProgress] = useState(60);

  useEffect(() => {
    const plan = value.plan;
    if (plan == 'STARTER') {
      setAutomationProgress((value.automations / 100) * 100);
      setStorageProgress((value.storage / 2000) * 100);
      setGuestProgress((value.guest_members / 3) * 100);
    } else if (plan == 'TEAM') {
      setAutomationProgress((value.automations / 3000) * 100);
      setStorageProgress((value.storage / 500000) * 100);
      setTeamProgress(100);
    } else if (plan == 'PRO') {
      setAutomationProgress((value.automations / 1000) * 100);
      setStorageProgress((value.storage / 200000) * 100);
      setGuestProgress((value.guest_members / 5) * 100);
    }
  });

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-row space-x-3 px-2">
        <svg
          width="16"
          height="16"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="my-auto"
        >
          <path
            d="M4.5 2C3.11929 2 2 3.11929 2 4.5C2 5.88072 3.11929 7 4.5 7C5.88072 7 7 5.88072 7 4.5C7 3.11929 5.88072 2 4.5 2ZM3 4.5C3 3.67157 3.67157 3 4.5 3C5.32843 3 6 3.67157 6 4.5C6 5.32843 5.32843 6 4.5 6C3.67157 6 3 5.32843 3 4.5ZM10.5 2C9.11929 2 8 3.11929 8 4.5C8 5.88072 9.11929 7 10.5 7C11.8807 7 13 5.88072 13 4.5C13 3.11929 11.8807 2 10.5 2ZM9 4.5C9 3.67157 9.67157 3 10.5 3C11.3284 3 12 3.67157 12 4.5C12 5.32843 11.3284 6 10.5 6C9.67157 6 9 5.32843 9 4.5ZM2 10.5C2 9.11929 3.11929 8 4.5 8C5.88072 8 7 9.11929 7 10.5C7 11.8807 5.88072 13 4.5 13C3.11929 13 2 11.8807 2 10.5ZM4.5 9C3.67157 9 3 9.67157 3 10.5C3 11.3284 3.67157 12 4.5 12C5.32843 12 6 11.3284 6 10.5C6 9.67157 5.32843 9 4.5 9ZM10.5 8C9.11929 8 8 9.11929 8 10.5C8 11.8807 9.11929 13 10.5 13C11.8807 13 13 11.8807 13 10.5C13 9.11929 11.8807 8 10.5 8ZM9 10.5C9 9.67157 9.67157 9 10.5 9C11.3284 9 12 9.67157 12 10.5C12 11.3284 11.3284 12 10.5 12C9.67157 12 9 11.3284 9 10.5Z"
            fill="#363636"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
        <p className="my-auto silka-medium text-base text-[#363636]">
          {value.name}
        </p>
      </div>
      <div className="px-6 py-4 border rounded-lg flex flex-col">
        <div className="flex flex-row justify-between items-between">
          <p className="text-lg silka-semibold text-gray-900">
            {value.plan.toUpperCase()}
          </p>
        </div>
        <div className="flex flex-col mt-3 space-y-1">
          <div className="flex flex-row justify-between items-between">
            <p className="text-xs silka-semibold text-gray-600">
              Automations
            </p>
            <p className="text-[11px] silka-regular text-gray-500">
              {value.plan == 'STARTER'
                ? '100'
                : value.plan == 'PRO'
                ? '1K'
                : '3K'}{' '}
              included
            </p>
          </div>
          <ProgressPrimitive.Root
            value={automationProgress}
            className="h-3 w-full overflow-hidden rounded-full bg-gray-100"
          >
            <ProgressPrimitive.Indicator
              style={{ width: `${automationProgress}%` }}
              className="h-full bg-[#FF623D] duration-300 ease-in-out"
            />
          </ProgressPrimitive.Root>
          <div className="flex flex-col justify-start items-start">
            <p className="text-[11px] silka-regular text-gray-400">
              Used {value.automations}
            </p>
          </div>
        </div>
        <div className="mt-3 flex flex-col space-y-1">
          <div className="flex flex-row justify-between items-between">
            <p className="text-xs silka-semibold text-gray-600">
              Storage
            </p>
            <p className="text-[11px] silka-regular text-gray-500">
              {value.plan == 'STARTER'
                ? '2GB'
                : value.plan == 'PRO'
                ? '200GB'
                : '500GB'}{' '}
              included
            </p>
          </div>
          <ProgressPrimitive.Root
            value={storageProgress}
            className="h-3 w-full overflow-hidden rounded-full bg-gray-100"
          >
            <ProgressPrimitive.Indicator
              style={{ width: `${storageProgress}%` }}
              className="h-full bg-[#FF623D] duration-300 ease-in-out"
            />
          </ProgressPrimitive.Root>
          <div className="flex flex-col justify-start items-start">
            <p className="text-[11px] silka-regular text-gray-400">
              Used {value.storage}MB
            </p>
          </div>
        </div>
        <div className="mt-3 flex flex-col space-y-1">
          <div className="flex flex-row justify-between items-between">
            <p className="text-xs silka-semibold text-gray-600">
              {value.plan == 'TEAM'
                ? 'Team Members'
                : 'Guest Members'}
            </p>
            <p className="text-[11px] silka-regular text-gray-500">
              {value.plan == 'STARTER'
                ? '3 guests'
                : value.plan == 'PRO'
                ? '5 guests'
                : 'Unlimited'}{' '}
              included
            </p>
          </div>
          <ProgressPrimitive.Root
            value={
              value.plan == 'TEAM' ? teamProgress : guestProgress
            }
            className="h-3 w-full overflow-hidden rounded-full bg-gray-100"
          >
            <ProgressPrimitive.Indicator
              style={{
                width: `${
                  value.plan == 'TEAM' ? teamProgress : guestProgress
                }%`,
              }}
              className="h-full bg-[#FF623D] duration-300 ease-in-out"
            />
          </ProgressPrimitive.Root>
          <div className="flex felx-col justify-start items-start">
            <p className="text-[11px] silka-regular text-gray-400">
              Used{' '}
              {value.plan == 'TEAM'
                ? value.team_members
                : value.guest_members}
            </p>
          </div>
        </div>
        <hr className="mt-5 mb-4 w-full" />
        <div className="flex flex-row justify-between items-between">
          <p className="silka-semibold text-gray-800">Total</p>
          <p className="text-sm silka-regular text-gray-500 my-auto">
            ${value.amount}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Invoices() {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [infoLoading, setInfoLoading] = useState(true);
  const [amount, setAmount] = useState(0);
  const [invoiceInfo, setInvoiceInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { pathname } = useRouter();
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status == 'authenticated' && router.isReady) {
      getInvoiceData(
        String(session?.user?.id),
        String(router.query.invoice)
      ).then((value) => {
        setAmount(value.amount);
        setInvoiceInfo(value.workspaces);
        setIsLoading(false);
      });
      getUserInfo(String(session?.user?.id)).then((value) => {
        setUserInfo(value);
      });
    }
  }, [status, router.isReady]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <PageHead
      title="Invoice · Disperse"
      description="Your Disperse usage invoice."
    >
      <>
        <DashboardTopbar pathname={pathname} userInfo={userInfo} />
        <main className="flex flex-col justify-center items-center">
          <div className="w-[90%] lg:w-[70%] 2xl:w-3/5 mt-6 lg:mt-12 flex flex-col lg:flex-row lg:space-x-5">
            <div className="flex flex-col space-y-2 w-full lg:w-1/5">
              <Link
                href={'/dashboard/settings'}
                className={
                  'text-sm hover:bg-gray-100 rounded py-1.5 px-1 lg:px-2 ' +
                  (pathname == '/dashboard/settings'
                    ? 'silka-medium'
                    : 'silka-regular text-gray-900')
                }>
                
                  General
                
              </Link>
              <Link
                href={'/dashboard/settings/billing'}
                className={
                  'text-sm hover:bg-gray-100 rounded py-1.5 px-1 lg:px-2 ' +
                  (pathname.includes('/dashbaord/settings/billing')
                    ? 'silka-medium'
                    : 'silka-regular text-gray-900')
                }>
                
                  Billing
                
              </Link>
              <Link
                href={'/dashbaord/settings/tokens'}
                className={
                  'text-sm hover:bg-gray-100 rounded py-1.5 px-1 lg:px-2 ' +
                  (pathname == '/dashboard/settings/tokens'
                    ? 'silka-medium'
                    : 'silka-regular text-gray-900')
                }>
                
                  Tokens
                
              </Link>
            </div>
            <div className="flex flex-col w-full mt-1 lg:w-4/5">
              <Link href={'/dashboard/settings/billing'} legacyBehavior>
                <button className="flex flex-row space-x-2 hover:opacity-80">
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="my-auto"
                  >
                    <path
                      d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
                      fill="#363636"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="silka-medium my-auto text-xs text-[#363636]">
                    Back to Statements
                  </span>
                </button>
              </Link>
              <div className="flex flex-row mt-6 justify-between items-between">
                <div className="flex flex-col space-y-2">
                  <h3 className="text-2xl silka-semibold text-gray-900">
                    {String(router.query.invoice)}
                  </h3>
                  <p className="silka-regular text-gray-400 text-sm">
                    View your invoice for{' '}
                    {String(router.query.invoice)}.
                  </p>
                </div>
                <p className="my-auto silka-medium text-2xl text-gray-900">
                  ${amount}
                </p>
              </div>
              <div className="mt-12 flex flex-col w-full">
                {invoiceInfo.length == 0 ? (
                  <div className="flex mt-12 flex-col justify-center items-center">
                    <div className="p-3 rounded-full bg-[#F6E7E3] flex flex-col justify-center items-center">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.232 12.7412H7.95606C7.36464 12.7412 6.81827 13.0269 6.5227 13.4906C6.22713 13.9545 6.22713 14.526 6.5227 14.9896C6.81827 15.4533 7.3647 15.739 7.95606 15.739H16.232C16.8234 15.739 17.3698 15.4533 17.6653 14.9896C17.9609 14.5259 17.9609 13.9545 17.6653 13.4906C17.3698 13.0269 16.8233 12.7412 16.232 12.7412Z"
                          fill="#FF623D"
                        />
                        <path
                          d="M16.232 6.74512H7.95606C7.36464 6.74512 6.81827 7.03081 6.5227 7.49449C6.22713 7.95819 6.22713 8.5296 6.5227 8.99325C6.81827 9.45695 7.3647 9.74262 7.95606 9.74262H16.232C16.8234 9.74262 17.3698 9.45693 17.6653 8.99325C17.9609 8.52955 17.9609 7.95814 17.6653 7.49449C17.3698 7.0308 16.8233 6.74512 16.232 6.74512Z"
                          fill="#FF623D"
                        />
                        <path
                          d="M24.094 4.804C24.0931 3.53001 23.5337 2.30882 22.5391 1.40808C21.5444 0.507347 20.1959 0.00107063 18.7894 0H5.39863C3.9921 0.00104554 2.64357 0.507347 1.64891 1.40808C0.654246 2.30882 0.0948828 3.53001 0.093996 4.804V18.4887C0.0928416 19.6817 0.615282 20.826 1.54642 21.67L2.84152 22.8578C3.64917 23.5891 4.74484 24 5.88699 24C7.02914 24 8.12481 23.5891 8.93245 22.8578L8.99046 22.8052L9.04848 22.8578C9.85612 23.5891 10.9518 24 12.0939 24C13.2361 24 14.3318 23.5891 15.1394 22.8578L15.1974 22.8052L15.2554 22.8578C16.0631 23.5891 17.1588 24 18.3009 24C19.4431 24 20.5387 23.5891 21.3464 22.8578L22.6415 21.6886V21.6888C23.5778 20.8401 24.1005 19.6879 24.0939 18.4887L24.094 4.804ZM20.7838 18.4887C20.7841 18.8863 20.6098 19.2677 20.2995 19.5492L19.0084 20.7184C18.8214 20.8891 18.5665 20.985 18.3009 20.985C18.0354 20.985 17.7805 20.8891 17.5935 20.7184L16.2568 19.5079C15.9759 19.2536 15.5949 19.1106 15.1975 19.1106C14.8 19.1106 14.419 19.2536 14.1381 19.5079L12.8014 20.7184C12.6144 20.8891 12.3595 20.985 12.094 20.985C11.8284 20.985 11.5736 20.8891 11.3865 20.7184L10.0498 19.5079C9.76896 19.2536 9.38795 19.1106 8.99049 19.1106C8.59302 19.1106 8.21204 19.2536 7.93117 19.5079L6.59447 20.7184C6.40743 20.8891 6.15255 20.985 5.88701 20.985C5.62146 20.985 5.36659 20.8891 5.17955 20.7184L3.88843 19.5492C3.57815 19.2677 3.40381 18.8863 3.4041 18.4887V4.804C3.4041 4.32488 3.61423 3.86539 3.9883 3.5266C4.36238 3.18811 4.86983 2.99782 5.3986 2.99782H18.7893C19.3181 2.99782 19.8255 3.18811 20.1996 3.5266C20.5737 3.86536 20.7838 4.32489 20.7838 4.804L20.7838 18.4887Z"
                          fill="#FF623D"
                        />
                      </svg>
                    </div>
                    <h2 className="silka-semibold text-gray-900 mt-3">
                      No Invoice Found
                    </h2>
                    <Link href={'/dashboard/settings/billing'} legacyBehavior>
                      <button className="text-white text-xs silka-medium px-7 py-1.5 bg-[#FF623D] hover:opacity-90 rounded shadow shadow-[#FF623D] hover:shadow-none mt-3">
                        All Invoices
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-8">
                    {invoiceInfo.map((value: any, index: number) => {
                      return (
                        <WorkspaceComponent
                          value={value}
                          key={index}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </>
    </PageHead>
  );
}
