import * as ProgressPrimitive from '@radix-ui/react-progress';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import Link from 'next/link';
import { apiUrl } from '../../utils/apiUrl';

async function getConnectedSocials(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}workspace/read/socialsconnectednumber`,
      {
        params: { workspaceId: workspaceId },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function getTeamMembers(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}workspace/read/teammembersnumber`,
      {
        params: { workspaceId: workspaceId },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function getProgress(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}workspace/read/usageprogress`,
      { params: { workspaceId: workspaceId } }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

function formatLargeNumber(num: number, digits: number) {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, '$1') +
        item.symbol
    : '0';
}

interface ProgressIndicatorsProps {
  isLoading: boolean;
  plan: string;
  storageUsage: number;
  storageMax: number;
  editUsage: number;
  editMax: number;
  automationUsage: number;
  automationMax: number;
  teamUsage: number;
  teamMax: number;
}

interface Props {
  workspaceId: string;
}

function ProgressIndicators({
  isLoading,
  plan,
  storageUsage,
  storageMax,
  editUsage,
  editMax,
  automationUsage,
  automationMax,
  teamUsage,
  teamMax,
}: ProgressIndicatorsProps) {
  return (
    <div className="flex flex-col space-y-5 mt-6">
      <div className="flex flex-col space-y-1">
        <div className="flex flex-row justify-between items-between">
          <p className="text-xs silka-semibold">Storage</p>
          {isLoading ? (
            <div className="w-24 h-3 mt-auto bg-gray-200 rounded animate-pulse"></div>
          ) : (
            <div className="flex flex-row space-x-1">
              <p className="text-[11px] lg:text-[10px] 2xl:text-[11px] silka-regular text-gray-600">
                included{' '}
                {plan == 'STARTER'
                  ? '2GB'
                  : plan == 'PRO'
                  ? '200GB'
                  : plan == 'TEAM'
                  ? '500GB'
                  : '1TB'}
              </p>
            </div>
          )}
        </div>
        {isLoading ? (
          <div className="w-full h-2.5 bg-gray-200 rounded-full animate-pulse"></div>
        ) : (
          <ProgressPrimitive.Root
            value={(storageUsage / storageMax) * 100}
            className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100"
          >
            <ProgressPrimitive.Indicator
              style={{
                width: `${(storageUsage / storageMax) * 100}%`,
              }}
              className="h-full bg-[#FF623D] duration-300 ease-in-out"
            />
          </ProgressPrimitive.Root>
        )}
        {isLoading ? (
          <div className="h-3 w-12 rounded bg-gray-200 animate-pulse" />
        ) : (
          <p className="text-[11px] lg:text-[10px] 2xl:text-[11px] silka-regular text-gray-500">
            Used {String(storageUsage)} MB
          </p>
        )}
      </div>
      <div className="flex flex-col space-y-1">
        <div className="flex flex-row justify-between items-between">
          <p className="text-xs silka-medium">Automations</p>
          {isLoading ? (
            <div className="w-24 h-3 mt-auto bg-gray-200 rounded animate-pulse" />
          ) : (
            <div className="flex flex-row space-x-1">
              <p className="text-[11px] lg:text-[10px] 2xl:text-[11px] silka-regular text-gray-500">
                included {formatLargeNumber(automationMax, 1)}
              </p>
            </div>
          )}
        </div>
        {isLoading ? (
          <div className="w-full h-2.5 bg-gray-200 rounded-full animate-pulse" />
        ) : (
          <ProgressPrimitive.Root
            value={(automationUsage / automationMax) * 100}
            className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100"
          >
            <ProgressPrimitive.Indicator
              style={{
                width: `${(automationUsage / automationMax) * 100}%`,
              }}
              className="h-full bg-[#FF623D] duration-300 ease-in-out"
            />
          </ProgressPrimitive.Root>
        )}
        {isLoading ? (
          <div className="h-3 w-12 rounded bg-gray-200 animate-pulse" />
        ) : (
          <p className="text-[11px] lg:text-[10px] 2xl:text-[11px] silka-regular text-gray-500">
            Used {String(automationUsage)}
          </p>
        )}
      </div>
      <div className="flex flex-col space-y-1">
        <div className="flex flex-row justify-between items-between">
          <p className="text-xs silka-medium">Team Members</p>
          {isLoading ? (
            <div className="w-24 h-3 mt-auto bg-gray-200 rounded animte-pulse" />
          ) : (
            <div className="flex flex-row space-x-1">
              <p className="text-[11px] lg:text-[10px] 2xl:text-[11px] silka-regular text-gray-500">
                included {String(teamMax)}
              </p>
            </div>
          )}
        </div>
        {isLoading ? (
          <div className="w-full h-2.5 bg-gray-200 rounded-full animate-pulse" />
        ) : (
          <ProgressPrimitive.Root
            value={(teamUsage / teamMax) * 100}
            className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100"
          >
            <ProgressPrimitive.Indicator
              style={{ width: `${(teamUsage / teamMax) * 100}%` }}
              className="h-full bg-[#FF623D] duration-300 ease-in-out"
            />
          </ProgressPrimitive.Root>
        )}
        {isLoading ? (
          <div className="h-3 w-12 rounded bg-gray-200 animate-pulse" />
        ) : (
          <p className="text-[11px] lg:text-[10px] 2xl:text-[11px] silka-regular text-gray-500">
            Used {String(teamUsage)}
          </p>
        )}
      </div>
    </div>
  );
}

export function DashboardUsageIndicator({ workspaceId }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [teamData, setTeamData] = useState(0);
  const [plan, setPlan] = useState('');
  const [socialsData, setSocialsData] = useState(0);
  const [storageUsage, setStorageUsage] = useState(0);
  const [storageMax, setStorageMax] = useState(0);
  const [editUsage, setEditUsage] = useState(0);
  const [editMax, setEditMax] = useState(0);
  const [automationUsage, setAutomationUsage] = useState(0);
  const [automationMax, setAutomationMax] = useState(0);
  const [teamUsage, setTeamUsage] = useState(0);
  const [teamMax, setTeamMax] = useState(0);

  useEffect(() => {
    Promise.all([
      getTeamMembers(workspaceId),
      getConnectedSocials(workspaceId),
      getProgress(workspaceId),
    ]).then((responses) => {
      const [teamResult, socialsResult, progressResult] = responses;
      setPlan(progressResult?.plan);
      setTeamData(teamResult);
      setSocialsData(socialsResult);

      if (progressResult.plan == 'STARTER') {
        setStorageMax(2000);
        setAutomationMax(100);
        setTeamMax(3);
        setTeamUsage(teamResult);
      } else if (progressResult.plan == 'PRO') {
        setStorageMax(200000);
        setAutomationMax(1000);
        setTeamMax(5);
        setTeamUsage(teamResult);
      } else if (progressResult.plan == 'TEAM') {
        setStorageMax(500000);
        setAutomationMax(3000);
        setTeamMax(1);
        setTeamUsage(teamResult);
      } else {
        setTeamUsage(progressResult.team_members);
      }

      setStorageUsage(progressResult.storage);
      setAutomationUsage(progressResult.automation);
      setEditUsage(progressResult.transcription);

      setIsLoading(false);
    });
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row space-x-3">
        <div className="w-1/2 flex flex-col justify-center items-center space-y-2 border h-20 rounded p-2">
          <div className="flex flex-row space-x-1.5">
            <svg
              width="16"
              height="12"
              viewBox="0 0 20 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="my-auto"
            >
              <path
                d="M4.57858 14.3032C4.54843 14.5169 4.62052 14.7324 4.77327 14.8847C4.95618 15.0676 6.07797 16 9.82951 16C13.5811 16 14.7 15.0711 14.8858 14.8847C15.0385 14.7324 15.1106 14.5169 15.0805 14.3032L14.6142 11.0428H14.6141C14.4623 10.0102 13.9451 9.06623 13.1567 8.3822C12.3682 7.69818 11.3608 7.31935 10.3171 7.31445H9.34422C8.30049 7.31935 7.29304 7.69818 6.50463 8.3822C5.71622 9.06623 5.19904 10.0102 5.04704 11.0428L4.57858 14.3032Z"
                fill="#4B5563"
              />
              <path
                d="M0.21116 10.4049L0.0100387 11.5386H0.00988563C-0.0211857 11.7183 0.021671 11.9029 0.128815 12.0506C0.265958 12.2517 1.08881 13.2391 3.80427 13.2575L4.14253 10.9169C4.31136 9.72698 4.88623 8.632 5.76986 7.81737C4.71281 7.20592 3.42406 7.14867 2.31697 7.66401C1.20988 8.17919 0.423781 9.20243 0.211171 10.4049L0.21116 10.4049Z"
                fill="#4B5563"
              />
              <path
                d="M19.5298 12.0506C19.637 11.9029 19.6798 11.7183 19.6488 11.5386L19.4476 10.4049H19.4475C19.2349 9.20239 18.4488 8.17919 17.3417 7.66401C16.2346 7.14867 14.9458 7.20592 13.8888 7.81738C14.7724 8.63196 15.3473 9.72695 15.5161 10.9169L15.8544 13.2575C18.5698 13.2391 19.3927 12.2517 19.5298 12.0506L19.5298 12.0506Z"
                fill="#4B5563"
              />
              <path
                d="M1.37219 4.34301C1.37158 5.00991 1.63638 5.6497 2.10794 6.12143C2.57967 6.59301 3.21946 6.85781 3.88636 6.85718C4.69699 6.86085 5.45813 6.46825 5.92528 5.80581C5.48936 5.0895 5.25853 4.26723 5.25779 3.42862C5.25718 3.05868 5.30325 2.68994 5.39493 2.33149C4.89444 1.95618 4.27177 1.78076 3.64895 1.83985C3.02601 1.89908 2.44743 2.18821 2.02652 2.65107C1.60545 3.11406 1.37219 3.71729 1.37219 4.34301V4.34301Z"
                fill="#4B5563"
              />
              <path
                d="M15.7721 1.82861C15.2283 1.82999 14.6993 2.00632 14.2636 2.33142C14.3552 2.68988 14.4013 3.05862 14.4007 3.42855C14.3999 4.26716 14.1691 5.08943 13.7332 5.80574C14.2004 6.46818 14.9615 6.8608 15.7721 6.85711C16.6703 6.85711 17.5003 6.3779 17.9496 5.60003C18.3986 4.82216 18.3986 3.86373 17.9496 3.0857C17.5003 2.30783 16.6703 1.82861 15.7721 1.82861Z"
                fill="#4B5563"
              />
              <path
                d="M13.2577 3.42856C13.2577 5.32222 11.7226 6.85712 9.82913 6.85712C7.93563 6.85712 6.40057 5.32222 6.40057 3.42856C6.40057 1.53505 7.93563 0 9.82913 0C11.7226 0 13.2577 1.53505 13.2577 3.42856Z"
                fill="#4B5563"
              />
            </svg>
            <p className="text-xs text-center md:text-[11px] 2xl:text-xs silka-regular text-gray-600">
              Team Members
            </p>
          </div>
          {isLoading ? (
            <div className="w-24 h-7 bg-gray-200 rounded animate-pulse" />
          ) : (
            <p className="text-2xl silka-semibold text-gray-900">
              {teamData}
            </p>
          )}
        </div>
        <div className="w-1/2 flex flex-col justify-center items-center space-y-2 border h-20 rounded p-2">
          <div className="flex flex-row space-x-1.5">
            <svg
              width="16"
              height="12"
              viewBox="0 0 16 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="my-auto"
            >
              <path
                d="M7.99998 3.80952C6.94921 3.80952 6.09521 2.95516 6.09521 1.90476C6.09521 0.85424 6.94921 0 7.99998 0C9.05038 0 9.90474 0.854361 9.90474 1.90476C9.90474 2.95516 9.05038 3.80952 7.99998 3.80952ZM7.99998 0.677249C7.323 0.677249 6.7724 1.22785 6.7724 1.90482C6.7724 2.5818 7.323 3.1324 7.99998 3.1324C8.67659 3.1324 9.22755 2.5818 9.22755 1.90482C9.22755 1.22785 8.67659 0.677249 7.99998 0.677249Z"
                fill="#4B5563"
              />
              <path
                d="M1.90476 11.2592C0.853998 11.2592 0 10.4049 0 9.35447C0 8.30407 0.853998 7.44971 1.90476 7.44971C2.95516 7.44971 3.80952 8.30407 3.80952 9.35447C3.80952 10.4049 2.95516 11.2592 1.90476 11.2592ZM1.90476 8.12696C1.22779 8.12696 0.677188 8.67719 0.677188 9.35453C0.677188 10.0311 1.22779 10.5821 1.90476 10.5821C2.58138 10.5821 3.13234 10.0311 3.13234 9.35453C3.13234 8.67734 2.58138 8.12696 1.90476 8.12696Z"
                fill="#4B5563"
              />
              <path
                d="M2.55962 8.10343C2.52265 8.10343 2.48545 8.09162 2.45392 8.06646C2.38081 8.00824 2.36889 7.90194 2.42711 7.82907L6.5547 2.65114C6.61292 2.57768 6.71957 2.56516 6.79279 2.62434C6.8659 2.68256 6.87783 2.78885 6.81984 2.86208L2.69225 8.04001C2.65906 8.0817 2.60922 8.10343 2.55986 8.10343H2.55962Z"
                fill="#4B5563"
              />
              <path
                d="M3.29796 8.80779C3.26135 8.80779 3.22379 8.79598 3.19261 8.77082C3.1195 8.7126 3.10758 8.6063 3.16557 8.53343L7.35423 3.2775C7.41245 3.20439 7.51851 3.19152 7.59232 3.25069C7.66543 3.30927 7.67736 3.41521 7.61937 3.48843L3.43071 8.74436C3.39716 8.78617 3.34803 8.80779 3.29796 8.80779V8.80779Z"
                fill="#4B5563"
              />
              <path
                d="M7.99998 3.80952C6.94921 3.80952 6.09521 2.95516 6.09521 1.90476C6.09521 0.85424 6.94921 0 7.99998 0C9.05038 0 9.90474 0.854361 9.90474 1.90476C9.90474 2.95516 9.05038 3.80952 7.99998 3.80952ZM7.99998 0.677249C7.323 0.677249 6.7724 1.22785 6.7724 1.90482C6.7724 2.5818 7.323 3.1324 7.99998 3.1324C8.67659 3.1324 9.22755 2.5818 9.22755 1.90482C9.22755 1.22785 8.67659 0.677249 7.99998 0.677249Z"
                fill="#4B5563"
              />
              <path
                d="M14.0953 11.2592C13.0445 11.2592 12.1905 10.4049 12.1905 9.35447C12.1905 8.30407 13.0445 7.44971 14.0953 7.44971C15.1457 7.44971 16 8.30407 16 9.35447C16 10.4049 15.1457 11.2592 14.0953 11.2592ZM14.0953 8.12696C13.4181 8.12696 12.8677 8.67719 12.8677 9.35453C12.8677 10.0311 13.4179 10.5821 14.0953 10.5821C14.7719 10.5821 15.3228 10.0311 15.3228 9.35453C15.3227 8.67734 14.7717 8.12696 14.0953 8.12696Z"
                fill="#4B5563"
              />
              <path
                d="M13.4401 8.10326C13.3906 8.10326 13.3412 8.08153 13.3073 8.0396L9.17945 2.86167C9.12122 2.78857 9.13303 2.68216 9.20649 2.62393C9.2796 2.56465 9.38566 2.57716 9.44459 2.65074L13.5722 7.82867C13.6308 7.90142 13.6189 8.00783 13.5451 8.06606C13.5142 8.09133 13.4773 8.10326 13.4401 8.10326L13.4401 8.10326Z"
                fill="#4B5563"
              />
              <path
                d="M12.7017 8.80762C12.652 8.80762 12.6025 8.78589 12.5686 8.74396L8.37995 3.48803C8.32172 3.41492 8.33353 3.30887 8.40699 3.25029C8.48045 3.191 8.58675 3.20387 8.64509 3.2771L12.8338 8.53303C12.892 8.60578 12.8802 8.71219 12.8067 8.77042C12.7759 8.79581 12.7383 8.80762 12.7017 8.80762V8.80762Z"
                fill="#4B5563"
              />
            </svg>
            <p className="text-xs text-center md:text-[11px] 2xl:text-xs silka-regular text-gray-600">
              Socials Connected
            </p>
          </div>
          {isLoading ? (
            <div className="w-24 h-7 bg-gray-200 rounded animate-pulse" />
          ) : (
            <p className="text-2xl silka-semibold text-gray-900">
              {socialsData}
            </p>
          )}
        </div>
      </div>
      <ProgressIndicators
        isLoading={isLoading}
        plan={plan}
        storageUsage={storageUsage}
        storageMax={storageMax}
        editUsage={editUsage}
        editMax={editMax}
        automationUsage={automationUsage}
        automationMax={automationMax}
        teamUsage={teamUsage}
        teamMax={teamMax}
      />
      {plan == 'STARTER' ? (
        <div className="mt-6 flex flex-col space-y-0.5">
          <p className="text-[11px] silka-medium text-gray-900">
            Usage is updated every 15 mins.
          </p>
          <div className="flex flex-row space-x-1">
            <Link
              href={'/' + workspaceId + '/settings/plans'}
              className="underline text-[#FF623D] text-[10px] silka-regular hover:opacity-80"
            >
              Upgrade your plan
            </Link>
            <p className="text-[10px] silka-regular text-gray-500">
              to increase limits.
            </p>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
