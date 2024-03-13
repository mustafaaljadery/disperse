import axios from 'axios';
import axiosRetry from 'axios-retry';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { apiUrl } from '../../utils/apiUrl';
import { DiscordConnected } from './connected/discord';
import { FacebookConnected } from './connected/facebook';
import { InstagramConnected } from './connected/instagram';
import { LinkedinConnected } from './connected/linkedin';
import { PinterestConnected } from './connected/pinterest';
import { SlackConnected } from './connected/slack';
import { TiktokConnected } from './connected/tiktok';
import { TwitchConnected } from './connected/twitch';
import { TwitterConnected } from './connected/twitter';
import { YoutubeConnected } from './connected/youtube';

interface ConnectedAppsProps {
  workspaceId: string;
  refetchConnected: boolean;
  setRefetchConnected: Dispatch<SetStateAction<boolean>>;
  refetchNotConnected: boolean;
  setRefetchNotConnect: Dispatch<SetStateAction<boolean>>;
}

async function getConnected(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}automation/read/allconnected`,
      {
        params: { workspaceId: workspaceId },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

export function ConnectedApps({
  workspaceId,
  refetchConnected,
  setRefetchConnected,
  refetchNotConnected,
  setRefetchNotConnect,
}: ConnectedAppsProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [connectedData, setConnectedData] = useState<any>(null);
  const [connectedNo, setConnectedNo] = useState<number>(0);

  useEffect(() => {
    getConnected(workspaceId).then((value) => {
      setConnectedData(value);
      // Calculate the connected Number
      if (value?.twitter) {
        setConnectedNo(connectedNo + 1);
      }
      if (value?.instagram) {
        setConnectedNo(connectedNo + 1);
      }
      if (value?.facebook) {
        setConnectedNo(connectedNo + 1);
      }
      if (value?.youtube) {
        setConnectedNo(connectedNo + 1);
      }
      if (value?.linkedin) {
        setConnectedNo(connectedNo + 1);
      }
      if (value?.tiktok) {
        setConnectedNo(connectedNo + 1);
      }
      if (value?.slack) {
        setConnectedNo(connectedNo + 1);
      }
      if (value?.discord) {
        setConnectedNo(connectedNo + 1);
      }
      if (value?.pinterest) {
        setConnectedNo(connectedNo + 1);
      }
      if (value?.twitch) {
        setConnectedNo(connectedNo + 1);
      }
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (refetchConnected) {
      setIsLoading(true);
      getConnected(workspaceId).then((value) => {
        setConnectedData(value);
        setIsLoading(false);
        setRefetchConnected(false);
      });
    }
  }, [refetchConnected]);

  if (isLoading) {
    return (
      <div className="flex flex-col">
        <h2 className="text-xs silka-semibold text-gray-700">
          CONNECTED
        </h2>
        <div className="mt-4 flex flex-col space-y-3">
          <div className="w-full h-7 bg-gray-100 rounded animate-pulse" />
          <div className="w-full h-7 bg-gray-100 rounded animate-pulse" />
          <div className="w-full h-7 bg-gray-100 rounded animate-pulse" />
          <div className="w-full h-7 bg-gray-100 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <h2 className="text-xs silka-semibold text-gray-700">
        CONNECTED
      </h2>
      <div className="mt-4 flex flex-col space-y-3">
        {connectedData ? (
          <>
            {connectedNo == 0 ? (
              <div className="w-full flex flex-col justify-center items-center space-y-1.5 py-5 border border-dashed rounded">
                <p className="text-sm silka-semibold text-gray-900">
                  No Connections
                </p>
                <p className="text-[11px] silka-regular text-gray-500">
                  Connect an application to begin automating using
                  Disperse.
                </p>
              </div>
            ) : (
              <>
                {connectedData.twitter ? (
                  <TwitterConnected
                    workspaceId={workspaceId}
                    setRefetchConnected={setRefetchConnected}
                    setRefetchNotConnected={setRefetchNotConnect}
                  />
                ) : (
                  <></>
                )}
                {connectedData.instagram ? (
                  <InstagramConnected workspaceId={workspaceId} />
                ) : (
                  <></>
                )}
                {connectedData.facebook ? (
                  <FacebookConnected workspaceId={workspaceId} />
                ) : (
                  <></>
                )}
                {connectedData.youtube ? (
                  <YoutubeConnected
                    workspaceId={workspaceId}
                    setRefetchConnected={setRefetchConnected}
                    setRefetchNotConnected={setRefetchNotConnect}
                  />
                ) : (
                  <></>
                )}
                {connectedData.linkedin ? (
                  <LinkedinConnected workspaceId={workspaceId} />
                ) : (
                  <></>
                )}
                {connectedData.tiktok ? (
                  <TiktokConnected workspaceId={workspaceId} />
                ) : (
                  <></>
                )}
                {connectedData.slack ? (
                  <SlackConnected
                    workspaceId={workspaceId}
                    setRefetchConnected={setRefetchConnected}
                    setRefetchNotConnected={setRefetchNotConnect}
                  />
                ) : (
                  <></>
                )}
                {connectedData.discord ? (
                  <DiscordConnected
                    workspaceId={workspaceId}
                    setRefetchConnected={setRefetchConnected}
                    setRefetchNotConnected={setRefetchNotConnect}
                  />
                ) : (
                  <></>
                )}
                {connectedData.pinterest ? (
                  <PinterestConnected
                    workspaceId={workspaceId}
                    setRefetchConnected={setRefetchConnected}
                    setRefetchNotConnected={setRefetchConnected}
                  />
                ) : (
                  <></>
                )}
                {connectedData.twitch && (
                  <TwitchConnected
                    workspaceId={workspaceId}
                    setRefetchConnected={setRefetchConnected}
                    setRefetchNotConnected={setRefetchNotConnect}
                  />
                )}
              </>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
