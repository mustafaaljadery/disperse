import {
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  useRef,
} from 'react';
import { FacebookPostFooter } from '../FacebookPostFooter';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../../utils/apiUrl';
import { FacebookTextOptions } from '../options/TextOptions';

interface Props {
  workspaceId: string;
  selectedText: any;
  setSelectedText: Dispatch<SetStateAction<any>>;
  refetchTextDrafts: boolean;
  setRefetchTextDrafts: Dispatch<SetStateAction<boolean>>;
  isPremium: boolean;
  userId: string;
}

function between(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

async function getProfile(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}facebook/read/profile`,
      { params: { workspaceId: workspaceId } }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function createDraftText(workspaceId: string, text: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.post(
      `${apiUrl()}facebook/create/drafttext`,
      null,
      {
        params: { workspaceId: workspaceId, text: text },
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
      `${apiUrl()}facebook/read/textdraftdetails`,
      {
        params: { draftId: draftId },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function updateDraftText(
  draftId: string,
  text: string,
  workspaceId: string
) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.post(
      `${apiUrl()}facebook/update/drafttext`,
      null,
      {
        params: {
          draftId: draftId,
          text: text,
          workspaceId: workspaceId,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

export function TextLeft({
  workspaceId,
  selectedText,
  setSelectedText,
  refetchTextDrafts,
  setRefetchTextDrafts,
  isPremium,
  userId,
}: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [text, setText] = useState('');
  const textRef = useRef<any>(null);

  // Footer values
  const [shares, setShares] = useState(between(5, 100));
  const [comments, setComments] = useState(between(5, 100));
  const [interactions, setInteractions] = useState(between(5, 100));

  useEffect(() => {
    getProfile(workspaceId).then((value) => {
      setProfileData(value);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (selectedText) {
      getDraftDetails(selectedText).then((value) => {
        setText(value.text);
        setIsLoading(false);
      });
    } else {
      setText('');
    }
  }, [selectedText]);

  useEffect(() => {
    setIsSaving(true);
    const timer = setTimeout(() => {
      if (text.length > 0) {
        if (selectedText) {
          updateDraftText(selectedText, text, workspaceId).then(
            () => {
              setRefetchTextDrafts(true);
              setIsSaving(false);
            }
          );
        } else {
          createDraftText(workspaceId, text).then((value) => {
            setSelectedText(value.id);
            setRefetchTextDrafts(true);
            setIsSaving(false);
          });
        }
      } else {
        setIsSaving(false);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [text]);

  useEffect(() => {
    if (!isLoading) {
      //@ts-ignore
      textRef.current.style.height = '0px';
      //@ts-ignore
      const scrollHeight = textRef.current.scrollHeight;
      //@ts-ignore
      textRef.current.style.height = scrollHeight + 'px';
    }
  }, [text, isLoading]);

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row space-x-3 mt-7">
        {isLoading ? (
          <div className="h-11 w-11 bg-gray-200 animate-pulse rounded-full" />
        ) : (
          <img
            src={profileData?.picture}
            className="w-11 h-11 rounded-full"
          />
        )}
        <div className="flex flex-row justify-between items-between w-full space-x-4">
          <div className="flex flex-col space-y-0.5">
            {isLoading ? (
              <div className="h-4 w-16 bg-gray-200 animate-pulse rounded" />
            ) : (
              <p className="text-sm silka-semibold text-gray-900">
                {profileData?.name}
              </p>
            )}
            {isLoading ? (
              <div className="h-4 w-32 bg-gray-200 animate-pulse rounded" />
            ) : (
              <span
                className={
                  'text-[11px] silka-regular ' +
                  (profileData?.about &&
                  profileData?.about?.length > 0
                    ? 'text-gray-500 italic'
                    : 'text-gray-400')
                }
              >
                {profileData?.about && profileData?.about?.length > 75
                  ? profileData?.about?.slice(0, 75) + '...'
                  : profileData?.about?.length > 0
                  ? profileData?.about
                  : 'No bio...'}
              </span>
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
      </div>
      <textarea
        ref={textRef}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        placeholder="Whats on your mind?"
        className="px-0 mt-2.5 text-sm silka-regular resize-none border-none text-gray-700 w-full focus:border-none focus:ring-0"
      />
      <FacebookPostFooter
        shares={shares}
        interactions={interactions}
        comments={comments}
      />
      <FacebookTextOptions
        workspaceId={workspaceId}
        setRefetchTextDrafts={setRefetchTextDrafts}
        setSelectedText={setSelectedText}
        draftId={selectedText}
        postText={text}
        isPremium={isPremium}
        userId={userId}
      />
    </div>
  );
}
