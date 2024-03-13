import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Share } from './Share';
import { UserMenu } from './UserMenu';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { DisperseLogoTiny } from '../logos/DisperseLogo';
import { RightCaretDashboard } from '../icons/RightCaret';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../utils/apiUrl';
import { MobileSidebar } from '../sidebar/MobileSidebar';
import { NewMediaDialog } from '../sidebar/dialog/NewMedia';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { useDisclosure } from '@chakra-ui/react';
import { SearchDialog } from '../sidebar/dialog/Search';
import { CreateProject } from '../sidebar/SidebarMediaMobile';

async function getPlan(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(`${apiUrl()}workspace/read/plan`, {
      params: {
        workspaceId: workspaceId,
      },
    });
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

export function Topbar() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState<any>(null);
  const router = useRouter();
  const pathnames = router.pathname.split('/').slice(1);

  // Sidebar Stuff
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newMediaOpen, setNewMediaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [projects, setProjects] = useState<any>(null);
  const [createProjectOpen, setCreateProjectOpen] = useState(false);

  useEffect(() => {
    if (status == 'authenticated' && router.isReady) {
      getPlan(String(router.query.workspaceId)).then((value) => {
        setPlan(value.plan);
      });
      setLoading(false);
    }
  }, [status, router.isReady]);

  return (
    <div className="w-full flex flex-col items-end">
      <div className="w-full flex flex-row justify-between items-between py-4 px-3 md:px-8">
        <div className="flex flex-row space-x-4">
          <MobileSidebar
            workspaceId={String(router?.query.workspaceId)}
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            newMediaOpen={newMediaOpen}
            setNewMediaOpen={setNewMediaOpen}
            searchOpen={searchOpen}
            setSearchOpen={setSearchOpen}
            pathname={String(router.query.mediaId)}
            projects={projects}
            setProjects={setProjects}
            createProjectOpen={createProjectOpen}
            setCreateProjectOpen={setCreateProjectOpen}
            loading={loading}
            completePath={String(router.pathname)}
          />
          <div className="hidden md:visible md:flex md:flex-row md:space-x-4">
            <DisperseLogoTiny />
            <RightCaretDashboard />
            {loading ? (
              <div className="w-16 h-3.5 rounded my-auto bg-gray-200 animate-pulse" />
            ) : (
              <>
                {pathnames
                  .slice(0, -1)
                  .map((path: any, index: number) => {
                    return (
                      <>
                        <p
                          key={index}
                          className="silka-medium text-xs text-[#969696] my-auto"
                        >
                          {path == '[workspaceId]'
                            ? 'Dashboard'
                            : path == '[mediaId]'
                            ? 'Media'
                            : path.charAt(0).toUpperCase() +
                              path.slice(1)}
                        </p>
                        <RightCaretDashboard />
                      </>
                    );
                  })}
              </>
            )}
            <p className="silka-medium text-xs text-[#FF623D] my-auto">
              {pathnames[pathnames.length - 1] == '[workspaceId]'
                ? 'Dashboard'
                : pathnames[pathnames.length - 1] == '[mediaId]'
                ? 'Media'
                : pathnames[pathnames.length - 1]
                    .charAt(0)
                    .toUpperCase() +
                  pathnames[pathnames.length - 1].slice(1)}
            </p>
          </div>
        </div>
        <div className="flex flex-row space-x-4 lg:space-x-4">
          {plan == 'STARTER' ? (
            <Link
              href={
                '/' + router.query.workspaceId + '/settings/plans'
              }
              className="underline text-[10px] lg:text-xs my-auto underline-offset-2 silka-medium text-[#FF623D]"
            >
              Upgrade
            </Link>
          ) : (
            <></>
          )}
          <Share
            workspaceId={String(router.query.workspaceId)}
            userId={String(session?.user.id)}
          />
          <div className="flex flex-row py-1 px-2 hover:bg-gray-100 rounded-lg">
            <UserMenu
              image={String(session?.user.image)}
              email={String(session?.user.email)}
              name={String(session?.user.name)}
              workspaceId={String(router.query.workspaceId)}
              loading={loading}
            />
          </div>
        </div>
      </div>
      <DialogPrimitive.Root
        open={newMediaOpen}
        onOpenChange={(e) => {
          setNewMediaOpen(!newMediaOpen);
        }}
      >
        <NewMediaDialog
          newMediaOpen={newMediaOpen}
          setNewMediaOpen={setNewMediaOpen}
          workspaceId={String(router?.query.workspaceId)}
        />
      </DialogPrimitive.Root>
      <DialogPrimitive.Root
        open={searchOpen}
        onOpenChange={setSearchOpen}
      >
        <SearchDialog
          searchOpen={searchOpen}
          workspaceId={String(router.query.workspaceId)}
        />
      </DialogPrimitive.Root>
      <DialogPrimitive.Root
        open={createProjectOpen}
        onOpenChange={setCreateProjectOpen}
      >
        <CreateProject
          projects={projects}
          setProjects={setProjects}
          workspaceName={String(router.query.workspaceId)}
          createProjectOpen={createProjectOpen}
          setCreateProjectOpen={setCreateProjectOpen}
        />
      </DialogPrimitive.Root>
    </div>
  );
}
