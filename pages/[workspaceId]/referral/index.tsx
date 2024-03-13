import DashboardLayout from '../../../layouts/Dashboard';
import { useState, useEffect } from 'react';
import { PageHead } from '../../../layouts/PageHead';
import { useRouter } from 'next/router';
import { ReferralMenu } from '../../../components/referrals/ReferralMenu';
import { AvgTimeAnalytic } from '../../../components/referrals/AvgTimeAnalytic';
import { ViewsAnalytic } from '../../../components/referrals/ViewsAnalytic';
import { UniqueAnalytic } from '../../../components/referrals/UniqueAnalytic';
import { SessionAnalytic } from '../../../components/referrals/SessionsAnalytic';
import { SignedUpChart } from '../../../components/referrals/SignedUpChart';
import { PaidConversionsChart } from '../../../components/referrals/PaidConversionsChart';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import axios from 'axios';
import toast from 'react-hot-toast';
import cx from 'classnames';
import { apiUrl } from '../../../utils/apiUrl';
import { useSession } from 'next-auth/react';
import { ConversionRateChart } from '../../../components/referrals/ConversionRateChart';

async function getUsername(userId: string) {
  try {
    const result = await axios.get(`${apiUrl()}referrals/user`, {
      params: {
        userId: userId,
      },
    });
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

export default function Refferal() {
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [workspaceId, setWorkspaceId] = useState('');
  const [timeIncrement, setTimeIncrement] = useState('7 days');
  const router = useRouter();
  const { data: session, status } = useSession();

  // Data
  const [views, setViews] = useState<any>(null);
  const [uniqueVisitors, setUniqueVisitors] = useState<any>(null);
  const [sessions, setSessions] = useState<any>(null);
  const [avgTime, setAvgTime] = useState<any>(null);
  const [conversions, setConversions] = useState<any>(null);
  const [signedUp, setSignedUp] = useState<any>(null);
  const [conversionRate, setConversionRate] = useState<any>(null);

  useEffect(() => {
    if (status === 'authenticated' && router.isReady) {
      setWorkspaceId(router.query.workspaceId as string);
      getUsername(String(session?.user?.id)).then((data) => {
        setViews(data.data.views);
        setUniqueVisitors(data.data.visitors);
        setSessions(data.data.sessions);
        setAvgTime(data.data.average_time_on_site);
        setConversions(data.data.total_size);
        setSignedUp(data.data.signups);
        if (data.data.signups === 0) {
          setConversionRate(0);
        } else {
          setConversionRate(
            (data.data.total_size / data.data.signups) * 100
          );
        }
        setUserName(data?.username);
        setIsLoading(false);
      });
    }
  }, [status, router]);

  return (
    <PageHead title="Referral Dashboard - Disperse">
      <DashboardLayout>
        <ReferralMenu
          title="Referrals"
          workspaceId={workspaceId}
          router={router}
        />
        <main className="px-3 md:px-12 pb-24 lg:px-4 xl:px-24 2xl:px-44 mt-10 flex flex-col">
          <div className="w-full rounded-lg flex flex-col justify-center items-center space-y-6 md:space-y-0 md:flex-row">
            <div className="flex flex-col space-y-1 w-full md:w-1/3">
              <p className="text-xs silka-regular text-gray-500">
                You Receive
              </p>
              <span className="silka-semibold text-xl text-[#363636]">
                20% of all revenue
              </span>
            </div>
            <div className="flex flex-col space-y-1 w-full md:w-1/3">
              <p className="text-xs silka-regular text-gray-500 space-y-1">
                Referral ID
              </p>
              {isLoading ? (
                <div className="h-6 w-32 rounded bg-gray-200 animate-pulse" />
              ) : (
                <span className="silka-semibold text-xl text-[#363636]">
                  {userName}
                </span>
              )}
            </div>
            <div className="flex flex-col space-y-1 w-full md:w-1/3 my-auto">
              <div className="flex flex-row space-x-2">
                <p className="text-xs silka-regular text-gray-500 space-y-1">
                  Automatic Tracking
                </p>
              </div>
              <span className="silka-semibold text-xl text-[#363636]">
                60 days to convert
              </span>
            </div>
          </div>
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row mt-8 justify-between items-between">
            <div className="flex flex-row space-x-3.5">
              <input
                value={`https://trydisperse.com?ref=${userName}`}
                type="text"
                className="w-64 text-sm silka-regular text-gray-600 rounded border-gray-300 focus:outline-none focus:ring-0 focus:border-[#FF623D]"
              />
              <button
                disabled={isLoading}
                onClick={() => {
                  navigator.clipboard.writeText(
                    `https://trydisperse.com?ref=${userName}`
                  );
                  toast.success('Copied To Clipboard!', {
                    className: 'text-sm silka-medium text-gray-900',
                  });
                }}
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
                    d="M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.7762 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00002H5.5C4.67158 4.00002 4 4.67159 4 5.50002V12.5C4 13.3284 4.67158 14 5.5 14H12.5C13.3284 14 14 13.3284 14 12.5V5.50002C14 4.67159 13.3284 4.00002 12.5 4.00002H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50002C5 5.22388 5.22386 5.00002 5.5 5.00002H12.5C12.7761 5.00002 13 5.22388 13 5.50002V12.5C13 12.7762 12.7761 13 12.5 13H5.5C5.22386 13 5 12.7762 5 12.5V5.50002Z"
                    fill="#ff623d"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
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
          <div className="flex flex-row mt-8 flex-wrap">
            <ViewsAnalytic
              userId={String(session?.user?.id)}
              workspaceId={workspaceId}
              timeInterval={timeIncrement}
              views={views}
            />
            <UniqueAnalytic
              userId={String(session?.user?.id)}
              workspaceId={workspaceId}
              timeInterval={timeIncrement}
              uniqueVisitors={uniqueVisitors}
            />
            <SessionAnalytic
              userId={String(session?.user?.id)}
              workspaceId={workspaceId}
              timeInterval={timeIncrement}
              sessions={sessions}
            />
            <AvgTimeAnalytic
              workspaceId={workspaceId}
              userId={String(session?.user?.id)}
              timeInterval={timeIncrement}
              avgTime={avgTime}
            />
          </div>
          <hr className="w-full my-4" />
          <div className="w-full ">
            <PaidConversionsChart
              userId={String(session?.user?.id)}
              workspaceId={workspaceId}
              timeInterval={timeIncrement}
              conversions={conversions}
            />
          </div>
          <hr className="w-full my-4" />
          <div className="flex flex-row flex-wrap">
            <SignedUpChart
              userId={String(session?.user?.id)}
              workspaceId={workspaceId}
              timeInterval={timeIncrement}
              signedUp={signedUp}
            />
            <ConversionRateChart
              workspaceId={workspaceId}
              userId={String(session?.user?.id)}
              timeInterval={timeIncrement}
              conversionRate={conversionRate}
            />
          </div>
        </main>
      </DashboardLayout>
    </PageHead>
  );
}
