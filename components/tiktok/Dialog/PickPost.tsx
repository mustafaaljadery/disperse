import {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  Fragment,
} from 'react';
import { Transition } from '@headlessui/react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { clsx } from 'clsx';
import axios from 'axios';
import { apiUrl } from '../../../utils/apiUrl';
import { Scroll } from '../../utils/Scroll';
import toast from 'react-hot-toast';

interface Props {
  workspaceId: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  setRefetchVideos: Dispatch<SetStateAction<boolean>>;
  date: any;
  userId: string;
  time: string;
}

interface SecondComponentProps {
  value: any;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setRefetchPosts: Dispatch<SetStateAction<boolean>>;
  workspaceId: string;
  userId: string;
  date: string;
  time: string;
}

async function scheduleVideo(
  workspaceId: string,
  userId: string,
  draftId: string,
  date: string,
  time: string
) {
  try {
    toast.loading('Scheduling Video...', {
      className: 'text-sm silka-medium text-gray-900',
      duration: 80000,
    });
    const result = await axios.post(
      `${apiUrl()}tiktok/create/schedulevideo`,
      null,
      {
        params: {
          workspaceId: workspaceId,
          userId: userId,
          draftId: draftId,
          date: date,
          time: time,
        },
      }
    );
    if (result.data.message == 'success') {
      toast.remove();
      toast.success('Video successfully scheduled!', {
        className: 'text-sm silka-medium text-gray-900',
      });
    } else {
      toast.remove();
      toast.error('Error scheduling video, please try again.', {
        className: 'text-sm silka-medium text-gray-900',
      });
    }
    return result.data;
  } catch (e) {
    toast.remove();
    toast.error('Error scheduling video, please try again.', {
      className: 'text-sm silka-medium text-gray-900',
    });
    console.log(e);
  }
}

