import DashboardLayout from '../../../layouts/Dashboard';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { TwitterMenu } from '../../../components/twitter/TwitterMenu';
import { WriteTweets } from '../../../components/twitter/Tweet/WriteTweet';
import { SecureTwitter } from '../../../layouts/secure/SecureTwitter';
import { TweetRight } from '../../../components/twitter/Tweet/right/tweet';
import { ThreadRight } from '../../../components/twitter/Tweet/right/thread';
import { GiveawayRight } from '../../../components/twitter/Tweet/right/giveaway';
import { PageHead } from '../../../layouts/PageHead';
import { PollRight } from '../../../components/twitter/Tweet/right/poll';
import { useSession } from 'next-auth/react';

export default function TwitterTweets() {
  const [workspaceId, setWorkspaceId] = useState('');
  const [secureLoading, setSecureLoading] = useState(true);
  const [section, setSection] = useState('Tweet');
  const [isPremium, setIsPremium] = useState(false);
  const { data: session } = useSession();

  // Selected
  const [selectedTweet, setSelectedTweet] = useState<any>(null);
  const [selectedThread, setSelectedThread] = useState<any>(null);
  const [selectedThreadTweet, setSelectedThreadTweet] =
    useState<any>(null);
  const [selectedGiveaway, setSelectedGiveaway] = useState<any>(null);
  const [selectedPoll, setSelectedPoll] = useState<any>(null);
  const [threadTweets, setThreadTweets] = useState<any>([
    { draftId: null, text: '', media: null },
    { draftId: null, text: '', media: null },
  ]);

  // Right Selected
  const [rightTweetSelected, setRightTweetSelected] =
    useState('Drafts');
  const [rightThreadSelected, setRightThreadSelected] =
    useState('Drafts');
  const [rightPollSelected, setRightPollSelected] =
    useState('Drafts');
  const [rightGiveawaySelected, setRightGiveawaySelected] =
    useState('Drafts');

  // Media
  const [tweetMedia, setTweetMedia] = useState<any>(null);
  const [currentThreadTweetMedia, setCurrentThreadTweetMedia] =
    useState<any>(null);
  const [giveawayMedia, setGiveawayMedia] = useState<any>(null);
  const [pollMedia, setPollMedia] = useState<any>(null);

  // Refetch
  const [refetchDrafts, setRefetchDrafts] = useState(false);
  const [refetchThreadDrafts, setRefetchThreadDrafts] =
    useState(false);
  const [refetchGiveawayDrafts, setRefetchGiveawayDrafts] =
    useState(false);
  const [refetchPollDrafts, setRefetchPollDrafts] = useState(false);

  const router = useRouter();

  return (
    <PageHead title="Twitter Tweets · Disperse">
      <SecureTwitter
        loading={secureLoading}
        setLoading={setSecureLoading}
        setWorkspaceId={setWorkspaceId}
        setIsPremium={setIsPremium}
      >
        <DashboardLayout>
          <TwitterMenu
            title="Tweets"
            workspaceId={workspaceId}
            router={router}
          />
          <main className="px-3 md:px-12 lg:px-4 xl:px-24 2xl:px-36 mt-10 flex flex-col">
            <div className="flex flex-col space-y-16 md:flex-row md:space-y-0 md:space-x-12 mb-12 md:mb-16 lg:mb-24">
              <div className="w-full md:w-2/5">
                <WriteTweets
                  userId={String(session?.user?.id)}
                  workspaceId={workspaceId}
                  selectedTweet={selectedTweet}
                  setSelectedTweet={setSelectedTweet}
                  selectedThread={selectedThread}
                  setSelectedThread={setSelectedThread}
                  selectedGiveaway={selectedGiveaway}
                  setSelectedGiveaway={setSelectedGiveaway}
                  selectedPoll={selectedPoll}
                  setSelectedPoll={setSelectedPoll}
                  refetchDrafts={refetchDrafts}
                  setRefetchDrafts={setRefetchDrafts}
                  refetchThreadDrafts={refetchThreadDrafts}
                  setRefetchThreadDrafts={setRefetchThreadDrafts}
                  refetchGiveawayDrafts={refetchGiveawayDrafts}
                  setRefetchGiveawayDrafts={setRefetchGiveawayDrafts}
                  refetchPollDrafts={refetchPollDrafts}
                  setRefetchPollDrafts={setRefetchPollDrafts}
                  tweetMedia={tweetMedia}
                  setTweetMedia={setTweetMedia}
                  giveawayMedia={giveawayMedia}
                  setGiveawayMedia={setGiveawayMedia}
                  pollMedia={pollMedia}
                  setPollMedia={setPollMedia}
                  section={section}
                  setSection={setSection}
                  setRightTweetSelected={setRightTweetSelected}
                  setRightThreadSelected={setRightThreadSelected}
                  setRightGiveawaySelected={setRightGiveawaySelected}
                  setRightPollSelected={setRightPollSelected}
                  selectedThreadTweet={selectedThreadTweet}
                  setSelectedThreadTweet={setSelectedThreadTweet}
                  currentThreadTweetMedia={currentThreadTweetMedia}
                  setCurrentThreadTweetMedia={
                    setCurrentThreadTweetMedia
                  }
                  threadTweets={threadTweets}
                  setThreadTweets={setThreadTweets}
                  isPremium={isPremium}
                />
              </div>
              <div className="w-full md:w-3/5">
                {section == 'Tweet' ? (
                  <TweetRight
                    workspaceId={workspaceId}
                    refetchDrafts={refetchDrafts}
                    setRefetchDrafts={setRefetchDrafts}
                    selectedTweet={selectedTweet}
                    setSelectedTweet={setSelectedTweet}
                    tweetMedia={tweetMedia}
                    setTweetMedia={setTweetMedia}
                    rightTweetSelected={rightTweetSelected}
                    setRightTweetSelected={setRightTweetSelected}
                  />
                ) : section == 'Thread' ? (
                  <ThreadRight
                    workspaceId={workspaceId}
                    refetchThreadDrafts={refetchThreadDrafts}
                    setRefetchThreadDrafts={setRefetchThreadDrafts}
                    selectedThread={selectedThread}
                    setSelectedThread={setSelectedThread}
                    rightThreadSelected={rightThreadSelected}
                    setRightThreadSelected={setRightThreadSelected}
                    selectedThreadTweet={selectedThreadTweet}
                    setSelectedThreadTweet={setSelectedThreadTweet}
                    currentThreadTweetMedia={currentThreadTweetMedia}
                    setCurrentThreadTweetMedia={
                      setCurrentThreadTweetMedia
                    }
                  />
                ) : section == 'Giveaway' ? (
                  <GiveawayRight
                    workspaceId={workspaceId}
                    refetchGiveawayDrafts={refetchGiveawayDrafts}
                    setRefetchGiveawayDrafts={
                      setRefetchGiveawayDrafts
                    }
                    selectedGiveaway={selectedGiveaway}
                    setSelectedGiveaway={setSelectedGiveaway}
                    giveawayMedia={giveawayMedia}
                    setGiveawayMedia={setGiveawayMedia}
                    rightGiveawaySelected={rightGiveawaySelected}
                    setRightGiveawaySelected={
                      setRightGiveawaySelected
                    }
                  />
                ) : (
                  <PollRight
                    workspaceId={workspaceId}
                    refetchPollDrafts={refetchPollDrafts}
                    setRefetchPollDrafts={setRefetchPollDrafts}
                    selectedPoll={selectedPoll}
                    setSelectedPoll={setSelectedPoll}
                    pollMedia={pollMedia}
                    setPollMedia={setPollMedia}
                    rightPollSelected={rightPollSelected}
                    setRightPollSelected={setRightPollSelected}
                  />
                )}
              </div>
            </div>
          </main>
        </DashboardLayout>
      </SecureTwitter>
    </PageHead>
  );
}
