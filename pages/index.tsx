import Container from '../components/Container';
import Link from 'next/link';
import { useState, useEffect, Fragment, useRef } from 'react';
import { Transition } from '@headlessui/react';
import { clsx } from 'clsx';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import Router from 'next/router';
import Image from 'next/image';
//images
import Homepage from '../public/images/edit/homepage.png';
import AxelImage from '../public/images/axel-logo.png';
import SheinLogo from '../public/images/shien-logo.png';
import UscLogo from '../public/images/usc-logo.png';
import UfcLogo from '../public/images/ufc-logo.png';
import LvmhLogo from '../public/images/lvmh-logo.png';
import FiveStars from '../public/images/5-star.png';
import FourStars from '../public/images/45-stars.png';
import AutomationImage from '../public/images/automation-image.png';
import { usePostHog } from 'posthog-js/react';
import { useSession } from 'next-auth/react';

import Clip1 from '../public/images/edit/clip1.png';
import Clip2 from '../public/images/edit/clip2.png';
import Clip3 from '../public/images/edit/clip3.png';
import Clip4 from '../public/images/edit/clip4.png';

interface WorkflowComponetProps {
  index: number;
  value: any;
}

const clipImages = [
  {
    value: Clip1,
    alt: 'Image of 2 people speaking clip.',
  },
  {
    value: Clip2,
    alt: 'Image of subtitles clip.',
  },
  {
    value: Clip3,
    alt: 'Image of a podcast clip.',
  },
  {
    value: Clip4,
    alt: 'Image of an informational clip.',
  },
];

const reviews = [
  {
    stars: 5,
    quote: 'Amazing product, saves my team so much time.',
    name: 'Adam A.',
  },
  {
    stars: 4.5,
    quote:
      'The best tool to grow your organic following. Allows me to focus on creating content and not manually post on each platform.',
    name: 'Phillip B.',
  },
  {
    stars: 5,
    quote:
      'We use Disperse in conjunction with paid ads. Disperse gets us organic viewers and we retarget them with paid ads.',
    name: 'Sana J',
  },
  {
    stars: 5,
    quote:
      'I have tried many content automation tools and I can firmly say Disperse is the best.',
    name: 'Maxime W.',
  },
  {
    stars: 5,
    quote:
      'I was mindblown when I knew a product like Disperse existed.',
    name: 'Annabelle J.',
  },
  {
    stars: 5,
    quote: 'Fits my content posting workflow perfectly.',
    name: 'Nick S.',
  },
];

const automationFeatures = [
  {
    feature: 'Automatically create clips from a long video.',
  },
  {
    feature: 'Transcribe and add captions to your videos.',
  },
  {
    feature: 'AI tools to correct speech.',
  },
  {
    feature: 'Enhance color schemes on edits.',
  },
  {
    feature: 'Background removal on images and videos.',
  },
  {
    feature: 'Select from a library of stock content and templates.',
  },
];

const guarantees = [
  {
    icon: '/images/money-back.png',
    alt: 'Money Back Image',
    title: '60 Day Money Back',
    description:
      'If your social media does not grow, we do not profit. We will refund you 100% of your money.',
  },
  {
    icon: '/images/personal-success.png',
    alt: 'Personal Success Image',
    title: 'Personal Success Manager',
    description:
      'Free personal onboarding to get you started and ensure your success.',
  },
  {
    icon: '/images/support.png',
    alt: 'Support Image',
    title: '24/7 Customer Support',
    description:
      'We are here to help you with any questions or problems all day, every day.',
  },
  {
    icon: '/images/free.png',
    alt: 'Free Image',
    title: 'Free Forever',
    description:
      'You can always try Disperse for free without any commitment or credit card, forever.',
  },
];

