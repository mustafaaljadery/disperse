import { encode } from 'punycode';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface Props {
  contentFit: string;
  setContentFit: Dispatch<SetStateAction<string>>;
  aspectRatio: string;
  setAspectRatio: Dispatch<SetStateAction<string>>;
  start: number;
  setStart: Dispatch<SetStateAction<number>>;
  end: number;
  setEnd: Dispatch<SetStateAction<number>>;
  duration: number;
}

async function encodeTime(num: number) {
  let minutes: any = Math.floor(num / 60);
  let seconds: any = Math.floor(num % 60);
  if (minutes < 10) minutes = String(`0${minutes}`);
  if (seconds < 10) seconds = String(`0${seconds}`);
  return `${minutes}:${seconds}`;
}

async function decodeTime(val: string) {
  let [minutes, seconds] = val.split(':');
  seconds = String(seconds[0]) + String(seconds[1]);
  if (minutes && seconds) {
    return Math.floor(Number(minutes) * 60 + Number(seconds));
  } else {
    return 0;
  }
}

const contentFitItems = [
  {
    name: 'Fill',
    icon: '/images/edit/fill.png',
    white_icon: '/images/edit/fill-white.png',
  },
  {
    name: 'Fit',
    icon: '/images/edit/fit.png',
    white_icon: '/images/edit/fit-white.png',
  },
];

const aspectRatioItems = [
  {
    name: '1:1',
    icon: '/images/edit/instagram-ratio.png',
    white_icon: '/images/edit/instagram-ratio-white.png',
  },
  {
    name: '9:16',
    icon: '/images/edit/tiktok-ratio.png',
    white_icon: '/images/edit/tiktok-ratio-white.png',
  },
  {
    name: '16:9',
    icon: '/images/edit/youtube-ratio.png',
    white_icon: '/images/edit/youtube-ratio-white.png',
  },
];

export function OptionsSidebar({
  contentFit,
  setContentFit,
  aspectRatio,
  setAspectRatio,
  start,
  setStart,
  end,
  setEnd,
  duration,
}: Props) {
  const [startStr, setStartStr] = useState<any>('00:00');
  const [endStr, setEndStr] = useState<any>('00:00');

  useEffect(() => {
    encodeTime(start).then((value) => {
      setStartStr(value);
    });

    if ((end == 0 && duration > 0) || (end == 0 && duration != 0)) {
      setEnd(duration);
    }

    encodeTime(end).then((value) => {
      setEndStr(value);
    });
  }, [start, end]);

  const startDown = (event: any) => {
    if (event.key === 'Enter') {
      decodeTime(event.target.value).then((value) => {
        if (!value) {
          setStart(0);
        } else {
          setStart(value);
        }
      });
    }
  };

  const endDown = (event: any) => {
    if (event.key === 'Enter') {
      decodeTime(event.target.value).then(async (value) => {
        if (value > duration) {
          toast.error(
            `End time greater than duration, max time ${await encodeTime(
              duration
            )}`,
            {
              className: 'text-sm silka-medium text-gray-900',
            }
          );
          setEnd(duration);
        } else if (!value) {
          setEnd(duration);
        } else {
          setEnd(value);
        }
      });
    }
  };

  return (
    <div className="mt-2 flex flex-col w-full">
      <div className="flex flex-col w-full">
        <div className="w-full flex flex-row justify-between items-betweeen">
          <div>
            <h2 className="text-sm silka-medium text-[#363636]">
              Cut Video
            </h2>
            <p className="text-xs silka-rgular text-gray-400 mt-1">
              Change length of clip.
            </p>
          </div>
          <button
            onClick={() => {
              setStart(0);
              setEnd(duration);
            }}
            className="text-[11px] silka-medium h-fit my-auto px-3 py-1 bg-[#FF623D] text-white rounded hover:opacity-90"
          >
            Full video
          </button>
        </div>
        <div className="flex w-full flex-row mt-4 space-x-3">
          <input
            value={startStr}
            onKeyDown={startDown}
            onChange={(e) => {
              setStartStr(e.target.value);
            }}
            type="text"
            className="w-1/2 focus:ring-0 focus:outline-none border p-1 silka-regular text-[#363636] focus:border-[#Ff623D] border-gray-300 rounded"
          />
          <input
            value={endStr}
            onKeyDown={endDown}
            onChange={(e: any) => {
              setEndStr(e.target.value);
            }}
            type="text"
            className="w-1/2 focus:ring-0 focus:outline-none border p-1 silka-regular text-[#363636] focus:border-[#FF623D] border-gray-300 rounded"
          />
        </div>
      </div>
      <div className="flex flex-col mt-6">
        <h2 className="text-sm silka-medium text-[#363636]">
          Aspect Ratio
        </h2>
        <p className="text-xs mt-1 silka-regular text-gray-400">
          The aspect ratio of how the video will be exported.
        </p>
        <div className="flex flex-row mt-3 space-x-3">
          {aspectRatioItems.map((value: any, index: number) => {
            return (
              <button
                key={index}
                className="w-1/3 flex flex-col space-y-1.5 justify-center items-center"
                onClick={() => {
                  setAspectRatio(value.name);
                }}
              >
                <div
                  className={
                    'py-0.5 rounded flex flex-col justify-center items-center w-full ' +
                    (value.name == aspectRatio
                      ? 'bg-[#FF623D]'
                      : 'bg-gray-50')
                  }
                >
                  <img
                    height={32}
                    width={32}
                    src={
                      value.name == aspectRatio
                        ? value?.white_icon
                        : value?.icon
                    }
                  />
                </div>
                <p
                  className={
                    'text-[10px] silka-medium ' +
                    (value.name == aspectRatio
                      ? 'text-gray-600'
                      : 'text-gray-400')
                  }
                >
                  {value.name}
                </p>
              </button>
            );
          })}
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-sm silka-medium text-[#363636]">
          Content Fit
        </h2>
        <p className="text-xs mt-1 silka-regular text-gray-400">
          How the content is fit to the aspect ratio, determines if
          there's a background or not.
        </p>
        <div className="flex flex-row space-x-3 mt-3">
          {contentFitItems.map((value: any, index: number) => {
            return (
              <button
                key={index}
                className="w-1/2 flex flex-col space-y-1.5 justify-center items-center"
                onClick={() => {
                  setContentFit(value.name);
                }}
              >
                <div
                  className={
                    'py-0.5 rounded flex flex-col justify-center items-center w-full ' +
                    (value?.name == contentFit
                      ? 'bg-[#FF623D]'
                      : 'bg-gray-50')
                  }
                >
                  <img
                    height={32}
                    width={32}
                    src={
                      value.name == contentFit
                        ? value?.white_icon
                        : value?.icon
                    }
                  />
                </div>
                <p
                  className={
                    'text-[10px] silka-medium ' +
                    (value?.name == contentFit
                      ? 'text-gray-600'
                      : 'text-gray-400')
                  }
                >
                  {value.name}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
