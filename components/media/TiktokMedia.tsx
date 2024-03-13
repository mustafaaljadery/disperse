import { useState, Dispatch, SetStateAction } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../utils/apiUrl';
import toast from 'react-hot-toast';

async function getTiktokVideoInfo(tiktokUrl: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}tiktok/read/readvideo`,
      {
        params: { link: tiktokUrl },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function uploadTiktokVideo(
  url: string,
  userId: string,
  folderId: string,
  fileName: string,
  setRefetchData: Dispatch<SetStateAction<boolean>>
) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.post(
      `${apiUrl()}media/tiktok/upload`,
      null,
      {
        params: {
          url: url,
          folderId: folderId,
          userId: userId,
          fileName: fileName,
        },
      }
    );
    setRefetchData(true);
    toast.remove();
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

interface Props {
  folderId: string;
  userId: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setTiktokOpen: Dispatch<SetStateAction<boolean>>;
  setRefetchData: Dispatch<SetStateAction<boolean>>;
}

interface TiktokVideoInfoProps {
  value: any;
  folderId: string;
  userId: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setTiktokOpen: Dispatch<SetStateAction<boolean>>;
  setRefetchData: Dispatch<SetStateAction<boolean>>;
}

function TiktokVideoInfo({
  value,
  folderId,
  userId,
  isOpen,
  setIsOpen,
  setTiktokOpen,
  setRefetchData,
}: TiktokVideoInfoProps) {
  const [downloading, setDownloading] = useState(false);
  return (
    <div className="p-5">
      <div className="flex flex-col-reverse md:space-y-0 md:flex-row justify-between items-between md:space-x-5">
        <div className="flex flex-col justify-between items-between mt-5 md:mt-0">
          <div className="flex flex-col space-y-5">
            <div className="flex flex-col">
              <h3 className="silka-semibold text-sm text-gray-900">
                Author
              </h3>
              <div className="flex flex-col space-y-1 mt-2">
                <span className="text-[11px] text-gray-600 silka-medium">
                  Name
                </span>
                <div className="flex flex-row space-x-1.5">
                  <img
                    src={value.authorImage}
                    className="h-[10px] w-[10px] rounded-full my-auto"
                  />
                  <p className="text-sm silka-regular my-auto">
                    {value.authorName}
                  </p>
                </div>
              </div>
              <div className="flex flex-col space-y-1 mt-3">
                <span className="text-[11px] text-gray-600 silka-medium">
                  Bio
                </span>
                <p className="text-sm silka-regular">
                  {value.authorBio}
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              <h3 className="silka-semibold text-sm text-gray-900">
                Video
              </h3>
              <div className="mt-2 flex flex-col space-y-1">
                <span className="text-[11px] text-gray-600 silka-medium">
                  Description
                </span>
                <p className="text-sm silka-regular">
                  {value.videoDescription}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-end items-end">
            <button
              disabled={downloading}
              onClick={(e) => {
                e.preventDefault();
                setDownloading(true);
                uploadTiktokVideo(
                  value.downloadNoWatermark,
                  userId,
                  folderId,
                  value.authorName,
                  setRefetchData
                );
                toast.loading('Downloading Tiktok Video!', {
                  className: 'text-sm silka-medium',
                  position: 'top-center',
                  duration: 1800000,
                });
                setIsOpen(false);
                setTiktokOpen(false);
              }}
              className={
                'px-4 py-1.5 bg-[#FF623D] rounded text-white text-xs silka-regular ' +
                (downloading ? 'opacity-70' : '')
              }
            >
              Download
            </button>
          </div>
        </div>
        <video
          controls
          className="h-96 rounded"
          src={value.downloadNoWatermark}
        ></video>
      </div>
    </div>
  );
}

function ErrorMessage() {
  return (
    <div className="flex flex-row space-x-2 w-full border border-[#DF4D47] rounded px-4 py-2 mt-4">
      <svg
        width="20"
        height="20"
        viewBox="0 0 8 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="my-auto"
      >
        <g clipPath="url(#clip0_491_2)">
          <path
            d="M4.00067 7.17818C5.84 7.17818 7.33333 5.68485 7.33333 3.84552C7.33333 2.00618 5.84 0.513184 4.00067 0.513184C2.16167 0.513184 0.668335 2.00618 0.668335 3.84552C0.668335 5.68485 2.16167 7.17818 4.00067 7.17818ZM4.00067 6.67818C2.43733 6.67818 1.16833 5.40885 1.16833 3.84552C1.16833 2.28218 2.43733 1.01318 4.00067 1.01318C5.564 1.01318 6.83333 2.28218 6.83333 3.84552C6.83333 5.40885 5.564 6.67818 4.00067 6.67818ZM4.00067 4.51152C3.86267 4.51152 3.75067 4.39952 3.75067 4.26152V2.42818C3.75067 2.29018 3.86267 2.17818 4.00067 2.17818C4.13867 2.17818 4.25067 2.29018 4.25067 2.42818V4.26152C4.25067 4.39952 4.13867 4.51152 4.00067 4.51152ZM4 5.51152C4.184 5.51152 4.33333 5.36218 4.33333 5.17818C4.33333 4.99418 4.184 4.84485 4 4.84485C3.816 4.84485 3.66667 4.99418 3.66667 5.17818C3.66667 5.36218 3.816 5.51152 4 5.51152Z"
            fill="#DF4D47"
          />
        </g>
        <defs>
          <clipPath id="clip0_491_2">
            <rect width="8" height="8" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <p className="text-sm silka-medium text-[#DF4D47]">
        Invalid TikTok Video URL
      </p>
    </div>
  );
}

export function TiktokMedia({
  userId,
  folderId,
  isOpen,
  setIsOpen,
  setTiktokOpen,
  setRefetchData,
}: Props) {
  const [link, setLink] = useState('');
  const [errorOpen, setErrorOpen] = useState(false);
  const [gettingInfo, setGettingInfo] = useState(false);
  const [section, setSection] = useState('media');
  const [tiktokInfo, setTiktokInfo] = useState<any>(null);

  return (
    <>
      {section == 'media' ? (
        <>
          <div className="p-5">
            <DialogPrimitive.Title className="text-base silka-medium text-gray-900">
              Download Tiktok Video
            </DialogPrimitive.Title>
            <DialogPrimitive.Description className="mt-1 text-xs silka-regular text-gray-700 w-9/10">
              Upload a tiktok video to your project
            </DialogPrimitive.Description>
            {errorOpen ? <ErrorMessage /> : <div className="mt-3" />}
            <div>
              <form className="flex flex-row space-x-3 mt-3">
                <input
                  value={link}
                  onChange={(e) => {
                    setLink(e.target.value);
                  }}
                  required
                  type="text"
                  className="w-3/4 text-xs px-3 py-1.5 bg-[#] border border-gray-300 focus:ring-0 focus:border-[#FF623D] rounded silka-regular"
                  placeholder="Tiktok Video URL"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setGettingInfo(true);
                    getTiktokVideoInfo(link).then((value) => {
                      setGettingInfo(false);
                      if (value.status == 'error') {
                        setErrorOpen(true);
                      } else {
                        setTiktokInfo(value);
                        setSection('info');
                      }
                    });
                  }}
                  className="text-xs rounded silka-medium bg-[#FF623D] text-white border border-[#FF4317] w-1/4"
                >
                  Download Video
                </button>
              </form>
            </div>
            <a
              href="https://developers.tiktok.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <button className="mt-4 flex flex-row w-full space-x-4 p-4 hover:bg-gray-50 border rounded">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="my-auto"
                >
                  <path
                    d="M9.66932 9.46792V8.54326C9.34846 8.49768 9.02469 8.47424 8.70066 8.47266C4.73672 8.47266 1.51172 11.6982 1.51172 15.6621C1.51172 18.0937 2.72696 20.2462 4.58077 21.5479C3.33945 20.2204 2.64924 18.4706 2.6503 16.6532C2.6503 12.7456 5.78362 9.55907 9.66932 9.46792Z"
                    fill="#00F2EA"
                  />
                  <path
                    d="M9.83876 19.936C11.6075 19.936 13.0501 18.529 13.1159 16.7756L13.122 1.12289H15.9816C15.9205 0.795962 15.8897 0.464294 15.8894 0.131836H11.9837L11.9771 15.785C11.912 17.5379 10.4686 18.9444 8.70044 18.9444C8.16962 18.9447 7.64669 18.8154 7.17725 18.5675C7.79237 19.4257 8.7829 19.935 9.83876 19.936ZM21.3231 6.43616V5.56629C20.2722 5.56734 19.2437 5.26149 18.3641 4.68667C19.1355 5.57472 20.1737 6.18853 21.3236 6.43616"
                    fill="#00F2EA"
                  />
                  <path
                    d="M18.3644 4.68623C17.5024 3.69992 17.0274 2.4341 17.028 1.12402H15.9816C16.2553 2.58716 17.1165 3.87457 18.3644 4.68623ZM8.7007 12.3786C6.88825 12.3807 5.41959 13.8494 5.41748 15.6618C5.41853 16.8821 6.0961 18.0011 7.17698 18.5681C6.77313 18.0112 6.55579 17.3412 6.55579 16.6534C6.55764 14.841 8.0263 13.3718 9.83902 13.3697C10.1773 13.3697 10.5016 13.4255 10.8077 13.5217V9.53427C10.4868 9.48869 10.163 9.46525 9.83902 9.46367C9.78211 9.46367 9.726 9.46683 9.66963 9.46788V12.5306C9.35613 12.431 9.02947 12.3797 8.7007 12.3786Z"
                    fill="#FF004F"
                  />
                  <path
                    d="M21.3233 6.43634V9.47193C19.2977 9.47193 17.4218 8.82413 15.8894 7.72455V15.6619C15.8894 19.6259 12.6649 22.8509 8.70095 22.8509C7.16906 22.8509 5.74861 22.3675 4.58105 21.5476C5.93802 23.011 7.84346 23.8424 9.839 23.8419C13.8029 23.8419 17.0279 20.6169 17.0279 16.6535V8.71613C18.6109 9.85444 20.5122 10.4659 22.4619 10.4635V6.55673C22.0709 6.55673 21.6908 6.51431 21.323 6.43555"
                    fill="#FF004F"
                  />
                  <path
                    d="M15.8892 15.6618V7.72445C17.4722 8.86303 19.3734 9.4742 21.3231 9.47183V6.4365C20.1735 6.18861 19.1353 5.57454 18.3642 4.68622C17.1163 3.87457 16.2551 2.58716 15.9814 1.12402H13.122L13.116 16.7767C13.0504 18.5296 11.6075 19.9366 9.83881 19.9366C8.78322 19.9356 7.79243 19.4261 7.17756 18.5683C6.09668 18.0017 5.41886 16.8826 5.41754 15.6621C5.41965 13.8496 6.88831 12.381 8.70076 12.3789C9.03849 12.3789 9.36278 12.4342 9.66942 12.5309V9.46814C5.78372 9.55929 2.65039 12.7458 2.65039 16.6534C2.65039 18.543 3.38459 20.2633 4.58086 21.5481C5.78688 22.3971 7.22604 22.8521 8.70076 22.8508C12.665 22.8508 15.8892 19.6258 15.8892 15.6618Z"
                    fill="black"
                  />
                </svg>

                <div className="flex flex-col justify-start items-start space-y-1">
                  <h3 className="silka-medium text-xs">
                    TikTok Docs
                  </h3>
                  <p className="silka-regular text-xs text-gray-500">
                    Learn more about Tiktok for Developers.
                  </p>
                </div>
              </button>
            </a>
            {gettingInfo ? (
              <div className="flex flex-row space-x-3 mt-4 justify-center items-center">
                <span className="animate-ping h-3 w-3 rounded-full bg-[#FF623D] opacity-75"></span>
                <p className="text-xs silka-medium">
                  Getting Info...
                </p>
              </div>
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <TiktokVideoInfo
          value={tiktokInfo}
          folderId={folderId}
          userId={userId}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setTiktokOpen={setTiktokOpen}
          setRefetchData={setRefetchData}
        />
      )}
    </>
  );
}
