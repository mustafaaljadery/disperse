import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../../utils/apiUrl';
import toast, { Toaster } from 'react-hot-toast';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import cx from 'classnames';

interface Props {
  workspaceId: string;
}

interface TweetAndReplyComponentProps {
  value: any;
  workspaceId: string;
  index: number;
  user: any;
  likeAndReply: boolean;
  tweets: any;
  setTweets: Dispatch<SetStateAction<any>>;
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

function formatDate(created_at: string) {
  const date = new Date(created_at).getTime();
  let end = Date.now();
  const minutes = Math.floor((end - date) / (1000 * 60));
  const hours = Math.floor((end - date) / (1000 * 60 * 60));
  const days = Math.floor((end - date) / (1000 * 60 * 60 * 24));

  if (minutes < 60) {
    return minutes + (minutes == 1 ? ' minute ago' : ' minutes ago');
  } else if (hours < 24) {
    return hours + (hours == 1 ? ' hour ago' : ' hours ago');
  } else {
    return days + (days == 1 ? ' day ago' : ' days ago');
  }
}

async function getRepliesAndMentions(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}twitter/read/repliesandmentions`,
      {
        params: { workspaceId: workspaceId },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function replyTweet(
  workspaceId: string,
  tweetId: string,
  text: string
) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.post(
      `${apiUrl()}twitter/create/replytweet`,
      null,
      {
        params: {
          workspaceId: workspaceId,
          text: text,
          tweetId: tweetId,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function retweetTweet(workspaceId: string, tweetId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.post(
      `${apiUrl()}twitter/create/retweettweet`,
      null,
      {
        params: { workspaceId: workspaceId, tweetId: tweetId },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function unretweetTweet(workspaceId: string, tweetId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.post(
      `${apiUrl()}twitter/create/unretweettweet`,
      null,
      {
        params: { workspaceId: workspaceId, tweetId: tweetId },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function likeTweet(workspaceId: string, tweetId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.post(
      `${apiUrl()}twitter/create/liketweet`,
      null,
      {
        params: { workspaceId: workspaceId, tweetId: tweetId },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function unlikeTweet(workspaceId: string, tweetId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.post(
      `${apiUrl()}twitter/create/unliketweet`,
      null,
      {
        params: { workspaceId: workspaceId, tweetId: tweetId },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function addRemoveTweet(workspaceId: string, tweetId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.post(
      `${apiUrl()}twitter/create/removedlisttweet`,
      null,
      {
        params: { workspaceId: workspaceId, tweetId: tweetId },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

function TweeetAndReplyComponent({
  workspaceId,
  value,
  index,
  user,
  tweets,
  setTweets,
  likeAndReply,
}: TweetAndReplyComponentProps) {
  const [likes, setLikes] = useState(value.public_metrics.like_count);
  const [retweets, setRetweets] = useState(
    value.public_metrics.retweet_count
  );
  const [text, setText] = useState('');
  const [liked, setLiked] = useState(false);
  const [retweeted, setRetweeted] = useState(false);
  const [likeHovered, setLikeHovered] = useState(false);
  const [retweetHovered, setRetweetHovered] = useState(false);

  return (
    <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:space-x-5 w-full">
      <div className="w-full md:w-1/2 bg-gray-50 p-4 rounded-lg my-auto">
        <div className="flex flex-col">
          <div className="flex flex-row space-x-3">
            <img
              //@ts-ignore
              crossorigin="anonymous"
              src={user?.profile_image_url}
              className="rounded-full h-[42px] w-[42px]"
            />
            <div className="flex flex-col space-y-1">
              <p className="text-gray-900 silka-semibold text-xs xl:text-sm">
                {user?.name}
              </p>
              <span className="text-xs xl:text-sm silka-regular text-gray-500">
                @{user?.username}
              </span>
            </div>
          </div>
          <div className="mt-4">
            <p className="silka-regular text-sm xl:text-base text-gray-800">
              {value.text}
            </p>
          </div>
          <div className="mt-4 flex flex-row justify-between items-between">
            <div className="flex flex-row space-x-2 lg:space-x-4 my-auto">
              <button
                onMouseEnter={() => {
                  setLikeHovered(true);
                }}
                onMouseLeave={() => {
                  setLikeHovered(false);
                }}
                onClick={() => {
                  if (liked) {
                    setLiked(false);
                    unlikeTweet(workspaceId, value.id);
                    addRemoveTweet(workspaceId, value.id);
                    setLikes(likes - 1);
                    toast.success('Unliked!', {
                      className: 'silka-medium text-sm text-gray-900',
                    });
                  } else {
                    setLiked(true);
                    likeTweet(workspaceId, value.id);
                    addRemoveTweet(workspaceId, value.id);
                    setLikes(likes + 1);
                    toast.success('Liked!', {
                      className: 'silka-medium text-sm text-gray-900',
                    });
                  }
                }}
                className={
                  'flex flex-row space-x-2 px-3 md:px-4 py-1 md:py-1.5 rounded ' +
                  (liked ? 'hover:bg-gray-200' : 'hover:bg-[#F6DFEA]')
                }
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="my-auto"
                >
                  <path
                    d="M16.6973 5.50015C15.4753 5.44015 14.0183 6.01015 12.8073 7.66015L12.0023 8.75015L11.1963 7.66015C9.98431 6.01015 8.52631 5.44015 7.30431 5.50015C6.06131 5.57015 4.95531 6.28015 4.39431 7.41015C3.84231 8.53015 3.76131 10.1901 4.87331 12.2301C5.94731 14.2001 8.13031 16.5001 12.0023 18.8401C15.8723 16.5001 18.0543 14.2001 19.1283 12.2301C20.2393 10.1901 20.1583 8.53015 19.6053 7.41015C19.0443 6.28015 17.9393 5.57015 16.6973 5.50015ZM20.8843 13.1901C19.5333 15.6701 16.8833 18.3101 12.5053 20.8601L12.0023 21.1601L11.4983 20.8601C7.11931 18.3101 4.46931 15.6701 3.11631 13.1901C1.75631 10.6901 1.70631 8.33015 2.60231 6.52015C3.48931 4.73015 5.24931 3.61015 7.20331 3.51015C8.85431 3.42015 10.5713 4.07015 12.0013 5.52015C13.4303 4.07015 15.1473 3.42015 16.7973 3.51015C18.7513 3.61015 20.5113 4.73015 21.3983 6.52015C22.2943 8.33015 22.2443 10.6901 20.8843 13.1901Z"
                    fill={liked ? '#F91980' : '#363636'}
                  />
                </svg>
                <p
                  className={
                    'silka-medium my-auto text-sm ' +
                    (liked ? 'text-[#F91980]' : 'text-[#363636]')
                  }
                >
                  {likes}
                </p>
              </button>
              <button
                onMouseEnter={() => {
                  setRetweetHovered(true);
                }}
                onMouseLeave={() => {
                  setRetweetHovered(false);
                }}
                onClick={() => {
                  if (retweeted) {
                    setRetweeted(false);
                    unretweetTweet(workspaceId, value.id);
                    addRemoveTweet(workspaceId, value.id);
                    setRetweets(retweets - 1);
                    toast.success('Unretweeted!', {
                      className: 'silka-medium text-sm text-gray-900',
                    });
                  } else {
                    setRetweeted(true);
                    retweetTweet(workspaceId, value.id);
                    addRemoveTweet(workspaceId, value.id);
                    setRetweets(retweets + 1);
                    toast.success('Retweeted!', {
                      className: 'silka-medium text-sm text-gray-900',
                    });
                  }
                }}
                className={
                  'flex flex-row space-x-2 px-3 md:px-4 py-1 md:py-1.5 rounded ' +
                  (retweeted
                    ? 'hover:bg-gray-200'
                    : 'hover:bg-[#E7F2E4]')
                }
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="my-auto"
                >
                  <path
                    d="M4.50036 3.88086L8.93236 8.02086L7.56836 9.48086L5.50036 7.55086V16.0009C5.50036 17.1009 6.39636 18.0009 7.50036 18.0009H13.0004V20.0009H7.50036C5.29136 20.0009 3.50036 18.2109 3.50036 16.0009V7.55086L1.43236 9.48086L0.0683594 8.02086L4.50036 3.88086ZM16.5004 6.00086H11.0004V4.00086H16.5004C18.7094 4.00086 20.5004 5.79086 20.5004 8.00086V16.4509L22.5684 14.5209L23.9324 15.9809L19.5004 20.1209L15.0684 15.9809L16.4324 14.5209L18.5004 16.4509V8.00086C18.5004 6.90086 17.6044 6.00086 16.5004 6.00086Z"
                    fill={retweeted ? '#63D346' : '#363636'}
                  />
                </svg>
                <p
                  className={
                    'text-sm my-auto silka-medium ' +
                    (retweeted ? 'text-[#63D346]' : 'text-[#363636]')
                  }
                >
                  {retweets}
                </p>
              </button>
            </div>
            <div className="flex flex-row my-auto space-x-4">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  addRemoveTweet(workspaceId, value.id);
                  setTweets(
                    tweets.filter(function (item: any, i: number) {
                      return i !== index;
                    })
                  );
                  toast.success('Skipped!', {
                    className: 'silka-medium text-sm text-gray-900',
                  });
                }}
                className="my-auto text-[#363636] silka-medium border rounded hover:bg-gray-200 text-xs sm:text-[11px] xl:text-xs px-4 py-1.5"
              >
                Skip
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  likeTweet(workspaceId, value.id);
                  addRemoveTweet(workspaceId, value.id);
                  setTweets(
                    tweets.filter(function (item: any, i: number) {
                      return i !== index;
                    })
                  );
                  toast.success('Liked & Skipped!', {
                    className: 'silka-medium text-sm text-gray-900',
                  });
                }}
                className="bg-[#363636] text-white rounded hover:opacity-90 silka-medium text-xs sm:text-[11px] px-4 py-1.5 my-auto"
              >
                Like & Skip
              </button>
            </div>
          </div>
        </div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (text.length > 280) {
            toast.error('Tweet Too Long', {
              className: 'silka-medium text-gray-900 text-sm',
            });
          } else {
            if (!liked && likeAndReply) {
              setLiked(true);
              likeTweet(workspaceId, value.id);
            }
            replyTweet(workspaceId, value.id, text);
            addRemoveTweet(workspaceId, value.id);
            setText('');
            setTweets(
              tweets.filter(function (item: any, i: number) {
                return i !== index;
              })
            );
            toast.success('Reply tweeted!', {
              className: 'silka-medium text-gray-900 text-sm',
            });
          }
        }}
        className="w-full md:w-1/2 my-auto flex flex-col space-y-2"
      >
        <textarea
          placeholder="Tweet reply..."
          onChange={(e) => {
            setText(e.target.value);
          }}
          className="w-full h-36 rounded-lg bg-gray-100 resize-none border-none focus:ring-[#FF623D]"
          required
          value={text}
        />
        <div className="flex flex-row justify-between items-between">
          <div className="space-x-5 my-auto">
            <div className="flex flex-row my-auto space-x-1">
              <p
                className={
                  'text-sm silka-medium ' +
                  (text.length > 280
                    ? 'text-[#FF0000]'
                    : 'text-gray-800')
                }
              >
                {text.length}
              </p>
              <p className="text-sm silka-medium text-gray-800">/</p>
              <p className="text-sm silka-medium text-gray-800">
                280
              </p>
            </div>
          </div>
          <button
            type="submit"
            className="bg-[#FF623D] hover:opacity-90 text-xs px-4 py-1.5 text-white silka-medium rounded"
          >
            Reply
          </button>
        </div>
      </form>
    </div>
  );
}

export function RepliesAndMentions({ workspaceId }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [likeAndReply, setLikeAndReply] = useState(true);
  const [tweets, setTweets] = useState<any>(null);
  const [users, setUsers] = useState<any>(null);
  const [meta, setMeta] = useState<any>(null);

  useEffect(() => {
    getRepliesAndMentions(workspaceId).then((value) => {
      setTweets(value.tweets);
      setUsers(value.users);
      setMeta(value.meta);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-row justify-end items-end">
        <button
          onClick={() => {
            setLikeAndReply(!likeAndReply);
          }}
          className="flex my-auto flex-row space-x-2"
        >
          <p className="text-sm silka-medium text-gray-800">
            auto-like when replying
          </p>
          <SwitchPrimitive.Root
            checked={likeAndReply}
            className={cx(
              'group my-auto',
              'radix-state-checked:bg-[#363636]',
              'radix-state-unchecked:bg-gray-200',
              'relative inline-flex h-[18px] w-[34px] flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out',
              'focus:outline-none focus-visible:ring-0'
            )}
          >
            <SwitchPrimitive.Thumb
              className={cx(
                'group-radix-state-checked:translate-x-4',
                'group-radix-state-unchecked:translate-x-0',
                'pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out'
              )}
            />
          </SwitchPrimitive.Root>
        </button>
      </div>
      {isLoading ? (
        <div className="flex flex-col space-y-10 mt-8 mb-24">
          <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row w-full md:space-x-5">
            <div className="h-44 w-full md:w-1/2 my-auto bg-gray-200 rounded-lg animate-pulse" />
            <div className="w-full md:w-1/2 my-auto flex flex-col space-y-3">
              <div className="h-32 w-full bg-gray-200 rounded-lg animate-pulse" />
              <div className="flex flex-row justify-end items-end">
                <div className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row w-full md:space-x-5">
            <div className="h-44 w-full md:w-1/2 my-auto bg-gray-200 rounded-lg animate-pulse" />
            <div className="w-full md:w-1/2 my-auto flex flex-col space-y-3">
              <div className="h-32 w-full bg-gray-200 rounded-lg animate-pulse" />
              <div className="flex flex-row justify-end items-end">
                <div className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row w-full md:space-x-5">
            <div className="h-44 w-full md:w-1/2 my-auto bg-gray-200 rounded-lg animate-pulse" />
            <div className="w-full md:w-1/2 my-auto flex flex-col space-y-3">
              <div className="h-32 w-full bg-gray-200 rounded-lg animate-pulse" />
              <div className="flex flex-row justify-end items-end">
                <div className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row w-full md:space-x-5">
            <div className="h-44 w-full md:w-1/2 my-auto bg-gray-200 rounded-lg animate-pulse" />
            <div className="w-full md:w-1/2 my-auto flex flex-col space-y-3">
              <div className="h-32 w-full bg-gray-200 rounded-lg animate-pulse" />
              <div className="flex flex-row justify-end items-end">
                <div className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col mt-8 space-y-10 w-full mb-24">
          {tweets?.length == 0 ? (
            <div className="h-72 rounded-xl w-full border border-gray-300 border-dashed flex flex-col justify-center items-center">
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
                You&apos;re All Caught Up!
              </h3>
              <p className="text-sm silka-regular w-1/2 text-center mt-3 text-gray-400">
                You are up to date with all of your followers, come
                back later for more tweets to engage with.
              </p>
            </div>
          ) : (
            <>
              {tweets?.map((value: any, index: number) => {
                let userIndex = 0;
                for (let i = 0; i < users.length; i++) {
                  if (value.author_id == users[i].id) {
                    userIndex = i;
                    break;
                  }
                }
                return (
                  <TweeetAndReplyComponent
                    key={index}
                    value={value}
                    index={index}
                    user={users[userIndex]}
                    workspaceId={workspaceId}
                    tweets={tweets}
                    setTweets={setTweets}
                    likeAndReply={likeAndReply}
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
