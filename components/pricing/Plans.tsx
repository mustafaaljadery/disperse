import Link from 'next/link';

export function Plans() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-11/12 lg:w-[70%] mt-12 lg:mt-20 flex flex-row flex-wrap md:flex-nowrap lg:space-x-3">
        <div className="w-full mb-6 lg:mb-0 lg:w-1/4 h-full rounded-xl p-4 border space-y-3">
          <div className="bg-[#B3ABC5] py-1 px-3 w-fit h-fit rounded">
            <p className="silka-medium text-[#422C6D]">Starter</p>
          </div>
          <h3 className="text-4xl text-[#422C6D] silka-semibold">
            Starter
          </h3>
          <p className="silka-regular text-[#777777] text-sm">
            Entry level use of Disperse, for those just beginning
            working on their socials.
          </p>
          <p className="text-5xl silka-semibold">
            $0 <span className="text-base silka-regular">/month</span>
          </p>
          <div className="flex flex-col space-y-1">
            <p className="silka-regular text-xs hidden lg:flex invisible">
              s
            </p>
            <p className="silka-medium text-xs hidden lg:flex invisible">
              s
            </p>
          </div>
          <hr />
          <div className="hidden lg:flex flex-col space-y-1">
            <p className="silka-semibold">3 Guests</p>
            <p className="silka-regular text-sm">
              Work on your workspace with others
            </p>
          </div>
          <div className="hidden lg:flex flex-col space-y-1">
            <p className="silka-semibold">
              2 GB <span className="silka-medium">media store</span>
            </p>
            <p className="silka-regular text-sm">
              Active storage for your media
            </p>
          </div>
          <div className="hidden lg:flex flex-col space-y-1">
            <p className="silka-semibold">
              100{' '}
              <span className="silka-medium">
                automations<span className="text-xs">/mo</span>
              </span>
            </p>
            <p className="silka-regular text-sm">
              Workflow automation for your workspace
            </p>
          </div>
          <div className="hidden lg:flex flex-col space-y-1">
            <p className="silka-semibold">6 Socials</p>
            <p className="silka-regular text-sm">
              Social accounts to connect
            </p>
          </div>
          <Link href="/signup" legacyBehavior>
            <button className="w-full text-center silka-semibold text-white bg-[#422C6D] rounded-lg py-2 hover:opacity-90">
              Get Started
            </button>
          </Link>
        </div>
        <div className="w-full mb-6 lg:mb-0 lg:w-1/4 h-full p-4 flex flex-col border space-y-3 rounded-xl">
          <div className="bg-[#99C5B0] py-1 px-3 w-fit h-fit rounded">
            <p className="silka-medium text-[#006D3A]">Pro</p>
          </div>
          <h3 className="text-4xl text-[#006D3A] silka-semibold">
            Pro
          </h3>
          <p className="silka-regular text-[#777777] text-sm">
            For individuals focused on posting the highest quality
            content possible.
          </p>
          <p className="text-5xl silka-semibold">
            $29{' '}
            <span className="text-base silka-regular">/month</span>
          </p>
          <div className="flex flex-col space-y-1">
            <p className="text-xs silka-regular">billed annually</p>
            <p className="text-xs silka-regular">
              <span className="silka-medium">$39</span> billed monthly
            </p>
          </div>

          <hr />
          <div className="hidden lg:flex flex-col space-y-1">
            <p className="silka-semibold">5 Guests</p>
            <p className="silka-regular text-sm">
              Work on your workspace with others
            </p>
          </div>
          <div className="hidden lg:flex flex-col space-y-1">
            <p className="silka-semibold">
              200 GB <span className="silka-medium">media store</span>
            </p>
            <p className="silka-regular text-sm">
              Active storage for your media
            </p>
          </div>
          <div className="hidden lg:flex flex-col space-y-1">
            <p className="silka-semibold">1K automations/mo</p>
            <p className="silka-regular text-sm">
              Workflow automation for your workspace
            </p>
          </div>
          <div className="hidden lg:flex flex-col space-y-1">
            <p className="silka-semibold">Unlimited Socials</p>
            <p className="silka-regular text-sm">
              Social accounts to connect
            </p>
          </div>
          <Link href="/signup" legacyBehavior>
            <button className="w-full text-white text-center silka-semibold bg-[#006D3A] rounded-lg py-2 hover:opacity-90">
              Choose Plan
            </button>
          </Link>
        </div>
        <div className="w-full mb-6 lg:mb-0 md:w-1/4 h-full p-4 flex flex-col border space-y-3 rounded-xl">
          <div className="bg-[#9AC6FA] py-1 px-3 w-fit h-fit rounded">
            <p className="silka-medium text-[#0270F3]">Business</p>
          </div>
          <h3 className="text-4xl text-[#0270F3] silka-semibold">
            Team
          </h3>
          <p className="silka-regular text-[#777777] text-sm">
            For teams working together on a content strategy for their
            business.
          </p>
          <p className="text-5xl silka-semibold">
            $39{' '}
            <span className="text-base silka-regular">
              /user per month
            </span>
          </p>
          <div className="flex flex-col space-y-1">
            <p className="silka-regular text-xs">billed annually</p>
            <p className="silka-regular text-xs">
              <span className="silka-medium">$49</span> billed monthly
            </p>
          </div>
          <hr />
          <div className="hidden lg:flex flex-col space-y-1">
            <p className="silka-semibold">Unlimited Collaborators</p>
            <p className="silka-regular text-sm">
              Work on your workspaces with others
            </p>
          </div>
          <div className="hidden lg:flex flex-col space-y-1">
            <p className="silka-semibold">
              500 GB <span className="silka-medium">media store</span>
            </p>
            <p className="silka-regular text-sm">
              Active storage for your media
            </p>
          </div>
          <div className="hidden lg:flex flex-col space-y-1">
            <p className="silka-semibold">
              3K automations<span className="silka-medium">/mo</span>
            </p>
            <p className="silka-regular text-sm">
              Workflow automation for your workspace
            </p>
          </div>
          <div className="hidden lg:flex flex-col space-y-1">
            <p className="silka-semibold">Unlimited Socials</p>
            <p className="silka-regular text-sm">
              Social accounts to connect
            </p>
          </div>
          <Link href="/signup" legacyBehavior>
            <button className="w-full text-center silka-semibold text-white bg-[#0270F3] rounded-lg py-2 hover:opacity-90">
              Choose Plan
            </button>
          </Link>
        </div>
        <div className="w-full mb-6 lg:mb-0 md:w-1/4 h-full p-4 flex flex-col border space-y-3 rounded-xl">
          <div className="bg-[#E2ABA1] py-1 px-3 w-fit h-fit rounded">
            <p className="silka-medium text-[#B62D13]">Enterprise</p>
          </div>
          <h3 className="text-4xl text-[#B62D13] silka-semibold">
            Enterprise
          </h3>
          <p className="silka-regular text-[#777777] text-sm">
            For large teams or agencies working with multiple
            creators.
          </p>
          <p className="text-5xl silka-semibold">
            Custom{' '}
            <span className="text-base silka-regular">/month</span>
          </p>
          <div className="flex flex-col space-y-1">
            <p className="silka-regular text-xs hidden lg:flex invisible">
              s
            </p>
            <p className="silka-medium text-xs hidden lg:flex invisible">
              s
            </p>
          </div>
          <hr />
          <div className="hidden lg:flex flex-col space-y-1">
            <p className="silka-semibold">Unlimited Collaborators</p>
            <p className="silka-regular text-sm">
              Work on your workspaces with others
            </p>
          </div>
          <div className="hidden lg:flex flex-col space-y-1">
            <p className="silka-semibold">
              2 TB <span className="silka-medium">media store</span>
            </p>
            <p className="silka-regular text-sm">
              Active storage for your media
            </p>
          </div>
          <div className="hidden lg:flex flex-col space-y-1">
            <p className="silka-semibold">
              10K <span className="silka-medium">automations/mo</span>
            </p>
            <p className="silka-regular text-sm">
              Workflow automation for your workspace
            </p>
          </div>
          <div className="hidden lg:flex flex-col space-y-1">
            <p className="silka-semibold">Unlimited Socials</p>
            <p className="silka-regular text-sm">
              Social accounts to connect
            </p>
          </div>
          <Link href="/contact-sales" legacyBehavior>
            <button className="w-full text-center silka-semibold text-white bg-[#B62D13] rounded-lg py-2 hover:opacity-90">
              Contact Sales
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
