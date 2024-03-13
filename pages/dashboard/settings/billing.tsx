import { useRouter } from 'next/router';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState, Fragment } from 'react';
import { LoadingScreen } from '../../../components/Loading';
import { DashboardTopbar } from '../../../layouts/DashboardTopbar';
import Link from 'next/link';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { UsageComponent } from '../../../components/settings/UsageComponent';
import { apiUrl } from '../../../utils/apiUrl';
import { AddPaymentDialog } from '../../../components/dashboard/settings/AddPaymentDialog';
import { PageHead } from '../../../layouts/PageHead';
import { Statements } from '../../../components/settings/Statements';
import { UpgradePlanNowDialog } from '../../../layouts/UpgradePlanNow';

async function getUserInfo(userId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}user/read/userinfobilling`,
      {
        params: { userId: userId },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function getPaymentMethod(userId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}stripe/read/userpaymentmethods`,
      {
        params: { userId: userId },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function removePaymentMethod(userId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.post(
      `${apiUrl()}stripe/delete/paymentmethod`,
      null,
      {
        params: { userId: userId },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

export default function DashboardActivity() {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [addPaymentOpen, setAddPaymentOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<any>(null);
  const [refreshPayments, setRefreshPayments] = useState(false);
  const [upgradeNowOpen, setUpgradeNowOpen] = useState(false);
  const [currentWorkspaceSelected, setCurrentWorkspaceSelect] =
    useState('');
  const { pathname } = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status == 'authenticated') {
      Promise.all([
        getUserInfo(String(session?.user?.id)),
        getPaymentMethod(String(session?.user?.id)),
      ]).then((values) => {
        setUserInfo(values[0]);
        setPaymentMethod(values[1]);
        setIsLoading(false);
      });
    }
  }, [status]);

  useEffect(() => {
    if (refreshPayments) {
      getPaymentMethod(String(session?.user.id)).then((value) => {
        setPaymentMethod(value);
        setRefreshPayments(false);
      });
    }
  }, [refreshPayments]);

  if (isLoading == true) {
    return <LoadingScreen />;
  }

  return (
    <PageHead
      title="Billing · Disperse"
      description="Customize billing & view usage history."
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
                    ? 'silka-medium bg-gray-100'
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
                    ? 'silka-medium'
                    : 'silka-regular text-gray-900')
                }
              >
                Tokens
              </Link>
            </div>
            <div className="flex flex-col w-full lg:w-4/5">
              <div className="flex flex-col space-y-1">
                <h1 className="silka-semibold text-gray-900 text-sm lg:text-base">
                  Usage &amp; Billing
                </h1>
                <p className="silka-regular text-sm text-gray-500">
                  Usage of the Disperse services and billing methods.
                </p>
              </div>
              <h2 className="silka-semibold mt-8 text-xs text-gray-500">
                BILLING INFO
              </h2>
              {paymentMethod.message == 'not found' ? (
                <div className="w-full mt-3 flex flex-row rounded-lg border p-6">
                  <div className="flex flex-col space-y-2 lg:space-y-0 lg:flex-row lg:justify-between lg:items-center w-full">
                    <div className="flex flex-col space-y-1">
                      <h3 className="silka-semibold text-sm text-gray-900">
                        Add Payment Method{' '}
                      </h3>
                      <p className="text-xs silka-regular text-gray-800">
                        Adding a payment method will allow you to
                        purchase one of Disperse&apos;s Pro Plans.
                      </p>
                    </div>
                    <div className="flex-1" />
                    <DialogPrimitive.Root
                      open={addPaymentOpen}
                      onOpenChange={setAddPaymentOpen}
                    >
                      <DialogPrimitive.Trigger asChild>
                        <button className="text-xs h-fit silka-medium text-white bg-[#2B2B2B] rounded px-4 py-2 my-auto hover:opacity-90">
                          Add Payment Method
                        </button>
                      </DialogPrimitive.Trigger>
                      <AddPaymentDialog
                        addPaymentOpen={addPaymentOpen}
                        userInfo={userInfo}
                      />
                    </DialogPrimitive.Root>
                  </div>
                </div>
              ) : (
                <div className="mt-6 flex flex-col p-6 border border-lg rounded">
                  <div className="flex flex-row justify-between items-between space-x-5">
                    <div className="flex flex-col space-y-1.5">
                      <p className="text-sm silka-medium">
                        Billing Method
                      </p>
                      <p className="text-xs text-gray-700 silka-regular">
                        All workspaces you own and are on upgraded
                        plans will be charged based on usage.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2 mt-6">
                    <div className="flex flex-row">
                      <p className="w-1/4 silka-regular text-start text-xs text-gray-400">
                        BRAND
                      </p>
                      <p className="w-1/4 silka-regular text-start text-xs text-gray-400">
                        TYPE
                      </p>
                      <p className="w-1/4 silka-regular text-start text-xs text-gray-400">
                        LAST 4
                      </p>
                      <p className="w-1/4 silka-regular text-start text-xs text-gray-400">
                        EXP. DATE
                      </p>
                    </div>
                    <hr />
                    <div className="flex flex-row">
                      <p className="w-1/4 text-sm silka-medium text-gray-800">
                        {paymentMethod.payment.brand
                          .slice(0, 1)
                          .toUpperCase() +
                          paymentMethod.payment.brand.slice(1)}
                      </p>
                      <p className="w-1/4 text-sm silka-medium text-gray-800">
                        {paymentMethod.payment.funding
                          .slice(0, 1)
                          .toUpperCase() +
                          paymentMethod.payment.funding.slice(1)}
                      </p>
                      <p className="w-1/4 text-sm silka-medium text-gray-800">
                        {paymentMethod.payment.last4}
                      </p>
                      <p className="w-1/4 text-sm silka-medium text-gray-800">{`${paymentMethod.payment.exp_month}/${paymentMethod.payment.exp_year}`}</p>
                    </div>
                    <hr />
                  </div>
                  <div className="flex space-x-4 mt-8 flex-row justify-end items-end">
                    <button className="px-3 py-1.5 border rounded text-xs silka-semibold hover:bg-gray-50">
                      Update Card
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        removePaymentMethod(userInfo.id);
                        setRefreshPayments(true);
                      }}
                      className="px-3 py-1.5 border rounded text-xs silka-semibold text-[#FF0000] hover:border-[#FF0000] hover:bg-gray-50"
                    >
                      Remove Card
                    </button>
                  </div>
                </div>
              )}
              <Statements userId={userInfo.id} />
              <div className="flex flex-col w-full mt-16">
                <h2 className="silka-semibold text-xs text-gray-500">
                  USAGE
                </h2>
                <div className="flex flex-col space-y-12 mt-6 mb-20">
                  {userInfo.workspaces.length > 0 ? (
                    <>
                      {userInfo.workspaces.map(
                        (value: any, index: number) => {
                          return (
                            <UsageComponent
                              key={index}
                              value={value}
                              upgradeNowOpen={upgradeNowOpen}
                              setUpgradeNowOpen={setUpgradeNowOpen}
                              setCurrentWorkspaceSelect={
                                setCurrentWorkspaceSelect
                              }
                            />
                          );
                        }
                      )}
                    </>
                  ) : (
                    <div className=""></div>
                  )}
                </div>
              </div>
              <DialogPrimitive.Root
                open={upgradeNowOpen}
                onOpenChange={setUpgradeNowOpen}
              >
                <UpgradePlanNowDialog
                  isOpen={upgradeNowOpen}
                  workspaceId={currentWorkspaceSelected}
                  userId={userInfo.id}
                />
              </DialogPrimitive.Root>
            </div>
          </div>
        </main>
      </>
    </PageHead>
  );
}
