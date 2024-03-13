import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { clsx } from 'clsx';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../../utils/apiUrl';
import { Scroll } from '../../utils/Scroll';

interface Props {
  workspaceId: string;
}

interface ProfileProps {
  value: any;
}

async function getProfile(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}twitter/read/userdata`,
      { params: { workspaceId: workspaceId } }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

function Profile({ value }: ProfileProps) {
  return <div className=""></div>;
}

export function TwitterMultiAccount({ workspaceId }: Props) {
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    getProfile(workspaceId).then((value) => {
      setProfileData(value);
    });
  }, []);

  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild>
        <button className="flex flex-row my-auto space-x-12 px-2 bg-gray-50 hover:bg-gray-100 py-1 rounded">
          <div className="flex flex-row space-x-2">
            <img
              className="h-[22px] w-[22px] rounded-full"
              src={profileData?.profile_image_url}
            />
            <p className="text-gray-600 text-sm my-auto silka-semibold">
              {profileData?.name}
            </p>
          </div>
          <svg
            width="12"
            height="12"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="my-auto mt-[3px]"
          >
            <path
              d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
              fill="#363636"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          align="start"
          sideOffset={10}
          className={clsx(
            'radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
            'w-[340px] rounded-lg px-1.5 py-1 shadow-md',
            'bg-white dark:bg-gray-800'
          )}
        >
          <div className="flex flex-col">
            <div className="h-[200px]">
              <Scroll>
                <></>
              </Scroll>
            </div>
            <hr className="my-2" />
            <button className="flex flex-row space-x-2">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="my-auto"
              >
                <path
                  d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                  fill="#363636"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
              <p className="silka-medium text-gray-500 text-sm">
                Connect New Twitter Account
              </p>
            </button>
          </div>
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
}
