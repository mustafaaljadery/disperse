import Router from 'next/router';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { DashboardTopbar } from '../../layouts/DashboardTopbar';
import { WorkspaceComponent } from '../../components/dashboard/WorkspaceComponent';
import { CreateWorkspaceDialog } from '../../components/dashboard/CreateWorkspaceDialog';
import { apiUrl } from '../../utils/apiUrl';
import { PageHead } from '../../layouts/PageHead';
import { PurchaseProDialog } from '../../components/dashboard/PurchaseProDialog';
import toast from 'react-hot-toast';
import posthog from 'posthog-js';
import { getSession } from 'next-auth/react';

async function onboardingRequest() {
  axiosRetry(axios, { retries: 3 });

  const session = await getSession();

  try {
    const result = await axios.get(
      `${apiUrl()}onboarding/checkonboarding`,
      { params: { id: String(session?.user?.id) } }
    );
    if (result.data.email_verified == false) {
      Router.push('/onboarding/verify-email');
    } else if (result.data.onboardingUser == false) {
      Router.push('/onboarding/user');
    } else if (result.data.onboardingWorkspace == false) {
      Router.push('/onboarding/workspace');
    } else if (result.data.onboardingTeam == false) {
      Router.push('/onboarding/team');
    } else if (result.data.onboardingSocials == false) {
      Router.push('/onboarding/socials');
    } else {
      localStorage.setItem('onboarding', 'done');
    }
  } catch (e) {
    console.log(e);
  }
}

