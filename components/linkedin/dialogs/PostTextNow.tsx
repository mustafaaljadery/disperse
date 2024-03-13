import { Transition } from '@headlessui/react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross1Icon } from '@radix-ui/react-icons';
import { clsx } from 'clsx';
import React, {
  Fragment,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import toast from 'react-hot-toast';
import cx from 'classnames';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../../utils/apiUrl';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  removeUrlPreview: boolean;
  autoPlugOpen: boolean;
  plugMetric: string;
  plugInputValue: number;
  plugText: string;
  autoReshareOpen: boolean;
  reshareMetric: string;
  reshareInputValue: number;
  postText: string;
  workspaceId: string;
  draftId: string;
  setRefetchTextDrafts: Dispatch<SetStateAction<boolean>>;
  setSelectedText: Dispatch<SetStateAction<any>>;
  setOptionsOpen: Dispatch<SetStateAction<boolean>>;
  setRemovePreview: Dispatch<SetStateAction<boolean>>;
  setAutoRepostOpen: Dispatch<SetStateAction<boolean>>;
  setAutoPlugOpen: Dispatch<SetStateAction<boolean>>;
}

async function postTextNow(
  workspaceId: string,
  draftId: string,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
  setRefetchTextDrafts: Dispatch<SetStateAction<boolean>>,
  setSelectedText: Dispatch<SetStateAction<any>>
) {
  try {
    axiosRetry(axios, { retries: 3 });

    toast.loading('Posting Text...', {
      className: 'text-sm silka-medium text-gray-900',
      duration: 80000,
    });
    const result = await axios.post(
      `${apiUrl()}linkedin/create/posttext`,
      null,
      {
        params: {
          workspaceId: workspaceId,
          draftId: draftId,
        },
      }
    );
    if (result.data.message == 'success') {
      setRefetchTextDrafts(true);
      setSelectedText(null);
      toast.remove();
      toast.success('Text Successfully Posted!', {
        className: 'text-sm silka-medium text-gray-900',
      });
    } else {
      toast.remove();
      toast.error('Error posting test, please try again.', {
        className: 'text-sm silka-medium text-gray-900',
      });
    }
  } catch (e: any) {
    console.log(e.response.data);
    toast.remove();
    toast.error('Error posting text, please try again.', {
      className: 'text-sm silka-medium text-gray-900',
    });
  }
}

export function LinkedinPostTextNow({
  isOpen,
  setIsOpen,
  removeUrlPreview,
  autoPlugOpen,
  plugMetric,
  plugInputValue,
  plugText,
  autoReshareOpen,
  reshareMetric,
  reshareInputValue,
  postText,
  workspaceId,
  draftId,
  setRefetchTextDrafts,
  setSelectedText,
  setOptionsOpen,
  setRemovePreview,
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
                Post Text
              </DialogPrimitive.Title>
              <p className="mt-2.5 text-xs silka-regular text-gray-400">
                Post text on Linkedin right now.
              </p>
            </div>
            <div className="flex flex-col space-y-3 mt-5">
              <h3 className="text-[10px] text-gray-400 silka-semibold">
                POST OPTIONS
              </h3>
              {/*
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
                    'radix-state-checked:bg-[#0966C2] radix-state-unchecked:bg-gray-100',
                    'focus:outline-none focus-visible:ring focus-visible:ring-[#0966C2] focus-visible:ring-opacity-75'
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
              */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  setOptionsOpen(true);
                  setAutoRepostOpen(true);
                }}
                className="flex flex-row space-x-2.5"
              >
                <SwitchPrimitive.Root
                  checked={autoReshareOpen}
                  className={cx(
                    'group my-auto',
                    'radix-state-checked:bg-[#0966C2]',
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
                  Auto Reshare
                </p>
              </button>
              <button
                onClick={() => {
                  setIsOpen(true);
                  setOptionsOpen(true);
                  setAutoPlugOpen(true);
                }}
                className="flex flex-row space-x-2.5"
              >
                <SwitchPrimitive.Root
                  checked={autoPlugOpen}
                  className={cx(
                    'group my-auto',
                    'radix-state-checked:bg-[#0966C2]',
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
                  if (autoReshareOpen && reshareInputValue == 0) {
                    toast.error('Auto-Share Input Cannot be 0', {
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
                  } else if (postText.length == 0) {
                    toast.error('Text cannot be empty', {
                      className: 'silka-medium text-sm text-gray-900',
                    });
                  } else {
                    postTextNow(
                      workspaceId,
                      draftId,
                      setIsOpen,
                      setRefetchTextDrafts,
                      setSelectedText
                    );
                  }
                }}
                className="rounded-xl bg-[#0966C2] hover:opacity-90 silka-medium mt-5 w-full py-1.5 text-white"
              >
                Post Now
              </button>
            </DialogPrimitive.Close>
          </DialogPrimitive.Content>
        </Transition.Child>
      </Transition.Root>
    </DialogPrimitive.Portal>
  );
}
