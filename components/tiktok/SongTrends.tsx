import { useState, useEffect } from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../utils/apiUrl';

interface SongComponentProps {
  value: any;
}

async function getTrends() {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}tiktok/read/songtrends`
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

function SongComponent({ value }: SongComponentProps) {
  return (
    <div className="flex flex-row">
      <div className="w-[12.5%] flex flex-col space-y-1 justify-center items-start">
        <p className="silka-semibold text-gray-900 text-xl md:text-3xl">
          {value.rank}
        </p>
        <span className="text-[11px] md:text-xs silka-medium text-gray-400">
          Rank
        </span>
      </div>
      <div className="w-[62.5%] my-auto flex flex-row space-x-3 justify-start items-start">
        <img
          src={value.image}
          className="w-[54px] md:w-[96px] h-[54px] md:h-[96px] rounded"
        />
        <div className="flex flex-col space-y-2 my-auto">
          <p className="silka-semibold text-gray-900 text-base md:text-lg">
            {value.name}
          </p>
          <span className="silka-medium text-gray-400 text-xs md:text-sm">
            {value.author}
          </span>
        </div>
      </div>
      <div className="w-1/4 flex flex-col justify-center items-center">
        <a href={value.url} target="_blank" rel="noopener noreferrer">
          <button className="border px-8 py-1.5 text-xs md:text-sm lg:text-base text-gray-900 silka-medium rounded-lg md:rounded-xl hover:bg-gray-50">
            View Sound
          </button>
        </a>
      </div>
    </div>
  );
}

export function TiktokSongTrends() {
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
            Sound Trends
          </h3>
          <p className="text-xs silka-regular text-gray-400">
            Top 10 trending sounds on TikTok
          </p>
        </div>
        <div className="flex flex-row space-x-2 my-auto h-fit">
          <p className="my-auto text-sm silka-medium text-gray-700">
            Last Updated Today
          </p>
          <span className="animate-ping mt-0.5 h-2 w-2 mb-auto rounded-full bg-[#FF623D] opacity-75"></span>
        </div>
      </div>
      <>
        {isLoading ? (
          <div className="flex flex-col space-y-5">
            <div className="" />
            <div className="" />
            <div className="" />
          </div>
        ) : (
          <div className="flex flex-col space-y-8 md:space-y-5">
            {trendsData.map((v: any, i: number) => {
              return <SongComponent value={v} key={i} />;
            })}
          </div>
        )}
      </>
    </div>
  );
}
