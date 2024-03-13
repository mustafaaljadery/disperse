import { useState, useEffect } from 'react';
import axios from 'axios';
import { LoadingScreen } from '../../components/Loading';
import { ViewDoesntExist } from '../../components/view/ViewDoesntExist';
import Router, { useRouter } from 'next/router';
import { apiUrl } from '../../utils/apiUrl';

async function getView(id: string) {
  try {
    const result = await axios.get(`${apiUrl()}view/read/v`, {
      params: {
        id: id,
      },
    });
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

export default function V() {
  const [found, setFound] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      getView(router.query.id as string).then((data) => {
        if (!data) {
          setFound(false);
        } else {
          Router.push(`/view/${data.id}`);
        }
      });
    }
  }, [router.isReady]);

  if (!found) {
    return <ViewDoesntExist />;
  }
  return <LoadingScreen />;
}
