import DashboardLayout from '../../../layouts/Dashboard';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SettingsMenu } from '../../../components/settings/SettingsMenu';
import { LoadingScreen } from '../../../components/Loading';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { PageHead } from '../../../layouts/PageHead';
import { apiUrl } from '../../../utils/apiUrl';
import { DisperseLogoTiny } from '../../../components/logos/DisperseLogo';
import Router from 'next/router';

async function getUsage(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}workspace/read/workspaceusage`,
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

export default function SettingsUsage() {
  const [workspaceId, setWorkspaceId] = useState('');
  const [usageData, setUsageData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  var monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  useEffect(() => {
    if (router.isReady) {
      setWorkspaceId(String(router.query.workspaceId));
      getUsage(String(router.query.workspaceId)).then((value) => {
        setUsageData(value);
        setIsLoading(false);
      });
    }
  }, [router.isReady]);

  const storageProgress =
    (usageData?.month_usage?.storage_mbytes /
      (usageData?.plan == 'STARTER'
        ? 2 * 1000
        : usageData?.plan == 'PRO'
        ? 200 * 1000
        : usageData?.plan == 'TEAM'
        ? 500 * 1000
        : 400000000000000)) *
    100;

  const automationsProgress =
    (usageData?.month_usage?.automation_runs /
      (usageData?.plan == 'STARTER'
        ? 100
        : usageData?.plan == 'PRO'
        ? 1000
        : usageData?.plan == 'TEAM'
        ? 3000
        : 10000000)) *
    100;

  const teamGuestProgress =
    (usageData?.members /
      (usageData?.plan == 'STARTER' || 'PRO' ? 5 : 1000000)) *
    100;

  return (
    <PageHead title="Usage · Disperse">
      <DashboardLayout>
        <>
          <SettingsMenu
            title="Usage"
            workspaceId={workspaceId}
            router={router}
          />
          <main className="px-3 md:px-12 lg:px-8 xl:px-48 2xl:px-74 mt-10">
            <div className="flex flex-row justify-between items-between">
              <div className="flex flex-col space-y-1.5">
                {isLoading ? (
                  <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
                ) : (
                  <h2 className="silka-semibold text-xl text-gray-800">
                    {monthNames[
                      new Date(
                        usageData?.month_usage?.month
                      ).getUTCMonth()
                    ] +
                      ' ' +
                      new Date(
                        usageData?.month_usage?.month
                      ).getUTCFullYear()}
                  </h2>
                )}
                <div className="flex flex-row space-x-1">
                  <p className="text-gray-500 silka-regular text-xs">
                    Usage information for{' '}
                  </p>
                  {isLoading ? (
                    <div className="h-5 w-24 my-auto rounded bg-gray-200 animate-pulse" />
                  ) : (
                    <span className="text-gray-500 silka-regular text-xs">
                      {usageData?.name}
                    </span>
                  )}
                  <p className="text-gray-500 silka-regular text-xs">
                    .
                  </p>
                </div>
              </div>
              <div className="flex flex-col space-y-1 my-auto">
                {isLoading ? (
                  <div className="h-7 w-12 bg-gray-200 rounded animate-pulse" />
                ) : (
                  <p className="silka-semibold text-xl text-gray-800">
                    ${usageData?.month_usage?.amount}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-10 flex flex-row space-x-2.5">
              <DisperseLogoTiny />
              {isLoading ? (
                <div className="h-6 w-24 rounded bg-gray-200 animate-pulse" />
              ) : (
                <p className="silka-semibold my-auto text-gray-800">
                  {usageData?.name}
                </p>
              )}
            </div>
            <div className="p-6 w-full border-l border-r border-t rounded-t-lg mt-6 flex flex-col space-y-5">
              <div>
                {isLoading ? (
                  <div className="h-5 w-16 bg-gray-200 rounded animate-pulse" />
                ) : (
                  <p className="text-sm silka-semibold text-gray-800">
                    {usageData?.next_plan
                      ? usageData?.next_plan
                      : usageData?.plan}
                  </p>
                )}
              </div>
              <div className="w-full flex flex-col space-y-2.5">
                <div className="flex flex-row justify-between items-between">
                  <p className="text-xs silka-medium text-gray-700">
                    Storage Usage
                  </p>
                  {isLoading ? (
                    <div className="h-4 w-10 rounded bg-gray-200 animate-pulse" />
                  ) : (
                    <>
                      {usageData?.plan == 'STARTER' ? (
                        <p className="text-[11px] my-auto silka-regular text-gray-600">
                          2 GB
                        </p>
                      ) : usageData?.plan == 'PRO' ? (
                        <p className="text-[11px] silka-regular text-gray-600">
                          200GB
                        </p>
                      ) : usageData?.plan == 'TEAM' ? (
                        <p className="text-[11px] silka-regular text-gray-600">
                          500GB
                        </p>
                      ) : (
                        <p className="text-[11px] silka-regular text-gray-600">
                          Custom
                        </p>
                      )}
                    </>
                  )}
                </div>
                <ProgressPrimitive.Root
                  value={!isLoading ? storageProgress : 0}
                  className="h-3.5 w-full overflow-hidden rounded-full bg-[#F2F2F2]"
                >
                  <ProgressPrimitive.Indicator
                    style={{
                      width: `${!isLoading ? storageProgress : 0}%`,
                    }}
                    className="h-full bg-[#FF623D] duration-300 ease-in-out"
                  />
                </ProgressPrimitive.Root>
                <p className="text-xs silka-regular"></p>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="flex flex-row justify-between items-between">
                  <p className="text-xs silka-medium">Automations</p>
                  {isLoading ? (
                    <div className="h-4 w-10 rounded bg-gray-200 animate-pulse" />
                  ) : (
                    <>
                      {usageData?.plan == 'STARTER' ? (
                        <p className="text-[11px] silka-regular text-gray-600">
                          100
                        </p>
                      ) : usageData?.plan == 'PRO' ? (
                        <p className="text-[11px] silka-regular text-gray-600">
                          2K
                        </p>
                      ) : usageData?.plan == 'TEAM' ? (
                        <p className="text-[11px] silka-regular text-gray-600">
                          10K
                        </p>
                      ) : (
                        <p className="text-[11px] silka-regular text-gray-600">
                          Custom
                        </p>
                      )}
                    </>
                  )}
                </div>
                <ProgressPrimitive.Root
                  value={!isLoading ? automationsProgress : 0}
                  className="h-3.5 w-full overflow-hidden rounded-full bg-[#F2F2F2]"
                >
                  <ProgressPrimitive.Indicator
                    style={{
                      width: `${
                        !isLoading ? automationsProgress : 0
                      }%`,
                    }}
                    className="h-full bg-[#FF623D] duration-300 ease-in-out"
                  />
                </ProgressPrimitive.Root>
                <p className="text-xs silka-regular"></p>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="flex flex-row justify-between items-between">
                  <p className="text-xs silka-medium">Team Members</p>
                  {isLoading ? (
                    <div className="h-4 w-10 rounded bg-gray-200 animate-pulse" />
                  ) : (
                    <>
                      {usageData?.plan == 'STARTER' ? (
                        <p className="text-[11px] silka-regular text-gray-600">
                          3 Guests
                        </p>
                      ) : usageData?.plan == 'PRO' ? (
                        <p className="text-[11px] silka-regular text-gray-600">
                          5 Guests
                        </p>
                      ) : usageData?.plan == 'TEAM' ? (
                        <p className="text-[11px] silka-regular text-gray-600">
                          Unlimited Collaborators
                        </p>
                      ) : (
                        <p className="text-[11px] silka-regular text-gray-600">
                          Unlimited Collaborators
                        </p>
                      )}
                    </>
                  )}
                </div>
                <ProgressPrimitive.Root
                  value={!isLoading ? teamGuestProgress : 0}
                  className="h-3.5 w-full overflow-hidden rounded-full bg-[#F2F2F2]"
                >
                  <ProgressPrimitive.Indicator
                    style={{
                      width: `${!isLoading ? teamGuestProgress : 0}%`,
                    }}
                    className="h-full bg-[#FF623D] duration-300 ease-in-out"
                  />
                </ProgressPrimitive.Root>
                <p className="text-xs silka-regular"></p>
              </div>
            </div>
            <div className="bg-gray-100 py-3 px-6 border-b border-r border-l rounded-b-lg flex flex-row justify-between items-between">
              <p className="silka-semibold text-gray-900 my-auto">
                Total
              </p>
              {isLoading ? (
                <div className="h-6 my-auto w-10 bg-gray-200 rounded animate-pulse" />
              ) : (
                <p className="silka-regular text-gray-600 my-auto text-sm">
                  ${usageData?.month_usage?.amount}
                </p>
              )}
            </div>
            <div className="flex flex-row justify-between items-between px-4 md:px-7 py-4 rounded bg-[#F7F7F7] mt-7 border border-dashed border-[#E5E5E5]">
              <div className="flex flex-col space-y-0.5 md:space-y-1">
                {isLoading ? (
                  <div className="h-5 w-24 bg-gray-200 animate-pulse rounded" />
                ) : (
                  <p className="text-xs md:text-sm silka-medium">
                    {usageData?.next_plan
                      ? usageData.next_plan?.slice(0, 1) +
                        usageData?.next_plan.slice(1).toLowerCase()
                      : usageData?.plan?.slice(0, 1) +
                        usageData?.plan?.slice(1)}{' '}
                    Plan
                  </p>
                )}
                <p className="text-[11px] md:text-xs silka-regular text-gray-500">
                  To change your plan, go to plans.
                </p>
              </div>
              <div className="my-auto">
                <button
                  onClick={(e) => {
                    Router.push(
                      '/' + workspaceId + '/settings/plans'
                    );
                  }}
                  className="bg-[#FF623D] hover:opacity-90 text-xs text-white silka-medium px-4 py-1.5 rounded"
                >
                  Change Plan
                </button>
              </div>
            </div>
          </main>
        </>
      </DashboardLayout>
    </PageHead>
  );
}
