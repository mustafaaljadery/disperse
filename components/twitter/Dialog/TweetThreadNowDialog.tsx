import { Transition } from '@headlessui/react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import toast, { Toaster } from 'react-hot-toast';
import cx from 'classnames';
import { Fragment, Dispatch, SetStateAction } from 'react';
import { apiUrl } from '../../../utils/apiUrl';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import axios from 'axios';
import axiosRetry from 'axios-retry';

async function postThread(
  workspaceId: string,
  draftId: string,
  setRefetchThreadDrafts: Dispatch<SetStateAction<boolean>>,
  setSelectedThread: Dispatch<SetStateAction<any>>,
  setSelectedThreadTweet: Dispatch<SetStateAction<any>>
) {
  try {
    axiosRetry(axios, { retries: 3 });

    toast.loading('Tweeting Thread...', {
      className: 'text-sm silka-medium text-gray-900',
      duration: 80000,
    });
    const result = await axios.post(
      `${apiUrl()}twitter/create/postthread`,
      null,
      {
        params: {
          workspaceId: workspaceId,
          draftId: draftId,
        },
      }
    );
    if (result.data.message == 'success') {
      setRefetchThreadDrafts(true);
      setSelectedThread(null);
      setSelectedThreadTweet(null);
      toast.remove();
      toast.success('Successfully Tweeted!', {
        className: 'text-sm silka-medium text-gray-900',
      });
    } else {
      toast.remove();
      toast.error('Error tweet thread, please try again.', {
        className: 'text-sm silka-medium text-gray-900',
      });
    }
    return result.data;
  } catch (e) {
    console.log(e);
    toast.remove();
    toast.error('Error tweeting thread, please try again.', {
      className: 'text-sm silka-medium text-gray-900',
    });
  }
}

interface TweetThreadNowDialogProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  workspaceId: string;
  draftId: string;
  delayTweetThreadOpen: boolean;
  delayTweetThreadMetric: string;
  delayTweetThreadInput: number;
  autoRetweetOpen: boolean;
  retweetMetric: string;
  retweetInputValue: number;
  autoPlugOpen: boolean;
  plugMetric: string;
  plugInputValue: number;
  plugText: string;
  removeUrlPreview: boolean;
  setRefetchThreadDrafts: Dispatch<SetStateAction<boolean>>;
  setSelectedThread: Dispatch<SetStateAction<any>>;
  setSelectedThreadTweet: Dispatch<SetStateAction<any>>;
  threadTweets: any;
  setThreadTweets: Dispatch<SetStateAction<any>>;
  setOptionsOpen: Dispatch<SetStateAction<boolean>>;
  setAutoPlug: Dispatch<SetStateAction<boolean>>;
  setAutoRetweet: Dispatch<SetStateAction<boolean>>;
  setRemovePreview: Dispatch<SetStateAction<boolean>>;
  setDelayThreadTweets: Dispatch<SetStateAction<boolean>>;
}

