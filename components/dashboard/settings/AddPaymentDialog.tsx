import { Transition } from '@headlessui/react';
import {
  PayPalScriptProvider,
  PayPalButtons,
} from '@paypal/react-paypal-js';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross1Icon } from '@radix-ui/react-icons';
import cx from 'classnames';
import { Fragment } from 'react';
import { StripePayment } from './StripePayment';

interface AddPaymentDialogProps {
  addPaymentOpen: boolean;
  userInfo: any;
}

export function AddPaymentDialog({
  addPaymentOpen,
  userInfo,
}: AddPaymentDialogProps) {
  return (
    <Transition.Root show={addPaymentOpen}>
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
            'w-[95vw] max-w-lg rounded-lg p-4 md:w-full',
            'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
            'bg-white',
            'focus:outline-none focus-visible:ring-0'
          )}
        >
          <DialogPrimitive.Title className="text-base silka-semibold text-gray-900">
            Add Payment Method
          </DialogPrimitive.Title>
          <div className="mt-6 w-full px-2">
            <StripePayment userId={userInfo.id} />
          </div>
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
