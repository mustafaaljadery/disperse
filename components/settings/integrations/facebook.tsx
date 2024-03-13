import * as DialogPrimitive from '@radix-ui/react-dialog';
import { useState, Dispatch, SetStateAction } from 'react';
import { FacebookDetails } from '../details/FacebookDetails';
import { FacebookConnectDialog } from '../connectdialog/facebookconnectdialog';
import { FacebookSelectAccountDialog } from '../connectdialog/facebookselectaccount';

interface Props {
  workspaceId: string;
  socialConnections: any;
  setRefetchConnected: Dispatch<SetStateAction<boolean>>;
}

export function FacebookIntegration({
  workspaceId,
  socialConnections,
  setRefetchConnected,
}: Props) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [connectOpen, setConnectOpen] = useState(false);
  const [selectAccountOpen, setSelectAccountOpen] = useState(false);

  return (
    <div className="h-fit py-2 md:py-0 md:h-24 flex flex-col space-y-4 md:space-y-0 md:flex-row items-center justify-between px-4">
      <div className="flex flex-row justify-start item-start w-full md:w-fit space-x-3 md:space-x-5">
        <div className="h-fit p-3 md:p-0 md:h-[52px] md:w-[52px] rounded-full bg-[#097EEC] flex flex-col justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="white"
              d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
            />
          </svg>
        </div>
        <div className="flex flex-col space-y-1 my-auto">
          <p className="silka-medium">
            Facebook{' '}
            {socialConnections?.facebook ? (
              <span className="text-xs text-[#2E917B]">
                (Connected)
              </span>
            ) : (
              <span className="text-xs text-[#FF4040]">
                (Not Connected)
              </span>
            )}
          </p>
          <p className="silak-regular text-xs text-[#8F8F8F]">
            Schedule and post vidoes and other content through the
            Disperse/Facebook Integration.
          </p>
        </div>
      </div>
      {socialConnections?.facebook ? (
        <DialogPrimitive.Root
          open={isDetailsOpen}
          onOpenChange={setIsDetailsOpen}
        >
          <DialogPrimitive.Trigger asChild>
            <button className="rounded px-4 py-1.5 bg-[#FF623D] hover:opacity-90 text-xs silka-semibold text-white">
              Facebook Details
            </button>
          </DialogPrimitive.Trigger>
          <FacebookDetails
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
              <button className="rounded px-4 py-1.5 bg-[#FF623D] hover:opacity-90 text-xs silka-semibold text-white">
                Connect
              </button>
            </DialogPrimitive.Trigger>
            <FacebookConnectDialog
              isOpen={connectOpen}
              setIsOpen={setConnectOpen}
              setRefetchConnected={setRefetchConnected}
              workspaceId={workspaceId}
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
        <FacebookSelectAccountDialog
          isOpen={selectAccountOpen}
          setIsOpen={setSelectAccountOpen}
          workspaceId={workspaceId}
        />
      </DialogPrimitive.Root>
    </div>
  );
}
