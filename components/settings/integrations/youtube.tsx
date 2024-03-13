import * as DialogPrimitive from '@radix-ui/react-dialog';
import { useState, Dispatch, SetStateAction } from 'react';
import { YoutubeDetails } from '../details/YoutubeDetails';
import { YoutubeConnectDialog } from '../connectdialog/youtubeconnectdialog';

interface Props {
  workspaceId: string;
  socialConnections: any;
  setRefetchConnected: Dispatch<SetStateAction<boolean>>;
}

export function YoutubeIntegration({
  workspaceId,
  socialConnections,
  setRefetchConnected,
}: Props) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [connectOpen, setConnectOpen] = useState(false);

  return (
    <div className="h-fit py-2 md:py-0 md:h-24 flex flex-col space-y-4 md:space-y-0 md:flex-row items-center justify-between px-4">
      <div className="flex flex-row justify-start items-start w-full md:w-fit space-x-3 md:space-x-5">
        <div className="h-fit p-3 md:p-0 md:h-[52px] md:w-[52px] rounded-full bg-[#FF0000] flex flex-col justify-center items-center">
          <svg
            width="24"
            height="24"
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
        <div className="flex flex-col space-y-1 my-auto">
          <p className="silka-medium">
            Youtube{' '}
            {socialConnections?.youtube ? (
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
            Upload Youtube video, shorts, and track video analytics
            through the Disperse/Youtube Integration.
          </p>
        </div>
      </div>
      {socialConnections?.youtube ? (
        <div>
          <DialogPrimitive.Root
            open={isDetailsOpen}
            onOpenChange={setIsDetailsOpen}
          >
            <DialogPrimitive.Trigger asChild>
              <button className="rounded bg-[#FF623D] px-4 py-1.5 hover:opacity-90 text-xs silka-semibold text-white">
                Youtube Details
              </button>
            </DialogPrimitive.Trigger>
            <YoutubeDetails
              workspaceId={workspaceId}
              isOpen={isDetailsOpen}
              setIsOpen={setIsDetailsOpen}
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
            <YoutubeConnectDialog
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
