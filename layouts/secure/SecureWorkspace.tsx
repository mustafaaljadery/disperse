import { useRouter } from 'next/router';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { LoadingScreen } from '../../components/Loading';
import { getSession, useSession } from 'next-auth/react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import WorkspaceDoesntExist from '../../components/workspace/WorkspaceDoesntExist';
import { NoWorkspaceAccess } from '../../components/workspace/NoWorkspaceAccess';
import { apiUrl } from '../../utils/apiUrl';

interface Props {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setWorkspaceData: Dispatch<SetStateAction<any>>;
  children: JSX.Element;
}

export function SecureWorkspace({
  loading,
  setLoading,
  setWorkspaceData,
  children,
}: Props) {
  const [access, setAccess] = useState<any>(null);
  const [exist, setExist] = useState(true);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  axiosRetry(axios, { retries: 3 });

  async function getWorkspaceData(workspaceId: string) {
    try {
      const result = await axios.get(
        `${apiUrl()}workspace/read/workspaceinformation`,
        {
          params: { workspaceId: workspaceId },
        }
      );
      return result.data;
    } catch (e) {
      console.log(e);
    }
  }

  async function checkWorkspaceAccess(workspaceId: string) {
    const session = await getSession();
    try {
      const result = await axios.get(
        `${apiUrl()}workspace/read/checkaccess`,
        {
          params: {
            userId: session?.user.id,
            workspaceName: workspaceId,
          },
        }
      );
      return result.data;
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    setLoading(true);
    if (router.isReady && status == 'authenticated') {
      Promise.all([
        checkWorkspaceAccess(String(router.query.workspaceId)),
        getWorkspaceData(String(router.query.workspaceId)),
      ]).then((values) => {
        if (values[0].message == "Workspace doesn't exist") {
          setExist(false);
        } else if (values[0].message == 'Cannot access workspace') {
          setAccess(false);
        } else {
          setAccess(true);
        }
        setWorkspaceData(values[1]);
        setLoading(false);
      });
    }
  }, [router.isReady, status]);

  if (!exist)
    return (
      <WorkspaceDoesntExist status={status} user={session?.user} />
    );

  if (loading || access == null) {
    return <LoadingScreen />;
  }

  if (access == false) {
    return <NoWorkspaceAccess status={status} user={session?.user} />;
  }

  return <>{children}</>;
}
