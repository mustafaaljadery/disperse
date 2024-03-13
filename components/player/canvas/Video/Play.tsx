import { Dispatch, SetStateAction } from 'react';

interface Props {
  videoRef: any;
  setPlaying: Dispatch<SetStateAction<boolean>>;
}

export function VideoViewerPlay({ videoRef, setPlaying }: Props) {
  return (
    <button
      onClick={() => {
        videoRef.current.play();
        setPlaying(false);
      }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M2.25 16.5V1.5L15.75 9L2.25 16.5Z" fill="white" />
      </svg>
    </button>
  );
}
