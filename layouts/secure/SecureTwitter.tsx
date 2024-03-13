import { useRouter } from 'next/router';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { useSession } from 'next-auth/react';
import { LoadingScreen } from '../../components/Loading';
import { TwitterNotConnected } from '../notconnected/TwitterNotConnected';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../utils/apiUrl';

async function getWorkspace(workspaceId: string, userId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}workspace/read/checkaccess`,
      { params: { userId: userId, workspaceName: workspaceId } }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function getConnected(workspaceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}twitter/read/isconnected`,
      { params: { workspaceId: workspaceId } }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

interface SecureTwitterProps {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setWorkspaceId: Dispatch<SetStateAction<string>>;
  setIsPremium: Dispatch<SetStateAction<boolean>>;
  children: JSX.Element;
}

export function SecureTwitter({
  loading,
  setLoading,
  children,
  setWorkspaceId,
  setIsPremium,
}: SecureTwitterProps) {
  const [workspaceAccess, setWorkspaceAccess] = useState(false);
  const [workspaceExists, setWorkspaceExists] = useState(true);
  const [connected, setConnected] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (router.isReady && status == 'authenticated') {
      setWorkspaceId(String(router?.query?.workspaceId));
      Promise.all([
        getWorkspace(
          String(router.query.workspaceId),
          String(session?.user?.id)
        ),
        getConnected(String(router.query.workspaceId)),
      ]).then((value) => {
        let workspace = value[0];
        let connected = value[1];

        if (workspace?.plan == 'STARTER') {
          setIsPremium(false);
        } else {
          setIsPremium(true);
        }
        if (workspace?.message == "Workspace doesn't exist") {
          setWorkspaceExists(false);
        } else if (workspace?.message == 'Cannot access workspace') {
          setWorkspaceAccess(false);
        } else {
          setWorkspaceAccess(true);
        }

        if (connected.message == 'connected') {
          setConnected(true);
        }
        setLoading(false);
      });
    }
  }, [router.isReady, status]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!workspaceExists) {
    return <div>hi</div>;
  }

  if (!workspaceAccess) {
    return <div>bye</div>;
  }

  if (!connected) {
    return <TwitterNotConnected />;
  }

  return <>{children}</>;
}
