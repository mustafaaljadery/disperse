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

export function YoutubeHeaderProfile({ workspaceId }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    getUserProfile(workspaceId).then((value) => {
      setUserProfile(value);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="flex flex-col">
      {isLoading ? (
        <div className="h-[90px] w-[90px] rounded-full bg-gray-200 animate-pulse" />
      ) : (
        <div>
          <Image
            alt="profile picture"
            className="rounded-full"
            src={userProfile?.image}
            height={90}
            width={90}
          />
        </div>
      )}
      {isLoading ? (
        <div className="w-24 md:w-32 bg-gray-200 h-6 md:h-8 rounded animte-pulse mt-2" />
      ) : (
        <h2 className="text-lg md:text-xl mt-2 silka-semibold text-gray-900">
          {userProfile?.title}
        </h2>
      )}
      {isLoading ? (
        <div className="w-64 md:w-72 h-5 mt-2.5 rounded bg-gray-200 animate-pulse" />
      ) : (
        <p
          className={
            'silka-medium mt-2 text-sm ' +
            (userProfile?.description &&
            userProfile?.description.length > 0
              ? 'text-gray-500'
              : 'text-gray-400 italic')
          }
        >
          {userProfile?.description &&
          userProfile?.description?.length > 0
            ? userProfile?.description
            : 'No description...'}
        </p>
      )}
    </div>
  );
}
