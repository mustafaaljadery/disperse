import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import { clsx } from 'clsx';
import { apiUrl } from '../../../utils/apiUrl';

interface Props {
  audio: string;
  setAudio: Dispatch<SetStateAction<string>>;
  adhdVideo: string;
  setAdhdVideo: Dispatch<SetStateAction<string>>;
}

async function getAdhdVideos() {
  try {
    const result = await axios.get(
      `${apiUrl()}editor/read/adhdvideos`
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function getAudio() {
  try {
    const result = await axios.get(`${apiUrl()}editor/read/audio`);
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

interface CompProps {
  value: any;
  setAudio: Dispatch<SetStateAction<string>>;
  audio: string;
  setAdhdVideo: Dispatch<SetStateAction<string>>;
  adhdVideo: string;
}

function Audio({ value, setAudio, setAdhdVideo, audio }: CompProps) {
  return (
    <div className="flex flex-row space-x-3 w-full">
      <button
        onClick={() => {
          setAudio(value?.name);
        }}
        className="my-auto relative h-[50px]"
      >
        <div
          className={
            'h-[16px] w-[16px] flex flex-col justify-center items-center border border-white rounded-full m-1 ' +
            (audio == value?.name ? 'bg-[#FF623D]' : 'bg-gray-300')
          }
        >
          {audio == value?.name && (
            <svg
              width="10"
              height="10"
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
      </button>
      <audio
        className="my-auto h-[48px]"
        src={value?.audio}
        controls
      />
    </div>
  );
}

function Video({
  adhdVideo,
  audio,
  value,
  setAudio,
  setAdhdVideo,
}: CompProps) {
  return (
    <HoverCardPrimitive.Root>
      <HoverCardPrimitive.Trigger asChild>
        <button
          onClick={() => {
            setAdhdVideo(value?.name == 'None' ? '' : value?.name);
          }}
          className="w-full relative h-[50px]"
        >
          <img className="rounded" src={value?.thumbnail} />
          <div className="absolute inset-0 flex flex-row justify-end items-start z-10">
            <div
              className={
                'h-[16px] w-[16px] flex flex-col justify-center items-center border border-white rounded-full m-1 ' +
                (adhdVideo == value?.name ||
                (value?.name == 'None' && !adhdVideo)
                  ? 'bg-[#FF623D]'
                  : 'bg-gray-300')
              }
            >
              {adhdVideo == value?.name ||
              (value?.name == 'None' && !adhdVideo) ? (
                <svg
                  width="10"
                  height="10"
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
              ) : (
                <></>
              )}
            </div>
          </div>
        </button>
      </HoverCardPrimitive.Trigger>
      {value?.name != 'None' && (
        <HoverCardPrimitive.Content
          align="start"
          sideOffset={16}
          className={clsx(
            ' radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
            'max-w-md rounded-lg p-2 z-20 md:w-full',
            'bg-white border',
            'focus:outline-none focus-visible:ring-0'
          )}
        >
          <video
            className="h-[120px]"
            src={value?.video}
            autoPlay
            loop
            muted
          />
        </HoverCardPrimitive.Content>
      )}
    </HoverCardPrimitive.Root>
  );
}

export function EffectsSidebar({
  audio,
  setAudio,
  adhdVideo,
  setAdhdVideo,
}: Props) {
  const [audioLoading, setAudioLoading] = useState(true);
  const [audios, setAudios] = useState<any[]>([]);
  const [videoLoading, setVideoLoading] = useState(true);
  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    getAudio().then((data) => {
      setAudios(audios.concat(data));
      setAudioLoading(false);
    });
    getAdhdVideos().then((data) => {
      setVideos(data);
      setVideoLoading(false);
    });
  }, []);

  return (
    <div className="mt-2">
      <div className="flex flex-col">
        <h2 className="text-sm silka-medium text-[#363636]">
          ADHD Videos
        </h2>
        <p className="text-xs mt-1 silka-regular text-gray-400">
          Add gameplay or other video for better retention.
        </p>
        {videoLoading ? (
          <div className="mt-5 flex flex-col justify-center items-center">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="animate-spin"
            >
              <g clipPath="url(#clip0_1405_2)">
                <path
                  d="M4.84457 21.6005C4.13345 21.0227 3.95568 20.0005 4.53345 19.2449C5.11123 18.5338 6.13345 18.3116 6.88901 18.8894C7.24457 19.1116 7.55568 19.3783 7.95568 19.556C11.289 21.3783 15.4223 20.756 18.089 18.0449C18.7557 17.3783 19.7779 17.3783 20.4446 18.0449C21.0668 18.7116 21.0668 19.7783 20.4446 20.4005C16.7112 24.1783 10.9335 25.1116 6.31123 22.5338C5.7779 22.2671 5.28901 21.9116 4.84457 21.6005Z"
                  fill="#FF623D"
                />
                <path
                  d="M23.8224 13.9555C23.6891 14.8888 22.8002 15.511 21.8669 15.3777C20.9335 15.2444 20.3558 14.3555 20.4891 13.4221C20.578 12.9332 20.578 12.4444 20.578 11.9555C20.578 8.0888 18.0446 4.75547 14.4891 3.73325C13.6002 3.51103 13.0669 2.53325 13.3335 1.64436C13.6002 0.755471 14.4891 0.222137 15.4224 0.488804C20.4446 1.95547 23.9558 6.62214 23.9558 11.9999C23.9558 12.6666 23.9113 13.3332 23.8224 13.9555Z"
                  fill="#FF623D"
                />
                <path
                  d="M7.42222 0.843445C8.26667 0.487889 9.24445 0.932334 9.55556 1.82122C9.86667 2.71011 9.46667 3.68789 8.62222 4.04344C5.42222 5.33233 3.28889 8.48789 3.28889 12.0879C3.28889 12.799 3.37778 13.5101 3.55556 14.1768C3.77778 15.0657 3.24444 15.999 2.35556 16.2212C1.46667 16.4434 0.577778 15.9101 0.355556 14.9768C0.133333 13.999 0 13.0212 0 12.0434C0 7.02122 2.97778 2.62122 7.42222 0.843445Z"
                  fill="#FF623D"
                />
              </g>
              <defs>
                <clipPath id="clip0_1405_2">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        ) : (
          <div className="flex flex-row mt-4 w-full flex-wrap">
            {videos.map((value: any, index: number) => {
              return (
                <div key={index} className="w-1/3 p-2">
                  <Video
                    value={value}
                    setAdhdVideo={setAdhdVideo}
                    setAudio={setAudio}
                    audio={audio}
                    adhdVideo={adhdVideo}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="flex flex-col mt-6">
        <h2 className="text-sm silka-medium text-[#363636]">Audio</h2>
        <p className="text-xs mt-1 silka-regular text-gray-400">
          Pick the perfect audio for your video.
        </p>
        {audioLoading ? (
          <div className="mt-5 flex flex-col justify-center items-center">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="animate-spin"
            >
              <g clipPath="url(#clip0_1405_2)">
                <path
                  d="M4.84457 21.6005C4.13345 21.0227 3.95568 20.0005 4.53345 19.2449C5.11123 18.5338 6.13345 18.3116 6.88901 18.8894C7.24457 19.1116 7.55568 19.3783 7.95568 19.556C11.289 21.3783 15.4223 20.756 18.089 18.0449C18.7557 17.3783 19.7779 17.3783 20.4446 18.0449C21.0668 18.7116 21.0668 19.7783 20.4446 20.4005C16.7112 24.1783 10.9335 25.1116 6.31123 22.5338C5.7779 22.2671 5.28901 21.9116 4.84457 21.6005Z"
                  fill="#FF623D"
                />
                <path
                  d="M23.8224 13.9555C23.6891 14.8888 22.8002 15.511 21.8669 15.3777C20.9335 15.2444 20.3558 14.3555 20.4891 13.4221C20.578 12.9332 20.578 12.4444 20.578 11.9555C20.578 8.0888 18.0446 4.75547 14.4891 3.73325C13.6002 3.51103 13.0669 2.53325 13.3335 1.64436C13.6002 0.755471 14.4891 0.222137 15.4224 0.488804C20.4446 1.95547 23.9558 6.62214 23.9558 11.9999C23.9558 12.6666 23.9113 13.3332 23.8224 13.9555Z"
                  fill="#FF623D"
                />
                <path
                  d="M7.42222 0.843445C8.26667 0.487889 9.24445 0.932334 9.55556 1.82122C9.86667 2.71011 9.46667 3.68789 8.62222 4.04344C5.42222 5.33233 3.28889 8.48789 3.28889 12.0879C3.28889 12.799 3.37778 13.5101 3.55556 14.1768C3.77778 15.0657 3.24444 15.999 2.35556 16.2212C1.46667 16.4434 0.577778 15.9101 0.355556 14.9768C0.133333 13.999 0 13.0212 0 12.0434C0 7.02122 2.97778 2.62122 7.42222 0.843445Z"
                  fill="#FF623D"
                />
              </g>
              <defs>
                <clipPath id="clip0_1405_2">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        ) : (
          <div className="flex mt-4 flex-col space-y-1.5">
            <div className="flex flex-row pb-1 w-full space-x-3">
              <button
                onClick={() => {
                  setAudio('');
                }}
                className="my-auto"
              >
                <div
                  className={
                    'h-[16px] w-[16px] flex flex-col justify-center items-center border border-white rounded-full m-1 ' +
                    (!audio ? 'bg-[#FF623D]' : 'bg-gray-300')
                  }
                >
                  {!audio && (
                    <svg
                      width="10"
                      height="10"
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
              </button>
              <p className="px-2.5 silka-semibold text-lg">None</p>
            </div>
            {audios.map((value, index) => {
              return (
                <Audio
                  key={index}
                  value={value}
                  adhdVideo={adhdVideo}
                  setAdhdVideo={setAdhdVideo}
                  audio={audio}
                  setAudio={setAudio}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
