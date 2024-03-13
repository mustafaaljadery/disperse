import axios from 'axios';
import axiosRetry from 'axios-retry';
import React, { useState, useEffect } from 'react';
import { getSession, useSession } from 'next-auth/react';
import Router, { useRouter } from 'next/router';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';
import Link from 'next/link';
import { apiUrl } from '../../utils/apiUrl';

interface WorkspaceProps {
  value: any;
}

async function getWorkspace(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}workspace/read/workspace`,
      { params: { workspaceId: workspaceId } }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function getThreeWorkspaces(userId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}workspace/read/threeworkspaces`,
      {
        params: {
          userId: userId,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

function Workspace({ value }: WorkspaceProps) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        window.location.href = '/' + value.id;
      }}
      className="flex flex-row space-x-2 px-1.5 rounded py-1 hover:bg-[#3D3D3D]"
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="my-auto"
      >
        <path
          d="M5.5 4.625C6.12132 4.625 6.625 4.12132 6.625 3.5C6.625 2.87868 6.12132 2.375 5.5 2.375C4.87868 2.375 4.375 2.87868 4.375 3.5C4.375 4.12132 4.87868 4.625 5.5 4.625ZM9.5 4.625C10.1213 4.625 10.625 4.12132 10.625 3.5C10.625 2.87868 10.1213 2.375 9.5 2.375C8.87868 2.375 8.375 2.87868 8.375 3.5C8.375 4.12132 8.87868 4.625 9.5 4.625ZM10.625 7.5C10.625 8.12132 10.1213 8.625 9.5 8.625C8.87868 8.625 8.375 8.12132 8.375 7.5C8.375 6.87868 8.87868 6.375 9.5 6.375C10.1213 6.375 10.625 6.87868 10.625 7.5ZM5.5 8.625C6.12132 8.625 6.625 8.12132 6.625 7.5C6.625 6.87868 6.12132 6.375 5.5 6.375C4.87868 6.375 4.375 6.87868 4.375 7.5C4.375 8.12132 4.87868 8.625 5.5 8.625ZM10.625 11.5C10.625 12.1213 10.1213 12.625 9.5 12.625C8.87868 12.625 8.375 12.1213 8.375 11.5C8.375 10.8787 8.87868 10.375 9.5 10.375C10.1213 10.375 10.625 10.8787 10.625 11.5ZM5.5 12.625C6.12132 12.625 6.625 12.1213 6.625 11.5C6.625 10.8787 6.12132 10.375 5.5 10.375C4.87868 10.375 4.375 10.8787 4.375 11.5C4.375 12.1213 4.87868 12.625 5.5 12.625Z"
          fill="#FFFFFF"
          fillRule="evenodd"
          clipRule="evenodd"
        ></path>
      </svg>
      <img
        src={value.image}
        className="h-[28px] my-auto w-[28px] rounded"
      />
      <div className="flex flex-col justify-start items-start space-y-1 my-auto">
        <p className="text-start text-xs silka-medium text-white">
          {value.name}
        </p>
        <div className="flex flex-row justify-start items-start space-x-1 text-[9px] silka-regular text-gray-100">
          <p className="text-start">
            {value.plan.slice(0, 1) +
              value.plan.slice(1).toLowerCase()}{' '}
            plan
          </p>
          <p>&middot;</p>
          <p>
            {value.members}{' '}
            {value.members == 1 ? 'member' : 'members'}
          </p>
        </div>
      </div>
    </button>
  );
}

export function SideBarWorkspace() {
  const [data, setData] = useState<any>(null);
  const [main, setMain] = useState<any>(null);
  const [threeWorkspaces, setThreeWorkspaces] = useState<any>([]);
  const [isLoading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status == 'authenticated' && router.isReady) {
      Promise.all([
        getWorkspace(String(router.query.workspaceId)),
        getThreeWorkspaces(String(session.user.id)),
      ]).then((values) => {
        setMain(values[0]);
        setThreeWorkspaces(values[1]);
        setLoading(false);
      });
    } else if (status == 'unauthenticated') {
      Router.push('/signin');
    }
  }, [status, router.isReady]);

  if (isLoading)
    return (
      <div className="w-full px-4">
        <div className="hover:bg-[#E5E5E5] rounded-lg h-10 flex flex-row justify-between items-between">
          <button className="flex flex-row space-x-3 px-1">
            <div className="h-8 w-8 rounded my-auto bg-gray-200" />
            <div className="w-36 h-4 rounded bg-gray-200 my-auto" />
          </button>
        </div>
      </div>
    );

  return (
    <div className="px-3 w-full">
      <DropdownMenuPrimitive.Root>
        <DropdownMenuPrimitive.Trigger className="w-full" asChild>
          <div className="hover:bg-[#E5E5E5] w-full rounded h-10 flex flex-row justify-between items-between">
            <button className="flex flex-row justify-between items-between w-full px-1">
              <div className="flex flex-row space-x-2.5 my-auto">
                <img
                  className="my-auto rounded h-8 w-8"
                  src={main.image}
                />
                <p className="silka-medium my-auto lg:text-sm xl:text-base text-gray-900">
                  {main.name.length > 12
                    ? main.name.slice(0, 11) + '...'
                    : main.name}
                </p>
              </div>
              <div className="px-2 py-0.5 my-auto rounded bg-[#4D4D4D]">
                <p className="text-[9px] text-white silka-regular">
                  {main.plan}
                </p>
              </div>
            </button>
          </div>
        </DropdownMenuPrimitive.Trigger>
        <DropdownMenuPrimitive.Portal>
          <DropdownMenuPrimitive.Content
            align="start"
            sideOffset={7}
            className={cx(
              ' radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
              'rounded-lg py-2 px-2 shadow-md w-72',
              'bg-[#363636]'
            )}
          >
            <p className="text-[11px] silka-medium text-gray-50 px-3">
              {session?.user.email}
            </p>
            <DropdownMenuPrimitive.Separator className="my-2 h-px bg-[#616161]" />
            <div className="flex flex-col space-y-1">
              {threeWorkspaces?.map(
                (workspace: any, index: number) => {
                  return <Workspace key={index} value={workspace} />;
                }
              )}
            </div>
            <DropdownMenuPrimitive.Separator className="my-1 h-px bg-[#616161]" />
            <DropdownMenuPrimitive.Item className="py-0.5">
              <div className="py-1.5 hover:bg-[#3D3D3D] rounded">
                <Link href="/dashboard" legacyBehavior>
                  <button className="px-3 rounded-lg silka-medium text-white text-xs w-full flex flex-row space-x-2 justify-start items-start">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="my-auto mt-0.5"
                    >
                      <path
                        d="M12.5 2H2.5C2.22386 2 2 2.22386 2 2.5V12.5C2 12.7761 2.22386 13 2.5 13H12.5C12.7761 13 13 12.7761 13 12.5V2.5C13 2.22386 12.7761 2 12.5 2ZM2.5 1C1.67157 1 1 1.67157 1 2.5V12.5C1 13.3284 1.67157 14 2.5 14H12.5C13.3284 14 14 13.3284 14 12.5V2.5C14 1.67157 13.3284 1 12.5 1H2.5Z"
                        fill="#ffffff"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <p className="my-auto">All Workspaces</p>
                  </button>
                </Link>
              </div>
            </DropdownMenuPrimitive.Item>
          </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Portal>
      </DropdownMenuPrimitive.Root>
    </div>
  );
}
