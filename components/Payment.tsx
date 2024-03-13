import { Dialog, Transition } from '@headlessui/react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import cx from 'classnames';
import React, { Fragment, useState } from 'react';

const PaymentDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [nameOnCard, setNameOnCard] = useState('');

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <DialogPrimitive.Trigger asChild>
        <button>Click</button>
      </DialogPrimitive.Trigger>
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
          leaveFrom="opaicty-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <DialogPrimitive.Content forceMount>
            <DialogPrimitive.Title>
              Edit Profile
            </DialogPrimitive.Title>
          </DialogPrimitive.Content>
        </Transition.Child>
        <DialogPrimitive.Close></DialogPrimitive.Close>
      </Transition.Root>
    </DialogPrimitive.Root>
  );
};
