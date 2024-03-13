import DashboardLayout from '../../layouts/Dashboard';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { SecureWorkspace } from '../../layouts/secure/SecureWorkspace';
import { apiUrl } from '../../utils/apiUrl';
import { DashboardUsageChart } from '../../components/workspace/DashboardUsageChart';
import { DashboardUsageIndicator } from '../../components/workspace/DashboardUsageIndicator';
import { WorkspaceAutomations } from '../../components/workspace/WorkspaceAutomations';
import { WorkspaceProjects } from '../../components/workspace/WorkspaceProjects';
import cx from 'classnames';
import { Transition } from '@headlessui/react';
import Router, { useRouter } from 'next/router';
import { DeleteProjectDialog } from '../../components/workspace/dialog/DeleteProject';
import { ProjectAccessDialog } from '../../components/workspace/dialog/ProjectAccess';
import { RenameProjectDialog } from '../../components/workspace/dialog/RenameProject';
import { DeleteAutomationDialog } from '../../components/workspace/dialog/DeleteAutomation';
import { RenameAutomationDialog } from '../../components/workspace/dialog/RenameAutomation';
import { DashboardChartDropdown } from '../../components/workspace/DashboardChartDropdown';
import { PageHead } from '../../layouts/PageHead';
import Link from 'next/link';
import toast from 'react-hot-toast';

function msToTime(ms: any) {
  let seconds: any = (ms / 1000).toFixed(0);
  let minutes: any = (ms / (1000 * 60)).toFixed(0);
  let hours: any = (ms / (1000 * 60 * 60)).toFixed(0);
  let days = (ms / (1000 * 60 * 60 * 24)).toFixed(0);
  if (seconds < 60) return seconds + ' sec';
  else if (minutes < 60) return minutes + ' min';
  else if (hours < 24) return hours + ' hrs';
  else return days + ' days';
}

