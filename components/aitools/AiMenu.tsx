import Link from 'next/link';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { useState, Dispatch, SetStateAction } from 'react';

interface Props {
  title: string;
  workspaceId: string;
  userId: string;
  router: any;
}

export function AiMenu({
  title,
  workspaceId,
  userId,
  router,
}: Props) {
  return (
    <header className="flex flex-col mt-6 px-36">
      <div className="flex flex-col space-y-6 px-8">
        <div className="flex flex-row">
          <h2 className="silka-semibold text-3xl">{title}</h2>
          <div className="flex-1" />
        </div>
        <div className="flex flex-row space-x-2">
          <Link
            href={'/' + workspaceId + '/automation'}
            className={
              'hover:bg-gray-100 rounded py-1 px-3 text-sm ' +
              (router.pathname == '/[workspaceId]/automation'
                ? 'silka-semibold underline underline-offset-[21px] z-10 decoration-2 decoration-[#FF623D] text-[#353535]'
                : 'text-[#848484] silka-medium')
            }>
            
              Audio
            
          </Link>
          <Link
            href={'/' + workspaceId + '/automation/activity'}
            className={
              'hover:bg-gray-100 rounded py-1 px-3 text-sm ' +
              (router.pathname ==
              '/[workspaceId]/automation/activity'
                ? 'silka-semibold underline underline-offset-[21px] z-10 decoration-2 decoration-[#FF623D] text-[#353535]'
                : 'text-[#848484] silka-medium')
            }>
            
              Video
            
          </Link>
          <Link
            href={'/' + workspaceId + '/automation/apps'}
            className={
              'hover:bg-gray-100 rounded py-1 px-3 text-sm ' +
              (router.pathname == '/[workspaceId]/automation/apps'
                ? 'silka-semibold underline underline-offset-[21px] z-10 decoration-2 decoration-[#FF623D] text-[#353535]'
                : 'text-[#848484] silka-medium')
            }>
            
              Image
            
          </Link>
        </div>
      </div>
      <hr className="w-full mt-3" />
    </header>
  );
}
