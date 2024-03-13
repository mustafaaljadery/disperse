import * as SliderPrimitive from '@radix-ui/react-slider';
import cx from 'classnames';
import { SetStateAction, Dispatch } from 'react';
import Link from 'next/link';

interface Props {
  plan: number;
  setPlan: Dispatch<SetStateAction<number>>;
  accounts: number;
  setAccounts: Dispatch<SetStateAction<number>>;
  automation: number;
  setAutomation: Dispatch<SetStateAction<number>>;
  storage: number;
  setStorage: Dispatch<SetStateAction<number>>;
}

export function BillingEstimate({
  plan,
  setPlan,
  accounts,
  setAccounts,
  automation,
  setAutomation,
  storage,
  setStorage,
}: Props) {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-[#262626] mt-24 w-full py-20 flex flex-col justify-center items-center">
        <div className="w-11/12 lg:w-3/5">
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-white text-center text-4xl lg:text-6xl silka-semibold">
              Billing Estimate
            </h2>
            <p className="text-white text-center silka-medium text-base lg:text-xl mt-6">
              Know exactly what you will pay each month.
            </p>
            <div className="mt-8 flex flex-row w-72 lg:w-96 bg-[#3E3E3E] rounded-xl">
              <button
                onClick={() => {
                  setPlan(1);
                  setAutomation(100);
                  setAccounts(6);
                  setStorage(2);
                }}
                className={
                  `w-1/3 flex flex-col justify-center items-center rounded-xl text-sm lg:text-lg py-2 silka-semibold ` +
                  (plan == 1
                    ? 'bg-[#ABA0C2] text-[#422C6D]'
                    : 'text-white')
                }
              >
                STARTER
              </button>
              <button
                onClick={() => {
                  setPlan(2);
                  setAutomation(1000);
                  setAccounts(6);
                  setStorage(200);
                }}
                className={
                  `w-1/3 flex flex-col justify-center items-center rounded-xl silka-semibold py-2 text-sm lg:text-lg ` +
                  (plan == 2
                    ? 'text-[#006D3A] bg-[#99C5B0]'
                    : 'text-white')
                }
              >
                PRO
              </button>
              <button
                onClick={() => {
                  setPlan(3);
                  setAutomation(5000);
                  setAccounts(6);
                  setStorage(2000);
                }}
                className={
                  `w-1/3 flex flex-col justify-center items-center rounded-xl silka-semibold py-2 text-sm lg:text-lg ` +
                  (plan == 3
                    ? 'text-[#0270F3] bg-[#9AC6FA]'
                    : 'text-white')
                }
              >
                TEAM
              </button>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row my-16">
            <div className="lg:w-1/2 flex flex-col space-y-14">
              <div className="flex flex-col">
                <p className="text-center lg:text-start text-white silka-medium text-lg">
                  Social Accounts
                </p>
                <p className="text-center lg:text-start silka-regular text-sm text-[#C1C1C1] mt-1">
                  How many social media accounts will you use?
                </p>
                <div className="w-full lg:w-[70%] flex flex-col space-y-4 mt-6">
                  <p className="text-center text-[#049F42] silka-semibold text-lg">
                    {accounts != 21 ? accounts : '20+'} ACCOUNTS
                  </p>
                  <SliderPrimitive.Root
                    defaultValue={[6]}
                    min={6}
                    max={21}
                    step={1}
                    value={[accounts]}
                    aria-label="value"
                    className="relative flex h-5 w-full touch-none items-center"
                    onValueChange={(value) => {
                      setAccounts(value[0]);
                    }}
                  >
                    <SliderPrimitive.Track className="relative h-1.5 w-full grow rounded-full bg-[#545454]">
                      <SliderPrimitive.Range className="absolute h-full rounded-full bg-[#049F42]" />
                    </SliderPrimitive.Track>
                    <SliderPrimitive.Thumb
                      className={cx(
                        'block h-5 w-5 rounded-full bg-[#049F42]',
                        'focus:outline-none focus-visible:ring focus-visible:ring-[#81CFA0] focus-visible:ring-opacity-75'
                      )}
                    />
                  </SliderPrimitive.Root>
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-center lg:text-start text-white silka-medium text-lg">
                  Automation Executions
                </p>
                <p className="text-center lg:text-start silka-regular text-sm text-[#C1C1C1] mt-1">
                  How many automations will you execute a month?
                </p>
                <div className="w-full lg:w-[70%] flex flex-col mt-6 space-y-4">
                  <p className="text-center text-[#2395FF] silka-semibold text-lg">
                    {automation != 26000
                      ? String(automation / 1000) + 'K'
                      : '25K+'}{' '}
                    EXECUTIONS
                  </p>
                  <SliderPrimitive.Root
                    defaultValue={
                      plan == 1 ? [100] : plan == 2 ? [1000] : [5000]
                    }
                    min={plan == 1 ? 100 : plan == 2 ? 1000 : 5000}
                    value={[automation]}
                    max={26000}
                    step={1000}
                    aria-label="value"
                    onValueChange={(value) => {
                      setAutomation(value[0]);
                    }}
                    className="relative flex h-5 w-full touch-none items-center"
                  >
                    <SliderPrimitive.Track className="relative h-1.5 w-full grow rounded-full bg-[#545454]">
                      <SliderPrimitive.Range className="absolute h-full rounded-full bg-[#2395FF]" />
                    </SliderPrimitive.Track>
                    <SliderPrimitive.Thumb
                      className={cx(
                        'block h-5 w-5 rounded-full bg-[#2395FF]',
                        'focus:outline-none focus-visible:ring focus-visible:ring-[#91CAFF] focus-visible:ring-opacity-75'
                      )}
                    />
                  </SliderPrimitive.Root>
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-center lg:text-start text-white silka-medium text-lg">
                  Media Storage
                </p>
                <p className="text-center lg:text-start silka-regular text-sm text-[#C1C1C1] mt-1">
                  How many automations will you execute a month?
                </p>
                <div className="w-full lg:w-[70%] flex flex-col space-y-4 mt-6">
                  <p className="text-center text-[#FF623D] silka-semibold text-lg">
                    {storage != 2200 ? storage + 'GB' : '2TB+'}
                  </p>
                  <SliderPrimitive.Root
                    defaultValue={
                      plan == 1 ? [2] : plan == 2 ? [200] : [2000]
                    }
                    max={2200}
                    min={plan == 1 ? 2 : plan == 2 ? 200 : 2000}
                    step={200}
                    value={[storage]}
                    aria-label="value"
                    onValueChange={(value) => {
                      setStorage(value[0]);
                    }}
                    className="relative flex h-6 w-full touch-none items-center"
                  >
                    <SliderPrimitive.Track className="relative h-1.5 w-full grow rounded-full bg-[#545454]">
                      <SliderPrimitive.Range className="absolute h-full rounded-full bg-[#FF623D]" />
                    </SliderPrimitive.Track>
                    <SliderPrimitive.Thumb
                      className={cx(
                        'block h-5 w-5 rounded-full bg-[#FF623D]',
                        'focus:outline-none focus-visible:ring focus-visible:ring-[#FF623D] focus-visible:ring-opacity-75'
                      )}
                    />
                  </SliderPrimitive.Root>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 mt-6 lg:mt-0 max-h-max flex flex-col justify-center items-center">
              <div className="flex flex-col space-y-4 bg-[#2C2C2C] py-6 px-12 lg:py-12 lg:px-24 rounded-2xl justify-center items-center">
                <p className="text-white text-center silka-semibold text-xl">
                  ESTIMATED MONTHLY COST
                </p>
                <div className="flex flex-row space-x-1 text-xl text-white silka-semibold">
                  <p className="silka-medium">
                    $
                    {plan == 1
                      ? String(
                          (accounts - 6) * 10 +
                            ((automation - 100) / 1000) * 10 +
                            ((storage - 2) / 200) * 10
                        )
                      : plan == 2
                      ? String(
                          (accounts - 6) * 10 +
                            ((automation - 1000) / 1000) * 10 +
                            ((storage - 200) / 200) * 10 +
                            29
                        )
                      : String(
                          (accounts - 6) * 10 +
                            ((automation - 5000) / 1000) * 10 +
                            ((storage - 2000) / 200) * 10 +
                            39
                        )}
                  </p>
                  <p className="">/mo</p>
                </div>
              </div>
            </div>
          </div>
          <p className="text-[#CFCFCF] text-sm lg:text-base text-center silka-medium mt-16">
            Building a larger worksapce?{' '}
            <Link href="/contact" className="underline underline-offset-2">
              
                Contact Us
              
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
