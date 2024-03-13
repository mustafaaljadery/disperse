import DashboardLayout from '../../../layouts/Dashboard';
import Router, { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { SettingsMenu } from '../../../components/settings/SettingsMenu';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../../utils/apiUrl';
import { TwitterIntegration } from '../../../components/settings/integrations/twitter';
import { InstagramIntegration } from '../../../components/settings/integrations/instagram';
import { TiktokIntegration } from '../../../components/settings/integrations/tiktok';
import { YoutubeIntegration } from '../../../components/settings/integrations/youtube';
import { LinkedinIntegration } from '../../../components/settings/integrations/linkedin';
import { FacebookIntegration } from '../../../components/settings/integrations/facebook';
import { PageHead } from '../../../layouts/PageHead';

export default function SettingsIntegrations() {
  const [workspaceId, setWorkspaceId] = useState('');
  const [socialConnections, setSocialConnections] =
    useState<any>(null);
  const [refetchConnected, setRefetchConnected] = useState(false);
  const router = useRouter();

  axiosRetry(axios, { retries: 3 });

  async function checkSocials(workspaceId: string) {
    try {
      const result = await axios.get(
        `${apiUrl()}socials/checksocials`,
        { params: { workspaceId: workspaceId } }
      );
      return result.data;
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (router.isReady) {
      setWorkspaceId(String(router.query.workspaceId));
      checkSocials(String(router.query.workspaceId)).then((value) => {
        setSocialConnections(value);
      });
    }
  }, [router.isReady]);

  useEffect(() => {
    if (refetchConnected) {
      setTimeout(() => {
        checkSocials(String(router.query.workspaceId)).then(
          (value) => {
            setSocialConnections(value);
            setRefetchConnected(false);
          }
        );
      }, 1000);
    }
  }, [refetchConnected]);

  return (
    <PageHead title="Integrations · Disperse">
      <DashboardLayout>
        <>
          <SettingsMenu
            title="Integrations"
            workspaceId={workspaceId}
            router={router}
          />
          <main className="px-3 md:px-12 lg:px-4 xl:px-32 2xl:px-44 mt-10">
            <div className="flex flex-col space-y-1 mt-10">
              <h1 className="silka-semibold text-gray-900">
                Social Integrations
              </h1>
              <p className="silka-regular text-gray-500 text-xs">
                Enhance your Disperse experience with integrations.
              </p>
            </div>
            <div className="w-full border flex flex-col divide-y rounded md:rounded-lg px-2 md:px-4 mt-8 mb-24">
              <TwitterIntegration
                workspaceId={workspaceId}
                socialConnections={socialConnections}
                setRefetchConnected={setRefetchConnected}
              />
              <InstagramIntegration
                workspaceId={workspaceId}
                socialConnections={socialConnections}
                setRefetchConnected={setRefetchConnected}
              />
              <TiktokIntegration
                workspaceId={workspaceId}
                socialConnections={socialConnections}
                setRefetchConnected={setRefetchConnected}
              />
              <YoutubeIntegration
                workspaceId={workspaceId}
                socialConnections={socialConnections}
                setRefetchConnected={setRefetchConnected}
              />
              <LinkedinIntegration
                workspaceId={workspaceId}
                socialConnections={socialConnections}
                setRefetchConnected={setRefetchConnected}
              />
              <FacebookIntegration
                workspaceId={workspaceId}
                socialConnections={socialConnections}
                setRefetchConnected={setRefetchConnected}
              />
            </div>
          </main>
        </>
      </DashboardLayout>
    </PageHead>
  );
}
