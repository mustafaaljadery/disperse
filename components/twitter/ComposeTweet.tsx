import { Transition } from '@headlessui/react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import cx from 'classnames';
import React, { Fragment, Dispatch, SetStateAction } from 'react';
import * as ToolbarPrimitive from '@radix-ui/react-toolbar';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function ComposeTweet({ isOpen, setIsOpen }: Props) {
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
            'w-[95vw] max-w-4xl rounded-lg p-4 md:w-full',
            'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
            'bg-white w-96',
            'focus:outline-none focus-visible:ring-0'
          )}
        >
          <DialogPrimitive.Title className="text-sm silka-medium text-gray-900"></DialogPrimitive.Title>
          <DialogPrimitive.Description className="mt-2 text-sm silka-regular text-gray-700">
            Make changes to your profile here. Click save when
            you&apos;re done.
          </DialogPrimitive.Description>
          <div className="flex flex-row space-x-5">
            <div className="w-1/3"></div>
            <div className="w-2/3">
              <ToolbarPrimitive.Root className="flex space-x-4 rounded-lg">
                <div className="flex flex-row space-x-3">
                  <ToolbarPrimitive.ToggleGroup type="single">
                    <ToolbarPrimitive.ToggleItem
                      value={'Tweet'}
                      className={cx(
                        'radix-state-on:bg-gray-50',
                        'bg-white',
                        'border-y px-5 py-2 first:rounded-l-md first:border-x last:rounded-r-md last:border-x',
                        'border-gray-200 radix-state-on:border-transparent',
                        'focus:relative focus:outline-none focus-visible:z-20 focus-visible:ring focus-visible:ring-[#FF623D] focus-visible:ring-opacity-75'
                      )}
                    >
                      <span className="silka-regular">
                        Hello world
                      </span>
                    </ToolbarPrimitive.ToggleItem>
                    <ToolbarPrimitive.ToggleItem
                      value={'Thread'}
                      className={cx(
                        'radix-state-on:bg-gray-50',
                        'bg-white',
                        'border-y px-5 py-2 first:rounded-l-md first:border-x last:rounded-r-md last:border-x',
                        'border-gray-200 radix-state-on:border-transparent',
                        'focus:relative focus:outline-none focus-visible:z-20 focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
                      )}
                    >
                      <span className="silka-regular">Bye world</span>
                    </ToolbarPrimitive.ToggleItem>
                    <ToolbarPrimitive.ToggleItem
                      value={'poll'}
                      className={cx(
                        'radix-state-on:bg-gray-50',
                        'bg-white',
                        'border-y px-5 py-2 first:rounded-l-md first:border-x last:rounded-r-md last:border-x',
                        'border-gray-200 radix-state-on:border-transparent',
                        'focus:relative focus:outline-none focus-visible:z-20 focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
                      )}
                    >
                      <span className="silka-regular">
                        Cool World
                      </span>
                    </ToolbarPrimitive.ToggleItem>
                  </ToolbarPrimitive.ToggleGroup>
                  <button className=""></button>
                </div>
              </ToolbarPrimitive.Root>
            </div>
          </div>
        </DialogPrimitive.Content>
      </Transition.Child>
    </Transition.Root>
  );
}
