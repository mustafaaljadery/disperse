import DashboardLayout from '../../../layouts/Dashboard';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { SecureTiktok } from '../../../layouts/secure/SecureTiktok';
import { TiktokMenu } from '../../../components/tiktok/TiktokMenu';
import { PageHead } from '../../../layouts/PageHead';
import { VideoRight } from '../../../components/tiktok/Video/right/Video';
import { VideoLeft } from '../../../components/tiktok/Video/left/Video';

export default function TiktokVideos() {
  const [workspaceId, setWorkspaceId] = useState('');
  const [secureLoading, setSecureLoading] = useState(true);
  const [videoMedia, setVideoMedia] = useState<any>(null);
  const [isPremium, setIsPremium] = useState(false);
  const router = useRouter();

  const [refetchVideoDrafts, setRefetchVideoDrafts] = useState(false);
  const [rightVideoSelected, setRightVideoSelected] =
    useState<string>('Drafts');
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  return (
    <PageHead title="TikTok Videos · Disperse">
      <SecureTiktok
        loading={secureLoading}
        setLoading={setSecureLoading}
        setWorkspaceId={setWorkspaceId}
        setIsPremium={setIsPremium}
      >
        <DashboardLayout>
          <TiktokMenu
            title="Videos"
            workspaceId={workspaceId}
            router={router}
          />
          <main className="px-3 md:px-12 lg:px-4 xl:px-24 2xl:px-36 mt-10 flex flex-col">
            <div className="flex flex-col space-y-16 md:flex-row md:space-y-0 md:space-x-12 mb-12 md:mb-16 lg:mb-24">
              <div className="w-full md:w-2/5">
                <VideoLeft
                  workspaceId={workspaceId}
                  selectedVideo={selectedVideo}
                  setSelectedVideo={setSelectedVideo}
                  videoMedia={videoMedia}
                  setVideoMedia={setVideoMedia}
                  refetchVideoDrafts={refetchVideoDrafts}
                  setRefetchVideoDrafts={setRefetchVideoDrafts}
                  setRightVideoSelected={setRightVideoSelected}
                  isPremium={isPremium}
                />
              </div>
              <div className="w-full md:w-3/5">
                <VideoRight
                  workspaceId={workspaceId}
                  selectedVideo={selectedVideo}
                  setSelectedVideo={setSelectedVideo}
                  videoMedia={videoMedia}
                  setVideoMedia={setVideoMedia}
                  refetchVideoDrafts={refetchVideoDrafts}
                  setRefetchVideoDrafts={setRefetchVideoDrafts}
                  rightVideoSelected={rightVideoSelected}
                  setRightVideoSelected={setRightVideoSelected}
                />
              </div>
            </div>
          </main>
        </DashboardLayout>
      </SecureTiktok>
    </PageHead>
  );
}
