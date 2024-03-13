import { Transition } from '@headlessui/react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Fragment } from 'react';
import cx from 'classnames';
import { Cross1Icon } from '@radix-ui/react-icons';

interface Props {
  isOpen: boolean;
}

export function HelpDialog({ isOpen }: Props) {
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
          className="fixed inset-0 z-20 bg-black/20"
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
            'w-[95vw] max-w-sm h-[95%] rounded-lg p-4 md:w-full',
            'top-[50%] left-[83%] -translate-x-[18%] -translate-y-[50%]',
            'bg-white',
            'focus:outline-none focus-visible:ring-0'
          )}
        >
          <div className="flex flex-col h-full justify-between items-between">
            <div className="px-2">
              <DialogPrimitive.Title className="text-base silka-medium text-gray-900">
                Get Help
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="mt-2 text-sm font-normal text-gray-700">
                Make changes to your profile here. Click save when
                you&apos;re done.
              </DialogPrimitive.Description>
              <div className="mt-6 flex flex-col space-y-6">
                <div className="border rounded flex flex-row">
                  <p>Documentation</p>
                </div>
                <div className="border rounded flex flex-row">
                  <p>Tutorials</p>
                </div>
                <div className=""></div>
                <div className=""></div>
              </div>
            </div>

            <div className="flex flex-col">
              <hr />
              <div className="flex flex-row">
                <div className="flex flex-col space-y-1"></div>
              </div>
              <div className="flex flex-row justify-between itemsb-between">
                <button></button>
                <button></button>
              </div>
              <div className="mt-4 flex justify-end">
                <DialogPrimitive.Close
                  className={cx(
                    'inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium',
                    'bg-purple-600 text-white hover:bg-purple-700',
                    'border border-transparent',
                    'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
                  )}
                >
                  Save
                </DialogPrimitive.Close>
              </div>
              <div className="">
                <div className="flex flex-col space-y-1.5">
                  <a href="" className="silka-medium text-sm">
                    Twitter
                  </a>
                  <a href="" className="silka-medium text-sm">
                    Linkedin
                  </a>
                  <a href="" className="silka-medium text-sm">
                    Youtube
                  </a>
                </div>
              </div>
            </div>

            <DialogPrimitive.Close
              className={cx(
                'absolute top-3.5 right-3.5 inline-flex items-center justify-center rounded-full p-1',
                'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
              )}
            >
              <Cross1Icon className="h-3 w-3 text-gray-500 hover:text-gray-700" />
            </DialogPrimitive.Close>
          </div>
        </DialogPrimitive.Content>
      </Transition.Child>
    </Transition.Root>
  );
}
