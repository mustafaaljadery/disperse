import DashboardLayout from '../../../layouts/Dashboard';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { SettingsMenu } from '../../../components/settings/SettingsMenu';
import { LoadingScreen } from '../../../components/Loading';
import Link from 'next/link';
import { PageHead } from '../../../layouts/PageHead';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../../utils/apiUrl';
import * as DialogPrimitve from '@radix-ui/react-dialog';
import { ProUpgradeDialog } from '../../../layouts/upgrade/ProUpgradeDialog';
import { TeamUpgradeDialog } from '../../../layouts/upgrade/TeamUpgradeDialog';
import { DowngradeToProDialog } from '../../../layouts/downgrade/DowngradeToProDialog';
import { DowngradeToStarterDialog } from '../../../layouts/downgrade/DowngradeToStarterDialog';
import { UpgradeToTeam } from '../../../layouts/upgrade/UpgradeToTeam';

interface UpgradePlanButtonProps {
  plan: string;
  currentPlan: string;
  setUpgradeToProOpen: Dispatch<SetStateAction<boolean>>;
  setUpgradeToTeamOpen: Dispatch<SetStateAction<boolean>>;
  setJustUpgradeToTeam: Dispatch<SetStateAction<boolean>>;
}

interface DowngradePlanButtonProps {
  downgradeTo: string;
  setDowngradeToProOpen: Dispatch<SetStateAction<boolean>>;
  setDowngradeStarterOpen: Dispatch<SetStateAction<boolean>>;
}

function CurrentPlanButton() {
  return (
    <button
      disabled={true}
      className="w-fit py-1 px-8 border rounded text-xs md:text-[11px] xl:text-xs silka-medium text-gray-700"
    >
      Current Plan
    </button>
  );
}

function DowngradePlanButton({
  downgradeTo,
  setDowngradeToProOpen,
  setDowngradeStarterOpen,
}: DowngradePlanButtonProps) {
  return (
    <button
      onClick={(e) => {
        if (downgradeTo == 'pro') {
          setDowngradeToProOpen(true);
        } else {
          setDowngradeStarterOpen(true);
        }
      }}
      className="bg-[#FF623D] w-fit py-1 px-8 border border-[#FF4317] hover:opacity-90 rounded text-xs md:text-[11px] xl:text-xs silka-medium text-white"
    >
      Downgrade Plan
    </button>
  );
}

function UpgradePlanButton({
  plan,
  currentPlan,
  setUpgradeToProOpen,
  setUpgradeToTeamOpen,
  setJustUpgradeToTeam,
}: UpgradePlanButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        if (plan == 'PRO') {
          setUpgradeToProOpen(true);
        } else if (currentPlan == 'PRO') {
          setJustUpgradeToTeam(true);
        } else {
          setUpgradeToTeamOpen(true);
        }
      }}
      className="bg-[#FF623D] w-fit py-1 text-center px-8 border border-[#FF4317] hover:opacity-90 rounded text-xs md:text-[11px] xl:text-xs silka-medium text-[white]"
    >
      Upgrade Plan
    </button>
  );
}

function ContactSalesButton() {
  return (
    <a
      target="_blank"
      href="/contact"
      rel="noopener noreferrer"
      className="bg-[#FF623D] w-fit py-1 px-8 text-center border border-[#FF4317] hover:opacity-90 rounded text-xs md:text-[11px] xl:text-xs silka-medium text-white"
    >
      Contact Sales
    </a>
  );
}

