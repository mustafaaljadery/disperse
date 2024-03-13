import { useState, useEffect } from 'react';
import { apiUrl } from '../../utils/apiUrl';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import cx from 'classnames';

async function getSinglePosts(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}instagram/read/singleposts`,
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

function between(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

interface Props {
  workspaceId: string;
  isPremium: boolean;
}

interface PostProps {
  value: any;
  isPremium: boolean;
}

function Post({ value, isPremium }: PostProps) {
  return (
    <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-3 w-full">
      <div className="w-full md:w-1/3">
        <div className="p-2.5 hover:bg-gray-50 rounded-lg w-full border flex flex-row space-x-2 justify-start items-start">
          {value.media_type == 'VIDEO' ? (
            <div className="h-[50px] my-auto rounded bg-gray-200 w-20 flex flex-col justify-center items-center">
              <p className="text-[9px] silka-medium text-gray-800">
                Video
              </p>
            </div>
          ) : (
            <img
              crossOrigin="anonymous"
              className="h-[50px] my-auto rounded"
              src={value.media_url}
            />
          )}
          <p
            className={
              'text-sm my-auto silka-regular text-start break-all ' +
              (value?.caption?.length == 0 || value?.caption == null
                ? 'text-gray-400 italic'
                : 'text-gray-700')
            }
          >
            {value?.caption?.length == 0 || value?.caption == null
              ? 'No caption...'
              : value?.caption?.length > 68
              ? value?.caption?.slice(0, 68) + '...'
              : value?.caption}
          </p>
        </div>
      </div>
      <div className="flex flex-row my-auto w-full md:w-2/3 space-x-3">
        <div className="w-1/6 my-auto flex flex-col justify-center items-center">
          <p className="my-auto text-xs text-[#818181] silka-medium">
            {value?.media_type}
          </p>
        </div>
        <div className="w-1/6 my-auto flex flex-col justify-center items-center">
          <p className="my-auto text-sm text-[#818181] silka-medium">
            {formatLargeNumber(
              isPremium ? value?.engagement : between(1, 10000),
              0
            )}
          </p>
        </div>
        <div className="w-1/6 my-auto flex flex-col justify-center items-center">
          <p className="my-auto text-sm text-[#818181] silka-medium">
            {formatLargeNumber(
              isPremium ? value?.impressions : between(1, 10000),
              0
            )}
          </p>
        </div>
        <div className="w-1/6 my-auto flex flex-col justify-center items-center">
          <p className="my-auto text-sm text-[#818181] silka-medium">
            {formatLargeNumber(
              isPremium ? value?.reach : between(1, 10000),
              0
            )}
          </p>
        </div>
        <div className="w-1/6 my-auto flex flex-col justify-center items-center">
          <p className="my-auto text-sm text-[#818181] silka-medium">
            {formatLargeNumber(
              isPremium ? value?.saved : between(1, 10000),
              0
            )}
          </p>
        </div>
        <div className="w-1/6 my-auto flex flex-col justify-center items-center">
          <p className="my-auto text-sm text-[#818181] silka-medium">
            {formatLargeNumber(
              isPremium ? value?.video_views : between(1, 10000),
              0
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export function InstagramSinglePostAnalytics({
  workspaceId,
  isPremium,
}: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentPostId, setCurrentPostId] = useState<any>(null);
  const [currentPostData, setCurrentPostData] = useState<any>(null);
  const [postsData, setPostsData] = useState<any>(null);

  useEffect(() => {
    getSinglePosts(workspaceId).then((value) => {
      setPostsData(value);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="flex flex-col w-full space-y-5 mt-9 mb-24">
      <h3 className="text-xl silka-semibold text-gray-900">Post</h3>
      <div className="flex flex-row w-full md:space-x-3">
        <p className="hidden md:flex w-1/3 text-xs silka-medium my-auto text-[#818181]">
          Post
        </p>
        <div className="my-auto flex flex-row space-x-3 w-full md:w-2/3">
          <div className="w-1/6 flex flex-col justify-center items-center">
            <HoverCardPrimitive.Root>
              <HoverCardPrimitive.Trigger asChild>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.97942 1.25171L6.9585 1.30199L5.58662 4.60039C5.54342 4.70426 5.44573 4.77523 5.3336 4.78422L1.7727 5.0697L1.71841 5.07405L1.38687 5.10063L1.08608 5.12475C0.820085 5.14607 0.712228 5.47802 0.914889 5.65162L1.14406 5.84793L1.39666 6.06431L1.43802 6.09974L4.15105 8.42374C4.23648 8.49692 4.2738 8.61176 4.24769 8.72118L3.41882 12.196L3.40618 12.249L3.32901 12.5725L3.25899 12.866C3.19708 13.1256 3.47945 13.3308 3.70718 13.1917L3.9647 13.0344L4.24854 12.861L4.29502 12.8326L7.34365 10.9705C7.43965 10.9119 7.5604 10.9119 7.6564 10.9705L10.705 12.8326L10.7515 12.861L11.0354 13.0344L11.2929 13.1917C11.5206 13.3308 11.803 13.1256 11.7411 12.866L11.671 12.5725L11.5939 12.249L11.5812 12.196L10.7524 8.72118C10.7263 8.61176 10.7636 8.49692 10.849 8.42374L13.562 6.09974L13.6034 6.06431L13.856 5.84793L14.0852 5.65162C14.2878 5.47802 14.18 5.14607 13.914 5.12475L13.6132 5.10063L13.2816 5.07405L13.2274 5.0697L9.66645 4.78422C9.55432 4.77523 9.45663 4.70426 9.41343 4.60039L8.04155 1.30199L8.02064 1.25171L7.89291 0.944609L7.77702 0.665992C7.67454 0.419604 7.32551 0.419604 7.22303 0.665992L7.10715 0.944609L6.97942 1.25171ZM7.50003 2.60397L6.50994 4.98442C6.32273 5.43453 5.89944 5.74207 5.41351 5.78103L2.84361 5.98705L4.8016 7.66428C5.17183 7.98142 5.33351 8.47903 5.2204 8.95321L4.62221 11.461L6.8224 10.1171C7.23842 9.86302 7.76164 9.86302 8.17766 10.1171L10.3778 11.461L9.77965 8.95321C9.66654 8.47903 9.82822 7.98142 10.1984 7.66428L12.1564 5.98705L9.58654 5.78103C9.10061 5.74207 8.67732 5.43453 8.49011 4.98442L7.50003 2.60397Z"
                    fill="#9B9B9B"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </HoverCardPrimitive.Trigger>
              <HoverCardPrimitive.Content
                align="center"
                sideOffset={3}
                className={cx(
                  ' radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
                  'max-w-md rounded px-4 py-1 md:w-full',
                  'bg-[#363636]',
                  'focus:outline-none focus-visible:ring'
                )}
              >
                <p className="text-xs silka-medium text-white">
                  Media Type
                </p>
              </HoverCardPrimitive.Content>
            </HoverCardPrimitive.Root>
          </div>
          <div className="w-1/6 flex flex-col justify-center items-center">
            <HoverCardPrimitive.Root>
              <HoverCardPrimitive.Trigger asChild>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.69667 0.0403541C8.90859 0.131038 9.03106 0.354857 8.99316 0.582235L8.0902 6.00001H12.5C12.6893 6.00001 12.8625 6.10701 12.9472 6.27641C13.0319 6.4458 13.0136 6.6485 12.8999 6.80001L6.89997 14.8C6.76167 14.9844 6.51521 15.0503 6.30328 14.9597C6.09135 14.869 5.96888 14.6452 6.00678 14.4178L6.90974 9H2.49999C2.31061 9 2.13748 8.893 2.05278 8.72361C1.96809 8.55422 1.98636 8.35151 2.09999 8.2L8.09997 0.200038C8.23828 0.0156255 8.48474 -0.0503301 8.69667 0.0403541ZM3.49999 8.00001H7.49997C7.64695 8.00001 7.78648 8.06467 7.88148 8.17682C7.97648 8.28896 8.01733 8.43723 7.99317 8.5822L7.33027 12.5596L11.5 7.00001H7.49997C7.353 7.00001 7.21347 6.93534 7.11846 6.8232C7.02346 6.71105 6.98261 6.56279 7.00678 6.41781L7.66968 2.44042L3.49999 8.00001Z"
                    fill="#9B9B9B"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </HoverCardPrimitive.Trigger>
              <HoverCardPrimitive.Content
                align="center"
                sideOffset={3}
                className={cx(
                  ' radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
                  'max-w-md rounded px-4 py-1 md:w-full',
                  'bg-[#363636]',
                  'focus:outline-none focus-visible:ring'
                )}
              >
                <p className="text-xs silka-medium text-white">
                  Engagements
                </p>
              </HoverCardPrimitive.Content>
            </HoverCardPrimitive.Root>
          </div>
          <div className="w-1/6 flex flex-col justify-center items-center">
            <HoverCardPrimitive.Root>
              <HoverCardPrimitive.Trigger asChild>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 11C4.80285 11 2.52952 9.62184 1.09622 7.50001C2.52952 5.37816 4.80285 4 7.5 4C10.1971 4 12.4705 5.37816 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11ZM7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C1.65639 10.2936 4.30786 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C13.3436 4.70638 10.6921 3 7.5 3ZM7.5 9.5C8.60457 9.5 9.5 8.60457 9.5 7.5C9.5 6.39543 8.60457 5.5 7.5 5.5C6.39543 5.5 5.5 6.39543 5.5 7.5C5.5 8.60457 6.39543 9.5 7.5 9.5Z"
                    fill="#9B9B9B"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </HoverCardPrimitive.Trigger>
              <HoverCardPrimitive.Content
                align="center"
                sideOffset={3}
                className={cx(
                  ' radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
                  'max-w-md rounded px-4 py-1 md:w-full',
                  'bg-[#363636]',
                  'focus:outline-none focus-visible:ring'
                )}
              >
                <p className="text-xs silka-medium text-white">
                  Impressions
                </p>
              </HoverCardPrimitive.Content>
            </HoverCardPrimitive.Root>
          </div>
          <div className="w-1/6 flex flex-col justify-center items-center">
            <HoverCardPrimitive.Root>
              <HoverCardPrimitive.Trigger asChild>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z"
                    fill="#9B9B9B"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </HoverCardPrimitive.Trigger>
              <HoverCardPrimitive.Content
                align="center"
                sideOffset={3}
                className={cx(
                  ' radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
                  'max-w-md rounded px-4 py-1 md:w-full',
                  'bg-[#363636]',
                  'focus:outline-none focus-visible:ring'
                )}
              >
                <p className="text-xs silka-medium text-white">
                  Reach
                </p>
              </HoverCardPrimitive.Content>
            </HoverCardPrimitive.Root>
          </div>
          <div className="w-1/6 flex flex-col justify-center items-center">
            <HoverCardPrimitive.Root>
              <HoverCardPrimitive.Trigger asChild>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 2.5C3 2.22386 3.22386 2 3.5 2H11.5C11.7761 2 12 2.22386 12 2.5V13.5C12 13.6818 11.9014 13.8492 11.7424 13.9373C11.5834 14.0254 11.3891 14.0203 11.235 13.924L7.5 11.5896L3.765 13.924C3.61087 14.0203 3.41659 14.0254 3.25762 13.9373C3.09864 13.8492 3 13.6818 3 13.5V2.5ZM4 3V12.5979L6.97 10.7416C7.29427 10.539 7.70573 10.539 8.03 10.7416L11 12.5979V3H4Z"
                    fill="#9B9B9B"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </HoverCardPrimitive.Trigger>
              <HoverCardPrimitive.Content
                align="center"
                sideOffset={3}
                className={cx(
                  ' radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
                  'max-w-md rounded px-4 py-1 md:w-full',
                  'bg-[#363636]',
                  'focus:outline-none focus-visible:ring'
                )}
              >
                <p className="text-xs silka-medium text-white">
                  Saved
                </p>
              </HoverCardPrimitive.Content>
            </HoverCardPrimitive.Root>
          </div>
          <div className="w-1/6 flex flex-col justify-center items-center">
            <HoverCardPrimitive.Root>
              <HoverCardPrimitive.Trigger asChild>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.76447 3.12199C5.63151 3.04859 6.56082 3 7.5 3C8.43918 3 9.36849 3.04859 10.2355 3.12199C11.2796 3.21037 11.9553 3.27008 12.472 3.39203C12.9425 3.50304 13.2048 3.64976 13.4306 3.88086C13.4553 3.90618 13.4902 3.94414 13.5133 3.97092C13.7126 4.20149 13.8435 4.4887 13.918 5.03283C13.9978 5.6156 14 6.37644 14 7.52493C14 8.66026 13.9978 9.41019 13.9181 9.98538C13.8439 10.5206 13.7137 10.8061 13.5125 11.0387C13.4896 11.0651 13.4541 11.1038 13.4296 11.1287C13.2009 11.3625 12.9406 11.5076 12.4818 11.6164C11.9752 11.7365 11.3143 11.7942 10.2878 11.8797C9.41948 11.9521 8.47566 12 7.5 12C6.52434 12 5.58052 11.9521 4.7122 11.8797C3.68572 11.7942 3.02477 11.7365 2.51816 11.6164C2.05936 11.5076 1.7991 11.3625 1.57037 11.1287C1.54593 11.1038 1.51035 11.0651 1.48748 11.0387C1.28628 10.8061 1.15612 10.5206 1.08193 9.98538C1.00221 9.41019 1 8.66026 1 7.52493C1 6.37644 1.00216 5.6156 1.082 5.03283C1.15654 4.4887 1.28744 4.20149 1.48666 3.97092C1.5098 3.94414 1.54468 3.90618 1.56942 3.88086C1.7952 3.64976 2.05752 3.50304 2.52796 3.39203C3.04473 3.27008 3.7204 3.21037 4.76447 3.12199ZM0 7.52493C0 5.28296 0 4.16198 0.729985 3.31713C0.766457 3.27491 0.815139 3.22194 0.854123 3.18204C1.63439 2.38339 2.64963 2.29744 4.68012 2.12555C5.56923 2.05028 6.52724 2 7.5 2C8.47276 2 9.43077 2.05028 10.3199 2.12555C12.3504 2.29744 13.3656 2.38339 14.1459 3.18204C14.1849 3.22194 14.2335 3.27491 14.27 3.31713C15 4.16198 15 5.28296 15 7.52493C15 9.74012 15 10.8477 14.2688 11.6929C14.2326 11.7348 14.1832 11.7885 14.1444 11.8281C13.3629 12.6269 12.3655 12.71 10.3709 12.8763C9.47971 12.9505 8.50782 13 7.5 13C6.49218 13 5.52028 12.9505 4.62915 12.8763C2.63446 12.71 1.63712 12.6269 0.855558 11.8281C0.816844 11.7885 0.767442 11.7348 0.731221 11.6929C0 10.8477 0 9.74012 0 7.52493ZM5.25 5.38264C5.25 5.20225 5.43522 5.08124 5.60041 5.15369L10.428 7.27105C10.6274 7.35853 10.6274 7.64147 10.428 7.72895L5.60041 9.84631C5.43522 9.91876 5.25 9.79775 5.25 9.61736V5.38264Z"
                    fill="#9B9B9B"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </HoverCardPrimitive.Trigger>
              <HoverCardPrimitive.Content
                align="center"
                sideOffset={3}
                className={cx(
                  ' radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
                  'max-w-md rounded px-4 py-1 md:w-full',
                  'bg-[#363636]',
                  'focus:outline-none focus-visible:ring'
                )}
              >
                <p className="text-xs silka-medium text-white">
                  Video Views
                </p>
              </HoverCardPrimitive.Content>
            </HoverCardPrimitive.Root>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="flex flex-col space-y-3">
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-3 w-full">
            <div className="w-full md:w-1/3">
              <div className="my-auto h-[64px] w-full rounded-lg bg-gray-200 animate-pulse" />
            </div>
            <div className="flex flex-row my-auto w-full md:w-2/3 space-x-3">
              <div className="w-1/6 flex flex-col justify-center items-center">
                <div className="w-14 h-[30px] my-auto rounded animate-pulse bg-gray-200" />
              </div>
              <div className="w-1/6 flex flex-col justify-center items-center">
                <div className="w-14 h-[30px] my-auto rounded animate-pulse bg-gray-200" />
              </div>
              <div className="w-1/6 flex flex-col justify-center items-center">
                <div className="w-14 h-[30px] my-auto rounded animate-pulse bg-gray-200" />
              </div>
              <div className="w-1/6 flex flex-col justify-center items-center">
                <div className="w-14 h-[30px] my-auto rounded animate-pulse bg-gray-200" />
              </div>
              <div className="w-1/6 flex flex-col justify-center items-center">
                <div className="w-14 h-[30px] my-auto rounded animate-pulse bg-gray-200" />
              </div>
              <div className="w-1/6 flex flex-col justify-center items-center">
                <div className="w-14 h-[30px] my-auto rounded animate-pulse bg-gray-200" />
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-3 w-full">
            <div className="w-full md:w-1/3">
              <div className="my-auto h-[64px] w-full rounded-lg bg-gray-200 animate-pulse" />
            </div>
            <div className="flex flex-row my-auto w-full md:w-2/3 space-x-3">
              <div className="w-1/6 flex flex-col justify-center items-center">
                <div className="w-14 h-[30px] my-auto rounded animate-pulse bg-gray-200" />
              </div>
              <div className="w-1/6 flex flex-col justify-center items-center">
                <div className="w-14 h-[30px] my-auto rounded animate-pulse bg-gray-200" />
              </div>
              <div className="w-1/6 flex flex-col justify-center items-center">
                <div className="w-14 h-[30px] my-auto rounded animate-pulse bg-gray-200" />
              </div>
              <div className="w-1/6 flex flex-col justify-center items-center">
                <div className="w-14 h-[30px] my-auto rounded animate-pulse bg-gray-200" />
              </div>
              <div className="w-1/6 flex flex-col justify-center items-center">
                <div className="w-14 h-[30px] my-auto rounded animate-pulse bg-gray-200" />
              </div>
              <div className="w-1/6 flex flex-col justify-center items-center">
                <div className="w-14 h-[30px] my-auto rounded animate-pulse bg-gray-200" />
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-3 w-full">
            <div className="w-full md:w-1/3">
              <div className="my-auto h-[64px] w-full rounded-lg bg-gray-200 animate-pulse" />
            </div>
            <div className="flex flex-row my-auto w-full md:w-2/3 space-x-3">
              <div className="w-1/6 flex flex-col justify-center items-center">
                <div className="w-14 h-[30px] my-auto rounded animate-pulse bg-gray-200" />
              </div>
              <div className="w-1/6 flex flex-col justify-center items-center">
                <div className="w-14 h-[30px] my-auto rounded animate-pulse bg-gray-200" />
              </div>
              <div className="w-1/6 flex flex-col justify-center items-center">
                <div className="w-14 h-[30px] my-auto rounded animate-pulse bg-gray-200" />
              </div>
              <div className="w-1/6 flex flex-col justify-center items-center">
                <div className="w-14 h-[30px] my-auto rounded animate-pulse bg-gray-200" />
              </div>
              <div className="w-1/6 flex flex-col justify-center items-center">
                <div className="w-14 h-[30px] my-auto rounded animate-pulse bg-gray-200" />
              </div>
              <div className="w-1/6 flex flex-col justify-center items-center">
                <div className="w-14 h-[30px] my-auto rounded animate-pulse bg-gray-200" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-2 flex flex-col space-y-3">
          {postsData?.length == 0 ? (
            <div className="mt-4 h-72 rounded-xl w-full border border-gray-300 border-dashed flex flex-col justify-center items-center">
              <div className="p-2.5 rounded-full bg-[#F5EBF4] flex flex-col justify-center items-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_837_55)">
                    <path
                      d="M14.0419 0H5.95811C2.67279 0 0 2.67279 0 5.95811V14.0419C0 17.3272 2.67279 20 5.95811 20H14.0419C17.3272 20 20 17.3272 20 14.0419V5.95811C20 2.67279 17.3272 0 14.0419 0ZM17.988 14.0419C17.988 16.2212 16.2212 17.988 14.0419 17.988H5.95811C3.77875 17.988 2.012 16.2212 2.012 14.0419V5.95811C2.012 3.77871 3.77875 2.012 5.95811 2.012H14.0419C16.2212 2.012 17.988 3.77871 17.988 5.95811V14.0419Z"
                      fill="url(#paint0_linear_837_55)"
                    />
                    <path
                      d="M10 4.82715C7.14777 4.82715 4.8273 7.14762 4.8273 9.99982C4.8273 12.852 7.14777 15.1725 10 15.1725C12.8523 15.1725 15.1727 12.8521 15.1727 9.99982C15.1727 7.14759 12.8523 4.82715 10 4.82715ZM10 13.1606C8.25439 13.1606 6.8393 11.7455 6.8393 9.99986C6.8393 8.25423 8.25442 6.83915 10 6.83915C11.7456 6.83915 13.1607 8.25423 13.1607 9.99986C13.1607 11.7455 11.7456 13.1606 10 13.1606Z"
                      fill="url(#paint1_linear_837_55)"
                    />
                    <path
                      d="M15.1826 6.10586C15.8671 6.10586 16.422 5.55094 16.422 4.86641C16.422 4.18187 15.8671 3.62695 15.1826 3.62695C14.4981 3.62695 13.9431 4.18187 13.9431 4.86641C13.9431 5.55094 14.4981 6.10586 15.1826 6.10586Z"
                      fill="url(#paint2_linear_837_55)"
                    />
                  </g>
                  <defs>
                    <linearGradient
                      id="paint0_linear_837_55"
                      x1="10"
                      y1="19.9417"
                      x2="10"
                      y2="0.155336"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#E09B3D" />
                      <stop offset="0.3" stop-color="#C74C4D" />
                      <stop offset="0.6" stop-color="#C21975" />
                      <stop offset="1" stop-color="#7024C4" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_837_55"
                      x1="10"
                      y1="19.9416"
                      x2="10"
                      y2="0.155197"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#E09B3D" />
                      <stop offset="0.3" stop-color="#C74C4D" />
                      <stop offset="0.6" stop-color="#C21975" />
                      <stop offset="1" stop-color="#7024C4" />
                    </linearGradient>
                    <linearGradient
                      id="paint2_linear_837_55"
                      x1="15.1826"
                      y1="19.9419"
                      x2="15.1826"
                      y2="0.155545"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#E09B3D" />
                      <stop offset="0.3" stop-color="#C74C4D" />
                      <stop offset="0.6" stop-color="#C21975" />
                      <stop offset="1" stop-color="#7024C4" />
                    </linearGradient>
                    <clipPath id="clip0_837_55">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <h3 className="mt-4 silka-semibold text-gray-900 text-xl">
                No Recent Posts Found!
              </h3>
              <p className="text-sm silka-regular w-1/2 text-center mt-3 text-gray-400">
                Post more posts to show each of their analytics.
              </p>
            </div>
          ) : (
            <div className="flex flex-col space-y-8 md:space-y-3">
              {postsData?.map((value: any, index: number) => {
                return (
                  <Post
                    value={value}
                    key={index}
                    isPremium={isPremium}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
