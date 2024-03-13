import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../../../utils/apiUrl';
import { DiscordChannelDropdown } from '../../dropdown/discordchannel';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import toast from 'react-hot-toast';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { AutomationConnectDiscord } from '../../dialog/ConnectDiscord';

interface Props {
  workflowData: any;
  secondErrors: number;
  setSecondErrors: Dispatch<SetStateAction<number>>;
  leftState: string;
}

interface AccountProps {
  largeComponent: string;
  setLargeComponent: Dispatch<SetStateAction<string>>;
  workflowData: any;
  discordId: any;
  setDiscordId: Dispatch<SetStateAction<any>>;
  workspaceId: any;
}

interface ChannelInfoProps {
  largeComponent: string;
  setLargeComponent: Dispatch<SetStateAction<string>>;
  workflowData: any;
  workspaceId: any;
  selectedChannelId: any;
  setSelectedChannelId: Dispatch<SetStateAction<any>>;
  selectedChannelName: any;
  setSelectedChannelName: Dispatch<SetStateAction<any>>;
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  botName: string;
  setBotName: Dispatch<SetStateAction<string>>;
  includeActualPost: boolean;
  setIncludeActualPost: Dispatch<SetStateAction<boolean>>;
}

interface TestProps {
  largeComponent: string;
  setLargeComponent: Dispatch<SetStateAction<string>>;
  workflowData: any;
  discordTested: boolean;
  setDiscordTested: Dispatch<SetStateAction<boolean>>;
  workspaceId: string;
}

