import cx from 'classnames';
import { Transition } from '@headlessui/react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross1Icon } from '@radix-ui/react-icons';
import { Fragment, useState } from 'react';
import { ShareComponent } from './ShareComponent';
import { SettingsComponent } from './SettingsComponent';
import { AnalyticsComponent } from './AnalyticsComponent';

interface Props {
  isOpen: boolean;
  fileId: string;
}

export function PlayerShareDialog({ fileId, isOpen }: Props) {
  const [view, setView] = useState(0);

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
            'w-[95vw] max-w-lg py-4 md:w-full',
            'top-[25%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
            'bg-white',
            'focus:outline-none focus-visible:ring-0'
          )}
        >
          <div className="flex flex-row space-x-3 px-4">
            <button
              onClick={() => {
                setView(0);
              }}
            >
              <DialogPrimitive.Title
                className={
                  'text-xs silka-medium ' +
                  (view == 0 ? 'text-gray-900' : 'text-gray-400')
                }
              >
                Share
              </DialogPrimitive.Title>
            </button>
          </div>
          <hr className="mt-3" />
          <ShareComponent fileId={fileId} />
          <DialogPrimitive.Close
            className={cx(
              'absolute top-3.5 right-3.5 inline-flex items-center justify-center rounded-full p-1',
              'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
            )}
          >
            <Cross1Icon className="h-3 w-3 text-gray-500 hover:text-gray-700" />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </Transition.Child>
    </Transition.Root>
  );
}
