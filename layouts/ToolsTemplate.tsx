import { useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import BusinessImage from '../public/images/business-image.png';

interface QAndAProps {
  value: any;
}

/*
faq: {
  question: string;
  answer: string;
}
*/

/*
content: {
  image: string;
  title: string;
  description: string;
}
*/

/*
1. Service
2. Pitch Disperse + CTA
3. Who uses Disperse
3. SEO for Service
4. Disperse content pitches 
5. FAQ
5. CTA
*/

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
        <p className="text-base text-start silka-medium my-auto text-[#363636]">
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

interface Props {
  faqs?: any[];
  content1: any;
  content2: any;
  content3: any;
  info_header: string;
  info_content1: JSX.Element;
  info_content2: JSX.Element;
}

export function ToolsTemplate({
  faqs,
  content1,
  content2,
  content3,
  info_header,
  info_content1,
  info_content2,
}: Props) {
  const [email, setEmail] = useState('');

  return (
    <div className="w-full flex flex-col justify-center items-center mt-8">
      <div className="py-16 md:py-24 bg-[#F9F9F9] w-full flex flex-col justify-center items-center">
        <div className="w-[90%] md:w-4/5 xl:w-3/5 flex flex-col md:flex-row md:space-x-12">
          <div className="w-full md:w-1/2 my-auto flex flex-col">
            <span className="silka-bold text-[11px] text-[#FF623D]">
              TRY DISPERSE
            </span>
            <h2 className="text-3xl mt-4 xl:text-4xl silka-bold text-[#363636]">
              The Ultimate Distribution Platform
            </h2>
            <p className="mt-4 silka-regular text-sm xl:text-base text-gray-400">
              Organic is the ultimate distribution channel as your
              brand builds immense trust within a community with an
              incredibly low customer acquisition cost.
            </p>
            <Link href="/signup">
              <button className="mt-6 w-fit px-5 py-1.5 rounded bg-[#FF623D] text-xs silka-medium text-white transition-all delay-100 ease-in-out hover:opacity-90">
                Use Disperse Free
              </button>
            </Link>
          </div>
          <div className="w-full md:w-1/2 mt-8 md:my-auto">
            <Image src={BusinessImage} alt="Repurpose Your Content" />
          </div>
        </div>
      </div>
      <div className="w-[90%] md:w-[75%] lg:w-3/5 xl:w-1/2 flex flex-row py-12 md:py-16">
        <div className="w-1/5 flex flex-col justify-center items-center my-auto">
          <img
            src="/images/tools/axel.png"
            className="h-[12px] md:h-[20px]"
          />
        </div>
        <div className="w-1/5 flex flex-col justify-center items-center my-auto">
          <img
            src="/images/tools/shein.png"
            className="h-[10px] md:h-[18px]"
          />
        </div>
        <div className="w-1/5 flex flex-col justify-center items-center my-auto">
          <img
            src="/images/tools/usc.png"
            className="h-[20px] md:h-[36px]"
          />
        </div>
        <div className="w-1/5 flex flex-col justify-center items-center my-auto">
          <img
            src="/images/tools/ufc.png"
            className="h-[26px] md:h-[46px]"
          />
        </div>
        <div className="w-1/5 flex flex-col justify-center items-center my-auto">
          <img
            src="/images/tools/lvmh.png"
            className="h-[10px] md:h-[18px]"
          />
        </div>
      </div>
      <div className="mt-12 w-[95%] md:w-3/4 xl:w-3/5 flex flex-col justify-center items-center">
        <h2 className="text-2xl text-center md:text-4xl silka-bold text-[#363636]">
          {info_header}
        </h2>
        <div className="flex w-full mt-5 md:mt-10 flex-col space-y-6 md:space-y-0 md:flex-row md:space-x-12">
          <div className="w-full md:w-1/2 flex flex-col text-gray-500 text-sm text-center silka-regular">
            {info_content1}
          </div>
          <div className="w-full md:w-1/2 flex flex-col text-gray-500 text-sm text-center silka-regular">
            {info_content2}
          </div>
        </div>
      </div>
      <div className="flex w-[95%] md:w-3/4 xl:w-3/5 flex-col md:flex-row mt-20 md:mt-28 md:space-x-12">
        <div className="my-auto w-full md:w-1/2 flex flex-col justify-center items-center md:justify-start md:items-start">
          <img
            src={content1.image}
            className="max-h-[300px] w-fit rounded-lg"
          />
        </div>
        <div className="flex flex-col w-full md:w-1/2 mt-10 md:my-auto">
          <h2 className="text-3xl silka-bold text-[#363636]">
            {content1.title}
          </h2>
          <p className="mt-4 silka-regular text-sm text-gray-500">
            {content1.description}
          </p>
        </div>
      </div>
      <div className="flex w-[95%] md:w-3/4 xl:w-3/5 flex-col-reverse mt-20 md:mt-24 md:flex-row md:space-x-12">
        <div className="flex flex-col md:w-1/2 mt-10 md:my-auto w-full">
          <h2 className="text-3xl silka-bold text-[#363636]">
            {content2.title}
          </h2>
          <p className="mt-4 silka-regular text-sm text-gray-500">
            {content2.description}
          </p>
        </div>
        <div className="md:w-1/2 flex flex-col w-full my-auto justify-center items-center md:justify-start md:items-start">
          <img
            src={content2.image}
            className="max-h-[300px] w-fit rounded-lg"
          />
        </div>
      </div>
      <div className="w-[95%] md:w-3/4 xl:w-3/5 mt-20 md:mt-24 pb-2 md:pb-6 flex flex-col md:flex-row md:space-x-12">
        <div className="my-auto w-full md:w-1/2 flex flex-col justify-center items-center md:justify-start md:items-start">
          <img
            src={content3.image}
            className="max-h-[300px] w-fit rounded-lg"
          />
        </div>
        <div className="flex flex-col w-full md:w-1/2 mt-10 md:my-auto">
          <h2 className="text-3xl silka-bold text-[#363636]">
            {content3.title}
          </h2>
          <p className="mt-4 silka-regular text-sm text-gray-500">
            {content3.description}
          </p>
        </div>
      </div>
      <div className="pt-24 md:pt-28 flex flex-col justify-center items-center w-[90%] md:w-3/5 xl:w-1/2">
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
          {faqs?.map((value: any, index: number) => {
            return <QuestionAndAnswer value={value} key={index} />;
          })}
        </div>
      </div>
      <div className="py-24 md:py-28 flex flex-col justify-center items-center w-full">
        <div className="w-[90%] lg:w-4/5 xl:w-3/5 bg-[#FF623D] p-8 md:p-12 rounded-xl flex flex-col md:flex-row">
          <div className="flex flex-col w-full md:w-1/2 my-auto">
            <h2 className="silka-bold text-white text-3xl">
              Use Disperse For Free!
            </h2>
            <p className="mt-4 silka-medium text-gray-200 text-sm">
              Try Disperse&apos;s automations, analytics, scheduling,
              and virality tools for free. No credit card required or
              any other gimmicks.
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
    </div>
  );
}