const automationWorkflows = [
  {
    firstImage: '/images/automation/tiktok.svg',
    firstImageAlt: 'TikTok Logo Image',
    secondImage: '/images/automation/youtube-shorts.svg',
    secondImageAlt: 'Youtube Shorts Logo Image',
    name: 'TikTok Video to Youtube Shorts',
    description:
      'Automatically repurpose a TikTok video to Youtube shorts without the Watermark.',
    tag: 'Social',
  },
  {
    firstImage: '/icons/disperse.png',
    firstImageAlt: 'Disperse Logo Image',
    secondImage: '/images/automation/discord.svg',
    secondImageAlt: 'Discord Logo Image',
    name: 'Daily Analytics to Discord',
    description:
      'Receive a Discord message in a specified channel with your daily analytics.',
    tag: 'Analytics',
  },
  {
    firstImage: '/images/automation/youtube-shorts.svg',
    firstImageAlt: 'Youtube Shorts Logo Image',
    secondImage: '/images/automation/pinterest.svg',
    secondImageAlt: 'Pinterest Logo Image',
    name: 'YouTube Shorts to Pinterest',
    description:
      'Automatically repurpose a YouTube short to Pinterest.',
    tag: 'Social',
  },
  {
    firstImage: '/images/automation/twitch.svg',
    firstImageAlt: '',
    secondImage: '/images/automation/slack.svg',
    secondImageAlt: '',
    name: 'Twitch Stream to Slack',
    description:
      'Notify a Slack channel whenever you go live on Twitch.',
    tag: 'Stream',
  },
  {
    firstImage: '/images/automation/tiktok.svg',
    firstImageAlt: 'TikTok Logo Image',
    secondImage: '/images/automation/instagram-reels.svg',
    secondImageAlt: 'Instagram Reels Logo Image',
    name: 'TikTok Video to Instagram Reel',
    description:
      'Automatically post a TikTok video to Instagram Reels without the watermark.',
    tag: 'Social',
  },
  {
    firstImage: '/images/automation/facebook.svg',
    firstImageAlt: 'Facebook Logo Image',
    secondImage: '/images/automation/twitter.svg',
    secondImageAlt: 'Twitter Logo Image',
    name: 'Facebook Post to Twitter',
    description: 'Repurpose your Facebook post to Twitter.',
    tag: 'Social',
  },
  {
    firstImage: '/icons/disperse.png',
    firstImageAlt: 'Disperse Logo Image',
    secondImage: '/images/automation/slack.svg',
    secondImageAlt: 'Slack Logo Image',
    name: 'Daily Analytics to Slack',
    description: 'Receive a Slack message with your daily analytics.',
    tag: 'Analytics',
  },
  {
    firstImage: '/images/automation/youtube-shorts.svg',
    firstImageAlt: 'Youtube Shorts Logo Image',
    secondImage: '/images/automation/linkedin.svg',
    secondImageAlt: 'Linkedin Logo Image',
    name: 'YouTube Short to Linkedin',
    description:
      'Automatically repurpose a YouTube Short to Linkedin.',
    tag: 'Social',
  },
  {
    firstImage: '/images/automation/instagram.svg',
    firstImageAlt: 'Instagram Logo Image',
    secondImage: '/images/automation/discord.svg',
    secondImageAlt: 'Discord Logo Image',
    name: 'Send Instagram Post to Discord',
    description:
      'Automatically notify your Discord fans whenever you post an Instagram post.',
    tag: 'Social',
  },
  {
    firstImage: '/images/automation/tiktok.svg',
    firstImageAlt: 'TikTok Logo Image',
    secondImage: '/images/automation/pinterest.svg',
    secondImageAlt: 'Pinterest Logo Image',
    name: 'TikTok Video to Pinterest',
    description:
      'Automatically repurpose your TikTok video to Pinterest.',
    tag: 'Social',
  },
  {
    firstImage: '/images/automation/linkedin.svg',
    firstImageAlt: 'Linkedin Logo Image',
    secondImage: '/images/automation/twitter.svg',
    secondImageAlt: 'Twitter Logo Image',
    name: 'Linkedin Post to Twitter',
    description:
      'Automatically repurpose your Linkedin post to Twitter.',
    tag: 'Social',
  },
  {
    firstImage: '/images/automation/twitch.svg',
    firstImageAlt: 'Twitch Logo Image',
    secondImage: '/images/automation/facebook.svg',
    secondImageAlt: 'Facebook Logo Image',
    name: 'Twitch Stream to Facebook',
    description:
      'Notify your fans on Facebook whenever you go live on Twitch.',
    tag: 'Stream',
  },
];

