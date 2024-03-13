import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../../../utils/apiUrl';
import toast from 'react-hot-toast';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { AutomationConnectFacebook } from '../../dialog/ConnectFacebook';
import { FacebookSelectAccountAutomation } from '../../dialog/FacebookSelectAccount';

interface Props {
  workflowData: any;
  secondErrors: number;
  setSecondErrors: Dispatch<SetStateAction<number>>;
  leftState: string;
}

interface TestProps {
  largeComponent: string;
  setLargeComponent: Dispatch<SetStateAction<string>>;
  facebookTested: any;
  setFacebookTested: Dispatch<SetStateAction<any>>;
  workspaceId: string;
  workflowData: any;
}

interface AccountProps {
  largeComponent: string;
  setLargeComponent: Dispatch<SetStateAction<string>>;
  workflowData: any;
  facebookId: any;
  setFacebookId: Dispatch<SetStateAction<any>>;
  workspaceId: string;
}

async function updateFacebookTested(
  workspaceId: string,
  workflowId: string,
  automation_id: string
) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.post(
      `${apiUrl()}automation/facebook/update/facebooktested`,
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

async function updateCurrentFacebookProfile(
  workflowId: string,
  automation_id: string,
  facebookId: string,
  workspaceId: string
) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.post(
      `${apiUrl()}automation/facebook/update/currentfacebookprofile`,
      null,
      {
        params: {
          workflowId: workflowId,
          automation_id: automation_id,
          facebookId: facebookId,
          workspaceId: workspaceId,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function getFacebookProfile(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}automation/facebook/read/facebookaccount`,
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
  workspaceId,
  facebookTested,
  setFacebookTested,
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
            {facebookTested ? (
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
              updateFacebookTested(
                workspaceId,
                workflowData.id,
                workflowData.automation_id
              ).then((value) => {
                setIsLoading(false);
                if (value.message == 'tested') {
                  setFacebookTested(true);
                  toast.success('Facebook Successfully Tested!', {
                    className: 'text-sm silka-medium text-gray-900',
                  });
                } else {
                  setFacebookTested(false);
                  toast.error('Failed Testing Facebook Connection', {
                    className: 'text-sm silka-medium text-gray-900',
                  });
                }
              });
            }}
            className={
              'w-full mt-2.5 py-2 flex flex-col jusitfy-center items-center rounded hover:opacity-90 ' +
              (isLoading ? 'bg-[#C6DDF3]' : 'bg-[#0A7BEA]')
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
                  stroke="#0A7BEA"
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
                {facebookTested
                  ? 'Retest Connection'
                  : 'Test Facebook'}
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
            {facebookTested ? (
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
  facebookId,
  setFacebookId,
  workspaceId,
}: AccountProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [facebookData, setFacebookData] = useState<any>(null);
  const [connectFacebookOpen, setConnectFacebookOpen] =
    useState(false);
  const [refetchConnected, setRefetchConnected] = useState(false);
  const [facebookSelectAccountOpen, setFacebookSelectAccountOpen] =
    useState(false);

  useEffect(() => {
    if (workspaceId) {
      getFacebookProfile(workspaceId).then((value) => {
        setFacebookData(value);
        setIsLoading(false);
      });
    }
  }, [workspaceId]);

  useEffect(() => {
    if (refetchConnected) {
      setIsLoading(false);
      getFacebookProfile(workspaceId).then((value) => {
        setFacebookData(value);
        setIsLoading(false);
        setRefetchConnected(false);
      });
    }
  }, [refetchConnected]);

  return (
    <>
      {largeComponent == 'Account' ? (
        <div className="mt-4 flex flex-col">
          <span className="text-[10px] silka-medium text-gray-300">
            STEP 1
          </span>
          <div className="mt-1 flex flex-row space-x-3">
            <p className="silka-semibold text-xl text-gray-900">
              Account
            </p>
            {facebookId ? (
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
              {facebookData?.message == 'found' ? (
                <div className="flex flex-col space-y-3.5">
                  <p className="text-xs silka-medium text-gray-400">
                    Select Facebook
                  </p>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (facebookId) {
                        setFacebookId(null);
                        updateCurrentFacebookProfile(
                          workflowData.id,
                          workflowData.automation_id,
                          'null',
                          workspaceId
                        );
                      } else {
                        setFacebookId(facebookData.id);
                        updateCurrentFacebookProfile(
                          workflowData.id,
                          workflowData.automation_id,
                          facebookData.id,
                          workspaceId
                        );
                      }
                    }}
                    className="flex hover:opacity-90 flex-row space-x-2"
                  >
                    <div
                      className={
                        'h-[14px] w-[14px] my-auto rounded-full ' +
                        (facebookId ? 'bg-[#FF623D]' : 'bg-gray-200')
                      }
                    />
                    <img
                      src={facebookData.picture}
                      className="w-[32px] my-auto h-[32px] rounded-full"
                    />
                    <div className="flex flex-col justify-start items-start">
                      <span className="text-start text-[11px] silka-semibold text-gray-900">
                        {facebookData.name}
                      </span>
                      <p
                        className={
                          'text-xs text-start silka-regular mt-[2px] ' +
                          (facebookData?.description
                            ? 'text-gray-500'
                            : 'text-gray-400 italic')
                        }
                      >
                        {facebookData?.description
                          ? facebookData?.description
                          : 'No description'}
                      </p>
                    </div>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-3">
                  <p className="text-xs silak-medium text-gray-400">
                    No Facebook account found
                  </p>
                  <DialogPrimitive.Root
                    open={connectFacebookOpen}
                    onOpenChange={setConnectFacebookOpen}
                  >
                    <DialogPrimitive.Trigger asChild>
                      <button className="bg-[#0A7BEA] text-sm rounded py-2 silka-medium text-white hover:opacity-90">
                        Connect Facebook
                      </button>
                    </DialogPrimitive.Trigger>
                    <AutomationConnectFacebook
                      isOpen={connectFacebookOpen}
                      setIsOpen={setConnectFacebookOpen}
                      workspaceId={workspaceId}
                      setRefetchConnected={setRefetchConnected}
                      setFacebookSelectAccountOpen={
                        setFacebookSelectAccountOpen
                      }
                    />
                  </DialogPrimitive.Root>
                  <DialogPrimitive.Root
                    open={facebookSelectAccountOpen}
                    onOpenChange={setFacebookSelectAccountOpen}
                  >
                    <FacebookSelectAccountAutomation
                      workspaceId={workspaceId}
                      isOpen={facebookSelectAccountOpen}
                      setIsOpen={setFacebookSelectAccountOpen}
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
            setLargeComponent('Account');
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
            {facebookId ? (
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

export default function FacebookSecondLeftBar({
  workflowData,
  secondErrors,
  setSecondErrors,
  leftState,
}: Props) {
  const [largeComponent, setLargeComponent] = useState('Account');
  const [workspaceId, setWorkspaceId] = useState<any>(null);
  const [facebookId, setFacebookId] = useState<any>(null);
  const [facebookTested, setFacebookTested] = useState<any>(null);

  useEffect(() => {
    let temp = 0;
    if (!facebookId) {
      temp += 1;
    }
    if (!facebookTested) {
      temp += 1;
    }
    setSecondErrors(temp);
  }, [facebookId, facebookTested]);

  useEffect(() => {
    if (workflowData) {
      setFacebookId(workflowData.facebookId);
      setWorkspaceId(workflowData.workspaceId);
      setFacebookTested(workflowData.facebook_tested);
    }
  }, [workflowData]);

  return (
    <div
      className={
        'flex flex-col ' +
        (leftState == 'facebookSecondNode'
          ? ''
          : workflowData?.second_automation == 'Facebook'
          ? 'hidden'
          : '')
      }
    >
      <div className="flex flex-row space-x-3">
        <img
          src="/images/automation/facebook.svg"
          className="h-[52px] w-[52px] my-auto rounded-full border border-gray-300 p-2"
        />
        <div className="flex flex-col space-y-1">
          <span className="silka-medium text-gray-400 text-[10px]">
            FACEBOOK TRIGGER
          </span>
          <p className="silka-semibold text-sm text-gray-800">
            {workflowData.first_description}
          </p>
        </div>
      </div>
      <Account
        largeComponent={largeComponent}
        setLargeComponent={setLargeComponent}
        workflowData={workflowData}
        facebookId={facebookId}
        setFacebookId={setFacebookId}
        workspaceId={workspaceId}
      />
      <Test
        largeComponent={largeComponent}
        setLargeComponent={setLargeComponent}
        facebookTested={facebookTested}
        setFacebookTested={setFacebookTested}
        workflowData={workflowData}
        workspaceId={workspaceId}
      />
    </div>
  );
}
