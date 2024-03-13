import Link from 'next/link';
import Image from 'next/image';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';
import { signOut } from 'next-auth/react';
import { useState } from 'react';
import { DisperseLogoSmall } from '../components/logos/DisperseLogo';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../utils/apiUrl';

interface DashboardTopbarProps {
  userInfo: any;
  pathname: string;
}

export function DashboardTopbar({
  userInfo,
  pathname,
}: DashboardTopbarProps) {
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  axiosRetry(axios, { retries: 3 });

  async function handleFeedbackSubmit(e: any) {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${apiUrl()}other/feedback`,
        null,
        {
          params: {
            userId: userInfo.id,
            feedbackMessage: feedbackText,
          },
        }
      );
      setFeedbackText('');
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <header className="flex flex-col w-full justify-center itmes-center">
      <div className="w-full flex flex-col justify-center items-center mt-6">
        <div className="w-[90%] lg:w-[70%] 2xl:w-3/5 flex flex-row justify-between">
          <Link href="/dashboard" legacyBehavior>
            <button className="hover:opacity-90">
              <DisperseLogoSmall />
            </button>
          </Link>
          <div className="flex flex-row space-x-4 lg:space-x-6">
            <Link href="/dashboard" legacyBehavior>
              <button className="text-xs lg:text-sm silka-medium text-[#414141] hover:opacity-90">
                Dashboard
              </button>
            </Link>
            <a
              href="/contact/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs my-auto lg:text-sm silka-medium text-[#414141] hover:opacity-90"
            >
              Help
            </a>
            <DropdownMenuPrimitive.Root
              open={feedbackOpen}
              onOpenChange={setFeedbackOpen}
            >
              <DropdownMenuPrimitive.Trigger asChild>
                <button className="hidden lg:visible text-sm px-4 py-1 h-fit my-auto border bg-[#FBFBFB] border-[#D9D9D9] rounded silka-medium text-[#414141] hover:opacity-90">
                  Feedback
                </button>
              </DropdownMenuPrimitive.Trigger>
              <DropdownMenuPrimitive.Portal>
                <DropdownMenuPrimitive.Content
                  align="end"
                  sideOffset={5}
                  className={cx(
                    'flex flex-col space-y-1 radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
                    'rounded-lg py-2 shadow-md w-72',
                    'bg-[#333333]'
                  )}
                >
                  <div className="px-4">
                    <p className="text-sm silka-medium text-white mt-2">
                      FEEDBACK
                    </p>
                    <textarea
                      value={feedbackText}
                      onChange={(e) =>
                        setFeedbackText(e.target.value)
                      }
                      placeholder="Send feedback..."
                      className="bg-[#404040] border border-[#585858] text-xs silka-regular text-[#BCBCBC] mt-2 resize-none h-24 rounded w-full focus:ring-0 focus:border-[#FF623D]"
                    ></textarea>
                    <div className="flex flex-row justify-end items-end">
                      <button
                        onClick={(e) => {
                          handleFeedbackSubmit(e);
                          setFeedbackOpen(false);
                        }}
                        className="w-fit px-6 py-1 my-2 bg-[#FF623D] text-white text-xs silka-medium rounded hover:opacity-90"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </DropdownMenuPrimitive.Content>
              </DropdownMenuPrimitive.Portal>
            </DropdownMenuPrimitive.Root>
            <DropdownMenuPrimitive.Root>
              <DropdownMenuPrimitive.Trigger asChild>
                <button className="flex flex-row space-x-1 justify-center items-center">
                  {userInfo?.image ? (
                    <Image
                      alt="profile picture"
                      className="rounded-full"
                      src={userInfo.image}
                      width={30}
                      height={30}
                    />
                  ) : (
                    <div className="w-[30px] animate-pulse h-[30px] rounded-full bg-gray-200"></div>
                  )}
                </button>
              </DropdownMenuPrimitive.Trigger>
              <DropdownMenuPrimitive.Portal>
                <DropdownMenuPrimitive.Content
                  align="end"
                  sideOffset={5}
                  className={cx(
                    'flex flex-col space-y-1 radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
                    'w-48 rounded-lg py-2 shadow-md md:w-56',
                    'bg-[#333333]'
                  )}
                >
                  <Link href="/dashboard" legacyBehavior>
                    <button className="hover:bg-[#404040] flex flex-row justify-start items-start">
                      <span className="px-4 py-2 text-sm silka-medium text-white">
                        Dashboard
                      </span>
                    </button>
                  </Link>
                  <DropdownMenuPrimitive.Separator className="my-1 h-px bg-[#585858]" />
                  <Link href="/dashboard/settings" legacyBehavior>
                    <button className="hover:bg-[#404040] flex flex-row justify-start items-start">
                      <span className="px-4 py-2 text-sm silka-medium text-white">
                        Account Settings
                      </span>
                    </button>
                  </Link>
                  <Link
                    href="/dashboard/settings/billing"
                    legacyBehavior
                  >
                    <button className="hover:bg-[#404040] flex flex-row justify-start items-start">
                      <span className="px-4 py-2 text-sm silka-medium text-white">
                        Workspace Usage
                      </span>
                    </button>
                  </Link>
                  <Link href="/contact" legacyBehavior>
                    <button className="hover:bg-[#404040] flex flex-row justify-start items-start">
                      <span className="px-4 py-2 text-sm silka-medium text-white">
                        Support
                      </span>
                    </button>
                  </Link>
                  <DropdownMenuPrimitive.Separator className="my-1 h-px bg-[#585858]" />
                  <button
                    onClick={() => {
                      signOut({
                        callbackUrl: 'https://trydisperse.com/signin',
                      });
                      localStorage.clear();
                    }}
                    className="hover:bg-[#404040] flex flex-row justify-start items-start"
                  >
                    <span className="px-4 py-2 text-sm silka-medium text-white">
                      Log out
                    </span>
                  </button>
                </DropdownMenuPrimitive.Content>
              </DropdownMenuPrimitive.Portal>
            </DropdownMenuPrimitive.Root>
          </div>
        </div>
        <div className="mt-6 lg:mt-8 mb-3 lg:mb-2.5 flex text-xs lg:text-sm flex-row w-[90%] lg:w-[70%] 2xl:w-3/5 space-x-1 lg:space-x-2 z-10">
          <Link
            href="/dashboard"
            className={
              'hover:bg-gray-100 rounded py-1 px-3 ' +
              (pathname == '/dashboard'
                ? 'silka-semibold underline underline-offset-[19px] decoration-2 decoration-[#FF623D] text-[#353535]'
                : 'text-[#848484] silka-medium')
            }
          >
            Overview
          </Link>
          <Link
            href="/dashboard/members"
            className={
              'hover:bg-gray-100 rounded py-1 px-3 ' +
              (pathname == '/dashboard/members'
                ? 'silka-semibold underline underline-offset-[19px] decoration-2 decoration-[#FF623D] text-[#353535]'
                : 'silka-medium text-[#848484]')
            }
          >
            Members
          </Link>
          <Link
            href="/dashboard/settings"
            className={
              'hover:bg-gray-100 rounded py-1 px-3 ' +
              (pathname == '/dashboard/settings'
                ? 'silka-semibold underline underline-offset-[19px] decoration-2 decoration-[#FF623D] text-[#353535]'
                : 'silka-medium text-[#848484]')
            }
          >
            Settings
          </Link>
        </div>
        <hr className="w-full" />
      </div>
    </header>
  );
}
