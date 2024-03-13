import { useState, Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../utils/apiUrl';
import toast from 'react-hot-toast';

interface WorkflowProps {
  id: string;
  image1: string;
  image2: string;
  title: string;
  text: string;
  premium: boolean;
  categories: string[];
  setRefetchActiveWorkflows: Dispatch<SetStateAction<boolean>>;
  setRefetchInactiveWorkflows: Dispatch<SetStateAction<boolean>>;
  workspaceId: string;
  setUpgradeOpen: Dispatch<SetStateAction<boolean>>;
  plan: string;
}

interface Props {
  workspaceId: string;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
  setRefetchActiveWorkflows: Dispatch<SetStateAction<boolean>>;
  setRefetchInactiveWorkflows: Dispatch<SetStateAction<boolean>>;
  setUpgradeOpen: Dispatch<SetStateAction<boolean>>;
  plan: string;
}

async function createTiktokToYoutubeShort(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });
    toast.loading('Creating Workflow...', {
      className: 'text-sm silka-medium text-gray-900',
      duration: 80000,
    });

    const result = await axios.post(
      `${apiUrl()}automation/tiktok/create/videotoyoutubeshort`,
      null,
      {
        params: {
          workspaceId: workspaceId,
        },
      }
    );
    toast.remove();
    toast.success('Automation Created!', {
      className: 'text-sm silka-medium text-gray-900',
    });
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function createDiscordDailyAnalytics(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });
    toast.loading('Creating Workflow...', {
      className: 'text-sm silka-medium text-gray-900',
      duration: 80000,
    });

    const result = await axios.post(
      `${apiUrl()}automation/discord/create/dailyanalytics`,
      null,
      {
        params: {
          workspaceId: workspaceId,
        },
      }
    );
    toast.remove();
    toast.success('Automation Created!', {
      className: 'text-sm silka-medium text-gray-900',
    });
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function createInstagramToTiktok(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });
    toast.loading('Creating Workflow...', {
      className: 'text-sm silka-medium text-gray-900',
      duration: 80000,
    });

    const result = await axios.post(
      `${apiUrl()}automation/instagram/create/reeltotiktok`,
      null,
      {
        params: {
          workspaceId: workspaceId,
        },
      }
    );
    toast.remove();
    toast.success('Automation Created!', {
      className: 'text-sm silka-medium text-gray-900',
    });
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

const templates = [
  {
    id: 'tiktok-to-youtube-shorts',
    image1: '/images/automation/tiktok.svg',
    image2: '/images/automation/youtube-shorts.svg',
    title: 'Send TikTok video to Youtube shorts',
    text: 'Automatically post new TikTok videos to Youtube as shorts.',
    categories: ['Social', 'Automation'],
    premium: true,
  },
  {
    id: 'discord-daily-analytics',
    image1: '/icons/disperse.png',
    image2: '/images/automation/discord.svg',
    title: 'Discord Daily Statistics Digest',
    text: 'Get a daily overview of your social statistics right in your favorite Discord channel.',
    categories: ['Digest', 'Automation'],
    premium: false,
  },
  {
    id: 'instagram-to-tiktok',
    image1: '/images/automation/instagram-reels.svg',
    image2: '/images/automation/tiktok.svg',
    title: 'Send new Instagram Reel to TikTok',
    text: 'Automatically post new Instagram reel on TikTok.',
    categories: ['Social', 'Automation'],
    premium: true,
  },
];

