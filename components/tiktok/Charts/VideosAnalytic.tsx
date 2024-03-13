import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Bar, Line, Scatter, Bubble } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../../utils/apiUrl';
import { title } from '../../utils/ToolTipTitle';

interface Props {
  workspaceId: string;
  videos: any;
  isPremium: boolean;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

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

async function getVideoAnalytic(workspaceId: string, videos: number) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(`${apiUrl()}tiktok/read/videos`, {
      params: { workspaceId: workspaceId, videos: videos },
    });
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

function between(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function VideosAnalytic({
  workspaceId,
  videos,
  isPremium,
}: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [videosCount, setVideosCount] = useState(0);
  const [chartData, setChartData] = useState<any>(null);
  const [percentChange, setPercentChange] = useState(0);

  const data = {
    labels: chartData,
    datasets: [
      {
        data: chartData,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          title: title,
        },
        enabled: false,
      },
      legend: {
        display: false,
      },
    },
    elements: {
      line: {
        tension: 0,
        borderWidth: 1.5,
        borderColor: '#363636',
        fill: 'start',
        backgroundColor: 'white',
      },
      point: {
        radius: 1.5,
        borderColor: '#363636',
        backgroundColor: '#363636',
        hitRadius: 0,
      },
    },
    scales: {
      xAxis: { display: false },
      yAxis: { display: false },
    },
  };

  useEffect(() => {
    if (videos != null) {
      if (isPremium) {
        setVideosCount(videos);
        getVideoAnalytic(workspaceId, videos).then((value) => {
          setPercentChange(value.percentChange.toFixed(2));
          setChartData(value.data);
          setIsLoading(false);
        });
      } else {
        let second_to_last = between(1, 20000);
        let change: any = parseInt(videos) / second_to_last;
        setVideosCount(videos);
        if (videos < second_to_last) change = -Math.abs(1 - change);
        setPercentChange(change.toFixed(1));
        setChartData([
          between(1, 20000),
          between(1, 20000),
          between(1, 20000),
          second_to_last,
          videos,
        ]);
        setIsLoading(false);
      }
    }
  }, [videos]);

  return (
    <div className="w-1/2 sm:w-1/3 py-3 md:py-0 md:w-1/5 flex flex-col justify-start items-start space-y-1.5 px-6 lg:px-4 xl:px-6">
      <p className="silka-medium text-xs lg:text-[11px] xl:text-xs text-gray-600">
        Videos
      </p>
      <div className="flex flex-row space-x-3 lg:space-x-1.5 xl:space-x-3">
        {isLoading ? (
          <div className="h-9 lg:h-7 xl:h-9 w-20 lg:w-14 xl:w-20 animate-pulse rounded bg-gray-200" />
        ) : (
          <p className="silka-semibold text-3xl lg:text-2xl xl:text-3xl">
            {formatLargeNumber(videosCount, 1)}
          </p>
        )}
        {isLoading ? (
          <div className="h-5 lg:h-4 xl:h-5 w-10 lg:w-8 xl:w-10 my-auto animate-pulse rounded bg-gray-200" />
        ) : (
          <div className="my-auto flex flex-row space-x-1">
            {percentChange == 0 ? (
              <></>
            ) : percentChange < 0 ? (
              <svg
                width="11"
                height="11"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="my-auto"
              >
                <path
                  d="M4.5005 6.511H2.875C2.669 6.511 2.5 6.6785 2.5 6.887C2.5 6.981 2.5355 7.0745 2.603 7.146C3.4455 8.0335 4.949 9.6185 5.6375 10.344C5.732 10.444 5.8635 10.5 6 10.5C6.137 10.5 6.268 10.444 6.3625 10.344C7.051 9.6185 8.555 8.0335 9.3965 7.146C9.4645 7.0745 9.5 6.981 9.5 6.887C9.5 6.6785 9.3315 6.511 9.125 6.511H7.4995V2.001C7.4995 1.7355 7.2645 1.5 6.9995 1.5H5.0005C4.7355 1.5 4.5005 1.7355 4.5005 2.001V6.511Z"
                  fill="#F7483C"
                />
              </svg>
            ) : (
              <svg
                width="11"
                height="11"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="my-auto"
              >
                <path
                  d="M4.5005 5.489H2.875C2.669 5.489 2.5 5.3215 2.5 5.113C2.5 5.019 2.5355 4.9255 2.603 4.854C3.4455 3.9665 4.949 2.3815 5.6375 1.656C5.732 1.556 5.8635 1.5 6 1.5C6.137 1.5 6.268 1.556 6.3625 1.656C7.051 2.3815 8.555 3.9665 9.3965 4.854C9.4645 4.9255 9.5 5.019 9.5 5.113C9.5 5.3215 9.3315 5.489 9.125 5.489H7.4995V9.999C7.4995 10.2645 7.2645 10.5 6.9995 10.5H5.0005C4.7355 10.5 4.5005 10.2645 4.5005 9.999V5.489Z"
                  fill="#5CA06B"
                />
              </svg>
            )}
            <p
              className={
                'silka-semibold my-auto text-sm lg:text-xs xl:text-sm ' +
                (percentChange == 0
                  ? 'text-gray-400'
                  : percentChange < 0
                  ? 'text-[#F7483C]'
                  : 'text-[#5CA06B]')
              }
            >
              {Math.abs(percentChange) > 1000
                ? formatLargeNumber(Math.abs(percentChange), 2)
                : Math.abs(percentChange)}
              %
            </p>
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center items-center w-full">
        {isLoading ? (
          <div className="w-full h-[20px] rounded bg-gray-200" />
        ) : (
          <Line
            data={data}
            width={100}
            height={20}
            options={options}
          />
        )}
      </div>
    </div>
  );
}
