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
import { InstagramImageOptions } from '../options/ImageOptions';
import { InstagramPostFooter } from '../InstagramPostFooter';

interface Props {
  workspaceId: string;
  selectedImage: any;
  setSelectedImage: Dispatch<SetStateAction<any>>;
  imageMedia: any;
  setImageMedia: Dispatch<SetStateAction<any>>;
  refetchImageDrafts: boolean;
  setRefetchImageDrafts: Dispatch<SetStateAction<boolean>>;
  setRightImageSelected: Dispatch<SetStateAction<any>>;
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
      `${apiUrl()}instagram/read/profile`,
      {
        params: { workspaceId: workspaceId },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function createDraftImage(
  workspaceId: string,
  text: string,
  fileId: any
) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.post(
      `${apiUrl()}instagram/create/draftimage`,
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

async function getDraftDetails(draftId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}instagram/read/imagedraftdetails`,
      {
        params: { draftId: draftId },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function updateDraftImage(
  draftId: string,
  text: string,
  file: string,
  workspaceId: string
) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.post(
      `${apiUrl()}instagram/update/draftimage`,
      null,
      {
        params: {
          draftId: draftId,
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

export function InstagramImageLeft({
  workspaceId,
  selectedImage,
  setSelectedImage,
  imageMedia,
  setImageMedia,
  refetchImageDrafts,
  setRefetchImageDrafts,
  setRightImageSelected,
  isPremium,
  userId,
}: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [text, setText] = useState('');
  const textRef = useRef<any>(null);

  const [mediaUrl, setMediaUrl] = useState<any>(null);

  // Footer Values
  const [likes, setLikes] = useState(between(5, 100));

  useEffect(() => {
    getProfile(workspaceId).then((value) => {
      setProfileData(value);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (selectedImage) {
      getDraftDetails(selectedImage).then((value) => {
        setText(value.text);
        if (value.file != 'none') {
          let temp = {
            id: value.fileId,
            format: value.fileFormat,
            name: value.name,
            google_url: value.google_url,
          };
          setImageMedia(temp);
        } else {
          setImageMedia(null);
        }
      });
    } else {
      setText('');
      setImageMedia(null);
    }
  }, [selectedImage]);

  useEffect(() => {
    setIsSaving(true);
    const timer = setTimeout(() => {
      if (text.length > 0 || imageMedia) {
        if (selectedImage) {
          updateDraftImage(
            selectedImage,
            text,
            imageMedia?.id,
            workspaceId
          ).then((value) => {
            setRefetchImageDrafts(true);
            setIsSaving(false);
          });
        } else {
          createDraftImage(workspaceId, text, imageMedia?.id).then(
            (value) => {
              setSelectedImage(value.id);
              setRefetchImageDrafts(true);
              setIsSaving(false);
            }
          );
        }
      }
      setIsSaving(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [text, imageMedia]);

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

  useEffect(() => {
    if (imageMedia) {
      setMediaUrl(imageMedia.google_url);
    }
  }, [imageMedia]);

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row space-x-3 mt-7">
        {isLoading ? (
          <div className="h-11 w-11 rounded-full bg-gray-200 animate-pulse" />
        ) : (
          <img
            src={profileData?.profile_picture_url}
            className="w-11 h-11 rounded-full"
          />
        )}
        <div className="flex flex-row justify-between items-between w-full space-x-4">
          <div className="flex flex-col space-y-0.5">
            {isLoading ? (
              <div className="h-4 w-16 bg-gray-200 animate-pulse rounded" />
            ) : (
              <p className="text-sm silka-semibold text-gray-900">
                {`${profileData?.name}`}
              </p>
            )}
            {isLoading ? (
              <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
            ) : (
              <span className="text-[11px] silka-regular text-gray-400">
                @{profileData?.username}
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
      {imageMedia ? (
        <div className="mt-2 flex flex-col space-y-1">
          <div className="flex flex-row justify-end items-end">
            <button
              onClick={(e) => {
                e.preventDefault();
                setImageMedia(null);
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
          <img className="h-64 rounded-lg" src={mediaUrl} />
        </div>
      ) : (
        <button
          onClick={(e) => {
            e.preventDefault();
            setRightImageSelected('Library');
          }}
          className="mt-4 w-full flex flex-col space-y-2 justify-center items-center border rounded-xl border-dashed h-64 hover:border-[#F604D0]"
        >
          <p className="text-xs silka-medium">Select Media</p>
          <p className="text-[10px] silka-regular text-gray-400">
            Pick an image to post on Instagram
          </p>
        </button>
      )}
      <textarea
        ref={textRef}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        placeholder="Caption..."
        className="px-0 mt-2.5 text-sm silka-regular resize-none border-none text-gray-700 w-full focus:border-none focus:ring-0"
      />
      <InstagramPostFooter likes={likes} />
      <InstagramImageOptions
        workspaceId={workspaceId}
        draftId={selectedImage}
        postText={text}
        setImageMedia={setImageMedia}
        imageMedia={imageMedia}
        setSelectedImage={setSelectedImage}
        setRefetchImageDrafts={setRefetchImageDrafts}
        isPremium={isPremium}
        userId={userId}
      />
    </div>
  );
}
