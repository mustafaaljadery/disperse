import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import Image from 'next/image';
import { apiUrl } from '../../../../utils/apiUrl';

interface GiveawayProps {
  workspaceId: string;
  setRightGiveawaySelected: Dispatch<SetStateAction<string>>;
}

async function getProfileData(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}twitter/read/userdata`,
      { params: { workspaceId: workspaceId } }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

export function Giveaway({
  workspaceId,
  setRightGiveawaySelected,
}: GiveawayProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    getProfileData(workspaceId).then((value) => {
      setUserData(value);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col mt-7 space-y-3">
        <div className="flex flex-row space-x-1.5">
          <div className="h-4 bg-gray-200 animate-pulse rounded w-1/5" />
          <div className="h-4 bg-gray-200 animate-pulse rounded w-1/5" />
          <div className="h-4 bg-gray-200 animate-pulse rounded w-1/5" />
          <div className="h-4 bg-gray-200 animate-pulse rounded w-1/5" />
          <div className="h-4 bg-gray-200 animate-pulse rounded w-1/5" />
        </div>
        <div className="flex flex-row space-x-1.5">
          <div className="h-4 bg-gray-200 animate-pulse rounded w-1/4" />
          <div className="h-4 bg-gray-200 animate-pulse rounded w-1/4" />
          <div className="h-4 bg-gray-200 animate-pulse rounded w-1/4" />
        </div>
        <div className="flex flex-row space-x-1.5">
          <div className="h-4 bg-gray-200 animate-pulse rounded w-1/3" />
          <div className="h-4 bg-gray-200 animate-pulse rounded w-1/3" />
        </div>
      </div>
    );
  }

  return <div className=""></div>;
}
