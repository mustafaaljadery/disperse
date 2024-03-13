import { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../../utils/apiUrl';
const url = require('url');
const http = require('http');
const sizeOf = require('image-size');

async function getGoogleUrl(viewId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(`${apiUrl()}view/read/googleurl`, {
      params: { viewId: viewId },
    });
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

interface Props {
  viewId: string;
}

export function ImageContent({ viewId }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [googleUrl, setGoogleUrl] = useState<any>(null);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    getGoogleUrl(viewId).then((value) => {
      const imgUrl = value;
      const options = url.parse(imgUrl);
      http.get(options, function (response: any) {
        const chunks: any = [];
        response
          .on('data', function (chunk: any) {
            chunks.push(chunk);
          })
          .on('end', function () {
            const buffer = Buffer.concat(chunks);
            setHeight(sizeOf(buffer).height);
            setWidth(sizeOf(buffer).width);
            if (sizeOf(buffer).height > 850) {
              setWidth(
                (sizeOf(buffer).width / sizeOf(buffer).height) * 850
              );
              setHeight(850);
            } else if (sizeOf(buffer).width > 1000) {
              setHeight(
                (sizeOf(buffer).height / sizeOf(buffer).width) * 1000
              );
              setWidth(1000);
            }
          });
      });
      setGoogleUrl(value);
    });
  }, []);

  return (
    <div className="h-full flex flex-col space-y-12 justify-center w-full items-center bg-[#FDFDFD]">
      <div className="flex flex-row justify-end items-end w-full px-4 md:px-12">
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
      <div className="2xl:w-[1000px] h-[850px] flex flex-col justify-center items-center relative">
        <Draggable bounds={'parent'}>
          <img src={googleUrl} width={width} height={height} />
        </Draggable>
      </div>
    </div>
  );
}
