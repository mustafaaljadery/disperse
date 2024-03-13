import { DisperseLogoSmall } from '../../components/logos/DisperseLogo';
import Router, { useRouter } from 'next/router';

interface Props {
  status: string;
  user: any;
}

export function TwitterNotConnected() {
  const router = useRouter();
  return (
    <div className="h-[100vh] w-[100vw] flex flex-col justify-center items-center">
      <div className="flex flex-row space-x-5">
        <DisperseLogoSmall />
        <span className="my-auto text-xs silka-medium text-gray-700">
          X
        </span>
        <div className="h-[36px] my-auto w-[36px] rounded bg-[#1D9BF0] flex flex-col justify-center items-center">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_239_60)">
              <path
                d="M24 4.55705C23.117 4.94905 22.168 5.21305 21.172 5.33205C22.189 4.72305 22.97 3.75805 23.337 2.60805C22.386 3.17205 21.332 3.58205 20.21 3.80305C19.313 2.84605 18.032 2.24805 16.616 2.24805C13.437 2.24805 11.101 5.21405 11.819 8.29305C7.728 8.08805 4.1 6.12805 1.671 3.14905C0.381 5.36205 1.002 8.25705 3.194 9.72305C2.388 9.69705 1.628 9.47605 0.965 9.10705C0.911 11.388 2.546 13.522 4.914 13.997C4.221 14.185 3.462 14.229 2.69 14.081C3.316 16.037 5.134 17.46 7.29 17.5C5.22 19.123 2.612 19.848 0 19.54C2.179 20.937 4.768 21.752 7.548 21.752C16.69 21.752 21.855 14.031 21.543 7.10605C22.505 6.41105 23.34 5.54405 24 4.55705V4.55705Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_239_60">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
      <h1 className="mt-8 text-xl silka-semibold text-gray-900">
        Twitter Not Connected
      </h1>
      <p className="mt-4 text-[12px] text-center silka-medium text-gray-400 w-1/5">
        Connect your twitter to begin automating content using
        Disperse.
      </p>
      <div className="flex flex-row space-x-5 mt-6">
        <button className="px-4 py-1.5 hover:opacity-90 rounded bg-[#363636] text-xs silka-medium text-white">
          Connect Twitter
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
