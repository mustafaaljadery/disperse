import Link from 'next/link';
import { RightArrowSmall } from '../icons/RightArrow';
import Image from 'next/image';
import { CheckMarkPurple } from '../icons/CheckMark';

export function Virality() {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="w-11/12 lg:w-1/2 flex flex-col">
        <p className="text-sm lg:text-lg silka-semibold text-center">
          MEDIA MACHINE
        </p>
        <h2 className="text-4xl lg:text-5xl silka-semibold mt-2 lg:mt-4 text-center">
          Virality as a Service
        </h2>
        <p className="silka-medium text-sm lg:text-lg mt-4 lg:mt-6 text-center">
          <span className="silka-semibold">Animate</span>,
          <span className="silka-semibold">Edit</span>, &amp;{' '}
          <span className="silka-semibold">Optimize</span> your
          content in Disperse&apos;s all-in-one platform.
        </p>
        <div className="mt-8 lg:mt-12 border border-[#999999] rounded-xl lg:rounded-2xl w-full flex flex-col lg:flex-row">
          <div className="w-fulllg:w-3/5">
            <img
              alt="A picture of how Disperse helps with virality."
              src="/images/virality.png"
            />
          </div>
          <div className="w-full lg:w-2/5 flex flex-col justify-center items-center mt-2 lg:mt-0 px-2 lg:px-8">
            <div>
              <p className="silka-regular text-[#3F3F3F] text-sm">
                Virality is the ability to break throught he noise and
                make something truly great that captures the
                audience&apos;s attention.
              </p>
              <ol className="list-decimal flex flex-col space-y-5 mt-6 lg:mt-8">
                <div className="flex flex-row space-x-4">
                  <div className="rounded-full p-1.5 bg-[#BBC3ED] my-auto">
                    <CheckMarkPurple />
                  </div>
                  <p className="silka-medium text-[#3F3F3F] text-sm lg:text-base my-auto">
                    Auto Caption, Text to Speech
                  </p>
                </div>
                <div className="flex flex-row space-x-4">
                  <div className="rounded-full p-1.5 bg-[#BBC3ED] my-auto">
                    <CheckMarkPurple />
                  </div>
                  <p className="silka-medium text-[#3F3F3F] text-sm lg:text-base my-auto">
                    Collaborate with Others
                  </p>
                </div>
                <div className="flex flex-row space-x-4">
                  <div className="rounded-full p-1.5 bg-[#BBC3ED] my-auto">
                    <CheckMarkPurple />
                  </div>
                  <p className="silka-medium text-[#3F3F3F] text-sm lg:text-base my-auto">
                    World Class Animation
                  </p>
                </div>
              </ol>
              <Link href="/signup" legacyBehavior>
                <div className="flex flex-row space-x-2 w-fit h-fit mt-6 mb-6 lg:mb-0 lg:mt-8 border border-[#E7E7E7] rounded py-1.5 px-4">
                  <Link href="/signup" className="silka-medium text-[#646464] text-xs">
                    
                      Get Started
                    
                  </Link>
                  <RightArrowSmall />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
