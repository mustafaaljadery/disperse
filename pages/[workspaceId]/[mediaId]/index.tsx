import DashboardLayout from '../../../layouts/Dashboard';
import { useRouter } from 'next/router';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { LoadingScreen } from '../../../components/Loading';
import cx from 'classnames';
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import { FileRename } from '../../../components/file/Rename';
import { FileComponent } from '../../../components/media/FileComponent';
import { FolderComponent } from '../../../components/media/FolderComponent';
import toast from 'react-hot-toast';
import { MediaMenu } from '../../../components/media/MediaMenu';
import { DeleteFile } from '../../../components/file/Delete';
import { MakePrivateToast } from '../../../components/media/MakePrivateToast';
import { DeleteProject } from '../../../components/media/DeleteProject';
import { ProjectSettings } from '../../../components/media/ProjectSettings';
import { apiUrl } from '../../../utils/apiUrl';
import { CreateNewPrivateFolderDialog } from '../../../components/media/dialog/CreateNewPrivateFolderDialog';
import { CreateNewFolderDialog } from '../../../components/media/dialog/CreateNewFolderDialog';
import { CompositionRenameDialog } from '../../../components/media/dialog/CompositionRenameDialog';
import { CompositionDeleteDialog } from '../../../components/media/dialog/CompositionDeleteDialog';
import { PageHead } from '../../../layouts/PageHead';

