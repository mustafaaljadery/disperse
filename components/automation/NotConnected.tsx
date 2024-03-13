import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';

import { apiUrl } from '../../utils/apiUrl';
import { TwitterNotConnected } from './notconnected/twitter';
import { YoutubeNotConnected } from './notconnected/youtube';
import { SlackNotConnected } from './notconnected/slack';
import { DiscordNotConnected } from './notconnected/discord';
import { LinkedinNotConnected } from './notconnected/linkedin';
import { TiktokNotConnected } from './notconnected/tiktok';
import { FacebookNotConnected } from './notconnected/facebook';
import { InstagramNotConnected } from './notconnected/instagram';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { InstagramSelectAccountApps } from './notconnected/InstagramSelectAccount';
import { FacebookSelectAccountApps } from './notconnected/FacebookSelectAccount';
import { TwitchNotConnected } from './notconnected/twitch';
import { PinterestNotConnected } from './notconnected/pinterest';

interface NotConnectedAppsProps {
  workspaceId: string;
  refetchNotConnected: boolean;
  setRefetchNotConnected: Dispatch<SetStateAction<boolean>>;
  refetchConnected: boolean;
  setRefetchConnected: Dispatch<SetStateAction<boolean>>;
}

interface AppsProps {
  workspaceId: string;
  refetchNotConnected: boolean;
  setRefetchNotConnected: Dispatch<SetStateAction<boolean>>;
}

interface SocialsProps {
  workspaceId: string;
  refetchNotConnected: boolean;
  setRefetchNotConnected: Dispatch<SetStateAction<boolean>>;
}

async function getSocials(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}automation/read/socialsnotconnected`,
      { params: { workspaceId: workspaceId } }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function getApps(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}automation/read/appsnotconnected`,
      { params: { workspaceId: workspaceId } }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

