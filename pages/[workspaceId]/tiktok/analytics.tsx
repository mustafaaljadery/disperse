import DashboardLayout from '../../../layouts/Dashboard';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { SecureTiktok } from '../../../layouts/secure/SecureTiktok';
import { TiktokMenu } from '../../../components/tiktok/TiktokMenu';
import { PageHead } from '../../../layouts/PageHead';
import { TiktokAnalyticsHeader } from '../../../components/tiktok/TiktokAnlyticsHeader';
import { FollowersAnalytic } from '../../../components/tiktok/Charts/FollowersAnalytic';
import { VideosAnalytic } from '../../../components/tiktok/Charts/VideosAnalytic';
import { SharesAnalytic } from '../../../components/tiktok/Charts/SharesAnalytic';
import { ViewsAnalytic } from '../../../components/tiktok/Charts/ViewsAnalytic';
import { LikesAnalytic } from '../../../components/tiktok/Charts/LikesAnalytic';
import { TiktokFollowersChart } from '../../../components/tiktok/Charts/FollowersChart';
import { TiktokLikesChart } from '../../../components/tiktok/Charts/LikesChart';
import { TiktokEngagementChart } from '../../../components/tiktok/Charts/EngagementChart';
import { TiktokVideosChart } from '../../../components/tiktok/Charts/VideosChart';
import { TiktokCommentsChart } from '../../../components/tiktok/Charts/CommentsChart';
import { SingleVideoAnalytics } from '../../../components/tiktok/SingleVideoAnalytics';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../../utils/apiUrl';

async function getAnalytics(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}tiktok/read/analytics`,
      { params: { workspaceId: workspaceId } }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

function between(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

export default function TiktokAnalytics() {
  const [workspaceId, setWorkspaceId] = useState('');
  const [secureLoading, setSecureLoading] = useState(true);
  const [timeIncrement, setTimeIncrement] = useState('7 days');
  const [isPremium, setIsPremium] = useState(false);
  const router = useRouter();

  // Info that has to be fetched
  const [followers, setFollowers] = useState<any>(null);
  const [likes, setLikes] = useState<any>(null);
  const [shares, setShares] = useState<any>(null);
  const [videos, setVideos] = useState<any>(null);
  const [views, setViews] = useState<any>(null);
  const [comments, setComments] = useState<any>(null);

  useEffect(() => {
    if (!secureLoading) {
      if (isPremium) {
        getAnalytics(workspaceId).then((value) => {
          setFollowers(value.followers);
          setLikes(value.likes);
          setShares(value.shares);
          setVideos(value.videos);
          setViews(value.views);
          setComments(value.comments);
        });
      } else {
        setFollowers(between(1, 20000));
        setLikes(between(1, 20000));
        setShares(between(1, 20000));
        setVideos(between(1, 20000));
        setViews(between(1, 20000));
        setComments(between(1, 20000));
      }
    }
  }, [secureLoading]);

  return (
    <PageHead title="TikTok Analytics · Disperse">
      <SecureTiktok
        loading={secureLoading}
        setLoading={setSecureLoading}
        setWorkspaceId={setWorkspaceId}
        setIsPremium={setIsPremium}
      >
        <DashboardLayout>
          <TiktokMenu
            title="Analytics"
            workspaceId={workspaceId}
            router={router}
          />
          <main className="px-1 sm:px-4 md:px-8 lg:px-12 xl:px-32 2xl:px-64 3xl:px-80 mt-10 flex flex-col">
            <TiktokAnalyticsHeader
              workspaceId={workspaceId}
              timeIncrement={timeIncrement}
              setTimeIncrement={setTimeIncrement}
              isPremium={isPremium}
            />
            <div className="mt-8 w-full border flex flex-row flex-wrap rounded-lg md:divide-x py-3">
              <FollowersAnalytic
                workspaceId={workspaceId}
                followers={followers}
                isPremium={isPremium}
              />
              <ViewsAnalytic
                workspaceId={workspaceId}
                views={views}
                isPremium={isPremium}
              />
              <LikesAnalytic
                workspaceId={workspaceId}
                likes={likes}
                isPremium={isPremium}
              />
              <SharesAnalytic
                workspaceId={workspaceId}
                shares={shares}
                isPremium={isPremium}
              />
              <VideosAnalytic
                workspaceId={workspaceId}
                videos={videos}
                isPremium={isPremium}
              />
            </div>
            <div>
              <TiktokFollowersChart
                timeInterval={timeIncrement}
                workspaceId={workspaceId}
                followers={followers}
                isPremium={isPremium}
              />
              <TiktokLikesChart
                timeInterval={timeIncrement}
                likes={likes}
                workspaceId={workspaceId}
                views={views}
                isPremium={isPremium}
              />
              <TiktokCommentsChart
                timeInterval={timeIncrement}
                workspaceId={workspaceId}
                comments={comments}
                shares={shares}
                isPremium={isPremium}
              />
              <TiktokEngagementChart
                timeInterval={timeIncrement}
                workspaceId={workspaceId}
                comments={comments}
                likes={likes}
                shares={shares}
                views={views}
                isPremium={isPremium}
              />
              <TiktokVideosChart
                timeInterval={timeIncrement}
                workspaceId={workspaceId}
                videos={videos}
              />
              <SingleVideoAnalytics
                timeInterval={timeIncrement}
                workspaceId={workspaceId}
                isPremium={isPremium}
              />
            </div>
          </main>
        </DashboardLayout>
      </SecureTiktok>
    </PageHead>
  );
}
