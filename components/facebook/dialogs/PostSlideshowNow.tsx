import { Transition } from '@headlessui/react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { clsx } from 'clsx';
import React, { Fragment, Dispatch, SetStateAction } from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import cx from 'classnames';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../../utils/apiUrl';
import toast from 'react-hot-toast';

interface Props {
  isOpen: boolean;
  workspaceId: string;
  draftId: any;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  autoRepostOpen: boolean;
  repostMetric: string;
  repostInputValue: number;
  autoPlugOpen: boolean;
  plugMetric: string;
  plugInputValue: number;
  plugText: string;
  postText: string;
  slideshowMedia: any;
  setSlideshowMedia: Dispatch<SetStateAction<any>>;
  setRefetchSlideshowDrafts: Dispatch<SetStateAction<boolean>>;
  setSelectedSlideshow: Dispatch<SetStateAction<any>>;
  setOptionsOpen: Dispatch<SetStateAction<boolean>>;
  setAutoRepostOpen: Dispatch<SetStateAction<boolean>>;
  setAutoPlugOpen: Dispatch<SetStateAction<boolean>>;
}

async function postSlideshowNow(
  workspaceId: string,
  draftId: string,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
  setRefetchSlideshowDrafts: Dispatch<SetStateAction<boolean>>,
  setSelectedSlideshow: Dispatch<SetStateAction<any>>,
  setSlideshowMedia: Dispatch<SetStateAction<any>>
) {
  try {
    axiosRetry(axios, { retries: 3 });

    setIsOpen(false);
    toast.loading('Posting Slideshow...', {
      className: 'text-sm silka-medium text-gray-900',
      duration: 80000,
    });
    const result = await axios.post(
      `${apiUrl()}facebook/create/postslideshow`,
      null,
      {
        params: {
          workspaceId: workspaceId,
          draftId: draftId,
        },
      }
    );
    if (result.data.message == 'success') {
      setRefetchSlideshowDrafts(true);
      setSlideshowMedia([]);
      setSelectedSlideshow(null);
      toast.remove();
      toast.success('Successfully Posted!', {
        className: 'text-sm silka-medium text-gray-900',
      });
    } else {
      toast.remove();
      toast.error('Error posting slideshow, please try again.', {
        className: 'text-sm silka-medium text-gray-900',
      });
    }
    return result.data;
  } catch (e) {
    console.log(e);
    toast.remove();
    toast.error('Error posting slideshow, please try again.', {
      className: 'text-sm silka-medium text-gray-900',
    });
  }
}

export function FacebookPostSlideshowNow({
  isOpen,
  workspaceId,
  draftId,
  setIsOpen,
  autoRepostOpen,
  repostMetric,
  repostInputValue,
  autoPlugOpen,
  plugMetric,
  plugInputValue,
  plugText,
  postText,
  slideshowMedia,
  setSlideshowMedia,
  setRefetchSlideshowDrafts,
  setSelectedSlideshow,
  setOptionsOpen,
  setAutoRepostOpen,
  setAutoPlugOpen,
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
              'bg-white',
              'focus:outline-none focus-visible:ring-0'
            )}
          >
            <div className="w-full flex flex-col justify-center items-center">
              <DialogPrimitive.Title className="text-2xl silka-bold text-gray-800">
                Post Slideshow
              </DialogPrimitive.Title>
              <p className="mt-2.5 text-xs silka-regular text-gray-400">
                Post slideshow on Facebook right now.
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
                    'radix-state-checked:bg-[#066CE5]',
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
                    'radix-state-checked:bg-[#066CE5]',
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
              <DialogPrimitive.Close className="w-full">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (autoRepostOpen && repostInputValue == 0) {
                      toast.error('Auto-Repost Input Cannot be 0', {
                        className:
                          'silka-medium text-sm text-gray-900',
                      });
                    } else if (autoPlugOpen && plugInputValue == 0) {
                      toast.error('Auto-Plug Input Cannot be 0', {
                        className:
                          'silka-medium text-sm text-gray-900',
                      });
                    } else if (autoPlugOpen && plugText == '') {
                      toast.error('Auto-Plug Text Cannot be Empty', {
                        className:
                          'silka-medium text-sm text-gray-900',
                      });
                    } else {
                      postSlideshowNow(
                        workspaceId,
                        draftId,
                        setIsOpen,
                        setRefetchSlideshowDrafts,
                        setSelectedSlideshow,
                        setSlideshowMedia
                      );
                    }
                  }}
                  className="rounded-xl bg-[#066CE5] hover:opacity-90 silka-medium mt-5 w-full py-1.5 text-white"
                >
                  Post Now
                </button>
              </DialogPrimitive.Close>
            </div>
          </DialogPrimitive.Content>
        </Transition.Child>
      </Transition.Root>
    </DialogPrimitive.Portal>
  );
}
