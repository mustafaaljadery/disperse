import Link from 'next/link';
import { useState } from 'react';
import { ViewIcon } from '../icons/ViewIcon';

interface QuestionProps {
  question: string;
  answer: string;
}

export function QuestionAndAnswer({
  question,
  answer,
}: QuestionProps) {
  const [giveAnswer, setGiveAnswer] = useState(false);
  return (
    <button className="flex flex-col justify-start items-start w-11/12 lg:w-3/4">
      <div
        onClick={() => {
          setGiveAnswer(!giveAnswer);
        }}
        className={'flex flex-row space-x-5 py-2'}
      >
        <ViewIcon
          className={'my-auto ' + (giveAnswer ? 'rotate-90' : '')}
        />
        <p className="lg:text-lg my-auto silka-medium">{question}</p>
      </div>
      <hr className="w-full" />
      {giveAnswer ? (
        <p className="ml-9 mt-4 text-start text-sm lg:text-base silka-regular">
          {answer}
        </p>
      ) : (
        <></>
      )}
    </button>
  );
}

const FAQS = [
  {
    question: 'What social connections are provided?',
    answer: 'Twitter, Instagram, Facebook, Youtube, Linkedin, Tiktok',
  },
  {
    question: 'Can I use Disperse for free? ',
    answer:
      '100%. Disperse is free to use for ever. Our basic plans covers everything you need to get started building your social presense online. ',
  },
  {
    question: 'Do you offer discounts for Non-profits?',
    answer:
      'Yes we offer substancial discounts to non-profits. If bel9ive you qualify for a non-profit discount, please get in contact with our Support Team.',
  },
  {
    question: 'Are there any onboarding or setup fees? ',
    answer:
      'There is NO onboarding or setup fees when using Disperse. Users can easily follow the detailed walkthrough provided by the Disperse engineering team. Moreover, for additional help, contact our support team and a member from the Disperse team will personally onboard you free of charge. Remember: Your support team is dedicated for your success, if you don’t receive a response from out support team within 10 hours, you will receive a month of Disperse for free. ',
  },
  {
    question: 'How can I manage my spending?',
    answer:
      'In the settings/billings tab of your workspace, you may set a hard limit, after which Disperse will limit what money is spent on. Moreover, you may configure it such that you sent a soft limit to receive an email once you pass a certain usage threshold.',
  },
  {
    question: 'Which subscription plan should I get?',
    answer:
      'While pro provides the most features, it is recommended for those that are looking to generate as much revenue from their socials as possible. It&apos;s best for users.',
  },
  {
    question: 'May I downgrade/upgrade my subscription?',
    answer:
      'Downgrading or Upgrading your subscription is as easy as naviagting to the settings tab of your workspace, and changing your subscript to the desired plan.',
  },
  {
    question: 'May I cancel by Disperse subscription?',
    answer:
      'Ofcourse! If you no longer wish to use Disperse, you may cancel at any time. Enter the settings tab in your workspace. Navigate to billing, and at the bottom, cancel your subscription.',
  },
  {
    question: 'May I pay using my local currency?',
    answer:
      'As of right now, we only transact with USD, however in the next month or two, we will be adding support to all sorts of currencies. Be on the lookout!',
  },
  {
    question: 'Are there any discount?',
    answer:
      'Yes, if you sign up for our annual billing service, you will save 10% on all plans offered by Disperse.',
  },
  {
    question: 'How are payments being processed?',
    answer:
      'Our payment processor is Stripe. The same payment processor used by many multi-billion dollar corporations.',
  },
  {
    question: 'More Questions?',
    answer:
      'Get in touch with out Support Team. You are guaranteeded to receive an answer from our support team within 10 hours or you$apos;ll receive a month of Disperse on us.',
  },
];

export function FrequentlyAskedQuestions() {
  return (
    <div className="flex flex-col justify-center items-center mt-20 mb-24 lg:mt-32 lg:mb-32">
      <div className="flex flex-col w-11/12 lg:w-3/5">
        <h2 className="text-3xl lg:text-5xl silka-semibold text-center">
          Frequently Asked Questions
        </h2>
        <p className="silka-medium text-sm lg:text-lg text-center mt-4">
          Need more help?{' '}
          <Link
            href="/contact"
            className="underline underline-offset-2 text-[#B62D13]"
          >
            Contact Us
          </Link>
        </p>
        <div className="mt-10 lg:mt-20 flex flex-col space-y-6 justify-center items-center">
          {FAQS.map((value: any, index: number) => {
            return (
              <QuestionAndAnswer
                key={index}
                question={value.question}
                answer={value.answer}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
