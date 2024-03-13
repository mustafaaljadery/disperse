import DashboardLayout from '../../../layouts/Dashboard';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { SecureYoutube } from '../../../layouts/secure/SecureYoutube';
import { YoutubeMenu } from '../../../components/youtube/YoutubeMenu';
import { PageHead } from '../../../layouts/PageHead';
import { YoutubeSingleVideoAnalytics } from '../../../components/youtube/SingleVideoAnalytics';
import { YoutubeSubscribersAnalytic } from '../../../components/youtube/charts/SubscribersAnalytic';
import { YoutubeViewsAnalytic } from '../../../components/youtube/charts/ViewsAnalytic';
import { YoutubeLikesAnalytic } from '../../../components/youtube/charts/LikesAnalytic';
import { YoutubeWatchTimeAnalytic } from '../../../components/youtube/charts/WatchTimeAnalytic';
import { YoutubeVideosAnalytic } from '../../../components/youtube/charts/VideosAnalytic';
import { YoutubeSubscribersChart } from '../../../components/youtube/charts/SubscribersChart';
import { YoutubeViewsChart } from '../../../components/youtube/charts/ViewsChart';
import { YoutubeWatchTimeChart } from '../../../components/youtube/charts/WatchTimeChart';
import { YoutubeLikesChart } from '../../../components/youtube/charts/LikesChart';
import { YoutubeCommentsChart } from '../../../components/youtube/charts/CommentsChart';
import { YoutubeImpressionsChart } from '../../../components/youtube/charts/ImpressionsChart';
import { YoutubeVideosChart } from '../../../components/youtube/charts/VideosChart';
import { YoutubeAnalyticsHeader } from '../../../components/youtube/AnalyticsHeader';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../../utils/apiUrl';

async function getAnalytics(workspaceId: string) {
  axiosRetry(axios, { retries: 3 });

  try {
    const result = await axios.get(
      `${apiUrl()}youtube/read/analytics`,
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

export default function YoutubeAnalytics() {
  const [workspaceId, setWorkspaceId] = useState('');
  const [secureLoading, setSecureLoading] = useState(true);
  const [timeInterval, setTimeInterval] = useState('7 days');
  const [isPremium, setIsPremium] = useState(true);
  const router = useRouter();

  // Info that has to be fetched
  const [subscribers, setSubscribers] = useState<any>(null);
  const [views, setViews] = useState<any>(null);
  const [likes, setLikes] = useState<any>(null);
  const [dislikes, setDislikes] = useState<any>(null);
  const [watchtime, setWatchtime] = useState<any>(null);
  const [watchduration, setWatchDuration] = useState<any>(null);
  const [videos, setVideos] = useState<any>(null);
  const [comments, setComments] = useState<any>(null);
  const [shares, setShares] = useState<any>(null);
  const [impressions, setImpressions] = useState<any>(null);

  useEffect(() => {
    if (!secureLoading) {
      if (isPremium) {
        getAnalytics(workspaceId).then((value) => {
          setSubscribers(value.subscribers);
          setViews(value.views);
          setLikes(value.likes);
          setWatchtime(value.watchtime);
          setVideos(value.videos);
          setDislikes(value.dislikes);
          setWatchDuration(value.watchduration);
          setComments(value.comments);
          setShares(value.shares);
          setImpressions(value.impressions);
        });
      } else {
        setSubscribers(between(1, 20000));
        setViews(between(1, 20000));
        setLikes(between(1, 20000));
        setWatchtime(between(1, 20000));
        setVideos(between(1, 20000));
        setDislikes(between(1, 20000));
        setWatchDuration(between(1, 20000));
        setComments(between(1, 20000));
        setShares(between(1, 20000));
        setImpressions(between(1, 20000));
      }
    }
  }, [secureLoading]);

  return (
    <PageHead title="Youtube Analytics · Disperse">
      <SecureYoutube
        loading={secureLoading}
        setLoading={setSecureLoading}
        setWorkspaceId={setWorkspaceId}
        setIsPremium={setIsPremium}
      >
        <DashboardLayout>
          <YoutubeMenu
            title="Analytics"
            workspaceId={workspaceId}
            router={router}
          />
          <main className="px-1 sm:px-4 md:px-8 lg:px-12 xl:px-32 2xl:px-64 3xl:px-80 mt-10 flex flex-col">
            <YoutubeAnalyticsHeader
              workspaceId={workspaceId}
              timeIncrement={timeInterval}
              setTimeIncrement={setTimeInterval}
              isPremium={isPremium}
            />
            <div className="mt-8 w-full border flex flex-row flex-wrap rounded-lg md:divide-x py-3">
              <YoutubeSubscribersAnalytic
                workspaceId={workspaceId}
                subscribers={subscribers}
                isPremium={isPremium}
              />
              <YoutubeViewsAnalytic
                workspaceId={workspaceId}
                views={views}
                isPremium={isPremium}
              />
              <YoutubeLikesAnalytic
                workspaceId={workspaceId}
                likes={likes}
                isPremium={isPremium}
              />
              <YoutubeWatchTimeAnalytic
                workspaceId={workspaceId}
                watchtime={watchtime}
                isPremium={isPremium}
              />
              <YoutubeVideosAnalytic
                workspaceId={workspaceId}
                videos={videos}
                isPremium={isPremium}
              />
            </div>
            <div className="flex flex-col space-y-5 mt-8">
              <YoutubeSubscribersChart
                workspaceId={workspaceId}
                timeInterval={timeInterval}
                subscribers={subscribers}
                isPremium={isPremium}
              />
              <YoutubeViewsChart
                workspaceId={workspaceId}
                timeInterval={timeInterval}
                views={views}
                isPremium={isPremium}
              />
              <YoutubeWatchTimeChart
                workspaceId={workspaceId}
                timeInterval={timeInterval}
                watchtime={watchtime}
                watchduration={watchduration}
                isPremium={isPremium}
              />
              <YoutubeLikesChart
                workspaceId={workspaceId}
                timeInterval={timeInterval}
                likes={likes}
                dislikes={dislikes}
                isPremium={isPremium}
              />
              <YoutubeCommentsChart
                workspaceId={workspaceId}
                timeInterval={timeInterval}
                comments={comments}
                shares={shares}
                isPremium={isPremium}
              />
              <YoutubeImpressionsChart
                workspaceId={workspaceId}
                timeInterval={timeInterval}
                impressions={impressions}
                isPremium={isPremium}
              />
              <YoutubeVideosChart
                workspaceId={workspaceId}
                timeInterval={timeInterval}
                videos={videos}
              />
            </div>
            {/*
            <YoutubeSingleVideoAnalytics
              workspaceId={workspaceId}
              isPremium={isPremium}
            />
  */}
          </main>
        </DashboardLayout>
      </SecureYoutube>
    </PageHead>
  );
}
