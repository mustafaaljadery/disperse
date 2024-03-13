import { useState } from 'react';
import Link from 'next/link';
import Container from '../components/Container';
import Router from 'next/router';
import Image from 'next/image';
import FiveStarImage from '../public/images/5-star.png';

interface PricingComponentProps {
  value: any;
  index: number;
}

interface QAndAProps {
  value: any;
}

const features = [
  {
    logo: '/images/edit/video-editor.svg',
    alt: 'Image of video editor icon',
    name: 'AI-Native Video Editor',
    description:
      'Easily edit your videos with our AI-powered video editor.',
  },
  {
    logo: '/images/edit/automations.svg',
    alt: 'Image of automations icon',
    name: 'Social Automations',
    description:
      'Get access to a library of automations to automatically reshare your content. Create Once, Distribute Everywhere.',
  },
  {
    logo: '/images/edit/analytics.svg',
    alt: 'Image of analytics icon',
    name: 'Analytics',
    description:
      'Access to analytics for all of your social platforms. Track and grow your key metrics for each platform.',
  },
  {
    logo: '/images/edit/virality.svg',
    alt: 'Image of virality icon',
    name: 'Virality Tools',
    description:
      'Get access to a suite of tools that will help you go viral. Auto-comment under posts, auto-reshare, and more.',
  },
];

const qa: any = [
  {
    question: 'What social connections are provided?',
    answer:
      'Twitter, Instagram, Facebook, YouTube, Linkedin, TikTok, Pinterest',
  },
  {
    question: 'Can I use Disperse for free?',
    answer:
      'Yes, you can use Disperse for free forever. Our basic plan covers everything you need to get started.',
  },
  {
    question: 'Are there any onboarding or setup fees?',
    answer:
      'There are NO onboarding or setup fees when using Disperse.',
  },
  {
    question: 'Which subscription plan should I get?',
    answer:
      'For single users working on their social media, the pro paln is everything you need. If you are going to collaborate with multiple users, you should get the team plan. Finally, for large companies, the enterprise plan will provide you with the security and customer support you need.',
  },
  {
    question: 'May I cancel my Disperse subscription?',
    answer:
      'Ofcourse! If you no long wish to use Disperse, you may cancel at any time. Enter the settings tab in your workspace. Navigate to plans, and cancel your subscription.',
  },
  {
    question: 'How do refunds work?',
    answer:
      'If you are unsatisfied with the product within 60 days, contact us and we will happily refund you 100% of your money.',
  },
  {
    question: 'How do I cancel my paid plan?',
    answer:
      'Go to your workspace, settings, plans, and cancel your subscription.',
  },
];

const pricingCategories = [
  {
    title: 'Starter',
    stars: '5',
    heading: '',
    description:
      'For content creators looking to get started with content.',
    monthlyPrice: '$0',
    annualPrice: '$0',
    additionalPrice: '',
    category1: '3 guests in your workspace',
    category2: '2GB of media storage',
    category3: '100 automations/mo',
    category4: '30 mins of Clips',
    buttonName: 'Try For Free',
  },
  {
    title: 'Pro',
    stars: '4.82',
    heading: 'Most Popular',
    description:
      'All of the tools to automate and grow your social platforms.',
    monthlyPrice: '$39',
    annualPrice: '$29',
    additionalPrice: '',
    category1: '5 guests in your workspace',
    category2: '200GB of media storage',
    category3: '1K automations/mo',
    category4: 'Unlimited Clips + Video Editor',
    buttonName: 'Get Started',
  },
  {
    title: 'Team',
    stars: '4.94',
    heading: '',
    description:
      'Perfect for teams looking to scale their content on all platforms.',
    monthlyPrice: '$49',
    annualPrice: '$39',
    additionalPrice: '+ $12 per additional user',
    category1: 'Unlimited collaborators in your workspace',
    category2: '500GB of media storage',
    category3: '3K automations/mo',
    category4: 'Unlimited Clips + Video Editor',
    buttonName: 'Get Started',
  },
];