async function getWorkspaces() {
  try {
    axiosRetry(axios, { retries: 3 });

    const session = await getSession();

    const result = await axios.get(
      `${apiUrl()}workspace/read/fullworkspaces`,
      {
        params: {
          userId: String(session?.user?.id),
          userEmail: String(session?.user?.email),
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function getUserInfo() {
  try {
    axiosRetry(axios, { retries: 3 });
    const session = await getSession();
    console.log('session', session);

    const result = await axios.get(`${apiUrl()}user/read/userinfo`, {
      params: { userId: String(session?.user?.id) },
    });

    posthog.identify(session?.user?.id, {
      name: session?.user?.name,
      email: session?.user?.email,
    });
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

export default function Dashboard() {
  const [workspaces, setWorkspaces] = useState<any>(null);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [createProWorkspaceOpen, setCreateProWorkspaceOpen] =
    useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { data: session, status, update } = useSession();
  const { pathname } = useRouter();
  const router = useRouter();
  const [refetchWorkspaces, setRefetchWorkspaces] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (router.isReady && router.query.then) {
      Router.push(router.query.then as string);
    }
    if (status == 'unauthenticated') {
      setRefresh(false);
      localStorage.clear();
      router.push('/signup');
    }
    if (localStorage.getItem('onboarding') == 'done') {
      Promise.all([getWorkspaces(), getUserInfo()]).then((values) => {
        setWorkspaces(values[0]);
        setRefresh(false);
        setUserInfo(values[1]);
        setIsLoading(false);
      });
    } else {
      onboardingRequest().then(() => {
        setRefresh(!refresh);
      });
    }
    if (String(router.query.confirmEmail) == 'success') {
      toast.remove();
      toast.success('Email Confirmed!', {
        className: 'silka-medium text-sm text-gray-900',
        duration: 4000,
      });
    } else if (String(router.query.confirmEmail) == 'failed') {
      toast.remove();
      toast.error('Confirm Email Failed', {
        className: 'silka-medium text-sm text-gray-900',
        duration: 4000,
      });
    }
  }, [status, router.isReady, refresh]);

  useEffect(() => {
    if (
      refetchWorkspaces &&
      status == 'authenticated' &&
      router.isReady
    ) {
      setIsLoading(true);
      getWorkspaces().then((value) => {
        setWorkspaces(value);
        setRefetchWorkspaces(false);
        setIsLoading(false);
      });
    } else {
      setRefetchWorkspaces(false);
    }
  }, [refetchWorkspaces]);

  return (
    <PageHead title="Dashboard · Disperse">
      <>
        <DashboardTopbar pathname={pathname} userInfo={userInfo} />{' '}
        <main className="flex flex-col justify-center items-center mt-10">
          <div className="w-[90%] lg:w-[70%] 2xl:w-3/5 px-0 md:px-4 flex flex-col-reverse justify-end items-end lg:flex-row lg:justify-between lg:items-between">
            <input
              className="text-xs mt-4 lg:mt-0 silka-medium placeholder-silka-medium text-[#474747] bg-[#FBFBFB] focus:outline-none focus:ring-0 focus:border-[#FF623D] border border-[#D6D6D6] placeholder-text-gray-800 w-full lg:w-1/3 rounded-sm lg:rounded"
              placeholder="Search Workspaces"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              onClick={() => {
                setIsOpen(true);
              }}
              className="bg-[#363636] w-fit px-6 py-2 lg:py-1.5 my-auto rounded-lg flex flex-row justify-center items-center space-x-2 hover:opacity-90"
            >
              <p className="silka-semibold text-xs lg:text-sm text-white">
                New Workspace
              </p>
            </button>
          </div>
          <DialogPrimitive.Root
            open={isOpen}
            onOpenChange={setIsOpen}
          >
            <PurchaseProDialog
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              userId={String(session?.user?.id)}
              userName={userInfo?.name}
              email={String(session?.user?.email)}
              setRefetchWorkspaces={setRefetchWorkspaces}
              loading={isLoading}
            />
          </DialogPrimitive.Root>
          <DialogPrimitive.Root
            open={createProWorkspaceOpen}
            onOpenChange={setCreateProWorkspaceOpen}
          >
            <PurchaseProDialog
              isOpen={createProWorkspaceOpen}
              setIsOpen={setCreateProWorkspaceOpen}
              userId={String(session?.user?.id)}
              userName={userInfo?.name}
              email={String(session?.user?.email)}
              setRefetchWorkspaces={setRefetchWorkspaces}
              loading={isLoading}
            />
          </DialogPrimitive.Root>
          {isLoading ? (
            <div className="mt-16 lg:mt-32 w-[90%] lg:w-3/5 flex flex-col justify-center items-center space-y-4 lg:px-4">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="animate-spin"
              >
                <g clipPath="url(#clip0_1405_2)">
                  <path
                    d="M4.84457 21.6005C4.13345 21.0227 3.95568 20.0005 4.53345 19.2449C5.11123 18.5338 6.13345 18.3116 6.88901 18.8894C7.24457 19.1116 7.55568 19.3783 7.95568 19.556C11.289 21.3783 15.4223 20.756 18.089 18.0449C18.7557 17.3783 19.7779 17.3783 20.4446 18.0449C21.0668 18.7116 21.0668 19.7783 20.4446 20.4005C16.7112 24.1783 10.9335 25.1116 6.31123 22.5338C5.7779 22.2671 5.28901 21.9116 4.84457 21.6005Z"
                    fill="#6b7280"
                  />
                  <path
                    d="M23.8224 13.9555C23.6891 14.8888 22.8002 15.511 21.8669 15.3777C20.9335 15.2444 20.3558 14.3555 20.4891 13.4221C20.578 12.9332 20.578 12.4444 20.578 11.9555C20.578 8.0888 18.0446 4.75547 14.4891 3.73325C13.6002 3.51103 13.0669 2.53325 13.3335 1.64436C13.6002 0.755471 14.4891 0.222137 15.4224 0.488804C20.4446 1.95547 23.9558 6.62214 23.9558 11.9999C23.9558 12.6666 23.9113 13.3332 23.8224 13.9555Z"
                    fill="#6b7280"
                  />
                  <path
                    d="M7.42222 0.843445C8.26667 0.487889 9.24445 0.932334 9.55556 1.82122C9.86667 2.71011 9.46667 3.68789 8.62222 4.04344C5.42222 5.33233 3.28889 8.48789 3.28889 12.0879C3.28889 12.799 3.37778 13.5101 3.55556 14.1768C3.77778 15.0657 3.24444 15.999 2.35556 16.2212C1.46667 16.4434 0.577778 15.9101 0.355556 14.9768C0.133333 13.999 0 13.0212 0 12.0434C0 7.02122 2.97778 2.62122 7.42222 0.843445Z"
                    fill="#6b7280"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1405_2">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          ) : (
            <div className="flex flex-col space-y-5 mb-20 md:space-y-0 md:flex-row md:flex-wrap w-[90%] lg:w-[70%] 2xl:w-3/5 mt-6">
              {workspaces &&
              workspaces?.filter((value: any) => {
                return value?.name?.includes(query);
              }).length > 0 ? (
                <>
                  {workspaces
                    ?.filter((value: any) => {
                      return value?.name?.includes(query);
                    })
                    ?.map((value: any, index: number) => {
                      return (
                        <WorkspaceComponent
                          key={index}
                          componentInfo={value}
                        />
                      );
                    })}
                </>
              ) : (
                <div className="p-4 w-full">
                  <DialogPrimitive.Root
                    open={isOpen}
                    onOpenChange={setIsOpen}
                  >
                    <DialogPrimitive.Trigger asChild>
                      <button className="hover:border-[#FF623D] border flex flex-row space-y-1 justify-center items-center p-4 rounded-lg h-72 border-dashed w-full">
                        <div className="" />
                        <div className="flex flex-col justify-center items-center">
                          <div className="p-2 rounded-full bg-[#F6EDEB]">
                            <svg
                              width="22"
                              height="22"
                              viewBox="0 0 15 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                                fill="#FF623D"
                                fillRule="evenodd"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </div>
                          <h3 className="silka-semibold mt-4 text-base text-gray-900">
                            Create a New Workspace
                          </h3>
                          <p className="text-gray-600 mt-1.5 text-xs silka-regular">
                            Collaborate and build content from scratch
                            using Disperse.
                          </p>
                        </div>
                      </button>
                    </DialogPrimitive.Trigger>
                    <CreateWorkspaceDialog
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                      user={session?.user}
                      setUpgradeWorkspaceOpen={
                        setCreateProWorkspaceOpen
                      }
                    />
                  </DialogPrimitive.Root>
                  <DialogPrimitive.Root
                    open={createProWorkspaceOpen}
                    onOpenChange={setCreateProWorkspaceOpen}
                  >
                    <PurchaseProDialog
                      isOpen={createProWorkspaceOpen}
                      setIsOpen={setCreateProWorkspaceOpen}
                      userId={String(session?.user?.id)}
                      userName={userInfo?.name}
                      email={String(session?.user?.email)}
                      setRefetchWorkspaces={setRefetchWorkspaces}
                      loading={isLoading}
                    />
                  </DialogPrimitive.Root>
                </div>
              )}
            </div>
          )}
        </main>
      </>
    </PageHead>
  );
}
