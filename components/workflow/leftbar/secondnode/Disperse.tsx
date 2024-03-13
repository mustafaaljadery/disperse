import { Dispatch, SetStateAction } from 'react';

interface Props {
  workflowData: any;
  secondErrors: number;
  setSecondErrors: Dispatch<SetStateAction<number>>;
  leftState: string;
}

export default function DisperseSecondLeftBar({
  workflowData,
  secondErrors,
  setSecondErrors,
  leftState,
}: Props) {
  return (
    <div
      className={
        'flex flex-col ' +
        (leftState == 'disperseSecondNode'
          ? ''
          : workflowData.second_automation == 'Disperse'
          ? 'hidden'
          : '')
      }
    >
      <div className="flex flex-row space-x-3">
        <img
          src="/icons/disperse.png"
          className="h-[52px] w-[52px] my-auto rounded-full border border-gray-300 p-2"
        />
        <div className="flex flex-col space-y-1">
          <span className="silka-medium text-gray-400 text-[10px]">
            DISPERSE TRIGGER
          </span>
          <p className="silka-semibold text-sm text-gray-800">
            {workflowData.second_description}
          </p>
        </div>
      </div>
    </div>
  );
}
