import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Dispatch, SetStateAction } from 'react';

interface UsageComponentProps {
  value: any;
  upgradeNowOpen: boolean;
  setUpgradeNowOpen: Dispatch<SetStateAction<boolean>>;
  setCurrentWorkspaceSelect: Dispatch<SetStateAction<string>>;
}

export function UsageComponent({
  value,
  upgradeNowOpen,
  setUpgradeNowOpen,
  setCurrentWorkspaceSelect,
}: UsageComponentProps) {
  const plan = value.plan;

  const storageProgress =
    (value.month_usage.storage_mbytes /
      (plan == 'STARTER'
        ? 2 * 1000
        : plan == 'PRO'
        ? 200 * 1000
        : plan == 'TEAM'
        ? 2000 * 1000
        : 400000000000000)) *
    100;

  const automationsProgress =
    (value.month_usage?.automation_runs /
      (plan == 'STARTER'
        ? 100
        : plan == 'PRO'
        ? 1000
        : plan == 'TEAM'
        ? 10000
        : 10000000)) *
    100;

  const teamGuestProgress =
    (value.month_usage?.guest_members /
      (plan == 'STARTER' ? 5 : 1000000)) *
    100;

  return (
    <div className="w-full flex flex-col space-y-4">
      <div className="flex flex-row space-x-3">
        <h3 className="text-base silka-medium">{value.name}</h3>
        <div className="my-auto bg-gray-800 px-3 py-0.5 rounded">
          <p className="text-white text-[9px] my-auto silka-medium">
            {value.plan}
          </p>
        </div>
      </div>
      <div className="w-full py-4 lg:py-8 px-3 lg:px-6 rounded-lg border flex flex-col space-y-3 lg:space-y-0 lg:flex-row lg:space-x-5">
        <div className="w-full lg:w-1/2 flex flex-col space-y-3 lg:space-y-4">
          <div className="w-full flex flex-col space-y-2">
            <div className="flex flex-row justify-between items-between">
              <p className="text-xs silka-medium">Storage Usage</p>
              {value.plan == 'STARTER' ? (
                <p className="text-[11px] my-auto silka-regular text-gray-600">
                  2 GB
                </p>
              ) : value.plan == 'PRO' ? (
                <p className="text-[11px] silka-regular text-gray-600">
                  100GB
                </p>
              ) : value.plan == 'TEAM' ? (
                <p className="text-[11px] silka-regular text-gray-600">
                  200GB
                </p>
              ) : (
                <p className="text-[11px] silka-regular text-gray-600">
                  Custom
                </p>
              )}
            </div>
            <ProgressPrimitive.Root
              value={storageProgress}
              className="h-2.5 w-full overflow-hidden rounded-full bg-[#F2F2F2]"
            >
              <ProgressPrimitive.Indicator
                style={{ width: `${storageProgress}%` }}
                className="h-full bg-[#FF623D] duration-300 ease-in-out"
              />
            </ProgressPrimitive.Root>
            <p className="text-xs silka-regular"></p>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex flex-row justify-between items-between">
              <p className="text-xs silka-medium">Automations</p>
              {value.plan == 'STARTER' ? (
                <p className="text-[11px] silka-regular text-gray-600">
                  100
                </p>
              ) : value.plan == 'PRO' ? (
                <p className="text-[11px] silka-regular text-gray-600">
                  2K
                </p>
              ) : value.plan == 'TEAM' ? (
                <p className="text-[11px] silka-regular text-gray-600">
                  10K
                </p>
              ) : (
                <p className="text-[11px] silka-regular text-gray-600">
                  Custom
                </p>
              )}
            </div>
            <ProgressPrimitive.Root
              value={automationsProgress}
              className="h-2.5 w-full overflow-hidden rounded-full bg-[#F2F2F2]"
            >
              <ProgressPrimitive.Indicator
                style={{ width: `${automationsProgress}%` }}
                className="h-full bg-[#FF623D] duration-300 ease-in-out"
              />
            </ProgressPrimitive.Root>
            <p className="text-xs silka-regular"></p>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex flex-row justify-between items-between">
              <p className="text-xs silka-medium">Team Members</p>
              {value.plan == 'STARTER' ? (
                <p className="text-[11px] silka-regular text-gray-600">
                  3 Guests
                </p>
              ) : value.plan == 'PRO' ? (
                <p className="text-[11px] silka-regular text-gray-600">
                  5 Guests
                </p>
              ) : value.plan == 'TEAM' ? (
                <p className="text-[11px] silka-regular text-gray-600">
                  Unlimited Collaborators
                </p>
              ) : (
                <p className="text-[11px] silka-regular text-gray-600">
                  Unlimited Collaborators
                </p>
              )}
            </div>
            <ProgressPrimitive.Root
              value={teamGuestProgress}
              className="h-2.5 w-full overflow-hidden rounded-full bg-[#F2F2F2]"
            >
              <ProgressPrimitive.Indicator
                style={{ width: `${teamGuestProgress}%` }}
                className="h-full bg-[#FF623D] duration-300 ease-in-out"
              />
            </ProgressPrimitive.Root>
            <p className="text-xs silka-regular"></p>
          </div>
        </div>
        <div className="w-1/2 p-4 bg-[#F2F2F2] hidden lg:flex flex-col justify-start items-start h-full rounded-lg">
          <h4 className="text-sm silka-semibold text-[#363636]">
            Experience Disperse&apos;s Full Potention
          </h4>
          <div className="flex flex-row space-x-2 mt-2.5">
            <div className="rounded-full">
              <svg
                width="18"
                height="18"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="my-auto"
              >
                <path
                  d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                  fill="#13862E"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <p className="my-auto text-[11px] text-gray-600 silka-regular">
              200GB Storage
            </p>
          </div>
          <div className="flex flex-row space-x-2 mt-1.5">
            <div className="rounded-full">
              <svg
                width="18"
                height="18"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="my-auto"
              >
                <path
                  d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                  fill="#13862E"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <p className="my-auto text-[11px] text-gray-600 silka-regular">
              1K Automations
            </p>
          </div>
          <div className="flex flex-row space-x-2 mt-1.5">
            <div className="rounded-full">
              <svg
                width="18"
                height="18"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="my-auto"
              >
                <path
                  d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                  fill="#13862E"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <p className="my-auto text-[11px] text-gray-600 silka-regular">
              Additional Team Members
            </p>
          </div>
          <div className="flex flex-row space-x-2 mt-1.5">
            <div className="rounded-full">
              <svg
                width="18"
                height="18"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="my-auto"
              >
                <path
                  d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                  fill="#13862E"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <p className="my-auto text-[11px] text-gray-600 silka-regular">
              Advanced Analytics
            </p>
          </div>
          <DialogPrimitive.Root
            open={upgradeNowOpen}
            onOpenChange={setUpgradeNowOpen}
          >
            <DialogPrimitive.Trigger asChild>
              <button
                onClick={() => {
                  setCurrentWorkspaceSelect(value.id);
                }}
                className="text-[10px] mt-4 bg-white px-4 py-1 rounded shadow hover:shadow-none silka-regular"
              >
                Upgrade Now
              </button>
            </DialogPrimitive.Trigger>
          </DialogPrimitive.Root>
        </div>
      </div>
    </div>
  );
}
