import React, { useCallback, useState, useEffect } from 'react';
import ReactFlow, { Background, Controls } from 'reactflow';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { useRouter } from 'next/router';
import DiscordFirstNode from '../../../components/workflow/applications/DiscordFirstNode';
import DiscordSecondNode from '../../../components/workflow/applications/DiscordSecondNode';
import DisperseFirstNode from '../../../components/workflow/applications/DisperseFirstNode';
import DisperseSecondNode from '../../../components/workflow/applications/DisperseSecondNode';
import FacebookFirstNode from '../../../components/workflow/applications/FacebookFirstNode';
import FacebookSecondNode from '../../../components/workflow/applications/FacebookSecondNode';
import InstagramFirstNode from '../../../components/workflow/applications/InstagramFirstNode';
import InstagramSecondNode from '../../../components/workflow/applications/InstagramSecondNode';
import LinkedinFirstNode from '../../../components/workflow/applications/LinkedinFirstNode';
import LinkedinSecondNode from '../../../components/workflow/applications/LinkedinSecondNode';
import SlackFirstNode from '../../../components/workflow/applications/SlackFirstNode';
import SlackSecondNode from '../../../components/workflow/applications/SlackSecondNode';
import TiktokFirstNode from '../../../components/workflow/applications/TiktokFirstNode';
import TiktokSecondNode from '../../../components/workflow/applications/TiktokSecondNode';
import TwitterFirstNode from '../../../components/workflow/applications/TwitterFirstNode';
import TwitterSecondNode from '../../../components/workflow/applications/TwitterSecondNode';
import TwitchFirstNode from '../../../components/workflow/applications/TwitchFirstNode';
import PinterestSecondNode from '../../../components/workflow/applications/PinterestSecondNode';
import YoutubeFirstNode from '../../../components/workflow/applications/YoutubeFirstNode';
import YoutubeSecondNode from '../../../components/workflow/applications/YoutubeSecondNode';
import 'reactflow/dist/style.css';
import { LoadingScreen } from '../../../components/Loading';
import { apiUrl } from '../../../utils/apiUrl';
import WorkflowHeader from '../../../components/workflow/WorkflowHeader';
import FacebookFirstLeftBar from '../../../components/workflow/leftbar/firstnode/Facebook';
import DisperseFirstLeftBar from '../../../components/workflow/leftbar/firstnode/Disperse';
import InstagramFirstLeftBar from '../../../components/workflow/leftbar/firstnode/Instagram';
import LinkedinFirstLeftBar from '../../../components/workflow/leftbar/firstnode/Linkedin';
import SlackFirstLeftbar from '../../../components/workflow/leftbar/firstnode/Slack';
import TiktokFirstLeftBar from '../../../components/workflow/leftbar/firstnode/Tiktok';
import TwitterFirstLeftBar from '../../../components/workflow/leftbar/firstnode/Twitter';
import YoutubeFirstLeftBar from '../../../components/workflow/leftbar/firstnode/Youtube';
import DiscordFirstLeftBar from '../../../components/workflow/leftbar/firstnode/Discord';
import DiscordSecondLeftBar from '../../../components/workflow/leftbar/secondnode/Discord';
import DisperseSecondLeftBar from '../../../components/workflow/leftbar/secondnode/Disperse';
import FacebookSecondLeftBar from '../../../components/workflow/leftbar/secondnode/Facebook';
import InstagramSecondLeftBar from '../../../components/workflow/leftbar/secondnode/Instagram';
import LinkedinSecondLeftBar from '../../../components/workflow/leftbar/secondnode/Linkedin';
import SlackSecondLeftBar from '../../../components/workflow/leftbar/secondnode/Slack';
import TiktokSecondLeftBar from '../../../components/workflow/leftbar/secondnode/Tiktok';
import TwitterSecondLeftBar from '../../../components/workflow/leftbar/secondnode/Twitter';
import YoutubeSecondLeftBar from '../../../components/workflow/leftbar/secondnode/Youtube';
import { PageHead } from '../../../layouts/PageHead';
import PinterestSecondLeftBar from '../../../components/workflow/leftbar/secondnode/Pinterest';
import { TwitchFirstLeftBar } from '../../../components/workflow/leftbar/firstnode/Twitch';

