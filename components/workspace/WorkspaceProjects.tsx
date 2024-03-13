import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../utils/apiUrl';
import {
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  Fragment,
} from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';
import { Transition } from '@headlessui/react';
import Router from 'next/router';
import { ProjectDropdown } from './dropdown/ProjectDropdown';

interface WorkspaceProjectsProps {
  workspaceData: any;
  deleteProjectDialogOpen: boolean;
  setDeleteProjectDialogOpen: Dispatch<SetStateAction<boolean>>;
  renameProjectDialogOpen: boolean;
  setRenameProjectDialogOpen: Dispatch<SetStateAction<boolean>>;
  projectAccessDialogOpen: boolean;
  setProjectAccessDialogOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedProject: Dispatch<SetStateAction<any>>;
  refetchWorkspaceProjects: any;
  setRefetchWorkspaceProjects: Dispatch<SetStateAction<any>>;
}

interface ProjectProps {
  project: any;
  workspaceId: string;
  deleteProjectDialogOpen: boolean;
  setDeleteProjectDialogOpen: Dispatch<SetStateAction<boolean>>;
  renameProjectDialogOpen: boolean;
  setRenameProjectDialogOpen: Dispatch<SetStateAction<boolean>>;
  projectAccessDialogOpen: boolean;
  setProjectAccessDialogOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedProject: Dispatch<SetStateAction<any>>;
}

interface NoProjectProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  workspaceName: string;
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

function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = [
    'Bytes',
    'KB',
    'MB',
    'GB',
    'TB',
    'PB',
    'EB',
    'ZB',
    'YB',
  ];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${
    sizes[i]
  }`;
}

async function getProjects(workspaceName: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}workspace/read/dashboardprojects`,
      { params: { workspaceName: String(workspaceName) } }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

function NoProjects({
  isOpen,
  setIsOpen,
  workspaceName,
}: NoProjectProps) {
  const [projectName, setProjectName] = useState('');

  async function submitData(
    e: any,
    projectName: string,
    workspaceName: string
  ) {
    e.preventDefault();
    try {
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

  return (
    <div className="flex flex-row justify-between items-between px-7 py-4 rounded bg-[#F7F7F7] mt-4 border border-dashed border-[#E5E5E5]">
      <div className="flex flex-col space-y-1">
        <p className="text-sm silka-medium">No Projects</p>
        <p className="text-xs silka-regular text-gray-500">
          Create a project to create and distribute media.
        </p>
      </div>
      <div className="my-auto">
        <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
          <DialogPrimitive.Trigger asChild>
            <button className="bg-[#FF623D] hover:opacity-90 text-xs text-white silka-medium px-4 py-1.5 rounded">
              Create Project
            </button>
          </DialogPrimitive.Trigger>
          <Transition.Root show={isOpen}>
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
                  Create a new project to organize your content and
                  collaborate with your team.
                </DialogPrimitive.Description>
                <form
                  className="mt-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    submitData(e, projectName, workspaceName).then(
                      (value) => {
                        Router.push(
                          String('/' + workspaceName + '/' + value.id)
                        );
                      }
                    );
                  }}
                >
                  <fieldset>
                    <input
                      id="firstName"
                      type="text"
                      value={projectName}
                      placeholder="Project Name"
                      onChange={(e) => setProjectName(e.target.value)}
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
                        'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
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
                      <button type="submit">Create Project</button>
                    </DialogPrimitive.Close>
                  </div>
                </form>
              </DialogPrimitive.Content>
            </Transition.Child>
          </Transition.Root>
        </DialogPrimitive.Root>
      </div>
    </div>
  );
}

