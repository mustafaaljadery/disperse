import DashboardLayout from '../../../layouts/Dashboard';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { AutomationMenu } from '../../../components/automation/AutomationMenu';
import { LoadingScreen } from '../../../components/Loading';
import { ActivityLeft } from '../../../components/automation/ActivityLeft';
import { ActivityRight } from '../../../components/automation/ActivityRight';
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

export default function AutomationActivity() {
  const [workspaceId, setWorkspaceId] = useState('');
  const [refetchActiveWorkflows, setRefetchActiveWorkflows] =
    useState(false);
  const [refetchInactiveWorkflows, setRefetchInactiveWorkflows] =
    useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [upgradeOpen, setUpgradeOpen] = useState(false);

  // Make sure that when you set selected unless it is the total, everything else the value will be the id of the workflow
  const [selected, setSelected] = useState<any>('Total');
  const router = useRouter();
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
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
    <PageHead title="Automation Activity · Disperse">
      <DashboardLayout>
        <>
          <AutomationMenu
            plan={plan}
            title="Activity"
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
          <main className="px-3 md:px-6 lg:px-2 xl:px-32 2xl:px-44 mt-12">
            <div className="flex flex-col-reverse mb-24 md:flex-row mt-6 md:space-x-12">
              <div className="w-full mt-12 md:mt-0 md:w-1/4">
                <ActivityLeft
                  workspaceId={workspaceId}
                  selected={selected}
                  setSelected={setSelected}
                />
              </div>
              <div className="w-full md:w-3/4">
                <ActivityRight
                  workspaceId={workspaceId}
                  selected={selected}
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
