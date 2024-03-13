import { useState, useEffect } from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../utils/apiUrl';

interface HashtagComponentProps {
  value: any;
}

async function getTrends() {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}tiktok/read/hashtagtrends`
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

function HashtagComponent({ value }: HashtagComponentProps) {
  return (
    <div className="flex flex-row">
      <div className="w-[12.5%] my-auto flex flex-col space-y-1 items-start">
        <p className="text-3xl silka-semibold text-gray-900">
          {value.rank}
        </p>
        <span className="text-xs silka-medium text-gray-400">
          Rank
        </span>
      </div>
      <div className="w-[87.5%] flex flex-row">
        <div className="w-2/3 md:w-1/3 break-all flex flex-col justify-start items-start space-y-4 my-auto">
          <p className="text-gray-900 text-base md:text-lg silka-medium">
            #{value.hashtag}
          </p>
          {value.subtag ? (
            <span className="text-[11px] md:text-xs text-start silka-regular text-gray-400">
              {value.subtag}
            </span>
          ) : (
            <></>
          )}
        </div>
        <div className="w-1/3 md:w-2/3 flex flex-row space-x-4">
          <div className="hidden w-1/3 md:flex flex-row">
            <div className="flex flex-col space-y-1 justify-center items-center w-1/2">
              <p className="text-xl 2xl:text-2xl silka-semibold text-gray-900">
                {value.posts}
              </p>
              <span className="text-[11px] silka-medium text-gray-400">
                Posts
              </span>
            </div>
            <div className="flex flex-col space-y-1 justify-center items-center w-1/2">
              <p className="text-xl 2xl:text-2xl silka-semibold text-gray-900">
                {value.views}
              </p>
              <span className="text-[11px] silka-medium text-gray-400">
                Views
              </span>
            </div>
          </div>
          <div className="hidden w-1/3 md:flex flex-row space-x-1.5">
            <a
              href={value.creator_1_url}
              target="_blank"
              rel="noopener noreferrer"
              className="my-auto"
            >
              <img
                src={value.creator_1_image}
                className="h-[28px] 2xl:h-[38px] my-auto w-[28px] 2xl:w-[38px] rounded-full"
              />
            </a>
            {value.creator_2_image ? (
              <a
                href={value.creator_2_url}
                target="_blank"
                rel="noopener noreferrer"
                className="my-auto"
              >
                <img
                  src={value.creator_2_image}
                  className="h-[28px] md:h-[38px] my-auto w-[28px] md:w-[38px] rounded-full"
                />
              </a>
            ) : (
              <div className="w-[38px]" />
            )}
            {value.creator_3_image ? (
              <a
                href={value.creator_3_url}
                target="_blank"
                rel="noopener noreferrer"
                className="my-auto"
              >
                <img
                  src={value.creator_3_image}
                  className="h-[28px] md:h-[38px] my-auto w-[28px] md:w-[38px] rounded-full"
                />
              </a>
            ) : (
              <div className="w-[38px]" />
            )}
          </div>
          <div className="w-1/3 md:w-fit flex flex-col justify-center items-center">
            <a
              href={`https://www.tiktok.com/tag/${value.hashtag}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <button className="border px-6 py-1.5 rounded md:rounded-lg text-xs md:text-sm silka-medium hover:bg-gray-50">
                View Hashtag
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TiktokHashtagTrends() {
  const [isLoading, setIsLoading] = useState(true);
  const [trendsData, setTrendsData] = useState<any>(null);

  useEffect(() => {
    getTrends().then((data) => {
      setTrendsData(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="flex flex-col space-y-8 mb-24">
      <div className="flex flex-row justify-between items-between w-full">
        <div className="flex flex-col space-y-1.5 my-auto">
          <h3 className="text-xl silka-semibold text-gray-900">
            Hashtag Trends
          </h3>
          <p className="text-xs silka-regular text-gray-400">
            Top 10 trending hashtags on TikTok
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
            <div />
            <div />
            <div />
            <div />
            <div />
          </div>
        ) : (
          <div className="flex flex-col space-y-8">
            {trendsData.map((value: any, index: number) => {
              return <HashtagComponent value={value} key={index} />;
            })}
          </div>
        )}
      </>
    </div>
  );
}
