import { Dispatch, SetStateAction } from 'react';
import { Giveaway } from './write/Giveaway';
import { Thread } from './write/Thread';
import { Poll } from './write/Poll';
import { Tweet } from './write/Tweet';

interface WriteTweetsProps {
  workspaceId: string;
  userId: string;
  selectedTweet: any;
  setSelectedTweet: Dispatch<SetStateAction<any>>;
  selectedThread: any;
  setSelectedThread: Dispatch<SetStateAction<any>>;
  selectedGiveaway: any;
  setSelectedGiveaway: Dispatch<SetStateAction<any>>;
  selectedPoll: any;
  setSelectedPoll: Dispatch<SetStateAction<any>>;
  refetchDrafts: boolean;
  setRefetchDrafts: Dispatch<SetStateAction<boolean>>;
  refetchThreadDrafts: boolean;
  setRefetchThreadDrafts: Dispatch<SetStateAction<boolean>>;
  refetchGiveawayDrafts: boolean;
  setRefetchGiveawayDrafts: Dispatch<SetStateAction<boolean>>;
  refetchPollDrafts: boolean;
  setRefetchPollDrafts: Dispatch<SetStateAction<boolean>>;
  tweetMedia: any;
  setTweetMedia: Dispatch<SetStateAction<any>>;
  giveawayMedia: any;
  setGiveawayMedia: Dispatch<SetStateAction<any>>;
  pollMedia: any;
  setPollMedia: Dispatch<SetStateAction<any>>;
  section: string;
  setSection: Dispatch<SetStateAction<string>>;
  setRightTweetSelected: Dispatch<SetStateAction<string>>;
  setRightThreadSelected: Dispatch<SetStateAction<string>>;
  setRightGiveawaySelected: Dispatch<SetStateAction<string>>;
  setRightPollSelected: Dispatch<SetStateAction<string>>;
  selectedThreadTweet: any;
  setSelectedThreadTweet: Dispatch<SetStateAction<any>>;
  currentThreadTweetMedia: any;
  setCurrentThreadTweetMedia: Dispatch<SetStateAction<any>>;
  threadTweets: any;
  setThreadTweets: Dispatch<SetStateAction<any>>;
  isPremium: boolean;
}

export function WriteTweets({
  workspaceId,
  selectedTweet,
  setSelectedTweet,
  selectedThread,
  setSelectedThread,
  selectedGiveaway,
  setSelectedGiveaway,
  selectedPoll,
  setSelectedPoll,
  refetchDrafts,
  setRefetchDrafts,
  refetchThreadDrafts,
  setRefetchThreadDrafts,
  refetchGiveawayDrafts,
  setRefetchGiveawayDrafts,
  refetchPollDrafts,
  setRefetchPollDrafts,
  tweetMedia,
  setTweetMedia,
  giveawayMedia,
  setGiveawayMedia,
  pollMedia,
  setPollMedia,
  section,
  setSection,
  setRightTweetSelected,
  setRightThreadSelected,
  setRightPollSelected,
  setRightGiveawaySelected,
  selectedThreadTweet,
  setSelectedThreadTweet,
  currentThreadTweetMedia,
  setCurrentThreadTweetMedia,
  threadTweets,
  setThreadTweets,
  isPremium,
  userId,
}: WriteTweetsProps) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row space-x-1 visible">
        <button
          onClick={() => {
            setSection('Tweet');
          }}
          className={
            'text-xs px-3 py-1 rounded ' +
            (section == 'Tweet'
              ? 'silka-medium bg-gray-100'
              : 'silka-regular text-gray-600 hover:bg-gray-50')
          }
        >
          Tweet
        </button>
        <button
          onClick={() => {
            setSection('Thread');
          }}
          className={
            'text-xs px-3 py-1 rounded ' +
            (section == 'Thread'
              ? 'silka-medium bg-gray-100'
              : 'silka-regular text-gray-600 hover:bg-gray-50')
          }
        >
          Thread
        </button>
        <button
          onClick={() => {
            setSection('Poll');
          }}
          className={
            'text-xs px-3 py-1 rounded ' +
            (section == 'Poll'
              ? 'silka-medium bg-gray-100'
              : 'silka-regular text-gray-600 hover:bg-gray-50')
          }
        >
          Poll
        </button>
      </div>
      {section == 'Tweet' ? (
        <Tweet
          workspaceId={workspaceId}
          selectedTweet={selectedTweet}
          setSelectedTweet={setSelectedTweet}
          refetchDrafts={refetchDrafts}
          setRefetchDrafts={setRefetchDrafts}
          tweetMedia={tweetMedia}
          setTweetMedia={setTweetMedia}
          setRightTweetSelected={setRightTweetSelected}
          isPremium={isPremium}
          userId={userId}
        />
      ) : section == 'Thread' ? (
        <Thread
          workspaceId={workspaceId}
          selectedThread={selectedThread}
          setSelectedThread={setSelectedThread}
          setRightThreadSelected={setRightThreadSelected}
          selectedThreadTweet={selectedThreadTweet}
          setSelectedThreadTweet={setSelectedThreadTweet}
          setRefetchThreadDrafts={setRefetchThreadDrafts}
          currentThreadTweetMedia={currentThreadTweetMedia}
          setCurrentThreadTweetMedia={setCurrentThreadTweetMedia}
          threadTweets={threadTweets}
          setThreadTweets={setThreadTweets}
          isPremium={isPremium}
          userId={userId}
        />
      ) : section == 'Giveaway' ? (
        <Giveaway
          workspaceId={workspaceId}
          setRightGiveawaySelected={setRightGiveawaySelected}
        />
      ) : (
        <Poll
          workspaceId={workspaceId}
          selectedPoll={selectedPoll}
          setSelectedPoll={setSelectedPoll}
          refetchPollDrafts={refetchPollDrafts}
          setRefetchPollDrafts={setRefetchPollDrafts}
          setRightPollSelected={setRightPollSelected}
          isPremium={isPremium}
          userId={userId}
        />
      )}
    </div>
  );
}
