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
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setRefetchPosts: Dispatch<SetStateAction<boolean>>;
  workspaceId: string;
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

async function scheduleText(
  workspaceId: string,
  userId: string,
  draftId: string,
  date: string,
  time: string
) {
  try {
    axiosRetry(axios, { retries: 3 });

    toast.loading('Scheduling Text...', {
      className: 'text-sm silka-medium text-gray-900',
      duration: 80000,
    });

    const result = await axios.post(
      `${apiUrl()}facebook/create/scheduledtext`,
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
      toast.success('Text successfully scheduled!', {
        className: 'text-sm silka-medium text-gray-900',
      });
    } else {
      toast.remove();
      toast.error('Error scheduling text, please try again.', {
        className: 'text-sm silka-medium text-gray-900',
      });
    }
    return result.data;
  } catch (e) {
    toast.remove();
    toast.error('Error scheduling text, please try again.', {
      className: 'text-sm silka-medium text-gray-900',
    });
    console.log(e);
  }
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
      `${apiUrl()}facebook/create/scheduledimage`,
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
      `${apiUrl()}facebook/create/scheduledvideo`,
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
      `${apiUrl()}facebook/create/scheduledreel`,
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

async function scheduleSlideshow(
  workspaceId: string,
  userId: string,
  draftId: string,
  date: string,
  time: string
) {
  try {
    axiosRetry(axios, { retries: 3 });

    toast.loading('Scheduling Slideshow...', {
      className: 'text-sm silka-medium text-gray-900',
      duration: 80000,
    });

    const result = await axios.post(
      `${apiUrl()}facebook/create/scheduledslideshow`,
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
      toast.success('Slideshow successfully scheduled!', {
        className: 'text-sm silka-medium text-gray-900',
      });
    } else {
      toast.remove();
      toast.error('Error scheduling slideshow, please try again.', {
        className: 'text-sm silka-medium text-gray-900',
      });
    }
    return result.data;
  } catch (e) {
    toast.remove();
    toast.error('Error scheduling slideshow, please try again.', {
      className: 'text-sm silka-medium text-gray-900',
    });
    console.log(e);
  }
}

async function getTextDrafts(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}facebook/read/textdrafts`,
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

async function getImageDrafts(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}facebook/read/imagedrafts`,
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

async function getVideoDrafts(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}facebook/read/videodrafts`,
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

async function getReelDrafts(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}facebook/read/reeldrafts`,
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

async function getSlideshowDrafts(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}facebook/read/slideshowdrafts`,
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

function TextComponent({
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
          scheduleText(
            workspaceId,
            userId,
            value.id,
            date,
            time
          ).then(() => {
            setRefetchPosts(true);
          });
        }}
        className="w-full h-full border rounded-lg p-3 hover:border-[#0966C2] flex flex-col"
      >
        {!value?.text || value.text.length == 0 ? (
          <p className="text-xs  text-start silka-medium text-gray-400 italic">
            No text
          </p>
        ) : (
          <p className="text-xs text-start silka-medium text-gray-800 break-all ">
            <>
              {value?.text?.length > 48
                ? value.text.slice(0, 48) + '...'
                : value.text}
            </>
          </p>
        )}
        <hr className="w-full mt-3" />
        <p className="text-[9px] mt-2 silka-regular text-gray-400">
          {formatDate(value.created_at)}
        </p>
      </button>
    </div>
  );
}

function ImageComponent({
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
          scheduleImage(
            workspaceId,
            userId,
            value.id,
            date,
            time
          ).then(() => {
            setRefetchPosts(true);
          });
        }}
        className="w-full h-full border rounded-lg p-3 hover:border-[#0966C2] flex flex-col"
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
  date,
  time,
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
          ).then(() => {
            setRefetchPosts(true);
          });
        }}
        className="w-full h-full border rounded-lg p-3 hover:border-[#0966C2] flex flex-col"
      >
        {value.image == 'yes' ? (
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
  date,
  time,
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
          ).then(() => {
            setRefetchPosts(true);
          });
        }}
        className="w-full h-full border rounded-lg p-3 hover:border-[#0966C2] flex flex-col"
      >
        {value.image == 'yes' ? (
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

function SlideshowComponent({
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
          scheduleSlideshow(
            workspaceId,
            userId,
            value.id,
            date,
            time
          ).then(() => {
            setRefetchPosts(true);
          });
        }}
        className="w-full h-full border rounded-lg p-3 hover:bg-[#0966C2] flex flex-col"
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
            No slideshow text
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

export function FacebookPickPost({
  isOpen,
  setIsOpen,
  setRefetchPosts,
  workspaceId,
  userId,
  date,
  time,
}: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [formatSelected, setFormatSelected] = useState('Text');
  const [draftTextData, setDraftTextData] = useState<any>(null);
  const [draftImageData, setDraftImageData] = useState<any>(null);
  const [draftVideoData, setDraftVideoData] = useState<any>(null);
  const [draftReelData, setDraftReelData] = useState<any>(null);
  const [draftSlideshowData, setDraftSlideshowData] =
    useState<any>(null);

  useEffect(() => {
    setIsLoading(true);
    if (formatSelected == 'Text') {
      getTextDrafts(workspaceId).then((value) => {
        setDraftTextData(value);
        setIsLoading(false);
      });
    } else if (formatSelected == 'Image') {
      getImageDrafts(workspaceId).then((value) => {
        setDraftImageData(value);
        setIsLoading(false);
      });
    } else if (formatSelected == 'Video') {
      getVideoDrafts(workspaceId).then((value) => {
        setDraftVideoData(value);
        setIsLoading(false);
      });
    } else if (formatSelected == 'Reel') {
      getReelDrafts(workspaceId).then((value) => {
        setDraftReelData(value);
        setIsLoading(false);
      });
    } else if (formatSelected == 'Slideshow') {
      getSlideshowDrafts(workspaceId).then((value) => {
        setDraftSlideshowData(value);
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
                    setFormatSelected('Text');
                  }}
                  className={
                    'text-xs silka-medium rounded px-3 py-1 hover:bg-gray-50 ' +
                    (formatSelected == 'Text'
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-500')
                  }
                >
                  Text
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setFormatSelected('Image');
                  }}
                  className={
                    'text-xs silka-medium rounded px-3 py-1 hover:bg-gray-50 ' +
                    (formatSelected == 'Image'
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-500')
                  }
                >
                  Images
                </button>
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
                    setFormatSelected('Reel');
                  }}
                  className={
                    'text-xs silka-medium rounded px-3 py-1 hover:bg-gray-50 ' +
                    (formatSelected == 'Reel'
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-500')
                  }
                >
                  Reel
                </button>
                {/*
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setFormatSelected('Slideshow');
                  }}
                  className={
                    'text-xs silka-medium rounded px-3 py-1 hover:bg-gray-50 ' +
                    (formatSelected == 'Slideshow'
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-500')
                  }
                >
                  Slideshow
                </button>
                */}
              </div>
              {isLoading ? (
                <div className="flex flex-col justify-center items-center h-[400px]">
                  <div className="flex flex-row space-x-4">
                    <span className="animate-ping h-3 w-3 my-auto rounded-full bg-[#0966C2] opacity-75"></span>
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
                          {draftVideoData?.length == 0 ? (
                            <div className="flex flex-col h-[400px] w-full p-5 border border-dashed border-gray-300 rounded-lg justify-center items-center">
                              <div className="p-2.5 bg-[#E8EEF5] rounded-full">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fill="#0A7BEA"
                                    d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
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
                                      setRefetchPosts={
                                        setRefetchPosts
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
                      ) : formatSelected == 'Text' ? (
                        <>
                          {draftTextData?.length == 0 ? (
                            <div className="flex flex-col h-[400px] w-full p-5 border border-dashed border-gray-300 rounded-lg justify-center items-center">
                              <div className="p-2.5 bg-[#E8EEF5] rounded-full">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fill="#0A7BEA"
                                    d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
                                  />
                                </svg>
                              </div>
                              <p className="mt-3 silka-semibold text-gray-900 text-base">
                                No Texts Found
                              </p>
                              <span className="mt-1.5 silka-regular text-xs text-gray-400">
                                Create a draft text to schedule it
                                here.
                              </span>
                            </div>
                          ) : (
                            <>
                              {draftTextData
                                ?.sort(function (a: any, b: any) {
                                  return (
                                    new Date(b.created_at).getTime() -
                                    new Date(a.created_at).getTime()
                                  );
                                })
                                ?.map((value: any, index: number) => {
                                  return (
                                    <TextComponent
                                      value={value}
                                      key={index}
                                      setIsOpen={setIsOpen}
                                      setRefetchPosts={
                                        setRefetchPosts
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
                      ) : formatSelected == 'Image' ? (
                        <>
                          {draftImageData?.length == 0 ? (
                            <div className="flex flex-col h-[400px] w-full p-5 border border-dashed border-gray-300 rounded-lg justify-center items-center">
                              <div className="p-2.5 bg-[#E8EEF5] rounded-full">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fill="#0A7BEA"
                                    d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
                                  />
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
                                ?.sort(function (a: any, b: any) {
                                  return (
                                    new Date(b.created_at).getTime() -
                                    new Date(a.created_at).getTime()
                                  );
                                })
                                ?.map((value: any, index: number) => {
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
                      ) : formatSelected == 'Reel' ? (
                        <>
                          {draftReelData?.length == 0 ? (
                            <div className="flex flex-col h-[400px] w-full p-5 border border-dashed border-gray-300 rounded-lg justify-center items-center">
                              <div className="p-2.5 bg-[#E8EEF5] rounded-full">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fill="#0A7BEA"
                                    d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
                                  />
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
                                ?.map((value: any, index: number) => {
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
                          {draftSlideshowData?.length == 0 ? (
                            <div className="flex flex-col h-[400px] w-full p-5 border border-dashed border-gray-300 rounded-lg justify-center items-center">
                              <div className="p-2.5 bg-[#E8EEF5] rounded-full">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fill="#0A7BEA"
                                    d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
                                  />
                                </svg>
                              </div>
                              <p className="mt-3 silka-semibold text-gray-900 text-base">
                                No Slideshows Found
                              </p>
                              <span className="mt-1.5 silka-regular text-xs text-gray-400">
                                Create a draft slideshow to schedule
                                it here.
                              </span>
                            </div>
                          ) : (
                            <>
                              {draftSlideshowData
                                ?.sort(function (a: any, b: any) {
                                  return (
                                    new Date(b.created_at).getTime() -
                                    new Date(a.created_at).getTime()
                                  );
                                })
                                ?.map((value: any, index: number) => {
                                  return (
                                    <SlideshowComponent
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
