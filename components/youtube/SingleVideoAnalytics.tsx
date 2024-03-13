import { useState, useEffect } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import cx from 'classnames';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../utils/apiUrl';
import { YoutubeViewer } from './YoutubeViewer';

interface Props {
  workspaceId: string;
  isPremium: boolean;
}

interface VideoProps {
  value: any;
  isPremium: boolean;
}

async function getVideosData(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}youtube/read/videosstats`,
      {
        params: {
          workspaceId: workspaceId,
        },
      }
    );
    console.log(result.data);
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

function between(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

function Video({ value, isPremium }: VideoProps) {
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  return (
    <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-3 w-full">
      <div className="w-full md:w-1/3">
        <DialogPrimitive.Root
          open={isViewerOpen}
          onOpenChange={setIsViewerOpen}
        >
          <DialogPrimitive.Trigger asChild>
            <button className="p-2.5 hover:bg-gray-50 rounded-lg w-full border flex flex-row space-x-2 justify-start items-start">
              <img
                className="h-[50px] my-auto rounded"
                src={value.thumbnail}
              />
              <p className="text-sm text-gray-700 my-auto silka-regular text-start">
                {value?.title?.length > 84
                  ? value?.title?.slice(0, 84) + '...'
                  : value?.title}
              </p>
            </button>
          </DialogPrimitive.Trigger>
          <YoutubeViewer isOpen={isViewerOpen} value={value} />
        </DialogPrimitive.Root>
      </div>
      <div className="flex flex-row my-auto w-full md:w-2/3 space-x-3">
        <div className="w-1/5 my-auto flex flex-col justify-center items-center">
          <p className="my-auto text-sm text-[#818181] silka-medium">
            {formatLargeNumber(
              isPremium ? value.views : between(1, 10000),
              0
            )}
          </p>
        </div>
        <div className="w-1/5 my-auto flex flex-col justify-center items-center">
          <p className="my-auto text-sm text-[#818181] silka-medium">
            {formatLargeNumber(
              isPremium ? value.likes : between(1, 10000),
              0
            )}
          </p>
        </div>
        <div className="w-1/5 my-auto flex flex-col justify-center items-center">
          <p className="my-auto text-sm text-[#818181] silka-medium">
            {formatLargeNumber(
              isPremium ? value.dislikes : between(1, 10000),
              0
            )}
          </p>
        </div>
        <div className="w-1/5 my-auto flex flex-col justify-center items-center">
          <p className="my-auto text-sm text-[#818181] silka-medium">
            {formatLargeNumber(
              isPremium ? value.comments : between(1, 10000),
              0
            )}
          </p>
        </div>
        <div className="w-1/5 my-auto flex flex-col justify-center items-center">
          <p className="my-auto text-sm text-[#818181] silka-medium">
            {formatLargeNumber(
              isPremium ? value.favorites : between(1, 10000),
              0
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export function YoutubeSingleVideoAnalytics({
  workspaceId,
  isPremium,
}: Props) {
  const [videosData, setVideosData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getVideosData(workspaceId).then((value) => {
      setVideosData(value ? value : []);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="flex flex-col w-full space-y-5 mt-9 mb-12 md:mb-16 lg:mb-24">
      <h3 className="text-xl silka-semibold">Videos</h3>
      <div className="flex flex-row w-full md:space-x-3">
        <p className="hidden md:flex w-1/3 text-xs silka-medium my-auto text-[#818181]">
          Video
        </p>
        <div className="my-auto flex flex-row space-x-3 w-full md:w-2/3">
          <div className="flex flex-col justify-center items-center w-1/5">
            <p className="text-[11px] silka-medium text-gray-900">
              Views
            </p>
          </div>
          <div className="flex flex-col justify-center items-center w-1/5">
            <p className="text-[11px] silka-medium text-gray-900">
              Likes
            </p>
          </div>
          <div className="flex flex-col justify-center items-center w-1/5">
            <p className="text-[11px] silka-medium text-gray-900">
              Dislikes
            </p>
          </div>
          <div className="flex flex-col justify-center items-center w-1/5">
            <p className="text-[11px] silka-medium text-gray-900">
              Comments
            </p>
          </div>
          <div className="flex flex-col justify-center items-center w-1/5">
            <p className="text-[11px] silka-medium text-gray-900">
              Favorites
            </p>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="flex flex-col space-y-3">
          <div className="flex flex-col sapce-y-2 md:space-y-0 md:flex-row md:space-x-3 w-full">
            <div className="w-full md:w-1/3">
              <div className="my-auto h-[64px] w-full rounded-lg bg-gray-200 animate-pulse" />
            </div>
            <div className="flex flex-row my-auto w-full md:w-2/3 space-y-2 md:space-x-3">
              <div className="w-1/5 flex flex-col justify-center items-center">
                <div className="w-10 md:w-14 h-[24px] md:h-[30px] my-auto rounded animate-pulse bg-gray-200" />
              </div>
              <div className="w-1/5 flex flex-col justify-center items-center">
                <div className="w-10 md:w-14 h-[24px] md:h-[30px] my-auto rounded animate-pulse bg-gray-200" />
              </div>
              <div className="w-1/5 flex flex-col justify-center items-center">
                <div className="w-10 md:w-14 h-[24px] md:h-[30px] my-auto rounded animate-pulse bg-gray-200" />
              </div>
              <div className="w-1/5 flex flex-col justify-center items-center">
                <div className="w-10 md:w-14 h-[24px] md:h-[30px] my-auto rounded animate-pulse bg-gray-200" />
              </div>
              <div className="w-1/5 flex flex-col justify-center items-center">
                <div className="w-10 md:w-14 h-[24px] md:h-[30px] my-auto rounded animate-pulse bg-gray-200" />
              </div>
            </div>
          </div>
          <div className="flex flex-col sapce-y-2 md:space-y-0 md:flex-row md:space-x-3 w-full">
            <div className="w-full md:w-1/3">
              <div className="my-auto h-[64px] w-full rounded-lg bg-gray-200 animate-pulse" />
            </div>
            <div className="flex flex-row my-auto w-full md:w-2/3 space-y-2 md:space-x-3">
              <div className="w-1/5 flex flex-col justify-center items-center">
                <div className="w-10 md:w-14 h-[24px] md:h-[30px] my-auto rounded animate-pulse bg-gray-200" />
              </div>
              <div className="w-1/5 flex flex-col justify-center items-center">
                <div className="w-10 md:w-14 h-[24px] md:h-[30px] my-auto rounded animate-pulse bg-gray-200" />
              </div>
              <div className="w-1/5 flex flex-col justify-center items-center">
                <div className="w-10 md:w-14 h-[24px] md:h-[30px] my-auto rounded animate-pulse bg-gray-200" />
              </div>
              <div className="w-1/5 flex flex-col justify-center items-center">
                <div className="w-10 md:w-14 h-[24px] md:h-[30px] my-auto rounded animate-pulse bg-gray-200" />
              </div>
              <div className="w-1/5 flex flex-col justify-center items-center">
                <div className="w-10 md:w-14 h-[24px] md:h-[30px] my-auto rounded animate-pulse bg-gray-200" />
              </div>
            </div>
          </div>
          <div className="flex flex-col sapce-y-2 md:space-y-0 md:flex-row md:space-x-3 w-full">
            <div className="w-full md:w-1/3">
              <div className="my-auto h-[64px] w-full rounded-lg bg-gray-200 animate-pulse" />
            </div>
            <div className="flex flex-row my-auto w-full md:w-2/3 space-y-2 md:space-x-3">
              <div className="w-1/5 flex flex-col justify-center items-center">
                <div className="w-10 md:w-14 h-[24px] md:h-[30px] my-auto rounded animate-pulse bg-gray-200" />
              </div>
              <div className="w-1/5 flex flex-col justify-center items-center">
                <div className="w-10 md:w-14 h-[24px] md:h-[30px] my-auto rounded animate-pulse bg-gray-200" />
              </div>
              <div className="w-1/5 flex flex-col justify-center items-center">
                <div className="w-10 md:w-14 h-[24px] md:h-[30px] my-auto rounded animate-pulse bg-gray-200" />
              </div>
              <div className="w-1/5 flex flex-col justify-center items-center">
                <div className="w-10 md:w-14 h-[24px] md:h-[30px] my-auto rounded animate-pulse bg-gray-200" />
              </div>
              <div className="w-1/5 flex flex-col justify-center items-center">
                <div className="w-10 md:w-14 h-[24px] md:h-[30px] my-auto rounded animate-pulse bg-gray-200" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-2 flex flex-col space-y-5 md:space-y-3">
          {videosData?.length == 0 ? (
            <div className="mt-4 h-72 rounded-xl w-full border border-gray-300 border-dashed flex flex-col justify-center items-center">
              <div className="p-2.5 rounded-full bg-[#F6E7E7] flex flex-col justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#FF0000"
                    d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 silka-semibold text-gray-900 text-xl">
                No Recent Videos Found!
              </h3>
              <p className="text-sm silka-regular w-1/2 text-center mt-3 text-gray-400">
                Post more videos to see them here.
              </p>
            </div>
          ) : (
            <>
              {videosData?.map((value: any, index: number) => {
                return (
                  <Video
                    value={value}
                    key={index}
                    isPremium={isPremium}
                  />
                );
              })}
            </>
          )}
        </div>
      )}
    </div>
  );
}
