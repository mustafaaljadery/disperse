import DashboardLayout from '../../../layouts/Dashboard';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { SecureTiktok } from '../../../layouts/secure/SecureTiktok';
import { TiktokMenu } from '../../../components/tiktok/TiktokMenu';
import { PageHead } from '../../../layouts/PageHead';
import { TiktokHashtagTrends } from '../../../components/tiktok/HashtagTrends';
import { TiktokCreatorTrends } from '../../../components/tiktok/CreatorTrends';
import { TiktokSongTrends } from '../../../components/tiktok/SongTrends';
import { TiktokVideoTrends } from '../../../components/tiktok/VideoTrends';

export default function TiktokTrends() {
  const [workspaceId, setWorkspaceId] = useState('');
  const [secureLoading, setSecureLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const [tab, setTab] = useState('Hashtags');
  const router = useRouter();

  return (
    <PageHead title="TikTok Trends · Disperse">
      <SecureTiktok
        loading={secureLoading}
        setLoading={setSecureLoading}
        setWorkspaceId={setWorkspaceId}
        setIsPremium={setIsPremium}
      >
        <DashboardLayout>
          <TiktokMenu
            title="Trends"
            workspaceId={workspaceId}
            router={router}
          />
          <main className="px-3 md:px-12 lg:px-4 xl:px-24 2xl:px-44 mt-10 flex flex-col">
            <div className="flex flex-col space-y-1.5">
              <h1 className="silka-semibold text-gray-900">
                TikTok Trends
              </h1>
              <p className="silka-regular text-xs text-gray-500">
                Today&apos;s most trending actions on TikTok.
              </p>
            </div>
            <div className="mt-5 flex flex-col space-y-5 md:space-y-0 md:flex-row md:space-x-5">
              <div className="w-full md:w-1/5 flex flex-col justify-start items-start space-y-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setTab('Hashtags');
                  }}
                  className={
                    'py-1.5 px-2 rounded text-sm w-full text-start ' +
                    (tab == 'Hashtags'
                      ? 'bg-gray-50 text-gray-900 silka-medium'
                      : 'text-gray-700 silka-regular')
                  }
                >
                  Hashtags
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setTab('Creators');
                  }}
                  className={
                    'py-1.5 px-2 rounded text-sm w-full text-start ' +
                    (tab == 'Creators'
                      ? 'bg-gray-50 text-gray-900 silka-medium'
                      : 'text-gray-700 silka-regular')
                  }
                >
                  Creators
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setTab('Songs');
                  }}
                  className={
                    'py-1.5 px-2 rounded text-sm w-full text-start ' +
                    (tab == 'Songs'
                      ? 'bg-gray-50 text-gray-900 silka-medium'
                      : 'text-gray-700 silka-regular')
                  }
                >
                  Songs
                </button>
              </div>
              <div className="w-full md:w-4/5">
                {tab == 'Hashtags' ? (
                  <TiktokHashtagTrends />
                ) : tab == 'Creators' ? (
                  <TiktokCreatorTrends />
                ) : tab == 'Songs' ? (
                  <TiktokSongTrends />
                ) : tab == 'Videos' ? (
                  <TiktokVideoTrends />
                ) : (
                  <></>
                )}
              </div>
            </div>
          </main>
        </DashboardLayout>
      </SecureTiktok>
    </PageHead>
  );
}
