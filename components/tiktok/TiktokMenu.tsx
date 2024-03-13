import Link from 'next/link';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { useState } from 'react';

interface Props {
  workspaceId: string;
  router: any;
  title: string;
}

export function TiktokMenu({ title, router, workspaceId }: Props) {
  return (
    <header className="flex flex-col mt-6 sm:px-1 md:px-6 lg:px-1 xl:px-24 2xl:px-32">
      <div className="flex flex-col space-y-6 px-2 md:px-2 lg:px-4 xl:px-6 2xl:px-8">
        <div className="flex flex-row justify-between items-between">
          <h2 className="silka-semibold text-2xl md:text-3xl">
            {title}
          </h2>
          <div className="flex-1" />
          <Link href={'/' + workspaceId + '/tiktok/videos'} legacyBehavior>
            <button className="hover:opacity-90 py-1 md:py-1.5 my-auto h-fit px-4 md:px-5 bg-[#363636] border border-[#808080] rounded text-white silka-medium text-[11px] md:text-xs">
              Create Video
            </button>
          </Link>
        </div>
        <div className="flex flex-row space-x-2">
          <Link
            href={'/' + workspaceId + '/tiktok'}
            className={
              'hover:bg-gray-100 rounded py-1 px-3 text-xs md:text-sm ' +
              (router.pathname == '/[workspaceId]/tiktok'
                ? 'silka-semibold underline underline-offset-[21px] z-10 decoration-2 decoration-[#363636] text-[#353535]'
                : 'text-[#848484] silka-medium')
            }>
            
              Overview
            
          </Link>
          <Link
            href={'/' + workspaceId + '/tiktok/videos'}
            className={
              'hover:bg-gray-100 rounded py-1 px-3 text-xs md:text-sm ' +
              (router.pathname == '/[workspaceId]/tiktok/videos'
                ? 'silka-semibold underline underline-offset-[21px] z-10 decoration-2 decoration-[#363636] text-[#353535]'
                : 'text-[#848484] silka-medium')
            }>
            
              Videos
            
          </Link>
          <Link
            href={'/' + workspaceId + '/tiktok/analytics'}
            className={
              'hover:bg-gray-100 rounded py-1 px-3 text-xs md:text-sm ' +
              (router.pathname == '/[workspaceId]/tiktok/analytics'
                ? 'silka-semibold underline underline-offset-[21px] z-10 decoration-2 decoration-[#363636] text-[#353535]'
                : 'text-[#848484] silka-medium')
            }>
            
              Analytics
            
          </Link>
          <Link
            href={'/' + workspaceId + '/tiktok/trends'}
            className={
              'hover:bg-gray-100 rounded py-1 px-3 text-xs md:text-sm ' +
              (router.pathname == '/[workspaceId]/tiktok/trends'
                ? 'silka-semibold underline underline-offset-[21px] z-10 decoration-2 decoration-[#363636] text-[#353535]'
                : 'text-[#848484] silka-medium')
            }>
            
              Trends
            
          </Link>
        </div>
      </div>
      <hr className="w-full mt-3" />
    </header>
  );
}
