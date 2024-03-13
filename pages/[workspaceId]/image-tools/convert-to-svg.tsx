import { ToolsLayout } from '../../../components/edittools/ToolsLayout';
import { PageHead } from '../../../layouts/PageHead';
import { useState, useEffect, Fragment } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import fileDownload from 'js-file-download';
import toast from 'react-hot-toast';
import { apiUrl } from '../../../utils/apiUrl';
import { useSession } from 'next-auth/react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Transition } from '@headlessui/react';
import { clsx } from 'clsx';
import { SelectFileDialog } from '../../../components/edittools/SelectFile';
import { getToastPlacement } from '@chakra-ui/react';

async function uploadFile(e: any, setFile: any) {
  const file = e.target.files[0];
  try {
    const testForm = new FormData();
    testForm.append('file', file);
    toast.loading('Uploading File...', {
      duration: 80000,
      className: 'text-sm silka-medium text-gray-900',
    });

    const result = await axios.post(
      `${apiUrl()}editor/create/uploadtemp`,
      testForm,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        params: {
          fileFormat: file?.type,
        },
      }
    );

    toast.remove();
    toast.success('Successfully Uploaded File!', {
      className: 'text-sm silka-medium text-gray-900o',
    });

    setFile(result.data);
    return result.data;
  } catch (e) {
    console.log(e);
    toast.remove();
    toast.error('Error uploading file, please try again.', {
      className: 'text-sm silka-medium text-gray-900',
    });
  }
}

async function saveToProject(
  url: string,
  projectId: string,
  userId: string
) {
  toast.loading('Saving to Project...', {
    className: 'text-sm silka-medium text-gray-900',
    duration: 80000,
  });
  try {
    const result = await axios.post(
      `${apiUrl()}editor/create/savetoproject`,
      null,
      {
        params: {
          url: url,
          folderId: projectId,
          userId: userId,
        },
      }
    );
    toast.remove();
    toast.success('Successfully Saved!', {
      className: 'text-sm silka-medium text-gray-900',
    });
    return result.data;
  } catch (e) {
    console.log(e);
    toast.remove();
    toast.error('Error saving to project, please try again.', {
      className: 'text-sm silka-medium text-gray-900',
    });
  }
}

async function handleDownload(url: string, name: string) {
  try {
    await axios.get(url, { responseType: 'blob' }).then((res) => {
      fileDownload(res.data, name);
    });
  } catch (e) {
    console.log(e);
  }
}

