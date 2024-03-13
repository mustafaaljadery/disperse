import Image from 'next/image';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { Dispatch, SetStateAction, useState } from 'react';
import toast from 'react-hot-toast';
import { apiUrl } from '../../utils/apiUrl';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { clsx } from 'clsx';

async function deleteComment(commentId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.post(
      `${apiUrl()}file/delete/comment`,
      null,
      {
        params: {
          commentId: commentId,
        },
      }
    );
    toast.success('Comment Deleted!', {
      className: 'text-sm silka-medium text-gray-900',
    });
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

interface CommentProps {
  uploaderImage: string;
  uploaderName: string;
  createdAt: string;
  id: string;
  text: string;
  commentsData: any;
  setCommentsData: Dispatch<SetStateAction<any>>;
}

export function PlayerCommentsNoComments() {
  return (
    <div className="flex flex-col mt-3 w-full justify-center items-center">
      <div className="p-3 rounded-full bg-[#F6E7E3]">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_795_10)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15 11.25C15 11.664 14.664 12 14.25 12C13.836 12 13.5 11.664 13.5 11.25C13.5 10.836 13.836 10.5 14.25 10.5C14.664 10.5 15 10.836 15 11.25ZM12.75 11.25C12.75 11.664 12.414 12 12 12C11.586 12 11.25 11.664 11.25 11.25C11.25 10.836 11.586 10.5 12 10.5C12.414 10.5 12.75 10.836 12.75 11.25ZM10.5 11.25C10.5 11.664 10.164 12 9.75 12C9.336 12 9 11.664 9 11.25C9 10.836 9.336 10.5 9.75 10.5C10.164 10.5 10.5 10.836 10.5 11.25ZM14.5613 14.9595C13.8113 15.1515 13.0695 15.321 12.0682 15.321C9.4695 15.321 6.75 13.7723 6.75 11.2538C6.75 8.90775 9.105 6.99975 12 6.99975C14.883 6.99975 17.25 8.90625 17.25 11.2538C17.25 12.447 16.7655 13.149 16.1392 13.899L16.7685 15.9135L14.5613 14.9595V14.9595ZM4.5315 12.4282L1.23975 13.8502L2.18175 10.8412C1.341 9.8355 0.75 8.8425 0.75 7.317C0.75 4.10925 3.9465 1.5 7.875 1.5C11.6385 1.5 14.721 3.8955 14.9752 6.9165C14.0827 6.492 13.062 6.24975 12 6.24975C8.85075 6.24975 6 8.3475 6 11.2538C6 11.7878 6.11025 12.3038 6.30825 12.7905C5.5935 12.696 5.14875 12.5865 4.5315 12.4282M18 11.2538C18 9.62475 17.1007 8.2425 15.7485 7.34625L15.75 7.317C15.75 3.5025 12.009 0.75 7.875 0.75C3.7155 0.75 0 3.5235 0 7.317C0 8.6625 0.4845 9.984 1.34325 11.0085L0.03525 15.1875L4.59375 13.2188C5.33025 13.4085 6.04275 13.524 6.73125 13.5855C7.719 15.0503 9.63825 16.071 12.0682 16.071C12.8325 16.071 13.647 15.9698 14.4998 15.75L17.973 17.25L16.977 14.0662C17.6302 13.2847 18 12.2783 18 11.2538"
              fill="#FF623D"
            />
          </g>
          <defs>
            <clipPath id="clip0_795_10">
              <rect width="18" height="18" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <p className="mt-4 text-center text-sm silka-medium">
        No comments found
      </p>
      <p className="text-gray-500 mt-1.5 text-center w-3/4 silka-regular text-xs">
        Send your first comment to be viewed by your team.
      </p>
    </div>
  );
}

export function CommentComponent({
  uploaderImage,
  uploaderName,
  createdAt,
  id,
  text,
  commentsData,
  setCommentsData,
}: CommentProps) {
  const [confirmed, setConfirmed] = useState(false);
  return (
    <div className="flex flex-row bg-[#F9F9F9] py-3 px-4 rounded-lg">
      <div className="flex w-full flex-col space-y-2">
        <div className="flex flex-row justify-between items-between">
          <div className="flex flex-row space-x-2">
            <Image
              alt="profile picture"
              className="rounded-full"
              src={uploaderImage}
              width={20}
              height={20}
            />
            <p className="my-auto text-xs silka-regular text-[#6F6F6F]">
              {uploaderName}
            </p>
            <p className="my-auto text-xs silka-regular text-[#474747]"></p>
          </div>
        </div>
        <p className="text-sm silka-regular text-[#393939">{text}</p>
      </div>
      <DropdownMenuPrimitive.Root>
        <DropdownMenuPrimitive.Trigger asChild>
          <button className="my-auto">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="my-auto"
            >
              <path
                d="M8.625 2.5C8.625 3.12132 8.12132 3.625 7.5 3.625C6.87868 3.625 6.375 3.12132 6.375 2.5C6.375 1.87868 6.87868 1.375 7.5 1.375C8.12132 1.375 8.625 1.87868 8.625 2.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM7.5 13.625C8.12132 13.625 8.625 13.1213 8.625 12.5C8.625 11.8787 8.12132 11.375 7.5 11.375C6.87868 11.375 6.375 11.8787 6.375 12.5C6.375 13.1213 6.87868 13.625 7.5 13.625Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </DropdownMenuPrimitive.Trigger>
        <DropdownMenuPrimitive.Portal>
          <DropdownMenuPrimitive.Content
            align="end"
            sideOffset={5}
            className={clsx(
              'radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
              'w-36 rounded-lg  p-2 flex flex-col justify-center items-center shadow-md',
              'bg-white'
            )}
          >
            {confirmed ? (
              <DropdownMenuPrimitive.Item>
                <button
                  onClick={() => {
                    deleteComment(id);
                    setCommentsData(
                      commentsData.filter(
                        (comment: any) => comment.id !== id
                      )
                    );
                  }}
                  className="flex flex-row space-x-2"
                >
                  <p className="text-xs silka-medium text-[#FF0000]">
                    Are you sure?
                  </p>
                </button>
              </DropdownMenuPrimitive.Item>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setConfirmed(true);
                }}
                className="flex flex-rows space-x-2"
              >
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
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <p className="my-auto text-xs silka-medium text-[#363636]">
                  Delete Comment
                </p>
              </button>
            )}
          </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Portal>
      </DropdownMenuPrimitive.Root>
    </div>
  );
}