async function getChannelName(channelId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}automation/discord/read/channelname`,
      {
        params: {
          channelId: channelId,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function updateCurrentDiscordProfile(
  workflowId: string,
  automation_id: string,
  discordId: any,
  workspaceId: string
) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.post(
      `${apiUrl()}automation/discord/update/currentdiscordprofile`,
      null,
      {
        params: {
          workflowId: workflowId,
          automation_id: automation_id,
          discordId: discordId,
          workspaceId: workspaceId,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function updateDiscordNodeInfo(
  workflowId: string,
  automation_id: string,
  guild_id: any,
  bot_name: string,
  message: string,
  include_actual_post: boolean,
  workspaceId: string
) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.post(
      `${apiUrl()}automation/discord/update/discordnode`,
      null,
      {
        params: {
          workflowId: workflowId,
          automation_id: automation_id,
          guild_id: guild_id,
          bot_name: bot_name,
          message: message,
          include_actual_post: include_actual_post,
          workspaceId: workspaceId,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function updateDiscordTested(
  workspaceId: string,
  workflowId: string,
  automation_id: string
) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.post(
      `${apiUrl()}automation/discord/update/discordtested`,
      null,
      {
        params: {
          workspaceId: workspaceId,
          workflowId: workflowId,
          automation_id: automation_id,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function getDiscordProfile(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}automation/discord/read/discordaccount`,
      {
        params: { workspaceId: workspaceId },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

function Test({
  largeComponent,
  setLargeComponent,
  workflowData,
  discordTested,
  setDiscordTested,
  workspaceId,
}: TestProps) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      {largeComponent == 'Test' ? (
        <div className="flex flex-col mt-4">
          <span className="text-[10px] silka-medium text-gray-300">
            STEP 3
          </span>
          <div className="mt-1 flex flex-row space-x-3">
            <p className="silka-semibold text-xl text-gray-900">
              Test
            </p>
            {discordTested ? (
              <div className="my-auto p-1.5 rounded-full bg-[#7DD96E]">
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 10 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.36009 0.000479301C8.19346 0.00675003 8.03515 0.103445 7.91859 0.270123C7.75231 0.502896 6.59409 2.16916 5.40604 3.87729C4.4038 5.31833 3.64925 6.39865 3.29887 6.90006L1.05526 4.50648V4.50661C0.919528 4.36125 0.748133 4.29742 0.578825 4.32927C0.409499 4.36113 0.256219 4.48604 0.152735 4.67641C0.0492585 4.86667 0.00419299 5.10683 0.0274883 5.34387C0.0506918 5.58078 0.140373 5.795 0.276633 5.93935L2.97381 8.81616L2.97372 8.81604C3.09727 8.94785 3.25073 9.01244 3.40573 8.99802C3.56072 8.98359 3.70666 8.89104 3.81659 8.7374C3.98287 8.50463 5.1411 6.83824 6.32914 5.13023C7.51721 3.4222 8.73504 1.67236 8.82564 1.54554C8.95062 1.37648 9.02121 1.14356 9.02148 0.900259C9.02175 0.656952 8.95151 0.423926 8.8268 0.254372C8.70218 0.0846821 8.53376 -0.00686975 8.36003 0.000402386L8.36009 0.000479301Z"
                    fill="white"
                  />
                </svg>
              </div>
            ) : (
              <div className="my-auto p-1.5 rounded-full bg-[#EFCC00]">
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 6 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.63201 0H2.18889C0.986354 0 0.0244141 0.961939 0.0244141 2.16447L1.22695 12.5062C1.22695 13.5403 1.94851 14.3822 2.91045 14.6227C3.87239 14.4063 4.59395 13.5405 4.59395 12.5062L5.79648 2.16447C5.79648 0.961939 4.83454 0 3.63201 0Z"
                    fill="white"
                  />
                  <path
                    d="M4.83451 17.0763C4.83451 18.1389 3.97303 19.0004 2.91042 19.0004C1.84781 19.0004 0.986328 18.1389 0.986328 17.0763C0.986328 16.0137 1.84781 15.1523 2.91042 15.1523C3.97303 15.1523 4.83451 16.0137 4.83451 17.0763Z"
                    fill="white"
                  />
                </svg>
              </div>
            )}
          </div>
          <div className="flex flex-col mt-4 space-y-3 w-full">
            <p className="text-xs silka-medium text-gray-400">
              Confirm Discord connection
            </p>
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsLoading(true);
                updateDiscordTested(
                  workspaceId,
                  workflowData.id,
                  workflowData.automation_id
                ).then((value) => {
                  setIsLoading(false);
                  if (value.message == 'tested') {
                    setDiscordTested(true);
                    toast.success('Discord Successfully Tested!', {
                      className: 'text-sm silka-medium text-gray-900',
                    });
                  } else {
                    setDiscordTested(false);
                    toast.error('Failed Testing Discord Connection', {
                      className: 'text-sm silka-medium text-gray-900',
                    });
                  }
                });
              }}
              className={
                'text-sm flex flex-col justify-center items-center rounded py-2 silka-medium text-white hover:opacity-90 ' +
                (isLoading ? 'bg-[#E6E7F5]' : 'bg-[#5765F2]')
              }
            >
              {isLoading ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="animate-spin"
                  width="20px"
                  height="20px"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="xMidYMid"
                >
                  <circle
                    cx="50"
                    cy="50"
                    fill="none"
                    stroke="#5765F2"
                    strokeWidth="10"
                    r="35"
                    strokeDasharray="164.93361431346415 56.97787143782138"
                  >
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      repeatCount="indefinite"
                      dur="1s"
                      values="0 50 50;360 50 50"
                      keyTimes="0;1"
                    ></animateTransform>
                  </circle>
                </svg>
              ) : (
                <p className="text-sm silka-semibold text-white">
                  {discordTested
                    ? 'Retest Connection'
                    : 'Test Discord'}
                </p>
              )}
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={(e) => {
            e.preventDefault();
            setLargeComponent('Test');
          }}
          className="mt-4 flex flex-col"
        >
          <span className="text-[10px] silka-medium text-gray-300">
            STEP 3
          </span>
          <div className="mt-1 flex flex-row space-x-3">
            <p className="silka-semibold text-xl text-gray-900">
              Test
            </p>
            {discordTested ? (
              <div className="my-auto p-1.5 rounded-full bg-[#7DD96E]">
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 10 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.36009 0.000479301C8.19346 0.00675003 8.03515 0.103445 7.91859 0.270123C7.75231 0.502896 6.59409 2.16916 5.40604 3.87729C4.4038 5.31833 3.64925 6.39865 3.29887 6.90006L1.05526 4.50648V4.50661C0.919528 4.36125 0.748133 4.29742 0.578825 4.32927C0.409499 4.36113 0.256219 4.48604 0.152735 4.67641C0.0492585 4.86667 0.00419299 5.10683 0.0274883 5.34387C0.0506918 5.58078 0.140373 5.795 0.276633 5.93935L2.97381 8.81616L2.97372 8.81604C3.09727 8.94785 3.25073 9.01244 3.40573 8.99802C3.56072 8.98359 3.70666 8.89104 3.81659 8.7374C3.98287 8.50463 5.1411 6.83824 6.32914 5.13023C7.51721 3.4222 8.73504 1.67236 8.82564 1.54554C8.95062 1.37648 9.02121 1.14356 9.02148 0.900259C9.02175 0.656952 8.95151 0.423926 8.8268 0.254372C8.70218 0.0846821 8.53376 -0.00686975 8.36003 0.000402386L8.36009 0.000479301Z"
                    fill="white"
                  />
                </svg>
              </div>
            ) : (
              <div className="my-auto p-1.5 rounded-full bg-[#EFCC00]">
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 6 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.63201 0H2.18889C0.986354 0 0.0244141 0.961939 0.0244141 2.16447L1.22695 12.5062C1.22695 13.5403 1.94851 14.3822 2.91045 14.6227C3.87239 14.4063 4.59395 13.5405 4.59395 12.5062L5.79648 2.16447C5.79648 0.961939 4.83454 0 3.63201 0Z"
                    fill="white"
                  />
                  <path
                    d="M4.83451 17.0763C4.83451 18.1389 3.97303 19.0004 2.91042 19.0004C1.84781 19.0004 0.986328 18.1389 0.986328 17.0763C0.986328 16.0137 1.84781 15.1523 2.91042 15.1523C3.97303 15.1523 4.83451 16.0137 4.83451 17.0763Z"
                    fill="white"
                  />
                </svg>
              </div>
            )}
          </div>
          <hr className="w-full mt-4" />
        </button>
      )}
    </>
  );
}