export default function ConvertToSvg() {
  const [workspaceId, setWorkspaceId] = useState('');
  const [selectFileOpen, setSelectFileOpen] = useState(false);
  const [file, setFile] = useState<any>(null);
  const [project, setProject] = useState<any>(null);
  const [projects, setProjects] = useState<any>(null);
  const [renderingStatus, setRenderingStatus] = useState('None');
  const router = useRouter();
  const [exportOpen, setExportOpen] = useState(false);
  const [fileName, setFileName] = useState('');
  const { data: session } = useSession();

  useEffect(() => {
    if (router.isReady) {
      setWorkspaceId(router.query.workspaceId as string);
    }
  }, [router.isReady]);

  useEffect(() => {
    if (file) {
      setFileName(
        file?.name?.split('.')[0] + '.' + file?.format?.split('/')[1]
      );
    }
  }, [file]);

  return (
    <PageHead title="Convert to SVG · Disperse Image Tools">
      <ToolsLayout workspaceId={workspaceId} title="Convert to SVG">
        <div className="flex flex-row h-full w-full divide-x">
          <div className="w-full h-full flex-1 flex-col justify-center items-center p-6">
            {!file ? (
              <div className="flex flex-col justify-center w-full h-full items-center bg-[#F6F4F3] rounded-xl">
                <div className="flex flex-col justify-center items-center space-y-6">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 39 39"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1572_2)">
                      <path
                        d="M12.1333 7.36667C14.7657 7.36667 16.9 9.59795 16.9 12.35C16.9 15.102 14.7657 17.3333 12.1333 17.3333C9.50094 17.3333 7.36667 15.102 7.36667 12.35C7.36667 9.59795 9.50094 7.36667 12.1333 7.36667ZM12.1333 14.8417C13.4495 14.8417 14.5167 13.726 14.5167 12.35C14.5167 10.974 13.4495 9.85833 12.1333 9.85833C10.8171 9.85833 9.75 10.974 9.75 12.35C9.75 13.726 10.8171 14.8417 12.1333 14.8417ZM36.5625 0C37.9098 0 39 1.09017 39 2.4375V36.5625C39 37.9098 37.9098 39 36.5625 39H2.4375C1.09017 39 0 37.9098 0 36.5625V2.4375C0 1.09017 1.09017 0 2.4375 0H36.5625ZM2.4375 35.3438C2.4375 35.682 2.57461 35.9866 2.79703 36.2078C2.57583 35.9866 2.4375 35.682 2.4375 35.3438ZM36.5625 35.3438V31.6851L27.6778 22.8004C27.2019 22.3245 26.4304 22.3245 25.9545 22.8004C25.9545 22.8004 20.0856 28.6693 18.7895 29.9666C17.4933 31.2615 16.6201 31.2427 15.3428 29.9666C14.0656 28.6882 13.0528 27.6754 13.0528 27.6754C12.5769 27.1995 11.8054 27.1995 11.3295 27.6754L2.79703 36.2078C3.01702 36.4266 3.32048 36.5625 3.65625 36.5625H35.3438C36.0171 36.5625 36.5625 36.0171 36.5625 35.3438ZM36.5625 28.2384V3.65625C36.5625 2.98289 36.0171 2.4375 35.3438 2.4375H3.65625C2.98289 2.4375 2.4375 2.98289 2.4375 3.65625V33.1208L10.4678 25.0916C11.4197 24.1373 12.9626 24.1373 13.9145 25.0916L17.0662 28.2421L25.0928 20.2166C26.0447 19.2623 27.5876 19.2623 28.5395 20.2166L36.5625 28.2384Z"
                        fill="#FF623D"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1572_2">
                        <rect width="39" height="39" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <h2 className="silka-bold text-2xl text-[#363636]">
                    Select or Upload a Image
                  </h2>
                </div>
                <label
                  htmlFor="file-upload"
                  className="px-6 hover:bg-gray-200 text-xs mt-8 py-1.5 rounded border hover:opacity-90 border-gray-300 silka-medium text-[#363636]"
                >
                  Upload Image
                </label>
                <input
                  id="file-upload"
                  className="hidden"
                  onChange={(e) => {
                    uploadFile(e, setFile);
                  }}
                  accept="image/*"
                  type="file"
                />
                <DialogPrimitive.Root
                  open={selectFileOpen}
                  onOpenChange={setSelectFileOpen}
                >
                  <DialogPrimitive.Trigger asChild>
                    <button className="mt-4 hover:opacity-90 text-xs px-6 py-1.5 rounded border bg-[#FF623D] border-[#FF623D] silka-medium text-white">
                      Select From Cloud
                    </button>
                  </DialogPrimitive.Trigger>
                  <SelectFileDialog
                    workspaceId={workspaceId}
                    open={selectFileOpen}
                    setIsOpen={setSelectFileOpen}
                    file={file}
                    setFile={setFile}
                    fileType="image"
                    project={project}
                    setProject={setProject}
                    projects={projects}
                    setProjects={setProjects}
                  />
                </DialogPrimitive.Root>
              </div>
            ) : (
              <div className="h-full w-full px-4 flex flex-col justify-center bg-gray-50 rounded-xl items-center">
                <img
                  src={
                    file?.google_url ? file?.google_url : file?.url
                  }
                  className="max-h-full max-w-full"
                />
              </div>
            )}
          </div>
          <div
            className={
              'w-[400px] p-6 h-full flex flex-col justify-between items-between ' +
              (file ? '' : 'opacity-50')
            }
          >
            {renderingStatus == 'None' ? (
              <>
                <div className="flex flex-col">
                  <h2 className="text-base silka-bold text-[#363636]">
                    Convert to SVG
                  </h2>
                  {!file ? (
                    <p className="text-xs silka-regular text-gray-500 mt-4">
                      Ready to convert file!
                    </p>
                  ) : (
                    <p className="text-xs silka-regular text-gray-500 mt-4">
                      Select a file to continue!
                    </p>
                  )}
                </div>
                <DialogPrimitive.Root
                  open={exportOpen}
                  onOpenChange={setExportOpen}
                >
                  <DialogPrimitive.Trigger asChild>
                    <button
                      disabled={!file}
                      className={
                        'py-2 w-full text-sm silka-semibold text-white bg-[#FF623D] rounded ' +
                        (file ? 'hover:opacity-90' : '')
                      }
                    >
                      Convert
                    </button>
                  </DialogPrimitive.Trigger>
                  <DialogPrimitive.Portal forceMount>
                    <Transition.Root show={exportOpen}>
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
                            'w-[95vw] max-w-md rounded-lg p-4 md:w-full',
                            'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
                            'bg-white',
                            'focus:outline-none focus-visible:ring-0'
                          )}
                        >
                          <form className="w-full flex flex-col">
                            <div className="w-full flex flex-row justify-between items-between">
                              <h2 className="text-lg my-auto silka-semibold text-gray-900">
                                Export Options
                              </h2>
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
                                    fill="currentColor"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                  ></path>
                                </svg>
                              </DialogPrimitive.Close>
                            </div>
                            <div className="mt-4 flex flex-col space-y-2">
                              <span className="text-xs silka-regular text-gray-900">
                                Filename
                              </span>
                              <input
                                value={fileName}
                                onChange={(e) => {
                                  setFileName(e.target.value);
                                }}
                                className="w-full text-sm silka-medium text-gray-900 focus:border-[#FF623D] focus:ring-0 focus:outline-none border border-gray-300 rounded py-1.5 px-2"
                                placeholder="name..."
                                required
                                type="text"
                              />
                            </div>
                            <div className="mt-6 flex flex-col w-full">
                              <button
                                type="submit"
                                className="w-full py-1.5 text-sm silka-semibold text-white rounded bg-[#FF623D] hover:opacity-90"
                              >
                                Export
                              </button>
                            </div>
                          </form>
                        </DialogPrimitive.Content>
                      </Transition.Child>
                    </Transition.Root>
                  </DialogPrimitive.Portal>
                </DialogPrimitive.Root>
              </>
            ) : renderingStatus == 'rendering' ? (
              <div className="flex flex-col">
                <h2 className="text-gray-900 text-2xl silka-bold">
                  Rendering Image...
                </h2>
                <div className="mt-6 flex flex-col justify-center items-center">
                  <svg
                    width="16"
                    height="16"
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
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </ToolsLayout>
    </PageHead>
  );
}