async function getLastPosted(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}workspace/read/lastpostedhours`,
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

async function createProject(
  projectName: string,
  workspaceName: string
) {
  try {
    axiosRetry(axios, { retries: 3 });

    toast.loading('Creating Project...', {
      className: 'text-sm silka-medium text-gray-900',
    });
    const result = await axios.post(
      `${apiUrl()}workspace/create/project`,
      null,
      {
        params: {
          projectName: projectName,
          workspaceName: workspaceName,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

export default function Dashboard() {
  const [secureLoading, setSecureLoading] = useState(true);
  const [workspaceData, setWorkspaceData] = useState<any>(null);
  const [projectName, setProjectName] = useState('');
  const [createProjectOpen, setCreateProjectOpen] = useState(false);
  const [chartSelection, setChartSelection] = useState('Views');
  const [timeSelection, setTimeSelection] = useState('Week');
  const [workspaceId, setWorkspaceId] = useState<any>(null);
  const [lastPostedLoading, setLastPostedLoading] = useState(true);
  const [lastPostedValue, setLastPostedValue] = useState<any>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const router = useRouter();

  axiosRetry(axios, { retries: 3 });

  const [refetchWorkspaceProjects, setRefetchWorkspaceProjects] =
    useState(false);

  useEffect(() => {
    if (router.isReady) {
      setWorkspaceId(String(router.query.workspaceId));
      getLastPosted(String(router.query.workspaceId)).then(
        (value) => {
          setLastPostedValue(value);
          setLastPostedLoading(false);
        }
      );
    }
  }, [router.isReady]);

  // Project Dialogs
  const [deleteProjectDialogOpen, setDeleteProjectDialogOpen] =
    useState(false);
  const [renameProjectDialogOpen, setRenameProjectDialogOpen] =
    useState(false);
  const [projectAccessDialogOpen, setProjectAccessDialogOpen] =
    useState(false);

  // Automation Dialogs
  const [renameAutomationDialogOpen, setRenameAutomationDialogOpen] =
    useState(false);
  const [deleteAutomationDialogOpen, setDeleteAutomationDialogOpen] =
    useState(false);

  return (
    <PageHead title="Workspace · Disperse">
      <SecureWorkspace
        loading={secureLoading}
        setLoading={setSecureLoading}
        setWorkspaceData={setWorkspaceData}
      >
        <DashboardLayout>
          <main className="px-2 sm:px-4 md:px-8 lg:px-12 xl:px-28 2xl:px-44 mt-4 md:mt-10 flex flex-col">
            <div className="flex flex-col space-y-2 lg:space-y-0 lg:flex-row justify-between">
              <div className="flex flex-col space-y-1 lg:space-y-1.5">
                <h1 className="text-xl lg:text-2xl silka-semibold my-auto">
                  {workspaceData?.name}
                </h1>
                {lastPostedLoading ? (
                  <div className="flex flex-row space-x-1">
                    <p className="text-[11px] text-xs silka-regular text-gray-500">
                      Last piece of content posted
                    </p>
                    <div className="h-3.5 w-10 my-auto rounded animate-pulse bg-gray-200" />
                    <p className="text-[11px] text-xs silka-regular text-gray-500">
                      ago.
                    </p>
                  </div>
                ) : (
                  <>
                    {lastPostedValue ? (
                      <p className="text-[11px] text-xs silka-regular text-gray-500">
                        Last piece of content posted{' '}
                        {msToTime(lastPostedValue)} ago.
                      </p>
                    ) : (
                      <p className="text-[11px] text-xs silka-regular text-gray-500">
                        Post content using Disperse to see it here!
                      </p>
                    )}
                  </>
                )}
              </div>
              <div className="flex-1" />
              <div className="flex flex-row space-x-5 h-fit my-auto">
                <div>
                  <DialogPrimitive.Root
                    open={createProjectOpen}
                    onOpenChange={setCreateProjectOpen}
                  >
                    <DialogPrimitive.Trigger asChild>
                      <button className="text-[11px] lg:text-xs silka-medium rounded hover:opacity-90 text-[#2B2B2B] border px-4 lg:px-5 py-1 lg:py-1.5">
                        New Project
                      </button>
                    </DialogPrimitive.Trigger>
                    <Transition.Root show={createProjectOpen}>
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <DialogPrimitive.Overlay
                          forceMount
                          className="fixed inset-0 z-20 bg-black/50"
                        />
                      </Transition.Child>
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                      >
                        <DialogPrimitive.Content
                          forceMount
                          className={cx(
                            'fixed z-50',
                            'w-[95vw] max-w-md rounded-lg p-4 md:w-full',
                            'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
                            'bg-white'
                          )}
                        >
                          <DialogPrimitive.Title className="text-sm mt-2 silka-semibold">
                            Create Project
                          </DialogPrimitive.Title>
                          <DialogPrimitive.Description className="mt-2 text-xs silka-regular text-[#777777]">
                            Create a new project to organize your
                            content and collaborate with your team.
                          </DialogPrimitive.Description>
                          <form
                            onSubmit={(e) => {
                              toast.loading('Creating Project...', {
                                className:
                                  'text-sm silka-medium text-gray-900',
                                duration: 80000,
                              });
                              createProject(
                                projectName,
                                workspaceId
                              ).then((value) => {
                                toast.remove();
                                toast.success(
                                  'Successfully Created Project!',
                                  {
                                    className:
                                      'text-sm silka-medium text-gray-900',
                                  }
                                );
                                Router.push(
                                  String(
                                    '/' +
                                      workspaceData.id +
                                      '/' +
                                      value.id
                                  )
                                );
                              });
                            }}
                            className="mt-4"
                          >
                            <fieldset>
                              <input
                                id="firstName"
                                type="text"
                                value={projectName}
                                placeholder="Project Name"
                                onChange={(e) =>
                                  setProjectName(e.target.value)
                                }
                                autoComplete="Project name"
                                className={cx(
                                  'mt-2 block w-full rounded-md',
                                  'text-xs text-gray-800 placeholder:text-[#777777] silka-medium',
                                  'border border-gray-400 focus-visible:border-transparent',
                                  'focus-visible:ring-[#FF623D]'
                                )}
                              />
                            </fieldset>
                            <div className="mt-6 w-full flex flex-row justify-between items-between">
                              <DialogPrimitive.Close
                                className={cx(
                                  'inline-flex justify-center select-none rounded px-3 py-1.5 text-xs silka-medium',
                                  'bg-[#FBFBFB] text-[#474747] hover:bg-[#F1F1F1]',
                                  'border order-[#D6D6D6]',
                                  'focus:outline-none focus-visible:ring-0'
                                )}
                              >
                                Cancel
                              </DialogPrimitive.Close>
                              <DialogPrimitive.Close
                                className={cx(
                                  'inline-flex select-none justify-center rounded px-3 py-1.5 text-xs silka-medium',
                                  'bg-[#FF623D] text-white hover:bg-[#FF4317]',
                                  'border border-[#FF3707]',
                                  'focus:outline-none focus-visible:ring focus-visible:ring-[#FF3707] focus-visible:ring-opacity-75'
                                )}
                              >
                                <button type="submit">
                                  Create Project
                                </button>
                              </DialogPrimitive.Close>
                            </div>
                          </form>
                        </DialogPrimitive.Content>
                      </Transition.Child>
                    </Transition.Root>
                  </DialogPrimitive.Root>
                </div>
                <div>
                  <Link
                    href={'/' + workspaceData?.id + '/automation'}
                    legacyBehavior
                  >
                    <button className="text-[11px] lg:text-xs silka-medium rounded hover:opacity-90 text-white bg-[#2B2B2B] px-4 lg:px-5 py-1 lg:py-1.5">
                      New Automation
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-8 w-full">
              <DashboardChartDropdown
                chartSelection={chartSelection}
                setChartSelection={setChartSelection}
                timeSelection={timeSelection}
                setTimeSelection={setTimeSelection}
              />
            </div>
            <div className="flex flex-col space-y-5 md:space-y-4 md:flex-row md:space-x-5">
              <div className="w-full md:w-2/3">
                <DashboardUsageChart
                  workspaceId={workspaceId}
                  timeSelection={timeSelection}
                  chartSelection={chartSelection}
                />
              </div>
              <div className="w-full md:w-1/3">
                <DashboardUsageIndicator
                  workspaceId={workspaceData?.id}
                />
              </div>
            </div>
            <WorkspaceProjects
              workspaceData={workspaceData}
              deleteProjectDialogOpen={deleteProjectDialogOpen}
              setDeleteProjectDialogOpen={setDeleteProjectDialogOpen}
              renameProjectDialogOpen={renameProjectDialogOpen}
              setRenameProjectDialogOpen={setRenameProjectDialogOpen}
              projectAccessDialogOpen={projectAccessDialogOpen}
              setProjectAccessDialogOpen={setProjectAccessDialogOpen}
              setSelectedProject={setSelectedProject}
              refetchWorkspaceProjects={refetchWorkspaceProjects}
              setRefetchWorkspaceProjects={
                setRefetchWorkspaceProjects
              }
            />
            <WorkspaceAutomations
              workspaceId={workspaceData?.id}
              renameAutomationDialogOpen={renameAutomationDialogOpen}
              setRenameAutomationDialogOpen={
                setRenameAutomationDialogOpen
              }
              deleteAutomationDialogOpen={deleteAutomationDialogOpen}
              setDeleteAutomationDialogOpen={
                setDeleteAutomationDialogOpen
              }
            />
            <DialogPrimitive.Root
              open={deleteProjectDialogOpen}
              onOpenChange={setDeleteProjectDialogOpen}
            >
              <DeleteProjectDialog
                isOpen={deleteProjectDialogOpen}
                setIsOpen={setDeleteProjectDialogOpen}
                selectedProject={selectedProject}
                workspaceId={workspaceId}
                setRefetchWorkspaceProjects={
                  setRefetchWorkspaceProjects
                }
              />
            </DialogPrimitive.Root>
            <DialogPrimitive.Root
              open={renameProjectDialogOpen}
              onOpenChange={setRenameProjectDialogOpen}
            >
              <RenameProjectDialog
                isOpen={renameProjectDialogOpen}
                selectedProject={selectedProject}
                workspaceId={workspaceId}
                setRefetchWorkspaceProjects={
                  setRefetchWorkspaceProjects
                }
              />
            </DialogPrimitive.Root>
            <DialogPrimitive.Root
              open={projectAccessDialogOpen}
              onOpenChange={setProjectAccessDialogOpen}
            >
              <ProjectAccessDialog isOpen={projectAccessDialogOpen} />
            </DialogPrimitive.Root>
            <DialogPrimitive.Root
              open={renameAutomationDialogOpen}
              onOpenChange={setRenameAutomationDialogOpen}
            >
              <RenameAutomationDialog
                isOpen={renameAutomationDialogOpen}
              />
            </DialogPrimitive.Root>
            <DialogPrimitive.Root
              open={deleteAutomationDialogOpen}
              onOpenChange={setDeleteAutomationDialogOpen}
            >
              <DeleteAutomationDialog
                isOpen={deleteAutomationDialogOpen}
              />
            </DialogPrimitive.Root>
          </main>
        </DashboardLayout>
      </SecureWorkspace>
    </PageHead>
  );
}
