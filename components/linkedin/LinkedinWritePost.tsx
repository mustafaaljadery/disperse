import { Dispatch, SetStateAction } from 'react';
import { LinkedinImageLeft } from './left/Image';
import { LinkedinMultiimageLeft } from './left/Multiimage';
import { LinkedinPolleft } from './left/Poll';
import { LinkedinTextLeft } from './left/Text';
import { LinkedinVideoLeft } from './left/Video';

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
  selectedMultiimage: any;
  setSelectedMultiimage: Dispatch<SetStateAction<any>>;
  selectedPoll: any;
  setSelectedPoll: Dispatch<SetStateAction<any>>;
  textMedia: any;
  setTextMedia: Dispatch<SetStateAction<any>>;
  imageMedia: any;
  setImageMedia: Dispatch<SetStateAction<any>>;
  videoMedia: any;
  setVideoMedia: Dispatch<SetStateAction<any>>;
  multiimageMedia: any;
  setMultiimageMedia: Dispatch<SetStateAction<any>>;
  pollMedia: any;
  setPollMedia: Dispatch<SetStateAction<any>>;
  refetchTextDrafts: boolean;
  setRefetchTextDrafts: Dispatch<SetStateAction<boolean>>;
  refetchImageDrafts: boolean;
  setRefetchImageDrafts: Dispatch<SetStateAction<boolean>>;
  refetchVideoDrafts: boolean;
  setRefetchVideoDrafts: Dispatch<SetStateAction<boolean>>;
  refetchMultiimageDrafts: boolean;
  setRefetchMultiimageDrafts: Dispatch<SetStateAction<boolean>>;
  refetchPollDrafts: boolean;
  setRefetchPollDrafts: Dispatch<SetStateAction<boolean>>;
  setRightTextSelected: Dispatch<SetStateAction<string>>;
  setRightImageSelected: Dispatch<SetStateAction<string>>;
  setRightVideoSelected: Dispatch<SetStateAction<string>>;
  setRightMultiimageSelected: Dispatch<SetStateAction<string>>;
  setRightPollSelected: Dispatch<SetStateAction<string>>;
  selectedMultiimageIndex: any;
  setSelectedMultiimageIndex: Dispatch<SetStateAction<any>>;
  isPremium: boolean;
  userId: string;
}

export function LinkedinWritePost({
  workspaceId,
  section,
  setSection,
  selectedText,
  setSelectedText,
  selectedImage,
  setSelectedImage,
  selectedVideo,
  setSelectedVideo,
  selectedMultiimage,
  setSelectedMultiimage,
  selectedPoll,
  setSelectedPoll,
  textMedia,
  setTextMedia,
  imageMedia,
  setImageMedia,
  videoMedia,
  setVideoMedia,
  multiimageMedia,
  setMultiimageMedia,
  pollMedia,
  setPollMedia,
  refetchImageDrafts,
  setRefetchImageDrafts,
  refetchTextDrafts,
  setRefetchTextDrafts,
  refetchVideoDrafts,
  setRefetchVideoDrafts,
  refetchMultiimageDrafts,
  setRefetchMultiimageDrafts,
  refetchPollDrafts,
  setRefetchPollDrafts,
  setRightImageSelected,
  setRightMultiimageSelected,
  setRightPollSelected,
  setRightTextSelected,
  setRightVideoSelected,
  selectedMultiimageIndex,
  setSelectedMultiimageIndex,
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
            setSection('Multi-Image');
          }}
          className={
            'text-xs px-3 py-1 rounded ' +
            (section == 'Multi-Image'
              ? 'silka-medium bg-gray-100'
              : 'silka-regular text-gray-600 hover:bg-gray-50')
          }
        >
          Multi-Image
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setSection('Poll');
          }}
          className={
            'text-xs px-3 py-1 rounded ' +
            (section == 'Poll'
              ? 'silka-medium bg-gray-100'
              : 'silka-regular text-gray-600 hover:bg-gray-50')
          }
        >
          Poll
        </button>
      </div>
      {section == 'Text' ? (
        <LinkedinTextLeft
          workspaceId={workspaceId}
          selectedText={selectedText}
          setSelectedText={setSelectedText}
          refetchTextDrafts={refetchTextDrafts}
          setRefetchTextDrafts={setRefetchTextDrafts}
          isPremium={isPremium}
          userId={userId}
        />
      ) : section == 'Image' ? (
        <LinkedinImageLeft
          workspaceId={workspaceId}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          imageMedia={imageMedia}
          setImageMedia={setImageMedia}
          refetchImageDrafts={refetchImageDrafts}
          setRefetchImageDrafts={setRefetchImageDrafts}
          setImageRight={setRightImageSelected}
          isPremium={isPremium}
          userId={userId}
        />
      ) : section == 'Video' ? (
        <LinkedinVideoLeft
          workspaceId={workspaceId}
          selectedVideo={selectedVideo}
          setSelectedVideo={setSelectedVideo}
          videoMedia={videoMedia}
          setVideoMedia={setVideoMedia}
          refetchVideoDrafts={refetchVideoDrafts}
          setRefetchVideoDrafts={setRefetchVideoDrafts}
          setVideoRight={setRightVideoSelected}
          isPremium={isPremium}
          userId={userId}
        />
      ) : section == 'Multi-Image' ? (
        <LinkedinMultiimageLeft
          workspaceId={workspaceId}
          selectedMultiimage={selectedMultiimage}
          setSelectedMultiimage={setSelectedMultiimage}
          multiimageMedia={multiimageMedia}
          setMultiimageMedia={setMultiimageMedia}
          refetchMultiimageDrafts={refetchMultiimageDrafts}
          setRefetchMultiimageDrafts={setRefetchMultiimageDrafts}
          setRightMultiimageSelected={setRightMultiimageSelected}
          selectedMultiimageIndex={selectedMultiimageIndex}
          setSelectedMultiimageIndex={setSelectedMultiimageIndex}
          isPremium={isPremium}
          userId={userId}
        />
      ) : section == 'Poll' ? (
        <LinkedinPolleft
          workspaceId={workspaceId}
          selectedPoll={selectedPoll}
          setSelectedPoll={setSelectedPoll}
          refetchPollDrafts={refetchPollDrafts}
          setRefetchPollDrafts={setRefetchPollDrafts}
          isPremium={isPremium}
          userId={userId}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