function ChannelInfo({
  largeComponent,
  setLargeComponent,
  workflowData,
  workspaceId,
  selectedChannelId,
  setSelectedChannelId,
  selectedChannelName,
  setSelectedChannelName,
  message,
  setMessage,
  botName,
  setBotName,
  includeActualPost,
  setIncludeActualPost,
}: ChannelInfoProps) {
  return (
    <>
      {largeComponent == 'ChannelInfo' ? (
        <div className="flex flex-col mt-4">
          <span className="text-[10px] silka-medium text-gray-300">
            STEP 2
          </span>
          <div className="mt-1 flex flex-row space-x-3">
            <p className="silka-semibold text-xl text-gray-900">
              Discord Info
            </p>
            {selectedChannelId && message && botName ? (
              <div className="my-auto p-1.5 rounded-full bg-[#7DD96E]">
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 10 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.36009 0.000479301C8.19346 0.00675003 8.03515 0.103445 7.91859 0.270123C7.75231 0.502896 6.59409 2.16916 5.40604 3.87729C4.4038 5.31833 3.64925 6.39865 3.29887 6.90006L1.05526 4.50648V4.50661C0.919528 4.36125 0.748133 4.29742 0.578825 4.32927C0.409499 4.36113 0.256219 4.48604 0.152735 4.67641C0.0492585 4.86667 0.00419299 5.10683 0.0274883 5.34387C0.0506918 5.58078 0.140373 5.795 0.276633 5.93935L2.97381 8.81616L2.97372 8.81604C3.09727 8.94785 3.25073 9.01244 3.40573 8.99802C3.56072 8.98359 3.70666 8.89104 3.81659 8.7374C3.98287 8.50463 5.1411 6.83824 6.32914 5.13023C7.51721 3.4222 8.73504 1.67236 8.82564 1.54554C8.95062 1.37648 9.02121 1.14356 9.02148 0.900259C9.02175 0.656952 8.95151 0.423926 8.8268 0.254372C8.70218 0.0846821 8.53376 -0.00686975 8.36003 0.000402386L8.36009 0.000479301Z"
                    fill="white"
                  />
                </svg>
              </div>
            ) : (
              <div className="my-auto p-1.5 rounded-full bg-[#EFCC00]">
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 6 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.63201 0H2.18889C0.986354 0 0.0244141 0.961939 0.0244141 2.16447L1.22695 12.5062C1.22695 13.5403 1.94851 14.3822 2.91045 14.6227C3.87239 14.4063 4.59395 13.5405 4.59395 12.5062L5.79648 2.16447C5.79648 0.961939 4.83454 0 3.63201 0Z"
                    fill="white"
                  />
                  <path
                    d="M4.83451 17.0763C4.83451 18.1389 3.97303 19.0004 2.91042 19.0004C1.84781 19.0004 0.986328 18.1389 0.986328 17.0763C0.986328 16.0137 1.84781 15.1523 2.91042 15.1523C3.97303 15.1523 4.83451 16.0137 4.83451 17.0763Z"
                    fill="white"
                  />
                </svg>
              </div>
            )}
          </div>
          <div className="flex flex-col space-y-2.5 mt-4">
            <div className="flex flex-row space-x-2 items-between">
              <p className="text-xs silka-regular my-auto text-gray-400">
                Channel
              </p>
              {selectedChannelId ? (
                <div className="my-auto p-0.5 rounded-full bg-[#7DD96E]">
                  <svg
                    width="6"
                    height="6"
                    viewBox="0 0 10 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.36009 0.000479301C8.19346 0.00675003 8.03515 0.103445 7.91859 0.270123C7.75231 0.502896 6.59409 2.16916 5.40604 3.87729C4.4038 5.31833 3.64925 6.39865 3.29887 6.90006L1.05526 4.50648V4.50661C0.919528 4.36125 0.748133 4.29742 0.578825 4.32927C0.409499 4.36113 0.256219 4.48604 0.152735 4.67641C0.0492585 4.86667 0.00419299 5.10683 0.0274883 5.34387C0.0506918 5.58078 0.140373 5.795 0.276633 5.93935L2.97381 8.81616L2.97372 8.81604C3.09727 8.94785 3.25073 9.01244 3.40573 8.99802C3.56072 8.98359 3.70666 8.89104 3.81659 8.7374C3.98287 8.50463 5.1411 6.83824 6.32914 5.13023C7.51721 3.4222 8.73504 1.67236 8.82564 1.54554C8.95062 1.37648 9.02121 1.14356 9.02148 0.900259C9.02175 0.656952 8.95151 0.423926 8.8268 0.254372C8.70218 0.0846821 8.53376 -0.00686975 8.36003 0.000402386L8.36009 0.000479301Z"
                      fill="white"
                    />
                  </svg>
                </div>
              ) : (
                <div className="my-auto p-0.5 rounded-full bg-[#EFCC00]">
                  <svg
                    width="6"
                    height="6"
                    viewBox="0 0 6 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.63201 0H2.18889C0.986354 0 0.0244141 0.961939 0.0244141 2.16447L1.22695 12.5062C1.22695 13.5403 1.94851 14.3822 2.91045 14.6227C3.87239 14.4063 4.59395 13.5405 4.59395 12.5062L5.79648 2.16447C5.79648 0.961939 4.83454 0 3.63201 0Z"
                      fill="white"
                    />
                    <path
                      d="M4.83451 17.0763C4.83451 18.1389 3.97303 19.0004 2.91042 19.0004C1.84781 19.0004 0.986328 18.1389 0.986328 17.0763C0.986328 16.0137 1.84781 15.1523 2.91042 15.1523C3.97303 15.1523 4.83451 16.0137 4.83451 17.0763Z"
                      fill="white"
                    />
                  </svg>
                </div>
              )}
            </div>
            <DropdownMenuPrimitive.Root>
              <DropdownMenuPrimitive.Trigger asChild>
                <button className="py-2.5 px-4 flex flex-row justify-between items-between w-full text-xs silka-medium text-gray-800 rounded-lg border border-gray-300">
                  <span>
                    {selectedChannelName
                      ? selectedChannelName
                      : 'Select a Discord Channel'}
                  </span>
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="my-auto"
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
              <DiscordChannelDropdown
                workspaceId={workspaceId}
                setSelectedChannelId={setSelectedChannelId}
                setSelectedChannelName={setSelectedChannelName}
              />
            </DropdownMenuPrimitive.Root>
          </div>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2.5 mt-4">
              <div className="flex flex-row space-x-2">
                <p className="text-xs silka-regular text-gray-400">
                  Message
                </p>
                {message ? (
                  <div className="my-auto p-0.5 rounded-full bg-[#7DD96E]">
                    <svg
                      width="6"
                      height="6"
                      viewBox="0 0 10 9"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.36009 0.000479301C8.19346 0.00675003 8.03515 0.103445 7.91859 0.270123C7.75231 0.502896 6.59409 2.16916 5.40604 3.87729C4.4038 5.31833 3.64925 6.39865 3.29887 6.90006L1.05526 4.50648V4.50661C0.919528 4.36125 0.748133 4.29742 0.578825 4.32927C0.409499 4.36113 0.256219 4.48604 0.152735 4.67641C0.0492585 4.86667 0.00419299 5.10683 0.0274883 5.34387C0.0506918 5.58078 0.140373 5.795 0.276633 5.93935L2.97381 8.81616L2.97372 8.81604C3.09727 8.94785 3.25073 9.01244 3.40573 8.99802C3.56072 8.98359 3.70666 8.89104 3.81659 8.7374C3.98287 8.50463 5.1411 6.83824 6.32914 5.13023C7.51721 3.4222 8.73504 1.67236 8.82564 1.54554C8.95062 1.37648 9.02121 1.14356 9.02148 0.900259C9.02175 0.656952 8.95151 0.423926 8.8268 0.254372C8.70218 0.0846821 8.53376 -0.00686975 8.36003 0.000402386L8.36009 0.000479301Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                ) : (
                  <div className="my-auto p-0.5 rounded-full bg-[#EFCC00]">
                    <svg
                      width="6"
                      height="6"
                      viewBox="0 0 6 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.63201 0H2.18889C0.986354 0 0.0244141 0.961939 0.0244141 2.16447L1.22695 12.5062C1.22695 13.5403 1.94851 14.3822 2.91045 14.6227C3.87239 14.4063 4.59395 13.5405 4.59395 12.5062L5.79648 2.16447C5.79648 0.961939 4.83454 0 3.63201 0Z"
                        fill="white"
                      />
                      <path
                        d="M4.83451 17.0763C4.83451 18.1389 3.97303 19.0004 2.91042 19.0004C1.84781 19.0004 0.986328 18.1389 0.986328 17.0763C0.986328 16.0137 1.84781 15.1523 2.91042 15.1523C3.97303 15.1523 4.83451 16.0137 4.83451 17.0763Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <textarea
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                placeholder="Message sent to channel..."
                className="resize-none rounded-lg border border-gray-300 h-28 text-sm silka-medium text-gray-900 focus:ring-0 focus:border-[#FF623D]"
              />
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                setIncludeActualPost(!includeActualPost);
              }}
              className="flex flex-row space-x-3"
            >
              <div
                className={
                  'my-auto p-0.5 rounded-full border ' +
                  (includeActualPost
                    ? 'border-[#FF623D]'
                    : 'border-gray-200')
                }
              >
                <div
                  className={
                    'h-[12px] w-[12px] rounded-full ' +
                    (includeActualPost
                      ? 'bg-[#FF623D]'
                      : 'bg-gray-200')
                  }
                />
              </div>
              <p className="text-xs silka-medium text-gray-800 my-auto">
                Include post in message
              </p>
            </button>
          </div>
          <div className="flex flex-col space-y-2.5 mt-4">
            <div className="flex flex-row space-x-2">
              <p className="text-xs silka-regular text-gray-400">
                Bot Name
              </p>
              {botName ? (
                <div className="my-auto p-0.5 rounded-full bg-[#7DD96E]">
                  <svg
                    width="6"
                    height="6"
                    viewBox="0 0 10 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.36009 0.000479301C8.19346 0.00675003 8.03515 0.103445 7.91859 0.270123C7.75231 0.502896 6.59409 2.16916 5.40604 3.87729C4.4038 5.31833 3.64925 6.39865 3.29887 6.90006L1.05526 4.50648V4.50661C0.919528 4.36125 0.748133 4.29742 0.578825 4.32927C0.409499 4.36113 0.256219 4.48604 0.152735 4.67641C0.0492585 4.86667 0.00419299 5.10683 0.0274883 5.34387C0.0506918 5.58078 0.140373 5.795 0.276633 5.93935L2.97381 8.81616L2.97372 8.81604C3.09727 8.94785 3.25073 9.01244 3.40573 8.99802C3.56072 8.98359 3.70666 8.89104 3.81659 8.7374C3.98287 8.50463 5.1411 6.83824 6.32914 5.13023C7.51721 3.4222 8.73504 1.67236 8.82564 1.54554C8.95062 1.37648 9.02121 1.14356 9.02148 0.900259C9.02175 0.656952 8.95151 0.423926 8.8268 0.254372C8.70218 0.0846821 8.53376 -0.00686975 8.36003 0.000402386L8.36009 0.000479301Z"
                      fill="white"
                    />
                  </svg>
                </div>
              ) : (
                <div className="my-auto p-0.5 rounded-full bg-[#EFCC00]">
                  <svg
                    width="6"
                    height="6"
                    viewBox="0 0 6 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.63201 0H2.18889C0.986354 0 0.0244141 0.961939 0.0244141 2.16447L1.22695 12.5062C1.22695 13.5403 1.94851 14.3822 2.91045 14.6227C3.87239 14.4063 4.59395 13.5405 4.59395 12.5062L5.79648 2.16447C5.79648 0.961939 4.83454 0 3.63201 0Z"
                      fill="white"
                    />
                    <path
                      d="M4.83451 17.0763C4.83451 18.1389 3.97303 19.0004 2.91042 19.0004C1.84781 19.0004 0.986328 18.1389 0.986328 17.0763C0.986328 16.0137 1.84781 15.1523 2.91042 15.1523C3.97303 15.1523 4.83451 16.0137 4.83451 17.0763Z"
                      fill="white"
                    />
                  </svg>
                </div>
              )}
            </div>
            <input
              type="text"
              placeholder="Custom bot name..."
              className="rounded-lg border border-gray-300 text-sm silka-medium text-gray-900 focus:ring-0 focus:border-[#FF623D]"
              value={botName}
              onChange={(e) => {
                setBotName(e.target.value);
              }}
            />
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              setLargeComponent('Test');
            }}
            className="mt-5 w-fit text-xs silka-medium text-white rounded bg-[#363636] px-5 py-1.5"
          >
            Next
          </button>
          <hr className="w-full mt-4" />
        </div>
      ) : (
        <button
          onClick={(e) => {
            e.preventDefault();
            setLargeComponent('ChannelInfo');
          }}
          className="mt-4 flex flex-col"
        >
          <span className="text-[10px] silka-medium text-gray-300">
            STEP 2
          </span>
          <div className="mt-1 flex flex-row space-x-3">
            <p className="silka-semibold text-xl text-gray-900">
              Discord Info
            </p>
            {selectedChannelId && message && botName ? (
              <div className="my-auto p-1.5 rounded-full bg-[#7DD96E]">
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 10 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.36009 0.000479301C8.19346 0.00675003 8.03515 0.103445 7.91859 0.270123C7.75231 0.502896 6.59409 2.16916 5.40604 3.87729C4.4038 5.31833 3.64925 6.39865 3.29887 6.90006L1.05526 4.50648V4.50661C0.919528 4.36125 0.748133 4.29742 0.578825 4.32927C0.409499 4.36113 0.256219 4.48604 0.152735 4.67641C0.0492585 4.86667 0.00419299 5.10683 0.0274883 5.34387C0.0506918 5.58078 0.140373 5.795 0.276633 5.93935L2.97381 8.81616L2.97372 8.81604C3.09727 8.94785 3.25073 9.01244 3.40573 8.99802C3.56072 8.98359 3.70666 8.89104 3.81659 8.7374C3.98287 8.50463 5.1411 6.83824 6.32914 5.13023C7.51721 3.4222 8.73504 1.67236 8.82564 1.54554C8.95062 1.37648 9.02121 1.14356 9.02148 0.900259C9.02175 0.656952 8.95151 0.423926 8.8268 0.254372C8.70218 0.0846821 8.53376 -0.00686975 8.36003 0.000402386L8.36009 0.000479301Z"
                    fill="white"
                  />
                </svg>
              </div>
            ) : (
              <div className="my-auto p-1.5 rounded-full bg-[#EFCC00]">
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 6 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.63201 0H2.18889C0.986354 0 0.0244141 0.961939 0.0244141 2.16447L1.22695 12.5062C1.22695 13.5403 1.94851 14.3822 2.91045 14.6227C3.87239 14.4063 4.59395 13.5405 4.59395 12.5062L5.79648 2.16447C5.79648 0.961939 4.83454 0 3.63201 0Z"
                    fill="white"
                  />
                  <path
                    d="M4.83451 17.0763C4.83451 18.1389 3.97303 19.0004 2.91042 19.0004C1.84781 19.0004 0.986328 18.1389 0.986328 17.0763C0.986328 16.0137 1.84781 15.1523 2.91042 15.1523C3.97303 15.1523 4.83451 16.0137 4.83451 17.0763Z"
                    fill="white"
                  />
                </svg>
              </div>
            )}
          </div>
          <hr className="w-full mt-4" />
        </button>
      )}
    </>
  );
}

