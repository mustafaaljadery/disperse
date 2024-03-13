import { DisperseLogoSmall } from '../../components/logos/DisperseLogo';
import Router, { useRouter } from 'next/router';

interface Props {
  status: string;
  user: any;
}

export function YoutubeNotConnected() {
  const router = useRouter();
  return (
    <div className="h-[100vh] w-[100vw] flex flex-col justify-center items-center">
      <div className="flex flex-row space-x-5">
        <DisperseLogoSmall />
        <span className="my-auto text-xs silka-medium text-gray-700">
          X
        </span>
        <div className="h-[36px] my-auto w-[36px] rounded bg-[#FF0000] flex flex-col justify-center items-center">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_451_99)">
              <path
                d="M19.615 3.18388C16.011 2.93788 7.984 2.93888 4.385 3.18388C0.488 3.44988 0.029 5.80388 0 11.9999C0.029 18.1849 0.484 20.5489 4.385 20.8159C7.985 21.0609 16.011 21.0619 19.615 20.8159C23.512 20.5499 23.971 18.1959 24 11.9999C23.971 5.81488 23.516 3.45088 19.615 3.18388V3.18388ZM9 15.9999V7.99988L17 11.9929L9 15.9999V15.9999Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_451_99">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
      <h1 className="mt-8 text-xl silka-semibold text-gray-900">
        Youtube Not Connected
      </h1>
      <p className="mt-4 text-[12px] text-center silka-medium text-gray-400 w-1/5">
        Connect your youtube to being posting your Disperse projects
        as videos or shorts.
      </p>
      <div className="flex flex-row space-x-5 mt-6">
        <button className="px-4 py-1.5 hover:opacity-90 rounded bg-[#363636] text-xs silka-medium text-white">
          Connect YouTube
        </button>
        <button
          onClick={() => {
            Router.push('/' + String(router.query.workspaceId) + '/');
          }}
          className="px-4 py-1.5 hover:opacity-90 rounded bg-[#FF623D] text-white silka-medium text-xs"
        >
          Dashboard
        </button>
      </div>
      <hr className="w-1/5 my-7" />
      <p className="text-[11px] silka-regular text-gray-500">
        Not sure about something?{' '}
        <a
          href={'https://trydisperse.com/contact'}
          rel="noopener noreferrer"
          target="_blank"
          className="underline underline-offset-2 hover:silka-medium hover:opacity-80"
        >
          Contact Support
        </a>
      </p>
    </div>
  );
}
