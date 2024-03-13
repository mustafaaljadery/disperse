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

interface Props {
  workspaceId: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setRefetchPosts: Dispatch<SetStateAction<boolean>>;
  userId: string;
  date: string;
  time: string;
}

interface SecondComponentProps {
  value: any;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setRefetchPosts: Dispatch<SetStateAction<boolean>>;
  workspaceId: string;
  userId: string;
  date: string;
  time: string;
}

async function scheduleImage(
  workspaceId: string,
  userId: string,
  draftId: string,
  date: string,
  time: string
) {
  try {
    axiosRetry(axios, { retries: 3 });

    toast.loading('Scheduling Image...', {
      className: 'text-sm silka-medium text-gray-900',
      duration: 80000,
    });

    const result = await axios.post(
      `${apiUrl()}instagram/create/scheduledimage`,
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
    if (result.data.message === 'success') {
      toast.remove();
      toast.success('Image successfully scheduled!', {
        className: 'text-sm silka-medium text-gray-900',
      });
    } else {
      toast.remove();
      toast.error('Error scheduling image, please try again.', {
        className: 'text-sm silka-medium text-gray-900',
      });
    }
    return result.data;
  } catch (e) {
    toast.remove();
    toast.error('Error scheduling image, please try again.', {
      className: 'text-sm silka-medium text-gray-900',
    });
    console.log(e);
  }
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
      `${apiUrl()}instagram/create/scheduledvideo`,
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
    if (result.data.message === 'success') {
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

async function scheduleCarousel(
  workspaceId: string,
  userId: string,
  draftId: string,
  date: string,
  time: string
) {
  try {
    toast.loading('Scheduling Carousel...', {
      className: 'text-sm silka-medium text-gray-900',
      duration: 80000,
    });

    axiosRetry(axios, { retries: 3 });

    const result = await axios.post(
      `${apiUrl()}instagram/create/scheduledcarousel`,
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
    if (result.data.message === 'success') {
      // Refetch the time slots
      toast.remove();
      toast.success('Carousel successfully scheduled!', {
        className: 'text-sm silka-medium text-gray-900',
      });
    } else {
      toast.remove();
      toast.error('Error scheduling carousel, please try again.', {
        className: 'text-sm silka-medium text-gray-900',
      });
    }
    return result.data;
  } catch (e) {
    toast.remove();
    toast.error('Error scheduling carousel, please try again.', {
      className: 'text-sm silka-medium text-gray-900',
    });
    console.log(e);
  }
}

async function scheduleReel(
  workspaceId: string,
  userId: string,
  draftId: string,
  date: string,
  time: string
) {
  try {
    axiosRetry(axios, { retries: 3 });

    toast.loading('Scheduling Reel...', {
      className: 'text-sm silka-medium text-gray-900',
      duration: 80000,
    });

    const result = await axios.post(
      `${apiUrl()}instagram/create/scheduledreel`,
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
    if (result.data.message === 'success') {
      toast.remove();
      toast.success('Reel successfully scheduled!', {
        className: 'text-sm silka-medium text-gray-900',
      });
    } else {
      toast.remove();
      toast.error('Error scheduling reel, please try again.', {
        className: 'text-sm silka-medium text-gray-900',
      });
    }
    return result.data;
  } catch (e) {
    toast.remove();
    toast.error('Error scheduling reel, please try again.', {
      className: 'text-sm silka-medium text-gray-900',
    });
    console.log(e);
  }
}

async function getDraftImages(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}instagram/read/imagedrafts`,
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

async function getDraftVideos(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}instagram/read/videodrafts`,
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

async function getDraftReels(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}instagram/read/reeldrafts`,
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

async function getDraftCarousels(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}instagram/read/carouseldrafts`,
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

function ImageComponent({
  value,
  setIsOpen,
  setRefetchPosts,
  workspaceId,
  userId,
  time,
  date,
}: SecondComponentProps) {
  return (
    <div className="p-2 w-1/3">
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(false);
          scheduleImage(
            workspaceId,
            userId,
            value.id,
            date,
            time
          ).then((res) => {
            setRefetchPosts(true);
          });
        }}
        className="w-full h-full border rounded-lg p-3 hover:border-[#F604D0] flex flex-col"
      >
        {value.image == 'yes' ? (
          <img
            src={value.google_url}
            className="h-20 w-full rounded"
          />
        ) : (
          <div className="h-20 bg-gray-100 w-full rounded flex flex-col justify-center items-center">
            <p className="text-[10px] silka-regular text-gray-500">
              No Image Selected
            </p>
          </div>
        )}
        {!value?.text || value.text.length == 0 ? (
          <p className="text-xs mt-2 text-start silka-medium text-gray-400 italic">
            No image text
          </p>
        ) : (
          <p className="text-xs mt-2 text-start silka-medium text-gray-800 break-all ">
            <>
              {value?.text?.length > 48
                ? value.text.slice(0, 48) + '...'
                : value.text}
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

function VideoComponent({
  value,
  setIsOpen,
  setRefetchPosts,
  workspaceId,
  userId,
  time,
  date,
}: SecondComponentProps) {
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
          ).then((res) => {
            setRefetchPosts(true);
          });
        }}
        className="w-full h-full border rounded-lg p-3 hover:border-[#F604D0] flex flex-col"
      >
        {value.video == 'yes' ? (
          <img
            src={value.google_url}
            className="h-20 w-full rounded"
          />
        ) : (
          <div className="h-20 bg-gray-100 w-full rounded flex flex-col justify-center items-center">
            <p className="text-[10px] silka-regular text-gray-500">
              No Video Selected
            </p>
          </div>
        )}
        {!value?.text || value.text.length == 0 ? (
          <p className="text-xs mt-2 text-start silka-medium text-gray-400 italic">
            No video text
          </p>
        ) : (
          <p className="text-xs mt-2 text-start silka-medium text-gray-800 break-all ">
            <>
              {value?.text?.length > 48
                ? value.text.slice(0, 48) + '...'
                : value.text}
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

function ReelComponent({
  value,
  setIsOpen,
  setRefetchPosts,
  workspaceId,
  userId,
  time,
  date,
}: SecondComponentProps) {
  return (
    <div className="p-2 w-1/3">
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(false);
          scheduleReel(
            workspaceId,
            userId,
            value.id,
            date,
            time
          ).then((res) => {
            setRefetchPosts(true);
          });
        }}
        className="w-full h-full border rounded-lg p-3 hover:border-[#F604D0] flex flex-col"
      >
        {value.video == 'yes' ? (
          <div className="w-full flex flex-col justify-center items-center">
            <img
              src={value.google_url}
              className="h-[143px] w-[80px] rounded"
            />
          </div>
        ) : (
          <div className="w-full flex flex-col justify-center items-center">
            <div className="h-[143px] bg-gray-100 w-[80px] rounded flex flex-col justify-center items-center">
              <p className="text-[8px] silka-regular text-gray-500">
                No Reel Selected
              </p>
            </div>
          </div>
        )}
        {!value?.text || value.text.length == 0 ? (
          <p className="text-xs mt-2 text-start silka-medium text-gray-400 italic">
            No reel text
          </p>
        ) : (
          <p className="text-xs mt-2 text-start silka-medium text-gray-800 break-all ">
            <>
              {value?.text?.length > 48
                ? value.text.slice(0, 48) + '...'
                : value.text}
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

function CarouselComponent({
  value,
  setIsOpen,
  setRefetchPosts,
  workspaceId,
  userId,
  date,
  time,
}: SecondComponentProps) {
  return (
    <div className="p-2 w-1/3">
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(false);
          scheduleCarousel(
            workspaceId,
            userId,
            value.id,
            date,
            time
          ).then((res) => {
            setRefetchPosts(true);
          });
        }}
        className="w-full h-full border rounded-lg p-3 hover:border-[#F604D0] flex flex-col"
      >
        {value.image == 'yes' ? (
          <img
            className="h-20 w-full rounded"
            src={value.google_url}
          />
        ) : (
          <div className="h-20 bg-gray-100 w-full rounded flex flex-col justify-center items-center">
            <p className="text-[10px] silka-regular text-gray-500">
              No Image Selected
            </p>
          </div>
        )}
        {!value?.text || value.text.length == 0 ? (
          <p className="text-xs mt-2 text-start silka-medium text-gray-400 italic">
            No carousel text
          </p>
        ) : (
          <p className="text-xs mt-2 text-start silka-medium text-gray-800 break-all ">
            <>
              {value?.text?.length > 48
                ? value.text.slice(0, 48) + '...'
                : value.text}
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

export function InstagramPickPost({
  workspaceId,
  isOpen,
  setIsOpen,
  setRefetchPosts,
  userId,
  date,
  time,
}: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [formatSelected, setFormatSelected] = useState('Images');
  const [draftImageData, setDraftImageData] = useState<any>(null);
  const [draftVideoData, setDraftVideoData] = useState<any>(null);
  const [draftReelData, setDraftReelData] = useState<any>(null);
  const [draftCarouselData, setDraftCarouselData] =
    useState<any>(null);

  useEffect(() => {
    setIsLoading(true);
    if (formatSelected == 'Images') {
      getDraftImages(workspaceId).then((value) => {
        setDraftImageData(value);
        setIsLoading(false);
      });
    } else if (formatSelected == 'Videos') {
      getDraftVideos(workspaceId).then((value) => {
        setDraftVideoData(value);
        setIsLoading(false);
      });
    } else if (formatSelected == 'Reels') {
      getDraftReels(workspaceId).then((value) => {
        setDraftReelData(value);
        setIsLoading(false);
      });
    } else {
      getDraftCarousels(workspaceId).then((value) => {
        setDraftCarouselData(value);
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
              'w-[95vw] max-w-2xl rounded-lg p-4 md:w-full',
              'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
              'bg-white',
              'focus:outline-none focus-visible:ring-0'
            )}
          >
            <DialogPrimitive.Title className="text-lg silka-semibold text-gray-900">
              Select Draft Post to Schedule
            </DialogPrimitive.Title>
            <div className="mt-3 flex flex-col w-full space-y-5">
              <div className="flex flex-row space-x-3">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setFormatSelected('Images');
                  }}
                  className={
                    'text-xs silka-medium rounded px-3 py-1 hover:bg-gray-50 ' +
                    (formatSelected == 'Images'
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-500')
                  }
                >
                  Images
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setFormatSelected('Videos');
                  }}
                  className={
                    'text-xs silka-medium rounded px-3 py-1 hover:bg-gray-50 ' +
                    (formatSelected == 'Videos'
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-500')
                  }
                >
                  Videos
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setFormatSelected('Reels');
                  }}
                  className={
                    'text-xs silka-medium rounded px-3 py-1 hover:bg-gray-50 ' +
                    (formatSelected == 'Reels'
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-500')
                  }
                >
                  Reels
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setFormatSelected('Carousels');
                  }}
                  className={
                    'text-xs silka-medium rounded px-3 py-1 hover:bg-gray-50 ' +
                    (formatSelected == 'Carousels'
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-500')
                  }
                >
                  Carousels
                </button>
              </div>
              {isLoading ? (
                <div className="mt-4 flex h-[400px] flex-col space-y-2">
                  <div className="w-full h-5 bg-gray-200 rounded animate-pulse" />
                  <div className="w-[85%] h-5 bg-gray-200 rounded animate-pulse" />
                  <div className="w-[70%] h-5 bg-gray-200 rounded animate-pulse" />
                </div>
              ) : (
                <div className="flex flex-row w-full flex-wrap h-[400px]">
                  <Scroll>
                    <div className="flex flex-row w-full flex-wrap">
                      {formatSelected == 'Images' ? (
                        <>
                          {draftImageData.length == 0 ? (
                            <div className="flex flex-col h-[400px] w-full p-5 border border-dashed border-gray-300 rounded-lg justify-center items-center">
                              <div className="p-2.5 bg-[#F0E9F0] rounded-full">
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g clipPath="url(#clip0_837_55)">
                                    <path
                                      d="M14.0419 0H5.95811C2.67279 0 0 2.67279 0 5.95811V14.0419C0 17.3272 2.67279 20 5.95811 20H14.0419C17.3272 20 20 17.3272 20 14.0419V5.95811C20 2.67279 17.3272 0 14.0419 0ZM17.988 14.0419C17.988 16.2212 16.2212 17.988 14.0419 17.988H5.95811C3.77875 17.988 2.012 16.2212 2.012 14.0419V5.95811C2.012 3.77871 3.77875 2.012 5.95811 2.012H14.0419C16.2212 2.012 17.988 3.77871 17.988 5.95811V14.0419Z"
                                      fill="url(#paint0_linear_837_55)"
                                    />
                                    <path
                                      d="M10 4.82715C7.14777 4.82715 4.8273 7.14762 4.8273 9.99982C4.8273 12.852 7.14777 15.1725 10 15.1725C12.8523 15.1725 15.1727 12.8521 15.1727 9.99982C15.1727 7.14759 12.8523 4.82715 10 4.82715ZM10 13.1606C8.25439 13.1606 6.8393 11.7455 6.8393 9.99986C6.8393 8.25423 8.25442 6.83915 10 6.83915C11.7456 6.83915 13.1607 8.25423 13.1607 9.99986C13.1607 11.7455 11.7456 13.1606 10 13.1606Z"
                                      fill="url(#paint1_linear_837_55)"
                                    />
                                    <path
                                      d="M15.1826 6.10586C15.8671 6.10586 16.422 5.55094 16.422 4.86641C16.422 4.18187 15.8671 3.62695 15.1826 3.62695C14.4981 3.62695 13.9431 4.18187 13.9431 4.86641C13.9431 5.55094 14.4981 6.10586 15.1826 6.10586Z"
                                      fill="url(#paint2_linear_837_55)"
                                    />
                                  </g>
                                  <defs>
                                    <linearGradient
                                      id="paint0_linear_837_55"
                                      x1="10"
                                      y1="19.9417"
                                      x2="10"
                                      y2="0.155336"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stop-color="#E09B3D" />
                                      <stop
                                        offset="0.3"
                                        stop-color="#C74C4D"
                                      />
                                      <stop
                                        offset="0.6"
                                        stop-color="#C21975"
                                      />
                                      <stop
                                        offset="1"
                                        stop-color="#7024C4"
                                      />
                                    </linearGradient>
                                    <linearGradient
                                      id="paint1_linear_837_55"
                                      x1="10"
                                      y1="19.9416"
                                      x2="10"
                                      y2="0.155197"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stop-color="#E09B3D" />
                                      <stop
                                        offset="0.3"
                                        stop-color="#C74C4D"
                                      />
                                      <stop
                                        offset="0.6"
                                        stop-color="#C21975"
                                      />
                                      <stop
                                        offset="1"
                                        stop-color="#7024C4"
                                      />
                                    </linearGradient>
                                    <linearGradient
                                      id="paint2_linear_837_55"
                                      x1="15.1826"
                                      y1="19.9419"
                                      x2="15.1826"
                                      y2="0.155545"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stop-color="#E09B3D" />
                                      <stop
                                        offset="0.3"
                                        stop-color="#C74C4D"
                                      />
                                      <stop
                                        offset="0.6"
                                        stop-color="#C21975"
                                      />
                                      <stop
                                        offset="1"
                                        stop-color="#7024C4"
                                      />
                                    </linearGradient>
                                    <clipPath id="clip0_837_55">
                                      <rect
                                        width="20"
                                        height="20"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                              <p className="mt-3 silka-semibold text-gray-900 text-base">
                                No Images Found
                              </p>
                              <span className="mt-1.5 silka-regular text-xs text-gray-400">
                                Create a draft image to schedule it
                                here.
                              </span>
                            </div>
                          ) : (
                            <>
                              {draftImageData
                                .sort(function (a: any, b: any) {
                                  return (
                                    new Date(b.created_at).getTime() -
                                    new Date(a.created_at).getTime()
                                  );
                                })
                                .map((value: any, index: number) => {
                                  return (
                                    <ImageComponent
                                      value={value}
                                      key={index}
                                      setIsOpen={setIsOpen}
                                      setRefetchPosts={
                                        setRefetchPosts
                                      }
                                      workspaceId={workspaceId}
                                      userId={userId}
                                      time={time}
                                      date={date}
                                    />
                                  );
                                })}
                            </>
                          )}
                        </>
                      ) : formatSelected == 'Videos' ? (
                        <>
                          {draftVideoData?.length == 0 ? (
                            <div className="flex flex-col h-[400px] w-full p-5 border border-dashed border-gray-300 rounded-lg justify-center items-center">
                              <div className="p-2.5 bg-[#F0E9F0] rounded-full">
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g clipPath="url(#clip0_837_55)">
                                    <path
                                      d="M14.0419 0H5.95811C2.67279 0 0 2.67279 0 5.95811V14.0419C0 17.3272 2.67279 20 5.95811 20H14.0419C17.3272 20 20 17.3272 20 14.0419V5.95811C20 2.67279 17.3272 0 14.0419 0ZM17.988 14.0419C17.988 16.2212 16.2212 17.988 14.0419 17.988H5.95811C3.77875 17.988 2.012 16.2212 2.012 14.0419V5.95811C2.012 3.77871 3.77875 2.012 5.95811 2.012H14.0419C16.2212 2.012 17.988 3.77871 17.988 5.95811V14.0419Z"
                                      fill="url(#paint0_linear_837_55)"
                                    />
                                    <path
                                      d="M10 4.82715C7.14777 4.82715 4.8273 7.14762 4.8273 9.99982C4.8273 12.852 7.14777 15.1725 10 15.1725C12.8523 15.1725 15.1727 12.8521 15.1727 9.99982C15.1727 7.14759 12.8523 4.82715 10 4.82715ZM10 13.1606C8.25439 13.1606 6.8393 11.7455 6.8393 9.99986C6.8393 8.25423 8.25442 6.83915 10 6.83915C11.7456 6.83915 13.1607 8.25423 13.1607 9.99986C13.1607 11.7455 11.7456 13.1606 10 13.1606Z"
                                      fill="url(#paint1_linear_837_55)"
                                    />
                                    <path
                                      d="M15.1826 6.10586C15.8671 6.10586 16.422 5.55094 16.422 4.86641C16.422 4.18187 15.8671 3.62695 15.1826 3.62695C14.4981 3.62695 13.9431 4.18187 13.9431 4.86641C13.9431 5.55094 14.4981 6.10586 15.1826 6.10586Z"
                                      fill="url(#paint2_linear_837_55)"
                                    />
                                  </g>
                                  <defs>
                                    <linearGradient
                                      id="paint0_linear_837_55"
                                      x1="10"
                                      y1="19.9417"
                                      x2="10"
                                      y2="0.155336"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stop-color="#E09B3D" />
                                      <stop
                                        offset="0.3"
                                        stop-color="#C74C4D"
                                      />
                                      <stop
                                        offset="0.6"
                                        stop-color="#C21975"
                                      />
                                      <stop
                                        offset="1"
                                        stop-color="#7024C4"
                                      />
                                    </linearGradient>
                                    <linearGradient
                                      id="paint1_linear_837_55"
                                      x1="10"
                                      y1="19.9416"
                                      x2="10"
                                      y2="0.155197"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stop-color="#E09B3D" />
                                      <stop
                                        offset="0.3"
                                        stop-color="#C74C4D"
                                      />
                                      <stop
                                        offset="0.6"
                                        stop-color="#C21975"
                                      />
                                      <stop
                                        offset="1"
                                        stop-color="#7024C4"
                                      />
                                    </linearGradient>
                                    <linearGradient
                                      id="paint2_linear_837_55"
                                      x1="15.1826"
                                      y1="19.9419"
                                      x2="15.1826"
                                      y2="0.155545"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stop-color="#E09B3D" />
                                      <stop
                                        offset="0.3"
                                        stop-color="#C74C4D"
                                      />
                                      <stop
                                        offset="0.6"
                                        stop-color="#C21975"
                                      />
                                      <stop
                                        offset="1"
                                        stop-color="#7024C4"
                                      />
                                    </linearGradient>
                                    <clipPath id="clip0_837_55">
                                      <rect
                                        width="20"
                                        height="20"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
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
                                .map((value: any, index: number) => {
                                  return (
                                    <VideoComponent
                                      value={value}
                                      key={index}
                                      setIsOpen={setIsOpen}
                                      setRefetchPosts={
                                        setRefetchPosts
                                      }
                                      workspaceId={workspaceId}
                                      userId={userId}
                                      time={time}
                                      date={date}
                                    />
                                  );
                                })}
                            </>
                          )}
                        </>
                      ) : formatSelected == 'Reels' ? (
                        <>
                          {draftReelData?.length == 0 ? (
                            <div className="flex flex-col h-[400px] w-full p-5 border border-dashed border-gray-300 rounded-lg justify-center items-center">
                              <div className="p-2.5 bg-[#F0E9F0] rounded-full">
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g clipPath="url(#clip0_837_55)">
                                    <path
                                      d="M14.0419 0H5.95811C2.67279 0 0 2.67279 0 5.95811V14.0419C0 17.3272 2.67279 20 5.95811 20H14.0419C17.3272 20 20 17.3272 20 14.0419V5.95811C20 2.67279 17.3272 0 14.0419 0ZM17.988 14.0419C17.988 16.2212 16.2212 17.988 14.0419 17.988H5.95811C3.77875 17.988 2.012 16.2212 2.012 14.0419V5.95811C2.012 3.77871 3.77875 2.012 5.95811 2.012H14.0419C16.2212 2.012 17.988 3.77871 17.988 5.95811V14.0419Z"
                                      fill="url(#paint0_linear_837_55)"
                                    />
                                    <path
                                      d="M10 4.82715C7.14777 4.82715 4.8273 7.14762 4.8273 9.99982C4.8273 12.852 7.14777 15.1725 10 15.1725C12.8523 15.1725 15.1727 12.8521 15.1727 9.99982C15.1727 7.14759 12.8523 4.82715 10 4.82715ZM10 13.1606C8.25439 13.1606 6.8393 11.7455 6.8393 9.99986C6.8393 8.25423 8.25442 6.83915 10 6.83915C11.7456 6.83915 13.1607 8.25423 13.1607 9.99986C13.1607 11.7455 11.7456 13.1606 10 13.1606Z"
                                      fill="url(#paint1_linear_837_55)"
                                    />
                                    <path
                                      d="M15.1826 6.10586C15.8671 6.10586 16.422 5.55094 16.422 4.86641C16.422 4.18187 15.8671 3.62695 15.1826 3.62695C14.4981 3.62695 13.9431 4.18187 13.9431 4.86641C13.9431 5.55094 14.4981 6.10586 15.1826 6.10586Z"
                                      fill="url(#paint2_linear_837_55)"
                                    />
                                  </g>
                                  <defs>
                                    <linearGradient
                                      id="paint0_linear_837_55"
                                      x1="10"
                                      y1="19.9417"
                                      x2="10"
                                      y2="0.155336"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stop-color="#E09B3D" />
                                      <stop
                                        offset="0.3"
                                        stop-color="#C74C4D"
                                      />
                                      <stop
                                        offset="0.6"
                                        stop-color="#C21975"
                                      />
                                      <stop
                                        offset="1"
                                        stop-color="#7024C4"
                                      />
                                    </linearGradient>
                                    <linearGradient
                                      id="paint1_linear_837_55"
                                      x1="10"
                                      y1="19.9416"
                                      x2="10"
                                      y2="0.155197"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stop-color="#E09B3D" />
                                      <stop
                                        offset="0.3"
                                        stop-color="#C74C4D"
                                      />
                                      <stop
                                        offset="0.6"
                                        stop-color="#C21975"
                                      />
                                      <stop
                                        offset="1"
                                        stop-color="#7024C4"
                                      />
                                    </linearGradient>
                                    <linearGradient
                                      id="paint2_linear_837_55"
                                      x1="15.1826"
                                      y1="19.9419"
                                      x2="15.1826"
                                      y2="0.155545"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stop-color="#E09B3D" />
                                      <stop
                                        offset="0.3"
                                        stop-color="#C74C4D"
                                      />
                                      <stop
                                        offset="0.6"
                                        stop-color="#C21975"
                                      />
                                      <stop
                                        offset="1"
                                        stop-color="#7024C4"
                                      />
                                    </linearGradient>
                                    <clipPath id="clip0_837_55">
                                      <rect
                                        width="20"
                                        height="20"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                              <p className="mt-3 silka-semibold text-gray-900 text-base">
                                No Reels Found
                              </p>
                              <span className="mt-1.5 silka-regular text-xs text-gray-400">
                                Create a draft reel to schedule it
                                here.
                              </span>
                            </div>
                          ) : (
                            <>
                              {draftReelData
                                ?.sort(function (a: any, b: any) {
                                  return (
                                    new Date(b.created_at).getTime() -
                                    new Date(a.created_at).getTime()
                                  );
                                })
                                .map((value: any, index: number) => {
                                  return (
                                    <ReelComponent
                                      value={value}
                                      key={index}
                                      setIsOpen={setIsOpen}
                                      setRefetchPosts={
                                        setRefetchPosts
                                      }
                                      workspaceId={workspaceId}
                                      userId={userId}
                                      time={time}
                                      date={date}
                                    />
                                  );
                                })}
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          {draftCarouselData?.length == 0 ? (
                            <div className="flex flex-col h-[400px] w-full p-5 border border-dashed border-gray-300 rounded-lg justify-center items-center">
                              <div className="p-2.5 bg-[#F0E9F0] rounded-full">
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g clipPath="url(#clip0_837_55)">
                                    <path
                                      d="M14.0419 0H5.95811C2.67279 0 0 2.67279 0 5.95811V14.0419C0 17.3272 2.67279 20 5.95811 20H14.0419C17.3272 20 20 17.3272 20 14.0419V5.95811C20 2.67279 17.3272 0 14.0419 0ZM17.988 14.0419C17.988 16.2212 16.2212 17.988 14.0419 17.988H5.95811C3.77875 17.988 2.012 16.2212 2.012 14.0419V5.95811C2.012 3.77871 3.77875 2.012 5.95811 2.012H14.0419C16.2212 2.012 17.988 3.77871 17.988 5.95811V14.0419Z"
                                      fill="url(#paint0_linear_837_55)"
                                    />
                                    <path
                                      d="M10 4.82715C7.14777 4.82715 4.8273 7.14762 4.8273 9.99982C4.8273 12.852 7.14777 15.1725 10 15.1725C12.8523 15.1725 15.1727 12.8521 15.1727 9.99982C15.1727 7.14759 12.8523 4.82715 10 4.82715ZM10 13.1606C8.25439 13.1606 6.8393 11.7455 6.8393 9.99986C6.8393 8.25423 8.25442 6.83915 10 6.83915C11.7456 6.83915 13.1607 8.25423 13.1607 9.99986C13.1607 11.7455 11.7456 13.1606 10 13.1606Z"
                                      fill="url(#paint1_linear_837_55)"
                                    />
                                    <path
                                      d="M15.1826 6.10586C15.8671 6.10586 16.422 5.55094 16.422 4.86641C16.422 4.18187 15.8671 3.62695 15.1826 3.62695C14.4981 3.62695 13.9431 4.18187 13.9431 4.86641C13.9431 5.55094 14.4981 6.10586 15.1826 6.10586Z"
                                      fill="url(#paint2_linear_837_55)"
                                    />
                                  </g>
                                  <defs>
                                    <linearGradient
                                      id="paint0_linear_837_55"
                                      x1="10"
                                      y1="19.9417"
                                      x2="10"
                                      y2="0.155336"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stop-color="#E09B3D" />
                                      <stop
                                        offset="0.3"
                                        stop-color="#C74C4D"
                                      />
                                      <stop
                                        offset="0.6"
                                        stop-color="#C21975"
                                      />
                                      <stop
                                        offset="1"
                                        stop-color="#7024C4"
                                      />
                                    </linearGradient>
                                    <linearGradient
                                      id="paint1_linear_837_55"
                                      x1="10"
                                      y1="19.9416"
                                      x2="10"
                                      y2="0.155197"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stop-color="#E09B3D" />
                                      <stop
                                        offset="0.3"
                                        stop-color="#C74C4D"
                                      />
                                      <stop
                                        offset="0.6"
                                        stop-color="#C21975"
                                      />
                                      <stop
                                        offset="1"
                                        stop-color="#7024C4"
                                      />
                                    </linearGradient>
                                    <linearGradient
                                      id="paint2_linear_837_55"
                                      x1="15.1826"
                                      y1="19.9419"
                                      x2="15.1826"
                                      y2="0.155545"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stop-color="#E09B3D" />
                                      <stop
                                        offset="0.3"
                                        stop-color="#C74C4D"
                                      />
                                      <stop
                                        offset="0.6"
                                        stop-color="#C21975"
                                      />
                                      <stop
                                        offset="1"
                                        stop-color="#7024C4"
                                      />
                                    </linearGradient>
                                    <clipPath id="clip0_837_55">
                                      <rect
                                        width="20"
                                        height="20"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                              <p className="mt-3 silka-semibold text-gray-900 text-base">
                                No Carousels Found
                              </p>
                              <span className="mt-1.5 silka-regular text-xs text-gray-400">
                                Create a draft carousel to schedule it
                                here.
                              </span>
                            </div>
                          ) : (
                            <>
                              {draftCarouselData
                                ?.sort(function (a: any, b: any) {
                                  return (
                                    new Date(b.created_at).getTime() -
                                    new Date(a.created_at).getTime()
                                  );
                                })
                                .map((value: any, index: number) => {
                                  return (
                                    <CarouselComponent
                                      value={value}
                                      key={index}
                                      setIsOpen={setIsOpen}
                                      setRefetchPosts={
                                        setRefetchPosts
                                      }
                                      workspaceId={workspaceId}
                                      userId={userId}
                                      time={time}
                                      date={date}
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
