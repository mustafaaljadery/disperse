import {
  useState,
  useEffect,
  Fragment,
  Dispatch,
  SetStateAction,
} from 'react';
import { Transition } from '@headlessui/react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { clsx } from 'clsx';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../../utils/apiUrl';
import { Scroll } from '../../utils/Scroll';
import toast from 'react-hot-toast';
import { ToolbarSeparator } from '@radix-ui/react-toolbar';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setRefetchVideos: Dispatch<SetStateAction<boolean>>;
  workspaceId: string;
  userId: string;
  date: string;
  time: string;
}

interface SecondComponentProps {
  value: any;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setRefetchVideos: Dispatch<SetStateAction<boolean>>;
  workspaceId: string;
  userId: string;
  date: string;
  time: string;
}

async function scheduleVideo(
  workspaceId: string,
  userId: string,
  draftId: string,
  date: string,
  time: string
) {
  try {
    axiosRetry(axios, { retries: 3 });

    toast.loading('Scheduling Video...', {
      className: 'text-sm silka-medium text-gray-900',
      duration: 80000,
    });

    const result = await axios.post(
      `${apiUrl()}youtube/create/scheduledvideo`,
      null,
      {
        params: {
          workspaceId: workspaceId,
          userId: userId,
          draftId: draftId,
          date: date,
          time: time,
        },
      }
    );
    if (result.data.message == 'success') {
      toast.remove();
      toast.success('Video successfully scheduled!', {
        className: 'text-sm silka-medium text-gray-900',
      });
    } else {
      toast.remove();
      toast.error('Error scheduling video, please try again.', {
        className: 'text-sm silka-medium text-gray-900',
      });
    }
    return result.data;
  } catch (e) {
    toast.remove();
    toast.error('Error scheduling video, please try again.', {
      className: 'text-sm silka-medium text-gray-900',
    });
    console.log(e);
  }
}

async function scheduleShort(
  workspaceId: string,
  userId: string,
  draftId: string,
  date: string,
  time: string
) {
  try {
    axiosRetry(axios, { retries: 3 });

    toast.loading('Scheduling Short...', {
      className: 'text-sm silka-medium text-gray-900',
      duration: 80000,
    });

    const result = await axios.post(
      `${apiUrl()}youtube/create/scheduledshort`,
      null,
      {
        params: {
          workspaceId: workspaceId,
          userId: userId,
          draftId: draftId,
          date: date,
          time: time,
        },
      }
    );
    if (result.data.message == 'success') {
      toast.remove();
      toast.success('Short successfully scheduled!', {
        className: 'text-sm silka-medium text-gray-900',
      });
    } else {
      toast.remove();
      toast.error('Error scheduling short, please try again.', {
        className: 'text-sm silka-medium text-gray-900',
      });
    }
    return result.data;
  } catch (e) {
    toast.remove();
    toast.error('Error scheduling short, please try again.', {
      className: 'text-sm silka-medium text-gray-900',
    });
    console.log(e);
  }
}

async function getThumbnail(fileId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}youtube/read/thumbnail`,
      {
        params: { fileId: fileId },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function getDraftVideos(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}youtube/read/videosdrafts`,
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

