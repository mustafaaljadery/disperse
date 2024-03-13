import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../utils/apiUrl';
import {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  Fragment,
} from 'react';
import Link from 'next/link';
import { styled } from '@stitches/react';
import { blackA } from '@radix-ui/colors';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import Router from 'next/router';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import cx from 'classnames';
import { Transition } from '@headlessui/react';
import toast from 'react-hot-toast';

interface Props {
  workspaceId: string;
  pathname: string;
  mediaHeight: number;
  onClose: any;
  projects: any;
  setProjects: Dispatch<SetStateAction<any>>;
  createProjectOpen: boolean;
  setCreateProjectOpen: Dispatch<SetStateAction<boolean>>;
  fullPathname: string;
}

interface ProjectProps {
  workspaceId: string;
  projectId: string;
  title: string;
  pathname: string;
}

interface CreateProjectProps {
  setCreateProjectOpen: Dispatch<SetStateAction<boolean>>;
  createProjectOpen: boolean;
  workspaceName: string;
  projects: any;
  setProjects: any;
}

interface NoProjectProps {
  createProjectOpen: boolean;
  setCreateProjectOpen: Dispatch<SetStateAction<boolean>>;
  workspaceId: string;
  projects: any;
  setProjects: any;
  onClose: any;
}

const SCROLLBAR_SIZE = 10;

