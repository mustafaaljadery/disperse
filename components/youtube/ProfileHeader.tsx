import { useState, useEffect } from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../utils/apiUrl';
import Image from 'next/image';

interface Props {
  workspaceId: string;
}

async function getUserProfile(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}youtube/read/userprofile`,
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

export function ProfileHeader({ workspaceId }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    getUserProfile(workspaceId).then((value) => {
      setUserProfile(value);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="flex flex-row space-x-3">
      <div className="">
        {isLoading ? (
          <div className="h-[42px] w-[42px] rounded-full bg-gray-200 animate-pulse" />
        ) : (
          <img
            alt="profile picture"
            className="rounded-full w-11 h-11"
            src={userProfile.image}
            crossOrigin="anonymous"
          />
        )}
      </div>
      <div className="flex mt-0.5 flex-col my-auto space-y-0.5">
        {isLoading ? (
          <div className="h-4 rounded w-24 bg-gray-200 animate-pulse" />
        ) : (
          <p className="silka-semibold text-sm">
            {userProfile?.title}
          </p>
        )}
        {isLoading ? (
          <div className="h-3 rounded w-64 bg-gray-200 animate-pulse" />
        ) : (
          <p
            className={
              'silka-regular text-xs ' +
              (userProfile?.description &&
              userProfile?.description.length > 0
                ? 'text-gray-500'
                : 'text-gray-400 italic')
            }
          >
            {userProfile?.description &&
            userProfile?.description?.length > 75
              ? userProfile?.description?.slice(0, 75) + '...'
              : userProfile?.description?.length > 0
              ? userProfile?.description
              : 'No description...'}
          </p>
        )}
      </div>
    </div>
  );
}