function WorkflowComponent({ index, value }: WorkflowComponetProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div key={index} className="p-3 2xl:p-4 w-full md:w-1/3 xl:w-1/5">
      <div
        onMouseEnter={() => {
          setHovered(true);
        }}
        onMouseLeave={() => {
          setHovered(false);
        }}
        className="border p-4 rounded-xl h-[210px] md:h-[240px] flex flex-col justify-between items-between"
      >
        {hovered ? (
          <>
            <div className="flex flex-col">
              <p className="silka-semibold text-lg xl:text-xl text-[#363636]">
                {value.name}
              </p>
              <span className="mt-3 silka-regular text-gray-400 text-xs">
                {value.description}
              </span>
            </div>
            <div className="flex flex-row w-full justify-end items-end">
              <Link href="/signup" legacyBehavior>
                <button className="bg-[#FF623D] px-4 py-1.5 rounded text-xs silka-medium text-white transition-all ease-in-out delay-100 hover:px-3 hover:py-1">
                  Use Automation
                </button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col">
              <div className="flex flex-row space-x-3">
                <div className="p-2 rounded-full border">
                  <Image
                    src={value?.firstImage}
                    alt={value?.firstImageAlt}
                    height={22}
                    width={22}
                  />
                </div>
                <div className="p-2 rounded-full border">
                  <Image
                    src={value?.secondImage}
                    alt={value?.secondImageAlt}
                    height={22}
                    width={22}
                  />
                </div>
              </div>
              <h4 className="mt-4 silka-semibold text-lg xl:text-xl text-[#363636]">
                {value?.name}
              </h4>
              <p className="mt-3 silka-regular text-gray-400 text-xs">
                {value?.description}
              </p>
            </div>
            <span className="text-[10px] bg-[#F6E7E3] w-fit px-3 py-1 rounded silka-semibold text-[#FF623D] silka-semibold">
              {value?.tag?.toUpperCase()}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [automationWorkflowInterval, setAutomationWorkflowInterval] =
    useState(0);
  const [isMd, setIsMd] = useState(false);
  const [isXl, setIsXl] = useState(false);
  const posthog = usePostHog();
  const [demoHovered, setDemoHovered] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [demoOpen, setDemoOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (demoOpen) {
      setTimeout(() => {
        videoRef?.current?.play();
      }, 600);
    } else if (!demoOpen) {
      videoRef?.current?.pause();
    }
  }, [demoOpen, videoRef.current]);

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status == 'authenticated') {
      Router.push('/dashboard');
    }
  }, [status]);

  useEffect(() => {
    setTimeout(() => {
      //setDialogOpen(true);
    }, 10000);
    if (window.innerWidth >= 768) {
      setIsMd(true);
    }
    if (window.innerWidth >= 1280) {
      setIsXl(true);
    }
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) {
        setIsMd(true);
      }
      if (window.innerWidth >= 1280) {
        setIsXl(true);
      }
    });
  }, []);

  return (
    <Container
      title="Disperse - Create & Manage Social Media Content"
      description="Disperse is a social media automation tool that helps you create and distribute content everywhere."
    >
      <div className="flex flex-col w-full justify-center items-center">
        <div className="flex mt-8 md:mt-10 w-[95%] xl:mt-12 mb-16 md:mb-24 flex-col-reverse justify-center items-center lg:justify-start lg:items-start md:flex-row md:space-x-12 xl:space-x-24">
          <div className="w-[90%] md:w-1/2 mt-10 md:my-auto flex flex-col relative justify-start items-start">
            <div className="border my-auto rounded-lg">
              <Image
                src={Homepage}
                className={
                  'max-h-[750px] min-h-[200px] w-fit rounded-lg ' +
                  (imageLoading ? 'blur-2xl' : '')
                }
                alt="Image of the Disperse Dashboard"
                onLoadingComplete={() => setImageLoading(false)}
              />
            </div>
            <DialogPrimitive.Root
              open={demoOpen}
              onOpenChange={setDemoOpen}
            >
              <DialogPrimitive.Trigger asChild>
                <button
                  onMouseEnter={() => {
                    setDemoHovered(true);
                  }}
                  onMouseLeave={() => {
                    setDemoHovered(false);
                  }}
                  className="absolute h-full w-full flex flex-col space-y-2 justify-center items-center z-20"
                >
                  <div
                    className={
                      'bg-[#F9BAAB] rounded-full flex flex-col justify-center items-center transition-all ease-in-out delay-100 ' +
                      (demoHovered ? 'p-1 md:p-1.5' : 'p-1 md:p-1.5')
                    }
                  >
                    <div
                      className={
                        'bg-[#FF623D] rounded-full flex flex-col justify-center items-center transition-all ease-in-out delay-200 ' +
                        (demoHovered
                          ? 'p-1.5 md:p-2'
                          : 'p-0.5 md:p-1')
                      }
                    >
                      <svg
                        width="44"
                        height="44"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 11L6 4L10.5 7.5L6 11Z"
                          fill="white"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div
                    className={
                      'bg-white border px-6 py-2 flex flex-col justify-center items-center space-y-0.5 lg:space-y-1 rounded-xl transition-all ease-in-out delay-200'
                    }
                  >
                    <p className="text-[10px] sm:text-[11px] lg:text-xs silka-semibold text-gray-900">
                      Watch a Disperse demo
                    </p>
                    <div className="flex flex-row space-x-1">
                      <p className="my-auto text-[8px] sm:text-[9px] lg:text-[11px] silka-bold text-[#FF623D]">
                        WATCH NOW
                      </p>
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="my-auto"
                      >
                        <path
                          d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                          fill="#FF623D"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </button>
              </DialogPrimitive.Trigger>
              <DialogPrimitive.Portal forceMount>
                <Transition.Root show={demoOpen}>
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
                      className="fixed inset-0 z-20 bg-black/70"
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
                      className={clsx(
                        'fixed z-50',
                        'w-[95vw] max-w-5xl xl:w-full',
                        'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
                        'bg-transparent',
                        'focus:outline-none focus-visible:ring-0'
                      )}
                    >
                      <div className="flex rounded-lg flex-col space-y-6">
                        <div className="w-full flex flex-row justify-end items-end">
                          <DialogPrimitive.Close>
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 15 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="Hoveropacity-80"
                            >
                              <path
                                d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                                fill="white"
                                fillRule="evenodd"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </DialogPrimitive.Close>
                        </div>
                        <video
                          ref={videoRef}
                          controls
                          className="w-full bg-black"
                          src="https://trydisperse.b-cdn.net/homepage/demo.mp4"
                        />
                      </div>
                    </DialogPrimitive.Content>
                  </Transition.Child>
                </Transition.Root>
              </DialogPrimitive.Portal>
            </DialogPrimitive.Root>
          </div>
          <div className="flex flex-col justify-start items-start w-[95%] md:w-1/2 max-w-[800px] lg:my-auto xl:pr-6 2xl:pr-12">
            <h1 className="silka-bold text-3xl xl:text-5xl text-[#363636]">
              Create &amp; Manage Social Media Content
            </h1>
            <p className="text-sm xl:text-base silka-regular mt-6 w-4/5 text-gray-400">
              Disperse allows you to create and edit content, post or
              schedule it on all social platforms, and track your
              analytics all in one place.
            </p>
            <div className="flex flex-col w-full space-y-4 md:space-y-0 md:flex-row md:space-x-5 mt-10">
              <Link href="/signup" legacyBehavior>
                <button className="bg-[#FF623D] border border-[#FF623D] text-xs xl:text-sm rounded transition-all silka-medium text-white ease-in-out my-auto delay-75 px-5 py-2 hover:opacity-90">
                  Try Disperse Free
                </button>
              </Link>
              <Link
                href="https://calendly.com/trydisperse/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-fit"
              >
                <button className="border w-full my-auto border-[#FF623D] text-[#FF623D] rounded text-xs xl:text-sm silka-medium transition-all ease-in-out delay-75 px-5 py-2 hover:opacity-80">
                  Book a demo
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full py-8 xl:py-10 bg-[#F6E7E3] flex flex-col justify-center items-center">
          <div className="w-[90%] md:w-3/4 flex flex-row">
            <div className="w-1/5 flex flex-col justify-center items-center my-auto">
              <Image
                className="h-[11px] w-fit md:h-[12px] lg:h-[16px] xl:h-[20px]"
                src={AxelImage}
                alt="Image of the Axel Logo"
              />
            </div>
            <div className="w-1/5 flex flex-col justify-center items-center my-auto">
              <Image
                className="h-[11px] w-fit md:h-[12px] lg:h-[16px] xl:h-[20px]"
                src={SheinLogo}
                alt="Image of the Shein Logo"
              />
            </div>
            <div className="w-1/5 flex flex-col justify-center items-center my-auto">
              <Image
                className="h-[21px] w-fit md:h-[22px] xl:h-[28px]"
                src={UscLogo}
                alt="Image of the USC Logo"
              />
            </div>
            <div className="w-1/5 flex flex-col justify-center items-center my-auto">
              <Image
                className="h-[11px] w-fit md:h-[12px] lg:h-[18px] xl:h-[22px]"
                src={UfcLogo}
                alt="Image of the UFC Logo"
              />
            </div>
            <div className="w-1/5 flex flex-col justify-center items-center my-auto">
              <Image
                className="h-[9px] w-fit md:h-[10px] lg:h-[16px] xl:h-[20px]"
                src={LvmhLogo}
                alt="PNG Image of the LVHM Logo"
              />
            </div>
          </div>
        </div>
        <div className="py-16 md:py-20 w-full bg-[#FF623D] flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center my-auto w-[90%] xl:w-[80%]">
            <div className="flex flex-row flex-wrap">
              {clipImages.map((image, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col justify-center items-center p-1 sm:p-1.5 md:p-3 lg:p-5 w-1/4"
                  >
                    <Image
                      src={image?.value}
                      alt={image?.alt}
                      className="h-[160px] w-fit sm:h-[180px] md:h-[240px] lg:h-[280px] xl:h-[320px] 2xl:h-[360px] rounded-lg"
                    />
                  </div>
                );
              })}
            </div>
            <p className="text-center mt-12 text-xs xl:text-sm silka-semibold text-white">
              DISPERSE EDITING
            </p>
            <h2 className="text-white text-3xl xl:text-4xl mt-2 text-center silka-semibold">
              AI-Powered Video Editing
            </h2>
            <p className="text-gray-100 mt-3.5 silka-regular text-center w-full md:w-3/4 xl:w-1/2 text-sm xl:text-base">
              Discover the power of AI by automating all of your
              content creation and posting. Tell your story and reach
              a larger audience!
            </p>
            <div className="flex mt-10 flex-row flex-wrap w-full xl:w-[60%]">
              {automationFeatures.map((value: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="w-1/2 md:w-1/3 p-3 flex flex-row space-x-2 my-auto"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mb-auto"
                    >
                      <path
                        d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                        fill="white"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <p className="flex-1 my-auto text-[10px] md:text-xs silka-medium text-white">
                      {value.feature}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="bg-[#F9F9F9] py-16 md:py-20 w-full flex flex-col justify-center items-center">
          <div className="flex flex-col-reverse md:flex-row w-[90%] xl:w-[80%] md:space-x-12 xl:space-x-24">
            <div className="flex flex-col mt-12 md:mt-0 my-auto w-full md:w-1/4">
              <div className="flex flex-row md:flex-col space-x-2 md:space-x-0 md:space-y-2">
                <svg
                  width="71"
                  height="12"
                  viewBox="0 0 710 120"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="my-auto"
                >
                  <path
                    d="M118.671 40.3228L83.5777 36.5884L68.6457 4.4844C67.9009 2.2448 64.9113 0.75 62.6717 0.75C60.4321 0.75 57.4425 2.2448 56.6977 4.4844L41.7657 36.5884L6.67233 40.3228C3.68793 40.3228 2.19313 42.5624 0.698333 44.802C-0.0464541 47.0416 0.698335 50.0312 2.19313 51.5208L28.3291 75.4168L20.8603 110.51C20.1155 112.75 21.6051 115.739 23.8447 117.229C25.3395 118.719 26.8343 119.469 27.5791 119.469C29.0739 119.469 29.8187 119.469 30.5635 118.724L61.9235 100.802L92.5382 118.724C94.7778 120.219 97.7674 120.219 100.007 117.979C102.247 116.484 102.991 113.5 102.991 111.26L95.5226 76.1668L121.659 52.2708C123.898 50.776 124.643 47.7916 123.153 45.552C123.153 42.5624 120.914 41.0676 118.674 40.3228L118.671 40.3228Z"
                    fill="#FF623D"
                  />
                  <path
                    d="M264.271 40.3228L229.178 36.5884L214.246 4.4844C213.501 2.2448 210.511 0.75 208.272 0.75C205.287 0.75 203.043 2.2448 202.298 4.4844L187.366 36.5884L152.272 40.3228C149.288 40.3228 147.793 42.5624 146.298 44.802C145.554 47.0416 146.298 50.0312 147.793 51.5208L173.929 75.4168L166.46 110.51C165.716 112.75 167.205 115.739 169.445 117.229C170.94 117.974 171.684 118.724 173.179 118.724C174.674 118.724 175.419 118.724 176.164 117.979L207.524 100.058L238.138 117.979C240.378 119.474 243.368 119.474 245.607 117.234C247.847 115.739 248.591 112.755 248.591 110.515L241.123 75.422L267.259 51.526C269.498 50.0312 270.243 47.0468 268.754 44.8072C269.504 42.5624 267.264 41.0676 264.274 40.3228L264.271 40.3228Z"
                    fill="#FF623D"
                  />
                  <path
                    d="M412.111 41.0676H411.366L376.273 37.3332L361.341 5.22921C359.846 1.49481 357.601 0 354.617 0C351.633 0 349.388 1.49482 348.643 3.73442L333.711 35.8384L298.618 39.5728C295.633 39.5728 294.138 41.8124 292.644 44.052C291.899 46.2916 292.644 49.2812 294.138 50.7708L320.274 74.6668L312.806 109.76C312.061 112 313.55 114.989 315.79 116.479C317.285 117.224 318.03 117.974 319.524 117.974C321.019 117.974 321.764 117.974 322.509 117.229L353.869 99.3076L384.484 117.229C386.723 118.724 389.713 118.724 391.952 116.484C394.192 114.989 394.937 112.005 394.937 109.765L387.468 74.672L414.353 52.2654C415.848 50.7706 416.593 49.281 416.593 47.0362C416.593 44.0518 415.098 41.8122 412.114 41.0674L412.111 41.0676Z"
                    fill="#FF623D"
                  />
                  <path
                    d="M556.964 40.3228L521.871 36.5884L506.939 4.4844C506.194 2.2448 503.205 0.75 500.965 0.75C497.981 0.75 495.736 2.2448 494.991 4.4844L480.059 36.5884L444.966 40.3228C441.231 40.3228 438.992 43.3072 438.992 47.0416C438.992 49.2812 439.737 50.776 441.231 52.2708L467.367 76.1668L459.899 111.26C459.154 113.5 460.643 116.489 462.883 117.979C464.378 118.724 465.123 119.474 466.617 119.474C468.112 119.474 468.857 119.474 469.602 118.729L500.962 100.808L531.576 118.729C533.816 120.224 536.806 120.224 539.045 117.984C541.285 116.489 542.03 113.505 542.03 111.265L534.561 76.172L560.697 52.276C562.936 50.7812 563.681 47.7968 562.192 45.5572C562.192 42.5624 559.952 41.0676 556.968 40.3228L556.964 40.3228Z"
                    fill="#FF623D"
                  />
                  <path
                    d="M709.284 45.5468C708.54 43.3072 706.3 41.0676 703.31 41.0676L668.217 36.5884L653.285 4.4844C652.54 2.2448 649.551 0.75 647.311 0.75C644.327 0.75 642.082 2.2448 641.337 4.4844L626.405 36.5884L591.312 40.3228C588.327 40.3228 586.832 42.5624 585.338 44.802C584.593 47.0416 585.338 50.0312 586.832 51.5208L612.968 75.4168L605.5 110.51C604.755 112.75 606.244 115.739 608.484 117.229C609.979 117.974 610.724 118.724 612.218 118.724C613.713 118.724 614.458 118.724 615.203 117.979L646.563 100.058L677.178 117.979C679.417 119.474 682.407 119.474 684.646 117.234C686.886 115.739 687.631 112.755 687.631 110.515L680.162 75.422L706.298 51.526C709.288 50.776 710.032 47.7864 709.287 45.5468L709.284 45.5468Z"
                    fill="#FF623D"
                  />
                </svg>
                <p className="silka-semibold my-auto text-sm xl:text-lg text-[#FF623D]">
                  4.82 stars rated, by 1000+ teams
                </p>
              </div>
              <h2 className="text-xl xl:text-2xl mt-3 silka-bold text-[#363636]">
                Trusted by Many Teams That Are Perfecting Their
                Organic Content
              </h2>
              <Link href="/signup" legacyBehavior>
                <button className="mt-7 w-fit border border-[#FF623D] px-5 py-1.5 text-xs xl:text-sm silka-medium text-[#FF623D] rounded transition-all ease-in-out delay-100 hover:opacity-80">
                  Try For Free
                </button>
              </Link>
            </div>
            <div className="flex-1 flex flex-row flex-wrap">
              {reviews
                .filter((value: any, index: number) => {
                  if (isXl) {
                    return true;
                  } else if (isMd) {
                    return (
                      index === 0 ||
                      index === 1 ||
                      index === 2 ||
                      index === 3
                    );
                  } else {
                    return index === 0 || index === 1 || index === 2;
                  }
                })
                .map((value: any, index: number) => {
                  return (
                    <div
                      key={index}
                      className="flex p-3 flex-col w-full md:w-1/2 xl:w-1/3"
                    >
                      <div className="p-3.5 border flex flex-col justify-between items-between border-[#FF623D] h-full rounded">
                        <div className="flex flex-col">
                          <Image
                            alt="Image of the Disperse Stars"
                            src={
                              value?.stars == 5
                                ? FiveStars
                                : FourStars
                            }
                            className="w-[64px] h-fit"
                          />
                          <p className="silka-medium text-gray-600 text-sm md:text-xs 2xl:text-sm mt-4">
                            {`"${value.quote}"`}
                          </p>
                        </div>
                        <div className="flex flex-row mt-5 justify-between items-between">
                          <p className="silka-semibold my-auto text-black text-xs">
                            {value.name}
                          </p>
                          <div className="my-auto flex flex-row space-x-1.5">
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 15 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="my-auto"
                            >
                              <path
                                d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                                fill="#6A7280"
                                fillRule="evenodd"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                            <span className="text-[10px] silka-semibold text-gray-500 my-auto">
                              VERIFIED PURCHASE
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full justify-center py-20 md:py-24 xl:py-32 items-center">
          <div className="flex flex-col justify-start items-start w-[90%] md:w-[80%] xl:w-[60%]">
            <h2 className="text-4xl xl:text-[44px] silka-bold text-[#363636]">
              Vast Number of Automations
            </h2>
            <p className="mt-3.5 silka-regular text-gray-400 w-full xl:w-3/4 text-xs xl:text-base">
              Explore a list of the automations that Disperse offers
              to grow your organic content. Sign up to Disperse to
              explore all of the automations.
            </p>
          </div>
          <div className="flex flex-row mt-8 md:mt-12 xl:mt-16 w-full flex-wrap">
            {automationWorkflows
              .filter((value: any, index: number) => {
                if (isXl) {
                  return (
                    index === automationWorkflowInterval ||
                    index === (automationWorkflowInterval + 1) % 12 ||
                    index === (automationWorkflowInterval + 2) % 12 ||
                    index === (automationWorkflowInterval + 3) % 12 ||
                    index === (automationWorkflowInterval + 4) % 12
                  );
                } else if (isMd) {
                  return (
                    index === automationWorkflowInterval ||
                    index === (automationWorkflowInterval + 1) % 12 ||
                    index === (automationWorkflowInterval + 2) % 12
                  );
                } else {
                  return (
                    index === automationWorkflowInterval ||
                    index === (automationWorkflowInterval + 1) % 12
                  );
                }
              })
              .map((value: any, index: number) => {
                return (
                  <WorkflowComponent
                    key={index}
                    index={index}
                    value={value}
                  />
                );
              })}
          </div>
          <div className="flex flex-col justify-center items-center mt-8 md:mt-12 w-full">
            <div className="flex flex-col md:flex-row md:justify-between md:items-between w-[90%] md:w-3/4 xl:w-[60%]">
              <div className="flex flex-row space-x-4 my-auto">
                <Link href="/signup" legacyBehavior>
                  <button className="text-xs xl:text-sm border border-[#FF623D] h-fit my-auto px-5 py-2 bg-[#FF623D] rounded silka-medium text-white transition-all ease-in-out delay-100 hover:opacity-90">
                    Get Started For Free
                  </button>
                </Link>
                <a
                  href="https://calendly.com/trydisperse/30min"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <button className="text-xs xl:text-sm px-5 py-2 border border-[#FF623D] rounded h-fit my-auto silka-medium text-[#FF623D] transition-all ease-in-out delay-100 hover:opacity-80">
                    Book a Demo
                  </button>
                </a>
              </div>
              <div className="flex flex-row justify-end items-end mt-5 md:mt-0 space-x-5">
                <button
                  onClick={() => {
                    if (automationWorkflowInterval === 0) {
                      setAutomationWorkflowInterval(11);
                    } else {
                      setAutomationWorkflowInterval(
                        automationWorkflowInterval - 1
                      );
                    }
                  }}
                  className="bg-gray-200 h-fit my-auto rounded-full p-2 transition-all ease-in-out delay-100 hover:bg-gray-100"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z"
                      fill="#363636"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
                <button
                  onClick={() => {
                    if (automationWorkflowInterval === 11) {
                      setAutomationWorkflowInterval(0);
                    } else {
                      setAutomationWorkflowInterval(
                        automationWorkflowInterval + 1
                      );
                    }
                  }}
                  className="bg-gray-200 h-fit my-auto rounded-full p-2 transition-all ease-in-out delay-100 hover:bg-gray-100"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="my-auto"
                  >
                    <path
                      d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
                      fill="#363636"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full justify-center items-center py-10 bg-[#161412]">
          <div className="flex flex-row w-[95%] xl:w-[80%] flex-wrap">
            {guarantees.map((value: any, index: number) => {
              return (
                <div
                  key={index}
                  className="flex flex-col justify-center items-center w-1/2 p-2 md:w-1/4"
                >
                  <img
                    src={value?.icon}
                    className="h-[20px] w-[20px] md:h-[24px] md:w-[24px]"
                    alt={value?.alt}
                  />
                  <h4 className="text-base md:text-xl silka-bold text-center mt-5 text-white">
                    {value?.title}
                    <span className="text-[#FF623D]">.</span>
                  </h4>
                  <p className="text-[10px] md:text-[11px] silka-medium text-gray-400 text-center mt-2 w-full md:w-3/4">
                    {value?.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="bg-[#F9F9F9] w-full py-20 md:py-24 flex flex-col justify-center items-center md:flex-row md:space-x-12">
          <div className="w-[90%] md:w-1/2 flex flex-col justify-center items-center my-auto">
            <img
              className="max-h-[300px] md:max-h-[420px] w-fit md:px-8"
              src="/images/edit/analytics.png"
              alt="Disperse Features"
            />
          </div>
          <div className="w-[90%] mt-12 md:my-auto md:w-1/2 flex flex-col md:pr-6">
            <p className="text-[11px] silka-bold text-[#FF623D]">
              SOCIAL MANAGEMENT
            </p>
            <h2 className="silka-semibold text-3xl xl:text-4xl mt-3 text-[#363636]">
              Scheduling &amp; Analytics
            </h2>
            <p className="mt-4 silka-regular text-sm xl:text-base w-full xl:w-4/5 text-gray-400">
              Automatically schedule your content for the best
              performing times. After that, track your analytics to
              see the best performing posts.
            </p>
            <Link href="/signup" legacyBehavior>
              <button className="mt-8 md:mt-10 w-fit text-xs xl:text-sm rounded silka-medium text-white bg-[#FF623D] px-5 py-1.5 transition-all ease-in-out delay-100 hover:opacity-90">
                Try Disperse Free
              </button>
            </Link>
          </div>
        </div>
        <div className="py-20 md:py-28 flex flex-col justify-center items-center w-full">
          <div className="w-[90%] lg:w-4/5 xl:w-3/5 bg-[#FF623D] p-8 md:p-12 rounded-xl flex flex-col md:flex-row">
            <div className="flex flex-col w-full md:w-1/2 my-auto">
              <h2 className="silka-bold text-white text-3xl">
                Use Disperse For Free!
              </h2>
              <p className="mt-4 silka-medium text-gray-200 text-sm">
                Try Disperse&apos;s automations, analytics,
                scheduling, and virality tools for free. No credit
                card required or any other gimmicks.
              </p>
            </div>
            <div className="flex-1" />
            <form
              onSubmit={(e) => {
                e.preventDefault();
                Router.push('/name_and_password?email=' + email);
              }}
              className="w-full md:w-1/4 flex flex-col my-auto mt-8 md:mt-0"
            >
              <input
                className="py-2 text-sm rounded silka-regular border border-[#FAAB98] focus:ring-[#FAAB98] focus:border-[#FAAB98]"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Work Email..."
                type="email"
                required
              />
              <button className="mt-2.5 text-sm bg-[#FAAB98] silka-medium text-white py-2 rounded">
                Try For Free
              </button>
            </form>
          </div>
        </div>
        <DialogPrimitive.Root
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        >
          <DialogPrimitive.Portal forceMount>
            <Transition.Root show={dialogOpen}>
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
                  className="fixed inset-0 z-20 bg-black/20"
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
                  className={clsx(
                    'fixed z-50',
                    'w-[95vw] max-w-lg rounded-sm p-4 md:w-full',
                    'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
                    'bg-white',
                    'focus:outline-none focus-visible:ring-0'
                  )}
                >
                  <div className="flex flex-col justify-center items-center">
                    <div className="flex flex-row w-full justify-end items-end">
                      <DialogPrimitive.Close>
                        <button className="">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className=""
                          >
                            <path
                              d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                              fill="#363636"
                              fillRule="evenodd"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </button>
                      </DialogPrimitive.Close>
                    </div>
                    <Image
                      src={AutomationImage}
                      className="mt-1 px-6"
                      alt="Repurpose TikTok Videos"
                    />
                    <h2 className="text-3xl md:text-4xl text-center mt-4 silka-bold text-[#363636]">
                      Try Disperse For Free
                    </h2>
                    <p className="mt-3 text-xs md:text-sm silka-medium text-gray-500 text-center">
                      Automatically optimize your content for virality
                      and post on all social platforms without lifting
                      a finger.
                    </p>
                    <span className="text-center mt-6 text-[11px] mb-3 silka-semibold text-[#363636]">
                      No credit card required
                    </span>
                    <Link href="/signup" legacyBehavior>
                      <button
                        onClick={() => {
                          posthog?.capture(
                            'clicked_get_started_for_free'
                          );
                        }}
                        className="py-2.5 mb-2 w-full shadow-sm hover:shadow-none shadow-[#FF623D] text-white silka-medium rounded text-sm bg-[#FF623D] transition-all ease-in-out delay-100"
                      >
                        Get Started For Free
                      </button>
                    </Link>
                  </div>
                </DialogPrimitive.Content>
              </Transition.Child>
            </Transition.Root>
          </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
      </div>
    </Container>
  );
}
