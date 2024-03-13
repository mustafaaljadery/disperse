import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { LoadingScreen } from '../components/Loading';
import { DisperseLogoNormal } from '../components/logos/DisperseLogo';

export function WorkspaceAccess() {
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession();

  // TODO: You ahve to find the name of the user that owns the workspace.

  useEffect(() => {
    if (status == 'authenticated') {
      setIsLoading(false);
    }
  }, [status]);

  if (isLoading) {
    <LoadingScreen />;
  }

  return (
    <div className="flex flex-col justify-center items-center h-[100vh] w-[100vw]">
      <DisperseLogoNormal />
      <p className="mt-12 text-lg w-1/3 text-center silka-medium text-[#444444]">
        This workspace is owned by Mustafa Aljadery. Contact the owner
        directly to be added to the workspace as a collaborator.
      </p>
      <a
        href="/dashboard"
        className="mt-6 hover:opacity-90 px-6 text-sm py-1.5 silka-medium text-white rounded border border-[#FF4317] bg-[#FF623D]"
      >
        My Workspaces
      </a>
      <hr className="w-1/3 my-8" />
      <p className="silka-regular text-sm text-[#737373]">
        You are signed in as{' '}
        <span className="silka-medium">{session?.user.email}</span>
      </p>
      <p className="silka-regular text-sm text-[#737373] mt-4">
        Need Help?{' '}
        <a href="/contact" className="underline underline-offset-2">
          Contact Support
        </a>
      </p>
    </div>
  );
}
