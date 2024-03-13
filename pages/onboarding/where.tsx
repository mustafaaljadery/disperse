import { LoadingScreen } from '../../components/Loading';
import { useState, useEffect } from 'react';
import OnboardingContainer from '../../components/OnboardingContainer';
import axios from 'axios';
import { apiUrl } from '../../utils/apiUrl';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
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

async function getWorkspace(userId: string) {
  try {
    const result = await axios.get(
      `${apiUrl()}workspace/read/getworkspace`,
      {
        params: { userId: userId },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function handleSubmit(userId: string, marketing: string) {
  try {
    const result = await axios.post(
      `${apiUrl()}onboarding/where`,
      null,
      {
        params: {
          userId: userId,
          marketing: marketing,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

const values: any = [
  {
    icon: '/images/automation/tiktok.svg',
    name: 'TikTok',
  },
  {
    icon: '/images/automation/linkedin.svg',
    name: 'Linkedin',
  },
  {
    icon: '/images/automation/youtube.svg',
    name: 'Youtube',
  },
  {
    icon: '/images/automation/facebook.svg',
    name: 'Facebook',
  },
  {
    icon: '/images/automation/google.svg',
    name: 'Google',
  },
  {
    icon: '/images/automation/envelope.svg',
    name: 'Outreach',
  },
  {
    icon: '/images/automation/user.svg',
    name: 'Other',
  },
];

export default function Where() {
  const [selected, setSelected] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession();
  const [workspaceId, setWorkspaceId] = useState<any>('dashboard');
  const posthog = usePostHog();
  const router = useRouter();

  useEffect(() => {
    if (status == 'authenticated') {
      getWorkspace(session?.user?.id).then((data: any) => {
        setWorkspaceId(data?.id);
      });
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
          localStorage.getItem('socials_onboarding') != 'done'
        ) {
          Router.push('/onboarding/socials');
        } else if (
          !data?.onboardingTeam &&
          localStorage.getItem('team_onboarding') != 'done'
        ) {
          Router.push('/onboarding/team');
        } else if (
          !data?.onboardingWhere &&
          localStorage.getItem('where_onboarding') != 'done'
        ) {
          setIsLoading(false);
        } else {
          localStorage.setItem('onboarding', 'done');
          Router.push('/dashboard');
        }
      });
    } else if (status == 'unauthenticated') {
      Router.push('/signup');
    }
  }, [status]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <PageHead title="Onboarding from Where - Disperse">
      <OnboardingContainer router={router} header="Final Step!">
        <div className="w-full flex flex-col justify-center items-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(String(session?.user?.id), selected);
              localStorage.setItem('where_onboarding', 'done');
              localStorage.setItem('onboarding', 'done');
              posthog?.capture('Complete Where Onboarding');
              Router.push(`/dashboard?then=/${workspaceId}`);
            }}
            className="flex flex-col w-[95%] md:w-4/5 lg:w-1/2 xl:w-1/3"
          >
            <h1 className="mt-16 text-3xl silka-semibold text-[#363636]">
              Where Did You Find Out About Us?
            </h1>
            <p className="mt-2 text-gray-400 silka-regular text-xs">
              Don&apos;t worry this is the final step!
            </p>
            <div className="flex flex-row mt-12 flex-wrap">
              {values.map((value: any, index: number) => {
                return (
                  <div key={index} className="p-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setSelected(value?.name);
                      }}
                      className={
                        'flex flex-row space-x-2.5 border px-4 py-2 rounded ' +
                        (value.name == selected
                          ? 'border-[#FF623D]'
                          : 'border-gray-300')
                      }
                    >
                      <img
                        src={value?.icon}
                        className="my-auto h-[18px] w-[18px]"
                      />
                      <p className="my-auto text-sm silka-medium text-[#363636]">
                        {value.name}
                      </p>
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="w-full flex mt-8 flex-row justify-end items-end">
              <button
                type="submit"
                className="bg-[#FF623D] px-4 py-1.5 rounded text-white silka-medium text-sm transition-all ease-in-out delay-100 hover:opacity-80"
              >
                Done
              </button>
            </div>
          </form>
        </div>
      </OnboardingContainer>
    </PageHead>
  );
}
