import Link from 'next/link';
import { UploadMedia } from './UploadMedia';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { Dispatch, SetStateAction } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { SortDropdownMenu } from './SortDropdownMenu';
import { OptionsDropdownMenu } from './OptionsDropdownMenu';
import { StorageViewer } from './StorageViewer';
import { NewMediaDropdown } from './NewMediaDropdown';

interface MediaMenuProps {
  projectDetails: any;
  workspaceId: string;
  mediaId: string;
  pathname: string;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isNewMediaOpen: boolean;
  setIsNewMediaOpen: Dispatch<SetStateAction<boolean>>;
  userData: any;
  uploadMediaOpen: boolean;
  setUploadMediaOpen: Dispatch<SetStateAction<boolean>>;
  tiktokOpen: boolean;
  setTiktokOpen: Dispatch<SetStateAction<boolean>>;
  youtubeOpen: boolean;
  setYoutubeOpen: Dispatch<SetStateAction<boolean>>;
  uploadProgressToastOpen: boolean;
  setUploadProgressToastOpen: Dispatch<SetStateAction<boolean>>;
  uploadProgress: number;
  setUploadProgress: Dispatch<SetStateAction<number>>;
  sortValue: number;
  setSortValue: Dispatch<SetStateAction<number>>;
  projectSettingsOpen: boolean;
  setProjectSettingsOpen: Dispatch<SetStateAction<boolean>>;
  deleteProjectOpen: boolean;
  setDeleteProjectOpen: Dispatch<SetStateAction<boolean>>;
  refetchData: boolean;
  setRefreshData: Dispatch<SetStateAction<boolean>>;
  createFolderOpen: boolean;
  setCreateFolderOpen: Dispatch<SetStateAction<boolean>>;
  createPrivateFolderOpen: boolean;
  setCreatePrivateFolderOpen: Dispatch<SetStateAction<boolean>>;
}

