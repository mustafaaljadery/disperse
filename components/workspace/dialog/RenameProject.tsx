import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Transition } from '@headlessui/react';
import cx from 'classnames';
import { Fragment, useState, Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../../utils/apiUrl';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

interface Props {
  isOpen: boolean;
  selectedProject: any;
  workspaceId: string;
  setRefetchWorkspaceProjects: Dispatch<SetStateAction<boolean>>;
}

export function RenameProjectDialog({
  isOpen,
  selectedProject,
  workspaceId,
  setRefetchWorkspaceProjects,
}: Props) {
  const [projectName, setProjectName] = useState('Value');
  const router = useRouter();

  axiosRetry(axios, { retries: 3 });

  async function handleSubmit() {
    try {
      if (projectName.length > 0) {
        toast.loading('Renaming Project...', {
          className: 'text-sm silka-medium text-gray-900',
        });
        const result = await axios.post(
          `${apiUrl()}workspace/update/projectname`,
          null,
          {
            params: {
              projectId: selectedProject,
              projectName: projectName,
            },
          }
        );
        setProjectName('');
        setRefetchWorkspaceProjects(true);
        toast.remove();
        router.reload();
        toast.success('Successfully Renamed Project!', {
          className: 'text-sm silka-medium text-gray-900',
        });
        return result.data;
      } else {
        toast.error('Name Cannot Be Blank', {
          className: 'text-sm silka-medium text-gray-900',
        });
      }
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
            Rename Project
          </DialogPrimitive.Title>
          <p className="mt-1 text-xs silka-regular text-gray-500">
            What would you like to change the time to?
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="flex flex-col jusitfy-start items-start mt-3"
          >
            <input
              type="text"
              value={projectName}
              onChange={(e) => {
                setProjectName(e.target.value);
              }}
              className="mt-2 w-full text-xs silka-regular rounded border border-gray-400 focus:ring-0 focus:border-[#FF623D]"
              placeholder="Cool project..."
            />
            <div className="flex flex-row mt-6 space-x-5">
              <DialogPrimitive.Close>
                <button
                  type="submit"
                  className="text-xs silka-medium text-white px-4 py-1.5 rounded bg-[#FF623D] hover:opacity-90"
                >
                  Rename Project
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
