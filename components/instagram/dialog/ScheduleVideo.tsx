import { Transition } from '@headlessui/react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { clsx } from 'clsx';
import React, { Fragment, Dispatch, SetStateAction } from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import cx from 'classnames';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import toast from 'react-hot-toast';
import { apiUrl } from '../../../utils/apiUrl';

async function nextTimeSlot(
  workspaceId: string,
  draftId: string,
  userId: string
) {
  try {
    axiosRetry(axios, { retries: 3 });

    toast.loading('Scheduling Video...', {
      className: 'text-sm silka-medium text-gray-900',
      duration: 80000,
    });
    const result = await axios.post(
      `${apiUrl()}instagram/create/videonexttimeslot`,
      null,
      {
        params: {
          workspaceId: workspaceId,
          draftId: draftId,
          userId: userId,
        },
      }
    );
    if (result.data.message == 'success') {
      toast.remove();
      toast.success('Successfully Scheduled Video!', {
        className: 'text-sm silka-medium text-gray-900',
      });
    } else if (result.data.message == 'video size') {
      toast.remove();
      toast.error(
        'Make sure the video dimensions are as close to 1:1',
        {
          className: 'text-sm silka-medium text-gray-900',
        }
      );
    } else {
      toast.remove();
      if (result.data.reason == 'slots') {
        toast.error('No available timeslots', {
          className: 'text-sm silka-medium text-gray-900',
        });
      } else {
        toast.error('Error scheduling video, please try again.', {
          className: 'text-sm silka-medium text-gray-900',
        });
      }
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

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  workspaceId: string;
  autoRepostOpen: boolean;
  repostMetric: string;
  repostInputValue: number;
  autoPlugOpen: boolean;
  plugMetric: string;
  plugInputValue: number;
  plugText: string;
  timeSlotsOpen: boolean;
  setTimeSlotsOpen: Dispatch<SetStateAction<boolean>>;
  draftId: string;
  setRefetchDrafts: Dispatch<SetStateAction<boolean>>;
  setSelectedVideo: Dispatch<SetStateAction<any>>;
  setVideoMedia: Dispatch<SetStateAction<any>>;
  videoMedia: any;
  postText: string;
  setOptionsOpen: Dispatch<SetStateAction<boolean>>;
  setAutoRepostOpen: Dispatch<SetStateAction<boolean>>;
  setAutoPlugOpen: Dispatch<SetStateAction<boolean>>;
  userId: string;
}

export function InstagramScheduleVideo({
  isOpen,
  setIsOpen,
  workspaceId,
  autoRepostOpen,
  repostMetric,
  repostInputValue,
  autoPlugOpen,
  plugMetric,
  plugInputValue,
  plugText,
  timeSlotsOpen,
  setTimeSlotsOpen,
  draftId,
  setRefetchDrafts,
  setSelectedVideo,
  setVideoMedia,
  videoMedia,
  postText,
  setOptionsOpen,
  setAutoPlugOpen,
  setAutoRepostOpen,
  userId,
}: Props) {
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
              'w-[95vw] max-w-md rounded-lg p-4 md:w-full',
              'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
              'bg-white dark:bg-gray-800',
              'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
            )}
          >
            <div className="w-full flex flex-col justify-center items-center">
              <DialogPrimitive.Title className="text-2xl silka-bold text-gray-800">
                Schedule Video
              </DialogPrimitive.Title>
              <p className="mt-2.5 text-xs silka-regular text-gray-400">
                Schedule video to be posted on Instagram.
              </p>
            </div>
            <div className="flex flex-col space-y-3 mt-5">
              <h3 className="text-[10px] text-gray-400 silka-semibold">
                POST OPTIONS
              </h3>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setOptionsOpen(true);
                  setAutoRepostOpen(true);
                }}
                className="flex flex-row space-x-2.5"
              >
                <SwitchPrimitive.Root
                  checked={autoRepostOpen}
                  className={cx(
                    'group my-auto',
                    'radix-state-checked:bg-[#F604D0]',
                    'radix-state-unchecked:bg-gray-200',
                    'relative inline-flex h-[18px] w-[34px] flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out',
                    'focus:outline-none focus-visible:ring-0'
                  )}
                >
                  <SwitchPrimitive.Thumb
                    className={cx(
                      'group-radix-state-checked:translate-x-4',
                      'group-radix-state-unchecked:translate-x-0',
                      'pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out'
                    )}
                  />
                </SwitchPrimitive.Root>
                <p className="text-sm my-auto silka-medium text-gray-600">
                  Auto Repost
                </p>
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setOptionsOpen(true);
                  setAutoPlugOpen(true);
                }}
                className="flex flex-row space-x-2.5"
              >
                <SwitchPrimitive.Root
                  checked={autoPlugOpen}
                  className={cx(
                    'group my-auto',
                    'radix-state-checked:bg-[#F604D0]',
                    'radix-state-unchecked:bg-gray-200',
                    'relative inline-flex h-[18px] w-[34px] flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out',
                    'focus:outline-none focus-visible:ring-0'
                  )}
                >
                  <SwitchPrimitive.Thumb
                    className={cx(
                      'group-radix-state-checked:translate-x-4',
                      'group-radix-state-unchecked:translate-x-0',
                      'pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out'
                    )}
                  />
                </SwitchPrimitive.Root>
                <p className="text-sm my-auto silka-medium text-gray-600">
                  Auto Plug
                </p>
              </button>
            </div>
            <div className="mt-7 flex flex-col space-y-2.5">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                  if (autoRepostOpen && repostInputValue == 0) {
                    toast.error('Auto-Repost Input Cannot be 0', {
                      className: 'silka-medium text-sm text-gray-900',
                    });
                  } else if (autoPlugOpen && plugInputValue == 0) {
                    toast.error('Auto-Plug Input Cannot be 0', {
                      className: 'silka-medium text-sm text-gray-900',
                    });
                  } else if (autoPlugOpen && plugText == '') {
                    toast.error('Auto-Plug Text Cannot be Empty', {
                      className: 'silka-medium text-sm text-gray-900',
                    });
                  } else if (!videoMedia) {
                    toast.error(
                      'Please select a video to be posted.',
                      {
                        className:
                          'silka-medium text-sm text-gray-900',
                      }
                    );
                  } else if (postText == '') {
                    toast.error('Please add a caption', {
                      className: 'text-sm silka-medium text-gray-900',
                    });
                  } else {
                    nextTimeSlot(workspaceId, draftId, userId).then(
                      () => {
                        setRefetchDrafts(true);
                      }
                    );
                    setSelectedVideo(null);
                    setVideoMedia(null);
                  }
                }}
                className="flex flex-row space-x-2 border py-2 border-gray-300 hover:bg-gray-50 w-full rounded-full justify-center items-center"
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
                    d="M2.14645 11.1464C1.95118 11.3417 1.95118 11.6583 2.14645 11.8536C2.34171 12.0488 2.65829 12.0488 2.85355 11.8536L6.85355 7.85355C7.04882 7.65829 7.04882 7.34171 6.85355 7.14645L2.85355 3.14645C2.65829 2.95118 2.34171 2.95118 2.14645 3.14645C1.95118 3.34171 1.95118 3.65829 2.14645 3.85355L5.79289 7.5L2.14645 11.1464ZM8.14645 11.1464C7.95118 11.3417 7.95118 11.6583 8.14645 11.8536C8.34171 12.0488 8.65829 12.0488 8.85355 11.8536L12.8536 7.85355C13.0488 7.65829 13.0488 7.34171 12.8536 7.14645L8.85355 3.14645C8.65829 2.95118 8.34171 2.95118 8.14645 3.14645C7.95118 3.34171 7.95118 3.65829 8.14645 3.85355L11.7929 7.5L8.14645 11.1464Z"
                    fill="#363636"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="text-sm silka-medium text-gray-900">
                  Next Time Slot
                </span>
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                  if (autoRepostOpen && repostInputValue == 0) {
                    toast.error('Auto-Repost Input Cannot be 0', {
                      className: 'silka-medium text-sm text-gray-900',
                    });
                  } else if (autoPlugOpen && plugInputValue == 0) {
                    toast.error('Auto-Plug Input Cannot be 0', {
                      className: 'silka-medium text-sm text-gray-900',
                    });
                  } else if (autoPlugOpen && plugText == '') {
                    toast.error('Auto-Plug Text Cannot be Empty', {
                      className: 'silka-medium text-sm text-gray-900',
                    });
                  } else if (!videoMedia) {
                    toast.error(
                      'Please select a video to be posted.',
                      {
                        className:
                          'silka-medium text-sm text-gray-900',
                      }
                    );
                  } else if (postText == '') {
                    toast.error('Please add a caption', {
                      className: 'silka-medium text-sm text-gray-900',
                    });
                  } else {
                    setTimeSlotsOpen(true);
                  }
                }}
                className="flex flex-row space-x-2 border py-2 border-gray-300 hover:bg-gray-50 w-full rounded-full justify-center items-center"
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
                    d="M4.5 1C4.77614 1 5 1.22386 5 1.5V2H10V1.5C10 1.22386 10.2239 1 10.5 1C10.7761 1 11 1.22386 11 1.5V2H12.5C13.3284 2 14 2.67157 14 3.5V12.5C14 13.3284 13.3284 14 12.5 14H2.5C1.67157 14 1 13.3284 1 12.5V3.5C1 2.67157 1.67157 2 2.5 2H4V1.5C4 1.22386 4.22386 1 4.5 1ZM10 3V3.5C10 3.77614 10.2239 4 10.5 4C10.7761 4 11 3.77614 11 3.5V3H12.5C12.7761 3 13 3.22386 13 3.5V5H2V3.5C2 3.22386 2.22386 3 2.5 3H4V3.5C4 3.77614 4.22386 4 4.5 4C4.77614 4 5 3.77614 5 3.5V3H10ZM2 6V12.5C2 12.7761 2.22386 13 2.5 13H12.5C12.7761 13 13 12.7761 13 12.5V6H2ZM7 7.5C7 7.22386 7.22386 7 7.5 7C7.77614 7 8 7.22386 8 7.5C8 7.77614 7.77614 8 7.5 8C7.22386 8 7 7.77614 7 7.5ZM9.5 7C9.22386 7 9 7.22386 9 7.5C9 7.77614 9.22386 8 9.5 8C9.77614 8 10 7.77614 10 7.5C10 7.22386 9.77614 7 9.5 7ZM11 7.5C11 7.22386 11.2239 7 11.5 7C11.7761 7 12 7.22386 12 7.5C12 7.77614 11.7761 8 11.5 8C11.2239 8 11 7.77614 11 7.5ZM11.5 9C11.2239 9 11 9.22386 11 9.5C11 9.77614 11.2239 10 11.5 10C11.7761 10 12 9.77614 12 9.5C12 9.22386 11.7761 9 11.5 9ZM9 9.5C9 9.22386 9.22386 9 9.5 9C9.77614 9 10 9.22386 10 9.5C10 9.77614 9.77614 10 9.5 10C9.22386 10 9 9.77614 9 9.5ZM7.5 9C7.22386 9 7 9.22386 7 9.5C7 9.77614 7.22386 10 7.5 10C7.77614 10 8 9.77614 8 9.5C8 9.22386 7.77614 9 7.5 9ZM5 9.5C5 9.22386 5.22386 9 5.5 9C5.77614 9 6 9.22386 6 9.5C6 9.77614 5.77614 10 5.5 10C5.22386 10 5 9.77614 5 9.5ZM3.5 9C3.22386 9 3 9.22386 3 9.5C3 9.77614 3.22386 10 3.5 10C3.77614 10 4 9.77614 4 9.5C4 9.22386 3.77614 9 3.5 9ZM3 11.5C3 11.2239 3.22386 11 3.5 11C3.77614 11 4 11.2239 4 11.5C4 11.7761 3.77614 12 3.5 12C3.22386 12 3 11.7761 3 11.5ZM5.5 11C5.22386 11 5 11.2239 5 11.5C5 11.7761 5.22386 12 5.5 12C5.77614 12 6 11.7761 6 11.5C6 11.2239 5.77614 11 5.5 11ZM7 11.5C7 11.2239 7.22386 11 7.5 11C7.77614 11 8 11.2239 8 11.5C8 11.7761 7.77614 12 7.5 12C7.22386 12 7 11.7761 7 11.5ZM9.5 11C9.22386 11 9 11.2239 9 11.5C9 11.7761 9.22386 12 9.5 12C9.77614 12 10 11.7761 10 11.5C10 11.2239 9.77614 11 9.5 11Z"
                    fill="#363636"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="text-sm silka-medium text-gray-900">
                  Select Time Slot
                </span>
              </button>
            </div>
          </DialogPrimitive.Content>
        </Transition.Child>
      </Transition.Root>
    </DialogPrimitive.Portal>
  );
}
