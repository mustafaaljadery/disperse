import axios from 'axios';
import { apiUrl } from '../../utils/apiUrl';
import { useSession } from 'next-auth/react';
import OnboardingContainer from '../../components/OnboardingContainer';
import { useState, useEffect } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { OnboardingTwitter } from '../../components/onboarding/socials/Twitter';
import { OnboardingInstagram } from '../../components/onboarding/socials/Instagram';
import { OnboardingTiktok } from '../../components/onboarding/socials/Tiktok';
import { OnboardingYoutube } from '../../components/onboarding/socials/Youtube';
import { OnboardingLinkedin } from '../../components/onboarding/socials/Linkedin';
import { OnboardingFacebook } from '../../components/onboarding/socials/Facebook';
import { InstagramSelectAccountOnboarding } from '../../components/onboarding/socials/InstagramSelectAccount';
import { FacebookSelectAccountOnboarding } from '../../components/onboarding/socials/FacebookSelectAccount';
import { LoadingScreen } from '../../components/Loading';
import Router, { useRouter } from 'next/router';
import { PageHead } from '../../layouts/PageHead';
import { usePostHog } from 'posthog-js/react';

async function updateSocials(userId: string) {
  try {
    const result = await axios.post(
      `${apiUrl()}onboarding/socials`,
      null,
      {
        params: {
          userId: userId,
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
      { params: { id: userId } }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function getConnectedSocials(userId: string) {
  try {
    const result = await axios.get(
      `${apiUrl()}onboarding/checksocials`,
      {
        params: {
          userId: userId,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

export default function Socials() {
  const [connected, setConnected] = useState(false);
  const [workspaceId, setWorkspaceId] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();
  const posthog = usePostHog();

  // Onboarding Socials Open
  const [twitterOnboardingOpen, setTwitterOnboardingOpen] =
    useState(false);
  const [youtubeOnboardingOpen, setYoutubeOnboardingOpen] =
    useState(false);
  const [instagramOnboardingOpen, setInstagramOnboardingOpen] =
    useState(false);
  const [tiktokOnboardingOpen, setTiktokOnboardingOpen] =
    useState(false);
  const [linkedinOnboardingOpen, setLinkedinOnboardingOpen] =
    useState(false);
  const [facebookOnboardingOpen, setFacebookOnboardingOpen] =
    useState(false);

  // Connected
  const [twitterConnected, setTwitterConnected] = useState(false);
  const [youtubeConnected, setYoutubeConnected] = useState(false);
  const [instagramConnected, setInstagramConnected] = useState(false);
  const [tiktokConnected, setTiktokConnected] = useState(false);
  const [linkedinConnected, setLinkedinConnected] = useState(false);
  const [facebookConnected, setFacebookConnected] = useState(false);

  const [instagramSelectAccountOpen, setInstagramSelectAccountOpen] =
    useState(false);
  const [facebookSelectAccountOpen, setFacebookSelectAccountOpen] =
    useState(false);

  useEffect(() => {
    if (
      tiktokConnected ||
      twitterConnected ||
      instagramConnected ||
      youtubeConnected ||
      linkedinConnected ||
      facebookConnected
    ) {
      setConnected(true);
    } else {
      setConnected(false);
    }
  }, [
    twitterConnected,
    instagramConnected,
    youtubeConnected,
    tiktokConnected,
    linkedinConnected,
    facebookConnected,
  ]);

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
      setInterval(() => {
        getConnectedSocials(String(session?.user?.id)).then(
          (data) => {
            console.log('data', data);
            if (data.twitter) {
              setTwitterConnected(true);
            }
            if (data.instagram) {
              setInstagramConnected(true);
            }
            if (data.youtube) {
              setYoutubeConnected(true);
            }
            if (data.tiktok) {
              setTiktokConnected(true);
            }
            if (data.linkedin) {
              setLinkedinConnected(true);
            }
            if (data.facebook) {
              setFacebookConnected(true);
            }
            setWorkspaceId(data.workspaceId);
            setIsLoading(false);
          }
        );
      }, 1000);
    } else if (status == 'unauthenticated') {
      Router.push('/signup');
    }
  }, [status]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <PageHead title="Onboarding Socials - Disperse">
      <OnboardingContainer
        router={router}
        header="Connect Social Account"
      >
        <div className="flex flex-col justify-center items-center">
          <div className="w-[95%] md:w-4/5 lg:w-1/2 xl:w-[30%] flex flex-col">
            <h1 className="mt-16 text-3xl silka-semibold text-[#363636]">
              Connect A Social Account
            </h1>
            <h2 className="mt-2 text-gray-400 silka-regular text-xs">
              This will ensure you will have the best experience with
              Disperse
            </h2>
            <div className="mt-8 flex flex-row flex-wrap">
              <div className="p-2">
                <DialogPrimitive.Root
                  open={twitterOnboardingOpen}
                  onOpenChange={setTwitterOnboardingOpen}
                >
                  <DialogPrimitive.Trigger asChild>
                    <button
                      type="button"
                      disabled={twitterConnected}
                      className={
                        'px-4 py-2 rounded flex flex-row space-x-2 border hover:bg-gray-50 ' +
                        (twitterConnected && 'opacity-40')
                      }
                    >
                      <div className="my-auto p-1 bg-[#1D98F0] rounded">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_239_60)">
                            <path
                              d="M24 4.55705C23.117 4.94905 22.168 5.21305 21.172 5.33205C22.189 4.72305 22.97 3.75805 23.337 2.60805C22.386 3.17205 21.332 3.58205 20.21 3.80305C19.313 2.84605 18.032 2.24805 16.616 2.24805C13.437 2.24805 11.101 5.21405 11.819 8.29305C7.728 8.08805 4.1 6.12805 1.671 3.14905C0.381 5.36205 1.002 8.25705 3.194 9.72305C2.388 9.69705 1.628 9.47605 0.965 9.10705C0.911 11.388 2.546 13.522 4.914 13.997C4.221 14.185 3.462 14.229 2.69 14.081C3.316 16.037 5.134 17.46 7.29 17.5C5.22 19.123 2.612 19.848 0 19.54C2.179 20.937 4.768 21.752 7.548 21.752C16.69 21.752 21.855 14.031 21.543 7.10605C22.505 6.41105 23.34 5.54405 24 4.55705V4.55705Z"
                              fill="white"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_239_60">
                              <rect
                                width="24"
                                height="24"
                                fill="white"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <p className="my-auto silka-medium text-sm text-[#363636]">
                        Twitter
                      </p>
                    </button>
                  </DialogPrimitive.Trigger>
                  <OnboardingTwitter
                    isOpen={twitterOnboardingOpen}
                    setIsOpen={setTwitterOnboardingOpen}
                    userId={String(session?.user?.id)}
                    setTwitterConnected={setTwitterConnected}
                    workspaceId={workspaceId}
                  />
                </DialogPrimitive.Root>
              </div>
              <div className="p-2">
                <DialogPrimitive.Root
                  open={instagramOnboardingOpen}
                  onOpenChange={setInstagramOnboardingOpen}
                >
                  <DialogPrimitive.Trigger asChild>
                    <button
                      type="button"
                      disabled={instagramConnected}
                      className={
                        'px-4 py-2 rounded flex flex-row space-x-2 border hover:bg-gray-50 ' +
                        (instagramConnected && 'opacity-40')
                      }
                    >
                      <div className="my-auto p-1 bg-gradient-to-tr from-[#F2A603] to-[#F604D0] rounded">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="white"
                            d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                          />
                        </svg>
                      </div>
                      <p className="my-auto silka-medium text-sm text-[#363636]">
                        Instgram
                      </p>
                    </button>
                  </DialogPrimitive.Trigger>
                  <OnboardingInstagram
                    isOpen={instagramOnboardingOpen}
                    setIsOpen={setInstagramOnboardingOpen}
                    userId={String(session?.user?.id)}
                    setInstagramConnected={setInstagramConnected}
                    workspaceId={workspaceId}
                    setInstagramSelectAccountOpen={
                      setInstagramSelectAccountOpen
                    }
                  />
                </DialogPrimitive.Root>
              </div>
              <div className="p-2">
                <DialogPrimitive.Root
                  open={tiktokOnboardingOpen}
                  onOpenChange={setTiktokOnboardingOpen}
                >
                  <DialogPrimitive.Trigger asChild>
                    <button
                      type="button"
                      disabled={tiktokConnected}
                      className={
                        'px-4 py-2 rounded flex flex-row space-x-2 border hover:bg-gray-50 ' +
                        (tiktokConnected && 'opacity-40')
                      }
                    >
                      <div className="p-1 my-auto bg-black rounded">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.66908 9.46756V8.54289C9.34821 8.49732 9.02445 8.47387 8.70042 8.47229C4.73648 8.47229 1.51147 11.6978 1.51147 15.6618C1.51147 18.0933 2.72671 20.2458 4.58052 21.5475C3.3392 20.22 2.649 18.4703 2.65005 16.6528C2.65005 12.7452 5.78338 9.55871 9.66908 9.46756Z"
                            fill="#00F2EA"
                          />
                          <path
                            d="M9.83876 19.9358C11.6075 19.9358 13.0501 18.5288 13.1159 16.7753L13.122 1.12264H15.9816C15.9205 0.795718 15.8897 0.46405 15.8894 0.131592H11.9837L11.9771 15.7848C11.912 17.5377 10.4686 18.9442 8.70044 18.9442C8.16962 18.9445 7.64669 18.8151 7.17725 18.5672C7.79237 19.4255 8.7829 19.9347 9.83876 19.9358ZM21.3231 6.43591V5.56604C20.2722 5.5671 19.2437 5.26125 18.3641 4.68643C19.1355 5.57447 20.1737 6.18828 21.3236 6.43591"
                            fill="#00F2EA"
                          />
                          <path
                            d="M18.3641 4.68561C17.5021 3.6993 17.0271 2.43349 17.0277 1.12341H15.9813C16.255 2.58654 17.1162 3.87396 18.3641 4.68561ZM8.7004 12.378C6.88795 12.3801 5.41928 13.8488 5.41718 15.6612C5.41823 16.8815 6.09579 18.0005 7.17667 18.5675C6.77282 18.0105 6.55549 17.3406 6.55549 16.6528C6.55733 14.8403 8.026 13.3712 9.83871 13.369C10.177 13.369 10.5013 13.4249 10.8074 13.521V9.53366C10.4865 9.48808 10.1627 9.46464 9.83871 9.46305C9.78181 9.46305 9.7257 9.46622 9.66932 9.46727V12.53C9.35583 12.4304 9.02917 12.379 8.7004 12.378Z"
                            fill="#FF004F"
                          />
                          <path
                            d="M21.3231 6.43597V9.47156C19.2975 9.47156 17.4215 8.82377 15.8891 7.72418V15.6616C15.8891 19.6255 12.6647 22.8505 8.70071 22.8505C7.16882 22.8505 5.74837 22.3671 4.58081 21.5473C5.93778 23.0107 7.84322 23.8421 9.83876 23.8415C13.8027 23.8415 17.0277 20.6165 17.0277 16.6531V8.71576C18.6107 9.85407 20.5119 10.4655 22.4616 10.4631V6.55636C22.0707 6.55636 21.6905 6.51395 21.3228 6.43518"
                            fill="#FF004F"
                          />
                          <path
                            d="M15.8888 15.6612V7.72384C17.4718 8.86242 19.373 9.47359 21.3227 9.47122V6.43589C20.1731 6.188 19.1349 5.57393 18.3638 4.68561C17.1159 3.87396 16.2547 2.58654 15.981 1.12341H13.1217L13.1156 16.7761C13.05 18.529 11.6072 19.936 9.83844 19.936C8.78285 19.935 7.79206 19.4255 7.1772 18.5677C6.09631 18.0011 5.41849 16.882 5.41717 15.6615C5.41928 13.849 6.88794 12.3804 8.70039 12.3783C9.03812 12.3783 9.36241 12.4336 9.66905 12.5303V9.46753C5.78335 9.55868 2.65002 12.7452 2.65002 16.6528C2.65002 18.5424 3.38422 20.2627 4.58049 21.5475C5.78651 22.3965 7.22567 22.8515 8.70039 22.8502C12.6646 22.8502 15.8888 19.6252 15.8888 15.6612Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                      <p className="my-auto silka-medium text-sm text-[#363636]">
                        TikTok
                      </p>
                    </button>
                  </DialogPrimitive.Trigger>
                  <OnboardingTiktok
                    isOpen={tiktokOnboardingOpen}
                    setIsOpen={setTiktokOnboardingOpen}
                    userId={String(session?.user?.id)}
                    setTiktokConnected={setTiktokConnected}
                    workspaceId={workspaceId}
                  />
                </DialogPrimitive.Root>
              </div>
              <div className="p-2">
                <DialogPrimitive.Root
                  open={youtubeOnboardingOpen}
                  onOpenChange={setYoutubeOnboardingOpen}
                >
                  <DialogPrimitive.Trigger asChild>
                    <button
                      type="button"
                      disabled={youtubeConnected}
                      className={
                        'px-4 py-2 rounded flex flex-row space-x-2 border hover:bg-gray-50 ' +
                        (youtubeConnected && 'opacity-40')
                      }
                    >
                      <div className="p-1 my-auto bg-[#FF0000] rounded">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_451_99)">
                            <path
                              d="M19.615 3.18388C16.011 2.93788 7.984 2.93888 4.385 3.18388C0.488 3.44988 0.029 5.80388 0 11.9999C0.029 18.1849 0.484 20.5489 4.385 20.8159C7.985 21.0609 16.011 21.0619 19.615 20.8159C23.512 20.5499 23.971 18.1959 24 11.9999C23.971 5.81488 23.516 3.45088 19.615 3.18388V3.18388ZM9 15.9999V7.99988L17 11.9929L9 15.9999V15.9999Z"
                              fill="white"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_451_99">
                              <rect
                                width="24"
                                height="24"
                                fill="white"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <p className="my-auto silka-medium text-sm text-[#363636]">
                        YouTube
                      </p>
                    </button>
                  </DialogPrimitive.Trigger>
                  <OnboardingYoutube
                    isOpen={youtubeOnboardingOpen}
                    setIsOpen={setYoutubeOnboardingOpen}
                    userId={String(session?.user?.id)}
                    setYoutubeConnected={setYoutubeConnected}
                    workspaceId={workspaceId}
                  />
                </DialogPrimitive.Root>
              </div>
              <div className="p-2">
                <DialogPrimitive.Root
                  open={linkedinOnboardingOpen}
                  onOpenChange={setLinkedinOnboardingOpen}
                >
                  <DialogPrimitive.Trigger asChild>
                    <button
                      type="button"
                      disabled={linkedinConnected}
                      className={
                        'px-4 py-2 rounded flex flex-row space-x-2 border hover:bg-gray-50 ' +
                        (linkedinConnected && 'opacity-40')
                      }
                    >
                      <div className="p-1 my-auto bg-[#0966C2] rounded">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.98 3.5C4.98 4.881 3.87 6 2.5 6C1.13 6 0.02 4.881 0.02 3.5C0.02 2.12 1.13 1 2.5 1C3.87 1 4.98 2.12 4.98 3.5ZM5 8H0V24H5V8ZM12.982 8H8.014V24H12.983V15.601C12.983 10.931 19.012 10.549 19.012 15.601V24H24V13.869C24 5.989 15.078 6.276 12.982 10.155V8Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                      <p className="my-auto silka-medium text-sm text-[#363636]">
                        Linkedin
                      </p>
                    </button>
                  </DialogPrimitive.Trigger>
                  <OnboardingLinkedin
                    isOpen={linkedinOnboardingOpen}
                    setIsOpen={setLinkedinOnboardingOpen}
                    userId={String(session?.user?.id)}
                    setLinkedinConnected={setLinkedinConnected}
                    workspaceId={workspaceId}
                  />
                </DialogPrimitive.Root>
              </div>
              <div className="p-2">
                <DialogPrimitive.Root
                  open={facebookOnboardingOpen}
                  onOpenChange={setFacebookOnboardingOpen}
                >
                  <DialogPrimitive.Trigger asChild>
                    <button
                      type="button"
                      disabled={facebookConnected}
                      className={
                        'px-4 py-2 rounded flex flex-row space-x-2 border hover:bg-gray-50 ' +
                        (facebookConnected && 'opacity-40')
                      }
                    >
                      <div className="p-1 my-auto bg-[#097EEC] rounded">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="white"
                            d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
                          />
                        </svg>
                      </div>
                      <p className="my-auto silka-medium text-sm text-[#363636]">
                        Facebook
                      </p>
                    </button>
                  </DialogPrimitive.Trigger>
                  <OnboardingFacebook
                    isOpen={facebookOnboardingOpen}
                    setIsOpen={setFacebookOnboardingOpen}
                    userId={String(session?.user?.id)}
                    setFacebookConnected={setFacebookConnected}
                    workspaceId={workspaceId}
                    setFacebookSelectAccountOpen={
                      setFacebookSelectAccountOpen
                    }
                  />
                </DialogPrimitive.Root>
              </div>
            </div>
            <div className="flex flex-row mt-8 justify-end items-end">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  localStorage.setItem('social_onboarding', 'done');
                  updateSocials(String(session?.user?.id));
                  posthog?.capture('Complete Social Onboarding');
                  Router.push('/onboarding/team');
                }}
                disabled={!connected}
                className={
                  'px-4 py-1.5 text-sm silka-medium text-white rounded ' +
                  (!connected
                    ? 'bg-[#F7E7E3]'
                    : 'bg-[#FF623D] transition-all ease-in-out delay-100 hover:opacity-80')
                }
              >
                {connected ? 'Continue' : 'Connect An Account'}
              </button>
            </div>
          </div>
          <DialogPrimitive.Root
            open={instagramSelectAccountOpen}
            onOpenChange={setInstagramSelectAccountOpen}
          >
            <InstagramSelectAccountOnboarding
              workspaceId={workspaceId}
              setInstagramConnected={setInstagramConnected}
              isOpen={instagramSelectAccountOpen}
              setIsOpen={setInstagramSelectAccountOpen}
            />
          </DialogPrimitive.Root>
          <DialogPrimitive.Root
            open={facebookSelectAccountOpen}
            onOpenChange={setFacebookSelectAccountOpen}
          >
            <FacebookSelectAccountOnboarding
              workspaceId={workspaceId}
              setFacebookConnected={setFacebookConnected}
              isOpen={facebookSelectAccountOpen}
              setIsOpen={setFacebookSelectAccountOpen}
            />
          </DialogPrimitive.Root>
        </div>
      </OnboardingContainer>
    </PageHead>
  );
}
