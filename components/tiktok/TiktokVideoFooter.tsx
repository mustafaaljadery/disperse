interface Props {
  likes: number;
  comments: number;
  shares: number;
}

function formatLargeNumber(num: number, digits: number) {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, '$1') +
        item.symbol
    : '0';
}

export function TiktokVideoFooter({
  likes,
  comments,
  shares,
}: Props) {
  return (
    <div className="hidden lg:flex flex-col justify-end items-end space-y-4">
      <div className="flex flex-col space-y-1 justify-center items-center">
        <button className="p-2.5 rounded-full hover:opacity-90 bg-[#2F2F2F]">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_1026_2)">
              <mask
                id="mask0_1026_2"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="20"
                height="20"
              >
                <path d="M20 0H0V20H20V0Z" fill="white" />
              </mask>
              <g mask="url(#mask0_1026_2)">
                <g filter="url(#filter0_d_1026_2)">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6.25 1.875C8.75 1.875 10 3.54167 10 3.54167C10 3.54167 11.25 1.875 13.75 1.875C16.6667 1.875 18.75 4.16666 18.75 7.08333C18.75 10.4167 16.0259 13.3881 13.5417 15.625C12.0079 17.006 10.8333 17.9167 10 17.9167C9.16667 17.9167 7.95876 16.9991 6.45833 15.625C4.01624 13.3885 1.25 10.4167 1.25 7.08333C1.25 4.16666 3.33333 1.875 6.25 1.875Z"
                    fill="white"
                    fill-opacity="0.9"
                  />
                </g>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M2.00195 10.1657C2.99131 12.2464 4.79979 14.105 6.4587 15.6242C7.95913 16.9983 9.16704 17.9159 10.0004 17.9159C10.8337 17.9159 12.0083 17.0052 13.542 15.6242C16.0263 13.3873 18.7504 10.4159 18.7504 7.08252C18.7504 7.00969 18.749 6.93726 18.7465 6.86523C17.1397 11.3841 11.3994 15.4159 9.79213 15.4159C8.59438 15.4159 4.67619 13.1768 2.00195 10.1657Z"
                  fill="white"
                  fill-opacity="0.027"
                />
              </g>
            </g>
            <defs>
              <filter
                id="filter0_d_1026_2"
                x="-0.75"
                y="0.875"
                width="21.5"
                height="20.041"
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
                <feOffset dy="1" />
                <feGaussianBlur stdDeviation="1" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_1026_2"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_1026_2"
                  result="shape"
                />
              </filter>
              <clipPath id="clip0_1026_2">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
        <p className="text-[#2F2F2F] text-[11px] silka-semibold">
          {formatLargeNumber(likes, 1)}
        </p>
      </div>
      <div className="flex flex-col justify-center items-center space-y-1">
        <button className="p-2.5 rounded-full bg-[#2F2F2F] hover:opacity-90">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_1026_10)">
              <mask
                id="mask0_1026_10"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="20"
                height="20"
              >
                <path d="M20 0H0V20H20V0Z" fill="white" />
              </mask>
              <g mask="url(#mask0_1026_10)">
                <g filter="url(#filter0_d_1026_10)">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16.0393 14.7137C17.75 13 18.75 11.215 18.75 9.13665C18.75 4.919 14.8887 1.5 10.125 1.5C5.36129 1.5 1.5 4.919 1.5 9.13678C1.5 13.3545 5.48622 16.25 10.25 16.25V17.6487C10.25 18.0919 10.7095 18.3771 11.0992 18.1659C12.3166 17.5062 14.5725 16.183 16.0393 14.7137ZM5.93527 8.10682C6.61608 8.10682 7.16797 8.65474 7.16797 9.32965C7.16797 10.0059 6.61608 10.5538 5.93527 10.5538C5.2556 10.5538 4.70368 10.0059 4.70368 9.32965C4.70368 8.65474 5.2556 8.10682 5.93527 8.10682ZM11.3572 9.32965C11.3572 8.65474 10.8055 8.10682 10.125 8.10682C9.44459 8.10682 8.89289 8.65474 8.89289 9.32965C8.89292 10.0059 9.44462 10.5538 10.125 10.5538C10.8055 10.5538 11.3572 10.0059 11.3572 9.32965ZM14.3146 8.10682C14.9953 8.10682 15.5464 8.65474 15.5464 9.32965C15.5464 10.0059 14.9953 10.5538 14.3146 10.5538C13.6339 10.5538 13.082 10.0059 13.0821 9.32965C13.0821 8.65474 13.6339 8.10682 14.3146 8.10682Z"
                    fill="white"
                  />
                </g>
              </g>
            </g>
            <defs>
              <filter
                id="filter0_d_1026_10"
                x="0.5"
                y="1.5"
                width="19.25"
                height="18.7363"
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
                <feOffset dy="1" />
                <feGaussianBlur stdDeviation="0.5" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_1026_10"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_1026_10"
                  result="shape"
                />
              </filter>
              <clipPath id="clip0_1026_10">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
        <p className="text-[11px] silka-semibold text-[#2F2F2F]">
          {formatLargeNumber(comments, 1)}
        </p>
      </div>
      <div className="flex flex-col space-y-1 justify-center items-center">
        <button className="p-2.5 rounded-full bg-[#2F2F2F] hover:opacity-90">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.0242 1.62784C10.5582 1.19116 9.78728 1.51618 9.78728 2.14938V5.43679C8.52049 5.90554 4.71611 7.55783 2.75165 11.0899C-0.62396 17.5538 1.59354 18.115 2.4043 16.558C5.51915 12.1599 8.67245 12.6783 9.78728 13.0496V15.9273C9.78728 16.5456 10.5271 16.8765 11.0007 16.47L18.0697 10.4015C18.7192 9.84396 18.741 8.85787 18.1168 8.27308L11.0242 1.62784Z"
              fill="white"
            />
          </svg>
        </button>
        <p className="text-[11px] silka-semibold text-[#2F2F2F]">
          {formatLargeNumber(shares, 1)}
        </p>
      </div>
    </div>
  );
}
