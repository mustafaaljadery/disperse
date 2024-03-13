import Link from 'next/link';

interface Props {
  workspaceId: string;
  router: any;
  title: string;
}

export function SettingsMenu({ title, router, workspaceId }: Props) {
  return (
    <header className="flex flex-col mt-6 sm:px-1 md:px-6 lg:px-1 xl:px-24 2xl:px-32">
      <div className="flex flex-col space-y-6 px-2 md:px-2 lg:px-4 xl:px-6 2xl:px-8">
        <div className="flex flex-row justify-between items-between">
          <h2 className="silka-semibold text-2xl md:text-3xl">
            {title}
          </h2>
          <div className="flex flex-row space-x-5"></div>
        </div>
        <div className="flex flex-row space-x-0.5 md:space-x-2">
          <Link
            href={'/' + workspaceId + '/settings'}
            className={
              'hover:bg-gray-100 rounded py-1 px-2 md:px-3 text-xs md:text-sm ' +
              (router.pathname == '/[workspaceId]/settings'
                ? 'silka-semibold underline underline-offset-[21px] z-10 decoration-2 decoration-[#FF623D] text-[#353535]'
                : 'text-[#848484] silka-medium')
            }>
            
              General
            
          </Link>
          <Link
            href={'/' + workspaceId + '/settings/usage'}
            className={
              'hover:bg-gray-100 rounded py-1 px-2 md:px-3 text-xs md:text-sm ' +
              (router.pathname == '/[workspaceId]/settings/usage'
                ? 'silka-semibold underline underline-offset-[21px] z-10 decoration-2 decoration-[#FF623D] text-[#353535]'
                : 'text-[#848484] silka-medium')
            }>
            
              Usage
            
          </Link>
          <Link
            href={'/' + workspaceId + '/settings/members'}
            className={
              'hover:bg-gray-100 rounded py-1 px-2 md:px-3 text-xs md:text-sm ' +
              (router.pathname == '/[workspaceId]/settings/members'
                ? 'silka-semibold underline underline-offset-[21px] z-10 decoration-2 decoration-[#FF623D] text-[#353535]'
                : 'text-[#848484] silka-medium')
            }>
            
              Members
            
          </Link>
          <Link
            href={'/' + workspaceId + '/settings/integrations'}
            className={
              'hover:bg-gray-100 rounded py-1 px-2 md:px-3 text-xs md:text-sm ' +
              (router.pathname ==
              '/[workspaceId]/settings/integrations'
                ? 'silka-semibold underline underline-offset-[21px] z-10 decoration-2 decoration-[#FF623D] text-[#353535]'
                : 'text-[#848484] silka-medium')
            }>
            
              Integrations
            
          </Link>
          <Link
            href={'/' + workspaceId + '/settings/plans'}
            className={
              'hover:bg-gray-100 rounded py-1 px-2 md:px-3 text-xs md:text-sm ' +
              (router.pathname == '/[workspaceId]/settings/plans'
                ? 'silka-semibold underline underline-offset-[21px] z-10 decoration-2 decoration-[#FF623D] text-[#353535]'
                : 'text-[#848484] silka-medium')
            }>
            
              Plans
            
          </Link>
        </div>
      </div>
      <hr className="w-full mt-3" />
    </header>
  );
}
