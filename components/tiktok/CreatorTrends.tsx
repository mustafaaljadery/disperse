import { useState, useEffect } from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../utils/apiUrl';
import { TikTokEmbed } from 'react-social-media-embed';

interface CreatorComponentProps {
  value: any;
}

async function getTrends() {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}tiktok/read/creatortrends`
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

function CreatorComponent({ value }: CreatorComponentProps) {
  return (
    <div className="flex flex-row w-full">
      <div className="w-1/2 flex flex-row space-x-5">
        <img
          src={value.image}
          className="w-[48px] md:w-[96px] h-[48px] md:h-[96px] rounded-full"
        />
        <div className="flex flex-col space-y-3.5 my-auto">
          <p className="text-base md:text-2xl silka-semibold text-gray-900">
            {value.name}
          </p>
          <a
            href={value.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-row space-x-2"
          >
            <p className="text-[11px] md:text-xs silka-medium text-gray-700">
              View on TikTok
            </p>
            <svg
              width="12"
              height="12"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="my-auto"
            >
              <path
                d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
                fill="#363636"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        </div>
      </div>
      <div className="w-1/2 md:w-1/4 flex flex-row justify-between items-between">
        <div className="flex flex-col space-y-1 w-1/2 justify-center items-center">
          <p className="text-xl md:text-2xl silka-semibold text-gray-900">
            {value.followers}
          </p>
          <span className="text-[11px] md:text-xs silka-regular text-gray-400">
            Followers
          </span>
        </div>
        <div className="flex flex-col space-y-1 w-1/2 justify-center items-center">
          <p className="text-xl md:text-2xl silka-semibold text-gray-900">
            {value.likes}
          </p>
          <span className="text-[11px] md:text-xs silka-regular text-gray-400">
            Likes
          </span>
        </div>
      </div>
    </div>
  );
}

export function TiktokCreatorTrends() {
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
      <div className="flex flex-row justify-between items-between">
        <div className="flex flex-col space-y-1.5 my-auto">
          <h3 className="silka-semibold text-lg md:text-xl text-gray-900">
            Creator Trends
          </h3>
          <p className="text-[11px] md:text-xs silka-regular text-gray-400">
            Top 10 trending creators on TikTok
          </p>
        </div>
        <div className="flex flex-row space-x-2 my-auto h-fit">
          <p className="my-auto text-xs md:text-sm silka-medium text-gray-700">
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
            <div />
            <div />
          </div>
        ) : (
          <div className="flex flex-col space-y-5">
            {trendsData?.map((value: any, index: number) => {
              return <CreatorComponent value={value} key={index} />;
            })}
          </div>
        )}
      </>
    </div>
  );
}
