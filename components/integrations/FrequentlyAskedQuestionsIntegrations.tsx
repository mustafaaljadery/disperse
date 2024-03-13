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
    <div className="flex flex-col w-11/12 lg:w-3/4">
      <div
        onClick={() => {
          setGiveAnswer(!giveAnswer);
        }}
        className={'flex flex-row space-x-5 py-2'}
      >
        <ViewIcon
          className={
            'my-auto ' +
            (giveAnswer ? 'rotate-90 transition-all' : '')
          }
        />
        <p className="text-lg my-auto silka-medium">{question}</p>
      </div>
      <hr />
      {giveAnswer ? (
        <p className="ml-9 mt-4 text-sm lg:text-base silka-regular">
          {answer}
        </p>
      ) : (
        <></>
      )}
    </div>
  );
}

const FAQS = [
  {
    question: 'Test Question',
    answer: 'Some Answer',
  },
];

export function FrequentlyAskedQuestions() {
  return (
    <div className="flex flex-col justify-center items-center mt-20 lg:mt-24 mb-32">
      <div className="flex flex-col w-11/12 lg:w-3/5">
        <h2 className="text-4xl lg:text-5xl silka-semibold text-center">
          Frequently Asked Questions
        </h2>
        <p className="silka-medium lg:text-lg text-center mt-4">
          Need more help?{' '}
          <Link href="/contact" className="underline underline-offset-2 text-[#B62D13]">
            
              Contact Us
            
          </Link>
        </p>
        <div className="mt-12 lg:mt-20 flex flex-col justify-center items-center">
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
