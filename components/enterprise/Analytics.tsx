import { CheckMarkGreen } from '../icons/CheckMark';
import Image from 'next/image';

export function Analytics() {
  return (
    <div className="mt-32 flex flex-col justify-center items-center">
      <div className="w-1/2 flex flex-row space-x-16">
        <div className="w-3/5">
          <Image
            alt="A picture of all the analytics provided for enterprise users."
            src="/images/enterprise-analytics.png"
            width={780}
            height={437.89}
          />
        </div>
        <div className="w-2/5 flex flex-col justify-center items-start">
          <h2 className="silka-bold text-4xl">Powerful Analytics</h2>
          <p className="mt-4 silka-regular text-sm text-[#525252]">
            The key to becoming customer obessessed is understanding
            the customer. Disperse provides real-time analytics to
            pin-point your customer&apos;s desires.
          </p>
          <ol className="mt-5 flex flex-col space-y-3">
            <div className="flex flex-row space-x-3">
              <div className="p-1 bg-[#BEDACD] rounded-full">
                <CheckMarkGreen />
              </div>
              <li className="silka-medium text-sm my-auto text-[#3F3F3F]">
                Real-time Data
              </li>
            </div>
            <div className="flex flex-row space-x-3">
              <div className="p-1 bg-[#BEDACD] rounded-full">
                <CheckMarkGreen />
              </div>
              <li className="silka-medium text-sm my-auto text-[#3F3F3F]">
                Benchmarking
              </li>
            </div>
            <div className="flex flex-row space-x-3">
              <div className="p-1 bg-[#BEDACD] rounded-full">
                <CheckMarkGreen />
              </div>
              <li className="silka-medium text-sm my-auto text-[#3F3F3F]">
                Acquisition
              </li>
            </div>
          </ol>
        </div>
      </div>
    </div>
  );
}
