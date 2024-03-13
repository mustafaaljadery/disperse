import DashboardLayout from '../../../layouts/Dashboard';
import { SecureFacebook } from '../../../layouts/secure/SecureFacebook';
import { FacebookMenu } from '../../../components/facebook/FacebookMenu';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { PageHead } from '../../../layouts/PageHead';
import { FacebookHeaderProfile } from '../../../components/facebook/FacebookHeaderProfile';
import { FacebookScheduledPosts } from '../../../components/facebook/FacebookScheduledPosts';

export default function FacebookOverview() {
  const [workspaceId, setWorkspaceId] = useState('');
  const [secureLoading, setSecureLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const router = useRouter();

  return (
    <PageHead title="Facebook · Disperse">
      <SecureFacebook
        loading={secureLoading}
        setLoading={setSecureLoading}
        setWorkspaceId={setWorkspaceId}
        setIsPremium={setIsPremium}
      >
        <DashboardLayout>
          <FacebookMenu
            title="Overview"
            workspaceId={workspaceId}
            router={router}
          />
          <main className="px-3 md:px-12 lg:px-4 xl:px-32 2xl:px-64 mt-10 flex flex-col">
            <FacebookHeaderProfile workspaceId={workspaceId} />
            <FacebookScheduledPosts workspaceId={workspaceId} />
          </main>
        </DashboardLayout>
      </SecureFacebook>
    </PageHead>
  );
}
