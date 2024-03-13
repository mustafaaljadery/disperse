import * as DialogPrimitive from '@radix-ui/react-dialog';
import axios from 'axios';
import {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  Fragment,
} from 'react';
import { Transition } from '@headlessui/react';
import { clsx } from 'clsx';
import toast from 'react-hot-toast';
import { apiUrl } from '../../utils/apiUrl';

async function renameComposition(
  compositionId: string,
  name: string
) {
  try {
    toast.loading('Renaming Composition...', {
      className: 'text-sm silka-medium text-gray-900',
      duration: 80000,
    });

    const result = await axios.post(
      `${apiUrl()}editor/update/name`,
      null,
      {
        params: {
          compositionId: compositionId,
          name: name,
        },
      }
    );

    toast.remove();
    toast.success('Renamed Composition!', {
      className: 'text-sm silka-medium text-gray-900',
    });
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

interface Props {
  open: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  compositionId: string;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
}

export function CompositionRenameDialog({
  open,
  setIsOpen,
  compositionId,
  name,
  setName,
}: Props) {
  const [newName, setNewName] = useState('');

  useEffect(() => {
    setNewName(name);
  }, [name]);

  return (
    <DialogPrimitive.Portal forceMount>
      <Transition.Root show={open}>
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
              'bg-white dark:bg-gray-800',
              'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
            )}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                renameComposition(compositionId, newName);
                setName(newName);
              }}
              className="w-full flex flex-col"
            >
              <div className="flex flex-row justify-between items-between">
                <h1 className="silka-semibold text-base text-gray-900">
                  Rename Composition
                </h1>
                <DialogPrimitive.Close>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </DialogPrimitive.Close>
              </div>
              <div className="mt-6 flex flex-col space-y-2">
                <p className="text-xs silka-semibold text-[#363636]">
                  Name
                </p>
                <input
                  type="text"
                  className="text-sm silka-regular text-[#363636] border border-gray-300 focus:ring-0 focus:border-[#FF623D] rounded px-2 py-1.5"
                  value={newName}
                  onChange={(e) => {
                    setNewName(e.target.value);
                  }}
                  placeholder="New name..."
                />
              </div>
              <div className="flex mt-8 space-x-3 flex-row justify-end items-end">
                <DialogPrimitive.Close>
                  <button
                    type="button"
                    className="bg-[#363636] hover:opacity-90 rounded px-4 py-1.5 text-xs silka-medium text-white"
                  >
                    Cancel
                  </button>
                </DialogPrimitive.Close>
                <DialogPrimitive.Close>
                  <button
                    type="submit"
                    className="bg-[#FF623D] hover:opacity-90 rounded px-4 py-1.5 text-xs silka-medium text-white"
                  >
                    Rename Composition
                  </button>
                </DialogPrimitive.Close>
              </div>
            </form>
          </DialogPrimitive.Content>
        </Transition.Child>
      </Transition.Root>
    </DialogPrimitive.Portal>
  );
}
