import { RightArrowGray } from '../icons/RightArrow';
import Image from 'next/image';

export function Distribution() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-11/12 lg:w-3/4 2xl:w-3/5 flex flex-col md:flex-row justify-between items-between md:space-x-10 lg:space-x-16">
        <div className="w-full lg:w-2/5 flex flex-col my-auto">
          <div className="px-2 py-1 bg-[#FF623D] w-fit h-fit rounded">
            <p className="text-xs text-white silka-medium">
              Understand
            </p>
          </div>
          <h2 className="text-2xl lg:text-4xl silka-semibold mt-4">
            The Most Poweful Distribution Platform
          </h2>
          <div className="flex flex-row space-x-3 my-4 lg:my-6">
            <p className="text-sm my-auto lg:text-lg silka-medium">
              Create Once
            </p>
            <RightArrowGray />
            <p className="text-sm my-auto lg:text-lg silka-medium">
              Distribute Everywhere
            </p>
          </div>
          <p className="text-center silka-semibold text-base lg:text-xl mt-4 lg:mt-6 mb-8">
            Why Disperse?
          </p>
          <ol className="list-decimal flex flex-col space-y-6">
            <div className="ml-6 flex flex-col space-y-1">
              <li className="silka-medium text-sm lg:text-base">
                Leverage
              </li>
              <p className="silka-regular text-[#4D4D4D] text-sm lg:text-base">
                No marginal cost of content replication
              </p>
            </div>
            <div className="ml-6 flex flex-col space-y-1">
              <li className="silka-medium text-sm lg:text-base">
                Recommendation Algorithm
              </li>
              <p className="silka-regular text-[#4D4D4D] text-sm lg:text-base">
                Most content on the internet is consumed through a
                recommendation algorithm. Effective distribution is
                the key to take advantage of the recommendation feed.
              </p>
            </div>
          </ol>
        </div>
        <div className="w-full lg:w-3/5 p-8  md:p-0 mt-4 lg:mt-0 flex flex-col justify-center items-end">
          <Image
            alt="A picture of how Disperse helps with distribution on your socials."
            src="/images/Distribute.png"
            height={600 * 0.8}
            width={527 * 0.8}
          />
        </div>
      </div>
    </div>
  );
}
