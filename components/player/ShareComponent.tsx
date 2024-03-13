import * as SwitchPrimitive from '@radix-ui/react-switch';
import cx from 'classnames';
import { useEffect, useState } from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import 'react-multi-email/style.css';
import { apiUrl } from '../../utils/apiUrl';
import toast from 'react-hot-toast';

interface ShareComponentProps {
  fileId: string;
}

async function createPublicView(fileId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.post(
      `${apiUrl()}view/create/view`,
      null,
      { params: { fileId: fileId } }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function deletePublicView(fileId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.post(
      `${apiUrl()}view/delete/view`,
      null,
      {
        params: { fileId: fileId },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function updateAllowDownloads(
  fileId: string,
  allowDownload: boolean
) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.post(
      `${apiUrl()}view/update/allowdownload`,
      null,
      { params: { fileId: fileId, allowDownload: allowDownload } }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function getPublicView(fileId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(`${apiUrl()}view/read/fileview`, {
      params: { fileId: fileId },
    });
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

export function ShareComponent({ fileId }: ShareComponentProps) {
  const [checked, setChecked] = useState(false);
  const [emails, setEmails] = useState([]);
  const [publicData, setPublicData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [allowDownloadsChecked, setAllowDownloadsChecked] =
    useState(false);
  const [link, setLink] = useState('');

  axiosRetry(axios, { retries: 3 });

  useEffect(() => {
    if (!isLoading) {
      if (checked) {
        createPublicView(fileId).then((value) => {
          setPublicData(value);
          setLink(
            'https://trydisperse.com/v/' + String(value.shortId)
          );
          setAllowDownloadsChecked(value.allowDownload);
        });
      } else {
        deletePublicView(fileId);
        setLink('');
        setPublicData(null);
      }
    }
  }, [checked]);

  useEffect(() => {
    getPublicView(fileId).then((value) => {
      setChecked(value ? true : false);
      if (value) {
        setLink('https://trydisperse.com/view/' + String(value.id));
        setAllowDownloadsChecked(value.allowDownload);
      }
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!isLoading) {
      updateAllowDownloads(fileId, allowDownloadsChecked);
    }
  }, [allowDownloadsChecked]);

  if (isLoading) {
    return (
      <div className="mt-4 flex flex-col space-y-2 px-4 w-full">
        <div className="h-3 bg-gray-200 rounded w-full animate-pulse" />
        <div className="flex flex-row space-x-3">
          <div className="h-3 bg-gray-200 rounded w-1/3 animate-pulse" />
          <div className="h-3 bg-gray-200 rounded w-1/3 animate-pulse" />
          <div className="h-3 bg-gray-200 rounded w-1/3 animate-pulse" />
        </div>
        <div className="flex flex-row space-x-3">
          <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
          <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col mt-4">
      <div className="px-4">
        <div className="bg-[#F5EDEB] px-3 py-3 flex flex-row rounded w-full p-2">
          <div className="flex flex-row space-x-2.5">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_835_2)">
                <path
                  d="M12 2C17.514 2 22 6.486 22 12C22 17.514 17.514 22 12 22C6.486 22 2 17.514 2 12C2 6.486 6.486 2 12 2ZM12 0C5.373 0 0 5.373 0 12C0 18.627 5.373 24 12 24C18.627 24 24 18.627 24 12C24 5.373 18.627 0 12 0ZM6 17C7.513 10.413 13 9.222 13 9.222V7L18 11.425L13 15.889V13.666C13 13.667 9.22 13.552 6 17Z"
                  fill="#FF623D"
                />
              </g>
              <defs>
                <clipPath id="clip0_835_2">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <p className="text-xs my-auto silka-medium text-[#FF623D]">
              Share your file with the world.
            </p>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          setChecked(!checked);
        }}
        className="hover:bg-gray-50 flex flex-row py-3 justify-between mt-4 items-between px-4"
      >
        <div className="flex flex-row space-x-2">
          <div className="flex flex-col justify-start items-start space-y-0.5">
            <p className="text-sm silka-medium">Create Share Link</p>
            <p className="text-xs silka-regular text-gray-700">
              Publish and share link with anyone.
            </p>
          </div>
        </div>
        <div className="my-auto">
          <SwitchPrimitive.Root
            checked={checked}
            className={cx(
              'group',
              'radix-state-checked:bg-[#FF623D]',
              'radix-state-unchecked:bg-gray-200',
              'relative inline-flex h-[18px] w-[34px] flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out',
              'focus:outline-none focus-visible:ring-0'
            )}
          >
            <SwitchPrimitive.Thumb
              className={cx(
                'group-radix-state-checked:translate-x-4',
                'group-radix-state-unchecked:translate-x-0',
                'pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out'
              )}
            />
          </SwitchPrimitive.Root>
        </div>
      </button>
      {checked ? (
        <>
          <div className="flex flex-row px-4 mt-4">
            <input
              type="text"
              className="bg-[#F7F7F5] w-4/5 text-xs silka-regular rounded-l focus:ring-0 focus:border-[#FF623D] border-none border-0.5"
              placeholder="Generating link..."
              value={link}
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast.success('Copied to Clipboard!', {
                  className: 'text-sm silka-medium text-gray-900',
                });
              }}
              className="rounded-r text-xs border silka-medium text-gray-900 w-1/5 hover:bg-gray-50"
            >
              Copy Link
            </button>
          </div>
          <div className="px-4 mt-4">
            <p className="text-[11px] text-gray-900 silka-medium">
              Options
            </p>
            <div className="flex flex-col mt-2.5 space-y-3">
              <button
                onClick={() => {
                  setAllowDownloadsChecked(!allowDownloadsChecked);
                }}
                className="flex flex-row justify-between items-between"
              >
                <p className="text-sm my-auto text-gray-800 silka-medium">
                  Allow Downloads
                </p>
                <div className="my-auto">
                  <SwitchPrimitive.Root
                    checked={allowDownloadsChecked}
                    className={cx(
                      'group',
                      'radix-state-checked:bg-[#FF623D]',
                      'radix-state-unchecked:bg-gray-200',
                      'relative inline-flex h-[18px] w-[34px] flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out',
                      'focus:outline-none focus-visible:ring-0'
                    )}
                  >
                    <SwitchPrimitive.Thumb
                      className={cx(
                        'group-radix-state-checked:translate-x-4',
                        'group-radix-state-unchecked:translate-x-0',
                        'pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out'
                      )}
                    />
                  </SwitchPrimitive.Root>
                </div>
              </button>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
