import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../utils/apiUrl';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { clsx } from 'clsx';
import toast from 'react-hot-toast';

interface Props {
  workspaceId: string;
  draftId: any;
  setDraftId: Dispatch<SetStateAction<any>>;
  refetchVideoDrafts: boolean;
  setRefetchVideoDrafts: Dispatch<SetStateAction<boolean>>;
}

interface DraftProps {
  value: any;
  setDraftId: Dispatch<SetStateAction<any>>;
  setRefetchVideoDrafts: Dispatch<SetStateAction<boolean>>;
  draftId: any;
  workspaceId: string;
}

async function getDrafts(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}youtube/read/videosdrafts`,
      { params: { workspaceId: workspaceId } }
    );
    return result.data;
  } catch (e) {
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
      `${apiUrl()}youtube/delete/videodraft`,
      null,
      {
        params: { draftId: draftId, workspaceId: workspaceId },
      }
    );
    toast.remove();
    toast.success('Successfully Deleted Draft!', {
      className: 'text-sm silka-medium text-gray-900',
    });
    return result.data;
  } catch (e) {
    toast.remove();
    toast.error('Error delete draft, please try again.', {
      className: 'text-sm silka-medium text-gray-900',
    });
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

function Draft({
  value,
  setDraftId,
  setRefetchVideoDrafts,
  draftId,
  workspaceId,
}: DraftProps) {
  const [checkDelete, setCheckDelete] = useState(false);
  const [thumbnailLoading, setThumbnailLoading] = useState(false);

  return (
    <div className="w-full md:w-1/2 lg:w-full xl:w-1/2 p-2">
      <button
        onClick={(e) => {
          e.preventDefault();
          setDraftId(value.id);
        }}
        className={
          'flex flex-col bg-gray-50 rounded-lg w-full px-3 py-4 hover:opacity-80 ' +
          (value?.id == draftId ? 'border border-[#FF623D]' : '')
        }
      >
        {value.thumbnail != null && value.thumbnail != 'undefined' ? (
          <>
            {thumbnailLoading ? (
              <div className="bg-gray-200 h-32 w-full rounded flex flex-col justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="animate-spin"
                  width="16px"
                  height="16px"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="xMidYMid"
                >
                  <circle
                    cx="50"
                    cy="50"
                    fill="none"
                    stroke="#363636"
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
              </div>
            ) : (
              <img
                className="h-32 w-full rounded"
                src={value.thumbnail}
              ></img>
            )}
          </>
        ) : (
          <div className="bg-gray-200 h-32 w-full rounded flex flex-col justify-center items-center">
            <p className="text-xs silka-regular text-gray-500">
              No Video Selected
            </p>
          </div>
        )}
        <div className="mt-2 flex flex-row w-full justify-between items-between">
          <div className="flex flex-col justify-start items-start">
            <p
              className={
                'silka-medium text-start ' +
                (value.title
                  ? 'text-gray-900'
                  : 'italic text-gray-700')
              }
            >
              {value?.title?.length > 0
                ? value.title.length > 32
                  ? value.title.slice(0, 32) + '...'
                  : value.title
                : 'No set title...'}
            </p>
            <p
              className={
                'silka-regular text-[11px] text-start md:text-xs lg:text-[11px] xl:text-xs mt-1 ' +
                (value.description
                  ? 'text-gray-700'
                  : 'italic text-gray-500')
              }
            >
              {value?.description?.length > 0
                ? value.description.length > 48
                  ? value.description.slice(0, 48) + '...'
                  : value.description
                : 'No set description...'}
            </p>
            <span className="text-[9px] text-start silka-medium mt-2 text-gray-500">
              {formatDate(String(value.created_at))}
            </span>
          </div>
          <div className="my-auto p-1.5 rounded hover:bg-gray-200">
            <DropdownMenuPrimitive.Root>
              <DropdownMenuPrimitive.Trigger asChild>
                <button>
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="my-auto"
                  >
                    <path
                      d="M8.625 2.5C8.625 3.12132 8.12132 3.625 7.5 3.625C6.87868 3.625 6.375 3.12132 6.375 2.5C6.375 1.87868 6.87868 1.375 7.5 1.375C8.12132 1.375 8.625 1.87868 8.625 2.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM7.5 13.625C8.12132 13.625 8.625 13.1213 8.625 12.5C8.625 11.8787 8.12132 11.375 7.5 11.375C6.87868 11.375 6.375 11.8787 6.375 12.5C6.375 13.1213 6.87868 13.625 7.5 13.625Z"
                      fill="#363636"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </DropdownMenuPrimitive.Trigger>
              <DropdownMenuPrimitive.Portal>
                <DropdownMenuPrimitive.Content
                  align="end"
                  sideOffset={5}
                  className={clsx(
                    'radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
                    'w-32 rounded-lg px-1.5 py-1 shadow-md',
                    'bg-white'
                  )}
                >
                  {checkDelete ? (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        deleteDraft(value?.id, workspaceId).then(
                          () => {
                            setDraftId(null);
                            setRefetchVideoDrafts(true);
                          }
                        );
                      }}
                      className="flex flex-col text-xs silka-medium text-red-500 justify-start hover:bg-red-100 py-1.5 px-3 rounded w-full items-start"
                    >
                      <DropdownMenuPrimitive.Item className="">
                        Are You Sure?
                      </DropdownMenuPrimitive.Item>
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setCheckDelete(true);
                      }}
                      className="text-xs hover:bg-gray-100 w-full rounded py-1.5 px-3 silka-medium text-gray-800 flex flex-col justify-start items-start"
                    >
                      Delete Draft
                    </button>
                  )}
                </DropdownMenuPrimitive.Content>
              </DropdownMenuPrimitive.Portal>
            </DropdownMenuPrimitive.Root>
          </div>
        </div>
      </button>
    </div>
  );
}

export function YoutubeVideoDrafts({
  workspaceId,
  setDraftId,
  refetchVideoDrafts,
  setRefetchVideoDrafts,
  draftId,
}: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [draftsData, setDraftsData] = useState<any>(null);
  axiosRetry(axios, { retries: 3 });

  useEffect(() => {
    getDrafts(workspaceId).then((value) => {
      setDraftsData(value);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (refetchVideoDrafts) {
      getDrafts(workspaceId).then((value) => {
        setDraftsData(value);
        setRefetchVideoDrafts(false);
      });
    }
  }, [refetchVideoDrafts]);

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
    <>
      {draftsData?.length > 0 ? (
        <div className="flex flex-row mt-1 flex-wrap">
          {draftsData
            .sort(function (a: any, b: any) {
              return (
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
              );
            })
            .map((value: any, index: number) => {
              return (
                <Draft
                  setDraftId={setDraftId}
                  key={index}
                  value={value}
                  setRefetchVideoDrafts={setRefetchVideoDrafts}
                  draftId={draftId}
                  workspaceId={workspaceId}
                />
              );
            })}
        </div>
      ) : (
        <div className="flex flex-col justify-center mt-4 items-center w-full">
          <div className="p-2.5 rounded-full bg-[#F6E7E7]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="#FF0000"
                d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
              />
            </svg>
          </div>
          <p className="text-sm silka-medium mt-5 text-gray-900">
            No Draft Videos Found
          </p>
          <span className="text-xs silka-regular mt-1.5 text-gray-500">
            Create a new draft to get started
          </span>
        </div>
      )}
    </>
  );
}
