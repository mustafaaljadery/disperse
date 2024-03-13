import Link from 'next/link';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { PlayerShareDialog } from './ShareDialog';
import { PlayerOptionsDropdown } from './OptionsDropdown';
import { Dispatch, SetStateAction } from 'react';
import { PlayerMobileOptions } from './MobileOptions';

interface Props {
  fileInfo: any;
  shareOpen: boolean;
  setShareOpen: Dispatch<SetStateAction<boolean>>;
  setRenameOpen: Dispatch<SetStateAction<boolean>>;
  setDeleteOpen: Dispatch<SetStateAction<boolean>>;
}

export function PlayerTopbar({
  fileInfo,
  shareOpen,
  setShareOpen,
  setRenameOpen,
  setDeleteOpen,
}: Props) {
  return (
    <header className="py-2.5 md:py-3 w-full px-4 md:px-8 flex flex-row justify-between items-between">
      <Link
        href={'/' + fileInfo.workspaceName + '/' + fileInfo.folderId}
        legacyBehavior>
        <button>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="my-auto"
          >
            <path
              d="M9.72417 0L11.375 1.65025L5.92725 7.00233L11.375 12.3497L9.72417 14L2.625 7.00233L9.72417 0Z"
              fill="#FF4317"
            />
          </svg>
        </button>
      </Link>
      <div className="hidden md:flex flex-row my-auto space-x-2">
        <h1 className="silka-medium my-auto text-[#686868] text-sm">
          {fileInfo.name.length > 50
            ? fileInfo.name.slice(0, 50) + '...'
            : fileInfo.name}
        </h1>
      </div>
      <div className="flex flex-row space-x-5 w-fit h-full">
        <button className="hidden hover:opacity-80 text-[#686868] py-1 h-fit silka-medium text-sm px-5 rounded border border-[#DADADA]">
          Edit
        </button>
        <div>
          <DropdownMenuPrimitive.Root>
            <DropdownMenuPrimitive.Trigger asChild>
              <button className="border rounded p-1.5 border-[#DADADA] my-auto">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.625 2.5C8.625 3.12132 8.12132 3.625 7.5 3.625C6.87868 3.625 6.375 3.12132 6.375 2.5C6.375 1.87868 6.87868 1.375 7.5 1.375C8.12132 1.375 8.625 1.87868 8.625 2.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM7.5 13.625C8.12132 13.625 8.625 13.1213 8.625 12.5C8.625 11.8787 8.12132 11.375 7.5 11.375C6.87868 11.375 6.375 11.8787 6.375 12.5C6.375 13.1213 6.87868 13.625 7.5 13.625Z"
                    fill="#686868"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </DropdownMenuPrimitive.Trigger>
            <PlayerOptionsDropdown
              fileInfo={fileInfo}
              setRenameOpen={setRenameOpen}
              setDeleteOpen={setDeleteOpen}
            />
          </DropdownMenuPrimitive.Root>
        </div>
        <div>
          <DialogPrimitive.Root
            open={shareOpen}
            onOpenChange={setShareOpen}
          >
            <DialogPrimitive.Trigger asChild>
              <button className="hover:opacity-80 text-[#686868] py-1 h-fit silka-medium text-sm px-6 rounded border border-[#DADADA]">
                Share
              </button>
            </DialogPrimitive.Trigger>
            <PlayerShareDialog
              fileId={fileInfo.id}
              isOpen={shareOpen}
            />
          </DialogPrimitive.Root>
        </div>
        <PlayerMobileOptions />
      </div>
    </header>
  );
}
