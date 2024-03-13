import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import cx from 'classnames';
import { Dispatch, SetStateAction } from 'react';
import Router from 'next/router';

interface AutomationDropdownProps {
  renameAutomationDialogOpen: boolean;
  setRenameAutomationDialogOpen: Dispatch<SetStateAction<boolean>>;
  deleteAutomationDialogOpen: boolean;
  setDeleteAutomationDialogOpen: Dispatch<SetStateAction<boolean>>;
  workspaceId: string;
}

export function AutomationDropdown({
  renameAutomationDialogOpen,
  setRenameAutomationDialogOpen,
  deleteAutomationDialogOpen,
  setDeleteAutomationDialogOpen,
  workspaceId,
}: AutomationDropdownProps) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        align="end"
        sideOffset={7}
        className={cx(
          'flex flex-col space-y-0.5 radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
          'w-44 rounded-lg py-1.5 shadow-md',
          'bg-[#363636]'
        )}
      >
        <button
          onClick={() => {
            Router.push('/' + workspaceId + '/automation');
          }}
          className="flex flex-col justify-start items-start hover:bg-[#3D3D3D]"
        >
          <DropdownMenuPrimitive.Item className="py-0.5 px-3">
            <span className="text-white silka-medium text-xs">
              View Workflow
            </span>
          </DropdownMenuPrimitive.Item>
        </button>
        <DialogPrimitive.Root
          open={renameAutomationDialogOpen}
          onOpenChange={setRenameAutomationDialogOpen}
        >
          <DialogPrimitive.Trigger asChild>
            <button className="flex flex-col justify-start items-start hover:bg-[#3D3D3D]">
              <DropdownMenuPrimitive.Item className="py-0.5 px-3">
                <span className="text-white silka-medium text-xs">
                  Rename Workflow
                </span>
              </DropdownMenuPrimitive.Item>
            </button>
          </DialogPrimitive.Trigger>
        </DialogPrimitive.Root>
        <DialogPrimitive.Root
          open={deleteAutomationDialogOpen}
          onOpenChange={setDeleteAutomationDialogOpen}
        >
          <DialogPrimitive.Trigger asChild>
            <button className="flex flex-col justify-start items-start hover:bg-[#3D3D3D]">
              <DropdownMenuPrimitive.Item className="py-0.5 px-3">
                <span className="text-white silka-medium text-xs">
                  Delete Workflow
                </span>
              </DropdownMenuPrimitive.Item>
            </button>
          </DialogPrimitive.Trigger>
        </DialogPrimitive.Root>
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
}
