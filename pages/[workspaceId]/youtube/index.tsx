import DashboardLayout from '../../../layouts/Dashboard';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { SecureYoutube } from '../../../layouts/secure/SecureYoutube';
import { YoutubeMenu } from '../../../components/youtube/YoutubeMenu';
import { PageHead } from '../../../layouts/PageHead';
import { YoutubeHomepageProfile } from '../../../components/youtube/HomepageProfile';
import { YoutubeScheduledVideos } from '../../../components/youtube/ScheduledVideos';
import { YoutubeHeaderProfile } from '../../../components/youtube/YoutubeHeaderProfile';

export default function Youtube() {
  const [workspaceId, setWorkspaceId] = useState('');
  const [secureLoading, setSecureLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const router = useRouter();

  return (
    <PageHead title="Youtube · Disperse">
      <SecureYoutube
        loading={secureLoading}
        setLoading={setSecureLoading}
        setWorkspaceId={setWorkspaceId}
        setIsPremium={setIsPremium}
      >
        <DashboardLayout>
          <YoutubeMenu
            title="Overview"
            workspaceId={workspaceId}
            router={router}
          />
          <main className="px-3 md:px-12 lg:px-4 xl:px-32 2xl:px-64 mt-10 flex flex-col">
            <YoutubeHeaderProfile workspaceId={workspaceId} />
            <YoutubeHomepageProfile workspaceId={workspaceId} />
            <YoutubeScheduledVideos workspaceId={workspaceId} />
          </main>
        </DashboardLayout>
      </SecureYoutube>
    </PageHead>
  );
}