function Workflow({
  id,
  image1,
  image2,
  title,
  text,
  categories,
  setRefetchActiveWorkflows,
  workspaceId,
  setRefetchInactiveWorkflows,
  premium,
  plan,
  setUpgradeOpen,
}: WorkflowProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseLeave={() => {
        setHovered(false);
      }}
      onMouseEnter={() => {
        setHovered(true);
      }}
      className="w-full p-1.5 md:w-1/3 md:p-3"
    >
      <div className="h-52 lg:h-48 xl:h-52 2xl:h-48 border w-full rounded p-4">
        {hovered ? (
          <div className="flex flex-col h-full justify-between items-between">
            <div className="flex flex-col">
              <h3 className="text-base lg:text-sm xl:text-base silka-semibold text-gray-900">
                {title}
              </h3>
              <p className="mt-2 text-xs lg:text-[11px] xl:text-xs silka-regular text-gray-400">
                {text}
              </p>
            </div>
            <div className="flex flex-row justify-end items-end">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (premium && plan == 'STARTER') {
                    setUpgradeOpen(true);
                  } else {
                    switch (id) {
                      case 'tiktok-to-youtube-shorts':
                        createTiktokToYoutubeShort(workspaceId).then(
                          () => {
                            setRefetchActiveWorkflows(true);
                            setRefetchInactiveWorkflows(true);
                          }
                        );
                        break;
                      case 'discord-daily-analytics':
                        createDiscordDailyAnalytics(workspaceId).then(
                          () => {
                            setRefetchActiveWorkflows(true);
                            setRefetchInactiveWorkflows(true);
                          }
                        );
                        break;
                      case 'instagram-to-tiktok':
                        createInstagramToTiktok(workspaceId).then(
                          () => {
                            setRefetchActiveWorkflows(true);
                            setRefetchInactiveWorkflows(true);
                          }
                        );
                        break;
                      default:
                        break;
                    }
                  }
                }}
                className="bg-[#FF623D] text-xs silka-medium text-white px-4 py-1.5 rounded hover:opacity-90"
              >
                Add Workflow
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex w-full flex-col justify-between items-between h-full">
              <div className="flex w-full flex-col">
                <div className="flex flex-row justify-between items-between w-full">
                  <div className="flex flex-row space-x-5">
                    <div>
                      <img
                        src={image1}
                        className="h-[28px] w-[28px] lg:h-[24px] lg:w-[24px] xl:h-[28px] xl:w-[28px]"
                      />
                    </div>
                    <div>
                      <img
                        src={image2}
                        className="h-[28px] w-[28px] lg:h-[24px] lg:w-[24px] xl:h-[28px] xl:w-[28px]"
                      />
                    </div>
                  </div>
                  {premium && plan == 'STARTER' && (
                    <div className="flex my-auto flex-row space-x-1">
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="my-auto"
                      >
                        <path
                          d="M8.69667 0.0403541C8.90859 0.131038 9.03106 0.354857 8.99316 0.582235L8.0902 6.00001H12.5C12.6893 6.00001 12.8625 6.10701 12.9472 6.27641C13.0319 6.4458 13.0136 6.6485 12.8999 6.80001L6.89997 14.8C6.76167 14.9844 6.51521 15.0503 6.30328 14.9597C6.09135 14.869 5.96888 14.6452 6.00678 14.4178L6.90974 9H2.49999C2.31061 9 2.13748 8.893 2.05278 8.72361C1.96809 8.55422 1.98636 8.35151 2.09999 8.2L8.09997 0.200038C8.23828 0.0156255 8.48474 -0.0503301 8.69667 0.0403541ZM3.49999 8.00001H7.49997C7.64695 8.00001 7.78648 8.06467 7.88148 8.17682C7.97648 8.28896 8.01733 8.43723 7.99317 8.5822L7.33027 12.5596L11.5 7.00001H7.49997C7.353 7.00001 7.21347 6.93534 7.11846 6.8232C7.02346 6.71105 6.98261 6.56279 7.00678 6.41781L7.66968 2.44042L3.49999 8.00001Z"
                          fill="#FF623D"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <p className="text-[12px] my-auto silka-semibold text-[#FF623D]">
                        Premium
                      </p>
                    </div>
                  )}
                </div>
                <h3 className="mt-3 text-base lg:text-sm xl:text-base silka-semibold text-gray-900">
                  {title}
                </h3>
                <p className="mt-1.5 text-xs lg:text-[11px] xl:text-xs silka-regular text-gray-400">
                  {text}
                </p>
              </div>
              <div className="flex flex-row space-x-2.5">
                {categories.map((value: string, index: number) => {
                  return (
                    <span
                      key={index}
                      className="text-[9px] bg-[#FDDDD6] py-0.5 px-3 rounded text-[#FF623D] silka-medium"
                    >
                      {value}
                    </span>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export function WorkflowTemplates({
  setMenuOpen,
  setRefetchActiveWorkflows,
  setRefetchInactiveWorkflows,
  workspaceId,
  plan,
  setUpgradeOpen,
}: Props) {
  return (
    <div className="flex flex-col space-y-5">
      <h2 className="text-sm silka-regular text-gray-700">
        Workflow Templates
      </h2>
      <div className="mt-6 md:mt-10 flex flex-col space-y-4 md:space-y-0 md:flex-row md:flex-wrap">
        {templates.map((value: any, index: number) => {
          return (
            <Workflow
              premium={value?.premium}
              plan={plan}
              setUpgradeOpen={setUpgradeOpen}
              key={index}
              workspaceId={workspaceId}
              id={value.id}
              image1={value.image1}
              image2={value.image2}
              title={value.title}
              text={value.text}
              categories={value.categories}
              setRefetchActiveWorkflows={setRefetchActiveWorkflows}
              setRefetchInactiveWorkflows={
                setRefetchInactiveWorkflows
              }
            />
          );
        })}
      </div>
      <div className="flex flex-col justify-center items-center">
        <button
          onClick={(e) => {
            e.preventDefault();
            setMenuOpen(true);
          }}
          className="flex flex-row hover:opacity-80 space-x-2.5"
        >
          <svg
            width="10"
            height="10"
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
          <p className="text-xs text-gray-900 silka-medium my-auto">
            View all Templates
          </p>
        </button>
      </div>
    </div>
  );
}
