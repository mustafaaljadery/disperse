import {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useRef,
} from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../../../utils/apiUrl';
import { TiktokOptions } from '../options/TiktokOptions';
import { TiktokVideoFooter } from '../../TiktokVideoFooter';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { clsx } from 'clsx';

const whoCanViewList = [
  {
    first_line: 'Everyone',
    second_line: '',
  },
  {
    first_line: 'Friends',
    second_line: 'Followers you follow back',
  },
  {
    first_line: 'Only Me',
    second_line: '',
  },
];

interface VideoLeftProps {
  workspaceId: string;
  selectedVideo: any;
  setSelectedVideo: Dispatch<SetStateAction<any>>;
  videoMedia: any;
  setVideoMedia: Dispatch<SetStateAction<any>>;
  refetchVideoDrafts: boolean;
  setRefetchVideoDrafts: Dispatch<SetStateAction<boolean>>;
  setRightVideoSelected: Dispatch<SetStateAction<string>>;
  isPremium: boolean;
}

interface VideoProps {
  userInfo: any;
  value: any;
  likes: number;
  comments: number;
  shares: number;
  isLoading: boolean;
  setVideoMedia: any;
  url: string;
}

function between(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

async function getUserData(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}tiktok/read/userprofile`,
      { params: { workspaceId: workspaceId } }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function createDraftVideo(
  workspaceId: string,
  text: string,
  fileId: string,
  can_comment: boolean,
  can_duet: boolean,
  can_stitch: boolean,
  whoCanView: string
) {
  try {
    const result = await axios.post(
      `${apiUrl()}tiktok/create/draftvideo`,
      null,
      {
        params: {
          workspaceId: workspaceId,
          text: text,
          fileId: fileId,
          can_comment: can_comment,
          can_duet: can_duet,
          can_stitch: can_stitch,
          whoCanView: whoCanView,
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
    const result = await axios.get(
      `${apiUrl()}tiktok/read/videodraftdetails`,
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

async function updateDraftVideo(
  workspaceId: string,
  text: string,
  fileId: string,
  can_comment: boolean,
  can_duet: boolean,
  can_stitch: boolean,
  whoCanView: string,
  draftId: string
) {
  try {
    const result = await axios.post(
      `${apiUrl()}tiktok/update/draftvideo`,
      null,
      {
        params: {
          workspaceId: workspaceId,
          text: text,
          file: fileId,
          can_comment: can_comment,
          can_duet: can_duet,
          can_stitch: can_stitch,
          whoCanView: whoCanView,
          draftId: draftId,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

function NoMediaSelected({
  userInfo,
  likes,
  comments,
  shares,
  isLoading,
  setRightVideoSelected,
}: any) {
  return (
    <>
      <div className="flex flex-row space-x-4 mt-4">
        {isLoading ? (
          <div className="h-11 w-11 rounded-full bg-gray-200 animate-pulse" />
        ) : (
          <img
            src={userInfo?.user?.avatar_large_url}
            className="h-11 w-11 rounded-full"
          />
        )}
        <div className="flex flex-col w-fit">
          <div className="flex flex-row space-x-4">
            {isLoading ? (
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
            ) : (
              <p className="text-sm silka-semibold">
                {userInfo?.user?.display_name}
              </p>
            )}
          </div>
          <button
            onClick={() => {
              setRightVideoSelected('Library');
            }}
            className="2xl:w-[300px] w-[225px] mt-2 hover:border-[#FF623D] h-[400px] 2xl:h-[532.5px] rounded-lg border border-dashed flex flex-col justify-center items-center"
          >
            <div className="p-2 bg-black rounded-lg">
              <svg
                width="18"
                height="18"
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
                  d="M18.3639 4.68525C17.5019 3.69894 17.0269 2.43312 17.0275 1.12305H15.9811C16.2548 2.58618 17.116 3.8736 18.3639 4.68525ZM8.70021 12.3776C6.88776 12.3797 5.4191 13.8484 5.41699 15.6608C5.41805 16.8811 6.09561 18.0002 7.17649 18.5671C6.77264 18.0102 6.55531 17.3403 6.55531 16.6524C6.55715 14.84 8.02581 13.3708 9.83853 13.3687C10.1768 13.3687 10.5011 13.4245 10.8072 13.5207V9.53329C10.4863 9.48771 10.1626 9.46427 9.83853 9.46269C9.78162 9.46269 9.72551 9.46585 9.66914 9.4669V12.5296C9.35565 12.43 9.02898 12.3787 8.70021 12.3776Z"
                  fill="#FF004F"
                />
                <path
                  d="M21.3233 6.43438V9.46997C19.2977 9.46997 17.4218 8.82218 15.8894 7.72259V15.66C15.8894 19.6239 12.6649 22.8489 8.70095 22.8489C7.16906 22.8489 5.74861 22.3655 4.58105 21.5457C5.93802 23.0091 7.84346 23.8405 9.839 23.84C13.8029 23.84 17.0279 20.615 17.0279 16.6515V8.71417C18.6109 9.85249 20.5122 10.4639 22.4619 10.4616V6.55477C22.0709 6.55477 21.6908 6.51236 21.323 6.43359"
                  fill="#FF004F"
                />
                <path
                  d="M15.8892 15.6608V7.72347C17.4722 8.86205 19.3734 9.47322 21.3231 9.47085V6.43553C20.1735 6.18763 19.1353 5.57356 18.3642 4.68525C17.1163 3.8736 16.2551 2.58618 15.9814 1.12305H13.122L13.116 16.7757C13.0504 18.5286 11.6075 19.9356 9.83881 19.9356C8.78322 19.9346 7.79243 19.4251 7.17756 18.5674C6.09668 18.0007 5.41886 16.8816 5.41754 15.6611C5.41965 13.8487 6.88831 12.38 8.70076 12.3779C9.03849 12.3779 9.36278 12.4332 9.66942 12.5299V9.46717C5.78372 9.55831 2.65039 12.7449 2.65039 16.6524C2.65039 18.5421 3.38459 20.2623 4.58086 21.5471C5.78688 22.3962 7.22604 22.8511 8.70076 22.8498C12.665 22.8498 15.8892 19.6248 15.8892 15.6608Z"
                  fill="white"
                />
              </svg>
            </div>
            <p className="text-xs mt-3 silka-semibold text-gray-900">
              Post Video to TikTok
            </p>
            <span className="text-[10px] mt-1 silka-regular text-gray-400">
              Select video to post
            </span>
          </button>
        </div>
        <TiktokVideoFooter
          likes={likes}
          comments={comments}
          shares={shares}
        />
      </div>
    </>
  );
}

function VideoMedia({
  userInfo,
  value,
  likes,
  comments,
  shares,
  isLoading,
  setVideoMedia,
  url,
}: VideoProps) {
  return (
    <div className="flex flex-row space-x-4 mt-4">
      {isLoading ? (
        <div className="h-11 w-11 rounded-full bg-gray-200 animate-pulse" />
      ) : (
        <img
          src={userInfo?.user?.avatar_large_url}
          className="h-11 w-11 rounded-full"
        />
      )}
      <div className="flex flex-col w-fit">
        <div className="flex flex-row space-x-4">
          {isLoading ? (
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
          ) : (
            <p className="text-sm silka-semibold">
              {userInfo?.user?.display_name}
            </p>
          )}
        </div>
        <div className="w-[300px] flex flex-row justify-end items-end py-1">
          <button
            onClick={(e) => {
              e.preventDefault();
              setVideoMedia(null);
            }}
            className="p-1 relative rounded-full hover:bg-gray-100"
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
                d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                fill="#363636"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <video
          controls
          className="w-[300px] mt-2 h-[532.5px] bg-black rounded-lg"
          src={url}
        />
      </div>
      <TiktokVideoFooter
        likes={likes}
        comments={comments}
        shares={shares}
      />
    </div>
  );
}

export function VideoLeft({
  workspaceId,
  selectedVideo,
  setSelectedVideo,
  videoMedia,
  setVideoMedia,
  refetchVideoDrafts,
  setRefetchVideoDrafts,
  setRightVideoSelected,
  isPremium,
}: VideoLeftProps) {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [likes, setLikes] = useState(between(5, 50000));
  const [comments, setComments] = useState(between(5, 50000));
  const [shares, setShares] = useState(between(5, 50000));
  const textRef = useRef(null);
  const [url, setUrl] = useState('');

  // allow users to
  const [comment, setComment] = useState(true);
  const [duet, setDuet] = useState(true);
  const [stitch, setStitch] = useState(true);

  // who can view the video
  const [whoCanView, setWhoCanVideo] = useState('Everyone');
  const [text, setText] = useState('');

  useEffect(() => {
    if (videoMedia) {
      setUrl(videoMedia.google_url);
    }
  }, [videoMedia]);

  useEffect(() => {
    if (selectedVideo) {
      getDraftDetails(selectedVideo).then((value) => {
        setText(value?.text);
        setComment(value?.can_comment);
        setDuet(value?.can_duet);
        setStitch(value?.can_stitch);
        setWhoCanVideo(value?.who_can_view);
        if (value?.file != 'none') {
          let temp = {
            id: value.fileId,
            format: value.fileFormat,
            name: value.name,
            google_url: value.google_url,
          };
          setVideoMedia(temp);
        } else {
          setVideoMedia(null);
        }
      });
    } else {
      setText('');
      setWhoCanVideo('Everyone');
      setComment(true);
      setDuet(true);
      setStitch(true);
      setVideoMedia(null);
    }
  }, [selectedVideo]);

  useEffect(() => {
    setIsSaving(true);
    const timer = setTimeout(() => {
      if (text.length > 0 || videoMedia) {
        if (selectedVideo) {
          updateDraftVideo(
            workspaceId,
            text,
            videoMedia?.id,
            comment,
            duet,
            stitch,
            whoCanView,
            selectedVideo
          ).then(() => {
            setRefetchVideoDrafts(true);
            setIsSaving(false);
          });
        } else {
          createDraftVideo(
            workspaceId,
            text,
            videoMedia?.id,
            comment,
            duet,
            stitch,
            whoCanView
          ).then((value) => {
            setRefetchVideoDrafts(true);
            setSelectedVideo(value.id);
            setIsSaving(false);
          });
        }
      } else {
        setIsSaving(false);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [text, videoMedia, comment, duet, stitch, whoCanView]);

  useEffect(() => {
    getUserData(workspaceId).then((value) => {
      setUserInfo(value);
      setIsLoading(false);
    });
  }, []);

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
    <div className="flex flex-col">
      {videoMedia ? (
        <VideoMedia
          userInfo={userInfo}
          value={videoMedia}
          likes={likes}
          comments={comments}
          shares={shares}
          isLoading={isLoading}
          setVideoMedia={setVideoMedia}
          url={url}
        />
      ) : (
        <NoMediaSelected
          userInfo={userInfo}
          likes={likes}
          comments={comments}
          shares={shares}
          isLoading={isLoading}
          setRightVideoSelected={setRightVideoSelected}
        />
      )}
      <div className="mt-10 flex flex-col space-y-6 w-full">
        <div className="flex flex-col space-y-2">
          <p className="text-xs silka-semibold text-gray-400">
            Title
          </p>
          <textarea
            ref={textRef}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            placeholder="Video title..."
            className="px-0 mt-2.5 text-sm silka-regular resize-none border-none text-gray-700 w-full focus:border-none focus:ring-0"
          />
        </div>
        <div className="flex flex-col space-y-3.5">
          <p className="text-xs silka-semibold text-gray-400">
            Who can view this video
          </p>
          <DropdownMenuPrimitive.Root>
            <DropdownMenuPrimitive.Trigger asChild>
              <button className="flex border px-3.5 py-2 rounded-lg flex-row justify-between items-between">
                <p className="text-sm text-[#363636] silka-medium">
                  {whoCanView}
                </p>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="my-auto"
                >
                  <path
                    d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                    fill="#363636"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </DropdownMenuPrimitive.Trigger>
            <DropdownMenuPrimitive.Portal>
              <DropdownMenuPrimitive.Content
                align="start"
                sideOffset={5}
                className={clsx(
                  'radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
                  'w-72 rounded-lg px-1.5 py-2 shadow-md',
                  'bg-white'
                )}
              >
                <div className="flex flex-col space-y-0.5">
                  {whoCanViewList.map((value: any, index: number) => {
                    return (
                      <DropdownMenuPrimitive.Item
                        className="w-full"
                        key={index}
                      >
                        <button
                          onClick={() => {
                            setWhoCanVideo(value?.first_line);
                          }}
                          className="flex flex-col py-1.5 px-3 rounded hover:bg-gray-50 w-full space-y-0.5"
                        >
                          <p className="silka-medium text-[#363636]">
                            {value?.first_line}
                          </p>
                          <span className="text-xs silka-regular text-gray-500">
                            {value?.second_line}
                          </span>
                        </button>
                      </DropdownMenuPrimitive.Item>
                    );
                  })}
                </div>
              </DropdownMenuPrimitive.Content>
            </DropdownMenuPrimitive.Portal>
          </DropdownMenuPrimitive.Root>
        </div>
        <div className="flex flex-col space-y-3.5">
          <p className="text-xs silka-semibold text-gray-400">
            Allow viewers to
          </p>
          <div className="flex flex-row w-full">
            <div className="flex flex-col justify-start items-start w-1/3">
              <button
                onClick={() => {
                  setComment(!comment);
                }}
                className="flex flex-row w-fit space-x-2.5"
              >
                <div
                  className={
                    'w-[20px] my-auto h-[20px] border rounded-lg flex flex-col justify-center items-center ' +
                    (comment ? 'border-[#FF623D] bg-[#FF623D]' : '')
                  }
                >
                  {comment && (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                        fill="white"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  )}
                </div>
                <p className="text-xs my-auto silka-regular text-gray-500">
                  Comment
                </p>
              </button>
            </div>
            <div className="flex flex-col justify-start items-start w-1/3">
              <button
                onClick={() => {
                  setDuet(!duet);
                }}
                className="flex flex-row w-fit space-x-2.5"
              >
                <div
                  className={
                    'w-[20px] my-auto h-[20px] border rounded-lg flex flex-col justify-center items-center ' +
                    (duet ? 'border-[#FF623D] bg-[#FF623D]' : '')
                  }
                >
                  {duet && (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                        fill="white"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  )}
                </div>
                <p className="text-xs my-auto silka-regular text-gray-500">
                  Duet
                </p>
              </button>
            </div>
            <div className="flex flex-col justify-start items-start w-1/3">
              <button
                onClick={() => {
                  setStitch(!stitch);
                }}
                className="flex flex-row w-fit space-x-2.5"
              >
                <div
                  className={
                    'w-[20px] my-auto h-[20px] border rounded-lg flex flex-col justify-center items-center ' +
                    (stitch ? 'border-[#FF623D] bg-[#FF623D]' : '')
                  }
                >
                  {stitch && (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                        fill="white"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  )}
                </div>
                <p className="text-xs my-auto silka-regular text-gray-500">
                  Stitch
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
      <TiktokOptions
        videoMedia={videoMedia}
        workspaceId={workspaceId}
        setVideoMedia={setVideoMedia}
        setRefetchVideoDrafts={setRefetchVideoDrafts}
        setSelectedVideo={setSelectedVideo}
        draftId={selectedVideo}
        isPremium={isPremium}
      />
    </div>
  );
}
