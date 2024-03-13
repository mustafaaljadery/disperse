import Link from 'next/link';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { apiUrl } from '../../utils/apiUrl';

interface WorkspaceAutomationsProps {
  workspaceId: string;
  renameAutomationDialogOpen: boolean;
  setRenameAutomationDialogOpen: Dispatch<SetStateAction<boolean>>;
  deleteAutomationDialogOpen: boolean;
  setDeleteAutomationDialogOpen: Dispatch<SetStateAction<boolean>>;
}

interface WorkflowProps {
  value: any;
  workspaceId: string;
}

interface NoAutomationProps {
  workspaceId: string;
}

async function getAutomationStats(
  workspaceId: string,
  workflowId: string,
  automation_id: string
) {
  try {
    const result = await axios.get(
      `${apiUrl()}automation/read/automationstats`,
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

function formatDate(date: any) {
  const newDate = new Date(date);
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const day = newDate.getDate();
  const month = months[newDate.getMonth()];
  const year = newDate.getFullYear();

  return month + ' ' + day + ', ' + year;
}

async function getAutomations(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}automation/read/workflows`,
      {
        params: { workspaceId: workspaceId },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

function NoAutomations({ workspaceId }: NoAutomationProps) {
  return (
    <div className="flex flex-row justify-between items-between px-7 py-4 rounded bg-[#F7F7F7] mt-4 border border-dashed border-[#E5E5E5]">
      <div className="flex flex-col space-y-1">
        <p className="text-sm silka-medium">No Automations</p>
        <p className="text-xs silka-regular text-gray-500">
          Create an an automation to begin automating your posting.
        </p>
      </div>
      <div className="my-auto">
        <Link href={'/' + workspaceId + '/automation'} legacyBehavior>
          <button className="bg-[#FF623D] hover:opacity-90 text-xs text-white silka-medium px-4 py-1.5 rounded">
            Create Automation
          </button>
        </Link>
      </div>
    </div>
  );
}

function Workflow({ value, workspaceId }: WorkflowProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(0);
  const [runs, setRuns] = useState(0);

  useEffect(() => {
    getAutomationStats(
      workspaceId,
      value.id,
      value.automation_id
    ).then((data) => {
      setErrors(data.errors);
      setRuns(data.runs);
      setIsLoading(false);
    });
  }, []);

  return (
    <Link
      href={
        '/workflow/' +
        value.id +
        '?automationId=' +
        value.automation_id
      }
      legacyBehavior
    >
      <button className="flex hover:bg-gray-50 rounded-lg py-1.5 flex-row justify-start items-start w-full px-1">
        <div className="w-[79.5%] md:w-[39.5%] space-x-2 flex flex-row justify-start items-start">
          <div className="flex flex-row space-x-0.5 my-auto">
            <div className="p-1 border-gray-200 rounded-full my-auto">
              <img
                src={value.images[0]}
                className="w-[13px] h-[13px]"
              />
            </div>
            <div className="p-1  border-gray-200 rounded-full my-auto">
              <img
                src={value.images[1]}
                className="w-[13px] h-[13px]"
              />
            </div>
          </div>
          <p className="my-auto text-start silka-regular text-xs text-gray-700">
            {value.name}
          </p>
        </div>
        <div className="hidden w-1/2 md:flex flex-row">
          <div className="w-2/3 flex flex-row">
            <p className="w-1/2 text-xs my-auto text-start text-gray-700 silka-regular">
              {formatDate(value.created_at)}
            </p>
            <div className="w-1/2 flex my-auto flex-row space-x-1.5">
              {isLoading ? (
                <div className="h-[12px] w-[20px] rounded bg-gray-200 animate-pulse" />
              ) : (
                <>
                  {errors > 0 ? (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="my-auto"
                    >
                      <path
                        d="M8.4449 0.608765C8.0183 -0.107015 6.9817 -0.107015 6.55509 0.608766L0.161178 11.3368C-0.275824 12.07 0.252503 13 1.10608 13H13.8939C14.7475 13 15.2758 12.07 14.8388 11.3368L8.4449 0.608765ZM7.4141 1.12073C7.45288 1.05566 7.54712 1.05566 7.5859 1.12073L13.9798 11.8488C14.0196 11.9154 13.9715 12 13.8939 12H1.10608C1.02849 12 0.980454 11.9154 1.02018 11.8488L7.4141 1.12073ZM6.8269 4.48611C6.81221 4.10423 7.11783 3.78663 7.5 3.78663C7.88217 3.78663 8.18778 4.10423 8.1731 4.48612L8.01921 8.48701C8.00848 8.766 7.7792 8.98664 7.5 8.98664C7.2208 8.98664 6.99151 8.766 6.98078 8.48701L6.8269 4.48611ZM8.24989 10.476C8.24989 10.8902 7.9141 11.226 7.49989 11.226C7.08567 11.226 6.74989 10.8902 6.74989 10.476C6.74989 10.0618 7.08567 9.72599 7.49989 9.72599C7.9141 9.72599 8.24989 10.0618 8.24989 10.476Z"
                        fill="#ef4444"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      width="12"
                      height="12"
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
                  )}
                  <p
                    className={
                      'my-auto text-start text-sm silka-regular ' +
                      (errors == 0
                        ? 'text-[#008A00]'
                        : 'text-[#ef4444]')
                    }
                  >
                    {errors}
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="w-1/3 flex flex-row my-auto space-x-1.5">
            {isLoading ? (
              <div className="h-[12px] w-[20px] bg-gray-200 animate-pulse rounded" />
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  className="my-auto"
                >
                  <path
                    fill="#363636"
                    d="M16 0l-3 9h9l-1.866 2h-14.4l10.266-11zm2.267 13h-14.4l-1.867 2h9l-3 9 10.267-11z"
                  />
                </svg>
                <p className="my-auto text-start text-xs text-gray-700 silka-regular">
                  {runs}
                </p>
              </>
            )}
          </div>
        </div>
        <p
          className={
            'w-[20.5%] md:w-[10.5%] text-xs text-start my-auto silka-regular ' +
            (value.active ? 'text-[#008A00]' : 'text-[#ef4444]')
          }
        >
          {value.active ? 'Active' : 'Inactive'}
        </p>
      </button>
    </Link>
  );
}

export function WorkspaceAutomations({
  workspaceId,
  renameAutomationDialogOpen,
  setRenameAutomationDialogOpen,
  deleteAutomationDialogOpen,
  setDeleteAutomationDialogOpen,
}: WorkspaceAutomationsProps) {
  const [automations, setAutomations] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAutomations(workspaceId).then((value) => {
      setAutomations(value);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="mt-10 w-full flex flex-col mb-20">
        <h2 className="silka-semibold text-gray-800 text-xs">
          AUTOMATIONS
        </h2>
        <div className="flex flex-row w-full mt-3 px-1">
          <p className="w-[79.5%] md:w-[39.5%] silka-regular text-xs text-gray-500">
            Name
          </p>
          <div className="hidden w-1/2 md:flex flex-row">
            <div className="w-2/3 flex flex-row">
              <p className="w-1/2 text-xs text-gray-500 silka-regular">
                Created at
              </p>
              <p className="w-1/2 text-xs text-gray-500 silka-regular">
                Errors
              </p>
            </div>
            <p className="w-1/3 text-xs text-gray-500 silka-regular">
              Runs
            </p>
          </div>
          <p className="w-[20.5%] md:w-[10.5%] text-xs text-gray-500 silka-regular">
            Status
          </p>
        </div>
        <div className="flex w-full flex-col space-y-2 mt-4">
          <div className="h-5 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-5 w-[80%] bg-gray-200 rounded animate-pulse" />
          <div className="h-5 w-[60%] bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 flex flex-col mb-20">
      <h2 className="silka-semibold text-gray-800 text-xs">
        AUTOMATIONS
      </h2>
      <div className="flex flex-row w-full mt-3 px-1">
        <p className="w-[79.5%] md:w-[39.5%] silka-regular text-xs text-gray-500">
          Name
        </p>
        <div className="hidden w-1/2 md:flex flex-row">
          <div className="w-2/3 flex flex-row">
            <p className="w-1/2 text-xs text-gray-500 silka-regular">
              Created at
            </p>
            <p className="w-1/2 text-xs text-gray-500 silka-regular">
              Errors
            </p>
          </div>
          <p className="w-1/3 text-xs text-gray-500 silka-regular">
            Runs
          </p>
        </div>
        <p className="w-[20.5%] md:w-[10.5%] text-xs text-gray-500 silka-regular">
          Status
        </p>
      </div>
      <div className="flex w-full flex-col space-y-2 mt-3">
        {automations.length == 0 ? (
          <NoAutomations workspaceId={workspaceId} />
        ) : (
          <>
            {automations
              ?.sort((value: any) => {
                return value.active ? -1 : 1;
              })
              ?.map((value: any, index: number) => {
                return (
                  <Workflow
                    workspaceId={workspaceId}
                    value={value}
                    key={index}
                  />
                );
              })}
          </>
        )}
      </div>
    </div>
  );
}
