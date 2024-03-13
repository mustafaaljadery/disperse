import { Dispatch, SetStateAction } from 'react';

interface Props {
  workflowData: any;
  firstErrors: number;
  setFirstErrors: Dispatch<SetStateAction<number>>;
  leftState: string;
}

export default function DiscordFirstLeftBar({
  workflowData,
  firstErrors,
  setFirstErrors,
  leftState,
}: Props) {
  return (
    <div
      className={
        'flex flex-col ' +
        (leftState == 'discordFirstNode'
          ? ''
          : workflowData?.first_automation == 'Discord'
          ? 'hidden'
          : '')
      }
    >
      <div className="flex flex-row space-x-3">
        <img
          src="/images/automation/discord.svg"
          className="h-[52px] w-[52px] my-auto rounded-full border border-gray-300 p-2"
        />
        <div className="flex flex-col space-y-1">
          <span className="silka-medium text-gray-400 text-[10px]">
            DISCORD TRIGGER
          </span>
          <p className="silka-semibold text-sm text-gray-800">
            {workflowData.first_description}
          </p>
        </div>
      </div>
    </div>
  );
}
