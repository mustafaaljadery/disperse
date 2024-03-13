import Link from 'next/link';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Dispatch, SetStateAction } from 'react';
import { NewWorkflowDialog } from './NewWorkflowDialog';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  workspaceId: string;
  userId: string;
  userName: string;
  email: string;
  router: any;
  title: string;
  setRefetchActiveWorkflows: Dispatch<SetStateAction<boolean>>;
  setRefetchInactiveWorkflows: Dispatch<SetStateAction<boolean>>;
  upgradeOpen: boolean;
  setUpgradeOpen: Dispatch<SetStateAction<boolean>>;
  plan: string;
}

export function AutomationMenu({
  title,
  isOpen,
  setIsOpen,
  router,
  userId,
  userName,
  email,
  workspaceId,
  setRefetchActiveWorkflows,
  setRefetchInactiveWorkflows,
  upgradeOpen,
  setUpgradeOpen,
  plan,
}: Props) {
  return (
    <header className="flex flex-col mt-4 md:mt-6 sm:px-1 md:px-6 lg:px-1 xl:px-24 2xl:px-32">
      <div className="flex flex-col space-y-6 px-2 md:px-2 lg:px-4 xl:px-6 2xl:px-8">
        <div className="flex flex-row my-auto justify-between items-between">
          <h2 className="silka-semibold my-auto text-2xl md:text-3xl">
            {title}
          </h2>
          <div className="flex-1" />
          <DialogPrimitive.Root
            open={isOpen}
            onOpenChange={setIsOpen}
          >
            <DialogPrimitive.Trigger asChild>
              <button className="hover:opacity-90 py-1 md:py-1.5 my-auto h-fit px-4 md:px-5 bg-[#363636] border border-[#808080] rounded text-white silka-medium text-[11px] md:text-xs">
                Create Workflow
              </button>
            </DialogPrimitive.Trigger>
            <NewWorkflowDialog
              plan={plan}
              userId={userId}
              workspaceId={workspaceId}
              setUpgradeOpen={setUpgradeOpen}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              setRefetchActiveWorkflows={setRefetchActiveWorkflows}
              setRefetchInactiveWorkflows={
                setRefetchInactiveWorkflows
              }
            />
          </DialogPrimitive.Root>
        </div>
        <div className="flex flex-row space-x-2">
          <Link
            href={'/' + workspaceId + '/automation'}
            className={
              'hover:bg-gray-100 rounded py-1 px-3 text-xs md:text-sm ' +
              (router.pathname == '/[workspaceId]/automation'
                ? 'silka-semibold underline underline-offset-[21px] z-10 decoration-2 decoration-[#FF623D] text-[#353535]'
                : 'text-[#848484] silka-medium')
            }
          >
            Workflows
          </Link>
          <Link
            href={'/' + workspaceId + '/automation/activity'}
            className={
              'hover:bg-gray-100 rounded py-1 px-3 text-xs md:text-sm ' +
              (router.pathname == '/[workspaceId]/automation/activity'
                ? 'silka-semibold underline underline-offset-[21px] z-10 decoration-2 decoration-[#FF623D] text-[#353535]'
                : 'text-[#848484] silka-medium')
            }
          >
            Activity
          </Link>
          <Link
            href={'/' + workspaceId + '/automation/apps'}
            className={
              'hover:bg-gray-100 rounded py-1 px-3 text-xs md:text-sm ' +
              (router.pathname == '/[workspaceId]/automation/apps'
                ? 'silka-semibold underline underline-offset-[21px] z-10 decoration-2 decoration-[#FF623D] text-[#353535]'
                : 'text-[#848484] silka-medium')
            }
          >
            My Apps
          </Link>
        </div>
      </div>
      <hr className="w-full mt-3" />
    </header>
  );
}
