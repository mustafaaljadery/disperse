import { Transition } from '@headlessui/react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import cx from 'classnames';
import React, {
  Fragment,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ProUpgradeElements } from './ProUpgradeElements';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { DisperseLogoSmall } from '../../components/logos/DisperseLogo';
import { apiUrl } from '../../utils/apiUrl';
import {
  PayPalScriptProvider,
  PayPalButtons,
} from '@paypal/react-paypal-js';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

interface ProUpgradeDialogProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  workspaceId: string;
  userId: string;
  userName: string;
  email: string;
}

async function abandonedCart(userId: string) {
  try {
    const result = await axios.post(
      `${apiUrl()}other/abandonedcart`,
      {
        params: {
          userId: userId,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function getUserPaymentMethods(userId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}stripe/read/userpaymentmethods`,
      {
        params: {
          userId: userId,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function makePaymentIntent(amount: number) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.post(
      `${apiUrl()}stripe/create/paymentintent`,
      null,
      {
        params: {
          amount: amount,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function makeSubscription(userId: string, priceId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.post(
      `${apiUrl()}stripe/create/subscription`,
      null,
      {
        params: {
          userId: userId,
          priceId: priceId,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

export function ProUpgradeDialog({
  isOpen,
  setIsOpen,
  workspaceId,
  userId,
  userName,
  email,
}: ProUpgradeDialogProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [paymentInfoData, setPaymentInfoData] = useState<any>(null);
  const [billingInterval, setBillingInterval] = useState('monthly');
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [subscriptionValue, setSubscriptionValue] =
    useState<any>(null);
  const router = useRouter();
  const [opened, setOpened] = useState(false);

  const products = {
    monthly: 'price_1N71hAKq4w9CjH7gCpwvmN6B',
    annual: 'price_1N71hAKq4w9CjH7gsXuNFVQV',
  };

  useEffect(() => {
    if (isOpen) {
      setOpened(true);
    }
    if (isOpen == false && opened == true) {
      abandonedCart(userId);
    }
  }, [isOpen, opened]);

  useEffect(() => {
    if (userId) {
      Promise.all([
        makeSubscription(
          userId,
          billingInterval == 'monthly'
            ? products?.monthly
            : products?.annual
        ),
        getUserPaymentMethods(userId),
      ]).then((results) => {
        setSubscriptionValue(results[0]);
        setPaymentInfoData(results[1]);
        setIsLoading(false);
      });
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      if (billingInterval == 'monthly') {
        makeSubscription(userId, products?.monthly).then((value) => {
          setSubscriptionValue(value);
        });
      } else {
        makeSubscription(userId, products?.annual).then((value) => {
          setSubscriptionValue(value);
        });
      }
    }
  }, [userId, billingInterval]);

  if (isLoading) {
    return (
      <Transition.Root show={isOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <DialogPrimitive.Overlay
            forceMount
            className="fixed inset-0 z-20 bg-black/50"
          />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <DialogPrimitive.Content
            forceMount
            className={cx(
              'fixed z-50',
              'w-[95vw] max-w-xl h-fit max-h-[80vh] overflow-auto rounded p-4 md:w-full',
              'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
              'bg-white',
              'focus:outline-none focus-visible:ring-0'
            )}
          >
            <div className="flex flex-col space-y-3 py-4 px-2">
              <div className="h-5 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-5 w-[85%] bg-gray-200 rounded animate-pulse" />
              <div className="h-5 w-[70%] bg-gray-200 rounded animate-pulse" />
            </div>
          </DialogPrimitive.Content>
        </Transition.Child>
      </Transition.Root>
    );
  }

  const stripePromise = loadStripe(
    'pk_live_51M6JnIKq4w9CjH7gITYJVypCr6ElfAH6sgcmWxZNG178QXOavV524Yt0uenoZq6QGDxDst5GavhjxyqMbJSMy2c50033gQqzPZ'
  );

  const options = {
    clientSecret: subscriptionValue?.clientSecret,
    appearance: {
      /*...*/
    },
  };

  return (
    <Transition.Root show={isOpen}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <DialogPrimitive.Overlay
          forceMount
          className="fixed inset-0 z-20 bg-black/50"
        />
      </Transition.Child>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <DialogPrimitive.Content
          forceMount
          className={cx(
            'fixed z-50',
            'w-[95vw] max-w-xl max-h-[80vh] overflow-auto rounded p-4 md:w-full',
            'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
            'bg-white',
            'focus:outline-none focus-visible:ring-0'
          )}
        >
          <PayPalScriptProvider
            options={{
              'client-id':
                'AddUUDDhmbHEGr0F4tciByC1qnokY2fNwODAqY10N47LiGhXI_tordRwLnxoanFursdtT1v6CgAPDRev',
              vault: true,
            }}
          >
            <div className="flex flex-col">
              <div className="flex flex-col">
                <DisperseLogoSmall />
                <h1 className="text-2xl text-gray-900 mt-3 silka-semibold">
                  Upgrade to Pro
                </h1>
                <p className="mt-1 text-xs silka-regular text-gray-500">
                  Premium automations, scheduling, and analytics.
                </p>
              </div>
              <div className="flex mt-5 flex-col space-y-3">
                <h3 className="text-xs silka-medium text-gray-800">
                  Billing Interval
                </h3>
                <div className="flex flex-row space-x-5">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setBillingInterval('monthly');
                    }}
                    className={
                      'flex p-3 rounded-lg flex-col border w-1/2 ' +
                      (billingInterval == 'monthly'
                        ? 'border-[#FF623D]'
                        : '')
                    }
                  >
                    <div className="flex flex-col justify-start items-start space-y-2">
                      <RadioGroupPrimitive.Root
                        aria-label="Pokemon starters"
                        defaultValue={'monthly'}
                      >
                        <div className="flex flex-row space-x-3">
                          <RadioGroupPrimitive.Item
                            checked={billingInterval == 'monthly'}
                            value={billingInterval}
                            className={cx(
                              'peer relative w-4 h-4 my-auto rounded-full',
                              'border border-transparent text-white',
                              'radix-state-checked:bg-[#FF623D]',
                              'radix-state-unchecked:bg-gray-100',
                              'focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring focus-visible:ring-[#FF623D] focus-visible:ring-opacity-75 focus-visible:ring-offset-2'
                            )}
                          >
                            <RadioGroupPrimitive.Indicator className="absolute inset-0 flex items-center justify-center leading-0">
                              <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                            </RadioGroupPrimitive.Indicator>
                          </RadioGroupPrimitive.Item>
                          <p className="silka-medium text-xs">
                            Monthly
                          </p>
                        </div>
                      </RadioGroupPrimitive.Root>
                      <div className="flex flex-row space-x-2">
                        <p className="text-2xl silka-medium text-gray-800">
                          $39
                        </p>
                        <span className="my-auto text-[11px] silka-regular text-gray-500">
                          per month
                        </span>
                      </div>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setBillingInterval('annually');
                    }}
                    className={
                      'flex p-3 rounded-lg flex-col border w-1/2 ' +
                      (billingInterval == 'annually'
                        ? 'border-[#FF623D]'
                        : '')
                    }
                  >
                    <div className="flex flex-col justify-start items-start space-y-2">
                      <RadioGroupPrimitive.Root aria-label="Pokemon starters">
                        <div className="flex flex-row space-x-3">
                          <RadioGroupPrimitive.Item
                            checked={billingInterval == 'annually'}
                            value={billingInterval}
                            className={cx(
                              'peer relative w-4 h-4 my-auto rounded-full',
                              'border border-transparent text-white',
                              'radix-state-checked:bg-[#FF623D]',
                              'radix-state-unchecked:bg-gray-100',
                              'focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring focus-visible:ring-[#FF623D] focus-visible:ring-opacity-75 focus-visible:ring-offset-2'
                            )}
                          >
                            <RadioGroupPrimitive.Indicator className="absolute inset-0 flex items-center justify-center leading-0">
                              <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                            </RadioGroupPrimitive.Indicator>
                          </RadioGroupPrimitive.Item>
                          <p className="silka-medium text-xs">
                            Annually
                          </p>
                          <div className=""></div>
                        </div>
                      </RadioGroupPrimitive.Root>
                      <div className="flex flex-row space-x-2">
                        <p className="text-2xl silka-medium text-gray-800">
                          $29
                        </p>
                        <span className="my-auto text-[11px] silka-regular text-gray-500">
                          per month
                        </span>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
              <RadioGroupPrimitive.Root
                aria-label="Pokemon starters"
                defaultValue={'payment-method'}
              >
                <div className="mt-5 flex flex-col space-y-3">
                  <h3 className="text-xs silka-medium text-gray-800">
                    Payment Method
                  </h3>
                  <div className="flex flex-col space-y-4">
                    <button
                      onClick={(e) => {
                        setPaymentMethod('stripe');
                      }}
                      className="flex flex-row space-x-3"
                    >
                      <RadioGroupPrimitive.Item
                        checked={paymentMethod == 'stripe'}
                        value={billingInterval}
                        className={cx(
                          'peer relative w-4 h-4 my-auto rounded-full',
                          'border border-transparent text-white',
                          'radix-state-checked:bg-[#FF623D]',
                          'radix-state-unchecked:bg-gray-100',
                          'focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring focus-visible:ring-[#FF623D] focus-visible:ring-opacity-75 focus-visible:ring-offset-2'
                        )}
                      >
                        <RadioGroupPrimitive.Indicator className="absolute inset-0 flex items-center justify-center leading-0">
                          <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                        </RadioGroupPrimitive.Indicator>
                      </RadioGroupPrimitive.Item>
                      <p className="text-xs silka-medium">
                        Credit or Debit
                      </p>
                      <div className="flex flex-row space-x-1">
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    </button>
                    <button
                      onClick={(e) => {
                        setPaymentMethod('paypal');
                      }}
                      className="flex flex-row space-x-3"
                    >
                      <RadioGroupPrimitive.Item
                        checked={paymentMethod == 'paypal'}
                        value={billingInterval}
                        className={cx(
                          'peer relative w-4 h-4 my-auto rounded-full',
                          'border border-transparent text-white',
                          'radix-state-checked:bg-[#FF623D]',
                          'radix-state-unchecked:bg-gray-100',
                          'focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring focus-visible:ring-[#FF623D] focus-visible:ring-opacity-75 focus-visible:ring-offset-2'
                        )}
                      >
                        <RadioGroupPrimitive.Indicator className="absolute inset-0 flex items-center justify-center leading-0">
                          <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                        </RadioGroupPrimitive.Indicator>
                      </RadioGroupPrimitive.Item>
                      <p className="text-xs silka-medium text-gray-900">
                        PayPal
                      </p>
                      <div className=""></div>
                    </button>
                  </div>
                </div>
              </RadioGroupPrimitive.Root>
              {paymentMethod == 'stripe' ? (
                <div className="mt-5 flex flex-col">
                  <h3 className="text-xs silka-medium text-gray-800">
                    Payment Information
                  </h3>
                  {isLoading ? (
                    <div className="mt-3 flex flex-col space-y-1.5">
                      <div className="flex flex-row space-x-2">
                        <div className="h-3 rounded w-1/5 animate-pulse bg-gray-200" />
                        <div className="h-3 rounded w-1/5 animate-pulse bg-gray-200" />
                        <div className="h-3 rounded w-1/5 animate-pulse bg-gray-200" />
                        <div className="h-3 rounded w-1/5 animate-pulse bg-gray-200" />
                        <div className="h-3 rounded w-1/5 animate-pulse bg-gray-200" />
                      </div>
                      <div className="flex flex-row space-x-2">
                        <div className="h-3 rounded w-1/4 animate-pulse bg-gray-200" />
                        <div className="h-3 rounded w-1/4 animate-pulse bg-gray-200" />
                        <div className="h-3 rounded w-1/4 animate-pulse bg-gray-200" />
                      </div>
                      <div className="flex flex-row space-x-2">
                        <div className="h-3 rounded w-1/3 animate-pulse bg-gray-200" />
                        <div className="h-3 rounded w-1/3 animate-pulse bg-gray-200" />
                      </div>
                    </div>
                  ) : (
                    <>
                      {paymentInfoData ? (
                        <Elements
                          stripe={stripePromise}
                          options={options}
                        >
                          <ProUpgradeElements
                            userName={userName}
                            billingInterval={billingInterval}
                            email={email}
                            setIsOpen={setIsOpen}
                            workspaceId={workspaceId}
                            type="PRO"
                          />
                        </Elements>
                      ) : (
                        <Elements
                          stripe={stripePromise}
                          options={options}
                        >
                          <ProUpgradeElements
                            userName={userName}
                            billingInterval={billingInterval}
                            email={email}
                            setIsOpen={setIsOpen}
                            workspaceId={workspaceId}
                            type="PRO"
                          />
                        </Elements>
                      )}
                    </>
                  )}
                </div>
              ) : (
                <>
                  <div className="flex flex-col">
                    <div className="flex flex-col space-y-3 mt-5">
                      <h3 className="text-xs silka-medium text-gray-800">
                        Order Summary
                      </h3>
                      <div className="flex w-full flex-col space-y-2.5">
                        <div className="w-full mt-0.5 mb-2.5">
                          <div className="flex flex-row justify-between items-between">
                            <div className="flex flex-col space-y-0.5">
                              <p className="silka-medium text-gray-900 text-sm">
                                Disperse Pro
                              </p>
                              <div className="flex flex-row space-x-1">
                                <span className="silka-regular text-[11px] text-gray-400">
                                  {billingInterval == 'monthly' ? (
                                    <>$39 / month</>
                                  ) : (
                                    <>$29 / month</>
                                  )}
                                </span>
                                <span className="silka-regular text-[11px] text-gray-400">
                                  &middot;
                                </span>
                                <span className="silka-regular text-[11px] text-gray-400">
                                  {billingInterval == 'monthly' ? (
                                    <>Billed Monthly</>
                                  ) : (
                                    <>Billed Annually</>
                                  )}
                                </span>
                              </div>
                            </div>
                            <p className="my-auto text-sm text-gray-700 silka-regular">
                              {billingInterval == 'monthly' ? (
                                <>$39</>
                              ) : (
                                <>$348</>
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-row justify-end items-end">
                          <PayPalButtons
                            style={{
                              layout: 'horizontal',
                              height: 40,
                            }}
                            createSubscription={(data, actions) => {
                              if (billingInterval == 'monthly') {
                                return actions.subscription.create({
                                  plan_id:
                                    'P-2PR18136SR937864HMOSTCEI',
                                });
                              } else {
                                return actions.subscription.create({
                                  plan_id:
                                    'P-1YC13741W9252402EMOSWCBA',
                                });
                              }
                            }}
                            onApprove={(data, actions) => {
                              setIsOpen(false);
                              toast.loading('Upgrading to Pro...', {
                                className: 'text-sm silka-medium',
                                duration: 80000,
                              });
                              return axios
                                .post(
                                  `${apiUrl()}workspace/update/paypalpro`,
                                  null,
                                  {
                                    params: {
                                      subscriptionId:
                                        data.subscriptionID,
                                      workspaceId: workspaceId,
                                    },
                                  }
                                )
                                .then(async (value: any) => {
                                  if (value.message == 'success') {
                                    toast.remove();
                                    toast.success(
                                      'Successfully Upgraded to Pro!',
                                      {
                                        className:
                                          'text-sm silka-medium text-gray-900',
                                      }
                                    );
                                    router.reload();
                                  } else {
                                    toast.remove();
                                    toast.error(
                                      'Error upgrading plan, please try again!',
                                      {
                                        className:
                                          'text-sm silka-medium text-gray-900',
                                      }
                                    );
                                  }
                                });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </PayPalScriptProvider>
        </DialogPrimitive.Content>
      </Transition.Child>
    </Transition.Root>
  );
}
