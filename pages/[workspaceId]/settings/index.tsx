import DashboardLayout from '../../../layouts/Dashboard';
import Router, { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState, Fragment } from 'react';
import { SettingsMenu } from '../../../components/settings/SettingsMenu';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { SettingsDeleteWorkspace } from '../../../components/settings/DeleteWorkspace';
import toast, { Toaster } from 'react-hot-toast';
import { SaveWorkspaceToast } from '../../../components/settings/toasts/SaveWorkspaceToast';
import { apiUrl } from '../../../utils/apiUrl';
import { PageHead } from '../../../layouts/PageHead';

export default function Settings() {
  const [workspaceId, setWorkspaceId] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);
  const router = useRouter();
  const { data: session, status } = useSession();

  axiosRetry(axios, { retries: 3 });

  // data fetch
  const [workspaceName, setWorkspaceName] = useState('');
  const [workspaceDescription, setWorkspaceDescription] =
    useState('');

  // toasts
  const [saveWorkspaceToastOpen, setSaveWorkspaceToastOpen] =
    useState(false);

  useEffect(() => {
    if (router.isReady && status == 'authenticated') {
      setWorkspaceId(String(router.query.workspaceId));
      setUserInfo(session.user);
    }
  }, [router.isReady, status]);

  useEffect(() => {
    if (workspaceId != '') {
      getWorkspaceSettingsInfo().then((value) => {
        setWorkspaceName(String(value.name));
        setWorkspaceDescription(String(value.description));
      });
    }
  }, [workspaceId]);

  useEffect(() => {
    if (saveWorkspaceToastOpen) {
      toast.custom(<SaveWorkspaceToast />, { duration: 2000 });
      setSaveWorkspaceToastOpen(false);
    }
  }, [saveWorkspaceToastOpen]);

  async function getWorkspaceSettingsInfo() {
    try {
      const result = await axios.get(
        `${apiUrl()}workspace/read/workspaceinformation`,
        { params: { workspaceId: workspaceId } }
      );
      return result.data;
    } catch (e) {
      console.log(e);
    }
  }

  async function handleSaveSubmit(e: any) {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${apiUrl()}workspace/update/workspacesettings`,
        null,
        {
          params: {
            userId: userInfo.id,
            workspaceId: workspaceId,
            workspaceName: workspaceName,
            workspaceDescription: workspaceDescription,
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <PageHead title="Settings · Disperse">
      <DashboardLayout>
        <>
          <SettingsMenu
            title="Settings"
            workspaceId={workspaceId}
            router={router}
          />
          <main className="px-3 md:px-12 lg:px-4 xl:px-32 2xl:px-44 mt-10">
            <div className="flex flex-col space-y-1 mt-10">
              <h1 className="silka-semibold">Workspace Settings</h1>
              <p className="silka-regular text-gray-500 text-xs">
                General settings for the{' '}
                <span className="silka-medium">Some Random</span>{' '}
                workspace.
              </p>
            </div>
            <form
              onSubmit={(e) => {
                handleSaveSubmit(e);
                toast.success('Workspace Settings Saved!', {
                  className: 'text-sm silka-medium text-gray-900',
                });
              }}
              className="flex flex-col space-y-8 w-full mt-10"
            >
              <div className="flex flex-col w-full md:w-1/2">
                <label className="text-sm silka-medium">
                  Workspace Name
                </label>
                <p className="text-xs silka-regular mt-1 text-[#666666]">
                  Name associated with this workspace.
                </p>
                <input
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  placeholder="amazing workspace"
                  type="text"
                  className="mt-3 bg-[#F8F8F8] text-sm silka-regular rounded border focus:ring-0 focus:border-[#FF623D] border-[#D9D9D9]"
                />
              </div>
              <div className="flex flex-col w-full md:w-1/2">
                <label className="">Description of Workspace</label>
                <p className="text-xs silka-regular mt-1 text-[#666666]">
                  Optional, used for better identifying the workspace.
                </p>
                <input
                  value={workspaceDescription}
                  onChange={(e) =>
                    setWorkspaceDescription(e.target.value)
                  }
                  placeholder="Optional description of the workspace"
                  type="text"
                  className="mt-3 bg-[#F8F8F8] text-sm silka-reuglar rounded border focus:ring-0 focus:border-[#FF623D] border-[#D9D9D9]"
                />
              </div>
              <div className="flex flex-col w-full md:w-1/2">
                <label className="">Workspace ID</label>
                <p className="text-xs silka-regular mt-1 text-[#666666]">
                  Used to interact with the Disperse API.
                </p>
                <input
                  value={workspaceId}
                  type="text"
                  className="w-full md:w-1/2 mt-3 bg-[#F8F8F8] text-sm silka-regular rounded border focus:ring-0 focus:border-[#FF623D] border-[#D9D9D9] text-[#5A5A5A]"
                />
              </div>
              <button
                type="submit"
                className="w-fit px-6 py-1.5 md:py-2 bg-[#FF623D] rounded silka-medium text-[11px] md:text-xs text-white hover:opacity-90"
              >
                Save Workspace Settings
              </button>
            </form>
            <div className="flex flex-col space-y-4 md:space-y-8 mt-8 md:mt-20 mb-20">
              <h2 className="text-lg md:text-xl silka-bold text-[#B62D13]">
                Danger Zone
              </h2>
              <div className="rounded-lg px-4 md:px-8 py-3 md:py-6 flex flex-col border border-[#B62D13]">
                <h3 className="silka-semibold text-base lg:text-lg text-[#B62D13]">
                  Delete Workspace
                </h3>
                <p className="silka-regular text-xs md:text-sm mt-2">
                  Be wary, deleting the workspace will get rid of all
                  of the information stored in this workspace, all of
                  the media, and kick all members of the workspace
                  out.
                </p>
                <div className="flex flex-row justify-end items-end">
                  <DialogPrimitive.Root
                    open={isOpen}
                    onOpenChange={setIsOpen}
                  >
                    <DialogPrimitive.Trigger asChild>
                      <button className="px-4 md:px-5 py-1.5 md:py-2 mt-6 hover:opacity-90 rounded bg-[#B62D13] text-xs silka-semibold text-white">
                        Delete Workspace
                      </button>
                    </DialogPrimitive.Trigger>
                    <SettingsDeleteWorkspace
                      isOpen={isOpen}
                      workspaceId={workspaceId}
                      setIsOpen={setIsOpen}
                    />
                  </DialogPrimitive.Root>
                </div>
              </div>
            </div>
          </main>
        </>
      </DashboardLayout>
    </PageHead>
  );
}
