import { Transition } from '@headlessui/react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { clsx } from 'clsx';
import { Fragment, Dispatch, SetStateAction } from 'react';
import cx from 'classnames';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../../utils/apiUrl';
import toast from 'react-hot-toast';

async function postShortNow(workspaceId: string, draftId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    toast.loading('Posting Short...', {
      className: 'text-sm silka-medium text-gray-900',
      duration: 80000,
    });
    const result = await axios.post(
      `${apiUrl()}youtube/create/postshort`,
      null,
      {
        params: {
          workspaceId: workspaceId,
          draftId: draftId,
        },
      }
    );
    if (result.data.message == 'success') {
      toast.remove();
      toast.success('Successfully Posted Short!', {
        className: 'text-sm silka-medium text-gray-900',
      });
    } else {
      toast.remove();
      if (result.data.type == 'too many') {
        toast.error('Cannot post more than 3 videos a day', {
          className: 'text-sm silka-medium text-gray-900',
        });
      } else {
        toast.error('Error posting short, please try again.', {
          className: 'text-sm silka-medium text-gray-900',
        });
      }
    }
    return result.data;
  } catch (e) {
    toast.remove();
    toast.error('Error posting short, please try again.', {
      className: 'text-sm silka-medium text-gray-900',
    });
    console.log(e);
  }
}

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  autoRepostOpen: boolean;
  repostMetric: string;
  repostInputValue: number;
  autoPlugOpen: boolean;
  plugMetric: string;
  plugInputValue: number;
  plugText: string;
  workspaceId: string;
  draftId: string;
  setSelectedShort: Dispatch<SetStateAction<any>>;
  setRefetchShortDrafts: Dispatch<SetStateAction<boolean>>;
  shortsMedia: any;
  setOptionsOpen: Dispatch<SetStateAction<boolean>>;
  setAutoRepostOpen: Dispatch<SetStateAction<boolean>>;
  setAutoPlugOpen: Dispatch<SetStateAction<boolean>>;
}

export function PostShortNow({
  isOpen,
  setIsOpen,
  autoRepostOpen,
  repostMetric,
  repostInputValue,
  autoPlugOpen,
  plugMetric,
  plugInputValue,
  plugText,
  workspaceId,
  draftId,
  setSelectedShort,
  setRefetchShortDrafts,
  shortsMedia,
  setOptionsOpen,
  setAutoPlugOpen,
  setAutoRepostOpen,
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
                Post Short
              </DialogPrimitive.Title>
              <p className="mt-2.5 text-xs silka-regular text-gray-400">
                Post short on Youtube right now.
              </p>
            </div>
            <div className="flex flex-col space-y-3 mt-5">
              <h3 className="text-[10px] text-gray-400 silka-semibold">
                SHORT OPTIONS
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
                    'radix-state-checked:bg-[#FF0000]',
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
                    'radix-state-checked:bg-[#FF0000]',
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
                    setIsOpen(false);
                    if (!shortsMedia?.id) {
                      toast.error('Select Video to Post on Youtube', {
                        className:
                          'text-sm silka-medium text-gray-900',
                      });
                    } else {
                      postShortNow(workspaceId, draftId).then(
                        (value) => {
                          if (value.message == 'success') {
                            setSelectedShort(null);
                            setRefetchShortDrafts(true);
                          } else {
                          }
                        }
                      );
                    }
                  }}
                  className="rounded-xl bg-[#FF0000] hover:opacity-80 silka-medium mt-5 w-full py-1.5 text-white"
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