async function getVideoDrafts(workspaceId: string) {
  try {
    const result = await axios.get(
      `${apiUrl()}tiktok/read/videodrafts`,
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

function formatDate(date: string) {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const newDate = new Date(date);
  let year = newDate.getFullYear();
  let month = months[newDate.getMonth()];
  let day = newDate.getDate();

  return `${day} ${month} ${year}`;
}

function VideoComponent({
  value,
  setIsOpen,
  setRefetchPosts,
  workspaceId,
  userId,
  date,
  time,
}: SecondComponentProps) {
  return (
    <div className="p-2 w-1/3">
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(false);
          scheduleVideo(
            workspaceId,
            userId,
            value.id,
            date,
            time
          ).then(() => {
            setRefetchPosts(true);
          });
        }}
        className="w-full h-full border rounded-lg p-3 hover:border-[#363636] flex flex-col"
      >
        {value?.video == 'yes' ? (
          <div className="w-full flex flex-col justify-center items-center">
            <img
              src={value?.google_url}
              className="h-[143px] w-[80px] rounded"
            />
          </div>
        ) : (
          <div className="w-full flex flex-col justify-center items-center">
            <div className="h-[143px] bg-gray-100 w-[80px] rounded flex flex-col justify-center items-center">
              <p className="text-[8px] silka-regular text-gray-500">
                No Video Selected
              </p>
            </div>
          </div>
        )}
        {!value?.text || value.text.length == 0 ? (
          <p className="text-xs mt-2 text-start silka-medium text-gray-400 italic">
            No video text
          </p>
        ) : (
          <p className="text-xs mt-2 text-start silka-medium text-gray-800 break-all ">
            <>
              {value?.text?.length > 48
                ? value.text.slice(0, 48) + '...'
                : value.text}
            </>
          </p>
        )}
        <hr className="w-full mt-3" />
        <p className="mt-2 text-[9px] silka-regular text-gray-400">
          {formatDate(value.created_at)}
        </p>
      </button>
    </div>
  );
}

export function TiktokPickPost({
  workspaceId,
  setIsOpen,
  isOpen,
  setRefetchVideos,
  date,
  userId,
  time,
}: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [draftVideoData, setDraftVideoData] = useState<any>([]);

  useEffect(() => {
    setIsLoading(true);
    getVideoDrafts(workspaceId).then((value) => {
      setDraftVideoData(value);
      setIsLoading(false);
    });
  }, []);

  return (
    <DialogPrimitive.Portal forceMount>
      <Transition.Root show={isOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <DialogPrimitive.Overlay
            forceMount
            className="fixed inset-0 z-20 bg-black/50"
          />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <DialogPrimitive.Content
            forceMount
            className={clsx(
              'fixed z-50',
              'w-[95vw] max-w-2xl rounded-lg py-4 px-1 md:w-full',
              'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
              'bg-white',
              'focus:outline-none focus-visible:ring-0'
            )}
          >
            <DialogPrimitive.Title className="text-lg px-3 silka-semibold text-gray-900">
              Select Draft Video to Schedule
            </DialogPrimitive.Title>
            <div className="mt-3 flex flex-col space-y-5">
              {isLoading ? (
                <div className="flex flex-col justify-center items-center h-[400px]">
                  <div className="flex flex-row space-x-4">
                    <span className="animate-ping h-3 w-3 my-auto rounded-full bg-[#363636] opacity-75" />
                    <p className="text-sm my-auto silka-medium text-gray-400">
                      Fetching drafts...
                    </p>
                  </div>
                </div>
              ) : (
                <div className="h-[400px]">
                  <Scroll>
                    <div className="flex w-full flex-row px-3 flex-wrap">
                      {draftVideoData?.length == 0 ? (
                        <div className="flex flex-col h-[400px] w-full p-5 border border-dashed border-gray-300 rounded-lg justify-center items-center">
                          <div className="p-2.5 bg-gray-50 rounded-full">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 256 256"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M103.138 100.987V91.1242C99.7149 90.638 96.2614 90.388 92.8051 90.3711C50.5231 90.3711 16.123 124.777 16.123 167.059C16.123 192.995 29.0856 215.956 48.8595 229.84C35.6188 215.68 28.2566 197.016 28.2679 177.63C28.2679 135.949 61.69 101.96 103.138 100.987Z"
                                fill="#00F2EA"
                              />
                              <path
                                d="M104.947 212.647C123.813 212.647 139.201 197.639 139.903 178.935L139.968 11.9736H170.471C169.819 8.48635 169.49 4.94856 169.487 1.40234H127.826L127.756 168.37C127.062 187.067 111.666 202.07 92.805 202.07C87.1429 202.073 81.565 200.693 76.5576 198.049C83.119 207.204 93.6846 212.636 104.947 212.647ZM227.446 68.6485V59.3698C216.237 59.3811 205.267 56.1187 195.884 49.9872C204.112 59.4597 215.186 66.0071 227.452 68.6485"
                                fill="#00F2EA"
                              />
                              <path
                                d="M195.884 49.9773C186.69 39.4566 181.624 25.9546 181.629 11.9805H170.468C173.388 27.5872 182.573 41.3197 195.884 49.9773ZM92.8052 132.029C73.4724 132.052 57.8067 147.718 57.7842 167.05C57.7954 180.066 65.0227 192.003 76.5522 198.05C72.2444 192.11 69.9262 184.964 69.9262 177.627C69.9459 158.294 85.6116 142.623 104.947 142.601C108.555 142.601 112.014 143.196 115.28 144.222V101.69C111.857 101.204 108.404 100.954 104.947 100.937C104.34 100.937 103.742 100.97 103.14 100.982V133.651C99.7965 132.588 96.3121 132.041 92.8052 132.029Z"
                                fill="#FF004F"
                              />
                              <path
                                d="M227.446 68.6491V101.029C205.84 101.029 185.83 94.1189 169.484 82.39V167.055C169.484 209.337 135.09 243.737 92.8079 243.737C76.4677 243.737 61.3162 238.581 48.8623 229.836C63.3366 245.446 83.6613 254.314 104.947 254.309C147.229 254.309 181.629 219.909 181.629 177.632V92.9668C198.514 105.109 218.794 111.631 239.591 111.606V69.9332C235.421 69.9332 231.366 69.4808 227.443 68.6406"
                                fill="#FF004F"
                              />
                              <path
                                d="M169.481 167.05V82.385C186.367 94.5298 206.646 101.049 227.443 101.024V68.6469C215.18 66.0027 204.106 59.4526 195.881 49.9773C182.57 41.3197 173.384 27.5872 170.465 11.9805H139.965L139.9 178.942C139.201 197.64 123.81 212.648 104.944 212.648C93.6844 212.637 83.116 207.202 76.5574 198.053C65.028 192.009 57.7979 180.072 57.7838 167.053C57.8063 147.72 73.4721 132.055 92.8049 132.032C96.4073 132.032 99.8664 132.622 103.137 133.653V100.984C61.6897 101.957 28.2676 135.946 28.2676 177.627C28.2676 197.783 36.099 216.133 48.8593 229.837C61.7234 238.894 77.0745 243.746 92.8049 243.732C135.09 243.732 169.481 209.332 169.481 167.05Z"
                                fill="black"
                              />
                            </svg>
                          </div>
                          <p className="mt-3 silka-semibold text-gray-900 text-base">
                            No Videos Found
                          </p>
                          <span className="mt-1.5 silka-regular text-xs text-gray-400">
                            Create a draft video to schedule it here.
                          </span>
                        </div>
                      ) : (
                        <>
                          {draftVideoData
                            ?.sort(function (a: any, b: any) {
                              return (
                                new Date(b.created_at).getTime() -
                                new Date(a.created_at).getTime()
                              );
                            })
                            ?.map((value: any, index: number) => {
                              return (
                                <VideoComponent
                                  value={value}
                                  key={index}
                                  setIsOpen={setIsOpen}
                                  setRefetchPosts={setRefetchVideos}
                                  workspaceId={workspaceId}
                                  userId={userId}
                                  date={date}
                                  time={time}
                                />
                              );
                            })}
                        </>
                      )}
                    </div>
                  </Scroll>
                </div>
              )}
            </div>
          </DialogPrimitive.Content>
        </Transition.Child>
      </Transition.Root>
    </DialogPrimitive.Portal>
  );
}