async function getPlan(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(`${apiUrl()}workspace/read/plan`, {
      params: { workspaceId: workspaceId },
    });
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

export default function SettingsPlans() {
  const [workspaceId, setWorkspaceId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPlan, setCurrentPlan] = useState<any>(null);
  const [downgradeToStarterOpen, setDowngradeStarterOpen] =
    useState(false);
  const [downgradeToProOpen, setDowngradeToProOpen] = useState(false);
  const [upgradeToProOpen, setUpgradeToProOpen] = useState(false);
  const [upgradeToTeamOpen, setUpgradeToTeamOpen] = useState(false);
  const [justUpgradeToTeam, setJustUpgradeToTeam] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (router.isReady) {
      setWorkspaceId(String(router.query.workspaceId));
      getPlan(String(router.query.workspaceId)).then((value) => {
        if (value?.next_plan) {
          setCurrentPlan(value?.next_plan);
        } else {
          setCurrentPlan(value?.plan);
        }
        setIsLoading(false);
      });
    }
  }, [router.isReady]);

  return (
    <PageHead title="Plans · Disperse">
      <DashboardLayout>
        <>
          <SettingsMenu
            title="Plans"
            workspaceId={workspaceId}
            router={router}
          />
          <main className="px-3 md:px-12 lg:px-4 xl:px-32 2xl:px-44 mt-10">
            <div className="flex flex-col space-y-1 mt-10">
              <h1 className="silka-semibold">Plans &amp; Pricing</h1>
              <p className="silka-reuglar text-gray-500 text-xs">
                Find the perfect Disperse plan for your needs.{' '}
                <a
                  href="https://trydisperse.com/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 text-[#FF623D] hover:opacity-90"
                >
                  Contact Sales
                </a>{' '}
                for enterprise pricing.
              </p>
            </div>
            <div className="mt-12 flex flex-col">
              <div className="flex flex-row flex-wrap">
                <div className="hidden w-1/5 md:flex flex-col space-y-4 p-4" />
                <div className="w-1/2 md:w-1/5 flex flex-col space-y-4 p-4">
                  <h2 className="silka-medium text-base sm:text-xl md:text-base xl:text-xl">
                    Starter
                  </h2>
                  <div className="flex flex-row space-x-2">
                    <p className="silka-medium text-xl sm:text-3xl md:text-xl 2xl:text-2xl">
                      $0
                    </p>
                    <p className="silka-regular text-[10px] sm:text-xs md:text-[10px] xl:text-xs my-auto">
                      per month
                    </p>
                  </div>
                  {currentPlan == 'STARTER' ? (
                    <CurrentPlanButton />
                  ) : (
                    <DowngradePlanButton
                      downgradeTo="starter"
                      setDowngradeStarterOpen={
                        setDowngradeStarterOpen
                      }
                      setDowngradeToProOpen={setDowngradeToProOpen}
                    />
                  )}
                </div>
                <div className="w-1/2 md:w-1/5 flex flex-col space-y-4 p-4">
                  <h2 className="silka-medium text-base sm:text-xl md:text-base xl:text-xl">
                    Pro
                  </h2>
                  <div className="flex flex-row space-x-2">
                    <p className="silka-medium text-xl sm:text-3xl md:text-xl 2xl:text-2xl">
                      $39
                    </p>
                    <p className="silka-regular text-[10px] sm:text-xs md:text-[10px] xl:text-xs my-auto">
                      per month
                    </p>
                  </div>
                  {currentPlan == 'PRO' ? (
                    <CurrentPlanButton />
                  ) : currentPlan == 'TEAM' ||
                    currentPlan == 'ENTERPRISE' ? (
                    <DowngradePlanButton
                      downgradeTo="pro"
                      setDowngradeStarterOpen={
                        setDowngradeStarterOpen
                      }
                      setDowngradeToProOpen={setDowngradeToProOpen}
                    />
                  ) : (
                    <UpgradePlanButton
                      plan="PRO"
                      currentPlan={currentPlan}
                      setUpgradeToProOpen={setUpgradeToProOpen}
                      setUpgradeToTeamOpen={setUpgradeToTeamOpen}
                      setJustUpgradeToTeam={setJustUpgradeToTeam}
                    />
                  )}
                </div>
                <div className="w-1/2 md:w-1/5 flex flex-col space-y-4 p-4">
                  <h2 className="silka-medium text-base sm:text-xl md:text-base xl:text-xl">
                    Team
                  </h2>
                  <div className="flex flex-row space-x-2">
                    <p className="silka-medium text-xl sm:text-3xl md:text-xl 2xl:text-2xl">
                      $59
                    </p>
                    <p className="silka-regular text-[10px] sm:text-xs md:text-[10px] xl:text-xs my-auto">
                      per month
                    </p>
                  </div>
                  {currentPlan == 'TEAM' ? (
                    <CurrentPlanButton />
                  ) : (
                    <UpgradePlanButton
                      plan="TEAM"
                      currentPlan={currentPlan}
                      setUpgradeToProOpen={setUpgradeToProOpen}
                      setUpgradeToTeamOpen={setUpgradeToTeamOpen}
                      setJustUpgradeToTeam={setJustUpgradeToTeam}
                    />
                  )}
                </div>
                <div className="w-1/2 md:w-1/5 flex flex-col space-y-4 p-4">
                  <h2 className="silka-medium text-base sm:text-xl md:text-base xl:text-xl">
                    Enterprise
                  </h2>
                  <div className="flex flex-row space-x-2">
                    <p className="silka-medium text-xl sm:text-3xl md:text-xl 2xl:text-2xl">
                      Contact Us
                    </p>
                    <p className="silka-regular text-[10px] md:text-xs lg:text-[10px] xl:text-xs my-auto"></p>
                  </div>
                  <ContactSalesButton />
                </div>
              </div>
              <div className="hidden md:flex flex-col">
                <h2 className="silka-medium p-4">Usage</h2>
                <div className="flex flex-row">
                  <div className="w-1/5 flex flex-col space-y-4 p-4">
                    <div className="flex flex-col space-y-2">
                      <p className="text-sm silka-regular">Storage</p>
                      <hr className="w-full" />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <p className="text-sm silka-regular">
                        Automations
                      </p>
                      <hr className="w-full" />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <p className="text-sm silka-regular">
                        Team Members
                      </p>
                      <hr className="w-full" />
                    </div>
                  </div>
                  <div className="w-1/5 flex flex-col space-y-4 p-4">
                    <div className="flex flex-col justify-center items-center space-y-2">
                      <p className="text-sm silka-medium">2GB</p>
                      <hr className="w-full" />
                    </div>
                    <div className="flex flex-col justify-center items-center space-y-2">
                      <p className="text-sm silka-medium">100</p>
                      <hr className="w-full" />
                    </div>
                    <div className="flex flex-col justify-center items-center space-y-2">
                      <p className="text-sm silka-medium">3 Guests</p>
                      <hr className="w-full" />
                    </div>
                  </div>
                  <div className="w-1/5 flex flex-col space-y-4 p-4">
                    <div className="flex flex-col justify-center items-center space-y-2">
                      <p className="text-sm silka-medium">200GB</p>
                      <hr className="w-full" />
                    </div>
                    <div className="flex flex-col justify-center items-center space-y-2">
                      <p className="text-sm silka-medium">1K</p>
                      <hr className="w-full" />
                    </div>
                    <div className="flex flex-col justify-center items-center space-y-2">
                      <p className="text-sm silka-medium">5 Guests</p>
                      <hr className="w-full" />
                    </div>
                  </div>
                  <div className="w-1/5 flex flex-col space-y-4 p-4">
                    <div className="flex flex-col justify-center items-center space-y-2">
                      <p className="text-sm silka-medium">500GB</p>
                      <hr className="w-full" />
                    </div>
                    <div className="flex flex-col justify-center items-center space-y-2">
                      <p className="text-sm silka-medium">3K</p>
                      <hr className="w-full" />
                    </div>
                    <div className="flex flex-col justify-center items-center space-y-2">
                      <p className="text-sm silka-medium">
                        Unlimited
                      </p>
                      <hr className="w-full" />
                    </div>
                  </div>
                  <div className="w-1/5 flex flex-col space-y-4 p-4">
                    <div className="flex flex-col justify-center items-center space-y-2">
                      <p className="text-sm silka-medium">
                        Unlimited
                      </p>
                      <hr className="w-full" />
                    </div>
                    <div className="flex flex-col justify-center items-center space-y-2">
                      <p className="text-sm silka-medium">
                        Unlimited
                      </p>
                      <hr className="w-full" />
                    </div>
                    <div className="flex flex-col justify-center items-center space-y-2">
                      <p className="text-sm silka-medium">
                        Unlimited
                      </p>
                      <hr className="w-full" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden md:flex flex-col space-y-4 mt-4 mb-20">
                <h2 className="p-4 silka-medium">Features</h2>
                <div className="flex flex-row space-x-3">
                  <div className="w-1/5 flex flex-col space-y-4 p-4">
                    <div className="flex flex-col space-y-2">
                      <p className="text-sm silka-medium">
                        Scheduling
                      </p>
                      <hr className="w-full" />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <p className="text-sm silka-medium">
                        Workspaces
                      </p>
                      <hr className="w-full" />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <p className="text-sm silka-medium">
                        Integrations
                      </p>
                      <hr className="w-full" />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <p className="text-sm silka-medium">
                        Advanced Analytics
                      </p>
                      <hr className="w-full" />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <p className="text-sm silka-medium">
                        Social Inbox
                      </p>
                      <hr className="w-full" />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <p className="text-sm silka-medium">
                        HTTPS/SSL Encryption
                      </p>
                      <hr className="w-full" />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <p className="text-sm silka-medium">
                        Collaboration
                      </p>
                      <hr className="w-full" />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <p className="text-sm silka-medium">
                        Email Support
                      </p>
                      <hr className="w-full" />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <p className="text-sm silka-medium">
                        Priority Support
                      </p>
                      <hr className="w-full" />
                    </div>
                  </div>
                  <div className="w-1/5 flex flex-col space-y-4 p-4">
                    <div className="flex flex-col jusitfy-center items-center space-y-2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                          fill="#363636"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <hr className="w-full" />
                    </div>
                    <div className="flex flex-col justify-center items-center space-y-2">
                      <p className="text-sm silka-medium">1</p>
                      <hr className="w-full" />
                    </div>
                    <div className="flex flex-col justify-center items-center space-y-2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                          fill="#363636"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <hr className="w-full" />
                    </div>
                    <div className="flex flex-col justify-center items-center space-y-2">
                      <div className="h-[20px]"></div>
                      <hr className="w-full" />
                    </div>
                    <div className="flex flex-col justify-center items-center space-y-2">
                      <div className="h-[20px]"></div>
                      <hr className="w-full" />
                    </div>
                    <div className="flex flex-col justify-center items-center space-y-2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                          fill="#363636"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <hr className="w-full" />
                    </div>
                    <div className="flex flex-col justify-center items-center space-y-2">
                      <div className="h-[20px]"></div>
                      <hr className="w-full" />
                    </div>
                    <div className="flex flex-col jusitfy-center items-center space-y-2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                          fill="#363636"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <hr className="w-full" />
                    </div>
                    <div className="flex flex-col justify-center items-center space-y-2">
                      <div className="h-[20px]"></div>
                      <hr className="w-full" />
                    </div>
                  </div>
                  <div className="w-1/5 flex flex-col space-y-4 p-4">
                    <div className="flex flex-col justify-center items-center space-y-2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                          fill="#363636"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <hr className="w-full" />
                    </div>
                    <div className="flex flex-col justify-center items-center space-y-2">
                      <p className="text-sm silka-medium">
                        Unlimited
                      </p>
                      <hr className="w-full" />
                    </div>
                    <div className="flex flex-col justify-center items-center space-y-2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                          fill="#363636"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <hr className="w-full" />
                    </div>
                    <div className="flex flex-col justify-center items-center space-y-2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                          fill="#363636"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <hr className="w-full" />
                    </div>
                    <div className="flex flex-col justify-center items-center space-y-2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                          fill="#363636"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <hr className="w-full" />
                    </div>
                    <div className="flex flex-col justify-center items-center space-y-2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                          fill="#363636"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <hr className="w-full" />
                    </div>
                    <div className="flex flex-col justify-center items-center space-y-2">
                      <div className="h-[20px]"></div>
                      <hr className="w-full" />
                    </div>
                    <div className="flex flex-col justify-center items-center space-y-2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                          fill="#363636"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <hr className="w-full" />
                    </div>
                    <div className="flex flex-col justify-center items-center space-y-2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                          fill="#363636"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <hr className="w-full" />
                    </div>
                  </div>
                  <div className="w-1/5 flex flex-col space-y-4 p-4">
                    <div className="flex flex-col justify-center items-center space-y-2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                          fill="#363636"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <hr className="w-full" />
                    </div>
                    <div className="flex flex-col justify-center items-center space-y-2">
                      <p className="text-sm silka-medium">
                        Unlimited
                      </p>
                      <hr className="w-full" />
                    </div>
                    <div className="flex flex-col jusitfy-center items-center space-y-2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                          fill="#363636"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <hr className="w-full" />
                    </div>
                    <div className="flex flex-col justify-center items-center space-y-2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                          fill="#363636"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <hr className="w-full" />
                    </div>
                    <div className="flex flex-col justify-center items-center space-y-2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                          fill="#363636"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <hr className="w-full" />
                    </div>
                    <div className="flex flex-col justify-center items-center space-y-2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                          fill="#363636"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <hr className="w-full" />
                    </div>
                    <div className="flex flex-col justify-center items-center space-y-2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                          fill="#363636"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <hr className="w-full" />
                    </div>
                    <div className="flex flex-col justify-center items-center space-y-2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                          fill="#363636"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <hr className="w-full" />
                    </div>
                    <div className="flex flex-col justify-center items-center space-y-2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                          fill="#363636"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <hr className="w-full" />
                    </div>
                  </div>
                  <div className="w-1/5 flex flex-col space-y-4 p-4">
                    <div className="flex flex-col justify-center items-center space-y-2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                          fill="#363636"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <hr className="w-full" />
                    </div>
                    <div className="flex flex-col justify-center items-center space-y-2">
                      <p className="text-sm silka-medium">
                        Unlimited
                      </p>
                      <hr className="w-full" />
                    </div>
                    <div className="flex flex-col justify-center items-center space-y-2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                          fill="#363636"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <hr className="w-full" />
                    </div>
                    <div className="flex flex-col jusitfy-center items-center space-y-2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                          fill="#363636"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <hr className="w-full" />
                    </div>
                    <div className="flex flex-col justify-center items-center space-y-2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                          fill="#363636"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <hr className="w-full" />
                    </div>
                    <div className="flex flex-col justify-center items-center space-y-2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                          fill="#363636"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <hr className="w-full" />
                    </div>
                    <div className="flex flex-col justify-center items-center space-y-2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                          fill="#363636"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <hr className="w-full" />
                    </div>
                    <div className="flex flex-col jusitfy-center items-center space-y-2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                          fill="#363636"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <hr className="w-full" />
                    </div>
                    <div className="flex flex-col justify-center items-center space-y-2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                          fill="#363636"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <hr className="w-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <DialogPrimitve.Root
            open={upgradeToProOpen}
            onOpenChange={setUpgradeToProOpen}
          >
            <ProUpgradeDialog
              isOpen={upgradeToProOpen}
              setIsOpen={setUpgradeToProOpen}
              workspaceId={workspaceId}
              userId={String(session?.user?.id)}
              userName={String(session?.user?.name)}
              email={String(session?.user?.email)}
            />
          </DialogPrimitve.Root>
          <DialogPrimitve.Root
            open={upgradeToTeamOpen}
            onOpenChange={setUpgradeToTeamOpen}
          >
            <TeamUpgradeDialog
              isOpen={upgradeToTeamOpen}
              setIsOpen={setUpgradeToTeamOpen}
              workspaceId={workspaceId}
              userId={String(session?.user?.id)}
              userName={String(session?.user?.name)}
              email={String(session?.user?.email)}
            />
          </DialogPrimitve.Root>
          <DialogPrimitve.Root
            open={downgradeToProOpen}
            onOpenChange={setDowngradeToProOpen}
          >
            <DowngradeToProDialog
              isOpen={downgradeToProOpen}
              setIsOpen={setDowngradeToProOpen}
              workspaceId={workspaceId}
            />
          </DialogPrimitve.Root>
          <DialogPrimitve.Root
            open={downgradeToStarterOpen}
            onOpenChange={setDowngradeStarterOpen}
          >
            <DowngradeToStarterDialog
              isOpen={downgradeToStarterOpen}
              setIsOpen={setDowngradeStarterOpen}
              workspaceId={workspaceId}
            />
          </DialogPrimitve.Root>
          <DialogPrimitve.Root
            open={justUpgradeToTeam}
            onOpenChange={setJustUpgradeToTeam}
          >
            <UpgradeToTeam
              isOpen={justUpgradeToTeam}
              setIsOpen={setJustUpgradeToTeam}
              workspaceId={workspaceId}
            />
          </DialogPrimitve.Root>
        </>
      </DashboardLayout>
    </PageHead>
  );
}
