import { DisperseLogoSmall } from '../../components/logos/DisperseLogo';
import Router, { useRouter } from 'next/router';

interface Props {
  status: string;
  user: any;
}

export function FacebookNotConnected() {
  const router = useRouter();
  return (
    <div className="h-[100vh] w-[100vw] flex flex-col justify-center items-center">
      <div className="flex flex-row space-x-5">
        <DisperseLogoSmall />
        <span className="my-auto text-xs silka-medium text-gray-700">
          X
        </span>
        <div className="h-[36px] my-auto w-[36px] rounded bg-[#0D8EF1] flex flex-col justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              fill="white"
              d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
            />
          </svg>
        </div>
      </div>
      <h1 className="mt-8 text-xl silka-semibold text-gray-900">
        Facebook Not Connected
      </h1>
      <p className="mt-4 text-[12px] text-center silka-medium text-gray-400 w-1/5">
        Connect your facebook to begin posting clips.
      </p>
      <div className="flex flex-row space-x-5 mt-6">
        <button className="px-4 py-1.5 hover:opacity-90 rounded bg-[#363636] text-xs silka-medium text-white">
          Connect Facebook
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
