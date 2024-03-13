import { useState, useEffect } from 'react';
import Link from 'next/link';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { useRouter } from 'next/router';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../utils/apiUrl';

async function getPlan(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });
    const result = await axios.get(
      `${apiUrl()}automation/read/workspaceplan`,
      { params: { workspaceId: workspaceId } }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function getAutomationUsed(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });
    const result = await axios.get(
      `${apiUrl()}automation/read/automationusage`,
      {
        params: { workspaceId: workspaceId },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

export function SidebarAutomation() {
  const [isLoading, setIsLoading] = useState(true);
  const [automationRuns, setAutomationRuns] = useState(0);
  const [maxRuns, setMaxRuns] = useState(0);
  const [workspacePlan, setWorkspacePlan] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      Promise.all([
        getAutomationUsed(String(router.query.workspaceId)),
        getPlan(String(router.query.workspaceId)),
      ]).then((responses) => {
        const [automationsData, planData] = responses;
        setAutomationRuns(automationsData);
        setWorkspacePlan(planData);
        if (planData == 'STARTER') {
          setMaxRuns(100);
        } else if (planData == 'PRO') {
          setMaxRuns(1000);
        } else if (planData == 'TEAM') {
          setMaxRuns(3000);
        } else {
          setMaxRuns(20000);
        }
        setIsLoading(false);
      });
    }
  }, [router.isReady]);

  return (
    <div className="w-full px-3">
      <div className="flex flex-col rounded-xl bg-[#FBFBFB] shadow p-5">
        <a className="text-xl silka-bold">Automation</a>
        <p className="silka-medium text-sm text-[#828281]">
          {isLoading ? (
            <div className="w-10 h-3 rounded bg-gray-200 animate-pulse" />
          ) : (
            <>
              {workspacePlan.slice(0, 1) +
                workspacePlan.slice(1).toLowerCase()}{' '}
              Plan
            </>
          )}
        </p>
        <div className="flex flex-col space-y-3 py-4">
          <div className="flex flex-row justify-between items-between">
            <p className="text-[9px] silka-bold">Tasks</p>
            {isLoading ? (
              <div className="w-6 h-1 bg-gray-200 animate-pulse rounded-sm" />
            ) : (
              <p className="text-[9px] silka-regular">
                <span className="silka-bold">{automationRuns}</span>{' '}
                of{' '}
                {workspacePlan == 'STARTER'
                  ? '100'
                  : workspacePlan == 'PRO'
                  ? '1K'
                  : workspacePlan == 'TEAM'
                  ? '3K'
                  : '20K'}
              </p>
            )}
          </div>
          {isLoading ? (
            <div className="h-1.5 w-full bg-gray-200 animate-pulse rounded" />
          ) : (
            <ProgressPrimitive.Root
              value={automationRuns / maxRuns}
              className="h-1.5 w-full overflow-hidden rounded-full bg-[#D9D9D9]"
            >
              <ProgressPrimitive.Indicator
                style={{
                  width: `${(automationRuns / maxRuns) * 100}%`,
                }}
                className="h-full bg-[#FF622D] rounded duration-300 ease-in-out"
              />
            </ProgressPrimitive.Root>
          )}
        </div>
        <div className="flex flex-col">
          <p className="text-[7px] silka-regular">
            <span className="silka-medium">
              Usage updated every 15 mins
            </span>
          </p>
          <p className="text-[7px] silka-regular">
            <Link
              href={
                '/' + String(router.query.workspaceId) + '/pricing'
              }
              className="text-[#0056A8]">
              Upgrade your plan
            </Link>{' '}
            to increase limits.
          </p>
        </div>
      </div>
    </div>
  );
}
