import { Transition } from '@headlessui/react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { clsx } from 'clsx';
import React, { Fragment, Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../../utils/apiUrl';
import toast from 'react-hot-toast';

interface Props {
  isOpen: boolean;
  workspaceId: string;
  workflowId: string;
  automation_id: string;
  setRefetchActiveWorkflows: Dispatch<SetStateAction<boolean>>;
  setRefetchInactiveWorkflows: Dispatch<SetStateAction<boolean>>;
  currentIndex: number;
  workflowData: any;
  setWorkflowData: Dispatch<SetStateAction<any>>;
}

async function deleteWorkflow(
  workspaceId: string,
  workflowId: string,
  automation_id: string
) {
  try {
    axiosRetry(axios, { retries: 3 });

    toast.loading('Deleting...', {
      className: 'text-sm silka-medium text-gray-900',
    });
    const result = await axios.post(
      `${apiUrl()}automation/delete/workflow`,
      null,
      {
        params: {
          workspaceId: workspaceId,
          workflowId: workflowId,
          automation_id: automation_id,
        },
      }
    );
    toast.remove();
    toast.success('Successfully Deleted Automation!', {
      className: 'text-sm silka-medium text-gray-900',
    });
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

export function DeleteWorkflowDialog({
  isOpen,
  workspaceId,
  workflowId,
  automation_id,
  setRefetchActiveWorkflows,
  setRefetchInactiveWorkflows,
  currentIndex,
  setWorkflowData,
  workflowData,
}: Props) {
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
            <div className="flex flex-col justify-center items-center w-full">
              <DialogPrimitive.Title className="text-xl silka-semibold text-gray-800 ">
                Delete Workflow
              </DialogPrimitive.Title>
            </div>
            <div className="flex mt-3.5 flex-col w-full">
              <p className="text-sm silka-regular text-gray-500">
                <span className="silka-semibold text-gray-700">
                  Are you sure you want to delete this workflow?
                </span>{' '}
                All of this workflow&apos;s data will be lost.
              </p>
              <div className="flex w-full mt-6 flex-row space-x-3.5 justify-end items-end">
                <DialogPrimitive.Close>
                  <button className="rounded hover:opacity-90 text-xs bg-[#363636] silka-medium text-white px-4 py-1.5">
                    Cancel
                  </button>
                </DialogPrimitive.Close>
                <DialogPrimitive.Close>
                  <button
                    className="bg-[#F04342] text-white hover:opacity-90 text-xs silka-medium px-4 py-1.5 rounded"
                    onClick={(e) => {
                      const newWorkflowData = workflowData.filter(
                        (item: any, index: number) =>
                          index !== currentIndex
                      );

                      setWorkflowData(newWorkflowData);
                      deleteWorkflow(
                        workspaceId,
                        workflowId,
                        automation_id
                      ).then();
                    }}
                  >
                    Delete
                  </button>
                </DialogPrimitive.Close>
              </div>
            </div>
          </DialogPrimitive.Content>
        </Transition.Child>
      </Transition.Root>
    </DialogPrimitive.Portal>
  );
}
