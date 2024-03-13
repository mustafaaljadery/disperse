import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  sortValue: number;
  setSortValue: Dispatch<SetStateAction<number>>;
}

export function SortDropdownMenu({ sortValue, setSortValue }: Props) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        align="end"
        sideOffset={5}
        className={cx(
          ' radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
          'w-44 rounded-lg py-2 shadow-md',
          'bg-[#363636]'
        )}
      >
        <button
          onClick={() => {
            setSortValue(0);
          }}
          className="px-4 py-0.5 w-full hover:bg-[#3D3D3D]"
        >
          <DropdownMenuPrimitive.Item className="py-1 flex flex-row space-x-2">
            {sortValue == 0 ? (
              <>
                <svg
                  width="13.3"
                  height="10"
                  viewBox="0 0 4 3"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="my-auto mt-0.5"
                >
                  <path
                    d="M2.664 0.535522L2.44778 0.751745C1.97151 1.22904 1.60433 1.62926 1.16794 2.07601L0.724394 1.7008L0.490674 1.50368L0.0964203 1.96951L0.33014 2.16664L0.991508 2.72627L1.20613 2.90749L1.40486 2.70877C1.9538 2.15861 2.34384 1.72009 2.8802 1.18256L3.09642 0.966333L2.664 0.535522Z"
                    fill="white"
                  />
                </svg>
                <span className="text-sm silka-medium text-white">
                  Date Uploaded
                </span>
              </>
            ) : (
              <>
                <div className="w-[13.3px]" />
                <span className="text-sm silka-medium text-[#CFCFCF]">
                  Date Uploaded
                </span>
              </>
            )}
          </DropdownMenuPrimitive.Item>
        </button>
        <button
          onClick={() => {
            setSortValue(1);
          }}
          className="px-4 w-full py-0.5 hover:bg-[#3D3D3D]"
        >
          <DropdownMenuPrimitive.Item className="py-1 flex flex-row space-x-2">
            {sortValue == 1 ? (
              <>
                <svg
                  width="13.3"
                  height="10"
                  viewBox="0 0 4 3"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="my-auto mt-0.5"
                >
                  <path
                    d="M2.664 0.535522L2.44778 0.751745C1.97151 1.22904 1.60433 1.62926 1.16794 2.07601L0.724394 1.7008L0.490674 1.50368L0.0964203 1.96951L0.33014 2.16664L0.991508 2.72627L1.20613 2.90749L1.40486 2.70877C1.9538 2.15861 2.34384 1.72009 2.8802 1.18256L3.09642 0.966333L2.664 0.535522Z"
                    fill="white"
                  />
                </svg>
                <span className="text-sm silka-medium text-white">
                  Uploader
                </span>
              </>
            ) : (
              <>
                <div className="w-[13.3px]" />
                <span className="text-sm silka-medium text-[#CFCFCF]">
                  Uploader
                </span>
              </>
            )}
          </DropdownMenuPrimitive.Item>
        </button>
        <button
          onClick={() => {
            setSortValue(2);
          }}
          className="px-4 w-full py-0.5 hover:bg-[#3D3D3D]"
        >
          <DropdownMenuPrimitive.Item className="py-1 flex flex-row space-x-2">
            {sortValue == 2 ? (
              <>
                <svg
                  width="13.3"
                  height="10"
                  viewBox="0 0 4 3"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="my-auto mt-0.5"
                >
                  <path
                    d="M2.664 0.535522L2.44778 0.751745C1.97151 1.22904 1.60433 1.62926 1.16794 2.07601L0.724394 1.7008L0.490674 1.50368L0.0964203 1.96951L0.33014 2.16664L0.991508 2.72627L1.20613 2.90749L1.40486 2.70877C1.9538 2.15861 2.34384 1.72009 2.8802 1.18256L3.09642 0.966333L2.664 0.535522Z"
                    fill="white"
                  />
                </svg>
                <span className="text-sm silka-medium text-white">
                  Size
                </span>
              </>
            ) : (
              <>
                <div className="w-[13.3px]" />
                <span className="text-sm silka-medium text-[#CFCFCF]">
                  Size
                </span>
              </>
            )}
          </DropdownMenuPrimitive.Item>
        </button>
        <button
          onClick={() => {
            setSortValue(3);
          }}
          className="px-4 w-full py-0.5 hover:bg-[#3D3D3D]"
        >
          <DropdownMenuPrimitive.Item className="py-1 flex flex-row space-x-2">
            {sortValue == 3 ? (
              <>
                <svg
                  width="13.3"
                  height="10"
                  viewBox="0 0 4 3"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="my-auto mt-0.5"
                >
                  <path
                    d="M2.664 0.535522L2.44778 0.751745C1.97151 1.22904 1.60433 1.62926 1.16794 2.07601L0.724394 1.7008L0.490674 1.50368L0.0964203 1.96951L0.33014 2.16664L0.991508 2.72627L1.20613 2.90749L1.40486 2.70877C1.9538 2.15861 2.34384 1.72009 2.8802 1.18256L3.09642 0.966333L2.664 0.535522Z"
                    fill="white"
                  />
                </svg>
                <span className="text-sm silka-medium text-white">
                  Type
                </span>
              </>
            ) : (
              <>
                <div className="w-[13.3px]" />
                <span className="text-sm silka-medium text-[#CFCFCF]">
                  Type
                </span>
              </>
            )}
          </DropdownMenuPrimitive.Item>
        </button>
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
}
