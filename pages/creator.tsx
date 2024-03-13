import Router from 'next/router';
import Container from '../components/Container';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import FiveStarImage from '../public/images/5-star.png';
import CreatorRepurposeImage from '../public/images/creator-repurpose.png';
import CloudBasedImage from '../public/images/CloudBasedWorkflow.png';

const images: any = [
  {
    image: '1-audio-perfection.png',
    alt: 'Perfect Audio',
  },
  {
    image: '2-auto-outreach.png',
    alt: 'Auto Outreach',
  },
  {
    image: '3-media-quality.png',
    alt: 'High Media Quality',
  },
  {
    image: '4-optimize.png',
    alt: 'Optimize Your Content',
  },
  {
    image: '5-auto-dm.png',
    alt: 'Auto DM',
  },
  {
    image: '6-bulk-message.png',
    alt: 'Bulk Message',
  },
  {
    image: '7-analytics.png',
    alt: 'Analytics',
  },
  {
    image: '8-live-download.png',
    alt: 'Live Download',
  },
  {
    image: '9-schedule.png',
    alt: 'Scheduled Your Content',
  },
  {
    image: '10-iteration.png',
    alt: 'Iterate On Your Content',
  },
  {
    image: '11-video-editing.png',
    alt: 'Video Editing',
  },
  {
    image: '12-headlines.png',
    alt: 'Split-Test Headlines',
  },
  {
    image: '13-auto-retweet.png',
    alt: 'Auto Retweet',
  },
  {
    image: '14-demographics.png',
    alt: 'Audience Demographics',
  },
  {
    image: '15-drafts.png',
    alt: 'Post Drafts',
  },
];

export default function Creator() {
  const [email, setEmail] = useState('');

  return (
    <Container
      title="Content Creator Tools - Disperse"
      description="Disperse is a content creator tool that helps you create and distribute your content."
    >
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-[90%] md:w-3/4 xl:w-3/5 py-20 md:py-28 flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center md:flex-row space-y-2 md:space-y-0 md:space-x-3">
            <Image
              src={FiveStarImage}
              className="w-[60px] h-fit my-auto"
              alt="5 Stars Image"
            />
            <span className="text-center silka-bold text-[#FF623D] my-auto text-[11px] md:text-sm">
              TRUSTED BY THOUSANDS OF CONTENT CREATORS
            </span>
          </div>
          <h1 className="text-center mt-6 silka-bold text-4xl md:text-5xl w-[90%] xl:w-[70%] text-[#363636]">
            A Workflow Optimized for Superior Content
          </h1>
          <p className="text-center mt-6 silka-regular text-xs md:text-sm text-gray-500">
            Create and effectively distribute your content.
          </p>
          <div className="flex flex-row mt-10 space-x-4 md:space-x-6 justify-between items-between">
            <Link href="/signup" legacyBehavior>
              <button className="bg-[#FF623D] h-fit my-auto px-5 py-1.5 rounded text-xs md:text-sm silka-medium text-white border border-[#FF623D] transition-all delay-100 ease-in-out hover:opacity-80">
                Get Started Free
              </button>
            </Link>
            <a
              href="https://calendly.com/trydisperse/30min"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="px-5 py-1.5 border h-fit my-auto border-[#FF623D] rounded text-[#FF623D] silka-medium text-xs md:text-sm transition-all delay-100 ease-in-out hover:opacity-80">
                Book a Demo
              </button>
            </a>
          </div>
        </div>
        <div className="pt-16 pb-20 bg-[#F9F9F9] w-full flex flex-col justify-center items-center">
          <div className="w-[90%] md:w-3/5 flex flex-col justify-center items-center">
            <Image
              src={CreatorRepurposeImage}
              className="max-h-[400px] w-fit"
              alt="Repurpose Content Image"
            />
            <h2 className="text-center mt-12 text-3xl silka-bold text-[#363636]">
              Repurpose Machine
            </h2>
            <p className="mt-4 text-sm w-full md:w-3/5 text-center silka-regular text-gray-500">
              Take advantage of recommendation algorithms.
              Redistribute your content on mulitple platforms for
              larger exposure with no extra effort.
            </p>
            <Link href="/signup" legacyBehavior>
              <button className="mt-8 bg-[#FF623D] px-5 py-1.5 text-white rounded text-xs md:text-sm silka-medium transition-all ease-in-out delay-100 hover:opacity-90">
                Try Disperse Free
              </button>
            </Link>
          </div>
        </div>
        <div className="py-16 bg-[#FF623D] w-full flex flex-col justify-center items-center">
          <div className="flex flex-col md:flex-row md:space-x-16 w-[90%] md:w-[70%]">
            <div className="w-full md:w-1/2 flex my-auto flex-col jusitfy-center items-center md:justify-start md:items-start">
              <span className="silka-bold text-xs text-white">
                CLOUD-BASED
              </span>
              <h2 className="mt-4 text-4xl xl:text-5xl text-center md:text-start silka-semibold text-white">
                Media Workflow
              </h2>
              <p className="mt-5 silka-regular text-center md:text-start text-gray-100 text-xs xl:text-sm w-full xl:w-4/5">
                Designed for iterations whilst interacting with your
                favorite tools. Store all your media in our cloud for
                extremely quick management.
              </p>
              <Link href="/signup" legacyBehavior>
                <button className="mt-10 w-fit px-5 py-1.5 bg-white text-xs xl:text-sm silka-medium text-[#FF623D] rounded transition-all ease-in-out delay-100 hover:opacity-90">
                  Get Started Free
                </button>
              </Link>
            </div>
            <div className="w-full md:w-1/2 mt-5 md:my-auto">
              <Image
                src={CloudBasedImage}
                alt="Upload Content to Cloud Image"
              />
            </div>
          </div>
        </div>
        <div className="w-[90%] md:w-3/4 xl:w-3/5 flex flex-col justify-center items-center py-20 md:py-32">
          <h2 className="text-4xl xl:text-5xl text-center silka-bold text-[#363636]">
            Analytics &amp; Automation
          </h2>
          <p className="mt-5 text-sm xl:text-base text-center silka-regular text-gray-400">
            Build and monetize your following using Disperse's custon
            built automations.
          </p>
          <div className="flex flex-row flex-wrap w-full xl:w-4/5 mt-8 md:mt-10">
            {images?.map((value: any, index: number) => {
              return (
                <div
                  key={index}
                  className="p-2 xl:p-3 w-1/3 lg:w-1/5"
                >
                  <img
                    src={'/images/automations/' + value?.image}
                    className=""
                    alt={value?.alt}
                  />
                </div>
              );
            })}
          </div>
          <p className="mt-6 text-gray-300 text-xs silka-regular">
            + many more
          </p>
        </div>
        <div className="pb-28 md:pb-32 flex flex-col justify-center items-center w-full">
          <div className="w-[90%] lg:w-3/4 xl:w-3/5 bg-[#FF623D] p-8 md:p-12 rounded-xl flex flex-col md:flex-row">
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
              className="w-full md:w-1/4 flex flex-col mt-8 md:mt-0 my-auto"
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
      </div>
    </Container>
  );
}
