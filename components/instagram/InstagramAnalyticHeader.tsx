import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { apiUrl } from '../../utils/apiUrl';
import cx from 'classnames';
import { useSession } from 'next-auth/react';
import { ProUpgradeDialog } from '../../layouts/upgrade/ProUpgradeDialog';
import * as DialogPrimitive from '@radix-ui/react-dialog';

interface Props {
  workspaceId: string;
  timeIncrement: string;
  setTimeIncrement: Dispatch<SetStateAction<string>>;
  isPremium: boolean;
}

async function getUserData(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}instagram/read/profile`,
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

export function InstagramAnalyticHeader({
  workspaceId,
  timeIncrement,
  setTimeIncrement,
  isPremium,
}: Props) {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    getUserData(workspaceId).then((value) => {
      setUserInfo(value);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="flex flex-col">
      {!isPremium && (
        <div className="w-full py-6 border border-gray-200 rounded-lg flex flex-col justify-center items-center space-y-5">
          <div className="bg-gray-100 rounded py-1 px-3.5 flex flex-row space-x-2">
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="my-auto mt-[3px]"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.24457 7.6542C4.91848 7.36772 4.91848 6.90326 5.24457 6.61678L7.40955 4.71486C7.73565 4.42838 8.26435 4.42838 8.59045 4.71486L10.7554 6.61678C11.0815 6.90326 11.0815 7.36772 10.7554 7.65419C10.4293 7.94067 9.90063 7.94067 9.57453 7.65419L8.83502 7.00454V10.7664C8.83502 11.1716 8.46117 11.5 8 11.5C7.53883 11.5 7.16498 11.1716 7.16498 10.7664V7.00454L6.42547 7.6542C6.09937 7.94067 5.57067 7.94067 5.24457 7.6542Z"
                fill="#4B5563"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8 13.5C11.0376 13.5 13.5 11.0376 13.5 8C13.5 4.96243 11.0376 2.5 8 2.5C4.96243 2.5 2.5 4.96243 2.5 8C2.5 11.0376 4.96243 13.5 8 13.5ZM8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z"
                fill="#4B5563"
              />
            </svg>
            <p className="silka-semibold text-sm text-gray-600">
              PRO FEATURE
            </p>
          </div>
          <p className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-32 text-sm silka-regular text-gray-600 text-center">
            Upgrade to pro to view all of your Instagram{' '}
            <span className="silka-semibold">analytics</span>,
            optimize your content to the{' '}
            <span className="silka-semibold">
              highest performing times
            </span>
            , and <span className="silka-semibold">iterate</span> your
            your content strategy.
          </p>
          <div>
            <DialogPrimitive.Root
              open={isDialogOpen}
              onOpenChange={setIsDialogOpen}
            >
              <DialogPrimitive.Trigger asChild>
                <button className="flex flex-row space-x-2 rounded hover:opacity-80 py-1.5 px-6 bg-[#F604D0]">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="my-auto"
                  >
                    <path
                      d="M8.69667 0.0403541C8.90859 0.131038 9.03106 0.354857 8.99316 0.582235L8.0902 6.00001H12.5C12.6893 6.00001 12.8625 6.10701 12.9472 6.27641C13.0319 6.4458 13.0136 6.6485 12.8999 6.80001L6.89997 14.8C6.76167 14.9844 6.51521 15.0503 6.30328 14.9597C6.09135 14.869 5.96888 14.6452 6.00678 14.4178L6.90974 9H2.49999C2.31061 9 2.13748 8.893 2.05278 8.72361C1.96809 8.55422 1.98636 8.35151 2.09999 8.2L8.09997 0.200038C8.23828 0.0156255 8.48474 -0.0503301 8.69667 0.0403541ZM3.49999 8.00001H7.49997C7.64695 8.00001 7.78648 8.06467 7.88148 8.17682C7.97648 8.28896 8.01733 8.43723 7.99317 8.5822L7.33027 12.5596L11.5 7.00001H7.49997C7.353 7.00001 7.21347 6.93534 7.11846 6.8232C7.02346 6.71105 6.98261 6.56279 7.00678 6.41781L7.66968 2.44042L3.49999 8.00001Z"
                      fill="white"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <p className="text-xs md:text-sm my-auto silka-medium text-white">
                    Upgrade To Pro
                  </p>
                </button>
              </DialogPrimitive.Trigger>
              <ProUpgradeDialog
                isOpen={isDialogOpen}
                setIsOpen={setIsDialogOpen}
                workspaceId={workspaceId}
                userId={String(session?.user?.id)}
                userName={String(session?.user?.name)}
                email={String(session?.user?.email)}
              />
            </DialogPrimitive.Root>
          </div>
        </div>
      )}
      <div
        className={
          'w-full flex flex-row justify-between items-between ' +
          (isPremium ? '' : 'mt-9')
        }
      >
        <div className="flex flex-row">
          {isLoading ? (
            <div className="h-[48px] w-[48px] rounded-full bg-gray-200 animate-pulse" />
          ) : (
            <img
              className="h-[48px] w-[48px] my-auto rounded-full"
              src={userInfo.profile_picture_url}
            />
          )}
          <div className="flex ml-3 mt-0.5 my-auto flex-col space-y-0.5">
            {isLoading ? (
              <div className="h-[16px] w-[78px] bg-gray-200 rounded" />
            ) : (
              <p className="silka-semibold text-base text-gray-900">
                {userInfo.name}
              </p>
            )}
            {isLoading ? (
              <div className="h-[16px] w-[160px] bg-gray-200 rounded" />
            ) : (
              <p className="silka-regular text-xs text-gray-500">
                @{userInfo.username}
              </p>
            )}
          </div>
          {!isPremium && (
            <div className="ml-6 my-auto px-4 py-1 rounded bg-[#F604D0]">
              <p className="text-xs silka-medium text-white">
                This is Sample Data
              </p>
            </div>
          )}
        </div>
        <div className="my-auto">
          <DropdownMenuPrimitive.Root>
            <DropdownMenuPrimitive.Trigger asChild>
              <button className="flex flex-row justify-between items-between space-x-3 text-sm silka-medium rounded border px-4 py-1">
                <p className="text-sm silka-medium">
                  {timeIncrement}
                </p>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="my-auto mb-0.5"
                >
                  <path
                    d="M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.73379 9.9026 7.61934 9.95001 7.49999 9.95001C7.38064 9.95001 7.26618 9.9026 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </DropdownMenuPrimitive.Trigger>
            <DropdownMenuPrimitive.Portal>
              <DropdownMenuPrimitive.Content
                align="end"
                sideOffset={5}
                className={cx(
                  'flex flex-col space-y-0.5 radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
                  'w-44 rounded-lg py-1.5 shadow-md',
                  'bg-[#363636]'
                )}
              >
                <button
                  onClick={() => {
                    setTimeIncrement('7 days');
                  }}
                  className="flex flex-col hover:bg-[#3D3D3D] justify-start items-start"
                >
                  {timeIncrement == '7 days' ? (
                    <DropdownMenuPrimitive.Item className="py-1.5 px-3 w-full flex flex-row justify-start items-start space-x-2">
                      <svg
                        width="13.3"
                        height="10"
                        viewBox="0 0 4 3"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="my-auto mt-1"
                      >
                        <path
                          d="M2.664 0.535522L2.44778 0.751745C1.97151 1.22904 1.60433 1.62926 1.16794 2.07601L0.724394 1.7008L0.490674 1.50368L0.0964203 1.96951L0.33014 2.16664L0.991508 2.72627L1.20613 2.90749L1.40486 2.70877C1.9538 2.15861 2.34384 1.72009 2.8802 1.18256L3.09642 0.966333L2.664 0.535522Z"
                          fill="white"
                        />
                      </svg>
                      <span className="my-auto text-sm silka-medium text-white">
                        7 days
                      </span>
                    </DropdownMenuPrimitive.Item>
                  ) : (
                    <DropdownMenuPrimitive.Item className="py-1.5 px-3 w-full flex flex-col justify-start items-start">
                      <span className="text-sm silka-medium text-white">
                        7 days
                      </span>
                    </DropdownMenuPrimitive.Item>
                  )}
                </button>
                <button
                  onClick={() => {
                    setTimeIncrement('14 days');
                  }}
                  className="flex flex-col hover:bg-[#3D3D3D] justify-start items-start"
                >
                  {timeIncrement == '14 days' ? (
                    <DropdownMenuPrimitive.Item className="py-1.5 px-3 w-full flex flex-row justify-start items-start space-x-2">
                      <svg
                        width="13.3"
                        height="10"
                        viewBox="0 0 4 3"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="my-auto mt-1"
                      >
                        <path
                          d="M2.664 0.535522L2.44778 0.751745C1.97151 1.22904 1.60433 1.62926 1.16794 2.07601L0.724394 1.7008L0.490674 1.50368L0.0964203 1.96951L0.33014 2.16664L0.991508 2.72627L1.20613 2.90749L1.40486 2.70877C1.9538 2.15861 2.34384 1.72009 2.8802 1.18256L3.09642 0.966333L2.664 0.535522Z"
                          fill="white"
                        />
                      </svg>
                      <span className="my-auto text-sm silka-medium text-white">
                        14 days
                      </span>
                    </DropdownMenuPrimitive.Item>
                  ) : (
                    <DropdownMenuPrimitive.Item className="py-1.5 w-full px-3 flex flex-col justify-start items-start">
                      <span className="text-sm silka-medium text-white">
                        14 days
                      </span>
                    </DropdownMenuPrimitive.Item>
                  )}
                </button>
                <button
                  onClick={() => {
                    setTimeIncrement('Last Month');
                  }}
                  className="flex flex-col hover:bg-[#3D3D3D] justify-start items-start"
                >
                  {timeIncrement == 'Last Month' ? (
                    <DropdownMenuPrimitive.Item className="py-1.5 px-3 flex w-full flex-row justify-start items-start space-x-2">
                      <svg
                        width="13.3"
                        height="10"
                        viewBox="0 0 4 3"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="my-auto mt-1"
                      >
                        <path
                          d="M2.664 0.535522L2.44778 0.751745C1.97151 1.22904 1.60433 1.62926 1.16794 2.07601L0.724394 1.7008L0.490674 1.50368L0.0964203 1.96951L0.33014 2.16664L0.991508 2.72627L1.20613 2.90749L1.40486 2.70877C1.9538 2.15861 2.34384 1.72009 2.8802 1.18256L3.09642 0.966333L2.664 0.535522Z"
                          fill="white"
                        />
                      </svg>
                      <span className="text-sm silka-medium my-auto text-white ">
                        Last Month
                      </span>
                    </DropdownMenuPrimitive.Item>
                  ) : (
                    <DropdownMenuPrimitive.Item className="py-1.5 px-3 w-full flex flex-col justify-start items-start">
                      <span className="text-sm silka-medium text-white">
                        Last Month
                      </span>
                    </DropdownMenuPrimitive.Item>
                  )}
                </button>
                <button
                  onClick={() => {
                    setTimeIncrement('Last 3 Months');
                  }}
                  className="flex flex-col hover:bg-[#3D3D3D] justify-start items-start"
                >
                  {timeIncrement == 'Last 3 Months' ? (
                    <DropdownMenuPrimitive.Item className="py-1.5 px-3 flex w-full flex-row justify-start items-start space-x-2">
                      <svg
                        width="13.3"
                        height="10"
                        viewBox="0 0 4 3"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="my-auto mt-1"
                      >
                        <path
                          d="M2.664 0.535522L2.44778 0.751745C1.97151 1.22904 1.60433 1.62926 1.16794 2.07601L0.724394 1.7008L0.490674 1.50368L0.0964203 1.96951L0.33014 2.16664L0.991508 2.72627L1.20613 2.90749L1.40486 2.70877C1.9538 2.15861 2.34384 1.72009 2.8802 1.18256L3.09642 0.966333L2.664 0.535522Z"
                          fill="white"
                        />
                      </svg>
                      <span className="text-sm my-auto silka-medium text-white">
                        Last 3 Months
                      </span>
                    </DropdownMenuPrimitive.Item>
                  ) : (
                    <DropdownMenuPrimitive.Item className="py-1 px-3 w-full flex flex-col justify-start items-start">
                      <span className="text-sm silka-medium text-white">
                        Last 3 Months
                      </span>
                    </DropdownMenuPrimitive.Item>
                  )}
                </button>
                <button
                  onClick={() => {
                    setTimeIncrement('Last Year');
                  }}
                  className="flex flex-col hover:bg-[#3D3D3D] justify-start items-start"
                >
                  {timeIncrement == 'Last Year' ? (
                    <DropdownMenuPrimitive.Item className="py-1.5 px-3 flex w-full flex-row justify-start items-start space-x-2">
                      <svg
                        width="13.3"
                        height="10"
                        viewBox="0 0 4 3"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="my-auto mt-1"
                      >
                        <path
                          d="M2.664 0.535522L2.44778 0.751745C1.97151 1.22904 1.60433 1.62926 1.16794 2.07601L0.724394 1.7008L0.490674 1.50368L0.0964203 1.96951L0.33014 2.16664L0.991508 2.72627L1.20613 2.90749L1.40486 2.70877C1.9538 2.15861 2.34384 1.72009 2.8802 1.18256L3.09642 0.966333L2.664 0.535522Z"
                          fill="white"
                        />
                      </svg>
                      <span className="text-sm my-auto silka-medium text-white">
                        Last Year
                      </span>
                    </DropdownMenuPrimitive.Item>
                  ) : (
                    <DropdownMenuPrimitive.Item className="py-1.5 px-3 w-full flex flex-col justify-start items-start">
                      <span className="text-sm silka-medium text-white">
                        Last Year
                      </span>
                    </DropdownMenuPrimitive.Item>
                  )}
                </button>
              </DropdownMenuPrimitive.Content>
            </DropdownMenuPrimitive.Portal>
          </DropdownMenuPrimitive.Root>
        </div>
      </div>
    </div>
  );
}
