import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { clsx } from 'clsx';
import axios from 'axios';
import axiosRetry from 'axios-retry';

import { Dispatch, useState, SetStateAction } from 'react';
import { apiUrl } from '../../../utils/apiUrl';

interface Props {
  deleteDialogOpen: boolean;
  setDeleteDialogOpen: Dispatch<SetStateAction<boolean>>;
  setRefetchActiveWorkflows: Dispatch<SetStateAction<boolean>>;
  setRefetchInactiveWorkflows: Dispatch<SetStateAction<boolean>>;
  workspaceId: string;
  workflowId: string;
  automation_id: string;
  setWorkflowId: Dispatch<SetStateAction<any>>;
  setAutomationId: Dispatch<SetStateAction<any>>;
  value: any;
  setMenuHovered: Dispatch<SetStateAction<boolean>>;
  renameDialogOpen: boolean;
  setRenameDialogOpen: Dispatch<SetStateAction<boolean>>;
  index: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
}

async function duplicateWorkflow(
  workspaceId: string,
  automation_id: string
) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.post(
      `${apiUrl()}automation/create/duplicateworkflow`,
      null,
      {
        params: {
          workspaceId: workspaceId,
          automation_id: automation_id,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

export function WorkflowDropdownMenu({
  deleteDialogOpen,
  setDeleteDialogOpen,
  workspaceId,
  workflowId,
  setWorkflowId,
  value,
  setAutomationId,
  setRefetchActiveWorkflows,
  setRefetchInactiveWorkflows,
  automation_id,
  setMenuHovered,
  renameDialogOpen,
  setRenameDialogOpen,
  index,
  setCurrentIndex,
}: Props) {
  const [deleteHovered, setDeleteHovered] = useState(false);
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        onMouseEnter={() => {
          setMenuHovered(true);
        }}
        align="end"
        sideOffset={5}
        className={clsx(
          'flex flex-col z-10 space-y-0.5 radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
          'w-44 rounded-lg py-1 shadow-md',
          'bg-white'
        )}
      >
        <button
          onClick={(e) => {
            e.preventDefault();
            setWorkflowId(value.id);
            setAutomationId(value.automation_id);
            setRenameDialogOpen(true);
            setCurrentIndex(index);
          }}
        >
          <DropdownMenuPrimitive.Item className="px-3 py-1 hover:bg-gray-100">
            <span className="text-sm silka-medium text-gray-900">
              Rename
            </span>
          </DropdownMenuPrimitive.Item>
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            duplicateWorkflow(workspaceId, automation_id).then(() => {
              setRefetchActiveWorkflows(true);
              setRefetchInactiveWorkflows(true);
            });
          }}
        >
          <DropdownMenuPrimitive.Item className="px-3 py-1 hover:bg-gray-100">
            <span className="text-sm silka-medium text-gray-900">
              Duplicate
            </span>
          </DropdownMenuPrimitive.Item>
        </button>
        <button
          onMouseEnter={() => {
            setDeleteHovered(true);
          }}
          onMouseLeave={() => {
            setDeleteHovered(false);
          }}
          onClick={(e) => {
            e.preventDefault();
            setWorkflowId(value.id);
            setAutomationId(value.automation_id);
            setDeleteDialogOpen(true);
            setCurrentIndex(index);
          }}
        >
          <DropdownMenuPrimitive.Item
            className={
              'px-3 py-1 ' + (deleteHovered ? 'bg-[#F5E4E4]' : '')
            }
          >
            <span
              className={
                'text-sm silka-medium ' +
                (deleteHovered ? 'text-[#F04342]' : 'text-gray-900')
              }
            >
              Delete
            </span>
          </DropdownMenuPrimitive.Item>
        </button>
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
}
