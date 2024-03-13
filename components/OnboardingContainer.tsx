import { signOut } from 'next-auth/react';

interface Props {
  children: JSX.Element;
  header: string;
  router: any;
}

export default function OnboardingContainer({
  children,
  header,
  router,
}: Props) {
  return (
    <>
      <header className="flex flex-col">
        <div className="bg-[#FF623D] py-2 flex flex-row space-x-2.5 justify-center items-center">
          <p className="text-[11px] md:text-xs my-auto silka-semibold text-white text-center">
            {header}
          </p>
        </div>
        <div className="w-full flex flex-row justify-between px-7 items-between">
          <div className="flex flex-row space-x-3 py-6">
            <svg
              width="28"
              height="28"
              viewBox="0 0 400 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="my-auto"
            >
              <g clipPath="url(#clip0_499_2)">
                <g filter="url(#filter0_d_499_2)">
                  <rect
                    y="200"
                    width="200"
                    height="200"
                    fill="#FF623D"
                  />
                </g>
                <g filter="url(#filter1_d_499_2)">
                  <rect
                    x="100"
                    y="100"
                    width="200"
                    height="200"
                    fill="#FF623D"
                  />
                </g>
                <g filter="url(#filter2_d_499_2)">
                  <rect
                    x="200"
                    width="200"
                    height="200"
                    fill="#FF623D"
                  />
                </g>
              </g>
              <defs>
                <filter
                  id="filter0_d_499_2"
                  x="-14"
                  y="200"
                  width="228"
                  height="228"
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
                  <feOffset dy="14" />
                  <feGaussianBlur stdDeviation="7" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_499_2"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_499_2"
                    result="shape"
                  />
                </filter>
                <filter
                  id="filter1_d_499_2"
                  x="86"
                  y="100"
                  width="228"
                  height="228"
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
                  <feOffset dy="14" />
                  <feGaussianBlur stdDeviation="7" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_499_2"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_499_2"
                    result="shape"
                  />
                </filter>
                <filter
                  id="filter2_d_499_2"
                  x="186"
                  y="0"
                  width="228"
                  height="228"
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
                  <feOffset dy="14" />
                  <feGaussianBlur stdDeviation="7" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_499_2"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_499_2"
                    result="shape"
                  />
                </filter>
                <clipPath id="clip0_499_2">
                  <rect width="400" height="400" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <p className="silka-bold my-auto text-[#363636] text-2xl">
              Disperse
            </p>
          </div>
          <div className="my-auto">
            {!router.pathname.includes('name_and_password') && (
              <button
                onClick={() => {
                  localStorage.clear();
                  signOut({
                    callbackUrl: 'https://trydisperse.com/',
                  });
                }}
                className="text-xs silka-medium text-gray-500 underline my-auto hover:text-[#FF623D] hover:underline"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      </header>
      <main className="w-full flex flex-col">{children}</main>
    </>
  );
}
