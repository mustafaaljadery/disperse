import axios from 'axios';
import { useState, useEffect } from 'react';
import { apiUrl } from '../../../../utils/apiUrl';
import Router, { useRouter } from 'next/router';
import { PageHead } from '../../../../layouts/PageHead';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { clsx } from 'clsx';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import { SelectFileDialog } from '../../../../components/edittools/SelectFile';
import toast from 'react-hot-toast';
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from '@chakra-ui/react';
import { ProUpgradeDialog } from '../../../../layouts/upgrade/ProUpgradeDialog';
import { useSession } from 'next-auth/react';

function convertDateTime(value: any) {
  const t = new Date(value);
  const pad2 = (n: any) => ('0' + n).substr(-2);
  let date = `${pad2(t.getDate())}/${pad2(
    t.getMonth() + 1
  )}/${t.getFullYear()}`;
  let time = `${pad2(t.getHours())}:${pad2(t.getMinutes())}:${pad2(
    t.getSeconds()
  )}`;
  return time + ' ' + date;
}

function formatSeconds(seconds: number) {
  let hours: any = Math.floor(seconds / 3600);
  let minutes: any = Math.floor((seconds - hours * 3600) / 60);
  let secs: any = Math.floor(seconds % 60);

  hours = `${hours} ${hours === 1 ? 'hr' : 'hrs'}`;
  minutes = `${minutes} ${minutes === 1 ? 'min' : 'mins'}`;
  secs = `${secs} ${secs === 1 ? 'sec' : 'secs'}`;

  return `${hours} ${minutes} ${secs}`;
}

function formatTime(seconds: number) {
  let hours: any = Math.floor(seconds / 3600);
  let minutes: any = Math.floor((seconds - hours * 3600) / 60);
  let secs: any = Math.floor(seconds % 60);

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (secs < 10) {
    secs = `0${secs}`;
  }

  return `${hours}:${minutes}:${secs}`;
}

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

