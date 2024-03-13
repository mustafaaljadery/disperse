import { Handle, Position } from 'reactflow';

interface Props {
  data: any;
}

export default function DiscordSecondNode({ data }: Props) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        data.setLeftState('discordSecondNode');
      }}
      className={
        'border w-[250px] bg-white rounded py-2.5 px-3 ' +
        (data.leftState == 'discordSecondNode'
          ? 'border-[#FF623D]'
          : '')
      }
    >
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: '#363636' }}
      />
      <div className="flex flex-row space-x-2 w-full">
        <img
          src="/images/automation/discord.svg"
          className="h-[32px] w-[32px] rounded-full my-auto border border-gray-200 p-1.5"
        />
        <div className="flex flex-col justify-start items-start my-auto">
          <span className="text-gray-400 text-[9px] silka-regular">
            DISCORD
          </span>
          <p className="silka-semibold text-gray-900 text-start text-[10px] mt-[3px]">
            {data.description}
          </p>
        </div>
      </div>
    </button>
  );
}
