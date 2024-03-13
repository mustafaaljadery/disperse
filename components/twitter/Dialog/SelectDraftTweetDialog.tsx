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
  setRefetchTweets: Dispatch<SetStateAction<boolean>>;
  workspaceId: string;
  userId: string;
  date: string;
  time: string;
}

interface SecondComponentProps {
  value: any;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setRefetchTweets: Dispatch<SetStateAction<boolean>>;
  workspaceId: string;
  userId: string;
  date: string;
  time: string;
}

async function getThumbnail(fileId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}twitter/read/thumbnail`,
      {
        params: {
          fileId: fileId,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function scheduleTweet(
  workspaceId: string,
  userId: string,
  draftId: string,
  date: string,
  time: string
) {
  try {
    axiosRetry(axios, { retries: 3 });

    toast.loading('Scheduling Tweet...', {
      className: 'text-sm silka-medium text-gray-900',
      duration: 80000,
    });

    const result = await axios.post(
      `${apiUrl()}twitter/create/scheduledtweet`,
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
      toast.success('Tweet successfully scheduled!', {
        className: 'text-sm silka-medium text-gray-900',
      });
    } else {
      toast.remove();
      toast.error('Error scheduling tweet, please try again.', {
        className: 'text-sm silka-medium text-gray-900',
      });
    }
    return result.data;
  } catch (e) {
    toast.remove();
    toast.error('Error scheduling tweet, please try again.', {
      className: 'text-sm silka-medium text-gray-900',
    });
    console.log(e);
  }
}

async function scheduleThread(
  workspaceId: string,
  userId: string,
  draftId: string,
  date: string,
  time: string
) {
  try {
    axiosRetry(axios, { retries: 3 });

    toast.loading('Scheduling Thread...', {
      className: 'text-sm silka-medium text-gray-900',
      duration: 80000,
    });

    const result = await axios.post(
      `${apiUrl()}twitter/create/scheduledthread`,
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
      toast.success('Thread successfully scheduled!', {
        className: 'text-sm silka-medium text-gray-900',
      });
    } else {
      toast.remove();
      toast.error('Error scheduling thread, please try again.', {
        className: 'text-sm silka-medium text-gray-900',
      });
    }
    return result.data;
  } catch (e) {
    toast.remove();
    toast.error('Error scheduling thread, please try again.', {
      className: 'text-sm silka-medium text-gray-900',
    });
    console.log(e);
  }
}

async function schedulePoll(
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
      `${apiUrl()}twitter/create/scheduledpoll`,
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
      toast.success('Poll successfully scheduled!', {
        className: 'text-sm silka-medium text-gray-900',
      });
    } else {
      toast.remove();
      toast.error('Error scheduling poll, please try again.', {
        className: 'text-sm silka-medium text-gray-900',
      });
    }
    return result.data;
  } catch (e) {
    toast.remove();
    toast.error('Error scheduling poll, please try again.', {
      className: 'text-sm silka-medium text-gray-900',
    });
    console.log(e);
  }
}

async function getDraftTweets(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}twitter/read/tweetdrafts`,
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

async function getDraftThreads(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}twitter/read/threaddrafts`,
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

async function getDraftPolls(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}twitter/read/polldrafts`,
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

function TweetComponent({
  value,
  setIsOpen,
  setRefetchTweets,
  workspaceId,
  userId,
  time,
  date,
}: SecondComponentProps) {
  const [urlLoading, setUrlLoading] = useState(false);
  const [googleUrl, setGoogleUrl] = useState<any>(null);

  useEffect(() => {
    if (value.fileId) {
      setUrlLoading(true);
      getThumbnail(value.fileId).then((res) => {
        setGoogleUrl(res.google_url);
        setUrlLoading(false);
      });
    }
  }, []);

  return (
    <div className="p-2 w-1/3">
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(false);
          scheduleTweet(
            workspaceId,
            userId,
            value.id,
            date,
            time
          ).then(() => {
            setRefetchTweets(true);
          });
        }}
        className="w-full h-full border rounded-lg p-3 hover:border-[#1D9BF0] flex flex-col"
      >
        {value.fileId ? (
          <>
            {urlLoading ? (
              <div className="w-full h-20 rounded bg-gray-100 flex flex-col justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="animate-spin"
                  width="16px"
                  height="16px"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="xMidYMid"
                >
                  <circle
                    cx="50"
                    cy="50"
                    fill="none"
                    stroke="#363636"
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
              <img className="w-full h-20 rounded" src={googleUrl} />
            )}
          </>
        ) : (
          <></>
        )}
        <p
          className={
            'text-sm text-start silka-medium text-gray-800 break-all ' +
            (value.fileId ? 'mt-2.5' : 'my-auto')
          }
        >
          {value.text.length > 48
            ? value.text.slice(0, 48)
            : value.text}
        </p>
        <hr className="w-full mt-3" />
        <p className="text-[9px] mt-2 silka-regular text-gray-400">
          {formatDate(value.created_at)}
        </p>
      </button>
    </div>
  );
}

