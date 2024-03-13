import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../../../utils/apiUrl';

interface RightGiveawayProps {
  workspaceId: string;
  refetchGiveawayDrafts: boolean;
  setRefetchGiveawayDrafts: Dispatch<SetStateAction<boolean>>;
  selectedGiveaway: any;
  setSelectedGiveaway: Dispatch<SetStateAction<any>>;
  giveawayMedia: any;
  setGiveawayMedia: Dispatch<SetStateAction<any>>;
  rightGiveawaySelected: string;
  setRightGiveawaySelected: Dispatch<SetStateAction<string>>;
}

interface DraftsProps {
  isLoading: boolean;
  draftsData: any;
  selectedGiveaway: any;
  setSelectedGiveaway: Dispatch<SetStateAction<any>>;
  setRefetchGiveawayDrafts: Dispatch<SetStateAction<boolean>>;
}

interface DraftsProps {}

interface ProjectCompontentProps {
  value: any;
  selectedProject: any;
  setSelectedProject: Dispatch<SetStateAction<any>>;
}

interface MediaProps {
  isLoading: boolean;
  mediaData: any;
  giveawayMedia: any;
  setGiveawayMedia: Dispatch<SetStateAction<any>>;
}

interface LibraryProps {
  workspaceId: string;
  giveawayMedia: any;
  setGiveawayMedia: Dispatch<SetStateAction<any>>;
}