const StyledScrollbar = styled(ScrollAreaPrimitive.Scrollbar, {
  display: 'flex',
  // ensures no selection
  userSelect: 'none',
  // disable browser handling of all panning and zooming gestures on touch devices
  touchAction: 'none',
  padding: 2,
  background: '#EDECE9',
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
  background: '#D4D1CB',
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

async function getSocials(
  workspaceId: string,
  totalSocials: number,
  setTotalSocials: Dispatch<SetStateAction<number>>
) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}workspace/read/connectedsocials`,
      {
        params: {
          workspaceId: workspaceId,
        },
      }
    );
    if (result.data.facebook) {
      setTotalSocials(totalSocials + 1);
    }
    if (result.data.instagram) {
      setTotalSocials(totalSocials + 1);
    }
    if (result.data.twitter) {
      setTotalSocials(totalSocials + 1);
    }
    if (result.data.youtube) {
      setTotalSocials(totalSocials + 1);
    }
    if (result.data.tiktok) {
      setTotalSocials(totalSocials + 1);
    }
    if (result.data.linkedin) {
      setTotalSocials(totalSocials + 1);
    }
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function getProjects(workspaceName: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}workspace/read/allprojects`,
      {
        params: {
          workspaceName: workspaceName,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

function Project({
  title,
  projectId,
  workspaceId,
  pathname,
}: ProjectProps) {
  return (
    <button
      onClick={() => {
        window.location.href = '/' + workspaceId + '/' + projectId;
      }}
      className={
        'flex hover:bg-gray-100 flex-row space-x-2 rounded w-full py-1 px-2 ' +
        (pathname.includes(projectId) ? 'bg-gray-100' : '')
      }
    >
      <a className="silka-medium my-auto mt-0.5 text-sm text-[#474747]">
        {title}
      </a>
    </button>
  );
}

function NoProjects({
  createProjectOpen,
  setCreateProjectOpen,
  workspaceId,
  projects,
  setProjects,
  onClose,
}: NoProjectProps) {
  return (
    <div className="w-full">
      <div className="mt-1 w-full py-2 px-2 bg-[#FBFBFB] rounded-lg shadow">
        <p className="text-xs silka-medium text-[#2D2D2D]">
          No Projects Available
        </p>
        <p className="text-[10px] mt-1 silka-regular text-[#777777]">
          Projects streamline uploads, collaboration, and distribution
          of media.
        </p>
        <DialogPrimitive.Root
          open={createProjectOpen}
          onOpenChange={setCreateProjectOpen}
        >
          <DialogPrimitive.Trigger asChild>
            <button
              onClick={(e) => {
                onClose();
              }}
              className="mt-2 border hover:bg-[#FF4317] border-[#FF4317] text-white text-xs py-1.5 silka-regular w-full rounded-lg bg-[#FF623D] flex flex-col justify-center items-center"
            >
              Create new project
            </button>
          </DialogPrimitive.Trigger>
        </DialogPrimitive.Root>
      </div>
    </div>
  );
}

export function CreateProject({
  createProjectOpen,
  workspaceName,
  projects,
  setProjects,
  setCreateProjectOpen,
}: CreateProjectProps) {
  const [projectName, setProjectName] = useState('');
  return (
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
            Create a new project to organize your content and
            collaborate with your team.
          </DialogPrimitive.Description>
          <form
            className="mt-4"
            onSubmit={(e) => {
              e.preventDefault();
              setCreateProjectOpen(false);
              toast.loading('Creating project...', {
                className: 'text-sm silka-medium text-gray-900',
                duration: 80000,
              });
              submitData(e, projectName, workspaceName).then(
                (value) => {
                  let output: any = [];
                  output.push(value);
                  projects.forEach((element: any) => {
                    output.push(element);
                  });
                  setProjects(output);
                  toast.remove();
                  toast.success('Project created!', {
                    className: 'text-sm silka-medium text-gray-900',
                  });
                  window.location.href =
                    '/' + workspaceName + '/' + value.id;
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

export function SidebarMediaMobile({
  workspaceId,
  pathname,
  mediaHeight,
  projects,
  setProjects,
  createProjectOpen,
  setCreateProjectOpen,
  onClose,
  fullPathname,
}: Props) {
  const [hovered, setHovered] = useState(false);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [socialsLoading, setSocialsLoading] = useState(true);
  const [totalSocials, setTotalSocials] = useState(0);
  const [socials, setSocials] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (workspaceId && workspaceId != 'undefined' && mediaHeight) {
      getProjects(workspaceId).then((result) => {
        setProjects(result);
        setProjectsLoading(false);
      });

      getSocials(workspaceId, totalSocials, setTotalSocials).then(
        (value) => {
          setSocials(value);
          setSocialsLoading(false);
        }
      );
      if (mediaHeight > 0) {
        setIsLoading(false);
      }
    }
  }, [workspaceId, mediaHeight]);

  if (isLoading) {
    return <></>;
  }

  const Div = styled('div', {
    height: mediaHeight - 50 + 'px',
  });

  return (
    <Div>
      <div
        className="flex flex-col w-full h-full"
        onMouseEnter={() => {
          setHovered(true);
        }}
        onMouseLeave={() => {
          setHovered(false);
        }}
      >
        <ScrollAreaPrimitive.Root className="h-full w-full">
          <ScrollAreaPrimitive.Viewport className="max-h-full w-full flex flex-col">
            <>
              <div className="flex flex-row justify-between items-between pl-3 pr-5">
                <p className="text-[11px] py-1 silka-semibold my-auto text-gray-500">
                  MEDIA
                </p>
                {hovered ? (
                  <div className="my-auto">
                    <DialogPrimitive.Root
                      open={createProjectOpen}
                      onOpenChange={setCreateProjectOpen}
                    >
                      <DialogPrimitive.Trigger asChild>
                        <button className="my-auto">
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
                                <rect
                                  width="8"
                                  height="8"
                                  fill="white"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                        </button>
                      </DialogPrimitive.Trigger>
                    </DialogPrimitive.Root>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className="mt-0.5 flex flex-col pl-3 pr-4">
                {projectsLoading ? (
                  <div className="flex flex-col space-y-2">
                    <div className="w-full h-6 bg-gray-200 rounded animate-pulse" />
                    <div className="w-full h-6 bg-gray-200 rounded animate-pulse" />
                    <div className="w-full h-6 bg-gray-200 rounded animate-pulse" />
                  </div>
                ) : (
                  <>
                    {projects?.length > 0 ? (
                      <div className="flex flex-col space-y-1">
                        {projects
                          .sort(
                            (a: any, b: any) =>
                              new Date(b.updatedAt).getTime() -
                              new Date(a.updatedAt).getTime()
                          )
                          .map((value: any) => {
                            return (
                              <div
                                key={String(value).split('/')[0]}
                                className="w-full"
                              >
                                <Project
                                  workspaceId={workspaceId}
                                  projectId={String(value.id)}
                                  title={
                                    String(value.name).split('/')[0]
                                  }
                                  pathname={pathname}
                                />
                              </div>
                            );
                          })}
                      </div>
                    ) : (
                      <NoProjects
                        createProjectOpen={createProjectOpen}
                        setCreateProjectOpen={setCreateProjectOpen}
                        workspaceId={workspaceId}
                        projects={projects}
                        setProjects={setProjects}
                        onClose={onClose}
                      />
                    )}
                  </>
                )}
              </div>
              <div className="mt-5 flex flex-row justify-between items-between px-3">
                <p className="text-[11px] py-1 silka-semibold my-auto text-gray-500">
                  SOCIALS
                </p>
              </div>
              <div className="mt-0.5 flex flex-col px-3 mb-2">
                {socialsLoading ? (
                  <div className="flex flex-col space-y-2">
                    <div className="w-full h-6 bg-gray-200 rounded animate-pulse" />
                    <div className="w-full h-6 bg-gray-200 rounded animate-pulse" />
                    <div className="w-full h-6 bg-gray-200 rounded animate-pulse" />
                  </div>
                ) : (
                  <div className="flex flex-col space-y-1 mt-1">
                    {totalSocials > 0 ? (
                      <div className="flex flex-col space-y-2">
                        {socials.twitter ? (
                          <Link
                            href={'/' + workspaceId + '/twitter'}
                            legacyBehavior
                          >
                            <button
                              className={
                                'flex flex-row space-x-2 rounded w-full py-1 px-2 hover:bg-[#E9F0F5] ' +
                                (fullPathname.includes(
                                  '/[workspaceId]/twitter'
                                )
                                  ? 'bg-[#E9F0F5]'
                                  : '')
                              }
                            >
                              <div className="p-2 rounded my-auto bg-[#1D98F0]"></div>
                              <a className="silka-medium my-auto mt-0.5 text-sm text-[#474747]">
                                Twitter
                              </a>
                            </button>
                          </Link>
                        ) : (
                          <></>
                        )}
                        {socials.youtube ? (
                          <Link
                            href={'/' + workspaceId + '/youtube'}
                            legacyBehavior
                          >
                            <button
                              className={
                                'flex flex-row space-x-2 rounded w-full py-1 px-2 hover:bg-[#F6E7E7] ' +
                                (fullPathname.includes(
                                  '/[workspaceId]/youtube'
                                )
                                  ? 'bg-[#F6E7E7]'
                                  : '')
                              }
                            >
                              <div className="p-2 rounded my-auto bg-[#FF0000]"></div>
                              <a className="silka-medium my-auto mt-0.5 text-sm text-[#474747]">
                                Youtube
                              </a>
                            </button>
                          </Link>
                        ) : (
                          <></>
                        )}
                        {socials.instagram ? (
                          <Link
                            href={'/' + workspaceId + '/instagram'}
                            legacyBehavior
                          >
                            <button
                              className={
                                'flex flex-row space-x-2 rounded w-full py-1 px-2 hover:bg-[#F6E7F3] ' +
                                (fullPathname.includes(
                                  '/[workspaceId]/instagram'
                                )
                                  ? 'bg-[#F6E7F3]'
                                  : '')
                              }
                            >
                              <div className="p-2 rounded my-auto bg-[#F604D0]"></div>
                              <a className="silka-medium my-auto mt-0.5 text-sm text-[#474747]">
                                Instagram
                              </a>
                            </button>
                          </Link>
                        ) : (
                          <></>
                        )}
                        {socials.linkedin ? (
                          <Link
                            href={'/' + workspaceId + '/linkedin'}
                            legacyBehavior
                          >
                            <button
                              className={
                                'flex flex-row space-x-2 rounded w-full py-1 px-2 hover:bg-[#E8EDF3] ' +
                                (fullPathname.includes(
                                  '/[workspaceId]/linkedin'
                                )
                                  ? 'bg-[#E8EDF3]'
                                  : '')
                              }
                            >
                              <div className="p-2 rounded my-auto bg-[#0966C2]"></div>
                              <a className="silka-medium my-auto mt-0.5 text-sm text-[#474747]">
                                Linkedin
                              </a>
                            </button>
                          </Link>
                        ) : (
                          <></>
                        )}
                        {socials.tiktok ? (
                          <Link
                            href={'/' + workspaceId + '/tiktok'}
                            legacyBehavior
                          >
                            <button
                              className={
                                'flex flex-row space-x-2 rounded w-full py-1 px-2 hover:bg-[#EAEAEA] ' +
                                (fullPathname.includes(
                                  '/[workspaceId]/tiktok'
                                )
                                  ? 'bg-[#EAEAEA]'
                                  : '')
                              }
                            >
                              <div className="p-2 rounded my-auto bg-[#363636]" />
                              <a className="silka-medium my-auto mt-0.5 text-sm text-[#474747]">
                                Tiktok
                              </a>
                            </button>
                          </Link>
                        ) : (
                          <></>
                        )}
                        {socials.facebook ? (
                          <Link
                            href={'/' + workspaceId + '/facebook'}
                            legacyBehavior
                          >
                            <button
                              className={
                                'flex flex-row space-x-2 rounded w-full py-1 px-2 hover:bg-[#E7EEF5] ' +
                                (fullPathname.includes(
                                  '/[workspaceId]/facebook'
                                )
                                  ? 'bg-[#E7EEF5]'
                                  : '')
                              }
                            >
                              <div className="p-2 rounded my-auto bg-[#0572E7]"></div>
                              <a className="silka-medium my-auto mt-0.5 text-sm text-[#474747]">
                                Facebook
                              </a>
                            </button>
                          </Link>
                        ) : (
                          <></>
                        )}
                      </div>
                    ) : (
                      <div className="mt-1 w-full py-2 px-2 bg-[#FBFBFB] rounded-lg shadow">
                        <p className="text-xs silka-medium text-[#2D2D2D]">
                          No Socials Added
                        </p>
                        <p className="text-[10px] mt-1 silka-regular text-[#777777]">
                          Add a social to automate your posting on
                          that platform.
                        </p>
                        <Link
                          href={
                            '/' +
                            workspaceId +
                            '/settings/integrations'
                          }
                          legacyBehavior
                        >
                          <button className="mt-2 border hover:bg-[#FF4317] text-white text-xs py-1.5 silka-regular w-full rounded-lg bg-[#FF623D] flex flex-col justify-center items-center">
                            Add new Social
                          </button>
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          </ScrollAreaPrimitive.Viewport>
          <ScrollAreaScrollbar orientation="vertical">
            <ScrollAreaThumb />
          </ScrollAreaScrollbar>
          <ScrollAreaScrollbar orientation="horizontal">
            <ScrollAreaThumb />
          </ScrollAreaScrollbar>
          <ScrollAreaCorner />
        </ScrollAreaPrimitive.Root>
      </div>
    </Div>
  );
}
