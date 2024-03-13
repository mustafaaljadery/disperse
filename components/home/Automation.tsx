import { DisperseLogoSmall } from '../logos/DisperseLogo';
import { SlackLogo } from '../logos/SlackLogo';
import { TwitterLogo } from '../logos/TwitterLogo';

export function Automation() {
  return (
    <div className="hidden lg:flex flex-col justify-center items-center">
      <div className="flex flex-col w-1/2">
        <p className="silka-medium">PRODUCTION WORKSPACE</p>
        <h2 className="text-6xl silka-semibold w-1/2 mt-4">
          A Case Against Busywork
        </h2>
        <p className="text-[#696969] silka-regular mt-6 text-xl">
          Save your team time by automating your posting, and
          interations with other workspace applications.
        </p>
        <div className="flex flex-row space-x-12 mt-16">
          <div className="flex flex-col space-y-2.5 w-1/3">
            <p className="silka-medium text-2xl">Workflow Trigger</p>
            <p className="silka-regular text-[#656565] text-sm">
              Once a specific event happens in your application, or a
              metric is reached. Disperse automatically starts the
              worflow.
            </p>
            <div></div>
          </div>
          <div className="flex flex-col space-y-2.5 w-1/3">
            <p className="silka-medium text-2xl">Notify Team</p>
            <p className="silka-regular text-[#656565] text-sm">
              Your team is notified that the trigger happens. You can
              skip this step in Disperse&apos;s settings if you
              don&apos;t think it is necessary.
            </p>
            <div></div>
          </div>
          <div className="flex flex-col space-y-2.5 w-1/3">
            <p className="silka-medium text-2xl">Auto Execute</p>
            <p className="silka-regular text-[#656565] text-sm">
              Whatever task you set once the trigger happens executes.
              In the example, once a private message is sent to your
              twitter account, Disperse automatically responses to
              them.
            </p>
          </div>
        </div>
        <div className="flex flex-row space-x-12 mt-8">
          <div className="flex flex-row space-x-5 w-1/3 border py-2 px-4 rounded-xl border-dashed">
            <TwitterLogo />
            <div className="flex flex-col space-y-1 my-auto">
              <p className="text-xs silka-semibold text-[#646464]">
                TRIGGER
              </p>
              <p className="silka-medium text-sm">
                Received new private message on Twitter.
              </p>
            </div>
          </div>
          <div className="flex flex-row space-x-5 w-1/3 border py-2 px-4 rounded-xl border-dashed">
            <SlackLogo />
            <div className="flex flex-col space-y-1 my-auto">
              <p className="text-xs silka-semibold text-[#646464]">
                NOTIFY
              </p>
              <p className="silka-medium text-sm">
                Send a message to team on Slack.
              </p>
            </div>
          </div>
          <div className="flex flex-row space-x-5 w-1/3 border py-2 px-4 rounded-xl border-dashed">
            <DisperseLogoSmall />
            <div className="flex flex-col space-y-1 my-auto">
              <p className="text-xs silka-semibold text-[#646464]">
                AUTOMATE
              </p>
              <p className="silka-medium text-sm">
                Send an automatic private message back to user.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
