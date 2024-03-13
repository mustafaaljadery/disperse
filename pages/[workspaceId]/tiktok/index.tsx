import DashboardLayout from '../../../layouts/Dashboard';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { SecureTiktok } from '../../../layouts/secure/SecureTiktok';
import { TiktokMenu } from '../../../components/tiktok/TiktokMenu';
import { PageHead } from '../../../layouts/PageHead';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../../utils/apiUrl';
import { ScheduledVideos } from '../../../components/tiktok/ScheduledVideos';
import { useSession } from 'next-auth/react';

async function getTiktokProfile(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}tiktok/read/userprofile`,
      { params: { workspaceId: workspaceId } }
    );

    return result.data;
  } catch (e) {
    console.log(e);
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

export default function Tiktok() {
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState<any>(null);
  const [workspaceId, setWorkspaceId] = useState('');
  const [secureLoading, setSecureLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!secureLoading) {
      getTiktokProfile(workspaceId).then((value) => {
        setProfileData(value);
        setIsLoading(false);
      });
    }
  }, [secureLoading]);

  return (
    <PageHead title="TikTok · Disperse">
      <SecureTiktok
        loading={secureLoading}
        setLoading={setSecureLoading}
        setWorkspaceId={setWorkspaceId}
        setIsPremium={setIsPremium}
      >
        <DashboardLayout>
          <TiktokMenu
            title="TikTok"
            workspaceId={workspaceId}
            router={router}
          />
          <main className="px-3 md:px-12 lg:px-4 xl:px-32 2xl:px-64 mt-10 flex flex-col">
            <div className="flex flex-col space-y-8">
              <div className="flex flex-col space-y-5 md:space-y-0 md:flex-row md:space-x-5">
                {isLoading ? (
                  <div className="h-[92px] w-[92px] rounded-full bg-gray-200 animate-pulse" />
                ) : (
                  <img
                    className="h-[92px] w-[92px] rounded-full"
                    crossOrigin="anonymous"
                    src={profileData?.user?.avatar_large_url}
                  />
                )}
                <div className="flex flex-col space-y-2">
                  {isLoading ? (
                    <div className="mt-1 w-44 h-8 bg-gray-200 rounded animate-pulse" />
                  ) : (
                    <h2 className="text-xl md:text-2xl silka-semibold text-gray-800">
                      {profileData?.user?.display_name}
                    </h2>
                  )}
                  {isLoading ? (
                    <div className="w-64 rounded h-5 bg-gray-200 animate-pulse" />
                  ) : (
                    <p
                      className={
                        'text-xs md:text-sm silka-regular ' +
                        (profileData?.user?.bio_description &&
                        profileData?.user?.bio_description?.length > 0
                          ? 'text-gray-500'
                          : 'text-gray-400 italic')
                      }
                    >
                      {profileData?.user?.bio_description &&
                      profileData?.user?.bio_description?.length > 0
                        ? profileData?.user?.bio_description
                        : 'No description...'}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-row space-x-4 md:space-x-8">
                <div className="flex flex-row space-x-2">
                  {isLoading ? (
                    <div className="w-8 md:w-12 h-5 md:h-6 rounded bg-gray-200 animate-pulse my-auto" />
                  ) : (
                    <span className="text-gray-800 silka-semibold md:text-lg">
                      {formatLargeNumber(
                        Number(profileData?.user?.following_count),
                        1
                      )}
                    </span>
                  )}
                  <p className="my-auto text-gray-500 text-xs md:text-sm silka-regular">
                    Following
                  </p>
                </div>
                <div className="flex flex-row space-x-2">
                  {isLoading ? (
                    <div className="w-8 md:w-12 h-5 md:h-6 rounded bg-gray-200 animate-pulse my-auto" />
                  ) : (
                    <span className="text-gray-800 silka-semibold md:text-lg">
                      {formatLargeNumber(
                        Number(profileData?.user?.follower_count),
                        1
                      )}
                    </span>
                  )}
                  <p className="my-auto text-gray-500 text-xs md:text-sm silka-regular">
                    Followers
                  </p>
                </div>
                <div className="flex flex-row space-x-2">
                  {isLoading ? (
                    <div className="w-8 md:w-12 h-5 md:h-6 rounded bg-gray-200 animate-pulse my-auto" />
                  ) : (
                    <span className="text-gray-800 silka-semibold md:text-lg">
                      {formatLargeNumber(
                        Number(profileData?.user?.likes_count),
                        1
                      )}
                    </span>
                  )}
                  <p className="my-auto text-gray-500 text-xs md:text-sm silka-regular">
                    Likes
                  </p>
                </div>
              </div>
            </div>
            <ScheduledVideos
              workspaceId={workspaceId}
              userId={String(session?.user?.id)}
            />
          </main>
        </DashboardLayout>
      </SecureTiktok>
    </PageHead>
  );
}
