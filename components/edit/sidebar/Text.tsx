import { Dispatch, SetStateAction, useState } from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { clsx } from 'clsx';
import axios from 'axios';
import toast from 'react-hot-toast';
import { apiUrl } from '../../../utils/apiUrl';
import { ColorPicker, useColor } from 'react-color-palette';
import 'react-color-palette/lib/css/styles.css';

interface Props {
  captionOptions: boolean;
  setCaptionOptions: Dispatch<SetStateAction<boolean>>;
  font: string;
  setFont: Dispatch<SetStateAction<string>>;
  position: string;
  setPosition: Dispatch<SetStateAction<string>>;
  size: string;
  setSize: Dispatch<SetStateAction<string>>;
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
  alignment: string;
  setAlignment: Dispatch<SetStateAction<string>>;
  capitalization: string;
  setCapitalization: Dispatch<SetStateAction<string>>;
  transition: string;
  setTransition: Dispatch<SetStateAction<string>>;
  file: string;
  setFile: Dispatch<SetStateAction<string>>;
  compositionId: string;
  wordsPerLine: string;
  setWordsPerLine: Dispatch<SetStateAction<string>>;
  effect: string;
  setEffect: Dispatch<SetStateAction<string>>;
  generating: boolean;
  setGenerating: Dispatch<SetStateAction<boolean>>;
}

interface MakeCaptionProps {
  setGenerating: Dispatch<SetStateAction<boolean>>;
  file: any;
  setCaptionOptions: Dispatch<SetStateAction<boolean>>;
  compositionId: string;
}

