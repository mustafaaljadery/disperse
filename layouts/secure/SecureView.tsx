import { useRouter } from 'next/router';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { LoadingScreen } from '../../components/Loading';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { ViewDoesntExist } from '../../components/view/ViewDoesntExist';
import { apiUrl } from '../../utils/apiUrl';
import { useSession } from 'next-auth/react';

interface Props {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setViewData: Dispatch<SetStateAction<any>>;
  setUserInfo: Dispatch<SetStateAction<any>>;
  children: JSX.Element;
}

async function getViewData(viewId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(`${apiUrl()}view/read/view`, {
      params: { viewId: viewId },
    });
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function checkViewExists(viewId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}view/read/secureview`,
      {
        params: { viewId: viewId },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

export function SecureView({
  loading,
  setLoading,
  setViewData,
  setUserInfo,
  children,
}: Props) {
  const [exist, setExist] = useState(true);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    setLoading(true);
    if (router.isReady && status != 'loading') {
      if (status == 'authenticated') {
        setUserInfo(session.user);
      }

      Promise.all([
        checkViewExists(String(router.query.viewId)),
        getViewData(String(router.query.viewId)),
      ]).then((values) => {
        if (values[0].message == 'not found') {
          setExist(false);
        }
        setViewData(values[1]);
        setLoading(false);
      });
    }
  }, [router.isReady, status]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!exist) {
    return <ViewDoesntExist />;
  }

  return <>{children}</>;
}
