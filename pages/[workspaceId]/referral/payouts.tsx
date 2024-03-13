import DashboardLayout from '../../../layouts/Dashboard';
import { useState, useEffect } from 'react';
import { PageHead } from '../../../layouts/PageHead';
import { useRouter } from 'next/router';
import { ReferralMenu } from '../../../components/referrals/ReferralMenu';
import { useSession } from 'next-auth/react';
import { AffiliateStats } from '../../../components/referrals/AffiliateStats';
import { RequestPayout } from '../../../components/referrals/RequestPayout';
import { PastPayouts } from '../../../components/referrals/PastPayouts';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../../utils/apiUrl';

async function getData(userId: string) {
  axiosRetry(axios, { retries: 3 });
  try {
    const result = await axios.get(`${apiUrl()}referrals/user`, {
      params: {
        userId: userId,
      },
    });
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

export default function ReferralPayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [workspaceId, setWorkspaceId] = useState('');
  const [timeInterval, setTimeInterval] = useState('Last Month');
  const router = useRouter();
  const { data: session, status } = useSession();

  // data
  const [paidConv, setPaidConv] = useState<any>(null);
  const [signups, setSignups] = useState<any>(null);
  const [conversionRate, setConversionRate] = useState<any>(null);

  useEffect(() => {
    if (status == 'authenticated' && router.isReady) {
      setWorkspaceId(router.query.workspaceId as string);
      getData(String(session?.user?.id)).then((data) => {
        setPaidConv(data.data.total_size);
        setSignups(data.data.signups);
        if (data.data.signups === 0) {
          setConversionRate(0);
        } else {
          setConversionRate(
            (data.data.total_size / data.data.signups) * 100
          );
        }
      });
    }
  }, [status, router.isReady]);

  return (
    <PageHead title="Referral Payout - Disperse">
      <DashboardLayout>
        <ReferralMenu
          title="Payouts"
          workspaceId={workspaceId}
          router={router}
        />
        <main className="px-3 pb-24 md:px-12 lg:px-4 xl:px-24 2xl:px-44 mt-10 flex flex-col">
          <div className="flex flex-col space-y-1">
            <h2 className="text-lg silka-semibold text-[#363636]">
              Affiliate Stats
            </h2>
            <p className="text-xs text-regular text-gray-400">
              Statistics on your affiliate activity.
            </p>
          </div>
          <div className="mt-8 flex flex-col">
            <AffiliateStats
              userId={String(session?.user?.id)}
              timeInterval={timeInterval}
              paidConv={paidConv}
              signups={signups}
              conversionRate={conversionRate}
            />
          </div>
          <div className="flex flex-col space-y-1 mt-16">
            <h2 className="text-lg silka-semibold text-[#363636]">
              Request Payout
            </h2>
            <p className="text-xs text-regular text-gray-400">
              Payout your Disperse earnings.
            </p>
          </div>
          <div className="mt-8 flex flex-col">
            <RequestPayout userId={String(session?.user?.id)} />
          </div>
          <div className="flex flex-col space-y-1 mt-16">
            <h2 className="text-lg silka-semibold text-[#363636]">
              Past Payouts
            </h2>
            <p className="text-xs silka-regular text-gray-400">
              View your past Disperse payout activity.
            </p>
          </div>
          <div className="mt-8 flex flex-col">
            <PastPayouts
              workspaceId={workspaceId}
              userId={String(session?.user?.id)}
            />
          </div>
        </main>
      </DashboardLayout>
    </PageHead>
  );
}
