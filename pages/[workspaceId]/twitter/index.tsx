import DashboardLayout from '../../../layouts/Dashboard';
import Router, { useRouter } from 'next/router';
import { useState } from 'react';
import { TwitterMenu } from '../../../components/twitter/TwitterMenu';
import { SecureTwitter } from '../../../layouts/secure/SecureTwitter';
import { ScheduledTweets } from '../../../components/twitter/ScheduledTweets';
import { PageHead } from '../../../layouts/PageHead';
import { TwitterProfile } from '../../../components/twitter/TwitterProfile';

export default function Twitter() {
  const [workspaceId, setWorkspaceId] = useState('');
  const [secureLoading, setSecureLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const router = useRouter();

  return (
    <PageHead title="Twitter · Disperse">
      <SecureTwitter
        loading={secureLoading}
        setLoading={setSecureLoading}
        setWorkspaceId={setWorkspaceId}
        setIsPremium={setIsPremium}
      >
        <DashboardLayout>
          <TwitterMenu
            title="Overview"
            workspaceId={workspaceId}
            router={router}
          />
          <main className="px-3 md:px-12 lg:px-4 xl:px-32 2xl:px-64 mt-10 flex flex-col">
            <TwitterProfile workspaceId={workspaceId} />
            <ScheduledTweets workspaceId={workspaceId} />
          </main>
        </DashboardLayout>
      </SecureTwitter>
    </PageHead>
  );
}
