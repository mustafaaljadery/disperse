import * as DialogPrimitive from '@radix-ui/react-dialog';
import { useState, Dispatch, SetStateAction } from 'react';
import { InstagramDetails } from '../details/InstagramDetails';
import { InstagramConnectDialog } from '../connectdialog/instagramconnectdialog';
import { InstagramSelectAccountDialog } from '../connectdialog/instagramselectaccount';

interface Props {
  workspaceId: string;
  socialConnections: any;
  setRefetchConnected: Dispatch<SetStateAction<boolean>>;
}

export function InstagramIntegration({
  workspaceId,
  socialConnections,
  setRefetchConnected,
}: Props) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [connectOpen, setConnectOpen] = useState(false);
  const [selectAccountOpen, setSelectAccountOpen] = useState(false);

  return (
    <div className="h-fit py-2 md:py-0 md:h-24 flex flex-col space-y-4 md:space-y-0 md:flex-row items-center justify-between px-4">
      <div className="flex flex-row justify-start items-start w-full md:w-fit space-x-3 md:space-x-5">
        <div className="h-fit p-3 md:p-0 md:h-[52px] md:w-[52px] rounded-full bg-gradient-to-tr from-[#F2A603] to-[#F604D0] flex flex-col justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="white"
              d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
            />
          </svg>
        </div>
        <div className="flex flex-col space-y-1 my-auto">
          <p className="silka-medium">
            Instagram{' '}
            {socialConnections?.instagram ? (
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
            Post media and reels content through the
            Disperse/Instagram Integration.
          </p>
        </div>
      </div>
      {socialConnections?.instagram ? (
        <div>
          <DialogPrimitive.Root
            open={isDetailsOpen}
            onOpenChange={setIsDetailsOpen}
          >
            <DialogPrimitive.Trigger asChild>
              <button className="rounded bg-[#FF623D] px-4 py-1.5 hover:opacity-90 text-xs silka-semibold text-white">
                Instagram Details
              </button>
            </DialogPrimitive.Trigger>
            <InstagramDetails
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
            <InstagramConnectDialog
              isOpen={connectOpen}
              setIsOpen={setConnectOpen}
              workspaceId={workspaceId}
              setRefetchConnected={setRefetchConnected}
              selectAccountOpen={selectAccountOpen}
              setSelectAccountOpen={setSelectAccountOpen}
            />
          </DialogPrimitive.Root>
        </div>
      )}
      <DialogPrimitive.Root
        open={selectAccountOpen}
        onOpenChange={setSelectAccountOpen}
      >
        <InstagramSelectAccountDialog
          isOpen={selectAccountOpen}
          setIsOpen={setSelectAccountOpen}
          workspaceId={workspaceId}
        />
      </DialogPrimitive.Root>
    </div>
  );
}
