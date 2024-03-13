import DashboardLayout from '../../../layouts/Dashboard';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { AutomationMenu } from '../../../components/automation/AutomationMenu';
import { LoadingScreen } from '../../../components/Loading';
import { NotConnectedApps } from '../../../components/automation/NotConnected';
import { ConnectedApps } from '../../../components/automation/Conntected';
import { PageHead } from '../../../layouts/PageHead';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ProUpgradeDialog } from '../../../layouts/upgrade/ProUpgradeDialog';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../../utils/apiUrl';

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

export default function AutomationApps() {
  const [workspaceId, setWorkspaceId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [upgradeOpen, setUpgradeOpen] = useState(false);

  const [refetchActiveWorkflows, setRefetchActiveWorkflows] =
    useState(false);
  const [refetchInactiveWorkflows, setRefetchInactiveWorkflows] =
    useState(false);

  const [refetchNotConnected, setRefetchNotConnected] =
    useState(false);
  const [refetchConnected, setRefetchConnected] = useState(false);
  const [plan, setPlan] = useState('');

  useEffect(() => {
    if (router.isReady && status == 'authenticated') {
      setWorkspaceId(String(router.query.workspaceId));
      getPlan(String(router.query.workspaceId)).then((result) => {
        setPlan(result.plan);
      });
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, status]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <PageHead title="Automation Apps · Disperse">
      <DashboardLayout>
        <>
          <AutomationMenu
            plan={plan}
            title="Apps"
            userId={String(session?.user?.id)}
            userName={String(session?.user?.name)}
            email={String(session?.user?.email)}
            workspaceId={workspaceId}
            setRefetchActiveWorkflows={setRefetchActiveWorkflows}
            setRefetchInactiveWorkflows={setRefetchInactiveWorkflows}
            router={router}
            isOpen={menuOpen}
            setIsOpen={setMenuOpen}
            upgradeOpen={upgradeOpen}
            setUpgradeOpen={setUpgradeOpen}
          />
          <main className="px-3 md:px-12 lg:px-4 xl:px-32 2xl:px-44 mt-10 mb-16 md:mb-20 xl:mb-24 w-full">
            <div className="flex flex-col-reverse md:flex-row md:space-x-5 mt-8">
              <div className="w-full mt-8 md:mt-0 md:w-1/4">
                <NotConnectedApps
                  workspaceId={workspaceId}
                  refetchNotConnected={refetchNotConnected}
                  refetchConnected={refetchConnected}
                  setRefetchNotConnected={setRefetchNotConnected}
                  setRefetchConnected={setRefetchConnected}
                />
              </div>
              <div className="w-full md:w-3/4">
                <ConnectedApps
                  workspaceId={workspaceId}
                  refetchNotConnected={refetchNotConnected}
                  refetchConnected={refetchConnected}
                  setRefetchConnected={setRefetchConnected}
                  setRefetchNotConnect={setRefetchNotConnected}
                />
              </div>
            </div>
            <DialogPrimitive.Root
              open={upgradeOpen}
              onOpenChange={setUpgradeOpen}
            >
              <ProUpgradeDialog
                isOpen={upgradeOpen}
                setIsOpen={setUpgradeOpen}
                userId={String(session?.user?.id)}
                userName={String(session?.user?.name)}
                email={String(session?.user?.email)}
                workspaceId={workspaceId}
              />
            </DialogPrimitive.Root>
          </main>
        </>
      </DashboardLayout>
    </PageHead>
  );
}
