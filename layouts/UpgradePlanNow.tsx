import { Transition } from '@headlessui/react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import cx from 'classnames';
import React, { Fragment, useEffect, useState } from 'react';

interface UpgradePlanNowDialogProps {
  isOpen: boolean;
  userId: string;
  workspaceId: string;
}

interface PaymentInfoProps {}
function PaymentInfo() {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {}, []);

  if (isLoading) {
    return (
      <div className="mt-8 flex flex-col space-y-1">
        <h3 className="text-xs silka-medium text-gray-400">
          Payment Info
        </h3>
        <div className="flex flex-col space-y-1 mt-2">
          <div className="" />
          <div className="" />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 flex flex-col space-y-1">
      <h3 className="text-xs silka-medium text-gray-400">
        Payment Info
      </h3>
      <div className=""></div>
    </div>
  );
}

export function UpgradePlanNowDialog({
  isOpen,
  userId,
  workspaceId,
}: UpgradePlanNowDialogProps) {
  const [billingInterval, setBillingInterval] = useState('Monthly');
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
            'w-[95vw] max-w-xl max-h-[80vh] overflow-auto rounded p-4 md:w-full',
            'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
            'bg-white',
            'focus:outline-none focus-visible:ring-0'
          )}
        >
          <DialogPrimitive.Title className="text-lg silka-semibold text-gray-900">
            Upgrade To Pro
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="mt-1 text-xs silka-regular text-gray-500">
            Take your content to the next level.
          </DialogPrimitive.Description>
          <div>
            {/*Describe the list of features you get when you upgrade*/}
            <div></div>
            <div className="mt-8 flex flex-col space-y-1">
              <h3 className="text-xs silka-medium text-gray-400">
                Billing Interval
              </h3>
              <div className="flex flex-row space-x-3">
                <button
                  onClick={() => {
                    setBillingInterval('Monthly');
                  }}
                  className="w-1/2"
                >
                  Monthly
                </button>
                <button
                  onClick={() => {
                    setBillingInterval('Yearly');
                  }}
                  className="w-1/2"
                >
                  Annual
                </button>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-xs silka-medium text-gray-400">
                Payment Method
              </h3>
              <div className="flex flex-col space-y-1.5">
                <div className="flex flex-row space-x-2">
                  <div className="">
                    <button className="flex flex-row space-x-1">
                      Credit or Debit
                    </button>
                  </div>
                </div>
                <div className="flex flex-row space-x-2">
                  <button className="flex flex-row space-x-1">
                    Paypal
                  </button>
                </div>
              </div>
            </div>
            <PaymentInfo />
            <div></div>
          </div>
        </DialogPrimitive.Content>
      </Transition.Child>
    </Transition.Root>
  );
}
