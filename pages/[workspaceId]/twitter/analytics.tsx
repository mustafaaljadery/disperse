import DashboardLayout from '../../../layouts/Dashboard';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { TwitterMenu } from '../../../components/twitter/TwitterMenu';
import { TweetsAnalytic } from '../../../components/twitter/Charts/TweetsAnalytic';
import { ImpressionsAnalytic } from '../../../components/twitter/Charts/ImpressionsAnalytic';
import { FollowerAnalytic } from '../../../components/twitter/Charts/FollowerAnalytic';
import { EngagementAnalytic } from '../../../components/twitter/Charts/EngagementAnalytic';
import { ProfileClicksAnalytic } from '../../../components/twitter/Charts/ProfileClicksAnalytic';
import { TwitterAnalyticsHeader } from '../../../components/twitter/AnalyticsHeader';
import { TwitterEngagementChart } from '../../../components/twitter/Charts/EngagementChart';
import { SecureTwitter } from '../../../layouts/secure/SecureTwitter';
import { TwitterFollowersChart } from '../../../components/twitter/Charts/FollowersChart';
import { TwitterImpressionsChart } from '../../../components/twitter/Charts/ImpressionsChart';
import { TwitterTweetsChart } from '../../../components/twitter/Charts/TweetsChart';
import { TwitterProfileClicksChart } from '../../../components/twitter/Charts/ProfileClicks';
import { PageHead } from '../../../layouts/PageHead';
import { SingleTweetAnalytics } from '../../../components/twitter/SingleTweetAnalytics';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../../utils/apiUrl';

async function getAnalytics(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}twitter/read/analytics`,
      {
        params: { workspaceId: workspaceId },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

function between(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

export default function TwitterAnalytics() {
  const [workspaceId, setWorkspaceId] = useState('');
  const [secureLoading, setSecureLoading] = useState(true);
  const [timeIncrement, setTimeIncrement] = useState('7 days');
  const [isPremium, setIsPremium] = useState(false);
  const router = useRouter();

  // Info that has to be fetched
  const [followers, setFollowers] = useState<any>(null);
  const [impressions, setImpressions] = useState<any>(null);
  const [tweets, setTweets] = useState<any>(null);
  const [profileClicks, setProfileClicks] = useState<any>(null);
  const [engagements, setEngagements] = useState<any>(null);

  useEffect(() => {
    if (!secureLoading) {
      if (isPremium) {
        getAnalytics(workspaceId).then((value) => {
          setFollowers(value.followers);
          setImpressions(value.impressions);
          setTweets(value.tweets);
          setProfileClicks(value.profileClicks);
          setEngagements(value.engagements);
        });
      } else {
        setFollowers(between(1, 20000));
        setImpressions(between(1, 20000));
        setTweets(between(1, 20000));
        setProfileClicks(between(1, 20000));
        setEngagements(between(1, 20000));
      }
    }
  }, [secureLoading]);

  return (
    <PageHead title="Twitter Analytics · Disperse">
      <SecureTwitter
        loading={secureLoading}
        setLoading={setSecureLoading}
        setWorkspaceId={setWorkspaceId}
        setIsPremium={setIsPremium}
      >
        <DashboardLayout>
          <TwitterMenu
            title="Analytics"
            workspaceId={workspaceId}
            router={router}
          />
          <main className="px-1 sm:px-4 md:px-8 lg:px-12 xl:px-32 2xl:px-64 3xl:px-80 mt-10 flex flex-col">
            <TwitterAnalyticsHeader
              workspaceId={workspaceId}
              timeIncrement={timeIncrement}
              setTimeIncrement={setTimeIncrement}
              isPremium={isPremium}
            />
            <div className="mt-8 w-full border flex flex-row flex-wrap rounded-lg md:divide-x py-3">
              <FollowerAnalytic
                workspaceId={workspaceId}
                followers={followers}
                isPremium={isPremium}
              />
              <TweetsAnalytic
                workspaceId={workspaceId}
                tweets={tweets}
                isPremium={isPremium}
              />
              <ProfileClicksAnalytic
                workspaceId={workspaceId}
                profileClicks={profileClicks}
                isPremium={isPremium}
              />
              <EngagementAnalytic
                workspaceId={workspaceId}
                engagements={engagements}
                impressions={impressions}
                isPremium={isPremium}
              />
              <ImpressionsAnalytic
                workspaceId={workspaceId}
                impressions={impressions}
                isPremium={isPremium}
              />
            </div>
            <div className="flex flex-col space-y-5">
              <TwitterFollowersChart
                followers={followers}
                timeInterval={timeIncrement}
                workspaceId={workspaceId}
                isPremium={isPremium}
              />
              <TwitterImpressionsChart
                workspaceId={workspaceId}
                impressions={impressions}
                timeInterval={timeIncrement}
                isPremium={isPremium}
              />
              <TwitterEngagementChart
                workspaceId={workspaceId}
                timeInterval={timeIncrement}
                engagements={engagements}
                impressions={impressions}
                isPremium={isPremium}
              />
              <TwitterProfileClicksChart
                workspaceId={workspaceId}
                timeInterval={timeIncrement}
                profileClicks={profileClicks}
                isPremium={isPremium}
              />
              <TwitterTweetsChart
                timeInterval={timeIncrement}
                workspaceId={workspaceId}
              />
            </div>
            <SingleTweetAnalytics
              workspaceId={workspaceId}
              isPremium={isPremium}
            />
          </main>
        </DashboardLayout>
      </SecureTwitter>
    </PageHead>
  );
}
