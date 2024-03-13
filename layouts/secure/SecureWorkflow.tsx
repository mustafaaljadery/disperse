import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { LoadingScreen } from '../../components/Loading';
import { getSession, useSession } from 'next-auth/react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../utils/apiUrl';

interface Props {
  children: JSX.Element;
}

async function checkWorkflowAccess(workflowId: string) {
  const session = await getSession();
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(``, {
      params: {},
    });
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

export function SecureEditor({ children }: Props) {
  const [isLoading, setLoading] = useState(false);
  const [access, setAccess] = useState(false);
  const [exist, setExist] = useState(true);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    setLoading(true);
    if (router.isReady) {
      checkWorkflowAccess(String(router.query.id)).then((value) => {
        if (value.message == "Workspace doesn't exist") {
          setExist(false);
        } else if (value.message == 'Cannot access workspace') {
          setAccess(false);
        } else {
          setAccess(true);
        }
        setLoading(false);
      });
    }
  }, [router.isReady]);

  if (isLoading) return <LoadingScreen />;
  return <>{children}</>;
}
