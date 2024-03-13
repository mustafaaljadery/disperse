import axios from 'axios';
import axiosRetry from 'axios-retry';
import { useState, useEffect } from 'react';
import { apiUrl } from '../../utils/apiUrl';

interface Props {
  workspaceId: string;
}

async function getProfileData(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}youtube/read/profiledata`,
      {
        params: { workspaceId: workspaceId },
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

export function YoutubeHomepageProfile({ workspaceId }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    getProfileData(workspaceId).then((value) => {
      setProfileData(value);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="flex flex-col mt-6">
      <div className="flex flex-row space-x-8">
        <div className="flex flex-row space-x-2">
          {isLoading ? (
            <div className="w-7 md:w-10 h-5 md:h-6 rounded bg-gray-200 animate-pulse my-auto" />
          ) : (
            <span className="text-gray-800 silka-semibold text-lg">
              {formatLargeNumber(
                Number(profileData?.subscriberCount),
                1
              )}
            </span>
          )}
          <p className="my-auto text-gray-500 text-xs md:text-sm silka-regular">
            Subscribers
          </p>
        </div>
        <div className="flex flex-row space-x-2">
          {isLoading ? (
            <div className="w-7 md:w-10 h-5 md:h-6 rounded bg-gray-200 animate-pulse my-auto" />
          ) : (
            <span className="text-gray-800 silka-semibold text-lg">
              {formatLargeNumber(Number(profileData?.viewCount), 1)}
            </span>
          )}
          <p className="my-auto text-gray-500 text-xs md:text-sm silka-regular">
            Views
          </p>
        </div>
        <div className="flex flex-row space-x-2">
          {isLoading ? (
            <div className="w-7 md:w-10 h-5 md:h-6 rounded bg-gray-200 animate-pulse my-auto" />
          ) : (
            <span className="text-gray-800 silka-semibold text-lg">
              {formatLargeNumber(Number(profileData?.videoCount), 1)}
            </span>
          )}
          <p className="my-auto text-gray-500 text-xs md:text-sm silka-regular">
            Videos
          </p>
        </div>
      </div>
    </div>
  );
}
