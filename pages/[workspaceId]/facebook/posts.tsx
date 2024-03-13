import DashboardLayout from '../../../layouts/Dashboard';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SecureFacebook } from '../../../layouts/secure/SecureFacebook';
import { FacebookMenu } from '../../../components/facebook/FacebookMenu';
import { PageHead } from '../../../layouts/PageHead';
import { FacebookWritePost } from '../../../components/facebook/FacebookWritePost';
import { FacebookTextRight } from '../../../components/facebook/right/TextRight';
import { FacebookImageRight } from '../../../components/facebook/right/ImageRight';
import { FacebookVideoRight } from '../../../components/facebook/right/VideoRight';
import { FacebookReelRight } from '../../../components/facebook/right/ReelRight';
import { FacebookSlideshowRight } from '../../../components/facebook/right/SlideshowRight';
import { useSession } from 'next-auth/react';

export default function FacebookPosts() {
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
  const [selectedReel, setSelectedReel] = useState<any>(null);
  const [selectedSlideshow, setSelectedSlideshow] =
    useState<any>(null);
  const [selectedSlideshowIndex, setSelectedSlideshowIndex] =
    useState<any>(null);

  // Media
  const [textMedia, setTextMedia] = useState<any>(null);
  const [imageMedia, setImageMedia] = useState<any>(null);
  const [videoMedia, setVideoMedia] = useState<any>(null);
  const [reelMedia, setReelMedia] = useState<any>(null);
  const [slideshowMedia, setSlideshowMedia] = useState<any>([]);

  // Right-side
  const [rightTextSelected, setRightTextSelected] =
    useState<string>('Drafts');
  const [rightImageSelected, setRightImageSelected] =
    useState<string>('Drafts');
  const [rightVideoSelected, setRightVideoSelected] =
    useState<string>('Drafts');
  const [rightReelSelected, setRightReelSelected] =
    useState<string>('Drafts');
  const [rightSlideshowSelected, setRightSlideshowSelected] =
    useState<string>('Drafts');

  // Refetch Drafts
  const [refetchTextDrafts, setRefetchTextDrafts] = useState(false);
  const [refetchImageDrafts, setRefetchImageDrafts] = useState(false);
  const [refetchVideoDrafts, setRefetchVideoDrafts] = useState(false);
  const [refetchReelDrafts, setRefetchReelDrafts] = useState(false);
  const [refetchSlideshowDrafts, setRefetchSlideshowDrafts] =
    useState(false);

  return (
    <PageHead title="Facebook Posts · Disperse">
      <SecureFacebook
        loading={secureLoading}
        setLoading={setSecureLoading}
        setWorkspaceId={setWorkspaceId}
        setIsPremium={setIsPremium}
      >
        <DashboardLayout>
          <FacebookMenu
            title="Posts"
            workspaceId={workspaceId}
            router={router}
          />
          <main className="px-3 md:px-12 lg:px-4 xl:px-24 2xl:px-36 mt-10 flex flex-col">
            <div className="flex flex-col space-y-16 md:flex-row md:space-y-0 md:space-x-12 mb-12 md:mb-16 lg:mb-24">
              <div className="w-full md:w-2/5">
                <FacebookWritePost
                  userId={String(session?.user?.id)}
                  workspaceId={workspaceId}
                  section={section}
                  setSection={setSection}
                  selectedText={selectedText}
                  setSelectedText={setSelectedText}
                  selectedImage={selectedImage}
                  setSelectedImage={setSelectedImage}
                  selectedVideo={selectedVideo}
                  setSelectedVideo={setSelectedVideo}
                  selectedReel={selectedReel}
                  setSelectedReel={setSelectedReel}
                  selectedSlideshow={selectedSlideshow}
                  setSelectedSlideshow={setSelectedSlideshow}
                  textMedia={textMedia}
                  setTextMedia={setTextMedia}
                  imageMedia={imageMedia}
                  setImageMedia={setImageMedia}
                  videoMedia={videoMedia}
                  setVideoMedia={setVideoMedia}
                  reelMedia={reelMedia}
                  setReelMedia={setReelMedia}
                  slideshowMedia={slideshowMedia}
                  setSlideshowMedia={setSlideshowMedia}
                  rightTextSelected={rightTextSelected}
                  setRightTextSelected={setRightTextSelected}
                  rightImageSelected={rightImageSelected}
                  setRightImageSelected={setRightImageSelected}
                  rightVideoSelected={rightVideoSelected}
                  setRightVideoSelected={setRightVideoSelected}
                  rightReelSelected={rightReelSelected}
                  setRightReelSelected={setRightReelSelected}
                  rightSlideshowSelected={rightSlideshowSelected}
                  setRightSlideshowSelected={
                    setRightSlideshowSelected
                  }
                  refetchTextDrafts={refetchTextDrafts}
                  setRefetchTextDrafts={setRefetchTextDrafts}
                  refetchImageDrafts={refetchImageDrafts}
                  setRefetchImageDrafts={setRefetchImageDrafts}
                  refetchVideoDrafts={refetchVideoDrafts}
                  setRefetchVideoDrafts={setRefetchVideoDrafts}
                  refetchReelDrafts={refetchReelDrafts}
                  setRefetchReelDrafts={setRefetchReelDrafts}
                  refetchSlideshowDrafts={refetchSlideshowDrafts}
                  setRefetchSlideshowDrafts={
                    setRefetchSlideshowDrafts
                  }
                  selectedSlideshowIndex={selectedSlideshowIndex}
                  setSelectedSlideshowIndex={
                    setSelectedSlideshowIndex
                  }
                  isPremium={isPremium}
                />
              </div>
              <div className="w-full md:w-3/5">
                {section == 'Text' ? (
                  <FacebookTextRight
                    workspaceId={workspaceId}
                    refetchTextDrafts={refetchTextDrafts}
                    setRefetchTextDrafts={setRefetchTextDrafts}
                    selectedText={selectedText}
                    setSelectedText={setSelectedText}
                    rightTextSelected={rightTextSelected}
                    setRightTextSelected={setRightTextSelected}
                  />
                ) : section == 'Image' ? (
                  <FacebookImageRight
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
                  <FacebookVideoRight
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
                ) : section == 'Reel' ? (
                  <FacebookReelRight
                    workspaceId={workspaceId}
                    selectedReel={selectedReel}
                    setSelectedReel={setSelectedReel}
                    reelMedia={reelMedia}
                    setReelMedia={setReelMedia}
                    rightReelSelected={rightReelSelected}
                    setRightReelSelected={setRightReelSelected}
                    refetchReelDrafts={refetchReelDrafts}
                    setRefetchReelDrafts={setRefetchReelDrafts}
                  />
                ) : section == 'Slideshow' ? (
                  <FacebookSlideshowRight
                    workspaceId={workspaceId}
                    selectedSlideshow={selectedSlideshow}
                    setSelectedSlideshow={setSelectedSlideshow}
                    slideshowMedia={slideshowMedia}
                    setSlideshowMedia={setSlideshowMedia}
                    rightSlideshowSelected={rightSlideshowSelected}
                    setRightSlideshowSelected={
                      setRightSlideshowSelected
                    }
                    refetchSlideshowDrafts={refetchSlideshowDrafts}
                    setRefetchSlideshowDrafts={
                      setRefetchSlideshowDrafts
                    }
                    selectedSlideshowIndex={selectedSlideshowIndex}
                    setSelectedSlideshowIndex={
                      setSelectedSlideshowIndex
                    }
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>
          </main>
        </DashboardLayout>
      </SecureFacebook>
    </PageHead>
  );
}
