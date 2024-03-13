import axios from 'axios';
import axiosRetry from 'axios-retry';
import { Transition } from '@headlessui/react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import cx from 'classnames';
import { Fragment, Dispatch, SetStateAction } from 'react';
import { apiUrl } from '../../../utils/apiUrl';

interface CompositionDeleteDialogProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  compositionId: string;
  setCompositionRefetch: Dispatch<SetStateAction<boolean>>;
}

async function handleDeleteComposition(
  compositionId: string,
  setCompositionRefetch: Dispatch<SetStateAction<boolean>>
) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.post(
      `${apiUrl()}editor/delete/composition`,
      null,
      {
        params: { compositionId: compositionId },
      }
    );
    setCompositionRefetch(true);
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

export function CompositionDeleteDialog({
  isOpen,
  setIsOpen,
  compositionId,
  setCompositionRefetch,
}: CompositionDeleteDialogProps) {
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
            Delete Composition
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="mt-2 text-sm silka-regular text-gray-700">
            Are you sure you want to delete this composition?
          </DialogPrimitive.Description>
          <div className="flex flex-col">
            <button
              onClick={() => {
                handleDeleteComposition(
                  compositionId,
                  setCompositionRefetch
                );
                setIsOpen(false);
              }}
              className="mt-6 rounded py-1.5 w-full text-sm text-[#FF7070] border-[#FF7070] hover:opacity-80 silka-medium border"
            >
              Delete Composition
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
