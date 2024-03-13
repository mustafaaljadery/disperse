import OnboardingContainer from '../../components/OnboardingContainer';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrl } from '../../utils/apiUrl';
import { LoadingScreen } from '../../components/Loading';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import { PageHead } from '../../layouts/PageHead';
import { usePostHog } from 'posthog-js/react';
import { useRouter } from 'next/router';

async function createWorkspace(
  userId: string,
  name: string,
  image: string
) {
  try {
    const result = await axios.post(
      `${apiUrl()}onboarding/workspace`,
      null,
      {
        params: {
          userId: userId,
          name: name,
          image: image,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

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

const images = [
  '/gradients/gradient-1.png',
  '/gradients/gradient-2.png',
  '/gradients/gradient-3.png',
  '/gradients/gradient-4.png',
  '/gradients/gradient-5.png',
  '/gradients/gradient-6.png',
  '/gradients/gradient-7.png',
  '/gradients/gradient-8.png',
  '/gradients/gradient-9.png',
  '/gradients/gradient-10.png',
];

export default function Workspace() {
  const [name, setName] = useState('');
  const [selectedImage, setSelectedImage] = useState(
    '/gradients/gradient-5.png'
  );
  const [isLoading, setIsLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { data: session, status } = useSession();
  const posthog = usePostHog();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
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
          setIsLoading(false);
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
          Router.push('/onboarding/where');
        } else {
          localStorage.setItem('onboarding', 'done');
          Router.push('/dashboard');
        }
      });
    } else if (status === 'unauthenticated') {
      Router.push('/signup');
    }
  }, [status]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <PageHead title="Onboarding Workspace - Disperse">
      <OnboardingContainer
        router={router}
        header="Create a Workspace"
      >
        <div className="flex flex-col w-full justify-center items-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitting(true);
              localStorage.setItem('workspace_onboarding', 'done');
              createWorkspace(
                String(session?.user?.id),
                name,
                selectedImage
              );
              posthog?.capture('Complete Workspace Onboarding');
              Router.push('/onboarding/socials');
            }}
            className="flex flex-col w-[95%] md:w-4/5 lg:w-1/2 xl:w-1/3"
          >
            <h1 className="mt-10 xl:mt-16 text-3xl silka-semibold text-[#363636]">
              Workspace Details
            </h1>
            <p className="mt-2 text-gray-400 silka-regular text-xs">
              Let&apos;s create your first workspace.
            </p>
            <div className="flex mt-12 flex-col space-y-2">
              <label className="text-xs md:text-sm silka-medium text-gray-600">
                Workspace Name
              </label>
              <input
                className="text-xs md:text-sm silka-regular w-full py-2.5 rounded border border-gray-300 focus:ring-[#FF623D] focus:border-[#FF623D]"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                type="text"
                required
              />
            </div>
            <div className="mt-7 flex flex-col space-y-3">
              <label className="text-xs md:text-sm silka-medium text-gray-600">
                Theme Color
              </label>
              <div className="flex flex-row space-x-2 flex-wrap">
                {images.map((value: any, index: number) => {
                  return (
                    <button
                      type="button"
                      key={index}
                      onClick={() => {
                        setSelectedImage(value);
                      }}
                      className={
                        'rounded my-auto p-0.5 ' +
                        (value == selectedImage
                          ? 'border-2 border-[#FF623D]'
                          : '')
                      }
                    >
                      <img
                        src={value}
                        className={
                          'h-[34px] rounded-sm my-auto w-[34px]'
                        }
                      />
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="flex w-full flex-row mt-8 justify-end items-end">
              <button
                type="submit"
                disabled={submitting}
                className={
                  'text-sm silka-medium text-white rounded transition-all ease-in-out delay-100 hover:opacity-80 ' +
                  (submitting
                    ? 'bg-[#F7E7E3] px-8 py-2'
                    : 'bg-[#FF623D] px-4 py-1.5')
                }
              >
                {submitting ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="animate-spin"
                    width="18px"
                    height="18px"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      fill="none"
                      stroke="#FF623D"
                      strokeWidth="10"
                      r="35"
                      strokeDasharray="164.93361431346415 56.97787143782138"
                    >
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        repeatCount="indefinite"
                        dur="1s"
                        values="0 50 50;360 50 50"
                        keyTimes="0;1"
                      ></animateTransform>
                    </circle>
                  </svg>
                ) : (
                  'Continue'
                )}
              </button>
            </div>
          </form>
        </div>
      </OnboardingContainer>
    </PageHead>
  );
}
