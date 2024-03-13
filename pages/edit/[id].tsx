import { useState, useEffect } from 'react';
import { EditTopbar } from '../../components/edit/EditTopbar';
import { EditSidebar } from '../../components/edit/EditSidebar';
import { EditContent } from '../../components/edit/EditContent';
import axios from 'axios';
import { apiUrl } from '../../utils/apiUrl';
import { useRouter } from 'next/router';
import { LoadingScreen } from '../../components/Loading';
import EditDoesntExist from '../../components/edit/EditDoesntExist';
import { PageHead } from '../../layouts/PageHead';
import { useSession } from 'next-auth/react';
import compositionState from '../../utils/compositionState';
import remotionState from '../../utils/remotionState';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { CompositionRenameDialog } from '../../components/edit/RenameDialog';

async function getComposition(compositionId: string) {
  try {
    const result = await axios.get(
      `${apiUrl()}editor/read/composition`,
      {
        params: {
          compositionId: compositionId,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function updateComposition(
  compositionId: string,
  contentFit: string,
  aspectRatio: string,
  captionOptions: boolean,
  font: string,
  position: string,
  size: string,
  color: string,
  alignment: string,
  capitalization: string,
  transition: string,
  file: string,
  adhdVideo: string,
  audio: string,
  start: number,
  end: number,
  effect: string,
  wordsPerLine: string
) {
  try {
    const result = await axios.post(
      `${apiUrl()}editor/update/composition`,
      null,
      {
        params: {
          compositionId: compositionId,
          contentFit: contentFit,
          aspectRatio: aspectRatio,
          captionOptions: captionOptions,
          font: font,
          position: position,
          size: size,
          color: color,
          alignment: alignment,
          capitalization: capitalization,
          transition: transition,
          file: file,
          adhdVideo: adhdVideo,
          audio: audio,
          start: start,
          end: end,
          effect: effect,
          wordsPerLine: wordsPerLine,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

export default function EditComp() {
  const router = useRouter();
  const [workspaceId, setWorkspaceId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarSelected, setSidebarSelected] =
    useState<string>('Media');
  const [notFound, setNotFound] = useState(false);
  const [name, setName] = useState<string>('');
  const { data: session } = useSession();
  const [refetch, setRefetch] = useState<boolean>(false);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [duration, setDuration] = useState<any>(0);
  const { compositionId, setCompositionId } = compositionState();
  const { remotionRefetch, setRemotionRefetch } = remotionState();
  const [renameOpen, setRenameOpen] = useState(false);

  // Options
  const [contentFit, setContentFit] = useState<string>('');
  const [aspectRatio, setAspectRatio] = useState<string>('');
  // Text
  const [captionOptions, setCaptionOptions] = useState<any>(false);
  const [font, setFont] = useState<string>('');
  const [position, setPosition] = useState<string>('');
  const [size, setSize] = useState<string>('');
  const [color, setColor] = useState<string>('#363636');
  const [alignment, setAlignment] = useState<string>('');
  const [capitalization, setCapitalization] = useState<string>('');
  const [transition, setTransition] = useState<string>('');
  const [wordsPerLine, setWordsPerLine] = useState<string>('');
  const [effect, setEffect] = useState<string>('');
  const [generating, setGenerating] = useState(false);
  // Media
  const [file, setFile] = useState<any>(null);
  const [folder, setFolder] = useState<any>(null);
  const [folders, setFolders] = useState<any>([]);
  // Effects
  const [audio, setAudio] = useState<any>(null);
  const [adhdVideo, setAdhdVideo] = useState<any>(null);

  useEffect(() => {
    if (router.isReady) {
      getComposition(router.query.id as string).then((data) => {
        if (data.message == 'not found') {
          setNotFound(true);
        }
        setDuration(Math.floor(data?.duration as number));
        setName(data?.name as string);
        setWorkspaceId(data?.workspaceId as string);
        setCompositionId(data?.id as string);
        setContentFit(data?.contentFit as string);
        setAdhdVideo(data?.adhd_video as string);
        setAspectRatio(data?.aspectRatio as string);
        setCaptionOptions(data?.captionOptions as boolean);
        setFont(data?.font as string);
        setPosition(data?.position as string);
        setSize(data?.size as string);
        setColor(data?.color as string);
        setAlignment(data?.alignment as string);
        setCapitalization(data?.capitalization as string);
        setTransition(data?.transition as string);
        setFile(data?.fileId as string);
        setStart(data?.start as number);
        setEnd(data?.end as number);
        setEffect(data?.effect as string);
        setWordsPerLine(data?.wordsPerLine as string);
        setRefetch(true);
        setIsLoading(false);
      });
    }
  }, [router.isReady]);

  useEffect(() => {
    if (!isLoading) {
      updateComposition(
        compositionId,
        contentFit,
        aspectRatio,
        file ? captionOptions : false,
        font,
        position,
        size,
        color,
        alignment,
        capitalization,
        transition,
        file,
        adhdVideo,
        audio,
        start,
        end,
        effect,
        wordsPerLine
      ).then((data: any) => {
        setRemotionRefetch(true);
        if (refetch) {
          setDuration(Math.floor(data?.duration as number));
          setName(data?.name as string);
          setWorkspaceId(data?.workspaceId as string);
          setCompositionId(data?.id as string);
          setContentFit(data?.contentFit as string);
          setAdhdVideo(data?.adhd_video as string);
          setAspectRatio(data?.aspectRatio as string);
          setCaptionOptions(data?.captionOptions as boolean);
          setFont(data?.font as string);
          setPosition(data?.position as string);
          setSize(data?.size as string);
          setColor(data?.color as string);
          setAlignment(data?.alignment as string);
          setCapitalization(data?.capitalization as string);
          setTransition(data?.transition as string);
          setFile(data?.fileId as string);
          setStart(data?.start as number);
          setEnd(Math.floor(data?.duration as number));
          setEffect(data?.effect as string);
          setWordsPerLine(data?.wordsPerLine as string);
          setRefetch(false);
        }
      });
    }
  }, [
    contentFit,
    aspectRatio,
    captionOptions,
    font,
    position,
    size,
    color,
    alignment,
    capitalization,
    transition,
    file,
    adhdVideo,
    audio,
    start,
    end,
    effect,
    wordsPerLine,
  ]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (notFound) {
    return <EditDoesntExist />;
  }

  return (
    <PageHead title={`${name} · Edit Disperse`}>
      <div className="flex flex-col overflow-hidden h-[100vh]">
        <EditTopbar
          aspectRatio={aspectRatio}
          start={start}
          end={end}
          workspaceId={workspaceId}
          compositionId={compositionId}
          sidebarSelected={sidebarSelected}
          setSidebarSelected={setSidebarSelected}
          file={file}
          captionsOpen={captionOptions}
          adhdVideo={adhdVideo}
          position={position}
          font={font}
          alignment={alignment}
          size={size}
          capitalization={capitalization}
          color={color}
          wordsPerLine={wordsPerLine}
          audio={audio}
          refetch={refetch}
          setRenameOpen={setRenameOpen}
          project={folder}
          setProject={setFolder}
          projects={folders}
          userId={String(session?.user?.id)}
          userName={String(session?.user?.name)}
          email={String(session?.user?.email)}
          contentFit={contentFit}
        />
        <div className="flex w-full h-full flex-1 divide-y flex-row">
          <EditSidebar
            generating={generating}
            setGenerating={setGenerating}
            workspaceId={workspaceId}
            sidebarSelected={sidebarSelected}
            setSidebarSelected={setSidebarSelected}
            contentFit={contentFit}
            setContentFit={setContentFit}
            aspectRatio={aspectRatio}
            setAspectRatio={setAspectRatio}
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
            compositionId={compositionId}
            audio={audio}
            setAudio={setAudio}
            adhdVideo={adhdVideo}
            setAdhdVideo={setAdhdVideo}
            userId={session?.user?.id as string}
            start={start}
            setStart={setStart}
            end={end}
            setEnd={setEnd}
            wordsPerLine={wordsPerLine}
            setWordsPerLine={setWordsPerLine}
            effect={effect}
            setEffect={setEffect}
            duration={duration}
            refetch={refetch}
            setRefetch={setRefetch}
            folder={folder}
            setFolder={setFolder}
            folders={folders}
            setFolders={setFolders}
          />
          <EditContent
            file={file}
            workspaceId={workspaceId}
            aspectRatio={aspectRatio}
            contentFit={contentFit}
            adhdVideo={adhdVideo}
            audio={audio}
            captionOpen={captionOptions}
            compositionId={compositionId}
            position={position}
            color={color}
            alignment={alignment}
            font={font}
            size={size}
            capitalization={capitalization}
            start={start}
            end={end}
            refetch={refetch}
            setRefetch={setRefetch}
            wordsPerLine={wordsPerLine}
            effect={effect}
          />
        </div>
        <DialogPrimitive.Root
          open={renameOpen}
          onOpenChange={setRenameOpen}
        >
          <CompositionRenameDialog
            open={renameOpen}
            setIsOpen={setRenameOpen}
            compositionId={compositionId}
            name={name}
            setName={setName}
          />
        </DialogPrimitive.Root>
      </div>
    </PageHead>
  );
}
