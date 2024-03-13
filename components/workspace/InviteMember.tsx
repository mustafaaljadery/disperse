import axios from 'axios';
import axiosRetry from 'axios-retry';
import { Transition } from '@headlessui/react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import cx from 'classnames';
import React, {
  Fragment,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { apiUrl } from '../../utils/apiUrl';
import toast from 'react-hot-toast';

interface Props {
  userId: string;
  workspaceId: string;
  isOpen: boolean;
  setRefetchData: Dispatch<SetStateAction<boolean>>;
}

export function WorkspaceInviteMember({
  workspaceId,
  userId,
  isOpen,
  setRefetchData,
}: Props) {
  const [email, setEmail] = useState('');
  axiosRetry(axios, { retries: 3 });

  async function handleSubmit() {
    try {
      const result = await axios.post(
        `${apiUrl()}workspace/update/addmember`,
        null,
        {
          params: {
            workspaceId: workspaceId,
            email: email,
            userId: userId,
          },
        }
      );
      toast.success('Member Added!', {
        className: 'silka-medium text-sm text-[#363636]',
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
            Invite Member
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="mt-1 text-xs silka-regular text-gray-600">
            Add a member to your workspace
          </DialogPrimitive.Description>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit().then(() => {
                setRefetchData(true);
              });
            }}
            className="flex flex-col space-y-6 mt-6"
          >
            <input
              value={email}
              required
              type="email"
              className="w-full text-xs silka-regular rounded border border-gray-300 focus:ring-0 focus:border-[#FF623D]"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Type user email..."
            />
            <div className="flex flex-row space-x-5">
              <DialogPrimitive.Close>
                <button
                  type="submit"
                  className="text-xs silka-medium text-white px-4 py-1.5 rounded bg-[#FF623D] hover:opacity-90"
                >
                  Invite Member
                </button>
              </DialogPrimitive.Close>
              <DialogPrimitive.Close>
                <button className="text-xs silka-medium text-gray-700 px-4 py-1.5 rounded hover:opacity-90 border">
                  Cancel
                </button>
              </DialogPrimitive.Close>
            </div>
          </form>
        </DialogPrimitive.Content>
      </Transition.Child>
    </Transition.Root>
  );
}
