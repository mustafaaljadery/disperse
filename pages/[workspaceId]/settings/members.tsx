import DashboardLayout from '../../../layouts/Dashboard';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import React, {
  useEffect,
  useState,
  Fragment,
  Dispatch,
  SetStateAction,
} from 'react';
import { SettingsMenu } from '../../../components/settings/SettingsMenu';
import { LoadingScreen } from '../../../components/Loading';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import Image from 'next/image';
import { WorkspaceInviteMember } from '../../../components/workspace/InviteMember';
import { WorkspaceRemoveMember } from '../../../components/workspace/RemoveMember';
import { apiUrl } from '../../../utils/apiUrl';
import { PageHead } from '../../../layouts/PageHead';
import toast from 'react-hot-toast';

interface MemberProps {
  value: any;
  workspaceId: string;
  userRole: string;
  removeUserOpen: boolean;
  setRemoveUserOpen: Dispatch<SetStateAction<boolean>>;
  setRefetchData: Dispatch<SetStateAction<boolean>>;
  selectedEmail: string;
  setSelectedEmail: Dispatch<SetStateAction<string>>;
}

async function getWorkspaceName(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}workspace/read/workspacename`,
      {
        params: { workspaceId: workspaceId },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function getMembers(workspaceId: string, userId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}workspace/read/workspacemembers`,
      {
        params: { workspaceId: workspaceId, userId: userId },
      }
    );
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

