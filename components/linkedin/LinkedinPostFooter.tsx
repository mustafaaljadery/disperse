interface Props {
  comments: number;
  reposts: number;
  interactions: number;
}

export function LinkedinPostFooter({
  comments,
  reposts,
  interactions,
}: Props) {
  return (
    <div className="flex flex-col mt-4">
      <div className="flex flex-row justify-between items-between">
        <div className="flex flex-row space-x-1.5 my-auto">
          <div className="flex flex-row my-auto">
            <img
              crossOrigin="anonymous"
              src="https://static.licdn.com/sc/h/8ekq8gho1ruaf8i7f86vd1ftt"
            />
            <img
              crossOrigin="anonymous"
              src="https://static.licdn.com/sc/h/lhxmwiwoag9qepsh4nc28zus"
            />
            <img
              crossOrigin="anonymous"
              src="https://static.licdn.com/sc/h/cpho5fghnpme8epox8rdcds22"
            />
          </div>
          <p className="text-[11px] my-auto silka-regular text-gray-400">
            {interactions}
          </p>
        </div>
        <div className="flex flex-row space-x-1 my-auto">
          <p className="text-[11px] silka-regular text-gray-400">{`${comments} comments`}</p>
          <span className="text-[11px] silka-regular text-gray-400">
            &middot;
          </span>
          <p className="text-[11px] silka-regular text-gray-400">{`${reposts} reposts`}</p>
        </div>
      </div>
      <hr className="w-full my-2.5" />
      <div className="flex flex-row w-full space-x-1.5">
        <button className="hover:bg-gray-100 rounded flex flex-row justify-center py-2.5 items-center w-1/4 space-x-1.5">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="my-auto"
            crossOrigin="anonymous"
          >
            <path
              d="M14.5948 8.25001L11.6623 5.31751C11.0859 4.74029 10.6519 4.03668 10.3948 3.26251L10.0273 2.16001C9.88933 1.74988 9.6263 1.39329 9.27518 1.14038C8.92406 0.887465 8.50252 0.750947 8.0698 0.750014C7.79894 0.749027 7.53055 0.801399 7.27994 0.904138C7.02933 1.00688 6.8014 1.15797 6.60919 1.3488C6.41697 1.53962 6.26422 1.76644 6.15966 2.0163C6.0551 2.26616 6.00078 2.53416 5.9998 2.80501V3.64501C6.00147 4.37124 6.11791 5.09264 6.3448 5.78251L6.6673 6.75001H3.0898C2.6681 6.75001 2.26368 6.91753 1.9655 7.21571C1.66731 7.5139 1.4998 7.91832 1.4998 8.34001C1.50083 8.59919 1.56403 8.85433 1.6841 9.08401C1.80416 9.3137 1.97758 9.51123 2.1898 9.66001C1.97739 9.80508 1.80354 9.99974 1.68331 10.2271C1.56308 10.4545 1.50009 10.7078 1.4998 10.965C1.49384 11.2819 1.58182 11.5934 1.75267 11.8604C1.92351 12.1273 2.16956 12.3377 2.4598 12.465C2.32498 12.6922 2.25254 12.9509 2.2498 13.215C2.24914 13.6216 2.40425 14.0129 2.68324 14.3087C2.96222 14.6044 3.34389 14.782 3.7498 14.805V14.91C3.7498 15.3317 3.91731 15.7361 4.2155 16.0343C4.51368 16.3325 4.9181 16.5 5.3398 16.5H10.9573C11.8888 16.4992 12.8076 16.2836 13.6423 15.87L13.8748 15.75H15.7498V8.25001H14.5948ZM14.2498 14.25H13.4998L12.9523 14.5275C12.3244 14.8362 11.6345 14.9978 10.9348 15H5.7898C5.62244 15.0067 5.45766 14.9571 5.32174 14.8593C5.18582 14.7614 5.08656 14.6208 5.0398 14.46L4.8523 13.8075L4.2148 13.5C4.06796 13.4402 3.94386 13.3354 3.86032 13.2006C3.77677 13.0659 3.73808 12.9081 3.7498 12.75L3.8773 12L3.3073 11.445C3.18328 11.3239 3.10505 11.1636 3.08591 10.9913C3.06677 10.819 3.10789 10.6454 3.2023 10.5L3.6973 9.68251L3.1498 8.85751C3.11847 8.81944 3.09512 8.77545 3.08115 8.72817C3.06718 8.68089 3.06286 8.63128 3.06846 8.58229C3.07406 8.5333 3.08946 8.48595 3.11374 8.44303C3.13802 8.40012 3.17069 8.36254 3.2098 8.33251C3.28101 8.27322 3.37235 8.24367 3.4648 8.25001H8.7523L7.7698 5.31001C7.59064 4.77319 7.49947 4.21094 7.4998 3.64501V2.81251C7.50359 2.66453 7.56407 2.52365 7.66875 2.41897C7.77343 2.31429 7.91431 2.25381 8.0623 2.25001C8.1799 2.2501 8.29452 2.28705 8.39004 2.35566C8.48555 2.42427 8.55716 2.52109 8.5948 2.63251L8.9998 3.75001C9.3234 4.7362 9.87006 5.63447 10.5973 6.37501L13.9723 9.75001H14.2498V14.25Z"
              fill="#707070"
            />
          </svg>
          <p className="my-auto text-sm text-[#707070] silka-medium">
            Like
          </p>
        </button>
        <button className="hover:bg-gray-100 rounded flex flex-row justify-center py-2.5 items-center w-1/4 space-x-1.5">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="my-auto"
            crossOrigin="anonymous"
          >
            <path
              d="M7 9H17V10H7V9ZM7 13H14V12H7V13ZM23 11C23.0148 12.0949 22.7643 13.1772 22.2697 14.1541C21.7751 15.1311 21.0512 15.9738 20.16 16.61L12 22V18H8C6.14348 18 4.36301 17.2625 3.05025 15.9497C1.7375 14.637 1 12.8565 1 11C1 9.14348 1.7375 7.36301 3.05025 6.05025C4.36301 4.7375 6.14348 4 8 4H16C17.8565 4 19.637 4.7375 20.9497 6.05025C22.2625 7.36301 23 9.14348 23 11ZM21 11C21 9.67392 20.4732 8.40215 19.5355 7.46447C18.5979 6.52678 17.3261 6 16 6H8C6.67392 6 5.40215 6.52678 4.46447 7.46447C3.52678 8.40215 3 9.67392 3 11C3 12.3261 3.52678 13.5979 4.46447 14.5355C5.40215 15.4732 6.67392 16 8 16H14V18.28L19 15C19.6336 14.5463 20.1469 13.9448 20.4955 13.2477C20.844 12.5507 21.0172 11.7791 21 11Z"
              fill="#707070"
            />
          </svg>
          <p className="my-auto text-sm text-[#707070] silka-medium">
            Comment
          </p>
        </button>
        <button className="hover:bg-gray-100 rounded flex flex-row justify-center py-2.5 items-center w-1/4 space-x-1.5">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="my-auto"
            crossOrigin="anonymous"
          >
            <path
              d="M10.47 3.75H4.5C4.0875 3.75 3.75 4.0875 3.75 4.5V12H2.25V4.5C2.25 3.255 3.255 2.25 4.5 2.25H10.47L9 0H10.7775L12.75 3L10.7775 6H9L10.47 3.75ZM14.625 6H14.25V13.5C14.25 13.9125 13.9125 14.25 13.5 14.25H7.53L9 12H7.2225L5.25 15L7.2225 18H9L7.53 15.75H13.5C14.745 15.75 15.75 14.745 15.75 13.5V6H14.625Z"
              fill="#707070"
            />
          </svg>

          <p className="my-auto text-sm text-[#707070] silka-medium">
            Repost
          </p>
        </button>
        <button className="hover:bg-gray-100 rounded flex flex-row justify-center py-2.5 items-center w-1/4 space-x-1.5">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="my-auto"
            crossOrigin="anonymous"
          >
            <path
              d="M15.75 2.25L0 7.5L5.745 10.695L12 6L7.305 12.255L10.5 18L15.75 2.25Z"
              fill="#707070"
            />
          </svg>

          <p className="my-auto text-sm text-[#707070] silka-medium">
            Send
          </p>
        </button>
      </div>
    </div>
  );
}
