import DashboardLayout from '../../../layouts/Dashboard';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { AutomationMenu } from '../../../components/automation/AutomationMenu';
import { LoadingScreen } from '../../../components/Loading';
import { ActiveWorkflows } from '../../../components/automation/ActiveWorkflows';
import { InactiveWorkflows } from '../../../components/automation/InactiveWorkflows';
import { WorkflowTemplates } from '../../../components/automation/WorkflowTemplates';
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

export default function Automation() {
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
  const [plan, setPlan] = useState('');

  useEffect(() => {
    if (router.isReady && status == 'authenticated') {
      setWorkspaceId(String(router.query.workspaceId));
      getPlan(String(router.query.workspaceId)).then((result) => {
        setPlan(result.plan);
      });
      setIsLoading(false);
    }
  }, [router.isReady, status]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <PageHead title="Automation · Disperse">
      <DashboardLayout>
        <>
          <AutomationMenu
            plan={plan}
            title="Workflows"
            isOpen={menuOpen}
            setIsOpen={setMenuOpen}
            userId={String(session?.user?.id)}
            userName={String(session?.user?.name)}
            email={String(session?.user?.email)}
            workspaceId={workspaceId}
            router={router}
            setRefetchActiveWorkflows={setRefetchActiveWorkflows}
            setRefetchInactiveWorkflows={setRefetchInactiveWorkflows}
            upgradeOpen={upgradeOpen}
            setUpgradeOpen={setUpgradeOpen}
          />
          <main className="px-3 md:px-6 lg:px-4 xl:px-32 2xl:px-44 mt-10">
            <WorkflowTemplates
              workspaceId={workspaceId}
              setMenuOpen={setMenuOpen}
              setRefetchActiveWorkflows={setRefetchActiveWorkflows}
              setRefetchInactiveWorkflows={
                setRefetchInactiveWorkflows
              }
              setUpgradeOpen={setUpgradeOpen}
              plan={plan}
            />
            <ActiveWorkflows
              workspaceId={workspaceId}
              refetchActiveWorkflows={refetchActiveWorkflows}
              setRefetchActiveWorkflows={setRefetchActiveWorkflows}
              refetchInactiveWorkflows={refetchInactiveWorkflows}
              setRefetchInactiveWorkflows={
                setRefetchInactiveWorkflows
              }
            />
            <InactiveWorkflows
              workspaceId={workspaceId}
              refetchActiveWorkflows={refetchActiveWorkflows}
              setRefetchActiveWorkflows={setRefetchActiveWorkflows}
              refetchInactiveWorkflows={refetchInactiveWorkflows}
              setRefetchInactiveWorkflows={
                setRefetchInactiveWorkflows
              }
            />
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
