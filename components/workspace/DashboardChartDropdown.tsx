import cx from 'classnames';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  chartSelection: string;
  setChartSelection: Dispatch<SetStateAction<string>>;
  timeSelection: string;
  setTimeSelection: Dispatch<SetStateAction<string>>;
}

export function DashboardChartDropdown({
  chartSelection,
  setChartSelection,
  timeSelection,
  setTimeSelection,
}: Props) {
  return (
    <div className="flex flex-row space-x-5">
      <div className="flex flex-row jusitfy-between items-betwen space-x-3">
        <DropdownMenuPrimitive.Root>
          <DropdownMenuPrimitive.Trigger asChild>
            <button className="py-1.5 flex flex-row justify-between items-between px-3 text-xs silka-medium w-36 border rounded">
              {chartSelection}
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="#636363"
                xmlns="http://www.w3.org/2000/svg"
                className="my-auto mt-0.5"
              >
                <path
                  d="M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.73379 9.9026 7.61934 9.95001 7.49999 9.95001C7.38064 9.95001 7.26618 9.9026 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </DropdownMenuPrimitive.Trigger>
          <DropdownMenuPrimitive.Portal>
            <DropdownMenuPrimitive.Content
              align="start"
              sideOffset={5}
              className={cx(
                'flex flex-col space-y-0.5 radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
                'w-44 rounded-lg px-1.5 py-1.5 shadow-md',
                'bg-white'
              )}
            >
              <button
                onClick={() => {
                  setChartSelection('Views');
                }}
                className="hover:bg-gray-50 rounded flex flex-col justify-start items-start px-6"
              >
                <DropdownMenuPrimitive.Item className="py-1">
                  <span className="text-sm silka-regular">Views</span>
                </DropdownMenuPrimitive.Item>
              </button>
              <button
                onClick={() => {
                  setChartSelection('Followers');
                }}
                className="hover:bg-gray-50 rounded flex flex-col justify-start items-start px-6"
              >
                <DropdownMenuPrimitive.Item className="py-1">
                  <span className="text-sm silka-regular">
                    Followers
                  </span>
                </DropdownMenuPrimitive.Item>
              </button>
              <button
                onClick={() => {
                  setChartSelection('Media');
                }}
                className="hover:bg-gray-50 rounded flex flex-col justify-start items-start px-6"
              >
                <DropdownMenuPrimitive.Item className="py-1">
                  <span className="text-sm silka-regular">
                    Media Posted
                  </span>
                </DropdownMenuPrimitive.Item>
              </button>
            </DropdownMenuPrimitive.Content>
          </DropdownMenuPrimitive.Portal>
        </DropdownMenuPrimitive.Root>
      </div>
      <div>
        <DropdownMenuPrimitive.Root>
          <DropdownMenuPrimitive.Trigger asChild>
            <button className="py-1.5 flex flex-row justify-between items-between px-3 text-xs silka-regular w-32 border rounded">
              Past {timeSelection.toLowerCase()}
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="#636363"
                xmlns="http://www.w3.org/2000/svg"
                className="my-auto mt-0.5"
              >
                <path
                  d="M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.73379 9.9026 7.61934 9.95001 7.49999 9.95001C7.38064 9.95001 7.26618 9.9026 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </DropdownMenuPrimitive.Trigger>
          <DropdownMenuPrimitive.Portal>
            <DropdownMenuPrimitive.Content
              align="start"
              sideOffset={5}
              className={cx(
                'flex flex-col space-y-0.5 radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
                'w-44 rounded-lg px-1.5 py-1.5 shadow-md',
                'bg-white'
              )}
            >
              <button
                onClick={() => {
                  setTimeSelection('Week');
                }}
                className="hover:bg-gray-50 rounded flex flex-col justify-start items-start px-6"
              >
                <DropdownMenuPrimitive.Item className="py-1">
                  <span className="text-sm silka-regular">
                    Past week
                  </span>
                </DropdownMenuPrimitive.Item>
              </button>
              <button
                onClick={() => {
                  setTimeSelection('Month');
                }}
                className="hover:bg-gray-50 rounded flex flex-col justify-start items-start px-6"
              >
                <DropdownMenuPrimitive.Item className="py-1">
                  <span className="text-sm silka-regular">
                    Past month
                  </span>
                </DropdownMenuPrimitive.Item>
              </button>
              <button
                onClick={() => {
                  setTimeSelection('Year');
                }}
                className="hover:bg-gray-50 rounded flex flex-col justify-start items-start px-6"
              >
                <DropdownMenuPrimitive.Item className="py-1">
                  <span className="text-sm silka-regular">
                    Past year
                  </span>
                </DropdownMenuPrimitive.Item>
              </button>
            </DropdownMenuPrimitive.Content>
          </DropdownMenuPrimitive.Portal>
        </DropdownMenuPrimitive.Root>
      </div>
    </div>
  );
}
