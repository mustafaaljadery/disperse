import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import cx from 'classnames';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  projectSettingsOpen: boolean;
  setProjectSettingsOpen: Dispatch<SetStateAction<boolean>>;
  deleteProjectOpen: boolean;
  setDeleteProjectOpen: Dispatch<SetStateAction<boolean>>;
}

export function OptionsDropdownMenu({
  projectSettingsOpen,
  setProjectSettingsOpen,
  deleteProjectOpen,
  setDeleteProjectOpen,
}: Props) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        align="end"
        sideOffset={5}
        className={cx(
          'flex flex-col space-y-0.5 radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
          'w-48 rounded-lg py-2 shadow-md',
          'bg-[#363636]'
        )}
      >
        <DialogPrimitive.Root
          open={projectSettingsOpen}
          onOpenChange={setProjectSettingsOpen}
        >
          <DialogPrimitive.Trigger asChild>
            <button className="px-3 w-full py-1 hover:bg-[#3D3D3D]">
              <DropdownMenuPrimitive.Item className="py-0.5 flex flex-row space-x-2">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="my-auto"
                >
                  <path
                    d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z"
                    fill="white"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="text-sm silka-medium text-white">
                  Rename Project
                </span>
              </DropdownMenuPrimitive.Item>
            </button>
          </DialogPrimitive.Trigger>
        </DialogPrimitive.Root>
        <DialogPrimitive.Root
          open={deleteProjectOpen}
          onOpenChange={setDeleteProjectOpen}
        >
          <DialogPrimitive.Trigger asChild>
            <button className="px-3 w-full py-1 hover:bg-[#3D3D3D]">
              <DropdownMenuPrimitive.Item className="flex flex-row py-0.5 space-x-2">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 20 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="my-auto"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17 24H3C1.896 24 1 23.104 1 22V5H0V3H6V1.5C6 0.673 6.673 0 7.5 0H12.5C13.325 0 14 0.671 14 1.5V3H20V5H19V22C19 23.104 18.104 24 17 24ZM17 5H3V21.5C3 21.776 3.224 22 3.5 22H16.5C16.776 22 17 21.776 17 21.5V5ZM8 9C8 8.448 7.552 8 7 8C6.448 8 6 8.448 6 9V18C6 18.552 6.448 19 7 19C7.552 19 8 18.552 8 18V9ZM14 9C14 8.448 13.552 8 13 8C12.448 8 12 8.448 12 9V18C12 18.552 12.448 19 13 19C13.552 19 14 18.552 14 18V9ZM12 2H8V3H12V2Z"
                    fill="white"
                  />
                </svg>
                <span className="text-sm silka-medium text-white">
                  Delete Project
                </span>
              </DropdownMenuPrimitive.Item>
            </button>
          </DialogPrimitive.Trigger>
        </DialogPrimitive.Root>
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
}
