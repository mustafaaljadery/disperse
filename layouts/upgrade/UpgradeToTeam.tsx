import { Transition } from '@headlessui/react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import cx from 'classnames';
import React, {
  Fragment,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import toast from 'react-hot-toast';
import { apiUrl } from '../../utils/apiUrl';

interface Props {
  workspaceId: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

async function upgradeToTeam(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    toast.loading('Upgrading To Team...', {
      className: 'text-sm silka-medium text-gray-900',
      duration: 80000,
    });
    const result = await axios.post(
      `${apiUrl()}workspace/update/upgradetoteam`,
      null,
      {
        params: {
          workspaceId: workspaceId,
        },
      }
    );
    if (result.data.message == 'success') {
      toast.remove();
      toast.success('Successfully Upgraded to Team!', {
        className: 'text-sm silka-medium text-gray-900',
      });
      window.location.href = '/' + workspaceId + '/settings/plans';
    } else {
      toast.remove();
      toast.error('Error upgrading to team, please try again.', {
        className: 'text-sm silka-medium text-gray-900',
      });
    }
    return result.data;
  } catch (e) {
    toast.remove();
    toast.error('Error upgrading to team, please try again.', {
      className: 'text-sm silka-medium text-gray-900',
    });
    console.log(e);
  }
}

export function UpgradeToTeam({
  isOpen,
  workspaceId,
  setIsOpen,
}: Props) {
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
          <div className="flex flex-col">
            <h2 className="silka-semibold text-2xl text-gray-900">
              Upgrade to Team
            </h2>
            <p className="mt-2.5 text-xs silka-regular text-gray-500">
              All of your limits will increase, and you can invite
              your team to work with you!
            </p>
            <div className="mt-6 flex flex-row space-x-3 justify-end items-end">
              <DialogPrimitive.Close>
                <button className="text-xs px-4 py-1.5 text-gray-700 rounded hover:opacity-90 silka-medium border">
                  Cancel
                </button>
              </DialogPrimitive.Close>
              <button
                onClick={(e) => {
                  setIsOpen(false);
                  upgradeToTeam(workspaceId);
                }}
                className="text-xs px-4 py-1.5 rounded bg-[#FF623D] text-white silka-medium hover:opacity-90"
              >
                Upgrade to Team
              </button>
            </div>
          </div>
        </DialogPrimitive.Content>
      </Transition.Child>
    </Transition.Root>
  );
}