async function createCaptions(compositionId: string) {
  try {
    const result = await axios.post(
      `${apiUrl()}editor/create/captions`,
      null,
      {
        params: {
          compositionId: compositionId,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

const fontItems = [
  {
    name: 'Avenir Next',
    tailwindName: 'avenir-next-font',
  },
  {
    name: 'Pacifico',
    tailwindName: 'pacifico-font',
  },
  {
    name: 'Bangers',
    tailwindName: 'bangers-font',
  },
  {
    name: 'Lobster',
    tailwindName: 'lobster-font',
  },
  {
    name: 'Roboto',
    tailwindName: 'roboto-font',
  },
  {
    name: 'Lilita One',
    tailwindName: 'lilita-one-font',
  },
  {
    name: 'Rye',
    tailwindName: 'rye-font',
  },
  {
    name: 'Bungee',
    tailwindName: 'bungee-font',
  },
];

const fontSizeItems = [
  {
    name: '10px',
  },
  {
    name: '12px',
  },
  {
    name: '16px',
  },
  {
    name: '20px',
  },
  {
    name: '24px',
  },
  {
    name: '32px',
  },
  {
    name: '40px',
  },
  {
    name: '48px',
  },
  {
    name: '56px',
  },
  {
    name: '64px',
  },
  {
    name: '88px',
  },
  {
    name: '96px',
  },
];

const alignmentItems = [
  {
    name: 'Left',
    icon: '/images/edit/left.png',
    white_icon: '/images/edit/left-white.png',
  },
  {
    name: 'Middle',
    icon: '/images/edit/middle.png',
    white_icon: '/images/edit/middle-white.png',
  },
  {
    name: 'Right',
    icon: '/images/edit/right.png',
    white_icon: '/images/edit/right-white.png',
  },
];

const wordsPerLineItems = [
  {
    name: 'One',
    icon: '/images/edit/one.png',
    white_icon: '/images/edit/one-white.png',
  },
  {
    name: 'Three',
    icon: '/images/edit/three.png',
    white_icon: '/images/edit/three-white.png',
  },
  {
    name: 'Five',
    icon: '/images/edit/five.png',
    white_icon: '/images/edit/five-white.png',
  },
];

const capitalizationItems = [
  {
    name: 'None',
    icon: '/images/edit/none.png',
    white_icon: '/images/edit/none-white.png',
  },
  {
    name: 'Uppercase',
    icon: '/images/edit/uppercase.png',
    white_icon: '/images/edit/uppercase-white.png',
  },
  {
    name: 'Lowercase',
    icon: '/images/edit/lowercase.png',
    white_icon: '/images/edit/lowercase-white.png',
  },
];

const positionItems = [
  {
    name: 'Top',
    icon: '/images/edit/top-align.png',
    white_icon: '/images/edit/top-align-white.png',
  },
  {
    name: 'Middle',
    icon: '/images/edit/middle-align.png',
    white_icon: '/images/edit/middle-align-white.png',
  },
  {
    name: 'Bottom',
    icon: '/images/edit/bottom-align.png',
    white_icon: '/images/edit/bottom-align-white.png',
  },
];

const effectItems = [
  {
    name: 'Default',
    icon: '/images/edit/default.png',
    white_icon: '/images/edit/default-white.png',
  },
  {
    name: 'Shadow',
    icon: '/images/edit/shadow.png',
    white_icon: '/images/edit/shadow-white.png',
  },
  {
    name: 'Outline',
    icon: '/images/edit/outline.png',
    white_icon: '/images/edit/outline-white.png',
  },
];

function CaptionOptions({
  captionOptions,
  setCaptionOptions,
  font,
  setFont,
  position,
  setPosition,
  size,
  setSize,
  color,
  setColor,
  alignment,
  setAlignment,
  capitalization,
  setCapitalization,
  transition,
  setTransition,
  wordsPerLine,
  setWordsPerLine,
  effect,
  setEffect,
}: Props) {
  const [colorValue, setColorValue] = useColor('hex', color);
  return (
    <div className="mt-2 flex flex-col">
      <div className="flex flex-col">
        <h2 className="text-sm silka-medium text-[#363636]">Font</h2>
        <p className="text-xs mt-1 silka-regular text-gray-400">
          Style of the text
        </p>
        <DropdownMenuPrimitive.Root>
          <DropdownMenuPrimitive.Trigger asChild>
            <button
              className={
                'flex mt-3 flex-row py-1.5 rounded-lg border px-3.5 border-gray-200 justify-between items-between '
              }
            >
              <p
                className={
                  'text-base my-auto text-[#363636] ' +
                  (font?.toLowerCase().replace(' ', '-') + '-font')
                }
              >
                {font}
              </p>
              <svg
                width="12"
                height="12"
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
          <DropdownMenuPrimitive.Portal>
            <DropdownMenuPrimitive.Content
              align="start"
              sideOffset={5}
              className={clsx(
                'radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
                'rounded-lg px-1.5 py-1 shadow-md w-64',
                'bg-white'
              )}
            >
              <div className="flex flex-col w-full space-y-0.5">
                {fontItems.map((value: any, index: number) => {
                  return (
                    <DropdownMenuPrimitive.Item className="w-full">
                      <button
                        onClick={() => {
                          setFont(value?.name);
                        }}
                        className={
                          'py-1 px-3 text-[#363636] w-full hover:bg-gray-100 rounded ' +
                          value?.tailwindName
                        }
                      >
                        {value?.name}
                      </button>
                    </DropdownMenuPrimitive.Item>
                  );
                })}
              </div>
            </DropdownMenuPrimitive.Content>
          </DropdownMenuPrimitive.Portal>
        </DropdownMenuPrimitive.Root>
      </div>
      <div className="flex flex-col mt-6">
        <h2 className="text-sm silka-medium text-[#363636]">
          Text Effects
        </h2>
        <p className="text-xs mt-1 silka-regular text-gray-400">
          Add effects to your text.
        </p>
        <div className="flex flex-row mt-3 space-x-3">
          {effectItems.map((value: any, index: number) => {
            return (
              <button
                key={index}
                className="w-1/3 flex flex-col space-y-1.5 justify-center items-center"
                onClick={() => {
                  setEffect(value?.name);
                }}
              >
                <div
                  className={
                    'py-0.5 rounded flex flex-col justify-center items-center w-full ' +
                    (value?.name == effect
                      ? 'bg-[#FF623D]'
                      : 'bg-gray-50')
                  }
                >
                  <img
                    height={32}
                    width={32}
                    src={
                      value?.name == effect
                        ? value?.white_icon
                        : value?.icon
                    }
                  />
                </div>
                <p
                  className={
                    'text-[10px] silka-medium ' +
                    (value?.name == effect
                      ? 'text-gray-600'
                      : 'text-gray-400')
                  }
                >
                  {value?.name}
                </p>
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col mt-6">
        <h2 className="text-sm silka-medium text-[#363636]">
          Words per Line
        </h2>
        <p className="text-xs mt-1 silka-regular text-gray-400">
          Number of words per line of animation.
        </p>
        <div className="flex flex-row mt-3 space-x-3">
          {wordsPerLineItems.map((value: any, index: number) => {
            return (
              <button
                key={index}
                className="w-1/3 flex flex-col space-y-1.5 justify-center items-center"
                onClick={() => {
                  setWordsPerLine(value?.name);
                }}
              >
                <div
                  className={
                    'py-0.5 rounded flex flex-col justify-center items-center w-full ' +
                    (wordsPerLine == value?.name
                      ? 'bg-[#FF623D]'
                      : 'bg-gray-50')
                  }
                >
                  <img
                    height={32}
                    width={32}
                    src={
                      value?.name == wordsPerLine
                        ? value?.white_icon
                        : value?.icon
                    }
                  />
                </div>
                <p
                  className={
                    'text-[10px] silka-medium ' +
                    (value?.name == wordsPerLine
                      ? 'text-gray-600'
                      : 'text-gray-400')
                  }
                >
                  {value?.name}
                </p>
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col mt-6">
        <h2 className="text-sm silka-medium text-[#363636]">
          Position
        </h2>
        <p className="text-xs mt-1 silka-regular text-gray-400">
          Position of text on video screen.
        </p>
        <div className="flex flex-row space-x-3 mt-3">
          {positionItems.map((value: any, index: number) => {
            return (
              <button
                className="w-1/3 flex flex-col space-y-1.5 justify-center items-center"
                onClick={() => {
                  setPosition(value?.name);
                }}
                key={index}
              >
                <div
                  className={
                    'py-0.5 rounded flex flex-col justify-center items-center w-full ' +
                    (value?.name == position
                      ? 'bg-[#FF623D]'
                      : 'bg-gray-50')
                  }
                >
                  <img
                    height={32}
                    width={32}
                    src={
                      value?.name == position
                        ? value?.white_icon
                        : value?.icon
                    }
                  />
                </div>
                <p
                  className={
                    'text-[10px] silka-medium ' +
                    (value?.name == position
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
      <div className="flex flex-col mt-6">
        <h2 className="text-sm silka-medium text-[#363636]">Size</h2>
        <p className="text-xs mt-1 silka-regular text-gray-400">
          Change the font size.
        </p>
        <DropdownMenuPrimitive.Root>
          <DropdownMenuPrimitive.Trigger asChild>
            <button className="flex mt-3 flex-row py-2 rounded-lg border px-4 border-gray-200 justify-between items-between">
              <p className="text-sm silka-medium text-[#363636] my-auto">
                {size}
              </p>
              <svg
                width="12"
                height="12"
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
          <DropdownMenuPrimitive.Portal>
            <DropdownMenuPrimitive.Content
              align="start"
              sideOffset={5}
              className={clsx(
                'radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
                'rounded-lg px-1.5 py-1 shadow-md w-64',
                'bg-white'
              )}
            >
              <div className="flex flex-col w-full space-y-0.5">
                {fontSizeItems.map((value: any, index: number) => {
                  return (
                    <DropdownMenuPrimitive.Item
                      key={index}
                      className="w-full"
                    >
                      <button
                        onClick={() => {
                          setSize(value?.name);
                        }}
                        className={
                          'py-1.5 px-3 w-full hover:bg-gray-100 text-sm rounded silka-medium'
                        }
                      >
                        {value?.name}
                      </button>
                    </DropdownMenuPrimitive.Item>
                  );
                })}
              </div>
            </DropdownMenuPrimitive.Content>
          </DropdownMenuPrimitive.Portal>
        </DropdownMenuPrimitive.Root>
      </div>
      <div className="flex flex-col mt-6">
        <h2 className="text-sm silka-medium text-[#363636]">Color</h2>
        <p className="text-xs mt-1 silka-regular text-gray-400">
          Select color of text.
        </p>
        <div className="flex flex-row mt-3 space-x-4">
          <div
            style={{
              backgroundColor: color,
            }}
            className="h-[32px] border rounded w-[32px]"
          />
          <p className="text-base my-auto silka-semibold text-[#363636]">
            {color.toUpperCase()}
          </p>
          <DropdownMenuPrimitive.Root>
            <DropdownMenuPrimitive.Trigger asChild>
              <button className="my-auto text-xs px-4 py-1.5 rounded bg-[#FF623D] text-white hover:opacity-90 silka-medium">
                Select Color
              </button>
            </DropdownMenuPrimitive.Trigger>
            <DropdownMenuPrimitive.Portal>
              <DropdownMenuPrimitive.Content
                align="start"
                sideOffset={10}
                className={clsx(
                  'radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
                  'w-48 rounded-lg px-1.5 py-1 shadow-md md:w-56',
                  'bg-white dark:bg-gray-800'
                )}
              >
                <ColorPicker
                  width={456 * 0.75}
                  height={228 * 0.5}
                  color={colorValue}
                  onChange={(e) => {
                    setColorValue(e);
                    setColor(e.hex);
                  }}
                  hideHSV
                />
              </DropdownMenuPrimitive.Content>
            </DropdownMenuPrimitive.Portal>
          </DropdownMenuPrimitive.Root>
        </div>
      </div>
      <div className="flex flex-col mt-6">
        <h2 className="text-sm silka-medium text-[#363636]">
          Alignment
        </h2>
        <p className="text-xs mt-1 silka-regular text-gray-400">
          Left, center or right.
        </p>
        <div className="flex flex-row mt-3 space-x-3">
          {alignmentItems.map((value: any, index: number) => {
            return (
              <button
                key={index}
                className="w-1/3 flex flex-col space-y-1.5 justify-center items-center"
                onClick={() => {
                  setAlignment(value?.name);
                }}
              >
                <div
                  className={
                    'py-0.5 rounded flex flex-col justify-center items-center w-full ' +
                    (value?.name == alignment
                      ? 'bg-[#FF623D]'
                      : 'bg-gray-50')
                  }
                >
                  <img
                    height={32}
                    width={32}
                    src={
                      value?.name == alignment
                        ? value?.white_icon
                        : value.icon
                    }
                  />
                </div>
                <p
                  className={
                    'text-[10px] silka-medium ' +
                    (value?.name == alignment
                      ? 'text-gray-600'
                      : 'text-gray-400')
                  }
                >
                  {value?.name}
                </p>
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col mt-6">
        <h2 className="text-sm silka-medium text-[#363636]">
          Capitalization
        </h2>
        <p className="text-xs mt-1 silka-regular text-gray-400">
          Structure of the text in the video.
        </p>
        <div className="flex flex-row mt-3 space-x-3">
          {capitalizationItems.map((value: any, index: number) => {
            return (
              <button
                key={index}
                className="w-1/3 flex flex-col space-y-1.5 justify-center items-center"
                onClick={() => {
                  setCapitalization(value?.name);
                }}
              >
                <div
                  className={
                    'py-0.5 rounded flex flex-col justify-center items-center w-full ' +
                    (value?.name == capitalization
                      ? 'bg-[#FF623D]'
                      : 'bg-gray-50')
                  }
                >
                  <img
                    height={32}
                    width={32}
                    src={
                      value?.name == capitalization
                        ? value?.white_icon
                        : value?.icon
                    }
                  />
                </div>
                <p
                  className={
                    'text-[10px] silka-medium ' +
                    (value?.name == capitalization
                      ? 'text-gray-600'
                      : 'text-gray-400')
                  }
                >
                  {value?.name}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function GeneratingCaption() {
  return (
    <div className="mt-5 flex flex-col justify-center items-center w-full">
      <div className="p-2.5 rounded-lg bg-[#F6EEEC]">
        <svg
          width="28"
          height="28"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_1537_2)">
            <path
              d="M4.16 63.0187C5.33 63.6587 6.66 63.9987 8 63.9987C9.54 63.9987 11.03 63.5587 12.33 62.7287L26.33 53.7287C28.63 52.2487 30 49.7387 30 46.9987C30 44.2587 28.63 41.7487 26.33 40.2687L12.33 31.2687C9.91 29.7187 6.69 29.5987 4.17 30.9787C1.6 32.3787 0 35.0687 0 37.9987V55.9987C0 58.9287 1.6 61.6187 4.16 63.0187ZM8 37.9987L22 46.9987L8 55.9987V37.9987Z"
              fill="#FF623D"
            />
            <path
              d="M64 20.08C64 13.42 58.58 8 51.92 8H38.83C37.91 8 37 7.68 36.28 7.11L30.71 2.65C28.58 0.94 25.9 0 23.17 0H12.08C5.42 0 0 5.42 0 12.08V18C0 20.21 1.79 22 4 22C6.21 22 8 20.21 8 18V12.08C8 9.83 9.83 8 12.08 8H23.17C24.09 8 25 8.32 25.72 8.89L31.3 13.35C33.43 15.06 36.11 16 38.84 16H51.93C54.18 16 56.01 17.83 56.01 20.08V32C56.01 42.41 56.01 47.64 53.99 50.67C53.11 51.99 52 53.1 50.68 53.98C48.29 55.58 44.52 55.91 37.97 55.98C35.76 56 33.99 57.82 34.02 60.02C34.04 62.21 35.83 63.97 38.02 63.97C38.04 63.97 38.05 63.97 38.07 63.97C46.2 63.88 51.07 63.34 55.14 60.62C57.33 59.15 59.19 57.3 60.66 55.1C64.03 50.06 64.03 44.02 64.03 31.99V20.07L64 20.08Z"
              fill="#FF623D"
            />
          </g>
          <defs>
            <clipPath id="clip0_1537_2">
              <rect width="64" height="64" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div className="flex mt-4 flex-row space-x-3">
        <h2 className="silka-bold text-lg text-[#363636]">
          Transcribing...
        </h2>
      </div>
      <p className="mt-2.5 text-center text-xs silka-regular text-gray-400">
        We're preparing your video, this may take up to a minute.
      </p>
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-spin mt-4"
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
  );
}

function MakeCaption({
  file,
  setGenerating,
  compositionId,
  setCaptionOptions,
}: MakeCaptionProps) {
  return (
    <div className="mt-2">
      <div className="flex flex-row space-x-3.5">
        <svg
          width="40"
          height="29"
          viewBox="0 0 50 29"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="my-auto"
        >
          <g clipPath="url(#clip0_1536_2)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 6.45342C0 2.89791 2.88833 0.015625 6.45167 0.015625H43.5483C47.1117 0.015625 50 2.89791 50 6.45342V22.5475C50 26.103 47.1117 28.9853 43.5483 28.9853H6.45167C2.88833 28.9853 0 26.103 0 22.5475L0 6.45342ZM6.45167 8.06274C6.45167 7.17387 7.17383 6.45342 8.06446 6.45342H24.1936C25.0842 6.45342 25.8066 7.17387 25.8066 8.06274C25.8066 8.95162 25.0842 9.67223 24.1936 9.67223H8.06446C7.17383 9.67223 6.45167 8.95162 6.45167 8.06274ZM38.7096 22.5478C38.7096 23.4368 39.4319 24.1573 40.3225 24.1573C41.2132 24.1573 41.9355 23.4368 41.9355 22.5478V6.45371C41.9355 5.56483 41.2132 4.84422 40.3225 4.84422C39.4319 4.84422 38.7096 5.56483 38.7096 6.45371V22.5478ZM33.8708 20.9385C32.9802 20.9385 32.258 20.2178 32.258 19.329V9.67227C32.258 8.7834 32.9802 8.06278 33.8708 8.06278C34.7615 8.06278 35.4838 8.7834 35.4838 9.67227V19.329C35.4838 20.2178 34.7615 20.9385 33.8708 20.9385ZM25.8062 16.1101C25.8062 16.999 26.5284 17.7194 27.4192 17.7194C28.3098 17.7194 29.032 16.999 29.032 16.1101V12.8911C29.032 12.0023 28.3098 11.2818 27.4192 11.2818C26.5284 11.2818 25.8062 12.0023 25.8062 12.8911V16.1101ZM6.45125 14.5006C6.45125 13.6117 7.17342 12.8911 8.06404 12.8911H19.3545C20.2451 12.8911 20.9674 13.6117 20.9674 14.5006C20.9674 15.3895 20.2451 16.1101 19.3545 16.1101H8.06404C7.17342 16.1101 6.45125 15.3895 6.45125 14.5006ZM8.06404 19.329C7.17342 19.329 6.45125 20.0496 6.45125 20.9385C6.45125 21.8273 7.17342 22.5478 8.06404 22.5478H24.1932C25.0838 22.5478 25.8062 21.8273 25.8062 20.9385C25.8062 20.0496 25.0838 19.329 24.1932 19.329H8.06404Z"
              fill="#FF623D"
            />
          </g>
          <defs>
            <clipPath id="clip0_1536_2">
              <rect width="50" height="29" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <div className="flex flex-col space-y-0.5">
          <h2 className="text-sm silka-semibold text-[#363636]">
            Auto Transcribe
          </h2>
          <p className="text-[11px] silka-regular text-gray-400">
            Automatically generate subtitles on your video.
          </p>
        </div>
      </div>
      <DropdownMenuPrimitive.Root>
        <DropdownMenuPrimitive.Trigger asChild>
          <button className="w-full py-2 px-3 border rounded-lg flex mt-4 flex-row justify-between items-between">
            <p className="text-sm silka-medium text-[#363636]">
              English
            </p>
            <svg
              width="12"
              height="12"
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
      </DropdownMenuPrimitive.Root>
      <button
        onClick={() => {
          if (!file) {
            toast.error('No Video Selected', {
              className: 'text-sm silka-medium text-gray-900',
            });
          } else {
            setGenerating(true);
            createCaptions(compositionId).then((value) => {
              setGenerating(false);
              setCaptionOptions(true);
            });
          }
        }}
        className="w-full mt-4 py-2 rounded text-xs silka-semibold text-white hover:opacity-90 bg-[#FF623D]"
      >
        Create Subtitles
      </button>
    </div>
  );
}

export function TextSidebar({
  captionOptions,
  setCaptionOptions,
  font,
  setFont,
  position,
  setPosition,
  size,
  setSize,
  color,
  setColor,
  alignment,
  setAlignment,
  capitalization,
  setCapitalization,
  transition,
  setTransition,
  file,
  setFile,
  compositionId,
  wordsPerLine,
  setWordsPerLine,
  effect,
  generating,
  setGenerating,
  setEffect,
}: Props) {
  return (
    <>
      {generating ? (
        <GeneratingCaption />
      ) : !captionOptions ? (
        <MakeCaption
          file={file}
          setGenerating={setGenerating}
          setCaptionOptions={setCaptionOptions}
          compositionId={compositionId}
        />
      ) : (
        <CaptionOptions
          captionOptions={captionOptions}
          setCaptionOptions={setCaptionOptions}
          font={font}
          setFont={setFont}
          position={position}
          setPosition={setPosition}
          size={size}
          setSize={setSize}
          color={color}
          setColor={setColor}
          alignment={alignment}
          setAlignment={setAlignment}
          capitalization={capitalization}
          setCapitalization={setCapitalization}
          transition={transition}
          generating={generating}
          setGenerating={setGenerating}
          setTransition={setTransition}
          file={file}
          setFile={setFile}
          compositionId={compositionId}
          wordsPerLine={wordsPerLine}
          setWordsPerLine={setWordsPerLine}
          effect={effect}
          setEffect={setEffect}
        />
      )}
    </>
  );
}
