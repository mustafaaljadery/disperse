import OnboardingContainer from '../../components/OnboardingContainer';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Router from 'next/router';
import { apiUrl } from '../../utils/apiUrl';
import { useSession } from 'next-auth/react';
import { LoadingScreen } from '../../components/Loading';
import { PageHead } from '../../layouts/PageHead';
import { usePostHog } from 'posthog-js/react';
import { useRouter } from 'next/router';

async function getOnboarding(userId: string) {
  try {
    const result = await axios.get(
      `${apiUrl()}onboarding/checkonboarding`,
      {
        params: {
          id: userId,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function handleSubmit(userId: string, emails: string) {
  try {
    const result = await axios.post(
      `${apiUrl()}onboarding/team`,
      null,
      {
        params: {
          userId: userId,
          emails: emails,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

export default function Team() {
  const [email1, setEmail1] = useState('');
  const [email2, setEmail2] = useState('');
  const [email3, setEmail3] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession();
  const posthog = usePostHog();
  const router = useRouter();

  useEffect(() => {
    if (status == 'authenticated') {
      getOnboarding(session?.user?.id).then((data: any) => {
        if (
          !data?.email_verified &&
          localStorage.getItem('email_onboarding') != 'done'
        ) {
          Router.push('/onboarding/verify-email');
        } else if (
          !data?.onboardingWorkspace &&
          localStorage.getItem('workspace_onboarding') != 'done'
        ) {
          Router.push('/onboarding/workspace');
        } else if (
          !data?.onboardingSocials &&
          localStorage.getItem('social_onboarding') != 'done'
        ) {
          Router.push('/onboarding/socials');
        } else if (
          !data?.onboardingTeam &&
          localStorage.getItem('team_onboarding') != 'done'
        ) {
          setIsLoading(false);
        } else if (
          !data?.onboardingWhere &&
          localStorage.getItem('where_onboarding') != 'done'
        ) {
          Router.push('/onboarding/where');
        } else {
          localStorage.setItem('onboarding', 'done');
          Router.push('/dashboard');
        }
      });
    } else if ('unauthenticated') {
      Router.push('/signup');
    }
  }, [status]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <PageHead title="Onboarding Team - Disperse">
      <OnboardingContainer
        router={router}
        header="Invite Your Whole Team On Disperse"
      >
        <div className="flex flex-col justify-center items-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              localStorage.setItem('team_onboarding', 'done');
              handleSubmit(
                String(session?.user?.id),
                email1 + ',' + email2 + ',' + email3
              );
              posthog?.capture('Complete Team Onboarding'); // using optional chaining (recommended)
              Router.push('/onboarding/where');
            }}
            className="flex flex-col w-[95%] md:w-4/5 lg:w-1/2 xl:w-[30%]"
          >
            <h1 className="mt-16 text-3xl silka-semibold text-[#363636]">
              Invite Your Whole Team...
            </h1>
            <p className="mt-2 text-gray-400 silka-regular text-xs">
              Disperse is better with your team.
            </p>
            <div className="mt-10 flex flex-col space-y-3.5">
              <label className="text-xs md:text-sm silka-medium text-gray-600">
                Emails
              </label>
              <input
                className="text-xs md:text-sm silka-regular w-full py-2.5 rounded border border-gray-300 focus:ring-[#FF623D] focus:border-[#FF623D]"
                value={email1}
                onChange={(e) => setEmail1(e.target.value)}
                placeholder="name@company.com"
                type="email"
                required
              />
              <input
                className="text-xs md:text-sm silka-regular w-full py-2.5 rounded border border-gray-300 focus:ring-[#FF623D] focus:border-[#FF623D]"
                value={email2}
                onChange={(e) => setEmail2(e.target.value)}
                placeholder="name@company.com"
                type="email"
              />
              <input
                className="text-xs md:text-sm silka-regular w-full py-2.5 rounded border border-gray-300 focus:ring-[#FF623D] focus:border-[#FF623D]"
                value={email3}
                onChange={(e) => setEmail3(e.target.value)}
                placeholder="name@company.com"
                type="email"
              />
            </div>
            <div className="w-full flex flex-row space-x-5 justify-end items-end mt-12">
              <button
                type="button"
                onClick={() => {
                  localStorage.setItem('team_onboarding', 'done');
                  handleSubmit(String(session?.user?.id), ',,');
                  Router.push('/onboarding/where');
                }}
                className="text-xs silka-medium my-auto text-gray-500 hover:underline"
              >
                Skip
              </button>
              <button
                type="submit"
                className="my-auto px-4 py-1.5 bg-[#FF623D] rounded text-xs md:text-sm silka-medium text-white transition-all ease-in-out delay-100 hover:opacity-80"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </OnboardingContainer>
    </PageHead>
  );
}
