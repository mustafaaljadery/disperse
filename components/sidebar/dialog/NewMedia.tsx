import { Transition } from '@headlessui/react';
import {
  Fragment,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import cx from 'classnames';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import Router from 'next/router';
import { apiUrl } from '../../../utils/apiUrl';

interface NewMediaDialogInterface {
  newMediaOpen: boolean;
  setNewMediaOpen: Dispatch<SetStateAction<boolean>>;
  workspaceId: string;
}

async function getSocialConnections(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}workspace/read/socials`,
      {
        params: { workspaceId: workspaceId },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

export function NewMediaDialog({
  newMediaOpen,
  setNewMediaOpen,
  workspaceId,
}: NewMediaDialogInterface) {
  const [twitterConnected, setTwitterConnected] = useState(false);
  const [youtubeConnected, setYoutubeConnected] = useState(false);
  const [facebookConnected, setFacebookConnected] = useState(false);
  const [tiktokConnected, setTiktokConnected] = useState(false);
  const [linkedinConnected, setLinkedinConnected] = useState(false);
  const [instagramConnected, setInstagramConnected] = useState(false);

  useEffect(() => {
    getSocialConnections(workspaceId).then((value) => {
      setTwitterConnected(value.twitter);
      setYoutubeConnected(value.youtube);
      setFacebookConnected(value.facebook);
      setTiktokConnected(value.tiktok);
      setLinkedinConnected(value.linkedin);
      setInstagramConnected(value.instagram);
    });
  }, []);

  return (
    <Transition.Root show={newMediaOpen}>
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
            'w-[95vw] max-w-2xl rounded-lg py-4 md:w-full',
            'top-[40%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
            'bg-white',
            'focus:outline-none focus-visible:ring-0 focus:border-[#FF623D]'
          )}
        >
          <div className="flex flex-col">
            <div className="flex flex-row space-x-1.5 px-4">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setNewMediaOpen(false);
                }}
                className=" flex flex-row space-x-2 p-1.5 rounded bg-gray-100 hover:bg-gray-200"
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
                    fill="#363636"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              <p className="text-[11px] silka-regular text-gray-500 my-auto">
                Close New Media
              </p>
            </div>
            <hr className="w-full mt-3 mb-2" />
            <div className="flex flex-col space-y-1.5 h-full w-full px-3">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setNewMediaOpen(false);
                  if (twitterConnected) {
                    Router.push(
                      '/' + workspaceId + '/twitter/tweets'
                    );
                  } else {
                    Router.push(
                      '/' + workspaceId + '/settings/integrations'
                    );
                  }
                }}
                className="flex flex-row justify-between items-between hover:bg-gray-100 py-2.5 px-3 rounded-lg"
              >
                <div className="flex flex-row space-x-2.5">
                  <div className="bg-[#1D9BF0] p-2 rounded-lg h-fit my-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="white"
                        d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col justify-start items-start space-y-0.5">
                    <p className="text-gray-900 silka-semibold text-start text-xs">
                      Twitter
                    </p>
                    <span className="text-[10px] text-gray-400 silka-regular">
                      Create a tweet, thread, or poll directly from
                      Disperse.
                    </span>
                  </div>
                </div>
                <div className="flex flex-row space-x-4 my-auto">
                  <div className="flex flex-row space-x-1.5">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="my-auto mb-[3.5px]"
                    >
                      <path
                        d="M5.75 3.75H4.75C4.48478 3.75 4.23043 3.85536 4.04289 4.04289C3.85536 4.23043 3.75 4.48478 3.75 4.75V5.75M5.75 3.75V1.75M5.75 3.75H10.25M3.75 5.75V10.25M3.75 5.75H1.75M10.25 3.75H11.25C11.5152 3.75 11.7696 3.85536 11.9571 4.04289C12.1446 4.23043 12.25 4.48478 12.25 4.75V5.75M10.25 3.75V1.75M12.25 5.75H14.25M12.25 5.75V10.25M5.75 14.25V12.25M10.25 14.25V12.25M12.25 10.25V11.25C12.25 11.5152 12.1446 11.7696 11.9571 11.9571C11.7696 12.1446 11.5152 12.25 11.25 12.25H4.75C4.48478 12.25 4.23043 12.1446 4.04289 11.9571C3.85536 11.7696 3.75 11.5152 3.75 11.25V10.25M12.25 10.25H14.25M3.75 10.25H1.75"
                        stroke="#949494"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>

                    <p className="my-auto text-sm silka-semibold text-[#949494]">
                      3
                    </p>
                  </div>
                  {twitterConnected ? (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="my-auto mb-[3.5px]"
                    >
                      <path
                        d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                        fill="#21891B"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="my-auto mb-[3.5px]"
                    >
                      <path
                        d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                        fill="#FF0000"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  )}
                </div>
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setNewMediaOpen(false);
                  if (youtubeConnected) {
                    Router.push(
                      '/' + workspaceId + '/youtube/videos'
                    );
                  } else {
                    Router.push(
                      '/' + workspaceId + '/settings/integrations'
                    );
                  }
                }}
                className="flex flex-row justify-between items-between hover:bg-gray-100 py-2.5 px-3 rounded-lg"
              >
                <div className="flex flex-row space-x-2.5">
                  <div className="p-1.5 my-auto rounded-lg h-fit">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      className=""
                    >
                      <path
                        fill="#FF0000"
                        d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col justify-start items-start space-y-0.5">
                    <p className="text-gray-900 silka-semibold text-start text-xs">
                      Youtube
                    </p>
                    <span className="text-[10px] text-gray-400 silka-regular">
                      Create a video, or short directly from Disperse.
                    </span>
                  </div>
                </div>
                <div className="flex flex-row space-x-4 my-auto">
                  <div className="flex flex-row space-x-1.5">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="my-auto mb-[3.5px]"
                    >
                      <path
                        d="M5.75 3.75H4.75C4.48478 3.75 4.23043 3.85536 4.04289 4.04289C3.85536 4.23043 3.75 4.48478 3.75 4.75V5.75M5.75 3.75V1.75M5.75 3.75H10.25M3.75 5.75V10.25M3.75 5.75H1.75M10.25 3.75H11.25C11.5152 3.75 11.7696 3.85536 11.9571 4.04289C12.1446 4.23043 12.25 4.48478 12.25 4.75V5.75M10.25 3.75V1.75M12.25 5.75H14.25M12.25 5.75V10.25M5.75 14.25V12.25M10.25 14.25V12.25M12.25 10.25V11.25C12.25 11.5152 12.1446 11.7696 11.9571 11.9571C11.7696 12.1446 11.5152 12.25 11.25 12.25H4.75C4.48478 12.25 4.23043 12.1446 4.04289 11.9571C3.85536 11.7696 3.75 11.5152 3.75 11.25V10.25M12.25 10.25H14.25M3.75 10.25H1.75"
                        stroke="#949494"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <p className="my-auto text-sm silka-semibold text-[#949494]">
                      2
                    </p>
                  </div>
                  {youtubeConnected ? (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="my-auto mb-[3.5px]"
                    >
                      <path
                        d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                        fill="#21891B"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="my-auto mb-[3.5px]"
                    >
                      <path
                        d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                        fill="#FF0000"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  )}
                </div>
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setNewMediaOpen(false);
                  if (facebookConnected) {
                    Router.push(
                      '/' + workspaceId + '/facebook/posts'
                    );
                  } else {
                    Router.push(
                      '/' + workspaceId + '/settings/integrations'
                    );
                  }
                }}
                className="flex flex-row justify-between items-between hover:bg-gray-100 py-2.5 px-3 rounded-lg"
              >
                <div className="flex flex-row space-x-2.5">
                  <div className="bg-[#0572E7] p-2 rounded-lg h-fit my-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="white"
                        d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col justify-start items-start space-y-0.5">
                    <p className="text-gray-900 silka-semibold text-start text-xs">
                      Facebook
                    </p>
                    <span className="text-[10px] text-gray-400 silka-regular">
                      Create a text, image, video, reel, or slideshow
                      directly from Disperse.
                    </span>
                  </div>
                </div>
                <div className="flex flex-row space-x-4 my-auto">
                  <div className="flex flex-row space-x-1.5">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="my-auto mb-[3.5px]"
                    >
                      <path
                        d="M5.75 3.75H4.75C4.48478 3.75 4.23043 3.85536 4.04289 4.04289C3.85536 4.23043 3.75 4.48478 3.75 4.75V5.75M5.75 3.75V1.75M5.75 3.75H10.25M3.75 5.75V10.25M3.75 5.75H1.75M10.25 3.75H11.25C11.5152 3.75 11.7696 3.85536 11.9571 4.04289C12.1446 4.23043 12.25 4.48478 12.25 4.75V5.75M10.25 3.75V1.75M12.25 5.75H14.25M12.25 5.75V10.25M5.75 14.25V12.25M10.25 14.25V12.25M12.25 10.25V11.25C12.25 11.5152 12.1446 11.7696 11.9571 11.9571C11.7696 12.1446 11.5152 12.25 11.25 12.25H4.75C4.48478 12.25 4.23043 12.1446 4.04289 11.9571C3.85536 11.7696 3.75 11.5152 3.75 11.25V10.25M12.25 10.25H14.25M3.75 10.25H1.75"
                        stroke="#949494"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <p className="my-auto text-sm silka-semibold text-[#949494]">
                      5
                    </p>
                  </div>
                  {facebookConnected ? (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="my-auto mb-[3.5px]"
                    >
                      <path
                        d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                        fill="#21891B"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="my-auto mb-[3.5px]"
                    >
                      <path
                        d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                        fill="#FF0000"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  )}
                </div>
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setNewMediaOpen(false);
                  if (tiktokConnected) {
                    Router.push('/' + workspaceId + '/tiktok/videos');
                  } else {
                    Router.push(
                      '/' + workspaceId + '/settings/integrations'
                    );
                  }
                }}
                className="flex flex-row justify-between items-between hover:bg-gray-100 py-2.5 px-3 rounded-lg"
              >
                <div className="flex flex-row space-x-2.5">
                  <div className="bg-black p-2 rounded-lg h-fit my-auto">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_1099_2)">
                        <path
                          d="M4.83466 4.73396V4.27163C4.67423 4.24884 4.51235 4.23712 4.35033 4.23633C2.36836 4.23633 0.755859 5.84909 0.755859 7.83106C0.755859 9.04683 1.36348 10.1231 2.29038 10.7739C1.66972 10.1102 1.32462 9.23532 1.32515 8.32659C1.32515 6.37281 2.89181 4.77954 4.83466 4.73396Z"
                          fill="#00F2EA"
                        />
                        <path
                          d="M4.91962 9.9685C5.80398 9.9685 6.52527 9.26499 6.5582 8.38827L6.56123 0.561932H7.99104C7.96048 0.398469 7.94507 0.232635 7.94494 0.0664062H5.99208L5.98878 7.893C5.95625 8.76946 5.23456 9.47271 4.35047 9.47271C4.08505 9.47284 3.82359 9.40816 3.58887 9.28422C3.89643 9.71336 4.39169 9.96797 4.91962 9.9685ZM10.6618 3.21857V2.78363C10.1363 2.78416 9.62211 2.63123 9.1823 2.34382C9.56798 2.78785 10.0871 3.09475 10.662 3.21857"
                          fill="#00F2EA"
                        />
                        <path
                          d="M9.18243 2.3436C8.75145 1.85045 8.51396 1.21754 8.51423 0.5625H7.99104C8.12789 1.29407 8.55848 1.93778 9.18243 2.3436ZM4.3506 6.18979C3.44437 6.19084 2.71004 6.92517 2.70898 7.8314C2.70951 8.44152 3.04829 9.00106 3.58873 9.28452C3.38681 9.00607 3.27814 8.67111 3.27814 8.32719C3.27906 7.42096 4.0134 6.68637 4.91975 6.68531C5.08888 6.68531 5.25102 6.71324 5.40408 6.76132V4.76762C5.24365 4.74483 5.08177 4.73311 4.91975 4.73232C4.8913 4.73232 4.86324 4.7339 4.83506 4.73443V6.26579C4.67831 6.216 4.51498 6.19032 4.3506 6.18979Z"
                          fill="#FF004F"
                        />
                        <path
                          d="M10.6612 3.21915V4.73694C9.64837 4.73694 8.71041 4.41304 7.9442 3.86325V7.83194C7.9442 9.81391 6.33196 11.4264 4.34999 11.4264C3.58404 11.4264 2.87382 11.1847 2.29004 10.7748C2.96852 11.5065 3.92124 11.9222 4.91901 11.9219C6.90099 11.9219 8.51349 10.3094 8.51349 8.32773V4.35904C9.30498 4.9282 10.2556 5.23391 11.2304 5.23273V3.27934C11.035 3.27934 10.8449 3.25813 10.661 3.21875"
                          fill="#FF004F"
                        />
                        <path
                          d="M7.94459 7.8314V3.86271C8.73609 4.432 9.6867 4.73759 10.6616 4.7364V3.21874C10.0867 3.09479 9.56763 2.78776 9.18209 2.3436C8.55814 1.93778 8.12755 1.29407 7.99069 0.5625H6.56102L6.55799 8.38883C6.52519 9.26529 5.80376 9.9688 4.91941 9.9688C4.39161 9.96827 3.89621 9.71353 3.58878 9.28465C3.04834 9.00132 2.70943 8.44178 2.70877 7.83153C2.70982 6.92531 3.44416 6.19097 4.35038 6.18992C4.51924 6.18992 4.68139 6.21758 4.83471 6.26592V4.73456C2.89186 4.78013 1.3252 6.3734 1.3252 8.32719C1.3252 9.27201 1.6923 10.1321 2.29043 10.7745C2.89344 11.1991 3.61302 11.4265 4.35038 11.4259C6.33248 11.4259 7.94459 9.81337 7.94459 7.8314Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1099_2">
                          <rect width="12" height="12" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className="flex flex-col justify-start items-start space-y-0.5">
                    <p className="text-gray-900 silka-semibold text-start text-xs">
                      TikTok
                    </p>
                    <span className="text-[10px] text-gray-400 silka-regular">
                      Create a video directly from Disperse.
                    </span>
                  </div>
                </div>
                <div className="flex flex-row space-x-4 my-auto">
                  <div className="flex flex-row space-x-1.5">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="my-auto mb-[3.5px]"
                    >
                      <path
                        d="M5.75 3.75H4.75C4.48478 3.75 4.23043 3.85536 4.04289 4.04289C3.85536 4.23043 3.75 4.48478 3.75 4.75V5.75M5.75 3.75V1.75M5.75 3.75H10.25M3.75 5.75V10.25M3.75 5.75H1.75M10.25 3.75H11.25C11.5152 3.75 11.7696 3.85536 11.9571 4.04289C12.1446 4.23043 12.25 4.48478 12.25 4.75V5.75M10.25 3.75V1.75M12.25 5.75H14.25M12.25 5.75V10.25M5.75 14.25V12.25M10.25 14.25V12.25M12.25 10.25V11.25C12.25 11.5152 12.1446 11.7696 11.9571 11.9571C11.7696 12.1446 11.5152 12.25 11.25 12.25H4.75C4.48478 12.25 4.23043 12.1446 4.04289 11.9571C3.85536 11.7696 3.75 11.5152 3.75 11.25V10.25M12.25 10.25H14.25M3.75 10.25H1.75"
                        stroke="#949494"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>

                    <p className="my-auto text-sm silka-semibold text-[#949494]">
                      1
                    </p>
                  </div>
                  {tiktokConnected ? (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="my-auto mb-[3.5px]"
                    >
                      <path
                        d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                        fill="#21891B"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="my-auto mb-[3.5px]"
                    >
                      <path
                        d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                        fill="#FF0000"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  )}
                </div>
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setNewMediaOpen(false);
                  if (linkedinConnected) {
                    Router.push(
                      '/' + workspaceId + '/linkedin/posts'
                    );
                  } else {
                    Router.push(
                      '/' + workspaceId + '/settings/integrations'
                    );
                  }
                }}
                className="flex flex-row justify-between items-between hover:bg-gray-100 py-2.5 px-3 rounded-lg"
              >
                <div className="flex flex-row space-x-2.5">
                  <div className="bg-[#0966C2] p-2 rounded-lg h-fit my-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="white"
                        d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col justify-start items-start space-y-0.5">
                    <p className="text-gray-900 silka-semibold text-start text-xs">
                      Linkedin
                    </p>
                    <span className="text-[10px] text-gray-400 silka-regular">
                      Create a text, image, video, multi-image, or
                      poll directly from Disperse.
                    </span>
                  </div>
                </div>
                <div className="flex flex-row space-x-4 my-auto">
                  <div className="flex flex-row space-x-1.5">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="my-auto mb-[3.5px]"
                    >
                      <path
                        d="M5.75 3.75H4.75C4.48478 3.75 4.23043 3.85536 4.04289 4.04289C3.85536 4.23043 3.75 4.48478 3.75 4.75V5.75M5.75 3.75V1.75M5.75 3.75H10.25M3.75 5.75V10.25M3.75 5.75H1.75M10.25 3.75H11.25C11.5152 3.75 11.7696 3.85536 11.9571 4.04289C12.1446 4.23043 12.25 4.48478 12.25 4.75V5.75M10.25 3.75V1.75M12.25 5.75H14.25M12.25 5.75V10.25M5.75 14.25V12.25M10.25 14.25V12.25M12.25 10.25V11.25C12.25 11.5152 12.1446 11.7696 11.9571 11.9571C11.7696 12.1446 11.5152 12.25 11.25 12.25H4.75C4.48478 12.25 4.23043 12.1446 4.04289 11.9571C3.85536 11.7696 3.75 11.5152 3.75 11.25V10.25M12.25 10.25H14.25M3.75 10.25H1.75"
                        stroke="#949494"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>

                    <p className="my-auto text-sm silka-semibold text-[#949494]">
                      5
                    </p>
                  </div>
                  {linkedinConnected ? (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="my-auto mb-[3.5px]"
                    >
                      <path
                        d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                        fill="#21891B"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="my-auto mb-[3.5px]"
                    >
                      <path
                        d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                        fill="#FF0000"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  )}
                </div>
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setNewMediaOpen(false);
                  if (instagramConnected) {
                    Router.push(
                      '/' + workspaceId + '/instagram/posts'
                    );
                  } else {
                    Router.push(
                      '/' + workspaceId + '/settings/integrations'
                    );
                  }
                }}
                className="flex flex-row justify-between items-between hover:bg-gray-100 py-2.5 px-3 rounded-lg"
              >
                <div className="flex flex-row space-x-2.5">
                  <div className="bg-gradient-to-tr from-[#F2A603] to-[#F604D0] p-2 rounded-lg hit-fit my-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="white"
                        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col justify-start items-start space-y-0.5">
                    <p className="text-gray-9009 silka-semibold text-start text-xs">
                      Instagram
                    </p>
                    <span className="text-[10px] text-gray-400 silka-regular">
                      Create a image, video, reel, or carousel
                      directly from Disperse.
                    </span>
                  </div>
                </div>
                <div className="flex flex-row space-x-4 my-auto">
                  <div className="flex flex-row space-x-1.5">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="my-auto mb-[3.5px]"
                    >
                      <path
                        d="M5.75 3.75H4.75C4.48478 3.75 4.23043 3.85536 4.04289 4.04289C3.85536 4.23043 3.75 4.48478 3.75 4.75V5.75M5.75 3.75V1.75M5.75 3.75H10.25M3.75 5.75V10.25M3.75 5.75H1.75M10.25 3.75H11.25C11.5152 3.75 11.7696 3.85536 11.9571 4.04289C12.1446 4.23043 12.25 4.48478 12.25 4.75V5.75M10.25 3.75V1.75M12.25 5.75H14.25M12.25 5.75V10.25M5.75 14.25V12.25M10.25 14.25V12.25M12.25 10.25V11.25C12.25 11.5152 12.1446 11.7696 11.9571 11.9571C11.7696 12.1446 11.5152 12.25 11.25 12.25H4.75C4.48478 12.25 4.23043 12.1446 4.04289 11.9571C3.85536 11.7696 3.75 11.5152 3.75 11.25V10.25M12.25 10.25H14.25M3.75 10.25H1.75"
                        stroke="#949494"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>

                    <p className="my-auto text-sm silka-semibold text-[#949494]">
                      4
                    </p>
                  </div>
                  {instagramConnected ? (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="my-auto mb-[3.5px]"
                    >
                      <path
                        d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                        fill="#21891B"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="my-auto mb-[3.5px]"
                    >
                      <path
                        d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                        fill="#FF0000"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  )}
                </div>
              </button>
            </div>
            <hr className="mt-2 mb-3 w-full" />
            <button
              onClick={(e) => {
                e.preventDefault();
                setNewMediaOpen(false);
                Router.push('/' + workspaceId + '/');
              }}
              className="flex flex-row space-x-1.5 px-4 hover:opacity-80"
            >
              <div className="p-1 rounded bg-[#FF623D] h-fit my-auto">
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1100_2)">
                    <g filter="url(#filter0_d_1100_2)">
                      <rect y="6" width="6" height="6" fill="white" />
                    </g>
                    <g filter="url(#filter1_d_1100_2)">
                      <rect
                        x="3"
                        y="3"
                        width="6"
                        height="6"
                        fill="white"
                      />
                    </g>
                    <g filter="url(#filter2_d_1100_2)">
                      <rect x="6" width="6" height="6" fill="white" />
                    </g>
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1100_2"
                      x="-2"
                      y="6"
                      width="10"
                      height="10"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood
                        floodOpacity="0"
                        result="BackgroundImageFix"
                      />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="2" />
                      <feGaussianBlur stdDeviation="1" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1100_2"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1100_2"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter1_d_1100_2"
                      x="1"
                      y="3"
                      width="10"
                      height="10"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood
                        floodOpacity="0"
                        result="BackgroundImageFix"
                      />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="2" />
                      <feGaussianBlur stdDeviation="1" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1100_2"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1100_2"
                        result="shape"
                      />
                    </filter>
                    <filter
                      id="filter2_d_1100_2"
                      x="4"
                      y="0"
                      width="10"
                      height="10"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood
                        floodOpacity="0"
                        result="BackgroundImageFix"
                      />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="2" />
                      <feGaussianBlur stdDeviation="1" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1100_2"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1100_2"
                        result="shape"
                      />
                    </filter>
                    <clipPath id="clip0_1100_2">
                      <rect width="12" height="12" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <p className="text-[10px] silka-semibold text-gray-900 my-auto">
                Dashboard
              </p>
            </button>
          </div>
        </DialogPrimitive.Content>
      </Transition.Child>
    </Transition.Root>
  );
}
