import { ToolsLayout } from '../../../components/edittools/ToolsLayout';
import { PageHead } from '../../../layouts/PageHead';
import { useState, useEffect, Fragment, useCallback } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { clsx } from 'clsx';
import { apiUrl } from '../../../utils/apiUrl';
import fileDownload from 'js-file-download';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { Transition } from '@headlessui/react';
import { SelectFileDialog } from '../../../components/edittools/SelectFile';
import Cropper from 'react-easy-crop';
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from '@chakra-ui/react';

const sizes = ['Landscape (16:9)', 'Portrait (9:16)', 'Square (1:1)'];

async function uploadFile(e: any, setFile: any) {
  const file = e.target.files[0];
  try {
    const testForm = new FormData();
    testForm.append('file', file);

    toast.loading('Uploading File...', {
      className: 'text-sm silka-medium text-gray-900',
      duration: 80000,
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

async function cropVideo(
  workspaceId: string,
  fileId: string,
  url: string,
  format: string,
  width: number,
  height: number,
  x: number,
  y: number
) {
  try {
    const result = await axios.post(
      `${apiUrl()}editor/create/cropvideo`,
      null,
      {
        params: {
          workspaceId: workspaceId,
          fileId: fileId,
          url: url,
          format: format,
          width: width,
          height: height,
          x: x,
          y: y,
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

export default function CropVideo() {
  const [workspaceId, setWorkspaceId] = useState('');
  const [renderingStatus, setRenderingStatus] = useState('None');
  const [file, setFile] = useState<any>('');
  const router = useRouter();
  const { data: session } = useSession();
  const [exportOpen, setExportOpen] = useState(false);
  const [selectFileOpen, setSelectFileOpen] = useState(false);
  const [project, setProject] = useState<any>('');
  const [projects, setProjects] = useState<any>([]);
  const [fileName, setFileName] = useState('');
  const [size, setSize] = useState('Landscape (16:9)');
  const [renderUrl, setRenderUrl] = useState('');

  const [aspectRatio, setAspectRatio] = useState(16 / 9);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] =
    useState<any>(null);

  useEffect(() => {
    console.log('crop', crop);
    console.log('zoom', zoom);
  }, [crop, zoom]);

  useEffect(() => {
    if (size == 'Landscape (16:9)') {
      setAspectRatio(16 / 9);
    } else if (size == 'Portrait (9:16)') {
      setAspectRatio(9 / 16);
    } else {
      setAspectRatio(1);
    }
  }, [size]);

  useEffect(() => {
    if (router.isReady) {
      setWorkspaceId(router.query.workspaceId as string);
    }
  }, [router.isReady]);

  useEffect(() => {
    if (file) {
      setFileName(
        file?.name?.split('.')[0] +
          '-cropped.' +
          file?.format?.split('/')[1]
      );
    }
  }, [file]);

  const onCropComplete = (
    croppedArea: any,
    croppedAreaPixels: any
  ) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  return (
    <PageHead title="Crop Video · Disperse Video Tools">
      <ToolsLayout workspaceId={workspaceId} title="Crop Video">
        <div className="flex flex-row h-full w-full divide-x">
          <div className="w-full h-full flex-1 flex flex-col justify-center items-center p-6">
            {!file ? (
              <div className="flex flex-col justify-center w-full h-full items-center bg-[#F6F4F3] rounded-xl">
                <div className="flex flex-col justify-center items-center space-y-6">
                  <svg
                    width="35"
                    height="40"
                    viewBox="0 0 35 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1564_131)">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M9.98099 35.2C9.44867 35.2 9.04943 34.8 9.04943 34.2667V23.6C9.04943 23.0667 9.44867 22.6667 9.98099 22.6667H25.019C25.5513 22.6667 25.9506 23.0667 25.9506 23.6V34.2667C25.9506 34.8 25.5513 35.2 25.019 35.2H9.98099ZM25.019 17.2H9.98099C9.44867 17.2 9.04943 16.8 9.04943 16.4V5.6C9.04943 5.2 9.44867 4.8 9.98099 4.8H25.019C25.5513 4.8 25.9506 5.2 25.9506 5.6V16.4C25.9506 16.8 25.5513 17.2 25.019 17.2ZM5.19011 25.7333V28.5333H2.39544V25.7333H5.19011ZM5.19011 21.3333H2.39544V18.5333H5.19011V21.3333ZM29.943 21.3333V18.5333H32.6046V21.3333H29.943ZM29.943 6.93333V4.13333H32.6046V6.93333H29.943ZM29.943 28.5333V25.7333H32.6046V28.5333H29.943ZM29.943 14.1333V11.3333H32.6046V14.1333H29.943ZM29.943 35.7333V32.9333H32.6046V35.7333H29.943ZM5.19011 14.1333H2.39544V11.3333H5.19011V14.1333ZM5.19011 6.93333H2.39544V4.13333H5.19011V6.93333ZM5.19011 35.7333H2.39544V32.9333H5.19011V35.7333ZM0 3.06667V36.8C0 38.5333 1.3308 40 3.06084 40H31.9392C33.6692 40 35 38.5333 35 36.8V3.06667C35 1.33333 33.6692 0 31.9392 0H3.06084C1.3308 0 0 1.33333 0 3.06667Z"
                        fill="#FF623D"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1564_131">
                        <rect width="35" height="40" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <h2 className="silka-bold text-2xl text-[#363636]">
                    Select or Upload a Video
                  </h2>
                </div>
                <label
                  //@ts-ignore
                  htmlFor="file-upload"
                  className="px-6 hover:bg-gray-200 text-xs mt-8 py-1.5 rounded border hover:opacity-90 border-gray-300 silka-medium text-[#363636]"
                >
                  Upload Video
                </label>
                <input
                  id="file-upload"
                  className="hidden"
                  onChange={(e) => {
                    uploadFile(e, setFile);
                  }}
                  accept="video/*"
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
                    fileType="video"
                    project={project}
                    setProject={setProject}
                    projects={projects}
                    setProjects={setProjects}
                  />
                </DialogPrimitive.Root>
              </div>
            ) : (
              <div className="h-full w-full justify-center items-center space-y-8 flex flex-col">
                <div className="relative rounded-lg h-[70vh] w-full">
                  <Cropper
                    video={
                      file?.videoUrl ? file?.videoUrl : file?.url
                    }
                    crop={crop}
                    zoom={zoom}
                    aspect={aspectRatio}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropAreaChange={onCropComplete}
                  />
                </div>
                <div className="flex flex-row space-x-4">
                  <p className="text-xs my-auto silka-medium text-[#363636]">
                    Zoom
                  </p>
                  <div className="my-auto w-[300px]">
                    {/* @ts-ignore */}
                    <Slider
                      aria-label="slider-ex-2"
                      colorScheme="orange"
                      defaultValue={1}
                      onChange={(val) => {
                        setZoom(val);
                      }}
                      min={1}
                      step={0.1}
                      max={3}
                    >
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb />
                    </Slider>
                  </div>
                </div>
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
                    Crop Video
                  </h2>
                  {file ? (
                    <p className="text-xs silka-regular text-gray-500 mt-4">
                      Ready to crop file!
                    </p>
                  ) : (
                    <p className="text-xs silka-regular text-gray-500 mt-4">
                      Select a file to continue!
                    </p>
                  )}
                  <div className="mt-5 flex flex-col">
                    <h2 className="text-sm silka-bold text-[#363636]">
                      Size
                    </h2>
                    <DropdownMenuPrimitive.Root>
                      <DropdownMenuPrimitive.Trigger asChild>
                        <button className="flex mt-2 flex-row justify-between px-3 py-2 rounded-lg border border-gray-300 items-between">
                          <p className="text-sm silka-medium text-gray-900">
                            {size}
                          </p>
                          <svg
                            width="14"
                            height="14"
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
                            {sizes.map(
                              (value: any, index: number) => {
                                return (
                                  <DropdownMenuPrimitive.Item className="w-full">
                                    <button
                                      onClick={() => {
                                        setSize(value);
                                      }}
                                      className="py-1.5 rounded w-full text-sm silka-medium text-[#363636] hover:bg-gray-50"
                                    >
                                      {value}
                                    </button>
                                  </DropdownMenuPrimitive.Item>
                                );
                              }
                            )}
                          </div>
                        </DropdownMenuPrimitive.Content>
                      </DropdownMenuPrimitive.Portal>
                    </DropdownMenuPrimitive.Root>
                  </div>
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
                      Export
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
                            className="w-full flex flex-col"
                            onSubmit={(e) => {
                              e.preventDefault();
                              setExportOpen(false);
                              setRenderingStatus('rendering');
                              toast.loading('Rendering Video...', {
                                className:
                                  'text-sm silka-medium text-gray-900',
                              });
                              cropVideo(
                                workspaceId,
                                file?.id,
                                file?.url,
                                file?.format,
                                croppedAreaPixels?.width,
                                croppedAreaPixels?.height,
                                croppedAreaPixels?.x,
                                croppedAreaPixels?.y
                              ).then((value) => {
                                setRenderUrl(value?.url);
                                setRenderingStatus('rendered');
                                toast.remove();
                                toast.success('Render Successful!', {
                                  className:
                                    'text-sm silka-medium text-gray-900',
                                });
                              });
                            }}
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
                  Rendering Video...
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
                <h2 className="text-2xl silka-bold text-gray-900">
                  Rendering Successful!
                </h2>
                <video
                  src={renderUrl}
                  controls
                  className="mt-4 w-full max-h-[200px] bg-black rounded-lg"
                />
                <div className="flex flex-col mt-5">
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
                </div>
                <button
                  onClick={() => {
                    saveToProject(
                      renderUrl,
                      project?.id,
                      String(session?.user?.id),
                      'video/mp4'
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
                        <rect width="19" height="22" fill="white" />
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
                <div className="mt-10 flex flex-col">
                  <h2 className="text-2xl silka-bold text-gray-900">
                    More Actions
                  </h2>
                  <div className="mt-5 flex flex-col">
                    <button
                      onClick={() => {
                        setRenderingStatus('None');
                      }}
                      className="w-full p-3 flex flex-row space-x-3 bg-gray-100 rounded-lg hover:bg-gray-200"
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
                            d="M12.1464 1.14645C12.3417 0.951184 12.6583 0.951184 12.8535 1.14645L14.8535 3.14645C15.0488 3.34171 15.0488 3.65829 14.8535 3.85355L10.9109 7.79618C10.8349 7.87218 10.7471 7.93543 10.651 7.9835L6.72359 9.94721C6.53109 10.0435 6.29861 10.0057 6.14643 9.85355C5.99425 9.70137 5.95652 9.46889 6.05277 9.27639L8.01648 5.34897C8.06455 5.25283 8.1278 5.16507 8.2038 5.08907L12.1464 1.14645ZM12.5 2.20711L8.91091 5.79618L7.87266 7.87267L8.12731 8.12732L10.2038 7.08907L13.7929 3.5L12.5 2.20711ZM9.99998 2L8.99998 3H4.9C4.47171 3 4.18056 3.00039 3.95552 3.01877C3.73631 3.03668 3.62421 3.06915 3.54601 3.10899C3.35785 3.20487 3.20487 3.35785 3.10899 3.54601C3.06915 3.62421 3.03669 3.73631 3.01878 3.95552C3.00039 4.18056 3 4.47171 3 4.9V11.1C3 11.5283 3.00039 11.8194 3.01878 12.0445C3.03669 12.2637 3.06915 12.3758 3.10899 12.454C3.20487 12.6422 3.35785 12.7951 3.54601 12.891C3.62421 12.9309 3.73631 12.9633 3.95552 12.9812C4.18056 12.9996 4.47171 13 4.9 13H11.1C11.5283 13 11.8194 12.9996 12.0445 12.9812C12.2637 12.9633 12.3758 12.9309 12.454 12.891C12.6422 12.7951 12.7951 12.6422 12.891 12.454C12.9309 12.3758 12.9633 12.2637 12.9812 12.0445C12.9996 11.8194 13 11.5283 13 11.1V6.99998L14 5.99998V11.1V11.1207C14 11.5231 14 11.8553 13.9779 12.1259C13.9549 12.407 13.9057 12.6653 13.782 12.908C13.5903 13.2843 13.2843 13.5903 12.908 13.782C12.6653 13.9057 12.407 13.9549 12.1259 13.9779C11.8553 14 11.5231 14 11.1207 14H11.1H4.9H4.87934C4.47686 14 4.14468 14 3.87409 13.9779C3.59304 13.9549 3.33469 13.9057 3.09202 13.782C2.7157 13.5903 2.40973 13.2843 2.21799 12.908C2.09434 12.6653 2.04506 12.407 2.0221 12.1259C1.99999 11.8553 1.99999 11.5231 2 11.1207V11.1206V11.1V4.9V4.87935V4.87932V4.87931C1.99999 4.47685 1.99999 4.14468 2.0221 3.87409C2.04506 3.59304 2.09434 3.33469 2.21799 3.09202C2.40973 2.71569 2.7157 2.40973 3.09202 2.21799C3.33469 2.09434 3.59304 2.04506 3.87409 2.0221C4.14468 1.99999 4.47685 1.99999 4.87932 2H4.87935H4.9H9.99998Z"
                            fill="#363636"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <p className="text-sm my-auto silka-semibold text-[#363636]">
                        New clip from video
                      </p>
                    </button>
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
