import { useState, useEffect } from 'react';
import { LoadingScreen } from '../components/Loading';
import Router, { useRouter } from 'next/router';
import axios from 'axios';
import axiosRetry from 'axios-retry';

import { apiUrl } from '../utils/apiUrl';

async function getVerifyEmail(id: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}other/getverifyemail`,
      { params: { id: id } }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

export default function ConfirmEmail() {
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      getVerifyEmail(String(router.query.id)).then((value) => {
        if (value.message == 'unavailable') {
          router.push('/dashboard?confirmEmail=failed');
        } else {
          router.push('/dashboard?confirmEmail=success');
        }
      });
    }
  }, [router.isReady]);

  return <LoadingScreen />;
}
