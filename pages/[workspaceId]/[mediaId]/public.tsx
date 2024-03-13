import DashboardLayout from '../../../layouts/Dashboard';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';
import { useRouter } from 'next/router';
import React, {
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { LoadingScreen } from '../../../components/Loading';
import { MediaMenu } from '../../../components/media/MediaMenu';
import { apiUrl } from '../../../utils/apiUrl';
import { PageHead } from '../../../layouts/PageHead';
import toast from 'react-hot-toast';

interface ViewComponentProps {
  value: any;
  setRefetchData: Dispatch<SetStateAction<boolean>>;
}

async function getProjectDetails(mediaId: String) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}workspace/read/projectdetails`,
      {
        params: { mediaId: mediaId },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function getViews(folderId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}workspace/read/projectviews`,
      {
        params: { folderId: folderId },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function deleteView(fileId: string) {
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

function formatDate(date: any) {
  const newDate = new Date(date);
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

  const day = newDate.getDate();
  const month = months[newDate.getMonth()];
  const year = newDate.getFullYear();

  return month + ' ' + day + ', ' + year;
}

function ViewComponent({
  value,
  setRefetchData,
}: ViewComponentProps) {
  return (
    <div className="flex flex-row flex-wrap w-full">
      <div className="w-full md:w-1/3 flex flex-row space-x-4">
        {value.google_url == 'unknown' ? (
          <div className="bg-gray-100 flex flex-col justify-center items-center h-[42px] w-[42px] rounded">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.07505 4.10001C5.07505 2.91103 6.25727 1.92502 7.50005 1.92502C8.74283 1.92502 9.92505 2.91103 9.92505 4.10001C9.92505 5.19861 9.36782 5.71436 8.61854 6.37884L8.58757 6.4063C7.84481 7.06467 6.92505 7.87995 6.92505 9.5C6.92505 9.81757 7.18248 10.075 7.50005 10.075C7.81761 10.075 8.07505 9.81757 8.07505 9.5C8.07505 8.41517 8.62945 7.90623 9.38156 7.23925L9.40238 7.22079C10.1496 6.55829 11.075 5.73775 11.075 4.10001C11.075 2.12757 9.21869 0.775024 7.50005 0.775024C5.7814 0.775024 3.92505 2.12757 3.92505 4.10001C3.92505 4.41758 4.18249 4.67501 4.50005 4.67501C4.81761 4.67501 5.07505 4.41758 5.07505 4.10001ZM7.50005 13.3575C7.9833 13.3575 8.37505 12.9657 8.37505 12.4825C8.37505 11.9992 7.9833 11.6075 7.50005 11.6075C7.0168 11.6075 6.62505 11.9992 6.62505 12.4825C6.62505 12.9657 7.0168 13.3575 7.50005 13.3575Z"
                fill="#363636"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        ) : (
          <img
            src={value.google_url}
            className="h-[42px] w-[42px] rounded"
          />
        )}
        <p className="text-sm my-auto silka-medium text-gray-500">
          {value.name.length > 42
            ? value.name.slice(0, 42) + '...'
            : value.name}
        </p>
      </div>
      <div className="hidden w-1/6 md:flex flex-row space-x-1.5 my-auto justify-start items-start">
        <p className="my-auto silka-medium text-gray-600 text-sm">
          {formatDate(value.uploadDate)}
        </p>
      </div>
      <div className="hidden w-1/6 md:flex flex-row space-x-1.5 my-auto justify-start items-start">
        <img
          src={value.uploaderImage}
          className="h-[18px] w-[18px] rounded-full my-auto"
        />
        <p className="my-auto silka-medium text-gray-600 text-xs">
          {value.uploader.length > 24
            ? value.uploader.slice(0, 24)
            : value.uploader}
        </p>
      </div>
      <div className="mt-4 md:mt-0 w-5/6 md:w-1/3 flex flex-row my-auto">
        <div className="w-3/4 flex flex-col justify-start items-start">
          <div className="flex flex-row w-[90%]">
            <input
              type="text"
              value={
                'https://trydisperse.com/view/' + value?.view?.id
              }
              className="border-none w-4/5 rounded-l text-sm silka-medium focus:border-none text-gray-500 focus:ring-0 bg-gray-100"
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                navigator.clipboard.writeText(
                  'https://trydisperse.com/view/' + value?.view?.id
                );
                toast.success('Copied to Clipboard', {
                  className:
                    'silka-medium text-gray-900 text-sm my-auto',
                });
              }}
              className="rounded-r w-1/5 bg-gray-200 h-full text-sm silka-medium text-[#363636] hover:bg-gray-300"
            >
              copy
            </button>
          </div>
        </div>
        <div className="w-1/4 flex flex-col justify-center items-center">
          <DropdownMenuPrimitive.Root>
            <DropdownMenuPrimitive.Trigger asChild>
              <button>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 16.4941C13.242 16.4941 14.25 17.5021 14.25 18.7441C14.25 19.9861 13.242 20.9941 12 20.9941C10.758 20.9941 9.75 19.9861 9.75 18.7441C9.75 17.5021 10.758 16.4941 12 16.4941ZM12 9.74414C13.242 9.74414 14.25 10.7521 14.25 11.9941C14.25 13.2361 13.242 14.2441 12 14.2441C10.758 14.2441 9.75 13.2361 9.75 11.9941C9.75 10.7521 10.758 9.74414 12 9.74414ZM12 2.99414C13.242 2.99414 14.25 4.00214 14.25 5.24414C14.25 6.48614 13.242 7.49414 12 7.49414C10.758 7.49414 9.75 6.48614 9.75 5.24414C9.75 4.00214 10.758 2.99414 12 2.99414Z"
                    fill="#363636"
                  />
                </svg>
              </button>
            </DropdownMenuPrimitive.Trigger>
            <DropdownMenuPrimitive.Portal>
              <DropdownMenuPrimitive.Content
                align="end"
                sideOffset={5}
                className={cx(
                  'flex flex-col space-y-0.5 radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
                  'w-48 rounded-lg px-1.5 py-1 shadow-md',
                  'bg-white dark:bg-gray-800'
                )}
              >
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    navigator.clipboard.writeText(
                      'https://trydisperse.com/view/' +
                        value?.view?.id
                    );
                    toast.success('Copied to Clipboard', {
                      className:
                        'silka-medium text-gray-900 text-sm my-auto',
                    });
                  }}
                  className="flex flex-col justify-start items-start"
                >
                  <DropdownMenuPrimitive.Item className="py-1.5 hover:bg-gray-50 px-2 w-full flex flex-row space-x-1.5 justify-start items-start">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="my-auto"
                    >
                      <path
                        d="M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.7762 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00002H5.5C4.67158 4.00002 4 4.67159 4 5.50002V12.5C4 13.3284 4.67158 14 5.5 14H12.5C13.3284 14 14 13.3284 14 12.5V5.50002C14 4.67159 13.3284 4.00002 12.5 4.00002H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50002C5 5.22388 5.22386 5.00002 5.5 5.00002H12.5C12.7761 5.00002 13 5.22388 13 5.50002V12.5C13 12.7762 12.7761 13 12.5 13H5.5C5.22386 13 5 12.7762 5 12.5V5.50002Z"
                        fill="#363636"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="silka-medium text-sm text-[#363636]">
                      Copy Link
                    </span>
                  </DropdownMenuPrimitive.Item>
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    deleteView(value?.view?.fileId).then((value) => {
                      setRefetchData(true);
                    });
                  }}
                  className="flex flex-col justify-start item-start"
                >
                  <DropdownMenuPrimitive.Item className="py-1.5 hover:bg-gray-50 px-2 w-full flex flex-row space-x-1.5 justify-start items-start">
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
                        fill="#FF0000"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="silka-medium text-sm text-[#FF0000]">
                      Delete View
                    </span>
                  </DropdownMenuPrimitive.Item>
                </button>
              </DropdownMenuPrimitive.Content>
            </DropdownMenuPrimitive.Portal>
          </DropdownMenuPrimitive.Root>
        </div>
      </div>
    </div>
  );
}

