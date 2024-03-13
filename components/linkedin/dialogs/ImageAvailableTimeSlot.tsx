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
import { apiUrl } from '../../../utils/apiUrl';
import { Scroll } from '../../utils/Scroll';
import { useInView } from 'react-hook-inview';
import toast from 'react-hot-toast';

async function createScheduledImage(
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
    if (result.data.message == 'success') {
      toast.remove();
      toast.success('Successfully Scheduled Image!', {
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

interface Props {
  workspaceId: string;
  userId: string;
  draftId: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setScheduleOpen: Dispatch<SetStateAction<boolean>>;
  setRefetchDrafts: Dispatch<SetStateAction<boolean>>;
  setSelectedImage: Dispatch<SetStateAction<any>>;
}

interface ScheduleDateProps {
  value: any;
  workspaceId: string;
  draftId: string;
  userId: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setRefetchDrafts: Dispatch<SetStateAction<boolean>>;
  setSelectedImage: Dispatch<SetStateAction<any>>;
}

interface ScheduleComponentProps {
  value: any;
  date: any;
  draftId: string;
  userId: string;
  workspaceId: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setRefetchDrafts: Dispatch<SetStateAction<boolean>>;
  setSelectedImage: Dispatch<SetStateAction<any>>;
}

function ScheduleComponent({
  value,
  workspaceId,
  date,
  setIsOpen,
  draftId,
  userId,
  setRefetchDrafts,
  setSelectedImage,
}: ScheduleComponentProps) {
  return (
    <div className="h-10 px-3 w-full flex flex-row justify-between items-between border rounded-lg">
      <p className="my-auto text-sm silka-medium text-gray-500">
        {value.time}
      </p>
      <button
        onClick={(e) => {
          e.preventDefault();
          createScheduledImage(
            workspaceId,
            userId,
            draftId,
            date,
            `${value.hours}:${value.minutes}`
          ).then(() => {
            setRefetchDrafts(true);
            setSelectedImage(null);
          });
          setIsOpen(false);
        }}
        className="text-[#0966C2] silka-medium text-sm hover:opacity-80"
      >
        Select Time
      </button>
    </div>
  );
}

function ScheduleDate({
  value,
  workspaceId,
  setIsOpen,
  draftId,
  userId,
  setRefetchDrafts,
  setSelectedImage,
}: ScheduleDateProps) {
  return (
    <div className="flex flex-col space-y-3 px-3">
      <p className="silka-medium text-gray-900 text-xs">
        {value.date}
      </p>
      {value.schedule_slots.length == 0 ? (
        <div className="h-11 px-3 w-full flex flex-row justify-betweent border rounded-lg">
          <p className="my-auto text-sm silka-medium text-gray-500 italic">
            No Available Time Slots for Today.
          </p>
        </div>
      ) : (
        <>
          {value.schedule_slots.map((v: any, i: number) => {
            return (
              <ScheduleComponent
                value={v}
                workspaceId={workspaceId}
                draftId={draftId}
                userId={userId}
                setIsOpen={setIsOpen}
                date={value.date}
                key={i}
                setRefetchDrafts={setRefetchDrafts}
                setSelectedImage={setSelectedImage}
              />
            );
          })}
        </>
      )}
    </div>
  );
}

async function getAvailableSlots(
  workspaceId: string,
  userId: string
) {
  try {
    const result = await axios.get(
      `${apiUrl()}linkedin/read/availableslots`,
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

async function getMoreAvailableSlots(
  workspaceId: string,
  userId: string,
  cursor: number
) {
  try {
    const result = await axios.get(
      `${apiUrl()}linkedin/read/moreavailableslots`,
      {
        params: {
          workspaceId: workspaceId,
          userId: userId,
          cursor: cursor,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

export function LinkedinImageAvailableTimeSlot({
  workspaceId,
  userId,
  draftId,
  isOpen,
  setIsOpen,
  setScheduleOpen,
  setRefetchDrafts,
  setSelectedImage,
}: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [scheduleData, setScheduleData] = useState<any>(null);
  const [cursor, setCursor] = useState(1);
  const [moreLoading, setMoreLoading] = useState(false);
  const [ref, isVisible] = useInView({ threshold: 1 });

  useEffect(() => {
    getAvailableSlots(workspaceId, userId).then((data) => {
      setScheduleData(data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (isVisible && !moreLoading) {
      setMoreLoading(true);
      getMoreAvailableSlots(workspaceId, userId, cursor).then(
        (value) => {
          setCursor(cursor + 1);
          setScheduleData(scheduleData.concat(value));
          setMoreLoading(false);
        }
      );
    }
  }, [isVisible]);

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
            'w-[95vw] max-w-lg rounded-lg py-4 px-1 md:w-full',
            'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
            'bg-white',
            'focus:outline-none focus-visible:ring-0'
          )}
        >
          <div className="flex flex-col w-full">
            <div className="w-fit">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                  setScheduleOpen(true);
                }}
                className="flex flex-row space-x-2 my-auto hover:opacity-80"
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
                    d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
                    fill="#363636"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <p className="text-[11px] silka-regular text-[#363636]">
                  Back to Schedule Post
                </p>
              </button>
            </div>
            <div className="flex w-full flex-col mt-3 space-y-1.5 justify-center items-center">
              <h2 className="silka-semibold text-gray-800 text-2xl">
                Available Time Slots
              </h2>
              <p className="text-xs silka-regular text-gray-400">
                Select one of the available time slots to schedule a
                post at this time.
              </p>
            </div>
            {isLoading ? (
              <div className="my-auto w-full flex flex-col mt-6 space-y-2">
                <div className="w-full h-4 rounded bg-gray-200 animate-pulse" />
                <div className="w-[85%] h-4 rounded bg-gray-200 animate-pulse" />
                <div className="w-[70%] h-4 rounded bg-gray-200 animate-pulse" />
              </div>
            ) : (
              <div className="h-[400px] mt-6 w-full">
                <Scroll>
                  <div className="flex flex-col space-y-6 py-2 px-3">
                    {scheduleData?.map(
                      (value: any, index: number) => {
                        return (
                          <ScheduleDate
                            workspaceId={workspaceId}
                            draftId={draftId}
                            value={value}
                            userId={userId}
                            setIsOpen={setIsOpen}
                            key={index}
                            setRefetchDrafts={setRefetchDrafts}
                            setSelectedImage={setSelectedImage}
                          />
                        );
                      }
                    )}
                    <div
                      ref={ref}
                      className="mt-4 w-full flex justify-center items-center flex-col"
                    >
                      {moreLoading ? (
                        <div className="flex flex-row space-x-3">
                          <span className="animate-ping h-2.5 w-2.5 my-auto rounded-full bg-[#066CE5] opacity-75"></span>
                          <p className="text-xs my-auto silka-medium text-gray-800">
                            Getting More Slots...
                          </p>
                        </div>
                      ) : (
                        <span className="h-[5px]" />
                      )}
                    </div>
                  </div>
                </Scroll>
              </div>
            )}
          </div>
        </DialogPrimitive.Content>
      </Transition.Child>
    </Transition.Root>
  );
}
