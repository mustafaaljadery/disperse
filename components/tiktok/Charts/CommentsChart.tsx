import { useState, useEffect } from 'react';
import { Chart } from 'chart.js';
import * as Chartjs from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../../utils/apiUrl';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { DownloadChart } from '../../utils/DownloadChart';
import { title } from '../../utils/ToolTipTitle';

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

interface TiktokCommentsChartProps {
  timeInterval: string;
  workspaceId: string;
  comments: any;
  shares: any;
  isPremium: boolean;
}

async function getComments(
  workspaceId: string,
  timeInterval: string,
  comments: number
) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}tiktok/read/commentschart`,
      {
        params: {
          workspaceId: workspaceId,
          timeInterval: timeInterval,
          comments: comments,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function getShares(
  workspaceId: string,
  timeInterval: string,
  shares: number
) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}tiktok/read/shareschart`,
      {
        params: {
          workspaceId: workspaceId,
          timeInterval: timeInterval,
          shares: shares,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

function between(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomData(timeInterval: string, initial_input: number) {
  let temp: any = [];
  let runs: number = 0;

  if (timeInterval == '7 days') {
    runs = 7;
  } else if (timeInterval == '14 days') {
    runs = 14;
  } else if (timeInterval == 'Last Month') {
    runs = 30;
  } else if (timeInterval == 'Last 3 Months') {
    runs = 90;
  } else {
    runs = 365;
  }

  for (let i = 0; i < runs - 1; i++) {
    temp.push(between(1, 20000));
  }
  temp.push(initial_input);

  return temp;
}

export function TiktokCommentsChart({
  timeInterval,
  workspaceId,
  comments,
  shares,
  isPremium,
}: TiktokCommentsChartProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFormat, setSelectedFormat] = useState('Comments');
  const [commentsData, setCommentsData] = useState<any>(null);
  const [sharesData, setSharesData] = useState<any>(null);
  const [screenshot, setScreenshot] = useState(false);

  useEffect(() => {
    if (shares != null && comments != null) {
      if (isPremium) {
        setIsLoading(true);
        if (selectedFormat == 'Comments') {
          getComments(workspaceId, timeInterval, comments).then(
            (value) => {
              let temp = [];
              for (let i = 0; i < value.length; i++) {
                if (value[i] < 0) {
                  temp.push(0);
                } else {
                  temp.push(value[i]);
                }
              }
              setCommentsData(temp);
              setIsLoading(false);
            }
          );
        } else {
          getShares(workspaceId, timeInterval, shares).then(
            (value) => {
              let temp = [];
              for (let i = 0; i < value.length; i++) {
                if (value[i] < 0) {
                  temp.push(0);
                } else {
                  temp.push(value[i]);
                }
              }
              setSharesData(temp);
              setIsLoading(false);
            }
          );
        }
      } else {
        if (selectedFormat == 'Comments') {
          setCommentsData(randomData(timeInterval, comments));
          setIsLoading(false);
        } else {
          setSharesData(randomData(timeInterval, shares));
          setIsLoading(false);
        }
      }
    }
  }, [selectedFormat, timeInterval, shares, comments]);

  const data = {
    labels: selectedFormat == 'Comments' ? commentsData : sharesData,
    datasets: [
      {
        label: selectedFormat == 'Comments' ? 'Comments' : 'Shares',
        data:
          selectedFormat == 'Comments' ? commentsData : sharesData,
        backgroundColor: ['#363636'],
        borderRadius: 12,
        borderSkipped: false,
        borderColor: '#363636',
        lineTension: 0.35,
      },
    ],
  };

  return (
    <div className="flex mt-8 flex-col p-5 md:p-6 border rounded-lg">
      <div className="flex flex-row justify-between items-between">
        <div className="flex flex-col space-y-1">
          <h3 className="text-[11px] md:text-xs silka-regular text-gray-600">
            {selectedFormat == 'Comments' ? 'Comments' : 'Shares'}
          </h3>
          <div className="flex flex-row space-x-2">
            {isLoading ? (
              <div className="h-9 w-24 bg-gray-200 rounded animate-pulse" />
            ) : (
              <p className="text-3xl md:text-4xl text-gray-700 silka-semibold">
                {selectedFormat == 'Comments'
                  ? formatLargeNumber(comments, 1)
                  : formatLargeNumber(shares, 1)}
              </p>
            )}
            <div className="flex flex-row space-x-1"></div>
          </div>
        </div>
        <div className="flex flex-row space-x-3">
          <DialogPrimitive.Root
            open={screenshot}
            onOpenChange={setScreenshot}
          >
            <DialogPrimitive.Trigger asChild>
              <button
                disabled={isLoading}
                className="hidden md:flex hover:opacity-80 rounded-lg py-2 px-2.5 bg-gray-50 my-auto h-fit"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.91667 2.33329H1.16667V1.74996H2.91667V2.33329ZM9.2925 2.33329L9.76617 3.04438C10.1996 3.69479 10.9252 4.08329 11.7075 4.08329H12.8333V11.6666H1.16667V4.08329H3.45917C4.24142 4.08329 4.96708 3.69479 5.4005 3.04438L5.87417 2.33329H9.2925ZM9.91667 1.16663H5.25L4.42983 2.39688C4.21342 2.72179 3.84942 2.91663 3.45917 2.91663H0V12.8333H14V2.91663H11.7075C11.3172 2.91663 10.9532 2.72179 10.7368 2.39688L9.91667 1.16663ZM3.5 5.83329C3.5 5.51129 3.23925 5.24996 2.91667 5.24996C2.59408 5.24996 2.33333 5.51129 2.33333 5.83329C2.33333 6.15529 2.59408 6.41663 2.91667 6.41663C3.23925 6.41663 3.5 6.15529 3.5 5.83329ZM7.58333 5.83329C8.54817 5.83329 9.33333 6.61846 9.33333 7.58329C9.33333 8.54813 8.54817 9.33329 7.58333 9.33329C6.6185 9.33329 5.83333 8.54813 5.83333 7.58329C5.83333 6.61846 6.6185 5.83329 7.58333 5.83329ZM7.58333 4.66663C5.97275 4.66663 4.66667 5.97271 4.66667 7.58329C4.66667 9.19388 5.97275 10.5 7.58333 10.5C9.19392 10.5 10.5 9.19388 10.5 7.58329C10.5 5.97271 9.19392 4.66663 7.58333 4.66663Z"
                    fill="#7C7C7C"
                  />
                </svg>
              </button>
            </DialogPrimitive.Trigger>
            <DownloadChart
              chartColor="#363636"
              isOpen={screenshot}
              setIsOpen={setScreenshot}
              chartName={
                selectedFormat == 'Comments'
                  ? 'TikTok Comments'
                  : 'TikTok Shares'
              }
              chartValue={
                selectedFormat == 'Comments' ? comments : shares
              }
              chartData={
                selectedFormat == 'Comments'
                  ? commentsData
                  : sharesData
              }
              labelName={
                selectedFormat == 'Comments' ? 'Comments' : 'Shares'
              }
              timeInterval={timeInterval}
              chartType={'bar'}
            />
          </DialogPrimitive.Root>
          <div className="my-auto flex flex-row space-x-1 md:space-x-2 px-1 md:px-2 py-1 md:py-1.5 bg-gray-50 rounded-lg">
            <button
              onClick={() => {
                setSelectedFormat('Comments');
              }}
              className={
                'px-4 md:px-5 py-0.5 md:py-1 rounded text-[11px] md:text-xs silka-medium ' +
                (selectedFormat == 'Comments'
                  ? 'bg-white shadow text-gray-800'
                  : 'text-gray-500')
              }
            >
              Comments
            </button>
            <button
              onClick={() => {
                setSelectedFormat('Shares');
              }}
              className={
                'px-4 md:px-5 py-0.5 md:py-1 rounded text-[11px] md:text-xs silka-medium ' +
                (selectedFormat == 'Shares'
                  ? 'bg-white shadow text-gray-800'
                  : 'text-gray-500')
              }
            >
              Shares
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8">
        {isLoading ? (
          <div className="h-[240px] flex flex-col justify-center items-center">
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
                stroke="#363636"
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
          <>
            <Bar
              data={data}
              height={240}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  tooltip: {
                    callbacks: {
                      title: title,
                    },
                  },
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
                      maxTicksLimit:
                        timeInterval == '7 days' ? 7 : 14,
                    },
                    grid: {
                      drawBorder: false,
                      display: false,
                    },
                  },
                },
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
