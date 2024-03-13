import { Transition } from '@headlessui/react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import cx from 'classnames';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import React, {
  Fragment,
  SetStateAction,
  useEffect,
  useState,
  Dispatch,
} from 'react';
import Router, { useRouter } from 'next/router';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { styled } from '@stitches/react';
import { mauve, blackA } from '@radix-ui/colors';
import { apiUrl } from '../../utils/apiUrl';

const SCROLLBAR_SIZE = 9;

const StyledScrollbar = styled(ScrollAreaPrimitive.Scrollbar, {
  display: 'flex',
  // ensures no selection
  userSelect: 'none',
  // disable browser handling of all panning and zooming gestures on touch devices
  touchAction: 'none',
  padding: 2,
  background: blackA.blackA6,
  transition: 'background 160ms ease-out',
  '&:hover': { background: blackA.blackA8 },
  '&[data-orientation="vertical"]': { width: SCROLLBAR_SIZE },
  '&[data-orientation="horizontal"]': {
    flexDirection: 'column',
    height: SCROLLBAR_SIZE,
  },
});

const StyledThumb = styled(ScrollAreaPrimitive.Thumb, {
  flex: 1,
  background: mauve.mauve10,
  borderRadius: SCROLLBAR_SIZE,
  // increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    minWidth: 24,
    minHeight: 24,
  },
});

const StyledCorner = styled(ScrollAreaPrimitive.Corner, {
  background: blackA.blackA8,
});

// Exports
export const ScrollAreaScrollbar = StyledScrollbar;
export const ScrollAreaThumb = StyledThumb;
export const ScrollAreaCorner = StyledCorner;

interface Props {
  hovered: boolean;
  workspaceId: string;
}

interface CreateProjectProps {
  isOpen: boolean;
  workspaceName: string;
  projects: any;
  setProjects: any;
}

interface ProjectProps {
  workspaceId: string;
  projectId: string;
  title: string;
}

interface NoProjectsProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  workspaceId: string;
  projects: any;
  setProjects: any;
}

async function getProjects(workspaceName: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}workspace/read/allprojects`,
      {
        params: {
          workspaceName: String(workspaceName),
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function submitData(
  e: any,
  projectName: string,
  workspaceName: string
) {
  e.preventDefault();
  axiosRetry(axios, { retries: 3 });

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

function Project({ title, projectId, workspaceId }: ProjectProps) {
  return (
    <div className="px-4">
      <button
        onClick={() => {
          window.location.href = '/' + workspaceId + '/' + projectId;
        }}
        className={
          'flex hover:bg-gray-100 flex-row space-x-2 rounded w-full py-1 px-2 '
        }
      >
        <a className="silka-medium my-auto mt-0.5 text-sm text-[#474747]">
          {title}
        </a>
      </button>
    </div>
  );
}

function NoProjects({
  isOpen,
  setIsOpen,
  workspaceId,
  projects,
  setProjects,
}: NoProjectsProps) {
  return (
    <div className="w-full px-4">
      <div className="mt-3 w-full py-3 px-2 bg-[#FBFBFB] rounded-lg shadow">
        <p className="text-xs silka-medium text-[#2D2D2D]">
          No Projects Available
        </p>
        <p className="text-[10px] mt-1 silka-regular text-[#777777]">
          Projects streamline uploads, collaboration, and distribution
          of media.
        </p>
        <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
          <DialogPrimitive.Trigger asChild>
            <button className="mt-2 border hover:bg-[#FF4317] border-[#FF4317] text-white text-xs py-1.5 silka-regular w-full rounded-lg bg-[#FF623D] flex flex-col justify-center items-center">
              Create new project
            </button>
          </DialogPrimitive.Trigger>
          <CreateProject
            projects={projects}
            setProjects={setProjects}
            workspaceName={workspaceId}
            isOpen={isOpen}
          />
        </DialogPrimitive.Root>
      </div>
    </div>
  );
}

function CreateProject({
  isOpen,
  workspaceName,
  projects,
  setProjects,
}: CreateProjectProps) {
  const [projectName, setProjectName] = useState('');
  return (
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
              submitData(e, projectName, workspaceName).then(
                (value) => {
                  let output: any = [];
                  output.push(value);
                  projects.forEach((element: any) => {
                    output.push(element);
                  });
                  setProjects(output);
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
  );
}

export function SidebarMedia({ hovered, workspaceId }: Props) {
  let [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (workspaceId != 'undefined') {
      getProjects(workspaceId).then((result) => {
        setProjects(result);
        setIsLoading(false);
      });
    }
  }, [workspaceId]);

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col px-4">
        <a className="text-[11px] py-1 silka-semibold my-auto text-gray-500">
          MEDIA
        </a>
        <div className="mt-2 flex flex-col space-y-2">
          <div className="w-full h-6 bg-gray-200 rounded animate-pulse" />
          <div className="w-full h-6 bg-gray-200 rounded animate-pulse" />
          <div className="w-full h-6 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex flex-row transition-all justify-between items-between px-4">
        <a className="text-[11px] py-1 silka-semibold my-auto text-gray-500">
          MEDIA
        </a>
        {hovered ? (
          <div className="my-auto">
            <DialogPrimitive.Root
              open={isOpen}
              onOpenChange={setIsOpen}
            >
              <DialogPrimitive.Trigger asChild>
                <button>
                  <svg
                    width="8"
                    height="8"
                    viewBox="0 0 8 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="my-auto h-fit"
                  >
                    <g clipPath="url(#clip0_169_2)">
                      <path
                        d="M8 3.33333H4.66667V0H3.33333V3.33333H0V4.66667H3.33333V8H4.66667V4.66667H8V3.33333Z"
                        fill="#6B6F76"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_169_2">
                        <rect width="8" height="8" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </button>
              </DialogPrimitive.Trigger>
              <CreateProject
                projects={projects}
                setProjects={setProjects}
                isOpen={isOpen}
                workspaceName={workspaceId}
              />
            </DialogPrimitive.Root>
          </div>
        ) : (
          <></>
        )}
      </div>
      {projects.length > 0 ? (
        <ScrollAreaPrimitive.Root className="h-[22vh] overflow-hidden">
          <ScrollAreaPrimitive.Viewport className="h-full w-full">
            <div className="flex flex-col space-y-1">
              {projects.map((value) => {
                return (
                  <div
                    key={String(value).split('/')[0]}
                    className="w-full"
                  >
                    <Project
                      workspaceId={workspaceId}
                      //@ts-ignore
                      projectId={String(value.id)}
                      //@ts-ignore
                      title={String(value.name).split('/')[0]}
                    />
                  </div>
                );
              })}
            </div>
          </ScrollAreaPrimitive.Viewport>
          <ScrollAreaScrollbar orientation="vertical">
            <ScrollAreaThumb />
          </ScrollAreaScrollbar>
          <ScrollAreaScrollbar orientation="horizontal">
            <ScrollAreaThumb />
          </ScrollAreaScrollbar>
          <ScrollAreaCorner />
        </ScrollAreaPrimitive.Root>
      ) : (
        <NoProjects
          projects={projects}
          setProjects={setProjects}
          workspaceId={workspaceId}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
}
