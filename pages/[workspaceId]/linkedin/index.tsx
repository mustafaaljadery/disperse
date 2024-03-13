import DashboardLayout from '../../../layouts/Dashboard';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { SecureLinkedin } from '../../../layouts/secure/SecureLinkedin';
import { LinkedinMenu } from '../../../components/linkedin/LinkedinMenu';
import { PageHead } from '../../../layouts/PageHead';
import { LinkedinHeaderProfile } from '../../../components/linkedin/LinkedinHeaderProfile';
import { LinkedinScheduledPosts } from '../../../components/linkedin/ScheduledPosts';

export default function Linkedin() {
  const [workspaceId, setWorkspaceId] = useState('');
  const [secureLoading, setSecureLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const router = useRouter();

  return (
    <PageHead title="Linkedin · Disperse">
      <SecureLinkedin
        loading={secureLoading}
        setLoading={setSecureLoading}
        setWorkspaceId={setWorkspaceId}
        setIsPremium={setIsPremium}
      >
        <DashboardLayout>
          <LinkedinMenu
            title="Overview"
            workspaceId={workspaceId}
            router={router}
          />
          <main className="px-3 md:px-12 lg:px-4 xl:px-32 2xl:px-64 mt-10 flex flex-col">
            <LinkedinHeaderProfile workspaceId={workspaceId} />
            <LinkedinScheduledPosts workspaceId={workspaceId} />
          </main>
        </DashboardLayout>
      </SecureLinkedin>
    </PageHead>
  );
}
