import axios from 'axios';
import axiosRetry from 'axios-retry';
import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { TwitterScheduleTimesDialog } from './Dialog/ScheduleTimes';
import { apiUrl } from '../../utils/apiUrl';
import { useSession } from 'next-auth/react';
import { SelectDraftTweetDialog } from './Dialog/SelectDraftTweetDialog';
import { MyTimezoneDialog } from './Dialog/MyTimezone';
import { useInView } from 'react-hook-inview';
import Dropdown from 'react-bootstrap/Dropdown';
import toast from 'react-hot-toast';

interface Props {
  workspaceId: string;
}

interface ScheduleDateProps {
  value: any;
  workspaceId: string;
  setRefetchTweets: Dispatch<SetStateAction<boolean>>;
  userId: string;
}

interface ScheduleComponentProps {
  value: any;
  workspaceId: string;
  setRefetchTweets: Dispatch<SetStateAction<boolean>>;
  date: string;
  userId: string;
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

async function unscheduleTweet(
  scheduledId: string,
  workspaceId: string,
  userId: string
) {
  try {
    axiosRetry(axios, { retries: 3 });

    toast.loading('Unscheduled Tweet...', {
      className: 'text-sm silka-medium text-gray-900',
      duration: 80000,
    });

    const result = await axios.post(
      `${apiUrl()}twitter/delete/scheduledtweet`,
      null,
      {
        params: {
          scheduledId: scheduledId,
          workspaceId: workspaceId,
          userId: userId,
        },
      }
    );
    if (result.data.message == 'success') {
      toast.remove();
      toast.success('Tweet successfully unscheduled!', {
        className: 'text-sm silka-medium text-gray-900',
      });
    }
    return result.data;
  } catch (e) {
    toast.remove();
    toast.error('Error unscheduling tweet, please try again.', {
      className: 'text-sm silka-medium text-gray-900',
    });
    console.log(e);
  }
}

async function unscheduleThread(
  scheduledId: string,
  workspaceId: string,
  userId: string
) {
  try {
    axiosRetry(axios, { retries: 3 });

    toast.loading('Unscheduling Thread...', {
      className: 'text-sm silka-medium text-gray-900',
      duration: 80000,
    });

    const result = await axios.post(
      `${apiUrl()}twitter/delete/scheduledthread`,
      null,
      {
        params: {
          scheduledId: scheduledId,
          workspaceId: workspaceId,
          userId: userId,
        },
      }
    );
    if (result.data.message == 'success') {
      toast.remove();
      toast.success('Thread successfully unscheduled!', {
        className: 'text-sm silka-medium text-gray-900',
      });
    }
    return result.data;
  } catch (e) {
    toast.remove();
    toast.error('Error unscheduling thread, please try again.', {
      className: 'text-sm silka-medium text-gray-900',
    });
    console.log(e);
  }
}

async function unschedulePoll(
  scheduledId: string,
  workspaceId: string,
  userId: string
) {
  try {
    axiosRetry(axios, { retries: 3 });

    toast.loading('Unscheduling Poll...', {
      className: 'text-sm silka-medium text-gray-900',
      duration: 80000,
    });

    const result = await axios.post(
      `${apiUrl()}twitter/delete/scheduledpoll`,
      null,
      {
        params: {
          scheduledId: scheduledId,
          workspaceId: workspaceId,
          userId: userId,
        },
      }
    );
    if (result.data.message == 'success') {
      toast.remove();
      toast.success('Poll successfully unscheduled!', {
        className: 'text-sm silka-medium text-gray-900',
      });
    }
    return result.data;
  } catch (e) {
    toast.remove();
    toast.error('Error unscheduling poll, please try again.', {
      className: 'text-sm silka-medium text-gray-900',
    });
    console.log(e);
  }
}

async function getScheduledTweets(
  workspaceId: string,
  userId: string
) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}twitter/read/scheduledtweets`,
      {
        params: {
          workspaceId: workspaceId,
          userId: userId,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function getMoreTweets(
  workspaceId: string,
  userId: string,
  cursor: number
) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}twitter/read/morescheduled`,
      {
        params: {
          workspaceId: workspaceId,
          cursor: cursor,
          userId: userId,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

function ScheduleComponent({
  value,
  workspaceId,
  setRefetchTweets,
  date,
  userId,
}: ScheduleComponentProps) {
  const [hovered, setHovered] = useState(false);
  const [selectTweetOpen, setSelectTweetOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [urlLoading, setUrlLoading] = useState(false);
  const [googleUrl, setGoogleUrl] = useState<any>(null);

  useEffect(() => {
    if (value?.tweet?.fileId) {
      setUrlLoading(true);
      getThumbnail(value.tweet.fileId).then((res) => {
        setGoogleUrl(res.google_url);
        setUrlLoading(false);
      });
    }
  }, []);

  return (
    <div
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      className={
        'px-3 w-full flex flex-row justify-between items-between border rounded md:rounded-lg ' +
        (value.tweet ? 'bg-[#FCFCFD]' : 'h-11')
      }
    >
      {value.tweet ? (
        <div className="flex w-full flex-row justify-between items-between">
          <div className="flex flex-col justify-start items-start py-2 w-full">
            <div className="flex flex-row space-x-1">
              <span className="text-xs silka-medium text-gray-800">
                {value.time}
              </span>
              <span className="text-xs silka-medium text-gray-800">
                &middot;
              </span>
              <span className="text-xs silka-medium text-gray-500">
                {value.tweet.type.charAt(0).toUpperCase() +
                  value.tweet.type.slice(1)}
              </span>
            </div>
            {value?.tweet?.fileId ? (
              <>
                {urlLoading ? (
                  <div className="mt-2 w-[160px] h-[90px] flex flex-col justify-center items-center rounded bg-gray-200">
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
                  <img
                    className="w-[160px] h-[90px] rounded mt-2"
                    src={googleUrl}
                  />
                )}
              </>
            ) : (
              <></>
            )}
            <p className="mt-1.5 text-sm silka-regular text-gray-600">
              {value.tweet.text}
            </p>
          </div>
          {hovered ? (
            <div className="my-auto">
              <Dropdown>
                <Dropdown.Toggle className="my-auto">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="my-auto"
                  >
                    <path
                      d="M8.625 2.5C8.625 3.12132 8.12132 3.625 7.5 3.625C6.87868 3.625 6.375 3.12132 6.375 2.5C6.375 1.87868 6.87868 1.375 7.5 1.375C8.12132 1.375 8.625 1.87868 8.625 2.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM7.5 13.625C8.12132 13.625 8.625 13.1213 8.625 12.5C8.625 11.8787 8.12132 11.375 7.5 11.375C6.87868 11.375 6.375 11.8787 6.375 12.5C6.375 13.1213 6.87868 13.625 7.5 13.625Z"
                      fill="#363636"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </Dropdown.Toggle>
                <Dropdown.Menu className="rounded-lg border mt-6 w-40 bg-white py-1 px-2">
                  <div className="flex flex-col space-y-1 w-full">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        if (!confirmDelete) {
                          setConfirmDelete(true);
                        } else {
                          if (value.tweet.type == 'tweet') {
                            unscheduleTweet(
                              value.tweet.id,
                              workspaceId,
                              userId
                            ).then(() => {
                              setRefetchTweets(true);
                            });
                          } else if (value.tweet.type == 'thread') {
                            unscheduleThread(
                              value.tweet.id,
                              workspaceId,
                              userId
                            ).then(() => {
                              setRefetchTweets(true);
                            });
                          } else {
                            unschedulePoll(
                              value.tweet.id,
                              workspaceId,
                              userId
                            ).then(() => {
                              setRefetchTweets(true);
                            });
                          }
                        }
                      }}
                      className={
                        'flex py-1.5 rounded px-2 flex-row w-full justify-start items-start space-x-2 ' +
                        (confirmDelete ? '' : 'hover:bg-gray-100')
                      }
                    >
                      {!confirmDelete ? (
                        <>
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="my-auto"
                          >
                            <path
                              d="M4.5 1C4.77614 1 5 1.22386 5 1.5V2H10V1.5C10 1.22386 10.2239 1 10.5 1C10.7761 1 11 1.22386 11 1.5V2H12.5C13.3284 2 14 2.67157 14 3.5V12.5C14 13.3284 13.3284 14 12.5 14H2.5C1.67157 14 1 13.3284 1 12.5V3.5C1 2.67157 1.67157 2 2.5 2H4V1.5C4 1.22386 4.22386 1 4.5 1ZM10 3V3.5C10 3.77614 10.2239 4 10.5 4C10.7761 4 11 3.77614 11 3.5V3H12.5C12.7761 3 13 3.22386 13 3.5V5H2V3.5C2 3.22386 2.22386 3 2.5 3H4V3.5C4 3.77614 4.22386 4 4.5 4C4.77614 4 5 3.77614 5 3.5V3H10ZM2 6V12.5C2 12.7761 2.22386 13 2.5 13H12.5C12.7761 13 13 12.7761 13 12.5V6H2ZM7 7.5C7 7.22386 7.22386 7 7.5 7C7.77614 7 8 7.22386 8 7.5C8 7.77614 7.77614 8 7.5 8C7.22386 8 7 7.77614 7 7.5ZM9.5 7C9.22386 7 9 7.22386 9 7.5C9 7.77614 9.22386 8 9.5 8C9.77614 8 10 7.77614 10 7.5C10 7.22386 9.77614 7 9.5 7ZM11 7.5C11 7.22386 11.2239 7 11.5 7C11.7761 7 12 7.22386 12 7.5C12 7.77614 11.7761 8 11.5 8C11.2239 8 11 7.77614 11 7.5ZM11.5 9C11.2239 9 11 9.22386 11 9.5C11 9.77614 11.2239 10 11.5 10C11.7761 10 12 9.77614 12 9.5C12 9.22386 11.7761 9 11.5 9ZM9 9.5C9 9.22386 9.22386 9 9.5 9C9.77614 9 10 9.22386 10 9.5C10 9.77614 9.77614 10 9.5 10C9.22386 10 9 9.77614 9 9.5ZM7.5 9C7.22386 9 7 9.22386 7 9.5C7 9.77614 7.22386 10 7.5 10C7.77614 10 8 9.77614 8 9.5C8 9.22386 7.77614 9 7.5 9ZM5 9.5C5 9.22386 5.22386 9 5.5 9C5.77614 9 6 9.22386 6 9.5C6 9.77614 5.77614 10 5.5 10C5.22386 10 5 9.77614 5 9.5ZM3.5 9C3.22386 9 3 9.22386 3 9.5C3 9.77614 3.22386 10 3.5 10C3.77614 10 4 9.77614 4 9.5C4 9.22386 3.77614 9 3.5 9ZM3 11.5C3 11.2239 3.22386 11 3.5 11C3.77614 11 4 11.2239 4 11.5C4 11.7761 3.77614 12 3.5 12C3.22386 12 3 11.7761 3 11.5ZM5.5 11C5.22386 11 5 11.2239 5 11.5C5 11.7761 5.22386 12 5.5 12C5.77614 12 6 11.7761 6 11.5C6 11.2239 5.77614 11 5.5 11ZM7 11.5C7 11.2239 7.22386 11 7.5 11C7.77614 11 8 11.2239 8 11.5C8 11.7761 7.77614 12 7.5 12C7.22386 12 7 11.7761 7 11.5ZM9.5 11C9.22386 11 9 11.2239 9 11.5C9 11.7761 9.22386 12 9.5 12C9.77614 12 10 11.7761 10 11.5C10 11.2239 9.77614 11 9.5 11Z"
                              fill="#363636"
                              fillRule="evenodd"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <span className="text-xs silka-medium text-[#363636]">
                            Unschedule
                          </span>
                        </>
                      ) : (
                        <p className="text-xs silka-medium text-[#FF0000]">
                          Are you sure?
                        </p>
                      )}
                    </button>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <>
          <p className="my-auto text-xs md:text-sm silka-medium text-gray-500">
            {value.time}
          </p>
          {hovered ? (
            <div className="my-auto">
              <DialogPrimitive.Root
                open={selectTweetOpen}
                onOpenChange={setSelectTweetOpen}
              >
                <DialogPrimitive.Trigger asChild>
                  <button className="my-auto py-1 px-3 rounded text-xs hover:bg-[#E9F0F5] hover:opacity-80 silka-semibold text-[#1D9BF0]">
                    Pick Tweet
                  </button>
                </DialogPrimitive.Trigger>
                <SelectDraftTweetDialog
                  workspaceId={workspaceId}
                  isOpen={selectTweetOpen}
                  setIsOpen={setSelectTweetOpen}
                  setRefetchTweets={setRefetchTweets}
                  date={date}
                  time={`${value.hours}:${value.minutes}`}
                  userId={userId}
                />
              </DialogPrimitive.Root>
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
}

function ScheduleDate({
  value,
  workspaceId,
  setRefetchTweets,
  userId,
}: ScheduleDateProps) {
  return (
    <div className="flex flex-col space-y-3">
      <p className="silka-medium text-gray-900 text-xs md:text-sm">
        {value.date}
      </p>
      {value.schedule_slots.length == 0 ? (
        <div className="h-11 px-3 w-full flex flex-row justify-between border rounded md:rounded-lg">
          <p className="my-auto text-xs md:text-sm silka-medium text-gray-500 italic">
            No Tweets for Today!
          </p>
        </div>
      ) : (
        <>
          {value.schedule_slots.map((v: any, i: number) => {
            return (
              <ScheduleComponent
                value={v}
                workspaceId={workspaceId}
                setRefetchTweets={setRefetchTweets}
                date={value.date}
                key={i}
                userId={userId}
              />
            );
          })}
        </>
      )}
    </div>
  );
}

export function ScheduledTweets({ workspaceId }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [changeScheduleOpen, setChangeScheduleOpen] = useState(false);
  const [scheduleData, setScheduleData] = useState<any>(null);
  const [refetchScheduledTweets, setRefetchScheduledTweets] =
    useState(false);
  const { data: session, status } = useSession();
  const [timezone, setTimezone] = useState<any>(null);
  const [timezoneDialogOpen, setTimezoneDialogOpen] = useState(false);

  const [cursor, setCursor] = useState(1);
  const [moreLoading, setMoreLoading] = useState(false);
  const [ref, isVisible] = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (isVisible && !moreLoading) {
      setMoreLoading(true);
      getMoreTweets(
        workspaceId,
        String(session?.user?.id),
        cursor
      ).then((value) => {
        setCursor(cursor + 1);
        setScheduleData(scheduleData.concat(value.scheduled_tweets));
        setMoreLoading(false);
      });
    }
  }, [isVisible]);

  useEffect(() => {
    if (status == 'authenticated') {
      getScheduledTweets(workspaceId, session.user.id).then(
        (value) => {
          setScheduleData(value.scheduled_tweets);
          setTimezone(value.timezone);
          setIsLoading(false);
        }
      );
    }
  }, [status]);

  useEffect(() => {
    if (refetchScheduledTweets && status == 'authenticated') {
      getScheduledTweets(workspaceId, session?.user?.id).then(
        (value) => {
          setScheduleData(value.scheduled_tweets);
          setTimezone(value.timezone);
          setRefetchScheduledTweets(false);
        }
      );
    }
  }, [refetchScheduledTweets]);

  const timezoneNames: any = {
    '-12': 'Pacific/Wake',
    '-11': 'Pacific/Midway',
    '-10': `Pacific/Honolulu`,
    '-9': 'America/Juneau',
    '-8': 'America/Los_Angeles',
    '-7': 'America/Denver',
    '-6': 'America/Mexico_City',
    '-5': 'America/New_York',
    '-4': 'America/Caracas',
    '-3': 'America/Argentina/Buenos_Aires',
    '-2': 'Atlantic/South_Georgia',
    '-1': 'Atlantic/Azores',
    '0': 'Europe/London',
    '1': 'Europe/Paris',
    '2': 'Europe/Helsinki',
    '3': 'Europe/Moscow',
    '4': 'Asia/Baku',
    '5': 'Asia/Karachi',
    '6': 'Asia/Dhaka',
    '7': 'Asia/Bangkok',
    '8': 'Asia/Singapore',
    '9': 'Asia/Tokyo',
    '10': 'Australia/Sydney',
    '11': 'Pacific/Guadalcanal',
    '12': 'Pacific/Auckland',
    '13': 'Pacific/Tongatapu',
  };

  return (
    <>
      <div className="mt-8 md:mt-12">
        <div className="flex flex-col space-y-5 md:space-y-0 md:flex-row md:justify-between md:items-between">
          <div className="flex flex-col">
            <h2 className="text-base silka-semibold text-gray-900">
              Scheduled Tweets
            </h2>
            <p className="text-xs silka-regular text-gray-500">
              Upcoming tweets scheduled to be posted on Twitter.
            </p>
          </div>
          <div className="flex flex-row space-x-4">
            {isLoading ? (
              <button className="flex flex-row space-x-2 bg-gray-50 hover:bg-gray-100 h-fit my-auto py-1.5 px-4 rounded">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="my-auto"
                >
                  <path
                    d="M7.49996 1.80002C4.35194 1.80002 1.79996 4.352 1.79996 7.50002C1.79996 10.648 4.35194 13.2 7.49996 13.2C10.648 13.2 13.2 10.648 13.2 7.50002C13.2 4.352 10.648 1.80002 7.49996 1.80002ZM0.899963 7.50002C0.899963 3.85494 3.85488 0.900024 7.49996 0.900024C11.145 0.900024 14.1 3.85494 14.1 7.50002C14.1 11.1451 11.145 14.1 7.49996 14.1C3.85488 14.1 0.899963 11.1451 0.899963 7.50002Z"
                    fill="#363636"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                  <path
                    d="M13.4999 7.89998H1.49994V7.09998H13.4999V7.89998Z"
                    fill="#363636"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                  <path
                    d="M7.09991 13.5V1.5H7.89991V13.5H7.09991zM10.375 7.49998C10.375 5.32724 9.59364 3.17778 8.06183 1.75656L8.53793 1.24341C10.2396 2.82218 11.075 5.17273 11.075 7.49998 11.075 9.82724 10.2396 12.1778 8.53793 13.7566L8.06183 13.2434C9.59364 11.8222 10.375 9.67273 10.375 7.49998zM3.99969 7.5C3.99969 5.17611 4.80786 2.82678 6.45768 1.24719L6.94177 1.75281C5.4582 3.17323 4.69969 5.32389 4.69969 7.5 4.6997 9.67611 5.45822 11.8268 6.94179 13.2472L6.45769 13.7528C4.80788 12.1732 3.9997 9.8239 3.99969 7.5z"
                    fill="#363636"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  ></path>
                  <path
                    d="M7.49996 3.95801C9.66928 3.95801 11.8753 4.35915 13.3706 5.19448 13.5394 5.28875 13.5998 5.50197 13.5055 5.67073 13.4113 5.83948 13.198 5.89987 13.0293 5.8056 11.6794 5.05155 9.60799 4.65801 7.49996 4.65801 5.39192 4.65801 3.32052 5.05155 1.97064 5.8056 1.80188 5.89987 1.58866 5.83948 1.49439 5.67073 1.40013 5.50197 1.46051 5.28875 1.62927 5.19448 3.12466 4.35915 5.33063 3.95801 7.49996 3.95801zM7.49996 10.85C9.66928 10.85 11.8753 10.4488 13.3706 9.6135 13.5394 9.51924 13.5998 9.30601 13.5055 9.13726 13.4113 8.9685 13.198 8.90812 13.0293 9.00238 11.6794 9.75643 9.60799 10.15 7.49996 10.15 5.39192 10.15 3.32052 9.75643 1.97064 9.00239 1.80188 8.90812 1.58866 8.9685 1.49439 9.13726 1.40013 9.30601 1.46051 9.51924 1.62927 9.6135 3.12466 10.4488 5.33063 10.85 7.49996 10.85z"
                    fill="#363636"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <div className="my-auto rounded animate-pulse bg-gray-300 h-3.5 w-24"></div>
              </button>
            ) : (
              <div className="my-auto">
                <DialogPrimitive.Root
                  open={timezoneDialogOpen}
                  onOpenChange={setTimezoneDialogOpen}
                >
                  <DialogPrimitive.Trigger asChild>
                    <button className="flex flex-row space-x-2 bg-gray-50 hover:bg-gray-100 h-fit my-auto py-1.5 px-4 rounded">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="my-auto"
                      >
                        <path
                          d="M7.49996 1.80002C4.35194 1.80002 1.79996 4.352 1.79996 7.50002C1.79996 10.648 4.35194 13.2 7.49996 13.2C10.648 13.2 13.2 10.648 13.2 7.50002C13.2 4.352 10.648 1.80002 7.49996 1.80002ZM0.899963 7.50002C0.899963 3.85494 3.85488 0.900024 7.49996 0.900024C11.145 0.900024 14.1 3.85494 14.1 7.50002C14.1 11.1451 11.145 14.1 7.49996 14.1C3.85488 14.1 0.899963 11.1451 0.899963 7.50002Z"
                          fill="#363636"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                        <path
                          d="M13.4999 7.89998H1.49994V7.09998H13.4999V7.89998Z"
                          fill="#363636"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                        <path
                          d="M7.09991 13.5V1.5H7.89991V13.5H7.09991zM10.375 7.49998C10.375 5.32724 9.59364 3.17778 8.06183 1.75656L8.53793 1.24341C10.2396 2.82218 11.075 5.17273 11.075 7.49998 11.075 9.82724 10.2396 12.1778 8.53793 13.7566L8.06183 13.2434C9.59364 11.8222 10.375 9.67273 10.375 7.49998zM3.99969 7.5C3.99969 5.17611 4.80786 2.82678 6.45768 1.24719L6.94177 1.75281C5.4582 3.17323 4.69969 5.32389 4.69969 7.5 4.6997 9.67611 5.45822 11.8268 6.94179 13.2472L6.45769 13.7528C4.80788 12.1732 3.9997 9.8239 3.99969 7.5z"
                          fill="#363636"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                        ></path>
                        <path
                          d="M7.49996 3.95801C9.66928 3.95801 11.8753 4.35915 13.3706 5.19448 13.5394 5.28875 13.5998 5.50197 13.5055 5.67073 13.4113 5.83948 13.198 5.89987 13.0293 5.8056 11.6794 5.05155 9.60799 4.65801 7.49996 4.65801 5.39192 4.65801 3.32052 5.05155 1.97064 5.8056 1.80188 5.89987 1.58866 5.83948 1.49439 5.67073 1.40013 5.50197 1.46051 5.28875 1.62927 5.19448 3.12466 4.35915 5.33063 3.95801 7.49996 3.95801zM7.49996 10.85C9.66928 10.85 11.8753 10.4488 13.3706 9.6135 13.5394 9.51924 13.5998 9.30601 13.5055 9.13726 13.4113 8.9685 13.198 8.90812 13.0293 9.00238 11.6794 9.75643 9.60799 10.15 7.49996 10.15 5.39192 10.15 3.32052 9.75643 1.97064 9.00239 1.80188 8.90812 1.58866 8.9685 1.49439 9.13726 1.40013 9.30601 1.46051 9.51924 1.62927 9.6135 3.12466 10.4488 5.33063 10.85 7.49996 10.85z"
                          fill="#363636"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <p className="text-[11px] my-auto silka-medium text-gray-900">
                        {timezoneNames[String(timezone)]}
                      </p>
                    </button>
                  </DialogPrimitive.Trigger>
                  <MyTimezoneDialog
                    isOpen={timezoneDialogOpen}
                    setIsOpen={setTimezoneDialogOpen}
                    userId={String(session?.user?.id)}
                    setRefetchScheduled={setRefetchScheduledTweets}
                  />
                </DialogPrimitive.Root>
              </div>
            )}
            <div className="my-auto">
              <DialogPrimitive.Root
                open={changeScheduleOpen}
                onOpenChange={setChangeScheduleOpen}
              >
                <DialogPrimitive.Trigger asChild>
                  <button className="px-4 flex flex-row space-x-2 py-1.5 h-fit bg-gray-50 hover:bg-gray-100 rounded text-[11px] silka-medium my-auto">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="my-auto"
                    >
                      <path
                        d="M4.5 1C4.77614 1 5 1.22386 5 1.5V2H10V1.5C10 1.22386 10.2239 1 10.5 1C10.7761 1 11 1.22386 11 1.5V2H12.5C13.3284 2 14 2.67157 14 3.5V12.5C14 13.3284 13.3284 14 12.5 14H2.5C1.67157 14 1 13.3284 1 12.5V3.5C1 2.67157 1.67157 2 2.5 2H4V1.5C4 1.22386 4.22386 1 4.5 1ZM10 3V3.5C10 3.77614 10.2239 4 10.5 4C10.7761 4 11 3.77614 11 3.5V3H12.5C12.7761 3 13 3.22386 13 3.5V5H2V3.5C2 3.22386 2.22386 3 2.5 3H4V3.5C4 3.77614 4.22386 4 4.5 4C4.77614 4 5 3.77614 5 3.5V3H10ZM2 6V12.5C2 12.7761 2.22386 13 2.5 13H12.5C12.7761 13 13 12.7761 13 12.5V6H2ZM7 7.5C7 7.22386 7.22386 7 7.5 7C7.77614 7 8 7.22386 8 7.5C8 7.77614 7.77614 8 7.5 8C7.22386 8 7 7.77614 7 7.5ZM9.5 7C9.22386 7 9 7.22386 9 7.5C9 7.77614 9.22386 8 9.5 8C9.77614 8 10 7.77614 10 7.5C10 7.22386 9.77614 7 9.5 7ZM11 7.5C11 7.22386 11.2239 7 11.5 7C11.7761 7 12 7.22386 12 7.5C12 7.77614 11.7761 8 11.5 8C11.2239 8 11 7.77614 11 7.5ZM11.5 9C11.2239 9 11 9.22386 11 9.5C11 9.77614 11.2239 10 11.5 10C11.7761 10 12 9.77614 12 9.5C12 9.22386 11.7761 9 11.5 9ZM9 9.5C9 9.22386 9.22386 9 9.5 9C9.77614 9 10 9.22386 10 9.5C10 9.77614 9.77614 10 9.5 10C9.22386 10 9 9.77614 9 9.5ZM7.5 9C7.22386 9 7 9.22386 7 9.5C7 9.77614 7.22386 10 7.5 10C7.77614 10 8 9.77614 8 9.5C8 9.22386 7.77614 9 7.5 9ZM5 9.5C5 9.22386 5.22386 9 5.5 9C5.77614 9 6 9.22386 6 9.5C6 9.77614 5.77614 10 5.5 10C5.22386 10 5 9.77614 5 9.5ZM3.5 9C3.22386 9 3 9.22386 3 9.5C3 9.77614 3.22386 10 3.5 10C3.77614 10 4 9.77614 4 9.5C4 9.22386 3.77614 9 3.5 9ZM3 11.5C3 11.2239 3.22386 11 3.5 11C3.77614 11 4 11.2239 4 11.5C4 11.7761 3.77614 12 3.5 12C3.22386 12 3 11.7761 3 11.5ZM5.5 11C5.22386 11 5 11.2239 5 11.5C5 11.7761 5.22386 12 5.5 12C5.77614 12 6 11.7761 6 11.5C6 11.2239 5.77614 11 5.5 11ZM7 11.5C7 11.2239 7.22386 11 7.5 11C7.77614 11 8 11.2239 8 11.5C8 11.7761 7.77614 12 7.5 12C7.22386 12 7 11.7761 7 11.5ZM9.5 11C9.22386 11 9 11.2239 9 11.5C9 11.7761 9.22386 12 9.5 12C9.77614 12 10 11.7761 10 11.5C10 11.2239 9.77614 11 9.5 11Z"
                        fill="#363636"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <p className="my-auto">Change Schedule</p>
                  </button>
                </DialogPrimitive.Trigger>
                <TwitterScheduleTimesDialog
                  workspaceId={workspaceId}
                  refetchScheduledTweets={refetchScheduledTweets}
                  isOpen={changeScheduleOpen}
                  userId={String(session?.user?.id)}
                  setRefetchScheduledTweets={
                    setRefetchScheduledTweets
                  }
                />
              </DialogPrimitive.Root>
            </div>
          </div>
        </div>
        {isLoading ? (
          <div className="mt-8 flex flex-col space-y-3">
            <div className="h-11 w-full bg-gray-200 rounded-lg animate-pulse" />
            <div className="h-11 w-full bg-gray-200 rounded-lg animate-pulse" />
            <div className="h-11 w-full bg-gray-200 rounded-lg animate-pulse" />
          </div>
        ) : (
          <div className="mb-24 flex flex-col space-y-6 mt-8">
            {scheduleData?.map((value: any, index: number) => {
              return (
                <ScheduleDate
                  workspaceId={workspaceId}
                  value={value}
                  key={index}
                  setRefetchTweets={setRefetchScheduledTweets}
                  userId={String(session?.user?.id)}
                />
              );
            })}
            <div
              ref={ref}
              className="mt-4 w-full flex justify-center items-center flex-col"
            >
              {moreLoading ? (
                <div className="flex flex-row space-x-3">
                  <span className="animate-ping h-2.5 w-2.5 my-auto rounded-full bg-[#1D9BF0] opacity-75"></span>
                  <p className="text-xs my-auto silka-medium text-gray-800">
                    Getting More Slots...
                  </p>
                </div>
              ) : (
                <span className="h-[5px]" />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
