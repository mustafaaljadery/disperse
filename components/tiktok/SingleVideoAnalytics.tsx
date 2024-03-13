import {
  useState,
  useEffect,
  Dispatch,
  Fragment,
  SetStateAction,
} from 'react';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import cx from 'classnames';
import { apiUrl } from '../../utils/apiUrl';
import { Transition } from '@headlessui/react';
import { TikTokEmbed } from 'react-social-media-embed';

interface Props {
  workspaceId: string;
  timeInterval: string;
  isPremium: boolean;
}

interface VideoProps {
  value: any;
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  currentVideoData: any;
  setCurrentVideoData: Dispatch<SetStateAction<any>>;
  currentVideoId: any;
  setCurrentVideoId: Dispatch<SetStateAction<any>>;
  isPremium: boolean;
}

interface SingleVideoDialogProps {
  dialogOpen: boolean;
  value: any;
  isPremium: boolean;
}

async function getSingleVideos(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}tiktok/read/singlevideoanalytics`,
      { params: { workspaceId: workspaceId } }
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

function SingleVideoDialog({
  dialogOpen,
  value,
  isPremium,
}: SingleVideoDialogProps) {
  return (
    <Transition.Root show={dialogOpen}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <DialogPrimitive.Overlay
          forceMount
          className="fixed inset-0 z-20 bg-black/20"
        />
      </Transition.Child>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <DialogPrimitive.Content
          forceMount
          className={cx(
            'fixed z-50',
            'w-[95vw] max-w-2xl max-h-[80vh] px-4 rounded-lg py-3 md:w-full',
            'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
            'bg-white',
            'focus:outline-none focus-visible:ring'
          )}
        >
          <div className="flex flex-col md:flex-row md:space-x-5">
            <div className="flex flex-col justfy-center items-center">
              <TikTokEmbed
                url={value.share_url}
                height={400}
                width={300}
              />
            </div>
            <div className="flex flex-col space-y-6">
              <div className="w-full mt-2 flex flex-col justify-center items-center">
                <a
                  href={value.share_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-row space-x-2 px-4 py-1.5 rounded bg-gray-50 hover:bg-gray-200"
                >
                  <p className="text-sm silka-medium text-gray-900 my-auto">
                    View on TikTok
                  </p>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="my-auto"
                  >
                    <path
                      d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </a>
              </div>
              <div className="flex flex-row flex-wrap">
                <div className="p-2 w-1/2">
                  <div className="flex flex-col space-y-1 rounded-lg bg-[#F5F5F5] p-2">
                    <div className="flex flex-row space-x-1.5">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="my-auto"
                      >
                        <path
                          d="M12.523 4.12462C11.6065 4.07962 10.5137 4.50712 9.60548 5.74462L9.00173 6.56212L8.39723 5.74462C7.48823 4.50712 6.39473 4.07962 5.47823 4.12462C4.54598 4.17712 3.71648 4.70962 3.29573 5.55712C2.88173 6.39712 2.82098 7.64212 3.65498 9.17212C4.46048 10.6496 6.09773 12.3746 9.00173 14.1296C11.9042 12.3746 13.5407 10.6496 14.3462 9.17212C15.1795 7.64212 15.1187 6.39712 14.704 5.55712C14.2832 4.70962 13.4545 4.17712 12.523 4.12462ZM15.6632 9.89212C14.65 11.7521 12.6625 13.7321 9.37898 15.6446L9.00173 15.8696L8.62373 15.6446C5.33948 13.7321 3.35198 11.7521 2.33723 9.89212C1.31723 8.01712 1.27973 6.24712 1.95173 4.88962C2.61698 3.54712 3.93698 2.70712 5.40248 2.63212C6.64073 2.56462 7.92848 3.05212 9.00098 4.13962C10.0727 3.05212 11.3605 2.56462 12.598 2.63212C14.0635 2.70712 15.3835 3.54712 16.0487 4.88962C16.7207 6.24712 16.6832 8.01712 15.6632 9.89212V9.89212Z"
                          fill="#363636"
                        />
                      </svg>
                      <span className="text-xs my-auto silka-medium text-[#363636]">
                        Likes
                      </span>
                    </div>
                    <p className="silka-medium text-gray-700 text-lg">
                      {formatLargeNumber(
                        isPremium
                          ? value.like_count
                          : between(1, 10000),
                        0
                      )}
                    </p>
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="flex flex-col space-y-1 rounded-lg bg-[#F5F5F5] p-2">
                    <div className="flex flex-row space-x-1.5">
                      <svg
                        width="14"
                        height="10"
                        viewBox="0 0 14 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="my-auto"
                      >
                        <path
                          d="M11.1494 1.54264C9.99594 0.547509 8.52343 0 7 0C5.47657 0 4.00412 0.547509 2.85063 1.54264L0.400263 3.64667C0.146257 3.86392 0 4.18149 0 4.51578C0 4.85007 0.146257 5.16763 0.400263 5.38489L2.85063 7.48892C4.00406 8.48405 5.47657 9.03156 7 9.03156C8.52343 9.03156 9.99588 8.48405 11.1494 7.48892L13.5997 5.38489C13.8537 5.16764 14 4.85007 14 4.51578C14 4.18149 13.8537 3.86393 13.5997 3.64667L11.1494 1.54264ZM12.9659 4.63989L10.509 6.74393C9.53488 7.58811 8.28903 8.05279 7.00008 8.05279C5.71114 8.05279 4.46526 7.58809 3.49116 6.74393L1.03425 4.63989C0.966207 4.57109 0.966207 4.46038 1.03425 4.39158L3.49116 2.28754C4.46529 1.44336 5.71114 0.978683 7.00008 0.978683C8.28903 0.978683 9.53491 1.44338 10.509 2.28754L12.9659 4.39158C13.034 4.46038 13.034 4.57109 12.9659 4.63989Z"
                          fill="#363636"
                        />
                        <path
                          d="M6.99977 1.73828C6.26323 1.73828 5.55691 2.0309 5.03609 2.55172C4.51527 3.07254 4.22266 3.77886 4.22266 4.5154C4.22266 5.25193 4.51527 5.95825 5.03609 6.47907C5.55691 6.9999 6.26323 7.29251 6.99977 7.29251C7.73631 7.29251 8.44263 6.9999 8.96345 6.47907C9.48427 5.95825 9.77689 5.25193 9.77689 4.5154C9.77514 3.77942 9.48197 3.07405 8.9616 2.55357C8.44112 2.03319 7.73578 1.74002 6.99977 1.73828V1.73828ZM6.99977 6.3122V6.31231C6.52314 6.31231 6.06611 6.12295 5.7292 5.78591C5.39217 5.449 5.2028 4.99194 5.2028 4.51534C5.2028 4.03874 5.39216 3.58168 5.7292 3.24476C6.06611 2.90773 6.52317 2.71837 6.99977 2.71837C7.47637 2.71837 7.93343 2.90772 8.27035 3.24476C8.60738 3.58168 8.79674 4.03874 8.79674 4.51534C8.79674 4.99194 8.60739 5.449 8.27035 5.78591C7.93343 6.12294 7.47637 6.31231 6.99977 6.31231V6.3122Z"
                          fill="#363636"
                        />
                      </svg>
                      <span className="text-xs my-auto silka-medium text-[#363636]">
                        Views
                      </span>
                    </div>
                    <p className="silka-medium text-gray-700 text-lg">
                      {formatLargeNumber(
                        isPremium
                          ? value.view_count
                          : between(1, 10000),
                        0
                      )}
                    </p>
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="flex flex-col space-y-1 rounded-lg bg-[#F5F5F5] p-2">
                    <div className="flex flex-row space-x-1.5">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="my-auto"
                      >
                        <path
                          d="M1.02148 5.83366C1.02148 3.25533 3.11215 1.16699 5.69107 1.16699H8.2379C10.8571 1.16699 12.9798 3.29033 12.9798 5.90949C12.9798 7.63616 12.0424 9.22283 10.5322 10.057L5.83398 12.6587V10.5062H5.7949C3.17573 10.5645 1.02148 8.45866 1.02148 5.83366V5.83366ZM5.69107 2.33366C3.75615 2.33366 2.18815 3.90283 2.18815 5.83366C2.18815 7.79949 3.80398 9.38033 5.76865 9.33949L5.9734 9.33366H7.00065V10.6753L9.96807 9.03616C11.1062 8.40616 11.8132 7.21033 11.8132 5.90949C11.8132 3.93199 10.2125 2.33366 8.2379 2.33366H5.69107V2.33366Z"
                          fill="#363636"
                        />
                      </svg>
                      <span className="text-xs my-auto silka-medium text-[#363636]">
                        Comments
                      </span>
                    </div>
                    <p className="silka-medium text-gray-700 text-lg">
                      {formatLargeNumber(
                        isPremium
                          ? value.comment_count
                          : between(1, 10000),
                        0
                      )}
                    </p>
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="flex flex-col space-y-1 rounded-lg bg-[#F5F5F5] p-2">
                    <div className="flex flex-row space-x-1.5">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="my-auto"
                      >
                        <path
                          d="M2.62488 2.26367L5.21022 4.67867L4.41455 5.53034L3.20822 4.40451V9.33367C3.20822 9.97534 3.73088 10.5003 4.37488 10.5003H7.58322V11.667H4.37488C3.0863 11.667 2.04155 10.6228 2.04155 9.33367V4.40451L0.835217 5.53034L0.0395508 4.67867L2.62488 2.26367ZM9.62488 3.50034H6.41655V2.33367H9.62488C10.9135 2.33367 11.9582 3.37784 11.9582 4.66701V9.59617L13.1646 8.47034L13.9602 9.322L11.3749 11.737L8.78955 9.322L9.58522 8.47034L10.7915 9.59617V4.66701C10.7915 4.02534 10.2689 3.50034 9.62488 3.50034Z"
                          fill="#363636"
                        />
                      </svg>
                      <span className="text-xs my-auto silka-medium text-[#363636]">
                        Shares
                      </span>
                    </div>
                    <p className="silka-medium text-gray-700 text-lg">
                      {formatLargeNumber(
                        isPremium
                          ? value.share_count
                          : between(1, 10000),
                        0
                      )}
                    </p>
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="flex flex-col space-y-1 rounded-lg bg-[#F5F5F5] p-2">
                    <div className="flex flex-row space-x-1.5">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="my-auto"
                      >
                        <path
                          d="M0.131667 7.99485L0.0912876 8.04081C-0.128161 8.32556 0.0705494 8.75737 0.447527 8.75737H6.03399L5.24802 13.4783C5.17653 13.9069 5.6972 14.1748 6.00448 13.8676L13.8659 6.00613L13.9063 5.96017C14.1257 5.67542 13.927 5.2436 13.55 5.2436H7.18178L8.73288 0.590562C8.88193 0.14338 8.32659 -0.199893 7.99327 0.133426L0.131667 7.99485ZM7.28633 2.10312L6.13815 5.54887L6.12299 5.6067C6.07085 5.87659 6.27744 6.13673 6.56198 6.13673H12.4708L6.35805 12.2498L7.00273 8.38413L7.00862 8.3263C7.01779 8.07774 6.81838 7.86409 6.56215 7.86409H1.52573L7.28633 2.10312Z"
                          fill="#363636"
                        />
                      </svg>
                      <span className="text-xs my-auto silka-medium text-[#363636]">
                        Engagement
                      </span>
                    </div>
                    <p className="silka-medium text-gray-700 text-lg">
                      {(isPremium
                        ? value.view_count > 0
                          ? ((value.like_count +
                              value.comment_count +
                              value.share_count) /
                              value.view_count) *
                            100
                          : 0
                        : between(1, 500) / 100
                      ).toFixed(2)}
                      %
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogPrimitive.Content>
      </Transition.Child>
    </Transition.Root>
  );
}

function Video({
  value,
  dialogOpen,
  setDialogOpen,
  currentVideoData,
  setCurrentVideoData,
  currentVideoId,
  setCurrentVideoId,
  isPremium,
}: VideoProps) {
  return (
    <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-3 w-full">
      <div className="w-full md:w-1/3">
        <DialogPrimitive.Root
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        >
          <DialogPrimitive.Trigger asChild>
            <button
              onClick={() => {}}
              className="p-2.5 hover:bg-gray-50 rounded-lg w-full border flex flex-row space-x-2.5 justify-start items-start"
            >
              <img
                className="h-20 rounded my-auto"
                src={value.cover_image_url}
              />
              <p
                className={
                  'text-sm silka-regular my-auto text-start ' +
                  (value.title
                    ? 'text-gray-700'
                    : 'italic text-gray-400')
                }
              >
                {value.title
                  ? value.title.length > 68
                    ? value.title.slice(0, 68) + '...'
                    : value.title
                  : 'Blank title...'}
              </p>
            </button>
          </DialogPrimitive.Trigger>
          <SingleVideoDialog
            dialogOpen={dialogOpen}
            value={value}
            isPremium={isPremium}
          />
        </DialogPrimitive.Root>
      </div>
      <div className="flex flex-row my-auto w-full md:w-2/3 space-x-3">
        <div className="w-1/5 my-auto flex flex-col justify-center items-center">
          <p className="my-auto text-sm text-[#818181] silka-medium">
            {formatLargeNumber(
              isPremium ? value.like_count : between(1, 10000),
              0
            )}
          </p>
        </div>
        <div className="w-1/5 my-auto flex flex-col justify-center items-center">
          <p className="my-auto text-sm text-[#818181] silka-medium">
            {formatLargeNumber(
              isPremium ? value.view_count : between(1, 10000),
              0
            )}
          </p>
        </div>
        <div className="w-1/5 my-auto flex flex-col justify-center items-center">
          <p className="my-auto text-sm text-[#818181] silka-medium">
            {formatLargeNumber(
              isPremium ? value.comment_count : between(1, 10000),
              0
            )}
          </p>
        </div>
        <div className="w-1/5 my-auto flex flex-col justify-center items-center">
          <p className="my-auto text-sm text-[#818181] silka-medium">
            {formatLargeNumber(
              isPremium ? value.share_count : between(1, 10000),
              0
            )}
          </p>
        </div>
        <div className="w-1/5 my-auto flex flex-col justify-center items-center">
          <p className="my-auto text-sm text-[#818181] silka-medium">
            {(isPremium
              ? value.view_count > 0
                ? ((value.like_count +
                    value.comment_count +
                    value.share_count) /
                    value.view_count) *
                  100
                : 0
              : between(1, 500) / 100
            ).toFixed(2)}
            %
          </p>
        </div>
      </div>
    </div>
  );
}

export function SingleVideoAnalytics({
  workspaceId,
  timeInterval,
  isPremium,
}: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [currentVideoId, setCurrentVideoId] = useState<any>(null);
  const [currentVideoData, setCurrentVideoData] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getSingleVideos(workspaceId).then((value) => {
      setData(value);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div className="flex flex-col w-full space-y-5 mt-9 mb-12 md:mb-16 lg:mb-24">
      <h3 className="text-xl silka-semibold">TikToks</h3>
      <div className="flex flex-row w-full md:space-x-3">
        <p className="hidden md:flex w-1/3 text-xs silka-medium my-auto text-[#818181]">
          Videos
        </p>
        <div className="my-auto flex flex-row space-x-3 w-full md:w-2/3">
          <div className="w-1/5 flex flex-col justify-center items-center">
            <HoverCardPrimitive.Root>
              <HoverCardPrimitive.Trigger asChild>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.523 4.12462C11.6065 4.07962 10.5137 4.50712 9.60548 5.74462L9.00173 6.56212L8.39723 5.74462C7.48823 4.50712 6.39473 4.07962 5.47823 4.12462C4.54598 4.17712 3.71648 4.70962 3.29573 5.55712C2.88173 6.39712 2.82098 7.64212 3.65498 9.17212C4.46048 10.6496 6.09773 12.3746 9.00173 14.1296C11.9042 12.3746 13.5407 10.6496 14.3462 9.17212C15.1795 7.64212 15.1187 6.39712 14.704 5.55712C14.2832 4.70962 13.4545 4.17712 12.523 4.12462ZM15.6632 9.89212C14.65 11.7521 12.6625 13.7321 9.37898 15.6446L9.00173 15.8696L8.62373 15.6446C5.33948 13.7321 3.35198 11.7521 2.33723 9.89212C1.31723 8.01712 1.27973 6.24712 1.95173 4.88962C2.61698 3.54712 3.93698 2.70712 5.40248 2.63212C6.64073 2.56462 7.92848 3.05212 9.00098 4.13962C10.0727 3.05212 11.3605 2.56462 12.598 2.63212C14.0635 2.70712 15.3835 3.54712 16.0487 4.88962C16.7207 6.24712 16.6832 8.01712 15.6632 9.89212V9.89212Z"
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
                  Likes
                </p>
              </HoverCardPrimitive.Content>
            </HoverCardPrimitive.Root>
          </div>
          <div className="w-1/5 flex flex-col justify-center items-center">
            <HoverCardPrimitive.Root>
              <HoverCardPrimitive.Trigger asChild>
                <svg
                  width="14"
                  height="10"
                  viewBox="0 0 14 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.1494 1.54264C9.99594 0.547509 8.52343 0 7 0C5.47657 0 4.00412 0.547509 2.85063 1.54264L0.400263 3.64667C0.146257 3.86392 0 4.18149 0 4.51578C0 4.85007 0.146257 5.16763 0.400263 5.38489L2.85063 7.48892C4.00406 8.48405 5.47657 9.03156 7 9.03156C8.52343 9.03156 9.99588 8.48405 11.1494 7.48892L13.5997 5.38489C13.8537 5.16764 14 4.85007 14 4.51578C14 4.18149 13.8537 3.86393 13.5997 3.64667L11.1494 1.54264ZM12.9659 4.63989L10.509 6.74393C9.53488 7.58811 8.28903 8.05279 7.00008 8.05279C5.71114 8.05279 4.46526 7.58809 3.49116 6.74393L1.03425 4.63989C0.966207 4.57109 0.966207 4.46038 1.03425 4.39158L3.49116 2.28754C4.46529 1.44336 5.71114 0.978683 7.00008 0.978683C8.28903 0.978683 9.53491 1.44338 10.509 2.28754L12.9659 4.39158C13.034 4.46038 13.034 4.57109 12.9659 4.63989Z"
                    fill="#9B9B9B"
                  />
                  <path
                    d="M6.99977 1.73828C6.26323 1.73828 5.55691 2.0309 5.03609 2.55172C4.51527 3.07254 4.22266 3.77886 4.22266 4.5154C4.22266 5.25193 4.51527 5.95825 5.03609 6.47907C5.55691 6.9999 6.26323 7.29251 6.99977 7.29251C7.73631 7.29251 8.44263 6.9999 8.96345 6.47907C9.48427 5.95825 9.77689 5.25193 9.77689 4.5154C9.77514 3.77942 9.48197 3.07405 8.9616 2.55357C8.44112 2.03319 7.73578 1.74002 6.99977 1.73828V1.73828ZM6.99977 6.3122V6.31231C6.52314 6.31231 6.06611 6.12295 5.7292 5.78591C5.39217 5.449 5.2028 4.99194 5.2028 4.51534C5.2028 4.03874 5.39216 3.58168 5.7292 3.24476C6.06611 2.90773 6.52317 2.71837 6.99977 2.71837C7.47637 2.71837 7.93343 2.90772 8.27035 3.24476C8.60738 3.58168 8.79674 4.03874 8.79674 4.51534C8.79674 4.99194 8.60739 5.449 8.27035 5.78591C7.93343 6.12294 7.47637 6.31231 6.99977 6.31231V6.3122Z"
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
                  Views
                </p>
              </HoverCardPrimitive.Content>
            </HoverCardPrimitive.Root>
          </div>
          <div className="w-1/5 flex flex-col justify-center items-center">
            <HoverCardPrimitive.Root>
              <HoverCardPrimitive.Trigger asChild>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.02148 5.83366C1.02148 3.25533 3.11215 1.16699 5.69107 1.16699H8.2379C10.8571 1.16699 12.9798 3.29033 12.9798 5.90949C12.9798 7.63616 12.0424 9.22283 10.5322 10.057L5.83398 12.6587V10.5062H5.7949C3.17573 10.5645 1.02148 8.45866 1.02148 5.83366V5.83366ZM5.69107 2.33366C3.75615 2.33366 2.18815 3.90283 2.18815 5.83366C2.18815 7.79949 3.80398 9.38033 5.76865 9.33949L5.9734 9.33366H7.00065V10.6753L9.96807 9.03616C11.1062 8.40616 11.8132 7.21033 11.8132 5.90949C11.8132 3.93199 10.2125 2.33366 8.2379 2.33366H5.69107V2.33366Z"
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
                  Comments
                </p>
              </HoverCardPrimitive.Content>
            </HoverCardPrimitive.Root>
          </div>
          <div className="w-1/5 flex flex-col jusitfy-center items-center">
            <HoverCardPrimitive.Root>
              <HoverCardPrimitive.Trigger asChild>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.62488 2.26367L5.21022 4.67867L4.41455 5.53034L3.20822 4.40451V9.33367C3.20822 9.97534 3.73088 10.5003 4.37488 10.5003H7.58322V11.667H4.37488C3.0863 11.667 2.04155 10.6228 2.04155 9.33367V4.40451L0.835217 5.53034L0.0395508 4.67867L2.62488 2.26367ZM9.62488 3.50034H6.41655V2.33367H9.62488C10.9135 2.33367 11.9582 3.37784 11.9582 4.66701V9.59617L13.1646 8.47034L13.9602 9.322L11.3749 11.737L8.78955 9.322L9.58522 8.47034L10.7915 9.59617V4.66701C10.7915 4.02534 10.2689 3.50034 9.62488 3.50034Z"
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
                  Shares
                </p>
              </HoverCardPrimitive.Content>
            </HoverCardPrimitive.Root>
          </div>
          <div className="w-1/5 flex flex-col justify-center items-center">
            <HoverCardPrimitive.Root>
              <HoverCardPrimitive.Trigger asChild>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.131667 7.99485L0.0912876 8.04081C-0.128161 8.32556 0.0705494 8.75737 0.447527 8.75737H6.03399L5.24802 13.4783C5.17653 13.9069 5.6972 14.1748 6.00448 13.8676L13.8659 6.00613L13.9063 5.96017C14.1257 5.67542 13.927 5.2436 13.55 5.2436H7.18178L8.73288 0.590562C8.88193 0.14338 8.32659 -0.199893 7.99327 0.133426L0.131667 7.99485ZM7.28633 2.10312L6.13815 5.54887L6.12299 5.6067C6.07085 5.87659 6.27744 6.13673 6.56198 6.13673H12.4708L6.35805 12.2498L7.00273 8.38413L7.00862 8.3263C7.01779 8.07774 6.81838 7.86409 6.56215 7.86409H1.52573L7.28633 2.10312Z"
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
                  Engagement Rate
                </p>
              </HoverCardPrimitive.Content>
            </HoverCardPrimitive.Root>
          </div>
        </div>
      </div>
      <div className="mt-2 flex flex-col space-y-6 md:space-y-3">
        {data.length == 0 ? (
          <div className="h-72 rounded-xl w-full border border-gray-300 border-dashed flex flex-col justify-center items-center">
            <div className="p-2.5 rounded-full bg-[#EAEAEA] flex flex-col justify-center items-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.66932 9.46597V8.5413C9.34846 8.49573 9.02469 8.47228 8.70066 8.4707C4.73672 8.4707 1.51172 11.6962 1.51172 15.6602C1.51172 18.0917 2.72696 20.2443 4.58077 21.5459C3.33945 20.2184 2.64924 18.4687 2.6503 16.6512C2.6503 12.7437 5.78362 9.55712 9.66932 9.46597Z"
                  fill="#00F2EA"
                />
                <path
                  d="M9.83924 19.935C11.608 19.935 13.0505 18.528 13.1164 16.7746L13.1225 1.12191H15.9821C15.921 0.794985 15.8901 0.463318 15.8899 0.130859H11.9842L11.9776 15.7841C11.9125 17.537 10.4691 18.9435 8.70093 18.9435C8.1701 18.9437 7.64718 18.8144 7.17773 18.5665C7.79286 19.4248 8.78339 19.934 9.83924 19.935ZM21.3235 6.43518V5.56531C20.2727 5.56637 19.2442 5.26051 18.3646 4.68569C19.136 5.57374 20.1742 6.18755 21.3241 6.43518"
                  fill="#00F2EA"
                />
                <path
                  d="M18.3649 4.68525C17.5029 3.69894 17.0279 2.43312 17.0285 1.12305H15.9821C16.2558 2.58618 17.117 3.8736 18.3649 4.68525ZM8.70119 12.3776C6.88874 12.3797 5.42008 13.8484 5.41797 15.6608C5.41902 16.8811 6.09658 18.0002 7.17747 18.5671C6.77362 18.0102 6.55628 17.3403 6.55628 16.6524C6.55813 14.84 8.02679 13.3708 9.8395 13.3687C10.1778 13.3687 10.502 13.4245 10.8082 13.5207V9.53329C10.4873 9.48771 10.1635 9.46427 9.8395 9.46269C9.7826 9.46269 9.72649 9.46585 9.67011 9.4669V12.5296C9.35662 12.43 9.02996 12.3787 8.70119 12.3776Z"
                  fill="#FF004F"
                />
                <path
                  d="M21.3223 6.43438V9.46997C19.2967 9.46997 17.4208 8.82218 15.8884 7.72259V15.66C15.8884 19.6239 12.6639 22.8489 8.69998 22.8489C7.16809 22.8489 5.74763 22.3655 4.58008 21.5457C5.93704 23.0091 7.84249 23.8405 9.83803 23.84C13.802 23.84 17.027 20.615 17.027 16.6515V8.71417C18.61 9.85249 20.5112 10.4639 22.4609 10.4616V6.55477C22.07 6.55477 21.6898 6.51236 21.3221 6.43359"
                  fill="#FF004F"
                />
                <path
                  d="M15.8892 15.6608V7.72347C17.4722 8.86205 19.3734 9.47322 21.3231 9.47085V6.43553C20.1735 6.18763 19.1353 5.57356 18.3642 4.68525C17.1163 3.8736 16.2551 2.58618 15.9814 1.12305H13.122L13.116 16.7757C13.0504 18.5286 11.6075 19.9356 9.83881 19.9356C8.78322 19.9346 7.79243 19.4251 7.17756 18.5674C6.09668 18.0007 5.41886 16.8816 5.41754 15.6611C5.41965 13.8487 6.88831 12.38 8.70076 12.3779C9.03849 12.3779 9.36278 12.4332 9.66942 12.5299V9.46717C5.78372 9.55831 2.65039 12.7449 2.65039 16.6524C2.65039 18.5421 3.38459 20.2623 4.58086 21.5471C5.78688 22.3962 7.22604 22.8511 8.70076 22.8498C12.665 22.8498 15.8892 19.6248 15.8892 15.6608Z"
                  fill="black"
                />
              </svg>
            </div>
            <h3 className="mt-4 silka-semibold text-gray-900 text-xl">
              No Recent Videos Found!
            </h3>
            <p className="text-sm silka-regular w-1/2 text-center mt-3 text-gray-400">
              Post more videos to show your video analytics.
            </p>
          </div>
        ) : (
          <>
            {data.map((value: any, index: number) => {
              return (
                <Video
                  key={index}
                  isPremium={isPremium}
                  value={value}
                  dialogOpen={dialogOpen}
                  setDialogOpen={setDialogOpen}
                  currentVideoData={currentVideoData}
                  setCurrentVideoData={setCurrentVideoData}
                  currentVideoId={currentVideoId}
                  setCurrentVideoId={setCurrentVideoId}
                />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
