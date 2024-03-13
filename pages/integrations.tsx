import Container from '../components/Container';
import Link from 'next/link';
import { useState } from 'react';

const qa = [
  {
    question: 'How Do Integrations Work?',
    answer:
      "You connect the integration from the Disperse interface and we will call the integration's api using the access token provided to us.",
  },
  {
    question: 'How Secure are the Integrations?',
    answer:
      'The integrations are encrypted multiple times and are stored in a secure database. As soon as you disconnect your integration, all data from that integration will be lost.',
  },
  {
    question: 'Do Integrations Cost Money?',
    answer:
      'No Integrations do not cost money. However, there is a limit to them. There is a limit to one integration of each type to a workspace. If you need more, you must upgrade to another workspace.',
  },
  {
    question: 'Can I Integrate My Own Application?',
    answer:
      'As of right now no. We are taking the security concerns of our customers very seriously. We are working on a way to allow our customers to integrate their own applications with Disperse soon.',
  },
  {
    question: 'Can I Disable an Integration?',
    answer: 'Of course! You can disable an integration at any time.',
  },
];

const automations: any = [
  {
    image: '/images/integrations/slack.png',
    alt: 'Slack Logo Image',
    title: 'Slack',
    description:
      'Once a certain key indicator is hit, Disperse will notify you and your team.',
  },
  {
    image: '/images/integrations/discord.png',
    alt: 'Discord Logo Image',
    title: 'Discord',
    description:
      'Quickly digest and automate your data from Disperse to Discord.',
  },
  {
    image: '/images/integrations/twitch.png',
    alt: 'Twitch Logo Image',
    title: 'Twitch',
    description: 'Notify your fans whenever you go live on Twitch.',
  },
];

const socialAutomations: any = [
  {
    image: '/images/integrations/youtube.png',
    alt: 'YouTube Logo Image',
    title: 'YouTube',
    description:
      'Quickly create and optimize YouTube content to the best performance possible.',
  },
  {
    image: '/images/integrations/facebook.png',
    alt: 'Facebook Logo Image',
    title: 'Facebook',
    description:
      'The largest social platform there is. Reach your specific target audience quickly.',
  },
  {
    image: '/images/integrations/instagram.png',
    alt: 'Instagram Logo Image',
    title: 'Instagram',
    description:
      'Take advantage of other pieces of content from other platforms on Instagram.',
  },
  {
    image: '/images/integrations/twitter.png',
    alt: 'Twitter Logo Image',
    title: 'Twitter',
    description:
      'Automate Twitter content and interactions with other users.',
  },
  {
    image: '/images/integrations/tiktok.png',
    alt: 'TikTok Logo Image',
    title: 'TikTok',
    description:
      'Utilize the largest short form content platform to your advantage with Disperse.',
  },
  {
    image: '/images/integrations/linkedin.png',
    alt: 'Linkedin Logo Image',
    title: 'Linkedin',
    description:
      'Cross post content from other platforms to Linkedin automatically.',
  },
  {
    image: '/images/integrations/pinterest.png',
    alt: 'Pinterest Logo Image',
    title: 'Pinterest',
    description:
      'Upload and post all your content from other platforms to Pinterest.',
  },
];

interface AutomationComponentProps {
  value: any;
}

function QuestionAndAnswer({ value }: AutomationComponentProps) {
  const [open, setOpen] = useState(false);

  return (
    <button
      onClick={() => {
        setOpen(!open);
      }}
      className="flex flex-col w-full"
    >
      <div
        className={
          'px-1 w-full flex flex-row justify-between items-between ' +
          (open ? 'mt-3 mb-2' : 'my-3')
        }
      >
        <p className="text-base silka-medium my-auto text-[#363636]">
          {value.question}
        </p>
        <div
          className={
            'my-auto transition-all ease-in-out delay-100 ' +
            (open ? '' : 'rotate-45')
          }
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
      </div>
      {open && (
        <p className="text-start text-sm text-gray-400 px-1">
          {value.answer}
        </p>
      )}
      <hr className={'w-full ' + (open ? 'mt-3' : '')} />
    </button>
  );
}

