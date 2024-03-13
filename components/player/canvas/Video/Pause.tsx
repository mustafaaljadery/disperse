import { Dispatch, SetStateAction } from 'react';

interface Props {
  videoRef: any;
  setPlaying: Dispatch<SetStateAction<boolean>>;
}

export function VideoViewerPause({ videoRef, setPlaying }: Props) {
  return (
    <button
      onClick={() => {
        videoRef.current.pause();
        setPlaying(true);
      }}
    >
      test
    </button>
  );
}
