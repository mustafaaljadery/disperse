import { Transition } from '@headlessui/react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { clsx } from 'clsx';
import {
  Fragment,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from 'react';
import axios from 'axios';
import { apiUrl } from '../../../utils/apiUrl';
import { Scroll } from '../../utils/Scroll';

async function getWorkspaceMembers(
  workspaceId: string,
  userId: string
) {
  try {
    const result = await axios.get(
      `${apiUrl()}chat/read/workspacemembers`,
      {
        params: {
          workspaceId: workspaceId,
          userId: userId,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function createChat(userId: string, otherUserId: string) {
  try {
    const result = await axios.post(
      `${apiUrl()}chat/create/chat`,
      null,
      {
        params: {
          userId: userId,
          otherUserId: otherUserId,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function createGroup(users: string) {
  try {
    const result = await axios.post(
      `${apiUrl()}chat/create/group`,
      null,
      {
        params: {
          users: users,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

interface UserProps {
  users: string;
  value: any;
  setUsers: Dispatch<SetStateAction<string>>;
}

function User({ value, users, setUsers }: UserProps) {
  return (
    <button
      className={
        'flex py-1.5 px-3 rounded border flex-col space-y-0.5 ' +
        (users.includes(value.id) ? 'border-[#FF623D]' : '')
      }
      onClick={() => {
        setUsers(users + ',' + value.id);
      }}
    >
      <p className="text-sm silka-medium text-gray-900">
        {value.name}
      </p>
      <span className="text-[11px] silka-regular text-gray-400">
        {value.email}
      </span>
    </button>
  );
}

interface Props {
  isOpen: boolean;
  workspaceId: string;
  userId: string;
}

export function NewChatDialog({
  isOpen,
  workspaceId,
  userId,
}: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [members, setMembers] = useState<any>(null);
  const [users, setUsers] = useState<string>('');

  useEffect(() => {
    if (workspaceId && userId) {
      getWorkspaceMembers(workspaceId, userId).then((result) => {
        setMembers(result.members);
        setUsers(userId);
        setIsLoading(false);
      });
    }
  }, [workspaceId]);

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
            <form
              onSubmit={(e) => {
                e.preventDefault();
                let temp = users.split(',');
                if (temp.length > 2) {
                  createGroup(users).then((result) => {});
                } else {
                  createChat(userId, temp[1]).then((result) => {});
                }
              }}
            >
              <div className="flex flex-col space-y-0.5">
                <h1 className="silka-semibold text-gray-900 text-xl">
                  New Chat
                </h1>
                <p className="silka-regular text-gray-400 text-xs">
                  Chat to other members in your workspace
                </p>
              </div>
              {isLoading ? (
                <div className="flex flex-row h-[200px] justify-center items-center space-x-2 mt-4">
                  <span className="animate-ping h-2.5 w-2.5 my-auto rounded-full bg-[#FF623D] opacity-75"></span>
                  <p className="text-xs my-auto silka-medium text-gray-800">
                    Getting Members...
                  </p>
                </div>
              ) : (
                <div className="h-[200px]">
                  <Scroll>
                    <div className="flex flex-col space-y-1.5 mt-4">
                      {members.map((member: any, index: number) => {
                        return (
                          <User
                            users={users}
                            value={member}
                            key={index}
                            setUsers={setUsers}
                          />
                        );
                      })}
                    </div>
                  </Scroll>
                </div>
              )}
              <div className="flex mt-4 flex-row space-x-3 justify-end items-end">
                <DialogPrimitive.Close>
                  <button
                    type="button"
                    className="bg-[#FCFCFC] shadow-sm hover:shadow-none px-3 py-1.5 rounded border text-xs silka-medium text-gray-700"
                  >
                    Cancel
                  </button>
                </DialogPrimitive.Close>
                <button
                  type="submit"
                  className="text-xs silka-medium text-white bg-[#FF623D] px-3 shadow-md hover:shadow-none py-1.5 rounded"
                >
                  Add Members
                </button>
              </div>
            </form>
          </DialogPrimitive.Content>
        </Transition.Child>
      </Transition.Root>
    </DialogPrimitive.Portal>
  );
}
