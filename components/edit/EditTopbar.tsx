import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  Fragment,
} from 'react';
import { clsx } from 'clsx';
import axios from 'axios';
import toast from 'react-hot-toast';
import { apiUrl } from '../../utils/apiUrl';
import Router from 'next/router';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Transition } from '@headlessui/react';
import { useLambda } from '../lambda/useLambda';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { ProUpgradeDialog } from '../../layouts/upgrade/ProUpgradeDialog';
import fileDownload from 'js-file-download';

async function uploaderRender(url: string) {
  try {
    const result = await axios.post(
      `${apiUrl()}editor/create/uploadrender`,
      null,
      {
        params: {
          url: url,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function addWatermark(url: string, size: string) {
  try {
    const result = await axios.post(
      `${apiUrl()}editor/create/watermark`,
      null,
      {
        params: {
          url: url,
          size: size,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function getIsPremium(workspaceId: string) {
  try {
    const result = await axios.get(
      `${apiUrl()}workspace/read/ispremium`,
      {
        params: {
          workspaceId: workspaceId,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function encodeSeconds(seconds: number) {
  let minutes: any = Math.floor(seconds / 60);
  let secs: any = Math.floor(seconds % 60);

  if (minutes < 10) minutes = String(`0${minutes}`);
  if (secs < 10) secs = String(`0${secs}`);

  return `${minutes}:${secs}`;
}

async function deleteComposition(compositionId: string) {
  try {
    toast.loading('Deleting Composition...', {
      className: 'text-sm silka-medium text-gray-900',
      duration: 80000,
    });
    const result = await axios.post(
      `${apiUrl()}editor/delete/composition`,
      null,
      {
        params: {
          compositionId: compositionId,
        },
      }
    );
    toast.remove();
    toast.success('Successfully Deleted!', {
      className: 'text-sm silka-medium text-gray-900',
    });
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function getCaptions(compositionId: string) {
  try {
    const result = await axios.get(
      `${apiUrl()}editor/read/captions`,
      {
        params: {
          compositionId: compositionId,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function getAudio(name: string) {
  try {
    const result = await axios.get(
      `${apiUrl()}edtior/read/getaudio`,
      {
        params: {
          name: name,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function getAdhdVideo(name: string) {
  try {
    const result = await axios.get(`${apiUrl()}editor/read/getadhd`, {
      params: { name: name },
    });
    return result.data;
  } catch (e) {
    console.log(e);
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

async function getFileDetails(fileId: string, workspaceId: string) {
  try {
    const result = await axios.get(`${apiUrl()}editor/read/file`, {
      params: {
        fileId: fileId,
        workspaceId: workspaceId,
      },
    });
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function handleDownload(url: string, renderId: string) {
  try {
    toast.loading('Downloading...', {
      className: 'text-sm silka-medium text-gray-900',
    });
    await axios.get(url, { responseType: 'blob' }).then((res) => {
      fileDownload(res.data, `${renderId}.mp4`);
    });
    toast.remove();
    toast.success('Successfully Downloaded!', {
      className: 'text-sm silka-medium text-gray-900',
    });
  } catch (e) {
    console.log(e);
  }
}

const icons = [
  {
    name: 'Media',
    icon: '/images/edit/media.svg',
  },
  {
    name: 'Text',
    icon: '/images/edit/text.svg',
  },
  {
    name: 'Effects',
    icon: '/images/edit/effects.svg',
  },
  /*
  {
    name: 'AI',
    icon: '/images/edit/ai.svg',
  },
  */
  {
    name: 'Options',
    icon: '/images/edit/options.svg',
  },
];

interface Props {
  workspaceId: string;
  file: string;
  compositionId: string;
  sidebarSelected: string;
  setSidebarSelected: Dispatch<SetStateAction<string>>;
  captionsOpen: boolean;
  adhdVideo: string;
  position: string;
  font: string;
  alignment: string;
  size: string;
  capitalization: string;
  color: string;
  wordsPerLine: string;
  audio: string;
  refetch: boolean;
  setRenameOpen: Dispatch<SetStateAction<boolean>>;
  start: number;
  end: number;
  project: any;
  setProject: Dispatch<SetStateAction<any>>;
  projects: any;
  userId: string;
  aspectRatio: string;
  userName: string;
  email: string;
  contentFit: string;
}

export function EditTopbar({
  workspaceId,
  file,
  compositionId,
  sidebarSelected,
  setSidebarSelected,
  captionsOpen,
  adhdVideo,
  position,
  font,
  alignment,
  size,
  capitalization,
  color,
  wordsPerLine,
  audio,
  refetch,
  setRenameOpen,
  start,
  end,
  project,
  setProject,
  projects,
  userId,
  aspectRatio,
  userName,
  email,
  contentFit,
}: Props) {
  const [exportOpen, setExportOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [fileDetails, setFileDetails] = useState<any>(null);
  const [secs, setSecs] = useState<any>('');
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [statusStr, setStatusStr] = useState<string>('');
  const [videoUrl, setVideoUrl] = useState('');

  const [mediaUrl, setMediaUrl] = useState<string>('');
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [adhdVideoUrl, setAdhdVideoUrl] = useState<string>('');
  const [captions, setCaptions] = useState<any>('');

  const [props, setProps] = useState<any>({});
  const [upgradeOpen, setUpgradeOpen] = useState(false);

  useEffect(() => {
    if (workspaceId) {
      getIsPremium(workspaceId).then((value) => {
        setIsPremium(value?.value);
      });
    }
  }, [workspaceId]);

  useEffect(() => {
    encodeSeconds(end - start).then((value) => {
      setSecs(value);
    });
  }, [start, end]);

  useEffect(() => {
    if (adhdVideo) {
      getAdhdVideo(adhdVideo).then((value) => {
        setAdhdVideoUrl(value?.url);
      });
    }
  }, [adhdVideo]);

  useEffect(() => {
    if (audio) {
      getAudio(audio).then((value) => {
        setAudioUrl(value?.url);
      });
    }
  }, [audio]);

  useEffect(() => {
    if (captionsOpen && !refetch) {
      getCaptions(compositionId).then((value) => {
        setCaptions(value);
      });
    }
  }, [captionsOpen, refetch]);

  useEffect(() => {
    if (file) {
      getFileDetails(file, workspaceId).then((result) => {
        setMediaUrl(result?.url);
        setFileDetails(result);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [file]);

  useEffect(() => {
    setProps({
      start: start,
      end: end,
      duration: end - start,
      url: mediaUrl,
      captionOpen: captionsOpen,
      adhdVideo: adhdVideo,
      adhdVideoUrl: adhdVideoUrl,
      captions: captions,
      position: position,
      font: font,
      size: size,
      alignment: alignment,
      capitalization: capitalization,
      color: color,
      wordsPerLine: wordsPerLine,
      audio: audio,
      audioUrl: audioUrl,
      aspectRatio: aspectRatio,
      contentFit: contentFit,
    });
  }, [
    compositionId,
    mediaUrl,
    captionsOpen,
    adhdVideo,
    adhdVideoUrl,
    captions,
    position,
    font,
    size,
    alignment,
    capitalization,
    color,
    contentFit,
    wordsPerLine,
    audio,
    audioUrl,
    end,
    start,
    aspectRatio,
  ]);

  const { renderMedia, progress, status, url, price, renderId } =
    useLambda('MyComp', props);

  useEffect(() => {
    if (status && status != 'rendering') {
      if (isPremium) {
        if (url) {
          setStatusStr('watermark');
          uploaderRender(String(url)).then((value) => {
            setVideoUrl(value?.url);
            setStatusStr('done');
          });
        } else {
          setVideoUrl('');
          setStatusStr('done');
        }
      } else {
        setStatusStr('watermark');
        if (url) {
          addWatermark(String(url), aspectRatio).then((value) => {
            setVideoUrl(value?.url);
            setStatusStr('done');
          });
        }
      }
    } else {
      setStatusStr(status ? status : '');
    }
  }, [status, url]);

  return (
    <header className="bg-[#2C2C2C] pr-3 flex flex-row justify-between items-between w-full">
      <div className="flex flex-row">
        <div className="flex flex-row">
          <DropdownMenuPrimitive.Root>
            <DropdownMenuPrimitive.Trigger asChild>
              <button className="flex flex-row space-x-2 hover:bg-[#363636] pl-3.5 pr-2.5">
                <img
                  className="h-[18px] my-auto w-[18px]"
                  src={'/images/edit/disperse.png'}
                />
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
                    fill="white"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </DropdownMenuPrimitive.Trigger>
            <DropdownMenuPrimitive.Portal>
              <DropdownMenuPrimitive.Content
                align="start"
                sideOffset={4}
                className={clsx(
                  'flex flex-col ml-2 z-10 adix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
                  'w-48 rounded-sm px-1 py-2 shadow-md',
                  'bg-white'
                )}
              >
                <div className="flex flex-col space-y-0.5">
                  <DropdownMenuPrimitive.Item>
                    <button
                      onClick={() => {
                        Router.push('/' + workspaceId + '/edit');
                      }}
                      className="flex py-2 w-full hover:bg-gray-100 flex-row rounded space-x-2 px-2.5"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="my-auto"
                      >
                        <path
                          d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
                          fill="#363636"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <p className="text-xs my-auto silka-medium text-[#363636]">
                        Back to Workspace
                      </p>
                    </button>
                  </DropdownMenuPrimitive.Item>
                  <DropdownMenuPrimitive.Item>
                    <button
                      onClick={() => {
                        setRenameOpen(true);
                      }}
                      className="flex py-2 w-full hover:bg-gray-100 flex-row rounded space-x-2 px-2.5"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="my-auto"
                      >
                        <path
                          d="M12.1464 1.14645C12.3417 0.951184 12.6583 0.951184 12.8535 1.14645L14.8535 3.14645C15.0488 3.34171 15.0488 3.65829 14.8535 3.85355L10.9109 7.79618C10.8349 7.87218 10.7471 7.93543 10.651 7.9835L6.72359 9.94721C6.53109 10.0435 6.29861 10.0057 6.14643 9.85355C5.99425 9.70137 5.95652 9.46889 6.05277 9.27639L8.01648 5.34897C8.06455 5.25283 8.1278 5.16507 8.2038 5.08907L12.1464 1.14645ZM12.5 2.20711L8.91091 5.79618L7.87266 7.87267L8.12731 8.12732L10.2038 7.08907L13.7929 3.5L12.5 2.20711ZM9.99998 2L8.99998 3H4.9C4.47171 3 4.18056 3.00039 3.95552 3.01877C3.73631 3.03668 3.62421 3.06915 3.54601 3.10899C3.35785 3.20487 3.20487 3.35785 3.10899 3.54601C3.06915 3.62421 3.03669 3.73631 3.01878 3.95552C3.00039 4.18056 3 4.47171 3 4.9V11.1C3 11.5283 3.00039 11.8194 3.01878 12.0445C3.03669 12.2637 3.06915 12.3758 3.10899 12.454C3.20487 12.6422 3.35785 12.7951 3.54601 12.891C3.62421 12.9309 3.73631 12.9633 3.95552 12.9812C4.18056 12.9996 4.47171 13 4.9 13H11.1C11.5283 13 11.8194 12.9996 12.0445 12.9812C12.2637 12.9633 12.3758 12.9309 12.454 12.891C12.6422 12.7951 12.7951 12.6422 12.891 12.454C12.9309 12.3758 12.9633 12.2637 12.9812 12.0445C12.9996 11.8194 13 11.5283 13 11.1V6.99998L14 5.99998V11.1V11.1207C14 11.5231 14 11.8553 13.9779 12.1259C13.9549 12.407 13.9057 12.6653 13.782 12.908C13.5903 13.2843 13.2843 13.5903 12.908 13.782C12.6653 13.9057 12.407 13.9549 12.1259 13.9779C11.8553 14 11.5231 14 11.1207 14H11.1H4.9H4.87934C4.47686 14 4.14468 14 3.87409 13.9779C3.59304 13.9549 3.33469 13.9057 3.09202 13.782C2.7157 13.5903 2.40973 13.2843 2.21799 12.908C2.09434 12.6653 2.04506 12.407 2.0221 12.1259C1.99999 11.8553 1.99999 11.5231 2 11.1207V11.1206V11.1V4.9V4.87935V4.87932V4.87931C1.99999 4.47685 1.99999 4.14468 2.0221 3.87409C2.04506 3.59304 2.09434 3.33469 2.21799 3.09202C2.40973 2.71569 2.7157 2.40973 3.09202 2.21799C3.33469 2.09434 3.59304 2.04506 3.87409 2.0221C4.14468 1.99999 4.47685 1.99999 4.87932 2H4.87935H4.9H9.99998Z"
                          fill="currentColor"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <p className="text-xs my-auto silka-medium text-[#363636]">
                        Rename Composition
                      </p>
                    </button>
                  </DropdownMenuPrimitive.Item>
                  <DropdownMenuPrimitive.Item>
                    <button
                      onClick={() => {
                        deleteComposition(compositionId).then(() => {
                          Router.push('/' + workspaceId + '/edit');
                        });
                      }}
                      className="flex w-full flex-row hover:bg-gray-100 rounded py-2 space-x-2 px-2.5"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="my-auto"
                      >
                        <path
                          d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
                          fill="#363636"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <p className="text-xs my-auto silka-medium text-[#363636]">
                        Delete Composition
                      </p>
                    </button>
                  </DropdownMenuPrimitive.Item>
                </div>
              </DropdownMenuPrimitive.Content>
            </DropdownMenuPrimitive.Portal>
          </DropdownMenuPrimitive.Root>
        </div>
        <div className="flex flex-row">
          {icons.map((value) => {
            return (
              <button
                onClick={() => {
                  setSidebarSelected(value.name);
                }}
                className={
                  'p-3 ' +
                  (sidebarSelected === value.name
                    ? 'bg-[#FF623D]'
                    : 'hover:bg-[#363636]')
                }
              >
                <img
                  className="h-[22px] w-[22px]"
                  src={value.icon}
                  alt={value.name}
                />
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex flex-row space-x-4">
        <div className="my-auto">
          {!isPremium && (
            <DialogPrimitive.Root
              open={upgradeOpen}
              onOpenChange={setUpgradeOpen}
            >
              <DialogPrimitive.Trigger asChild>
                <button className="my-auto hover:opacity-90 flex flex-row space-x-1.5">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="my-auto"
                  >
                    <path
                      d="M8.69667 0.0403541C8.90859 0.131038 9.03106 0.354857 8.99316 0.582235L8.0902 6.00001H12.5C12.6893 6.00001 12.8625 6.10701 12.9472 6.27641C13.0319 6.4458 13.0136 6.6485 12.8999 6.80001L6.89997 14.8C6.76167 14.9844 6.51521 15.0503 6.30328 14.9597C6.09135 14.869 5.96888 14.6452 6.00678 14.4178L6.90974 9H2.49999C2.31061 9 2.13748 8.893 2.05278 8.72361C1.96809 8.55422 1.98636 8.35151 2.09999 8.2L8.09997 0.200038C8.23828 0.0156255 8.48474 -0.0503301 8.69667 0.0403541ZM3.49999 8.00001H7.49997C7.64695 8.00001 7.78648 8.06467 7.88148 8.17682C7.97648 8.28896 8.01733 8.43723 7.99317 8.5822L7.33027 12.5596L11.5 7.00001H7.49997C7.353 7.00001 7.21347 6.93534 7.11846 6.8232C7.02346 6.71105 6.98261 6.56279 7.00678 6.41781L7.66968 2.44042L3.49999 8.00001Z"
                      fill="white"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <p className="text-xs silka-semibold text-white">
                    Upgrade
                  </p>
                </button>
              </DialogPrimitive.Trigger>
              <ProUpgradeDialog
                isOpen={upgradeOpen}
                setIsOpen={setUpgradeOpen}
                workspaceId={workspaceId}
                userId={userId}
                userName={userName}
                email={email}
              />
            </DialogPrimitive.Root>
          )}
        </div>
        <div className="my-auto">
          <DialogPrimitive.Root
            open={exportOpen}
            onOpenChange={setExportOpen}
          >
            <DialogPrimitive.Trigger asChild>
              <button
                onClick={() => {}}
                className="h-full py-1.5 text-white silka-medium rounded px-4 text-xs bg-[#FF623D] hover:opacity-90"
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
                      'w-[95vw] max-w-2xl rounded-lg p-4 md:w-full',
                      'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
                      'bg-white',
                      'focus:outline-none focus-visible:ring-0'
                    )}
                  >
                    <div className="flex flex-col w-full">
                      <div className="flex flex-row justify-between items-between w-full">
                        <h2 className="silka-semibold text-lg text-gray-900">
                          Export Video
                        </h2>
                        <DialogPrimitive.Close>
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="my-auto hover:opacity-80"
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
                      {isLoading ? (
                        <div className="mt-4 py-4 bg-gray-50 rounded flex flex-col justify-center items-center w-full">
                          <div className="h-[100px] rounded flex flex-col justify-center items-center">
                            <svg
                              width="14"
                              height="14"
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
                                  <rect
                                    width="24"
                                    height="24"
                                    fill="white"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                          </div>
                        </div>
                      ) : statusStr == 'done' ? (
                        <video
                          className="h-[340px] rounded-lg bg-black w-full mt-4"
                          src={videoUrl}
                          controls
                        />
                      ) : statusStr == 'rendering' ? (
                        <div className="mt-4 py-4 bg-gray-50 rounded flex flex-col justify-center items-center w-full">
                          <div className="h-[340px] w-full rounded flex flex-col justify-center items-center">
                            <p className="text-5xl silka-semibold text-black">
                              {Number((progress ?? 0) * 100).toFixed(
                                2
                              )}
                              %
                            </p>
                            <h2 className="silka-bold text-base mt-4 text-[#363636]">
                              Rendering
                            </h2>
                            <p className="mt-0.5 silka-regular text-xs text-gray-400">
                              Closing this tab may stop the render!
                            </p>
                          </div>
                        </div>
                      ) : statusStr == 'watermark' ? (
                        <div className="mt-4 py-4 bg-gray-50 rounded flex flex-col justify-center items-center w-full">
                          <div className="h-[340px] w-full rounded flex flex-col justify-center items-center">
                            <p className="text-5xl silka-semibold text-black">
                              100%
                            </p>
                            <div className="flex mt-6 flex-row space-x-3">
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="animate-spin my-auto"
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
                                    <rect
                                      width="24"
                                      height="24"
                                      fill="white"
                                    />
                                  </clipPath>
                                </defs>
                              </svg>
                              <h2 className="silka-bold text-base my-auto text-[#363636]">
                                Finalizing Video...
                              </h2>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-4 h-[200x] relative py-3 bg-gray-50 rounded flex flex-col justify-center items-center">
                          {fileDetails?.thumbnail ? (
                            <>
                              <img
                                src={fileDetails?.thumbnail}
                                className="h-full max-h-[340px] max-w-full rounded"
                              />
                              <div className="absolute flex w-full h-full px-3 pb-5 flex-col justify-end items-end">
                                <p className="px-3 py-1 bg-gray-900 rounded text-xs silka-medium text-white">
                                  {secs}
                                </p>
                              </div>
                            </>
                          ) : (
                            <p className="text-xl silka-semibold text-[#363636]">
                              No Content Selected
                            </p>
                          )}
                        </div>
                      )}
                      {statusStr == 'done' ? (
                        <div className="mt-5 flex flex-col space-y-6">
                          <div className="flex flex-col space-y-2 justify-start w-full items-start">
                            <p className="silka-bold text-[#363636] text-xs">
                              Folders
                            </p>
                            <Menu>
                              {/*@ts-ignore*/}
                              <MenuButton
                                transition="all 0.2s"
                                width="full"
                              >
                                <button className="px-4 py-2 rounded-lg w-full border flex flex-row justify-between items-between border-gray-200">
                                  <p className="text-sm my-auto silka-medium text-[#363636]">
                                    {project?.name}
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
                              </MenuButton>
                              <MenuList width="500px">
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
                          <div className="flex flex-row justify-between items-between">
                            <button
                              onClick={() => {
                                renderMedia();
                              }}
                              className="my-auto text-xs px-4 border border-gray-200 hover:bg-gray-50 py-1.5 rounded silka-medium text-[#363636]"
                            >
                              Re-render
                            </button>
                            <div className="flex flex-row space-x-3 justify-end items-end">
                              <DialogPrimitive.Close>
                                <button
                                  onClick={() => {
                                    saveToProject(
                                      String(url),
                                      project?.id,
                                      userId,
                                      'video/mp4'
                                    );
                                  }}
                                  className="text-xs silka-medium text-white px-4 py-1.5 rounded bg-[#363636] hover:opacity-90"
                                >
                                  Save to Disperse
                                </button>
                              </DialogPrimitive.Close>
                              <button
                                className="text-xs silka-medium text-white px-4 py-1.5 rounded bg-[#FF623D] hover:opacity-90"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleDownload(
                                    String(videoUrl),
                                    String(renderId)
                                  );
                                }}
                              >
                                Download
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : statusStr != 'rendering' &&
                        statusStr != 'watermark' ? (
                        <div className="mt-5 flex flex-col space-y-6">
                          {!isPremium && (
                            <div className="border px-4 py-2 rounded-lg flex flex-row justify-center items-center w-full space-x-3 border-[#FF0000]">
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 15 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="my-auto"
                              >
                                <path
                                  d="M8.69667 0.0403541C8.90859 0.131038 9.03106 0.354857 8.99316 0.582235L8.0902 6.00001H12.5C12.6893 6.00001 12.8625 6.10701 12.9472 6.27641C13.0319 6.4458 13.0136 6.6485 12.8999 6.80001L6.89997 14.8C6.76167 14.9844 6.51521 15.0503 6.30328 14.9597C6.09135 14.869 5.96888 14.6452 6.00678 14.4178L6.90974 9H2.49999C2.31061 9 2.13748 8.893 2.05278 8.72361C1.96809 8.55422 1.98636 8.35151 2.09999 8.2L8.09997 0.200038C8.23828 0.0156255 8.48474 -0.0503301 8.69667 0.0403541ZM3.49999 8.00001H7.49997C7.64695 8.00001 7.78648 8.06467 7.88148 8.17682C7.97648 8.28896 8.01733 8.43723 7.99317 8.5822L7.33027 12.5596L11.5 7.00001H7.49997C7.353 7.00001 7.21347 6.93534 7.11846 6.8232C7.02346 6.71105 6.98261 6.56279 7.00678 6.41781L7.66968 2.44042L3.49999 8.00001Z"
                                  fill="#FF0000"
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                              <p className="text-sm silka-medium text-[#FF0000]">
                                Upgrade to{' '}
                                <span className="silka-semibold">
                                  PRO
                                </span>{' '}
                                to remove Disperse{' '}
                                <span className="silka-semibold">
                                  Outro
                                </span>
                              </p>
                            </div>
                          )}
                          <div className="flex flex-row space-x-3 justify-end items-end">
                            <DialogPrimitive.Close>
                              <button className="text-xs silka-medium text-white px-4 py-1.5 rounded bg-[#363636] hover:opacity-90">
                                Cancel
                              </button>
                            </DialogPrimitive.Close>
                            <button
                              onClick={() => {
                                renderMedia();
                              }}
                              disabled={statusStr === 'rendering'}
                              className="text-xs silka-medium text-white px-4 py-1.5 rounded bg-[#FF623D] hover:opacity-90"
                            >
                              Export
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          {!isPremium && (
                            <div className="border mt-5 px-4 py-2 rounded-lg flex flex-row justify-center items-center w-full space-x-3 border-[#FF0000]">
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 15 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="my-auto"
                              >
                                <path
                                  d="M8.69667 0.0403541C8.90859 0.131038 9.03106 0.354857 8.99316 0.582235L8.0902 6.00001H12.5C12.6893 6.00001 12.8625 6.10701 12.9472 6.27641C13.0319 6.4458 13.0136 6.6485 12.8999 6.80001L6.89997 14.8C6.76167 14.9844 6.51521 15.0503 6.30328 14.9597C6.09135 14.869 5.96888 14.6452 6.00678 14.4178L6.90974 9H2.49999C2.31061 9 2.13748 8.893 2.05278 8.72361C1.96809 8.55422 1.98636 8.35151 2.09999 8.2L8.09997 0.200038C8.23828 0.0156255 8.48474 -0.0503301 8.69667 0.0403541ZM3.49999 8.00001H7.49997C7.64695 8.00001 7.78648 8.06467 7.88148 8.17682C7.97648 8.28896 8.01733 8.43723 7.99317 8.5822L7.33027 12.5596L11.5 7.00001H7.49997C7.353 7.00001 7.21347 6.93534 7.11846 6.8232C7.02346 6.71105 6.98261 6.56279 7.00678 6.41781L7.66968 2.44042L3.49999 8.00001Z"
                                  fill="#FF0000"
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                              <p className="text-sm silka-medium text-[#FF0000]">
                                Upgrade to{' '}
                                <span className="silka-semibold">
                                  PRO
                                </span>{' '}
                                to remove Disperse{' '}
                                <span className="silka-semibold">
                                  Outro
                                </span>
                              </p>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </DialogPrimitive.Content>
                </Transition.Child>
              </Transition.Root>
            </DialogPrimitive.Portal>
          </DialogPrimitive.Root>
        </div>
      </div>
    </header>
  );
}
