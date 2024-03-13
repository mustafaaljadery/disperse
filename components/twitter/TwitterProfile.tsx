import { useState, useEffect } from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../utils/apiUrl';

interface TwitterProfileProps {
  workspaceId: string;
}

async function getFullProfile(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}twitter/read/fulluserprofile`,
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

export function TwitterProfile({ workspaceId }: TwitterProfileProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    getFullProfile(workspaceId).then((value) => {
      setProfileData(value);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        {isLoading ? (
          <div className="h-[90px] w-[90px] rounded-full bg-gray-200 animate-pulse"></div>
        ) : (
          <img
            className="rounded-full"
            //@ts-ignore
            crossorigin="anonymous"
            src={profileData?.profile_image_url}
            height={90}
            width={90}
          />
        )}
        {isLoading ? (
          <div className="w-24 bg-gray-200 h-5 rounded animate-pulse mt-2"></div>
        ) : (
          <h2 className="text-xl mt-2 silka-semibold text-gray-900">
            {profileData?.name}
          </h2>
        )}
        {isLoading ? (
          <div className="w-32 bg-gray-200 h-4 rounded animate-pulse mt-0.5"></div>
        ) : (
          <span className="text-sm mt-0.5 silka-regular text-gray-600">
            @{profileData?.username}
          </span>
        )}
        {isLoading ? (
          <div className="w-72 h-5 mt-5 rounded bg-gray-200 animate-pulse"></div>
        ) : (
          <p className="mt-5 silka-medium text-sm text-gray-800">
            {profileData?.description}
          </p>
        )}
      </div>
    </div>
  );
}
