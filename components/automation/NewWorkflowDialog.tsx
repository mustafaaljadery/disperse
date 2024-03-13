import { Transition } from '@headlessui/react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import cx from 'classnames';
import React, {
  Fragment,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../utils/apiUrl';
import { SidebarComponent } from './SidebarComponent';
import { DiscordWorkflowDialog } from './dialogs/DiscordWorkflowDialog';
import { YoutubeWorkflowDialog } from './dialogs/YoutubeWorkflowDialog';
import { SlackWorkflowDialog } from './dialogs/SlackWorkflowDialog';
import { InstagramWorkflowDialog } from './dialogs/InstagramWorkflowDialog';
import { TwitterWorkflowDialog } from './dialogs/TwitterWorkflowDialog';
import { TiktokWorkflowDialog } from './dialogs/TiktokWorkflowDialog';
import { LinkedinWorkflowDialog } from './dialogs/LinkedinWorkflowDialog';
import { FacebookWorkflowDialog } from './dialogs/FacebookWorkflowDialog';
import { TwitchWorkflowDialog } from './dialogs/TwitchWorkflowDialog';
import { PinterestWorkflowDialog } from './dialogs/PinterestWorkflowDialog';

interface NewWorkflowDialogProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  workspaceId: string;
  userId: string;
  setRefetchActiveWorkflows: Dispatch<SetStateAction<boolean>>;
  setRefetchInactiveWorkflows: Dispatch<SetStateAction<boolean>>;
  setUpgradeOpen: Dispatch<SetStateAction<boolean>>;
  plan: string;
}

