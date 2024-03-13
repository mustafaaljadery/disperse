import axios from 'axios';
import axiosRetry from 'axios-retry';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { apiUrl } from '../../../utils/apiUrl';
import { useState } from 'react';
import { TwitterDetails } from '../details/TwitterDetails';
import { TwitterConnectDialog } from '../connectdialog/twitterconnectdialog';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  workspaceId: string;
  socialConnections: any;
  setRefetchConnected: Dispatch<SetStateAction<boolean>>;
}

export function TwitterIntegration({
  workspaceId,
  socialConnections,
  setRefetchConnected,
}: Props) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [connectOpen, setConnectOpen] = useState(false);

  return (
    <div className="h-fit py-2 md:py-0 md:h-24 flex flex-col space-y-4 md:space-y-0 md:flex-row items-center justify-between px-4">
      <div className="flex flex-row space-x-3 md:space-x-5 w-full md:w-fit justify-start items-start">
        <div className="h-fit p-3 md:p-0 md:h-[52px] md:w-[52px] rounded-full bg-[#1D9BF0] flex flex-col justify-center items-center">
          <svg
            width="24"
            height="24"
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
        <div className="flex flex-col space-y-1 my-auto">
          <p className="silka-medium">
            Twitter{' '}
            {socialConnections?.twitter ? (
              <span className="text-xs text-[#2E917B]">
                (Connected)
              </span>
            ) : (
              <span className="text-xs text-[#FF4040]">
                (Not Connected)
              </span>
            )}
          </p>
          <p className="silka-regular text-xs text-[#8F8F8F]">
            Automate and optimize your Twitter content with the
            Disperse/Twitter Integration.
          </p>
        </div>
      </div>
      {socialConnections?.twitter ? (
        <DialogPrimitive.Root
          open={isDetailsOpen}
          onOpenChange={setIsDetailsOpen}
        >
          <DialogPrimitive.Trigger asChild>
            <button className="rounded bg-[#FF623D] px-4 py-1.5 hover:opacity-90 text-xs silka-semibold text-white">
              Twitter Details
            </button>
          </DialogPrimitive.Trigger>
          <TwitterDetails
            workspaceId={workspaceId}
            isOpen={isDetailsOpen}
            setIsOpen={setIsDetailsOpen}
            setRefetchConnected={setRefetchConnected}
          />
        </DialogPrimitive.Root>
      ) : (
        <div>
          <DialogPrimitive.Root
            open={connectOpen}
            onOpenChange={setConnectOpen}
          >
            <DialogPrimitive.Trigger asChild>
              <button className="rounded bg-[#FF623D] px-4 py-1.5 hover:opacity-90 text-xs silka-semibold text-white">
                Connect
              </button>
            </DialogPrimitive.Trigger>
            <TwitterConnectDialog
              isOpen={connectOpen}
              setIsOpen={setConnectOpen}
              workspaceId={workspaceId}
              setRefetchConnected={setRefetchConnected}
            />
          </DialogPrimitive.Root>
        </div>
      )}
    </div>
  );
}
