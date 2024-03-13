import { Dispatch, SetStateAction } from 'react';
import { YoutubeShortsDrafts } from './ShortsDrafts';
import { YoutubeShortsLibrary } from './ShortsLibrary';

interface Props {
  workspaceId: string;
  rightShortsSelected: string;
  setRightShortsSelected: Dispatch<SetStateAction<string>>;
  shortsMedia: any;
  setShortsMedia: Dispatch<SetStateAction<any>>;
  selectedShort: any;
  setSelectedShort: Dispatch<SetStateAction<any>>;
  refetchShortsDrafts: boolean;
  setRefetchShortsDrafts: Dispatch<SetStateAction<boolean>>;
}

export function YoutubeShortsRight({
  workspaceId,
  rightShortsSelected,
  setRightShortsSelected,
  shortsMedia,
  setShortsMedia,
  selectedShort,
  setSelectedShort,
  refetchShortsDrafts,
  setRefetchShortsDrafts,
}: Props) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-between">
        <div className="flex flex-row space-x-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              setSelectedShort(null);
              setShortsMedia(null);
            }}
            className="flex flex-row space-x-1 rounded text-xs silka-regular text-white hover:opacity-80  bg-[#FF0000] px-4 py-1"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="my-auto"
            >
              <path
                d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                fill="white"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
            <p>New Short</p>
          </button>
          <button
            onClick={() => {
              setRightShortsSelected('Drafts');
            }}
            className={
              'text-xs px-4 py-1 silka-regular text-gray-800 rounded hover:bg-gray-100 ' +
              (rightShortsSelected == 'Drafts' ? 'bg-gray-50' : '')
            }
          >
            Drafts
          </button>
        </div>
        <button
          onClick={() => {
            setRightShortsSelected('My Media');
          }}
          className={
            'text-xs px-4 py-1 silka-regular text-gray-800 rounded hover:bg-gray-100 ' +
            (rightShortsSelected == 'My Media' ? 'bg-gray-50' : '')
          }
        >
          My Media
        </button>
      </div>
      <div className="flex flex-col">
        {rightShortsSelected == 'Drafts' ? (
          <YoutubeShortsDrafts
            workspaceId={workspaceId}
            draftId={selectedShort}
            setDraftId={setSelectedShort}
            refetchShortsDrafts={refetchShortsDrafts}
            setRefetchShortsDrafts={setRefetchShortsDrafts}
          />
        ) : (
          <YoutubeShortsLibrary
            workspaceId={workspaceId}
            shortsMedia={shortsMedia}
            setShortsMedia={setShortsMedia}
          />
        )}
      </div>
    </div>
  );
}
