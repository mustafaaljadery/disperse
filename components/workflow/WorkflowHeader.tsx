import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { DisperseLogoTiny } from '../logos/DisperseLogo';
import Router from 'next/router';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../utils/apiUrl';
import toast from 'react-hot-toast';

interface Props {
  workspaceId: string;
  workflowData: any;
  leftState: any;
  setLeftState: Dispatch<SetStateAction<any>>;
  totalErrors: number;
}

async function switchActive(
  workspaceId: string,
  workflowId: string,
  automation_id: string,
  active: boolean
) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.post(
      `${apiUrl()}automation/update/active`,
      null,
      {
        params: {
          workspaceId: workspaceId,
          workflowId: workflowId,
          automation_id: automation_id,
          active: active,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

export default function WorkflowHeader({
  workspaceId,
  workflowData,
  leftState,
  setLeftState,
  totalErrors,
}: Props) {
  const [firstImage, setFirstImage] = useState<any>(null);
  const [secondImage, setSecondImage] = useState<any>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (workflowData) {
      setActive(workflowData.active);
      switch (workflowData.first_automation) {
        case 'Facebook':
          setFirstImage('/images/automation/facebook.svg');
          break;
        case 'Discord':
          setFirstImage('/images/automation/discord.svg');
          break;
        case 'Disperse':
          setFirstImage('/icons/disperse.png');
          break;
        case 'Slack':
          setFirstImage('/images/automation/slack.svg');
          break;
        case 'Instagram':
          setFirstImage('/images/automation/instagram.svg');
          break;
        case 'Youtube':
          setFirstImage('/images/automation/youtube.svg');
          break;
        case 'Tiktok':
          setFirstImage('/images/automation/tiktok.svg');
          break;
        case 'Linkedin':
          setFirstImage('/images/automation/linkedin.svg');
          break;
        case 'Twitter':
          setFirstImage('/images/automation/twitter.svg');
          break;
        case 'Twitch':
          setFirstImage('/images/automation/twitch.svg');
          break;
        default:
          break;
      }

      switch (workflowData.second_automation) {
        case 'Facebook':
          setSecondImage('/images/automation/facebook.svg');
          break;
        case 'Discord':
          setSecondImage('/images/automation/discord.svg');
          break;
        case 'Disperse':
          setSecondImage('/icons/disperse.png');
          break;
        case 'Slack':
          setSecondImage('/images/automation/slack.svg');
          break;
        case 'Instagram':
          setSecondImage('/images/automation/instagram.svg');
          break;
        case 'Youtube':
          setSecondImage('/images/automation/youtube.svg');
          break;
        case 'Tiktok':
          setSecondImage('/images/automation/tiktok.svg');
          break;
        case 'Linkedin':
          setSecondImage('/images/automation/linkedin.svg');
          break;
        case 'Twitter':
          setSecondImage('/images/automation/twitter.svg');
          break;
        case 'Pinterest':
          setSecondImage('/images/automation/pinterest.svg');
          break;
        default:
          break;
      }
    }
  }, [workflowData]);

  return (
    <div className="h-16 bg-white px-4 flex flex-row justify-between items-between">
      <div className="flex flex-row space-x-3 my-auto">
        <button
          onClick={(e) => {
            e.preventDefault();
            Router.push(`/${workspaceId}/automation`);
          }}
          className="flex flex-row my-auto space-x-2.5 px-2 md:px-3.5 py-1 md:py-2 hover:bg-gray-100 rounded"
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 198 319"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="my-auto"
          >
            <path
              d="M165.824 0L197.188 32.1093L65.0271 159.041L197.188 285.973L165.824 318.083L0.0644531 159.043L165.824 0Z"
              fill="#363636"
            />
          </svg>
          <DisperseLogoTiny />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setLeftState(
              `${workflowData.first_automation.toLowerCase()}FirstNode`
            );
          }}
          className={
            'rounded flex flex-row space-x-2.5 px-1.5 md:px-2.5 py-1 md:py-1.5 my-auto ' +
            (`${workflowData.first_automation.toLowerCase()}FirstNode` ==
            leftState
              ? 'bg-gray-100 text-gray-700 silka-semibold'
              : 'text-gray-500 silka-medium')
          }
        >
          <img
            src={firstImage}
            className="h-[16px] hidden sm:flex w-[16px] my-auto"
          />
          <p className="text-xs my-auto">
            {workflowData.first_automation}
          </p>
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setLeftState(
              `${workflowData.second_automation.toLowerCase()}SecondNode`
            );
          }}
          className={
            'px-1.5 md:px-2.5 rounded flex flex-row space-x-1.5 py-1 md:py-1.5 my-auto ' +
            (`${workflowData.second_automation.toLowerCase()}SecondNode` ==
            leftState
              ? 'bg-gray-100 text-gray-700 silka-semibold'
              : 'text-gray-500 silka-medium')
          }
        >
          <img
            src={secondImage}
            className="h-[16px] hidden sm:flex w-[16px] my-auto"
          />
          <p className="text-xs my-auto">
            {workflowData.second_automation}
          </p>
        </button>
      </div>
      <div className="hidden md:flex flex-row space-x-2.5 my-auto">
        <p className="my-auto text-sm silka-semibold text-[#363636]">
          {workflowData.title}
        </p>
      </div>
      <div className="my-auto md:flex flex-row space-x-4">
        <div className="hidden md:flex flex-row space-x-1.5 px-4 py-1.5 rounded shadow-sm inner-border inner-border-gray-200">
          <svg
            width="16"
            height="16"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="my-auto"
          >
            <path
              d="M8.69667 0.0403541C8.90859 0.131038 9.03106 0.354857 8.99316 0.582235L8.0902 6.00001H12.5C12.6893 6.00001 12.8625 6.10701 12.9472 6.27641C13.0319 6.4458 13.0136 6.6485 12.8999 6.80001L6.89997 14.8C6.76167 14.9844 6.51521 15.0503 6.30328 14.9597C6.09135 14.869 5.96888 14.6452 6.00678 14.4178L6.90974 9H2.49999C2.31061 9 2.13748 8.893 2.05278 8.72361C1.96809 8.55422 1.98636 8.35151 2.09999 8.2L8.09997 0.200038C8.23828 0.0156255 8.48474 -0.0503301 8.69667 0.0403541ZM3.49999 8.00001H7.49997C7.64695 8.00001 7.78648 8.06467 7.88148 8.17682C7.97648 8.28896 8.01733 8.43723 7.99317 8.5822L7.33027 12.5596L11.5 7.00001H7.49997C7.353 7.00001 7.21347 6.93534 7.11846 6.8232C7.02346 6.71105 6.98261 6.56279 7.00678 6.41781L7.66968 2.44042L3.49999 8.00001Z"
              fill="#70797E"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
          <p className="my-auto text-[#70797E] text-sm silka-medium">
            {workflowData.runs} Runs
          </p>
        </div>
        <div
          className={
            'hidden md:flex flex-row my-auto space-x-1.5 px-4 py-1.5 rounded shadow inner-border ' +
            (totalErrors == 0
              ? 'inner-border-[#15AE5D]'
              : 'inner-border-[#FD3131]')
          }
        >
          {totalErrors == 0 ? (
            <svg
              width="16"
              height="16"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="my-auto"
            >
              <path
                d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                fill="#008A00"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          ) : (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="my-auto"
            >
              <g clipPath="url(#clip0_1204_2)">
                <path
                  d="M7.83203 2.06133V7.75333C7.83203 8.00867 8.2907 8.014 8.2907 7.75333V2.97333C8.2907 2.06867 9.88736 2.04067 9.88736 2.97333V8.39C9.88736 8.72333 10.2147 8.772 10.338 8.52133C10.4554 8.28067 10.9434 7.20533 10.9494 7.194C11.4394 6.16667 13.078 6.79067 12.5687 8C12.442 8.328 10.8727 11.888 10.4727 12.786C10.0534 13.7267 9.2347 14.6667 7.72203 14.6667H5.09536C3.50336 14.6667 2.66536 13.722 2.66536 12.07V4.862C2.66536 3.906 3.9827 3.954 3.9827 4.818V7.97867C3.9827 8.23933 4.45936 8.238 4.45936 7.97867V2.9C4.45936 1.91667 5.93136 1.94333 5.93136 2.9V7.69467C5.93136 7.95933 6.37403 7.94667 6.37403 7.68933V2.06133C6.37403 1.10467 7.83203 1.07667 7.83203 2.06133ZM7.11136 0C6.40803 0 5.7967 0.332667 5.4247 0.851333C4.2027 0.718 3.16403 1.61533 3.12736 2.83267C2.09136 2.928 1.33203 3.768 1.33203 4.862V12.07C1.33203 14.494 2.77403 16 5.09536 16H7.72203C9.5127 16 10.922 15.0513 11.6907 13.3293C11.982 12.6753 13.606 8.99867 13.804 8.50267C14.1134 7.75667 14.0527 6.97133 13.6374 6.34533C13.13 5.58133 12.1487 5.17867 11.2214 5.40533V2.97267C11.2214 1.69667 10.124 0.837333 8.86803 0.961333C8.51336 0.375333 7.87336 0 7.11136 0Z"
                  fill="#FD3131"
                />
              </g>
              <defs>
                <clipPath id="clip0_1204_2">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
          )}
          <p
            className={
              'my-auto text-sm silka-medium ' +
              (totalErrors == 0 ? 'text-[#15AE5D]' : 'text-[#FD3131]')
            }
          >
            {totalErrors} Errors
          </p>
        </div>
        {active ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              switchActive(
                workspaceId,
                workflowData.id,
                workflowData.automation_id,
                false
              );
              setActive(false);
            }}
            className="px-2 md:px-4 my-auto hover:opacity-90 flex flex-row space-x-1.5 h-fit py-1.5 bg-[#FD3131] rounded"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="my-auto"
            >
              <g clipPath="url(#clip0_1204_2)">
                <path
                  d="M7.83203 2.06133V7.75333C7.83203 8.00867 8.2907 8.014 8.2907 7.75333V2.97333C8.2907 2.06867 9.88736 2.04067 9.88736 2.97333V8.39C9.88736 8.72333 10.2147 8.772 10.338 8.52133C10.4554 8.28067 10.9434 7.20533 10.9494 7.194C11.4394 6.16667 13.078 6.79067 12.5687 8C12.442 8.328 10.8727 11.888 10.4727 12.786C10.0534 13.7267 9.2347 14.6667 7.72203 14.6667H5.09536C3.50336 14.6667 2.66536 13.722 2.66536 12.07V4.862C2.66536 3.906 3.9827 3.954 3.9827 4.818V7.97867C3.9827 8.23933 4.45936 8.238 4.45936 7.97867V2.9C4.45936 1.91667 5.93136 1.94333 5.93136 2.9V7.69467C5.93136 7.95933 6.37403 7.94667 6.37403 7.68933V2.06133C6.37403 1.10467 7.83203 1.07667 7.83203 2.06133ZM7.11136 0C6.40803 0 5.7967 0.332667 5.4247 0.851333C4.2027 0.718 3.16403 1.61533 3.12736 2.83267C2.09136 2.928 1.33203 3.768 1.33203 4.862V12.07C1.33203 14.494 2.77403 16 5.09536 16H7.72203C9.5127 16 10.922 15.0513 11.6907 13.3293C11.982 12.6753 13.606 8.99867 13.804 8.50267C14.1134 7.75667 14.0527 6.97133 13.6374 6.34533C13.13 5.58133 12.1487 5.17867 11.2214 5.40533V2.97267C11.2214 1.69667 10.124 0.837333 8.86803 0.961333C8.51336 0.375333 7.87336 0 7.11136 0Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_1204_2">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <p className="my-auto text-white text-xs md:text-sm silka-semibold">
              Deactivate
            </p>
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              if (totalErrors == 0) {
                switchActive(
                  workspaceId,
                  workflowData.id,
                  workflowData.automation_id,
                  true
                );
                setActive(true);
                toast.success('Workflow is Active!', {
                  className: 'text-sm silka-medium text-gray-900',
                });
              } else {
                toast.error('Please fix errors before activating.', {
                  className: 'text-sm silka-medium text-gray-900',
                });
              }
            }}
            className="px-4 my-auto hover:opacity-90 flex flex-row space-x-1.5 h-fit py-1.5 bg-[#15AE5D] rounded"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="my-auto"
            >
              <path
                d="M11.4877 7.11785L2.7983 0.242929C2.45991 -0.024711 1.99924 -0.0757137 1.61075 0.112399C1.22319 0.299782 0.976562 0.693375 0.976562 1.12408V14.8753C0.976562 15.3068 1.22318 15.6998 1.61075 15.8878C1.76687 15.9625 1.93359 16 2.10051 16C2.34877 16 2.59612 15.9177 2.79867 15.7569L11.488 8.8824C11.7571 8.66888 11.9144 8.34364 11.9144 8.0005C11.9145 7.65718 11.7571 7.3314 11.4877 7.11823L11.4877 7.11785Z"
                fill="white"
              />
            </svg>

            <p className="my-auto text-white text-xs md:text-sm silka-semibold">
              Activate
            </p>
          </button>
        )}
      </div>
    </div>
  );
}
