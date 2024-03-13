import axios from 'axios';
import axiosRetry from 'axios-retry';
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
import { apiUrl } from '../../utils/apiUrl';
import toast from 'react-hot-toast';

interface FileRenameProps {
  isOpen: boolean;
  fileId: string;
  currentName: string;
  setFileRefetch: Dispatch<SetStateAction<boolean>>;
}

export function FileRename({
  isOpen,
  currentName,
  fileId,
  setFileRefetch,
}: FileRenameProps) {
  const [fileName, setFileName] = useState(currentName);

  axiosRetry(axios, { retries: 3 });

  useEffect(() => {
    setFileName(currentName);
  }, [currentName]);

  async function handleSubmit() {
    try {
      toast.loading('Renaming File...', {
        className: 'text-sm silka-medium text-gray-900',
        duration: 800000,
      });
      const result = await axios.post(
        `${apiUrl()}file/update/rename`,
        null,
        { params: { fileId: fileId, fileName: fileName } }
      );
      setFileRefetch(true);
      toast.remove();
      toast.success('File Renamed!', {
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
            Rename File
          </DialogPrimitive.Title>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="flex flex-col mt-5"
          >
            <label className="text-xs silka-medium">New name</label>
            <input
              type="text"
              value={fileName}
              onChange={(e) => {
                setFileName(e.target.value);
              }}
              className="mt-2 w-full text-xs silka-regular rounded border border-[#] focus:ring-0 focus:border-[#FF623D]"
            />
            <div className="mt-6 flex flex-row space-x-5">
              <DialogPrimitive.Close>
                <button
                  type="submit"
                  className="text-xs silka-medium text-white px-4 py-1.5 rounded bg-[#FF623D] hover:opacity-90"
                >
                  Rename File
                </button>
              </DialogPrimitive.Close>
              <DialogPrimitive.Close>
                <button
                  type="button"
                  className="text-xs silka-medium text-gray-700 px-4 py-1.5 rounded hover:opacity-90 border"
                >
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
