import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../../utils/apiUrl';
import toast from 'react-hot-toast';

function formatSeconds(seconds: any) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds - hours * 3600) / 60);
  const secondsLeft = Math.floor(
    seconds - hours * 3600 - minutes * 60
  );

  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = secondsLeft.toString().padStart(2, '0');

  // if there isn't hours dont return it
  if (hours === 0) {
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
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

async function getProjects(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}workspace/read/allprojects`,
      {
        params: { workspaceName: workspaceId },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function getProjectContent(folderId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}facebook/read/videomedia`,
      { params: { folderId: folderId } }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function getDrafts(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}facebook/read/reeldrafts`,
      {
        params: { workspaceId: workspaceId },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function duplicateDraft(draftId: string, workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    toast.loading('Duplicating Draft...', {
      className: 'text-sm silka-medium text-gray-900',
      duration: 80000,
    });

    const result = await axios.post(
      `${apiUrl()}facebook/create/duplicatedraftreel`,
      null,
      {
        params: {
          draftId: draftId,
          workspaceId: workspaceId,
        },
      }
    );
    toast.remove();
    toast.success('Successfully Duplicated Draft!', {
      className: 'text-sm silka-medium text-gray-900',
    });
    return result.data;
  } catch (e) {
    toast.remove();
    toast.error('Error duplicating draft, please try again.', {
      className: 'text-sm silka-medium text-gray-900',
    });
    console.log(e);
  }
}

async function deleteDraft(draftId: string, workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    toast.loading('Deleting Draft...', {
      className: 'text-sm silka-medium text-gray-900',
      duration: 80000,
    });

    const result = await axios.post(
      `${apiUrl()}facebook/delete/draftreel`,
      null,
      {
        params: {
          draftId: draftId,
        },
      }
    );
    toast.remove();
    toast.success('Successfully Deleted Draft!', {
      className: 'text-sm silka-medium text-gray-900',
    });
    return result.data;
  } catch (e) {
    toast.remove();
    toast.error('Error deleting draft, please try again.', {
      className: 'text-sm silka-medium text-gray-900',
    });
    console.log(e);
  }
}

interface Props {
  workspaceId: string;
  selectedReel: any;
  setSelectedReel: Dispatch<SetStateAction<any>>;
  reelMedia: any;
  setReelMedia: Dispatch<SetStateAction<any>>;
  rightReelSelected: string;
  setRightReelSelected: Dispatch<SetStateAction<string>>;
  refetchReelDrafts: boolean;
  setRefetchReelDrafts: Dispatch<SetStateAction<boolean>>;
}

interface MediaProps {
  isLoading: boolean;
  mediaData: any;
  reelMedia: any;
  setReelMedia: Dispatch<SetStateAction<any>>;
}

interface ProjectComponentProps {
  value: any;
  selectedProject: any;
  setSelectedProject: Dispatch<SetStateAction<any>>;
}

interface LibraryProps {
  workspaceId: string;
  reelMedia: any;
  setReelMedia: Dispatch<SetStateAction<any>>;
}

interface DraftProps {
  value: any;
  selectedReel: any;
  setSelectedReel: Dispatch<SetStateAction<any>>;
  setRefetchDrafts: Dispatch<SetStateAction<any>>;
  workspaceId: string;
}

interface DraftsProps {
  isLoading: boolean;
  draftsData: any;
  selectedReel: any;
  setSelectedReel: Dispatch<SetStateAction<any>>;
  setRefetchDrafts: Dispatch<SetStateAction<any>>;
  workspaceId: string;
}

function Draft({
  value,
  selectedReel,
  setSelectedReel,
  setRefetchDrafts,
  workspaceId,
}: DraftProps) {
  const [checkDelete, setCheckDelete] = useState(false);

  return (
    <div className="w-full xl:w-1/2 p-2">
      <button
        onClick={() => {
          setSelectedReel(value.id);
        }}
        className={
          'w-full bg-gray-50 h-full p-2.5 rounded flex flex-row ' +
          (selectedReel == value.id ? 'border border-[#0674E8]' : '')
        }
      >
        {value.image == 'yes' ? (
          <div className="flex flex-row space-x-2 w-full">
            <img
              className="h-12 rounded my-auto"
              src={value.google_url}
            />
            <div className="w-[85%] flex flex-col space-y-1 my-auto">
              <p
                className={
                  'break-all my-auto text-xs md:text-sm lg:text-xs xl:text-sm silka-regular text-start ' +
                  (value.text.length == 0
                    ? 'text-gray-400 italic'
                    : '')
                }
              >
                {value.text.length == 0
                  ? 'No text yet...'
                  : value.text.length > 42
                  ? value.text.slice(0, 42) + '...'
                  : value.text}
              </p>
              <span className="text-[9px] text-start silka-medium text-gray-500">
                {formatDate(String(value.created_at))}
              </span>
            </div>
          </div>
        ) : (
          <div className="w-[85%] flex flex-col space-y-1 my-auto">
            <p
              className={
                'break-all my-auto text-xs md:text-sm lg:text-xs xl:text-sm silka-regular text-start ' +
                (value.text.legnth == 0 ? 'italic text-gray-400' : '')
              }
            >
              {value.text.length == 0
                ? 'No text yet...'
                : value.text.length > 72
                ? value.text.slice(0, 72) + '...'
                : value.text}
            </p>
            <span className="text-[9px] text-start silka-medium text-gray-500">
              {formatDate(String(value.created_at))}
            </span>
          </div>
        )}
        <div className="flex z-10 w-[15%] flex-row justify-end items-end my-auto space-x-1">
          <DropdownMenuPrimitive.Root>
            <DropdownMenuPrimitive.Trigger asChild>
              <button className="p-1 rounded hover:bg-gray-200">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 16.4951C13.242 16.4951 14.25 17.5031 14.25 18.7451C14.25 19.9871 13.242 20.9951 12 20.9951C10.758 20.9951 9.75 19.9871 9.75 18.7451C9.75 17.5031 10.758 16.4951 12 16.4951ZM12 9.74512C13.242 9.74512 14.25 10.7531 14.25 11.9951C14.25 13.2371 13.242 14.2451 12 14.2451C10.758 14.2451 9.75 13.2371 9.75 11.9951C9.75 10.7531 10.758 9.74512 12 9.74512ZM12 2.99512C13.242 2.99512 14.25 4.00312 14.25 5.24512C14.25 6.48712 13.242 7.49512 12 7.49512C10.758 7.49512 9.75 6.48712 9.75 5.24512C9.75 4.00312 10.758 2.99512 12 2.99512Z"
                    fill="#363636"
                  />
                </svg>
              </button>
            </DropdownMenuPrimitive.Trigger>
            <DropdownMenuPrimitive.Portal>
              <DropdownMenuPrimitive.Content
                align="end"
                sideOffset={5}
                className={cx(
                  'flex flex-col space-y-1 radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
                  'w-36 rounded-lg z-10 px-1 py-1.5 shadow-md',
                  'bg-white'
                )}
              >
                <button
                  onClick={() => {
                    duplicateDraft(value.id, workspaceId).then(() => {
                      setRefetchDrafts(true);
                    });
                  }}
                  className="flex flex-col rounded hover:bg-gray-50 justify-start items-start"
                >
                  <DropdownMenuPrimitive.Item className="px-2 py-0.5">
                    <span className="text-xs silka-medium">
                      Duplicate
                    </span>
                  </DropdownMenuPrimitive.Item>
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (checkDelete) {
                      deleteDraft(value.id, workspaceId).then(() => {
                        setRefetchDrafts(true);
                        setSelectedReel(null);
                        setCheckDelete(false);
                      });
                    } else {
                      setCheckDelete(true);
                    }
                  }}
                  className="flex flex-col rounded hover:bg-gray-50 justify-start items-start"
                >
                  <div className="px-2 py-0.5">
                    <span className="text-xs silka-medium">
                      {checkDelete ? (
                        <span className="text-[#ef4444]">
                          Are you sure?
                        </span>
                      ) : (
                        <span className="">Delete Draft</span>
                      )}
                    </span>
                  </div>
                </button>
              </DropdownMenuPrimitive.Content>
            </DropdownMenuPrimitive.Portal>
          </DropdownMenuPrimitive.Root>
        </div>
      </button>
    </div>
  );
}

function Drafts({
  isLoading,
  draftsData,
  selectedReel,
  setSelectedReel,
  setRefetchDrafts,
  workspaceId,
}: DraftsProps) {
  if (isLoading) {
    return (
      <div className="h-full flex flex-col mt-4 space-y-1.5">
        <div className="flex flex-row space-x-3">
          <div className="w-1/4 h-3 bg-gray-200 rounded animate-pulse" />
          <div className="w-1/4 h-3 bg-gray-200 rounded animate-pulse" />
          <div className="w-1/4 h-3 bg-gray-200 rounded animate-pulse" />
          <div className="w-1/4 h-3 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="flex flex-row space-x-3">
          <div className="w-1/3 h-3 bg-gray-200 rounded animate-pulse" />
          <div className="w-1/3 h-3 bg-gray-200 rounded animate-pulse" />
          <div className="w-1/3 h-3 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="flex flex-row space-x-3">
          <div className="w-1/2 h-3 bg-gray-200 rounded animate-pulse" />
          <div className="w-1/2 h-3 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-row mt-4 flex-wrap">
      {draftsData?.length > 0 ? (
        draftsData
          .sort(function (a: any, b: any) {
            return (
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            );
          })
          .map((value: any, index: number) => {
            return (
              <Draft
                key={index}
                value={value}
                selectedReel={selectedReel}
                setSelectedReel={setSelectedReel}
                setRefetchDrafts={setRefetchDrafts}
                workspaceId={workspaceId}
              />
            );
          })
      ) : (
        <div className="flex flex-col justify-center mt-4 items-center w-full">
          <div className="p-2.5 rounded-full bg-[#DEE9F4]">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 8H6V12H9V24H14V12H17.642L18 8H14V6.333C14 5.378 14.192 5 15.115 5H18V0H14.192C10.596 0 9 1.583 9 4.615V8Z"
                fill="#0674E8"
              />
            </svg>
          </div>
          <p className="text-sm silka-medium mt-5 text-gray-900">
            No Drafts Posts Found
          </p>
          <span className="text-xs silka-regular mt-1.5 text-gray-500">
            Begin typing to create a draft post
          </span>
        </div>
      )}
    </div>
  );
}

function Media({ isLoading, mediaData, setReelMedia }: MediaProps) {
  if (isLoading) {
    return (
      <>
        <div className="flex flex-row space-x-3">
          <div className="w-1/4 h-3 bg-gray-200 rounded animate-pulse" />
          <div className="w-1/4 h-3 bg-gray-200 rounded animate-pulse" />
          <div className="w-1/4 h-3 bg-gray-200 rounded animate-pulse" />
          <div className="w-1/4 h-3 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="flex flex-row space-x-3">
          <div className="w-1/3 h-3 bg-gray-200 rounded animate-pulse" />
          <div className="w-1/3 h-3 bg-gray-200 rounded animate-pulse" />
          <div className="w-1/3 h-3 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="flex flex-row space-x-3">
          <div className="w-1/2 h-3 bg-gray-200 rounded animate-pulse" />
          <div className="w-1/2 h-3 bg-gray-200 rounded animate-pulse" />
        </div>
      </>
    );
  }

  return (
    <div>
      {mediaData?.length > 0 ? (
        <div className="flex flex-row flex-wrap">
          {mediaData
            .sort((a: any, b: any) => {
              return (
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
              );
            })
            .map((value: any, index: number) => {
              const seconds: any = formatSeconds(value?.duration);
              return (
                <div className="w-1/2 xl:w-1/3 p-2" key={index}>
                  <button
                    onClick={(e) => {
                      setReelMedia(value);
                    }}
                    className="flex hover:opacity-80 flex-col w-full rounded-lg bg-gray-200"
                  >
                    <div className="relative rounded-lg flex flex-col w-full h-full">
                      <img
                        className="w-full rounded-t-lg max-h-20"
                        src={value.thumbnail}
                      />
                      {value?.format.includes('video') && (
                        <div className="absolute flex flex-col justify-end items-end h-full p-1 w-full">
                          <p className="text-white px-2 py-1 text-[9px] silka-medium bg-gray-900 rounded w-fit h-fit">
                            {seconds}
                          </p>
                        </div>
                      )}
                    </div>
                    <p className="text-[10px] 2xl:text-[11px] rounded-b-lg py-2 px-1.5 w-full bg-black text-white silka-medium">
                      {value.name.length > 22
                        ? value.name.slice(0, 20) + '...'
                        : value.name}
                    </p>
                  </button>
                </div>
              );
            })}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center border border-dashed h-36 rounded-lg">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.394 15.759C2.394 15.759 9.948 20.005 11.484 20.868C11.649 20.961 11.817 21 11.976 21C12.154 21 12.32 20.951 12.46 20.873C14.006 20.01 21.615 15.76 21.615 15.76C21.861 15.622 22 15.367 22 15.104C22 14.538 21.386 14.17 20.884 14.45C20.884 14.45 13.832 18.408 12.345 19.22C12.134 19.335 11.901 19.381 11.623 19.226C9.974 18.298 3.129 14.451 3.129 14.451C2.627 14.169 2.012 14.536 2.012 15.104C2.012 15.366 2.149 15.621 2.394 15.759ZM2.394 12.646C2.394 12.646 9.948 16.892 11.484 17.755C11.649 17.848 11.817 17.887 11.976 17.887C12.154 17.887 12.32 17.838 12.46 17.76C14.006 16.897 21.615 12.647 21.615 12.647C21.861 12.509 22 12.254 22 11.991C22 11.425 21.386 11.057 20.884 11.337C20.884 11.337 13.832 15.295 12.345 16.107C12.134 16.222 11.901 16.268 11.623 16.113C9.974 15.185 3.129 11.338 3.129 11.338C2.627 11.056 2.012 11.423 2.012 11.991C2.012 12.253 2.149 12.508 2.394 12.646ZM12.665 3.191C12.419 3.063 12.194 3 11.973 3C11.75 3 11.53 3.065 11.298 3.191L2.414 8.196C2.138 8.379 2 8.64 2 8.894C2 9.15 2.139 9.399 2.414 9.558L11.298 14.564C11.519 14.697 11.745 14.767 11.976 14.767C12.199 14.767 12.428 14.702 12.665 14.564L21.549 9.558C21.844 9.392 22 9.137 22 8.878C22 8.628 21.855 8.375 21.549 8.196L12.665 3.191ZM4.261 8.877L11.982 4.528L19.702 8.877L11.982 13.227L4.261 8.877Z"
              fill="#0674E8"
            />
          </svg>
          <p className="mt-2 silka-semibold text-xs text-[#363636]">
            No Media Found
          </p>
          <span className="mt-1.5 text-center silka-regular text-[11px] text-gray-400">
            Upload media to this project to see it here!
          </span>
        </div>
      )}
    </div>
  );
}

function ProjectComponent({
  value,
  selectedProject,
  setSelectedProject,
}: ProjectComponentProps) {
  return (
    <button
      onClick={() => {
        setSelectedProject(value.id);
      }}
      className={
        'py-1.5 flex flex-col justify-start items-start w-full hover:bg-gray-100 rounded px-2 xl:px-4 ' +
        (selectedProject == value.id ? 'bg-gray-50' : '')
      }
    >
      <p className="text-xs text-gray-900 xl:text-sm text-start silka-medium">
        {value?.name.length > 22
          ? value.name.slice(0, 20) + '...'
          : value?.name}
      </p>
    </button>
  );
}

function Library({
  workspaceId,
  reelMedia,
  setReelMedia,
}: LibraryProps) {
  const [isProjectComponentLoading, setIsProjectComponentLoading] =
    useState(true);
  const [isMediaLoading, setIsMediaLoading] = useState(true);
  const [projectsData, setProjectsData] = useState<any>(null);
  const [mediaData, setMediaData] = useState<any>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  useEffect(() => {
    getProjects(workspaceId).then((value) => {
      setProjectsData(value);
      if (value.length > 0) {
        setSelectedProject(value[0].id);
      }
      setIsProjectComponentLoading(false);
    });
  }, []);

  useEffect(() => {
    if (selectedProject) {
      setIsMediaLoading(true);
      getProjectContent(selectedProject).then((value) => {
        setMediaData(value);
        setIsMediaLoading(false);
      });
    }
  }, [selectedProject]);

  if (isProjectComponentLoading) {
    return (
      <div className="flex flex-row space-x-7 mt-6">
        <div className="w-1/4 flex flex-col space-y-2.5">
          <div className="w-full h-6 bg-gray-200 rounded animate-pulse" />
          <div className="w-full h-6 bg-gray-200 rounded animate-pulse" />
          <div className="w-full h-6 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    );
  }
  return (
    <div className="mt-6 w-full flex flex-row space-x-7 flex-wrap">
      {projectsData.length == 0 ? (
        <div className="flex flex-col justify-center items-center mt-4 w-full">
          <div className="p-2 bg-[#E8EFF5] rounded-full">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9L13 2Z"
                fill="#097EEB"
                fill-opacity="0.5"
                stroke="#097EEB"
              />
              <path
                d="M13 2V9H20"
                fill="#097EEB"
                fill-opacity="0.5"
              />
              <path d="M13 2V9H20" stroke="#097EEB" />
            </svg>
          </div>
          <h3 className="text-sm silka-semibold text-gray-900 mt-3">
            No Media Found
          </h3>
          <p className="text-xs silka-regular mt-1 text-gray-500">
            Create a new project to begin uploading media.
          </p>
        </div>
      ) : (
        <div className="w-full flex flex-row space-x-7">
          <div className="flex flex-col space-y-2 w-1/4">
            {projectsData.map((value: any, index: number) => {
              return (
                <ProjectComponent
                  key={index}
                  value={value}
                  selectedProject={selectedProject}
                  setSelectedProject={setSelectedProject}
                />
              );
            })}
          </div>
          <div className="flex flex-col space-y-1.5 w-3/4">
            <Media
              isLoading={isMediaLoading}
              mediaData={mediaData}
              reelMedia={reelMedia}
              setReelMedia={setReelMedia}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export function FacebookReelRight({
  workspaceId,
  selectedReel,
  setSelectedReel,
  reelMedia,
  setReelMedia,
  rightReelSelected,
  setRightReelSelected,
  refetchReelDrafts,
  setRefetchReelDrafts,
}: Props) {
  const [draftsData, setDraftsData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  axiosRetry(axios, { retries: 3 });

  useEffect(() => {
    getDrafts(workspaceId).then((value) => {
      setDraftsData(value);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (refetchReelDrafts) {
      getDrafts(workspaceId).then((value) => {
        setDraftsData(value);
        setRefetchReelDrafts(false);
      });
    }
  }, [refetchReelDrafts]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-between">
        <div className="flex flex-row space-x-3">
          <button
            onClick={(e) => {
              e.preventDefault();
              setReelMedia(null);
              setSelectedReel(null);
            }}
            className="flex flex-row space-x-1 rounded text-xs silka-regular text-white hover:opacity-80 bg-[#0674E8] px-4 py-1"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="my-auto"
            >
              <path
                d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                fill="white"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
            <p>New Reel</p>
          </button>
          <button
            onClick={() => {
              setRightReelSelected('Drafts');
            }}
            className={
              'text-xs px-4 py-1 silka-regular text-gray-800 rounded hover:bg-gray-100 ' +
              (rightReelSelected == 'Drafts' ? 'bg-gray-100' : '')
            }
          >
            Drafts
          </button>
        </div>
        <button
          onClick={() => {
            setRightReelSelected('Library');
          }}
          className={
            'text-xs px-4 py-1 silka-regular text-gray-800 rounded hover:bg-gray-100 ' +
            (rightReelSelected == 'Library' ? 'bg-gray-100' : '')
          }
        >
          Library
        </button>
      </div>
      {rightReelSelected == 'Drafts' ? (
        <Drafts
          isLoading={isLoading}
          draftsData={draftsData}
          selectedReel={selectedReel}
          setSelectedReel={setSelectedReel}
          setRefetchDrafts={setRefetchReelDrafts}
          workspaceId={workspaceId}
        />
      ) : (
        <Library
          workspaceId={workspaceId}
          reelMedia={reelMedia}
          setReelMedia={setReelMedia}
        />
      )}
    </div>
  );
}
