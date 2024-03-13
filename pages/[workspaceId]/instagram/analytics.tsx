import DashboardLayout from '../../../layouts/Dashboard';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { InstagramMenu } from '../../../components/instagram/InstagramMenu';
import { SecureInstagram } from '../../../layouts/secure/SecureInstagram';
import { PageHead } from '../../../layouts/PageHead';
import { InstagramFollowersAnalytic } from '../../../components/instagram/charts/InstagramFollowersAnalytic';
import { InstagramLikesAnalytic } from '../../../components/instagram/charts/InstagramLikesAnalytic';
import { InstagramImpressionsAnalytic } from '../../../components/instagram/charts/InstagramImpressionsAnalytic';
import { InstagramProfileViewsAnalytic } from '../../../components/instagram/charts/InstagramProfileViewsAnalytic';
import { InstagramPostsAnalytic } from '../../../components/instagram/charts/InstagramPostsAnalytic';
import { InstagramFollowersChart } from '../../../components/instagram/charts/FollowersChart';
import { InstagramImpressionsChart } from '../../../components/instagram/charts/ImpressionsChart';
import { InstagramLikesChart } from '../../../components/instagram/charts/LIkesChart';
import { InstagramCommentsChart } from '../../../components/instagram/charts/CommentsChart';
import { InstagramSavedChart } from '../../../components/instagram/charts/SavedChart';
import { InstagramInteractionsChart } from '../../../components/instagram/charts/InteractionsChart';
import { InstagramEngagementChart } from '../../../components/instagram/charts/EngagementChart';
import { InstagramPostsChart } from '../../../components/instagram/charts/PostsChart';
import { InstagramAnalyticHeader } from '../../../components/instagram/InstagramAnalyticHeader';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../../utils/apiUrl';
import { InstagramSinglePostAnalytics } from '../../../components/instagram/SinglePostAnalytics';

async function getAnalytics(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}instagram/read/analytics`,
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

export default function InstagramAnalytics() {
  const [workspaceId, setWorkspaceId] = useState('');
  const [secureLoading, setSecureLoading] = useState(true);
  const [timeIncrement, setTimeIncrement] = useState('7 days');
  const [isPremium, setIsPremium] = useState(false);
  const router = useRouter();

  const [followers, setFollowers] = useState<any>(null);
  const [impressions, setImpressions] = useState<any>(null);
  const [reach, setReach] = useState<any>(null);
  const [websiteClicks, setWebsiteClicks] = useState<any>(null);
  const [profileViews, setProfileViews] = useState<any>(null);
  const [interactions, setInteractions] = useState<any>(null);
  const [likes, setLikes] = useState<any>(null);
  const [comments, setComments] = useState<any>(null);
  const [saved, setSaved] = useState<any>(null);
  const [shares, setShares] = useState<any>(null);
  const [engagement, setEngagement] = useState<any>(null);
  const [posts, setPosts] = useState<any>(null);

  useEffect(() => {
    if (!secureLoading) {
      if (isPremium) {
        getAnalytics(workspaceId).then((value) => {
          setFollowers(value?.followers || 0);
          setImpressions(value?.impressions || 0);
          setReach(value?.reach || 0);
          setWebsiteClicks(value?.website_clicks || 0);
          setProfileViews(value?.profile_views || 0);
          setInteractions(value?.interactions || 0);
          setLikes(value?.likes || 0);
          setComments(value?.comments || 0);
          setSaved(value?.saved || 0);
          setShares(value?.shares || 0);
          setEngagement(value?.engagement || 0);
          setPosts(0);
        });
      } else {
        setFollowers(between(1, 20000));
        setImpressions(between(1, 20000));
        setReach(between(1, 20000));
        setWebsiteClicks(between(1, 20000));
        setProfileViews(between(1, 20000));
        setInteractions(between(1, 20000));
        setLikes(between(1, 20000));
        setComments(between(1, 20000));
        setSaved(between(1, 20000));
        setShares(between(1, 20000));
        setEngagement(between(1, 20000));
        setPosts(between(1, 20000));
      }
    }
  }, [secureLoading]);

  return (
    <PageHead title="Instagram Analytics · Disperse">
      <SecureInstagram
        loading={secureLoading}
        setLoading={setSecureLoading}
        setWorkspaceId={setWorkspaceId}
        setIsPremium={setIsPremium}
      >
        <DashboardLayout>
          <InstagramMenu
            title="Analytics"
            workspaceId={workspaceId}
            router={router}
          />
          <main className="px-1 sm:px-4 md:px-8 lg:px-12 xl:px-32 2xl:px-64 3xl:px-80 mt-10 flex flex-col">
            <InstagramAnalyticHeader
              workspaceId={workspaceId}
              timeIncrement={timeIncrement}
              setTimeIncrement={setTimeIncrement}
              isPremium={isPremium}
            />
            <div className="mt-8 w-full border flex flex-row flex-wrap rounded-lg md:divide-x py-3">
              <InstagramFollowersAnalytic
                workspaceId={workspaceId}
                followers={followers}
                isPremium={isPremium}
              />
              <InstagramLikesAnalytic
                workspaceId={workspaceId}
                likes={likes}
                isPremium={isPremium}
              />
              <InstagramImpressionsAnalytic
                workspaceId={workspaceId}
                impressions={impressions}
                isPremium={isPremium}
              />
              <InstagramProfileViewsAnalytic
                workspaceId={workspaceId}
                profileViews={profileViews}
                isPremium={isPremium}
              />
              <InstagramPostsAnalytic
                workspaceId={workspaceId}
                posts={posts}
                isPremium={isPremium}
              />
            </div>
            <div>
              <InstagramFollowersChart
                workspaceId={workspaceId}
                timeInterval={timeIncrement}
                followers={followers}
                isPremium={isPremium}
              />
              <InstagramImpressionsChart
                workspaceId={workspaceId}
                timeInterval={timeIncrement}
                impressions={impressions}
                profileViews={profileViews}
                reach={reach}
                isPremium={isPremium}
              />
              <InstagramLikesChart
                workspaceId={workspaceId}
                timeInterval={timeIncrement}
                likes={likes}
                isPremium={isPremium}
              />
              <InstagramCommentsChart
                workspaceId={workspaceId}
                timeInterval={timeIncrement}
                comments={comments}
                shares={shares}
                isPremium={isPremium}
              />
              <InstagramSavedChart
                workspaceId={workspaceId}
                timeInterval={timeIncrement}
                saved={saved}
                websiteClicks={websiteClicks}
                isPremium={isPremium}
              />
              <InstagramInteractionsChart
                workspaceId={workspaceId}
                timeInterval={timeIncrement}
                interactions={interactions}
                isPremium={isPremium}
              />
              <InstagramEngagementChart
                workspaceId={workspaceId}
                timeInterval={timeIncrement}
                engagement={engagement}
                impressions={impressions}
                isPremium={isPremium}
              />
              <InstagramPostsChart workspaceId={workspaceId} />
            </div>
            <InstagramSinglePostAnalytics
              workspaceId={workspaceId}
              isPremium={isPremium}
            />
          </main>
        </DashboardLayout>
      </SecureInstagram>
    </PageHead>
  );
}
