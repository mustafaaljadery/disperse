import {
  useState,
  useEffect,
  Fragment,
  Dispatch,
  SetStateAction,
} from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { Transition } from '@headlessui/react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import cx from 'classnames';
import { apiUrl } from '../../utils/apiUrl';

async function getSingleTweets(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}twitter/read/singletweets`,
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

interface SingleTweetDialogProps {
  dialogOpen: boolean;
  currentTweetId: any;
  currentTweetData: any;
  isPremium: boolean;
}

interface TweetProps {
  value: any;
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  currentTweetId: any;
  setCurrentTweetId: Dispatch<SetStateAction<any>>;
  currentTweetData: any;
  setCurrentTweetData: Dispatch<SetStateAction<any>>;
  isPremium: boolean;
}

function SingleTweetDialog({
  dialogOpen,
  currentTweetId,
  currentTweetData,
  isPremium,
}: SingleTweetDialogProps) {
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
            'w-[95vw] max-w-xl rounded-lg py-3 md:w-full',
            'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
            'bg-white',
            'focus:outline-none focus-visible:ring'
          )}
        >
          <div className="flex flex-col w-full justify-center items-center space-y-3">
            <div className="w-full px-4">
              <TwitterTweetEmbed tweetId={currentTweetId} />
            </div>
            <div className="flex flex-col space-y-2 w-full px-4">
              <div className="flex flex-row space-x-1.5">
                <div className="bg-[#E0ECF5] p-2 w-1/4 rounded-lg flex flex-col space-y-1">
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
                        fill="#1D9BF0"
                      />
                    </svg>
                    <span className="text-xs my-auto silka-medium text-[#1D9BF0]">
                      Likes
                    </span>
                  </div>
                  <p className="silka-medium text-gray-700 text-lg">
                    {formatLargeNumber(
                      isPremium
                        ? currentTweetData?.public_metrics?.like_count
                        : between(1, 10000),
                      0
                    )}
                  </p>
                </div>
                <div className="bg-[#E0ECF5] p-2 w-1/4 rounded-lg flex flex-col space-y-1">
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
                        fill="#1D9BF0"
                      />
                    </svg>
                    <span className="text-xs my-auto silka-medium text-[#1D9BF0]">
                      Replies
                    </span>
                  </div>
                  <p className="silka-medium text-gray-700 text-lg">
                    {formatLargeNumber(
                      isPremium
                        ? currentTweetData?.public_metrics
                            ?.reply_count
                        : between(1, 10000),
                      0
                    )}
                  </p>
                </div>
                <div className="bg-[#E0ECF5] p-2 w-1/4 rounded-lg flex flex-col space-y-1">
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
                        fill="#1D9BF0"
                      />
                    </svg>
                    <span className="text-xs my-auto silka-medium text-[#1D9BF0]">
                      Retweets
                    </span>
                  </div>
                  <p className="silka-medium text-gray-700 text-lg">
                    {formatLargeNumber(
                      isPremium
                        ? currentTweetData?.public_metrics
                            ?.retweet_count
                        : between(1, 10000),
                      0
                    )}
                  </p>
                </div>
                <div className="bg-[#E0ECF5] p-2 w-1/4 rounded-lg flex flex-col space-y-1">
                  <div className="flex flex-row space-x-1.5">
                    <svg
                      width="14"
                      height="11"
                      viewBox="0 0 15 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="my-auto"
                    >
                      <path
                        d="M14.9429 2.87746C14.7808 1.31538 13.4692 0.077464 11.8924 0.00377989C10.0356 -0.0846252 8.50293 1.38907 8.50293 3.23114C8.50293 4.58693 9.34298 5.73638 10.5218 6.22272L8.70925 9.9364C8.60604 10.1574 8.76815 10.4227 9.00396 10.4227H10.2418C10.345 10.4227 10.4481 10.3785 10.507 10.2901L14.3976 5.0438C14.8103 4.42477 15.0166 3.67322 14.943 2.87738L14.9429 2.87746Z"
                        fill="#1D9BF0"
                      />
                      <path
                        d="M4.34748 0.00377989C2.49066 -0.0846252 0.958008 1.38907 0.958008 3.23114C0.958008 4.58693 1.79806 5.73638 2.97693 6.22272L1.16432 9.9364C1.06112 10.1574 1.22323 10.4227 1.45903 10.4227H2.6969C2.80011 10.4227 2.90321 10.3785 2.96211 10.2901L6.85263 5.0438C7.26526 4.43956 7.47158 3.68801 7.38316 2.89217C7.22115 1.31528 5.90958 0.0774351 4.34737 0.00375097L4.34748 0.00377989Z"
                        fill="#1D9BF0"
                      />
                    </svg>
                    <span className="text-xs my-auto silka-medium text-[#1D9BF0]">
                      Quotes
                    </span>
                  </div>
                  <p className="silka-medium text-gray-700 text-lg">
                    {formatLargeNumber(
                      isPremium
                        ? currentTweetData?.public_metrics
                            ?.quote_count
                        : between(1, 10000),
                      0
                    )}
                  </p>
                </div>
              </div>
              <div className="flex flex-row space-x-1.5">
                <div className="bg-[#E0ECF5] p-2 w-1/4 rounded-lg flex flex-col space-y-1">
                  <div className="flex flex-row space-x-1.5">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="my-auto"
                    >
                      <path
                        d="M11.1494 1.54264C9.99594 0.547509 8.52343 0 7 0C5.47657 0 4.00412 0.547509 2.85063 1.54264L0.400263 3.64667C0.146257 3.86392 0 4.18149 0 4.51578C0 4.85007 0.146257 5.16763 0.400263 5.38489L2.85063 7.48892C4.00406 8.48405 5.47657 9.03156 7 9.03156C8.52343 9.03156 9.99588 8.48405 11.1494 7.48892L13.5997 5.38489C13.8537 5.16764 14 4.85007 14 4.51578C14 4.18149 13.8537 3.86393 13.5997 3.64667L11.1494 1.54264ZM12.9659 4.63989L10.509 6.74393C9.53488 7.58811 8.28903 8.05279 7.00008 8.05279C5.71114 8.05279 4.46526 7.58809 3.49116 6.74393L1.03425 4.63989C0.966207 4.57109 0.966207 4.46038 1.03425 4.39158L3.49116 2.28754C4.46529 1.44336 5.71114 0.978683 7.00008 0.978683C8.28903 0.978683 9.53491 1.44338 10.509 2.28754L12.9659 4.39158C13.034 4.46038 13.034 4.57109 12.9659 4.63989Z"
                        fill="#1D9BF0"
                      />
                      <path
                        d="M6.99977 1.73828C6.26323 1.73828 5.55691 2.0309 5.03609 2.55172C4.51527 3.07254 4.22266 3.77886 4.22266 4.5154C4.22266 5.25193 4.51527 5.95825 5.03609 6.47907C5.55691 6.9999 6.26323 7.29251 6.99977 7.29251C7.73631 7.29251 8.44263 6.9999 8.96345 6.47907C9.48427 5.95825 9.77689 5.25193 9.77689 4.5154C9.77514 3.77942 9.48197 3.07405 8.9616 2.55357C8.44112 2.03319 7.73578 1.74002 6.99977 1.73828V1.73828ZM6.99977 6.3122V6.31231C6.52314 6.31231 6.06611 6.12295 5.7292 5.78591C5.39217 5.449 5.2028 4.99194 5.2028 4.51534C5.2028 4.03874 5.39216 3.58168 5.7292 3.24476C6.06611 2.90773 6.52317 2.71837 6.99977 2.71837C7.47637 2.71837 7.93343 2.90772 8.27035 3.24476C8.60738 3.58168 8.79674 4.03874 8.79674 4.51534C8.79674 4.99194 8.60739 5.449 8.27035 5.78591C7.93343 6.12294 7.47637 6.31231 6.99977 6.31231V6.3122Z"
                        fill="#1D9BF0"
                      />
                    </svg>
                    <span className="text-xs my-auto silka-medium text-[#1D9BF0]">
                      Impressions
                    </span>
                  </div>
                  <p className="silka-medium text-gray-700 text-lg">
                    {formatLargeNumber(
                      isPremium
                        ? currentTweetData?.non_public_metrics
                            ?.impression_count
                        : between(1, 10000),
                      0
                    )}
                  </p>
                </div>
                <div className="bg-[#E0ECF5] p-2 w-1/4 rounded-lg flex flex-col space-y-1">
                  <div className="flex flex-row space-x-1.5">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 12 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="my-auto"
                    >
                      <path
                        d="M5.90179 5.98717C7.55095 5.98717 8.89537 4.64274 8.89537 2.99358C8.89537 1.34442 7.55095 0 5.90179 0C4.25263 0 2.9082 1.34442 2.9082 2.99358C2.9082 4.64274 4.25263 5.98717 5.90179 5.98717Z"
                        fill="#1D9BF0"
                      />
                      <path
                        d="M7.6404 6.47083H4.16282C2.08342 6.47083 0.398438 8.15587 0.398438 10.2352V12.8524C0.398438 13.4799 0.918217 13.9997 1.54568 13.9997H10.2575C10.885 13.9997 11.4048 13.4799 11.4048 12.8524L11.4049 10.2351C11.4049 8.15568 9.71987 6.4707 7.64053 6.4707L7.6404 6.47083Z"
                        fill="#1D9BF0"
                      />
                    </svg>
                    <span className="text-xs my-auto silka-medium text-[#1D9BF0]">
                      Profile Clicks
                    </span>
                  </div>
                  <p className="silka-medium text-gray-700 text-lg">
                    {formatLargeNumber(
                      isPremium
                        ? currentTweetData?.non_public_metrics
                            ?.user_profile_clicks
                        : between(1, 10000),
                      0
                    )}
                  </p>
                </div>
                <div className="bg-[#E0ECF5] p-2 w-1/4 rounded-lg flex flex-col space-y-1">
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
                        d="M5.51539 9.36048C5.29136 9.36048 5.06731 9.27474 4.89671 9.10412C3.18773 7.39425 3.18773 4.61336 4.89671 2.90427L6.51642 1.28367C7.3442 0.455901 8.44593 0 9.6166 0C10.7873 0 11.8882 0.455876 12.716 1.28367C13.5438 2.11147 14.0006 3.21318 14.0006 4.38385C14.0006 5.55452 13.5447 6.65545 12.716 7.48328C12.3739 7.8254 11.8208 7.8254 11.4788 7.48328C11.1366 7.14116 11.1366 6.58723 11.4788 6.24601C11.9758 5.74813 12.2506 5.08657 12.2506 4.3839C12.2506 3.68034 11.9767 3.01877 11.4788 2.52089C10.4838 1.52591 8.7486 1.52591 7.75354 2.52089L6.13383 4.14061C5.10739 5.16792 5.10739 6.83852 6.13383 7.86582C6.47595 8.20794 6.47595 8.761 6.13383 9.10309C5.96321 9.27459 5.73918 9.36033 5.51514 9.36033L5.51539 9.36048ZM4.38398 14C3.21321 14 2.11237 13.5441 1.28455 12.7155C0.456776 11.8886 0 10.7868 0 9.61602C0 8.44526 0.455876 7.34442 1.28367 6.5166C1.62579 6.17448 2.17885 6.17448 2.52094 6.5166C2.86306 6.85872 2.86306 7.41177 2.52094 7.75387C2.02307 8.25087 1.74912 8.91331 1.74912 9.61687C1.74912 10.3204 2.02297 10.982 2.52094 11.479C3.5167 12.474 5.2501 12.474 6.24616 11.479L7.73287 9.99227C8.22987 9.49527 8.50469 8.8337 8.50469 8.13016C8.50469 7.42662 8.23085 6.76504 7.73287 6.26716C7.39075 5.92594 7.39075 5.37198 7.73287 5.02989C8.07499 4.68777 8.62804 4.68777 8.97014 5.02989C9.79791 5.85766 10.2547 6.95852 10.2547 8.13006C10.2547 9.30083 9.79881 10.4026 8.97014 11.2295L7.48343 12.7162C6.65566 13.544 5.55479 13.9999 4.384 13.9999L4.38398 14Z"
                        fill="#1D9BF0"
                      />
                    </svg>
                    <span className="text-xs my-auto silka-medium text-[#1D9BF0]">
                      Link Clicks
                    </span>
                  </div>
                  <p className="silka-medium text-gray-700 text-lg">
                    {currentTweetData?.non_public_metrics
                      ?.url_link_clicks
                      ? formatLargeNumber(
                          currentTweetData.non_public_metrics
                            .url_link_clicks,
                          0
                        )
                      : '-'}
                  </p>
                </div>
                <div className="bg-[#E0ECF5] p-2 w-1/4 rounded-lg flex flex-col space-y-1">
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
                        fill="#1D9BF0"
                      />
                    </svg>
                    <span className="text-xs my-auto silka-medium text-[#1D9BF0]">
                      Engagement
                    </span>
                  </div>
                  <p className="silka-medium text-gray-700 text-lg">
                    {currentTweetData?.non_public_metrics
                      .impression_count
                      ? (isPremium
                          ? ((currentTweetData?.public_metrics
                              .like_count +
                              currentTweetData?.public_metrics
                                .reply_count +
                              currentTweetData?.public_metrics
                                .retweet_count +
                              currentTweetData?.non_public_metrics
                                .user_profile_clicks +
                              (currentTweetData?.non_public_metrics
                                .url_link_clicks
                                ? currentTweetData?.non_public_metrics
                                    .url_link_clicks
                                : 0)) /
                              currentTweetData?.non_public_metrics
                                .impression_count) *
                            100
                          : between(1, 500) / 100
                        ).toFixed(1) + '%'
                      : '0%'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DialogPrimitive.Content>
      </Transition.Child>
    </Transition.Root>
  );
}

function Tweet({
  value,
  dialogOpen,
  setDialogOpen,
  currentTweetData,
  setCurrentTweetData,
  currentTweetId,
  setCurrentTweetId,
  isPremium,
}: TweetProps) {
  return (
    <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:space-x-3 w-full">
      <div className="w-full md:w-1/3">
        <DialogPrimitive.Root
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        >
          <DialogPrimitive.Trigger asChild>
            <button
              onClick={() => {
                setCurrentTweetId(value.id);
                setCurrentTweetData({
                  public_metrics: value.public_metrics,
                  non_public_metrics: value.non_public_metrics,
                });
              }}
              className="p-2.5 hover:bg-gray-50 rounded-lg w-full border flex flex-col justify-start items-start"
            >
              <p className="text-sm text-gray-700 silka-regular text-start">
                {value.text.length > 68
                  ? value.text.slice(0, 68) + '...'
                  : value.text}
              </p>
            </button>
          </DialogPrimitive.Trigger>
          <SingleTweetDialog
            dialogOpen={dialogOpen}
            currentTweetId={currentTweetId}
            currentTweetData={currentTweetData}
            isPremium={isPremium}
          />
        </DialogPrimitive.Root>
      </div>
      <div className="flex flex-row my-auto w-full md:w-2/3 space-x-3">
        <div className="w-[12.5%] my-auto flex flex-col justify-center items-center">
          <p className="my-auto text-sm text-[#818181] silka-medium">
            {formatLargeNumber(value.public_metrics.like_count, 0)}
          </p>
        </div>
        <div className="w-[12.5%] my-auto flex flex-col justify-center items-center">
          <p className="my-auto text-sm text-[#818181] silka-medium">
            {formatLargeNumber(value.public_metrics.reply_count, 0)}
          </p>
        </div>
        <div className="w-[12.5%] my-auto flex flex-col justify-center items-center">
          <p className="my-auto text-sm text-[#818181] silka-medium">
            {formatLargeNumber(value.public_metrics.retweet_count, 0)}
          </p>
        </div>
        <div className="w-[12.5%] my-auto flex flex-col justify-center items-center">
          <p className="my-auto text-sm text-[#818181] silka-medium">
            {formatLargeNumber(value.public_metrics.quote_count, 0)}
          </p>
        </div>
        <div className="w-[12.5%] my-auto flex flex-col justify-center items-center">
          <p className="my-auto text-sm text-[#818181] silka-medium">
            {formatLargeNumber(
              value.non_public_metrics.impression_count,
              0
            )}
          </p>
        </div>
        <div className="w-[12.5%] my-auto flex flex-col justify-center items-center">
          <p className="my-auto text-sm text-[#818181] silka-medium">
            {formatLargeNumber(
              value.non_public_metrics.user_profile_clicks,
              0
            )}
          </p>
        </div>
        <div className="w-[12.5%] my-auto flex flex-col justify-center items-center">
          <p className="my-auto text-sm text-[#818181] silka-medium">
            {value.non_public_metrics.url_link_clicks
              ? formatLargeNumber(
                  isPremium
                    ? value.non_public_metrics.url_link_clicks
                    : between(1, 10000),
                  0
                )
              : '-'}
          </p>
        </div>
        <div className="w-[12.5%] my-auto flex flex-col justify-center items-center">
          <p className="my-auto text-sm text-[#818181] silka-medium">
            {value.non_public_metrics.impression_count
              ? (isPremium
                  ? ((value.public_metrics.like_count +
                      value.public_metrics.reply_count +
                      value.public_metrics.retweet_count +
                      value.non_public_metrics.user_profile_clicks +
                      (value.non_public_metrics.url_link_clicks
                        ? value.non_public_metrics.url_link_clicks
                        : 0)) /
                      value.non_public_metrics.impression_count) *
                    100
                  : between(1, 500) / 100
                ).toFixed(1) + '%'
              : '0%'}
          </p>
        </div>
      </div>
    </div>
  );
}

export function SingleTweetAnalytics({
  workspaceId,
  isPremium,
}: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentTweetId, setCurrentTweetId] = useState<any>(null);
  const [currentTweetData, setCurrentTweetData] = useState<any>(null);
  const [tweetsData, setTweetsData] = useState([]);

  useEffect(() => {
    getSingleTweets(workspaceId).then((value) => {
      setTweetsData(value);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div className="flex flex-col w-full space-y-5 mt-9 mb-16 md:mb-20 xl:mb-24">
      <h3 className="text-xl silka-semibold">Tweets</h3>
      <div className="flex flex-row w-full md:space-x-3">
        <p className="hidden md:flex w-1/3 text-xs silka-medium my-auto text-[#818181]">
          Tweet
        </p>
        <div className="my-auto flex flex-row space-x-3 w-full md:w-2/3">
          <div className="w-[12.5%] flex flex-col justify-center items-center">
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
          <div className="w-[12.5%] flex flex-col justify-center items-center">
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
                  Replies
                </p>
              </HoverCardPrimitive.Content>
            </HoverCardPrimitive.Root>
          </div>
          <div className="w-[12.5%] flex flex-col justify-center items-center">
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
                  Retweets
                </p>
              </HoverCardPrimitive.Content>
            </HoverCardPrimitive.Root>
          </div>
          <div className="w-[12.5%] flex my-auto flex-col justify-center items-center">
            <HoverCardPrimitive.Root>
              <HoverCardPrimitive.Trigger asChild>
                <svg
                  width="14"
                  height="11"
                  viewBox="0 0 15 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.9429 2.87746C14.7808 1.31538 13.4692 0.077464 11.8924 0.00377989C10.0356 -0.0846252 8.50293 1.38907 8.50293 3.23114C8.50293 4.58693 9.34298 5.73638 10.5218 6.22272L8.70925 9.9364C8.60604 10.1574 8.76815 10.4227 9.00396 10.4227H10.2418C10.345 10.4227 10.4481 10.3785 10.507 10.2901L14.3976 5.0438C14.8103 4.42477 15.0166 3.67322 14.943 2.87738L14.9429 2.87746Z"
                    fill="#9B9B9B"
                  />
                  <path
                    d="M4.34748 0.00377989C2.49066 -0.0846252 0.958008 1.38907 0.958008 3.23114C0.958008 4.58693 1.79806 5.73638 2.97693 6.22272L1.16432 9.9364C1.06112 10.1574 1.22323 10.4227 1.45903 10.4227H2.6969C2.80011 10.4227 2.90321 10.3785 2.96211 10.2901L6.85263 5.0438C7.26526 4.43956 7.47158 3.68801 7.38316 2.89217C7.22115 1.31528 5.90958 0.0774351 4.34737 0.00375097L4.34748 0.00377989Z"
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
                  Quotes
                </p>
              </HoverCardPrimitive.Content>
            </HoverCardPrimitive.Root>
          </div>
          <div className="w-[12.5%] flex flex-col justify-center items-center">
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
                  Impressions
                </p>
              </HoverCardPrimitive.Content>
            </HoverCardPrimitive.Root>
          </div>
          <div className="w-[12.5%] flex flex-col justify-center items-center">
            <HoverCardPrimitive.Root>
              <HoverCardPrimitive.Trigger asChild>
                <svg
                  width="12"
                  height="14"
                  viewBox="0 0 12 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.90179 5.98717C7.55095 5.98717 8.89537 4.64274 8.89537 2.99358C8.89537 1.34442 7.55095 0 5.90179 0C4.25263 0 2.9082 1.34442 2.9082 2.99358C2.9082 4.64274 4.25263 5.98717 5.90179 5.98717Z"
                    fill="#9B9B9B"
                  />
                  <path
                    d="M7.6404 6.47083H4.16282C2.08342 6.47083 0.398438 8.15587 0.398438 10.2352V12.8524C0.398438 13.4799 0.918217 13.9997 1.54568 13.9997H10.2575C10.885 13.9997 11.4048 13.4799 11.4048 12.8524L11.4049 10.2351C11.4049 8.15568 9.71987 6.4707 7.64053 6.4707L7.6404 6.47083Z"
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
                  Profile Clicks
                </p>
              </HoverCardPrimitive.Content>
            </HoverCardPrimitive.Root>
          </div>
          <div className="w-[12.5%] flex flex-col justify-center items-center">
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
                    d="M5.51539 9.36048C5.29136 9.36048 5.06731 9.27474 4.89671 9.10412C3.18773 7.39425 3.18773 4.61336 4.89671 2.90427L6.51642 1.28367C7.3442 0.455901 8.44593 0 9.6166 0C10.7873 0 11.8882 0.455876 12.716 1.28367C13.5438 2.11147 14.0006 3.21318 14.0006 4.38385C14.0006 5.55452 13.5447 6.65545 12.716 7.48328C12.3739 7.8254 11.8208 7.8254 11.4788 7.48328C11.1366 7.14116 11.1366 6.58723 11.4788 6.24601C11.9758 5.74813 12.2506 5.08657 12.2506 4.3839C12.2506 3.68034 11.9767 3.01877 11.4788 2.52089C10.4838 1.52591 8.7486 1.52591 7.75354 2.52089L6.13383 4.14061C5.10739 5.16792 5.10739 6.83852 6.13383 7.86582C6.47595 8.20794 6.47595 8.761 6.13383 9.10309C5.96321 9.27459 5.73918 9.36033 5.51514 9.36033L5.51539 9.36048ZM4.38398 14C3.21321 14 2.11237 13.5441 1.28455 12.7155C0.456776 11.8886 0 10.7868 0 9.61602C0 8.44526 0.455876 7.34442 1.28367 6.5166C1.62579 6.17448 2.17885 6.17448 2.52094 6.5166C2.86306 6.85872 2.86306 7.41177 2.52094 7.75387C2.02307 8.25087 1.74912 8.91331 1.74912 9.61687C1.74912 10.3204 2.02297 10.982 2.52094 11.479C3.5167 12.474 5.2501 12.474 6.24616 11.479L7.73287 9.99227C8.22987 9.49527 8.50469 8.8337 8.50469 8.13016C8.50469 7.42662 8.23085 6.76504 7.73287 6.26716C7.39075 5.92594 7.39075 5.37198 7.73287 5.02989C8.07499 4.68777 8.62804 4.68777 8.97014 5.02989C9.79791 5.85766 10.2547 6.95852 10.2547 8.13006C10.2547 9.30083 9.79881 10.4026 8.97014 11.2295L7.48343 12.7162C6.65566 13.544 5.55479 13.9999 4.384 13.9999L4.38398 14Z"
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
                  Link Clicks
                </p>
              </HoverCardPrimitive.Content>
            </HoverCardPrimitive.Root>
          </div>
          <div className="w-[12.5%] flex flex-col justify-center items-center">
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
        {tweetsData?.length == 0 ? (
          <div className="mt-4 h-72 rounded-xl w-full border border-gray-300 border-dashed flex flex-col justify-center items-center">
            <div className="p-2.5 rounded-full bg-[#E0ECF5] flex flex-col justify-center items-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_931_2)">
                  <path
                    d="M24 4.55705C23.117 4.94905 22.168 5.21305 21.172 5.33205C22.189 4.72305 22.97 3.75805 23.337 2.60805C22.386 3.17205 21.332 3.58205 20.21 3.80305C19.313 2.84605 18.032 2.24805 16.616 2.24805C13.437 2.24805 11.101 5.21405 11.819 8.29305C7.728 8.08805 4.1 6.12805 1.671 3.14905C0.381 5.36205 1.002 8.25705 3.194 9.72305C2.388 9.69705 1.628 9.47605 0.965 9.10705C0.911 11.388 2.546 13.522 4.914 13.997C4.221 14.185 3.462 14.229 2.69 14.081C3.316 16.037 5.134 17.46 7.29 17.5C5.22 19.123 2.612 19.848 0 19.54C2.179 20.937 4.768 21.752 7.548 21.752C16.69 21.752 21.855 14.031 21.543 7.10605C22.505 6.41105 23.34 5.54405 24 4.55705Z"
                    fill="#1D9BF0"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_931_2">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <h3 className="mt-4 silka-semibold text-gray-900 text-xl">
              No Recent Tweets Found!
            </h3>
            <p className="text-sm silka-regular w-1/2 text-center mt-3 text-gray-400">
              Tweet more to show your single tweet analytics.
            </p>
          </div>
        ) : (
          <>
            {tweetsData?.map((value: any, index: number) => {
              return (
                <Tweet
                  key={index}
                  value={value}
                  dialogOpen={dialogOpen}
                  isPremium={isPremium}
                  setDialogOpen={setDialogOpen}
                  currentTweetId={currentTweetId}
                  setCurrentTweetId={setCurrentTweetId}
                  currentTweetData={currentTweetData}
                  setCurrentTweetData={setCurrentTweetData}
                />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
