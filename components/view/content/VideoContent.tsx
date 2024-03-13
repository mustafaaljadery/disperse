import { useEffect, useState } from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../../utils/apiUrl';
import ReactPlayer from 'react-player';

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

export function VideoContent({ viewId }: Props) {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getGoogleUrl(viewId).then((res) => {
      setUrl(res);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center bg-black">
        <div className="p-3 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path d="M22 1v2h-2v-2h-2v4h-12v-4h-2v2h-2v-2h-2v22h2v-2h2v2h2v-4h12v4h2v-2h2v2h2v-22h-2zm-18 18h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2v-2h2v2zm6 8v-6l5 3-5 3zm12 4h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2v-2h2v2z" />
          </svg>
        </div>
        <div className="flex flex-row space-x-4">
          <span className="animate-ping h-3.5 w-3.5 my-auto rounded-full bg-[#FF623D] opacity-75"></span>
          <p className="silka-medium my-auto text-white">
            Video Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-black flex flex-col justify-center items-center w-full">
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
