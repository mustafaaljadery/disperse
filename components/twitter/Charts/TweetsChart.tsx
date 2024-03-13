import axios from 'axios';
import axiosRetry from 'axios-retry';
import { useState, useEffect } from 'react';
import { apiUrl } from '../../../utils/apiUrl';
//@ts-ignore
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

interface TwitterTweetsChartProps {
  timeInterval: string;
  workspaceId: string;
}

function formatLargeNumber(num: number, digits: number) {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, '$1') +
        item.symbol
    : '0';
}

async function getTweets(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}twitter/read/tweetschart`,
      {
        params: {
          workspaceId: workspaceId,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

export function TwitterTweetsChart({
  workspaceId,
  timeInterval,
}: TwitterTweetsChartProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [tweetsData, setTweetsData] = useState<any>(null);
  const [max, setMax] = useState<any>(0);
  const [min, setMin] = useState<any>(0);
  const [tweets, setTweets] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    getTweets(workspaceId).then((value) => {
      setTweetsData(value.results);
      setTweets(value.results.length);
      setMax(value.max);
      setMin(value.min);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="flex mt-8 flex-col p-5 md:p-6 border rounded-lg">
      <div className="flex flex-col space-y-1">
        <h3 className="text-[11px] md:text-xs silka-regular text-gray-600">
          Tweets
        </h3>
        <div className="flex flex-row space-x-2">
          {isLoading ? (
            <div className="h-9 w-24 bg-gray-200 rounded animate-pulse" />
          ) : (
            <p className="text-3xl md:text-4xl text-gray-700 silka-semibold">
              {formatLargeNumber(tweets, 1)}
            </p>
          )}
        </div>
      </div>
      <div className="mt-8 mb-3">
        {isLoading ? (
          <div className="h-[140px] flex flex-col justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="animate-spin"
              width="24px"
              height="24px"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid"
            >
              <circle
                cx="50"
                cy="50"
                fill="none"
                stroke="#FF0000"
                strokeWidth="10"
                r="35"
                strokeDasharray="164.93361431346415 56.97787143782138"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  repeatCount="indefinite"
                  dur="1s"
                  values="0 50 50;360 50 50"
                  keyTimes="0;1"
                ></animateTransform>
              </circle>
            </svg>
          </div>
        ) : (
          <CalendarHeatmap
            startDate={new Date('2022-12-31')}
            endDate={new Date('2023-12-31')}
            values={
              tweetsData
                ? tweetsData
                : [{ count: 2, date: '2023-12-2' }]
            }
            classForValue={(value: any) => {
              if (!value) {
                return 'color-empty';
              }

              const number = Math.ceil((value.count / max) * 10);

              switch (number) {
                case 1:
                  return 'fill-[#E0ECF5]';
                case 2:
                  return 'fill-[#CAE3F4]';
                case 3:
                  return 'fill-[#B5DAF4]';
                case 4:
                  return 'fill-[#9FD1F3]';
                case 5:
                  return 'fill-[#88C7F2]';
                case 6:
                  return 'fill-[#73BFF2]';
                case 7:
                  return 'fill-[#5EB6F2]';
                case 8:
                  return 'fill-[#48ADF1]';
                case 9:
                  return 'fill-[#33A4F1]';
                case 10:
                  return 'fill-[#1D9BF0]';
                default:
                  return 'fill-white';
              }
            }}
          />
        )}
      </div>
    </div>
  );
}
