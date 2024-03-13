import DashboardLayout from '../../../layouts/Dashboard';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { SecureFacebook } from '../../../layouts/secure/SecureFacebook';
import { FacebookMenu } from '../../../components/facebook/FacebookMenu';
import { PageHead } from '../../../layouts/PageHead';
import { FacebookLikesAnalytic } from '../../../components/facebook/charts/LikesAnalytic';
import { FacebookImpressionsAnalytic } from '../../../components/facebook/charts/ImpressionsAnalytic';
import { FacebookViewsAnalytic } from '../../../components/facebook/charts/ViewsAnalytic';
import { FacebookPostsAnalytic } from '../../../components/facebook/charts/PostsAnalytic';
import { FacebookAnalyticsHeader } from '../../../components/facebook/FacebookAnalyticsHeader';
import { FacebookReactionsChart } from '../../../components/facebook/charts/ReactionsChart';
import { FacebookImpressionsChart } from '../../../components/facebook/charts/ImpressionsChart';
import { FacebookEngagementsChart } from '../../../components/facebook/charts/FacebookEngagementsChart';
import { FacebookLinkClicksChart } from '../../../components/facebook/charts/LinkClicksChart';
import { FacebookVideoViewsChart } from '../../../components/facebook/charts/VideoViewsChart';
import { FacebookVideoWatchedChart } from '../../../components/facebook/charts/VideoWatchedChart';
import { FacebookWatchtimeChart } from '../../../components/facebook/charts/WatchtimeChart';
import { FacebookPostsChart } from '../../../components/facebook/charts/PostsChart';
import axios from 'axios';
import { apiUrl } from '../../../utils/apiUrl';
import { FacebookSinglePosts } from '../../../components/facebook/FacebookSinglePosts';
import { FacebookEngagementsAnalytic } from '../../../components/facebook/charts/EngagementsAnalytic';

