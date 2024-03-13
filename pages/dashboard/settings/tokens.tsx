import { useRouter } from 'next/router';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { LoadingScreen } from '../../../components/Loading';
import { DashboardTopbar } from '../../../layouts/DashboardTopbar';
import Link from 'next/link';
import Image from 'next/image';
import { apiUrl } from '../../../utils/apiUrl';
import { PageHead } from '../../../layouts/PageHead';

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

export default function DashboardActivity() {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { pathname } = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status == 'authenticated') {
      getUserInfo(String(session?.user.id)).then((value) => {
        setUserInfo(value);
        setIsLoading(false);
      });
    }
  }, [status]);

  if (isLoading == true) {
    return <LoadingScreen />;
  }

  return (
    <PageHead
      title="Tokens · Disperse"
      description="Generate and view tokens to interact with the Disperse api."
    >
      <>
        <DashboardTopbar pathname={pathname} userInfo={userInfo} />
        <main className="flex flex-col justify-center items-center">
          <div className="w-[90%] lg:w-[70%] 2xl:w-3/5 mt-6 lg:mt-12 flex flex-col lg:flex-row lg:space-x-5">
            <div className="flex flex-col space-y-2 w-full lg:w-1/5">
              <Link
                href="/dashboard/settings"
                className={
                  'text-sm hover:bg-gray-100 rounded py-1.5 px-1 lg:px-2 ' +
                  (pathname == '/dashboard/settings'
                    ? 'silka-medium'
                    : 'silka-regular text-gray-900')
                }
              >
                General
              </Link>
              <Link
                href="/dashboard/settings/billing"
                className={
                  'text-sm hover:bg-gray-100 rounded py-1.5 px-1 lg:px-2 ' +
                  (pathname == '/dashboard/settings/billing'
                    ? 'silka-medium'
                    : 'silka-regular text-gray-900')
                }
              >
                Billing
              </Link>
              <Link
                href="/dashboard/settings/tokens"
                className={
                  'text-sm hover:bg-gray-100 rounded py-1.5 px-1 lg:px-2 ' +
                  (pathname == '/dashboard/settings/tokens'
                    ? 'silka-medium bg-gray-100'
                    : 'silka-regular text-gray-900')
                }
              >
                Tokens
              </Link>
            </div>
            <div className="flex flex-col mt-4 lg:mt-0 w-[90%] lg:w-4/5">
              <div className="flex flex-col space-y-1">
                <h1 className="silka-medium text-sm lg:text-base">
                  Tokens and Services
                </h1>
                <p className="silka-regular text-xs lg:text-sm">
                  Interact with the Disperse API.
                </p>
              </div>
              <div className="h-[68vh] flex flex-col space-y-3 justify-center items-center w-full">
                <Image
                  alt="token coming soon"
                  width={72 * 4}
                  height={72 * 4}
                  src="/images/token-coming-soon.gif"
                />
                <h2 className="text-3xl silka-semibold">
                  Coming Soon
                </h2>
                <p className="silka-regular text-center">
                  Complete API to interact with all of Disperse&apos;s
                  tools.
                </p>
              </div>
            </div>
          </div>
        </main>
      </>
    </PageHead>
  );
}
