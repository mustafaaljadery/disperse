import { Transition } from '@headlessui/react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import React, {
  Fragment,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../../utils/apiUrl';
import toast from 'react-hot-toast';
import { clsx } from 'clsx';

interface Props {
  isOpen: boolean;
  workflowId: string;
  automation_id: string;
  setRefetchActiveWorkflows: Dispatch<SetStateAction<boolean>>;
  setRefetchInactiveWorkflows: Dispatch<SetStateAction<boolean>>;
  currentIndex: number;
  setWorkflowData: Dispatch<SetStateAction<any>>;
  workflowData: any;
}

async function renameWorkflow(
  workflowId: string,
  automation_id: string,
  newName: string
) {
  axiosRetry(axios, { retries: 3 });

  try {
    toast.loading('Renaming Workflow...', {
      className: 'text-sm silka-medium text-gray-900',
    });
    const result = await axios.post(
      `${apiUrl()}automation/update/renameworkflow`,
      null,
      {
        params: {
          workflowId: workflowId,
          automation_id: automation_id,
          newName: newName,
        },
      }
    );
    toast.remove();
    toast.success('Successfully Renamed Workflow!', {
      className: 'text-sm silka-medium text-gray-900',
    });
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

export function RenameWorkflowDialog({
  isOpen,
  workflowId,
  automation_id,
  setRefetchActiveWorkflows,
  setRefetchInactiveWorkflows,
  currentIndex,
  setWorkflowData,
  workflowData,
}: Props) {
  const [newName, setNewName] = useState('');
  return (
    <DialogPrimitive.Portal forceMount>
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
            className={clsx(
              'fixed z-50',
              'w-[95vw] max-w-md rounded-lg p-4 md:w-full',
              'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
              'bg-white',
              'focus:outline-none focus-visible:ring-0'
            )}
          >
            <div className="flex flex-col w-full justify-center items-center">
              <DialogPrimitive.Title className="text-xl silka-semibold text-gray-800 ">
                Rename Workflow
              </DialogPrimitive.Title>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const newWorkflowData = workflowData.map(
                    (item: any, index: number) => {
                      if (index === currentIndex) {
                        return {
                          ...item,
                          name: newName,
                        };
                      } else {
                        return item;
                      }
                    }
                  );

                  setWorkflowData(newWorkflowData);
                  renameWorkflow(
                    workflowId,
                    automation_id,
                    newName
                  ).then(() => {
                    /*
                    setRefetchActiveWorkflows(true);
                    setRefetchInactiveWorkflows(true);
                    */
                  });
                }}
                className="flex flex-col space-y-6 w-full mt-4"
              >
                <div className="flex flex-col space-y-2 w-full">
                  <p className="text-xs silka-semibold text-gray-700">
                    Change Workflow Name
                  </p>
                  <input
                    type="text"
                    className="w-full silka-medium text-sm rounded border border-gray-300 text-gray-800 focus:ring-0 focus:border-[#FF623D]"
                    placeholder="New name..."
                    value={newName}
                    required
                    onChange={(e) => {
                      e.preventDefault();
                      setNewName(e.target.value);
                    }}
                  />
                </div>
                <div className="flex w-full flex-row space-x-3.5 justify-end items-end">
                  <DialogPrimitive.Close>
                    <button
                      className="rounded hover:opacity-90 text-xs bg-[#363636] silka-medium text-white px-4 py-1.5"
                      type="button"
                    >
                      Cancel
                    </button>
                  </DialogPrimitive.Close>
                  <DialogPrimitive.Close>
                    <button
                      type="submit"
                      className="bg-[#FF623D] text-white hover:opacity-90 text-xs silka-medium px-4 py-1.5 rounded"
                    >
                      Rename
                    </button>
                  </DialogPrimitive.Close>
                </div>
              </form>
            </div>
          </DialogPrimitive.Content>
        </Transition.Child>
      </Transition.Root>
    </DialogPrimitive.Portal>
  );
}
