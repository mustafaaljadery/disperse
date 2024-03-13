import Link from 'next/link';
import { useRouter } from 'next/router';

interface NavItemProps {
  url: string;
  title: string;
}

interface Props {
  navItems: NavItemProps[];
}

interface SingleNavItemProps {
  url: string;
  title: string;
  pathname: string;
}

export function NavItem({
  url,
  title,
  pathname,
}: SingleNavItemProps) {
  return (
    (<Link
      href={url}
      className={
        'silka-medium hover:bg-gray-100 rounded py-1 px-3 ' +
        (pathname == url
          ? 'underline underline-offset-[21px] decoration-2 decoration-[#FF623D] text-[#353535]'
          : 'text-[#848484]')
      }>

      {title}

    </Link>)
  );
}

export function DashboardNavbarLayout({ navItems }: Props) {
  const { pathname } = useRouter();
  return (
    <div className="w-full flex flex-col space-y-[12px] mt-7">
      <div className="flex text-sm flex-row space-x-2 z-10 px-5">
        {navItems.map((nav) => {
          return (
            <div key={nav.title}>
              <NavItem
                url={nav.url}
                title={nav.title}
                pathname={pathname}
              />
            </div>
          );
        })}
      </div>
      <hr className="border-[#E5E7Eb]" />
    </div>
  );
}
