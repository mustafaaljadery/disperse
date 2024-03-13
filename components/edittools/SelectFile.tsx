import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Transition } from '@headlessui/react';
import {
  useState,
  useEffect,
  Fragment,
  Dispatch,
  SetStateAction,
} from 'react';
import { clsx } from 'clsx';
import axios from 'axios';
import { apiUrl } from '../../utils/apiUrl';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';

// format seconds to minuts:seconds
function formatTime(seconds: number) {
  let minutes: any = Math.floor(seconds / 60);
  let secondsLeft: any = Math.floor(seconds % 60);

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (secondsLeft < 10) {
    secondsLeft = `0${secondsLeft}`;
  }

  return `${minutes}:${secondsLeft}`;
}

interface Props {
  workspaceId: string;
  open: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  file: any;
  setFile: Dispatch<SetStateAction<any>>;
  fileType: string;
  project: any;
  setProject: Dispatch<SetStateAction<any>>;
  projects: any;
  setProjects: Dispatch<SetStateAction<any>>;
}

async function getProjects(workspaceId: string) {
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

async function getFiles(workspaceId: string, projectId: string) {
  try {
    console.log('w', workspaceId);
    const result = await axios.get(
      `${apiUrl()}file/read/getfolderfiles`,
      {
        params: {
          workspaceName: workspaceId,
          projectName: projectId,
        },
      }
    );
    console.log('test', result.data);
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

export function SelectFileDialog({
  workspaceId,
  open,
  setIsOpen,
  file,
  setFile,
  fileType,
  project,
  setProject,
  projects,
  setProjects,
}: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [files, setFiles] = useState<any>([]);
  const [filesLoading, setFilesLoading] = useState(true);
  const [tempFile, setTempFile] = useState<any>(null);

  useEffect(() => {
    if (workspaceId) {
      getProjects(workspaceId).then((data) => {
        setProjects(data);
        setProject(data[0]);
        setIsLoading(false);
      });
    }
  }, [workspaceId]);

  useEffect(() => {
    if (project && workspaceId) {
      getFiles(workspaceId, project?.id).then((data) => {
        setFiles(data);
        setFilesLoading(false);
      });
    }
  }, [isLoading, project, workspaceId]);

  return (
    <DialogPrimitive.Portal forceMount>
      <Transition.Root show={open}>
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
            className={clsx(
              'fixed z-50',
              'w-[95vw] max-w-3xl rounded-lg py-4 md:w-full',
              'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
              'bg-white h-[500px]',
              'focus:outline-none focus-visible:ring-0'
            )}
          >
            <form
              onClick={(e) => {
                e.preventDefault();
                setFile(tempFile);
              }}
              className="flex flex-col overflow-hidden h-full w-full"
            >
              <div className="flex px-4 flex-row justify-between items-between">
                <div className="flex flex-row space-x-4">
                  <h2 className="silka-semibold my-auto text-gray-900 text-xl">
                    Select File
                  </h2>
                  <div className="my-auto">
                    <Menu>
                      {/*@ts-ignore*/}
                      <MenuButton
                        transition="all 0.2s"
                        borderRadius="md"
                        borderWidth="1px"
                        width="200px"
                        px={4}
                        py={2}
                      >
                        <div className="flex flex-row w-full justify-between items-between space-x-4">
                          <p className="text-xs text-[#363636] silka-medium my-auto">
                            {project?.name?.length > 24
                              ? project?.name?.substring(0, 22) +
                                '...'
                              : project?.name}
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
                              fill="#363636"
                              fillRule="evenodd"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                      </MenuButton>
                      <MenuList>
                        {projects?.map(
                          (project: any, index: number) => {
                            return (
                              <MenuItem
                                key={index}
                                className="w-full"
                              >
                                <button
                                  onClick={() => {
                                    setProject(project);
                                  }}
                                  className="text-sm silka-medium w-full text-[#363636]"
                                >
                                  {project?.name}
                                </button>
                              </MenuItem>
                            );
                          }
                        )}
                      </MenuList>
                    </Menu>
                  </div>
                </div>
                <DialogPrimitive.Close>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="my-auto"
                  >
                    <path
                      d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                      fill="#363636"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </DialogPrimitive.Close>
              </div>
              <div className="mt-6 flex flex-row flex-wrap h-full px-4 overflow-auto">
                {files.length == 0 ? (
                  <div className="h-full w-full flex flex-col space-y-1.5 justify-center items-center">
                    <p className="text-2xl text-center silka-semibold text-gray-900">
                      No Files Found!
                    </p>
                    <span className="text-xs silka-regular text-gray-500 text-center">
                      Upload files to continue
                    </span>
                  </div>
                ) : (
                  <>
                    {files
                      .filter((value: any) => {
                        return value?.format?.includes(fileType);
                      })
                      .sort((a: any, b: any) => {
                        return (
                          new Date(b.uploadDate).getTime() -
                          new Date(a.uploadDate).getTime()
                        );
                      })
                      .map((value: any, index: number) => {
                        return (
                          <div
                            key={index}
                            className="p-2 w-1/3 lg:w-1/4"
                          >
                            <button
                              type="button"
                              onClick={() => {
                                setTempFile(value);
                                if (tempFile == value) {
                                  setTempFile(null);
                                }
                              }}
                              className="flex relative flex-col justify-center items-center w-full"
                            >
                              {value.format?.includes('video') && (
                                <div className="flex flex-col justify-end h-full rounded pb-10 lg:pb-7 pr-1 lg:pr-2.5 items-end absolute">
                                  <p className="text-[10px] w-fit silka-medium text-white px-2.5 py-1 bg-[#363636] rounded">
                                    {formatTime(
                                      Number(value?.duration)
                                    )}
                                  </p>
                                </div>
                              )}
                              <div className="flex w-full bg-[#F2F3F5] rounded flex-col justify-center items-center">
                                <img
                                  className="h-[100px] rounded"
                                  src={value?.google_url}
                                />
                              </div>
                              <div className="flex flex-row w-full mt-2 justify-between items-between">
                                <p className="text-xs my-auto text-start silka-medium text-[#363636]">
                                  {value?.name?.length > 16
                                    ? value?.name?.substring(0, 16) +
                                      '...'
                                    : value?.name}
                                </p>
                                <div
                                  className={
                                    'h-[16px] rounded border flex flex-col justify-center items-center w-[16px] ' +
                                    (tempFile?.id == value?.id
                                      ? 'bg-[#FF623D] border-[#FF623D]'
                                      : 'border-gray-300')
                                  }
                                >
                                  {tempFile?.id == value?.id && (
                                    <>
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
                                    </>
                                  )}
                                </div>
                              </div>
                            </button>
                          </div>
                        );
                      })}
                  </>
                )}
              </div>
              <hr className="w-full my-4" />
              <div className="px-4 flex flex-row justify-between items-between">
                {tempFile ? (
                  <img
                    className="h-[32px] rounded w-[32px]"
                    src={tempFile?.google_url}
                  />
                ) : (
                  <div />
                )}
                <DialogPrimitive.Close>
                  <button
                    type="submit"
                    disabled={!tempFile}
                    className={
                      'px-4 py-1.5 rounded hover:opacity-90 text-sm silka-medium text-white ' +
                      (tempFile ? 'bg-[#FF623D]' : 'bg-gray-100')
                    }
                  >
                    Continue
                  </button>
                </DialogPrimitive.Close>
              </div>
            </form>
          </DialogPrimitive.Content>
        </Transition.Child>
      </Transition.Root>
    </DialogPrimitive.Portal>
  );
}
