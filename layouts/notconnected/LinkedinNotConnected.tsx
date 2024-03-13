import { DisperseLogoSmall } from '../../components/logos/DisperseLogo';
import Router, { useRouter } from 'next/router';

interface Props {
  status: string;
  user: any;
}

export function LinkedinNotConnected() {
  const router = useRouter();
  return (
    <div className="h-[100vh] w-[100vw] flex flex-col justify-center items-center">
      <div className="flex flex-row space-x-5">
        <DisperseLogoSmall />
        <span className="my-auto text-xs silka-medium text-gray-700">
          X
        </span>
        <div className="h-[36px] my-auto w-[36px] rounded bg-[#0966C2] flex flex-col justify-center items-center">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.98 3.5C4.98 4.881 3.87 6 2.5 6C1.13 6 0.02 4.881 0.02 3.5C0.02 2.12 1.13 1 2.5 1C3.87 1 4.98 2.12 4.98 3.5ZM5 8H0V24H5V8ZM12.982 8H8.014V24H12.983V15.601C12.983 10.931 19.012 10.549 19.012 15.601V24H24V13.869C24 5.989 15.078 6.276 12.982 10.155V8Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
      <h1 className="mt-8 text-xl silka-semibold text-gray-900">
        Linkedin Not Connected
      </h1>
      <p className="mt-4 text-[12px] text-center silka-medium text-gray-400 w-1/5">
        Connect your Linkedin to begin posting content using Disperse.
      </p>
      <div className="flex flex-row space-x-5 mt-6">
        <button className="px-4 py-1.5 hover:opacity-90 rounded bg-[#363636] text-xs silka-medium text-white">
          Connect Linkedin
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