async function getDraftShorts(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}youtube/read/shortsdrafts`,
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

function VideoComponent({
  value,
  setIsOpen,
  setRefetchVideos,
  workspaceId,
  userId,
  date,
  time,
}: SecondComponentProps) {
  const [thumbnail, setThumbnail] = useState<any>(null);
  const [thumbnailLoading, setThumbnailLoading] = useState(true);

  useEffect(() => {
    if (
      value.thumbnailFileId != null &&
      value.thumbnailFileId != 'undefined'
    ) {
      setThumbnailLoading(true);
      getThumbnail(value.thumbnailFileId).then((value) => {
        setThumbnail(value.url);
        setThumbnailLoading(false);
      });
    } else {
      setThumbnailLoading(false);
    }
  }, [value.thumbnailFileId]);

  return (
    <div className="p-2 w-1/3">
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(false);
          scheduleVideo(
            workspaceId,
            userId,
            value.id,
            date,
            time
          ).then(() => {
            setRefetchVideos(true);
          });
        }}
        className="w-full h-full border rounded-lg p-3 hover:border-[#FF0000] flex flex-col"
      >
        {thumbnailLoading ? (
          <div className="bg-gray-50 h-20 w-full rounded flex flex-col justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="animate-spin"
              width="13px"
              height="13px"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid"
            >
              <circle
                cx="50"
                cy="50"
                fill="none"
                stroke="#FF0000"
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
          <>
            {value.thumbnailFileId ? (
              <img src={thumbnail} className="h-20 w-full rounded" />
            ) : (
              <div className="h-20 bg-gray-100 w-full rounded flex flex-col justify-center items-center">
                <p className="text-[10px] silka-regular text-gray-500">
                  No Thumbnail Selected
                </p>
              </div>
            )}
          </>
        )}
        {!value?.title || value.title.length == 0 ? (
          <p className="text-xs mt-2 text-start silka-medium text-gray-400 italic">
            No video title
          </p>
        ) : (
          <p className="text-xs mt-2 text-start silka-medium text-gray-800 break-all ">
            <>
              {value?.title?.length > 48
                ? value.title.slice(0, 48) + '...'
                : value.title}
            </>
          </p>
        )}
        <hr className="w-full mt-3" />
        <p className="mt-2 text-[9px] silka-regular text-gray-400">
          {formatDate(value.created_at)}
        </p>
      </button>
    </div>
  );
}

function ShortComponent({
  value,
  setIsOpen,
  setRefetchVideos,
  workspaceId,
  userId,
  time,
  date,
}: SecondComponentProps) {
  const [thumbnail, setThumbnail] = useState<any>(null);
  const [thumbnailLoading, setThumbnailLoading] = useState(true);

  useEffect(() => {
    if (
      value.thumbnailFileId != null &&
      value.thumbnailFileId != 'undefined'
    ) {
      setThumbnailLoading(true);
      getThumbnail(value.thumbnailFileId).then((value) => {
        setThumbnail(value.url);
        setThumbnailLoading(false);
      });
    } else {
      setThumbnailLoading(false);
    }
  }, [value.thumbnailFileId]);

  return (
    <div className="p-2 w-1/3">
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(false);
          scheduleShort(
            workspaceId,
            userId,
            value.id,
            date,
            time
          ).then(() => {
            setRefetchVideos(true);
          });
        }}
        className="w-full h-full border rounded-lg p-3 hover:border-[#FF0000] flex flex-col"
      >
        {thumbnailLoading ? (
          <div className="flex flex-col justify-center items-center">
            <div className="bg-gray-50 h-[143px] w-[80px] rounded flex flex-col justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="animate-spin"
                width="13px"
                height="13px"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
              >
                <circle
                  cx="50"
                  cy="50"
                  fill="none"
                  stroke="#FF0000"
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
          </div>
        ) : (
          <div className="flex w-full flex-col justify-center items-center">
            {value.thumbnailFileId ? (
              <img
                src={thumbnail}
                className="flex flex-col justify-center items-center h-[143px] w-[80px] rounded"
              />
            ) : (
              <div className="h-[143px] w-[80px] bg-gray-100 rounded flex flex-col justify-center items-center">
                <p className="text-[8px] silka-regular text-gray-500">
                  No Thumbnail Selected
                </p>
              </div>
            )}
          </div>
        )}
        {!value?.title || value.title.length == 0 ? (
          <p className="text-xs mt-2 text-start silka-medium text-gray-400 italic">
            No short title
          </p>
        ) : (
          <p className="text-xs mt-2 text-start silka-medium text-gray-800 break-all ">
            <>
              {value?.title?.length > 48
                ? value.title.slice(0, 48) + '...'
                : value.title}
            </>
          </p>
        )}
        <hr className="w-full mt-3" />
        <p className="mt-2 text-[9px] silka-regular text-gray-400">
          {formatDate(value.created_at)}
        </p>
      </button>
    </div>
  );
}

export function YoutubePickVideo({
  isOpen,
  setIsOpen,
  setRefetchVideos,
  workspaceId,
  userId,
  date,
  time,
}: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [formatSelected, setFormatSelected] = useState('Video');
  const [draftVideoData, setDraftVideoData] = useState<any>(null);
  const [draftShortData, setDraftShortData] = useState<any>(null);

  useEffect(() => {
    setIsLoading(true);
    if (formatSelected == 'Video') {
      getDraftVideos(workspaceId).then((value) => {
        setDraftVideoData(value);
        setIsLoading(false);
      });
    } else {
      getDraftShorts(workspaceId).then((value) => {
        console.log(value);
        setDraftShortData(value);
        setIsLoading(false);
      });
    }
  }, [formatSelected]);

  return (
    <DialogPrimitive.Portal forceMount>
      <Transition.Root show={isOpen}>
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
              'w-[95vw] max-w-2xl rounded-lg py-4 px-1 md:w-full',
              'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
              'bg-white',
              'focus:outline-none focus-visible:ring-0'
            )}
          >
            <DialogPrimitive.Title className="text-lg px-3 silka-semibold text-gray-900">
              {`Select Draft ${formatSelected} to Schedule`}
            </DialogPrimitive.Title>
            <div className="mt-3 flex flex-col space-y-5">
              <div className="flex flex-row space-x-3 px-3">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setFormatSelected('Video');
                  }}
                  className={
                    'text-xs silka-medium rounded px-3 py-1 hover:bg-gray-50 ' +
                    (formatSelected == 'Video'
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-500')
                  }
                >
                  Videos
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setFormatSelected('Short');
                  }}
                  className={
                    'text-xs silka-medium rounded px-3 py-1 hover:bg-gray-50 ' +
                    (formatSelected == 'Short'
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-500')
                  }
                >
                  Shorts
                </button>
              </div>
              {isLoading ? (
                <div className="flex flex-col justify-center items-center h-[400px]">
                  <div className="flex flex-row space-x-4">
                    <span className="animate-ping h-3 w-3 my-auto rounded-full bg-[#FF0000] opacity-75"></span>
                    <p className="text-sm my-auto silka-medium text-gray-800">
                      Fetching drafts...
                    </p>
                  </div>
                </div>
              ) : (
                <div className="h-[400px]">
                  <Scroll>
                    <div className="flex w-full flex-row px-3 flex-wrap">
                      {formatSelected == 'Video' ? (
                        <>
                          {draftVideoData.length == 0 ? (
                            <div className="flex flex-col h-[400px] w-full p-5 border border-dashed border-gray-300 rounded-lg justify-center items-center">
                              <div className="p-2.5 bg-[#F6E7E7] rounded-full">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fill="#ff0000"
                                    d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
                                  />
                                </svg>
                              </div>
                              <p className="mt-3 silka-semibold text-gray-900 text-base">
                                No Videos Found
                              </p>
                              <span className="mt-1.5 silka-regular text-xs text-gray-400">
                                Create a draft video to schedule it
                                here.
                              </span>
                            </div>
                          ) : (
                            <>
                              {draftVideoData
                                ?.sort(function (a: any, b: any) {
                                  return (
                                    new Date(b.created_at).getTime() -
                                    new Date(a.created_at).getTime()
                                  );
                                })
                                ?.map((value: any, index: number) => {
                                  return (
                                    <VideoComponent
                                      value={value}
                                      key={index}
                                      setIsOpen={setIsOpen}
                                      setRefetchVideos={
                                        setRefetchVideos
                                      }
                                      workspaceId={workspaceId}
                                      userId={userId}
                                      date={date}
                                      time={time}
                                    />
                                  );
                                })}
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          {draftShortData?.length == 0 ? (
                            <div className="flex flex-col h-[400px] w-full p-5 border border-dashed border-gray-300 rounded-lg justify-center items-center">
                              <div className="p-2.5 bg-[#F6E7E7] rounded-full">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fill="#ff0000"
                                    d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
                                  />
                                </svg>
                              </div>
                              <p className="mt-3 silka-semibold text-gray-900 text-base">
                                No Shorts Found
                              </p>
                              <span className="mt-1.5 silka-regular text-xs text-gray-400">
                                Create a draft short to schedule it
                                here.
                              </span>
                            </div>
                          ) : (
                            <>
                              {draftShortData
                                ?.sort(function (a: any, b: any) {
                                  return (
                                    new Date(b.created_at).getTime() -
                                    new Date(a.created_at).getTime()
                                  );
                                })
                                ?.map((value: any, index: number) => {
                                  return (
                                    <ShortComponent
                                      value={value}
                                      key={index}
                                      setIsOpen={setIsOpen}
                                      setRefetchVideos={
                                        setRefetchVideos
                                      }
                                      workspaceId={workspaceId}
                                      userId={userId}
                                      date={date}
                                      time={time}
                                    />
                                  );
                                })}
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </Scroll>
                </div>
              )}
            </div>
          </DialogPrimitive.Content>
        </Transition.Child>
      </Transition.Root>
    </DialogPrimitive.Portal>
  );
}
