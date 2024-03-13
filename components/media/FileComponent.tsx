import { useState, Dispatch, SetStateAction, useEffect } from 'react';
import Router from 'next/router';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import cx from 'classnames';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import fileDownload from 'js-file-download';
import { apiUrl } from '../../utils/apiUrl';
import toast from 'react-hot-toast';

interface FileComponentProps {
  value: any;
  workspaceId: string;
  pathname: any;
  renameOpen: boolean;
  setRenameOpen: Dispatch<SetStateAction<boolean>>;
  setRenameCurrentFileName: Dispatch<SetStateAction<string>>;
  deleteFileOpen: boolean;
  setDeleteFileOpen: Dispatch<SetStateAction<boolean>>;
  setFileId: Dispatch<SetStateAction<string>>;
  setMakePrivateOpen: Dispatch<SetStateAction<boolean>>;
  setRefetchData: Dispatch<SetStateAction<boolean>>;
  files: any;
  setFiles: Dispatch<SetStateAction<any>>;
}
function getCorrectFileName(format: string, name: string) {
  const editFormat = format.split('/').at(-1);
  const nameArray = name.split('.');
  if (nameArray.includes(String(editFormat))) {
    return name;
  } else {
    return name + '.' + String(editFormat);
  }
}

export function FileComponent({
  pathname,
  value,
  renameOpen,
  setRenameOpen,
  setFileId,
  setRenameCurrentFileName,
  deleteFileOpen,
  setDeleteFileOpen,
  setMakePrivateOpen,
  setRefetchData,
  workspaceId,
  files,
  setFiles,
}: FileComponentProps) {
  const [clicked, setClicked] = useState(false);
  const [nullHovered, setNullHovered] = useState(false);
  const [componentHovered, setComponentHovered] = useState(false);

  axiosRetry(axios, { retries: 3 });

  async function handleDownload() {
    try {
      await axios
        .get(value.videoUrl ? value?.videoUrl : value?.google_url, {
          responseType: 'blob',
        })
        .then((res) => {
          fileDownload(
            res.data,
            getCorrectFileName(value.format, value.name)
          );
        });
    } catch (e) {
      console.log(e);
    }
  }

  async function handleDuplicate() {
    try {
      toast.loading('Duplicating File...', {
        className: 'text-sm silka-medium text-gray-900',
        duration: 80000,
      });
      await axios.post(`${apiUrl()}file/create/duplicate`, null, {
        params: { fileId: value.id },
      });
      toast.remove();
      toast.success('Successfully Duplicated File!', {
        className: 'text-sm silka-medium text-gray-900',
      });
      setRefetchData(true);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <button
      onClick={() => {
        const redirectUrl = '/player/' + value.id;
        if (!nullHovered) {
          Router.push(redirectUrl);
        }
      }}
      className={
        'w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2.5 lg:p-1.5 xl:p-2.5 ' +
        (clicked ? '' : '')
      }
    >
      <div
        className={
          'rounded-xl flex flex-col bg-[#F7F7F7] ' +
          (clicked ? 'border border-[#FF623D]' : '')
        }
      >
        {value.google_url == 'unknown' ? (
          <div className="w-full h-[120px] bg-[#DCDCDC] rounded-t-lg flex flex-col justify-center items-center">
            <svg
              width="13"
              height="16"
              viewBox="0 0 13 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.8004 13.6C12.8004 14.9256 11.7259 16 10.4004 16H2.40003C1.07453 16 0 14.9256 0 13.6V2.40003C0 1.07453 1.07453 0 2.40003 0H7.2001C7.30403 0 7.40609 0.0202234 7.50051 0.0583929C7.59895 0.0983055 7.68935 0.157768 7.76596 0.234243L12.566 5.03431C12.716 5.18431 12.8004 5.38787 12.8004 5.60003L12.8004 13.6ZM1.60014 2.40003C1.60014 1.95819 1.95826 1.59993 2.4001 1.59993H6.40027V4.0001C6.40027 5.32547 7.4748 6.4 8.80031 6.4H11.2003V13.6001C11.2003 14.0419 10.8422 14.4002 10.4004 14.4002H2.40003C1.95819 14.4002 1.60007 14.0419 1.60007 13.6001L1.60014 2.40003ZM8.00034 4.0001V2.73138L10.069 4.80007H8.80031C8.35846 4.80007 8.00034 4.44181 8.00034 4.0001Z"
                fill="#363636"
              />
            </svg>
          </div>
        ) : (
          <img
            className="rounded-t-lg w-full h-[120px]"
            src={value.google_url}
            height={120}
          />
        )}
        <div className="w-full px-2 flex flex-row justify-between h-14 rounded-b-lg bg-[#F2F2F2]">
          <div className="flex flex-col space-y-1 my-auto">
            <p className="text-[11px] break-all text-start silka-medium">
              {value.name.length > 34
                ? value.name.slice(0, 34) + '...'
                : value.name}
            </p>
            <p className="mt-1 text-gray-700 text-start silka-medium text-[10px]">
              {value.uploader}
            </p>
          </div>
          <DropdownMenuPrimitive.Root>
            <DropdownMenuPrimitive.Trigger asChild>
              <button
                onMouseEnter={() => {}}
                className="h-fit my-auto"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5 6.87293C5.5175 6.87293 5.9375 7.29292 5.9375 7.81043C5.9375 8.32793 5.5175 8.74792 5 8.74792C4.4825 8.74792 4.0625 8.32793 4.0625 7.81043C4.0625 7.29292 4.4825 6.87293 5 6.87293ZM5 4.06042C5.5175 4.06042 5.9375 4.48042 5.9375 4.99792C5.9375 5.51542 5.5175 5.93542 5 5.93542C4.4825 5.93542 4.0625 5.51542 4.0625 4.99792C4.0625 4.48042 4.4825 4.06042 5 4.06042ZM5 1.24792C5.5175 1.24792 5.9375 1.66792 5.9375 2.18542C5.9375 2.70292 5.5175 3.12292 5 3.12292C4.4825 3.12292 4.0625 2.70292 4.0625 2.18542C4.0625 1.66792 4.4825 1.24792 5 1.24792Z"
                    fill="#545454"
                  />
                </svg>
              </button>
            </DropdownMenuPrimitive.Trigger>
            <DropdownMenuPrimitive.Portal>
              <DropdownMenuPrimitive.Content
                align="end"
                sideOffset={5}
                onMouseLeave={() => {
                  setNullHovered(false);
                }}
                onMouseEnter={() => {
                  setNullHovered(true);
                }}
                className={cx(
                  'radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
                  'w-44 rounded-lg py-2 shadow-md',
                  'bg-[#363636]'
                )}
              >
                <DialogPrimitive.Root
                  open={renameOpen}
                  onOpenChange={setRenameOpen}
                >
                  <DialogPrimitive.Trigger asChild>
                    <button
                      onClick={() => {
                        setRenameCurrentFileName(value.name);
                        setFileId(value.id);
                      }}
                      className="px-3 w-full py-1 hover:bg-[#3D3D3D]"
                    >
                      <DropdownMenuPrimitive.Item className="flex py-0.5 flex-row space-x-2.5">
                        <svg
                          width="16"
                          height="12"
                          viewBox="0 0 16 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="my-auto"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3.03448 0H8.55172C8.85628 0 9.10345 0.247166 9.10345 0.551724C9.10345 0.856282 8.85628 1.10345 8.55172 1.10345H6.34483V2.75862H14.3448C15.259 2.75862 16 3.49963 16 4.41379V6.62069C16 7.53485 15.259 8.27586 14.3448 8.27586H6.34483V9.93103H8.55172C8.85628 9.93103 9.10345 10.1782 9.10345 10.4828C9.10345 10.7873 8.85628 11.0345 8.55172 11.0345H3.03448C2.72992 11.0345 2.48276 10.7873 2.48276 10.4828C2.48276 10.1782 2.72992 9.93103 3.03448 9.93103H5.24138V1.10345H3.03448C2.72992 1.10345 2.48276 0.856282 2.48276 0.551724C2.48276 0.247166 2.72992 0 3.03448 0ZM3.58621 2.75862C3.73239 2.75862 3.87278 2.81687 3.97623 2.92032C4.07968 3.02377 4.13793 3.16416 4.13793 3.31034C4.13793 3.45652 4.07968 3.59692 3.97623 3.70036C3.87278 3.80381 3.73239 3.86206 3.58621 3.86206H1.65517C1.35061 3.86206 1.10345 4.10898 1.10345 4.41379V6.62068C1.10345 6.92549 1.35061 7.17241 1.65517 7.17241H3.58621C3.73239 7.17241 3.87278 7.23066 3.97623 7.33411C4.07968 7.43755 4.13793 7.57795 4.13793 7.72413C4.13793 7.87031 4.07968 8.0107 3.97623 8.11415C3.87278 8.2176 3.73239 8.27585 3.58621 8.27585H1.65517C0.741265 8.27585 0 7.53484 0 6.62068V4.41378C0 3.49962 0.741265 2.75861 1.65517 2.75861H3.58621V2.75862ZM8.55172 3.86207V7.17241H14.3448C14.6496 7.17241 14.8966 6.92549 14.8966 6.62069V4.41379C14.8966 4.10899 14.6496 3.86207 14.3448 3.86207H8.55172ZM6.34483 7.17241H7.44828V3.86207H6.34483V7.17241Z"
                            fill="white"
                          />
                        </svg>

                        <span className="text-sm silka-medium text-white">
                          Rename
                        </span>
                      </DropdownMenuPrimitive.Item>
                    </button>
                  </DialogPrimitive.Trigger>
                </DialogPrimitive.Root>
                <DropdownMenuPrimitive.Separator className="my-1 h-px bg-[#616161]" />
                <button
                  onClick={() => {
                    handleDuplicate();
                  }}
                  className="px-3 w-full py-1 hover:bg-[#3D3D3D]"
                >
                  <DropdownMenuPrimitive.Item className="flex py-0.5 flex-row space-x-2.5">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 17 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="my-auto"
                    >
                      <path
                        d="M11.8008 8.07663V2.81155C11.8008 1.25247 10.5484 0 8.98923 0H3.72414C2.16506 0 0.912598 1.25242 0.912598 2.81155V8.07663C0.912598 9.63571 2.16502 10.8882 3.72414 10.8882H8.98923C10.5483 10.8882 11.8008 9.63575 11.8008 8.07663ZM2.47186 8.07663V2.81155C2.47186 2.0959 3.03415 1.53361 3.74979 1.53361H9.01488C9.73052 1.53361 10.2928 2.0959 10.2928 2.81155V8.07663C10.2928 8.79227 9.73052 9.35456 9.01488 9.35456H3.72423C3.0341 9.35456 2.4463 8.79227 2.47181 8.07663H2.47186Z"
                        fill="white"
                      />
                      <path
                        d="M14.101 5.11182H12.8231V6.64543H14.101C14.8167 6.64543 15.379 7.20772 15.379 7.92336V13.1884C15.379 13.9041 14.8167 14.4664 14.101 14.4664H8.83596C8.12032 14.4664 7.55803 13.9041 7.55803 13.1884V11.9105H6.02441V13.1884C6.02441 14.7475 7.27684 16 8.83596 16H14.101C15.6601 16 16.9126 14.7476 16.9126 13.1884V7.92336C16.9126 6.36428 15.6347 5.11182 14.101 5.11182V5.11182Z"
                        fill="white"
                      />
                    </svg>

                    <span className="text-sm silka-medium text-white">
                      Duplicate
                    </span>
                  </DropdownMenuPrimitive.Item>
                </button>
                <button
                  onClick={() => {
                    handleDownload();
                  }}
                  className="px-3 w-full py-1 hover:bg-[#3D3D3D]"
                >
                  <DropdownMenuPrimitive.Item className="flex py-0.5 flex-row space-x-2.5">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 17 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="my-auto"
                    >
                      <path
                        d="M11.232 2.20237C10.9733 2.20237 10.7632 1.9927 10.7632 1.7336C10.7632 1.47496 10.9733 1.26484 11.232 1.26484H12.8357C13.7796 1.26484 14.6373 1.65036 15.2588 2.27197C15.8804 2.89357 16.2664 3.75127 16.2664 4.69507V11.8324C16.2664 12.7763 15.8804 13.634 15.2588 14.2555C14.6372 14.8771 13.7795 15.2631 12.8357 15.2631H3.69706C2.75314 15.2631 1.89544 14.8772 1.27395 14.2555C0.652351 13.6339 0.266357 12.7762 0.266357 11.8324V4.69507C0.266357 3.75116 0.652322 2.89345 1.27395 2.27197C1.89555 1.65036 2.75326 1.26484 3.69706 1.26484H5.30075C5.55939 1.26484 5.76951 1.47451 5.76951 1.7336C5.76951 1.9927 5.55939 2.20237 5.30075 2.20237H3.69706C3.01178 2.20237 2.3887 2.483 1.93666 2.93514C1.48452 3.38729 1.20389 4.01085 1.20389 4.69554V11.8329C1.20389 12.5182 1.48452 13.1412 1.93666 13.5933C2.38881 14.0454 3.01178 14.326 3.69706 14.326H12.8357C13.5209 14.326 14.144 14.0454 14.5961 13.5933C15.0482 13.1411 15.3288 12.5182 15.3288 11.8329V4.69554C15.3288 4.01073 15.0482 3.38717 14.5961 2.93514C14.1439 2.483 13.5209 2.20237 12.8357 2.20237H11.232ZM7.79771 10.1272V0.468767C7.79771 0.210123 8.00783 0 8.26647 0C8.52512 0 8.73524 0.209671 8.73524 0.468767V10.1272L11.0849 7.54873C11.2588 7.35773 11.5547 7.3435 11.7457 7.51741C11.9367 7.69132 11.9509 7.98719 11.777 8.17866C10.7518 9.30332 9.57528 10.4955 8.61215 11.6511C8.60236 11.6619 8.59211 11.6722 8.58129 11.682C8.39029 11.8559 8.09441 11.8421 7.9205 11.6511L4.75564 8.17866C4.58173 7.98767 4.59596 7.69179 4.78696 7.51741C4.97795 7.3435 5.27383 7.35773 5.44774 7.54873L7.79741 10.1272H7.79771Z"
                        fill="white"
                      />
                    </svg>

                    <span className="text-sm my-auto silka-medium text-white">
                      Download
                    </span>
                  </DropdownMenuPrimitive.Item>
                </button>
                <DropdownMenuPrimitive.Separator className="my-1 h-px bg-[#616161]" />
                <DialogPrimitive.Root
                  open={deleteFileOpen}
                  onOpenChange={setDeleteFileOpen}
                >
                  <DialogPrimitive.Trigger asChild>
                    <button
                      onClick={() => {
                        setFileId(value.id);
                      }}
                      className="px-3 w-full py-1 hover:bg-[#3D3D3D]"
                    >
                      <DropdownMenuPrimitive.Item className="flex py-0.5 flex-row space-x-2.5">
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="my-auto"
                        >
                          <path
                            d="M13.8248 13.3634V3.58235H15.2536V2.37474L11.47 2.37489V1.81137C11.47 0.805091 10.6651 0.000140385 9.65878 0.000140385L5.95568 0C4.9494 0 4.14445 0.804951 4.14445 1.81123V2.37474L0.36084 2.37489V3.58249H1.78983V13.3836C1.78983 14.8327 2.95711 16 4.40619 16H11.2086C12.6373 15.9798 13.8248 14.8125 13.8248 13.3634L13.8248 13.3634ZM5.35191 1.8113C5.35191 1.46918 5.61358 1.2075 5.95571 1.2075H9.63869C9.98081 1.2075 10.2425 1.46917 10.2425 1.8113V2.37482L5.35198 2.37496L5.35191 1.8113ZM2.99722 13.3634V3.58235H12.6172V13.3835C12.6172 14.1684 11.9934 14.7923 11.2085 14.7923L4.40604 14.7924C3.64123 14.7722 2.99729 14.1483 2.99729 13.3634L2.99722 13.3634Z"
                            fill="white"
                          />
                          <path
                            d="M7.20361 5.49414H8.41122V12.7192H7.20361V5.49414Z"
                            fill="white"
                          />
                          <path
                            d="M9.41748 5.49414H10.6251V12.7192H9.41748V5.49414Z"
                            fill="white"
                          />
                          <path
                            d="M4.98975 5.49414H6.19735V12.7192H4.98975V5.49414Z"
                            fill="white"
                          />
                        </svg>

                        <span className="text-sm my-auto silka-medium text-white">
                          Delete
                        </span>
                      </DropdownMenuPrimitive.Item>
                    </button>
                  </DialogPrimitive.Trigger>
                </DialogPrimitive.Root>
              </DropdownMenuPrimitive.Content>
            </DropdownMenuPrimitive.Portal>
          </DropdownMenuPrimitive.Root>
        </div>
      </div>
    </button>
  );
}