async function getProjectContent(
  workspaceId: String,
  mediaId: string
) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}file/read/getfolderfiles`,
      { params: { workspaceName: workspaceId, projectName: mediaId } }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
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
  const [makePrivateOpen, setMakePrivateOpen] = useState(false);
  const [fileRenameToastOpen, setFileRenameToastOpen] =
    useState(false);

  // Upload Media State
  const [uploadMediaOpen, setUploadMediaOpen] = useState(true);
  const [tiktokOpen, setTiktokOpen] = useState(false);
  const [youtubeOpen, setYoutubeOpen] = useState(false);

  /*
  Dialog Actions
  */
  const [fileId, setFileId] = useState('');
  // Rename
  const [renameOpen, setRenameOpen] = useState(false);
  const [renameCurrentFileName, setRenameCurrentFileName] =
    useState('');
  //
  const [deleteFileOpen, setDeleteFileOpen] = useState(false);

  // Composition Stuff
  const [currentCompositionId, setCurrentCompositionId] =
    useState('');
  const [currentCompositionName, setCurrentCompositionName] =
    useState('');
  const [renameCompositionOpen, setRenameCompositionOpen] =
    useState(false);
  const [deleteCompositionOpen, setDeleteCompositionOpen] =
    useState(false);

  const [compositionRefetch, setCompositionRefetch] = useState(false);

  useEffect(() => {
    if (router.isReady && status == 'authenticated') {
      setPathname(router.pathname);
      setWorkspaceId(String(router.query.workspaceId));
      setMediaId(String(router.query.mediaId));
      Promise.all([
        getProjectDetails(String(router.query.mediaId)),
        getProjectContent(
          String(router.query.workspaceId),
          String(router.query.mediaId)
        ),
      ]).then((responses) => {
        const [details, content] = responses;
        setUserData(session?.user);
        setProjectDetails(details);
        setData(content);
        setIsLoading(false);
      });
      setRefetchData(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, status]);

  useEffect(() => {
    if (refetchData) {
      setRefetchData(false);
      getProjectContent(
        String(router.query.workspaceId),
        String(router.query.mediaId)
      ).then((value) => {
        setData(value);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetchData]);

  useEffect(() => {
    if (uploadProgressToastOpen) {
      toast.remove();
      toast.loading('Uploading File...', {
        className: 'text-sm silka-medium text-gray-900',
        duration: 400000000,
      });
    }
    if (uploadProgress == 100) {
      toast.remove();
      toast.success('Successfully Uploaded File!', {
        className: 'text-sm silka-medium text-gray-900',
      });
      setTimeout(() => {
        setUploadProgressToastOpen(false);
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadProgressToastOpen, uploadProgress]);

  useEffect(() => {
    if (makePrivateOpen) {
      toast.custom(<MakePrivateToast />);
      setTimeout(() => {
        setMakePrivateOpen(false);
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [makePrivateOpen]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <PageHead title="Media · Disperse">
      <DashboardLayout>
        <ContextMenuPrimitive.Root>
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
            <ContextMenuPrimitive.Trigger>
              <main className="px-1 md:px-6 lg:px-1 xl:px-20 2xl:px-44 pt-8 mb-10 flex flex-row flex-wrap">
                {data.length == 0 ? (
                  <div className="py-16 h-[70vh] w-full flex flex-col justify-center items-center">
                    <div className="p-3.5 bg-[#F6EEEC] rounded-full">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9L13 2Z"
                          fill="#FF623D"
                          fill-opacity="0.5"
                          stroke="#FF623D"
                        />
                        <path
                          d="M13 2V9H20"
                          fill="#FF623D"
                          fill-opacity="0.5"
                        />
                        <path d="M13 2V9H20" stroke="#FF623D" />
                      </svg>
                    </div>
                    <h3 className="mt-5 text-lg silka-medium">
                      No files in this Project!
                    </h3>
                    <p className="mt-1.5 text-xs silka-regular text-gray-500">
                      Drag and drop to upload files.
                    </p>
                    <button
                      onClick={() => {
                        setIsOpen(true);
                      }}
                      className="flex flex-col text-xs silka-medium text-white bg-[#FF623D] rounded mt-5 px-6 hover:opacity-90 py-1"
                    >
                      Upload Media
                    </button>
                  </div>
                ) : (
                  <>
                    {data.filter((value: any) => {
                      return (
                        value.name.includes(search) ||
                        value.uploader.includes(search)
                      );
                    }).length > 0 ? (
                      <div className="flex flex-col w-full">
                        {/*
                        <div className="flex flex-row space-x-5">
                          <CreateComposition
                            folderId={mediaId}
                            userId={String(session?.user?.id)}
                          />
                        </div>
                        <p className="text-xs mt-7 silka-regular text-gray-400 ">
                          Compositions
                        </p>
                        {compositionsLoading ? (
                          <div className="flex flex-col space-y-3">
                            <div className="h-6 w-full bg-gray-100 animate-pulse rounded" />
                            <div className="h-6 w-[90%] bg-gray-100 animate-pulse rounded" />
                            <div className="h-6 w-4/59 bg-gray-100 animate-pulse rounded" />
                          </div>
                        ) : (
                          <>
                            {compositions.length > 0 ? (
                              <div className="flex flex-row flex-wrap mt-2">
                                {compositions.map(
                                  (value: any, index: number) => {
                                    return (
                                      <CompositionComponent
                                        value={value}
                                        key={index}
                                        renameCompositionOpen={
                                          renameCompositionOpen
                                        }
                                        setRenameCompositionOpen={
                                          setRenameCompositionOpen
                                        }
                                        deleteCompositionOpen={
                                          deleteCompositionOpen
                                        }
                                        setDeleteCompositionOpen={
                                          setDeleteCompositionOpen
                                        }
                                        setCurrentCompositionId={
                                          setCurrentCompositionId
                                        }
                                        setCurrentCompositionName={
                                          setCurrentCompositionName
                                        }
                                      />
                                    );
                                  }
                                )}
                              </div>
                            ) : (
                              <div className="mt-3 rounded-lg space-y-1 h-[120px] w-1/5 bg-[#F7F7F7] flex flex-col justify-center items-center">
                                <h3 className="text-xs silka-medium text-gray-900">
                                  No Compositions Available
                                </h3>
                                <p className="text-[10px] px-6 text-center silka-regular text-gray-400">
                                  Create a composition to begin
                                  editing files.
                                </p>
                              </div>
                            )}
                          </>
                        )}
                        <div className="mt-2 flex flex-row flex-wrap"></div>
                        <p className="text-xs silka-regular text-gray-400">
                          Files
                        </p>
                            */}
                        <div className="flex flex-row flex-wrap md:mt-2">
                          {data
                            ?.filter((value: any) => {
                              return (
                                value.name.includes(search) ||
                                value.uploader.includes(search)
                              );
                            })
                            ?.sort((a: any, b: any) => {
                              if (sortValue == 0) {
                                return new Date(a.uploadDate) <
                                  new Date(b.uploadDate)
                                  ? 1
                                  : -1;
                              } else if (sortValue == 1) {
                                return a.uploader > b.uploader
                                  ? 1
                                  : -1;
                              } else if (sortValue == 2) {
                                return (
                                  parseInt(b.size) - parseInt(a.size)
                                );
                              } else {
                                return a.format
                                  .split('/')
                                  .slice(-1)[0] >
                                  b.format.split('/').slice(-1)[0]
                                  ? 1
                                  : -1;
                              }
                            })
                            ?.map((value: any, index: number) => {
                              if (value.type == 'folder') {
                                return (
                                  <FolderComponent
                                    key={index}
                                    workspaceName={String(
                                      router.query.workspaceId
                                    )}
                                    value={value}
                                  />
                                );
                              } else {
                                return (
                                  <FileComponent
                                    key={index}
                                    setRenameCurrentFileName={
                                      setRenameCurrentFileName
                                    }
                                    files={data}
                                    setFiles={setData}
                                    workspaceId={workspaceId}
                                    pathname={pathname}
                                    setFileId={setFileId}
                                    renameOpen={renameOpen}
                                    setRenameOpen={setRenameOpen}
                                    deleteFileOpen={deleteFileOpen}
                                    setDeleteFileOpen={
                                      setDeleteFileOpen
                                    }
                                    setRefetchData={setRefetchData}
                                    setMakePrivateOpen={
                                      setMakePrivateOpen
                                    }
                                    value={value}
                                  />
                                );
                              }
                            })}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col justify-center mt-32 items-center w-full">
                        <div className="flex flex-col">
                          <div className="rounded-full bg-[#F6DFD9] w-fit p-3">
                            <svg
                              width="16"
                              height="18"
                              viewBox="0 0 14 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M13.5173 5.04539C13.5095 4.89718 13.4434 4.75813 13.3332 4.65871L8.03736 0.125358C7.93879 0.0463088 7.81689 0.00226134 7.6907 0H2.13334C0.949276 0 0 0.858701 0 1.91464V14.0854C0 15.152 0.962625 16 2.14669 16H11.3706C12.5547 16 13.5199 15.1413 13.5199 14.0854C13.5173 14.064 13.5227 5.0665 13.5173 5.04547L13.5173 5.04539ZM8.22385 1.69087L11.5519 4.53348H8.22385V1.69087ZM11.3705 14.9334H2.13316C1.53851 14.9334 1.06649 14.5521 1.06649 14.0855V1.91474C1.06649 1.44809 1.55186 1.06677 2.13316 1.06677H7.15718V5.06679C7.15718 5.20821 7.21337 5.34393 7.31337 5.44393C7.41337 5.54393 7.54909 5.60012 7.69052 5.60012H12.453V14.0856C12.453 14.5523 11.9651 14.9336 11.3704 14.9336L11.3705 14.9334Z"
                                fill="#FF623D"
                              />
                            </svg>
                          </div>
                          <p className="silka-medium mt-4">
                            No Results Found
                          </p>
                          <p className="mt-1.5 silka-regular w-44 text-sm text-gray-400">
                            Upload your files to see them on the
                            cloud.
                          </p>
                          <button
                            onClick={() => [setIsOpen(true)]}
                            className="mt-4 hover:opacity-80 px-4 py-1.5 text-xs silka-medium text-white rounded bg-[#FF623D]"
                          >
                            Upload Media
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}
                <DialogPrimitive.Root
                  open={renameOpen}
                  onOpenChange={setRenameOpen}
                >
                  <FileRename
                    isOpen={renameOpen}
                    fileId={fileId}
                    currentName={renameCurrentFileName}
                    setFileRefetch={setRefetchData}
                  />
                </DialogPrimitive.Root>
                <DialogPrimitive.Root
                  open={deleteFileOpen}
                  onOpenChange={() => {
                    setDeleteFileOpen(!deleteFileOpen);
                  }}
                >
                  <DeleteFile
                    isOpen={deleteFileOpen}
                    setIsOpen={setDeleteFileOpen}
                    fileId={fileId}
                    folderId={mediaId}
                    workspaceId={workspaceId}
                    setFileRefetch={setRefetchData}
                    files={data}
                    setFiles={setData}
                  />
                </DialogPrimitive.Root>
                <DialogPrimitive.Root
                  open={projectSettingsOpen}
                  onOpenChange={setProjectSettingsOpen}
                >
                  <ProjectSettings
                    isOpen={projectSettingsOpen}
                    workspaceId={workspaceId}
                    mediaId={mediaId}
                  />
                </DialogPrimitive.Root>
                <DialogPrimitive.Root
                  open={deleteProjectOpen}
                  onOpenChange={setDeleteProjectOpen}
                >
                  <DeleteProject
                    isOpen={deleteProjectOpen}
                    workspaceId={workspaceId}
                    folderId={mediaId}
                  />
                </DialogPrimitive.Root>
                <DialogPrimitive.Root
                  open={createFolderOpen}
                  onOpenChange={setCreateFolderOpen}
                >
                  <CreateNewFolderDialog
                    isOpen={createFolderOpen}
                    workspaceId={workspaceId}
                    mediaId={mediaId}
                  />
                </DialogPrimitive.Root>
                <DialogPrimitive.Root
                  open={createPrivateFolderOpen}
                  onOpenChange={setCreatePrivateFolderOpen}
                >
                  <CreateNewPrivateFolderDialog
                    isOpen={createPrivateFolderOpen}
                    workspaceId={workspaceId}
                    mediaId={mediaId}
                  />
                </DialogPrimitive.Root>
                <DialogPrimitive.Root
                  open={renameCompositionOpen}
                  onOpenChange={setRenameCompositionOpen}
                >
                  <CompositionRenameDialog
                    isOpen={renameCompositionOpen}
                    setCompositionRefetch={setCompositionRefetch}
                    compositionId={currentCompositionId}
                    currentCompositionName={currentCompositionName}
                  />
                </DialogPrimitive.Root>
                <DialogPrimitive.Root
                  open={deleteCompositionOpen}
                  onOpenChange={setDeleteCompositionOpen}
                >
                  <CompositionDeleteDialog
                    isOpen={deleteCompositionOpen}
                    setIsOpen={setDeleteCompositionOpen}
                    setCompositionRefetch={setCompositionRefetch}
                    compositionId={currentCompositionId}
                  />
                </DialogPrimitive.Root>
              </main>
            </ContextMenuPrimitive.Trigger>
          </>
          <ContextMenuPrimitive.Portal>
            <ContextMenuPrimitive.Content
              className={cx(
                ' radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
                'w-48 rounded-lg hidden py-1 shadow-md md:w-56',
                'bg-[#383838]'
              )}
            >
              <button className="px-3 w-full py-1 hover:bg-[#3D3D3D]">
                <ContextMenuPrimitive.Item className="flex py-0.5 flex-row space-x-3">
                  <span className="text-sm silka-medium text-white">
                    New Folder
                  </span>
                </ContextMenuPrimitive.Item>
              </button>
              <ContextMenuPrimitive.Separator className="my-1 h-px bg-[#616161]" />
              <button className="px-3 w-full py-1 hover:bg-[#3D3D3D]">
                <ContextMenuPrimitive.Item className="flex py-0.5 flex-row space-x-3">
                  <span className="text-sm silka-medium text-white">
                    Download All
                  </span>
                </ContextMenuPrimitive.Item>
              </button>
              <ContextMenuPrimitive.Separator className="my-1 h-px bg-[#616161]" />
              <DialogPrimitive.Root
                open={projectSettingsOpen}
                onOpenChange={setProjectSettingsOpen}
              >
                <DialogPrimitive.Trigger asChild>
                  <button className="px-3 w-full py-1 hover:bg-[#3D3D3D]">
                    <ContextMenuPrimitive.Item className="flex py-0.5 flex-row space-x-3">
                      <span className="text-sm silka-medium text-white">
                        Project Settings
                      </span>
                    </ContextMenuPrimitive.Item>
                  </button>
                </DialogPrimitive.Trigger>
              </DialogPrimitive.Root>
            </ContextMenuPrimitive.Content>
          </ContextMenuPrimitive.Portal>
        </ContextMenuPrimitive.Root>
      </DashboardLayout>
    </PageHead>
  );
}
