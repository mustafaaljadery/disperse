import { Dispatch, useState, useEffect, SetStateAction } from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../../../utils/apiUrl';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface Props {
  workflowData: any;
  firstErrors: number;
  setFirstErrors: Dispatch<SetStateAction<number>>;
  leftState: string;
}

interface TestProps {
  largeComponent: string;
  setLargeComponent: Dispatch<SetStateAction<string>>;
  disperseTested: any;
  setDisperseTested: Dispatch<SetStateAction<any>>;
  workspaceId: string;
  workflowId: string;
  workflowData: any;
}

interface AccountsProps {
  largeComponent: string;
  setLargeComponent: Dispatch<SetStateAction<string>>;
  workflowData: any;
  workspaceId: string;
  facebookConnected: boolean;
  setFacebookConnected: Dispatch<SetStateAction<boolean>>;
  instagramConnected: boolean;
  setInstagramConnected: Dispatch<SetStateAction<boolean>>;
  youtubeConnected: boolean;
  setYoutubeConnected: Dispatch<SetStateAction<boolean>>;
  twitterConnected: boolean;
  setTwitterConnected: Dispatch<SetStateAction<boolean>>;
  tiktokConnected: boolean;
  setTiktokConnected: Dispatch<SetStateAction<boolean>>;
}

