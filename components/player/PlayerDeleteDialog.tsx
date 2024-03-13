import axios from 'axios';
import axiosRetry from 'axios-retry';
import { Transition } from '@headlessui/react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import cx from 'classnames';
import React, { Fragment, Dispatch, SetStateAction } from 'react';
import Router from 'next/router';
import { apiUrl } from '../../utils/apiUrl';
import toast from 'react-hot-toast';

interface FileDeleteProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  fileId: string;
  workspaceId: string;
  folderId: string;
}

async function handleSubmit(
  fileId: string,
  workspaceId: string,
  mediaId: string
) {
  try {
    axiosRetry(axios, { retries: 3 });
    toast.loading('Deleting File...', {
      className: 'text-sm silka-medium text-gray-900',
      duration: 80000,
    });

    const result = await axios.post(
      `${apiUrl()}file/delete/file`,
      null,
      {
        params: {
          fileId: fileId,
          folderId: mediaId,
          workspaceId: workspaceId,
        },
      }
    );
    toast.remove();
    toast.success('Successfully Deleted File!', {
      className: 'text-sm silka-medium text-gray-900',
    });
    Router.push('/' + workspaceId + '/' + mediaId);
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

export function PlayerDeleteFile({
  isOpen,
  setIsOpen,
  fileId,
  workspaceId,
  folderId,
}: FileDeleteProps) {
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
          <DialogPrimitive.Title className="text-base silka-medium text-gray-900">
            Delete File
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="mt-2 text-sm silka-regular text-gray-700">
            Are you sure you want to delete this file?
          </DialogPrimitive.Description>
          <div className="flex flex-col">
            <button
              onClick={() => {
                handleSubmit(fileId, workspaceId, folderId);
                setIsOpen(false);
              }}
              className="mt-6 rounded py-1.5 w-full text-sm text-[#FF7070] border-[#FF7070] hover:opacity-80 silka-medium border"
            >
              Delete File
            </button>
            <DialogPrimitive.Close>
              <button className="mt-2 border rounded py-1.5 w-full text-sm text-[#595959] hover:opacity-80 border-[#D9D9D9] silka-medium">
                Cancel
              </button>
            </DialogPrimitive.Close>
          </div>
        </DialogPrimitive.Content>
      </Transition.Child>
    </Transition.Root>
  );
}
