import { useState, useEffect } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ScheduleGiveawayDialog } from '../../Dialog/ScheduleGiveawayDialog';
import { TweetGiveawayNowDialog } from '../../Dialog/TweetGiveawayNowDialog';

export function GiveawayOptions() {
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [scheduleGiveawayOpen, setScheduleGiveawayOpen] =
    useState(false);
  const [tweetNowOpen, setTweetNowOpen] = useState(false);

  return (
    <div className="flex flex-col mt-6">
      <button></button>
      <div className="flex flex-row justify-center mt-6 items-center space-x-5">
        <div>
          <DialogPrimitive.Root
            open={tweetNowOpen}
            onOpenChange={setTweetNowOpen}
          >
            <DialogPrimitive.Trigger asChild>
              <button className="text-xs hover:opacity-90 text-white bg-[#FF623D] silka-medium px-4 py-1.5 border rounded">
                Tweet Now
              </button>
            </DialogPrimitive.Trigger>
            <TweetGiveawayNowDialog isOpen={tweetNowOpen} />
          </DialogPrimitive.Root>
        </div>
        <div>
          <DialogPrimitive.Root
            open={scheduleGiveawayOpen}
            onOpenChange={setScheduleGiveawayOpen}
          >
            <DialogPrimitive.Trigger asChild>
              <button className="text-xs hover:opacity-90 text-white bg-[#363636] silka-medium px-4 py-1.5 border rounded">
                Schedule Giveaway
              </button>
            </DialogPrimitive.Trigger>
            <ScheduleGiveawayDialog isOpen={scheduleGiveawayOpen} />
          </DialogPrimitive.Root>
        </div>
      </div>
    </div>
  );
}
