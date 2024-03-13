import DashboardLayout from '../../../layouts/Dashboard';
import { SecureInstagram } from '../../../layouts/secure/SecureInstagram';
import { InstagramMenu } from '../../../components/instagram/InstagramMenu';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { PageHead } from '../../../layouts/PageHead';
import { InstagramHeaderProfile } from '../../../components/instagram/InstagramHeaderProfile';
import { InstagramScheduledPosts } from '../../../components/instagram/ScheduledPosts';

export default function InstagramOverview() {
  const [workspaceId, setWorkspaceId] = useState('');
  const [secureLoading, setSecureLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const router = useRouter();

  return (
    <PageHead title="Instagram · Disperse">
      <SecureInstagram
        loading={secureLoading}
        setLoading={setSecureLoading}
        setWorkspaceId={setWorkspaceId}
        setIsPremium={setIsPremium}
      >
        <DashboardLayout>
          <InstagramMenu
            title="Overview"
            workspaceId={workspaceId}
            router={router}
          />
          <main className="px-3 md:px-12 lg:px-4 xl:px-32 2xl:px-64 mt-10 flex flex-col">
            <>
              <InstagramHeaderProfile workspaceId={workspaceId} />
              <InstagramScheduledPosts workspaceId={workspaceId} />
            </>
          </main>
        </DashboardLayout>
      </SecureInstagram>
    </PageHead>
  );
}
