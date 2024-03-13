import * as ProgressPrimitive from '@radix-ui/react-progress';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { apiUrl } from '../../utils/apiUrl';

interface StorageViewerProps {
  workspaceId: string;
  folderId: string;
  refetchData: boolean;
  setRefetchData: Dispatch<SetStateAction<boolean>>;
}

function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = [
    'Bytes',
    'KB',
    'MB',
    'GB',
    'TB',
    'PB',
    'EB',
    'ZB',
    'YB',
  ];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${
    sizes[i]
  }`;
}

async function getData(folderId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}workspace/read/foldersize`,
      { params: { folderId: folderId } }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

export function StorageViewer({
  workspaceId,
  refetchData,
  setRefetchData,
  folderId,
}: StorageViewerProps) {
  const [progress, setProgress] = useState(60);
  const [bytes, setBytes] = useState(0);
  const [items, setItems] = useState(0);
  const [plan, setPlan] = useState('STARTER');

  axiosRetry(axios, { retries: 3 });

  useEffect(() => {
    getData(folderId).then((value) => {
      setItems(value.files);
      setBytes(value.bytes);
      setPlan(value.plan);
      setProgress(
        (value.bytes /
          (value.plan == 'STARTER'
            ? 2147483648
            : value.plan == 'PRO'
            ? 2147483648 * 200
            : 2147483648 * 500)) *
          100
      );
    });
  }, []);

  useEffect(() => {
    getData(folderId).then((value) => {
      setItems(value.files);
      setBytes(value.bytes);
      setPlan(value.plan);
      setProgress(
        (value.bytes /
          (value.plan == 'STARTER'
            ? 2147483648
            : value.plan == 'PRO'
            ? 2147483648 * 200
            : 2147483648 * 500)) *
          100
      );
      setRefetchData(false);
    });
  }, [refetchData]);

  return (
    <div className="flex flex-col my-auto space-y-1 w-56">
      <div className="flex flex-row justify-between items-between space-x-3">
        <p className="text-xs silka-regular text-[#727272]">
          {String(items)} {items == 1 ? 'item' : 'items'}
        </p>
        <p className="text-xs silka-regular">
          {formatBytes(bytes)}/
          {plan == 'STARTER'
            ? '2 GB'
            : plan == 'PRO'
            ? '200 GB'
            : '500 GB'}{' '}
          <span className="text-[11px]">Used</span>
        </p>
      </div>
      <div className="bg-gray-100 w-full rounded-full">
        <ProgressPrimitive.Root
          style={{ width: `${progress}%` }}
          value={progress}
          className="h-1 w-full overflow-hidden rounded-full bg-gray-200"
        >
          <ProgressPrimitive.Indicator className="h-full bg-[#FF623D] duration-300 ease-in-out" />
        </ProgressPrimitive.Root>
      </div>
    </div>
  );
}
