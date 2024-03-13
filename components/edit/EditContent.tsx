import { Player } from '@remotion/player';
import {
  useCurrentFrame,
  AbsoluteFill,
  Video,
  Sequence,
  spring,
  Audio,
} from 'remotion';
import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import { apiUrl } from '../../utils/apiUrl';
import { clsx } from 'clsx';

interface Props {
  file: string;
  compositionId: string;
  captionOpen: boolean;
  workspaceId: string;
  aspectRatio: string;
  contentFit: string;
  adhdVideo: string;
  audio: string;
  position: string;
  alignment: string;
  font: string;
  size: string;
  capitalization: string;
  start: number;
  end: number;
  refetch: boolean;
  setRefetch: Dispatch<SetStateAction<boolean>>;
  color: string;
  wordsPerLine: string;
  effect: string;
}

interface CaptionsProps {
  captions: any;
  font: string;
  alignment: string;
  position: string;
  size: string;
  capitalization: string;
  color: string;
  wordsPerLine: string;
  effect: string;
}

async function getCaptions(compositionId: string) {
  try {
    const result = await axios.get(
      `${apiUrl()}editor/read/captions`,
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

// function to get the video duration from remote server
async function getFileDetails(fileId: string, workspaceId: string) {
  try {
    const result = await axios.get(`${apiUrl()}editor/read/file`, {
      params: {
        fileId: fileId,
        workspaceId: workspaceId,
      },
    });
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function getAdhdVideo(name: string) {
  try {
    const result = await axios.get(`${apiUrl()}editor/read/getadhd`, {
      params: {
        name: name,
      },
    });
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function getAudio(name: string) {
  try {
    const result = await axios.get(
      `${apiUrl()}editor/read/getaudio`,
      {
        params: {
          name: name,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

function Captions({
  captions,
  font,
  alignment,
  position,
  size,
  capitalization,
  color,
  wordsPerLine,
  effect,
}: CaptionsProps) {
  let word_groups: any = [];

  const chunkSize =
    wordsPerLine == 'One' ? 1 : wordsPerLine == 'Three' ? 3 : 5;

  const effectTailwind = 0;

  for (let i = 0; i < captions.length; i += chunkSize) {
    const chunk = captions.slice(i, i + chunkSize);
    word_groups.push({
      start: chunk[0].start,
      end: chunk[chunk.length - 1].end,
      words: chunk,
    });
  }

  return (
    <>
      {word_groups.map((value: any, index: number) => {
        return (
          <Sequence
            className={clsx(
              'flex p-8 flex-col items-center',
              position == 'Top'
                ? 'justify-start'
                : position == 'Middle'
                ? 'justify-center'
                : 'justify-end'
            )}
            from={30 * (value?.start / 1000)}
            durationInFrames={
              30 * ((value?.end - value?.start) / 1000)
            }
          >
            <p
              style={{
                fontSize: size,
                lineHeight: '64px',
                color: color,
              }}
              className={clsx(
                effect == 'Default'
                  ? ''
                  : effect == 'Shadow'
                  ? 'drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'
                  : 'textshadow',
                font?.toLowerCase().replace(' ', '-') + '-font',
                alignment == 'Left'
                  ? 'text-start'
                  : alignment == 'Middle'
                  ? 'text-center'
                  : 'text-end'
              )}
            >
              {value?.words.map((text: any, i: number) => {
                let text_value: any;
                if (capitalization == 'None') {
                  text_value = text?.text;
                } else if (capitalization == 'Uppercase') {
                  text_value = text?.text.toUpperCase();
                } else {
                  text_value = text?.text.toLowerCase();
                }
                return (
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '0 0.7rem',
                      transform: `scale(${spring({
                        fps: 30,
                        frame: useCurrentFrame(),
                        delay: (text?.start / 1000) * 30 - 2,
                        config: {
                          damping: 100,
                          stiffness: 200,
                          mass: 0.5,
                        },
                      })})`,
                    }}
                    className="px-1"
                  >
                    {text_value}
                  </span>
                );
              })}
            </p>
          </Sequence>
        );
      })}
    </>
  );
}

export function MyVideo(props: any) {
  const {
    start,
    end,
    url,
    captionOpen,
    adhdVideo,
    adhdVideoUrl,
    captions,
    position,
    font,
    alignment,
    size,
    capitalization,
    color,
    wordsPerLine,
    audio,
    audioUrl,
    contentFit,
    effect,
  } = props;

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height: '100%',
        width: '100%',
      }}
    >
      <div className={'w-full ' + (adhdVideo ? 'h-1/2' : 'h-full')}>
        <Video
          startFrom={start * 30}
          className={
            contentFit == 'Fill'
              ? 'object-cover w-full h-full'
              : 'object-contain w-full h-full'
          }
          src={url}
        />
      </div>
      {adhdVideo && (
        <div className="h-1/2 w-full">
          <Video
            className="object-cover w-full h-full"
            src={adhdVideoUrl}
            muted
          />
        </div>
      )}
      {audio && <Audio volume={0.5} src={audioUrl} />}
      {captionOpen && (
        <Captions
          font={font}
          captions={captions}
          alignment={alignment}
          position={position}
          capitalization={capitalization}
          size={size}
          color={color}
          wordsPerLine={wordsPerLine}
          effect={effect}
        />
      )}
    </AbsoluteFill>
  );
}

export function EditContent({
  file,
  compositionId,
  workspaceId,
  aspectRatio,
  contentFit,
  adhdVideo,
  audio,
  captionOpen,
  position,
  font,
  size,
  alignment,
  capitalization,
  start,
  end,
  refetch,
  setRefetch,
  color,
  wordsPerLine,
  effect,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [fileFound, setFileFound] = useState(false);
  const [url, setUrl] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [adhdVideoUrl, setAdhdVideoUrl] = useState('');
  const [captions, setCaptions] = useState('');

  const [fileLoading, setFileLoading] = useState(false);
  const [adhdVideoLoading, setAdhdVideoLoading] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);
  const [captionsLoading, setCaptionsLoading] = useState(false);

  useEffect(() => {
    setFileLoading(true);
    if (file && workspaceId) {
      getFileDetails(file, workspaceId).then((value) => {
        setUrl(value?.url);
        setFileFound(true);
        setFileLoading(false);
      });
    } else {
      setFileFound(false);
      setFileLoading(false);
    }
  }, [file, workspaceId]);

  useEffect(() => {
    if (adhdVideo) {
      setAdhdVideoLoading(true);
      getAdhdVideo(adhdVideo).then((value) => {
        setAdhdVideoUrl(value?.url);
        setAdhdVideoLoading(false);
      });
    }
  }, [adhdVideo]);

  useEffect(() => {
    if (audio) {
      setAudioLoading(true);
      getAudio(audio).then((value) => {
        setAudioUrl(value?.url);
        setAudioLoading(false);
      });
    }
  }, [audio]);

  useEffect(() => {
    if (captionOpen && !refetch) {
      setCaptionsLoading(true);
      getCaptions(compositionId).then((value) => {
        setCaptions(value);
        setCaptionsLoading(false);
      });
    }
  }, [captionOpen, refetch]);

  useEffect(() => {
    if (
      !fileLoading &&
      !adhdVideoLoading &&
      !audioLoading &&
      !captionsLoading
    ) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [fileLoading, adhdVideoLoading, audioLoading, captionsLoading]);

  return (
    <main className="bg-[#F7F7F7] w-full h-full p-10 flex flex-col justify-center items-center">
      {isLoading ? (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-spin"
        >
          <g clipPath="url(#clip0_1405_2)">
            <path
              d="M4.84457 21.6005C4.13345 21.0227 3.95568 20.0005 4.53345 19.2449C5.11123 18.5338 6.13345 18.3116 6.88901 18.8894C7.24457 19.1116 7.55568 19.3783 7.95568 19.556C11.289 21.3783 15.4223 20.756 18.089 18.0449C18.7557 17.3783 19.7779 17.3783 20.4446 18.0449C21.0668 18.7116 21.0668 19.7783 20.4446 20.4005C16.7112 24.1783 10.9335 25.1116 6.31123 22.5338C5.7779 22.2671 5.28901 21.9116 4.84457 21.6005Z"
              fill="#FF623D"
            />
            <path
              d="M23.8224 13.9555C23.6891 14.8888 22.8002 15.511 21.8669 15.3777C20.9335 15.2444 20.3558 14.3555 20.4891 13.4221C20.578 12.9332 20.578 12.4444 20.578 11.9555C20.578 8.0888 18.0446 4.75547 14.4891 3.73325C13.6002 3.51103 13.0669 2.53325 13.3335 1.64436C13.6002 0.755471 14.4891 0.222137 15.4224 0.488804C20.4446 1.95547 23.9558 6.62214 23.9558 11.9999C23.9558 12.6666 23.9113 13.3332 23.8224 13.9555Z"
              fill="#FF623D"
            />
            <path
              d="M7.42222 0.843445C8.26667 0.487889 9.24445 0.932334 9.55556 1.82122C9.86667 2.71011 9.46667 3.68789 8.62222 4.04344C5.42222 5.33233 3.28889 8.48789 3.28889 12.0879C3.28889 12.799 3.37778 13.5101 3.55556 14.1768C3.77778 15.0657 3.24444 15.999 2.35556 16.2212C1.46667 16.4434 0.577778 15.9101 0.355556 14.9768C0.133333 13.999 0 13.0212 0 12.0434C0 7.02122 2.97778 2.62122 7.42222 0.843445Z"
              fill="#FF623D"
            />
          </g>
          <defs>
            <clipPath id="clip0_1405_2">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ) : fileFound ? (
        <Player
          component={MyVideo}
          durationInFrames={30 * (end - start)}
          style={{
            marginBottom: '40px',
            //   height: '100%',
            width: '100%',
            backgroundColor: 'black',
            borderRadius: '10px',
          }}
          compositionWidth={
            aspectRatio == '1:1' || aspectRatio == '9:16'
              ? 1080
              : 1920
          }
          compositionHeight={
            aspectRatio == '1:1' || aspectRatio == '16:9'
              ? 1080
              : 1920
          }
          fps={30}
          controls
          autoPlay
          inputProps={{
            start: start,
            end: end,
            url: url,
            captionOpen: captionOpen,
            adhdVideo: adhdVideo,
            adhdVideoUrl: adhdVideoUrl,
            captions: captions,
            position: position,
            font: font,
            size: size,
            alignment: alignment,
            capitalization: capitalization,
            color: color,
            wordsPerLine: wordsPerLine,
            audio: audio,
            audioUrl: audioUrl,
            contentFit: contentFit,
            effect: effect,
          }}
        />
      ) : (
        <div className="flex flex-col justify-center items-center">
          <div className="p-3 rounded-xl bg-[#F6E7E3] w-fit">
            <svg
              width="36"
              height="36"
              viewBox="0 0 32 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_1540_2)">
                <path
                  d="M20.9023 27.7501H3.0977C1.5274 27.7501 0.25 26.4728 0.25 24.9024V11.0977C0.25 9.5274 1.5273 8.25 3.0977 8.25H20.9024C22.4727 8.25 23.7501 9.5273 23.7501 11.0977V24.9024C23.7501 26.4727 22.4727 27.7501 20.9023 27.7501ZM3.0977 9.7501C2.3545 9.7501 1.75 10.3546 1.75 11.0978V24.9025C1.75 25.6457 2.3545 26.2502 3.0977 26.2502H20.9024C21.6456 26.2502 22.2501 25.6457 22.2501 24.9025V11.0978C22.2501 10.3546 21.6456 9.7501 20.9024 9.7501H3.0977Z"
                  fill="#FF623D"
                />
                <path
                  d="M17 21.75H7C6.0352 21.75 5.25 20.9648 5.25 20V16C5.25 15.0352 6.0352 14.25 7 14.25H17C17.9648 14.25 18.75 15.0352 18.75 16V20C18.75 20.9648 17.9648 21.75 17 21.75ZM7 15.75C6.8623 15.75 6.75 15.8623 6.75 16V20C6.75 20.1377 6.8623 20.25 7 20.25H17C17.1377 20.25 17.25 20.1377 17.25 20V16C17.25 15.8623 17.1377 15.75 17 15.75H7Z"
                  fill="#FF623D"
                />
                <path
                  d="M30.0009 26.1342C29.7343 26.1342 29.4667 26.0717 29.2177 25.9477L22.665 22.6713C22.4101 22.5443 22.25 22.2846 22.25 22.0004V14.0004C22.25 13.7162 22.4102 13.4565 22.665 13.3295L29.2177 10.0531C29.7646 9.77969 30.4003 9.80989 30.9208 10.1302C31.4394 10.4515 31.7499 11.0081 31.7499 11.6185V24.3822C31.7499 24.9926 31.4394 25.5492 30.9208 25.8705C30.6376 26.0453 30.3192 26.1342 30.0009 26.1342ZM29.8876 24.6059C29.996 24.6606 30.0868 24.6215 30.1317 24.5952C30.1756 24.5679 30.2499 24.5034 30.2499 24.3823V11.6186C30.2499 11.4975 30.1757 11.4331 30.1317 11.4057C30.0868 11.3793 29.996 11.3403 29.8876 11.395L23.7499 14.4643V21.5366L29.8876 24.6059Z"
                  fill="#FF623D"
                />
                <path
                  d="M15.9707 9.75C15.7007 9.75 15.4395 9.6035 15.3057 9.3477L13.4258 5.75H6C4.4834 5.75 3.25 4.5166 3.25 3C3.25 2.2578 3.54 1.5664 4.0664 1.0527C4.5654 0.54 5.2568 0.25 6 0.25H16.1201C16.3813 0.25 16.624 0.3857 16.7602 0.6094L17.3408 1.5596L21.122 8.6475C21.3163 9.0127 21.1786 9.4668 20.8124 9.6621C20.4472 9.8564 19.994 9.7187 19.7978 9.3525L15.6997 1.75H6C5.665 1.75 5.355 1.8789 5.1274 2.1133C4.8789 2.3555 4.75 2.6651 4.75 3C4.75 3.6895 5.3105 4.25 6 4.25H13.8799C14.1592 4.25 14.4151 4.4053 14.5445 4.6523L16.6348 8.6523C16.8267 9.0195 16.6846 9.4726 16.3174 9.665C16.2066 9.7226 16.0879 9.75 15.9707 9.75Z"
                  fill="#FF623D"
                />
              </g>
              <defs>
                <clipPath id="clip0_1540_2">
                  <rect width="32" height="28" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <h1 className="text-4xl mt-8 silka-bold text-center">
            No Video Selected
          </h1>
          <p className="text-base mt-3 silka-regular text-gray-500 text-center">
            Please upload a video to get started with editing.
          </p>
        </div>
      )}
    </main>
  );
}
