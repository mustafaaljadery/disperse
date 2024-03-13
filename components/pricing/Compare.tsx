import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import cx from 'classnames';

interface EntryProps {
  title: string;
  information: string;
  starter: string | JSX.Element;
  pro: string | JSX.Element;
  team: string | JSX.Element;
  enterprise: string | JSX.Element;
}

interface HeaderProps {
  headerTitle: string;
}

interface CheckMarkProps {
  section: string;
}

interface AdditionalPricingProps {
  title: string;
  information: string;
}

function AdditionalPricing({
  title,
  information,
}: AdditionalPricingProps) {
  return (
    <div className="flex flex-col justify-center items-center w-1/6">
      <div className="flex flex-row space-x-2">
        <p className="silka-medium">{title}</p>
        <HoverCardPrimitive.Root>
          <HoverCardPrimitive.Trigger asChild>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="my-auto"
            >
              <g clipPath="url(#clip0_350_19)">
                <path
                  d="M6 1C8.757 1 11 3.243 11 6C11 8.757 8.757 11 6 11C3.243 11 1 8.757 1 6C1 3.243 3.243 1 6 1ZM6 0C2.6865 0 0 2.6865 0 6C0 9.3135 2.6865 12 6 12C9.3135 12 12 9.3135 12 6C12 2.6865 9.3135 0 6 0ZM8 7.0415C8 5.969 6.884 5.6705 6.0285 5.2685C5.509 4.9985 5.5745 4.354 6.319 4.3105C6.732 4.2855 7.1565 4.408 7.5405 4.543L7.7215 3.7195C7.268 3.5815 6.862 3.5185 6.5 3.509V3H6V3.5335C5.0275 3.667 4.508 4.277 4.508 4.9585C4.508 6.1775 5.9315 6.3635 6.397 6.58C7.032 6.864 6.9145 7.455 6.34 7.5855C5.8415 7.6985 5.2055 7.5015 4.7275 7.3155L4.5 8.1375C4.947 8.3685 5.4825 8.4915 6 8.501V9H6.5V8.4735C7.3285 8.3575 8.001 7.9005 8 7.0415V7.0415Z"
                  fill="#969696"
                />
              </g>
              <defs>
                <clipPath id="clip0_350_19">
                  <rect width="12" height="12" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </HoverCardPrimitive.Trigger>
          <HoverCardPrimitive.Content
            align="center"
            sideOffset={4}
            className={cx(
              'radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
              'max-w-md rounded-lg p-4 md:w-full',
              'bg-[#F9F9F9]',
              'focus:outlien-none focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
            )}
          >
            <HoverCardPrimitive.Arrow className="fill-current text-white" />

            <div className="flex h-full w-full space-x-4">
              <p className="text-xs silka-medium">{information}</p>
            </div>
          </HoverCardPrimitive.Content>
        </HoverCardPrimitive.Root>
      </div>
    </div>
  );
}

