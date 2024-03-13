import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Transition } from '@headlessui/react';
import { Fragment, Dispatch, SetStateAction } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import cx from 'classnames';
import { apiUrl } from '../../../utils/apiUrl';
import * as SwitchPrimitive from '@radix-ui/react-switch';

interface TiktokPostNowProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  workspaceId: string;
  videoMedia: any;
  setVideoMedia: Dispatch<SetStateAction<any>>;
  autoRepostOpen: boolean;
  repostMetric: string;
  repostInputValue: number;
  userId: string;
  draftId: string;
  setOptionsOpen: Dispatch<SetStateAction<boolean>>;
  setAutoRepostOpen: Dispatch<SetStateAction<boolean>>;
  setRefetchVideoDrafts: Dispatch<SetStateAction<boolean>>;
  setSelectedVideo: Dispatch<SetStateAction<any>>;
}

async function handleSubmit(
  workspaceId: string,
  draftId: string,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
  setRefetchVideoDrafts: Dispatch<SetStateAction<boolean>>,
  setSelectedVideo: Dispatch<SetStateAction<any>>,
  setVideoMedia: Dispatch<SetStateAction<any>>
) {
  try {
    axiosRetry(axios, { retries: 3 });

    setIsOpen(false);
    toast.loading('Posting Video...', {
      className: 'text-sm silka-medium text-gray-900',
      duration: 80000,
    });
    const result = await axios.post(
      `${apiUrl()}tiktok/create/postvideo`,
      null,
      {
        params: {
          workspaceId: workspaceId,
          draftId: draftId,
        },
      }
    );

    if (result.data.message == 'success') {
      setRefetchVideoDrafts(true);
      setVideoMedia(null);
      setSelectedVideo(null);
      toast.remove();
      toast.success('Successfully Posted!', {
        className: 'text-sm silka-medium text-gray-900',
      });
    } else {
      toast.remove();
      toast.error('Error posting video, please try again.', {
        className: 'text-sm silka-medium text-gray-900',
      });
    }

    return result.data;
  } catch (e) {
    toast.remove();
    toast.error('Error posting video, please try again.', {
      className: 'text-sm silka-medium text-gray-900',
    });
    console.log(e);
  }
}

export function TiktokPostNow({
  isOpen,
  setIsOpen,
  videoMedia,
  workspaceId,
  setVideoMedia,
  autoRepostOpen,
  repostMetric,
  repostInputValue,
  userId,
  draftId,
  setOptionsOpen,
  setAutoRepostOpen,
  setRefetchVideoDrafts,
  setSelectedVideo,
}: TiktokPostNowProps) {
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
            'w-[95vw] max-w-md rounded-lg p-4 md:w-full',
            'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
            'bg-white',
            'focus:outline-none focus-visible:ring-0'
          )}
        >
          <div className="w-full flex flex-col justify-center items-center">
            <DialogPrimitive.Title className="text-2xl silka-bold text-gray-800">
              TikTok Video
            </DialogPrimitive.Title>
            <p className="mt-2.5 text-xs silka-regular text-gray-400">
              Post video to Tiktok right now.
            </p>
          </div>
          <div className="flex flex-col space-y-3 mt-5">
            <h3 className="text-[10px] text-gray-400 silka-semibold">
              VIDEO OPTIONS
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
                  'radix-state-checked:bg-[#363636]',
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
          </div>
          <DialogPrimitive.Close className="w-full">
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(false);
                if (autoRepostOpen && repostInputValue == 0) {
                  toast.error('Auto-Repost Input Cannot be 0', {
                    className: 'silka-medium text-sm text-gray-900',
                  });
                } else if (!videoMedia) {
                  toast.error('Select a video to post!', {
                    className: 'silka-medium text-sm text-gray-900',
                  });
                } else {
                  handleSubmit(
                    workspaceId,
                    draftId,
                    setIsOpen,
                    setRefetchVideoDrafts,
                    setSelectedVideo,
                    setVideoMedia
                  );
                }
              }}
              className="rounded-xl bg-[#363636] hover:opacity-90 silka-medium mt-5 w-full py-1.5 text-white"
            >
              Post Now
            </button>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </Transition.Child>
    </Transition.Root>
  );
}
