import { useState } from 'react';

interface Props {
  workspaceId: string;
  userId: string;
}

function Component() {
  return <div></div>;
}

function NoPayouts() {
  return (
    <div className="mt-6 flex flex-row justify-center items-center w-full">
      <p className="silka-semibold text-[#363636]">No Payouts Yet!</p>
    </div>
  );
}

export function PastPayouts({ workspaceId, userId }: Props) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full">
        <div className="flex flex-row w-full">
          <p className="w-1/4 text-[11px] md:text-xs silka-medium text-gray-400">
            Payment Id
          </p>
          <p className="w-1/4 text-[11px] md:text-xs silka-medium text-gray-400">
            Amount
          </p>
          <p className="w-1/4 text-[11px] md:text-xs silka-medium text-gray-400">
            Status
          </p>
          <p className="w-1/4 text-[11px] md:text-xs silka-medium text-gray-400">
            Date
          </p>
        </div>
        <hr className="my-3 w-full" />
      </div>
      <NoPayouts />
    </div>
  );
}
