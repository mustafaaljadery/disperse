import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../../utils/apiUrl';
import toast from 'react-hot-toast';

interface Props {
  workspaceId: string;
  refetchTextDrafts: boolean;
  setRefetchTextDrafts: Dispatch<SetStateAction<boolean>>;
  selectedText: any;
  setSelectedText: Dispatch<SetStateAction<any>>;
  rightTextSelected: string;
  setRightTextSelected: Dispatch<SetStateAction<string>>;
}

interface DraftProps {
  value: any;
  selectedText: any;
  setSelectedText: Dispatch<SetStateAction<any>>;
  setRefetchDrafts: Dispatch<SetStateAction<boolean>>;
  workspaceId: string;
}

interface DraftsProps {
  isLoading: boolean;
  draftsData: any;
  selectedText: any;
  setSelectedText: Dispatch<SetStateAction<any>>;
  setRefetchDrafts: Dispatch<SetStateAction<boolean>>;
  workspaceId: string;
}

async function deleteDraft(draftId: string, workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });
    toast.loading('Deleting Draft...', {
      className: 'text-sm silka-medium text-gray-900',
      duration: 80000,
    });

    const result = await axios.post(
      `${apiUrl()}facebook/delete/drafttext`,
      null,
      {
        params: {
          draftId: draftId,
          workspaceId: workspaceId,
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

async function duplicateDraft(draftId: string, workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    toast.loading('Duplicating Draft...', {
      className: 'text-sm silka-medium text-gray-900',
      duration: 80000,
    });

    const result = await axios.post(
      `${apiUrl()}facebook/create/duplicatedrafttext`,
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

async function getDrafts(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}facebook/read/textdrafts`,
      {
        params: { workspaceId: workspaceId },
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

function Draft({
  value,
  selectedText,
  setSelectedText,
  setRefetchDrafts,
  workspaceId,
}: DraftProps) {
  const [checkDelete, setCheckDelete] = useState(false);

  return (
    <div className="w-full xl:w-1/2 p-2">
      <button
        onClick={() => {
          setSelectedText(value.id);
        }}
        className={
          'w-full bg-gray-50 h-full p-2.5 rounded flex flex-row ' +
          (selectedText == value.id ? ' border border-[#066CE5]' : '')
        }
      >
        <div className="w-[85%] flex flex-col space-y-1 my-auto">
          <p
            className={
              'break-all my-auto text-xs md:text-sm lg:text-xs xl:text-sm silka-regular text-start ' +
              (value.text.length == 0 ? 'italic text-gray-400' : '')
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
                        setSelectedText(null);
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
  selectedText,
  setSelectedText,
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
                selectedText={selectedText}
                setSelectedText={setSelectedText}
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

export function FacebookTextRight({
  workspaceId,
  refetchTextDrafts,
  setRefetchTextDrafts,
  selectedText,
  setSelectedText,
  rightTextSelected,
  setRightTextSelected,
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
    if (refetchTextDrafts) {
      getDrafts(workspaceId).then((value) => {
        setDraftsData(value);
        setRefetchTextDrafts(false);
      });
    }
  }, [refetchTextDrafts]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-between">
        <div className="flex flex-row space-x-3">
          <button
            onClick={(e) => {
              e.preventDefault();
              setSelectedText(null);
            }}
            className="flex flex-row space-x-1 rounded text-xs silka-regular text-white hover:opacity-80 bg-[#066CE5] px-4 py-1"
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
            <p>New Post</p>
          </button>
          <button
            onClick={() => {
              setRightTextSelected('Drafts');
            }}
            className={
              'text-xs px-4 py-1 silka-regular text-gray-800 rounded hover:bg-gray-100 ' +
              (rightTextSelected == 'Drafts' ? 'bg-gray-100' : '')
            }
          >
            Drafts
          </button>
        </div>
      </div>
      {rightTextSelected == 'Drafts' ? (
        <Drafts
          isLoading={isLoading}
          draftsData={draftsData}
          selectedText={selectedText}
          setSelectedText={setSelectedText}
          setRefetchDrafts={setRefetchTextDrafts}
          workspaceId={workspaceId}
        />
      ) : (
        <></>
      )}
    </div>
  );
}