function CheckMark({ section }: CheckMarkProps) {
  return (
    <div className="flex flex-col justify-center items-center w-1/6">
      <div
        className={
          `p-2 rounded-full h-fit w-fit ` +
          (section == 'starter'
            ? 'bg-[#B3ABC5]'
            : section == 'pro'
            ? 'bg-[#99C5B0]'
            : section == 'team'
            ? 'bg-[#9AC6FA]'
            : 'bg-[#E2ABA1]')
        }
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_339_2)">
            <path
              d="M5.25001 12.8334L-0.583328 6.65125L1.04884 4.9835L5.21909 9.34275L12.8864 1.16675L14.5833 2.80358L5.25001 12.8334Z"
              fill={
                section == 'starter'
                  ? '#422C6D'
                  : section == 'pro'
                  ? '#006D3A'
                  : section == 'team'
                  ? '#0270F3'
                  : '#B62D13'
              }
            />
          </g>
          <defs>
            <clipPath id="clip0_339_2">
              <rect width="14" height="14" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Header({ headerTitle }: HeaderProps) {
  return (
    <div className="w-full flex flex-row mb-4 mt-16">
      <p className="silka-semibold w-1/3 text-lg text-[#646464]">
        {headerTitle}
      </p>
      <p className="silka-semibold w-1/6 text-lg text-center text-[#422C6D]">
        STARTER
      </p>
      <p className="silka-semibold w-1/6 text-lg text-center text-[#006D3A]">
        PRO
      </p>
      <p className="silka-semibold w-1/6 text-lg text-center text-[#0270F3]">
        TEAM
      </p>
      <p className="silka-semibold w-1/6 text-lg text-center text-[#B62D13]">
        ENTERPRISE
      </p>
    </div>
  );
}

function Entry({
  title,
  information,
  starter,
  pro,
  team,
  enterprise,
}: EntryProps) {
  return (
    <div className="w-full flex flex-col space-y-4">
      <hr />
      <div className="w-full flex flex-row">
        <div className="flex flex-row space-x-2 w-1/3">
          <p className="silka-medium my-auto">{title}</p>
          <HoverCardPrimitive.Root>
            <HoverCardPrimitive.Trigger asChild>
              <div className="my-auto">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_341_4)">
                    <path
                      d="M6.625 3.5C6.625 3.845 6.345 4.125 6 4.125C5.655 4.125 5.375 3.845 5.375 3.5C5.375 3.155 5.655 2.875 6 2.875C6.345 2.875 6.625 3.155 6.625 3.5ZM12 6C12 9.3135 9.3135 12 6 12C2.6865 12 0 9.3135 0 6C0 2.6865 2.6865 0 6 0C9.3135 0 12 2.6865 12 6ZM11 6C11 3.243 8.757 1 6 1C3.243 1 1 3.243 1 6C1 8.757 3.243 11 6 11C8.757 11 11 8.757 11 6ZM4.5 5V6H5.5V9H6.5V5H4.5Z"
                      fill="#626262"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_341_4">
                      <rect width="12" height="12" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </HoverCardPrimitive.Trigger>
            <HoverCardPrimitive.Content
              align="center"
              sideOffset={4}
              className={cx(
                'radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
                'max-w-md rounded-lg p-4 md:w-full',
                'bg-[#F9F9F9]',
                'focus:outlien-none focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
              )}
            >
              <HoverCardPrimitive.Arrow className="fill-current text-white" />

              <div className="flex h-full w-full space-x-4">
                <p className="text-xs silka-medium">{information}</p>
              </div>
            </HoverCardPrimitive.Content>
          </HoverCardPrimitive.Root>
        </div>
        {typeof starter == 'string' ? (
          <p className="w-1/6 my-auto silka-medium text-center text-[#333333]">
            {starter}
          </p>
        ) : (
          starter
        )}
        {typeof pro == 'string' ? (
          <p className="w-1/6 my-auto silka-medium text-center text-[#333333]">
            {pro}
          </p>
        ) : (
          pro
        )}
        {typeof team == 'string' ? (
          <p className="w-1/6 my-auto silka-medium text-center text-[#333333]">
            {team}
          </p>
        ) : (
          team
        )}
        {typeof enterprise == 'string' ? (
          <p className="w-1/6 my-auto silka-medium text-center text-[#333333]">
            {enterprise}
          </p>
        ) : (
          enterprise
        )}
      </div>
    </div>
  );
}

