import Draggable from 'react-draggable'; // The default
import { useState } from 'react';

interface Props {
  googleUrl: string;
}

export function PlayerImageViewer({ googleUrl }: Props) {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(1000);

  return (
    <div className="h-full flex py-10 flex-col space-y-32 justify-center items-center w-full  bg-[#FDFDFD]">
      <div className="flex flex-row justify-end items-end w-full px-12">
        <div className="flex flex-row w-36 rounded bg-[#4C4C4C] py-1 px-4 space-x-4">
          <button
            onClick={() => {
              setHeight(height / 1.25);
              setWidth(width / 1.25);
            }}
            className="w-1/6 p-1.5 flex flex-col justify-center items-center rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              className="my-auto"
            >
              <path fill="white" d="M0 10h24v4h-24z" />
            </svg>
          </button>
          <p className="w-2/3 text-white text-sm flex flex-col justify-center items-center silka-medium">
            {width > 1000
              ? 100
              : parseInt(String((width / 1000) * 100))}
            %
          </p>
          <button
            onClick={() => {
              setHeight(height * 1.25);
              setWidth(width * 1.25);
            }}
            className="w-1/6 p-1.5 flex flex-col justify-center items-center rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              className="my-auto"
            >
              <path
                fill="white"
                d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="2xl:w-[1000px] h-full max-w-full max-h-[90%] w-[850px] flex flex-col justify-center items-center relative">
        <Draggable bounds={'parent'}>
          <img
            src={googleUrl}
            width={width}
            height={height}
            className="max-h-full"
          />
        </Draggable>
      </div>
    </div>
  );
}
