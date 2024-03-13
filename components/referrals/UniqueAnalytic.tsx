import { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart } from 'chart.js';
import * as Chartjs from 'chart.js';
import { Line } from 'react-chartjs-2';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../utils/apiUrl';

async function getData(
  userId: string,
  timeInterval: string,
  uniqueVisitors: number
) {
  axiosRetry(axios, { retries: 3 });
  try {
    const result = await axios.get(
      `${apiUrl()}referrals/uniquechart`,
      {
        params: {
          userId: userId,
          timeInterval: timeInterval,
          uniqueVisitors: uniqueVisitors,
        },
      }
    );
    let temp = result.data.map((value: any) => {
      return Number(value);
    });
    return temp;
  } catch (e) {
    console.log(e);
  }
}

const controllers: any = Object.values(Chartjs).filter(
  (chart: any) => chart.id !== undefined
);

Chart.register(...controllers);

function formatDate(timeInterval: string, index: number) {
  if (timeInterval == '7 days') {
    const date = new Date(
      new Date().getTime() - (7 - index - 1) * 60 * 60 * 24 * 1000
    );
    let day = date.getDate();
    let month = date.getMonth() + 1;

    return `${month}/${day}`;
  } else if (timeInterval == '14 days') {
    const date = new Date(
      new Date().getTime() - (14 - index - 1) * 60 * 60 * 24 * 1000
    );
    let day = date.getDate();
    let month = date.getMonth() + 1;

    return `${month}/${day}`;
  } else if (timeInterval == 'Last Month') {
    const date = new Date(
      new Date().getTime() - (30 - index - 1) * 60 * 60 * 24 * 1000
    );
    let day = date.getDate();
    let month = date.getMonth() + 1;

    return `${month}/${day}`;
  } else if (timeInterval == 'Last 3 Months') {
    const date = new Date(
      new Date().getTime() - (90 - index - 1) * 60 * 60 * 24 * 1000
    );
    let day = date.getDate();
    let month = date.getMonth() + 1;

    return `${month}/${day}`;
  } else {
    const date = new Date(
      new Date().getTime() - (365 - index - 1) * 60 * 60 * 24 * 1000
    );
    let day = date.getDate();
    let month = date.getMonth() + 1;

    return `${month}/${day}`;
  }
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

interface Props {
  workspaceId: string;
  userId: string;
  timeInterval: string;
  uniqueVisitors: number;
}

export function UniqueAnalytic({
  workspaceId,
  userId,
  timeInterval,
  uniqueVisitors,
}: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState<any>(null);
  const [uniqueData, setUniqueData] = useState<any>(null);

  useEffect(() => {
    if (userId && uniqueVisitors != null) {
      getData(userId, timeInterval, uniqueVisitors).then((data) => {
        setUniqueData(data);
        setTotal(data[data.length - 1]);
        setIsLoading(false);
      });
    }
  }, [timeInterval, userId, uniqueVisitors]);

  const data = {
    labels: uniqueData,
    datasets: [
      {
        label: 'Visitors',
        data: uniqueData,
        backgroundColor: ['#FF623D'],
        borderRadius: 12,
        borderSkipped: false,
        borderColor: '#FF623D',
        lineTension: 0.35,
      },
    ],
  };

  return (
    <div className="w-full md:w-1/2 flex flex-col p-2 md:p-5">
      <div className="flex flex-row justify-between items-between">
        <div className="flex flex-col space-y-1">
          <h2 className="text-[11px] md:text-xs silka-regular text-gray-600">
            Unique Visitors
          </h2>
          {isLoading ? (
            <div className="h-7 w-20 bg-gray-200 rounded animate-pulse" />
          ) : (
            <p className="text-2xl md:text-4xl text-gray-700 silka-semibold">
              {formatLargeNumber(total, 2)}
            </p>
          )}
        </div>
      </div>
      <div className="mt-8">
        {isLoading ? (
          <div className="w-full h-[190px] flex flex-col justify-center items-center">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="animate-spin"
            >
              <g clipPath="url(#clip0_1405_2)">
                <path
                  d="M4.84457 21.6005C4.13345 21.0227 3.95568 20.0005 4.53345 19.2449C5.11123 18.5338 6.13345 18.3116 6.88901 18.8894C7.24457 19.1116 7.55568 19.3783 7.95568 19.556C11.289 21.3783 15.4223 20.756 18.089 18.0449C18.7557 17.3783 19.7779 17.3783 20.4446 18.0449C21.0668 18.7116 21.0668 19.7783 20.4446 20.4005C16.7112 24.1783 10.9335 25.1116 6.31123 22.5338C5.7779 22.2671 5.28901 21.9116 4.84457 21.6005Z"
                  fill="#ff623d"
                />
                <path
                  d="M23.8224 13.9555C23.6891 14.8888 22.8002 15.511 21.8669 15.3777C20.9335 15.2444 20.3558 14.3555 20.4891 13.4221C20.578 12.9332 20.578 12.4444 20.578 11.9555C20.578 8.0888 18.0446 4.75547 14.4891 3.73325C13.6002 3.51103 13.0669 2.53325 13.3335 1.64436C13.6002 0.755471 14.4891 0.222137 15.4224 0.488804C20.4446 1.95547 23.9558 6.62214 23.9558 11.9999C23.9558 12.6666 23.9113 13.3332 23.8224 13.9555Z"
                  fill="#ff623D"
                />
                <path
                  d="M7.42222 0.843445C8.26667 0.487889 9.24445 0.932334 9.55556 1.82122C9.86667 2.71011 9.46667 3.68789 8.62222 4.04344C5.42222 5.33233 3.28889 8.48789 3.28889 12.0879C3.28889 12.799 3.37778 13.5101 3.55556 14.1768C3.77778 15.0657 3.24444 15.999 2.35556 16.2212C1.46667 16.4434 0.577778 15.9101 0.355556 14.9768C0.133333 13.999 0 13.0212 0 12.0434C0 7.02122 2.97778 2.62122 7.42222 0.843445Z"
                  fill="#FF623D"
                />
              </g>
              <defs>
                <clipPath id="clip0_1405_2">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        ) : (
          <Line
            data={data}
            height={190}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                y: {
                  display: true,
                  stacked: true,
                  suggestedMin: 0,
                  ticks: {
                    maxTicksLimit: 3,
                  },
                  grid: {
                    drawBorder: false,
                    display: true,
                    lineWidth: 0.5,
                  },
                },
                x: {
                  ticks: {
                    callback: function (value, index, ticks) {
                      return formatDate(timeInterval, index);
                    },
                    font: {
                      size: 11,
                    },
                    maxTicksLimit: timeInterval == '7 days' ? 7 : 14,
                  },
                  grid: {
                    drawBorder: false,
                    display: false,
                  },
                },
              },
            }}
          />
        )}
      </div>
    </div>
  );
}
