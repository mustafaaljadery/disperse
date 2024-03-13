import cx from 'classnames';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import fileDownload from 'js-file-download';
import toast from 'react-hot-toast';

interface PlayerOptionsDropdownProps {
  fileInfo: any;
  setRenameOpen: Dispatch<SetStateAction<boolean>>;
  setDeleteOpen: Dispatch<SetStateAction<boolean>>;
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

export function PlayerOptionsDropdown({
  fileInfo,
  setRenameOpen,
  setDeleteOpen,
}: PlayerOptionsDropdownProps) {
  axiosRetry(axios, { retries: 3 });

  async function handleDownload() {
    try {
      toast.loading('Downloading File...', {
        className: 'text-sm silka-medium text-gray-900',
        duration: 80000,
      });
      await axios
        .get(fileInfo.googleUrl, { responseType: 'blob' })
        .then((res) => {
          fileDownload(
            res.data,
            getCorrectFileName(fileInfo.fileType, fileInfo.name)
          );
        });
      toast.remove();
      toast.success('File Downloaded!', {
        className: 'text-sm silka-medium text-gray-900',
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        align="end"
        sideOffset={7}
        className={cx(
          'flex flex-col space-y-1 radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
          'w-48 rounded py-2 shadow-md',
          'bg-[#363636]'
        )}
      >
        <button
          onClick={() => {
            setRenameOpen(true);
          }}
          className="flex h-full flex-col my-auto justify-start hover:bg-[#3D3D3D] px-3 items-start"
        >
          <DropdownMenuPrimitive.Item className="py-1.5 flex flex-row space-x-2.5">
            <svg
              width="16"
              height="16"
              viewBox="0 0 8 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="my-auto"
            >
              <path
                d="M6.33333 6.75C6.33333 6.616 6.21467 6.5 6.08333 6.5C5.22967 6.5 2.10367 6.5 1.25 6.5C1.11867 6.5 1 6.616 1 6.75C1 6.884 1.11867 7 1.25 7H6.08333C6.21467 7 6.33333 6.884 6.33333 6.75ZM2.32567 4.389C1.881 5.69433 1.83233 5.79967 1.83233 5.918C1.83233 6.09367 1.98567 6.16767 2.082 6.16767C2.19933 6.16767 2.30467 6.122 3.60667 5.67L2.32567 4.389ZM2.679 4.03533L3.961 5.31733L6.90233 2.37933C6.96733 2.31433 7 2.229 7 2.14367C7 2.05867 6.96733 1.97333 6.90233 1.90833C6.67167 1.678 6.32167 1.328 6.09067 1.09767C6.02567 1.03267 5.94033 1 5.855 1C5.77033 1 5.685 1.03267 5.61967 1.09767L2.679 4.03533Z"
                fill="white"
              />
            </svg>
            <span className="text-sm my-auto silka-medium text-white">
              Rename
            </span>
          </DropdownMenuPrimitive.Item>
        </button>
        <button
          onClick={() => {
            handleDownload();
          }}
          className="flex flex-col justify-start hover:bg-[#3D3D3D] px-3 items-start"
        >
          <DropdownMenuPrimitive.Item className="py-1.5 flex flex-row space-x-2.5">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="my-auto"
            >
              <g clipPath="url(#clip0_795_4)">
                <path
                  d="M6 2H10V3.33333H6V2ZM8 12L12.6667 6.66667H10V4H6V6.66667H3.33333L8 12ZM10 1.33333V0H6V1.33333H10ZM12.142 1.16933L11.3333 2.23533C13.3227 3.39 14.6667 5.53867 14.6667 8C14.6667 11.676 11.676 14.6667 8 14.6667C4.324 14.6667 1.33333 11.676 1.33333 8C1.33333 5.53867 2.67733 3.39 4.66667 2.23533L3.858 1.16933C1.548 2.57133 0 5.10067 0 8C0 12.418 3.582 16 8 16C12.418 16 16 12.418 16 8C16 5.10067 14.452 2.57133 12.142 1.16933V1.16933Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_795_4">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <span className="text-sm my-auto silka-medium text-white">
              Download
            </span>
          </DropdownMenuPrimitive.Item>
        </button>
        {/*
        <button
          onClick={() => {
            handleMakePrivate();
          }}
          className="flex flex-col justify-start hover:bg-[#3D3D3D] px-3 items-start"
        >
          <DropdownMenuPrimitive.Item className="py-1.5 flex flex-row space-x-2.5">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="my-auto"
            >
              <path
                d="M11.878 5.08192C12.0087 5.19925 12.134 5.32325 12.25 5.45459L11.62 6.08592L11.44 5.89259L11.246 5.71325L11.878 5.08192ZM10.4413 4.23659C10.608 4.29459 10.7707 4.36325 10.9273 4.44125L10.5793 5.26392L10.2973 5.13459L10.094 5.05925L10.4413 4.23659V4.23659ZM8.73667 3.99992H9.264V4.89259L9 4.88259L8.73667 4.89259V3.99992ZM7.586 4.22659L7.928 5.05192L7.70333 5.13525L7.44067 5.25392L7.1 4.42859C7.25533 4.35259 7.41933 4.28459 7.586 4.22659V4.22659ZM7.974 7.92592L8.54067 7.35992L7.748 6.56592C8.10133 6.31459 8.53333 6.16592 9.00067 6.16592C10.1987 6.16592 11.1673 7.13659 11.1673 8.33325C11.1673 9.52925 10.1987 10.4993 9.00067 10.4993C7.804 10.4993 6.834 9.52925 6.834 8.33325C6.834 7.89259 6.96533 7.48459 7.19067 7.14192L7.974 7.92592V7.92592ZM6.12267 5.08192L6.75467 5.71392L6.56133 5.89325L6.38133 6.08659L5.75 5.45459C5.86667 5.32325 5.99133 5.19925 6.12267 5.08192V5.08192ZM4.89467 9.74459L5.72 9.40325L5.80333 9.62925L5.922 9.88925L5.09667 10.2319C5.02 10.0746 4.95267 9.91192 4.89467 9.74459V9.74459ZM6.048 11.6546L5.67533 11.2826L6.38133 10.5766L6.56133 10.7693L6.75467 10.9493L6.048 11.6546V11.6546ZM7.55933 12.4293C7.39267 12.3706 7.22933 12.3026 7.07333 12.2239L7.422 11.4006C7.512 11.4486 7.606 11.4926 7.70333 11.5299L7.90667 11.6059L7.55933 12.4293ZM9.264 12.6666H8.73667V11.7733L9 11.7839L9.264 11.7733V12.6666ZM10.414 12.4393L10.0727 11.6126L10.2973 11.5299L10.56 11.4113L10.9013 12.2366C10.7447 12.3139 10.5807 12.3813 10.414 12.4393ZM11.878 11.5806L11.246 10.9493L11.44 10.7693L11.62 10.5766L12.25 11.2079C12.134 11.3399 12.0093 11.4639 11.878 11.5806V11.5806ZM12.8913 10.2573L12.068 9.90992L12.1973 9.62992L12.2733 9.42459L13.096 9.77192C13.038 9.93859 12.9693 10.1006 12.8913 10.2573ZM13.3333 8.59459H12.44L12.4507 8.33125L12.44 8.06859H13.3333V8.59459ZM12.28 7.25992L12.1973 7.03459L12.0787 6.77259L12.904 6.43192C12.98 6.58792 13.048 6.75125 13.1067 6.91792L12.28 7.25992ZM9 1.33325C5.47533 1.33325 2.568 3.94259 2.082 7.33325H0L2.66667 11.2779L5.33333 7.33325H3.436C3.91 4.68525 6.21867 2.66659 9 2.66659C12.1253 2.66659 14.6667 5.20859 14.6667 8.33325C14.6667 11.4579 12.1253 13.9999 9 13.9999C6.99067 13.9999 5.22533 12.9446 4.22 11.3619L3.41933 12.5453C4.69667 14.2359 6.71867 15.3333 9 15.3333C12.8647 15.3333 16 12.1986 16 8.33325C16 4.46792 12.8647 1.33325 9 1.33325V1.33325Z"
                fill="white"
              />
            </svg>
            <span className="text-sm my-auto silka-medium text-white">
              Make Private
            </span>
          </DropdownMenuPrimitive.Item>
        </button>
        */}
        <button
          onClick={() => {
            setDeleteOpen(true);
          }}
          className="flex flex-col justify-start hover:bg-[#3D3D3D] px-3 items-start"
        >
          <DropdownMenuPrimitive.Item className="py-1.5 flex flex-row space-x-2.5">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="my-auto"
            >
              <path
                d="M13.3433 4.33725H2.67668V13.9526C2.67668 14.3466 2.97534 14.6666 3.34334 14.6666H12.6767C13.0447 14.6666 13.3433 14.3466 13.3433 13.9526C13.3433 11.3493 13.3433 4.33725 13.3433 4.33725V4.33725ZM9.51001 5.99992C9.78601 5.99992 10.01 6.22392 10.01 6.49992V12.1666C10.01 12.4426 9.78601 12.6666 9.51001 12.6666C9.23401 12.6666 9.01001 12.4426 9.01001 12.1666V6.49992C9.01001 6.22392 9.23401 5.99992 9.51001 5.99992ZM6.51001 5.99992C6.78601 5.99992 7.01001 6.22392 7.01001 6.49992V12.1666C7.01001 12.4426 6.78601 12.6666 6.51001 12.6666C6.23401 12.6666 6.01001 12.4426 6.01001 12.1666V6.49992C6.01001 6.22392 6.23401 5.99992 6.51001 5.99992ZM6.01001 2.66659V1.99992C6.01001 1.64325 6.32601 1.33325 6.67668 1.33325H9.34334C9.69401 1.33325 10.01 1.64325 10.01 1.99992V2.66659H13.5127C13.7873 2.66659 14.01 2.88992 14.01 3.16459C14.01 3.43925 13.7873 3.66259 13.5127 3.66259H2.50801C2.23268 3.66259 2.01001 3.43925 2.01001 3.16459C2.01001 2.88992 2.23268 2.66659 2.50801 2.66659H6.01001ZM9.01001 2.66659V2.33325H7.01001V2.66659H9.01001Z"
                fill="white"
              />
            </svg>
            <span className="text-sm silka-medium text-white">
              Delete
            </span>
          </DropdownMenuPrimitive.Item>
        </button>
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
}
