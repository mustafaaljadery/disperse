import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';
import Link from 'next/link';
import { ProjectDropdown } from './dropdown/ProjectDropdown';

interface ProjectComponentProps {
  id: string;
  workspaceId: string;
  name: string;
  files: number;
  size: number;
  lastUpdated: string;
}

export function ProjectComponent({
  id,
  name,
  files,
  size,
  lastUpdated,
  workspaceId,
}: ProjectComponentProps) {
  return (
    <button className="flex flex-row py-1.5 px-1 rounded hover:bg-gray-100">
      <Link href={'/' + workspaceId + '/' + id} legacyBehavior>
        <div className="w-[94%]">
          <div className="w-[42.553191489%] flex flex-row space-x-3 justify-start items-start">
            <p className="silka-medium text-sm text-gray-800">
              {name}
            </p>
          </div>
          <p className="w-[19.14893617%] text-start text-sm silka-regular text-gray-800">
            {files}
          </p>
          <p className="w-[19.14893617%] text-start text-sm silka-regular text-gray-800">
            {size}
          </p>
          <p className="w-[19.14893617%] text-start silka-regular text-gray-800">
            {lastUpdated}
          </p>
        </div>
      </Link>
      <DropdownMenuPrimitive.Root>
        <DropdownMenuPrimitive.Trigger asChild>
          <button className="p-1 z-10">dropdown</button>
        </DropdownMenuPrimitive.Trigger>
        {/*<ProjectDropdown/>*/}
      </DropdownMenuPrimitive.Root>
    </button>
  );
}
