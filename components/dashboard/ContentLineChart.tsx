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
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import axiosRetry from 'axios-retry';

import { apiUrl } from '../../utils/apiUrl';
import { title } from '../utils/ToolTipTitle';

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

interface Props {
  workspaceId: string;
}

async function getChartData(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}workspace/read/homepagecontentchart`,
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

export function ContentLineChart({ workspaceId }: Props) {
  const [chartData, setChartData] = useState<any>([0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    getChartData(workspaceId).then((value) => {
      setChartData(value);
    });
  }, []);

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
        borderColor: '#FF623D',
        fill: 'start',
        backgroundColor: 'white',
      },
      point: {
        radius: 1.5,
        borderColor: '#FF623D',
        backgroundColor: '#FF632D',
        hitRadius: 0,
      },
    },
    scales: {
      xAxis: { display: false },
      yAxis: { display: false },
    },
  };

  return (
    <div className="w-full flex flex-col justify-start items-start space-y-1.5 mb-2">
      <div className="flex flex-col justify-center items-center w-full">
        <Line data={data} width={100} height={15} options={options} />
      </div>
    </div>
  );
}