function Account({
  largeComponent,
  setLargeComponent,
  workflowData,
  discordId,
  workspaceId,
  setDiscordId,
}: AccountProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [discordData, setDiscordData] = useState<any>(null);
  const [connectDiscordOpen, setConnectDiscordOpen] = useState(false);
  const [refetchConnected, setRefetchConnected] = useState(false);

  useEffect(() => {
    if (workspaceId) {
      getDiscordProfile(workspaceId).then((value) => {
        setDiscordData(value);
        setIsLoading(false);
      });
    }
  }, [workspaceId]);

  useEffect(() => {
    if (refetchConnected) {
      setIsLoading(true);
      getDiscordProfile(workspaceId).then((value) => {
        setDiscordData(value);
        setIsLoading(false);
      });
    }
  }, [refetchConnected]);

  return (
    <>
      {largeComponent == 'Account' ? (
        <div className="flex flex-col mt-4">
          <span className="text-[10px] silka-medium text-gray-300">
            STEP 1
          </span>
          <div className="mt-1 flex flex-row space-x-3">
            <p className="silka-semibold text-xl text-gray-900">
              Account
            </p>
            {discordId ? (
              <div className="my-auto p-1.5 rounded-full bg-[#7DD96E]">
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 10 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.36009 0.000479301C8.19346 0.00675003 8.03515 0.103445 7.91859 0.270123C7.75231 0.502896 6.59409 2.16916 5.40604 3.87729C4.4038 5.31833 3.64925 6.39865 3.29887 6.90006L1.05526 4.50648V4.50661C0.919528 4.36125 0.748133 4.29742 0.578825 4.32927C0.409499 4.36113 0.256219 4.48604 0.152735 4.67641C0.0492585 4.86667 0.00419299 5.10683 0.0274883 5.34387C0.0506918 5.58078 0.140373 5.795 0.276633 5.93935L2.97381 8.81616L2.97372 8.81604C3.09727 8.94785 3.25073 9.01244 3.40573 8.99802C3.56072 8.98359 3.70666 8.89104 3.81659 8.7374C3.98287 8.50463 5.1411 6.83824 6.32914 5.13023C7.51721 3.4222 8.73504 1.67236 8.82564 1.54554C8.95062 1.37648 9.02121 1.14356 9.02148 0.900259C9.02175 0.656952 8.95151 0.423926 8.8268 0.254372C8.70218 0.0846821 8.53376 -0.00686975 8.36003 0.000402386L8.36009 0.000479301Z"
                    fill="white"
                  />
                </svg>
              </div>
            ) : (
              <div className="my-auto p-1.5 rounded-full bg-[#EFCC00]">
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 6 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.63201 0H2.18889C0.986354 0 0.0244141 0.961939 0.0244141 2.16447L1.22695 12.5062C1.22695 13.5403 1.94851 14.3822 2.91045 14.6227C3.87239 14.4063 4.59395 13.5405 4.59395 12.5062L5.79648 2.16447C5.79648 0.961939 4.83454 0 3.63201 0Z"
                    fill="white"
                  />
                  <path
                    d="M4.83451 17.0763C4.83451 18.1389 3.97303 19.0004 2.91042 19.0004C1.84781 19.0004 0.986328 18.1389 0.986328 17.0763C0.986328 16.0137 1.84781 15.1523 2.91042 15.1523C3.97303 15.1523 4.83451 16.0137 4.83451 17.0763Z"
                    fill="white"
                  />
                </svg>
              </div>
            )}
          </div>
          {isLoading ? (
            <div className="mt-3.5 flex flex-col space-y-1.5">
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-[85%] bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-[70%] bg-gray-200 rounded animate-pulse" />
            </div>
          ) : (
            <div className="flex flex-col mt-3.5">
              {discordData?.message == 'found' ? (
                <div className="flex flex-col space-y-3.5">
                  <p className="text-xs silka-meidum text-gray-400">
                    Select Discord
                  </p>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (discordId) {
                        setDiscordId(null);
                        updateCurrentDiscordProfile(
                          workflowData.id,
                          workflowData.automation_id,
                          'null',
                          workspaceId
                        ).then(() => {});
                      } else {
                        setDiscordId(discordData.id);
                        updateCurrentDiscordProfile(
                          workflowData.id,
                          workflowData.automation_id,
                          discordData.id,
                          workspaceId
                        ).then(() => {});
                      }
                    }}
                    className="flex hover:opacity-90 flex-row space-x-2"
                  >
                    <div
                      className={
                        'h-[15px] w-[15px] my-auto rounded-full ' +
                        (discordId ? 'bg-[#FF623D]' : 'bg-gray-200')
                      }
                    />
                    <img
                      src={discordData.discord_image}
                      className="w-[32px] my-auto h-[32px] rounded-full"
                    />
                    <div className="flex flex-col justify-start items-start">
                      <span className="text-[11px] silka-semibold text-gray-900">
                        {discordData.discord_name}
                      </span>
                      <p className="text-xs silka-regular mt-[2px] text-gray-500">
                        {discordData.discord_email}
                      </p>
                    </div>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-3">
                  <p className="text-xs silka-medium text-gray-400">
                    No Discord account found
                  </p>
                  <DialogPrimitive.Root
                    open={connectDiscordOpen}
                    onOpenChange={setConnectDiscordOpen}
                  >
                    <DialogPrimitive.Trigger asChild>
                      <button className="bg-[#5765F2] text-sm rounded py-2 silka-medium text-white hover:opacity-90">
                        Connect Discord
                      </button>
                    </DialogPrimitive.Trigger>
                    <AutomationConnectDiscord
                      isOpen={connectDiscordOpen}
                      setIsOpen={setConnectDiscordOpen}
                      workspaceId={workspaceId}
                      setRefetchConnected={setRefetchConnected}
                    />
                  </DialogPrimitive.Root>
                </div>
              )}
            </div>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              setLargeComponent('ChannelInfo');
            }}
            className="mt-5 w-fit text-xs silka-medium text-white rounded bg-[#363636] px-5 py-1.5"
          >
            Next
          </button>
          <hr className="w-full mt-4" />
        </div>
      ) : (
        <button
          onClick={(e) => {
            e.preventDefault();
            setLargeComponent('Account');
          }}
          className="mt-4 flex flex-col"
        >
          <span className="text-[10px] silka-medium text-gray-300">
            STEP 1
          </span>
          <div className="flex flex-row space-x-3 mt-1">
            <p className="silka-semibold text-xl text-gray-900">
              Account
            </p>
            {discordId ? (
              <div className="my-auto p-1.5 rounded-full bg-[#7DD96E]">
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 10 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.36009 0.000479301C8.19346 0.00675003 8.03515 0.103445 7.91859 0.270123C7.75231 0.502896 6.59409 2.16916 5.40604 3.87729C4.4038 5.31833 3.64925 6.39865 3.29887 6.90006L1.05526 4.50648V4.50661C0.919528 4.36125 0.748133 4.29742 0.578825 4.32927C0.409499 4.36113 0.256219 4.48604 0.152735 4.67641C0.0492585 4.86667 0.00419299 5.10683 0.0274883 5.34387C0.0506918 5.58078 0.140373 5.795 0.276633 5.93935L2.97381 8.81616L2.97372 8.81604C3.09727 8.94785 3.25073 9.01244 3.40573 8.99802C3.56072 8.98359 3.70666 8.89104 3.81659 8.7374C3.98287 8.50463 5.1411 6.83824 6.32914 5.13023C7.51721 3.4222 8.73504 1.67236 8.82564 1.54554C8.95062 1.37648 9.02121 1.14356 9.02148 0.900259C9.02175 0.656952 8.95151 0.423926 8.8268 0.254372C8.70218 0.0846821 8.53376 -0.00686975 8.36003 0.000402386L8.36009 0.000479301Z"
                    fill="white"
                  />
                </svg>
              </div>
            ) : (
              <div className="my-auto p-1.5 rounded-full bg-[#EFCC00]">
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 6 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.63201 0H2.18889C0.986354 0 0.0244141 0.961939 0.0244141 2.16447L1.22695 12.5062C1.22695 13.5403 1.94851 14.3822 2.91045 14.6227C3.87239 14.4063 4.59395 13.5405 4.59395 12.5062L5.79648 2.16447C5.79648 0.961939 4.83454 0 3.63201 0Z"
                    fill="white"
                  />
                  <path
                    d="M4.83451 17.0763C4.83451 18.1389 3.97303 19.0004 2.91042 19.0004C1.84781 19.0004 0.986328 18.1389 0.986328 17.0763C0.986328 16.0137 1.84781 15.1523 2.91042 15.1523C3.97303 15.1523 4.83451 16.0137 4.83451 17.0763Z"
                    fill="white"
                  />
                </svg>
              </div>
            )}
          </div>
          <hr className="w-full mt-4" />
        </button>
      )}
    </>
  );
}

