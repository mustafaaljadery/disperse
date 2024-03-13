import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { usePostHog } from 'posthog-js/react';
import { apiUrl } from '../../utils/apiUrl';
import { useSession } from 'next-auth/react';
import { LoadingScreen } from '../../components/Loading';
import Router from 'next/router';
import OnboardingContainer from '../../components/OnboardingContainer';
import { PageHead } from '../../layouts/PageHead';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

async function getOnboarding(userId: string) {
  try {
    const result = await axios.get(
      `${apiUrl()}onbaording/checkonboarding`,
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

async function handleResend(email: string) {
  try {
    toast.loading('Sending email...', {
      className: 'text-sm silka-medium text-gray-900',
      duration: 1000,
    });
    const result = await axios.post(
      `${apiUrl()}onboarding/resend`,
      null,
      {
        params: {
          email: email,
        },
      }
    );
    if (result.data.message == 'success') {
      toast.remove();
      toast.success('Email sent!', {
        className: 'text-sm silka-medium text-gray-900',
      });
    } else {
      toast.remove();
      toast.error('Too many resends! Please try again later.', {
        className: 'text-sm silka-medium text-gray-900',
      });
    }
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function handlesubmit(email: string, code: string) {
  try {
    toast.loading('Checking Code...', {
      className: 'text-sm silka-medium text-gray-900',
      duration: 80000,
    });
    const result = await axios.post(
      `${apiUrl()}onboarding/verify`,
      null,
      {
        params: {
          email: email,
          code: code,
        },
      }
    );
    if (result.data.message == 'success') {
      toast.remove();
      //@ts-ignore
      window.dataLayer.push({ event: 'Sign-up' });
      localStorage.setItem('email_onboarding', 'done');
      Router.push('/onboarding/workspace');
    } else if (result.data.message == 'wrong code') {
      toast.remove();
      toast.error('Wrong code, please double check your email.', {
        className: 'text-sm silka-medium text-gray-900',
        duration: 1000,
      });
    } else if (result.data.message == 'expired') {
      toast.remove();
      toast.error('Code expired, please resend code.', {
        className: 'text-sm silka-medium text-gray-900',
        duration: 1000,
      });
    }
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

export default function VerifyEmail() {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();
  const posthog = usePostHog();
  const router = useRouter();

  const [char1, setChar1] = useState('');
  const [char2, setChar2] = useState('');
  const [char3, setChar3] = useState('');
  const [char4, setChar4] = useState('');
  const [char5, setChar5] = useState('');
  const [char6, setChar6] = useState('');

  const character1 = useRef<HTMLInputElement>(null);
  const character2 = useRef<HTMLInputElement>(null);
  const character3 = useRef<HTMLInputElement>(null);
  const character4 = useRef<HTMLInputElement>(null);
  const character5 = useRef<HTMLInputElement>(null);
  const character6 = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (
      char1.length == 1 &&
      char2.length == 1 &&
      char3.length == 1 &&
      char4.length == 1 &&
      char5.length == 1 &&
      char6.length == 1
    ) {
      const code = char1 + char2 + char3 + char4 + char5 + char6;
      handlesubmit(String(session?.user?.email), code).then(
        (data: any) => {
          if (data?.success) {
            localStorage.setItem('email_onboarding', 'done');
            posthog?.capture('Complete Verify Email');
            Router.push('/onboarding/workspace');
          }
        }
      );
    }
  }, [char1, char2, char3, char4, char5, char6]);

  useEffect(() => {
    if ('autehnticated') {
      getOnboarding(String(session?.user?.id)).then((data: any) => {
        if (
          !data?.email_verified &&
          localStorage.getItem('email_onboarding') != 'done'
        ) {
          setIsLoading(false);
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
    } else if ('unauthenticated') {
      Router.push('/signup');
    }
  }, [status]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <PageHead title="Onboarding Verify - Disperse">
      <OnboardingContainer router={router} header="Verify Your Email">
        <div className="w-full flex flex-col justify-center items-center">
          <div className="mt-4 flex flex-col justify-center items-center">
            <h1 className="text-5xl text-center silka-bold text-[#363636]">
              Check Your Email for a Code
            </h1>
            <p className="text-center mt-5 text-sm silka-medium text-gray-400">
              Check your email for the 6-digit code. The code will
              expire in 30 mins, so enter it quickly!
            </p>
          </div>
          <div className="mt-12 flex flex-row space-x-2">
            <div className="flex flex-row">
              <div className="border-t border-b border-l rounded-l-lg border-gray-400">
                <input
                  type="text"
                  maxLength={1}
                  ref={character1}
                  value={char1}
                  onChange={(e) => {
                    setChar1(e.target.value);
                    if (e.target.value.length == 1) {
                      character2.current?.focus();
                    }
                  }}
                  className="w-14 h-20 focus:ring-[#FF623D] outline-none rounded-l-lg border-none silka-medium text-gray-800"
                />
              </div>
              <div className="border-t border-b border-l border-r border-gray-400">
                <input
                  type="text"
                  maxLength={1}
                  ref={character2}
                  value={char2}
                  onChange={(e) => {
                    setChar2(e.target.value);
                    if (e.target.value.length == 1) {
                      character3.current?.focus();
                    }
                  }}
                  className="w-14 h-20 outline-none border-none focus:ring-[#FF623D] silka-medium text-gray-800"
                />
              </div>
              <div className="border-t border-b border-r border-gray-400 rounded-r-lg">
                <input
                  type="text"
                  maxLength={1}
                  ref={character3}
                  value={char3}
                  onChange={(e) => {
                    setChar3(e.target.value);
                    if (e.target.value.length == 1) {
                      character4.current?.focus();
                    }
                  }}
                  className="h-20 w-14 rounded-r-lg outline-none silka-medium focus:ring-[#FF623D] border-none silka-medium text-gray-800"
                />
              </div>
            </div>
            <div className="my-auto">
              <div className="h-px bg-gray-500 w-3" />
            </div>
            <div className="flex flex-row">
              <div className="border-t border-b border-l rounded-l-lg border-gray-400">
                <input
                  type="text"
                  maxLength={1}
                  ref={character4}
                  value={char4}
                  onChange={(e) => {
                    setChar4(e.target.value);
                    if (e.target.value.length == 1) {
                      character5.current?.focus();
                    }
                  }}
                  className="w-14 h-20 outline-none focus:ring-[#FF623D] rounded-l-lg border-none silka-medium text-gray-800"
                />
              </div>
              <div className="border-t border-b border-l border-r border-gray-400">
                <input
                  type="text"
                  maxLength={1}
                  value={char5}
                  ref={character5}
                  onChange={(e) => {
                    setChar5(e.target.value);
                    if (e.target.value.length == 1) {
                      character6.current?.focus();
                    }
                  }}
                  className="w-14 h-20 outline-noneo focus:ring-[#FF623D] border-none silka-medium text-gray-800"
                />
              </div>
              <div className="border-t border-b border-r border-gray-400 rounded-r-lg">
                <input
                  type="text"
                  value={char6}
                  onChange={(e) => {
                    setChar6(e.target.value);
                  }}
                  maxLength={1}
                  ref={character6}
                  className="h-20 w-14 rounded-r-lg focus:ring-[#FF623D] outline-none silka-medium border-none silka-medium text-gray-800"
                />
              </div>
            </div>
          </div>
          <div className="flex mt-12 flex-col justify-center items-center space-y-6">
            <div className="flex flex-row space-x-8">
              <a
                href="https://mail.google.com/mail/u/0/#inbox"
                target="_blank"
                rel="noreferrer noopenner"
                className="flex my-auto flex-row space-x-2 hover:opacity-90"
              >
                <img
                  src="/gmail_icon.png"
                  className="my-auto h-[18px]"
                />
                <p className="text-sm my-auto silka-medium text-gray-500">
                  Open Gmail
                </p>
              </a>
              <a
                href="https://outlook.live.com/mail/0/inbox"
                target="_blank"
                rel="noreferrer noopenner"
                className="flex my-auto flex-row space-x-2 hover:opacity-90"
              >
                <img
                  src="/outlook_logo.png"
                  className="my-auto h-[18px]"
                />
                <p className="text-sm my-auto silka-medium text-gray-500">
                  Open Outlook
                </p>
              </a>
            </div>
            <p className="text-xs silka-medium text-gray-500">
              Check spam, if you can't find code!
            </p>
          </div>
          <div className="mt-6 flex flex-row space-x-1.5 justify-center items-center">
            <p className="text-sm silka-medium text-gray-600">
              Didn&apos;t get an email?
            </p>
            <button
              onClick={() => {
                handleResend(String(session?.user?.email));
              }}
              className="text-sm silka-medium text-[#FF623D] hover:underline hover:text-[#FF623D] hover:opacity-90"
            >
              Resend Email
            </button>
          </div>
        </div>
      </OnboardingContainer>
    </PageHead>
  );
}
