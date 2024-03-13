import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Transition } from '@headlessui/react';
import cx from 'classnames';
import { Fragment, useState } from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../../utils/apiUrl';

interface Props {
  isOpen: boolean;
}

export function RenameAutomationDialog({ isOpen }: Props) {
  const [workflowName, setWorkflowName] = useState('');

  axiosRetry(axios, { retries: 3 });

  async function handleSubmit() {
    try {
      const result = await axios.post(`${apiUrl()}`, null, {
        params: {},
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
            'focus:outline-none focus-visible:ring-0'
          )}
        >
          <DialogPrimitive.Title className="text-base text-start silka-medium text-gray-900">
            Rename Workflow
          </DialogPrimitive.Title>
          <form className="flex flex-col justify-start items-start mt-5">
            <label className="text-xs silka-medium">New Name</label>
            <input
              type="text"
              value={workflowName}
              onChange={(e) => {
                setWorkflowName(e.target.value);
              }}
              className="mt-2 w-full text-xs silka-regular rounded border border-[#] focus:ring-0 focus:border-[#FF623D]"
              placeholder="Cool workflow..."
            />
            <div className="mt-6 flex flex-row space-x-5">
              <DialogPrimitive.Root>
                <button
                  type="submit"
                  className="text-xs silka-medium text-white px-4 py-1.5 rounded bg-[#FF623D] hover:opacity-90"
                >
                  Rename Workflow
                </button>
              </DialogPrimitive.Root>
              <DialogPrimitive.Root>
                <button className="text-xs silka-medium text-gray-700 px-4 py-1.5 rounded hover:opacity-90 border">
                  Cancel
                </button>
              </DialogPrimitive.Root>
            </div>
          </form>
        </DialogPrimitive.Content>
      </Transition.Child>
    </Transition.Root>
  );
}
