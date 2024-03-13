import axios from 'axios';
import axiosRetry from 'axios-retry';
import {
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  useRef,
} from 'react';
import { apiUrl } from '../../../../utils/apiUrl';
import toast, { Toaster } from 'react-hot-toast';
import { ThreadOptions } from '../options/ThreadOptions';

interface ThreadProps {
  workspaceId: string;
  selectedThread: any;
  setSelectedThread: Dispatch<SetStateAction<any>>;
  setRightThreadSelected: Dispatch<SetStateAction<string>>;
  selectedThreadTweet: any;
  setSelectedThreadTweet: Dispatch<SetStateAction<any>>;
  setRefetchThreadDrafts: Dispatch<SetStateAction<boolean>>;
  currentThreadTweetMedia: any;
  setCurrentThreadTweetMedia: Dispatch<SetStateAction<any>>;
  threadTweets: any;
  setThreadTweets: Dispatch<SetStateAction<any>>;
  isPremium: boolean;
  userId: string;
}

interface FullTweetProps {
  userData: any;
  tweetData: any;
  threadTweets: any;
  setThreadTweets: Dispatch<SetStateAction<any>>;
  index: number;
  selectedTweet: any;
  setSelectedTweet: Dispatch<SetStateAction<any>>;
  selectedThread: any;
  setSelectedThread: Dispatch<SetStateAction<any>>;
  workspaceId: string;
  selectedTweetIndex: number;
  setSelectedTweetIndex: Dispatch<SetStateAction<number>>;
  fetchingData: boolean;
  setFetchingData: Dispatch<SetStateAction<boolean>>;
  setRefetchThreadDrafts: Dispatch<SetStateAction<boolean>>;
  creatingLoading: boolean;
  setCreatingLoading: Dispatch<SetStateAction<boolean>>;
  currentThreadTweetMedia: any;
  setCurrentThreadTweetMedia: Dispatch<SetStateAction<any>>;
  setRightThreadSelected: Dispatch<SetStateAction<any>>;
  isLoading: boolean;
}

interface SmallTweetProps {
  userData: any;
  tweetData: any;
  index: number;
  setSelectedTweetIndex: Dispatch<SetStateAction<number>>;
  setSelectedTweet: Dispatch<SetStateAction<number>>;
  threadTweets: any;
  isLoading: boolean;
}

