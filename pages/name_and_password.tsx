import { useState, useEffect } from 'react';
import OnboardingContainer from '../components/OnboardingContainer';
import { useRouter } from 'next/router';
import axios from 'axios';
import { apiUrl } from '../utils/apiUrl';
import { signIn } from 'next-auth/react';
import { PageHead } from '../layouts/PageHead';
import toast from 'react-hot-toast';
import { usePostHog } from 'posthog-js/react';

export default function NameAndPassword() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [timezone, setTimezone] = useState<any>(null);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const posthog = usePostHog();

  const router = useRouter();

  async function merseEvent() {
    try {
      const visitorId = localStorage.getItem('merse-user');
      const result = await axios.post(
        `${apiUrl()}referrals/event`,
        null,
        {
          params: {
            visitorId: visitorId,
            name: 'Signed Up',
          },
        }
      );
      return result.data;
    } catch (e) {
      console.log(e);
    }
  }

  async function handleSubmit() {
    try {
      const result = await axios.post(
        `${apiUrl()}user/write/create`,
        null,
        {
          params: {
            email: email,
            username: username,
            password: password,
            timezone: timezone,
            firstName: firstName,
            lastName: lastName,
          },
        }
      );
      return result.data;
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (router.isReady) {
      const { email } = router.query;
      setEmail(email as string);
      const date = new Date();
      const offset = date.getTimezoneOffset();
      const timezone = (parseInt(String(offset)) * -1) / 60;
      setTimezone(timezone);
      setIsLoading(false);
    }
  }, [router.isReady]);

  return (
    <PageHead title="Sign Up - Disperse">
      <OnboardingContainer
        router={router}
        header="Welcome to Disperse!"
      >
        <div className="flex w-full flex-col justify-center items-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitting(true);
              handleSubmit().then(async (value) => {
                merseEvent();
                if (value?.message == 'error') {
                  toast.error('Username taken', {
                    className: 'text-sm silka-medium text-gray-900',
                  });
                  setSubmitting(false);
                } else if (value?.message == 'Already user') {
                  toast.error('Already a user, email taken', {
                    className: 'text-sm silka-medium text-gray-900',
                  });
                  setSubmitting(false);
                } else {
                  posthog?.identify(value?.id, {
                    name: firstName + ' ' + lastName,
                    email: email,
                  });
                  await signIn('credentials', {
                    username: email,
                    password: password,
                    callbackUrl: '/onboarding/verify-email',
                  });
                }
              });
            }}
            className="w-[95%] md:w-4/5 lg:w-1/2 xl:w-[30%] flex flex-col"
          >
            <h1 className="mt-16 text-2xl md:text-3xl silka-semibold text-[#363636]">
              Create a Free Account
            </h1>
            <p className="mt-2 text-gray-400 silka-regular text-xs">
              Let&apos;s get started with the fundamentals first.
            </p>
            <div className="w-full flex flex-row space-x-4">
              <div className="flex flex-col space-y-2 mt-12 w-1/2">
                <label className="text-xs md:text-sm silka-medium text-gray-600">
                  First Name
                </label>
                <input
                  className="text-xs md:text-sm silka-regular w-full py-2.5 rounded border border-gray-300 focus:ring-[#FF623D] focus:border-[#FF623D]"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="first"
                  type="text"
                  required
                />
              </div>
              <div className="flex flex-col space-y-2 mt-12 w-1/2">
                <label className="text-xs md:text-sm silka-medium text-gray-600">
                  Last Name
                </label>
                <input
                  className="text-xs md:text-sm silka-regular w-full py-2.5 rounded border border-gray-300 focus:ring-[#FF623D] focus:border-[#FF623D]"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="last"
                  type="text"
                  required
                />
              </div>
            </div>
            <div className="flex mt-7 flex-col space-y-2">
              <label className="text-xs md:text-sm silka-medium text-gray-600">
                Username
              </label>
              <input
                className="text-xs md:text-sm silka-regular w-full py-2.5 rounded border border-gray-300 focus:ring-[#FF623D] focus:border-[#FF623D]"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                type="text"
                required
              />
            </div>
            <div className="flex mt-7 flex-col space-y-2">
              <label className="text-xs md:text-sm silka-medium text-gray-600">
                Password
              </label>
              <input
                className="text-xs md:text-sm silka-regular w-full py-2.5 rounded border border-gray-300 focus:ring-[#FF623D] focus:border-[#FF623D]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="************"
                type="password"
                required
              />
            </div>
            <div className="mt-7 flex flex-row space-x-1">
              <p className="text-xs silka-regular text-gray-400 my-auto">
                Signing up as
              </p>
              {isLoading ? (
                <div className="w-20 h-3 bg-gray-200 rounded my-auto animate-pulse" />
              ) : (
                <p className="my-auto text-xs silka-medium text-[#363636">
                  {email}
                </p>
              )}
            </div>
            <div className="w-full flex mt-12 flex-row justify-end items-end">
              <button
                type="submit"
                disabled={submitting}
                className={
                  'rounded text-white silka-medium text-xs md:text-sm transition-all ease-in-out delay-100 hover:opacity-80 ' +
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
