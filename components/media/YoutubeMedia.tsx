import * as DialogPrimitive from '@radix-ui/react-dialog';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useState } from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../utils/apiUrl';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = [
    'Bytes',
    'KB',
    'MB',
    'GB',
    'TB',
    'PB',
    'EB',
    'ZB',
    'YB',
  ];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${
    sizes[i]
  }`;
}

function secondsToHms(d: any) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  var hDisplay = h > 0 ? h + (h == 1 ? ' hour, ' : ' hours, ') : '';
  var mDisplay =
    m > 0 ? m + (m == 1 ? ' minute, ' : ' minutes, ') : '';
  var sDisplay = s > 0 ? s + (s == 1 ? ' second' : ' seconds') : '';
  return hDisplay + mDisplay + sDisplay;
}

interface Props {
  userId: string;
  youtubeOpen: boolean;
  setYoutubeOpen: Dispatch<SetStateAction<boolean>>;
  folderId: string;
  workspaceName: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setRefetchData: Dispatch<SetStateAction<boolean>>;
}

interface InfoOpenProps {
  userId: string;
  image: string;
  title: string;
  channel: number;
  duration: string;
  workspaceName: string;
  folderId: string;
  youtubeLink: string;
  formats: {};
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setYoutubeOpen: Dispatch<SetStateAction<boolean>>;
  setRefetchData: Dispatch<SetStateAction<boolean>>;
  setInfoOpen: Dispatch<SetStateAction<boolean>>;
}

interface HandleInfoSubmitProsp {
  e: any;
  infoOpen: boolean;
  setInfoOpen: Dispatch<SetStateAction<boolean>>;
}

interface YoutubeOpenProps {
  userId: string;
  setYoutubeOpen: Dispatch<SetStateAction<boolean>>;
  setInfoOpen: Dispatch<SetStateAction<boolean>>;
  setValue: Dispatch<SetStateAction<{}>>;
  errorOpen: boolean;
  setErrorOpen: Dispatch<SetStateAction<boolean>>;
  link: string;
  setLink: Dispatch<SetStateAction<string>>;
}

function ErrorMessage() {
  return (
    <div className="flex flex-row space-x-2 w-full border border-[#DF4D47] rounded px-4 py-2 mt-6">
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
        Invalid Video URL
      </p>
    </div>
  );
}

function InfoOpen({
  image,
  title,
  channel,
  userId,
  duration,
  workspaceName,
  folderId,
  youtubeLink,
  formats,
  setIsOpen,
  setYoutubeOpen,
  setRefetchData,
  setInfoOpen,
}: InfoOpenProps) {
  const [clicked, setClicked] = useState<any>(null);
  const [downloading, setDownloading] = useState(false);

  axiosRetry(axios, { retries: 3 });

  async function handleSubmit() {
    let itag = clicked?.itag;
    let size = clicked?.size;
    try {
      await axios.post(`${apiUrl()}media/youtube/upload`, null, {
        params: {
          userId: userId,
          itag: itag,
          youtubeLink: youtubeLink,
          workspaceName: workspaceName,
          videoSize: size,
          videoName: title,
          folderId: folderId,
        },
      });
      setRefetchData(true);
      toast.remove();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="p-4">
      <DialogPrimitive.Title className="text-base silka-medium text-gray-900">
        Download Youtube Video
      </DialogPrimitive.Title>
      <DialogPrimitive.Description className="mt-1 text-xs silka-regular text-gray-700 w-9/10">
        Upload a youtube video to your project
      </DialogPrimitive.Description>
      <div className="mt-6 flex flex-col space-y-5">
        <div className="flex flex-col justify-center items-center w-full">
          {!image.includes('/null/') ? (
            <Image
              className="rounded-lg w-full"
              alt="Youtube Video"
              src={image}
              width={490}
              height={275}
            />
          ) : (
            <div className="h-[180x] flex flex-col justify-center w-full items-center">
              <p className="text-sm silka-semibold text-[#363636]">
                No Thumbnail Found
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex flex-col space-y-1.5">
            <h3 className="silka-semibold text-gray-900 text-xs">
              Title
            </h3>
            <p className="text-sm silka-regular text-gray-600">
              {title}
            </p>
          </div>
          <div className="flex flex-col space-y-1.5">
            <h3 className="silka-semibold text-gray-900 text-xs">
              Channel
            </h3>
            <p className="text-sm silka-regular text-gray-600">
              {channel}
            </p>
          </div>
          <div className="flex flex-col space-y-1.5">
            <h3 className="silka-semibold text-gray-900 text-xs">
              Duration
            </h3>
            <p className="text-sm silka-regular text-gray-600">
              {secondsToHms(duration)}
            </p>
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setDownloading(true);
            handleSubmit();
            toast.loading('Downloading Youtube Video!', {
              className: 'text-sm silka-medium',
              position: 'top-center',
              duration: 1800000,
            });
            setIsOpen(false);
            setInfoOpen(false);
            setYoutubeOpen(false);
          }}
        >
          <div className="flex flex-row justify-end items-end mt-4">
            <button
              type="submit"
              className="text-xs silka-medium bg-[#FF623D] py-1.5 text-white rounded hover:opacity-80 px-4"
            >
              Download Video
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function YoutubeOpen({
  userId,
  setYoutubeOpen,
  setInfoOpen,
  setValue,
  errorOpen,
  setErrorOpen,
  link,
  setLink,
}: YoutubeOpenProps) {
  const [gettingInfo, setGettingInfo] = useState(false);

  async function handleInfoSubmit(e: any, youtubeLink: string) {
    try {
      const result = await axios.post(
        `${apiUrl()}media/youtube/getinfo`,
        null,
        {
          params: { url: youtubeLink },
        }
      );
      console.log(result.data);
      return result.data;
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="p-4">
      <DialogPrimitive.Title className="text-base silka-medium text-gray-900">
        Download Youtube Video
      </DialogPrimitive.Title>
      <DialogPrimitive.Description className="mt-1 text-xs silka-regular text-gray-700 w-9/10">
        Upload a youtube video to your project
      </DialogPrimitive.Description>
      {errorOpen ? <ErrorMessage /> : <div className="mt-3" />}
      <div className="mt-3 flex flex-col">
        <form className="flex flex-row w-full space-x-3">
          <input
            className="w-3/4 text-xs px-3 py-1.5 bg-[#] border border-gray-300 focus:ring-0 focus:border-[#FF623D] rounded silka-regular"
            value={link}
            onChange={(e) => {
              setLink(e.target.value);
            }}
            type="text"
            placeholder="Youtube Video URL"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setGettingInfo(true);
              setErrorOpen(false);
              handleInfoSubmit(e, link).then((value) => {
                if (value.value == 'Invalid Youtube Link') {
                  setErrorOpen(true);
                  setGettingInfo(false);
                } else {
                  setValue(value.value);
                  setInfoOpen(true);
                  setYoutubeOpen(false);
                }
              });
            }}
            className="text-xs rounded silka-medium bg-[#FF623D] text-white border border-[#FF4317] w-1/4"
          >
            Download Video
          </button>
        </form>
        <a
          href="https://developers.google.com/youtube/v3"
          target="_blank"
          rel="noreferrer noopener"
        >
          <button className="mt-4 flex flex-row w-full p-4 hover:bg-gray-50 border rounded space-x-3">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="my-auto"
            >
              <g clipPath="url(#clip0_844_9)">
                <path
                  d="M19.615 3.18413C16.011 2.93813 7.984 2.93913 4.385 3.18413C0.488 3.45013 0.029 5.80412 0 12.0001C0.029 18.1851 0.484 20.5491 4.385 20.8161C7.985 21.0611 16.011 21.0621 19.615 20.8161C23.512 20.5501 23.971 18.1961 24 12.0001C23.971 5.81512 23.516 3.45113 19.615 3.18413V3.18413ZM9 16.0001V8.00013L17 11.9931L9 16.0001V16.0001Z"
                  fill="#FF0000"
                />
              </g>
              <defs>
                <clipPath id="clip0_844_9">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <div className="flex flex-col justify-start items-start space-y-1">
              <h3 className="silka-medium text-xs">Youtube Docs</h3>
              <p className="silka-regular text-xs text-gray-500">
                Learn more about Youtube for Developers.
              </p>
            </div>
          </button>
        </a>
        {gettingInfo ? (
          <div className="flex flex-row space-x-3 mt-4 justify-center items-center">
            <span className="animate-ping h-3 w-3 rounded-full bg-[#FF623D] opacity-75"></span>
            <p className="text-xs silka-medium">Getting Info...</p>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export function YoutubeMedia({
  userId,
  youtubeOpen,
  setYoutubeOpen,
  folderId,
  workspaceName,
  isOpen,
  setIsOpen,
  setRefetchData,
}: Props) {
  const [youtubeValue, setYoutubeValue] = useState(youtubeOpen);
  const [infoOpen, setInfoOpen] = useState(false);
  const [value, setValue] = useState({});
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [link, setLink] = useState('');

  return (
    <>
      {youtubeValue ? (
        <YoutubeOpen
          userId={userId}
          setYoutubeOpen={setYoutubeValue}
          setInfoOpen={setInfoOpen}
          setValue={setValue}
          errorOpen={errorOpen}
          setErrorOpen={setErrorOpen}
          link={link}
          setLink={setLink}
        />
      ) : infoOpen && value ? (
        <InfoOpen
          workspaceName={workspaceName}
          setIsOpen={setIsOpen}
          setYoutubeOpen={setYoutubeOpen}
          setInfoOpen={setInfoOpen}
          setRefetchData={setRefetchData}
          youtubeLink={link}
          userId={userId}
          folderId={folderId}
          //@ts-ignore
          title={value.title}
          //@ts-ignore
          image={value.thumbnail}
          //@ts-ignore
          channel={value.channel}
          //@ts-ignore
          duration={value.duration}
          //@ts-ignore
          formats={value.formats}
        />
      ) : (
        <></>
      )}
    </>
  );
}
