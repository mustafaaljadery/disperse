import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import axios from 'axios';
import axiosRetry from 'axios-retry';

import cx from 'classnames';
import React, { ReactNode, useEffect, useState } from 'react';
import Image from 'next/image';
import { Scroll } from '../utils/Scroll';
import { apiUrl } from '../../utils/apiUrl';
var validator = require('validator');
import toast from 'react-hot-toast';
import Link from 'next/link';

interface Props {
  workspaceId: string;
  userId: string;
}

interface MemberProps {
  value: any;
}

async function getWorkspaceData(workspaceId: string, userId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}workspace/read/workspacemembers`,
      {
        params: {
          workspaceId: workspaceId,
          userId: userId,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

function Member({ value }: MemberProps) {
  return (
    <div className="w-full flex flex-row justify-between items-between">
      <div className="flex flex-row space-x-2">
        {value.image ? (
          <Image
            alt="profile picture"
            src={value.image}
            height={32}
            width={32}
            className="rounded-lg"
          />
        ) : (
          <div className="bg-gray-200 h-[32px] w-[32px] rounded-lg"></div>
        )}
        <div className="flex flex-col space-y-0.5 my-auto">
          {value.name ? (
            <p className="text-[11px] silka-medium text-gray-900">
              {value.name}
            </p>
          ) : (
            <p className="text-[11px] silka-medium text-gray-900">
              Pending...
            </p>
          )}
          <span className="text-[9px] silka-medium text-gray-500">
            {value.email}
          </span>
        </div>
      </div>
      <p className="text-[11px] text-gray-400 silka-regular my-auto">
        {value.role.slice(0, 1) + value.role.slice(1).toLowerCase()}
      </p>
    </div>
  );
}

export function Share({ workspaceId, userId }: Props) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [membersData, setMembersData] = useState<any>(null);
  const [refetchData, setRefetchData] = useState(false);

  async function handleAddMember() {
    try {
      if (validator.isEmail(email)) {
        axiosRetry(axios, { retries: 3 });

        const result = await axios.post(
          `${apiUrl()}workspace/update/addmember`,
          null,
          {
            params: {
              workspaceId: workspaceId,
              email: email,
              userId: userId,
            },
          }
        );
        setRefetchData(true);
        setEmail('');
        return result.data;
      } else {
        toast.error('Please enter a valid email!', {
          className: 'text-sm silka-medium text-gray-900',
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getWorkspaceData(workspaceId, userId).then((value) => {
      setMembersData(value?.members);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (refetchData) {
      getWorkspaceData(workspaceId, userId).then((value) => {
        setMembersData(value?.members);
        setRefetchData(false);
      });
    }
  }, [refetchData]);

  return (
    <div className="my-auto">
      <DropdownMenuPrimitive.Root>
        <DropdownMenuPrimitive.Trigger asChild>
          <button className="py-1 my-auto mt-0.5 px-4 text-[#363636] text-[10px] hover:opacity-80 border border-gray-300 bg-[#FBFBFB] rounded silka-medium lg:text-xs">
            Invite
          </button>
        </DropdownMenuPrimitive.Trigger>
        <DropdownMenuPrimitive.Portal>
          <DropdownMenuPrimitive.Content
            align="start"
            sideOffset={5}
            className={cx(
              'mr-5 px-3 radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
              'w-[320px] md:w-[400px] rounded-xl py-3 shadow-md',
              'bg-white border border-gray-200 z-10'
            )}
          >
            <div className="flex w-full flex-col">
              <div className="flex flex-row justify-between items-between">
                <div className="flex flex-row space-x-1.5">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="my-auto"
                  >
                    <path
                      d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z"
                      fill="#363636"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <h2 className="text-base my-auto text-[#363636] silka-medium">
                    Invite Users
                  </h2>
                </div>
                <Link
                  href={'/' + workspaceId + '/settings/members'}
                  legacyBehavior
                >
                  <button className="flex flex-row space-x-1 px-3 py-1 my-auto text-[10px] silka-medium text-[#363636] hover:bg-gray-100 rounded">
                    <p>More User Info</p>
                    <svg
                      width="10"
                      height="10"
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
                </Link>
              </div>
              <form
                className="mt-3 flex flex-row space-x-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAddMember();
                }}
              >
                <input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="test@example.com"
                  type="email"
                  className="placeholder:text-gray-400 text-[#363636] w-4/5 text-xs silka-medium rounded focus:ring-0 py-1.5 border-gray-300 focus:border-[#FF623D]"
                />
                <button
                  type="submit"
                  className="w-1/5 text-xs silka-medium text-white rounded py-1.5 hover:opacity-90 bg-[#FF623D]"
                >
                  Send
                </button>
              </form>
              <hr className="w-full my-3.5" />
              {isLoading ? (
                <div className="h-[300px] flex flex-col space-y-3">
                  <div className="h-10 w-full bg-gray-200 animate-pulse rounded" />
                  <div className="h-10 w-full bg-gray-200 animate-pulse rounded" />
                  <div className="h-10 w-full bg-gray-200 animate-pulse rounded" />
                </div>
              ) : (
                <div className="h-[300px]">
                  <Scroll>
                    <div className="flex flex-col space-y-4">
                      {membersData.map(
                        (value: any, index: number) => {
                          return <Member key={index} value={value} />;
                        }
                      )}
                    </div>
                  </Scroll>
                </div>
              )}
            </div>
            <DropdownMenuPrimitive.Separator />
          </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Portal>
      </DropdownMenuPrimitive.Root>
    </div>
  );
}
