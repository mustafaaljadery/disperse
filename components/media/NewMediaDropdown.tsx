import cx from 'classnames';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { useState, Dispatch, SetStateAction } from 'react';
import { CreateNewFolderDialog } from './dialog/CreateNewFolderDialog';

interface NewMediaDropdownProps {
  workspaceId: string;
  mediaId: string;
  createFolderOpen: boolean;
  setCreateFolderOpen: Dispatch<SetStateAction<boolean>>;
  createPrivateFolderOpen: boolean;
  setCreatePrivateFolderOpen: Dispatch<SetStateAction<boolean>>;
}

export function NewMediaDropdown({
  workspaceId,
  mediaId,
  createFolderOpen,
  setCreateFolderOpen,
  createPrivateFolderOpen,
  setCreatePrivateFolderOpen,
}: NewMediaDropdownProps) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        align="end"
        sideOffset={7}
        className={cx(
          'flex flex-col space-y-0.5 radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
          'w-48 rounded-lg px-1.5 py-1 shadow-md md:w-56',
          'bg-[#363636]'
        )}
      >
        <button className="flex flex-col justify-start items-start">
          <DropdownMenuPrimitive.Item className="px-3 py-1 flex flex-row space-x-2">
            <span className="text-sm silka-medium text-white">
              New Composition
            </span>
          </DropdownMenuPrimitive.Item>
        </button>
        <DialogPrimitive.Root
          open={createFolderOpen}
          onOpenChange={setCreateFolderOpen}
        >
          <DialogPrimitive.Trigger asChild>
            <button className="flex flex-col justify-start items-start">
              <DropdownMenuPrimitive.Item className="px-3 py-1 flex flex-row space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  className="my-auto"
                >
                  <path
                    fill="white"
                    d="M24 22h-24v-14h7.262c1.559 0 2.411-.708 5.07-3h11.668v17zm-16.738-16c.64 0 1.11-.271 2.389-1.34l-2.651-2.66h-7v4h7.262z"
                  />
                </svg>
                <span className="my-auto text-sm silka-medium text-white">
                  New Folder
                </span>
              </DropdownMenuPrimitive.Item>
            </button>
          </DialogPrimitive.Trigger>
        </DialogPrimitive.Root>
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
}
