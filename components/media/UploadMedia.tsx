import { Transition } from '@headlessui/react';
import cx from 'classnames';
import React, { Fragment, useState } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { YoutubeMedia } from './YoutubeMedia';
import { Dispatch, SetStateAction } from 'react';
import { TiktokMedia } from './TiktokMedia';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../utils/apiUrl';
import toast from 'react-hot-toast';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  workspaceId: string;
  mediaId: string;
  userId: string;
  uploadMediaOpen: boolean;
  setUploadMediaOpen: Dispatch<SetStateAction<boolean>>;
  tiktokOpen: boolean;
  setTiktokOpen: Dispatch<SetStateAction<boolean>>;
  youtubeOpen: boolean;
  setYoutubeOpen: Dispatch<SetStateAction<boolean>>;
  uploadProgressToast: boolean;
  setUploadProgressToast: Dispatch<SetStateAction<boolean>>;
  uploadProgress: number;
  setUploadProgress: Dispatch<SetStateAction<number>>;
  setRefreshData: Dispatch<SetStateAction<boolean>>;
}

interface UploadMediaContentProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  uploadMediaOpen: boolean;
  setUploadMediaOpen: Dispatch<SetStateAction<boolean>>;
  tiktokOpen: boolean;
  setTiktokOpen: Dispatch<SetStateAction<boolean>>;
  youtubeOpen: boolean;
  setYoutubeOpen: Dispatch<SetStateAction<boolean>>;
  workspaceId: string;
  mediaId: string;
  userId: string;
  uploadProgressToast: boolean;
  setUploadProgressToast: Dispatch<SetStateAction<boolean>>;
  uploadProgress: number;
  setUploadProgress: Dispatch<SetStateAction<number>>;
  setRefreshData: Dispatch<SetStateAction<boolean>>;
}

