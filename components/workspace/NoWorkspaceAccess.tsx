import Router from 'next/router';
import { apiUrl } from '../../utils/apiUrl';
import {
  DisperseLogoNormal,
  DisperseLogoSmall,
} from '../logos/DisperseLogo';

interface Props {
  status: string;
  user: any;
}

// If the user is logged in, say the workspace is not available.
// If the user is not logged in, prompt them to the sign in page?

export function NoWorkspaceAccess({ status, user }: Props) {
  if (status == 'unauthenticated') {
    Router.push('/signin');
    return <></>;
  }
  return (
    <div className="flex flex-col justify-center items-center h-[100vh] w-[100vw]">
      <div className="flex flex-col justify-center items-center w-1/5">
        <DisperseLogoNormal />
        <h2></h2>
        <p className="text-center mt-8 text-gray-700 text-base silka-medium">
          You don&apos;t have access to this workspace. Please contact
          the owner of the workspace to be added as a collaborator to
          the workspace.
        </p>
        <button
          onClick={() => {
            Router.push('/dashboard');
          }}
          className="mt-6 w-2/5 bg-[#FF623D] hover:opacity-90 text-white silka-medium text-xs px-4 py-1.5 rounded"
        >
          My Workspaces
        </button>
      </div>
      <hr className="w-1/5 my-7" />
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-row space-x-1">
          <p className="text-xs text-gray-500 silka-regular">
            You&apos;re currently logged in as:
          </p>
          <p className="text-xs text-center text-gray-600 silka-regular">
            {user?.email}
          </p>
        </div>
        <p className="text-[11px] silka-regular text-gray-500 mt-3">
          Not sure about something?{' '}
          <a
            href={`${apiUrl()}contact`}
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
