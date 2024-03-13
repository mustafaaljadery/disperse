import { Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import cx from 'classnames';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../../utils/apiUrl';
import Link from 'next/link';

async function searchWorkspace(workspaceId: string, search: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}workspace/read/searchquery`,
      { params: { workspaceId: workspaceId, searchQuery: search } }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

interface SearchDialogInterface {
  searchOpen: boolean;
  workspaceId: string;
}

interface SearchComponentProps {
  value: any;
  workspaceId: string;
}

function SearchComponent({
  value,
  workspaceId,
}: SearchComponentProps) {
  return (
    <Link
      href={
        value.type == 'file'
          ? `/player/${value.id}`
          : value.type == 'folder'
          ? `/${workspaceId}/${value.id}`
          : value.type == 'composition'
          ? `/edit/${value.id}`
          : ''
      }
      legacyBehavior>
      <button className="hover:bg-gray-200 px-3 py-2 rounded w-full flex flex-row space-x-4">
        <>
          {value.type == 'file' ? (
            <svg
              width="14"
              height="14"
              viewBox="0 0 13 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="my-auto"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.8004 13.6C12.8004 14.9256 11.7259 16 10.4004 16H2.40003C1.07453 16 0 14.9256 0 13.6V2.40003C0 1.07453 1.07453 0 2.40003 0H7.2001C7.30403 0 7.40609 0.0202234 7.50051 0.0583929C7.59895 0.0983055 7.68935 0.157768 7.76596 0.234243L12.566 5.03431C12.716 5.18431 12.8004 5.38787 12.8004 5.60003L12.8004 13.6ZM1.60014 2.40003C1.60014 1.95819 1.95826 1.59993 2.4001 1.59993H6.40027V4.0001C6.40027 5.32547 7.4748 6.4 8.80031 6.4H11.2003V13.6001C11.2003 14.0419 10.8422 14.4002 10.4004 14.4002H2.40003C1.95819 14.4002 1.60007 14.0419 1.60007 13.6001L1.60014 2.40003ZM8.00034 4.0001V2.73138L10.069 4.80007H8.80031C8.35846 4.80007 8.00034 4.44181 8.00034 4.0001Z"
                fill="#363636"
              />
            </svg>
          ) : value.type == 'folder' ? (
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="my-auto"
            >
              <path
                d="M4.05533 2.66634C4.97533 3.74101 5.774 4.66634 7.33333 4.66634H14.6667V13.333H1.33333V2.66634H4.05533ZM4.66667 1.33301H0V14.6663H16V3.33301H7.33333C6.24733 3.33301 5.79667 2.62767 4.66667 1.33301Z"
                fill="#363636"
              />
            </svg>
          ) : value.type == 'composition' ? (
            <svg
              width="14"
              height="14"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="my-auto"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.27264 0C1.91298 0 0 1.91102 0 4.26881V27.0345C0 29.3923 1.91298 31.3033 4.27264 31.3033H21.3624C23.7221 31.3033 25.6347 29.3923 25.6347 27.0345V4.26881C25.6347 1.91102 23.7221 0 21.3624 0H4.27264ZM4.27264 7.11443C4.27264 6.3284 4.91008 5.69158 5.69672 5.69158H19.9383C20.725 5.69158 21.3627 6.32838 21.3627 7.11443C21.3627 7.90015 20.725 8.53729 19.9383 8.53729H5.69672C4.91005 8.53729 4.27264 7.90017 4.27264 7.11443V7.11443ZM5.69672 9.96006C4.91005 9.96006 4.27264 10.5972 4.27264 11.3829C4.27264 12.1689 4.91008 12.8061 5.69672 12.8061H19.9383C20.725 12.8061 21.3627 12.169 21.3627 11.3829C21.3627 10.5972 20.725 9.96006 19.9383 9.96006H5.69672ZM4.27264 15.6517C4.27264 14.8657 4.91008 14.2289 5.69672 14.2289H19.9383C20.725 14.2289 21.3627 14.8657 21.3627 15.6517C21.3627 16.4374 20.725 17.0746 19.9383 17.0746H5.69672C4.91005 17.0746 4.27264 16.4375 4.27264 15.6517ZM5.69672 18.4973C4.91005 18.4973 4.27264 19.1345 4.27264 19.9202C4.27264 20.7062 4.91008 21.3434 5.69672 21.3434H19.9383C20.725 21.3434 21.3627 20.7063 21.3627 19.9202C21.3627 19.1345 20.725 18.4973 19.9383 18.4973H5.69672ZM4.27264 24.189C4.27264 23.4033 4.91008 22.7662 5.69672 22.7662H11.3931C12.1798 22.7662 12.8172 23.4033 12.8172 24.189C12.8172 24.975 12.1798 25.6119 11.3931 25.6119H5.69672C4.91005 25.6119 4.27264 24.9751 4.27264 24.189V24.189Z"
                fill="#363636"
              />
              <path
                d="M21.3623 32.7264H8.8374C9.35239 33.5756 10.1646 34.25 11.185 34.5772L27.4576 39.7947C29.7047 40.515 32.1103 39.2794 32.8313 37.0345L39.7943 15.357C40.5156 13.1124 39.2787 10.7088 37.0319 9.98836L27.0588 6.79065V27.0347C27.0588 30.1782 24.5085 32.7263 21.3624 32.7263L21.3623 32.7264Z"
                fill="#363636"
              />
            </svg>
          ) : (
            <></>
          )}
        </>
        <p className="text-sm silka-medium text-gray-700">
          {value.name.length > 64
            ? value.name.slice(64) + '...'
            : value.name}
        </p>
      </button>
    </Link>
  );
}

export function SearchDialog({
  searchOpen,
  workspaceId,
}: SearchDialogInterface) {
  const [search, setSearch] = useState('');
  const [searchData, setSearchData] = useState<any>(null);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (search.length > 0) {
      setSearching(true);
      searchWorkspace(workspaceId, search).then((value) => {
        setSearchData(value);
        setSearching(false);
      });
    }
  }, [search]);

  return (
    <Transition.Root show={searchOpen}>
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
          className={cx(
            'fixed z-50',
            'w-[95vw] max-w-xl rounded p-3 md:w-full',
            'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
            'bg-white',
            'focus:outline-none focus-visible:ring-0 focus:border-[#FF623D]'
          )}
        >
          <div className="flex flex-col">
            <div className="flex flex-row bg-gray-100 rounded">
              <div className="w-[7%] flex flex-col justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#A8A8A8"
                    d="M23.809 21.646l-6.205-6.205c1.167-1.605 1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 0 3.923-.627 5.487-1.698l6.238 6.238 2.354-2.354zm-20.955-11.916c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877c-3.793 0-6.877-3.085-6.877-6.877z"
                  />
                </svg>
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                placeholder="Search Disperse Workspace..."
                className="w-[93%] silka-regular text-gray-700 rounded-r bg-gray-100 text-sm border-none focus:ring-0"
              />
            </div>
            <div></div>
            {searching ? (
              <div className=""></div>
            ) : (
              <>
                {searchData == null || search.length == 0 ? (
                  <div className="flex flex-col py-8 justify-center items-center mt-4">
                    <div></div>
                    <p className="silka-semibold text-sm">
                      Search your workspace
                    </p>
                    <span className="mt-1 silka-regular text-xs text-gray-700">
                      Compositions, projects, folders, files &amp;
                      more
                    </span>
                  </div>
                ) : (
                  <>
                    {searchData.length == 0 ? (
                      <div className="flex flex-col py-8 justify-center items-center mt-4">
                        <p className="silka-semibold text-sm">
                          No Results Found
                        </p>
                        <span className="mt-1 silka-regular text-xs text-gray-700">
                          Refine your search query to update results
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col mt-2 space-y-0.5">
                        {searchData
                          .slice(0, 12)
                          .map((value: any, index: number) => {
                            return (
                              <SearchComponent
                                key={index}
                                value={value}
                                workspaceId={workspaceId}
                              />
                            );
                          })}
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </DialogPrimitive.Content>
      </Transition.Child>
    </Transition.Root>
  );
}