function Project({
  project,
  workspaceId,
  deleteProjectDialogOpen,
  setDeleteProjectDialogOpen,
  renameProjectDialogOpen,
  setRenameProjectDialogOpen,
  projectAccessDialogOpen,
  setProjectAccessDialogOpen,
  setSelectedProject,
}: ProjectProps) {
  const [optionsHovered, setOptionsHovered] = useState(false);

  return (
    <button
      onClick={(e) => {
        if (!optionsHovered) {
          Router.push(String('/' + workspaceId + '/' + project.id));
        }
      }}
      className="flex flex-row w-full rounded hover:bg-gray-50 py-1"
    >
      <div className="px-1 w-[56%] md:w-[46%] my-auto flex flex-row space-x-3 justify-start items-start">
        <svg
          width="12"
          height="12"
          viewBox="0 0 16 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="my-auto"
        >
          <path
            d="M13.2965 2.24982H9.20915L7.93424 0.337432C7.78436 0.112477 7.55914 0 7.29679 0H2.79696C1.55949 0 0.546875 1.01254 0.546875 2.25008V9.74992C0.546875 10.9874 1.55942 12 2.79696 12H13.2967C14.5342 12 15.5468 10.9875 15.5468 9.74992V4.50017C15.5465 3.26243 14.534 2.24988 13.2965 2.24988L13.2965 2.24982ZM14.0464 9.74966C14.0464 10.1622 13.709 10.4996 13.2965 10.4996H2.79673C2.38422 10.4996 2.04681 10.1621 2.04681 9.74966V2.24982C2.04681 1.83732 2.38424 1.49991 2.79673 1.49991H6.88407L8.15897 3.4123C8.30885 3.63725 8.53407 3.74973 8.79642 3.74973H13.2963C13.7088 3.74973 14.0462 4.08716 14.0462 4.49964L14.0464 9.74966Z"
            fill="#374151"
          />
        </svg>
        <p className="text-xs text-start my-auto text-gray-700 silka-regular">
          {project?.name.length > 38
            ? project?.name?.slice(0, 34) + '...'
            : project?.name}
        </p>
      </div>
      <div className="hidden md:w-[24%] md:flex my-auto flex-col justify-start items-start">
        <p className="text-xs my-auto text-gray-700 silka-regular">
          {formatDate(project.createdAt)}
        </p>
      </div>
      <div className="w-[36%] md:w-[24%] flex my-auto flex-row space-x-1 justify-start items-start">
        <p className="text-xs my-auto text-gray-700 silka-regular">
          {project.num_files}
        </p>
        <p className="text-xs my-auto text-gray-700 silka-regular">
          ({formatBytes(project.size)})
        </p>
      </div>
      <div className="w-[6%] flex flex-col justify-center items-center">
        <DropdownMenuPrimitive.Root>
          <DropdownMenuPrimitive.Trigger asChild>
            <button
              onClick={(e) => {
                setSelectedProject(project?.id);
              }}
              className="p-1 rounded hover:bg-gray-200"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.625 2.5C8.625 3.12132 8.12132 3.625 7.5 3.625C6.87868 3.625 6.375 3.12132 6.375 2.5C6.375 1.87868 6.87868 1.375 7.5 1.375C8.12132 1.375 8.625 1.87868 8.625 2.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM7.5 13.625C8.12132 13.625 8.625 13.1213 8.625 12.5C8.625 11.8787 8.12132 11.375 7.5 11.375C6.87868 11.375 6.375 11.8787 6.375 12.5C6.375 13.1213 6.87868 13.625 7.5 13.625Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </DropdownMenuPrimitive.Trigger>
          <ProjectDropdown
            workspaceId={workspaceId}
            mediaId={project.id}
            deleteProjectDialogOpen={deleteProjectDialogOpen}
            setDeleteProjectDialogOpen={setDeleteProjectDialogOpen}
            renameProjectDialogOpen={renameProjectDialogOpen}
            setRenameProjectDialogOpen={setRenameProjectDialogOpen}
            projectAccessDialogOpen={projectAccessDialogOpen}
            setProjectAccessDialogOpen={setProjectAccessDialogOpen}
            optionsHovered={optionsHovered}
            setOptionsHovered={setOptionsHovered}
            project={project}
            setSelectedProject={setSelectedProject}
          />
        </DropdownMenuPrimitive.Root>
      </div>
    </button>
  );
}

export function WorkspaceProjects({
  workspaceData,
  deleteProjectDialogOpen,
  setDeleteProjectDialogOpen,
  renameProjectDialogOpen,
  setRenameProjectDialogOpen,
  projectAccessDialogOpen,
  setProjectAccessDialogOpen,
  setSelectedProject,
  refetchWorkspaceProjects,
  setRefetchWorkspaceProjects,
}: WorkspaceProjectsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [projects, setProjects] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects(workspaceData?.id).then((value) => {
      setProjects(value);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (refetchWorkspaceProjects) {
      getProjects(workspaceData?.id).then((value) => {
        setProjects(value);
        setRefetchWorkspaceProjects(false);
      });
    }
  }, [refetchWorkspaceProjects]);

  if (loading) {
    return (
      <div className="mt-8">
        <h2 className="silka-semibold text-gray-800 text-xs">
          WORKSPACE PROJECTS
        </h2>
        <div className="mt-4 px-1 flex flex-row w-full">
          <div className="w-[56%] md:w-[46%]">
            <p className="text-xs text-gray-500 silka-regular">
              Name
            </p>
          </div>
          <div className="hidden md:flex md:w-[24%]">
            <p className="text-xs text-gray-500 silka-regular">
              Created at
            </p>
          </div>
          <div className="w-[36%] md:w-[24%]">
            <p className="text-xs text-gray-500 silka-regular">
              Files
            </p>
          </div>
          <div className="w-[6%] hidden">p</div>
        </div>
        <div className="flex flex-col space-y-2 mt-3">
          <div className="rounded h-5 w-full bg-gray-200 animate-pulse" />
          <div className="rounded h-5 bg-gray-200 animate-pulse w-[85%]" />
          <div className="rounded h-5 bg-gray-200 animate-pulse w-[70%]" />
        </div>
      </div>
    );
  }
  return (
    <div className="mt-8">
      <h2 className="silka-semibold text-gray-800 text-xs">
        WORKSPACE PROJECTS
      </h2>
      <div className="mt-4 px-1 flex flex-row w-full">
        <div className="w-[56%] md:w-[46%]">
          <p className="text-xs text-gray-500 silka-regular">Name</p>
        </div>
        <div className="hidden md:flex md:w-[24%]">
          <p className="text-xs text-gray-500 silka-regular">
            Created at
          </p>
        </div>
        <div className="w-[36%] md:w-[24%]">
          <p className="text-xs text-gray-500 silka-regular">Files</p>
        </div>
        <div className="w-[6%] hidden">p</div>
      </div>
      {projects.length > 0 ? (
        <div className="mt-2 flex flex-col space-y-1.5">
          {projects
            .sort(function (a: any, b: any) {
              console.log(a);
              return b.size - a.size;
            })
            .map((value: any, index: number) => {
              return (
                <Project
                  key={index}
                  project={value}
                  workspaceId={workspaceData?.id}
                  deleteProjectDialogOpen={deleteProjectDialogOpen}
                  setDeleteProjectDialogOpen={
                    setDeleteProjectDialogOpen
                  }
                  renameProjectDialogOpen={renameProjectDialogOpen}
                  setRenameProjectDialogOpen={
                    setRenameProjectDialogOpen
                  }
                  projectAccessDialogOpen={projectAccessDialogOpen}
                  setProjectAccessDialogOpen={
                    setProjectAccessDialogOpen
                  }
                  setSelectedProject={setSelectedProject}
                />
              );
            })}
        </div>
      ) : (
        <NoProjects
          workspaceName={workspaceData?.id}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
}
