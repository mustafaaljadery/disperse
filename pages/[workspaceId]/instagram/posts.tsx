import DashboardLayout from '../../../layouts/Dashboard';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { InstagramMenu } from '../../../components/instagram/InstagramMenu';
import { SecureInstagram } from '../../../layouts/secure/SecureInstagram';
import { PageHead } from '../../../layouts/PageHead';
import { InstagramImageRight } from '../../../components/instagram/right/ImageRight';
import { InstagramVideoRight } from '../../../components/instagram/right/VideoRight';
import { InstagramCarouselRight } from '../../../components/instagram/right/CarouselRight';
import { InstagramReelRight } from '../../../components/instagram/right/ReelRight';
import { InstagramWritePost } from '../../../components/instagram/InstagramWritePost';
import { useSession } from 'next-auth/react';

export default function InstagramPosts() {
  const [workspaceId, setWorkspaceId] = useState('');
  const [secureLoading, setSecureLoading] = useState(true);
  const [section, setSection] = useState('Image');
  const [isPremium, setIsPremium] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [selectedReel, setSelectedReel] = useState<any>(null);
  const [selectedCarousel, setSelectedCarousel] = useState<any>(null);
  const [selectedCarouselIndex, setSelectedCarouselIndex] =
    useState<any>(null);

  const [imageMedia, setImageMedia] = useState<any>(null);
  const [videoMedia, setVideoMedia] = useState<any>(null);
  const [reelMedia, setReelMedia] = useState<any>(null);
  const [carouselMedia, setCarouselMedia] = useState<any>([]);

  const [rightImageSelected, setRightImageSelected] =
    useState<string>('Drafts');
  const [rightVideoSelected, setRightVideoSelected] =
    useState<string>('Drafts');
  const [rightReelSelected, setRightReelSelected] =
    useState<string>('Drafts');
  const [rightCarouselSelected, setRightCarouselSelected] =
    useState<string>('Drafts');

  const [refetchImageDrafts, setRefetchImageDrafts] = useState(false);
  const [refetchVideoDrafts, setRefetchVideoDrafts] = useState(false);
  const [refetchReelDrafts, setRefetchReelDrafts] = useState(false);
  const [refetchCarouselDrafts, setRefetchCarouselDrafts] =
    useState(false);

  return (
    <PageHead title="Instagram Posts · Disperse">
      <SecureInstagram
        loading={secureLoading}
        setLoading={setSecureLoading}
        setWorkspaceId={setWorkspaceId}
        setIsPremium={setIsPremium}
      >
        <DashboardLayout>
          <InstagramMenu
            title="Posts"
            workspaceId={workspaceId}
            router={router}
          />
          <main className="px-3 md:px-12 lg:px-4 xl:px-24 2xl:px-36 mt-10 flex flex-col">
            <div className="flex flex-col space-y-16 md:flex-row md:space-y-0 md:space-x-12 mb-12 md:mb-16 lg:mb-24">
              <div className="w-full md:w-2/5">
                <InstagramWritePost
                  userId={String(session?.user?.id)}
                  workspaceId={workspaceId}
                  section={section}
                  setSection={setSection}
                  selectedImage={selectedImage}
                  setSelectedImage={setSelectedImage}
                  selectedVideo={selectedVideo}
                  setSelectedVideo={setSelectedVideo}
                  selectedReel={selectedReel}
                  setSelectedReel={setSelectedReel}
                  selectedCarousel={selectedCarousel}
                  setSelectedCarousel={setSelectedCarousel}
                  imageMedia={imageMedia}
                  setImageMedia={setImageMedia}
                  videoMedia={videoMedia}
                  setVideoMedia={setVideoMedia}
                  reelMedia={reelMedia}
                  setReelMedia={setReelMedia}
                  carouselMedia={carouselMedia}
                  setCarouselMedia={setCarouselMedia}
                  rightImageSelected={rightImageSelected}
                  setRightImageSelected={setRightImageSelected}
                  rightVideoSelected={rightVideoSelected}
                  setRightVideoSelected={setRightVideoSelected}
                  rightReelSelected={rightReelSelected}
                  setRightReelSelected={setRightReelSelected}
                  rightCarouselSelected={rightCarouselSelected}
                  setRightCarouselSelected={setRightCarouselSelected}
                  refetchImageDrafts={refetchImageDrafts}
                  setRefetchImageDrafts={setRefetchImageDrafts}
                  refetchVideoDrafts={refetchVideoDrafts}
                  setRefetchVideoDrafts={setRefetchVideoDrafts}
                  refetchReelDrafts={refetchReelDrafts}
                  setRefetchReelDrafts={setRefetchReelDrafts}
                  refetchCarouselDrafts={refetchCarouselDrafts}
                  setRefetchCarouselDrafts={setRefetchCarouselDrafts}
                  selectedCarouselIndex={selectedCarouselIndex}
                  setSelectedCarouselIndex={setSelectedCarouselIndex}
                  isPremium={isPremium}
                />
              </div>
              <div className="w-full md:w-3/5">
                {section == 'Image' ? (
                  <InstagramImageRight
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
                  <InstagramVideoRight
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
                ) : section == 'Carousel' ? (
                  <InstagramCarouselRight
                    workspaceId={workspaceId}
                    selectedCarousel={selectedCarousel}
                    setSelectedCarousel={setSelectedCarousel}
                    carouselMedia={carouselMedia}
                    setCarouselMedia={setCarouselMedia}
                    rightCarouselSelected={rightCarouselSelected}
                    setRightCarouselSelected={
                      setRightCarouselSelected
                    }
                    refetchCarouselDrafts={refetchCarouselDrafts}
                    setRefetchCarouselDrafts={
                      setRefetchCarouselDrafts
                    }
                    selectedCarouselIndex={selectedCarouselIndex}
                    setSelectedCarouselIndex={
                      setSelectedCarouselIndex
                    }
                  />
                ) : section == 'Reel' ? (
                  <InstagramReelRight
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
                ) : (
                  <></>
                )}
              </div>
            </div>
          </main>
        </DashboardLayout>
      </SecureInstagram>
    </PageHead>
  );
}