function UploadMediaContent({
  isOpen,
  setIsOpen,
  uploadMediaOpen,
  setUploadMediaOpen,
  tiktokOpen,
  setTiktokOpen,
  youtubeOpen,
  setYoutubeOpen,
  uploadProgressToast,
  setUploadProgressToast,
  uploadProgress,
  setUploadProgress,
  workspaceId,
  mediaId,
  userId,
  setRefreshData,
}: UploadMediaContentProps) {
  const [uploadHovered, setUploadHovered] = useState(false);

  axiosRetry(axios, { retries: 3 });

  async function uploadFile(e: any) {
    const file = e.target.files[0];

    try {
      const testForm = new FormData();
      testForm.append('file', file);

      toast.loading('Uploading File...', {
        duration: 80000,
        className: 'text-sm silka-medium text-gray-900',
      });

      setIsOpen(false);
      setUploadProgressToast(true);
      setUploadMediaOpen(false);
      setTiktokOpen(false);
      setYoutubeOpen(false);

      const value = await axios.post(
        `${apiUrl()}file/write/uploadfile`,
        testForm,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          params: {
            workspaceId: workspaceId,
            userId: userId,
            folderId: mediaId,
            fileName: file.name,
            fileSize: file.size,
            fileFormat: file.type,
          },
        }
      );

      await axios.post(`${apiUrl()}file/create/thumbnail`, null, {
        params: { workspaceId: workspaceId, fileId: value.data.id },
      });

      toast.remove();
      toast.success('Successfully Uploaded File!', {
        className: 'text-sm silka-medium text-gray-900',
      });

      setRefreshData(true);
    } catch (e) {
      console.log(e);
      toast.remove();
      toast.error('Error uploading file, please try again.', {
        className: 'text-sm silka-medium text-gray-900',
      });
    }
  }

  return (
    <div className="p-4">
      <DialogPrimitive.Title className="text-base silka-medium text-gray-900">
        Upload Media
      </DialogPrimitive.Title>
      <DialogPrimitive.Description className="mt-1 text-xs silka-regular text-gray-700 w-9/10">
        Add media to your Disperse workspace to begin distributing to
        social platforms.
      </DialogPrimitive.Description>
      <div className="flex flex-col mt-6 mb-2">
        <div className="flex flex-row space-x-4">
          <label
            onMouseEnter={() => {
              setUploadHovered(true);
            }}
            onMouseLeave={() => {
              setUploadHovered(false);
            }}
            htmlFor="file-upload"
            className={
              'w-4/5 flex flex-col space-y-1 justify-center items-center rounded-xl ' +
              (uploadHovered
                ? 'border border-dashed border-[#FF623D]'
                : 'border border-dashed')
            }
          >
            <p className="silka-semibold text-sm">
              <span className="underline hover:text-[#FF623D]">
                Select
              </span>{' '}
              a file to upload
            </p>
            <p className="silka-regular text-xs text-[#717171]">
              or drag &amp; drop here
            </p>
          </label>
          <input
            id="file-upload"
            className="hidden"
            onChange={uploadFile}
            type="file"
          />
          <div className="w-1/5 flex flex-col space-y-4">
            <button
              className="bg-black h-24 hover:opacity-90 rounded-xl flex flex-col justify-center items-center"
              onClick={() => {
                setUploadMediaOpen(false);
                setTiktokOpen(true);
              }}
            >
              <svg
                width="21"
                height="24"
                viewBox="0 0 18 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.00374 8.27899V7.49901C6.73308 7.46056 6.45997 7.44079 6.18665 7.43945C2.84294 7.43945 0.122559 10.1603 0.122559 13.504C0.122559 15.5551 1.14765 17.3708 2.71139 18.4688C1.6643 17.349 1.08209 15.873 1.08298 14.34C1.08298 11.0438 3.72603 8.35588 7.00374 8.27899Z"
                  fill="#00F2EA"
                />
                <path
                  d="M7.14686 17.1087C8.63882 17.1087 9.85568 15.9219 9.91124 14.4428L9.91635 1.2393H12.3285C12.277 0.96353 12.251 0.683759 12.2507 0.40332H8.95615L8.95059 13.6072C8.89571 15.0859 7.67818 16.2723 6.18666 16.2723C5.73889 16.2725 5.29779 16.1634 4.90179 15.9543C5.42067 16.6783 6.25621 17.1078 7.14686 17.1087ZM16.8342 5.7212V4.98744C15.9478 4.98833 15.0802 4.73033 14.3383 4.24546C14.9889 4.99455 15.8647 5.51232 16.8346 5.7212"
                  fill="#00F2EA"
                />
                <path
                  d="M14.3382 4.24506C13.6111 3.41307 13.2105 2.34532 13.2109 1.24023H12.3283C12.5592 2.47443 13.2856 3.5604 14.3382 4.24506ZM6.18664 10.7338C4.65778 10.7356 3.41892 11.9744 3.41714 13.5033C3.41803 14.5326 3.98958 15.4766 4.90133 15.9548C4.56068 15.485 4.37735 14.9199 4.37735 14.3397C4.3789 12.8109 5.61776 11.5716 7.14684 11.5698C7.43217 11.5698 7.70572 11.6169 7.96393 11.698V8.33452C7.69327 8.29608 7.42017 8.2763 7.14684 8.27497C7.09884 8.27497 7.05151 8.27763 7.00395 8.27852V10.862C6.73952 10.778 6.46397 10.7347 6.18664 10.7338Z"
                  fill="#FF004F"
                />
                <path
                  d="M16.8342 5.72137V8.28198C15.1256 8.28198 13.5431 7.73555 12.2505 6.80801V13.5034C12.2505 16.8471 9.53057 19.5675 6.18686 19.5675C4.89467 19.5675 3.69648 19.1597 2.71161 18.4682C3.85625 19.7026 5.46355 20.4039 7.14684 20.4035C10.4905 20.4035 13.2109 17.6831 13.2109 14.3398V7.64444C14.5462 8.60464 16.15 9.12041 17.7946 9.11841V5.82292C17.4648 5.82292 17.1442 5.78715 16.834 5.7207"
                  fill="#FF004F"
                />
                <path
                  d="M12.2503 13.5033V6.80789C13.5856 7.76831 15.1893 8.28385 16.834 8.28185V5.72147C15.8642 5.51236 14.9884 4.99437 14.338 4.24506C13.2854 3.5604 12.5589 2.47443 12.3281 1.24023H9.91611L9.911 14.4437C9.85567 15.9224 8.63859 17.1092 7.14662 17.1092C6.2562 17.1083 5.42044 16.6786 4.90178 15.955C3.99002 15.477 3.41826 14.533 3.41715 13.5035C3.41893 11.9747 4.65779 10.7358 6.18664 10.734C6.47152 10.734 6.74507 10.7807 7.00373 10.8622V8.27874C3.72603 8.35563 1.08298 11.0436 1.08298 14.3397C1.08298 15.9337 1.7023 17.3848 2.71139 18.4685C3.7287 19.1847 4.94267 19.5685 6.18664 19.5674C9.53057 19.5674 12.2503 16.847 12.2503 13.5033Z"
                  fill="white"
                />
              </svg>

              <p className="text-[9px] mt-1.5 text-white silka-bold">
                Tiktok Video
              </p>
              <p className="text-[7px] text-white mt-1 silka-medium">
                Download with URL
              </p>
            </button>
            {/*
            <button
              className="bg-[#FF0000] hover:opacity-90 h-24 rounded-xl flex flex-col justify-center items-center"
              onClick={() => {
                setUploadMediaOpen(false);
                setYoutubeOpen(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                viewBox="0 0 24 24"
              >
                <path
                  fill="white"
                  d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
                />
              </svg>
              <p className="text-[9px] mt-1.5 text-white silka-bold">
                Youtube Video
              </p>
              <p className="text-[7px] text-white mt-1 silka-medium">
                Download with URL
              </p>
            </button>
            */}
          </div>
        </div>
      </div>
    </div>
  );
}

