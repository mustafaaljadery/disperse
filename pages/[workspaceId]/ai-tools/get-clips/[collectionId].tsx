import { useState, useEffect, Fragment } from 'react';
import Router, { useRouter } from 'next/router';
import { PageHead } from '../../../../layouts/PageHead';
import axios from 'axios';
import { apiUrl } from '../../../../utils/apiUrl';
import fileDownload from 'js-file-download';
import { LoadingScreen } from '../../../../components/Loading';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Transition } from '@headlessui/react';
import { clsx } from 'clsx';
import toast from 'react-hot-toast';

async function createEdit(
  workspaceId: string,
  duration: number,
  url: string,
  startIndex: number,
  endIndex: number,
  collectionId: string
) {
  try {
    const result = await axios.post(
      `${apiUrl()}editor/create/clipcomp`,
      null,
      {
        params: {
          workspaceId: workspaceId,
          duration: duration,
          url: url,
          startIndex: startIndex,
          endIndex: endIndex,
          collectionId: collectionId,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function getCollection(collectionId: string) {
  try {
    const result = await axios.get(
      `${apiUrl()}editor/read/collection`,
      {
        params: {
          collectionId: collectionId,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function deleteCollection(collectionId: string) {
  try {
    const result = await axios.post(
      `${apiUrl()}editor/delete/collection`,
      null,
      {
        params: {
          collectionId: collectionId,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function handleDownload(url: string, name: string) {
  try {
    await axios.get(url, { responseType: 'blob' }).then((res) => {
      fileDownload(res.data, name);
    });
  } catch (e) {
    console.log(e);
  }
}

function formatSeconds(seconds: number) {
  let hours: any = Math.floor(seconds / 3600);
  let minutes: any = Math.floor((seconds - hours * 3600) / 60);
  let secs: any = Math.floor(seconds % 60);

  hours = `${hours} ${hours === 1 ? 'hr' : 'hrs'}`;
  minutes = `${minutes} ${minutes === 1 ? 'min' : 'mins'}`;
  secs = `${secs} ${secs === 1 ? 'sec' : 'secs'}`;

  return `${hours} ${minutes} ${secs}`;
}

interface ClipProps {
  value: any;
  index: number;
  workspaceId: string;
  collectionId: string;
}

function Clip({
  value,
  index,
  workspaceId,
  collectionId,
}: ClipProps) {
  return (
    <div className="flex flex-col md:flex-row py-8 px-6 w-full rounded-xl bg-gray-50 space-y-6 md:space-y-0 md:space-x-16">
      <div className="w-full md:w-1/2 flex flex-col">
        <p className="silka-bold text-[#363636]">{`Clip #${
          index + 1
        }`}</p>
        <span className="mt-3.5 text-sm silka-semibold text-gray-900">
          TEXT
        </span>
        <p className="mt-1.5 silka-regular text-gray-600">{`"${value?.text}"`}</p>
        <span className="mt-3.5 text-sm silka-semibold text-gray-900">
          DURATION
        </span>
        <p className="mt-1.5 silka-regular text-gray-600">
          {formatSeconds(value?.duration)}
        </p>
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center space-y-5">
        <video
          className="my-auto w-full h-[260px] lg:h-[320px] rounded-xl bg-black"
          src={value?.url}
          controls
        />
        <div className="flex flex-row space-x-3">
          <button
            onClick={() => {
              handleDownload(value?.url, 'clip.mp4');
            }}
            className="px-5 py-1.5 text-xs flex flex-row space-x-1.5 silka-medium text-white bg-[#363636] rounded hover:opacity-90"
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
                d="M7.50005 1.04999C7.74858 1.04999 7.95005 1.25146 7.95005 1.49999V8.41359L10.1819 6.18179C10.3576 6.00605 10.6425 6.00605 10.8182 6.18179C10.994 6.35753 10.994 6.64245 10.8182 6.81819L7.81825 9.81819C7.64251 9.99392 7.35759 9.99392 7.18185 9.81819L4.18185 6.81819C4.00611 6.64245 4.00611 6.35753 4.18185 6.18179C4.35759 6.00605 4.64251 6.00605 4.81825 6.18179L7.05005 8.41359V1.49999C7.05005 1.25146 7.25152 1.04999 7.50005 1.04999ZM2.5 10C2.77614 10 3 10.2239 3 10.5V12C3 12.5539 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5528 12 12V10.5C12 10.2239 12.2239 10 12.5 10C12.7761 10 13 10.2239 13 10.5V12C13 13.1041 12.1062 14 11.0012 14H3.99635C2.89019 14 2 13.103 2 12V10.5C2 10.2239 2.22386 10 2.5 10Z"
                fill="white"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
            <p className="my-auto">Download Clip</p>
          </button>
          <button
            onClick={() => {
              toast.loading('Creating Edit...', {
                className: 'text-sm silka-medium text-gray-900',
                duration: 80000,
              });
              createEdit(
                workspaceId,
                value?.duration,
                value?.url,
                value?.startIndex,
                value?.endIndex,
                collectionId
              ).then((res) => {
                toast.remove();
                toast.success('Sucessfully Created Edit!', {
                  className: 'text-sm silka-medium text-gray-900',
                });
                Router.push(`/edit/${res.id}`);
              });
            }}
            className="px-5 py-1.5 flex flex-row space-x-1.5 text-xs silka-medium text-white bg-[#FF623D] rounded hover:opacity-90"
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
                d="M8.69667 0.0403541C8.90859 0.131038 9.03106 0.354857 8.99316 0.582235L8.0902 6.00001H12.5C12.6893 6.00001 12.8625 6.10701 12.9472 6.27641C13.0319 6.4458 13.0136 6.6485 12.8999 6.80001L6.89997 14.8C6.76167 14.9844 6.51521 15.0503 6.30328 14.9597C6.09135 14.869 5.96888 14.6452 6.00678 14.4178L6.90974 9H2.49999C2.31061 9 2.13748 8.893 2.05278 8.72361C1.96809 8.55422 1.98636 8.35151 2.09999 8.2L8.09997 0.200038C8.23828 0.0156255 8.48474 -0.0503301 8.69667 0.0403541ZM3.49999 8.00001H7.49997C7.64695 8.00001 7.78648 8.06467 7.88148 8.17682C7.97648 8.28896 8.01733 8.43723 7.99317 8.5822L7.33027 12.5596L11.5 7.00001H7.49997C7.353 7.00001 7.21347 6.93534 7.11846 6.8232C7.02346 6.71105 6.98261 6.56279 7.00678 6.41781L7.66968 2.44042L3.49999 8.00001Z"
                fill="white"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
            <p>Edit Clip</p>
          </button>
        </div>
      </div>
    </div>
  );
}

function ClipsLoading() {
  return (
    <div className="flex flex-col mt-16 w-3/5">
      <div className="bg-[#F7F7F8] w-full rounded-xl py-16 flex flex-col justify-center items-center">
        <div className="flex flex-row space-x-4">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="animate-spin my-auto"
          >
            <g clipPath="url(#clip0_1405_2)">
              <path
                d="M4.84457 21.6005C4.13345 21.0227 3.95568 20.0005 4.53345 19.2449C5.11123 18.5338 6.13345 18.3116 6.88901 18.8894C7.24457 19.1116 7.55568 19.3783 7.95568 19.556C11.289 21.3783 15.4223 20.756 18.089 18.0449C18.7557 17.3783 19.7779 17.3783 20.4446 18.0449C21.0668 18.7116 21.0668 19.7783 20.4446 20.4005C16.7112 24.1783 10.9335 25.1116 6.31123 22.5338C5.7779 22.2671 5.28901 21.9116 4.84457 21.6005Z"
                fill="#Ff623D"
              />
              <path
                d="M23.8224 13.9555C23.6891 14.8888 22.8002 15.511 21.8669 15.3777C20.9335 15.2444 20.3558 14.3555 20.4891 13.4221C20.578 12.9332 20.578 12.4444 20.578 11.9555C20.578 8.0888 18.0446 4.75547 14.4891 3.73325C13.6002 3.51103 13.0669 2.53325 13.3335 1.64436C13.6002 0.755471 14.4891 0.222137 15.4224 0.488804C20.4446 1.95547 23.9558 6.62214 23.9558 11.9999C23.9558 12.6666 23.9113 13.3332 23.8224 13.9555Z"
                fill="#FF623D"
              />
              <path
                d="M7.42222 0.843445C8.26667 0.487889 9.24445 0.932334 9.55556 1.82122C9.86667 2.71011 9.46667 3.68789 8.62222 4.04344C5.42222 5.33233 3.28889 8.48789 3.28889 12.0879C3.28889 12.799 3.37778 13.5101 3.55556 14.1768C3.77778 15.0657 3.24444 15.999 2.35556 16.2212C1.46667 16.4434 0.577778 15.9101 0.355556 14.9768C0.133333 13.999 0 13.0212 0 12.0434C0 7.02122 2.97778 2.62122 7.42222 0.843445Z"
                fill="#Ff623D"
              />
            </g>
            <defs>
              <clipPath id="clip0_1405_2">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <p className="silka-bold my-auto text-[#363636] text-3xl">
            Creating Clips...
          </p>
        </div>
        <p className="mt-4 text-base silka-semibold text-gray-900">
          Estimated wait time: ~ 3 mins
        </p>
        <p className="mt-3 text-sm silka-medium text-gray-600">
          You can leave this page, you'll get an email when your clips
          are ready.
        </p>
      </div>
      <div className="mt-10 flex flex-row justify-center items-center space-x-12 w-full">
        <p className="silka-semibold text-[#363636] my-auto">
          Join our Discord in the mean time!
        </p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://discord.com/invite/C5PGFQdnJV"
          className="flex flex-row my-auto bg-[#404DED] px-5 py-1.5 rounded hover:opacity-90 space-x-2"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 800 800"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="my-auto"
          >
            <path
              d="M677.676 140.927C625.891 116.698 570.519 99.0891 512.63 89.0625C505.52 101.916 497.214 119.205 491.488 132.958C429.95 123.703 368.978 123.703 308.572 132.958C302.846 119.205 294.352 101.916 287.179 89.0625C229.227 99.0891 173.792 116.762 122.006 141.055C17.5548 298.895 -10.7604 452.815 3.39722 604.549C72.6751 656.284 139.814 687.712 205.819 708.277C222.116 685.847 236.651 662.004 249.173 636.876C225.325 627.814 202.484 616.632 180.902 603.65C186.628 599.408 192.229 594.973 197.639 590.41C329.273 651.979 472.297 651.979 602.358 590.41C607.832 594.973 613.432 599.408 619.095 603.65C597.449 616.696 574.546 627.878 550.699 636.941C563.22 662.004 577.692 685.912 594.052 708.34C660.121 687.775 727.322 656.349 796.6 604.549C813.212 428.651 768.222 276.145 677.676 140.927ZM267.106 511.234C227.591 511.234 195.185 474.344 195.185 429.422C195.185 384.499 226.899 347.546 267.106 347.546C307.314 347.546 339.719 384.434 339.027 429.422C339.089 474.344 307.314 511.234 267.106 511.234ZM532.891 511.234C493.376 511.234 460.971 474.344 460.971 429.422C460.971 384.499 492.683 347.546 532.891 347.546C573.098 347.546 605.504 384.434 604.812 429.422C604.812 474.344 573.098 511.234 532.891 511.234Z"
              fill="white"
            />
          </svg>
          <p className="text-sm silka-medium text-white">
            Join Discord
          </p>
        </a>
      </div>
    </div>
  );
}

export default function GetClips() {
  const [workspaceId, setWorkspaceId] = useState('');
  const [collectionId, setCollectionId] = useState('');
  const [collectionData, setCollectionData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [clipsLoading, setClipsLoading] = useState(true);
  const [firstLoading, setFirstLoading] = useState(true);
  const [clips, setClips] = useState<any>([]);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      if (collectionId) {
        getCollection(collectionId).then((data) => {
          setCollectionData(data);
          setClips(data?.clips);
          if (data?.done) {
            setClipsLoading(false);
            clearInterval(interval);
          }
        });
      }
    }, 2000);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [collectionId]);

  useEffect(() => {
    if (router.isReady) {
      setWorkspaceId(router.query.workspaceId as string);
      setCollectionId(router.query.collectionId as string);
    }
  }, [router.isReady]);

  useEffect(() => {
    if (collectionId) {
      getCollection(collectionId).then((data) => {
        setClips(data?.clips);
        setCollectionData(data);
        if (data?.done) {
          setClipsLoading(false);
        }
        setIsLoading(false);
        setFirstLoading(false);
      });
    }
  }, [collectionId]);

  if (firstLoading) {
    return <LoadingScreen />;
  }

  return (
    <PageHead title="Get Clips · Disperse AI Tools">
      <div className="flex flex-col w-full">
        <header className="w-full bg-[#262626] flex flex-row justify-between items-between">
          <div className="my-auto">
            <button
              onClick={() => {
                Router.push(`/${workspaceId}/ai-tools/get-clips`);
              }}
              className="p-3.5 hover:bg-[#363636]"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
                  fill="white"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          {isLoading ? (
            <div className="h-[20px] my-auto w-[150px] bg-gray-500 rounded animate-pulse" />
          ) : (
            <p className="my-auto silka-semibold text-center px-2 text-white text-xs md:text-sm">
              {collectionData?.name?.length > 32
                ? collectionData?.name?.slice(0, 30) + '...'
                : collectionData?.name}
            </p>
          )}
          <div className="flex flex-row">
            <DialogPrimitive.Root
              open={deleteOpen}
              onOpenChange={setDeleteOpen}
            >
              <DialogPrimitive.Trigger asChild>
                <button className="flex flex-row h-full bg-[#Ff623d] hover:opacity-90 space-x-2 px-4 justify-center items-center">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="my-auto"
                  >
                    <path
                      d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
                      fill="white"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <p className="text-white my-auto text-sm silka-medium">
                    Delete
                  </p>
                </button>
              </DialogPrimitive.Trigger>
              <DialogPrimitive.Portal forceMount>
                <Transition.Root show={deleteOpen}>
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
                        'w-[95vw] max-w-md rounded-lg p-4 md:w-full',
                        'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
                        'bg-white',
                        'focus:outline-none focus-visible:ring-0'
                      )}
                    >
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          setDeleteOpen(false);
                          toast.loading('Deleting Collection...', {
                            className:
                              'text-sm silka-medium text-gray-900',
                            duration: 80000,
                          });
                          deleteCollection(collectionId).then(() => {
                            toast.remove();
                            toast.success(
                              'Successfully Deleted Collection',
                              {
                                className:
                                  'text-sm silka-medium text-gray-900',
                              }
                            );
                            Router.push(
                              `/${workspaceId}/ai-tools/get-clips`
                            );
                          });
                        }}
                        className="w-full flex flex-col"
                      >
                        <div className="w-full flex flex-row justify-between items-between">
                          <h2 className="text-lg silka-bold text-[#363636] my-auto">
                            Delete Collection
                          </h2>
                        </div>
                        <p className="mt-3 silka-regular text-sm text-gray-500">
                          Are you sure you want to delete this
                          collection?
                        </p>
                        <div className="w-full mt-8 flex flex-row space-x-3 justify-end items-end">
                          <DialogPrimitive.Close>
                            <button
                              type="button"
                              className="bg-[#363636] text-xs silka-medium text-white px-4 py-1.5 rounded hover:opacity-90"
                            >
                              Cancel
                            </button>
                          </DialogPrimitive.Close>
                          <button
                            type="submit"
                            className="bg-[#FF623D] text-xs silka-medium text-white px-4 py-1.5 rounded hover:opacity-90"
                          >
                            Delete
                          </button>
                        </div>
                      </form>
                    </DialogPrimitive.Content>
                  </Transition.Child>
                </Transition.Root>
              </DialogPrimitive.Portal>
            </DialogPrimitive.Root>
          </div>
        </header>
        <main className="mt-16 flex px-4 w-full flex-col justify-center items-center pb-20">
          <span className="text-xs silka-bold text-gray-900">
            NAME
          </span>
          <p className="mt-2 text-xl lg:text-2xl text-center silka-semibold text-gray-600">
            {collectionData?.name}
          </p>
          <div className="w-full mt-10 flex flex-col justify-center items-center">
            <img
              className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 h-[280px] md:h-[320px] rounded-xl"
              src={collectionData?.thumbnail}
            />
            <p className="mt-6 text-sm silka-semibold text-gray-900">
              {`VIDEO DURATION: ${formatSeconds(
                collectionData?.duration
              )}`}
            </p>
          </div>
          {clipsLoading ? (
            <ClipsLoading />
          ) : (
            <div className="flex flex-col justify-center items-center mt-16 space-y-8 w-full md:w-3/4 xl:w-3/5">
              <h2 className="text-lg silka-bold text-[#363636]">
                GENERATED CLIPS
              </h2>
              {clips?.length == 0 ? (
                <div className="py-14 border w-full flex flex-col justify-center items-center border-gray-300 border-dashed rounded-lg">
                  <div className="p-3 rounded-full bg-[#F6EEEC]">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 77 77"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_1587_23)">
                        <path
                          d="M6.5 16.5H11.5C12.0522 16.5 12.5 16.0522 12.5 15.5C12.5 14.9478 12.0522 14.5 11.5 14.5H6.5C5.94775 14.5 5.5 14.9478 5.5 15.5C5.5 16.0522 5.94775 16.5 6.5 16.5Z"
                          fill="#FF623D"
                        />
                        <path
                          d="M16.5 16.5H21.5C22.0522 16.5 22.5 16.0522 22.5 15.5C22.5 14.9478 22.0522 14.5 21.5 14.5H16.5C15.9478 14.5 15.5 14.9478 15.5 15.5C15.5 16.0522 15.9478 16.5 16.5 16.5Z"
                          fill="#FF623D"
                        />
                        <path
                          d="M26.5 16.5H31.5C32.0522 16.5 32.5 16.0522 32.5 15.5C32.5 14.9478 32.0522 14.5 31.5 14.5H26.5C25.9478 14.5 25.5 14.9478 25.5 15.5C25.5 16.0522 25.9478 16.5 26.5 16.5Z"
                          fill="#FF623D"
                        />
                        <path
                          d="M36.5 16.5H41.5C42.0522 16.5 42.5 16.0522 42.5 15.5C42.5 14.9478 42.0522 14.5 41.5 14.5H36.5C35.9478 14.5 35.5 14.9478 35.5 15.5C35.5 16.0522 35.9478 16.5 36.5 16.5Z"
                          fill="#FF623D"
                        />
                        <path
                          d="M46.5 16.5H51.5C52.0522 16.5 52.5 16.0522 52.5 15.5C52.5 14.9478 52.0522 14.5 51.5 14.5H46.5C45.9478 14.5 45.5 14.9478 45.5 15.5C45.5 16.0522 45.9478 16.5 46.5 16.5Z"
                          fill="#FF623D"
                        />
                        <path
                          d="M56.5 16.5H61.5C62.0522 16.5 62.5 16.0522 62.5 15.5C62.5 14.9478 62.0522 14.5 61.5 14.5H56.5C55.9478 14.5 55.5 14.9478 55.5 15.5C55.5 16.0522 55.9478 16.5 56.5 16.5Z"
                          fill="#FF623D"
                        />
                        <path
                          d="M66.5 16.5H71.5C72.0522 16.5 72.5 16.0522 72.5 15.5C72.5 14.9478 72.0522 14.5 71.5 14.5H66.5C65.9478 14.5 65.5 14.9478 65.5 15.5C65.5 16.0522 65.9478 16.5 66.5 16.5Z"
                          fill="#FF623D"
                        />
                        <path
                          d="M11.5 59.5H6.5C5.94775 59.5 5.5 59.9478 5.5 60.5C5.5 61.0522 5.94775 61.5 6.5 61.5H11.5C12.0522 61.5 12.5 61.0522 12.5 60.5C12.5 59.9478 12.0522 59.5 11.5 59.5Z"
                          fill="#FF623D"
                        />
                        <path
                          d="M16.5 61.5H21.5C22.0522 61.5 22.5 61.0522 22.5 60.5C22.5 59.9478 22.0522 59.5 21.5 59.5H16.5C15.9478 59.5 15.5 59.9478 15.5 60.5C15.5 61.0522 15.9478 61.5 16.5 61.5Z"
                          fill="#FF623D"
                        />
                        <path
                          d="M31.5 59.5H26.5C25.9478 59.5 25.5 59.9478 25.5 60.5C25.5 61.0522 25.9478 61.5 26.5 61.5H31.5C32.0522 61.5 32.5 61.0522 32.5 60.5C32.5 59.9478 32.0522 59.5 31.5 59.5Z"
                          fill="#FF623D"
                        />
                        <path
                          d="M41.5 59.5H36.5C35.9478 59.5 35.5 59.9478 35.5 60.5C35.5 61.0522 35.9478 61.5 36.5 61.5H41.5C42.0522 61.5 42.5 61.0522 42.5 60.5C42.5 59.9478 42.0522 59.5 41.5 59.5Z"
                          fill="#FF623D"
                        />
                        <path
                          d="M51.5 59.5H46.5C45.9478 59.5 45.5 59.9478 45.5 60.5C45.5 61.0522 45.9478 61.5 46.5 61.5H51.5C52.0522 61.5 52.5 61.0522 52.5 60.5C52.5 59.9478 52.0522 59.5 51.5 59.5Z"
                          fill="#FF623D"
                        />
                        <path
                          d="M61.5 59.5H56.5C55.9478 59.5 55.5 59.9478 55.5 60.5C55.5 61.0522 55.9478 61.5 56.5 61.5H61.5C62.0522 61.5 62.5 61.0522 62.5 60.5C62.5 59.9478 62.0522 59.5 61.5 59.5Z"
                          fill="#FF623D"
                        />
                        <path
                          d="M66.5 61.5H71.5C72.0522 61.5 72.5 61.0522 72.5 60.5C72.5 59.9478 72.0522 59.5 71.5 59.5H66.5C65.9478 59.5 65.5 59.9478 65.5 60.5C65.5 61.0522 65.9478 61.5 66.5 61.5Z"
                          fill="#FF623D"
                        />
                        <path
                          d="M76.5 9.5H1.5C0.947754 9.5 0.5 9.94775 0.5 10.5V20.5C0.5 21.0522 0.947754 21.5 1.5 21.5H10.5V54.5H1.5C0.947754 54.5 0.5 54.9478 0.5 55.5V65.5C0.5 66.0522 0.947754 66.5 1.5 66.5H76.5C77.0522 66.5 77.5 66.0522 77.5 65.5V55.5C77.5 54.9478 77.0522 54.5 76.5 54.5H67.5V21.5H76.5C77.0522 21.5 77.5 21.0522 77.5 20.5V10.5C77.5 9.94775 77.0522 9.5 76.5 9.5ZM75.5 19.5H66.5C65.9478 19.5 65.5 19.9478 65.5 20.5V55.5C65.5 56.0522 65.9478 56.5 66.5 56.5H75.5V64.5H2.5V56.5H11.5C12.0522 56.5 12.5 56.0522 12.5 55.5V20.5C12.5 19.9478 12.0522 19.5 11.5 19.5H2.5V11.5H75.5V19.5Z"
                          fill="#FF623D"
                        />
                        <path
                          d="M57.5 55.5V20.5C57.5 19.9478 57.0522 19.5 56.5 19.5H21.5C20.9478 19.5 20.5 19.9478 20.5 20.5V55.5C20.5 56.0522 20.9478 56.5 21.5 56.5H56.5C57.0522 56.5 57.5 56.0522 57.5 55.5ZM55.5 54.5H22.5V21.5H55.5V54.5Z"
                          fill="#FF623D"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1587_23">
                          <rect
                            width="77"
                            height="57"
                            fill="white"
                            transform="translate(0 10)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <h2 className="text-2xl mt-4 silka-bold text-gray-900 text-center">
                    No Clips Found
                  </h2>
                  <p className="mt-2.5 text-sm silka-medium text-gray-500 text-center">
                    Try a longer video to get better clips.
                  </p>
                </div>
              ) : (
                <>
                  {clips.map((value: any, index: number) => {
                    return (
                      <Clip
                        value={value}
                        workspaceId={workspaceId}
                        collectionId={collectionId}
                        key={index}
                        index={index}
                      />
                    );
                  })}
                </>
              )}
            </div>
          )}
        </main>
      </div>
    </PageHead>
  );
}