function QuestionAndAnswer({ value }: QAndAProps) {
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
              fillRule="evenodd"
              clipRule="evenodd"
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

function PricingComponent({ value, index }: PricingComponentProps) {
  return (
    <div className="w-full md:w-1/3 p-2 md:p-3" key={index}>
      <div className="p-4 w-full bg-[#F5EDEB] h-full rounded-lg flex flex-col">
        <div className="w-full flex flex-row justify-between items-between">
          <div className="flex flex-row space-x-2">
            <Image
              src={FiveStarImage}
              className="my-auto w-[50px]"
              alt="5 Star Rating"
            />
            <span className="text-[10px] silka-semibold my-auto text-[#FF623D]">
              {value?.stars} STARS
            </span>
          </div>
          <p className="text-xs my-auto silka-bold rounded text-[#FF623D]">
            {value?.heading?.toUpperCase()}
          </p>
        </div>
        <h2 className="mt-4 silka-semibold text-3xl text-[#363636]">
          {value?.title}
        </h2>
        <p className="text-gray-500 mt-2 silka-regular text-sm">
          {value?.description}
        </p>
        <hr className="w-full my-3.5 border-gray-300" />
        <div className="flex-1 flex flex-col">
          <div className="flex flex-col space-y-1.5">
            <div className="flex flex-row space-x-2">
              <p className="text-3xl silka-semibold text-[#363636]">
                {value?.annualPrice}
              </p>
              <span className="my-auto text-[11px] silka-semibold text-gray-500">
                {value?.additionalPrice.length > 0
                  ? value?.additionalPrice
                  : ''}
              </span>
            </div>
            {value?.title != 'Starter' && (
              <p className="silka-medium text-[11px] text-gray-500">
                {value?.monthlyPrice} billed monthly
              </p>
            )}
          </div>
          <div className="flex flex-row mt-5 space-x-2.5">
            <svg
              width="16"
              height="13"
              viewBox="0 0 19 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="my-auto"
            >
              <path
                d="M16.7728 0.000691174L7.69614 9.42796L2.60104 5.28887L0.640625 7.69713L6.83709 12.7317L7.95063 13.6272L8.93097 12.5985L19 2.14223L16.7733 0L16.7728 0.000691174Z"
                fill="#FF623D"
              />
            </svg>
            <p className="text-xs my-auto silka-medium text-[#363636]">
              {value?.category1}
            </p>
          </div>
          <div className="flex flex-row mt-5 space-x-2.5">
            <svg
              width="16"
              height="13"
              viewBox="0 0 19 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="my-auto"
            >
              <path
                d="M16.7728 0.000691174L7.69614 9.42796L2.60104 5.28887L0.640625 7.69713L6.83709 12.7317L7.95063 13.6272L8.93097 12.5985L19 2.14223L16.7733 0L16.7728 0.000691174Z"
                fill="#FF623D"
              />
            </svg>
            <p className="text-xs my-auto silka-medium text-[#363636]">
              {value?.category4}
            </p>
          </div>
          <div className="flex flex-row mt-5 space-x-2.5">
            <svg
              width="16"
              height="13"
              viewBox="0 0 19 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="my-auto"
            >
              <path
                d="M16.7728 0.000691174L7.69614 9.42796L2.60104 5.28887L0.640625 7.69713L6.83709 12.7317L7.95063 13.6272L8.93097 12.5985L19 2.14223L16.7733 0L16.7728 0.000691174Z"
                fill="#FF623D"
              />
            </svg>
            <p className="text-xs my-auto silka-medium text-[#363636]">
              {value?.category2}
            </p>
          </div>
          <div className="flex flex-row mt-5 space-x-2.5">
            <svg
              width="16"
              height="13"
              viewBox="0 0 19 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="my-auto"
            >
              <path
                d="M16.7728 0.000691174L7.69614 9.42796L2.60104 5.28887L0.640625 7.69713L6.83709 12.7317L7.95063 13.6272L8.93097 12.5985L19 2.14223L16.7733 0L16.7728 0.000691174Z"
                fill="#FF623D"
              />
            </svg>
            <p className="text-xs my-auto silka-medium text-[#363636]">
              {value?.category3}
            </p>
          </div>
        </div>
        <hr className="w-full mt-10 mb-3.5 border-gray-300" />
        <Link href="/signup" legacyBehavior>
          <button className="w-full silka-medium text-sm rounded text-white py-2 bg-[#FF623D] transition-all ease-in-out delay-100 hover:opacity-80">
            {value?.buttonName}
          </button>
        </Link>
      </div>
    </div>
  );
}

interface FeatureProps {
  value: any;
}

function FeatureComponent({ value }: FeatureProps) {
  return (
    <div className="flex flex-col w-full md:w-1/2 p-4 2xl:p-6 xl:w-1/4 mb-auto">
      <div className="p-1.5 rounded-full bg-[#F5EDEB] w-fit">
        <div className="p-3 rounded-full bg-[#F6DFD9] w-fit">
          <img src={value?.logo} className="w-[18px] h-[18px]" />
        </div>
      </div>
      <h3 className="mt-5 text-xl 2xl:text-2xl silka-semibold text-[#363636]">
        {value?.name}
      </h3>
      <p className="mt-2.5 silka-regular text-sm 2xl:text-base text-gray-400">
        {value?.description}
      </p>
    </div>
  );
}

export default function Pricing() {
  const [email, setEmail] = useState('');

  return (
    <Container
      title="Plans & Pricing Options - Disperse"
      description="Find the perfect plan for your team. Disperse offers a variety of plans to fit your team's needs."
    >
      <div className="flex flex-col justify-center items-center w-full">
        <div className="mt-12 md:mt-16 pb-8 md:pb-10 flex flex-col w-full justify-center items-center">
          <div className="flex flex-col justify-center items-center md:flex-row space-y-2 md:space-y-0 md:space-x-3">
            <Image
              src={FiveStarImage}
              className="w-[60px] my-auto h-fit"
              alt="5 Star Rating"
            />
            <p className="text-[11px] md:text-sm silka-bold my-auto text-[#FF623D]">
              4.82 STARS &middot; USED BY 1000+ TEAMS
            </p>
          </div>
          <h1 className="text-5xl md:text-6xl text-[#363636] mt-5 silka-bold">
            Pricing<span className="text-[#FF623D]">.</span>
          </h1>
          <p className="mt-4 md:mt-6 text-gray-500 text-xs md:text-lg silka-medium">
            Use Disperse for free, no credit card required.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              Router.push('/name_and_password?email=' + email);
            }}
            className="w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 2xl:w-[30%] mt-8 xl:mt-10 border p-1.5 flex flex-row space-x-0.5 rounded border-gray-300"
          >
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="flex-1 w-full text-sm text-gray-600 silka-regular border-none outline-none bg-transparent focus:border-none focus:outline-none focus:ring-0"
              required
              type="email"
              placeholder="Email Address..."
            />
            <button className="rounded hover:opacity-90 px-4 py-2 bg-[#363636] text-white silka-medium text-xs md:text-sm">
              Try For Free
            </button>
          </form>
        </div>
        {/*
        <div className="flex flex-col w-full justify-center items-center">
          <div className="w-[90%] md:w-3/4 xl:w-2/5 flex flex-row">
            <div className="w-1/5 flex flex-col justify-center items-center my-auto">
              <img
                className="max-h-[11px] md:max-h-[12px] lg:max-h-[16px]"
                src="/images/axel-logo.png"
                alt="Image of the Axel Springer Logo"
              />
            </div>
            <div className="w-1/5 flex flex-col justify-center items-center my-auto">
              <img
                className="max-h-[11px] md:max-h-[12px] lg:max-h-[16px]"
                src="/images/shien-logo.png"
                alt="Image of the Shein Logo"
              />
            </div>
            <div className="w-1/5 flex flex-col justify-center items-center my-auto">
              <img
                className="max-h-[21px] md:max-h-[22px]"
                src="/images/usc-logo.png"
                alt="Image of the USC Logo"
              />
            </div>
            <div className="w-1/5 flex flex-col justify-center items-center my-auto">
              <img
                className="max-h-[11px] md:max-h-[12px] lg:max-h-[18px]"
                src="/images/ufc-logo.png"
                alt="Image of the UFC Logo"
              />
            </div>
            <div className="w-1/5 flex flex-col justify-center items-center my-auto">
              <img
                className="max-h-[9px] md:max-h-[10px] lg:max-h-[16px]"
                src="/images/lvmh-logo.png"
                alt="PNG Image of the LVHM Logo"
              />
            </div>
          </div>
        </div>
  */}
        <div className="py-8 mb:pt-14 md:pb-20 flex flex-col w-full justify-center items-center">
          <div className="flex flex-row flex-wrap w-[95%] lg:w-4/5 xl:w-[70%]">
            {pricingCategories.map((value: any, index: number) => {
              return <PricingComponent index={index} value={value} />;
            })}
          </div>
          <div className="mt-12 rounded-lg w-[95%] md:w-[90%] lg:w-3/4 xl:w-1/2 p-8 bg-[#F9F9F9]">
            <div className="flex flex-col w-full space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-center">
              <div className="flex flex-col my-auto w-full md:w-3/4">
                <h2 className="text-4xl md:text-3xl xl:text-4xl silka-bold text-[#363636]">
                  Enterprise
                </h2>
                <p className="mt-4 text-base md:text-sm xl:text-base silka-regular text-gray-400">
                  Built for Enterprises that are developing content
                  plans for multiple social accounts, and are looking
                  to expand their organic content.
                </p>
              </div>
              <Link href="/contact" legacyBehavior>
                <button className="w-full md:w-fit md:h-fit my-auto justify-center items-center flex text-xs silka-medium text-white flex-row space-x-2 px-5 py-2 bg-[#FF623D] rounded transition-all ease-in-out delay-100 hover:opacity-90">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="my-auto"
                  >
                    <path
                      d="M12.5 3L2.5 3.00002C1.67157 3.00002 1 3.6716 1 4.50002V9.50003C1 10.3285 1.67157 11 2.5 11H7.50003C7.63264 11 7.75982 11.0527 7.85358 11.1465L10 13.2929V11.5C10 11.2239 10.2239 11 10.5 11H12.5C13.3284 11 14 10.3285 14 9.50003V4.5C14 3.67157 13.3284 3 12.5 3ZM2.49999 2.00002L12.5 2C13.8807 2 15 3.11929 15 4.5V9.50003C15 10.8807 13.8807 12 12.5 12H11V14.5C11 14.7022 10.8782 14.8845 10.6913 14.9619C10.5045 15.0393 10.2894 14.9965 10.1464 14.8536L7.29292 12H2.5C1.11929 12 0 10.8807 0 9.50003V4.50002C0 3.11931 1.11928 2.00003 2.49999 2.00002Z"
                      fill="white"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <p className="my-auto">Contact Us</p>
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="pt-8 pb-16 md:pt-12 md:pb-24 w-[95%] lg:w-4/5 flex flex-col justify-start items-start">
          <h2 className="text-3xl xl:text-4xl silka-semibold text-[#363636]">
            Enjoy the following features on paid plans!
          </h2>
          <div className="flex mt-10 lg:mt-12 flex-row flex-wrap w-full">
            {features.map((value: any, index: any) => {
              return <FeatureComponent value={value} key={index} />;
            })}
          </div>
        </div>
        <div className="py-12 md:py-14 bg-[#FF623D] w-full flex flex-col justify-center items-center">
          <div className="w-[90%] lg:w-4/5 xl:w-3/5 flex flex-col space-y-5 md:space-y-0 md:flex-row">
            <div className="flex flex-col w-full md:w-1/2 my-auto">
              <h2 className="silka-bold text-white text-3xl">
                Use Dispese For Free!
              </h2>
              <p className="mt-4 silka-medium text-gray-200 text-sm">
                Try Disperse&apos;s automations, analytics,
                scheduling, and virality tools for free. No credit
                card required or any other gimmicks.
              </p>
            </div>
            <div className="flex-1"></div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                Router.push('/name_and_password?email=' + email);
              }}
              className="w-full md:w-1/4 flex flex-col my-auto"
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
        <div className="py-20 md:py-28 flex flex-col justify-center items-center w-[90%] md:w-3/5 xl:w-1/2">
          <h2 className="text-3xl md:text-4xl text-[#363636] silka-bold">
            Questions &amp; answers
            <span className="text-[#FF623D]">.</span>
          </h2>
          <p className="mt-4 silka-regular text-xs md:text-sm text-gray-500 text-center">
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
            {qa?.map((value: any, index: number) => {
              return <QuestionAndAnswer value={value} key={index} />;
            })}
          </div>
        </div>
      </div>
    </Container>
  );
}
