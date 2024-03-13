import { Dispatch, SetStateAction } from 'react';
import { OptionsSidebar } from './sidebar/Options';
import { TextSidebar } from './sidebar/Text';
import { MediaSidebar } from './sidebar/Media';
import { AISideebar } from './sidebar/AI';
import { EffectsSidebar } from './sidebar/Effects';
import { Scroll } from '../utils/Scroll';

interface Props {
  workspaceId: string;
  userId: string;
  sidebarSelected: string;
  setSidebarSelected: Dispatch<SetStateAction<string>>;
  contentFit: string;
  setContentFit: Dispatch<SetStateAction<string>>;
  aspectRatio: string;
  setAspectRatio: Dispatch<SetStateAction<string>>;
  captionOptions: boolean;
  setCaptionOptions: Dispatch<SetStateAction<boolean>>;
  font: string;
  setFont: Dispatch<SetStateAction<string>>;
  position: string;
  setPosition: Dispatch<SetStateAction<string>>;
  size: string;
  setSize: Dispatch<SetStateAction<string>>;
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
  alignment: string;
  setAlignment: Dispatch<SetStateAction<string>>;
  capitalization: string;
  setCapitalization: Dispatch<SetStateAction<string>>;
  transition: string;
  setTransition: Dispatch<SetStateAction<string>>;
  file: string;
  setFile: Dispatch<SetStateAction<string>>;
  compositionId: string;
  adhdVideo: string;
  setAdhdVideo: Dispatch<SetStateAction<string>>;
  audio: string;
  setAudio: Dispatch<SetStateAction<string>>;
  start: number;
  setStart: Dispatch<SetStateAction<number>>;
  end: number;
  setEnd: Dispatch<SetStateAction<number>>;
  wordsPerLine: string;
  setWordsPerLine: Dispatch<SetStateAction<string>>;
  effect: string;
  setEffect: Dispatch<SetStateAction<string>>;
  duration: number;
  refetch: boolean;
  setRefetch: Dispatch<SetStateAction<boolean>>;
  folder: any;
  setFolder: Dispatch<SetStateAction<any>>;
  folders: any;
  setFolders: Dispatch<SetStateAction<any>>;
  generating: boolean;
  setGenerating: Dispatch<SetStateAction<boolean>>;
}

export function EditSidebar({
  compositionId,
  userId,
  workspaceId,
  sidebarSelected,
  setSidebarSelected,
  contentFit,
  setContentFit,
  aspectRatio,
  setAspectRatio,
  captionOptions,
  setCaptionOptions,
  font,
  setFont,
  position,
  setPosition,
  size,
  setSize,
  color,
  setColor,
  alignment,
  setAlignment,
  capitalization,
  setCapitalization,
  transition,
  setTransition,
  file,
  setFile,
  adhdVideo,
  setAdhdVideo,
  audio,
  setAudio,
  start,
  setStart,
  end,
  setEnd,
  wordsPerLine,
  setWordsPerLine,
  effect,
  setEffect,
  duration,
  refetch,
  setRefetch,
  folder,
  setFolder,
  folders,
  setFolders,
  generating,
  setGenerating,
}: Props) {
  return (
    <div>
      <Scroll>
        <div className="bg-white min-w-[360px] w-[360px] flex flex-col h-full px-3 pt-3 overflow-auto pb-20">
          <h2 className="text-sm silka-semibold text-[#363636]">
            {sidebarSelected}
          </h2>
          {sidebarSelected === 'Options' ? (
            <OptionsSidebar
              contentFit={contentFit}
              setContentFit={setContentFit}
              aspectRatio={aspectRatio}
              setAspectRatio={setAspectRatio}
              start={start}
              setStart={setStart}
              end={end}
              setEnd={setEnd}
              duration={duration}
            />
          ) : sidebarSelected == 'Text' ? (
            <TextSidebar
              generating={generating}
              setGenerating={setGenerating}
              compositionId={compositionId}
              captionOptions={captionOptions}
              setCaptionOptions={setCaptionOptions}
              font={font}
              setFont={setFont}
              position={position}
              setPosition={setPosition}
              size={size}
              setSize={setSize}
              color={color}
              setColor={setColor}
              alignment={alignment}
              setAlignment={setAlignment}
              capitalization={capitalization}
              setCapitalization={setCapitalization}
              transition={transition}
              setTransition={setTransition}
              file={file}
              setFile={setFile}
              wordsPerLine={wordsPerLine}
              setWordsPerLine={setWordsPerLine}
              effect={effect}
              setEffect={setEffect}
            />
          ) : sidebarSelected == 'Media' ? (
            <MediaSidebar
              file={file}
              setFile={setFile}
              workspaceId={workspaceId}
              userId={userId}
              setRefetch={setRefetch}
              folder={folder}
              setFolder={setFolder}
              folders={folders}
              setFolders={setFolders}
            />
          ) : sidebarSelected == 'Effects' ? (
            <EffectsSidebar
              setAdhdVideo={setAdhdVideo}
              adhdVideo={adhdVideo}
              setAudio={setAudio}
              audio={audio}
            />
          ) : (
            <AISideebar />
          )}
        </div>
      </Scroll>
    </div>
  );
}
