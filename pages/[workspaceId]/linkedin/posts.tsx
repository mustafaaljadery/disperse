import DashboardLayout from '../../../layouts/Dashboard';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { SecureLinkedin } from '../../../layouts/secure/SecureLinkedin';
import { LinkedinMenu } from '../../../components/linkedin/LinkedinMenu';
import { PageHead } from '../../../layouts/PageHead';
import { LinkedinTextRight } from '../../../components/linkedin/right/TextRight';
import { LinkedinImageRight } from '../../../components/linkedin/right/ImageRight';
import { LinkedinVideoRight } from '../../../components/linkedin/right/VideoRight';
import { LinkedinMultiimageRight } from '../../../components/linkedin/right/MultiimageRight';
import { LinkedinPollRight } from '../../../components/linkedin/right/PollRight';
import { LinkedinWritePost } from '../../../components/linkedin/LinkedinWritePost';
import { useSession } from 'next-auth/react';

export default function LinkedinPosts() {
  const [workspaceId, setWorkspaceId] = useState('');
  const [secureLoading, setSecureLoading] = useState(true);
  const [section, setSection] = useState('Text');
  const [isPremium, setIsPremium] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  // Selected Stuff
  const [selectedText, setSelectedText] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [selectedMultiimage, setSelectedMultiimage] =
    useState<any>(null);
  const [selectedPoll, setSelectedPoll] = useState<any>(null);
  const [selectedMultiimageIndex, setSelectedMultiimageIndex] =
    useState<any>(null);

  // Media
  const [textMedia, setTextMedia] = useState<any>(null);
  const [imageMedia, setImageMedia] = useState<any>(null);
  const [videoMedia, setVideoMedia] = useState<any>(null);
  const [multiimageMedia, setMultiimageMedia] = useState<any>([]);
  const [pollMedia, setPollMedia] = useState<any>(null);

  // Right Side
  const [rightTextSelected, setRightTextSelected] =
    useState<string>('Drafts');
  const [rightImageSelected, setRightImageSelected] =
    useState<string>('Drafts');
  const [rightVideoSelected, setRightVideoSelected] =
    useState<string>('Drafts');
  const [rightMultiimageSelected, setRightMultiimageSelected] =
    useState<string>('Drafts');
  const [rightPollSelected, setRightPollSelected] =
    useState<string>('Drafts');

  // Refetch Drafts
  const [refetchTextDrafts, setRefetchTextDrafts] = useState(false);
  const [refetchImageDrafts, setRefetchImageDrafts] = useState(false);
  const [refetchVideoDrafts, setRefetchVideoDrafts] = useState(false);
  const [refetchMultiimageDrafts, setRefetchMultiimageDrafts] =
    useState(false);
  const [refetchPollDrafts, setRefetchPollDrafts] = useState(false);

  return (
    <PageHead title="Linkedin Posts · Disperse">
      <SecureLinkedin
        loading={secureLoading}
        setLoading={setSecureLoading}
        setWorkspaceId={setWorkspaceId}
        setIsPremium={setIsPremium}
      >
        <DashboardLayout>
          <LinkedinMenu
            title="Posts"
            workspaceId={workspaceId}
            router={router}
          />
          <main className="px-3 md:px-12 lg:px-4 xl:px-24 2xl:px-36 mt-10 flex flex-col">
            <div className="flex flex-col space-y-16 md:flex-row md:space-y-0 md:space-x-12 mb-12 md:mb-16 lg:mb-24">
              <div className="w-full md:w-2/5">
                <LinkedinWritePost
                  workspaceId={workspaceId}
                  section={section}
                  setSection={setSection}
                  selectedText={selectedText}
                  setSelectedText={setSelectedText}
                  selectedImage={selectedImage}
                  setSelectedImage={setSelectedImage}
                  selectedVideo={selectedVideo}
                  setSelectedVideo={setSelectedVideo}
                  selectedMultiimage={selectedMultiimage}
                  setSelectedMultiimage={setSelectedMultiimage}
                  selectedPoll={selectedPoll}
                  setSelectedPoll={setSelectedPoll}
                  textMedia={textMedia}
                  setTextMedia={setTextMedia}
                  imageMedia={imageMedia}
                  setImageMedia={setImageMedia}
                  videoMedia={videoMedia}
                  setVideoMedia={setVideoMedia}
                  multiimageMedia={multiimageMedia}
                  setMultiimageMedia={setMultiimageMedia}
                  pollMedia={pollMedia}
                  setPollMedia={setPollMedia}
                  refetchImageDrafts={refetchImageDrafts}
                  setRefetchImageDrafts={setRefetchImageDrafts}
                  refetchTextDrafts={refetchTextDrafts}
                  setRefetchTextDrafts={setRefetchTextDrafts}
                  refetchVideoDrafts={refetchVideoDrafts}
                  setRefetchVideoDrafts={setRefetchVideoDrafts}
                  refetchMultiimageDrafts={refetchMultiimageDrafts}
                  setRefetchMultiimageDrafts={
                    setRefetchMultiimageDrafts
                  }
                  refetchPollDrafts={refetchPollDrafts}
                  setRefetchPollDrafts={setRefetchPollDrafts}
                  setRightTextSelected={setRightTextSelected}
                  setRightImageSelected={setRightImageSelected}
                  setRightVideoSelected={setRightVideoSelected}
                  setRightMultiimageSelected={
                    setRightMultiimageSelected
                  }
                  setRightPollSelected={setRightPollSelected}
                  selectedMultiimageIndex={selectedMultiimageIndex}
                  setSelectedMultiimageIndex={
                    setSelectedMultiimageIndex
                  }
                  isPremium={isPremium}
                  userId={String(session?.user?.id)}
                />
              </div>
              <div className="w-full md:w-3/5">
                {section == 'Text' ? (
                  <LinkedinTextRight
                    workspaceId={workspaceId}
                    refetchTextDrafts={refetchTextDrafts}
                    setRefetchTextDrafts={setRefetchTextDrafts}
                    selectedText={selectedText}
                    setSelectedText={setSelectedText}
                    rightTextSelected={rightTextSelected}
                    setRightTextSelected={setRightTextSelected}
                  />
                ) : section == 'Image' ? (
                  <LinkedinImageRight
                    workspaceId={workspaceId}
                    selectedImage={selectedImage}
                    setSelectedImage={setSelectedImage}
                    imageMedia={imageMedia}
                    setImageMedia={setImageMedia}
                    rightImageSelected={rightImageSelected}
                    setRightImageSelected={setRightImageSelected}
                    refetchImageDrafts={refetchImageDrafts}
                    setRefetchImageDrafts={setRefetchImageDrafts}
                  />
                ) : section == 'Video' ? (
                  <LinkedinVideoRight
                    workspaceId={workspaceId}
                    selectedVideo={selectedVideo}
                    setSelectedVideo={setSelectedVideo}
                    videoMedia={videoMedia}
                    setVideoMedia={setVideoMedia}
                    rightVideoSelected={rightVideoSelected}
                    setRightVideoSelected={setRightVideoSelected}
                    refetchVideoDrafts={refetchVideoDrafts}
                    setRefetchVideoDrafts={setRefetchVideoDrafts}
                  />
                ) : section == 'Multi-Image' ? (
                  <LinkedinMultiimageRight
                    workspaceId={workspaceId}
                    selectedMultiimage={selectedMultiimage}
                    setSelectedMultiimage={setSelectedMultiimage}
                    multiimageMedia={multiimageMedia}
                    setMultiimageMedia={setMultiimageMedia}
                    rightMultiimageSelected={rightMultiimageSelected}
                    setRightMultiimageSelected={
                      setRightMultiimageSelected
                    }
                    selectedMultiimageIndex={selectedMultiimageIndex}
                    setSelectedMultiimageIndex={
                      setSelectedMultiimageIndex
                    }
                    setRefetchMultiimageDrafts={
                      setRefetchMultiimageDrafts
                    }
                    refetchMultiimageDrafts={refetchMultiimageDrafts}
                  />
                ) : section == 'Poll' ? (
                  <LinkedinPollRight
                    workspaceId={workspaceId}
                    refetchPollDrafts={refetchPollDrafts}
                    setRefetchPollDrafts={setRefetchPollDrafts}
                    selectedPoll={selectedPoll}
                    setSelectedPoll={setSelectedPoll}
                    rightPollSelected={rightPollSelected}
                    setRightPollSelected={setRightPollSelected}
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>
          </main>
        </DashboardLayout>
      </SecureLinkedin>
    </PageHead>
  );
}