export function MediaMenu({
  projectDetails,
  workspaceId,
  mediaId,
  pathname,
  search,
  setSearch,
  isOpen,
  setIsOpen,
  isNewMediaOpen,
  setIsNewMediaOpen,
  userData,
  uploadMediaOpen,
  setUploadMediaOpen,
  tiktokOpen,
  setTiktokOpen,
  youtubeOpen,
  setYoutubeOpen,
  uploadProgressToastOpen,
  setUploadProgressToastOpen,
  uploadProgress,
  setUploadProgress,
  sortValue,
  setSortValue,
  projectSettingsOpen,
  setProjectSettingsOpen,
  deleteProjectOpen,
  setDeleteProjectOpen,
  refetchData,
  setRefreshData,
  createFolderOpen,
  setCreateFolderOpen,
  createPrivateFolderOpen,
  setCreatePrivateFolderOpen,
}: MediaMenuProps) {
  return <>
    <header className="flex flex-col space-y-4 md:space-y-0 md:flex-row mt-6 md:justify-between md:items-between px-3 md:px-12 lg:px-4 xl:px-32 2xl:px-44">
      <h1 className="text-3xl silka-semibold">
        {String(projectDetails.name).length > 42
          ? String(projectDetails.name).slice(0, 42) + '...'
          : String(projectDetails.name)}
      </h1>
      <div className="flex flex-row space-x-5">
        <div>
          <DialogPrimitive.Root
            open={isOpen}
            onOpenChange={() => {
              if (isOpen) {
                setIsOpen(false);
                setTiktokOpen(false);
                setYoutubeOpen(false);
              } else {
                setUploadMediaOpen(true);
                setIsOpen(true);
              }
            }}
          >
            <DialogPrimitive.Trigger asChild>
              <button className="hover:opacity-90 py-1 md:py-1.5 px-4 md:px-5 my-auto h-fit bg-[#FF623D] border border-[#FF4317] rounded text-white silka-medium text-xs">
                Upload Media
              </button>
            </DialogPrimitive.Trigger>
            <UploadMedia
              workspaceId={String(workspaceId)}
              mediaId={String(mediaId)}
              userId={userData.id}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              uploadMediaOpen={uploadMediaOpen}
              setUploadMediaOpen={setUploadMediaOpen}
              tiktokOpen={tiktokOpen}
              setTiktokOpen={setTiktokOpen}
              youtubeOpen={youtubeOpen}
              setYoutubeOpen={setYoutubeOpen}
              uploadProgressToast={uploadProgressToastOpen}
              setUploadProgressToast={setUploadProgressToastOpen}
              uploadProgress={uploadProgress}
              setUploadProgress={setUploadProgress}
              setRefreshData={setRefreshData}
            />
          </DialogPrimitive.Root>
        </div>
        <div className="hidden">
          <DropdownMenuPrimitive.Root>
            <DropdownMenuPrimitive.Trigger asChild>
              <button className="my-auto border border-black bg-[#2B2B2B] rounded py-1 md:py-1.5 h-fit text-white silka-medium text-xs px-4 md:px-5">
                New
              </button>
            </DropdownMenuPrimitive.Trigger>
            <NewMediaDropdown
              workspaceId={workspaceId}
              mediaId={mediaId}
              createFolderOpen={createFolderOpen}
              setCreateFolderOpen={setCreateFolderOpen}
              createPrivateFolderOpen={createPrivateFolderOpen}
              setCreatePrivateFolderOpen={
                setCreatePrivateFolderOpen
              }
            />
          </DropdownMenuPrimitive.Root>
        </div>
      </div>
    </header>
    <div className="sm:px-1 md:px-6 lg:px-1 xl:px-28 2xl:px-44 mt-6 flex flex-row justify-between items-between">
      <div className="flex flex-row space-x-2">
        <Link
          href={'/' + workspaceId + '/' + mediaId}
          className={
            'hover:bg-gray-100 rounded py-1 px-3 text-xs md:text-sm ' +
            (pathname == '/[workspaceId]/[mediaId]'
              ? 'silka-semibold underline underline-offset-[21px] z-10 decoration-2 decoration-[#FF623D] text-[#353535]'
              : 'text-[#848484] silka-medium')
          }>
          
            Media
          
        </Link>
        <Link
          href={'/' + workspaceId + '/' + mediaId + '/public'}
          className={
            'hover:bg-gray-100 rounded py-1 px-3 text-xs md:text-sm ' +
            (pathname == '/[workspaceId]/[mediaId]/public'
              ? 'silka-semibold underline underline-offset-[21px] z-10 decoration-2 decoration-[#FF623D] text-[#353535]'
              : 'text-[#848484] silka-medium')
          }>
          
            Public
          
        </Link>
      </div>
      <div className="hidden md:flex flex-row space-x-8">
        <div className="flex flex-row space-x-3">
          <svg
            width="14"
            height="14"
            viewBox="0 0 11 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="my-auto"
          >
            <path
              d="M4.08528 8.16453C4.99879 8.16544 5.886 7.85812 6.60335 7.2926L9.31075 10L10.0031 9.3077L7.29565 6.6003C8.06074 5.6238 8.34049 4.35251 8.05561 3.14519C7.77085 1.93781 6.95256 0.925423 5.83173 0.393846C4.7109 -0.137731 3.40922 -0.130908 2.2941 0.412526C1.17898 0.955971 0.371383 1.97687 0.0993836 3.18711C-0.172619 4.39746 0.120456 5.66578 0.895787 6.63405C1.67114 7.60235 2.84481 8.16551 4.08525 8.16457L4.08528 8.16453ZM4.08528 0.979631C4.90813 0.979631 5.69736 1.30654 6.27918 1.88836C6.861 2.47018 7.18791 3.25932 7.18791 4.08214C7.18791 4.90496 6.861 5.69422 6.27918 6.27604C5.69736 6.85786 4.9081 7.18477 4.08528 7.18477C3.26246 7.18477 2.47332 6.85786 1.8915 6.27604C1.30968 5.69422 0.98277 4.90496 0.98277 4.08214C0.98277 3.25932 1.30968 2.47018 1.8915 1.88836C2.47332 1.30654 3.26246 0.979631 4.08528 0.979631Z"
              fill="#888888"
            />
          </svg>
          <input
            type="text"
            placeholder="Search"
            className="w-24 silka-regular text-xs px-0 py-0 border-0 focus:ring-0"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <StorageViewer
          workspaceId={workspaceId}
          refetchData={refetchData}
          setRefetchData={setRefreshData}
          folderId={mediaId}
        />
        <DropdownMenuPrimitive.Root>
          <DropdownMenuPrimitive.Trigger>
            <button className="flex flex-row space-x-2 my-auto">
              <p className="silka-medium text-[#5E5E5E] text-sm w-28">
                {sortValue == 0
                  ? 'Date Uploaded'
                  : sortValue == 1
                  ? 'Uploader'
                  : sortValue == 2
                  ? 'Size'
                  : sortValue == 3
                  ? 'Type'
                  : ''}
              </p>
              <svg
                width="10"
                height="9"
                viewBox="0 0 10 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="my-auto"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.5575 6.6925L0.807495 2.9425L1.6925 2.0575L5 5.36625L8.3075 2.0575L9.1925 2.9425L5.4425 6.6925L5 7.13375L4.5575 6.6925Z"
                  fill="#5B5B5B"
                />
              </svg>
            </button>
          </DropdownMenuPrimitive.Trigger>
          <SortDropdownMenu
            sortValue={sortValue}
            setSortValue={setSortValue}
          />
        </DropdownMenuPrimitive.Root>
        <DropdownMenuPrimitive.Root>
          <DropdownMenuPrimitive.Trigger>
            <svg
              width="16"
              height="4"
              viewBox="0 0 16 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="my-auto"
            >
              <path
                d="M1.6067 0H2.3933C3.28065 0 4 0.887352 4 1.6067V2.3933C4 3.28065 3.28065 4 2.3933 4H1.6067C0.719352 4 0 3.11265 0 2.3933V1.6067C0 0.719352 0.719352 0 1.6067 0Z"
                fill="#5B5B5B"
              />
              <path
                d="M7.6067 0H8.3933C9.28065 0 10 0.887352 10 1.6067V2.3933C10 3.28065 9.28065 4 8.3933 4H7.6067C6.71935 4 6 3.11265 6 2.3933V1.6067C6 0.719352 6.71935 0 7.6067 0Z"
                fill="#5B5B5B"
              />
              <path
                d="M13.6067 0H14.3933C15.2806 0 16 0.887352 16 1.6067V2.3933C16 3.28065 15.2806 4 14.3933 4H13.6067C12.7194 4 12 3.11265 12 2.3933V1.6067C12 0.719352 12.7194 0 13.6067 0Z"
                fill="#5B5B5B"
              />
            </svg>
          </DropdownMenuPrimitive.Trigger>
          <OptionsDropdownMenu
            projectSettingsOpen={projectSettingsOpen}
            setProjectSettingsOpen={setProjectSettingsOpen}
            deleteProjectOpen={deleteProjectOpen}
            setDeleteProjectOpen={setDeleteProjectOpen}
          />
        </DropdownMenuPrimitive.Root>
      </div>
    </div>
    <div className="w-full xl:px-24 2xl:px-36">
      <hr className="w-full mt-3" />
    </div>
  </>;
}