async function getPlan(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(`${apiUrl()}workspace/read/plan`, {
      params: {
        workspaceId: workspaceId,
      },
    });
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

const sidebarViews = [
  { image: '/images/automation/discord.svg', name: 'Discord' },
  { image: '/images/automation/slack.svg', name: 'Slack' },
  //  { image: '/images/automation/twitter.svg', name: 'Twitter' },
  { image: '/images/automation/youtube.svg', name: 'Youtube' },
  { image: '/images/automation/linkedin.svg', name: 'Linkedin' },
  { image: '/images/automation/tiktok.svg', name: 'Tiktok' },
  { image: '/images/automation/facebook.svg', name: 'Facebook' },
  { image: '/images/automation/instagram.svg', name: 'Instagram' },
  { image: '/images/automation/twitch.svg', name: 'Twitch' },
  { image: '/images/automation/pinterest.svg', name: 'Pinterest' },
];

export function NewWorkflowDialog({
  isOpen,
  setIsOpen,
  workspaceId,
  userId,
  setRefetchActiveWorkflows,
  setRefetchInactiveWorkflows,
  setUpgradeOpen,
  plan,
}: NewWorkflowDialogProps) {
  const [sidebarSelect, setSidebarSelect] = useState('Discord');

  return (
    <Transition.Root show={isOpen}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <DialogPrimitive.Overlay
          forceMount
          className="fixed inset-0 z-20 bg-black/50"
        />
      </Transition.Child>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <DialogPrimitive.Content
          forceMount
          className={cx(
            'fixed z-50',
            'w-[98vw] md:w-[90vw] lg:w-[80vw] xl:w-[70vw] 2xl:w-[60vw] max-h-[80vh] overflow-auto h-fit rounded py-5 px-3',
            'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
            'bg-white',
            'focus:outline-none focus-visible:ring-0'
          )}
        >
          <div className="w-full flex flex-col">
            <div className="flex flex-col space-y-1.5">
              <h3 className="text-base md:text-xl silka-semibold text-gray-800">
                {sidebarSelect} Workflows
              </h3>
              <p className="text-[11px] md:text-sm silka-regular text-gray-400">
                Automate your {sidebarSelect} interactions using
                Disperse.
              </p>
            </div>
            <div className="flex flex-row space-x-5">
              <div className="w-1/5 flex flex-col space-y-1 mt-5">
                {sidebarViews.map((value: any, index: number) => {
                  return (
                    <SidebarComponent
                      key={index}
                      image={value.image}
                      name={value.name}
                      sidebarSelect={sidebarSelect}
                      setSidebarSelect={setSidebarSelect}
                    />
                  );
                })}
              </div>
              <div className="w-4/5 mt-3">
                {sidebarSelect == 'Discord' ? (
                  <DiscordWorkflowDialog
                    workspaceId={workspaceId}
                    setIsOpen={setIsOpen}
                    setUpgradeOpen={setUpgradeOpen}
                    plan={plan}
                    setRefetchActiveWorkflows={
                      setRefetchActiveWorkflows
                    }
                    setRefetchInactiveWorkflows={
                      setRefetchInactiveWorkflows
                    }
                  />
                ) : sidebarSelect == 'Youtube' ? (
                  <YoutubeWorkflowDialog
                    workspaceId={workspaceId}
                    setIsOpen={setIsOpen}
                    setRefetchActiveWorkflows={
                      setRefetchActiveWorkflows
                    }
                    setRefetchInactiveWorkflows={
                      setRefetchInactiveWorkflows
                    }
                    setUpgradeOpen={setUpgradeOpen}
                    plan={plan}
                  />
                ) : sidebarSelect == 'Slack' ? (
                  <SlackWorkflowDialog
                    workspaceId={workspaceId}
                    setIsOpen={setIsOpen}
                    setRefetchActiveWorkflows={
                      setRefetchActiveWorkflows
                    }
                    setRefetchInactiveWorkflows={
                      setRefetchInactiveWorkflows
                    }
                    setUpgradeOpen={setUpgradeOpen}
                    plan={plan}
                  />
                ) : sidebarSelect == 'Instagram' ? (
                  <InstagramWorkflowDialog
                    workspaceId={workspaceId}
                    setIsOpen={setIsOpen}
                    setRefetchActiveWorkflows={
                      setRefetchActiveWorkflows
                    }
                    setRefetchInactiveWorkflows={
                      setRefetchInactiveWorkflows
                    }
                    setUpgradeOpen={setUpgradeOpen}
                    plan={plan}
                  />
                ) : sidebarSelect == 'Facebook' ? (
                  <FacebookWorkflowDialog
                    workspaceId={workspaceId}
                    setIsOpen={setIsOpen}
                    setRefetchActiveWorkflows={
                      setRefetchActiveWorkflows
                    }
                    setRefetchInactiveWorkflows={
                      setRefetchInactiveWorkflows
                    }
                    setUpgradeOpen={setUpgradeOpen}
                    plan={plan}
                  />
                ) : sidebarSelect == 'Linkedin' ? (
                  <LinkedinWorkflowDialog
                    workspaceId={workspaceId}
                    setIsOpen={setIsOpen}
                    setRefetchActiveWorkflows={
                      setRefetchActiveWorkflows
                    }
                    setRefetchInactiveWorkflows={
                      setRefetchInactiveWorkflows
                    }
                    setUpgradeOpen={setUpgradeOpen}
                    plan={plan}
                  />
                ) : sidebarSelect == 'Tiktok' ? (
                  <TiktokWorkflowDialog
                    workspaceId={workspaceId}
                    setIsOpen={setIsOpen}
                    setRefetchActiveWorkflows={
                      setRefetchActiveWorkflows
                    }
                    setRefetchInactiveWorkflows={
                      setRefetchInactiveWorkflows
                    }
                    setUpgradeOpen={setUpgradeOpen}
                    plan={plan}
                  />
                ) : sidebarSelect == 'Twitter' ? (
                  <TwitterWorkflowDialog
                    workspaceId={workspaceId}
                    setIsOpen={setIsOpen}
                    setRefetchActiveWorkflows={
                      setRefetchActiveWorkflows
                    }
                    setRefetchInactiveWorkflows={
                      setRefetchInactiveWorkflows
                    }
                    setUpgradeOpen={setUpgradeOpen}
                    plan={plan}
                  />
                ) : sidebarSelect == 'Twitch' ? (
                  <TwitchWorkflowDialog
                    workspaceId={workspaceId}
                    setIsOpen={setIsOpen}
                    setRefetchActiveWorkflows={
                      setRefetchActiveWorkflows
                    }
                    setRefetchInactiveWorkflows={
                      setRefetchInactiveWorkflows
                    }
                    setUpgradeOpen={setUpgradeOpen}
                    plan={plan}
                  />
                ) : sidebarSelect == 'Pinterest' ? (
                  <PinterestWorkflowDialog
                    workspaceId={workspaceId}
                    setIsOpen={setIsOpen}
                    setRefetchActiveWorkflows={
                      setRefetchActiveWorkflows
                    }
                    setRefetchInactiveWorkflows={
                      setRefetchInactiveWorkflows
                    }
                    setUpgradeOpen={setUpgradeOpen}
                    plan={plan}
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </DialogPrimitive.Content>
      </Transition.Child>
    </Transition.Root>
  );
}
