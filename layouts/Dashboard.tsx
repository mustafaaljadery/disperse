import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { Sidebar } from '../components/sidebar/SideBar';
import { Topbar } from '../components/dashboard/Topbar';
import React from 'react';

export default function DashboardLayout({
  children,
}: React.PropsWithChildren<{}>) {
  const router = useRouter();
  const { data: session, status } = useSession();
  if (status === 'unauthenticated') {
    router.push('/signin');
  }

  return (
    <div className="flex w-full">
      <div className="hidden lg:flex">
        <Sidebar />
      </div>
      <div className="lg:ml-[16rem] xl:ml-[17rem] w-full flex-1">
        <Topbar />
        <div className="px-2 md:px-4 xl:px-8">{children}</div>
      </div>
    </div>
  );
}