async function getYoutubeVideoInfo(youtubeLink: string) {
  try {
    const result = await axios.post(
      `${apiUrl()}media/youtube/getinfo`,
      null,
      {
        params: {
          url: youtubeLink,
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

async function getTime(workspaceId: string) {
  try {
    const result = await axios.get(
      `${apiUrl()}editor/read/collectionminutes`,
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

async function createCollection(
  workspaceId: string,
  type: string,
  youtubeLink: string,
  name: string,
  url: string,
  start: number,
  end: number,
  isPremium: boolean
) {
  try {
    toast.loading('Creating Collection...', {
      className: 'text-sm silka-medium text-gray-900',
      duration: 80000,
    });
    const result = await axios.post(
      `${apiUrl()}editor/create/collection`,
      null,
      {
        params: {
          workspaceId: workspaceId,
          type: type,
          youtubeLink: youtubeLink,
          name: name,
          url: url,
          start: start,
          end: end,
          isPremium: isPremium,
        },
      }
    );
    if (result.data.message == 'duration') {
      toast.remove();
      toast.error('Not enough credits, upgrade your plan for more!', {
        className: 'text-sm silka-medium text-gray-900',
      });
    } else {
      toast.remove();
      toast.success('Successfully Created Collection!', {
        className: 'text-sm silka-medium text-gray-900',
      });
    }
    return result.data;
  } catch (e) {
    console.log(e);
    toast.remove();
    toast.error('Error creating clips, please try again.', {
      className: 'text-sm silka-medium text-gray-900',
    });
  }
}

async function getCollections(workspaceId: string) {
  try {
    const result = await axios.get(
      `${apiUrl()}editor/read/collections`,
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

async function getClips(
  collectionId: string,
  workspaceId: string,
  duration: number,
  start: number,
  end: number,
  email: string
) {
  try {
    const result = await axios.post(
      `${apiUrl()}editor/create/getclips`,
      null,
      {
        params: {
          collectionId: collectionId,
          workspaceId: workspaceId,
          duration: duration,
          start: start,
          end: end,
          email: email,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

interface CollectionComponentProps {
  value: any;
  workspaceId: string;
}

function CollectionComponent({
  value,
  workspaceId,
}: CollectionComponentProps) {
  return (
    <div className="p-4 w-full sm:w-1/2 md:w-1/3 xl:w-1/4">
      <button
        onClick={() => {
          Router.push(
            `/${workspaceId}/ai-tools/get-clips/${value?.id}`
          );
        }}
        className="flex flex-col rounded-xl w-full opacity-80 hover:opacity-100"
      >
        <img
          className="h-[130px] w-full rounded-t-xl"
          src={value?.thumbnail}
        />
        <div className="rounded-b-xl flex flex-col justify-start items-start p-3 w-full bg-black">
          <p className="text-xs text-start silka-medium text-white">
            {value?.name?.length > 24
              ? `${value?.name?.substring(0, 24)}...`
              : value?.name}
          </p>
          <span className="text-[10px] text-start silka-regular mt-0.5 text-gray-100">
            {convertDateTime(value?.created_at)}
          </span>
        </div>
      </button>
    </div>
  );
}

export default function GetClips() {
  const [workspaceId, setWorkspaceId] = useState('');
  const [headerSection, setHeaderSection] = useState('Default');
  const [isLoading, setIsLoading] = useState(true);
  const [collections, setCollections] = useState<any>([]);
  const [selectFileOpen, setSelectFileOpen] = useState(false);
  const [file, setFile] = useState<any>(null);
  const [project, setProject] = useState<any>(null);
  const [projects, setProjects] = useState<any>([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [youtubeLink, setYoutubeLink] = useState('');
  const router = useRouter();
  const [youtubeData, setYoutubeData] = useState<any>(null);
  const [duration, setDuration] = useState(0);
  const [gettingClips, setGettingClips] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [url, setUrl] = useState('');
  const [isPremium, setIsPremium] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [proDialog, setProDialog] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (router.isReady) {
      setWorkspaceId(router.query.workspaceId as string);
    }
  }, [router.isReady]);

  useEffect(() => {
    if (workspaceId) {
      Promise.all([
        getCollections(workspaceId),
        getTime(workspaceId),
        getIsPremium(workspaceId),
      ]).then((results) => {
        setCollections(results[0]);
        setTimeLeft(results[1]?.value);
        setIsPremium(results[2]?.value);
        setIsLoading(false);
      });
    }
  }, [workspaceId]);

  useEffect(() => {
    if (file) {
      setHeaderSection('Selected');
      setStart(0);
      setEnd(file?.duration);
      setDuration(file?.duration);
      setName(file?.name);
      setType('type');
      setUrl(file?.url ? file?.url : file?.videoUrl);
    } else if (youtubeData) {
      setDuration(youtubeData?.duration);
      setName(youtubeData?.title);
      setStart(0);
      setEnd(youtubeData?.duration);
      setType('youtube');
    } else {
      setHeaderSection('Default');
      setName('');
      setType('');
    }
  }, [file, youtubeData]);

  return (
    <PageHead title="Get Clips · Disperse AI Tools">
      <div className="flex flex-col w-full">
        <header className="w-full bg-[#262626] flex flex-row justify-between items-between">
          <div className="my-auto">
            <button
              onClick={() => {
                Router.push(`/${workspaceId}/edit/tools`);
              }}
              className="p-3.5 hover:bg-[#363636]"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
                  fill="white"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <p className="my-auto text-sm silka-semibold text-white">
            Automatically Generate Clips
          </p>
          <div className="flex flex-row space-x-5">
            <HoverCardPrimitive.Root>
              <HoverCardPrimitive.Trigger asChild>
                {!isPremium && (
                  <button className="my-auto flex flex-row space-x-1.5">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="my-auto"
                    >
                      <path
                        d="M7.50009 0.877014C3.84241 0.877014 0.877258 3.84216 0.877258 7.49984C0.877258 11.1575 3.8424 14.1227 7.50009 14.1227C11.1578 14.1227 14.1229 11.1575 14.1229 7.49984C14.1229 3.84216 11.1577 0.877014 7.50009 0.877014ZM1.82726 7.49984C1.82726 4.36683 4.36708 1.82701 7.50009 1.82701C10.6331 1.82701 13.1729 4.36683 13.1729 7.49984C13.1729 10.6328 10.6331 13.1727 7.50009 13.1727C4.36708 13.1727 1.82726 10.6328 1.82726 7.49984ZM8 4.50001C8 4.22387 7.77614 4.00001 7.5 4.00001C7.22386 4.00001 7 4.22387 7 4.50001V7.50001C7 7.63262 7.05268 7.7598 7.14645 7.85357L9.14645 9.85357C9.34171 10.0488 9.65829 10.0488 9.85355 9.85357C10.0488 9.65831 10.0488 9.34172 9.85355 9.14646L8 7.29291V4.50001Z"
                        fill="#4ADE80"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <p className="text-sm my-auto silka-semibold text-[#4ADE80]">
                      {isLoading ? 'Loading...' : `${timeLeft}m`}
                    </p>
                  </button>
                )}
              </HoverCardPrimitive.Trigger>
              <HoverCardPrimitive.Content
                align="end"
                sideOffset={4}
                className={clsx(
                  ' radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
                  'max-w-md rounded-lg px-3 py-2 md:w-full',
                  'bg-[#363636]',
                  'focus:outline-none focus-visible:ring-0'
                )}
              >
                {!isPremium && (
                  <div className="flex flex-row space-x-2">
                    <p className="text-xs silka-semibold text-white">
                      Upgrade to PRO for more credits!
                    </p>
                  </div>
                )}
              </HoverCardPrimitive.Content>
            </HoverCardPrimitive.Root>
            {!isPremium && (
              <div>
                <DialogPrimitive.Root
                  open={proDialog}
                  onOpenChange={setProDialog}
                >
                  <DialogPrimitive.Trigger asChild>
                    <button className="h-full px-5 flex flex-row space-x-2 bg-[#FF623D] hover:opacity-90">
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
                          fill="white"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <p className="text-sm silka-medium text-white my-auto">
                        Upgrade
                      </p>
                    </button>
                  </DialogPrimitive.Trigger>
                  <ProUpgradeDialog
                    isOpen={proDialog}
                    setIsOpen={setProDialog}
                    workspaceId={workspaceId}
                    userId={String(session?.user?.id)}
                    userName={String(session?.user?.name)}
                    email={String(session?.user?.email)}
                  />
                </DialogPrimitive.Root>
              </div>
            )}
          </div>
        </header>
        <main className="mt-16 flex flex-col w-full pb-24">
          <section className="flex flex-col w-full">
            {headerSection === 'Default' ? (
              <div className="flex flex-col w-full justify-center items-center">
                <h2 className="text-4xl md:text-5xl text-center silka-bold text-[#363636]">
                  Get Clips with One Click
                </h2>
                <p className="mt-4 text-center text-sm md:text-base silka-regular text-gray-400">
                  Select a long Video to start getting clips.
                </p>
              </div>
            ) : (
              <div className="flex flex-col w-full justify-center items-center">
                <div>
                  <h1 className="text-4xl text-center silka-bold text-[#363636]">
                    Video Info
                  </h1>
                  <p className="mt-2.5 text-xs silka-medium text-gray-300">
                    Make sure everything is correct!
                  </p>
                </div>
                {youtubeData ? (
                  <>
                    <div className="flex mt-14 flex-col md:flex-row w-full md:w-4/5 xl:w-3/5 px-4 space-y-6 md:space-y-0 md:space-x-12">
                      <div className="w-full md:w-3/5 xl:w-1/2 flex flex-col bg-gray-50 rounded-lg justify-center items-center">
                        <img
                          src={youtubeData?.thumbnail}
                          className="max-h-[240px] md:max-h-[300px] rounded-lg"
                        />
                      </div>
                      <div className="w-full xl:w-1/2 flex flex-col">
                        <p className="text-sm silka-semibold text-gray-900">
                          Title
                        </p>
                        <span className="mt-1 text-sm md:text-base silka-regular text-gray-500">
                          {youtubeData?.title}
                        </span>
                        <p className="mt-4 text-sm silka-semibold text-gray-900">
                          Channel
                        </p>
                        <span className="mt-1 text-sm md:text-base silka-regular text-gray-500">
                          {youtubeData?.channel}
                        </span>
                        <p className="mt-4 text-sm silka-semibold text-gray-900">
                          Duration
                        </p>
                        <span className="mt-1 text-sm md:text-base silka-regular text-gray-500">
                          {formatTime(youtubeData?.duration)}
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex mt-14 flex-col md:flex-row w-full md:w-4/5 xl:w-3/5 px-4 space-y-6 md:space-y-0 md:space-x-12">
                      <div className="w-full md:w-3/5 flex flex-col bg-gray-50 rounded-lg justify-center items-center">
                        <video
                          src={file?.url ? file?.url : file?.videoUrl}
                          className="max-h-[280px] md:max-h-[300px] w-full bg-black rounded-lg"
                          controls
                        />
                      </div>
                      <div className="w-full md:w-1/2 flex flex-col">
                        <p className="text-xs md:text-sm silka-semibold text-gray-900">
                          Name
                        </p>
                        <span className="mt-1 tex-tsm md:text-base silka-regular text-gray-500">
                          {file?.name}
                        </span>
                        <p className="mt-4 text-xs md:text-sm silka-semibold text-gray-900">
                          Duration
                        </p>
                        <span className="mt-1 text-sm md:text-base silka-regular text-gray-500">
                          {formatTime(file?.duration)}
                        </span>
                      </div>
                    </div>
                  </>
                )}
                <div className="mt-12 flex flex-col px-4 justify-center items-center w-full">
                  <div className="w-full md:w-1/2 xl:w-2/5 flex flex-col justify-center items-center">
                    <p className="text-[#363636] silka-semibold w-full text-center text-base">
                      Cut specific timeframe
                    </p>
                    <div className="mt-5 flex flex-col justify-center items-center space-y-4 w-full">
                      <p className="text-sm silka-semibold">
                        {formatSeconds(
                          Number((end - start).toFixed(1))
                        )}
                      </p>
                      <div className="flex w-full flex-row space-x-4">
                        <p className="text-sm my-auto silka-medium text-[#363636]">
                          {formatTime(start)}
                        </p>
                        {/* @ts-ignore */}
                        <RangeSlider
                          aria-label={['min', 'max']}
                          colorScheme="orange"
                          defaultValue={[0, 10000000]}
                          min={0}
                          max={duration}
                          step={0.1}
                          className="px-16"
                          onChangeEnd={(val) => {
                            setStart(val[0]);
                            setEnd(val[1]);
                          }}
                        >
                          <RangeSliderTrack>
                            <RangeSliderFilledTrack />
                          </RangeSliderTrack>
                          <RangeSliderThumb index={0} />
                          <RangeSliderThumb
                            index={1}
                            className="h-full"
                          />
                        </RangeSlider>
                        <p className="text-sm my-auto silka-medium text-[#363636]">
                          {formatTime(end)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
          <section className="flex flex-col w-full justify-center items-center">
            {headerSection === 'Default' ? (
              <>
                {/*
                <div className="flex flex-row space-x-3 mt-12">
                  <input
                    value={youtubeLink}
                    onChange={(e) => {
                      setYoutubeLink(e.target.value);
                    }}
                    className="rounded border border-gray-300 text-sm silka-medium w-full md:w-[380px] focus:ring-0 focus:border-[#FF0000]"
                    type="text"
                    placeholder="Youtube link..."
                  />
                  <button
                    onClick={() => {
                      toast.loading('Getting Video...', {
                        className:
                          'text-sm silka-medium text-gray-900',
                        duration: 80000,
                      });
                      getYoutubeVideoInfo(youtubeLink).then(
                        (value) => {
                          if (
                            value?.value == 'Invalid Youtube Link'
                          ) {
                            toast.remove();
                            toast.error('Invalid YouTube Link', {
                              className:
                                'text-sm silka-medium text-gray-900',
                            });
                          } else {
                            toast.remove();
                            toast.success('Got Video Info!', {
                              className:
                                'text-sm silka-medium text-gray-900',
                            });
                            setYoutubeData(value?.value);
                            setHeaderSection('Youtube');
                          }
                        }
                      );
                    }}
                    className="bg-[#FF0000] px-5 py-1.5 rounded flex flex-row space-x-2 hover:opacity-90 justify-center items-center"
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="my-auto"
                    >
                      <g clipPath="url(#clip0_1583_2)">
                        <path
                          d="M19.615 3.18413C16.011 2.93813 7.984 2.93913 4.385 3.18413C0.488 3.45013 0.029 5.80412 0 12.0001C0.029 18.1851 0.484 20.5491 4.385 20.8161C7.985 21.0611 16.011 21.0621 19.615 20.8161C23.512 20.5501 23.971 18.1961 24 12.0001C23.971 5.81512 23.516 3.45113 19.615 3.18413ZM9 16.0001V8.00013L17 11.9931L9 16.0001Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1583_2">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <p className="text-xs silka-medium my-auto text-white">
                      Get Video
                    </p>
                  </button>
                </div>
                */}
                <div className="mt-8 flex flex-row space-x-6">
                  <label
                    htmlFor="file-upload"
                    className="bg-[#363636] px-5 py-1.5 flex flex-row space-x-2 rounded hover:opacity-90"
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
                        d="M7.81825 1.18188C7.64251 1.00615 7.35759 1.00615 7.18185 1.18188L4.18185 4.18188C4.00611 4.35762 4.00611 4.64254 4.18185 4.81828C4.35759 4.99401 4.64251 4.99401 4.81825 4.81828L7.05005 2.58648V9.49996C7.05005 9.74849 7.25152 9.94996 7.50005 9.94996C7.74858 9.94996 7.95005 9.74849 7.95005 9.49996V2.58648L10.1819 4.81828C10.3576 4.99401 10.6425 4.99401 10.8182 4.81828C10.994 4.64254 10.994 4.35762 10.8182 4.18188L7.81825 1.18188ZM2.5 9.99997C2.77614 9.99997 3 10.2238 3 10.5V12C3 12.5538 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5528 12 12V10.5C12 10.2238 12.2239 9.99997 12.5 9.99997C12.7761 9.99997 13 10.2238 13 10.5V12C13 13.104 12.1062 14 11.0012 14H3.99635C2.89019 14 2 13.103 2 12V10.5C2 10.2238 2.22386 9.99997 2.5 9.99997Z"
                        fill="white"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <p className="my-auto text-white silka-medium text-xs md:text-sm">
                      Upload File
                    </p>
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
                      <button className="flex px-5 py-1.5 rounded bg-[#Ff623d] hover:opacity-90 flex-row space-x-2">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 95 95"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="my-auto"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M73.3467 34.7604C73.4895 35.3016 73.4117 35.8772 73.1305 36.3611C72.8493 36.845 72.3876 37.1976 71.8467 37.3414C71.67 37.387 71.4882 37.4099 71.3057 37.4094C70.8406 37.4089 70.3887 37.2548 70.0202 36.9711C69.6516 36.6874 69.3871 36.2899 69.2677 35.8404C69.041 34.953 68.6403 34.1195 68.089 33.3881C67.5377 32.6568 66.8466 32.0422 66.0559 31.5799C65.2652 31.1177 64.3906 30.8171 63.4829 30.6954C62.5751 30.5738 61.6522 30.6336 60.7677 30.8714C60.4981 30.9465 60.2162 30.9672 59.9385 30.9322C59.6608 30.8972 59.3928 30.8073 59.1502 30.6678C58.9076 30.5282 58.6952 30.3417 58.5254 30.1192C58.3556 29.8967 58.2318 29.6426 58.1612 29.3718C58.0906 29.1009 58.0746 28.8188 58.1141 28.5417C58.1537 28.2646 58.248 27.9982 58.3916 27.7579C58.5351 27.5176 58.7251 27.3083 58.9504 27.1422C59.1757 26.9761 59.4317 26.8565 59.7037 26.7904C61.1231 26.4129 62.6031 26.3198 64.0585 26.5165C65.514 26.7132 66.9162 27.1958 68.1844 27.9366C69.4526 28.6773 70.5618 29.6616 71.4481 30.8327C72.3344 32.0038 72.9803 33.3387 73.3487 34.7604H73.3467ZM74.3467 74.2374C77.6303 74.2385 80.8007 73.0376 83.2597 70.8614C85.7186 68.6852 87.2959 65.6843 87.6939 62.4249C88.092 59.1655 87.2832 55.8731 85.4203 53.1691C83.5573 50.4652 80.7691 48.5366 77.5817 47.7474C77.2727 47.6702 76.9853 47.524 76.7409 47.3199C76.4965 47.1157 76.3014 46.8588 76.1705 46.5685C76.0395 46.2783 75.976 45.9621 75.9847 45.6437C75.9934 45.3254 76.0741 45.0131 76.2207 44.7304C78.0762 41.1514 78.4574 36.9883 77.2828 33.1318C76.1083 29.2753 73.4712 26.0315 69.9358 24.0943C66.4003 22.1571 62.2471 21.6803 58.3646 22.766C54.4822 23.8516 51.1786 26.4134 49.1607 29.9034L47.7607 32.3274C47.6064 32.5984 47.3936 32.8315 47.1379 33.01C46.8821 33.1885 46.5899 33.3077 46.2823 33.3592C45.9747 33.4106 45.6596 33.3929 45.3597 33.3073C45.0599 33.2217 44.7828 33.0704 44.5487 32.8644C42.8286 31.3555 40.7185 30.3613 38.4597 29.9955C36.201 29.6298 33.8849 29.9074 31.7766 30.7964C29.6682 31.6855 27.8527 33.1502 26.5379 35.0228C25.2231 36.8955 24.462 39.1004 24.3417 41.3854C24.3111 41.9232 24.0758 42.4288 23.6842 42.7987C23.2926 43.1685 22.7744 43.3745 22.2357 43.3744H21.6617C19.6248 43.358 17.6047 43.7451 15.7181 44.5132C13.8315 45.2814 12.1156 46.4154 10.6694 47.85C9.22325 49.2846 8.07541 50.9913 7.29209 52.8717C6.50878 54.752 6.10549 56.7689 6.10549 58.8059C6.10549 60.8429 6.50878 62.8598 7.29209 64.7402C8.07541 66.6205 9.22325 68.3272 10.6694 69.7618C12.1156 71.1964 13.8315 72.3305 15.7181 73.0986C17.6047 73.8668 19.6248 74.2538 21.6617 74.2374H74.3467ZM80.9577 44.4264C82.652 39.8105 82.5546 34.7272 80.6847 30.1797C78.8148 25.6321 75.3082 21.9506 70.857 19.8618C66.4057 17.7729 61.3332 17.4283 56.6404 18.8961C51.9475 20.3639 47.9754 23.5375 45.5077 27.7904L45.2877 28.1704C43.0108 26.7272 40.4132 25.8674 37.7248 25.6674C35.0364 25.4673 32.3402 25.933 29.8747 27.0233C27.4092 28.1136 25.2505 29.7949 23.5897 31.9183C21.9288 34.0418 20.817 36.5419 20.3527 39.1974C15.2638 39.5346 10.5053 41.837 7.08265 45.618C3.66 49.399 1.84132 54.3625 2.01087 59.4598C2.18043 64.557 4.32495 69.3887 7.9913 72.9339C11.6577 76.4791 16.5586 78.4601 21.6587 78.4584H74.3447C78.4406 78.4531 82.4073 77.0244 85.566 74.417C88.7247 71.8095 90.8791 68.1853 91.6604 64.1646C92.4417 60.1439 91.8013 55.9767 89.849 52.3761C87.8966 48.7754 84.7535 45.9652 80.9577 44.4264Z"
                            fill="white"
                          />
                        </svg>
                        <p className="text-white my-auto silka-medium text-xs md:text-sm">
                          Select From Cloud
                        </p>
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
              </>
            ) : (
              <div className="flex flex-row space-x-5 mt-14">
                <button
                  onClick={() => {
                    setFile(null);
                    setYoutubeData(null);
                    setYoutubeLink('');
                    setHeaderSection('Default');
                  }}
                  className="flex flex-row space-x-2 px-5 rounded bg-[#363636] justify-center items-center py-1.5 hover:opacity-90"
                >
                  <svg
                    width="16"
                    height="16"
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
                  <p className="text-xs md:text-sm silka-medium text-white my-auto">
                    New Video
                  </p>
                </button>
                <button
                  disabled={gettingClips}
                  onClick={() => {
                    setGettingClips(true);
                    createCollection(
                      workspaceId,
                      type,
                      youtubeLink,
                      name,
                      url,
                      start,
                      end,
                      isPremium
                    ).then((value) => {
                      if (
                        value?.message != 'error' &&
                        value?.message != 'duration'
                      ) {
                        getClips(
                          value?.id,
                          workspaceId,
                          duration,
                          start,
                          end,
                          String(session?.user?.email)
                        );
                        setGettingClips(false);
                        Router.push(
                          `/${workspaceId}/ai-tools/get-clips/${value?.id}`
                        );
                      } else if (value?.message == 'duration') {
                        setGettingClips(false);
                      }
                    });
                  }}
                  className="flex flex-row space-x-3 px-5 rounded bg-[#FF623D] justify-center items-center py-1.5 hover:opacity-90"
                >
                  {gettingClips ? (
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="animate-spin"
                    >
                      <g clipPath="url(#clip0_1405_2)">
                        <path
                          d="M4.84457 21.6005C4.13345 21.0227 3.95568 20.0005 4.53345 19.2449C5.11123 18.5338 6.13345 18.3116 6.88901 18.8894C7.24457 19.1116 7.55568 19.3783 7.95568 19.556C11.289 21.3783 15.4223 20.756 18.089 18.0449C18.7557 17.3783 19.7779 17.3783 20.4446 18.0449C21.0668 18.7116 21.0668 19.7783 20.4446 20.4005C16.7112 24.1783 10.9335 25.1116 6.31123 22.5338C5.7779 22.2671 5.28901 21.9116 4.84457 21.6005Z"
                          fill="#ffffff"
                        />
                        <path
                          d="M23.8224 13.9555C23.6891 14.8888 22.8002 15.511 21.8669 15.3777C20.9335 15.2444 20.3558 14.3555 20.4891 13.4221C20.578 12.9332 20.578 12.4444 20.578 11.9555C20.578 8.0888 18.0446 4.75547 14.4891 3.73325C13.6002 3.51103 13.0669 2.53325 13.3335 1.64436C13.6002 0.755471 14.4891 0.222137 15.4224 0.488804C20.4446 1.95547 23.9558 6.62214 23.9558 11.9999C23.9558 12.6666 23.9113 13.3332 23.8224 13.9555Z"
                          fill="#ffffff"
                        />
                        <path
                          d="M7.42222 0.843445C8.26667 0.487889 9.24445 0.932334 9.55556 1.82122C9.86667 2.71011 9.46667 3.68789 8.62222 4.04344C5.42222 5.33233 3.28889 8.48789 3.28889 12.0879C3.28889 12.799 3.37778 13.5101 3.55556 14.1768C3.77778 15.0657 3.24444 15.999 2.35556 16.2212C1.46667 16.4434 0.577778 15.9101 0.355556 14.9768C0.133333 13.999 0 13.0212 0 12.0434C0 7.02122 2.97778 2.62122 7.42222 0.843445Z"
                          fill="#ffffff"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1405_2">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  ) : (
                    <>
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="my-auto"
                      >
                        <path
                          d="M13.9 0.499976C13.9 0.279062 13.7209 0.0999756 13.5 0.0999756C13.2791 0.0999756 13.1 0.279062 13.1 0.499976V1.09998H12.5C12.2791 1.09998 12.1 1.27906 12.1 1.49998C12.1 1.72089 12.2791 1.89998 12.5 1.89998H13.1V2.49998C13.1 2.72089 13.2791 2.89998 13.5 2.89998C13.7209 2.89998 13.9 2.72089 13.9 2.49998V1.89998H14.5C14.7209 1.89998 14.9 1.72089 14.9 1.49998C14.9 1.27906 14.7209 1.09998 14.5 1.09998H13.9V0.499976ZM11.8536 3.14642C12.0488 3.34168 12.0488 3.65826 11.8536 3.85353L10.8536 4.85353C10.6583 5.04879 10.3417 5.04879 10.1465 4.85353C9.9512 4.65827 9.9512 4.34169 10.1465 4.14642L11.1464 3.14643C11.3417 2.95116 11.6583 2.95116 11.8536 3.14642ZM9.85357 5.14642C10.0488 5.34168 10.0488 5.65827 9.85357 5.85353L2.85355 12.8535C2.65829 13.0488 2.34171 13.0488 2.14645 12.8535C1.95118 12.6583 1.95118 12.3417 2.14645 12.1464L9.14646 5.14642C9.34172 4.95116 9.65831 4.95116 9.85357 5.14642ZM13.5 5.09998C13.7209 5.09998 13.9 5.27906 13.9 5.49998V6.09998H14.5C14.7209 6.09998 14.9 6.27906 14.9 6.49998C14.9 6.72089 14.7209 6.89998 14.5 6.89998H13.9V7.49998C13.9 7.72089 13.7209 7.89998 13.5 7.89998C13.2791 7.89998 13.1 7.72089 13.1 7.49998V6.89998H12.5C12.2791 6.89998 12.1 6.72089 12.1 6.49998C12.1 6.27906 12.2791 6.09998 12.5 6.09998H13.1V5.49998C13.1 5.27906 13.2791 5.09998 13.5 5.09998ZM8.90002 0.499976C8.90002 0.279062 8.72093 0.0999756 8.50002 0.0999756C8.2791 0.0999756 8.10002 0.279062 8.10002 0.499976V1.09998H7.50002C7.2791 1.09998 7.10002 1.27906 7.10002 1.49998C7.10002 1.72089 7.2791 1.89998 7.50002 1.89998H8.10002V2.49998C8.10002 2.72089 8.2791 2.89998 8.50002 2.89998C8.72093 2.89998 8.90002 2.72089 8.90002 2.49998V1.89998H9.50002C9.72093 1.89998 9.90002 1.72089 9.90002 1.49998C9.90002 1.27906 9.72093 1.09998 9.50002 1.09998H8.90002V0.499976Z"
                          fill="white"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <p className="text-xs md:text-sm silka-medium text-white my-auto">
                        Get Clips
                      </p>
                    </>
                  )}
                </button>
              </div>
            )}
          </section>
          <section className="mt-20 flex flex-col justify-center items-center w-full">
            <div className="w-full md:w-3/4 lg:w-3/5 flex flex-col">
              <div className="flex flex-col px-4">
                <h2 className="silka-bold text-[#363636]">
                  Past Clip Collections
                </h2>
                <p className="text-xs silka-regular text-gray-400 mt-1.5">
                  Past collections of videos with clips extracted.
                </p>
              </div>
              {isLoading ? (
                <div className="w-full flex flex-col space-y-2.5 mt-4">
                  <div className="w-full h-[20px] rounded bg-gray-200 animate-pulse" />
                  <div className="w-[85%] h-[20px] rounded bg-gray-200 animate-pulse" />
                  <div className="w-[70%] h-[20px] rounded bg-gray-200 animate-pulse" />
                </div>
              ) : collections?.length == 0 ? (
                <div className="border border-dashed border-gray-300 rounded-xl flex flex-col justify-center items-center w-full py-16 mt-7">
                  <div className="flex flex-col">
                    <div className="p-2.5 w-fit rounded-full bg-[#F6EEEC]">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 50 50"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_1585_2)">
                          <path
                            d="M25 50C21.287 50 17.726 48.525 15.1005 45.8995C12.475 43.274 11 39.713 11 36V10.5C11 7.71523 12.1062 5.04451 14.0754 3.07538C16.0445 1.10625 18.7152 0 21.5 0C24.2848 0 26.9555 1.10625 28.9246 3.07538C30.8938 5.04451 32 7.71523 32 10.5V29C32 30.8565 31.2625 32.637 29.9497 33.9497C28.637 35.2625 26.8565 36 25 36C23.1435 36 21.363 35.2625 20.0503 33.9497C18.7375 32.637 18 30.8565 18 29V21C18 20.4696 18.2107 19.9609 18.5858 19.5858C18.9609 19.2107 19.4696 19 20 19C20.5304 19 21.0391 19.2107 21.4142 19.5858C21.7893 19.9609 22 20.4696 22 21V29C22 29.7956 22.3161 30.5587 22.8787 31.1213C23.4413 31.6839 24.2044 32 25 32C25.7956 32 26.5587 31.6839 27.1213 31.1213C27.6839 30.5587 28 29.7956 28 29V10.5C28 8.77609 27.3152 7.12279 26.0962 5.90381C24.8772 4.68482 23.2239 4 21.5 4C19.7761 4 18.1228 4.68482 16.9038 5.90381C15.6848 7.12279 15 8.77609 15 10.5V36C15 38.6522 16.0536 41.1957 17.9289 43.0711C19.8043 44.9464 22.3478 46 25 46C27.6522 46 30.1957 44.9464 32.0711 43.0711C33.9464 41.1957 35 38.6522 35 36V14C35 13.4696 35.2107 12.9609 35.5858 12.5858C35.9609 12.2107 36.4696 12 37 12C37.5304 12 38.0391 12.2107 38.4142 12.5858C38.7893 12.9609 39 13.4696 39 14V36C39 39.713 37.525 43.274 34.8995 45.8995C32.274 48.525 28.713 50 25 50Z"
                            fill="#FF623D"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1585_2">
                            <rect
                              width="28"
                              height="50"
                              fill="white"
                              transform="translate(11)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>
                  <h2 className="text-lg mt-4 silka-semibold text-[#363636]">
                    No Collections Yet!
                  </h2>
                  <p className="mt-1 text-xs silka-regular text-gray-400">
                    Select a video to create clips from.
                  </p>
                </div>
              ) : (
                <div className="w-full flex mt-4 flex-row flex-wrap">
                  {collections
                    ?.sort((a: any, b: any) => {
                      return (
                        new Date(b.created_at).getTime() -
                        new Date(a.created_at).getTime()
                      );
                    })
                    .map((collection: any, index: number) => {
                      return (
                        <CollectionComponent
                          value={collection}
                          key={index}
                          workspaceId={workspaceId}
                        />
                      );
                    })}
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </PageHead>
  );
}
