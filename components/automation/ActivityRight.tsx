import { useState, useEffect } from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { Chart } from 'chart.js';
import * as Chartjs from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { apiUrl } from '../../utils/apiUrl';
import Router from 'next/router';
import { title } from '../utils/ToolTipTitle';

const controllers: any = Object.values(Chartjs).filter(
  (chart: any) => chart.id !== undefined
);

Chart.register(...controllers);

const intervals = [['30d', '25d', '20d', '15d', '10d', '5d']];

interface Props {
  workspaceId: string;
  selected: any;
}

interface TotalDashboardProps {
  workspaceId: string;
}

interface AutomationDashboardProps {
  workspaceId: string;
  selection: any;
}

interface SingleWorkflowProps {
  value: any;
}

async function getAutomationData(selection: any) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}automation/read/workflowdata`,
      {
        params: {
          workflowId: selection.id,
          automation_id: selection.automation_id,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function getTotalData(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}automation/read/totalworkflowsdata`,
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

function formatDate(date: string) {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const newDate = new Date(date);
  let year = newDate.getFullYear();
  let month = months[newDate.getMonth()];
  let day = newDate.getDate();

  return `${day} ${month} ${year}`;
}

function NoWorkflows() {
  return (
    <div className="py-5 border rounded border-dashed border-[#E5E5E5] bg-[#F7F7F7]">
      <div className="flex flex-row w-full">
        <button className="w-[5%] flex flex-col jusitfy-center items-center"></button>
        <div className="w-[95%] flex flex-col space-y-1">
          <p className="text-start silka-semibold text-sm my-auto text-gray-800">
            No Workflows Available
          </p>
          <p className="text-start silka-regular text-xs text-gray-600">
            Create a workflow to begin automating using Disperse.
          </p>
        </div>
        <button className="w-[5%] flex flex-col justify-center items-center"></button>
      </div>
    </div>
  );
}

function NoRuns() {
  return (
    <div className="py-5 border rounded border-dashed border-[#E5E5E5] bg-[#F7F7F7]">
      <div className="flex flex-row w-full">
        <button className="w-[5%] flex flex-col jusitfy-center items-center"></button>
        <div className="w-[95%] flex flex-col space-y-1">
          <p className="text-start silka-semibold text-sm my-auto text-gray-800">
            No Runs Available
          </p>
          <p className="text-start silka-regular text-xs text-gray-600">
            Active workflow and wait for your runs to show up!
          </p>
        </div>
        <button className="w-[5%] flex flex-col justify-center items-center"></button>
      </div>
    </div>
  );
}