async function getAnalytics(workspaceId: string) {
  try {
    const result = await axios.get(
      `${apiUrl()}facebook/read/analytics`,
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

function between(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

export default function FacebookAnalytics() {
  const [workspaceId, setWorkspaceId] = useState('');
  const [secureLoading, setSecureLoading] = useState(true);
  const [timeIncrement, setTimeIncrement] = useState('7 days');
  const [isPremium, setIsPremium] = useState(false);
  const router = useRouter();

  const [followers, setFollowers] = useState<any>(null);
  const [views, setViews] = useState<any>(null);
  const [likes, setLikes] = useState<any>(null);
  const [impressions, setImpressions] = useState<any>(null);
  const [posts, setPosts] = useState<any>(null);
  const [positiveReactions, setPositiveReactions] =
    useState<any>(null);
  const [negativeReactions, setNegativeReactions] =
    useState<any>(null);
  const [linkClicks, setLinkClicks] = useState<any>(null);
  const [uniqueViews, setUniqueViews] = useState<any>(null);
  const [pageEngagement, setPageEngagement] = useState<any>(null);
  const [usersEngagement, setUsersEngagement] = useState<any>(null);
  const [watched30s, setWatched30s] = useState<any>(null);
  const [watched10s, setWatched10s] = useState<any>(null);
  const [totalViewtime, setTotalViewtime] = useState<any>(null);
  const [averageViewtime, setAverageViewtime] = useState<any>(null);

  useEffect(() => {
    if (!secureLoading) {
      if (isPremium) {
        getAnalytics(workspaceId).then((value) => {
          setFollowers(value.followers);
          setViews(value.views);
          setLikes(value.likes);
          setImpressions(value.impressions);
          setPosts(value.posts);
          setPositiveReactions(value.positive_reactions);
          setNegativeReactions(value.negative_reactions);
          setLinkClicks(value.link_clicks);
          setUniqueViews(value.unique_video_views);
          setPageEngagement(value.page_engagement);
          setUsersEngagement(value.user_engagement);
          setWatched30s(value.watch_time_30s);
          setWatched10s(value.watch_time_10s);
          setTotalViewtime(value.total_watchtime);
          setAverageViewtime(value.average_watchtime);
        });
      } else {
        setFollowers(between(1, 20000));
        setViews(between(1, 20000));
        setLikes(between(1, 20000));
        setImpressions(between(1, 20000));
        setPosts(between(1, 20000));
        setPositiveReactions(between(1, 20000));
        setNegativeReactions(between(1, 20000));
        setLinkClicks(between(1, 20000));
        setUniqueViews(between(1, 20000));
        setPageEngagement(between(1, 20000));
        setUsersEngagement(between(1, 20000));
        setWatched30s(between(1, 20000));
        setWatched10s(between(1, 20000));
        setTotalViewtime(between(1, 20000));
        setAverageViewtime(between(1, 20000));
      }
    }
  }, [secureLoading]);

  return (
    <PageHead title="Facebook Analytics · Disperse">
      <SecureFacebook
        loading={secureLoading}
        setLoading={setSecureLoading}
        setWorkspaceId={setWorkspaceId}
        setIsPremium={setIsPremium}
      >
        <DashboardLayout>
          <FacebookMenu
            title="Analytics"
            workspaceId={workspaceId}
            router={router}
          />
          <main className="px-1 sm:px-4 md:px-8 lg:px-12 xl:px-32 2xl:px-64 3xl:px-80 mt-10 flex flex-col">
            <FacebookAnalyticsHeader
              workspaceId={workspaceId}
              timeIncrement={timeIncrement}
              setTimeIncrement={setTimeIncrement}
              isPremium={isPremium}
            />
            <div className="mt-8 w-full border flex flex-row flex-wrap rounded-lg md:divide-x py-3">
              {/*
              <FacebookFollowersAnalytic
                workspaceId={workspaceId}
                followers={followers}
                isPremium={isPremium}
              />
  */}
              <FacebookLikesAnalytic
                workspaceId={workspaceId}
                likes={likes}
                isPremium={isPremium}
              />
              <FacebookEngagementsAnalytic
                workspaceId={workspaceId}
                engagements={pageEngagement}
                isPremium={isPremium}
              />
              <FacebookImpressionsAnalytic
                workspaceId={workspaceId}
                impressions={impressions}
                isPremium={isPremium}
              />
              <FacebookViewsAnalytic
                workspaceId={workspaceId}
                views={views}
                isPremium={isPremium}
              />
              <FacebookPostsAnalytic
                workspaceId={workspaceId}
                posts={posts}
                isPremium={isPremium}
              />
            </div>
            <div className="flex flex-col">
              {/*
              <FacebookFollowersChart
                workspaceId={workspaceId}
                timeInterval={timeIncrement}
                followers={followers}
                isPremium={isPremium}
              />
  */}
              <FacebookReactionsChart
                workspaceId={workspaceId}
                timeInterval={timeIncrement}
                positiveReactions={positiveReactions}
                negativeReactions={negativeReactions}
                isPremium={isPremium}
              />
              <FacebookImpressionsChart
                workspaceId={workspaceId}
                timeInterval={timeIncrement}
                impressions={impressions}
                isPremium={isPremium}
              />
              <FacebookEngagementsChart
                workspaceId={workspaceId}
                timeInterval={timeIncrement}
                impressions={impressions}
                pageEngagement={pageEngagement}
                userEngagement={usersEngagement}
                isPremium={isPremium}
              />
              <FacebookVideoViewsChart
                workspaceId={workspaceId}
                timeInterval={timeIncrement}
                views={views}
                uniqueViews={uniqueViews}
                isPremium={isPremium}
              />
              <FacebookVideoWatchedChart
                workspaceId={workspaceId}
                timeInterval={timeIncrement}
                watched30s={watched30s}
                watched10s={watched10s}
                isPremium={isPremium}
              />
              <FacebookWatchtimeChart
                workspaceId={workspaceId}
                timeInterval={timeIncrement}
                totalViewtime={totalViewtime}
                averageViewtime={averageViewtime}
                isPremium={isPremium}
              />
              <FacebookLinkClicksChart
                workspaceId={workspaceId}
                timeInterval={timeIncrement}
                linkClicks={linkClicks}
                isPremium={isPremium}
              />
              <FacebookPostsChart workspaceId={workspaceId} />
            </div>
            <FacebookSinglePosts
              workspaceId={workspaceId}
              isPremium={isPremium}
            />
          </main>
        </DashboardLayout>
      </SecureFacebook>
    </PageHead>
  );
}
