import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { ShortsOptions } from './options/ShortsOptions';
import { ProfileHeader } from './ProfileHeader';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../utils/apiUrl';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { VideoCategoryShortsDropdown } from './dropdown/VideoCategoryShortsDropdown';
import toast from 'react-hot-toast';
import { clsx } from 'clsx';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import { SelectThumbnail } from './SelectThumbnail';

interface Props {
  workspaceId: string;
  section: string;
  setSection: Dispatch<SetStateAction<string>>;
  draftId: any;
  setDraftId: Dispatch<SetStateAction<any>>;
  setRightView: Dispatch<SetStateAction<string>>;
  shortMedia: any;
  setShortMedia: Dispatch<SetStateAction<any>>;
  setRefetchShortDrafts: Dispatch<SetStateAction<boolean>>;
  isPremium: boolean;
  userId: string;
}

interface TagProps {
  value: any;
  index: number;
  tags: any;
  setTags: Dispatch<SetStateAction<any>>;
}

async function getMedia(fileId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}youtube/read/draftmedia`,
      {
        params: { fileId: fileId },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function createDraft(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.post(
      `${apiUrl()}youtube/create/shortsdraft`,
      null,
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

async function getDraft(draftId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}youtube/read/shortdraft`,
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

async function updateDraft(
  draftId: string,
  title: any,
  description: any,
  for_kids: boolean,
  language: any,
  category: any,
  thumbnail: any,
  mediaId: any,
  tags: any,
  privacy: string,
  workspaceId: string
) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.post(
      `${apiUrl()}youtube/update/shortsdraft`,
      null,
      {
        params: {
          draftId: draftId,
          title: title,
          description: description,
          for_kids: for_kids,
          language: language,
          category: category,
          thumbnail: thumbnail,
          mediaId: mediaId,
          tags: tags.toString(),
          privacy: privacy,
          workspaceId: workspaceId,
        },
      }
    );

    return result.data;
  } catch (e) {
    console.log(e);
  }
}

function Tag({ value, index, tags, setTags }: TagProps) {
  return (
    <div className="p-1">
      <div className="px-4 py-1 flex flex-row space-x-1 rounded bg-gray-50">
        <p className="text-xs silka-medium text-gray-900">{value}</p>
        <button
          onClick={(e) => {
            e.preventDefault();
            let temp = [];
            for (let i = 0; i < tags.length; i++) {
              if (i == index) {
                continue;
              } else {
                temp.push(tags[i]);
              }
            }
            setTags(temp);
          }}
          className=""
        >
          <svg
            width="8"
            height="8"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mb-auto"
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
    </div>
  );
}