export default function Media() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [search, setSearch] = useState('');
  const [projectDetails, setProjectDetails] = useState<any>(null);
  const [isNewMediaOpen, setIsNewMediaOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession();
  const [sortValue, setSortValue] = useState(0);
  const [views, setViews] = useState<any>(null);
  const [refetchData, setRefetchData] = useState(false);
  const router = useRouter();

  // New Button
  const [createFolderOpen, setCreateFolderOpen] = useState(false);
  const [createPrivateFolderOpen, setCreatePrivateFolderOpen] =
    useState(false);

  // Project Settinsgs
  const [projectSettingsOpen, setProjectSettingsOpen] =
    useState(false);
  const [deleteProjectOpen, setDeleteProjectOpen] = useState(false);

  const [workspaceId, setWorkspaceId] = useState('');
  const [mediaId, setMediaId] = useState('');
  const [pathname, setPathname] = useState('');

  // Toasts
  const [uploadProgressToastOpen, setUploadProgressToastOpen] =
    useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Upload Media State
  const [uploadMediaOpen, setUploadMediaOpen] = useState(true);
  const [tiktokOpen, setTiktokOpen] = useState(false);
  const [youtubeOpen, setYoutubeOpen] = useState(false);

  useEffect(() => {
    if (router.isReady && status == 'authenticated') {
      setPathname(router.pathname);
      setWorkspaceId(String(router.query.workspaceId));
      setMediaId(String(router.query.mediaId));
      Promise.all([
        getProjectDetails(String(router.query.mediaId)),
        getViews(String(router.query.mediaId)),
      ]).then((values) => {
        setUserData(session.user);
        setProjectDetails(values[0]);
        setViews(values[1]);
        setIsLoading(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, status]);

  useEffect(() => {
    if (refetchData) {
      getViews(String(router.query.mediaId)).then((value) => {
        setViews(value);
        setRefetchData(false);
      });
    }
  }, [refetchData]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <PageHead title="Media · Disperse">
      <DashboardLayout>
        <>
          <MediaMenu
            projectDetails={projectDetails}
            workspaceId={workspaceId}
            mediaId={mediaId}
            pathname={pathname}
            search={search}
            setSearch={setSearch}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            isNewMediaOpen={isNewMediaOpen}
            setIsNewMediaOpen={setIsNewMediaOpen}
            userData={userData}
            uploadMediaOpen={uploadMediaOpen}
            setUploadMediaOpen={setUploadMediaOpen}
            tiktokOpen={tiktokOpen}
            setTiktokOpen={setTiktokOpen}
            youtubeOpen={youtubeOpen}
            setYoutubeOpen={setYoutubeOpen}
            uploadProgressToastOpen={uploadProgressToastOpen}
            setUploadProgressToastOpen={setUploadProgressToastOpen}
            uploadProgress={uploadProgress}
            setUploadProgress={setUploadProgress}
            sortValue={sortValue}
            setSortValue={setSortValue}
            projectSettingsOpen={projectSettingsOpen}
            setProjectSettingsOpen={setProjectSettingsOpen}
            deleteProjectOpen={deleteProjectOpen}
            setDeleteProjectOpen={setDeleteProjectOpen}
            refetchData={refetchData}
            setRefreshData={setRefetchData}
            createFolderOpen={createFolderOpen}
            setCreateFolderOpen={setCreateFolderOpen}
            createPrivateFolderOpen={createPrivateFolderOpen}
            setCreatePrivateFolderOpen={setCreatePrivateFolderOpen}
          />
          <main className="px-1 md:px-6 lg:px-1 xl:px-20 2xl:px-44 pt-8 mb-10 flex flex-row flex-wrap">
            <div className="flex flex-row w-full">
              <p className="w-2/3 md:w-1/3 text-xs silka-regular text-gray-600">
                Name
              </p>
              <p className="hidden md:flex w-1/6 text-xs silka-regular text-gray-600">
                Created At
              </p>
              <p className="hidden md:flex w-1/6 text-xs silka-regular text-gray-600">
                Created By
              </p>
              <div className="w-1/3 flex flex-row">
                <p className="w-3/4 text-xs silka-regular text-gray-600">
                  Link
                </p>
                <p className="w-1/4 text-xs silka-regular text-gray-600">
                  Options
                </p>
              </div>
            </div>
            <hr className="my-2.5 w-full h-px" />
            <div className="mt-2 w-full flex flex-col space-y-8 md:space-y-6">
              {views.length > 0 ? (
                <>
                  {views.map((value: any, index: number) => {
                    return (
                      <ViewComponent
                        setRefetchData={setRefetchData}
                        key={index}
                        value={value}
                      />
                    );
                  })}
                </>
              ) : (
                <div className="mt-16 flex flex-col justify-center items-center w-full">
                  <div className="rounded-full bg-[#F6E7E3] p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#FF623D"
                        d="M11.362 2c4.156 0 2.638 6 2.638 6s6-1.65 6 2.457v11.543h-16v-20h7.362zm.827-2h-10.189v24h20v-14.386c0-2.391-6.648-9.614-9.811-9.614zm-5.189 12.5c0-.828.672-1.5 1.501-1.5.827 0 1.499.672 1.499 1.5s-.672 1.5-1.499 1.5c-.829 0-1.501-.672-1.501-1.5zm6.5.5l-2.093 2.968-1.31-.968-3.097 4h10l-3.5-6z"
                      />
                    </svg>
                  </div>
                  <h3 className="mt-4 silka-semibold text-gray-800">
                    No Public Content Found
                  </h3>
                  <p className="text-xs mt-1.5 silka-regular text-gray-500">
                    Make media public to be accessed by everyone.
                  </p>
                </div>
              )}
            </div>
          </main>
        </>
      </DashboardLayout>
    </PageHead>
  );
}
