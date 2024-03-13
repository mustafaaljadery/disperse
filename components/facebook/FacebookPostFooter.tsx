interface Props {
  interactions: number;
  shares: number;
  comments: number;
}

export function FacebookPostFooter({
  interactions,
  shares,
  comments,
}: Props) {
  return (
    <div className="flex flex-col mt-6">
      <div className="flex flex-row justify-between items-between">
        <div className="flex flex-row space-x-1.5">
          <div className="my-auto flex flex-row space-x-0.5">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="my-auto"
            >
              <rect width="16" height="16" rx="8" fill="#0271E6" />
              <path
                d="M12.162 7.338C12.338 7.461 12.5 7.583 12.5 8.012C12.5 8.442 12.271 8.616 12.026 8.737C12.1261 8.90028 12.1581 9.09637 12.115 9.283C12.038 9.627 11.723 9.894 11.443 9.973C11.564 10.167 11.602 10.358 11.458 10.593C11.273 10.888 11.112 11 10.4 11H7.5C6.512 11 6 10.454 6 10V7.665C6 6.435 7.467 5.39 7.467 4.535L7.361 3.47C7.356 3.405 7.369 3.246 7.419 3.2C7.499 3.121 7.72 3 8.054 3C8.272 3 8.417 3.041 8.588 3.123C9.169 3.4 9.32 4.101 9.32 4.665C9.32 4.936 8.906 5.748 8.85 6.029C8.85 6.029 9.717 5.837 10.729 5.83C11.79 5.824 12.478 6.02 12.478 6.672C12.478 6.933 12.259 7.195 12.162 7.338ZM3.6 7H4.4C4.55913 7 4.71174 7.06321 4.82426 7.17574C4.93679 7.28826 5 7.44087 5 7.6V11.4C5 11.5591 4.93679 11.7117 4.82426 11.8243C4.71174 11.9368 4.55913 12 4.4 12H3.6C3.44087 12 3.28826 11.9368 3.17574 11.8243C3.06321 11.7117 3 11.5591 3 11.4V7.6C3 7.44087 3.06321 7.28826 3.17574 7.17574C3.28826 7.06321 3.44087 7 3.6 7Z"
                fill="white"
              />
            </svg>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="my-auto"
            >
              <rect width="16" height="16" rx="8" fill="#EE3150" />
              <path
                d="M10.473 4C8.27499 4 7.99999 5.824 7.99999 5.824C7.99999 5.824 7.72599 4 5.52799 4C3.41399 4 2.79799 6.222 3.05599 7.41C3.73599 10.55 7.99999 12.75 7.99999 12.75C7.99999 12.75 12.265 10.55 12.945 7.41C13.202 6.222 12.585 4 10.473 4Z"
                fill="white"
              />
            </svg>
          </div>
          <p className="my-auto text-xs silka-regular text-gray-400">
            {interactions}
          </p>
        </div>
        <div className="flex flex-row space-x-2">
          <p className="my-auto text-xs silka-regular text-gray-400">{`${comments} comments`}</p>
          <p className="my-auto text-xs silka-regular text-gray-400">{`${shares} shares`}</p>
        </div>
      </div>
      <hr className="my-2.5 w-full" />
      <div className="flex flex-row space-x-1 w-full">
        <button className="flex flex-row justify-center space-x-2 py-2 rounded hover:bg-gray-100 items-center w-1/3">
          <img
            src="/icons/facebook-like.png"
            className="my-auto h-[16px] w-[16px]"
          />
          <p className="text-sm silka-medium text-gray-500 my-auto">
            Like
          </p>
        </button>
        <button className="flex flex-row justify-center space-x-2 py-2 rounded hover:bg-gray-100 items-center w-1/3">
          <img
            src="/icons/facebook-comment.png"
            className="my-auto h-[16px] w-[16px]"
          />
          <p className="text-sm silka-medium text-gray-500 my-auto">
            Comment
          </p>
        </button>
        <button className="flex flex-row justify-center space-x-2 py-2 rounded hover:bg-gray-100 items-center w-1/3">
          <img
            src="/icons/facebook-share.png"
            className="my-auto h-[16px] w-[16px]"
          />
          <p className="text-sm silka-medium text-gray-500 my-auto">
            Share
          </p>
        </button>
      </div>
    </div>
  );
}
