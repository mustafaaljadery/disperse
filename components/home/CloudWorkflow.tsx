import Image from 'next/image';
import Link from 'next/link';

export function CloudWorkflow() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-11/12 lg:w-2/3 2xl:w-1/2 flex flex-col justify-start items-start">
        <Image
          alt="A picture of the cloud features provided by Disperse."
          src="/images/CloudBasedWorkflow.png"
          height={640}
          width={1140}
        />
        <h2 className="text-2xl lg:text-4xl silka-semibold mt-8 lg:mt-12">
          Cloud-based Media Workflow
        </h2>
        <p className="silka-regular mt-4 text-sm lg:text-lg">
          Designed for iterations whilst interacting with your
          favorite tools. Store all your media in our cloud for
          extremely quick management.
        </p>
        <div className="px-4 py-1 border border-[#DADADA] rounded-lg mt-6">
          <Link href="/signup" className="text-[#272727] silka-medium">

            <div className="flex flex-row space-x-2 text-xs lg:text-sm 2xl:text-base">
              <span>Try Disperse</span>
            </div>

          </Link>
        </div>
      </div>
    </div>
  );
}
