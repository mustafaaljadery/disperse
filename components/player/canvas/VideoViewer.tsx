import React from 'react';
import ReactPlayer from 'react-player';

interface Props {
  url: string;
}

export function PlayerVideoViewer({ url }: Props) {
  return (
    <div className="h-full bg-black flex flex-col space-y-32 justify-center items-center w-full">
      <ReactPlayer
        className="h-full w-full"
        width="100%"
        height="100%"
        url={url}
        controls={true}
      />
    </div>
  );
}
