import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { InstagramCarouselLeft } from './left/CarouselLeft';
import { InstagramImageLeft } from './left/ImageLeft';
import { InstagramReelLeft } from './left/ReelLeft';
import { InstagramVideoLeft } from './left/VideoLeft';

interface Props {
  workspaceId: string;
  userId: string;
  section: string;
  setSection: Dispatch<SetStateAction<string>>;
  selectedImage: any;
  setSelectedImage: Dispatch<SetStateAction<any>>;
  selectedVideo: any;
  setSelectedVideo: Dispatch<SetStateAction<any>>;
  selectedReel: any;
  setSelectedReel: Dispatch<SetStateAction<any>>;
  selectedCarousel: any;
  setSelectedCarousel: Dispatch<SetStateAction<any>>;
  imageMedia: any;
  setImageMedia: Dispatch<SetStateAction<any>>;
  videoMedia: any;
  setVideoMedia: Dispatch<SetStateAction<any>>;
  reelMedia: any;
  setReelMedia: Dispatch<SetStateAction<any>>;
  carouselMedia: any;
  setCarouselMedia: Dispatch<SetStateAction<any>>;
  rightImageSelected: string;
  setRightImageSelected: Dispatch<SetStateAction<string>>;
  rightVideoSelected: string;
  setRightVideoSelected: Dispatch<SetStateAction<string>>;
  rightReelSelected: string;
  setRightReelSelected: Dispatch<SetStateAction<string>>;
  rightCarouselSelected: string;
  setRightCarouselSelected: Dispatch<SetStateAction<string>>;
  refetchImageDrafts: boolean;
  setRefetchImageDrafts: Dispatch<SetStateAction<boolean>>;
  refetchVideoDrafts: boolean;
  setRefetchVideoDrafts: Dispatch<SetStateAction<boolean>>;
  refetchReelDrafts: boolean;
  setRefetchReelDrafts: Dispatch<SetStateAction<boolean>>;
  refetchCarouselDrafts: boolean;
  setRefetchCarouselDrafts: Dispatch<SetStateAction<boolean>>;
  selectedCarouselIndex: any;
  setSelectedCarouselIndex: Dispatch<SetStateAction<any>>;
  isPremium: boolean;
}

export function InstagramWritePost({
  workspaceId,
  userId,
  section,
  setSection,
  selectedImage,
  setSelectedImage,
  selectedVideo,
  setSelectedVideo,
  selectedReel,
  setSelectedReel,
  selectedCarousel,
  setSelectedCarousel,
  imageMedia,
  setImageMedia,
  videoMedia,
  setVideoMedia,
  reelMedia,
  setReelMedia,
  carouselMedia,
  setCarouselMedia,
  rightImageSelected,
  setRightImageSelected,
  rightVideoSelected,
  setRightVideoSelected,
  rightReelSelected,
  setRightReelSelected,
  rightCarouselSelected,
  setRightCarouselSelected,
  refetchImageDrafts,
  setRefetchImageDrafts,
  refetchVideoDrafts,
  setRefetchVideoDrafts,
  refetchReelDrafts,
  setRefetchReelDrafts,
  refetchCarouselDrafts,
  setRefetchCarouselDrafts,
  selectedCarouselIndex,
  setSelectedCarouselIndex,
  isPremium,
}: Props) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row space-x-1 visible">
        <button
          onClick={(e) => {
            e.preventDefault();
            setSection('Image');
          }}
          className={
            'text-xs px-3 py-1 rounded ' +
            (section == 'Image'
              ? 'silka-medium bg-gray-100'
              : 'silka-regular text-gray-600 hover:bg-gray-50')
          }
        >
          Image
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setSection('Video');
          }}
          className={
            'text-xs px-3 py-1 rounded ' +
            (section == 'Video'
              ? 'silka-medium bg-gray-100'
              : 'silka-regular text-gray-600 hover:bg-gray-50')
          }
        >
          Video
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setSection('Carousel');
          }}
          className={
            'text-xs px-3 py-1 rounded ' +
            (section == 'Carousel'
              ? 'silka-medium bg-gray-100'
              : 'silka-regular text-gray-600 hover:bg-gray-50')
          }
        >
          Carousel
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setSection('Reel');
          }}
          className={
            'text-xs px-3 py-1 rounded ' +
            (section == 'Reel'
              ? 'sikla-medium bg-gray-100'
              : 'silka-regular text-gray-600 hover:bg-gray-50')
          }
        >
          Reel
        </button>
      </div>
      {section == 'Image' ? (
        <InstagramImageLeft
          workspaceId={workspaceId}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          imageMedia={imageMedia}
          setImageMedia={setImageMedia}
          refetchImageDrafts={refetchImageDrafts}
          setRefetchImageDrafts={setRefetchImageDrafts}
          setRightImageSelected={setRightImageSelected}
          isPremium={isPremium}
          userId={userId}
        />
      ) : section == 'Video' ? (
        <InstagramVideoLeft
          workspaceId={workspaceId}
          selectedVideo={selectedVideo}
          setSelectedVideo={setSelectedVideo}
          videoMedia={videoMedia}
          setVideoMedia={setVideoMedia}
          refetchVideoDrafts={refetchVideoDrafts}
          setRefetchVideoDrafts={setRefetchVideoDrafts}
          setRightVideoSelected={setRightVideoSelected}
          isPremium={isPremium}
          userId={userId}
        />
      ) : section == 'Carousel' ? (
        <InstagramCarouselLeft
          workspaceId={workspaceId}
          selectedCarousel={selectedCarousel}
          setSelectedCarousel={setSelectedCarousel}
          carouselMedia={carouselMedia}
          setCarouselMedia={setCarouselMedia}
          refetchCarouselDrafts={refetchCarouselDrafts}
          setRefetchCarouselDrafts={setRefetchCarouselDrafts}
          setRightCarouselSelected={setRightCarouselSelected}
          selectedCarouselIndex={selectedCarouselIndex}
          setSelectedCarouselIndex={setSelectedCarouselIndex}
          isPremium={isPremium}
          userId={userId}
        />
      ) : section == 'Reel' ? (
        <InstagramReelLeft
          workspaceId={workspaceId}
          selectedReel={selectedReel}
          setSelectedReel={setSelectedReel}
          reelMedia={reelMedia}
          setReelMedia={setReelMedia}
          refetchReelDrafts={refetchReelDrafts}
          setRefetchReelDrafts={setRefetchReelDrafts}
          setRightReelSelected={setRightReelSelected}
          isPremium={isPremium}
          userId={userId}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
