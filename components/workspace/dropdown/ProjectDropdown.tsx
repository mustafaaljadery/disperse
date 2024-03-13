import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import cx from 'classnames';
import Router from 'next/router';
import { Dispatch, SetStateAction } from 'react';

interface ProjectDropdownProps {
  mediaId: string;
  workspaceId: string;
  deleteProjectDialogOpen: boolean;
  setDeleteProjectDialogOpen: Dispatch<SetStateAction<boolean>>;
  renameProjectDialogOpen: boolean;
  setRenameProjectDialogOpen: Dispatch<SetStateAction<boolean>>;
  projectAccessDialogOpen: boolean;
  setProjectAccessDialogOpen: Dispatch<SetStateAction<boolean>>;
  optionsHovered: boolean;
  setOptionsHovered: Dispatch<SetStateAction<boolean>>;
  setSelectedProject: Dispatch<SetStateAction<any>>;
  project: any;
}

export function ProjectDropdown({
  mediaId,
  workspaceId,
  deleteProjectDialogOpen,
  setDeleteProjectDialogOpen,
  renameProjectDialogOpen,
  setRenameProjectDialogOpen,
  projectAccessDialogOpen,
  setProjectAccessDialogOpen,
  optionsHovered,
  setOptionsHovered,
  setSelectedProject,
  project,
}: ProjectDropdownProps) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        onMouseEnter={() => setOptionsHovered(true)}
        onMouseLeave={() => setOptionsHovered(false)}
        align="end"
        sideOffset={7}
        className={cx(
          'flex flex-col space-y-0.5 radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
          'w-44 rounded-lg z-10 py-1.5 shadow-md',
          'bg-[#363636]'
        )}
      >
        <button
          onClick={() => {
            setSelectedProject(project?.id);
            Router.push('/' + workspaceId + '/' + mediaId);
          }}
          className="flex flex-col justify-start items-start py-2 hover:bg-[#3D3D3D]"
        >
          <DropdownMenuPrimitive.Item className="px-3 flex flex-row space-x-2">
            <svg
              width="14"
              height="14"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="my-auto"
            >
              <path
                d="M7.5 11C4.80285 11 2.52952 9.62184 1.09622 7.50001C2.52952 5.37816 4.80285 4 7.5 4C10.1971 4 12.4705 5.37816 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11ZM7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C1.65639 10.2936 4.30786 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C13.3436 4.70638 10.6921 3 7.5 3ZM7.5 9.5C8.60457 9.5 9.5 8.60457 9.5 7.5C9.5 6.39543 8.60457 5.5 7.5 5.5C6.39543 5.5 5.5 6.39543 5.5 7.5C5.5 8.60457 6.39543 9.5 7.5 9.5Z"
                fill="white"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="text-white silka-medium text-xs">
              View Project
            </span>
          </DropdownMenuPrimitive.Item>
        </button>
        <DialogPrimitive.Root
          open={renameProjectDialogOpen}
          onOpenChange={setRenameProjectDialogOpen}
        >
          <DialogPrimitive.Trigger asChild>
            <button
              onClick={(e) => {
                setSelectedProject(project?.id);
              }}
              className="flex flex-row px-3 space-x-2 justify-start py-2 items-start hover:bg-[#3D3D3D]"
            >
              <svg
                width="14"
                height="14"
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
              <span className="text-white silka-medium text-xs">
                Rename Project
              </span>
            </button>
          </DialogPrimitive.Trigger>
        </DialogPrimitive.Root>
        <DialogPrimitive.Root
          open={deleteProjectDialogOpen}
          onOpenChange={setDeleteProjectDialogOpen}
        >
          <DialogPrimitive.Trigger asChild>
            <button
              onClick={(e) => {
                setSelectedProject(project?.id);
              }}
              className="flex flex-col justify-start py-2 items-start hover:bg-[#3D3D3D]"
            >
              <DropdownMenuPrimitive.Item className="px-3 flex flex-row space-x-2">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="my-auto"
                >
                  <path
                    d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
                    fill="white"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="text-white silka-medium text-xs">
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
