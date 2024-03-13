import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Transition } from '@headlessui/react';
import {
  Fragment,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import cx from 'classnames';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../utils/apiUrl';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';

let times = [
  '12:00am',
  '12:15am',
  '12:30am',
  '12:45am',
  '01:00am',
  '01:15am',
  '01:30am',
  '01:45am',
  '02:00am',
  '02:15am',
  '02:30am',
  '02:45am',
  '03:00am',
  '03:15am',
  '03:30am',
  '03:45am',
  '04:00am',
  '04:15am',
  '04:30am',
  '04:45am',
  '05:00am',
  '05:15am',
  '05:35am',
  '05:45am',
  '06:00am',
  '06:15am',
  '06:30am',
  '06:45am',
  '07:00am',
  '07:15am',
  '07:30am',
  '07:45am',
  '08:00am',
  '08:15am',
  '08:30am',
  '08:45am',
  '09:00am',
  '09:15am',
  '09:30am',
  '09:45am',
  '10:00am',
  '10:15am',
  '10:30am',
  '10:45am',
  '11:00am',
  '11:15am',
  '11:30am',
  '11:45am',
  '12:00pm',
  '12:15pm',
  '12:30pm',
  '12:45pm',
  '01:00pm',
  '01:15pm',
  '01:30pm',
  '01:45pm',
  '02:00pm',
  '02:15pm',
  '02:30pm',
  '02:45pm',
  '03:00pm',
  '03:15pm',
  '03:30pm',
  '03:45pm',
  '04:00pm',
  '04:15pm',
  '04:30pm',
  '04:45pm',
  '05:00pm',
  '05:15pm',
  '05:30pm',
  '05:45pm',
  '06:00pm',
  '06:15pm',
  '06:30pm',
  '06:45pm',
  '07:00pm',
  '07:15pm',
  '07:30pm',
  '07:45pm',
  '08:00pm',
  '08:15pm',
  '08:30pm',
  '08:45pm',
  '09:00pm',
  '09:15pm',
  '09:30pm',
  '09:45pm',
  '10:00pm',
  '10:15pm',
  '10:30pm',
  '10:45pm',
  '11:00pm',
  '11:15pm',
  '11:30pm',
  '11:45pm',
];

interface Props {
  isOpen: boolean;
  workspaceId: string;
  userId: string;
  refetchScheduledVideos: boolean;
  setRefetchScheduledVideos: Dispatch<SetStateAction<boolean>>;
}

interface SingleComponentProps {
  value: any;
  index: number;
  scheduleData: any;
  setScheduleData: Dispatch<SetStateAction<any>>;
  userId: string;
  setRefetchScheduledVideos: Dispatch<SetStateAction<boolean>>;
  workspaceId: string;
}

async function getPostingSchedule(
  workspaceId: string,
  userId: string
) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}youtube/read/myschedule`,
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

async function createSchedule(
  workspaceId: string,
  time: string,
  userId: string
) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.post(
      `${apiUrl()}youtube/create/scheduletime`,
      null,
      {
        params: {
          workspaceId: workspaceId,
          time: time,
          userId: userId,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function deleteSchedule(
  scheduleId: string,
  workspaceId: string,
  userId: string
) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.post(
      `${apiUrl()}youtube/delete/schedule`,
      null,
      {
        params: {
          scheduleId: scheduleId,
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

async function updateSchedule(
  scheduleId: string,
  mon: boolean,
  tue: boolean,
  wed: boolean,
  thu: boolean,
  fri: boolean,
  sat: boolean,
  sun: boolean,
  workspaceId: string,
  userId: string
) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.post(
      `${apiUrl()}youtube/update/schedule`,
      null,
      {
        params: {
          scheduleId: scheduleId,
          mon: mon,
          tue: tue,
          wed: wed,
          thu: thu,
          fri: fri,
          sat: sat,
          sun: sun,
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

function SingleComponent({
  value,
  index,
  scheduleData,
  setScheduleData,
  setRefetchScheduledVideos,
  userId,
  workspaceId,
}: SingleComponentProps) {
  const [mon, setMon] = useState(value.mon);
  const [tue, setTue] = useState(value.tue);
  const [wed, setWed] = useState(value.wed);
  const [thu, setThu] = useState(value.thu);
  const [fri, setFri] = useState(value.fri);
  const [sat, setSat] = useState(value.sat);
  const [sun, setSun] = useState(value.sun);

  return (
    <div className="flex flex-row w-full">
      <div className="w-1/6 flex flex-row justify-between items-between">
        <p className="text-xs silka-medium text-gray-600 my-auto">
          {value.time}
        </p>
        <button
          onClick={(e) => {
            e.preventDefault();
            deleteSchedule(value.id, workspaceId, userId).then(() => {
              setRefetchScheduledVideos(true);
            });
            setScheduleData(
              scheduleData.filter((value: any, i: number) => {
                if (i == index) {
                  return false;
                } else {
                  return true;
                }
              })
            );
          }}
          className="my-auto"
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="my-auto"
          >
            <path
              d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
              fill="#363636"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <div className="w-5/6 flex flex-row">
        <div className="flex flex-col justify-center items-center w-[14.2857%]">
          <button
            onClick={(e) => {
              e.preventDefault();
              updateSchedule(
                value.id,
                !mon,
                tue,
                wed,
                thu,
                fri,
                sat,
                sun,
                workspaceId,
                userId
              ).then(() => {
                setRefetchScheduledVideos(true);
              });
              let temp = [];
              for (let i = 0; i < scheduleData.length; i++) {
                if (index == i) {
                  temp.push({
                    id: scheduleData[i].id,
                    time: scheduleData[i].time,
                    mon: !mon,
                    tue: tue,
                    wed: wed,
                    thu: thu,
                    fri: fri,
                    sat: sat,
                    sun: sun,
                    tiktokId: scheduleData[i].tiktokId,
                  });
                } else {
                  temp.push(scheduleData[i]);
                }
              }
              setScheduleData(temp);
              setMon(!mon);
            }}
          >
            <CheckboxPrimitive.Root
              id="c1"
              checked={mon}
              className={cx(
                'my-auto flex h-4 w-4 items-center justify-center rounded',
                'radix-state-checked:bg-[#FF0000] radix-state-unchecked:bg-gray-100',
                'focus:outline-none focus-visible:ring focus-visible:ring-[#FF0000] focus-visible:ring-opacity-75'
              )}
            >
              <CheckboxPrimitive.Indicator>
                <CheckIcon className="h-4 w-4 self-center text-white" />
              </CheckboxPrimitive.Indicator>
            </CheckboxPrimitive.Root>
          </button>
        </div>
        <div className="flex flex-col justify-center items-center w-[14.2857%]">
          <button
            onClick={(e) => {
              e.preventDefault();
              updateSchedule(
                value.id,
                mon,
                !tue,
                wed,
                thu,
                fri,
                sat,
                sun,
                workspaceId,
                userId
              ).then(() => {
                setRefetchScheduledVideos(true);
              });
              let temp = [];
              for (let i = 0; i < scheduleData.length; i++) {
                if (index == i) {
                  temp.push({
                    id: scheduleData[i].id,
                    time: scheduleData[i].time,
                    mon: mon,
                    tue: !tue,
                    wed: wed,
                    thu: thu,
                    fri: fri,
                    sat: sat,
                    sun: sun,
                    tiktokId: scheduleData[i].tiktokId,
                  });
                } else {
                  temp.push(scheduleData[i]);
                }
              }
              setScheduleData(temp);
              setTue(!tue);
            }}
          >
            <CheckboxPrimitive.Root
              id="c1"
              checked={tue}
              className={cx(
                'my-auto flex h-4 w-4 items-center justify-center rounded',
                'radix-state-checked:bg-[#FF0000] radix-state-unchecked:bg-gray-100',
                'focus:outline-none focus-visible:ring focus-visible:ring-[#FF0000] focus-visible:ring-opacity-75'
              )}
            >
              <CheckboxPrimitive.Indicator>
                <CheckIcon className="h-4 w-4 self-center text-white" />
              </CheckboxPrimitive.Indicator>
            </CheckboxPrimitive.Root>
          </button>
        </div>
        <div className="flex flex-col justify-center items-center w-[14.2857%]">
          <button
            onClick={(e) => {
              e.preventDefault();
              updateSchedule(
                value.id,
                mon,
                tue,
                !wed,
                thu,
                fri,
                sat,
                sun,
                workspaceId,
                userId
              ).then(() => {
                setRefetchScheduledVideos(true);
              });
              let temp = [];
              for (let i = 0; i < scheduleData.length; i++) {
                if (index == i) {
                  temp.push({
                    id: scheduleData[i].id,
                    time: scheduleData[i].time,
                    mon: mon,
                    tue: tue,
                    wed: !wed,
                    thu: thu,
                    fri: fri,
                    sat: sat,
                    sun: sun,
                    tiktokId: scheduleData[i].tiktokId,
                  });
                } else {
                  temp.push(scheduleData[i]);
                }
              }
              setScheduleData(temp);
              setWed(!wed);
            }}
          >
            <CheckboxPrimitive.Root
              id="c1"
              checked={wed}
              className={cx(
                'my-auto flex h-4 w-4 items-center justify-center rounded',
                'radix-state-checked:bg-[#FF0000] radix-state-unchecked:bg-gray-100',
                'focus:outline-none focus-visible:ring focus-visible:ring-[#FF0000] focus-visible:ring-opacity-75'
              )}
            >
              <CheckboxPrimitive.Indicator>
                <CheckIcon className="h-4 w-4 self-center text-white" />
              </CheckboxPrimitive.Indicator>
            </CheckboxPrimitive.Root>
          </button>
        </div>
        <div className="flex flex-col justify-center items-center w-[14.2857%]">
          <button
            onClick={(e) => {
              e.preventDefault();
              updateSchedule(
                value.id,
                mon,
                tue,
                wed,
                !thu,
                fri,
                sat,
                sun,
                workspaceId,
                userId
              ).then(() => {
                setRefetchScheduledVideos(true);
              });
              let temp = [];
              for (let i = 0; i < scheduleData.length; i++) {
                if (index == i) {
                  temp.push({
                    id: scheduleData[i].id,
                    time: scheduleData[i].time,
                    mon: mon,
                    tue: tue,
                    wed: wed,
                    thu: !thu,
                    fri: fri,
                    sat: sat,
                    sun: sun,
                    tiktokId: scheduleData[i].tiktokId,
                  });
                } else {
                  temp.push(scheduleData[i]);
                }
              }
              setScheduleData(temp);
              setThu(!thu);
            }}
          >
            <CheckboxPrimitive.Root
              id="c1"
              checked={thu}
              className={cx(
                'my-auto flex h-4 w-4 items-center justify-center rounded',
                'radix-state-checked:bg-[#FF0000] radix-state-unchecked:bg-gray-100',
                'focus:outline-none focus-visible:ring focus-visible:ring-[#FF0000] focus-visible:ring-opacity-75'
              )}
            >
              <CheckboxPrimitive.Indicator>
                <CheckIcon className="h-4 w-4 self-center text-white" />
              </CheckboxPrimitive.Indicator>
            </CheckboxPrimitive.Root>
          </button>
        </div>
        <div className="flex flex-col justify-center items-center w-[14.2857%]">
          <button
            onClick={(e) => {
              e.preventDefault();
              updateSchedule(
                value.id,
                mon,
                tue,
                wed,
                thu,
                !fri,
                sat,
                sun,
                workspaceId,
                userId
              ).then(() => {
                setRefetchScheduledVideos(true);
              });
              let temp = [];
              for (let i = 0; i < scheduleData.length; i++) {
                if (index == i) {
                  temp.push({
                    id: scheduleData[i].id,
                    time: scheduleData[i].time,
                    mon: mon,
                    tue: tue,
                    wed: wed,
                    thu: thu,
                    fri: !fri,
                    sat: sat,
                    sun: sun,
                    tiktokId: scheduleData[i].tiktokId,
                  });
                } else {
                  temp.push(scheduleData[i]);
                }
              }
              setScheduleData(temp);
              setFri(!fri);
            }}
          >
            <CheckboxPrimitive.Root
              id="c1"
              checked={fri}
              className={cx(
                'my-auto flex h-4 w-4 items-center justify-center rounded',
                'radix-state-checked:bg-[#FF0000] radix-state-unchecked:bg-gray-100',
                'focus:outline-none focus-visible:ring focus-visible:ring-[#FF0000] focus-visible:ring-opacity-75'
              )}
            >
              <CheckboxPrimitive.Indicator>
                <CheckIcon className="h-4 w-4 self-center text-white" />
              </CheckboxPrimitive.Indicator>
            </CheckboxPrimitive.Root>
          </button>
        </div>
        <div className="flex flex-col justify-center items-center w-[14.2857%]">
          <button
            onClick={(e) => {
              e.preventDefault();
              updateSchedule(
                value.id,
                mon,
                tue,
                wed,
                thu,
                fri,
                !sat,
                sun,
                workspaceId,
                userId
              ).then(() => {
                setRefetchScheduledVideos(true);
              });
              let temp = [];
              for (let i = 0; i < scheduleData.length; i++) {
                if (index == i) {
                  temp.push({
                    id: scheduleData[i].id,
                    time: scheduleData[i].time,
                    mon: mon,
                    tue: tue,
                    wed: wed,
                    thu: thu,
                    fri: fri,
                    sat: !sat,
                    sun: sun,
                    tiktokId: scheduleData[i].tiktokId,
                  });
                } else {
                  temp.push(scheduleData[i]);
                }
              }
              setScheduleData(temp);
              setSat(!sat);
            }}
          >
            <CheckboxPrimitive.Root
              id="c1"
              checked={sat}
              className={cx(
                'my-auto flex h-4 w-4 items-center justify-center rounded',
                'radix-state-checked:bg-[#FF0000] radix-state-unchecked:bg-gray-100',
                'focus:outline-none focus-visible:ring focus-visible:ring-[#FF0000] focus-visible:ring-opacity-75'
              )}
            >
              <CheckboxPrimitive.Indicator>
                <CheckIcon className="h-4 w-4 self-center text-white" />
              </CheckboxPrimitive.Indicator>
            </CheckboxPrimitive.Root>
          </button>
        </div>
        <div className="flex flex-col justify-center items-center w-[14.2857%]">
          <button
            onClick={(e) => {
              e.preventDefault();
              updateSchedule(
                value.id,
                mon,
                tue,
                wed,
                thu,
                fri,
                sat,
                !sun,
                workspaceId,
                userId
              ).then(() => {
                setRefetchScheduledVideos(true);
              });
              let temp = [];
              for (let i = 0; i < scheduleData.length; i++) {
                if (index == i) {
                  temp.push({
                    id: scheduleData[i].id,
                    time: scheduleData[i].time,
                    mon: mon,
                    tue: tue,
                    wed: wed,
                    thu: thu,
                    fri: fri,
                    sat: sat,
                    sun: !sun,
                    tiktokId: scheduleData[i].tiktokId,
                  });
                } else {
                  temp.push(scheduleData[i]);
                }
              }
              setScheduleData(temp);
              setSun(!sun);
            }}
          >
            <CheckboxPrimitive.Root
              id="c1"
              checked={sun}
              className={cx(
                'my-auto flex h-4 w-4 items-center justify-center rounded',
                'radix-state-checked:bg-[#FF0000] radix-state-unchecked:bg-gray-100',
                'focus:outline-none focus-visible:ring focus-visible:ring-[#FF0000] focus-visible:ring-opacity-75'
              )}
            >
              <CheckboxPrimitive.Indicator>
                <CheckIcon className="h-4 w-4 self-center text-white" />
              </CheckboxPrimitive.Indicator>
            </CheckboxPrimitive.Root>
          </button>
        </div>
      </div>
    </div>
  );
}

export function YoutubeScheduleTimesDialog({
  isOpen,
  workspaceId,
  userId,
  refetchScheduledVideos,
  setRefetchScheduledVideos,
}: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [scheduleData, setScheduleData] = useState<any>(null);

  useEffect(() => {
    getPostingSchedule(workspaceId, userId).then((value) => {
      setScheduleData(value);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (refetchScheduledVideos) {
      getPostingSchedule(workspaceId, userId).then((value) => {
        setScheduleData(value);
        setRefetchScheduledVideos(false);
      });
    }
  }, [refetchScheduledVideos]);

  return (
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
          className={cx(
            'fixed z-50',
            'w-[95vw] max-w-lg rounded-lg p-4 md:w-full',
            'top-[50%] left-[50%] max-h-[75vh] overflow-auto -translate-x-[50%] -translate-y-[50%]',
            'bg-white',
            'focus:outline-none focus-visible:ring-0'
          )}
        >
          <div className="flex flex-col justify-center items-center w-full">
            <div className="flex flex-col justify-center items-center space-y-1.5">
              <h2 className="silka-semibold text-gray-800 text-2xl">
                My Schedule
              </h2>
              <p className="text-xs silka-regular text-gray-400">
                Youtube schedule for videos to be scheduled on.
              </p>
            </div>
            <div className="flex flex-row mt-6 w-full">
              <div className="w-1/6">
                <p className="text-xs silka-medium text-gray-600">
                  Time
                </p>
              </div>
              <div className="w-5/6 flex flex-row">
                <div className="flex flex-col justify-center items-center w-[14.2857%]">
                  <p className="text-xs silka-medium text-gray-900">
                    Mon
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center w-[14.2857%]">
                  <p className="text-xs silka-medium text-gray-900">
                    Tue
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center w-[14.2857%]">
                  <p className="text-xs silka-medium text-gray-900">
                    Wed
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center w-[14.2857%]">
                  <p className="text-xs silka-medium text-gray-900">
                    Thu
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center w-[14.2857%]">
                  <p className="text-xs silka-medium text-gray-900">
                    Fri
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center w-[14.2857%]">
                  <p className="text-xs silka-medium text-gray-900">
                    Sat
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center w-[14.2857%]">
                  <p className="text-xs silka-medium text-gray-900">
                    Sun
                  </p>
                </div>
              </div>
            </div>
            {isLoading ? (
              <div className="mt-4 flex flex-col space-y-2">
                <div className="flex flex-row space-x-3">
                  <div className="w-1/4 h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="w-1/4 h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="w-1/4 h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="w-1/4 h-4 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="flex flex-row space-x-3">
                  <div className="w-1/3 h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="w-1/3 h-4 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="flex flex-row space-x-3">
                  <div className="w-1/2 h-4 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            ) : (
              <div className="mt-4 flex flex-col space-y-4 w-full">
                {scheduleData.length == 0 ? (
                  <div className="mt-3 flex flex-col justify-center space-y-1.5 items-center w-full">
                    <p className="text-gray-900 silka-semibold">
                      No Schedule Times Found
                    </p>
                    <span className="text-xs silka-regular text-gray-600">
                      Create a schedule time to continue...
                    </span>
                  </div>
                ) : (
                  <>
                    {scheduleData?.map(
                      (value: any, index: number) => {
                        return (
                          <SingleComponent
                            index={index}
                            scheduleData={scheduleData}
                            setScheduleData={setScheduleData}
                            value={value}
                            setRefetchScheduledVideos={
                              setRefetchScheduledVideos
                            }
                            userId={userId}
                            key={index}
                            workspaceId={workspaceId}
                          />
                        );
                      }
                    )}
                  </>
                )}
              </div>
            )}
            <div className="mt-6 flex flex-col justify-start items-start w-full">
              <select
                value=""
                onChange={(e) => {
                  e.preventDefault();
                  createSchedule(
                    workspaceId,
                    e.target.value,
                    userId
                  ).then((value) => {
                    setScheduleData(
                      scheduleData.concat({
                        id: value.id,
                        time: value.time,
                        mon: true,
                        tue: true,
                        wed: true,
                        thu: true,
                        fri: true,
                        sat: false,
                        sun: false,
                        tiktokId: value.tiktokId,
                      })
                    );
                    setRefetchScheduledVideos(true);
                  });
                }}
                className="focus:ring-0 focus:border-[#FF0000] w-24 py-1 rounded border border-gray-300 silka-medium text-sm text-gray-900"
              >
                <option value="" disabled selected>
                  +
                </option>
                {times.map((value: any, index: number) => {
                  return (
                    <option value={value} key={index}>
                      <span>{value}</span>
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </DialogPrimitive.Content>
      </Transition.Child>
    </Transition.Root>
  );
}
