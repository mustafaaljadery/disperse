import DashboardLayout from '../../../layouts/Dashboard';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { SecureYoutube } from '../../../layouts/secure/SecureYoutube';
import { YoutubeMenu } from '../../../components/youtube/YoutubeMenu';
import { PageHead } from '../../../layouts/PageHead';
import { YoutubeVideoRight } from '../../../components/youtube/VideoRight';
import { YoutubeShortsRight } from '../../../components/youtube/ShortsRight';
import { YoutubeVideoLeft } from '../../../components/youtube/YoutubeVideoLeft';
import { YoutubeShortsLeft } from '../../../components/youtube/YoutubeShortsLeft';
import { useSession } from 'next-auth/react';

export default function YoutubeVideos() {
  const [workspaceId, setWorkspaceId] = useState('');
  const [secureLoading, setSecureLoading] = useState(true);
  const [selectedVideoDraftId, setSelectedVideoDraftId] =
    useState<any>(null);
  const [selectedShortDraftId, setSelectedShortDraftId] =
    useState<any>(null);
  const router = useRouter();
  const { data: session, status } = useSession();

  const [section, setSection] = useState('Video');
  const [isPremium, setIsPremium] = useState(false);

  const [videoMedia, setVideoMedia] = useState<any>(null);
  const [shortsMedia, setShortsMedia] = useState<any>(null);

  const [rightVideoSelected, setRightVideoSelected] =
    useState('Drafts');
  const [rightShortsSelected, setRightShortsSelected] =
    useState('Drafts');

  const [refetchVideoDrafts, setRefetchVideoDrafts] = useState(false);
  const [refetchShortsDrafts, setRefetchShortsDrafts] =
    useState(false);

  return (
    <PageHead title="Youtube Videos · Disperse">
      <SecureYoutube
        loading={secureLoading}
        setLoading={setSecureLoading}
        setWorkspaceId={setWorkspaceId}
        setIsPremium={setIsPremium}
      >
        <DashboardLayout>
          <YoutubeMenu
            title="Videos"
            workspaceId={workspaceId}
            router={router}
          />
          <main className="px-3 md:px-12 lg:px-4 xl:px-24 2xl:px-36 mt-10 flex flex-col">
            <div className="flex flex-col space-y-16 md:flex-row md:space-y-0 md:space-x-12 mb-12 md:mb-16 lg:mb-24">
              <div className="w-full md:w-2/5">
                {section == 'Video' ? (
                  <YoutubeVideoLeft
                    workspaceId={workspaceId}
                    section={section}
                    setSection={setSection}
                    draftId={selectedVideoDraftId}
                    setDraftId={setSelectedVideoDraftId}
                    setRightView={setRightVideoSelected}
                    videoMedia={videoMedia}
                    setVideoMedia={setVideoMedia}
                    setRefetchVideoDrafts={setRefetchVideoDrafts}
                    isPremium={isPremium}
                    userId={String(session?.user?.id)}
                  />
                ) : (
                  <YoutubeShortsLeft
                    workspaceId={workspaceId}
                    section={section}
                    setSection={setSection}
                    draftId={selectedShortDraftId}
                    setDraftId={setSelectedShortDraftId}
                    setRightView={setRightShortsSelected}
                    shortMedia={shortsMedia}
                    setShortMedia={setShortsMedia}
                    setRefetchShortDrafts={setRefetchShortsDrafts}
                    isPremium={isPremium}
                    userId={String(session?.user?.id)}
                  />
                )}
              </div>
              <div className="w-full md:w-3/5">
                {section == 'Video' ? (
                  <YoutubeVideoRight
                    workspaceId={workspaceId}
                    rightVideoSelected={rightVideoSelected}
                    setRightVideoSelected={setRightVideoSelected}
                    videoMedia={videoMedia}
                    setVideoMedia={setVideoMedia}
                    setDraftId={setSelectedVideoDraftId}
                    refetchVideoDrafts={refetchVideoDrafts}
                    setRefetchVideoDrafts={setRefetchVideoDrafts}
                    draftId={selectedVideoDraftId}
                    selectedVideo={selectedVideoDraftId}
                    setSelectedVideo={setSelectedVideoDraftId}
                  />
                ) : (
                  <YoutubeShortsRight
                    workspaceId={workspaceId}
                    rightShortsSelected={rightShortsSelected}
                    setRightShortsSelected={setRightShortsSelected}
                    shortsMedia={shortsMedia}
                    setShortsMedia={setShortsMedia}
                    selectedShort={selectedShortDraftId}
                    setSelectedShort={setSelectedShortDraftId}
                    refetchShortsDrafts={refetchShortsDrafts}
                    setRefetchShortsDrafts={setRefetchShortsDrafts}
                  />
                )}
              </div>
            </div>
          </main>
        </DashboardLayout>
      </SecureYoutube>
    </PageHead>
  );
}