function ThreadComponent({
  value,
  setIsOpen,
  setRefetchTweets,
  workspaceId,
  userId,
  time,
  date,
}: SecondComponentProps) {
  const [urlLoading, setUrlLoading] = useState(false);
  const [googleUrl, setGoogleUrl] = useState<any>(null);

  useEffect(() => {
    if (value.fileId) {
      setUrlLoading(true);
      getThumbnail(value.fileId).then((res) => {
        setGoogleUrl(res.google_url);
        setUrlLoading(false);
      });
    }
  }, []);

  return (
    <div className="p-2 w-1/3">
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(false);
          scheduleThread(
            workspaceId,
            userId,
            value.id,
            date,
            time
          ).then(() => {
            setRefetchTweets(true);
          });
        }}
        className="w-full h-full border rounded-lg p-3 hover:border-[#1D9BF0] flex flex-col"
      >
        {value.fileId ? (
          <>
            {urlLoading ? (
              <div className="w-full h-20 rounded bg-gray-100 flex flex-col justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="animate-spin"
                  width="16px"
                  height="16px"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="xMidYMid"
                >
                  <circle
                    cx="50"
                    cy="50"
                    fill="none"
                    stroke="#363636"
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
              <img className="w-full h-20 rounded" src={googleUrl} />
            )}
          </>
        ) : (
          <></>
        )}
        <p
          className={
            'text-sm text-start silka-medium text-gray-800 break-all ' +
            (value.fileId ? 'mt-2.5' : 'my-auto')
          }
        >
          {value.text.length > 48
            ? value.text.slice(0, 48)
            : value.text}
        </p>
        <hr className="w-full mt-3" />
        <p className="text-[9px] mt-2 silka-regular text-gray-400">
          {formatDate(value.created_at)}
        </p>
      </button>
    </div>
  );
}

function PollComponent({
  value,
  setIsOpen,
  setRefetchTweets,
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
          schedulePoll(
            workspaceId,
            userId,
            value.id,
            date,
            time
          ).then(() => {
            setRefetchTweets(true);
          });
        }}
        className="w-full h-full border rounded-lg p-3 hover:border-[#1D9BF0] flex flex-col"
      >
        <p className="text-sm text-start silka-medium text-gray-800 break-all">
          {value.text.length > 48
            ? value.text.slice(0, 48)
            : value.text}
        </p>
        <hr className="w-full mt-3" />
        <p className="text-[9px] mt-2 silka-regular text-gray-400">
          {formatDate(value.created_at)}
        </p>
      </button>
    </div>
  );
}

