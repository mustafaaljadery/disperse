import {
  Fragment,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Transition } from '@headlessui/react';
import { Cross1Icon } from '@radix-ui/react-icons';
import cx from 'classnames';
import axios from 'axios';
import axiosRetry from 'axios-retry';

import { apiUrl } from '../../utils/apiUrl';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  user: any;
  setUpgradeWorkspaceOpen: Dispatch<SetStateAction<boolean>>;
}

async function handleCreateWorkspace(
  user: any,
  createWorkspaceName: string
) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.post(
      `${apiUrl()}workspace/create/workspace`,
      null,
      {
        params: {
          userId: user?.id,
          workspaceName: createWorkspaceName,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function getWorkspaceNumber(userId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}workspace/read/myworkspacenumber`,
      {
        params: { userId: userId },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

export function CreateWorkspaceDialog({
  isOpen,
  user,
  setIsOpen,
  setUpgradeWorkspaceOpen,
}: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [workspaceNumber, setWorkspaceNumber] = useState(0);
  const [createWorkspaceName, setCreateWorkspaceName] = useState('');

  useEffect(() => {
    getWorkspaceNumber(user?.id).then((value) => {
      if (value.data > 0) {
        setIsOpen(false);
        setUpgradeWorkspaceOpen(true);
      }
      setWorkspaceNumber(value);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <div></div>;

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
            'w-[95vw] max-w-xl max-h-[80vh] overflow-auto rounded p-4 md:w-full',
            'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
            'bg-white',
            'focus:outline-none focus-visible:ring focus-visible:ring-[#FF623D] focus-visible:ring-opacity-75'
          )}
        >
          {workspaceNumber > 0 ? (
            <div className="flex flex-col">
              <DialogPrimitive.Title className="text-base silka-semibold">
                Purchase Pro
              </DialogPrimitive.Title>
              <div className="mt-4">
                <p className="text-sm text-gray-600 silka-regular">
                  Unlock the full power of Disperse by upgrading to
                  pro.
                </p>
                <p className="text-sm mt-4 text-gray-900 silka-medium">
                  Additional workspaces can be created for{' '}
                  <span className="silka-semibold">$29</span> per
                  month billed annually, or{' '}
                  <span className="silka-semibold">$39</span> per
                  month billed monthly.
                </p>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                    setUpgradeWorkspaceOpen(true);
                  }}
                  className="text-xs silka-medium text-white bg-[#FF623D] rounded hover:opacity-90 px-4 py-1.5 mt-6"
                >
                  Upgrade to Pro
                </button>
              </div>
            </div>
          ) : (
            <>
              <DialogPrimitive.Title className="silka-semibold text-sm">
                Workspace Name
              </DialogPrimitive.Title>
              <form
                onSubmit={() => {
                  handleCreateWorkspace(user, createWorkspaceName);
                }}
                className="flex flex-col mt-5"
              >
                <label className="text-xs silka-medium">
                  Workspace Name
                </label>
                <input
                  required
                  placeholder="Some Cool Workspace"
                  type="text"
                  value={createWorkspaceName}
                  onChange={(e) =>
                    setCreateWorkspaceName(e.target.value)
                  }
                  className="mt-2 w-full text-xs silka-regular rounded border border-[#] focus:ring-0 focus:border-[#FF623D]"
                />
                <div></div>
                <div className="mt-6 flex space-x-5 flex-row justify-start items-start">
                  <button
                    type="submit"
                    className="text-xs silka-medium text-white px-4 py-1.5 rounded bg-[#FF623D] hover:opacity-90"
                  >
                    Create Workspace
                  </button>
                  <DialogPrimitive.Close>
                    <button className="text-xs silka-medium text-gray-700 px-4 py-1.5 rounded hover:opacity-90 border ">
                      Cancel
                    </button>
                  </DialogPrimitive.Close>
                </div>
              </form>
            </>
          )}
        </DialogPrimitive.Content>
      </Transition.Child>
    </Transition.Root>
  );
}
