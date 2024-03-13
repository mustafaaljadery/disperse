import {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useRef,
} from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../../utils/apiUrl';
import { InstagramPostFooter } from '../InstagramPostFooter';
import { InstagramCarouselOptions } from '../options/CarouselOptions';

interface Props {
  workspaceId: string;
  selectedCarousel: any;
  setSelectedCarousel: Dispatch<SetStateAction<any>>;
  carouselMedia: any;
  setCarouselMedia: Dispatch<SetStateAction<any>>;
  refetchCarouselDrafts: boolean;
  setRefetchCarouselDrafts: Dispatch<SetStateAction<boolean>>;
  setRightCarouselSelected: Dispatch<SetStateAction<string>>;
  selectedCarouselIndex: any;
  setSelectedCarouselIndex: Dispatch<SetStateAction<any>>;
  isPremium: boolean;
  userId: string;
}

async function getProfile(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}instagram/read/profile`,
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

async function createDraftCarousel(
  workspaceId: string,
  text: string,
  fileId: string
) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.post(
      `${apiUrl()}instagram/create/draftcarousel`,
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
      `${apiUrl()}instagram/read/carouseldraftdetails`,
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

async function updateDraftCarousel(
  draftId: string,
  text: string,
  workspaceId: string
) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.post(
      `${apiUrl()}instagram/update/draftcarousel`,
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

async function updateImages(
  draftId: string,
  images: any,
  workspaceId: string
) {
  try {
    axiosRetry(axios, { retries: 3 });

    const values: any = [];
    images.forEach((value: any) => {
      values.push(value.id);
    });
    const result = await axios.post(
      `${apiUrl()}instagram/update/carouselimages`,
      null,
      {
        params: {
          draftId: draftId,
          images: values,
          workspaceId: workspaceId,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

function between(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function InstagramCarouselLeft({
  workspaceId,
  selectedCarousel,
  setSelectedCarousel,
  carouselMedia,
  setCarouselMedia,
  refetchCarouselDrafts,
  setRefetchCarouselDrafts,
  setRightCarouselSelected,
  selectedCarouselIndex,
  setSelectedCarouselIndex,
  isPremium,
  userId,
}: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [text, setText] = useState('');
  const textRef = useRef<any>(null);

  const [likes, setLikes] = useState(between(5, 100));

  useEffect(() => {
    getProfile(workspaceId).then((value) => {
      setProfileData(value);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (selectedCarousel) {
      getDraftDetails(selectedCarousel).then((value) => {
        setText(value.text);
        setCarouselMedia(value.images_data);
        if (value.images_data.length > 0) {
          setSelectedCarouselIndex(0);
        } else {
          setSelectedCarouselIndex(null);
        }
      });
    } else {
      setText('');
      setCarouselMedia([]);
      setSelectedCarouselIndex(null);
    }
  }, [selectedCarousel]);

  useEffect(() => {
    setIsSaving(true);
    const timer = setTimeout(() => {
      if (text.length > 0) {
        if (selectedCarousel) {
          updateDraftCarousel(
            selectedCarousel,
            text,
            workspaceId
          ).then((value) => {
            setRefetchCarouselDrafts(true);
            setIsSaving(false);
          });
        } else {
          createDraftCarousel(
            workspaceId,
            text,
            carouselMedia?.id
          ).then((value) => {
            setSelectedCarousel(value.id);
            setRefetchCarouselDrafts(true);
            setIsSaving(false);
          });
        }
      }
      setIsSaving(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [text]);

  useEffect(() => {
    setIsSaving(true);
    if (carouselMedia?.length > 0) {
      if (selectedCarousel) {
        updateImages(
          selectedCarousel,
          carouselMedia,
          workspaceId
        ).then((value) => {
          setRefetchCarouselDrafts(true);
          setIsSaving(false);
        });
      } else {
        createDraftCarousel(
          workspaceId,
          text,
          carouselMedia?.id
        ).then((value) => {
          setSelectedCarousel(value.id);
          updateImages(value.id, carouselMedia, workspaceId).then(
            (v) => {
              setRefetchCarouselDrafts(true);
              setIsSaving(false);
            }
          );
        });
      }
    } else {
      setIsSaving(false);
    }
  }, [carouselMedia.length]);

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
          <div className="h-11 w-11 bg-gray-200 rounded-full animate-pulse" />
        ) : (
          <img
            src={profileData?.profile_picture_url}
            className="w-11 h-11 rounded-full"
          />
        )}
        <div className="flex flex-row justify-between items-between w-full space-x-4">
          <div className="flex flex-col space-y-0.5">
            {isLoading ? (
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
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
      <div className="flex flex-row">
        <div className="my-auto w-[12.5%] flex flex-col justify-center items-center">
          <button
            onClick={(e) => {
              e.preventDefault();
              if (selectedCarouselIndex > 0) {
                setSelectedCarouselIndex(selectedCarouselIndex - 1);
              }
            }}
            className="p-1.5 bg-[#F6E7F3] hover:bg-[#F6ADEA] rounded-full"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z"
                fill="#F604D0"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        {selectedCarouselIndex != null && selectedCarousel ? (
          <img
            src={carouselMedia[selectedCarouselIndex].google_url}
            className="mt-4 w-[75%] rounded-xl h-64"
          />
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              setRightCarouselSelected('Library');
            }}
            className="mt-4 w-[75%] flex flex-col space-y-2 justify-center items-center border rounded-xl border-dashed h-64 hover:border-[#F604D0]"
          >
            <p className="text-xs silka-medium">Select Image</p>
            <p className="text-[10px] silka-regular text-gray-400">
              Pick an image to add to the Slideshow
            </p>
          </button>
        )}
        <div className="w-[12.5%] my-auto flex flex-col justify-center items-center rounded-full">
          <button
            onClick={(e) => {
              e.preventDefault();
              if (selectedCarouselIndex < carouselMedia.length - 1)
                setSelectedCarouselIndex(selectedCarouselIndex + 1);
            }}
            className="p-1.5 bg-[#F6E7F3] hover:bg-[#F6ADEA] rounded-full"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
                fill="#F604D0"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="h-20 rounded-lg flex flex-row space-x-2 justify-start items-center px-3 w-full border border-dashed mt-3">
        {carouselMedia?.map((value: any, index: number) => {
          return (
            <button
              key={index}
              onClick={(e) => {
                e.preventDefault();
                setSelectedCarouselIndex(index);
              }}
              className={
                selectedCarouselIndex == index
                  ? ''
                  : 'opacity-60 hover:opacity-100'
              }
            >
              <img
                src={value.google_url}
                className="h-16 rounded w-24"
              />
            </button>
          );
        })}
        {carouselMedia?.length < 9 && (
          <button
            onClick={(e) => {
              e.preventDefault();
              setRightCarouselSelected('Library');
              setSelectedCarouselIndex(null);
            }}
            className="h-16 rounded w-24 border border-dashed flex flex-col justify-center items-center hover:border-[#F604D0]"
          >
            <p className="silka-medium text-gray-800 text-[10px]">
              Select Image
            </p>
          </button>
        )}
      </div>
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
      <InstagramCarouselOptions
        workspaceId={workspaceId}
        draftId={selectedCarousel}
        postText={text}
        carouselMedia={carouselMedia}
        setCarouselMedia={setCarouselMedia}
        setRefetchCarouselDrafts={setRefetchCarouselDrafts}
        setSelectedCarousel={setSelectedCarousel}
        isPremium={isPremium}
        userId={userId}
      />
    </div>
  );
}
