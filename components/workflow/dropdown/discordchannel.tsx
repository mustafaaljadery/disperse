import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { clsx } from 'clsx';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { apiUrl } from '../../../utils/apiUrl';

interface Props {
  workspaceId: any;
  setSelectedChannelId: Dispatch<SetStateAction<any>>;
  setSelectedChannelName: Dispatch<SetStateAction<any>>;
}

interface ChannelProps {
  value: any;
  setSelectedChannelId: Dispatch<SetStateAction<any>>;
  setSelectedChannelName: Dispatch<SetStateAction<any>>;
}

async function getMyChannels(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}automation/discord/read/guildchannels`,
      {
        params: {
          workspaceId: workspaceId,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

function Channel({
  value,
  setSelectedChannelId,
  setSelectedChannelName,
}: ChannelProps) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        setSelectedChannelId(value.id);
        setSelectedChannelName(value.name);
      }}
      className="w-full hover:bg-gray-100 rounded"
    >
      <DropdownMenuPrimitive.Item className="py-1 px-3">
        <span className="">{value.name}</span>
      </DropdownMenuPrimitive.Item>
    </button>
  );
}

export function DiscordChannelDropdown({
  workspaceId,
  setSelectedChannelId,
  setSelectedChannelName,
}: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [channelsData, setChannelsData] = useState<any>(null);

  useEffect(() => {
    if (workspaceId) {
      getMyChannels(workspaceId).then((value) => {
        setChannelsData(value);
        setIsLoading(false);
      });
    }
  }, [workspaceId]);

  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        align="start"
        sideOffset={5}
        className={clsx(
          'radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
          'rounded-lg py-1.5 shadow-md w-72',
          'bg-white'
        )}
      >
        {isLoading ? (
          <div className="flex flex-col space-y-3">
            <div className="w-full h-5 bg-gray-200 rounded animate-pulse" />
            <div className="w-[85%] h-5 bg-gray-200 rounded animate-pulse" />
            <div className="w-[70%] h-5 bg-gray-200 rounded animate-pulse" />
            <div className="w-[65%] h-5 bg-gray-200 rounded animate-pulse" />
          </div>
        ) : (
          <div className="flex flex-col space-y-0.5">
            {channelsData
              .filter((value: any) => {
                if (
                  value.name != 'Text Channels' &&
                  value.name != 'Voice Channels'
                ) {
                  return true;
                }
              })
              .map((value: any, index: number) => {
                return (
                  <Channel
                    key={index}
                    value={value}
                    setSelectedChannelId={setSelectedChannelId}
                    setSelectedChannelName={setSelectedChannelName}
                  />
                );
              })}
          </div>
        )}
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
}