async function getProjects(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}workspace/read/allprojects`,
      {
        params: { workspaceName: workspaceId },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function getProjectContent(folderId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}twitter/read/projectmedia`,
      {
        params: { folderId: folderId },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

function Draft() {
  return <div></div>;
}

function Drafts({
  isLoading,
  draftsData,
  selectedGiveaway,
  setSelectedGiveaway,
  setRefetchGiveawayDrafts,
}: DraftsProps) {
  if (isLoading) {
    return (
      <div className="h-full flex flex-col mt-4 space-y-1.5">
        <div className="flex flex-row space-x-3">
          <div className="w-1/4 h-3 bg-gray-200 rounded animate-pulse" />
          <div className="w-1/4 h-3 bg-gray-200 rounded animate-pulse" />
          <div className="w-1/4 h-3 bg-gray-200 rounded animate-pulse" />
          <div className="w-1/4 h-3 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="flex flex-row space-x-3">
          <div className="w-1/3 h-3 bg-gray-200 rounded animate-pulse" />
          <div className="w-1/3 h-3 bg-gray-200 rounded animate-pulse" />
          <div className="w-1/3 h-3 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="flex flex-row space-x-3">
          <div className="w-1/2 h-3 bg-gray-200 rounded animate-pulse" />
          <div className="w-1/2 h-3 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-row mt-4 flex-wrap">
      {draftsData?.length > 0 ? (
        <></>
      ) : (
        <div className="flex flex-col justify-center mt-4 items-center w-full">
          <div className="p-2.5 rounded-full bg-[#F6E7E3]">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.3332 0H1.6665V20H18.3332V5L13.3332 0ZM13.3332 2.5L15.8332 5H13.3332V2.5ZM3.33317 18.3333V1.66667H11.6665V6.66667H16.6665V18.3333H3.33317Z"
                fill="#FF623D"
              />
            </svg>
          </div>
          <p className="text-sm silka-medium mt-5 text-gray-900">
            No Giveaway Drafts Found
          </p>
          <span className="text-xs silka-regular mt-1.5 text-gray-500">
            Begin typing to create a draft Giveaway
          </span>
        </div>
      )}
    </div>
  );
}

function Media({
  isLoading,
  mediaData,
  giveawayMedia,
  setGiveawayMedia,
}: MediaProps) {
  if (isLoading) {
    return (
      <>
        <div className="flex flex-row space-x-3">
          <div className="w-1/4 h-3 bg-gray-200 rounded animate-pulse" />
          <div className="w-1/4 h-3 bg-gray-200 rounded animate-pulse" />
          <div className="w-1/4 h-3 bg-gray-200 rounded animate-pulse" />
          <div className="w-1/4 h-3 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="flex flex-row space-x-3">
          <div className="w-1/3 h-3 bg-gray-200 rounded animate-pulse" />
          <div className="w-1/3 h-3 bg-gray-200 rounded animate-pulse" />
          <div className="w-1/3 h-3 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="flex flex-row space-x-3">
          <div className="w-1/2 h-3 bg-gray-200 rounded animate-pulse" />
          <div className="w-1/2 h-3 bg-gray-200 rounded animate-pulse" />
        </div>
      </>
    );
  }

  return (
    <div>
      {mediaData.length > 0 ? (
        <div className="flex flex-row flex-wrap">
          {mediaData.map((value: any, index: number) => {
            return (
              <div className="w-1/3 p-2" key={index}>
                <button
                  onClick={() => {
                    setGiveawayMedia(value);
                  }}
                  className="flex hover:opacity-80 flex-col w-full rounded-lg bg-gray-200"
                >
                  <img
                    className="w-full rounded-t-lg max-h-20"
                    src={value.google_url}
                  />
                  <p className="text-[11px] rounded-b-lg py-2 px-1.5 w-full bg-gray-900 text-white silka-medium">
                    {value.name.length > 24
                      ? value.name.slice(0, 24) + '...'
                      : value.name}
                  </p>
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

function ProjectComponent({
  value,
  selectedProject,
  setSelectedProject,
}: ProjectCompontentProps) {
  return (
    <button
      onClick={() => {
        setSelectedProject(value.id);
      }}
      className={
        'py-1.5 flex flex-col justify-start items-start w-full hover:bg-gray-100 rounded px-4 ' +
        (selectedProject == value.id ? 'bg-gray-50' : '')
      }
    >
      <p className="text-sm silka-medium">{value.name}</p>
    </button>
  );
}

function Library({
  workspaceId,
  giveawayMedia,
  setGiveawayMedia,
}: LibraryProps) {
  const [isProjectCompontentLoading, setIsProjectComponentLoading] =
    useState(true);
  const [isMediaLoading, setIsMediaLoading] = useState(true);
  const [projectsData, setProjectsData] = useState<any>(null);
  const [mediaData, setMediaData] = useState<any>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  useEffect(() => {
    getProjects(workspaceId).then((value) => {
      setProjectsData(value);
      if (value.length > 0) {
        setSelectedProject(value[0].id);
      }
      setIsProjectComponentLoading(false);
    });
  }, []);

  useEffect(() => {
    if (selectedProject) {
      setIsMediaLoading(true);
      getProjectContent(selectedProject).then((value) => {
        setMediaData(value);
        setIsMediaLoading(false);
      });
    }
  }, [selectedProject]);

  if (isProjectCompontentLoading) {
    return (
      <div className="mt-6 w-1/4 flex flex-col space-y-2.5">
        <div className="w-full h-6 bg-gray-200 rounded animate-pulse" />
        <div className="w-full h-6 bg-gray-200 rounded animate-pulse" />
        <div className="w-full h-6 bg-gray-200 rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div className="mt-6 w-full flex flex-row space-x-7 flex-wrap">
      {projectsData.length == 0 ? (
        <div className="flex flex-col justify-center mt-4 items-center w-full">
          <div className="p-2 bg-[#E9F0F5] rounded-full">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9L13 2Z"
                fill="#1D9BF0"
                fill-opacity="0.5"
                stroke="#1D9BF0"
              />
              <path
                d="M13 2V9H20"
                fill="#1D9BF0"
                fill-opacity="0.5"
              />
              <path d="M13 2V9H20" stroke="#1D9BF0" />
            </svg>
          </div>
          <h3 className="text-sm silka-semibold text-gray-900 mt-3">
            No Media Found
          </h3>
          <p className="text-xs silka-regular text-gray-500 mt-1">
            Create a new project to begin uploading media.
          </p>
        </div>
      ) : (
        <div className="w-full flex flex-row space-x-7">
          <div className="flex flex-col space-y-2 w-1/4">
            {projectsData.map((value: any, index: number) => {
              return (
                <ProjectComponent
                  key={index}
                  value={value}
                  selectedProject={selectedProject}
                  setSelectedProject={setSelectedProject}
                />
              );
            })}
          </div>
          <div className="flex flex-col space-y-1.5 w-3/4">
            <Media
              isLoading={isMediaLoading}
              mediaData={mediaData}
              giveawayMedia={giveawayMedia}
              setGiveawayMedia={setGiveawayMedia}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export function GiveawayRight({
  workspaceId,
  refetchGiveawayDrafts,
  setRefetchGiveawayDrafts,
  selectedGiveaway,
  setSelectedGiveaway,
  giveawayMedia,
  setGiveawayMedia,
  rightGiveawaySelected,
  setRightGiveawaySelected,
}: RightGiveawayProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [draftsData, setDraftsData] = useState<any>(null);

  useEffect(() => {}, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-between">
        <button
          onClick={() => {
            setRightGiveawaySelected('Drafts');
          }}
          className={
            'text-xs px-4 py-1 silka-regular text-gray-800 rounded hover:bg-gray-100 ' +
            (rightGiveawaySelected == 'Drafts' ? 'bg-gray-50' : '')
          }
        >
          Drafts
        </button>
        <button
          onClick={() => {
            setRightGiveawaySelected('Library');
          }}
          className={
            'text-xs px-4 py-1 silka-regular text-gray-800 rounded hover:bg-gray-100 ' +
            (rightGiveawaySelected == 'Library' ? 'bg-gray-50' : '')
          }
        >
          Library
        </button>
      </div>
      {rightGiveawaySelected == 'Drafts' ? (
        <Drafts
          isLoading={isLoading}
          draftsData={draftsData}
          selectedGiveaway={selectedGiveaway}
          setSelectedGiveaway={setSelectedGiveaway}
          setRefetchGiveawayDrafts={setRefetchGiveawayDrafts}
        />
      ) : (
        <Library
          workspaceId={workspaceId}
          giveawayMedia={giveawayMedia}
          setGiveawayMedia={setGiveawayMedia}
        />
      )}
    </div>
  );
}
