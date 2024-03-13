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
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

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
      className: 'text-sm silka-medium text-gray-900',
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
  userId: string,
  format: string
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
          format: format,
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

async function convertFile(
  workspaceId: string,
  projectId: string,
  fileId: string,
  url: any
) {
  try {
    const result = await axios.post(
      `${apiUrl()}editor/create/converttopng`,
      null,
      {
        params: {
          workspaceId: workspaceId,
          projectId: projectId,
          fileId: fileId,
          url: url,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
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

export default function ConvertToPng() {
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
  const [renderUrl, setRenderUrl] = useState('');

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
    <PageHead title="Convert to PNG · Disperse Video Tools">
      <ToolsLayout workspaceId={workspaceId} title="Convert to PNG">
        <div className="flex flex-row h-full w-full divide-x">
          <div className="w-full h-full flex-1 flex flex-col justify-center items-center p-6">
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
              <div className="h-full w-full px-4 flex flex-col justify-center bg-gray-50 roudned-xl items-center">
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
                    Convert to PNG
                  </h2>
                  {file ? (
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
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              setExportOpen(false);
                              setRenderingStatus('rendering');
                              toast.loading('Rendering Image...', {
                                className:
                                  'text-sm silka-medium text-gray-900',
                              });
                              convertFile(
                                workspaceId,
                                project?.id,
                                file?.id,
                                file?.url
                              ).then((value) => {
                                setRenderUrl(value?.url);
                                setRenderingStatus('rendered');
                                toast.remove();
                                toast.success('Render Successful', {
                                  className:
                                    'text-sm silka-medium text-gray-900',
                                });
                              });
                            }}
                            className="w-full flex flex-col"
                          >
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
              <div className="flex flex-col">
                <div className="flex flex-col">
                  <h2 className="text-2xl silka-bold text-gray-900">
                    Render Successful!
                  </h2>
                  <div className="max-h-[200px] flex flex-col mt-4 justify-center items-center">
                    <img
                      src={renderUrl}
                      className="max-h-full max-w-full rounded-lg"
                    />
                  </div>
                  <div className="mt-5 flex flex-col">
                    <DropdownMenuPrimitive.Root>
                      <DropdownMenuPrimitive.Trigger asChild>
                        <button className="px-3 py-2 border border-gray-200 rounded w-full flex flex-row justify-between items-between">
                          <p className="text-sm silka-medium text-[#363636]">
                            {project?.name?.length > 32
                              ? project?.name?.slice(0, 32) + '...'
                              : project?.name}
                          </p>
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="my-auto"
                          >
                            <path
                              d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                              fill="currentColor"
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
                            'w-72 rounded-lg px-1.5 py-1 shadow-md',
                            'bg-white'
                          )}
                        >
                          <div className="flex flex-col space-y-0.5">
                            {projects.map(
                              (value: any, index: number) => {
                                return (
                                  <DropdownMenuPrimitive.Item
                                    key={index}
                                    className="w-full"
                                  >
                                    <button
                                      onClick={() => {
                                        setProject(value);
                                      }}
                                      key={index}
                                      className="py-1.5 flex flex-col justify-start w-full text-sm silka-medium text-[#363636] rounded items-start px-2.5 hover:bg-gray-100"
                                    >
                                      {value?.name}
                                    </button>
                                  </DropdownMenuPrimitive.Item>
                                );
                              }
                            )}
                          </div>
                        </DropdownMenuPrimitive.Content>
                      </DropdownMenuPrimitive.Portal>
                    </DropdownMenuPrimitive.Root>
                    <button
                      onClick={() => {
                        saveToProject(
                          renderUrl,
                          project?.id,
                          String(session?.user?.id),
                          'image/png'
                        );
                      }}
                      className="mt-5 rounded-lg hover:opacity-90 p-3 bg-[#FF623D] flex flex-row space-x-3"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 19 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_1571_2)">
                          <path
                            d="M1.67767 22H3.82914H15.1453H17.3247C18.2747 22 19.0571 21.23 19.0571 20.295V5.9675C19.0571 5.555 18.8894 5.1425 18.61 4.84L14.7541 0.5775C14.4188 0.22 13.9438 0 13.4688 0H9.75267H3.82914H1.67767C0.727665 0 -0.0546875 0.77 -0.0546875 1.705V20.295C-0.0546875 21.23 0.727665 22 1.67767 22ZM14.5865 20.8725H4.4159V13.2825C4.4159 12.98 4.66737 12.705 5.00267 12.705H14.0277C14.335 12.705 14.6144 12.9525 14.6144 13.2825V20.8725H14.5865ZM4.4159 1.1275H9.19384V5.9675C9.19384 6.27 8.94237 6.545 8.60708 6.545H4.97472C4.66737 6.545 4.38796 6.2975 4.38796 5.9675V1.1275H4.4159ZM1.11884 1.705C1.11884 1.4025 1.37031 1.1275 1.70561 1.1275H3.29825V5.9675C3.29825 6.9025 4.08061 7.6725 5.03061 7.6725H8.66296C9.61296 7.6725 10.3953 6.9025 10.3953 5.9675V1.1275H13.5247C13.6924 1.1275 13.8321 1.21 13.9438 1.32L17.7997 5.5825C17.8835 5.6925 17.9394 5.83 17.9394 5.9675V20.3225C17.9394 20.625 17.688 20.9 17.3527 20.9H15.76V13.2825C15.76 12.3475 14.9777 11.5775 14.0277 11.5775H4.97472C4.02472 11.5775 3.24237 12.3475 3.24237 13.2825V20.8725H1.67767C1.37031 20.8725 1.0909 20.625 1.0909 20.295V1.705H1.11884Z"
                            fill="white"
                          />
                          <path
                            d="M12.5166 13.9697H6.4813C6.17394 13.9697 5.89453 14.2172 5.89453 14.5472C5.89453 14.8772 6.146 15.1247 6.4813 15.1247H12.4886C12.796 15.1247 13.0754 14.8772 13.0754 14.5472C13.0754 14.2172 12.8239 13.9697 12.5166 13.9697Z"
                            fill="white"
                          />
                          <path
                            d="M12.5166 16.2246H6.4813C6.17394 16.2246 5.89453 16.4721 5.89453 16.8021C5.89453 17.1046 6.146 17.3796 6.4813 17.3796H12.4886C12.796 17.3796 13.0754 17.1321 13.0754 16.8021C13.0754 16.4721 12.8239 16.2246 12.5166 16.2246Z"
                            fill="white"
                          />
                          <path
                            d="M12.5166 18.4805H6.4813C6.17394 18.4805 5.89453 18.728 5.89453 19.058C5.89453 19.3605 6.146 19.6355 6.4813 19.6355H12.4886C12.796 19.6355 13.0754 19.388 13.0754 19.058C13.0754 18.728 12.8239 18.4805 12.5166 18.4805Z"
                            fill="white"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1571_2">
                            <rect
                              width="19"
                              height="22"
                              fill="white"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                      <p className="text-sm my-auto silka-semibold text-white">
                        Save to Project
                      </p>
                    </button>
                    <button
                      className="mt-3 rounded-lg hover:opacity-90 p-3 bg-[#363636] flex flex-row space-x-3"
                      onClick={() => {
                        handleDownload(renderUrl, fileName);
                      }}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="my-auto"
                      >
                        <path
                          d="M7.50005 1.04999C7.74858 1.04999 7.95005 1.25146 7.95005 1.49999V8.41359L10.1819 6.18179C10.3576 6.00605 10.6425 6.00605 10.8182 6.18179C10.994 6.35753 10.994 6.64245 10.8182 6.81819L7.81825 9.81819C7.64251 9.99392 7.35759 9.99392 7.18185 9.81819L4.18185 6.81819C4.00611 6.64245 4.00611 6.35753 4.18185 6.18179C4.35759 6.00605 4.64251 6.00605 4.81825 6.18179L7.05005 8.41359V1.49999C7.05005 1.25146 7.25152 1.04999 7.50005 1.04999ZM2.5 10C2.77614 10 3 10.2239 3 10.5V12C3 12.5539 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5528 12 12V10.5C12 10.2239 12.2239 10 12.5 10C12.7761 10 13 10.2239 13 10.5V12C13 13.1041 12.1062 14 11.0012 14H3.99635C2.89019 14 2 13.103 2 12V10.5C2 10.2239 2.22386 10 2.5 10Z"
                          fill="white"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <p className="text-sm my-auto silka-semibold text-white">
                        Download
                      </p>
                    </button>
                  </div>
                </div>
                <div className="mt-10 flex flex-col">
                  <h2 className="text-2xl silka-bold text-gray-900">
                    More Actions
                  </h2>
                  <div className="mt-5 flex flex-col">
                    <button
                      onClick={() => {
                        setFile(null);
                        setRenderUrl('');
                        setRenderingStatus('None');
                        setSelectFileOpen(false);
                      }}
                      className="mt-3 p-3 w-full flex flex-row space-x-3 bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                      <div className="bg-white rounded p-2 my-auto">
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                            fill="#363636"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <p className="text-sm my-auto silka-semibold text-[#363636]">
                        Create a new one
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </ToolsLayout>
    </PageHead>
  );
}
