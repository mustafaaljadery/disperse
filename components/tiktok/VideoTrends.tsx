import { useState, useEffect } from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../utils/apiUrl';
import { TikTokEmbed } from 'react-social-media-embed';

interface VideoComponentProps {
  value: any;
}

async function getTrends() {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}tiktok/read/videotrends`,
      { params: {} }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

function VideoComponent({ value }: VideoComponentProps) {
  return (
    <div className="p-2">
      <TikTokEmbed url={value.link} height={500} width={300} />
    </div>
  );
}

export function TiktokVideoTrends() {
  const [isLoading, setIsLoading] = useState(true);
  const [trendsData, setTrendsData] = useState<any>(null);

  useEffect(() => {
    getTrends().then((value) => {
      setTrendsData(value);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="flex flex-col space-y-8 mb-24">
      <div className="flex flex-row justify-between items-between w-full">
        <div className="flex flex-col space-y-1.5 my-auto">
          <h3 className="text-xl silka-semibold text-gray-900">
            Video Trends
          </h3>
          <p className="text-xs silka-medium text-gray-400">
            Recent trending videos on TikTok
          </p>
        </div>
        <p className="my-auto">Last Updated Today</p>
      </div>
      <>
        {isLoading ? (
          <div className="flex flex-col space-y-5">
            <div />
            <div />
            <div />
            <div />
            <div />
          </div>
        ) : (
          <div className="flex flex-row flex-wrap">
            {trendsData.map((value: any, index: number) => {
              return <VideoComponent value={value} key={index} />;
            })}
          </div>
        )}
      </>
    </div>
  );
}