async function updateDisperseTested(
  workspaceId: string,
  workflowId: string,
  automation_id: string
) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.post(
      `${apiUrl()}automation/disperse/update/dispersetested`,
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

async function updateCurrentDisperseProfile(
  workflowId: string,
  automation_id: string,
  facebookConnected: boolean,
  instagramConnected: boolean,
  youtubeConnected: boolean,
  twitterConnected: boolean,
  tiktokConnected: boolean,
  workspaceId: string
) {
  try {
    axiosRetry(axios, { retries: 3 });
    const result = await axios.post(
      `${apiUrl()}automation/disperse/update/currentdisperseprofile`,
      null,
      {
        params: {
          workflowId: workflowId,
          automation_id: automation_id,
          facebookConnected: facebookConnected,
          instagramConnected: instagramConnected,
          youtubeConnected: youtubeConnected,
          twitterConnected: twitterConnected,
          tiktokConnected: tiktokConnected,
          workspaceId: workspaceId,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function getDisperseDetails(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });
    const result = await axios.get(
      `${apiUrl()}automation/disperse/read/dispersedetails`,
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

function Test({
  largeComponent,
  setLargeComponent,
  disperseTested,
  setDisperseTested,
  workflowId,
  workspaceId,
  workflowData,
}: TestProps) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {largeComponent == 'Test' ? (
        <div className="mt-4 flex flex-col">
          <span className="text-[10px] silka-medium text-gray-300">
            STEP 2
          </span>
          <div className="flex flex-row space-x-3">
            <p className="mt-1 silka-semibold text-xl text-gray-900">
              Test
            </p>
            {disperseTested ? (
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
          <p className="mt-4 text-xs silka-medium text-gray-400">
            Check valid connection
          </p>
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsLoading(true);
              updateDisperseTested(
                workspaceId,
                workflowData.id,
                workflowData.automation_id
              ).then((value) => {
                setIsLoading(false);
                if (value.message == 'tested') {
                  setDisperseTested(true);
                  toast.success('Disperse Successfully Tested!', {
                    className: 'text-sm silka-medium text-gray-900',
                  });
                } else {
                  setDisperseTested(false);
                  toast.error('Failed Testing Disperse Connection', {
                    className: 'text-sm silka-medium text-gray-900',
                  });
                }
              });
            }}
            className={
              'w-full mt-2.5 py-2 flex flex-col jusitfy-center items-center rounded hover:opacity-90 ' +
              (isLoading ? 'bg-[#F6EDEB]' : 'bg-[#FF623D]')
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
                  stroke="#FF623D"
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
                {disperseTested
                  ? 'Retest Connection'
                  : 'Test Disperse'}
              </p>
            )}
          </button>
          <hr className="w-full mt-4" />
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
            STEP 2
          </span>
          <div className="mt-1 flex flex-row space-x-3">
            <p className="silka-semibold text-xl text-gray-900">
              Test
            </p>
            {disperseTested ? (
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

function Accounts({
  largeComponent,
  setLargeComponent,
  workflowData,
  workspaceId,
  facebookConnected,
  setFacebookConnected,
  instagramConnected,
  setInstagramConnected,
  youtubeConnected,
  setYoutubeConnected,
  twitterConnected,
  setTwitterConnected,
  tiktokConnected,
  setTiktokConnected,
}: AccountsProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [possibleValues, setPossibleValues] = useState<any>(null);
  const [totalValues, setTotalValues] = useState(0);

  useEffect(() => {
    console.log(workspaceId);
    if (workspaceId) {
      console.log(workspaceId);
      getDisperseDetails(workspaceId).then((value) => {
        if (value.facebookConnected) {
          setTotalValues(totalValues + 1);
        }
        if (value.instagramConnected) {
          setTotalValues(totalValues + 1);
        }
        if (value.youtubeConnected) {
          setTotalValues(totalValues + 1);
        }
        if (value.twitterConnected) {
          setTotalValues(totalValues + 1);
        }
        if (value.tiktokConnected) {
          setTotalValues(totalValues + 1);
        }
        setPossibleValues(value);
        setIsLoading(false);
      });
    }
  }, [workspaceId]);

  useEffect(() => {
    updateCurrentDisperseProfile(
      workflowData?.id,
      workflowData?.automation_id,
      facebookConnected,
      instagramConnected,
      youtubeConnected,
      twitterConnected,
      tiktokConnected,
      workspaceId
    );
  }, [
    facebookConnected,
    instagramConnected,
    youtubeConnected,
    twitterConnected,
    tiktokConnected,
  ]);

  return (
    <>
      {largeComponent == 'Accounts' ? (
        <div className="mt-4 flex flex-col">
          <span className="text-[10px] silka-medium text-gray-300">
            STEP 1
          </span>
          <div className="mt-1 flex flex-row space-x-3">
            <p className="silka-semibold text-xl text-gray-900">
              Accounts
            </p>
            {facebookConnected ||
            youtubeConnected ||
            tiktokConnected ||
            twitterConnected ||
            instagramConnected ? (
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
          ) : totalValues == 0 ? (
            <div className="flex flex-col mt-3.5 space-y-3">
              <p className="text-xs silka-medium text-gray-400">
                No Socials Conected
              </p>
              <Link
                href={'/' + workspaceId + '/settings/integrations'}
                legacyBehavior
              >
                <button className="bg-[#FF623D] text-sm rounded py-2 silka-medium text-white hover:opacity-90">
                  Connect Socials
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col mt-3.5 space-y-4">
              {possibleValues?.facebookConnected ? (
                <button
                  onClick={() => {
                    setFacebookConnected(!facebookConnected);
                  }}
                  className="flex flex-row space-x-2"
                >
                  <button
                    className={
                      'h-[18px] flex flex-col justify-center items-center my-auto rounded-full w-[18px] ' +
                      (facebookConnected
                        ? 'bg-[#0572E7]'
                        : 'bg-gray-200')
                    }
                  >
                    {facebookConnected ? (
                      <>
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                            fill="white"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </>
                    ) : (
                      <></>
                    )}
                  </button>
                  <p className="my-auto text-sm silka-medium text-gray-700">
                    Facebook
                  </p>
                </button>
              ) : (
                <></>
              )}
              {possibleValues?.youtubeConnected ? (
                <button
                  onClick={() => {
                    setYoutubeConnected(!youtubeConnected);
                  }}
                  className="flex flex-row space-x-2"
                >
                  <button
                    className={
                      'h-[18px] flex flex-col justify-center items-center my-auto rounded-full w-[18px] ' +
                      (youtubeConnected
                        ? 'bg-[#FF0000]'
                        : 'bg-gray-200')
                    }
                  >
                    {youtubeConnected ? (
                      <>
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                            fill="white"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </>
                    ) : (
                      <></>
                    )}
                  </button>
                  <p className="my-auto text-sm silka-medium text-gray-700">
                    Youtube
                  </p>
                </button>
              ) : (
                <></>
              )}
              {possibleValues?.twitterConnected ? (
                <button
                  onClick={() => {
                    setTwitterConnected(!twitterConnected);
                  }}
                  className="flex flex-row space-x-2"
                >
                  <button
                    className={
                      'h-[18px] flex flex-col justify-center items-center my-auto rounded-full w-[18px] ' +
                      (twitterConnected
                        ? 'bg-[#1E98F0]'
                        : 'bg-gray-200')
                    }
                  >
                    {twitterConnected ? (
                      <>
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                            fill="white"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </>
                    ) : (
                      <></>
                    )}
                  </button>
                  <p className="my-auto text-sm silka-medium text-gray-700">
                    Twitter
                  </p>
                </button>
              ) : (
                <></>
              )}
              {possibleValues?.instagramConnected ? (
                <button
                  onClick={() => {
                    setInstagramConnected(!instagramConnected);
                  }}
                  className="flex flex-row space-x-2"
                >
                  <button
                    className={
                      'h-[18px] flex flex-col justify-center items-center my-auto rounded-full w-[18px] ' +
                      (instagramConnected
                        ? 'bg-[#F604D0]'
                        : 'bg-gray-200')
                    }
                  >
                    {instagramConnected ? (
                      <>
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                            fill="white"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </>
                    ) : (
                      <></>
                    )}
                  </button>
                  <p className="my-auto text-sm silka-medium text-gray-700">
                    Instagram
                  </p>
                </button>
              ) : (
                <></>
              )}
              {possibleValues?.tiktokConnected ? (
                <button
                  onClick={() => {
                    setTiktokConnected(!tiktokConnected);
                  }}
                  className="flex flex-row space-x-2"
                >
                  <button
                    className={
                      'h-[18px] flex flex-col justify-center items-center my-auto rounded-full w-[18px] ' +
                      (tiktokConnected
                        ? 'bg-[#363636]'
                        : 'bg-gray-200')
                    }
                  >
                    {tiktokConnected ? (
                      <>
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                            fill="white"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </>
                    ) : (
                      <></>
                    )}
                  </button>
                  <p className="my-auto text-sm silka-medium text-gray-700">
                    TikTok
                  </p>
                </button>
              ) : (
                <></>
              )}
            </div>
          )}
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
            setLargeComponent('Accounts');
          }}
          className="mt-4 flex flex-col"
        >
          <span className="text-[10px] silka-medium text-gray-300">
            STEP 1
          </span>
          <div className="mt-1 flex flex-row space-x-3">
            <p className="silka-semibold text-xl text-gray-900">
              Account
            </p>
            {facebookConnected ||
            youtubeConnected ||
            twitterConnected ||
            tiktokConnected ||
            instagramConnected ? (
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

export default function DisperseFirstLeftBar({
  workflowData,
  firstErrors,
  setFirstErrors,
  leftState,
}: Props) {
  const [largeComponent, setLargeComponent] = useState('Accounts');
  const [workspaceId, setWorkspaceId] = useState<any>(null);
  const [facebookConnected, setFacebookConnected] = useState(false);
  const [instagramConnected, setInstagramConnected] = useState(false);
  const [twitterConnected, setTwitterConnected] = useState(false);
  const [youtubeConnected, setYoutubeConnected] = useState(false);
  const [tiktokConnected, setTiktokConnected] = useState(false);
  const [disperseTested, setDisperseTested] = useState<any>(null);

  useEffect(() => {
    let temp = 0;
    if (!disperseTested) {
      temp += 1;
    }
    if (
      !facebookConnected &&
      !instagramConnected &&
      !youtubeConnected &&
      !twitterConnected &&
      !tiktokConnected
    ) {
      temp += 1;
    }
    setFirstErrors(temp);
  }, [
    disperseTested,
    facebookConnected,
    instagramConnected,
    youtubeConnected,
    twitterConnected,
    tiktokConnected,
  ]);

  useEffect(() => {
    if (workflowData) {
      setFacebookConnected(workflowData.facebook_included);
      setInstagramConnected(workflowData.instagram_included);
      setTwitterConnected(workflowData.twitter_included);
      setYoutubeConnected(workflowData.youtube_included);
      setTiktokConnected(workflowData.tiktok_included);
      setDisperseTested(workflowData.disperse_tested);
      setWorkspaceId(workflowData.workspaceId);
    }
  }, [workflowData]);

  return (
    <div
      className={
        'flex flex-col ' +
        (leftState == 'disperseFirstNode'
          ? ''
          : workflowData?.first_automation == 'Disperse'
          ? 'hidden'
          : '')
      }
    >
      <div className="flex flex-row space-x-3">
        <img
          src="/icons/disperse.png"
          className="h-[52px] w-[52px] my-auto rounded-full border border-gray-300 p-2"
        />
        <div className="flex flex-col space-y-1">
          <span className="silka-medium text-gray-400 text-[10px]">
            DISPERSE TRIGGER
          </span>
          <p className="silka-semibold text-sm text-gray-800">
            {workflowData.first_description}
          </p>
        </div>
      </div>
      <Accounts
        largeComponent={largeComponent}
        setLargeComponent={setLargeComponent}
        workflowData={workflowData}
        workspaceId={workspaceId}
        facebookConnected={facebookConnected}
        setFacebookConnected={setFacebookConnected}
        instagramConnected={instagramConnected}
        setInstagramConnected={setInstagramConnected}
        twitterConnected={twitterConnected}
        setTwitterConnected={setTwitterConnected}
        youtubeConnected={youtubeConnected}
        setYoutubeConnected={setYoutubeConnected}
        tiktokConnected={tiktokConnected}
        setTiktokConnected={setTiktokConnected}
      />
      <Test
        largeComponent={largeComponent}
        setLargeComponent={setLargeComponent}
        disperseTested={disperseTested}
        setDisperseTested={setDisperseTested}
        workflowData={workflowData}
        workspaceId={workspaceId}
        workflowId={workflowData?.id}
      />
    </div>
  );
}
