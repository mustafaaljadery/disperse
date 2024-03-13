import * as DialogPrimitive from '@radix-ui/react-dialog';
import { useState, Dispatch, SetStateAction } from 'react';
import { TiktokDetails } from '../details/TiktokDetails';
import { TiktokConnectDialog } from '../connectdialog/tiktokconnectdialog';

interface Props {
  workspaceId: string;
  socialConnections: any;
  setRefetchConnected: Dispatch<SetStateAction<boolean>>;
}

export function TiktokIntegration({
  workspaceId,
  socialConnections,
  setRefetchConnected,
}: Props) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [connectOpen, setConnectOpen] = useState(false);

  return (
    <div className="h-fit py-2 md:py-0 md:h-24 flex flex-col space-y-4 md:space-y-0 md:flex-row items-center justify-between px-4">
      <div className="flex flex-row justify-start items-start w-full md:w-fit space-x-3 md:space-x-5">
        <div className="h-fit p-3 md:p-0 md:h-[52px] md:w-[52px] rounded-full bg-black flex flex-col justify-center items-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.66908 9.46756V8.54289C9.34821 8.49732 9.02445 8.47387 8.70042 8.47229C4.73648 8.47229 1.51147 11.6978 1.51147 15.6618C1.51147 18.0933 2.72671 20.2458 4.58052 21.5475C3.3392 20.22 2.649 18.4703 2.65005 16.6528C2.65005 12.7452 5.78338 9.55871 9.66908 9.46756Z"
              fill="#00F2EA"
            />
            <path
              d="M9.83876 19.9358C11.6075 19.9358 13.0501 18.5288 13.1159 16.7753L13.122 1.12264H15.9816C15.9205 0.795718 15.8897 0.46405 15.8894 0.131592H11.9837L11.9771 15.7848C11.912 17.5377 10.4686 18.9442 8.70044 18.9442C8.16962 18.9445 7.64669 18.8151 7.17725 18.5672C7.79237 19.4255 8.7829 19.9347 9.83876 19.9358ZM21.3231 6.43591V5.56604C20.2722 5.5671 19.2437 5.26125 18.3641 4.68643C19.1355 5.57447 20.1737 6.18828 21.3236 6.43591"
              fill="#00F2EA"
            />
            <path
              d="M18.3641 4.68561C17.5021 3.6993 17.0271 2.43349 17.0277 1.12341H15.9813C16.255 2.58654 17.1162 3.87396 18.3641 4.68561ZM8.7004 12.378C6.88795 12.3801 5.41928 13.8488 5.41718 15.6612C5.41823 16.8815 6.09579 18.0005 7.17667 18.5675C6.77282 18.0105 6.55549 17.3406 6.55549 16.6528C6.55733 14.8403 8.026 13.3712 9.83871 13.369C10.177 13.369 10.5013 13.4249 10.8074 13.521V9.53366C10.4865 9.48808 10.1627 9.46464 9.83871 9.46305C9.78181 9.46305 9.7257 9.46622 9.66932 9.46727V12.53C9.35583 12.4304 9.02917 12.379 8.7004 12.378Z"
              fill="#FF004F"
            />
            <path
              d="M21.3231 6.43597V9.47156C19.2975 9.47156 17.4215 8.82377 15.8891 7.72418V15.6616C15.8891 19.6255 12.6647 22.8505 8.70071 22.8505C7.16882 22.8505 5.74837 22.3671 4.58081 21.5473C5.93778 23.0107 7.84322 23.8421 9.83876 23.8415C13.8027 23.8415 17.0277 20.6165 17.0277 16.6531V8.71576C18.6107 9.85407 20.5119 10.4655 22.4616 10.4631V6.55636C22.0707 6.55636 21.6905 6.51395 21.3228 6.43518"
              fill="#FF004F"
            />
            <path
              d="M15.8888 15.6612V7.72384C17.4718 8.86242 19.373 9.47359 21.3227 9.47122V6.43589C20.1731 6.188 19.1349 5.57393 18.3638 4.68561C17.1159 3.87396 16.2547 2.58654 15.981 1.12341H13.1217L13.1156 16.7761C13.05 18.529 11.6072 19.936 9.83844 19.936C8.78285 19.935 7.79206 19.4255 7.1772 18.5677C6.09631 18.0011 5.41849 16.882 5.41717 15.6615C5.41928 13.849 6.88794 12.3804 8.70039 12.3783C9.03812 12.3783 9.36241 12.4336 9.66905 12.5303V9.46753C5.78335 9.55868 2.65002 12.7452 2.65002 16.6528C2.65002 18.5424 3.38422 20.2627 4.58049 21.5475C5.78651 22.3965 7.22567 22.8515 8.70039 22.8502C12.6646 22.8502 15.8888 19.6252 15.8888 15.6612Z"
              fill="white"
            />
          </svg>
        </div>
        <div className="flex flex-col space-y-1 my-auto">
          <p className="silka-medium">
            TikTok{' '}
            {socialConnections?.tiktok ? (
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
            Automate TikTok content and track media analytics through
            the Disperse/TikTok Integration.
          </p>
        </div>
      </div>
      {socialConnections?.tiktok ? (
        <div>
          <DialogPrimitive.Root
            open={isDetailsOpen}
            onOpenChange={setIsDetailsOpen}
          >
            <DialogPrimitive.Trigger asChild>
              <button className="rounded bg-[#FF623D] px-4 py-1.5 hover:opacity-90 text-xs silka-semibold text-white">
                Tiktok Details
              </button>
            </DialogPrimitive.Trigger>
            <TiktokDetails
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
            <TiktokConnectDialog
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