async function createDraftThread(
  workspaceId: string,
  tweetsNumber: number
) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.post(
      `${apiUrl()}twitter/create/draftthread`,
      null,
      {
        params: {
          workspaceId: workspaceId,
          tweetsNumber: tweetsNumber,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function createDraftThreadTweet(
  threadId: string,
  index: number,
  tweetsNumber: number,
  workspaceId: string
) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.post(
      `${apiUrl()}twitter/create/draftthreadtweet`,
      null,
      {
        params: {
          threadId: threadId,
          index: index,
          tweetsNumber: tweetsNumber,
          workspaceId: workspaceId,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function updateDraftThreadTweet(
  draftId: string,
  text: string,
  file: string,
  workspaceId: string,
  selectedThread: string
) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.post(
      `${apiUrl()}twitter/update/draftthreadtweet`,
      null,
      {
        params: {
          draftId: draftId,
          text: text,
          file: file,
          workspaceId: workspaceId,
          selectedThread: selectedThread,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function getThreadData(draftId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}twitter/read/threaddata`,
      {
        params: {
          draftId: draftId,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function swapThreadTweets(
  threadId: string,
  first_index: number,
  second_index: number,
  workspaceId: string
) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.post(
      `${apiUrl()}twitter/update/swapthreadtweet`,
      null,
      {
        params: {
          threadId: threadId,
          first_index: first_index,
          second_index: second_index,
          workspaceId: workspaceId,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function deleteThreadTweet(
  threadId: string,
  draftId: string,
  workspaceId: string
) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.post(
      `${apiUrl()}twitter/delete/draftthreadtweet`,
      null,
      {
        params: {
          threadId: threadId,
          draftId: draftId,
          workspaceId: workspaceId,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function getProfileData(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}twitter/read/userdata`,
      {
        params: { workspaceId: workspaceId },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

function SmallTweet({
  userData,
  tweetData,
  index,
  setSelectedTweetIndex,
  setSelectedTweet,
  threadTweets,
  isLoading,
}: SmallTweetProps) {
  return (
    <button
      onClick={() => {
        setSelectedTweet(threadTweets[index].draftId);
        setSelectedTweetIndex(index);
      }}
      className="flex flex-row space-x-3 hover:opacity-80"
    >
      {isLoading ? (
        <div className="h-11 w-11 rounded-full bg-gray-200 animate-pulse" />
      ) : (
        <img
          src={userData.profile_image_url}
          //@ts-ignore
          crossorigin="anonymous"
          className="h-11 w-11 rounded-full"
        />
      )}
      <div className="flex flex-col w-full">
        <div className="flex flex-row space-x-4">
          <div className="flex flex-row space-x-2">
            {isLoading ? (
              <div className="h-4 w-16 bg-gray-200 animate-pulse rounded" />
            ) : (
              <p className="text-sm silka-semibold">
                {userData?.name}
              </p>
            )}
            {isLoading ? (
              <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
            ) : (
              <p className="text-sm silka-regular text-gray-600">
                @{userData?.username}
              </p>
            )}
          </div>
        </div>
        <div className="w-full mt-1.5 flex flex-col justify-start items-start">
          <p
            className={
              'silka-regular text-sm ' +
              (tweetData.text.length > 0
                ? ''
                : 'italic text-gray-400')
            }
          >
            {tweetData.text.length > 0
              ? tweetData.text
              : 'No text in tweet...'}
          </p>
        </div>
      </div>
    </button>
  );
}

function FullTweet({
  userData,
  tweetData,
  threadTweets,
  setThreadTweets,
  index,
  selectedTweetIndex,
  setSelectedTweetIndex,
  setSelectedTweet,
  selectedTweet,
  selectedThread,
  setSelectedThread,
  workspaceId,
  fetchingData,
  setFetchingData,
  setRefetchThreadDrafts,
  creatingLoading,
  setCreatingLoading,
  currentThreadTweetMedia,
  setCurrentThreadTweetMedia,
  setRightThreadSelected,
  isLoading,
}: FullTweetProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [text, setText] = useState('');
  const tweetRef = useRef(null);

  useEffect(() => {
    setText(threadTweets[index].text);
    setCurrentThreadTweetMedia(threadTweets[index].media);
  }, [threadTweets, selectedTweet]);

  useEffect(() => {
    setIsSaving(true);
    const timer = setTimeout(() => {
      if (
        (text.length > 0 || currentThreadTweetMedia != null) &&
        !fetchingData
      ) {
        if (!selectedThread) {
          setCreatingLoading(true);
          createDraftThread(workspaceId, threadTweets.length).then(
            async (value) => {
              setSelectedThread(value.id);
              let temp: any = [];
              for (let i = 0; i < threadTweets.length; i++) {
                let temp2: any = {};
                if (i == index) {
                  setSelectedTweet(value.ids[i]);
                  await updateDraftThreadTweet(
                    value.ids[i],
                    text,
                    currentThreadTweetMedia?.id,
                    workspaceId,
                    selectedThread
                  );
                  temp2['text'] = text;
                  temp2['media'] = currentThreadTweetMedia;
                } else {
                  temp2['text'] = '';
                  temp2['media'] = null;
                }
                temp2['draftId'] = value.ids[i];
                temp.push(temp2);
              }
              setThreadTweets(temp);
              setRefetchThreadDrafts(true);
              setIsSaving(false);
              setCreatingLoading(false);
            }
          );
        } else if (!selectedTweet && !fetchingData) {
          createDraftThreadTweet(
            selectedThread,
            index,
            threadTweets.length,
            workspaceId
          ).then((value) => {
            updateDraftThreadTweet(
              value.id,
              text,
              currentThreadTweetMedia?.id,
              workspaceId,
              selectedThread
            );
            setSelectedTweet(value.id);
            let temp: any = [];
            threadTweets.forEach((v: any, i: number) => {
              if (index == i) {
                temp.push({
                  draftId: value.id,
                  text: text,
                  media: currentThreadTweetMedia,
                });
              } else {
                temp.push(v);
              }
            });
            setThreadTweets(temp);
            setRefetchThreadDrafts(true);
            setIsSaving(false);
          });
        } else if (!fetchingData) {
          updateDraftThreadTweet(
            selectedTweet,
            text,
            currentThreadTweetMedia?.id,
            workspaceId,
            selectedThread
          );
          let temp: any = [];
          threadTweets.forEach((value: any, i: number) => {
            if (index == i) {
              temp.push({
                draftId: selectedTweet,
                text: text,
                media: currentThreadTweetMedia,
              });
            } else {
              temp.push(value);
            }
          });
          setThreadTweets(temp);
          setRefetchThreadDrafts(true);
          setIsSaving(false);
        }
      } else {
        setIsSaving(false);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [text, currentThreadTweetMedia]);

  useEffect(() => {
    //@ts-ignore
    tweetRef.current.style.height = '0px';
    //@ts-ignore
    const scrollHeight = tweetRef.current.scrollHeight;
    //@ts-ignore
    tweetRef.current.style.height = scrollHeight + 'px';
  }, [text]);

  return (
    <div className="flex flex-row space-x-3 w-full">
      {isLoading ? (
        <div className="h-11 w-11 rounded-full bg-gray-200 animate-pulse" />
      ) : (
        <img
          src={userData.profile_image_url}
          //@ts-ignore
          crossorigin="anonymous"
          className="h-11 w-11 rounded-full"
        />
      )}
      <div className="flex flex-col w-full">
        <div className="flex flex-row justify-between items-between">
          <div className="flex flex-row space-x-4">
            <div className="flex flex-row space-x-2">
              {isLoading ? (
                <div className="h-4 w-16 bg-gray-200 animate-pulse rounded" />
              ) : (
                <p className="text-sm silka-semibold">
                  {userData?.name}
                </p>
              )}
              {isLoading ? (
                <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
              ) : (
                <p className="text-sm silka-regular text-gray-600">
                  @{userData?.username}
                </p>
              )}
            </div>
            {isSaving ? (
              <div className="flex flex-row space-x-1 my-auto">
                <svg
                  aria-hidden="true"
                  className="w-2 h-2 my-auto mt-0.5 text-gray-300 animate-spin fill-black"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="text-[9px] my-auto silka-regular text-gray-500">
                  Saving...
                </span>
              </div>
            ) : (
              <></>
            )}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              if (threadTweets.length == 2) {
                toast.error(
                  'Must have at least two tweets in a thread',
                  {
                    className: 'silka-medium text-sm text-gray-900',
                  }
                );
              } else {
                let temp = index == threadTweets.length - 1;
                let val = threadTweets.filter(
                  (item: any, i: number) => i != index
                );
                setThreadTweets(val);
                deleteThreadTweet(
                  selectedThread,
                  selectedTweet,
                  workspaceId
                );
                if (temp) {
                  setSelectedTweet(val[index - 1].draftId);
                  setSelectedTweetIndex(index - 1);
                } else {
                  setSelectedTweet(val[index].draftId);
                }
              }
            }}
            className="my-auto p-1 rounded-full"
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        {/*currentThreadTweetMedia ? (
          <>
            {mediaLoading ? (
              <div className="h-64 rounded-lg mt-2 bg-black flex flex-col justify-center items-center">
                <div className="flex flex-row space-x-3">
                  <span className="animate-ping h-2.5 w-2.5 my-auto rounded-full bg-[#1D9BF0] opacity-75"></span>
                  <p className="text-xs silka-medium text-white">
                    Media loading...
                  </p>
                </div>
              </div>
            ) : (
              <>
                {currentThreadTweetMedia.format == 'video/mp4' ||
                currentThreadTweetMedia.format == 'video/mov' ? (
                  <video
                    className="h-64 rounded-lg mt-2 bg-black"
                    ref={videoRef}
                    controls
                    src={mediaUrl}
                  />
                ) : (
                  <img
                    className="h-64 rounded-lg mt-2"
                    src={mediaUrl}
                  />
                )}
              </>
            )}
          </>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              setRightThreadSelected('Library');
            }}
            className="mt-2 w-full flex flex-col space-y-2 justify-center items-center border rounded-lg border-dashed h-52 hover:border-[#1D9BF0]"
          >
            <p className="text-xs silka-medium">Select Media</p>
            <p className="text-[10px] silka-regular text-gray-400">
              Leave media blank to post without media
            </p>
          </button>
        )*/}
        <textarea
          value={text}
          ref={tweetRef}
          onChange={(e) => {
            setText(e.target.value);
          }}
          placeholder="Write Tweet..."
          className="px-0 mt-1 text-sm silka-regular resize-none border-none text-gray-700 focus:border-none focus:ring-0"
        />
        <div className="mt-3 flex flex-row justify-between items-between">
          <div className="flex flex-row space-x-4 my-auto">
            <button
              onClick={(e) => {
                e.preventDefault();
                if (selectedThread) {
                  if (index == 0) {
                  } else {
                    let temp = threadTweets;
                    let val = temp[index - 1];
                    temp[index - 1] = temp[index];
                    temp[index] = val;
                    setThreadTweets(temp);
                    setSelectedTweetIndex(index - 1);
                    setSelectedTweet(threadTweets[index - 1].draftId);
                    swapThreadTweets(
                      selectedThread,
                      index,
                      index - 1,
                      workspaceId
                    );
                  }
                }
              }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.14645 2.14645C7.34171 1.95118 7.65829 1.95118 7.85355 2.14645L11.8536 6.14645C12.0488 6.34171 12.0488 6.65829 11.8536 6.85355C11.6583 7.04882 11.3417 7.04882 11.1464 6.85355L8 3.70711L8 12.5C8 12.7761 7.77614 13 7.5 13C7.22386 13 7 12.7761 7 12.5L7 3.70711L3.85355 6.85355C3.65829 7.04882 3.34171 7.04882 3.14645 6.85355C2.95118 6.65829 2.95118 6.34171 3.14645 6.14645L7.14645 2.14645Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                if (selectedThread) {
                  if (index == threadTweets.length - 1) {
                  } else {
                    let temp = threadTweets;
                    let val = temp[index + 1];
                    temp[index + 1] = temp[index];
                    temp[index] = val;
                    setThreadTweets(temp);
                    setSelectedTweetIndex(index + 1);
                    setSelectedTweet(threadTweets[index + 1].draftId);
                    swapThreadTweets(
                      selectedThread,
                      index,
                      index + 1,
                      workspaceId
                    );
                  }
                }
              }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.5 2C7.77614 2 8 2.22386 8 2.5L8 11.2929L11.1464 8.14645C11.3417 7.95118 11.6583 7.95118 11.8536 8.14645C12.0488 8.34171 12.0488 8.65829 11.8536 8.85355L7.85355 12.8536C7.75979 12.9473 7.63261 13 7.5 13C7.36739 13 7.24021 12.9473 7.14645 12.8536L3.14645 8.85355C2.95118 8.65829 2.95118 8.34171 3.14645 8.14645C3.34171 7.95118 3.65829 7.95118 3.85355 8.14645L7 11.2929L7 2.5C7 2.22386 7.22386 2 7.5 2Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                let temp = [];
                for (let i = 0; i < threadTweets.length; i++) {
                  if (i == index) {
                    temp.push(threadTweets[i]);
                    temp.push({
                      draftId: null,
                      text: '',
                      media: null,
                    });
                  } else {
                    temp.push(threadTweets[i]);
                  }
                }
                setThreadTweets(temp);
                setSelectedTweetIndex(index + 1);
                setSelectedTweet(null);
              }}
              className="flex flex-row space-x-2"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="rounded-full bg-gray-100"
              >
                <path
                  d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM7.50003 4C7.77617 4 8.00003 4.22386 8.00003 4.5V7H10.5C10.7762 7 11 7.22386 11 7.5C11 7.77614 10.7762 8 10.5 8H8.00003V10.5C8.00003 10.7761 7.77617 11 7.50003 11C7.22389 11 7.00003 10.7761 7.00003 10.5V8H4.50003C4.22389 8 4.00003 7.77614 4.00003 7.5C4.00003 7.22386 4.22389 7 4.50003 7H7.00003V4.5C7.00003 4.22386 7.22389 4 7.50003 4Z"
                  fill="#363636"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div className="flex flex-row text-xs my-auto silka-regular text-gray-800">
            <p className={text.length > 280 ? 'text-[#FF0000]' : ''}>
              {text.length}
            </p>
            <p className={text.length > 280 ? 'text-[#FF0000]' : ''}>
              /280
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Thread({
  workspaceId,
  setRightThreadSelected,
  selectedThreadTweet,
  setSelectedThreadTweet,
  selectedThread,
  setSelectedThread,
  setRefetchThreadDrafts,
  currentThreadTweetMedia,
  setCurrentThreadTweetMedia,
  threadTweets,
  setThreadTweets,
  isPremium,
  userId,
}: ThreadProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTweetIndex, setSelectedTweetIndex] = useState(0);
  const [userData, setUserData] = useState<any>(null);
  const [fetchingData, setFetchingData] = useState(false);
  const [creatingLoading, setCreatingLoading] = useState(false);
  const [tweetMedia, setTweetMedia] = useState<any>(null);

  useEffect(() => {
    getProfileData(workspaceId).then((value) => {
      setUserData(value);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (selectedThread && !creatingLoading) {
      setFetchingData(true);
      getThreadData(selectedThread).then((value) => {
        let temp: any = [];
        value.drafts.forEach((v: any) => {
          if (v.file != 'none') {
            let media_temp = {
              id: v.fileId,
              format: v.fileFormat,
              name: v.name,
              google_url: v.google_url,
            };
            temp.push({
              draftId: v.id,
              text: v.text ? v.text : '',
              media: media_temp,
            });
          } else {
            temp.push({
              draftId: v.id,
              text: v.text ? v.text : '',
              media: null,
            });
          }
        });
        setSelectedThreadTweet(value.drafts[0].id);
        setCurrentThreadTweetMedia(temp[0].media);
        setThreadTweets(temp);
        setSelectedTweetIndex(0);
        setFetchingData(false);
      });
    } else {
      setThreadTweets([
        { draftId: null, text: '', media: null },
        { draftId: null, text: '', media: null },
      ]);
      setCurrentThreadTweetMedia(null);
      setSelectedTweetIndex(0);
      setSelectedThreadTweet(null);
      setFetchingData(false);
    }
  }, [selectedThread]);

  return (
    <>
      <div className="flex flex-col space-y-14 mb-20">
        <div className="flex flex-col space-y-6 mt-7">
          {threadTweets.map((value: any, index: number) => {
            if (selectedTweetIndex == index) {
              return (
                <FullTweet
                  key={index}
                  selectedThread={selectedThread}
                  setSelectedThread={setSelectedThread}
                  threadTweets={threadTweets}
                  setThreadTweets={setThreadTweets}
                  index={index}
                  selectedTweet={selectedThreadTweet}
                  setSelectedTweet={setSelectedThreadTweet}
                  userData={userData}
                  tweetData={value}
                  workspaceId={workspaceId}
                  selectedTweetIndex={selectedTweetIndex}
                  setSelectedTweetIndex={setSelectedTweetIndex}
                  fetchingData={fetchingData}
                  setFetchingData={setFetchingData}
                  setRefetchThreadDrafts={setRefetchThreadDrafts}
                  creatingLoading={creatingLoading}
                  setCreatingLoading={setCreatingLoading}
                  currentThreadTweetMedia={currentThreadTweetMedia}
                  setCurrentThreadTweetMedia={
                    setCurrentThreadTweetMedia
                  }
                  setRightThreadSelected={setRightThreadSelected}
                  isLoading={isLoading}
                />
              );
            } else {
              return (
                <SmallTweet
                  key={index}
                  userData={userData}
                  tweetData={value}
                  index={index}
                  setSelectedTweetIndex={setSelectedTweetIndex}
                  setSelectedTweet={setSelectedThreadTweet}
                  threadTweets={threadTweets}
                  isLoading={isLoading}
                />
              );
            }
          })}
        </div>
        <ThreadOptions
          workspaceId={workspaceId}
          userId={userId}
          draftId={selectedThread}
          setRefetchThreadDrafts={setRefetchThreadDrafts}
          setSelectedThread={setSelectedThread}
          setSelectedThreadTweet={setSelectedThreadTweet}
          threadTweets={threadTweets}
          setThreadTweets={setThreadTweets}
          isPremium={isPremium}
        />
      </div>
    </>
  );
}