export function YoutubeShortsLeft({
  workspaceId,
  section,
  setSection,
  draftId,
  setDraftId,
  setRightView,
  shortMedia,
  setShortMedia,
  setRefetchShortDrafts,
  isPremium,
  userId,
}: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [isDraftLoading, setIsDraftLoading] = useState(false);
  const [savingLoading, setSavingLoading] = useState(false);
  const [thumbnailOpen, setThumbnailOpen] = useState(false);
  const [privacy, setPrivacy] = useState('public');

  const [titleText, setTitleText] = useState<string>('');
  const [descriptionText, setDescriptionText] = useState<string>('');
  const [thumbnailSelected, setThumbnailSelected] =
    useState<string>('');
  const [forKidsSelected, setForKidsSelected] =
    useState<boolean>(false);
  const [currentTag, setCurrentTag] = useState('');
  const [tags, setTags] = useState<any>([]);
  const [category, setCategory] = useState<string>('');
  const [languages, setLanguages] = useState<string>('');

  const [thumbnailLoading, setThumbnailLoading] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState<any>(null);
  const [mediaUrl, setMediaUrl] = useState('');

  useEffect(() => {
    if (shortMedia) {
      setMediaUrl(shortMedia.google_url);
    } else {
      setMediaUrl('');
    }
  }, [shortMedia?.google_url]);

  useEffect(() => {
    if (draftId) {
      getDraft(draftId).then((value) => {
        setTitleText(value.title ? value.title : '');
        setDescriptionText(
          value.description ? value.description : ''
        );
        if (
          value.thumbnailFileId != null &&
          value?.thumbnailFileId != 'undefined'
        ) {
          setThumbnailLoading(true);
          getMedia(value.thumbnailFileId).then((value) => {
            setThumbnailUrl(value.google_url);
            setThumbnailLoading(false);
          });
        }
        setThumbnailSelected(
          value.thumbnailFileId ? value.thumbnailFileId : ''
        );
        setForKidsSelected(value.for_kids);
        setTags(value.tags ? value.tags.split(',') : []);
        setCategory(value.category ? value.category : '');
        setLanguages(value.language ? value.language : '');
        if (value?.fileId != null && value?.fileId != 'undefined') {
          getMedia(value.fileId).then((value) => {
            setShortMedia(value);
            setIsDraftLoading(false);
            setIsLoading(false);
          });
        } else {
          setShortMedia(null);
          setIsDraftLoading(false);
          setIsLoading(false);
        }
      });
    } else {
      setIsDraftLoading(true);
      setTitleText('');
      setDescriptionText('');
      setForKidsSelected(false);
      setThumbnailSelected('');
      setForKidsSelected(false);
      setTags([]);
      setCategory('');
      setLanguages('');
      setIsDraftLoading(false);
      setIsLoading(false);
      setShortMedia(null);
    }
  }, [draftId]);

  useEffect(() => {
    setSavingLoading(true);
    const timer = setTimeout(() => {
      if (
        titleText.length > 0 ||
        descriptionText.length > 0 ||
        thumbnailSelected.length > 0 ||
        forKidsSelected ||
        languages.length > 0 ||
        category.length > 0 ||
        tags.length > 0 ||
        shortMedia?.id
      ) {
        if (draftId == null) {
          createDraft(workspaceId).then((value) => {
            updateDraft(
              value.id,
              titleText,
              descriptionText,
              forKidsSelected,
              languages,
              category,
              thumbnailSelected,
              shortMedia?.id,
              tags,
              privacy,
              workspaceId
            ).then(() => {
              setRefetchShortDrafts(true);
              setDraftId(value.id);
              setSavingLoading(false);
            });
          });
        } else {
          updateDraft(
            draftId,
            titleText,
            descriptionText,
            forKidsSelected,
            languages,
            category,
            thumbnailSelected,
            shortMedia?.id,
            tags,
            privacy,
            workspaceId
          ).then(() => {
            setRefetchShortDrafts(true);
            setSavingLoading(false);
          });
          setSavingLoading(false);
        }
      } else {
        setSavingLoading(false);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [
    titleText,
    descriptionText,
    thumbnailSelected,
    forKidsSelected,
    tags,
    category,
    languages,
    shortMedia,
    tags.length,
    privacy,
  ]);

  useEffect(() => {
    if (thumbnailSelected != null && thumbnailSelected.length > 0) {
      setThumbnailLoading(true);
      getMedia(thumbnailSelected).then((value) => {
        setThumbnailUrl(value.google_url);
        setThumbnailLoading(false);
      });
    }
  }, [thumbnailSelected]);

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      if (currentTag.length > 0) {
        if (tags) {
          if (tags.includes(currentTag)) {
            toast.error('Tag Already Included', {
              className: 'silka-medium text-gray-900 text-sm',
            });
          } else {
            let temp = tags;
            temp.push(currentTag);
            setTags(temp);
            setCurrentTag('');
          }
        } else {
          setTags([currentTag]);
          setCurrentTag('');
        }
      } else {
        toast.error('Undefined Tag', {
          className: 'text-sm silka-medium text-gray-900',
        });
      }
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row space-x-1 visible">
        <button
          onClick={() => {
            setSection('Video');
          }}
          className={
            'text-xs px-3 py-1 rounded ' +
            (section == 'Video'
              ? 'silka-medium bg-gray-100'
              : 'silka-regular text-gray-600 hover:bg-gray-50')
          }
        >
          Video
        </button>
        <button
          onClick={() => {
            setSection('Shorts');
          }}
          className={
            'text-xs px-3 py-1 rounded ' +
            (section == 'Shorts'
              ? 'silka-medium bg-gray-100'
              : 'silka-regular text-gray-600 hover:bg-gray-50')
          }
        >
          Shorts
        </button>
      </div>
      <div className="flex flex-col mt-8">
        <div className="flex flex-row justify-between items-between">
          <ProfileHeader workspaceId={workspaceId} />
          {savingLoading ? (
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
        {shortMedia == null ? (
          <></>
        ) : (
          <div className="mt-4 flex flex-row justify-end items-end">
            <HoverCardPrimitive.Root>
              <HoverCardPrimitive.Trigger asChild>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShortMedia(null);
                  }}
                  className="p-1 rounded-full bg-red-100"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                      fill="#CC3333"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </HoverCardPrimitive.Trigger>
              <HoverCardPrimitive.Content
                align="center"
                sideOffset={4}
                className={clsx(
                  'radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
                  'max-w-md rounded-lg p-2',
                  'bg-[#363636]',
                  'focus:outline-none focus-visible:ring-0'
                )}
              >
                <p className="text-xs silka-medium text-white">
                  Remove video
                </p>
              </HoverCardPrimitive.Content>
            </HoverCardPrimitive.Root>
          </div>
        )}
        {mediaUrl ? (
          <div className="flex flex-col justify-center items-center">
            <video
              className="w-[260px] h-[462px] rounded-lg mt-2 bg-black"
              controls
              src={mediaUrl}
            />
          </div>
        ) : (
          <>
            <div className="flex flex-col justify-center items-center">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setRightView('My Media');
                }}
                className="mt-9 w-[260px] h-[462px] flex flex-col justify-center items-center border rounded-xl border-dashed  hover:border-[#FF0000]"
              >
                <p className="text-xs silka-medium mt-3">
                  Youtube Short
                </p>
                <p className="text-[10px] silka-regular mt-1 text-gray-400">
                  Pick a video to post as short
                </p>
              </button>
            </div>
          </>
        )}
        <div className="flex flex-col space-y-7 mt-6">
          <div className="flex flex-col space-y-1.5">
            <h3 className="text-xs silka-medium text-gray-900">
              Title
            </h3>
            <input
              type="text"
              value={titleText}
              onChange={(e) => {
                if (e.target.value.length < 101) {
                  setTitleText(e.target.value);
                }
              }}
              placeholder="Youtube Title..."
              className="rounded border-gray-300 py-2.5 silka-medium text-sm focus:ring-0 focus:border-[#FF0000]"
            />
          </div>
          <div className="flex flex-col space-y-2.5">
            <h3 className="text-xs silka-medium text-gray-900">
              Description
            </h3>
            <textarea
              className="resize-none rounded h-28 border-gray-300 py-2.5 silka-medium text-sm focus:ring-0 focus:border-[#FF0000]"
              value={descriptionText}
              onChange={(e) => {
                setDescriptionText(e.target.value);
              }}
              placeholder="Video Description..."
            ></textarea>
          </div>
          <div className="flex flex-col space-y-2.5">
            <h3 className="text-xs silka-medium my-auto text-gray-900">
              Visibility
            </h3>
            <div className="flex flex-col space-y-4">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setPrivacy('public');
                }}
                className="flex flex-row space-x-2"
              >
                <div className="p-1 rounded-full border border-gray-700">
                  {privacy == 'public' ? (
                    <div className="w-3 h-3 rounded-full bg-gray-700 my-auto" />
                  ) : (
                    <div className="w-3 h-3 rounded-full bg-gray-100 my-auto"></div>
                  )}
                </div>
                <p className="my-auto text-sm silka-medium text-gray-900">
                  Public
                </p>
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setPrivacy('unlisted');
                }}
                className="flex flex-row space-x-2"
              >
                <div className="p-1 rounded-full border border-gray-700">
                  {privacy == 'unlisted' ? (
                    <div className="w-3 h-3 rounded-full bg-gray-700 my-auto" />
                  ) : (
                    <div className="w-3 h-3 rounded-full bg-gray-100 my-auto"></div>
                  )}
                </div>
                <p className="my-auto text-sm silka-medium text-gray-900">
                  Unlisted
                </p>
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setPrivacy('private');
                }}
                className="flex flex-row space-x-2"
              >
                <div className="p-1 rounded-full border border-gray-700">
                  {privacy == 'private' ? (
                    <div className="w-3 h-3 rounded-full bg-gray-700 my-auto" />
                  ) : (
                    <div className="w-3 h-3 rounded-full bg-gray-100 my-auto"></div>
                  )}
                </div>
                <p className="my-auto text-sm silka-medium text-gray-900">
                  Private
                </p>
              </button>
            </div>
          </div>
          <div className="flex flex-col space-y-2.5">
            <h3 className="text-xs silka-medium text-gray-900">
              Thumbnail
            </h3>
            {thumbnailSelected != null &&
            thumbnailSelected.length > 0 ? (
              <div className="p-4 border rounded-lg border-dashed">
                {thumbnailLoading ? (
                  <div className="h-18 w-32 flex flex-col space-y-1.5">
                    <div className="h-4 bg-gray-200 w-full rounded animate-pulse" />
                    <div className="h-4 bg-gray-200 w-[85%] rounded animate-pulse" />
                    <div className="h-4 bg-gray-200 w-[70%] rounded animate-pulse" />
                  </div>
                ) : (
                  <div className="flex flex-row justify-between items-between">
                    <img
                      className="h-18 w-32 rounded"
                      src={thumbnailUrl}
                    />
                    <div className="flex flex-col justify-between items-between">
                      <div className="flex flex-row justify-end items-end">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setThumbnailSelected('');
                          }}
                          className="p-1.5 h-fit rounded-full bg-red-200 w-fit"
                        >
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-fit"
                          >
                            <path
                              d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                              fill="#ef4444"
                              fillRule="evenodd"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </button>
                      </div>
                      <DialogPrimitive.Root
                        open={thumbnailOpen}
                        onOpenChange={setThumbnailOpen}
                      >
                        <DialogPrimitive.Trigger asChild>
                          <button className="text-[11px] silka-medium text-white rounded bg-[#FF623D] hover:opacity-90 px-2.5 py-1">
                            New Thumbnail
                          </button>
                        </DialogPrimitive.Trigger>
                        <SelectThumbnail
                          isOpen={thumbnailOpen}
                          workspaceId={workspaceId}
                          thumbnailSelected={thumbnailSelected}
                          setThumbnailSelected={setThumbnailSelected}
                          setIsOpen={setThumbnailOpen}
                        />
                      </DialogPrimitive.Root>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <DialogPrimitive.Root
                open={thumbnailOpen}
                onOpenChange={setThumbnailOpen}
              >
                <DialogPrimitive.Trigger asChild>
                  <button className="flex flex-row space-x-2.5 hover:border-[#FF623D] justify-start items-start px-4 py-3 border rounded-lg border-dashed">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="my-auto"
                    >
                      <path
                        d="M1.99998 0.999976C1.44769 0.999976 0.999976 1.44769 0.999976 1.99998V13C0.999976 13.5523 1.44769 14 1.99998 14H13C13.5523 14 14 13.5523 14 13V1.99998C14 1.44769 13.5523 0.999976 13 0.999976H1.99998ZM1.99998 1.99998L13 1.99998V13H1.99998V1.99998ZM4.49996 3.99996C4.22382 3.99996 3.99996 4.22382 3.99996 4.49996V10.5C3.99996 10.7761 4.22382 11 4.49996 11H10.5C10.7761 11 11 10.7761 11 10.5V4.49996C11 4.22382 10.7761 3.99996 10.5 3.99996H4.49996ZM4.99996 9.99996V4.99996H9.99996V9.99996H4.99996Z"
                        fill="#363636"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <p className="my-auto text-sm silka-medium text-gray-800">
                      Select Thumbnail
                    </p>
                  </button>
                </DialogPrimitive.Trigger>
                <SelectThumbnail
                  isOpen={thumbnailOpen}
                  workspaceId={workspaceId}
                  thumbnailSelected={thumbnailSelected}
                  setThumbnailSelected={setThumbnailSelected}
                  setIsOpen={setThumbnailOpen}
                />
              </DialogPrimitive.Root>
            )}
          </div>
          <div className="flex flex-col space-y-2.5">
            <h3 className="text-xs silka-medium my-auto text-gray-900">
              For Kids
            </h3>
            <div className="flex flex-col space-y-4">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setForKidsSelected(true);
                }}
                className="flex flex-row space-x-2 "
              >
                <div className="p-1 rounded-full border border-gray-700">
                  {forKidsSelected ? (
                    <div className="w-3 h-3 rounded-full bg-gray-700 my-auto" />
                  ) : (
                    <div className="w-3 h-3 rounded-full bg-gray-100 my-auto"></div>
                  )}
                </div>
                <p className="my-auto text-sm silka-medium text-gray-900">
                  Yes, it&apos;s made for kids
                </p>
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setForKidsSelected(false);
                }}
                className="flex flex-row space-x-2"
              >
                <div className="p-1 rounded-full border border-gray-700">
                  {forKidsSelected ? (
                    <div className="w-3 h-3 rounded-full bg-gray-100 my-auto" />
                  ) : (
                    <div className="w-3 h-3 rounded-full bg-gray-700 my-auto"></div>
                  )}
                </div>
                <div className="flex flex-row space-x-3 my-auto">
                  <p className="my-auto text-sm silka-medium text-gray-900">
                    No, it&apos;s not made for kids
                  </p>
                  <span className="px-2.5 py-0.5 text-[10px] silka-semibold rounded my-auto text-gray-800 bg-gray-50">
                    Default Option
                  </span>
                </div>
              </button>
            </div>
          </div>
          <div className="flex flex-col space-y-2.5">
            <h3 className="text-xs silka-medium text-gray-900">
              Tags
            </h3>
            <div className="flex flex-row justify-start items-start py-4 px-3 border border-dashed rounded-lg flex-wrap">
              <div className="flex flex-row space-x-1">
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="my-auto"
                >
                  <path
                    d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
                    fill="#363636"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <input
                  value={currentTag}
                  onChange={(e: any) => {
                    setCurrentTag(e.target.value);
                    if (e.key == 'Enter' || e.keyCode == 13) {
                    }
                  }}
                  onKeyDown={handleKeyDown}
                  type="text"
                  className="py-1 focus:border-none focus:ring-0 my-auto text-sm silka-medium text-gray-700 border-none"
                  placeholder="Tag..."
                />
              </div>
              {tags?.map((value: any, index: number) => {
                return (
                  <Tag
                    key={index}
                    tags={tags}
                    setTags={setTags}
                    value={value}
                    index={index}
                  />
                );
              })}
            </div>
          </div>
          {/*
          <div className="flex flex-col space-y-2.5">
            <h3 className="text-xs silka-medium text-gray-900">
              Video Langugage
            </h3>
            <DropdownMenuPrimitive.Root>
              <DropdownMenuPrimitive.Trigger asChild>
                <button className="py-2.5 border rounded px-3 flex flex-row justify-between items-between">
                  <p className="text-sm silka-regular text-gray-900">
                    {languages.length == 0
                      ? 'Select Language...'
                      : languages}
                  </p>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="my-auto"
                  >
                    <path
                      d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </DropdownMenuPrimitive.Trigger>
              <VideoLanguageShortsDropdown
                language={languages}
                setLanguage={setLanguages}
              />
            </DropdownMenuPrimitive.Root>
          </div>
                    */}
          <div className="flex flex-col space-y-2.5">
            <h3 className="text-xs silka-medium text-gray-900">
              Category
            </h3>
            <DropdownMenuPrimitive.Root>
              <DropdownMenuPrimitive.Trigger asChild>
                <button className="py-2.5 border rounded px-3 flex flex-row justify-between items-between">
                  <p className="text-sm silka-regular text-gray-900">
                    {category.length == 0
                      ? 'Select Category'
                      : category}
                  </p>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="my-auto"
                  >
                    <path
                      d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </DropdownMenuPrimitive.Trigger>
              <VideoCategoryShortsDropdown
                category={category}
                setCategory={setCategory}
              />
            </DropdownMenuPrimitive.Root>
          </div>
        </div>
      </div>
      <ShortsOptions
        workspaceId={workspaceId}
        draftId={draftId}
        shortTitle={titleText}
        setRefetchDrafts={setRefetchShortDrafts}
        setShortMedia={setShortMedia}
        setSelectedShort={setDraftId}
        shortMedia={shortMedia}
        isPremium={isPremium}
        userId={userId}
      />
    </div>
  );
}
