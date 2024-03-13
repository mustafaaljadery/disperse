import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ContentLineChart } from './ContentLineChart';
import axios from 'axios';
import axiosRetry from 'axios-retry';

import { apiUrl } from '../../utils/apiUrl';

async function getContentPosted(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}workspace/read/contentposted`,
      {
        params: { workspaceId: workspaceId },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

interface Props {
  componentInfo: any;
}

export function WorkspaceComponent({ componentInfo }: Props) {
  const [hovered, setHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [contentPostedNumber, setContentPostedNumber] = useState(0);
  const [contentLastPosted, setContentLastPosted] =
    useState<any>(null);

  useEffect(() => {
    getContentPosted(componentInfo.id).then((data) => {
      setContentPostedNumber(data.number);
      setContentLastPosted(data?.last_content?.name);
      setIsLoading(false);
    });
  }, []);

  return (
    <Link href={'/' + componentInfo.id} legacyBehavior>
      <button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="w-full md:w-1/2 xl:w-1/3 md:p-4"
      >
        <div
          className={
            'border rounded-lg pb-4 pt-4 ' +
            (hovered
              ? 'border-[#FF623D] shadow-sm shadow-[#FF623D]'
              : '')
          }
        >
          <Link href={'/' + componentInfo.id} legacyBehavior>
            <button className="w-full">
              <ContentLineChart workspaceId={componentInfo?.id} />
              <div className="px-4 flex flex-row justify-end items-end">
                {isLoading ? (
                  <div className="flex flex-row space-x-1 mt-1.5">
                    <div className="h-3 w-5 rounded animate-pulse bg-gray-200" />
                    <p className="text-[9px] silka-medium my-auto text-[#525252]">
                      content posted
                    </p>
                  </div>
                ) : (
                  <p className="text-[9px] silka-regular text-[#525252] mt-1.5">
                    {contentPostedNumber} content posted
                  </p>
                )}
              </div>
              <p
                className={
                  'mt-2 text-lg px-4 silka-semibold text-start ' +
                  (hovered ? '' : '')
                }
              >
                {componentInfo.name}
              </p>
              <div className="px-4 flex flex-row space-x-5 mt-3">
                <div className="flex flex-row space-x-2">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="my-auto"
                  >
                    <g clipPath="url(#clip0_460_492)">
                      <path
                        d="M7.91667 2.91708C7.91667 4.5275 6.61083 5.83375 5 5.83375C3.38917 5.83375 2.08333 4.5275 2.08333 2.91708C2.08333 1.30583 3.38917 0 5 0C6.61083 0 7.91667 1.30583 7.91667 2.91708V2.91708ZM7.25083 5.90875C6.62333 6.3825 5.845 6.66708 5 6.66708C4.15417 6.66708 3.37542 6.38167 2.74708 5.90792C1.05042 6.655 0 8.98125 0 10H10C10 8.99042 8.91667 6.66417 7.25083 5.90875V5.90875Z"
                        fill="#6A6A6A"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_460_492">
                        <rect width="10" height="10" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <p className="text-xs text-[#6A6A6A] silka-regular">
                    {componentInfo.length + 1} User
                    {componentInfo.length == 0 ? '' : 's'} in
                    Workspace
                  </p>
                </div>
                <div className="flex flex-row space-x-2">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="my-auto"
                  >
                    <path
                      d="M8.68106 5.66795e-07C8.30096 -0.000351947 7.93928 0.163743 7.68935 0.450067C7.43942 0.736387 7.32556 1.11685 7.3772 1.49342C7.42885 1.86998 7.64089 2.20575 7.95875 2.41417L6.80939 5.28775H6.8093C6.47653 5.22262 6.13141 5.29304 5.85064 5.48331L4.51355 4.14621C4.70655 3.85495 4.77573 3.49892 4.70594 3.15663C4.63623 2.81433 4.43318 2.51373 4.14173 2.32127C3.8502 2.1287 3.49408 2.05997 3.15188 2.1302C2.80958 2.20044 2.50934 2.40393 2.31721 2.69571C2.12509 2.98749 2.05688 3.34373 2.12765 3.68584C2.19833 4.02795 2.40217 4.32795 2.69422 4.51962L1.5445 7.39343H1.54459C1.11347 7.3164 0.672383 7.45926 0.36833 7.77432C0.0642773 8.08947 -0.0627857 8.5353 0.029556 8.96335C0.121825 9.39139 0.421371 9.74531 0.828256 9.90711C1.23523 10.0688 1.69597 10.0172 2.05694 9.76937C2.41792 9.52147 2.63173 9.11007 2.62697 8.67226C2.62221 8.23435 2.3996 7.82762 2.03334 7.58775L3.18307 4.71418C3.51584 4.7793 3.86086 4.70898 4.14145 4.51862L5.47855 5.85571V5.8558C5.28563 6.14697 5.21646 6.50303 5.28616 6.8453C5.35596 7.18759 5.55892 7.4881 5.85037 7.68066C6.1419 7.87322 6.49793 7.94196 6.84022 7.87181C7.18243 7.80157 7.48269 7.59817 7.67479 7.30646C7.867 7.01465 7.93521 6.65853 7.86462 6.31642C7.79395 5.97431 7.59019 5.67431 7.29814 5.48255L8.4476 2.60874C8.81094 2.67458 9.18522 2.5846 9.47897 2.36075C9.77262 2.13691 9.95866 1.79991 9.99162 1.43215C10.0245 1.06438 9.9012 0.69971 9.65196 0.42731C9.40264 0.15491 9.05031 -0.000105341 8.68106 0.000142829L8.68106 5.66795e-07ZM1.3111 9.47556C1.10171 9.47556 0.900857 9.39237 0.752722 9.24422C0.604666 9.09617 0.521473 8.89532 0.521473 8.68593C0.521473 8.47645 0.604666 8.2756 0.752722 8.12755C0.900866 7.9795 1.10172 7.8963 1.3111 7.8963C1.52049 7.8963 1.72135 7.9795 1.86948 8.12755C2.01754 8.27561 2.10073 8.47646 2.10073 8.68593C2.10047 8.89524 2.01719 9.096 1.86921 9.24395C1.72116 9.39201 1.52049 9.47529 1.3111 9.47556ZM2.62712 3.42158C2.62712 3.21219 2.71032 3.01133 2.85846 2.86329C3.00652 2.71515 3.20737 2.63195 3.41675 2.63195C3.62624 2.63195 3.82709 2.71514 3.97514 2.86329C4.12319 3.01135 4.20638 3.21219 4.20638 3.42158C4.20638 3.63106 4.12319 3.83192 3.97514 3.97996C3.82708 4.12801 3.62623 4.21121 3.41675 4.21121C3.20745 4.21104 3.00669 4.12775 2.85873 3.97969C2.71068 3.83164 2.62739 3.63097 2.62712 3.42158ZM6.57527 7.36973C6.36588 7.36973 6.16503 7.28654 6.01698 7.13848C5.86884 6.99043 5.78564 6.78958 5.78564 6.5801C5.78564 6.37071 5.86884 6.16986 6.01698 6.02181C6.16504 5.87367 6.36589 5.79047 6.57527 5.79047C6.78476 5.79047 6.98561 5.87367 7.13366 6.02181C7.28171 6.16987 7.36491 6.37072 7.36491 6.5801C7.36473 6.78949 7.28145 6.99017 7.13339 7.13821C6.98532 7.28626 6.78466 7.36955 6.57527 7.36973ZM8.68093 2.10561H8.68101C8.47153 2.10561 8.27068 2.02241 8.12263 1.87436C7.97458 1.72621 7.89138 1.52536 7.89138 1.31598C7.89138 1.10659 7.97458 0.905729 8.12263 0.757594C8.27069 0.609539 8.47154 0.526346 8.68101 0.526346C8.89041 0.526346 9.09126 0.609539 9.2393 0.757594C9.38745 0.905738 9.47064 1.10659 9.47064 1.31598C9.47038 1.52537 9.3871 1.72604 9.23903 1.87409C9.09107 2.02205 8.89031 2.10534 8.68101 2.10561H8.68093Z"
                      fill="#6A6A6A"
                    />
                  </svg>
                  <p className="text-xs text-[#6A6A6A] silka-regular">
                    {componentInfo.socials} Social
                    {componentInfo.socials > 1 ? 's' : ''} Connected
                  </p>
                </div>
              </div>
              <div className="px-4 flex flex-row justify-start items-start">
                {isLoading ? (
                  <div className="mt-4 flex flex-row space-x-1">
                    <p className="text-[10px] my-auto silka-regular text-[#6A6A6A]">
                      Last content was posted on
                    </p>
                    <div className="h-3.5 w-12 animate-pulse rounded bg-gray-200"></div>
                  </div>
                ) : (
                  <p className="mt-4 text-[10px] silka-regular text-[#6A6A6A]">
                    {contentLastPosted
                      ? `Last content was posted on ${
                          contentLastPosted
                            .slice(0, 1)
                            .toUpperCase() +
                          contentLastPosted.slice(1)
                        }`
                      : 'No content posted yet'}
                  </p>
                )}
              </div>
            </button>
          </Link>
        </div>
      </button>
    </Link>
  );
}
