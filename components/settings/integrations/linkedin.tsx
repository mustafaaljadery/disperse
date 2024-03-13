import axios from 'axios';
import axiosRetry from 'axios-retry';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { apiUrl } from '../../../utils/apiUrl';
import { useState, Dispatch, SetStateAction } from 'react';
import { LinkedinDetails } from '../details/LinkedinDetails';
import { LinkedinConnectDialog } from '../connectdialog/linkedinconnectdialog';

interface Props {
  workspaceId: string;
  socialConnections: any;
  setRefetchConnected: Dispatch<SetStateAction<boolean>>;
}

export function LinkedinIntegration({
  workspaceId,
  socialConnections,
  setRefetchConnected,
}: Props) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [connectOpen, setConnectOpen] = useState(false);

  return (
    <div className="h-fit py-2 md:py-0 md:h-24 flex flex-col space-y-4 md:space-y-0 md:flex-row items-center justify-between px-4">
      <div className="flex flex-row justify-start items-start w-full md:w-fit space-x-3 md:space-x-5">
        <div className="h-fit p-3 md:p-0 md:h-[52px] md:w-[52px] rounded-full bg-[#0966C2] flex flex-col justify-center items-center">
          <svg
            width="24"
            height="24"
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
        <div className="flex flex-col space-y-1 my-auto">
          <p className="silka-medium">
            Linkedin{' '}
            {socialConnections?.linkedin ? (
              <span className="text-xs text-[#2E917B]">
                (Connected)
              </span>
            ) : (
              <span className="text-xs text-[#FF4040]">
                (Not Connected)
              </span>
            )}
          </p>
          <p className="silka-regualr text-xs text-[#8F8F8F]">
            Automate Linkedin posts with the Disperse/Linkedin
            Integration.
          </p>
        </div>
      </div>
      {socialConnections?.linkedin ? (
        <div>
          <DialogPrimitive.Root
            open={isDetailsOpen}
            onOpenChange={setIsDetailsOpen}
          >
            <DialogPrimitive.Trigger asChild>
              <button className="rounded bg-[#FF623D] px-4 py-1.5 hover:opacity-90 text-xs silka-semibold text-white">
                Linkedin Details
              </button>
            </DialogPrimitive.Trigger>
            <LinkedinDetails
              workspaceId={workspaceId}
              isOpen={isDetailsOpen}
              setIsOpen={setIsDetailsOpen}
              setRefetchConnected={setRefetchConnected}
            />
          </DialogPrimitive.Root>
        </div>
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
            <LinkedinConnectDialog
              isOpen={connectOpen}
              setIsOpen={setConnectOpen}
              setRefetchConnected={setRefetchConnected}
              workspaceId={workspaceId}
            />
          </DialogPrimitive.Root>
        </div>
      )}
    </div>
  );
}