export function Compare() {
  return (
    <div className="hidden lg:flex flex-col justify-center items-center mt-20">
      <div className="w-3/5 flex flex-col justify-center items-center mt-16">
        <h2 className="text-5xl silka-semibold text-[#3F3F3F]">
          Compare Plans
        </h2>
        <p className="silka-medium text-gray-600 mt-4">
          Find the best plan for your needs!
        </p>
        <div className="w-full flex flex-col">
          <Header headerTitle="Media" />
          <div className="flex flex-col space-y-4">
            <Entry
              title="Workspaces"
              information="The number of active Disperse workspaces."
              starter="1"
              pro="Unlimited"
              team="Unlimited"
              enterprise="Unlimited"
            />
            <Entry
              title="Active Storage"
              information="Total amount of storage in your workspace."
              starter={
                <AdditionalPricing
                  title="2GB"
                  information="+$10 for every additional 200GB"
                />
              }
              pro={
                <AdditionalPricing
                  title="200GB"
                  information="+$10 for every additional 200GB"
                />
              }
              team={
                <AdditionalPricing
                  title="500GB"
                  information="+$10 for every additional 200GB"
                />
              }
              enterprise="Custom"
            />
            <Entry
              title="Integrations"
              information="Disperse's custom built integrations with other popular tools."
              starter={<CheckMark section="starter" />}
              pro={<CheckMark section="pro" />}
              team={<CheckMark section="team" />}
              enterprise={<CheckMark section="enterprise" />}
            />
            <Entry
              title="File Transfer"
              information="Ability to transfer files to other users."
              starter={<CheckMark section="starter" />}
              pro={<CheckMark section="pro" />}
              team={<CheckMark section="team" />}
              enterprise={<CheckMark section="enterprise" />}
            />
          </div>
          <Header headerTitle="Socials" />
          <div className="flex flex-col space-y-4">
            <Entry
              title="Social Accounts"
              information="The social connections. Users get one for each of the socials Disperse provides."
              starter="6"
              pro="Unlimited"
              team="Unlimited"
              enterprise="Unlimited"
            />
            <Entry
              title="Scheduling"
              information="Schedule your content to be posted at a specific time."
              starter={<CheckMark section="starter" />}
              pro={<CheckMark section="pro" />}
              team={<CheckMark section="team" />}
              enterprise={<CheckMark section="enterprise" />}
            />
            <Entry
              title="Automations"
              information="Automates that can be done for your social application."
              starter="Limited"
              pro={<CheckMark section="pro" />}
              team={<CheckMark section="team" />}
              enterprise={<CheckMark section="enterprise" />}
            />
            <Entry
              title="Advanced Analytics"
              information="Analytics on your account and individual posts."
              starter=" "
              pro={<CheckMark section="pro" />}
              team={<CheckMark section="team" />}
              enterprise={<CheckMark section="enterprise" />}
            />
            <Entry
              title="Social Inbox"
              information="Reply to messages in your inbox directly from Disperse."
              starter=" "
              pro={<CheckMark section="pro" />}
              team={<CheckMark section="team" />}
              enterprise={<CheckMark section="enterprise" />}
            />
            <Entry
              title="Team Assignments"
              information="Assign tasks for different team members."
              starter=" "
              pro=" "
              team={<CheckMark section="team" />}
              enterprise={<CheckMark section="enterprise" />}
            />
          </div>
          <Header headerTitle="Automations" />
          <div className="flex flex-col space-y-4">
            <Entry
              title="Tasks"
              information="These are the number of concurrent tasks that are waiting for your certain automtion trigger."
              starter="5"
              pro="Unlimited"
              team="Unlimited"
              enterprise="Unlimited"
            />
            <Entry
              title="Actions"
              information="Once a successful automation is finished, this number will increase by one."
              starter={
                <AdditionalPricing
                  title="100"
                  information="+$10 per 1K additional automations"
                />
              }
              pro={
                <AdditionalPricing
                  title="1k"
                  information="+$10 per 1K additional automations"
                />
              }
              team={
                <AdditionalPricing
                  title="5k"
                  information="+$10 per 1K additional automations"
                />
              }
              enterprise="Unlimtied"
            />
            <Entry
              title="Polling Time"
              information="The time that each task loop executes at."
              starter="15 mins"
              pro="5 mins"
              team="2 mins"
              enterprise="1 min"
            />
            <Entry
              title="Multi-step Automations"
              information="Automations that require more than one trigger or action."
              starter=" "
              pro={<CheckMark section="pro" />}
              team={<CheckMark section="team" />}
              enterprise={<CheckMark section="enterprise" />}
            />
            <Entry
              title="Data Transfer"
              information="Ability to transfer automation data to different applications."
              starter=" "
              pro={<CheckMark section="pro" />}
              team={<CheckMark section="team" />}
              enterprise={<CheckMark section="enterprise" />}
            />
          </div>
          <Header headerTitle="Team" />
          <div className="flex flex-col space-y-4">
            <Entry
              title="Team Members"
              information="The number of people in your workspace."
              starter="1"
              pro="1"
              team="Unlimited"
              enterprise="Unlimtied"
            />
            <Entry
              title="Guests"
              information="The number of guests in your workspace. These people can only view your workspace."
              starter="3"
              pro="5"
              team="Unlimited"
              enterprise="Unlimited"
            />
            <Entry
              title="Version History"
              information="The version history of all the team activity."
              starter="1 Week"
              pro="Full"
              team="Full"
              enterprise="Full"
            />
            <Entry
              title="Link File Sharing"
              information="Ability to share files to anyone with a link from Disperse."
              starter={<CheckMark section="starter" />}
              pro={<CheckMark section="pro" />}
              team={<CheckMark section="team" />}
              enterprise={<CheckMark section="enterprise" />}
            />
            <Entry
              title="Real-time Collaboration"
              information="Collaboration with your team that happens in real-time."
              starter=" "
              pro=" "
              team={<CheckMark section="team" />}
              enterprise={<CheckMark section="enterprise" />}
            />
          </div>
          <Header headerTitle="Security" />
          <div className="flex flex-col space-y-4">
            <Entry
              title="HTTPS/SSL"
              information="Typical encryption for web applications."
              starter={<CheckMark section="starter" />}
              pro={<CheckMark section="pro" />}
              team={<CheckMark section="team" />}
              enterprise={<CheckMark section="enterprise" />}
            />
            <Entry
              title="File Password Protection"
              information="Protect files that are being shared with a password."
              starter=" "
              pro={<CheckMark section="pro" />}
              team={<CheckMark section="team" />}
              enterprise={<CheckMark section="enterprise" />}
            />
            <Entry
              title="Account roles and permissions"
              information="Assign different roles and permissions to different users on your team."
              starter=" "
              pro=" "
              team={<CheckMark section="team" />}
              enterprise={<CheckMark section="enterprise" />}
            />
            <Entry
              title="SAML Single-Sign On"
              information="For enterprise that want even more security."
              starter=" "
              pro=" "
              team=" "
              enterprise={<CheckMark section="enterprise" />}
            />
          </div>
          <Header headerTitle="Support" />
          <div className="flex flex-col space-y-4">
            <Entry
              title="Email Support"
              information="Contact us through email and we will get back to you as soon as possible."
              starter={<CheckMark section="starter" />}
              pro={<CheckMark section="pro" />}
              team={<CheckMark section="team" />}
              enterprise={<CheckMark section="enterprise" />}
            />
            <Entry
              title="Priority Support"
              information="Recieve extremely fast support."
              starter=" "
              pro={<CheckMark section="pro" />}
              team={<CheckMark section="team" />}
              enterprise={<CheckMark section="enterprise" />}
            />
            <Entry
              title="Dedicated Technical Suppport"
              information="Dedicated technial support ready to answer your questions 24/7."
              starter=" "
              pro=" "
              team={<CheckMark section="team" />}
              enterprise={<CheckMark section="enterprise" />}
            />
            <Entry
              title="Onboarding Support"
              information="Your own personalized dashboard made to your by an expert from the Disperse team."
              starter=" "
              pro=" "
              team=" "
              enterprise={<CheckMark section="enterprise" />}
            />
            <Entry
              title="Custom Billing/Invoice"
              information="Setup custom billing and invoicing plans."
              starter=" "
              pro=" "
              team=" "
              enterprise={<CheckMark section="enterprise" />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
