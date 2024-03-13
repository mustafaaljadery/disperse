import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
} from '@chakra-ui/react';
import { useState, useRef, useEffect } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import {
  CommentComponent,
  PlayerCommentsNoComments,
} from './Comments';
import { apiUrl } from '../../utils/apiUrl';
import { LoadingScreen } from '../Loading';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { PlayerActions } from './Actions';
import { PlayerFileInfo } from './FileInfo';

async function getFileInfo(fileId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(`${apiUrl()}file/read/file`, {
      params: { fileId: fileId },
    });
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

export function PlayerMobileOptions() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const ref: any = useRef();
  const btnRef: any = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const [fileInfo, setFileInfo] = useState<any>(null);
  const { data: session, status } = useSession();
  const [description, setDescription] = useState<any>(null);
  const [addDescription, setAddDescription] = useState(false);
  const [commentsData, setCommentsData] = useState<any>(null);
  const [commentText, setCommentText] = useState('');
  const [workspaceId, setWorkspaceId] = useState<any>(null);
  const [view, setView] = useState(1);

  const router = useRouter();

  axiosRetry(axios, { retries: 3 });

  async function updateComments() {
    try {
      const result = await axios.get(
        `${apiUrl()}file/read/comments`,
        {
          params: { fileId: router.query.fileId },
        }
      );
      setCommentsData(result.data);
      return result.data;
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (router.isReady && status == 'authenticated') {
      getFileInfo(String(router.query.fileId)).then((value) => {
        setFileInfo(value);
        setWorkspaceId(value.workspaceName);
        setCommentsData(value.comments);
        setDescription(value.description);
        setIsLoading(false);
      });
    }
  }, [router.isReady, status]);

  useEffect(() => {
    if (view == 2) {
      setInterval(async function () {
        await updateComments();
      }, 15000);
    }
  }, [view]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  async function handleAddDescription(e: any) {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${apiUrl()}file/update/description`,
        null,
        {
          params: {
            fileId: String(router.query.fileId),
            descriptionText: description,
          },
        }
      );
      setAddDescription(false);
      return result.data;
    } catch (e) {
      console.log(e);
    }
  }

  async function handleAddComment() {
    try {
      const result = await axios.post(
        `${apiUrl()}file/create/comment`,
        null,
        {
          params: {
            userId: session?.user.id,
            text: commentText,
            fileId: router.query.fileId,
          },
        }
      );
      updateComments();
      return result.data;
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <button
        ref={btnRef}
        onClick={onOpen}
        className="xl:hidden border rounded p-1.5 border-[#DADADA] my-auto"
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="my-auto"
        >
          <path
            d="M14 12.85L1 12.85L1 14.15L14 14.15L14 12.85ZM14 8.85002L1 8.85002L1 10.15L14 10.15L14 8.85002ZM1 4.85003L14 4.85003L14 6.15003L1 6.15002L1 4.85003ZM14 0.850025L1 0.850025L1 2.15002L14 2.15002L14 0.850025Z"
            fill="#686868"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        isFullHeight={true}
      >
        <DrawerOverlay />
        {/*@ts-ignore*/}
        <DrawerContent
          ref={ref}
          className="bg-[#FBFBFA] pt-4 flex h-[100vh] flex-col space-y-3 justify-between items-between"
        >
          <div className="flex flex-col justify-between items-between px-6 py-2 divide-y h-full">
            <div className="h-1/6 flex flex-col justify-between items-between py-4">
              <div className="w-full">
                <h2 className="silka-medium">
                  {fileInfo.name.length > 42
                    ? fileInfo.name.slice(0, 42) + '...'
                    : fileInfo.name}
                </h2>
                {description == null && addDescription == false ? (
                  <button
                    onClick={() => {
                      setAddDescription(true);
                    }}
                    className="flex flex-row space-x-2 hover:opacity-80 mt-4"
                  >
                    <div className="h-[18px] w-[18px] flex flex-col justify-center items-center rounded bg-[#666666]">
                      <svg
                        width="8"
                        height="8"
                        viewBox="0 0 6 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_370_41)">
                          <path
                            d="M6 2.5H3.5V0H2.5V2.5H0V3.5H2.5V6H3.5V3.5H6V2.5Z"
                            fill="white"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_370_41">
                            <rect width="6" height="6" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <span className="silka-regular text-[#666666] my-auto text-sm">
                      Description
                    </span>
                  </button>
                ) : addDescription == true ? (
                  <form
                    onSubmit={(e) => {
                      handleAddDescription(e);
                    }}
                    className="flex flex-col space-y-2 mt-2"
                  >
                    <textarea
                      placeholder="Description..."
                      className="border overflow-hidden border-white focus:border-[#FF623D] focus:ring-0 text-[#666666] silka-regular rounded bg-[#F2F2F2] resize-none text-xs"
                      value={description != null ? description : ''}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    />
                    <div className="flex flex-row justify-end items-end space-x-5">
                      <button
                        onClick={() => {
                          setAddDescription(false);
                        }}
                        className="text-xs silka-regular text-[#969696]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="text-xs silka-regular text-[#575757] hover:text-[#FF623D]"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                ) : description != null ? (
                  <div className="flex flex-col h-full">
                    <p className="text-sm silka-regular break-all mt-3 text-[#666666]">
                      {description.length > 72 ? (
                        <>{description.slice(0, 72)}...</>
                      ) : (
                        description
                      )}
                    </p>
                    <div className="mt-3 flex flex-col justify-start items-start">
                      <button
                        onClick={() => {
                          setAddDescription(true);
                        }}
                        className="text-xs flex flex-row space-x-1 silka-light text-[#575757] hover:opacity-70"
                      >
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 6 6"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="my-auto"
                        >
                          <g clipPath="url(#clip0_580_2)">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M2.01775 5.3965L0.25 5.75L0.6035 3.98225L4.33575 0.25L5.75 1.66425L2.01775 5.3965ZM1.8945 5.16625L0.83375 4.1055L0.56875 5.43125L1.8945 5.16625ZM4.33575 0.6035L1.01075 3.92875L2.07125 4.98925L5.3965 1.66425L4.33575 0.6035V0.6035Z"
                              fill="#575757"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_580_2">
                              <rect
                                width="6"
                                height="6"
                                fill="white"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        <span>Edit</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className="flex flex-row space-x-2">
                <button
                  onClick={() => setView(1)}
                  className={
                    'text-sm silka-regular py-1 px-3 rounded text-[#5E5E5E] ' +
                    (view == 1 ? 'bg-[#EAEAEA]' : '')
                  }
                >
                  Actions
                </button>
                <button
                  onClick={() => setView(2)}
                  className={
                    'text-sm silka-regular py-1 px-3 rounded text-[#5E5E5E] ' +
                    (view == 2 ? 'bg-[#EAEAEA]' : '')
                  }
                >
                  Comments
                </button>
                <button
                  onClick={() => setView(3)}
                  className={
                    'text-sm silka-regular py-1 px-3 rounded text-[#5E5E5E] ' +
                    (view == 3 ? 'bg-[#EAEAEA]' : '')
                  }
                >
                  File Info
                </button>
              </div>
            </div>
            <div className="h-2/3 py-4">
              {view == 1 ? (
                <PlayerActions workspaceId={workspaceId} />
              ) : view == 2 ? (
                <div className="flex flex-col space-y-4">
                  {commentsData.length == 0 ? (
                    <PlayerCommentsNoComments />
                  ) : (
                    <>
                      {commentsData.map(
                        (value: any, index: number) => {
                          return (
                            <CommentComponent
                              key={index}
                              id={value.id}
                              text={value.text}
                              uploaderImage={value.user.image}
                              uploaderName={value.user.name}
                              createdAt={value.createdAt}
                              commentsData={commentsData}
                              setCommentsData={setCommentsData}
                            />
                          );
                        }
                      )}
                    </>
                  )}
                </div>
              ) : (
                <PlayerFileInfo fileInfo={fileInfo} />
              )}
            </div>
            <div className="h-1/6 flex flex-col justify-center items-center py-4">
              <div className="flex flex-col space-y-3 h-full w-full">
                <div className="flex flex-row space-x-2">
                  <div className="flex flex-col justify-center items-center my-auto">
                    <Image
                      alt="profile picture"
                      className="rounded-full my-auto"
                      src={String(session?.user.image)}
                      width={16}
                      height={16}
                    />
                  </div>
                  <p className="text-xs silka-regular text-[#6F6F6F]">
                    {session?.user?.name}
                  </p>
                </div>
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Type your comment..."
                  className="text-xs border border-white bg-[#F2F2F2] text-[#828282] silka-regular resize-none h-44 focus:ring-0 focus:border-[#FF623D] rounded"
                ></textarea>
                <div className="flex flex-row justify-end items-end ">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddComment();
                      setCommentText('');
                      setView(2);
                    }}
                    className="py-1 px-4 hover:opacity-90 text-white bg-[#FF623D] rounded text-xs silka-medium"
                  >
                    Comment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
