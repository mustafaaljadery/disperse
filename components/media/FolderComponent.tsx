import { useState } from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

interface FolderComponentProps {
  value: any;
  workspaceName: string;
}

export function FolderComponent({
  value,
  workspaceName,
}: FolderComponentProps) {
  const [clicked, setClicked] = useState(false);

  function handleClick() {
    setClicked(true);
  }

  function handleDoubleClick() {
    const redirectUrl = '/' + workspaceName + '/' + value.folderId;
    window.location.href = 'http://localhost:3000' + redirectUrl;
    setClicked(false);
  }

  return (
    <button
      onDoubleClick={handleDoubleClick}
      onClick={handleClick}
      className={'w-1/5 p-2.5 ' + (clicked ? '' : '')}
    >
      <div
        className={
          'h-44 rounded-xl flex flex-col bg-[#F7F7F7] ' +
          (clicked ? 'border border-[#FF623D]' : '')
        }
      >
        <div className="flex flex-col justify-center items-center rounded-t-lg w-full h-[360px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill=""
              d="M11 5c-1.629 0-2.305-1.058-4-3h-7v20h24v-17h-13z"
            />
          </svg>
        </div>
        <div className="w-full px-2 flex flex-row justify-between h-full rounded-b-lg bg-[#F2F2F2]">
          <div className="flex flex-col space-y-1">
            <p className="text-[11px] text-start mt-2.5 silka-medium">
              {value.name}
            </p>
            <p className="mt-1 text-gray-700 text-start silka-medium text-[10px]">
              Mustafa A
            </p>
          </div>
          <DropdownMenuPrimitive.Root>
            <DropdownMenuPrimitive.Trigger asChild>
              <button className="h-fit my-auto">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5 6.87293C5.5175 6.87293 5.9375 7.29292 5.9375 7.81043C5.9375 8.32793 5.5175 8.74792 5 8.74792C4.4825 8.74792 4.0625 8.32793 4.0625 7.81043C4.0625 7.29292 4.4825 6.87293 5 6.87293ZM5 4.06042C5.5175 4.06042 5.9375 4.48042 5.9375 4.99792C5.9375 5.51542 5.5175 5.93542 5 5.93542C4.4825 5.93542 4.0625 5.51542 4.0625 4.99792C4.0625 4.48042 4.4825 4.06042 5 4.06042ZM5 1.24792C5.5175 1.24792 5.9375 1.66792 5.9375 2.18542C5.9375 2.70292 5.5175 3.12292 5 3.12292C4.4825 3.12292 4.0625 2.70292 4.0625 2.18542C4.0625 1.66792 4.4825 1.24792 5 1.24792Z"
                    fill="#545454"
                  />
                </svg>
              </button>
            </DropdownMenuPrimitive.Trigger>
            <DropdownMenuPrimitive.Portal>
              <DropdownMenuPrimitive.Content
                align="end"
                sideOffset={5}
                className={cx(
                  'radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
                  'w-44 rounded-lg py-2 shadow-md',
                  'bg-[#363636]'
                )}
              >
                <button className="px-3 w-full py-1 hover:bg-[#3D3D3D]">
                  <DropdownMenuPrimitive.Item className="flex py-0.5 flex-row space-x-2">
                    <span className="text-sm silka-medium text-white">
                      Rename
                    </span>
                  </DropdownMenuPrimitive.Item>
                </button>
                <DropdownMenuPrimitive.Separator className="my-1 h-px bg-[#616161]" />
                {/*
                <button className="px-3 w-full py-1 hover:bg-[#3D3D3D]">
                  <DropdownMenuPrimitive.Item className="flex py-0.5 flex-row space-x-2">
                    <span className="text-sm silka-medium text-white">
                      Make Private
                    </span>
                  </DropdownMenuPrimitive.Item>
                </button>
                */}
                <button className="px-3 w-full py-1 hover:bg-[#3D3D3D]">
                  <DropdownMenuPrimitive.Item className="flex py-0.5 flex-row space-x-2">
                    <span className="text-sm silka-medium text-white">
                      Send To
                    </span>
                  </DropdownMenuPrimitive.Item>
                </button>
                <button className="px-3 w-full py-1 hover:bg-[#3D3D3D]">
                  <DropdownMenuPrimitive.Item className="flex py-0.5 flex-row space-x-2">
                    <span className="text-sm silka-medium text-white">
                      Duplicate
                    </span>
                  </DropdownMenuPrimitive.Item>
                </button>
                <button className="px-3 w-full py-1 hover:bg-[#3D3D3D]">
                  <DropdownMenuPrimitive.Item className="flex py-0.5 flex-row space-x-2">
                    <span className="text-sm silka-medium text-white">
                      Download
                    </span>
                  </DropdownMenuPrimitive.Item>
                </button>
                <DropdownMenuPrimitive.Separator className="my-1 h-px bg-[#616161]" />
                <button className="px-3 w-full py-1 hover:bg-[#3D3D3D]">
                  <DropdownMenuPrimitive.Item className="flex py-0.5 flex-row space-x-2">
                    <span className="text-sm silka-medium text-white">
                      Delete
                    </span>
                  </DropdownMenuPrimitive.Item>
                </button>
              </DropdownMenuPrimitive.Content>
            </DropdownMenuPrimitive.Portal>
          </DropdownMenuPrimitive.Root>
        </div>
      </div>
    </button>
  );
}
