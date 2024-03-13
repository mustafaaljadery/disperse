import { useState, useEffect } from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../utils/apiUrl';

interface Props {
  workspaceId: string;
}

async function getUserProfile(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}instagram/read/profile`,
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

function formatLargeNumber(num: number, digits: number) {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, '$1') +
        item.symbol
    : '0';
}

export function InstagramHeaderProfile({ workspaceId }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    getUserProfile(workspaceId).then((value) => {
      setUserProfile(value);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex flex-col space-y-5 md:space-y-0 md:flex-row md:space-x-5">
        {isLoading ? (
          <div className="h-[90px] w-[90px] rounded-full bg-gray-200 animate-pulse" />
        ) : (
          <div>
            <img
              className="rounded-full"
              crossOrigin="anonymous"
              src={userProfile?.profile_picture_url}
              height={90}
              width={90}
            />
          </div>
        )}
        <div className="flex flex-col">
          {isLoading ? (
            <div className="w-32 bg-gray-200 h-7 rounded animte-pulse mt-2" />
          ) : (
            <h2 className="text-xl mt-2 silka-semibold text-gray-900">
              {userProfile?.name}
            </h2>
          )}
          {isLoading ? (
            <div className="w-72 h-4 mt-2.5 rounded bg-gray-200 animate-pulse" />
          ) : (
            <p className="mt-1.5 silka-medium text-sm text-gray-500">
              @{userProfile?.username}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-row space-x-8">
        <div className="flex flex-row space-x-2">
          {isLoading ? (
            <div className="w-12 h-6 rounded bg-gray-200 animate-pulse my-auto" />
          ) : (
            <span className="text-gray-800 silka-semibold text-xl">
              {formatLargeNumber(
                Number(userProfile?.followers_count),
                1
              )}
            </span>
          )}
          <p className="my-auto text-gray-500 text-sm silka-regular">
            Followers
          </p>
        </div>
        <div className="flex flex-row space-x-2">
          {isLoading ? (
            <div className="w-12 h-6 rounded bg-gray-200 animate-pulse my-auto" />
          ) : (
            <span className="text-gray-800 silka-semibold text-xl">
              {formatLargeNumber(
                Number(userProfile?.follows_count),
                1
              )}
            </span>
          )}
          <p className="my-auto text-gray-500 text-sm silka-regular">
            Following
          </p>
        </div>
      </div>
    </div>
  );
}
