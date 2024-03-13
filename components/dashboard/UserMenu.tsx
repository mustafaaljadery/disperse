import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';
import React, { ReactNode, useState } from 'react';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import Router from 'next/router';

interface Props {
  image: string;
  email: string;
  name: string;
  workspaceId: string;
  loading: boolean;
}

export function UserMenu({
  email,
  name,
  image,
  workspaceId,
  loading,
}: Props) {
  return (
    <div className="">
      <DropdownMenuPrimitive.Root>
        <DropdownMenuPrimitive.Trigger asChild>
          <button className="flex flex-row space-x-2">
            {loading ? (
              <div className="h-[24px] rounded-full bg-gray-200 animate-pulse w-[24px]" />
            ) : (
              <img
                alt="A picture of the image for the User."
                width={24}
                height={24}
                src={image}
                className="rounded-full"
              />
            )}
            <svg
              width="10"
              height="7"
              viewBox="0 0 10 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="my-auto"
            >
              <g clipPath="url(#clip0_167_80)">
                <path
                  d="M8.41493 1.00974L5.20995 4.2147L2.00499 1.00974C1.68285 0.687591 1.16245 0.687591 0.840305 1.00974C0.518157 1.33189 0.518157 1.85228 0.840305 2.17443L4.63173 5.96586C4.95389 6.288 5.47427 6.288 5.79642 5.96586L9.58785 2.17443C9.91 1.85228 9.91 1.33189 9.58785 1.00974C9.26569 0.695851 8.73708 0.687591 8.41493 1.00974Z"
                  fill="#4E4E4E"
                />
              </g>
              <defs>
                <clipPath id="clip0_167_80">
                  <rect width="10" height="6.92308" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </DropdownMenuPrimitive.Trigger>
        <DropdownMenuPrimitive.Portal>
          <DropdownMenuPrimitive.Content
            align="end"
            sideOffset={5}
            className={cx(
              'radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
              'w-48 px-2 rounded-lg py-1.5 shadow-md md:w-64',
              'bg-[#363636]'
            )}
          >
            <div className="flex flex-col space-y-1.5 px-1.5">
              <div className="flex flex-row justify-between items-between py-1">
                {loading ? (
                  <div className="w-12 h-2.5 bg-gray-200 rounded animate-pulse" />
                ) : (
                  <p className="text-[9px] silka-regular text-white">
                    {email}
                  </p>
                )}
              </div>
              <div className="flex flex-row space-x-3 mt-2">
                {loading ? (
                  <div className="rounded bg-gray-200 h-[24px] w-[24px] animate-pulse" />
                ) : (
                  <Image
                    alt="A picture of the image for the User."
                    className="rounded"
                    src={image}
                    width={24}
                    height={24}
                  />
                )}
                {loading ? (
                  <div className="w-8 h-3.5 rounded bg-gray-200 animate-pulse my-auto" />
                ) : (
                  <p className="text-white text-[11px] silka-regular my-auto">
                    {name}
                  </p>
                )}
              </div>
            </div>
            <DropdownMenuPrimitive.Separator className="mt-3 mb-1 h-px bg-[#616161]" />
            <DropdownMenuPrimitive.Item className="py-0.5">
              <div className="py-1.5 hover:bg-[#3D3D3D] rounded">
                <button
                  onClick={() => {
                    Router.push('/' + workspaceId + '/settings');
                  }}
                  className="px-3 silka-medium text-white text-xs w-full flex flex-row space-x-2.5 justify-start items-start"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="my-auto"
                  >
                    <g clipPath="url(#clip0_813_2)">
                      <path
                        d="M16 9.458V6.542C14.568 6.03133 14.1827 6.00733 13.982 5.52267C13.78 5.03667 14.0373 4.74333 14.688 3.374L12.626 1.312C11.2753 1.954 10.9673 2.22133 10.4767 2.018C9.992 1.81667 9.96467 1.42533 9.45867 0H6.542C6.03267 1.42933 6.00867 1.81667 5.52267 2.018C5.02133 2.22667 4.72067 1.95133 3.374 1.312L1.312 3.374C1.96333 4.744 2.22 5.036 2.018 5.52333C1.81667 6.008 1.43067 6.03267 0 6.542V9.45867C1.426 9.96533 1.81667 9.992 2.018 10.4773C2.22067 10.9667 1.964 11.2553 1.312 12.626L3.374 14.688C4.70667 14.0547 5.02067 13.7727 5.52267 13.982C6.008 14.1833 6.032 14.5687 6.542 16H9.458C9.96333 14.5793 9.99067 14.1847 10.4827 13.9793C10.9793 13.774 11.2733 14.0453 12.626 14.6873L14.688 12.6253C14.038 11.2587 13.78 10.964 13.982 10.4767C14.182 9.99267 14.5687 9.968 16 9.458V9.458ZM12.75 9.96733C12.3653 10.8967 12.7047 11.606 13.0753 12.3527L12.3527 13.0753C11.624 12.7133 10.912 12.358 9.97067 12.7487C9.04 13.136 8.77733 13.8773 8.512 14.6667H7.48933C7.224 13.8767 6.962 13.1353 6.034 12.75C5.088 12.358 4.36267 12.72 3.648 13.0753L2.926 12.3527C3.29733 11.6073 3.63667 10.8993 3.25067 9.966C2.86467 9.03867 2.12333 8.77667 1.33333 8.51133V7.48933C2.12333 7.224 2.86467 6.962 3.25 6.03333C3.63533 5.104 3.29533 4.394 2.92467 3.64733L3.64733 2.92467C4.36867 3.28333 5.08867 3.64267 6.034 3.25C6.962 2.86533 7.224 2.12333 7.48933 1.33333H8.512C8.77733 2.12333 9.04 2.86467 9.968 3.25C10.914 3.642 11.6387 3.28 12.354 2.92467L13.0767 3.64733C12.706 4.39467 12.3667 5.10533 12.7513 6.034C13.136 6.96133 13.8773 7.22333 14.668 7.48933V8.512C13.876 8.77733 13.1333 9.03933 12.75 9.96733V9.96733ZM8 6C9.10267 6 10 6.89733 10 8C10 9.10267 9.10267 10 8 10C6.89733 10 6 9.10267 6 8C6 6.89733 6.89733 6 8 6ZM8 4.66667C6.15867 4.66667 4.66667 6.15867 4.66667 8C4.66667 9.84133 6.15867 11.3333 8 11.3333C9.84133 11.3333 11.3333 9.84133 11.3333 8C11.3333 6.15867 9.84133 4.66667 8 4.66667Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_813_2">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span className="my-auto">Settings</span>
                </button>
              </div>
            </DropdownMenuPrimitive.Item>
            <DropdownMenuPrimitive.Item className="py-0.5">
              <div className="py-1.5 hover:bg-[#3D3D3D] rounded">
                <a
                  href="/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 silka-medium text-white text-xs w-full flex flex-row space-x-2.5 justify-start items-start"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="my-auto"
                  >
                    <g clipPath="url(#clip0_814_4)">
                      <path
                        d="M8 1.33333C11.676 1.33333 14.6667 4.324 14.6667 8C14.6667 11.676 11.676 14.6667 8 14.6667C4.324 14.6667 1.33333 11.676 1.33333 8C1.33333 4.324 4.324 1.33333 8 1.33333ZM8 0C3.582 0 0 3.582 0 8C0 12.418 3.582 16 8 16C12.418 16 16 12.418 16 8C16 3.582 12.418 0 8 0ZM8.83333 11.3333C8.83333 11.7933 8.46067 12.1667 8 12.1667C7.54067 12.1667 7.16667 11.7933 7.16667 11.3333C7.16667 10.8733 7.54067 10.5 8 10.5C8.46067 10.5 8.83333 10.8733 8.83333 11.3333ZM9.762 4.668C9.35667 4.25733 8.752 4.03133 8.06133 4.03133C6.608 4.03133 5.668 5.06467 5.668 6.66467H7.00867C7.00867 5.674 7.56133 5.32267 8.034 5.32267C8.45667 5.32267 8.90533 5.60333 8.94333 6.14C8.98467 6.70467 8.68333 6.99133 8.302 7.354C7.36067 8.24933 7.34333 8.68267 7.34733 9.666H8.684C8.67533 9.22333 8.704 8.864 9.30733 8.214C9.75867 7.72733 10.32 7.122 10.3313 6.19933C10.3387 5.58333 10.142 5.05333 9.762 4.668V4.668Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_814_4">
                        <rect
                          width="16"
                          height="16"
                          fill="transparent"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <span className="my-auto">Support</span>
                </a>
              </div>
            </DropdownMenuPrimitive.Item>
            <DropdownMenuPrimitive.Separator className="my-1 h-px bg-[#616161]" />
            <DropdownMenuPrimitive.Item className="py-0.5">
              <div className="py-1.5 hover:bg-[#3D3D3D]">
                <a
                  href="https://join.slack.com/t/trydisperse/shared_invite/zt-1rifq95kk-OrmYHm1m5ApPJdc6T7RwnA"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="px-3 silka-medium space-x-2 text-white text-xs w-full flex flex-row justify-start items-start">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="my-auto"
                    >
                      <g clipPath="url(#clip0_1103_2)">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M4.39095 0C3.72893 0.000489297 3.19315 0.537737 3.19364 1.19976C3.19315 1.86177 3.72942 2.39902 4.39144 2.39951H5.58924V1.20024C5.58973 0.538226 5.05346 0.000978593 4.39095 0C4.39144 0 4.39144 0 4.39095 0ZM4.39095 3.2H1.1978C0.535781 3.20049 -0.000487959 3.73774 1.33719e-06 4.39976C-0.000977256 5.06177 0.535292 5.59902 1.19731 5.6H4.39095C5.05297 5.59951 5.58924 5.06226 5.58875 4.40024C5.58924 3.73774 5.05297 3.20049 4.39095 3.2Z"
                          fill="#36C5F0"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M11.976 4.39976C11.9765 3.73774 11.4403 3.20049 10.7782 3.2C10.1162 3.20049 9.57994 3.73774 9.58043 4.39976V5.6H10.7782C11.4403 5.59951 11.9765 5.06226 11.976 4.39976ZM8.78239 4.39976V1.19976C8.78288 0.538226 8.2471 0.000978593 7.58508 0C6.92306 0.000489297 6.3868 0.537737 6.38728 1.19976V4.39976C6.38631 5.06177 6.92257 5.59902 7.58459 5.6C8.24661 5.59951 8.78288 5.06226 8.78239 4.39976Z"
                          fill="#2EB67D"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M7.58459 12.0009C8.24661 12.0004 8.78288 11.4631 8.78239 10.8011C8.78288 10.1391 8.24661 9.60186 7.58459 9.60137H6.3868V10.8011C6.38631 11.4627 6.92257 11.9999 7.58459 12.0009ZM7.58459 8.80039H10.7782C11.4403 8.7999 11.9765 8.26265 11.976 7.60063C11.977 6.93862 11.4407 6.40137 10.7787 6.40039H7.58508C6.92306 6.40088 6.3868 6.93813 6.38728 7.60015C6.3868 8.26265 6.92257 8.7999 7.58459 8.80039Z"
                          fill="#ECB22E"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M3.34563e-07 7.60015C-0.000488962 8.26216 0.53578 8.79941 1.1978 8.7999C1.85982 8.79941 2.39609 8.26216 2.3956 7.60015V6.40039H1.1978C0.53578 6.40088 -0.000488962 6.93813 3.34563e-07 7.60015ZM3.19364 7.60015V10.8001C3.19266 11.4622 3.72893 11.9994 4.39095 12.0004C5.05297 11.9999 5.58924 11.4627 5.58875 10.8006V7.60112C5.58972 6.93911 5.05346 6.40186 4.39144 6.40088C3.72893 6.40088 3.19315 6.93813 3.19364 7.60015Z"
                          fill="#E01E5A"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1103_2">
                          <rect
                            width="11.976"
                            height="12"
                            fill="white"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    <span className="my-auto">
                      Join Slack Community
                    </span>
                  </button>
                </a>
              </div>
            </DropdownMenuPrimitive.Item>
            <DropdownMenuPrimitive.Separator className="my-1 h-px bg-[#616161]" />
            <DropdownMenuPrimitive.Item className="py-0.5">
              <div className="py-1.5 hover:bg-[#3D3D3D] rounded">
                <button
                  onClick={() => {
                    localStorage.clear();
                    signOut({
                      callbackUrl: 'https://trydisperse.com/signin',
                    });
                  }}
                  className="px-3 silka-medium text-white text-xs w-full flex flex-row space-x-2 justify-center items-center"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 1C2.44771 1 2 1.44772 2 2V13C2 13.5523 2.44772 14 3 14H10.5C10.7761 14 11 13.7761 11 13.5C11 13.2239 10.7761 13 10.5 13H3V2L10.5 2C10.7761 2 11 1.77614 11 1.5C11 1.22386 10.7761 1 10.5 1H3ZM12.6036 4.89645C12.4083 4.70118 12.0917 4.70118 11.8964 4.89645C11.7012 5.09171 11.7012 5.40829 11.8964 5.60355L13.2929 7H6.5C6.22386 7 6 7.22386 6 7.5C6 7.77614 6.22386 8 6.5 8H13.2929L11.8964 9.39645C11.7012 9.59171 11.7012 9.90829 11.8964 10.1036C12.0917 10.2988 12.4083 10.2988 12.6036 10.1036L14.8536 7.85355C15.0488 7.65829 15.0488 7.34171 14.8536 7.14645L12.6036 4.89645Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="my-auto">Sign Out</span>
                </button>
              </div>
            </DropdownMenuPrimitive.Item>
          </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Portal>
      </DropdownMenuPrimitive.Root>
    </div>
  );
}
