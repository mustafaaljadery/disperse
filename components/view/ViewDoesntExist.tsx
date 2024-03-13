import { DisperseLogoNormal } from '../logos/DisperseLogo';
import Link from 'next/link';

export function ViewDoesntExist() {
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col">
      <div className="h-full flex flex-col justify-center items-center">
        <DisperseLogoNormal />
        <p className="mt-8 text-3xl silka-semibold text-gray-900">
          Media Not Found
        </p>
        <p className="mt-4 text-[12px] text-center silka-medium text-gray-400 w-1/5">
          This file does not exist, ask the owner to verify the link.
        </p>
        <Link href="/" legacyBehavior>
          <button className="mt-6 text-xs silka-medium text-white bg-[#FF623D] hover:opacity-90 px-4 py-1.5 rounded">
            Return to Disperse
          </button>
        </Link>
      </div>
    </div>
  );
}
