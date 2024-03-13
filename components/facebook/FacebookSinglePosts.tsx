import {
  useState,
  useEffect,
  Fragment,
  Dispatch,
  SetStateAction,
} from 'react';
import { apiUrl } from '../../utils/apiUrl';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import cx from 'classnames';
import { Transition } from '@headlessui/react';
import { FacebookEmbed } from 'react-social-media-embed';

async function getSinglePosts(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}facebook/read/singleposts`,
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
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  currentPostId: any;
  setCurrentPostId: Dispatch<SetStateAction<any>>;
  currentPostData: any;
  setCurrentPostData: Dispatch<SetStateAction<any>>;
  isPremium: boolean;
}

function Post({
  value,
  dialogOpen,
  setDialogOpen,
  currentPostId,
  setCurrentPostId,
  currentPostData,
  setCurrentPostData,
  isPremium,
}: PostProps) {
  return (
    <div className="flex flex-col space-y-2.5 md:space-y-0 md:flex-row md:space-x-3 w-full">
      <div className="w-full md:w-1/3">
        <DialogPrimitive.Root>
          <DialogPrimitive.Trigger asChild>
            <div className="p-2.5 hover:bg-gray-50 rounded-lg w-full border flex flex-col justify-start items-start">
              <p
                className={
                  'text-sm silka-regular text-start break-all ' +
                  (value?.message?.length == 0 ||
                  value?.message == null
                    ? 'text-gray-400 italic'
                    : 'text-gray-700')
                }
              >
                {value?.message?.length == 0 || value?.message == null
                  ? 'No text...'
                  : value?.message?.length > 68
                  ? value?.message?.slice(0, 68) + '...'
                  : value?.message}
              </p>
            </div>
          </DialogPrimitive.Trigger>
        </DialogPrimitive.Root>
      </div>
      <div className="flex flex-row my-auto w-full md:w-2/3 space-x-3">
        <div className="w-1/6 my-auto flex flex-col justify-center items-center">
          <p className="my-auto text-sm text-[#818181] silka-medium">
            {formatLargeNumber(
              isPremium
                ? value?.positive_reactions
                : between(1, 10000),
              0
            )}
          </p>
        </div>
        <div className="w-1/6 my-auto flex flex-col justify-center items-center">
          <p className="my-auto text-sm text-[#818181] silka-medium">
            {formatLargeNumber(
              isPremium
                ? value?.negative_reactions
                : between(1, 10000),
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
              isPremium ? value?.engagements : between(1, 10000),
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
        <div className="w-1/6 my-auto flex flex-col justify-center items-center">
          <p className="my-auto text-sm text-[#818181] silka-medium">
            {formatLargeNumber(
              isPremium ? value?.post_clicks : between(1, 10000),
              0
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FacebookSinglePosts({
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
      <div className="flex flex-col space-y-2.5 md:space-y-0 md:flex-row w-full md:space-x-3">
        <p className="w-full hidden md:flex md:w-1/3 text-xs silka-medium my-auto text-[#818181]">
          Post
        </p>
        <div className="my-auto flex flex-row space-x-3 w-full md:w-2/3">
          <div className="w-1/6 flex flex-col justify-center items-center">
            <HoverCardPrimitive.Root>
              <HoverCardPrimitive.Trigger asChild>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  className="my-auto"
                >
                  <path
                    fill="#9B9B9B"
                    d="M21.406 9.558c-1.21-.051-2.87-.278-3.977-.744.809-3.283 1.253-8.814-2.196-8.814-1.861 0-2.351 1.668-2.833 3.329-1.548 5.336-3.946 6.816-6.4 7.401v-.73h-6v12h6v-.904c2.378.228 4.119.864 6.169 1.746 1.257.541 3.053 1.158 5.336 1.158 2.538 0 4.295-.997 5.009-3.686.5-1.877 1.486-7.25 1.486-8.25 0-1.648-1.168-2.446-2.594-2.506zm-17.406 10.442h-2v-8h2v8zm15.896-5.583s.201.01 1.069-.027c1.082-.046 1.051 1.469.004 1.563l-1.761.099c-.734.094-.656 1.203.141 1.172 0 0 .686-.017 1.143-.041 1.068-.056 1.016 1.429.04 1.551-.424.053-1.745.115-1.745.115-.811.072-.706 1.235.109 1.141l.771-.031c.822-.074 1.003.825-.292 1.661-1.567.881-4.685.131-6.416-.614-2.239-.965-4.438-1.934-6.959-2.006v-6c3.264-.749 6.328-2.254 8.321-9.113.898-3.092 1.679-1.931 1.679.574 0 2.071-.49 3.786-.921 5.533 1.061.543 3.371 1.402 6.12 1.556 1.055.059 1.024 1.455-.051 1.584l-1.394.167s-.608 1.111.142 1.116z"
                  />
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
                  Positive Reactions
                </p>
              </HoverCardPrimitive.Content>
            </HoverCardPrimitive.Root>
          </div>
          <div className="w-1/6 flex flex-col justify-center items-center">
            <HoverCardPrimitive.Root>
              <HoverCardPrimitive.Trigger asChild>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#9B9B9B"
                    d="M24 11.936c0-1-.986-6.373-1.486-8.25-.714-2.689-2.471-3.686-5.009-3.686-2.283 0-4.079.617-5.336 1.158-2.05.883-3.791 1.519-6.169 1.746v-.904h-6v12h6v-.73c2.454.585 4.852 2.066 6.4 7.402.483 1.66.972 3.328 2.833 3.328 3.448 0 3.005-5.531 2.196-8.814 1.106-.466 2.767-.692 3.977-.744 1.426-.06 2.594-.858 2.594-2.506zm-20 .064h-2v-8h2v8zm15.755-1.302l1.394.167c1.075.129 1.105 1.525.051 1.584-2.749.154-5.06 1.013-6.12 1.556.43 1.748.92 3.463.92 5.534 0 2.505-.781 3.666-1.679.574-1.993-6.859-5.057-8.364-8.321-9.113v-6c2.521-.072 4.72-1.041 6.959-2.005 1.731-.745 4.849-1.495 6.416-.614 1.295.836 1.114 1.734.292 1.661l-.771-.032c-.815-.094-.92 1.068-.109 1.141 0 0 1.321.062 1.745.115.976.123 1.028 1.607-.04 1.551-.457-.024-1.143-.041-1.143-.041-.797-.031-.875 1.078-.141 1.172 0 0 .714.005 1.761.099s1.078 1.609-.004 1.563c-.868-.037-1.069-.027-1.069-.027-.75.005-.875 1.028-.141 1.115z"
                  />
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
                  Negative Reactions
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
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.998 5C7.92 5 4.256 8.093 2.145 11.483C2.049 11.642 2 11.821 2 12C2 12.179 2.048 12.358 2.144 12.517C4.256 15.907 7.92 19 11.998 19C16.141 19 19.794 15.91 21.862 12.507C21.954 12.351 22 12.175 22 12C22 11.825 21.954 11.649 21.862 11.493C19.794 8.09 16.141 5 11.998 5ZM20.411 12C18.574 14.878 15.514 17.5 11.998 17.5C8.533 17.5 5.466 14.868 3.594 12C5.465 9.132 8.533 6.5 11.998 6.5C15.516 6.5 18.577 9.124 20.411 12ZM12 8C14.208 8 16 9.792 16 12C16 14.208 14.208 16 12 16C9.792 16 8 14.208 8 12C8 9.792 9.792 8 12 8ZM12 9.5C10.62 9.5 9.5 10.62 9.5 12C9.5 13.38 10.62 14.5 12 14.5C13.38 14.5 14.5 13.38 14.5 12C14.5 10.62 13.38 9.5 12 9.5Z"
                    fill="#9B9B9B"
                  />
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
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13 9H22L8 24L11 15H2L16 0L13 9ZM4.301 14H12.387L10.4 19.963L19.699 10H11.613L13.6 4.037L4.301 14Z"
                    fill="#9B9B9B"
                  />
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
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 18C16 19.104 15.104 20 14 20H2C0.895 20 0 19.104 0 18V6C0 4.896 0.895 4 2 4H14C15.104 4 16 4.896 16 6V18ZM24 4L18 10.223V13.777L24 20V4Z"
                    fill="#9B9B9B"
                  />
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
          <div className="w-1/6 flex flex-col justify-center items-center">
            <HoverCardPrimitive.Root>
              <HoverCardPrimitive.Trigger asChild>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1108_4)">
                    <path
                      d="M18.536 7.555C17.348 7.303 13.93 6.651 13 6.467V2.955C13 1.326 11.654 0 10 0C8.346 0 7 1.326 7 2.955V10.412C6.446 10.076 5.812 9.791 5.162 9.697C3.34 9.435 2 10.637 2 12.195C2 13 2.363 13.808 3.022 14.466C6.994 18.438 8.71 19.591 9.081 24H19V22.252C19 17.098 22 16.221 22 12.223C22 9.775 20.939 8.066 18.536 7.555ZM18.893 15.577C18.072 17.06 17.055 18.896 17.002 22H10.872C10.146 18.18 7.062 15.682 4.436 13.051C3.748 12.365 4.043 11.681 4.878 11.678C6.141 11.672 7.938 13.562 9 14.883V2.955C9 2.438 9.458 2 10 2C10.542 2 11 2.438 11 2.955V9.903C11 10.218 11.256 10.474 11.572 10.474C11.886 10.474 12.142 10.218 12.142 9.903V9.328C12.142 8.794 12.632 8.39 13.156 8.495C13.554 8.574 13.842 8.923 13.842 9.328V10.601C13.842 10.916 14.098 11.172 14.413 11.172C14.728 11.172 14.984 10.916 14.984 10.601V9.771C14.984 9.24 15.471 8.839 15.992 8.943C16.388 9.021 16.674 9.367 16.674 9.771V11.304C16.674 11.619 16.93 11.875 17.245 11.875C17.56 11.875 17.816 11.619 17.816 11.304V10.392C17.816 9.869 18.361 9.525 18.834 9.746C19.479 10.051 20 10.678 20 12.223C20 13.578 19.535 14.416 18.893 15.577Z"
                      fill="#9B9B9B"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1108_4">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
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
                  Post Clicks
                </p>
              </HoverCardPrimitive.Content>
            </HoverCardPrimitive.Root>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="flex flex-col space-y-3">
          <div className="flex flex-col space-y-2.5 md:space-y-0 md:flex-row md:space-x-3 w-full">
            <div className="w-full md:w-1/3">
              <div className="my-auto h-[64px] w-full rounded-lg bg-gray-200 animate-pulse" />
            </div>
            <div className="flex flex-row my-auto w-full md:w-2/3 space-x-3">
              <div className="w-1/6 flex flex-col justify-center items-center">
                <div className="w-10 md:w-14 h-[24px] md:h-[30px] my-auto rounded animate-pulse bg-gray-200" />
              </div>
              <div className="w-1/6 flex flex-col justify-center items-center">
                <div className="w-10 md:w-14 h-[24px] md:h-[30px] my-auto rounded animate-pulse bg-gray-200" />
              </div>
              <div className="w-1/6 flex flex-col justify-center items-center">
                <div className="w-10 md:w-14 h-[24px] md:h-[30px] my-auto rounded animate-pulse bg-gray-200" />
              </div>
              <div className="w-1/6 flex flex-col justify-center items-center">
                <div className="w-10 md:w-14 h-[24px] md:h-[30px] my-auto rounded animate-pulse bg-gray-200" />
              </div>
              <div className="w-1/6 flex flex-col justify-center items-center">
                <div className="w-10 md:w-14 h-[24px] md:h-[30px] my-auto rounded animate-pulse bg-gray-200" />
              </div>
              <div className="w-1/6 flex flex-col justify-center items-center">
                <div className="w-10 md:w-14 h-[24px] md:h-[30px] my-auto rounded animate-pulse bg-gray-200" />
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-2.5 md:space-y-0 md:flex-row md:space-x-3 w-full">
            <div className="w-full md:w-1/3">
              <div className="my-auto h-[64px] w-full rounded-lg bg-gray-200 animate-pulse" />
            </div>
            <div className="flex flex-row my-auto w-full md:w-2/3 space-x-3">
              <div className="w-1/6 flex flex-col justify-center items-center">
                <div className="w-10 md:w-14 h-[24px] md:h-[30px] my-auto rounded animate-pulse bg-gray-200" />
              </div>
              <div className="w-1/6 flex flex-col justify-center items-center">
                <div className="w-10 md:w-14 h-[24px] md:h-[30px] my-auto rounded animate-pulse bg-gray-200" />
              </div>
              <div className="w-1/6 flex flex-col justify-center items-center">
                <div className="w-10 md:w-14 h-[24px] md:h-[30px] my-auto rounded animate-pulse bg-gray-200" />
              </div>
              <div className="w-1/6 flex flex-col justify-center items-center">
                <div className="w-10 md:w-14 h-[24px] md:h-[30px] my-auto rounded animate-pulse bg-gray-200" />
              </div>
              <div className="w-1/6 flex flex-col justify-center items-center">
                <div className="w-10 md:w-14 h-[24px] md:h-[30px] my-auto rounded animate-pulse bg-gray-200" />
              </div>
              <div className="w-1/6 flex flex-col justify-center items-center">
                <div className="w-10 md:w-14 h-[24px] md:h-[30px] my-auto rounded animate-pulse bg-gray-200" />
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-2.5 md:space-y-0 md:flex-row md:space-x-3 w-full">
            <div className="w-full md:w-1/3">
              <div className="my-auto h-[64px] w-full rounded-lg bg-gray-200 animate-pulse" />
            </div>
            <div className="flex flex-row my-auto w-full md:w-2/3 space-x-3">
              <div className="w-1/6 flex flex-col justify-center items-center">
                <div className="w-10 md:w-14 h-[24px] md:h-[30px] my-auto rounded animate-pulse bg-gray-200" />
              </div>
              <div className="w-1/6 flex flex-col justify-center items-center">
                <div className="w-10 md:w-14 h-[24px] md:h-[30px] my-auto rounded animate-pulse bg-gray-200" />
              </div>
              <div className="w-1/6 flex flex-col justify-center items-center">
                <div className="w-10 md:w-14 h-[24px] md:h-[30px] my-auto rounded animate-pulse bg-gray-200" />
              </div>
              <div className="w-1/6 flex flex-col justify-center items-center">
                <div className="w-10 md:w-14 h-[24px] md:h-[30px] my-auto rounded animate-pulse bg-gray-200" />
              </div>
              <div className="w-1/6 flex flex-col justify-center items-center">
                <div className="w-10 md:w-14 h-[24px] md:h-[30px] my-auto rounded animate-pulse bg-gray-200" />
              </div>
              <div className="w-1/6 flex flex-col justify-center items-center">
                <div className="w-10 md:w-14 h-[24px] md:h-[30px] my-auto rounded animate-pulse bg-gray-200" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-2 flex flex-col space-y-5 md:space-y-3">
          {postsData?.length == 0 ? (
            <div className="mt-4 h-72 rounded-xl w-full border border-gray-300 border-dashed flex flex-col justify-center items-center">
              <div className="p-2.5 rounded-full bg-[#E8EEF5] flex flex-col justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#0572E7"
                    d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
                  />
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
            <>
              {postsData?.map((value: any, index: number) => {
                return (
                  <Post
                    value={value}
                    isPremium={isPremium}
                    key={index}
                    dialogOpen={dialogOpen}
                    setDialogOpen={setDialogOpen}
                    currentPostId={currentPostId}
                    setCurrentPostId={setCurrentPostId}
                    currentPostData={currentPostData}
                    setCurrentPostData={setCurrentPostData}
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
