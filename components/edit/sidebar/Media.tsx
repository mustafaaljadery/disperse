import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import { apiUrl } from '../../../utils/apiUrl';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { clsx } from 'clsx';
import toast from 'react-hot-toast';

interface Props {
  workspaceId: string;
  file: string;
  setFile: Dispatch<SetStateAction<string>>;
  userId: string;
  setRefetch: Dispatch<SetStateAction<boolean>>;
  folder: any;
  setFolder: Dispatch<SetStateAction<any>>;
  folders: any;
  setFolders: Dispatch<SetStateAction<any>>;
}

function formatTime(val: number) {
  // format to minutes:seconds
  let minutes: any = Math.floor(val / 60);
  let seconds: any = Math.floor(val % 60);

  if (minutes < 10) minutes = `0` + String(minutes);

  if (seconds < 10) seconds = `0` + String(seconds);

  return `${minutes}:${seconds}`;
}

async function getFolders(workspaceId: string) {
  try {
    const result = await axios.get(
      `${apiUrl()}workspace/read/allprojects`,
      {
        params: {
          workspaceName: workspaceId,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function getFolderFiles(folderId: string, workspaceId: string) {
  try {
    const result = await axios.get(
      `${apiUrl()}editor/read/foldercontent`,
      {
        params: {
          folderId: folderId,
          workspaceName: workspaceId,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function uploadFile(
  e: any,
  folderId: string,
  workspaceId: string,
  userId: string,
  setRefetchData: Dispatch<SetStateAction<boolean>>
) {
  const file = e.target.files[0];

  try {
    const testForm = new FormData();
    testForm.append('file', file);

    toast.loading('Uploading File...', {
      duration: 80000,
      className: 'text-sm silka-medium text-gray-900',
    });

    const value = await axios.post(
      `${apiUrl()}file/write/uploadfile`,
      testForm,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        params: {
          workspaceId: workspaceId,
          userId: userId,
          folderId: folderId,
          fileName: file.name,
          fileSize: file.size,
          fileFormat: file.type,
        },
      }
    );

    await axios.post(`${apiUrl()}file/create/thumbnail`, null, {
      params: { workspaceId: workspaceId, fileId: value.data.id },
    });

    toast.remove();
    toast.success('Successfully Uploaded File!', {
      className: 'text-sm silka-medium text-gray-900',
    });

    setRefetchData(true);
    return value.data;
  } catch (e) {
    console.log(e);
    toast.remove();
    toast.error('Error uploading file, please try again.', {
      className: 'text-sm silka-medium text-gray-900',
    });
  }
}

export function MediaSidebar({
  workspaceId,
  file,
  setFile,
  userId,
  setRefetch,
  folder,
  setFolder,
  folders,
  setFolders,
}: Props) {
  const [folderContent, setFolderContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refetchData, setRefetchData] = useState(false);

  useEffect(() => {
    if (workspaceId) {
      getFolders(workspaceId).then((value) => {
        setFolder(value[0]);
        setFolders(value);
      });
    }
  }, [workspaceId]);

  useEffect(() => {
    if (folder) {
      setIsLoading(true);
      getFolderFiles(folder?.id, workspaceId).then((value) => {
        setFolderContent(value);
        setIsLoading(false);
      });
    }
  }, [folder]);

  useEffect(() => {
    if (refetchData) {
      getFolderFiles(folder?.id, workspaceId).then((value) => {
        setFolderContent(value);
        setRefetchData(false);
      });
    }
  }, [refetchData]);

  return (
    <div className="mt-2 w-full flex flex-col">
      <div className="w-full flex flex-col space-y-3">
        <label
          //@ts-ignore
          htmlFor="file-upload"
          className="w-full py-2 bg-gray-100 hover:bg-gray-200 rounded flex flex-row space-x-2.5 justify-center items-center"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="my-auto"
          >
            <g clipPath="url(#clip0_1534_2)">
              <path
                d="M10.5535 0.49392C10.4114 0.33852 10.2106 0.25 10 0.25C9.78941 0.25 9.58861 0.33852 9.44651 0.49392L5.44649 4.86892C5.16699 5.17462 5.18823 5.64902 5.49393 5.92852C5.79964 6.20802 6.27403 6.18678 6.55353 5.88108L9.25001 2.9318V14C9.25001 14.4142 9.58581 14.75 10 14.75C10.4142 14.75 10.75 14.4142 10.75 14V2.9318L13.4465 5.88108C13.726 6.18678 14.2004 6.20802 14.5061 5.92852C14.8118 5.64902 14.833 5.17462 14.5535 4.86892L10.5535 0.49392Z"
                fill="black"
              />
              <path
                d="M1.75 13C1.75 12.5858 1.41422 12.25 1 12.25C0.585791 12.25 0.250001 12.5858 0.250001 13V13.0549C0.249981 14.4225 0.24996 15.5248 0.36652 16.3918C0.48754 17.2919 0.746431 18.0497 1.34835 18.6516C1.95027 19.2536 2.70814 19.5125 3.60825 19.6335C4.47522 19.75 5.57754 19.75 6.94513 19.75H13.0549C14.4225 19.75 15.5248 19.75 16.3918 19.6335C17.2919 19.5125 18.0497 19.2536 18.6517 18.6516C19.2536 18.0497 19.5125 17.2919 19.6335 16.3918C19.75 15.5248 19.75 14.4225 19.75 13.0549V13C19.75 12.5858 19.4142 12.25 19 12.25C18.5858 12.25 18.25 12.5858 18.25 13C18.25 14.4354 18.2484 15.4365 18.1469 16.1919C18.0482 16.9257 17.8678 17.3142 17.591 17.591C17.3142 17.8678 16.9257 18.0482 16.1919 18.1469C15.4365 18.2484 14.4354 18.25 13 18.25H7C5.56459 18.25 4.56347 18.2484 3.80812 18.1469C3.07435 18.0482 2.68577 17.8678 2.40901 17.591C2.13225 17.3142 1.9518 16.9257 1.85315 16.1919C1.75159 15.4365 1.75 14.4354 1.75 13Z"
                fill="black"
              />
            </g>
            <defs>
              <clipPath id="clip0_1534_2">
                <rect width="20" height="21" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <p className="my-auto text-sm silka-semibold text-[#363636]">
            Upload Video
          </p>
        </label>
        <input
          id="file-upload"
          className="hidden"
          onChange={(e) => {
            uploadFile(
              e,
              folder?.id,
              workspaceId,
              userId,
              setRefetchData
            );
          }}
          accept="video/*"
          type="file"
        />
        <DropdownMenuPrimitive.Root>
          <DropdownMenuPrimitive.Trigger asChild>
            <button className="w-full rounded border py-2 px-2.5 flex flex-row justify-between items-between space-x-3">
              <p className="text-sm silka-medium my-auto text-[#363636]">
                {folder ? (
                  <>
                    {folder?.name?.length > 20
                      ? folder?.name.slice(0, 20) + '...'
                      : folder?.name}
                  </>
                ) : (
                  <>loading...</>
                )}
              </p>
              <svg
                width="12"
                height="12"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="my-auto"
              >
                <path
                  d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                  fill="#FF623D"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </DropdownMenuPrimitive.Trigger>
          <DropdownMenuPrimitive.Portal>
            <DropdownMenuPrimitive.Content
              align="start"
              sideOffset={5}
              className={clsx(
                'radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
                'rounded-lg px-1.5 py-1 shadow-md w-64',
                'bg-white z-20'
              )}
            >
              <div className="flex flex-col space-y-0.5 w-full">
                {folders.map((value: any, index: number) => {
                  return (
                    <DropdownMenuPrimitive.Item>
                      <button
                        key={index}
                        className="py-1.5 text-sm silka-medium text-[#363636] hover:bg-gray-50 w-full rounded"
                        onClick={() => {
                          setFolder(value);
                        }}
                      >
                        {value?.name}
                      </button>
                    </DropdownMenuPrimitive.Item>
                  );
                })}
              </div>
            </DropdownMenuPrimitive.Content>
          </DropdownMenuPrimitive.Portal>
        </DropdownMenuPrimitive.Root>
      </div>
      {isLoading ? (
        <div className="mt-4 flex flex-col justify-center items-center">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="animate-spin"
          >
            <g clipPath="url(#clip0_1405_2)">
              <path
                d="M4.84457 21.6005C4.13345 21.0227 3.95568 20.0005 4.53345 19.2449C5.11123 18.5338 6.13345 18.3116 6.88901 18.8894C7.24457 19.1116 7.55568 19.3783 7.95568 19.556C11.289 21.3783 15.4223 20.756 18.089 18.0449C18.7557 17.3783 19.7779 17.3783 20.4446 18.0449C21.0668 18.7116 21.0668 19.7783 20.4446 20.4005C16.7112 24.1783 10.9335 25.1116 6.31123 22.5338C5.7779 22.2671 5.28901 21.9116 4.84457 21.6005Z"
                fill="#FF623D"
              />
              <path
                d="M23.8224 13.9555C23.6891 14.8888 22.8002 15.511 21.8669 15.3777C20.9335 15.2444 20.3558 14.3555 20.4891 13.4221C20.578 12.9332 20.578 12.4444 20.578 11.9555C20.578 8.0888 18.0446 4.75547 14.4891 3.73325C13.6002 3.51103 13.0669 2.53325 13.3335 1.64436C13.6002 0.755471 14.4891 0.222137 15.4224 0.488804C20.4446 1.95547 23.9558 6.62214 23.9558 11.9999C23.9558 12.6666 23.9113 13.3332 23.8224 13.9555Z"
                fill="#FF623D"
              />
              <path
                d="M7.42222 0.843445C8.26667 0.487889 9.24445 0.932334 9.55556 1.82122C9.86667 2.71011 9.46667 3.68789 8.62222 4.04344C5.42222 5.33233 3.28889 8.48789 3.28889 12.0879C3.28889 12.799 3.37778 13.5101 3.55556 14.1768C3.77778 15.0657 3.24444 15.999 2.35556 16.2212C1.46667 16.4434 0.577778 15.9101 0.355556 14.9768C0.133333 13.999 0 13.0212 0 12.0434C0 7.02122 2.97778 2.62122 7.42222 0.843445Z"
                fill="#FF623D"
              />
            </g>
            <defs>
              <clipPath id="clip0_1405_2">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      ) : folderContent.length == 0 ? (
        <div className="mt-8 flex flex-col justify-center items-center">
          <div className="p-2.5 rounded-lg bg-[#F6E7E3]">
            <svg
              width="20"
              height="14"
              viewBox="0 0 20 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_1546_2)">
                <path
                  d="M5.75 4C5.75 4.414 5.414 4.75 5 4.75H4C3.586 4.75 3.25 4.414 3.25 4C3.25 3.586 3.586 3.25 4 3.25H5C5.414 3.25 5.75 3.586 5.75 4ZM19.75 3.477V10.523C19.75 11.104 19.463 11.645 18.981 11.971C18.687 12.17 18.345 12.273 18 12.273C17.78 12.273 17.56 12.231 17.35 12.147L14.739 11.103C14.683 12.571 13.481 13.75 11.999 13.75H3C1.483 13.75 0.25 12.517 0.25 11V3C0.25 1.483 1.483 0.25 3 0.25H12C13.481 0.25 14.684 1.429 14.74 2.896L17.35 1.852C17.892 1.636 18.5 1.703 18.982 2.028C19.463 2.354 19.75 2.896 19.75 3.477ZM13.25 3C13.25 2.311 12.689 1.75 12 1.75H3C2.311 1.75 1.75 2.311 1.75 3V11C1.75 11.689 2.311 12.25 3 12.25H12C12.689 12.25 13.25 11.689 13.25 11V3ZM18.25 3.477C18.25 3.361 18.181 3.298 18.14 3.27C18.098 3.242 18.013 3.202 17.907 3.245L14.75 4.508V9.492L17.907 10.755C18.014 10.799 18.099 10.758 18.141 10.73C18.182 10.703 18.25 10.639 18.25 10.524V3.477Z"
                  fill="#FF623D"
                />
              </g>
              <defs>
                <clipPath id="clip0_1546_2">
                  <rect width="20" height="14" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <p className="mt-4 silka-semibold text-gray-900">
            No Videos Found
          </p>
          <span className="mt-1 silka-regular text-xs text-gray-400">
            Upload a video to continue!
          </span>
        </div>
      ) : (
        <div className="mt-4 flex flex-row flex-wrap w-full">
          {folderContent
            ?.sort((a: any, b: any) => {
              // sort by created_at
              return (
                new Date(b?.created_at).getTime() -
                new Date(a?.created_at).getTime()
              );
            })
            .map((value: any, index: number) => {
              return (
                <button
                  onClick={() => {
                    setFile(value?.id);
                    setRefetch(true);
                  }}
                  key={index}
                  className={
                    'w-1/2 relative p-2 hover:opacity-90 ' +
                    (value?.id != file && 'opacity-80')
                  }
                >
                  <img
                    className="w-full h-[84px] rounded"
                    src={value?.google_url}
                    alt={value?.name}
                  />
                  <div className="absolute inset-0 h-[84px] flex flex-row justify-end z-10">
                    <div className="flex flex-col h-full justify-between items-between pt-3 pr-3">
                      <div className="w-full flex flex-row justify-end items-end">
                        <div
                          className={
                            'h-[16px] w-[16px] flex flex-col justify-center items-center border border-white rounded-full ' +
                            (file == value?.id
                              ? 'bg-[#FF623D]'
                              : 'bg-gray-300')
                          }
                        >
                          {file == value?.id && (
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 15 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                                fill="white"
                                fillRule="evenodd"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          )}
                        </div>
                      </div>
                      <p className="bg-gray-900 px-2 py-0.5 text-[10px] silka-medium rounded text-white">
                        {formatTime(Math.floor(value?.duration))}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
        </div>
      )}
    </div>
  );
}
