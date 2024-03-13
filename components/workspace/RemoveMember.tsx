import axios from 'axios';
import axiosRetry from 'axios-retry';
import { Transition } from '@headlessui/react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import cx from 'classnames';
import React, { Fragment, Dispatch, SetStateAction } from 'react';
import { apiUrl } from '../../utils/apiUrl';
import toast from 'react-hot-toast';

interface Props {
  workspaceId: string;
  memberEmail: string;
  isOpen: boolean;
  setRefetchData: Dispatch<SetStateAction<boolean>>;
}

export function WorkspaceRemoveMember({
  workspaceId,
  memberEmail,
  isOpen,
  setRefetchData,
}: Props) {
  axiosRetry(axios, { retries: 3 });

  async function handleSubmit() {
    try {
      const result = await axios.post(
        `${apiUrl()}workspace/delete/member`,
        null,
        {
          params: {
            memberEmail: memberEmail,
            workspaceId: workspaceId,
          },
        }
      );
      toast.success('Member Removed', {
        className: 'text-sm silka-medium text-gray-900',
      });
      return result.data;
    } catch (e) {
      console.log(e);
    }
  }

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
            'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
          )}
        >
          <DialogPrimitive.Title className="text-base silka-medium text-gray-900">
            Remove Member
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="mt-2 text-sm silka-regular text-gray-500">
            Are you sure you want to remove this user’s access from
            this workspace?
          </DialogPrimitive.Description>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit().then(() => {
                setRefetchData(true);
              });
            }}
            className="mt-6 flex flex-col space-y-3"
          >
            <DialogPrimitive.Close>
              <button
                type="submit"
                className="w-full text-sm py-1.5 silka-medium rounded border border-[#FF7070] text-[#FF7070] hover:bg-[#FF7070] hover:text-white"
              >
                Remove Member
              </button>
            </DialogPrimitive.Close>
            <DialogPrimitive.Close>
              <button
                type="button"
                className="w-full py-1.5 text-sm silka-medium rounded border text-[#595959] hover:bg-[#595959] hover:text-white"
              >
                Cancel
              </button>
            </DialogPrimitive.Close>
          </form>
        </DialogPrimitive.Content>
      </Transition.Child>
    </Transition.Root>
  );
}