function Member({
  value,
  userRole,
  removeUserOpen,
  setRemoveUserOpen,
  workspaceId,
  setRefetchData,
  selectedEmail,
  setSelectedEmail,
}: MemberProps) {
  return (
    <div className="flex flex-col space-y-3">
      <div className="flex flex-col space-y-3.5 md:space-y-0 md:flex-row hover:bg-white rounded-lg py-3">
        <div className="w-full md:w-2/3 flex flex-row space-x-4">
          <div className="flex flex-col justify-center items-center">
            {value.image ? (
              <img
                className="rounded-full h-[48px] w-[48px] md:w-[42px] md:h-[42px] 2xl:w-[48px] 2xl:h-[48px]"
                src={value?.image}
              />
            ) : (
              <div className="bg-gray-200 h-[48px] w-[48px] rounded-full"></div>
            )}
          </div>
          <div className="flex flex-col space-y-1 my-auto">
            <p className="silka-medium text-sm 2xl:text-base">
              {value.email}
            </p>
            <span className="text-xs text-[#747474] silka-regular">
              {value.name ? value.name : 'Pending...'}
            </span>
          </div>
        </div>
        <div className="w-full md:w-1/3 flex flex-row space-x-4 md:space-x-1">
          <div className="w-1/2 flex flex-col justify-center items-start">
            {value.role == 'OWNER' ? (
              <div className="w-full max-w-44 text-[11px] 2xl:text-xs h-8 rounded border flex flex-col justify-center items-center border-gray-300 text-[#9F9F9F] silka-medium">
                Owner
              </div>
            ) : (
              <>
                {userRole == 'GUEST' || userRole == 'MEMBER' ? (
                  <>
                    {value.role == 'GUEST' ? (
                      <div className="flex flex-col justify-center items-center w-full max-w-44 text-[11px] 2xl:text-xs h-8 rounded border border-gray-300 text-[#9F9F9F] silka-medium">
                        Guest
                      </div>
                    ) : value.role == 'MEMBER' ? (
                      <div className="flex flex-col justify-center items-center w-full max-w-44 text-[11px] 2xl:text-xs h-8 rounded border border-gray-300 text-[#9F9F9F] silka-medium">
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
                        workspaceId,
                        value.email,
                        e.target.value
                      );
                    }}
                    className="w-full max-w-44 text-xs focus:ring-0 focus:border-[#FF623D] h-8 rounded border-gray-300 text-[#9F9F9F] silka-medium"
                  >
                    <option value="ADMIN">Admin</option>
                    <option value="MEMBER">Member</option>
                    <option value="GUEST">Guest</option>
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
                {userRole == 'GUEST' || userRole == 'MEMBER' ? (
                  <></>
                ) : (
                  <DialogPrimitive.Root
                    open={removeUserOpen}
                    onOpenChange={setRemoveUserOpen}
                  >
                    <DialogPrimitive.Trigger asChild>
                      <button
                        onClick={(e) => {
                          setSelectedEmail(value.email);
                        }}
                        className="w-full 2xl:w-fit px-8 py-1 h-8 rounded bg-[#FDEEEE] text-xs 2xl:text-sm silka-medium hover:opacity-80 border border-[#FF7070] text-[#FF7070]"
                      >
                        Remove
                      </button>
                    </DialogPrimitive.Trigger>
                    <WorkspaceRemoveMember
                      isOpen={removeUserOpen}
                      memberEmail={selectedEmail}
                      workspaceId={workspaceId}
                      setRefetchData={setRefetchData}
                    />
                  </DialogPrimitive.Root>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SettingsMembers() {
  const [workspaceId, setWorkspaceId] = useState('');
  const [userRole, setUserRole] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [membersInfo, setMembersInfo] = useState<any>(null);
  const [inviteUserOpen, setInviteUserOpen] = useState(false);
  const [removeUserOpen, setRemoveUserOpen] = useState(false);
  const { data: session, status } = useSession();
  const [refetchData, setRefetchData] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<any>(null);
  const [workspaceName, setWorkspaceName] = useState<any>(null);
  const [workspaceLoading, setWorkspaceLooading] = useState(true);

  useEffect(() => {
    if ((router.isReady, status == 'authenticated')) {
      setWorkspaceId(String(router.query.workspaceId));
      getWorkspaceName(String(router.query.workspaceId)).then(
        (value) => {
          setWorkspaceName(value.name);
          setWorkspaceLooading(false);
        }
      );
      getMembers(
        String(router.query.workspaceId),
        String(session?.user?.id)
      ).then((value: any) => {
        setMembersInfo(value.members);
        setUserRole(value.userRole);
        setIsLoading(false);
      });
    }
  }, [router.isReady, status]);

  useEffect(() => {
    if (refetchData) {
      getMembers(
        String(router.query.workspaceId),
        String(session?.user?.id)
      ).then((value: any) => {
        setMembersInfo(value.members);
      });
      setRefetchData(false);
    }
  }, [refetchData]);

  return (
    <PageHead title="Members · Disperse">
      <DashboardLayout>
        <>
          <SettingsMenu
            title="Members"
            workspaceId={workspaceId}
            router={router}
          />
          <main className="px-3 md:px-12 lg:px-4 xl:px-32 2xl:px-44 mt-10">
            <div className="flex flex-col space-y-1.5 mt-10">
              <h1 className="silka-semibold text-gray-900">
                Workspace Members
              </h1>
              {workspaceLoading ? (
                <div className="flex flex-row space-x-1">
                  <p className="silka-regular my-auto text-xs text-gray-500"></p>
                  <div className="w-12 h-4 rounded bg-gray-200 animate-pulse" />
                  <p className="silka-regular my-auto text-xs text-gray-500">
                    Workspace.
                  </p>
                </div>
              ) : (
                <p className="silka-regular text-xs text-gray-500">
                  Modify members of <span>{workspaceName}</span>{' '}
                  Workspace.
                </p>
              )}
            </div>
            <div className="flex flex-col mt-10">
              <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:justify-between md:items-between w-full">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  className="rounded border w-full md:w-96 border-[#EEEEEE] bg-[#FAFAFA] text-xs focus:ring-0 focus:border-[#FF623D] silka-medium"
                  placeholder="Search by email or name"
                />
                <div className="flex-1" />
                {userRole == 'GUEST' || userRole == 'MEMBER' ? (
                  <></>
                ) : (
                  <DialogPrimitive.Root
                    open={inviteUserOpen}
                    onOpenChange={setInviteUserOpen}
                  >
                    <DialogPrimitive.Trigger asChild>
                      <button className="text-sm py-2 md:py-0 px-0 md:px-8 rounded text-white silka-medium bg-[#FF623D]">
                        Invite User
                      </button>
                    </DialogPrimitive.Trigger>
                    <WorkspaceInviteMember
                      isOpen={inviteUserOpen}
                      workspaceId={String(router.query.workspaceId)}
                      setRefetchData={setRefetchData}
                      userId={String(session?.user?.id)}
                    />
                  </DialogPrimitive.Root>
                )}
              </div>
              <div className="flex flex-col space-y-3">
                <div className="mt-10 flex flex-row">
                  <div className="w-1/2 md:w-2/3">
                    <p className="silka-regular text-[#BFBFBF] text-xs 2xl:text-sm">
                      User
                    </p>
                  </div>
                  <div className="w-1/2 md:w-1/3 flex flex-row">
                    <p className="w-1/2 silka-regular text-[#BFBFBF] text-xs 2xl:text-sm">
                      Permissions
                    </p>
                    <p className="w-1/2 silka-regular text-[#BFBFBF] text-xs 2xl:text-sm">
                      Remove
                    </p>
                  </div>
                </div>
                <hr className="w-full" />
                {isLoading ? (
                  <div className="pt-4 flex w-full fleex-col justify-center items-center">
                    <svg
                      width="14"
                      height="14"
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
                  <div className="flex flex-col space-y-1.5">
                    {membersInfo
                      .filter((value: any) => {
                        return (
                          String(value.name).includes(search) ||
                          String(value.email).includes(search)
                        );
                      })
                      .map((value: any, index: number) => {
                        return (
                          <div key={index}>
                            <Member
                              value={value}
                              userRole={userRole}
                              removeUserOpen={removeUserOpen}
                              setRemoveUserOpen={setRemoveUserOpen}
                              workspaceId={workspaceId}
                              setRefetchData={setRefetchData}
                              selectedEmail={selectedEmail}
                              setSelectedEmail={setSelectedEmail}
                            />
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
            </div>
          </main>
        </>
      </DashboardLayout>
    </PageHead>
  );
}
