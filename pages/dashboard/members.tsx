import { useRouter } from 'next/router';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState, Fragment } from 'react';
import { DashboardTopbar } from '../../layouts/DashboardTopbar';
import Image from 'next/image';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { WorkspaceInviteMember } from '../../components/workspace/InviteMember';
import { apiUrl } from '../../utils/apiUrl';
import { WorkspaceRemoveMember } from '../../components/workspace/RemoveMember';
import { PageHead } from '../../layouts/PageHead';
import toast, { Toaster } from 'react-hot-toast';

async function getUserInfo(userId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(`${apiUrl()}user/read/userinfo`, {
      params: { userId: userId },
    });
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function updateMemberRole(
  workspaceId: string,
  memberEmail: string,
  newRole: string
) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.post(
      `${apiUrl()}workspace/update/memberrole`,
      null,
      {
        params: {
          workspaceId: workspaceId,
          memberEmail: memberEmail,
          newRole: newRole,
        },
      }
    );
    toast.success('Role Updated!', {
      className: 'text-sm silka-medium text-[#363636]',
    });
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function getWorkspaceMembers(
  workspaceId: string,
  userId: string
) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}workspace/read/workspacemembers`,
      { params: { workspaceId: workspaceId, userId: userId } }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function getWorkspaces(userId: string, userEmail: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}workspace/read/fullworkspaces`,
      {
        params: { userId: userId, userEmail: userEmail },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

function Workspace({
  value,
  index,
  currentWorkspace,
  setCurrentWorkspace,
  setCurrentWorkspaceId,
}: any) {
  return (
    <button
      onClick={() => {
        setCurrentWorkspace(index);
        setCurrentWorkspaceId(value);
      }}
      className={
        'text-sm flex text-start flex-col silka-regular justify-start items-start rounded hover:bg-gray-100 rouned py-1.5 px-2 ' +
        (currentWorkspace == index
          ? 'bg-gray-50 text-gray-800'
          : 'text-gray-600')
      }
    >
      {value.name}
    </button>
  );
}

export default function DashboardMembers() {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [workspaceLoading, setWorkspaceLoading] = useState(true);
  const [workspaces, setWorkspaces] = useState<any>(null);
  const [currentWorkspaceId, setCurrentWorkspaceId] =
    useState<any>(null);
  const [currentWorkspace, setCurrentWorkspace] = useState(0);
  const [currentWorkspaceRole, setCurrentWorkspaceRole] =
    useState<any>(null);
  const [refetchData, setRefetchData] = useState(false);
  const [removeUserOpen, setRemoveUserOpen] = useState(false);
  const [workspaceMap, setWorkspaceMap] = useState<any>(null);
  const { pathname } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status == 'authenticated') {
      getUserInfo(String(session?.user.id)).then((value) => {
        setUserInfo(value);
        getWorkspaces(session.user.id, session.user.email).then(
          (value: any) => {
            setWorkspaces(value);
            setIsLoading(false);
          }
        );
      });
    }
  }, [status]);

  useEffect(() => {
    if (workspaces) {
      setCurrentWorkspaceId(workspaces[currentWorkspace].id);
      getWorkspaceMembers(
        workspaces[currentWorkspace].id,
        String(session?.user.id)
      ).then((value) => {
        setWorkspaceMap(value.members);
        setCurrentWorkspaceRole(value.userRole);
        setWorkspaceLoading(false);
      });
    }
  }, [workspaces]);

  useEffect(() => {
    if (workspaces) {
      setWorkspaceLoading(true);
      setCurrentWorkspaceId(workspaces[currentWorkspace].id);
      getWorkspaceMembers(
        workspaces[currentWorkspace].id,
        String(session?.user.id)
      ).then((value) => {
        setWorkspaceMap(value.members);
        setCurrentWorkspaceRole(value.userRole);
        setWorkspaceLoading(false);
      });
      setRefetchData(false);
    }
  }, [currentWorkspace, refetchData]);

  if (isLoading) {
    return (
      <PageHead title="Members · Disperse">
        <>
          <DashboardTopbar pathname={pathname} userInfo={userInfo} />
          <div className="flex flex-col jusitfy-center items-center">
            <div className="flex flex-col lg:flex-row lg:space-x-5 w-[90%] lg:w-[70%] 2xl:w-3/5 mt-8 lg:mt-12">
              <div className="w-full md:w-1/5 flex flex-col space-y-2 md:space-y-4">
                <div className="w-full h-7 rounded bg-gray-100 animate-pulse" />
                <div className="w-full h-7 rounded bg-gray-100 animate-pulse" />
                <div className="w-full h-7 rounded bg-gray-100 animate-pulse" />
              </div>
              <div className="flex mt-6 lg:mt-0 flex-col w-full lg:w-4/5">
                <div className="flex flex-col space-y-1">
                  <h2 className="silka-medium">Members</h2>
                  <p className="silka-regular text-sm text-gray-800">
                    All the members of your random workspace
                    organization.
                  </p>
                </div>
                <div className="mt-6 flex flex-col space-y-3 md:space-y-0 md:flex-row md:justify-between md:items-between">
                  <input
                    placeholder="Search by email or name"
                    className="silka-regular text-xs w-72 rounded focus:ring-0 focus:border-[#FF623D] bg-[#FAFAFA] border border-[#EEEEEE]"
                    type="text"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                  <div className="flex-1" />
                  <button className="text-white py-1.5 silka-medium text-sm border border-[#FF4317] px-8 rounded bg-[#FF623D] hover:opacity-90">
                    Invite Member
                  </button>
                </div>
                <div className="flex flex-col space-y-3">
                  <div className="mt-10 flex flex-row ">
                    <div className="w-3/5">
                      <p className="silka-regular text-[#BFBFBF] text-xs">
                        User
                      </p>
                    </div>
                    <div className="w-2/5 flex flex-row">
                      <p className="w-1/2 silka-regular text-[#BFBFBF] text-xs">
                        Permissions
                      </p>
                      <p className="w-1/2 silka-regular text-[#BFBFBF] text-xs">
                        Remove
                      </p>
                    </div>
                  </div>
                  <hr className="w-full" />
                </div>
                <div className="py-3 mt-1.5 flex flex-col space-y-4">
                  <div className="h-16 w-full rounded-lg bg-gray-100 animate-pulse" />
                  <div className="h-16 w-full rounded-lg bg-gray-100 animate-pulse" />
                  <div className="h-16 w-full rounded-lg bg-gray-100 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </>
      </PageHead>
    );
  }

  if (workspaceLoading) {
    return (
      <PageHead title="Members · Disperse">
        <>
          <DashboardTopbar pathname={pathname} userInfo={userInfo} />
          <main className="flex flex-col justify-center items-center">
            <div className="flex flex-col lg:flex-row lg:space-x-5 w-[90%] lg:w-3/5 mt-8 lg:mt-12">
              <div className="flex flex-col space-y-2 w-full lg:w-1/5">
                {workspaces.map((value: any, index: number) => {
                  return (
                    <Workspace
                      key={index}
                      value={value}
                      index={index}
                      currentWorkspace={currentWorkspace}
                      setCurrentWorkspace={setCurrentWorkspace}
                    />
                  );
                })}
              </div>
              <div className="flex mt-6 lg:mt-0 flex-col w-full lg:w-4/5">
                <div className="flex flex-col space-y-1">
                  <h2 className="silka-medium">Members</h2>
                  <p className="silka-regular text-sm text-gray-800">
                    All the members of your random workspace
                    organization.
                  </p>
                </div>
                <div className="mt-6 flex flex-col space-y-3 md:space-y-0 md:flex-row md:justify-between md:items-between">
                  <input
                    placeholder="Search by email or name"
                    className="silka-regular text-xs w-72 rounded focus:ring-0 focus:border-[#FF623D] bg-[#FAFAFA] border border-[#EEEEEE]"
                    type="text"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                  <div className="flex-1" />
                  <DialogPrimitive.Root
                    open={isOpen}
                    onOpenChange={setIsOpen}
                  >
                    <DialogPrimitive.Trigger asChild>
                      <button className="text-white py-1.5 silka-medium text-sm border border-[#FF4317] px-8 rounded bg-[#FF623D] hover:opacity-90">
                        Invite Member
                      </button>
                    </DialogPrimitive.Trigger>
                    <WorkspaceInviteMember
                      isOpen={isOpen}
                      workspaceId={workspaces[currentWorkspace].id}
                      setRefetchData={setRefetchData}
                      userId={userInfo?.id}
                    />
                  </DialogPrimitive.Root>
                </div>
                <div className="flex flex-col space-y-3">
                  <div className="mt-10 flex flex-row ">
                    <div className="w-3/5">
                      <p className="silka-regular text-[#BFBFBF] text-xs">
                        User
                      </p>
                    </div>
                    <div className="w-2/5 flex flex-row">
                      <p className="w-1/2 silka-regular text-[#BFBFBF] text-xs">
                        Permissions
                      </p>
                      <p className="w-1/2 silka-regular text-[#BFBFBF] text-xs">
                        Remove
                      </p>
                    </div>
                  </div>
                  <hr className="w-full" />
                </div>
                <div className="py-3 mt-1.5 flex flex-col space-y-4">
                  <div className="h-16 w-full rounded-lg bg-gray-100 animate-pulse" />
                  <div className="h-16 w-full rounded-lg bg-gray-100 animate-pulse" />
                  <div className="h-16 w-full rounded-lg bg-gray-100 animate-pulse" />
                </div>
              </div>
            </div>
          </main>
        </>
      </PageHead>
    );
  }

  return (
    <PageHead title="Members · Disperse">
      <>
        <DashboardTopbar pathname={pathname} userInfo={userInfo} />
        <main className="flex flex-col justify-center items-center">
          <div className="flex flex-col lg:flex-row lg:space-x-5 w-[90%] lg:w-3/5 mt-8 lg:mt-12">
            <div className="flex flex-col space-y-2 w-full lg:w-1/5">
              {workspaces.map((value: any, index: number) => {
                return (
                  <Workspace
                    key={index}
                    value={value}
                    index={index}
                    currentWorkspace={currentWorkspace}
                    setCurrentWorkspace={setCurrentWorkspace}
                    setCurrentWorkspaceId={setCurrentWorkspaceId}
                  />
                );
              })}
            </div>
            <div className="flex mt-6 lg:mt-0 flex-col w-full lg:w-4/5">
              <div className="flex flex-col space-y-1">
                <h2 className="silka-semibold">Members</h2>
                <p className="silka-regular text-xs lg:text-sm text-gray-800">
                  All the members of your random workspace
                  organization.
                </p>
              </div>
              <div className="mt-6 flex flex-col space-y-3 md:space-y-0 md:flex-row md:justify-between md:items-between">
                <input
                  placeholder="Search by email or name"
                  className="silka-regular text-xs w-full lg:w-72 rounded focus:ring-0 focus:border-[#FF623D] bg-[#FAFAFA] border border-[#EEEEEE]"
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <div className="flex-1" />
                {currentWorkspaceRole == 'GUEST' ||
                currentWorkspaceRole == 'MEMBER' ? (
                  <></>
                ) : (
                  <DialogPrimitive.Root
                    open={isOpen}
                    onOpenChange={setIsOpen}
                  >
                    <DialogPrimitive.Trigger asChild>
                      <button className="text-white py-1.5 silka-medium text-sm border border-[#FF4317] px-8 rounded bg-[#FF623D] hover:opacity-90">
                        Invite Member
                      </button>
                    </DialogPrimitive.Trigger>
                    <WorkspaceInviteMember
                      isOpen={isOpen}
                      workspaceId={workspaces[currentWorkspace].id}
                      setRefetchData={setRefetchData}
                      userId={userInfo?.id}
                    />
                  </DialogPrimitive.Root>
                )}
              </div>
              <div className="flex flex-col space-y-3">
                <div className="mt-10 flex flex-row ">
                  <div className="w-1/2 md:w-3/5">
                    <p className="silka-regular text-[#BFBFBF] text-xs">
                      User
                    </p>
                  </div>
                  <div className="w-1/2 md:w-2/5 flex flex-row">
                    <p className="w-1/2 silka-regular text-[#BFBFBF] text-xs">
                      Permissions
                    </p>
                    <p className="w-1/2 silka-regular text-[#BFBFBF] text-xs">
                      Remove
                    </p>
                  </div>
                </div>
                <hr className="w-full" />
              </div>
              <div className="py-3 mt-1 flex flex-col space-y-2">
                {workspaceMap.filter((value: any) => {
                  return (
                    value?.name?.includes(search) ||
                    value?.email?.includes(search)
                  );
                }).length > 0 ? (
                  <>
                    {workspaceMap
                      .filter((value: any) => {
                        return (
                          value?.name?.includes(search) ||
                          value?.email?.includes(search)
                        );
                      })
                      .map((value: any, index: number) => {
                        return (
                          <div
                            key={index}
                            className="flex flex-col space-y-3 md:space-y-0 md:flex-row hover:bg-white rounded-lg py-3"
                          >
                            <div className="w-full md:w-3/5 flex flex-row space-x-4">
                              {value.image ? (
                                <Image
                                  alt="profile picture"
                                  className="rounded-full"
                                  src={value.image}
                                  height={43}
                                  width={43}
                                />
                              ) : (
                                <div className="bg-gray-200 h-[43px] w-[43px] rounded-full"></div>
                              )}
                              <div className="flex flex-col space-y-1.5 my-auto">
                                <p className="silka-medium text-sm">
                                  {value.email}
                                </p>
                                <span className="text-[11px] text-[#747474] silka-regular">
                                  {value.name
                                    ? value.name
                                    : 'Pending...'}
                                </span>
                              </div>
                            </div>
                            <div className="w-full md:w-2/5 flex flex-row">
                              <div className="w-1/2 flex flex-col justify-center items-start">
                                {value.role == 'OWNER' ? (
                                  <div className="w-36 text-xs h-8 rounded border flex flex-col justify-center items-center border-gray-300 text-[#9F9F9F] silka-medium">
                                    Owner
                                  </div>
                                ) : (
                                  <>
                                    {currentWorkspaceRole ==
                                      'GUEST' ||
                                    currentWorkspaceRole ==
                                      'MEMBER' ? (
                                      <>
                                        {value.role == 'GUEST' ? (
                                          <div className="flex flex-col justify-center items-center w-36 text-xs h-8 rounded border border-gray-300 text-[#9F9F9F] silka-medium">
                                            Guest
                                          </div>
                                        ) : value.role == 'MEMBER' ? (
                                          <div className="flex flex-col justify-center items-center w-36 text-xs h-8 rounded border border-gray-300 text-[#9F9F9F] silka-medium">
                                            Member
                                          </div>
                                        ) : (
                                          <></>
                                        )}
                                      </>
                                    ) : (
                                      <select
                                        defaultValue={value.role}
                                        onChange={(e) => {
                                          e.preventDefault();
                                          updateMemberRole(
                                            currentWorkspaceId,
                                            value.email,
                                            e.target.value
                                          );
                                        }}
                                        className="w-36 text-xs focus:ring-0 focus:border-[#FF623D] h-8 rounded border-gray-300 text-[#9F9F9F] silka-medium"
                                      >
                                        <option value="ADMIN">
                                          Admin
                                        </option>
                                        <option value="MEMBER">
                                          Member
                                        </option>
                                        <option value="GUEST">
                                          Guest
                                        </option>
                                      </select>
                                    )}
                                  </>
                                )}
                              </div>
                              <div className="w-1/2 flex flex-col justify-center items-start">
                                {value.role == 'OWNER' ? (
                                  <></>
                                ) : (
                                  <>
                                    {currentWorkspaceRole ==
                                      'GUEST' ||
                                    currentWorkspaceRole ==
                                      'MEMBER' ? (
                                      <></>
                                    ) : (
                                      <DialogPrimitive.Root
                                        open={removeUserOpen}
                                        onOpenChange={
                                          setRemoveUserOpen
                                        }
                                      >
                                        <DialogPrimitive.Trigger
                                          asChild
                                        >
                                          <button className="px-10 py-1 h-8 rounded bg-[#FDEEEE] text-xs silka-medium hover:opacity-80 border border-[#FF7070] text-[#FF7070]">
                                            Remove
                                          </button>
                                        </DialogPrimitive.Trigger>
                                        <WorkspaceRemoveMember
                                          isOpen={removeUserOpen}
                                          memberEmail={value.email}
                                          workspaceId={
                                            value.workspaceId
                                          }
                                          setRefetchData={
                                            setRefetchData
                                          }
                                        />
                                      </DialogPrimitive.Root>
                                    )}
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </>
                ) : (
                  <div className="w-full py-5 px-8 rounded border border-dashed border-gray-300 flex flex-col space-y-1 bg-gray-50">
                    <p className="text-sm silka-medium text-gray-800">
                      No users found
                    </p>
                    <p className="text-xs silka-regular text-gray-500">
                      Invite more team-members to your workspace.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </>
    </PageHead>
  );
}