function Apps({
  workspaceId,
  refetchNotConnected,
  setRefetchNotConnected,
}: AppsProps) {
  const [apps, setApps] = useState<any>(null);
  const [appsTotal, setAppsTotal] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getApps(workspaceId).then((value) => {
      setApps(value);
      let temp = 0;
      if (value.discord) {
        temp += 1;
      }
      if (value.slack) {
        temp += 1;
      }
      if (value.twitch) {
        temp += 1;
      }
      setAppsTotal(temp);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (refetchNotConnected) {
      setIsLoading(true);
      getApps(workspaceId).then((value) => {
        setApps(value);
        let temp = 0;
        if (value.discord) {
          temp += 1;
        }
        if (value.slack) {
          temp += 1;
        }
        if (value.twitch) {
          temp += 1;
        }
        setAppsTotal(temp);
        setIsLoading(false);
        setRefetchNotConnected(false);
      });
    }
  }, [refetchNotConnected]);

  if (isLoading) {
    return (
      <div className="flex flex-col space-y-3">
        <h3 className="text-xs silka-regular text-gray-600">Apps</h3>
        <div className="flex flex-col space-y-2">
          <div className="h-7 w-full bg-gray-100 rounded animate-pulse" />
          <div className="h-7 w-full bg-gray-100 rounded animate-pulse" />
          <div className="h-7 w-full bg-gray-100 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-3">
      <h3 className="text-xs silka-regular text-gray-600">Apps</h3>
      <div className="flex flex-col space-y-2">
        {apps ? (
          <div className="flex flex-col space-y-3">
            {appsTotal === 0 ? (
              <div className="mt-2 py-2.5 px-4 w-full border rounded flex flex-row space-x-2">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                    fill="#04995E"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <p className="text-sm silka-semibold text-[#04995E] my-auto">
                  All Apps Connected
                </p>
              </div>
            ) : (
              <>
                {apps.slack ? (
                  <SlackNotConnected workspaceId={workspaceId} />
                ) : (
                  <></>
                )}
                {apps.discord ? (
                  <DiscordNotConnected workspaceId={workspaceId} />
                ) : (
                  <></>
                )}
                {apps.twitch ? (
                  <TwitchNotConnected workspaceId={workspaceId} />
                ) : (
                  <></>
                )}
              </>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

function Socials({
  workspaceId,
  refetchNotConnected,
  setRefetchNotConnected,
}: SocialsProps) {
  const [socials, setSocials] = useState<any>(null);
  const [socialsTotal, setSocialsTotal] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [instagramSelectAccountOpen, setInstagramSelectAccountOpen] =
    useState(false);
  const [facebookSelectAccountOpen, setFacebookSelectAccountOpen] =
    useState(false);

  useEffect(() => {
    getSocials(workspaceId).then((value) => {
      setSocials(value);
      let temp = 0;
      if (value.twitter) {
        temp += 1;
      }
      if (value.youtube) {
        temp += 1;
      }
      if (value.linkedin) {
        temp += 1;
      }
      if (value.tiktok) {
        temp += 1;
      }
      if (value.facebook) {
        temp += 1;
      }
      if (value.instagram) {
        temp += 1;
      }
      if (value.pinterest) {
        temp += 1;
      }
      setSocialsTotal(temp);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (refetchNotConnected) {
      setIsLoading(true);
      getSocials(workspaceId).then((value) => {
        setSocials(value);
        let temp = 0;
        if (value.twitter) {
          temp += 1;
        }
        if (value.youtube) {
          temp += 1;
        }
        if (value.linkedin) {
          temp += 1;
        }
        if (value.tiktok) {
          temp += 1;
        }
        if (value.facebook) {
          temp += 1;
        }
        if (value.instagram) {
          temp += 1;
        }
        if (value.pinterest) {
          temp += 1;
        }
        setSocialsTotal(temp);
        setIsLoading(false);
        setRefetchNotConnected(false);
      });
    }
  }, [refetchNotConnected]);

  if (isLoading) {
    return (
      <div className="flex flex-col space-y-3">
        <h3 className="text-xs silka-regular text-gray-600">
          Socials
        </h3>
        <div className="flex flex-col space-y-2">
          <div className="h-7 w-full bg-gray-100 rounded animate-pulse" />
          <div className="h-7 w-full bg-gray-100 rounded animate-pulse" />
          <div className="h-7 w-full bg-gray-100 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <h3 className="text-xs silka-regular text-gray-600">Socials</h3>
      {socials ? (
        <>
          {socialsTotal == 0 ? (
            <div className="mt-2 py-2.5 px-4 w-full border rounded flex flex-row space-x-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                  fill="#04995E"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
              <p className="text-sm silka-semibold text-[#04995E] my-auto">
                All Socials Connected
              </p>
            </div>
          ) : (
            <div className="flex flex-col space-y-3 mt-4">
              {socials.twitter ? (
                <TwitterNotConnected workspaceId={workspaceId} />
              ) : (
                <></>
              )}
              {socials.youtube ? (
                <YoutubeNotConnected workspaceId={workspaceId} />
              ) : (
                <></>
              )}
              {socials.linkedin ? (
                <LinkedinNotConnected workspaceId={workspaceId} />
              ) : (
                <></>
              )}
              {socials.tiktok ? (
                <TiktokNotConnected workspaceId={workspaceId} />
              ) : (
                <></>
              )}
              {socials.facebook ? (
                <FacebookNotConnected
                  workspaceId={workspaceId}
                  setFacebookSelectAccountOpen={
                    setFacebookSelectAccountOpen
                  }
                />
              ) : (
                <></>
              )}
              {socials.instagram ? (
                <InstagramNotConnected
                  workspaceId={workspaceId}
                  setInstagramSelectAccountOpen={
                    setInstagramSelectAccountOpen
                  }
                />
              ) : (
                <></>
              )}
              {socials.pinterest ? (
                <PinterestNotConnected workspaceId={workspaceId} />
              ) : (
                <></>
              )}
            </div>
          )}
        </>
      ) : (
        <></>
      )}
      <DialogPrimitive.Root
        open={instagramSelectAccountOpen}
        onOpenChange={setInstagramSelectAccountOpen}
      >
        <InstagramSelectAccountApps
          isOpen={instagramSelectAccountOpen}
          setIsOpen={setInstagramSelectAccountOpen}
          workspaceId={workspaceId}
        />
      </DialogPrimitive.Root>
      <DialogPrimitive.Root
        open={facebookSelectAccountOpen}
        onOpenChange={setFacebookSelectAccountOpen}
      >
        <FacebookSelectAccountApps
          workspaceId={workspaceId}
          isOpen={facebookSelectAccountOpen}
          setIsOpen={setFacebookSelectAccountOpen}
        />
      </DialogPrimitive.Root>
    </div>
  );
}

export function NotConnectedApps({
  workspaceId,
  refetchNotConnected,
  setRefetchConnected,
  refetchConnected,
  setRefetchNotConnected,
}: NotConnectedAppsProps) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {}, []);

  return (
    <div className="flex flex-col">
      <h2 className="text-xs silka-semibold text-gray-700">
        NOT CONNECTED
      </h2>
      <div className="mt-4 flex flex-col space-y-7">
        <Socials
          workspaceId={workspaceId}
          refetchNotConnected={refetchNotConnected}
          setRefetchNotConnected={setRefetchNotConnected}
        />
        <Apps
          workspaceId={workspaceId}
          refetchNotConnected={refetchNotConnected}
          setRefetchNotConnected={setRefetchNotConnected}
        />
      </div>
    </div>
  );
}
