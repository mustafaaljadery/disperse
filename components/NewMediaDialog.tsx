import { Transition } from '@headlessui/react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import cx from 'classnames';
import React, { Fragment, useState } from 'react';

interface NewMediaDialogProps {
  isOpen: boolean;
}

// Search -> Header
export function NewMediaDialog({ isOpen }: NewMediaDialogProps) {
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
            'fixed z-50 h-96',
            'w-[95vw] max-w-md rounded-lg p-4 md:w-full',
            'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
            'bg-white',
            'focus:outline-none focus-visible:ring-0'
          )}
        >
          <div>
            <div className="w-1/4"></div>
            <div className="w-3/4"></div>
            <DialogPrimitive.Title className="text-sm font-medium text-gray-900">
              Edit profile
            </DialogPrimitive.Title>
            <DialogPrimitive.Description className="mt-2 text-sm font-normal text-gray-700">
              Make changes to your profile here. Click save when
              you&apos;re done.
            </DialogPrimitive.Description>

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
          </div>
        </DialogPrimitive.Content>
      </Transition.Child>
    </Transition.Root>
  );
}
