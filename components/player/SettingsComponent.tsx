import * as SwitchPrimitive from '@radix-ui/react-switch';
import cx from 'classnames';
import { useState } from 'react';

export function SettingsComponent() {
  const [downloadsChecked, setDownloadsChecked] = useState(false);
  const [commentsChecked, setCommentsChecked] = useState(false);
  const [duplicatesChecked, setDuplicatesChecked] = useState(false);

  return (
    <div className="flex flex-col space-y-2 px-4 mt-4">
      <button
        onClick={() => {
          setDownloadsChecked(!downloadsChecked);
        }}
        className="flex flex-row w-full justify-between items-between"
      >
        <p className="text-sm silka-medium my-auto text-gray-700">
          Allow downlods
        </p>
        <SwitchPrimitive.Root
          checked={downloadsChecked}
          onCheckedChange={setDownloadsChecked}
          className={cx(
            'group',
            'radix-state-checked:bg-[#FF623D]',
            'radix-state-unchecked:bg-gray-200',
            'relative inline-flex h-[18px] w-[34px] flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out',
            'focus:outline-none focus-visible:ring-0'
          )}
        >
          <SwitchPrimitive.Thumb
            className={cx(
              'group-radix-state-checked:translate-x-4',
              'group-radix-state-unchecked:translate-x-0',
              'pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out'
            )}
          />
        </SwitchPrimitive.Root>
      </button>
      <button
        onClick={() => {
          setCommentsChecked(!commentsChecked);
        }}
        className="flex flex-row w-full justify-between items-between"
      >
        <p className="text-sm silka-medium my-auto text-gray-700">
          Allow comments
        </p>
        <SwitchPrimitive.Root
          checked={commentsChecked}
          onCheckedChange={setCommentsChecked}
          className={cx(
            'group',
            'radix-state-checked:bg-[#FF623D]',
            'radix-state-unchecked:bg-gray-200',
            'relative inline-flex h-[18px] w-[34px] flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out',
            'focus:outline-none focus-visible:ring-0'
          )}
        >
          <SwitchPrimitive.Thumb
            className={cx(
              'group-radix-state-checked:translate-x-4',
              'group-radix-state-unchecked:translate-x-0',
              'pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out'
            )}
          />
        </SwitchPrimitive.Root>
      </button>
    </div>
  );
}
