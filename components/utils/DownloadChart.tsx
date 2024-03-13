import { Transition } from '@headlessui/react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { clsx } from 'clsx';
import React, {
  Fragment,
  useState,
  useCallback,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react';
import { Chart } from 'chart.js';
import * as Chartjs from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { toPng } from 'html-to-image';
import toast from 'react-hot-toast';
import { title } from './ToolTipTitle';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  chartColor: string;
  chartName: string;
  chartValue: number;
  chartData: any;
  labelName: string;
  timeInterval: string;
  chartType: string;
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

export function DownloadChart({
  isOpen,
  setIsOpen,
  chartColor,
  chartName,
  chartValue,
  chartData,
  labelName,
  timeInterval,
  chartType,
}: Props) {
  const [format, setFormat] = useState('gray');

  let data = {
    labels: chartData,
    datasets: [
      {
        label: labelName,
        data: chartData,
        backgroundColor: [format == 'gray' ? chartColor : '#FFFFFF'],
        borderRadius: 12,
        borderSkipped: false,
        borderColor: [format == 'gray' ? chartColor : '#FFFFFF'],
        lineTension: 0.35,
      },
    ],
  };

  const ref = useRef<HTMLDivElement>(null);

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      toast.error('Error downloading image, please try again.', {
        className: 'text-sm silka-medium text-gray-900',
      });
      return;
    }

    toast.loading('Downloading Image...', {
      className: 'text-sm silka-medium text-gray-900',
      duration: 8000,
    });

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `${chartName
          .toLowerCase()
          .replace(' ', '-')}-chart.png`;
        link.href = dataUrl;
        link.click();
        toast.remove();
        toast.success('Image Downloaded!', {
          className: 'text-sm silka-medium text-gray-900',
        });
      })
      .catch((err) => {
        console.log(err);
        toast.remove();
        toast.error('Error downloading image, please try again.', {
          className: 'text-sm silka-medium text-gray-900',
        });
      });
  }, [ref]);

  return (
    <DialogPrimitive.Portal forceMount>
      <Transition.Root show={isOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <DialogPrimitive.Overlay
            forceMount
            className="fixed inset-0 z-20 bg-black/50"
          />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <DialogPrimitive.Content
            forceMount
            className={clsx(
              'fixed z-50',
              'w-[95vw] max-w-3xl rounded-sm p-4 md:w-full',
              'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
              'bg-white',
              'focus:outline-none focus-visible:ring-0'
            )}
          >
            <div className="flex flex-col space-y-5">
              <div className="flex flex-col space-y-3 justify-start items-start">
                <h2 className={'silka-bold text-lg text-gray-700'}>
                  Download Image
                </h2>
                <div className="flex flex-col space-y-2">
                  <p
                    className={
                      'text-gray-600 text-[11px] silka-semibold'
                    }
                  >
                    Select Format
                  </p>
                  <div className="flex flex-row space-x-4">
                    <button
                      onClick={() => {
                        setFormat('orange');
                      }}
                      className={
                        'h-7 w-7 rounded bg-[#FF623D] ' +
                        (format == 'orange' ? '' : 'opacity-70')
                      }
                    />
                    <button
                      onClick={() => {
                        setFormat('gray');
                      }}
                      className={
                        'h-7 w-7 rounded bg-gray-100 ' +
                        (format == 'gray' ? '' : 'opacity-70')
                      }
                    />
                  </div>
                </div>
              </div>
              <div
                ref={ref}
                className={
                  'p-5 flex flex-col ' +
                  (format == 'orange' ? 'bg-[#FF623D]' : 'bg-gray-50')
                }
              >
                <div className="flex flex-row justify-between items-between">
                  <div className="flex flex-col space-y-1">
                    <h3
                      className={
                        'text-xs md:text-xs silka-medium ' +
                        (format == 'gray'
                          ? 'text-[#363636]'
                          : 'text-white')
                      }
                    >
                      {chartName}
                    </h3>
                    <p
                      className={
                        'text-3xl md:text-4xl silka-semibold ' +
                        (format == 'gray'
                          ? 'text-gray-700'
                          : 'text-white')
                      }
                    >
                      {formatLargeNumber(chartValue, 1)}
                    </p>
                  </div>
                  <img
                    src={
                      format == 'gray'
                        ? '/images/watermark/disperse-gray.png'
                        : '/images/watermark/disperse-white.png'
                    }
                    className="h-fit w-28 my-auto pr-3"
                  />
                </div>
                <div className="mt-5">
                  {chartType == 'bar' ? (
                    <Bar
                      data={data}
                      className={
                        'p-4 rounded ' +
                        (format == 'orange'
                          ? ' bg-[#FF623D]'
                          : 'bg-gray-50')
                      }
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
                              color:
                                format == 'gray'
                                  ? '#363636'
                                  : '#FFFFFF',
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
                              callback: function (
                                value: any,
                                index: any,
                                ticks: any
                              ) {
                                return formatDate(
                                  timeInterval,
                                  index
                                );
                              },
                              font: {
                                size: 11,
                              },
                              color:
                                format == 'gray'
                                  ? '#363636'
                                  : '#FFFFFF',
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
                  ) : (
                    <Line
                      data={data}
                      height={240}
                      className="py-1"
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
                              color:
                                format == 'gray'
                                  ? '#363636'
                                  : '#FFFFFF',
                            },
                            grid: {
                              drawBorder: false,
                              display: true,
                              lineWidth: 0.5,
                            },
                          },
                          x: {
                            ticks: {
                              callback: function (
                                value: any,
                                index: any,
                                ticks: any
                              ) {
                                return formatDate(
                                  timeInterval,
                                  index
                                );
                              },
                              font: {
                                size: 11,
                              },
                              color:
                                format == 'gray'
                                  ? '#363636'
                                  : '#FFFFFF',
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
                  )}
                </div>
              </div>
              <div className="flex flex-row space-x-3 justify-end items-end">
                <DialogPrimitive.Close>
                  <button className="text-xs px-4 py-1 silka-medium text-[#363636] rounded hover:opacity-70 border border-inherit border-gray-300">
                    Cancel
                  </button>
                </DialogPrimitive.Close>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onButtonClick();
                  }}
                  className="text-xs px-4 silka-medium text-white rounded hover:opacity-90 border border-[#FF623D] py-1 bg-[#FF623D]"
                >
                  Download
                </button>
              </div>
            </div>
          </DialogPrimitive.Content>
        </Transition.Child>
      </Transition.Root>
    </DialogPrimitive.Portal>
  );
}
