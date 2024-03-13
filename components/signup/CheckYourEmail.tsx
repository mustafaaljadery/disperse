import { DisperseLogoNormal } from '../logos/DisperseLogo';
import { GmailLogo } from '../logos/GmailLogo';
import { OutlookLogo } from '../logos/OutlookLogo';

export function CheckYourEmail() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-2/5 h-[100vh] flex flex-col justify-center items-center">
        <DisperseLogoNormal />
        <h1 className="mt-8 silka-semibold text-4xl text-center">
          Check Your Email
        </h1>
        <p className="text-center mt-6 silka-medium text-[#545454]">
          We just sent a code to max@trydisperse.com. Enter the code
          below.
        </p>
        <form></form>
        <div className="flex flex-row space-x-12">
          <div className="flex flex-row space-x-3">
            <GmailLogo />
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://mail.google.com/"
              className="my-auto silka-regular"
            >
              Open Gmail
            </a>
          </div>
          <div className="flex flex-row space-x-3">
            <OutlookLogo />
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://outlook.live.com/"
              className="my-auto silka-regular"
            >
              Open Outlook
            </a>
          </div>
        </div>
        <p className="mt-12 silka-medium text-[#4D4D4D]">
          Can&apos;t find your code? Check spam!
        </p>
      </div>
    </div>
  );
}