export default function DiscordSecondLeftBar({
  workflowData,
  secondErrors,
  setSecondErrors,
  leftState,
}: Props) {
  const [largeComponent, setLargeComponent] = useState('Account');
  const [isLoading, setIsLoading] = useState(true);
  const [workspaceId, setWorkspaceId] = useState<any>(null);
  const [discordId, setDiscordId] = useState<any>(null);
  const [discordTested, setDiscordTested] = useState(false);
  const [selectedChannelId, setSelectedChannelId] =
    useState<any>(null);
  const [selectedChannelName, setSelectedChannelName] =
    useState<any>(null);
  const [message, setMessage] = useState('');
  const [botName, setBotName] = useState('');
  const [includeActualPost, setIncludeActualPost] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      updateDiscordNodeInfo(
        workflowData?.id,
        workflowData?.automation_id,
        selectedChannelId,
        botName,
        message,
        includeActualPost,
        workspaceId
      );
    }
  }, [selectedChannelId, message, botName, includeActualPost]);

  useEffect(() => {
    let temp = 0;
    if (!discordId) {
      temp += 1;
    }
    if (!discordTested) {
      temp += 1;
    }
    if (!selectedChannelId) {
      temp += 1;
    }
    if (!message) {
      temp += 1;
    }
    if (!botName) {
      temp += 1;
    }
    setSecondErrors(temp);
  }, [discordId, discordTested, selectedChannelId, message, botName]);

  useEffect(() => {
    if (workflowData) {
      setDiscordId(workflowData.discordId);
      setDiscordTested(workflowData.discord_tested);
      setWorkspaceId(workflowData.workspaceId);
      setIncludeActualPost(workflowData.include_actual_post);
      setMessage(workflowData.discord_message);
      setBotName(workflowData.discord_bot_name);
      setSelectedChannelId(workflowData.discord_guild_id);
      if (workflowData.discord_guild_id) {
        getChannelName(workflowData.discord_guild_id).then(
          (value) => {
            setSelectedChannelName(value.name);
          }
        );
      }
      setIsLoading(false);
    }
  }, [workflowData]);

  return (
    <div
      className={
        'flex flex-col ' +
        (leftState == 'discordSecondNode'
          ? ''
          : workflowData?.second_automation == 'Discord'
          ? 'hidden'
          : '')
      }
    >
      <div className="flex flex-row space-x-3">
        <img
          src="/images/automation/discord.svg"
          className="h-[52px] w-[52px] my-auto rounded-full border border-gray-300 p-2"
        />
        <div className="flex flex-col space-y-1">
          <span className="silka-medium text-gray-400 text-[10px]">
            DISCORD TRIGGER
          </span>
          <p className="silka-semibold text-sm text-gray-800">
            {workflowData.second_description}
          </p>
        </div>
      </div>
      <Account
        largeComponent={largeComponent}
        setLargeComponent={setLargeComponent}
        setDiscordId={setDiscordId}
        discordId={discordId}
        workflowData={workflowData}
        workspaceId={workspaceId}
      />
      <ChannelInfo
        largeComponent={largeComponent}
        setLargeComponent={setLargeComponent}
        workflowData={workflowData}
        workspaceId={workspaceId}
        selectedChannelId={selectedChannelId}
        setSelectedChannelId={setSelectedChannelId}
        selectedChannelName={selectedChannelName}
        setSelectedChannelName={setSelectedChannelName}
        message={message}
        setMessage={setMessage}
        botName={botName}
        setBotName={setBotName}
        includeActualPost={includeActualPost}
        setIncludeActualPost={setIncludeActualPost}
      />
      <Test
        largeComponent={largeComponent}
        setLargeComponent={setLargeComponent}
        workflowData={workflowData}
        discordTested={discordTested}
        setDiscordTested={setDiscordTested}
        workspaceId={workspaceId}
      />
    </div>
  );
}