async function getWorkflow(workflowId: string, automationId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}automation/read/workflow`,
      {
        params: {
          workflowId: workflowId,
          automationId: automationId,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

const nodeTypes = {
  discordFirstNode: DiscordFirstNode,
  discordSecondNode: DiscordSecondNode,
  disperseFirstNode: DisperseFirstNode,
  disperseSecondNode: DisperseSecondNode,
  facebookFirstNode: FacebookFirstNode,
  facebookSecondNode: FacebookSecondNode,
  instagramFirstNode: InstagramFirstNode,
  instagramSecondNode: InstagramSecondNode,
  linkedinFirstNode: LinkedinFirstNode,
  linkedinSecondNode: LinkedinSecondNode,
  slackFirstNode: SlackFirstNode,
  slackSecondNode: SlackSecondNode,
  tiktokFirstNode: TiktokFirstNode,
  tiktokSecondNode: TiktokSecondNode,
  twitterFirstNode: TwitterFirstNode,
  twitterSecondNode: TwitterSecondNode,
  youtubeFirstNode: YoutubeFirstNode,
  youtubeSecondNode: YoutubeSecondNode,
  twitchFirstNode: TwitchFirstNode,
  pinterestSecondNode: PinterestSecondNode,
};

const initialEdges = [
  { id: '1-2', source: '1', target: '2', animated: true },
];

let defaultViewport = { x: 0, y: 0, zoom: 12 };

const Workflow = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [workflowData, setWorkflowData] = useState<any>(null);
  const [workspaceId, setWorkspaceId] = useState<any>(null);

  const [leftState, setLeftState] = useState<any>(null);

  // Errors
  const [firstErrors, setFirstErrors] = useState(0);
  const [secondErrors, setSecondErrors] = useState(0);
  const [totalErrors, setTotalErrors] = useState(0);

  const [firstApplication, setFirstApplication] = useState<any>(null);
  const [firstDescription, setFirstDescription] = useState<any>(null);
  const [secondApplication, setSecondApplication] =
    useState<any>(null);
  const [secondDescription, setSecondDescription] =
    useState<any>(null);

  const initialNodes = [
    {
      id: '1', // required
      type: firstApplication,
      position: { x: 0, y: 0 }, // required
      data: {
        description: firstDescription,
        leftState: leftState,
        setLeftState: setLeftState,
      },
    },
    {
      id: '2', // required
      type: secondApplication,
      data: {
        description: secondDescription,
        leftState: leftState,
        setLeftState: setLeftState,
      },
      position: { x: 400, y: 0 }, // required
    },
  ];

  const [nodes, setNodes] = useState(initialNodes);

  useEffect(() => {
    setTotalErrors(firstErrors + secondErrors);
  }, [firstErrors, secondErrors]);

  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      getWorkflow(
        String(router.query.workflowid),
        String(router.query.automationId)
      ).then((value) => {
        setWorkflowData(value);
        setWorkspaceId(value.workspaceId);
        setNodes(initialNodes);
        defaultViewport = { x: 0, y: 0, zoom: 1 };

        switch (value.first_automation) {
          case 'Facebook':
            setFirstApplication('facebookFirstNode');
            setLeftState('facebookFirstNode');
            break;
          case 'Discord':
            setFirstApplication('discordFirstNode');
            setLeftState('discordFirstNode');
            break;
          case 'Disperse':
            setFirstApplication('disperseFirstNode');
            setLeftState('disperseFirstNode');
            break;
          case 'Slack':
            setFirstApplication('slackFirstNode');
            setLeftState('slackFirstNode');
            break;
          case 'Instagram':
            setFirstApplication('instagramFirstNode');
            setLeftState('instagramFirstNode');
            break;
          case 'Youtube':
            setFirstApplication('youtubeFirstNode');
            setLeftState('youtubeFirstNode');
            break;
          case 'Tiktok':
            setFirstApplication('tiktokFirstNode');
            setLeftState('tiktokFirstNode');
            break;
          case 'Linkedin':
            setFirstApplication('linkedinFirstNode');
            setLeftState('linkedinFirstNode');
            break;
          case 'Twitter':
            setFirstApplication('twitterFirstNode');
            setLeftState('twitterFirstNode');
            break;
          case 'Twitch':
            setFirstApplication('twitchFirstNode');
            setLeftState('twitchFirstNode');
            break;
          default:
            break;
        }

        switch (value.second_automation) {
          case 'Facebook':
            setSecondApplication('facebookSecondNode');
            break;
          case 'Discord':
            setSecondApplication('discordSecondNode');
            break;
          case 'Disperse':
            setSecondApplication('disperseSecondNode');
            break;
          case 'Slack':
            setSecondApplication('slackSecondNode');
            break;
          case 'Instagram':
            setSecondApplication('instagramSecondNode');
            break;
          case 'Youtube':
            setSecondApplication('youtubeSecondNode');
            break;
          case 'Tiktok':
            setSecondApplication('tiktokSecondNode');
            break;
          case 'Linkedin':
            setSecondApplication('linkedinSecondNode');
            break;
          case 'Twitter':
            setSecondApplication('twitterSecondNode');
            break;
          case 'Pinterest':
            setSecondApplication('pinterestSecondNode');
            break;
          default:
            break;
        }

        setFirstDescription(value.first_description);
        setSecondDescription(value.second_description);
        setIsLoading(false);
      });
    }
  }, [router.isReady]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const proOptions = { hideAttribution: true };

  return (
    <PageHead title="Workflow · Disperse">
      <div className="h-[100vh] w-full flex flex-col">
        <WorkflowHeader
          workflowData={workflowData}
          workspaceId={workspaceId}
          leftState={leftState}
          setLeftState={setLeftState}
          totalErrors={totalErrors}
        />
        <hr className="w-full" />
        <div className="h-full flex flex-row">
          <div className="w-[100vw] md:w-[60vw] lg:w-[40vw] xl:w-[30vw] 2xl:w-[24vw] bg-white px-4 py-6">
            {workflowData?.first_automation == 'Discord' && (
              <DiscordFirstLeftBar
                workflowData={workflowData}
                firstErrors={firstErrors}
                setFirstErrors={setFirstErrors}
                leftState={leftState}
              />
            )}
            {workflowData?.first_automation == 'Disperse' && (
              <DisperseFirstLeftBar
                workflowData={workflowData}
                firstErrors={firstErrors}
                setFirstErrors={setFirstErrors}
                leftState={leftState}
              />
            )}
            {workflowData?.first_automation == 'Facebook' && (
              <FacebookFirstLeftBar
                workflowData={workflowData}
                firstErrors={firstErrors}
                setFirstErrors={setFirstErrors}
                leftState={leftState}
              />
            )}
            {workflowData?.first_automation == 'Instagram' && (
              <InstagramFirstLeftBar
                workflowData={workflowData}
                firstErrors={firstErrors}
                setFirstErrors={setFirstErrors}
                leftState={leftState}
              />
            )}
            {workflowData?.first_automation == 'Linkedin' && (
              <LinkedinFirstLeftBar
                workflowData={workflowData}
                firstErrors={firstErrors}
                setFirstErrors={setFirstErrors}
                leftState={leftState}
              />
            )}
            {workflowData?.first_automation == 'Slack' && (
              <SlackFirstLeftbar
                workflowData={workflowData}
                firstErrors={firstErrors}
                setFirstErrors={setFirstErrors}
                leftState={leftState}
              />
            )}
            {workflowData?.first_automation == 'Tiktok' && (
              <TiktokFirstLeftBar
                workflowData={workflowData}
                firstErrors={firstErrors}
                setFirstErrors={setFirstErrors}
                leftState={leftState}
              />
            )}
            {workflowData?.first_automation == 'Twitter' && (
              <TwitterFirstLeftBar
                workflowData={workflowData}
                firstErrors={firstErrors}
                setFirstErrors={setFirstErrors}
                leftState={leftState}
              />
            )}
            {workflowData?.first_automation == 'Youtube' && (
              <YoutubeFirstLeftBar
                workflowData={workflowData}
                firstErrors={firstErrors}
                setFirstErrors={setFirstErrors}
                leftState={leftState}
              />
            )}
            {workflowData?.second_automation == 'Discord' && (
              <DiscordSecondLeftBar
                workflowData={workflowData}
                secondErrors={secondErrors}
                setSecondErrors={setSecondErrors}
                leftState={leftState}
              />
            )}
            {workflowData?.second_automation == 'Disperse' && (
              <DisperseSecondLeftBar
                workflowData={workflowData}
                secondErrors={secondErrors}
                setSecondErrors={setSecondErrors}
                leftState={leftState}
              />
            )}
            {workflowData?.second_automation == 'Facebook' && (
              <FacebookSecondLeftBar
                workflowData={workflowData}
                secondErrors={secondErrors}
                setSecondErrors={setSecondErrors}
                leftState={leftState}
              />
            )}
            {workflowData?.second_automation == 'Instagram' && (
              <InstagramSecondLeftBar
                workflowData={workflowData}
                secondErrors={secondErrors}
                setSecondErrors={setSecondErrors}
                leftState={leftState}
              />
            )}
            {workflowData?.second_automation == 'Linkedin' && (
              <LinkedinSecondLeftBar
                workflowData={workflowData}
                secondErrors={secondErrors}
                setSecondErrors={setSecondErrors}
                leftState={leftState}
              />
            )}
            {workflowData?.second_automation == 'Slack' && (
              <SlackSecondLeftBar
                workflowData={workflowData}
                secondErrors={secondErrors}
                setSecondErrors={setSecondErrors}
                leftState={leftState}
              />
            )}
            {workflowData?.second_automation == 'Tiktok' && (
              <TiktokSecondLeftBar
                workflowData={workflowData}
                secondErrors={secondErrors}
                setSecondErrors={setSecondErrors}
                leftState={leftState}
              />
            )}
            {workflowData?.second_automation == 'Twitter' && (
              <TwitterSecondLeftBar
                workflowData={workflowData}
                secondErrors={secondErrors}
                setSecondErrors={setSecondErrors}
                leftState={leftState}
              />
            )}
            {workflowData?.second_automation == 'Youtube' && (
              <YoutubeSecondLeftBar
                workflowData={workflowData}
                secondErrors={secondErrors}
                setSecondErrors={setSecondErrors}
                leftState={leftState}
              />
            )}
            {workflowData?.first_automation == 'Twitch' && (
              <TwitchFirstLeftBar
                workflowData={workflowData}
                firstErrors={firstErrors}
                setFirstErrors={setFirstErrors}
                leftState={leftState}
              />
            )}
            {workflowData?.second_automation == 'Pinterest' && (
              <PinterestSecondLeftBar
                workflowData={workflowData}
                secondErrors={secondErrors}
                setSecondErrors={setSecondErrors}
                leftState={leftState}
              />
            )}
          </div>
          <ReactFlow
            nodes={initialNodes}
            edges={initialEdges}
            nodeTypes={nodeTypes}
            fitView
            defaultViewport={defaultViewport}
            proOptions={proOptions}
            className="bg-gray-50"
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
      </div>
    </PageHead>
  );
};

export default Workflow;