function AutomationDashboard({
  selection,
  workspaceId,
}: AutomationDashboardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [workflowData, setWorkflowData] = useState<any>(null);
  const [workflowChart, setWorkflowChart] = useState<any>(null);
  const [allRuns, setAllRuns] = useState<any>(null);

  useEffect(() => {
    if (selection) {
      setIsLoading(true);
      getAutomationData(selection).then((value) => {
        setWorkflowData(value);
        setWorkflowChart(value.runs_chart);
        setAllRuns(value.all_runs);
        setIsLoading(false);
      });
    }
  }, [selection]);

  const data = {
    labels: workflowChart,
    datasets: [
      {
        label: 'Automations',
        data: workflowChart,
        backgroundColor: ['#363636'],
        borderRadius: 12,
        borderSkipped: false,
        borderColor: '#363636',
        lineTension: 0.35,
      },
    ],
  };

  return (
    <div className="flex flex-col mb-24 w-full">
      {isLoading ? (
        <div className="h-8 w-96 bg-gray-200 rounded-lg animate-pulse" />
      ) : (
        <div className="flex flex-row space-x-3">
          <div className="flex flex-row space-x-2 my-auto">
            <div className="rounded-full border border-gray-200 p-1">
              <img
                className="h-[16px] w-[16px] rounded-full"
                src={workflowData.first_image}
              />
            </div>
            <div className="rounded-full border border-gray-200 p-1">
              <img
                className="h-[16px] w-[16px] rounded-full"
                src={workflowData.second_image}
              />
            </div>
          </div>
          <h2 className="text-lg silka-semibold my-auto text-gray-700">
            {workflowData.title}
          </h2>
        </div>
      )}
      <div className="flex flex-row mt-6 space-x-5">
        <div className="w-1/2 border rounded-lg px-4 py-5 flex flex-row space-x-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            className="my-auto"
          >
            <path
              fill="#363636"
              d="M16 0l-3 9h9l-1.866 2h-14.4l10.266-11zm2.267 13h-14.4l-1.867 2h9l-3 9 10.267-11z"
            />
          </svg>
          <div className="flex flex-col space-y-1.5">
            <p className="text-sm silka-regular text-gray-500">
              Workflow Runs
            </p>
            {isLoading ? (
              <div className="w-24 h-10 rounded bg-gray-200 animate-pulse"></div>
            ) : (
              <span className="text-4xl silka-semibold text-[#363636]">
                {workflowData.runs}
              </span>
            )}
          </div>
        </div>
        <div className="w-1/2 border rounded-lg px-4 py-5 flex flex-row space-x-6">
          <svg
            width="32"
            height="32"
            viewBox="0 0 33 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="my-auto"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M18.8365 5.12455L30.6866 23.3109C30.776 23.4487 30.783 23.624 30.7056 23.7687C30.6304 23.9094 30.4845 23.999 30.3245 23.999C25.6267 23.999 7.48517 24.0005 7.48517 24.0005C7.0841 24.0005 6.75829 24.3263 6.75829 24.7284C6.75829 25.1297 7.08412 25.4555 7.48517 25.4555C7.48517 25.4555 25.6266 25.4533 30.3245 25.4533C31.0183 25.4533 31.658 25.0707 31.9872 24.4551C32.3155 23.8432 32.2836 23.0987 31.9049 22.5167L20.056 4.33043C19.8362 3.99389 19.3859 3.89916 19.0494 4.11809C18.7131 4.33725 18.6179 4.78799 18.8365 5.12456L18.8365 5.12455ZM3.12256 23.9991H2.10175C1.94177 23.9991 1.7959 23.9095 1.72065 23.7687C1.64322 23.6241 1.65028 23.4487 1.73965 23.3109L15.8508 1.65229C15.9309 1.52981 16.0673 1.45456 16.2132 1.45456C16.3588 1.45456 16.4954 1.5298 16.5753 1.65229L17.4149 2.94266C17.6348 3.27895 18.0853 3.37392 18.4216 3.15475C18.7579 2.93584 18.8531 2.48485 18.6344 2.14853L17.7936 0.858166C17.4444 0.32219 16.8493 0 16.2132 0C15.5756 0 14.9817 0.322171 14.6325 0.858166C11.8068 5.19563 3.59532 17.7977 0.521359 22.5168C0.142696 23.0988 0.109575 23.8432 0.439052 24.4552C0.76828 25.0708 1.40675 25.4534 2.10177 25.4534H3.12258C3.52341 25.4534 3.84921 25.1273 3.84921 24.7262C3.84921 24.3249 3.52337 23.9991 3.12256 23.9991Z"
              fill="#363636"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.03263 24.7274C6.03263 25.1292 5.70705 25.4548 5.3055 25.4548C4.90371 25.4548 4.57812 25.1292 4.57812 24.7274C4.57812 24.3258 4.90371 24 5.3055 24C5.70706 24 6.03263 24.3258 6.03263 24.7274Z"
              fill="#363636"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M19.0229 9.24421C19.0652 8.73624 18.8935 8.23531 18.5495 7.86177C18.2046 7.48651 17.7196 7.27344 17.2113 7.27344H15.2184C14.71 7.27344 14.2248 7.48651 13.8803 7.86177C13.5362 8.23532 13.3645 8.7362 13.4067 9.24421C13.5508 10.9739 13.817 14.1683 13.9521 15.7899C14.0308 16.7306 14.8183 17.4567 15.7638 17.4567H16.6658C17.6111 17.4567 18.3989 16.7306 18.4774 15.7899L19.0229 9.24421ZM17.5735 9.12197L17.028 15.6676C17.0119 15.8561 16.8549 16.001 16.6659 16.001H15.7639C15.5749 16.001 15.4176 15.8561 15.4018 15.6676L14.8563 9.12197C14.8476 9.02066 14.8824 8.92131 14.9508 8.84606C15.02 8.77106 15.1166 8.72918 15.2184 8.72918H17.2114C17.3131 8.72918 17.4098 8.77106 17.479 8.84606C17.5472 8.92131 17.5822 9.02066 17.5735 9.12197Z"
              fill="#363636"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M18.3965 20C18.3965 19.5178 18.2051 19.0551 17.8642 18.7142C17.523 18.373 17.0603 18.1816 16.5782 18.1816H15.8508C15.3686 18.1816 14.9062 18.373 14.565 18.7142C14.2239 19.0551 14.0327 19.5178 14.0327 20V20.7273C14.0327 21.2095 14.2239 21.6719 14.565 22.0131C14.9062 22.3543 15.3687 22.5454 15.8508 22.5454H16.5782C17.0603 22.5454 17.523 22.3543 17.8642 22.0131C18.2051 21.6719 18.3965 21.2095 18.3965 20.7273V20ZM16.9417 20V20.7273C16.9417 20.824 16.9033 20.9163 16.8356 20.9847C16.7674 21.0524 16.6749 21.0909 16.5782 21.0909H15.8508C15.7541 21.0909 15.6618 21.0524 15.5934 20.9847C15.5257 20.9163 15.4872 20.824 15.4872 20.7273V20C15.4872 19.9033 15.5257 19.811 15.5934 19.7426C15.6618 19.6749 15.7541 19.6364 15.8508 19.6364H16.5782C16.6749 19.6364 16.7674 19.6749 16.8356 19.7426C16.9033 19.811 16.9417 19.9033 16.9417 20Z"
              fill="#363636"
            />
          </svg>

          <div className="flex flex-col space-y-1.5">
            <p className="text-sm silka-regular text-gray-500">
              Workflow Errors
            </p>
            {isLoading ? (
              <div className="w-24 h-10 rounded bg-gray-200 animate-pulse"></div>
            ) : (
              <span className="text-4xl silka-semibold text-[#363636]">
                {workflowData.errors}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="mt-6 border rounded-lg w-full p-6 flex flex-col">
        <div className="flex flex-col space-y-1">
          <h2 className="text-base silka-semibold">Workflow Runs</h2>
          <p className="text-xs silka-regular text-gray-500">
            Number of runs on this workflow in the past 30 days
          </p>
        </div>
        <div className="mt-8">
          {isLoading ? (
            <div className="flex flex-col justify-center items-center h-[240px]">
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
            <Bar
              data={data}
              width={400}
              height={240}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    callbacks: {
                      title: title,
                    },
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
                    display: false,
                  },
                },
              }}
            />
          )}
        </div>
        <div className="mt-4 flex flex-row w-full">
          {intervals[0].map((value: any, index: number) => {
            return (
              <div
                key={index}
                className="flex flex-col justify-center items-center space-y-1 w-1/6"
              >
                <div className="h-[5px] rounded w-[1px] bg-gray-400" />
                <p className="text-[11px] text-gray-500 silka-regular">
                  {value}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col space-y-4 mt-8">
        <p className="text-gray-500 silka-medium text-sm">Runs</p>
        {isLoading ? (
          <div className="flex flex-col space-y-3.5">
            <div className="w-full h-20 bg-gray-200 rounded-lg animate-pulse" />
            <div className="w-full h-20 bg-gray-200 rounded-lg animate-pulse" />
            <div className="w-full h-20 bg-gray-200 rounded-lg animate-pulse" />
          </div>
        ) : (
          <div className="flex flex-col space-y-3.5">
            {allRuns?.length == 0 ? (
              <NoRuns />
            ) : (
              <>
                {allRuns?.map((value: any, index: number) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-row space-x-4 justify-start items-start py-4 border w-full rounded-lg"
                    >
                      <div className="w-[3%]" />
                      <div className="w-[15%] my-auto flex flex-row space-x-1 md:space-x-3">
                        <div className="rounded-lg border border-gray-200 p-1.5">
                          <img
                            className="h-[18px] w-[18px]"
                            src={workflowData.first_image}
                          />
                        </div>
                        <div className="rounded-lg border border-gray-200 p-1.5">
                          <img
                            className="h-[18px] w-[18px]"
                            src={workflowData.second_image}
                          />
                        </div>
                      </div>
                      <div className="w-[50%] my-auto flex flex-col space-y-1.5">
                        <p className="silka-semibold text-gray-900">
                          {workflowData.title}
                        </p>
                        <p className="text-sm silka-medium text-gray-500">
                          {formatDate(value.run_at)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function SingleWorkflow({ value }: SingleWorkflowProps) {
  const [hovered, setHovered] = useState(false);
  const [menuHovered, setMenuHovered] = useState(false);
  const [activeHovered, setActiveHovered] = useState(false);

  return (
    <button
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      onClick={(e) => {
        e.preventDefault();
        if (activeHovered) {
        } else if (menuHovered) {
        } else {
          Router.push(
            `/workflow/${value.id}?automationId=${value.automation_id}`
          );
        }
      }}
      className={
        'flex flex-row justify-start items-start px-1 md:px-4 py-4 border rounded-lg ' +
        (hovered ? 'border-[#FF623D]' : 'border-gray-200')
      }
    >
      <div className="w-[4.5%]"></div>
      <div className="w-[45.5%] flex flex-col justify-start items-start space-y-1.5">
        <div className="my-auto flex flex-row space-x-2.5">
          <div className="border rounded-full">
            <img
              src={value.first_image}
              className="p-1.5 h-[28px] w-[28px]"
            />
          </div>
          <div className="border rounded-full">
            <img
              src={value.second_image}
              className="p-1.5 h-[28px] w-[28px]"
            />
          </div>
        </div>
        <p className="text-xs md:text-sm text-start my-auto silka-semibold text-[#363636]">
          {value?.title?.length > 38
            ? value.title.slice(0, 38) + '...'
            : value.title}
        </p>
      </div>
      <div className="w-1/2 flex flex-row my-auto">
        <div className="w-2/3 flex flex-row justify-center items-center my-auto">
          <div className="hidden w-1/2 md:flex flex-col justify-start my-auto items-start">
            <p className="text-gray-500 text-xs silka-medium my-auto">
              {formatDate(value.created_at)}
            </p>
          </div>
          <div className="w-1/2 flex flex-row space-x-2">
            <div
              className={
                'px-4 py-1.5 my-auto ' + (value.active ? '' : '')
              }
            >
              <p
                className={
                  'text-xs my-auto silka-medium ' +
                  (!value.active
                    ? 'text-[#ef4444]'
                    : 'text-[#008A00]')
                }
              >
                {value.active ? 'active' : 'inactive'}
              </p>
            </div>
          </div>
        </div>
        <div className="w-1/3 flex flex-row space-x-2 items-start justify-start my-auto">
          <svg
            width="14"
            height="14"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="my-auto"
          >
            <path
              d="M8.69667 0.0403541C8.90859 0.131038 9.03106 0.354857 8.99316 0.582235L8.0902 6.00001H12.5C12.6893 6.00001 12.8625 6.10701 12.9472 6.27641C13.0319 6.4458 13.0136 6.6485 12.8999 6.80001L6.89997 14.8C6.76167 14.9844 6.51521 15.0503 6.30328 14.9597C6.09135 14.869 5.96888 14.6452 6.00678 14.4178L6.90974 9H2.49999C2.31061 9 2.13748 8.893 2.05278 8.72361C1.96809 8.55422 1.98636 8.35151 2.09999 8.2L8.09997 0.200038C8.23828 0.0156255 8.48474 -0.0503301 8.69667 0.0403541ZM3.49999 8.00001H7.49997C7.64695 8.00001 7.78648 8.06467 7.88148 8.17682C7.97648 8.28896 8.01733 8.43723 7.99317 8.5822L7.33027 12.5596L11.5 7.00001H7.49997C7.353 7.00001 7.21347 6.93534 7.11846 6.8232C7.02346 6.71105 6.98261 6.56279 7.00678 6.41781L7.66968 2.44042L3.49999 8.00001Z"
              fill="#70797E"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
          <p className="my-auto silka-medium text-[#70797E]">
            {value?.runs?.length}
          </p>
        </div>
      </div>
    </button>
  );
}

function TotalDashboard({ workspaceId }: TotalDashboardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [totalData, setTotalData] = useState<any>(null);
  const [chartData, setChartData] = useState<any>(null);
  const [workflowsData, setWorkflowsData] = useState<any>(null);

  useEffect(() => {
    getTotalData(workspaceId).then((value) => {
      setTotalData(value);
      setChartData(value.all_runs);
      setWorkflowsData(value.all_workflows);
      setIsLoading(false);
    });
  }, []);

  const data = {
    labels: chartData,
    datasets: [
      {
        label: 'Automations',
        data: chartData,
        backgroundColor: ['#363636'],
        borderRadius: 12,
        borderSkipped: false,
        borderColor: '#363636',
        lineTension: 0.35,
      },
    ],
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row space-x-5">
        <div className="w-1/2 border rounded-lg px-4 py-5 flex flex-row space-x-6">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="my-auto"
          >
            <path
              d="M21.3344 0.280559C20.9607 -0.0935197 20.3476 -0.0935197 19.9736 0.280559L7.90372 12.3513C7.52964 12.7254 6.91693 12.7254 6.54288 12.3513L3.57016 9.37876C3.19608 9.00468 2.58337 9.00468 2.20932 9.37876L0.386028 11.2029C0.0119491 11.577 0.0119491 12.1897 0.386028 12.5638L6.54301 18.7194C6.91709 19.0935 7.5298 19.0935 7.90385 18.7194L23.1577 3.46513C23.532 3.09088 23.532 2.47834 23.1577 2.10412L21.3344 0.280559Z"
              fill="#363636"
            />
          </svg>
          <div className="flex flex-col space-y-1.5">
            <p className="text-xs md:text-sm silka-regular text-gray-500">
              Active Workflows
            </p>
            {isLoading ? (
              <div className="w-24 h-10 rounded bg-gray-200 animate-pulse"></div>
            ) : (
              <span className="text-3xl md:text-4xl silka-semibold text-[#363636]">
                {totalData.workflows}
              </span>
            )}
          </div>
        </div>
        <div className="w-1/2 border rounded-lg px-4 py-5 flex flex-row space-x-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            className="my-auto"
          >
            <path
              fill="#363636"
              d="M16 0l-3 9h9l-1.866 2h-14.4l10.266-11zm2.267 13h-14.4l-1.867 2h9l-3 9 10.267-11z"
            />
          </svg>
          <div className="flex flex-col space-y-1.5">
            <p className="text-xs md:text-sm silka-regular text-gray-500">
              Total Runs
            </p>
            {isLoading ? (
              <div className="w-24 h-10 rounded bg-gray-200 animate-pulse"></div>
            ) : (
              <span className="text-3xl md:text-4xl silka-semibold text-[#363636]">
                {totalData.runs}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="mt-6 border rounded-lg w-full p-4 md:p-6 flex flex-col">
        <div className="flex flex-col space-y-1.5">
          <h2 className="text-base silka-semibold">
            Total Tasks Activity
          </h2>
          <p className="text-xs silka-regular text-gray-500">
            Number of runs on all workflows in the past 30 days
          </p>
        </div>
        <div className="mt-8">
          {isLoading ? (
            <div className="flex flex-col justify-center items-center h-[240px]">
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
            <Bar
              data={data}
              width={400}
              height={240}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    callbacks: {
                      title: title,
                    },
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
                    display: false,
                  },
                },
              }}
            />
          )}
        </div>
        <div className="mt-4 flex flex-row w-full">
          {intervals[0].map((value: any, index: number) => {
            return (
              <div
                key={index}
                className="flex flex-col justify-center items-center space-y-1 w-1/6"
              >
                <div className="h-[5px] rounded w-[1px] bg-gray-400" />
                <p className="text-[11px] text-gray-500 silka-regular">
                  {value}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className=""></div>
      <div className="mt-8 md:mt-12 flex flex-col space-y-5">
        <h3 className="text-xs md:text-sm silka-medium text-gray-500">
          Workflows
        </h3>
        {isLoading ? (
          <div className="flex flex-col space-y-3.5">
            <div className="h-24 w-full bg-gray-200 rounded-lg animate-pulse" />
            <div className="h-24 w-full bg-gray-200 rounded-lg animate-pulse" />
            <div className="h-24 w-full bg-gray-200 rounded-lg animate-pulse" />
          </div>
        ) : (
          <div className="flex flex-col space-y-3.5">
            {workflowsData?.length == 0 ? (
              <NoWorkflows />
            ) : (
              <>
                {workflowsData
                  .sort(function (x: any, y: any) {
                    return x.active === y.active
                      ? 0
                      : x.active
                      ? -1
                      : 1;
                  })
                  .map((value: any, index: number) => {
                    return (
                      <SingleWorkflow key={index} value={value} />
                    );
                  })}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function ActivityRight({ workspaceId, selected }: Props) {
  return (
    <>
      {selected == 'Total' ? (
        <TotalDashboard workspaceId={workspaceId} />
      ) : (
        <AutomationDashboard
          workspaceId={workspaceId}
          selection={selected}
        />
      )}
    </>
  );
}