function AutomationComponent({ value }: AutomationComponentProps) {
  return (
    <div className="p-2.5 md:p-3 w-full md:w-1/2 xl:w-1/3">
      <div className="p-4 h-full border shadow-sm border-gray-200 rounded-lg flex flex-col">
        <div className="flex flex-row space-x-2">
          <img
            src={value?.image}
            className="w-[26px] h-[26px] rounded-lg my-auto"
            alt={value?.alt}
          />
          <h2 className="text-base silka-semibold text-[#363636] my-auto">
            {value?.title}
          </h2>
        </div>
        <p className="mt-3.5 text-xs silka-regular text-gray-400">
          {value?.description}
        </p>
      </div>
    </div>
  );
}

export default function Integrations() {
  return (
    <Container
      title="Social Media Integrations - Disperse"
      description="Make the most out of your Disperse Experience with Integrations."
    >
      <div className="flex flex-col w-full justify-center items-center">
        <div className="w-[90%] md:w-[80%] lg:w-[70%] xl:w-3/5 2xl:w-1/2 flex flex-col my-12 md:my-16">
          <h1 className="text-4xl silka-bold text-[#363636]">
            Disperse Integrations
            <span className="text-[#FF623D]">.</span>
          </h1>
          <p className="mt-4 silka-regular text-sm text-gray-400">
            Make the most out of your Disperse Experience with
            Integrations.
          </p>
        </div>
        <div className="w-[90%] md:w-[80%] lg:w-[70%] xl:w-3/5 2xl:w-1/2 flex flex-col">
          <h2 className="text-xl md:text-2xl silka-semibold text-[#363636]">
            Social Integrations
          </h2>
          <p className="mt-2 text-[11px] md:text-xs silka-regular text-gray-400">
            The primary integrations that Disperse offers to automate
            your content posting.
          </p>
          <div className="flex flex-row mt-6 flex-wrap">
            {socialAutomations.map(
              (automation: any, index: number) => {
                return (
                  <AutomationComponent
                    value={automation}
                    key={index}
                  />
                );
              }
            )}
          </div>
        </div>
        <div className="w-[90%] md:w-[80%] lg:w-[70%] xl:w-3/5 2xl:w-1/2 mt-16 md:mt-24 flex flex-col">
          <h2 className="text-xl md:text-2xl silka-semibold text-[#363636]">
            Productivity Integrations
          </h2>
          <p className="mt-2 text-[11px] md:text-xs silka-regular text-gray-400">
            Integrations that boost your productivity when using
            Disperse.
          </p>
          <div className="flex flex-row mt-6 flex-wrap">
            {automations.map((automation: any, index: number) => {
              return (
                <AutomationComponent value={automation} key={index} />
              );
            })}
          </div>
        </div>
        <div className="py-16 md:py-24 mt-24 bg-[#FF623D] w-full flex flex-col justify-center items-center">
          <div className="w-[90%] md:w-[80%] lg:w-[70%] xl:w-1/2 flex flex-col justify-center items-center">
            <h2 className="text-3xl md:text-4xl text-center silka-bold text-white">
              Integrate Your Application With Us
            </h2>
            <p className="mt-4 text-xs md:text-sm silka-regular text-center text-gray-200">
              Create your own integration with Disperse and have it a
              part of the directory.
            </p>
            <Link href="/contact" legacyBehavior>
              <button className="mt-8 px-5 py-1.5 bg-white text-[#FF623D] silka-medium text-xs md:text-sm rounded transition-all ease-in-out delay-100 hover:opacity-90">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
        <div className="mt-16 md:mt-32 mb-24 md:mb-40 w-[90%] md:w-3/4 xl:w-1/2 flex flex-col justify-center items-center">
          <h2 className="text-3xl md:text-4xl text-[#363636] silka-bold">
            Questions &amp; answers
            <span className="text-[#FF623D]">.</span>
          </h2>
          <p className="mt-4 silka-regular text-center text-xs md:text-sm text-gray-500">
            If you have more questions{' '}
            <Link
              href="/contact"
              className="underline underline-offset-2 hover:text-gray-800"
            >
              Contact Us
            </Link>
          </p>
          <hr className="mt-12 w-full" />
          <div className="flex flex-col w-full">
            {qa.map((value: any, index: number) => {
              return <QuestionAndAnswer value={value} key={index} />;
            })}
          </div>
        </div>
      </div>
    </Container>
  );
}
