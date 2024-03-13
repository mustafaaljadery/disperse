import axios from 'axios';
import axiosRetry from 'axios-retry';
import {
  useEffect,
  useState,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react';
import { apiUrl } from '../../../../utils/apiUrl';
import { TweetOptions } from '../options/TweetOptions';

interface TweetProps {
  workspaceId: string;
  selectedTweet: any;
  setSelectedTweet: Dispatch<SetStateAction<any>>;
  refetchDrafts: boolean;
  setRefetchDrafts: Dispatch<SetStateAction<boolean>>;
  tweetMedia: any;
  setTweetMedia: Dispatch<SetStateAction<any>>;
  setRightTweetSelected: Dispatch<SetStateAction<string>>;
  isPremium: boolean;
  userId: string;
}

async function updateDraftTweet(
  draftTweetId: string,
  text: string,
  file: string,
  workspaceId: string
) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.post(
      `${apiUrl()}twitter/update/drafttweet`,
      null,
      {
        params: {
          draftTweetId: draftTweetId,
          text: text,
          file: file,
          workspaceId: workspaceId,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function createDraftTweet(
  workspaceId: string,
  text: string,
  fileId: any
) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.post(
      `${apiUrl()}twitter/create/drafttweet`,
      null,
      {
        params: {
          workspaceId: workspaceId,
          text: text,
          fileId: fileId,
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

async function getDraftDetails(draftId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}twitter/read/tweetdraftdetails`,
      {
        params: { draftId: draftId },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

export function Tweet({
  workspaceId,
  selectedTweet,
  setSelectedTweet,
  refetchDrafts,
  setRefetchDrafts,
  tweetMedia,
  setTweetMedia,
  setRightTweetSelected,
  isPremium,
  userId,
}: TweetProps) {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const tweetRef = useRef(null);

  useEffect(() => {
    getProfileData(workspaceId).then((value) => {
      setUserData(value);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (selectedTweet) {
      getDraftDetails(selectedTweet).then((value) => {
        setText(value.text);
        if (value.file != 'none') {
          let temp = {
            id: value.fileId,
            format: value.fileFormat,
            name: value.name,
            google_url: value.google_url,
          };
          setTweetMedia(temp);
        } else {
          setTweetMedia(null);
        }
      });
    } else {
      setText('');
      setTweetMedia(null);
    }
  }, [selectedTweet]);

  useEffect(() => {
    setIsSaving(true);
    const timer = setTimeout(() => {
      if (text.length > 0 || tweetMedia) {
        if (selectedTweet) {
          updateDraftTweet(
            selectedTweet,
            text,
            tweetMedia?.id,
            workspaceId
          ).then((value) => {
            setRefetchDrafts(true);
            setIsSaving(false);
          });
        } else {
          createDraftTweet(workspaceId, text, tweetMedia?.id).then(
            (value) => {
              setSelectedTweet(value.id);
              setRefetchDrafts(true);
              setIsSaving(false);
            }
          );
        }
      }
      setIsSaving(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [text, tweetMedia]);

  useEffect(() => {
    if (!isLoading) {
      //@ts-ignore
      tweetRef.current.style.height = '0px';
      //@ts-ignore
      const scrollHeight = tweetRef.current.scrollHeight;
      //@ts-ignore
      tweetRef.current.style.height = scrollHeight + 'px';
    }
  }, [text, isLoading]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row space-x-3 mt-7">
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
                <p className="text-sm silka-semibold text-gray-900">
                  {userData.name}
                </p>
              )}
              {isLoading ? (
                <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
              ) : (
                <p className="text-sm silka-regular text-gray-600">
                  @{userData.username}
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
          {/*tweetMedia ? (
            <div className="flex flex-col space-y-1">
              <div className="flex flex-row justify-end items-end">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setTweetMedia(null);
                  }}
                  className="mb-1 p-1 rounded-full bg-gray-50 hover:bg-gray-200"
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
                <>
                  {tweetMedia.format == 'video/mp4' ||
                  tweetMedia.format == 'video/mov' ? (
                    <video
                      className="h-64 rounded-lg mt-2 bg-black"
                      controls
                      src={tweetMedia?.google_url}
                    />
                  ) : (
                    <img
                      className="h-64 rounded-lg mt-2"
                      src={tweetMedia?.google_url}
                    />
                  )}
                </>
            </div>
          ) : (
            <button
              onClick={() => {
                setRightTweetSelected('Library');
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
            ref={tweetRef}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            placeholder="Write Tweet..."
            className="px-0 mt-1 text-sm silka-regular resize-none border-none text-gray-700 focus:border-none focus:ring-0"
          />
          <div className="mt-2 flex flex-row justify-end items-end space-x-3">
            <div className="flex flex-row text-xs silka-regular text-gray-800">
              <p
                className={text.length > 280 ? 'text-[#FF0000]' : ''}
              >
                {text.length}
              </p>
              <p
                className={text.length > 280 ? 'text-[#FF0000]' : ''}
              >
                /280
              </p>
            </div>
          </div>
        </div>
      </div>
      <TweetOptions
        workspaceId={workspaceId}
        tweetText={text}
        draftId={selectedTweet}
        setRefetchDrafts={setRefetchDrafts}
        setTweetMedia={setTweetMedia}
        setSelectedTweet={setSelectedTweet}
        isPremium={isPremium}
        userId={userId}
      />
    </div>
  );
}
