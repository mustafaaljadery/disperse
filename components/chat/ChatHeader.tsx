import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { clsx } from 'clsx';
import { useState } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { NewChatDialog } from './dialog/NewChat';

interface Props {
  workspaceId: string;
  userId: string;
}

export function ChatHeader({ workspaceId, userId }: Props) {
  const [newChatOpen, setNewChatOpen] = useState(false);

  return (
    <div className="flex flex-row justify-end space-x-3 items-end">
      <DialogPrimitive.Root
        open={newChatOpen}
        onOpenChange={setNewChatOpen}
      >
        <DialogPrimitive.Trigger asChild>
          <button className="flex px-3 py-1 my-auto rounded shadow hover:shadow-none flex-row space-x-1.5 bg-[#FF623D]">
            <svg
              width="12"
              height="12"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="my-auto"
            >
              <path
                d="M12.5 3L2.5 3.00002C1.67157 3.00002 1 3.6716 1 4.50002V9.50003C1 10.3285 1.67157 11 2.5 11H7.50003C7.63264 11 7.75982 11.0527 7.85358 11.1465L10 13.2929V11.5C10 11.2239 10.2239 11 10.5 11H12.5C13.3284 11 14 10.3285 14 9.50003V4.5C14 3.67157 13.3284 3 12.5 3ZM2.49999 2.00002L12.5 2C13.8807 2 15 3.11929 15 4.5V9.50003C15 10.8807 13.8807 12 12.5 12H11V14.5C11 14.7022 10.8782 14.8845 10.6913 14.9619C10.5045 15.0393 10.2894 14.9965 10.1464 14.8536L7.29292 12H2.5C1.11929 12 0 10.8807 0 9.50003V4.50002C0 3.11931 1.11928 2.00003 2.49999 2.00002Z"
                fill="white"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
            <p className="silka-medium text-white my-auto text-xs">
              New Chat
            </p>
          </button>
        </DialogPrimitive.Trigger>
        <NewChatDialog
          isOpen={newChatOpen}
          workspaceId={workspaceId}
          userId={userId}
        />
      </DialogPrimitive.Root>
      <DropdownMenuPrimitive.Root>
        <DropdownMenuPrimitive.Trigger asChild>
          <button onClick={() => {}} className="my-auto">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.625 2.5C8.625 3.12132 8.12132 3.625 7.5 3.625C6.87868 3.625 6.375 3.12132 6.375 2.5C6.375 1.87868 6.87868 1.375 7.5 1.375C8.12132 1.375 8.625 1.87868 8.625 2.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM7.5 13.625C8.12132 13.625 8.625 13.1213 8.625 12.5C8.625 11.8787 8.12132 11.375 7.5 11.375C6.87868 11.375 6.375 11.8787 6.375 12.5C6.375 13.1213 6.87868 13.625 7.5 13.625Z"
                fill="#363636"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </DropdownMenuPrimitive.Trigger>
        <DropdownMenuPrimitive.Portal>
          <DropdownMenuPrimitive.Content
            align="end"
            sideOffset={5}
            className={clsx(
              'radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
              'w-52 rounded-lg px-1.5 py-1 shadow-md',
              'bg-white'
            )}
          >
            <button className="flex flex-row space-x-2">
              <p>View Profile</p>
            </button>
            <button className="flex flex-row space-x-2">
              <p>Clear History</p>
            </button>
            <button className="flex flex-row space-x-2">
              <p>Delete Chat</p>
            </button>
          </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Portal>
      </DropdownMenuPrimitive.Root>
    </div>
  );
}
