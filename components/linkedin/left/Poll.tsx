import {
  useState,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../../utils/apiUrl';
import { LinkedinPostFooter } from '../LinkedinPostFooter';
import { PollOptions } from '../options/PollOptions';
import toast from 'react-hot-toast';

interface Props {
  workspaceId: string;
  selectedPoll: any;
  setSelectedPoll: Dispatch<SetStateAction<any>>;
  refetchPollDrafts: boolean;
  setRefetchPollDrafts: Dispatch<SetStateAction<boolean>>;
  isPremium: boolean;
  userId: string;
}

interface PollFieldProps {
  index: number;
  value: any;
  pollFields: any;
  setPollFields: Dispatch<SetStateAction<any>>;
  selectedPoll: any;
  setSelectedPoll: Dispatch<SetStateAction<any>>;
  workspaceId: string;
  pollText: string;
  isSaving: boolean;
  setIsSaving: Dispatch<SetStateAction<boolean>>;
}

function between(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

async function getProfile(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}linkedin/read/profilecomponent`,
      {
        params: { workspaceId: workspaceId },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function getDraftPoll(draftId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}linkedin/read/draftpoll`,
      {
        params: { draftId: draftId },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function createDraftPoll(
  workspaceId: string,
  text: string,
  pollFields: string
) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.post(
      `${apiUrl()}linkedin/create/draftpoll`,
      null,
      {
        params: {
          workspaceId: workspaceId,
          text: text,
          pollFields: pollFields,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function updateDraftPoll(
  draftId: string,
  text: string,
  workspaceId: string
) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.post(
      `${apiUrl()}linkedin/update/draftpoll`,
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

async function createDraftPollField(draftId: string, index: number) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.post(
      `${apiUrl()}linkedin/create/draftpollfield`,
      null,
      {
        params: {
          draftId: draftId,
          index: index,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function removePollField(
  draftId: string,
  index: number,
  workspaceId: string
) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.post(
      `${apiUrl()}linkedin/delete/draftpollfield`,
      null,
      {
        params: {
          draftId: draftId,
          index: index,
          workspaceId: workspaceId,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function updatePollField(
  draftId: string,
  index: number,
  text: string,
  workspaceId: string
) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.post(
      `${apiUrl()}linkedin/update/draftpollfield`,
      null,
      {
        params: {
          draftId: draftId,
          index: index,
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

function PollField({
  value,
  index,
  pollFields,
  setPollFields,
  selectedPoll,
  setSelectedPoll,
  workspaceId,
  pollText,
  isSaving,
  setIsSaving,
}: PollFieldProps) {
  const [text, setText] = useState(value);

  useEffect(() => {
    setText(value);
  }, [value]);

  useEffect(() => {
    setIsSaving(true);
    const timer = setTimeout(() => {
      if (text.length > 0) {
        let temp: any = pollFields;
        temp[index] = text;
        setPollFields(temp);
        if (selectedPoll) {
          updatePollField(selectedPoll, index, text, workspaceId);
          setIsSaving(false);
        } else {
          createDraftPoll(
            workspaceId,
            pollText,
            pollFields.toString()
          ).then((value) => {
            setSelectedPoll(value.id);
            updatePollField(value.id, index, text, workspaceId);
            setIsSaving(false);
          });
        }
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [text]);

  return (
    <div className="rounded-lg flex flex-col space-y-0.5 shadow py-2 px-3">
      <div className="flex flex-row justify-between items-between">
        <div className="flex flex-row space-x-3 w-full">
          <div className="h-[18px] my-auto w-[18px] rounded-full bg-gray-100"></div>
          <input
            onChange={(e) => {
              setText(e.target.value);
            }}
            placeholder="Poll Field..."
            type="text"
            value={text}
            className="my-auto w-full border-none px-0 py-1.5 text-sm silka-medium ring-0 text-gray-800 focus:ring-0 focus:border-none"
          />
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            if (pollFields.length == 2) {
              toast.error('Poll must have at least 2 fields.', {
                className: 'silka-medium text-gray-900 text-sm',
              });
            } else {
              removePollField(selectedPoll, index, workspaceId);
              setPollFields(
                pollFields.filter(
                  (item: any, i: number) => i != index
                )
              );
            }
          }}
          className="p-1 hover:bg-[#EFE4E4] h-fit rounded-full"
        >
          <svg
            width="11"
            height="11"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
              fill="#B24747"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

export function LinkedinPolleft({
  workspaceId,
  selectedPoll,
  setSelectedPoll,
  refetchPollDrafts,
  setRefetchPollDrafts,
  isPremium,
  userId,
}: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState<any>(null);
  const [pollFields, setPollFields] = useState<any>(['', '']);
  const [isSaving, setIsSaving] = useState(false);
  const [text, setText] = useState('');
  const textRef = useRef<any>(null);

  // footer stuff
  const [comments, setComments] = useState(between(5, 100));
  const [reposts, setReposts] = useState(between(5, 100));
  const [interactions, setInteractions] = useState(between(5, 100));

  useEffect(() => {
    getProfile(workspaceId).then((value) => {
      setProfileData(value);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    setIsSaving(true);
    const timer = setTimeout(() => {
      if (text.length > 0) {
        if (selectedPoll) {
          updateDraftPoll(selectedPoll, text, workspaceId).then(
            (value) => {
              setRefetchPollDrafts(true);
              setIsSaving(false);
            }
          );
        } else {
          createDraftPoll(
            workspaceId,
            text,
            pollFields.toString()
          ).then((value) => {
            setSelectedPoll(value.id);
            setRefetchPollDrafts(true);
            setIsSaving(false);
          });
        }
      } else {
        setIsSaving(false);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [text, pollFields]);

  useEffect(() => {
    if (selectedPoll) {
      getDraftPoll(selectedPoll).then((value) => {
        setText(value.text);
        // You have to get the fields from here somehow
        let fields: any = value.fields;
        fields = fields.sort(function (a: any, b: any) {
          return a.index - b.index;
        });
        let temp: any = [];

        fields.forEach((value: any) => {
          if (value.text) {
            temp.push(value.text);
          } else {
            temp.push('');
          }
        });

        setPollFields(temp);
      });
    } else {
      setText('');
      setPollFields(['', '']);
    }
  }, [selectedPoll]);

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
    <div className="Flex flex-col w-full">
      <div className="flex flex-row space-x-3 mt-7">
        {isLoading ? (
          <div className="h-11 w-11 bg-gray-200 animate-pulse rounded-full" />
        ) : (
          <img
            src={profileData.image}
            className="h-11 w-11 rounded-full"
            crossOrigin="anonymous"
          />
        )}
        <div className="flex flex-row justify-between items-between w-full space-x-4">
          <div className="flex flex-col space-y-0.5">
            {isLoading ? (
              <div className="h-4 w-16 bg-gray-200 animate-pulse rounded" />
            ) : (
              <p className="text-sm silka-semibold text-gray-900">
                {profileData.name}
              </p>
            )}
            {isLoading ? (
              <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
            ) : (
              <span className="text-[11px] silka-regular text-gray-400">
                {profileData.description}
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
      <div className="mt-3 flex flex-col space-y-3">
        {pollFields.map((value: any, index: number) => {
          return (
            <PollField
              index={index}
              value={value}
              key={index}
              pollFields={pollFields}
              setPollFields={setPollFields}
              selectedPoll={selectedPoll}
              setSelectedPoll={setSelectedPoll}
              workspaceId={workspaceId}
              pollText={text}
              isSaving={isSaving}
              setIsSaving={setIsSaving}
            />
          );
        })}
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          if (selectedPoll) {
            createDraftPollField(selectedPoll, pollFields.length);
            setPollFields(pollFields.concat(['']));
          } else {
            createDraftPoll(
              workspaceId,
              text,
              pollFields.concat(['']).toString().split(',')
            ).then((value) => {
              setSelectedPoll(value.id);
            });
            setPollFields(pollFields.concat(['']));
          }
        }}
        className={
          'mt-3.5 flex flex-row space-x-1.5 text-xs silka-medium text-gray-600 py-1 px-3 rounded w-fit border border-gray-400 hover:border-[#0966C2] border-dashed ' +
          (pollFields.length > 3 ? 'hidden' : '')
        }
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="my-auto"
        >
          <path
            d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM7.50003 4C7.77617 4 8.00003 4.22386 8.00003 4.5V7H10.5C10.7762 7 11 7.22386 11 7.5C11 7.77614 10.7762 8 10.5 8H8.00003V10.5C8.00003 10.7761 7.77617 11 7.50003 11C7.22389 11 7.00003 10.7761 7.00003 10.5V8H4.50003C4.22389 8 4.00003 7.77614 4.00003 7.5C4.00003 7.22386 4.22389 7 4.50003 7H7.00003V4.5C7.00003 4.22386 7.22389 4 7.50003 4Z"
            fill="#363636"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
        <p className="my-auto">New Field</p>
      </button>
      <textarea
        ref={textRef}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        placeholder="Post Text..."
        className="px-0 mt-2.5 text-sm silka-regular resize-none border-none text-gray-700 w-full focus:border-none focus:ring-0"
      />
      <LinkedinPostFooter
        comments={comments}
        reposts={reposts}
        interactions={interactions}
      />
      <PollOptions
        workspaceId={workspaceId}
        draftId={selectedPoll}
        postText={text}
        setRefetchPollDrafts={setRefetchPollDrafts}
        setSelectedPoll={setSelectedPoll}
        pollFields={pollFields}
        isPremium={isPremium}
        userId={userId}
      />
    </div>
  );
}