export function TweetThreadNowDialog({
  isOpen,
  setIsOpen,
  workspaceId,
  draftId,
  delayTweetThreadOpen,
  delayTweetThreadMetric,
  delayTweetThreadInput,
  autoRetweetOpen,
  retweetMetric,
  retweetInputValue,
  autoPlugOpen,
  plugMetric,
  plugInputValue,
  plugText,
  removeUrlPreview,
  setRefetchThreadDrafts,
  setSelectedThread,
  setSelectedThreadTweet,
  threadTweets,
  setThreadTweets,
  setOptionsOpen,
  setAutoPlug,
  setAutoRetweet,
  setRemovePreview,
  setDelayThreadTweets,
}: TweetThreadNowDialogProps) {
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
              Post Thread
            </DialogPrimitive.Title>
            <p className="mt-2.5 text-xs silka-regular text-gray-400">
              Post thread to Twitter right now.
            </p>
          </div>
          {/*  These are the different options that are present */}
          <div className="flex flex-col space-y-3 mt-5">
            <h3 className="text-[10px] text-gray-400 silka-semibold">
              THREAD OPTIONS
            </h3>
            <button
              onClick={() => {
                setIsOpen(false);
                setOptionsOpen(true);
                setRemovePreview(true);
              }}
              className="flex flex-row space-x-2.5"
            >
              <CheckboxPrimitive.Root
                id="c1"
                checked={removeUrlPreview}
                className={cx(
                  'my-auto flex h-4 w-4 items-center justify-center rounded',
                  'radix-state-checked:bg-[#1D9BF0] radix-state-unchecked:bg-gray-100',
                  'focus:outline-none focus-visible:ring focus-visible:ring-[#1D9BF0] focus-visible:ring-opacity-75'
                )}
              >
                <CheckboxPrimitive.Indicator>
                  <CheckIcon className="h-4 w-4 self-center text-white" />
                </CheckboxPrimitive.Indicator>
              </CheckboxPrimitive.Root>
              <p className="text-sm my-auto silka-medium text-gray-600">
                Remove URL Preview
              </p>
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                setOptionsOpen(true);
                setDelayThreadTweets(true);
              }}
              className="flex flex-row space-x-2.5"
            >
              <SwitchPrimitive.Root
                checked={delayTweetThreadOpen}
                className={cx(
                  'group my-auto',
                  'radix-state-checked:bg-[#1D9BF0]',
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
                Delay Thread Tweets
              </p>
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                setOptionsOpen(true);
                setAutoRetweet(true);
              }}
              className="flex flex-row space-x-2.5"
            >
              <SwitchPrimitive.Root
                checked={autoRetweetOpen}
                className={cx(
                  'group my-auto',
                  'radix-state-checked:bg-[#1D9BF0]',
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
                Auto Retweet
              </p>
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                setOptionsOpen(true);
                setAutoPlug(true);
              }}
              className="flex flex-row space-x-2.5"
            >
              <SwitchPrimitive.Root
                checked={autoPlugOpen}
                className={cx(
                  'group my-auto',
                  'radix-state-checked:bg-[#1D9BF0]',
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
          <DialogPrimitive.Close className="w-full">
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(false);
                let textError = false;
                let textTooLong = false;
                for (let i = 0; i < threadTweets.length; i++) {
                  if (
                    threadTweets[i].text == '' ||
                    threadTweets[i].text == '' ||
                    !threadTweets[i].text
                  ) {
                    textError = true;
                  }
                  if (threadTweets[i].text.length > 280) {
                    textTooLong = true;
                  }
                }
                if (textError) {
                  toast.error('No Tweet in Thread can be Blank', {
                    className: 'silka-medium text-gray-900 text-sm',
                  });
                } else if (textTooLong) {
                  toast.error(
                    'No Tweet in Thread can be Longer than 280 Characters',
                    {
                      className: 'silka-medium text-gray-900 text-sm',
                    }
                  );
                } else if (
                  autoRetweetOpen &&
                  retweetInputValue == 0
                ) {
                  toast.error('Auto-Retweet Input Cannot be 0', {
                    className: 'silka-medium text-gray-900 text-sm',
                  });
                } else if (autoPlugOpen && plugInputValue == 0) {
                  toast.error('Auto-Plug Input Cannot be 0', {
                    className: 'silka-medium text-gray-900 text-sm',
                  });
                } else if (autoPlugOpen && plugText == '') {
                  toast.error('Auto-Plug Text Cannot be Empty', {
                    className: 'silka-medium text-gray-900 text-sm',
                  });
                } else {
                  postThread(
                    workspaceId,
                    draftId,
                    setRefetchThreadDrafts,
                    setSelectedThread,
                    setSelectedThreadTweet
                  );
                }
              }}
              className="rounded-xl bg-[#1D9BF0] hover:opacity-90 silka-medium mt-5 w-full py-1.5 text-white"
            >
              Tweet Now
            </button>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </Transition.Child>
    </Transition.Root>
  );
}