export function UploadMedia({
  isOpen,
  setIsOpen,
  workspaceId,
  mediaId,
  userId,
  uploadMediaOpen,
  setUploadMediaOpen,
  tiktokOpen,
  setTiktokOpen,
  youtubeOpen,
  setYoutubeOpen,
  uploadProgressToast,
  setUploadProgressToast,
  uploadProgress,
  setUploadProgress,
  setRefreshData,
}: Props) {
  return (
    <>
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
            className={cx(
              'fixed z-50',
              'w-[95vw] max-w-xl rounded-lg md:w-[120vh]',
              'top-[50%] left-[50%] max-h-[75vh] overflow-auto -translate-x-[50%] -translate-y-[50%]',
              'bg-white',
              'focus:outline-none focus-visible:ring focus-visible:ring-[#FF623D] focus-visible:ring-opacity-75'
            )}
          >
            {uploadMediaOpen ? (
              <UploadMediaContent
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                uploadMediaOpen={uploadMediaOpen}
                setUploadMediaOpen={setUploadMediaOpen}
                tiktokOpen={tiktokOpen}
                setTiktokOpen={setTiktokOpen}
                youtubeOpen={youtubeOpen}
                setYoutubeOpen={setYoutubeOpen}
                workspaceId={workspaceId}
                uploadProgressToast={uploadProgressToast}
                setUploadProgressToast={setUploadProgressToast}
                uploadProgress={uploadProgress}
                setUploadProgress={setUploadProgress}
                mediaId={String(mediaId)}
                userId={userId}
                setRefreshData={setRefreshData}
              />
            ) : tiktokOpen ? (
              <TiktokMedia
                folderId={mediaId}
                userId={userId}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                setRefetchData={setRefreshData}
                setTiktokOpen={setTiktokOpen}
              />
            ) : youtubeOpen ? (
              <YoutubeMedia
                userId={userId}
                workspaceName={workspaceId}
                folderId={mediaId}
                youtubeOpen={youtubeOpen}
                setYoutubeOpen={setYoutubeOpen}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                setRefetchData={setRefreshData}
              />
            ) : (
              <></>
            )}
          </DialogPrimitive.Content>
        </Transition.Child>
      </Transition.Root>
    </>
  );
}
