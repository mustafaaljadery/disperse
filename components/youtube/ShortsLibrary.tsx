import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../utils/apiUrl';

function formatSeconds(seconds: any) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds - hours * 3600) / 60);
  const secondsLeft = Math.floor(
    seconds - hours * 3600 - minutes * 60
  );

  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = secondsLeft.toString().padStart(2, '0');

  // if there isn't hours dont return it
  if (hours === 0) {
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

interface Props {
  workspaceId: string;
  shortsMedia: any;
  setShortsMedia: Dispatch<SetStateAction<any>>;
}

interface ProjectComponentProps {
  value: any;
  selectedProject: any;
  setSelectedProject: Dispatch<SetStateAction<any>>;
}

interface MediaProps {
  isLoading: boolean;
  mediaData: any;
  shortsMedia: any;
  setShortsMedia: Dispatch<SetStateAction<any>>;
}

async function getProjects(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}workspace/read/allprojects`,
      {
        params: {
          workspaceName: workspaceId,
        },
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
      `${apiUrl()}youtube/read/projectmedia`,
      {
        params: {
          folderId: folderId,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

function Media({
  isLoading,
  mediaData,
  shortsMedia,
  setShortsMedia,
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
          {mediaData
            .sort((a: any, b: any) => {
              return (
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
              );
            })
            .map((value: any, index: number) => {
              const seconds: any = formatSeconds(value?.duration);
              return (
                <div className="w-1/2 xl:w-1/3 p-2" key={index}>
                  <button
                    onClick={(e) => {
                      console.log('value', value);
                      setShortsMedia(value);
                    }}
                    className="flex hover:opacity-80 flex-col w-full rounded-lg bg-gray-200"
                  >
                    <div className="relative rounded-lg flex flex-col w-full h-full">
                      <img
                        className="w-full rounded-t-lg max-h-20"
                        src={value.thumbnail}
                      />
                      {value?.format.includes('video') && (
                        <div className="absolute flex flex-col justify-end items-end h-full p-1 w-full">
                          <p className="text-white px-2 py-1 text-[9px] silka-medium bg-gray-900 rounded w-fit h-fit">
                            {seconds}
                          </p>
                        </div>
                      )}
                    </div>
                    <p className="text-[10px] 2xl:text-[11px] rounded-b-lg py-2 px-1.5 w-full bg-black text-white silka-medium">
                      {value.name.length > 22
                        ? value.name.slice(0, 20) + '...'
                        : value.name}
                    </p>
                  </button>
                </div>
              );
            })}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center border border-dashed h-36 rounded-lg">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.394 15.759C2.394 15.759 9.948 20.005 11.484 20.868C11.649 20.961 11.817 21 11.976 21C12.154 21 12.32 20.951 12.46 20.873C14.006 20.01 21.615 15.76 21.615 15.76C21.861 15.622 22 15.367 22 15.104C22 14.538 21.386 14.17 20.884 14.45C20.884 14.45 13.832 18.408 12.345 19.22C12.134 19.335 11.901 19.381 11.623 19.226C9.974 18.298 3.129 14.451 3.129 14.451C2.627 14.169 2.012 14.536 2.012 15.104C2.012 15.366 2.149 15.621 2.394 15.759ZM2.394 12.646C2.394 12.646 9.948 16.892 11.484 17.755C11.649 17.848 11.817 17.887 11.976 17.887C12.154 17.887 12.32 17.838 12.46 17.76C14.006 16.897 21.615 12.647 21.615 12.647C21.861 12.509 22 12.254 22 11.991C22 11.425 21.386 11.057 20.884 11.337C20.884 11.337 13.832 15.295 12.345 16.107C12.134 16.222 11.901 16.268 11.623 16.113C9.974 15.185 3.129 11.338 3.129 11.338C2.627 11.056 2.012 11.423 2.012 11.991C2.012 12.253 2.149 12.508 2.394 12.646ZM12.665 3.191C12.419 3.063 12.194 3 11.973 3C11.75 3 11.53 3.065 11.298 3.191L2.414 8.196C2.138 8.379 2 8.64 2 8.894C2 9.15 2.139 9.399 2.414 9.558L11.298 14.564C11.519 14.697 11.745 14.767 11.976 14.767C12.199 14.767 12.428 14.702 12.665 14.564L21.549 9.558C21.844 9.392 22 9.137 22 8.878C22 8.628 21.855 8.375 21.549 8.196L12.665 3.191ZM4.261 8.877L11.982 4.528L19.702 8.877L11.982 13.227L4.261 8.877Z"
              fill="#FF0000"
            />
          </svg>
          <p className="mt-2 silka-semibold text-xs text-[#363636]">
            No Media Found
          </p>
          <span className="mt-1.5 text-center silka-regular text-[11px] text-gray-400">
            Upload media to this project to see it here!
          </span>
        </div>
      )}
    </div>
  );
}

function ProjectComponent({
  value,
  selectedProject,
  setSelectedProject,
}: ProjectComponentProps) {
  return (
    <button
      onClick={() => {
        setSelectedProject(value.id);
      }}
      className={
        'py-1.5 flex flex-col justify-start items-start w-full hover:bg-gray-100 rounded px-2 xl:px-4 ' +
        (selectedProject == value.id ? 'bg-gray-50' : '')
      }
    >
      <p className="text-xs text-gray-900 xl:text-sm text-start silka-medium">
        {value?.name.length > 22
          ? value.name.slice(0, 20) + '...'
          : value?.name}
      </p>
    </button>
  );
}

export function YoutubeShortsLibrary({
  workspaceId,
  shortsMedia,
  setShortsMedia,
}: Props) {
  const [isProjectCompontentLoading, setIsProjectComponentLoading] =
    useState(true);
  const [isMediaLoading, setIsMediaLoading] = useState(true);
  const [projectsData, setProjectsData] = useState<any>(null);
  const [mediaData, setMediaData] = useState<any>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  axiosRetry(axios, { retries: 3 });

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
      <div className="w-1/4 flex flex-col space-y-2.5">
        <div className="w-full h-6 bg-gray-200 rounded animate-pulse" />
        <div className="w-full h-6 bg-gray-200 rounded animate-pulse" />
        <div className="w-full h-6 bg-gray-200 rounded animate-pulse" />
      </div>
    );
  }
  return (
    <>
      <div className="mt-4 py-3 flex flex-row space-x-2.5 rounded-lg px-4 bg-[#F6E9E9]">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="my-auto"
        >
          <path
            d="M12.0019 2.00586C17.5199 2.00586 21.9999 6.48586 21.9999 12.0029C21.9999 17.5209 17.5199 22.0009 12.0019 22.0009C6.48488 22.0009 2.00488 17.5209 2.00488 12.0029C2.00488 6.48586 6.48488 2.00586 12.0019 2.00586ZM12.0019 3.50586C7.31188 3.50586 3.50488 7.31286 3.50488 12.0029C3.50488 16.6929 7.31188 20.5009 12.0019 20.5009C16.6919 20.5009 20.4999 16.6929 20.4999 12.0029C20.4999 7.31286 16.6919 3.50586 12.0019 3.50586ZM12.0019 10.0059C11.5879 10.0059 11.2519 10.3419 11.2519 10.7559V16.2559C11.2519 16.6699 11.5879 17.0059 12.0019 17.0059C12.4159 17.0059 12.7519 16.6699 12.7519 16.2559V10.7559C12.7519 10.3419 12.4159 10.0059 12.0019 10.0059ZM11.9999 7.00586C12.5519 7.00586 12.9999 7.45386 12.9999 8.00586C12.9999 8.55786 12.5519 9.00586 11.9999 9.00586C11.4479 9.00586 10.9999 8.55786 10.9999 8.00586C10.9999 7.45386 11.4479 7.00586 11.9999 7.00586Z"
            fill="#FF0000"
          />
        </svg>
        <p className="silka-semibold my-auto text-[#FF0000] text-xs">
          Youtube shorts must be 60 seconds or less. All longer videos
          will be cropped by Disperse.
        </p>
      </div>
      <div className="mt-7 w-full flex flex-row space-x-7 flex-wrap">
        {projectsData.length == 0 ? (
          <div className="flex flex-col justify-center mt-4 items-center w-full">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9L13 2Z"
                fill="#FF0000"
                fill-opacity="0.5"
                stroke="#FF0000"
              />
              <path
                d="M13 2V9H20"
                fill="#FF0000"
                fill-opacity="0.5"
              />
              <path d="M13 2V9H20" stroke="#FF0000" />
            </svg>
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
                shortsMedia={shortsMedia}
                setShortsMedia={setShortsMedia}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
