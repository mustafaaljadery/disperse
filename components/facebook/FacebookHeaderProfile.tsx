import { useState, useEffect } from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../utils/apiUrl';

interface Props {
  workspaceId: string;
}

async function getProfile(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}facebook/read/profile`,
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

export function FacebookHeaderProfile({ workspaceId }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    getProfile(workspaceId).then((value) => {
      setProfileData(value);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="flex flex-col">
      {isLoading ? (
        <div className="h-[90px] w-[90px] rounded-full bg-gray-200 animate-pulse" />
      ) : (
        <div>
          <img
            className="rounded-full"
            crossOrigin="anonymous"
            src={profileData?.picture}
            height={90}
            width={90}
          />
        </div>
      )}
      {isLoading ? (
        <div className="w-32 bg-gray-200 h-8 rounded animte-pulse mt-2" />
      ) : (
        <h2 className="text-xl mt-2 silka-semibold text-gray-900">
          {profileData?.name}
        </h2>
      )}
      {isLoading ? (
        <div className="w-72 h-5 mt-2.5 rounded bg-gray-200 animate-pulse" />
      ) : (
        <p
          className={
            'mt-2 silka-medium text-sm ' +
            (profileData?.about && profileData.about.length > 0
              ? 'text-gray-500'
              : 'text-gray-400 italic')
          }
        >
          {profileData?.about && profileData.about.length > 0
            ? profileData.about
            : 'No bio...'}
        </p>
      )}
    </div>
  );
}