export function SelectDraftTweetDialog({
  isOpen,
  workspaceId,
  setIsOpen,
  setRefetchTweets,
  userId,
  date,
  time,
}: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [formatSelected, setFormatSelected] = useState('Tweets');
  const [draftTweetsData, setDraftTweetsData] = useState<any>(null);
  const [draftThreadsData, setDraftThreadsData] = useState<any>(null);
  const [draftPollsData, setDraftPollsData] = useState<any>(null);

  useEffect(() => {
    setIsLoading(true);
    if (formatSelected == 'Tweets') {
      getDraftTweets(workspaceId).then((value) => {
        setDraftTweetsData(value);
        setIsLoading(false);
      });
    } else if (formatSelected == 'Threads') {
      getDraftThreads(workspaceId).then((value) => {
        setDraftThreadsData(value);
        setIsLoading(false);
      });
    } else if (formatSelected == 'Polls') {
      getDraftPolls(workspaceId).then((value) => {
        setDraftPollsData(value);
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
              Select Draft Tweet to Schedule
            </DialogPrimitive.Title>
            <div className="mt-3 flex flex-col w-full space-y-5">
              <div className="flex flex-row space-x-3">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setFormatSelected('Tweets');
                  }}
                  className={
                    'text-xs silka-medium rounded px-3 py-1 hover:bg-gray-50 ' +
                    (formatSelected == 'Tweets'
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-500')
                  }
                >
                  Tweets
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setFormatSelected('Threads');
                  }}
                  className={
                    'text-xs silka-medium rounded px-3 py-1 hover:bg-gray-50 ' +
                    (formatSelected == 'Threads'
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-500')
                  }
                >
                  Threads
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setFormatSelected('Polls');
                  }}
                  className={
                    'text-xs silka-medium rounded px-3 py-1 hover:bg-gray-50 ' +
                    (formatSelected == 'Polls'
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-500')
                  }
                >
                  Polls
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
                      {formatSelected == 'Tweets' ? (
                        <>
                          {draftTweetsData.length == 0 ? (
                            <div className="flex flex-col h-[400px] w-full p-5 border border-dashed border-gray-300 rounded-lg justify-center items-center">
                              <div className="p-2.5 bg-[#E9F0F5] rounded-full">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fill="#1D9BF0"
                                    d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                                  />
                                </svg>
                              </div>
                              <p className="mt-3 silka-semibold text-gray-900 text-base">
                                No Tweets Found
                              </p>
                              <span className="mt-1.5 silka-regular text-xs text-gray-400">
                                Create a draft tweet to schedule it
                                here.
                              </span>
                            </div>
                          ) : (
                            <>
                              {draftTweetsData
                                .sort(function (a: any, b: any) {
                                  return (
                                    new Date(b.created_at).getTime() -
                                    new Date(a.created_at).getTime()
                                  );
                                })
                                .map((value: any, index: number) => {
                                  return (
                                    <TweetComponent
                                      value={value}
                                      key={index}
                                      setIsOpen={setIsOpen}
                                      setRefetchTweets={
                                        setRefetchTweets
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
                      ) : formatSelected == 'Threads' ? (
                        <>
                          {draftThreadsData?.length == 0 ? (
                            <div className="flex flex-col h-[400px] w-full p-5 border border-dashed border-gray-300 rounded-lg justify-center items-center">
                              <div className="p-2.5 bg-[#E9F0F5] rounded-full">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fill="#1D9BF0"
                                    d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                                  />
                                </svg>
                              </div>
                              <p className="mt-3 silka-semibold text-gray-900 text-base">
                                No Threads Found
                              </p>
                              <span className="mt-1.5 silka-regular text-xs text-gray-400">
                                Create a draft thread to schedule it
                                here.
                              </span>
                            </div>
                          ) : (
                            <>
                              {draftThreadsData
                                ?.sort(function (a: any, b: any) {
                                  return (
                                    new Date(b.created_at).getTime() -
                                    new Date(a.created_at).getTime()
                                  );
                                })
                                .map((value: any, index: number) => {
                                  return (
                                    <ThreadComponent
                                      value={value}
                                      key={index}
                                      setIsOpen={setIsOpen}
                                      setRefetchTweets={
                                        setRefetchTweets
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
                      ) : formatSelected == 'Polls' ? (
                        <>
                          {draftPollsData?.length == 0 ? (
                            <div className="flex flex-col h-[400px] w-full p-5 border border-dashed border-gray-300 rounded-lg justify-center items-center">
                              <div className="p-2.5 bg-[#E9F0F5] rounded-full">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fill="#1D9BF0"
                                    d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
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
                              {draftPollsData
                                ?.sort(function (a: any, b: any) {
                                  return (
                                    new Date(b.created_at).getTime() -
                                    new Date(a.created_at).getTime()
                                  );
                                })
                                .map((value: any, index: number) => {
                                  return (
                                    <PollComponent
                                      value={value}
                                      key={index}
                                      setIsOpen={setIsOpen}
                                      setRefetchTweets={
                                        setRefetchTweets
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
                        <></>
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
