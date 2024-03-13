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
      `${apiUrl()}linkedin/create/scheduledtext`,
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

async function scheduledImage(
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
      `${apiUrl()}linkedin/create/scheduledimage`,
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

async function scheduledVideo(
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
      `${apiUrl()}linkedin/create/scheduledvideo`,
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

async function scheduledPoll(
  workspaceId: string,
  userId: string,
  draftId: string,
  date: string,
  time: string
) {
  try {
    axiosRetry(axios, { retries: 3 });

    toast.loading('Scheduling Poll...', {
      className: 'text-sm silka-medium text-gray-900',
      duration: 80000,
    });

    const result = await axios.post(
      `${apiUrl()}linkedin/create/scheduledpoll`,
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

async function scheduledMultiimage(
  workspaceId: string,
  userId: string,
  draftId: string,
  date: string,
  time: string
) {
  try {
    axiosRetry(axios, { retries: 3 });

    toast.loading('Multi-Image Scheduling...', {
      className: 'text-sm silka-medium text-gray-900',
      duration: 80000,
    });

    const result = await axios.post(
      `${apiUrl()}linkedin/create/scheduledmultiimage`,
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

async function getTextDrafts(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}linkedin/read/textdrafts`,
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
      `${apiUrl()}linkedin/read/imagedrafts`,
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
      `${apiUrl()}linkedin/read/videodrafts`,
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

async function getPollDrafts(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}linkedin/read/polldrafts`,
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

async function getMultiimageDrafts(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}linkedin/read/multiimagedrafts`,
      {
        params: { workspaceId: workspaceId },
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
  time,
  date,
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
  time,
  date,
}: SecondComponentProps) {
  return (
    <div className="p-2 w-1/3">
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(false);
          scheduledImage(
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
  time,
  date,
}: SecondComponentProps) {
  return (
    <div className="p-2 w-1/3">
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(false);
          scheduledVideo(
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

function PollComponent({
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
          scheduledPoll(
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
            No poll text
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

function MultiimageComponent({
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
          scheduledMultiimage(
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
              No Images Selected
            </p>
          </div>
        )}
        {!value?.text || value.text.length == 0 ? (
          <p className="text-xs mt-2 text-start silka-medium text-gray-400 italic">
            No multi-image text
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

export function LinkedinPickPost({
  isOpen,
  workspaceId,
  setIsOpen,
  setRefetchPosts,
  userId,
  date,
  time,
}: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [formatSelected, setFormatSelected] = useState('Text');
  const [draftTextData, setDraftTextData] = useState<any>(null);
  const [draftImageData, setDraftImageData] = useState<any>(null);
  const [draftVideoData, setDraftVideoData] = useState<any>(null);
  const [draftPollData, setDraftPollData] = useState<any>(null);
  const [draftMultiimageData, setDraftMultiimageData] =
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
    } else if (formatSelected == 'Poll') {
      getPollDrafts(workspaceId).then((value) => {
        setDraftPollData(value);
        setIsLoading(false);
      });
    } else if (formatSelected == 'Multi-Image') {
      getMultiimageDrafts(workspaceId).then((value) => {
        setDraftMultiimageData(value);
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
                    setFormatSelected('Poll');
                  }}
                  className={
                    'text-xs silka-medium rounded px-3 py-1 hover:bg-gray-50 ' +
                    (formatSelected == 'Poll'
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-500')
                  }
                >
                  Polls
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setFormatSelected('Multi-Image');
                  }}
                  className={
                    'text-xs silka-medium rounded px-3 py-1 hover:bg-gray-50 ' +
                    (formatSelected == 'Multi-Image'
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-500')
                  }
                >
                  Multi-Image
                </button>
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
                              <div className="p-2.5 bg-[#E8EDF3] rounded-full">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fill="#0966C2"
                                    d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"
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
                                      time={time}
                                      date={date}
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
                              <div className="p-2.5 bg-[#E8EDF3] rounded-full">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fill="#0966C2"
                                    d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"
                                  />
                                </svg>
                              </div>
                              <p className="mt-3 silka-semibold text-gray-900 text-base">
                                No Text Found
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
                                      time={time}
                                      date={date}
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
                              <div className="p-2.5 bg-[#E8EDF3] rounded-full">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fill="#0966C2"
                                    d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"
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
                      ) : formatSelected == 'Poll' ? (
                        <>
                          {draftPollData?.length == 0 ? (
                            <div className="flex flex-col h-[400px] w-full p-5 border border-dashed border-gray-300 rounded-lg justify-center items-center">
                              <div className="p-2.5 bg-[#E8EDF3] rounded-full">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fill="#0966C2"
                                    d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"
                                  />
                                </svg>
                              </div>
                              <p className="mt-3 silka-semibold text-gray-900 text-base">
                                No Polls Found
                              </p>
                              <span className="mt-1.5 silka-regular text-xs text-gray-400">
                                Create a draft poll to schedule it
                                here.
                              </span>
                            </div>
                          ) : (
                            <>
                              {draftPollData
                                ?.sort(function (a: any, b: any) {
                                  return (
                                    new Date(b.created_at).getTime() -
                                    new Date(a.created_at).getTime()
                                  );
                                })
                                ?.map((value: any, index: number) => {
                                  return (
                                    <PollComponent
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
                          {draftMultiimageData?.length == 0 ? (
                            <div className="flex flex-col h-[400px] w-full p-5 border border-dashed border-gray-300 rounded-lg justify-center items-center">
                              <div className="p-2.5 bg-[#E8EDF3] rounded-full">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fill="#0966C2"
                                    d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"
                                  />
                                </svg>
                              </div>
                              <p className="mt-3 silka-semibold text-gray-900 text-base">
                                No Multi-Images Found
                              </p>
                              <span className="mt-1.5 silka-regular text-xs text-gray-400">
                                Create a draft multi-image to schedule
                                it here.
                              </span>
                            </div>
                          ) : (
                            <>
                              {draftMultiimageData
                                ?.sort(function (a: any, b: any) {
                                  return (
                                    new Date(b.created_at).getTime() -
                                    new Date(a.created_at).getTime()
                                  );
                                })
                                ?.map((value: any, index: number) => {
                                  return (
                                    <MultiimageComponent
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
