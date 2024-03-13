import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Transition } from '@headlessui/react';
import cx from 'classnames';
import { Fragment, useState, Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { signOut } from 'next-auth/react';
import toast from 'react-hot-toast';
import { apiUrl } from '../../utils/apiUrl';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  userId: string;
}

function ErrorMessage() {
  return (
    <div className="mt-4 flex flex-row justify-between items-bewteen w-full bg-[#F9DAD8] border rounded-lg border-[#DF4D47] px-4 py-2.5">
      <div className="flex flex-row space-x-2">
        <svg
          width="20"
          height="20"
          viewBox="0 0 8 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="my-auto"
        >
          <g clipPath="url(#clip0_491_2)">
            <path
              d="M4.00067 7.17818C5.84 7.17818 7.33333 5.68485 7.33333 3.84552C7.33333 2.00618 5.84 0.513184 4.00067 0.513184C2.16167 0.513184 0.668335 2.00618 0.668335 3.84552C0.668335 5.68485 2.16167 7.17818 4.00067 7.17818ZM4.00067 6.67818C2.43733 6.67818 1.16833 5.40885 1.16833 3.84552C1.16833 2.28218 2.43733 1.01318 4.00067 1.01318C5.564 1.01318 6.83333 2.28218 6.83333 3.84552C6.83333 5.40885 5.564 6.67818 4.00067 6.67818ZM4.00067 4.51152C3.86267 4.51152 3.75067 4.39952 3.75067 4.26152V2.42818C3.75067 2.29018 3.86267 2.17818 4.00067 2.17818C4.13867 2.17818 4.25067 2.29018 4.25067 2.42818V4.26152C4.25067 4.39952 4.13867 4.51152 4.00067 4.51152ZM4 5.51152C4.184 5.51152 4.33333 5.36218 4.33333 5.17818C4.33333 4.99418 4.184 4.84485 4 4.84485C3.816 4.84485 3.66667 4.99418 3.66667 5.17818C3.66667 5.36218 3.816 5.51152 4 5.51152Z"
              fill="#DF4D47"
            />
          </g>
          <defs>
            <clipPath id="clip0_491_2">
              <rect width="8" height="8" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <p className="silka-medium my-auto text-sm text-[#DF4D47]">
          Invalid input, confirm deletion
        </p>
      </div>
    </div>
  );
}

export function DeleteAccountDialog({
  isOpen,
  setIsOpen,
  userId,
}: Props) {
  const [value, setValue] = useState('');
  const [errorOpen, setErrorOpen] = useState(false);

  async function handleSubmit() {
    const actual = 'I WANT TO DELETE MY ACCOUNT';
    setErrorOpen(false);
    if (actual == value) {
      setIsOpen(false);
      try {
        axiosRetry(axios, { retries: 3 });

        toast.loading('Deleting account...', {
          className: 'text-sm silka-medium text-gray-900',
          duration: 80000,
        });
        const result = await axios.post(
          `${apiUrl()}user/delete/deleteaccount`,
          null,
          {
            params: { userId: userId },
          }
        );
        toast.remove();
        toast.success('Account Deleted!', {
          className: 'text-sm silka-medium text-gray-900',
        });
        localStorage.clear();
        signOut({
          callbackUrl: 'https://trydisperse.com',
        });
        return result.data;
      } catch (e) {
        console.log(e);
      }
    } else {
      setErrorOpen(true);
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
          <DialogPrimitive.Title className="text-sm silka-semibold text-gray-900">
            Delete Account
          </DialogPrimitive.Title>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="flex flex-col"
          >
            <p className="text-xs silka-regular text-[#525252] mt-2">
              Are you sure you want to delete your account? By doing
              so, you will lose all of the media stored in each of the
              workspaces you are an owner. Moreover, you will lose all
              analytics associated with social accounts connected to
              your workspaces.
            </p>
            {errorOpen ? <ErrorMessage /> : <div className="mt-2" />}
            <label className="silka-regular mt-4 text-xs">
              Type{' '}
              <span className="silka-semibold">
                I WANT TO DELETE MY ACCOUNT
              </span>{' '}
              to confirm account deletion
            </label>
            <input
              type="text"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              className="w-full mt-2 text-xs silka-regular rounded bg-[#FAFAFA] border border-[#EEEEEE] focus:ring-0 focus:border-[#FF623D]"
              placeholder="Confirm deletion..."
            />
            <div className="flex flex-row space-x-5 mt-6">
              <button
                type="submit"
                className="text-xs silka-medium text-white px-4 py-1.5 rounded bg-[#FF623D] hover:opacity-90"
              >
                Delete Account
              </button>
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
