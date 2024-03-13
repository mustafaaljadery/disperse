import { DisperseLogoNormal } from '../logos/DisperseLogo';
import Router from 'next/router';

interface Props {
  status: string;
  user: any;
}

export default function WorkspaceDoesntExist({
  status,
  user,
}: Props) {
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col">
      <div className="h-full flex flex-col justify-center items-center">
        <DisperseLogoNormal />
        <p className="mt-8 text-3xl silka-semibold text-gray-900">
          Workspace doesn&apos;t exist
        </p>
        <p className="mt-4 text-[12px] text-center silka-medium text-gray-400 w-1/5">
          This workspace does not exist, double check the url you are
          accessing, or create a worksapce in your dashboard.
        </p>
        {status == 'authenticated' ? (
          <>
            <p className="mt-8 text-xs text-gray-500 silka-regular">
              You&apos;re logged in as:
            </p>
            <p className="mt-1 text-xs text-gray-500 silka-regular">
              {user.email}
            </p>
            <button
              onClick={() => {
                Router.push('/dashboard');
              }}
              className="mt-6 px-7 hover:opacity-90 rounded bg-[#FF623D] text-white silka-medium text-xs py-1.5"
            >
              My Workspaces
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              Router.push('/signin');
            }}
            className="mt-6 px-7 hover:opacity-90 rounded bg-[#FF623D] text-white silka-medium text-xs py-1.5"
          >
            Log In
          </button>
        )}
        <hr className="w-1/5 my-7" />
        <p className="text-[11px] silka-regular text-gray-500">
          Not sure about something?{' '}
          <a
            href={`https://trydisperse.com/contact`}
            rel="noopener noreferrer"
            target="_blank"
            className="underline underline-offset-2 hover:text-gray-900"
          >
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
}
