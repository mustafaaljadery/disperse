import { Dispatch, SetStateAction } from 'react';
import { ImageLeft } from './left/ImageLeft';
import { ReelLeft } from './left/ReelLeft';
import { SlideshowLeft } from './left/SlideshowLeft';
import { TextLeft } from './left/TextLeft';
import { VideoLeft } from './left/VideoLeft';

interface Props {
  workspaceId: string;
  section: string;
  setSection: Dispatch<SetStateAction<string>>;
  selectedText: any;
  setSelectedText: Dispatch<SetStateAction<any>>;
  selectedImage: any;
  setSelectedImage: Dispatch<SetStateAction<any>>;
  selectedVideo: any;
  setSelectedVideo: Dispatch<SetStateAction<any>>;
  selectedReel: any;
  setSelectedReel: Dispatch<SetStateAction<any>>;
  selectedSlideshow: any;
  setSelectedSlideshow: Dispatch<SetStateAction<any>>;
  textMedia: any;
  setTextMedia: Dispatch<SetStateAction<any>>;
  imageMedia: any;
  setImageMedia: Dispatch<SetStateAction<any>>;
  videoMedia: any;
  setVideoMedia: Dispatch<SetStateAction<any>>;
  reelMedia: any;
  setReelMedia: Dispatch<SetStateAction<any>>;
  slideshowMedia: any;
  setSlideshowMedia: Dispatch<SetStateAction<any>>;
  rightTextSelected: string;
  setRightTextSelected: Dispatch<SetStateAction<string>>;
  rightImageSelected: string;
  setRightImageSelected: Dispatch<SetStateAction<string>>;
  rightVideoSelected: string;
  setRightVideoSelected: Dispatch<SetStateAction<string>>;
  rightReelSelected: string;
  setRightReelSelected: Dispatch<SetStateAction<string>>;
  rightSlideshowSelected: string;
  setRightSlideshowSelected: Dispatch<SetStateAction<string>>;
  refetchTextDrafts: boolean;
  setRefetchTextDrafts: Dispatch<SetStateAction<boolean>>;
  refetchImageDrafts: boolean;
  setRefetchImageDrafts: Dispatch<SetStateAction<boolean>>;
  refetchVideoDrafts: boolean;
  setRefetchVideoDrafts: Dispatch<SetStateAction<boolean>>;
  refetchReelDrafts: boolean;
  setRefetchReelDrafts: Dispatch<SetStateAction<boolean>>;
  refetchSlideshowDrafts: boolean;
  setRefetchSlideshowDrafts: Dispatch<SetStateAction<boolean>>;
  selectedSlideshowIndex: any;
  setSelectedSlideshowIndex: Dispatch<SetStateAction<any>>;
  isPremium: boolean;
  userId: string;
}

export function FacebookWritePost({
  workspaceId,
  section,
  setSection,
  selectedText,
  setSelectedText,
  selectedImage,
  setSelectedImage,
  selectedVideo,
  setSelectedVideo,
  selectedReel,
  setSelectedReel,
  selectedSlideshow,
  setSelectedSlideshow,
  textMedia,
  setTextMedia,
  imageMedia,
  setImageMedia,
  videoMedia,
  setVideoMedia,
  reelMedia,
  setReelMedia,
  slideshowMedia,
  setSlideshowMedia,
  rightTextSelected,
  setRightTextSelected,
  rightImageSelected,
  setRightImageSelected,
  rightVideoSelected,
  setRightVideoSelected,
  rightReelSelected,
  setRightReelSelected,
  rightSlideshowSelected,
  setRightSlideshowSelected,
  refetchTextDrafts,
  setRefetchTextDrafts,
  refetchImageDrafts,
  setRefetchImageDrafts,
  refetchVideoDrafts,
  setRefetchVideoDrafts,
  refetchReelDrafts,
  setRefetchReelDrafts,
  refetchSlideshowDrafts,
  setRefetchSlideshowDrafts,
  selectedSlideshowIndex,
  setSelectedSlideshowIndex,
  isPremium,
  userId,
}: Props) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row space-x-1 visible">
        <button
          onClick={(e) => {
            e.preventDefault();
            setSection('Text');
          }}
          className={
            'text-xs px-3 py-1 rounded ' +
            (section == 'Text'
              ? 'silka-medium bg-gray-100'
              : 'silka-regular text-gray-600 hover:bg-gray-50')
          }
        >
          Text
        </button>
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
            setSection('Reel');
          }}
          className={
            'text-xs px-3 py-1 rounded ' +
            (section == 'Reel'
              ? 'silka-medium bg-gray-100'
              : 'silka-regular text-gray-600 hove:bg-gray-50')
          }
        >
          Reel
        </button>
        {/*
        <button
          onClick={(e) => {
            e.preventDefault();
            setSection('Slideshow');
          }}
          className={
            'text-xs px-3 py-1 rounded ' +
            (section == 'Slideshow'
              ? 'silka-medium bg-gray-100'
              : 'silka-regular text-gray-600 hover:bg-gray-50')
          }
        >
          Slideshow
        </button>
        */}
      </div>
      {section == 'Text' ? (
        <TextLeft
          workspaceId={workspaceId}
          selectedText={selectedText}
          setSelectedText={setSelectedText}
          refetchTextDrafts={refetchTextDrafts}
          setRefetchTextDrafts={setRefetchTextDrafts}
          isPremium={isPremium}
          userId={userId}
        />
      ) : section == 'Image' ? (
        <ImageLeft
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
          userId={userId}
        />
      ) : section == 'Reel' ? (
        <ReelLeft
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
      ) : section == 'Slideshow' ? (
        <SlideshowLeft
          workspaceId={workspaceId}
          selectedSlideshow={selectedSlideshow}
          setSelectedSlideshow={setSelectedSlideshow}
          slideshowMedia={slideshowMedia}
          setSlideshowMedia={setSlideshowMedia}
          refetchSlideshowDrafts={refetchSlideshowDrafts}
          setRefetchSlideshowDrafts={setRefetchSlideshowDrafts}
          setRightSlideshowSelected={setRightSlideshowSelected}
          selectedSlideshowIndex={selectedSlideshowIndex}
          setSelectedSlideshowIndex={setSelectedSlideshowIndex}
          isPremium={isPremium}
          userId={userId}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
