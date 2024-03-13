import DashboardLayout from '../../../layouts/Dashboard';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { TwitterMenu } from '../../../components/twitter/TwitterMenu';
import { SecureTwitter } from '../../../layouts/secure/SecureTwitter';
import { RepliesAndMentions } from '../../../components/twitter/Dialog/RepliesAndMentions';
import { SearchKeywords } from '../../../components/twitter/SearchKeywords';
import { TwitterLists } from '../../../components/twitter/TwitterLists';
import { PageHead } from '../../../layouts/PageHead';
import { FollowingTweets } from '../../../components/twitter/FollowingTweets';

export default function TwitterEngage() {
  const [workspaceId, setWorkspaceId] = useState('');
  const [isPremium, setIsPremium] = useState(true);
  const [tab, setTab] = useState('Replies');
  const [secureLoading, setSecureLoading] = useState(true);
  const router = useRouter();

  return (
    <PageHead title="Twitter Engage · Disperse">
      <SecureTwitter
        loading={secureLoading}
        setLoading={setSecureLoading}
        setWorkspaceId={setWorkspaceId}
        setIsPremium={setIsPremium}
      >
        <DashboardLayout>
          <TwitterMenu
            title="Engage"
            workspaceId={workspaceId}
            router={router}
          />
          <main className="px-2 md:px-6 lg:px-2 xl:px-18 2xl:px-36 mt-10 flex flex-col">
            <div className="mt-5 flex flex-col space-y-5 md:space-y-0 md:flex-row md:space-x-5">
              <div className="w-full md:w-1/5 flex flex-col justify-start items-start space-y-2">
                <button
                  onClick={() => {
                    setTab('Replies');
                  }}
                  className={
                    'py-1.5 px-2 rounded text-sm w-full text-start ' +
                    (tab == 'Replies'
                      ? 'bg-gray-50 text-gray-900 silka-medium'
                      : 'text-gray-700 silka-regular')
                  }
                >
                  Replies and Mentions
                </button>
                <button
                  onClick={() => {
                    setTab('Following');
                  }}
                  className={
                    'py-1.5 px-2 rounded text-sm w-full text-start ' +
                    (tab == 'Following'
                      ? 'bg-gray-50 text-gray-900 silka-medium'
                      : 'text-gray-700 silka-regular')
                  }
                >
                  Following
                </button>
                <button
                  onClick={() => {
                    setTab('Keywords');
                  }}
                  className={
                    'py-1.5 px-2 rounded text-sm w-full text-start ' +
                    (tab == 'Keywords'
                      ? 'bg-gray-50 text-gray-900 silka-medium'
                      : 'text-gray-700 silka-regular')
                  }
                >
                  Search for Keywords
                </button>
              </div>
              <div className="w-full md:w-4/5">
                {tab == 'Replies' ? (
                  <RepliesAndMentions workspaceId={workspaceId} />
                ) : tab == 'Following' ? (
                  <FollowingTweets workspaceId={workspaceId} />
                ) : tab == 'Keywords' ? (
                  <SearchKeywords workspaceId={workspaceId} />
                ) : (
                  <></>
                )}
              </div>
            </div>
          </main>
        </DashboardLayout>
      </SecureTwitter>
    </PageHead>
  );
}
