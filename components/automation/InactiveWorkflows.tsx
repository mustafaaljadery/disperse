import axios from 'axios';
import axiosRetry from 'axios-retry';
import { useState, useEffect, SetStateAction, Dispatch } from 'react';
import { apiUrl } from '../../utils/apiUrl';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { clsx } from 'clsx';
import Router from 'next/router';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { DeleteWorkflowDialog } from './dialogs/DeleteWorkflowDialog';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { WorkflowDropdownMenu } from './dropdown/WorkflowDropdownMenu';
import { RenameWorkflowDialog } from './dialogs/RenameWorkflowDialog';
import toast from 'react-hot-toast';

interface InactiveWorkflowsProps {
  workspaceId: string;
  refetchActiveWorkflows: boolean;
  setRefetchActiveWorkflows: Dispatch<SetStateAction<boolean>>;
  refetchInactiveWorkflows: boolean;
  setRefetchInactiveWorkflows: Dispatch<SetStateAction<boolean>>;
}

interface WorkflowProps {
  value: any;
  index: number;
  setWorkflowId: Dispatch<SetStateAction<any>>;
  workspaceId: string;
  renameDialogOpen: boolean;
  setRenameDialogOpen: Dispatch<SetStateAction<boolean>>;
  deleteDialogOpen: boolean;
  setDeleteDialogOpen: Dispatch<SetStateAction<boolean>>;
  setRefetchActiveWorkflows: Dispatch<SetStateAction<boolean>>;
  setRefetchInactiveWorkflows: Dispatch<SetStateAction<boolean>>;
  setAutomationId: Dispatch<SetStateAction<any>>;
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
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

async function getInActiveWorkflows(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}automation/read/inactiveautomations`,
      {
        params: { workspaceId: workspaceId },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function setActive(
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

function formatDate(date: string) {
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
  const newDate = new Date(date);
  let year = newDate.getFullYear();
  let month = months[newDate.getMonth()];
  let day = newDate.getDate();

  return `${day} ${month} ${year}`;
}

function NoWorkflows() {
  return (
    <button className="py-5 border rounded border-dashed border-[#E5E5E5] bg-[#F7F7F7]">
      <div className="flex flex-row w-full">
        <button className="w-[5%] flex flex-col jusitfy-center items-center"></button>
        <div className="w-[95%] flex flex-col space-y-1">
          <p className="text-start silka-semibold text-sm my-auto text-gray-800">
            No Workflows Available
          </p>
          <p className="text-start silka-regular text-xs text-gray-600">
            Create a workflow to begin automating using Disperse.
          </p>
        </div>
        <button className="w-[5%] flex flex-col justify-center items-center"></button>
      </div>
    </button>
  );
}

function Workflow({
  value,
  index,
  setWorkflowId,
  workspaceId,
  deleteDialogOpen,
  setDeleteDialogOpen,
  setRefetchActiveWorkflows,
  setRefetchInactiveWorkflows,
  setAutomationId,
  renameDialogOpen,
  setRenameDialogOpen,
  currentIndex,
  setCurrentIndex,
}: WorkflowProps) {
  const [hovered, setHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuHovered, setMenuHovered] = useState(false);
  const [activeHovered, setActiveHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [runs, setRuns] = useState<any>(null);
  const [errors, setErrors] = useState<any>(null);

  useEffect(() => {
    getAutomationStats(
      workspaceId,
      value.id,
      value.automation_id
    ).then((result) => {
      setRuns(result.runs);
      setErrors(result.errors);
      setIsLoading(false);
    });
  }, []);

  return (
    <button
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      onClick={(e) => {
        e.preventDefault();
        if (activeHovered) {
        } else if (menuHovered) {
        } else {
          setWorkflowId(value.id);
          Router.push(
            `/workflow/${value.id}?automationId=${value.automation_id}`
          );
        }
      }}
      className={
        'flex flex-row justify-start items-start px-0.5 md:px-4 py-4 border rounded-xl ' +
        (hovered ? 'border-[#FF623D]' : 'border-gray-200')
      }
    >
      <div className="w-[2.5%] lg:w-[4.5%]"></div>
      <div className="w-[35%] flex flex-col justify-start items-start space-y-1.5">
        <div className="my-auto flex flex-row space-x-2.5">
          {value.images.map((value: any, index: number) => {
            return (
              <div key={index} className="border rounded-full">
                <img
                  src={value}
                  className="p-1.5 h-[28px] w-[28px] xl:h-[32px] xl:w-[32px]"
                />
              </div>
            );
          })}
        </div>
        <p className="text-sm md:text-base my-auto text-start silka-semibold text-[#363636]">
          {value.name.length > 36
            ? value.name.slice(0, 36) + '...'
            : value.name}
        </p>
      </div>
      <div className="w-1/4 md:w-1/2 px-1 md:px-0 flex flex-row my-auto">
        <div className="w-2/3 flex flex-row my-auto">
          <div className="hidden w-1/2 md:flex flex-col justify-start my-auto items-start">
            <p className="text-gray-500 text-xs silka-medium my-auto">
              {formatDate(value.created_at)}
            </p>
          </div>
          <div className="w-1/2 my-auto flex flex-row space-x-2">
            {isLoading ? (
              <div className="h-5 w-12 rounded bg-gray-200 animate-pulse my-auto" />
            ) : (
              <>
                {errors > 0 ? (
                  <svg
                    width="14"
                    height="14"
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
                    width="14"
                    height="14"
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
                    'my-auto silka-medium ' +
                    (errors > 0 ? 'text-[#ef4444]' : 'text-[#008A00]')
                  }
                >
                  {errors}
                </p>
              </>
            )}
          </div>
        </div>
        <div className="w-1/3 flex flex-row space-x-2 items-start justify-start my-auto">
          {isLoading ? (
            <div className="h-5 w-12 rounded bg-gray-200 animate-pulse my-auto" />
          ) : (
            <>
              <svg
                width="14"
                height="14"
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
              <p className="my-auto silka-medium text-[#70797E]">
                {runs}
              </p>
            </>
          )}
        </div>
      </div>
      <div className="w-[35.5%] md:w-[10.5%] text-xs silka-medium flex flex-row space-x-4 justify-end items-end md:justify-start md:items-start my-auto text-gray-600">
        <SwitchPrimitive.Root
          checked={false}
          onCheckedChange={(e) => {
            if (value.errors == 0) {
              setActive(
                workspaceId,
                value.id,
                value.automation_id,
                true
              ).then(() => {
                setRefetchActiveWorkflows(true);
                setRefetchInactiveWorkflows(true);
              });
            } else {
              toast.error('Fix workflow errors before activating.', {
                className: 'text-sm silka-medium text-gray-900',
              });
            }
          }}
          onMouseEnter={() => {
            setActiveHovered(true);
          }}
          onMouseLeave={() => {
            setActiveHovered(false);
          }}
          className={clsx(
            'group my-auto',
            'radix-state-checked:bg-[#7DD96E]',
            'radix-state-unchecked:bg-[#CACBCC]',
            'relative inline-flex h-[24px] w-[44px] flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out',
            'focus:outline-none focus-visible:ring-0'
          )}
        >
          <SwitchPrimitive.Thumb
            className={clsx(
              'group-radix-state-checked:translate-x-5',
              'group-radix-state-unchecked:translate-x-0',
              'pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out'
            )}
          />
        </SwitchPrimitive.Root>
        <DropdownMenuPrimitive.Root
          open={menuOpen}
          onOpenChange={setMenuOpen}
        >
          <DropdownMenuPrimitive.Trigger asChild>
            <button
              onMouseEnter={() => {
                setMenuHovered(true);
              }}
              onMouseLeave={() => {
                setMenuHovered(false);
              }}
              className="my-auto z-10 border rounded-lg border-gray-300 p-1.5"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.625 2.5C8.625 3.12132 8.12132 3.625 7.5 3.625C6.87868 3.625 6.375 3.12132 6.375 2.5C6.375 1.87868 6.87868 1.375 7.5 1.375C8.12132 1.375 8.625 1.87868 8.625 2.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM7.5 13.625C8.12132 13.625 8.625 13.1213 8.625 12.5C8.625 11.8787 8.12132 11.375 7.5 11.375C6.87868 11.375 6.375 11.8787 6.375 12.5C6.375 13.1213 6.87868 13.625 7.5 13.625Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </DropdownMenuPrimitive.Trigger>
          <WorkflowDropdownMenu
            value={value}
            deleteDialogOpen={deleteDialogOpen}
            setWorkflowId={setWorkflowId}
            setAutomationId={setAutomationId}
            setDeleteDialogOpen={setDeleteDialogOpen}
            workspaceId={workspaceId}
            workflowId={value.id}
            automation_id={value.automation_id}
            setRefetchActiveWorkflows={setRefetchActiveWorkflows}
            setRefetchInactiveWorkflows={setRefetchInactiveWorkflows}
            setMenuHovered={setMenuHovered}
            renameDialogOpen={renameDialogOpen}
            setRenameDialogOpen={setRenameDialogOpen}
            index={index}
            setCurrentIndex={setCurrentIndex}
          />
        </DropdownMenuPrimitive.Root>
      </div>
    </button>
  );
}

export function InactiveWorkflows({
  workspaceId,
  refetchActiveWorkflows,
  refetchInactiveWorkflows,
  setRefetchActiveWorkflows,
  setRefetchInactiveWorkflows,
}: InactiveWorkflowsProps) {
  const [workflowsData, setWorkflowsData] = useState<any>(null);
  const [workflowId, setWorkflowId] = useState<any>(null);
  const [automationId, setAutomationId] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    getInActiveWorkflows(workspaceId).then((value) => {
      setWorkflowsData(value);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (refetchInactiveWorkflows) {
      setIsLoading(true);
      getInActiveWorkflows(workspaceId).then((value) => {
        setWorkflowsData(value);
        setIsLoading(false);
        setRefetchInactiveWorkflows(false);
      });
    }
  }, [refetchInactiveWorkflows]);

  return (
    <div className="mt-10 mb-24">
      <div className="flex flex-row justify-between items-between">
        <h2 className="text-sm silka-regular text-gray-700">
          Inactive Workflows
        </h2>
        <div className="flex flex-col space-x-3"></div>
      </div>
      <div className="flex flex-row mt-3 px-4">
        <div className="w-[2.5%] lg:w-[4.5%]"></div>
        <p className="w-[35%] text-xs silka-medium text-gray-600">
          Name
        </p>
        <div className="w-2/5 md:w-1/2 px-1 md:px-0 flex flex-row">
          <div className="w-2/3 flex flex-row">
            <p className="hidden md:flex w-1/2 text-xs silka-medium text-gray-600">
              Created At
            </p>
            <p className="text-xs silka-medium w-1/2 text-gray-600">
              Errors
            </p>
          </div>
          <p className="text-xs silka-medium w-1/3 text-gray-600">
            Runs
          </p>
        </div>
        <p className="w-[25.5%] md:w-[10.5%] text-end md:text-start text-xs silka-medium text-gray-600">
          Status
        </p>
      </div>
      <div className="mt-4">
        {isLoading ? (
          <div className="flex flex-col space-y-3">
            <div className="h-20 w-full bg-gray-200 rounded-lg animate-pulse" />
            <div className="h-20 w-full bg-gray-200 rounded-lg animate-pulse" />
            <div className="h-20 w-full bg-gray-200 rounded-lg animate-pulse" />
            <div className="h-20 w-full bg-gray-200 rounded-lg animate-pulse" />
          </div>
        ) : (
          <div className="flex flex-col space-y-3">
            {workflowsData.length == 0 ? (
              <NoWorkflows />
            ) : (
              <>
                {workflowsData
                  .sort(function (a: any, b: any) {
                    return (
                      //@ts-ignore
                      new Date(b.created_at) - new Date(a.created_at)
                    );
                  })
                  .map((value: any, index: number) => {
                    return (
                      <Workflow
                        key={index}
                        index={index}
                        setWorkflowId={setWorkflowId}
                        setAutomationId={setAutomationId}
                        value={value}
                        workspaceId={workspaceId}
                        deleteDialogOpen={deleteDialogOpen}
                        setDeleteDialogOpen={setDeleteDialogOpen}
                        setRefetchActiveWorkflows={
                          setRefetchActiveWorkflows
                        }
                        setRefetchInactiveWorkflows={
                          setRefetchInactiveWorkflows
                        }
                        renameDialogOpen={renameDialogOpen}
                        setRenameDialogOpen={setRenameDialogOpen}
                        currentIndex={currentIndex}
                        setCurrentIndex={setCurrentIndex}
                      />
                    );
                  })}
              </>
            )}
          </div>
        )}
      </div>
      <DialogPrimitive.Root
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      >
        <DeleteWorkflowDialog
          isOpen={deleteDialogOpen}
          workspaceId={workspaceId}
          workflowId={workflowId}
          automation_id={automationId}
          setRefetchActiveWorkflows={setRefetchActiveWorkflows}
          setRefetchInactiveWorkflows={setRefetchInactiveWorkflows}
          currentIndex={currentIndex}
          workflowData={workflowsData}
          setWorkflowData={setWorkflowsData}
        />
      </DialogPrimitive.Root>
      <DialogPrimitive.Root
        open={renameDialogOpen}
        onOpenChange={setRenameDialogOpen}
      >
        <RenameWorkflowDialog
          isOpen={renameDialogOpen}
          workflowId={workflowId}
          automation_id={automationId}
          setRefetchActiveWorkflows={setRefetchActiveWorkflows}
          setRefetchInactiveWorkflows={setRefetchInactiveWorkflows}
          currentIndex={currentIndex}
          workflowData={workflowsData}
          setWorkflowData={setWorkflowsData}
        />
      </DialogPrimitive.Root>
    </div>
  );
}
