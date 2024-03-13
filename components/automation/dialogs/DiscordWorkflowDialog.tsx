import Image from 'next/image';
import { useState, Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../../utils/apiUrl';
import toast from 'react-hot-toast';

interface Props {
  workspaceId: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setRefetchActiveWorkflows: Dispatch<SetStateAction<boolean>>;
  setRefetchInactiveWorkflows: Dispatch<SetStateAction<boolean>>;
  plan: string;
  setUpgradeOpen: Dispatch<SetStateAction<boolean>>;
}

interface DiscordComponentProps {
  value: any;
  workspaceId: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setRefetchActiveWorkflows: Dispatch<SetStateAction<boolean>>;
  setRefetchInactiveWorkflows: Dispatch<SetStateAction<boolean>>;
  plan: string;
  setUpgradeOpen: Dispatch<SetStateAction<boolean>>;
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

async function createDiscordWeeklyAnaltyics(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });
    toast.loading('Creating Workflow...', {
      className: 'text-sm silka-medium text-gray-900',
      duration: 80000,
    });

    const result = await axios.post(
      `${apiUrl()}automation/discord/create/weeklyanalytics`,
      null,
      {
        params: { workspaceId: workspaceId },
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

async function createDiscordTwitterPost(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });
    toast.loading('Creating Workflow...', {
      className: 'text-sm silka-medium text-gray-900',
      duration: 80000,
    });

    const result = await axios.post(
      `${apiUrl()}automation/discord/create/twitterpost`,
      null,
      {
        params: { workspaceId: workspaceId },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function createDiscordYoutubePost(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });
    toast.loading('Creating Workflow...', {
      className: 'text-sm silka-medium text-gray-900',
      duration: 80000,
    });

    const result = await axios.post(
      `${apiUrl()}automation/discord/create/youtubepost`,
      null,
      {
        params: { workspaceId: workspaceId },
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

async function createDiscordTiktokPost(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });
    toast.loading('Creating Workflow...', {
      className: 'text-sm silka-medium text-gray-900',
      duration: 80000,
    });

    const result = await axios.post(
      `${apiUrl()}automation/discord/create/tiktokpost`,
      null,
      {
        params: { workspaceId: workspaceId },
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

async function createDiscordFacebookPost(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });
    toast.loading('Creating Workflow...', {
      className: 'text-sm silka-medium text-gray-900',
      duration: 80000,
    });

    const result = await axios.post(
      `${apiUrl()}automation/discord/create/facebookpost`,
      null,
      {
        params: { workspaceId: workspaceId },
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

async function createDiscordInstagramPost(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });
    toast.loading('Creating Workflow...', {
      className: 'text-sm silka-medium text-gray-900',
      duration: 80000,
    });

    const result = await axios.post(
      `${apiUrl()}automation/discord/create/instagrampost`,
      null,
      {
        params: { workspaceId: workspaceId },
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

async function createDiscordLinkedinPost(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });
    toast.loading('Creating Workflow...', {
      className: 'text-sm silka-medium text-gray-900',
      duration: 80000,
    });

    const result = await axios.post(
      `${apiUrl()}automation/discord/create/linkedinpost`,
      null,
      {
        params: { workspaceId: workspaceId },
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

const discordAutomations = [
  {
    automation: 'discord-daily-analytics-open',
    title: 'Daily Analytics on Discord',
    description:
      'Daily analytics of all your socials to your selected Discord channel.',
    type: 'Automation',
    logos: ['/icons/disperse.png', '/images/automation/discord.svg'],
    premium: false,
  },
  {
    automation: 'discord-weekly-analytics-open',
    title: 'Weekly Analytics on Discord',
    description:
      'Weekly analytics of all your socials to your selected Discord channel.',
    type: 'Automation',
    logos: ['/icons/disperse.png', '/images/automation/discord.svg'],
    premium: false,
  },
  {
    automation: 'discord-youtube-post-open',
    title: 'Send Youtube Video to Discord',
    description:
      'Notify a Discord channel when a Youtube video is posted.',
    type: 'Social',
    logos: [
      '/images/automation/youtube.svg',
      '/images/automation/discord.svg',
    ],
    premium: false,
  },
  {
    automation: 'discord-instagram-post-open',
    title: 'Send Instagram Post to Discord',
    description:
      'Notify a Discord channel when an Instagram post is posted.',
    type: 'Social',
    logos: [
      '/images/automation/instagram.svg',
      '/images/automation/discord.svg',
    ],
    premium: false,
  },
  {
    automation: 'discord-facebook-post-open',
    title: 'Send Facebook Post to Discord',
    description:
      'Notify a Discord channel when a Facebook post is posted. ',
    type: 'Social',
    logos: [
      '/images/automation/facebook.svg',
      '/images/automation/discord.svg',
    ],
    premium: false,
  },
  {
    automation: 'discord-linkedin-post-open',
    title: 'Send Linkedin Post to Discord',
    description:
      'Notify a Discord channel when a Linkedin post is posted.',
    type: 'Social',
    logos: [
      '/images/automation/linkedin.svg',
      '/images/automation/discord.svg',
    ],
    premium: false,
  },
  {
    automation: 'discord-tiktok-post-open',
    title: 'Send TikTok Video to Discord',
    description:
      'Notify a Discord channel when a TikTok video is posted.',
    type: 'Social',
    logos: [
      '/images/automation/tiktok.svg',
      '/images/automation/discord.svg',
    ],
    premium: false,
  },
  /*
  {
    automation: 'discord-tweet-post-open',
    title: 'Send Twitter Post to Discord',
    description:
      'Notify a Discord channel when Twitter tweet is posted.',
    type: 'Social',
    logos: [
      '/images/automation/twitter.svg',
      '/images/automation/discord.svg',
    ],
  },
  */
];

function DiscordComponent({
  value,
  workspaceId,
  setIsOpen,
  setRefetchActiveWorkflows,
  setRefetchInactiveWorkflows,
  plan,
  setUpgradeOpen,
}: DiscordComponentProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="w-full p-1 md:p-1.5 md:w-1/2 lg:p-2 lg:w-1/3">
      <div
        onMouseEnter={() => {
          setHovered(true);
        }}
        onMouseLeave={() => {
          setHovered(false);
        }}
        className="border rounded-lg flex flex-col p-2 2xl:p-3 h-[210px]"
      >
        {!hovered ? (
          <div className="flex flex-col w-full justify-between items-between h-full">
            <div className="flex w-full flex-col">
              <div className="flex flex-row justify-between items-between w-full">
                <div className="flex flex-row space-x-1.5">
                  {value.logos.map((image: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className="flex flex-col justify-center items-center rounded-full p-2 border"
                      >
                        <Image
                          alt="Discord Automation"
                          src={image}
                          width={22}
                          height={22}
                          key={index}
                        />
                      </div>
                    );
                  })}
                </div>
                {value.premium && plan == 'STARTER' && (
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
              <h3 className="silka-semibold text-base text-gray-800 mt-3">
                {value.title}
              </h3>
              <p className="text-xs mt-1.5 silka-regular text-gray-400">
                {value.description}
              </p>
            </div>
            <span className="py-1 mt-4 px-3 text-[#FF623D] rounded bg-[#F6DFD9] w-fit h-fit text-[8px] silka-medium">
              {value.type.toUpperCase()}
            </span>
          </div>
        ) : (
          <div className="flex flex-col justify-between items-between h-full">
            <div className="flex flex-col">
              <h3 className="silka-semibold text-gray-800 text-lg">
                {value.title}
              </h3>
              <p className="text-xs mt-1.5 silka-regular text-gray-400">
                {value.description}
              </p>
            </div>
            <div className="flex flex-row justify-end items-end">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                  if (value?.premium && plan == 'STARTER') {
                    setUpgradeOpen(true);
                  } else if (
                    value.automation == 'discord-facebook-post-open'
                  ) {
                    createDiscordFacebookPost(workspaceId).then(
                      () => {
                        setRefetchActiveWorkflows(true);
                        setRefetchInactiveWorkflows(true);
                      }
                    );
                  } else if (
                    value.automation ==
                    'discord-weekly-analytics-open'
                  ) {
                    createDiscordWeeklyAnaltyics(workspaceId).then(
                      () => {
                        setRefetchActiveWorkflows(true);
                        setRefetchInactiveWorkflows(true);
                      }
                    );
                  } else if (
                    value.automation == 'discord-daily-analytics-open'
                  ) {
                    createDiscordDailyAnalytics(workspaceId).then(
                      () => {
                        setRefetchActiveWorkflows(true);
                        setRefetchInactiveWorkflows(true);
                      }
                    );
                  } else if (
                    value.automation == 'discord-instagram-post-open'
                  ) {
                    createDiscordInstagramPost(workspaceId).then(
                      () => {
                        setRefetchActiveWorkflows(true);
                        setRefetchInactiveWorkflows(true);
                      }
                    );
                  } else if (
                    value.automation == 'discord-youtube-post-open'
                  ) {
                    createDiscordYoutubePost(workspaceId).then(() => {
                      setRefetchActiveWorkflows(true);
                      setRefetchInactiveWorkflows(true);
                    });
                  } else if (
                    value.automation == 'discord-tweet-post-open'
                  ) {
                    createDiscordTwitterPost(workspaceId).then(() => {
                      setRefetchActiveWorkflows(true);
                      setRefetchInactiveWorkflows(true);
                    });
                  } else if (
                    value.automation == 'discord-linkedin-post-open'
                  ) {
                    createDiscordLinkedinPost(workspaceId).then(
                      () => {
                        setRefetchActiveWorkflows(true);
                        setRefetchInactiveWorkflows(true);
                      }
                    );
                  } else if (
                    value.automation == 'discord-tiktok-post-open'
                  ) {
                    createDiscordTiktokPost(workspaceId).then(() => {
                      setRefetchActiveWorkflows(true);
                      setRefetchInactiveWorkflows(true);
                    });
                  } else {
                  }
                }}
                className="text-xs px-3 py-1 silka-medium text-white bg-[#FF623D] rounded shadow shadow-[#FF623D] hover:shadow-none"
              >
                Add Workflow
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function DiscordWorkflowDialog({
  workspaceId,
  setIsOpen,
  setRefetchActiveWorkflows,
  setRefetchInactiveWorkflows,
  plan,
  setUpgradeOpen,
}: Props) {
  return (
    <div className="h-[600px]">
      <div className="flex px-3 pb-6 overflow-auto flex-row flex-wrap">
        {discordAutomations.map((value: any, index: number) => {
          return (
            <DiscordComponent
              plan={plan}
              setUpgradeOpen={setUpgradeOpen}
              workspaceId={workspaceId}
              value={value}
              key={index}
              setIsOpen={setIsOpen}
              setRefetchActiveWorkflows={setRefetchActiveWorkflows}
              setRefetchInactiveWorkflows={
                setRefetchInactiveWorkflows
              }
            />
          );
        })}
      </div>
    </div>
  );
}
