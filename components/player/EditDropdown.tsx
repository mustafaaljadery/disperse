import cx from 'classnames';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

export function PlayerEditDropdown() {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        align="end"
        sideOffset={7}
        className={cx(
          'flex flex-col space-y-0.5 radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
          'w-56 rounded py-1.5 shadow-md',
          'bg-[#363636]'
        )}
      >
        <button className="flex flex-col justify-start hover:bg-[#3D3D3D] px-3 items-start">
          <DropdownMenuPrimitive.Item className="py-1">
            <span className="text-sm silka-medium text-white"></span>
          </DropdownMenuPrimitive.Item>
        </button>
        <button className="flex flex-col justify-start hover:bg-[#3D3D3D] px-3 items-start">
          <DropdownMenuPrimitive.Item className="py-1">
            <span className="text-sm silka-medium text-white">
              Advanced Editor
            </span>
          </DropdownMenuPrimitive.Item>
        </button>
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
}
