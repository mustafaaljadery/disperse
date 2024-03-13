import React, { useState, Dispatch, SetStateAction } from 'react';
import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import toast from 'react-hot-toast';
import { apiUrl } from '../../utils/apiUrl';
import { useRouter } from 'next/router';
import { usePostHog } from 'posthog-js/react';
import { merseConversion } from '../../components/utils/MerseConversion';

interface Props {
  userName: string;
  billingInterval: any;
  email: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  workspaceId: string;
  type: string;
}

export function ProUpgradeElements({
  userName,
  billingInterval,
  email,
  setIsOpen,
  workspaceId,
  type,
}: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const posthog = usePostHog();

  axiosRetry(axios, { retries: 3 });

  const [errorMessage, setErrorMessage] = useState<any>(null);

  const handleSubmit = async (event: any) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsOpen(false);
    toast.loading('Upgrading to Pro...', {
      className: 'text-sm silka-medium text-gray-900',
      duration: 80000,
    });

    await stripe!
      .confirmPayment({
        //`Elements` instance that was used to create the Payment Element
        elements,
        confirmParams: {
          return_url:
            'https://api.trydisperse.com/workspace/create/paidworkspace',
          payment_method_data: {
            billing_details: {
              name: userName,
            },
          },
        },
        redirect: 'if_required',
      })
      .then(async (value) => {
        try {
          const result = await axios.post(
            `${apiUrl()}workspace/update/workspaceplan`,
            null,
            {
              params: {
                workspaceId: workspaceId,
                paymentIntent: String(value?.paymentIntent?.id),
              },
            }
          );
          if (result.data.message == 'success') {
            posthog?.capture('paid_user');
            toast.remove();
            merseConversion(billingInterval == 'monthly' ? 39 : 348);
            //@ts-ignore
            window.dataLayer.push({
              event:
                billingInterval == 'monthly'
                  ? 'purchase-pro-monthly'
                  : 'purchase-pro-annual',
            });
            toast.success('Successfully Upgraded to Pro!', {
              className: 'text-sm silka-medium text-gray-900',
            });
            router.reload();
          } else {
            toast.remove();
            toast.error(
              'Error Upgrading Workspace, please try again.',
              { className: 'text-sm silka-medium text-gray-900' }
            );
          }
          return result.data;
        } catch (e) {
          console.log(e);
        }
      });
  };

  const paymentElementOptions = {
    layout: 'tabs',
  };

  return (
    <form
      className="mt-3 flex flex-col"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e);
      }}
    >
      <PaymentElement
        id="payment-element"
        //@ts-ignore
        options={paymentElementOptions}
      />
      {errorMessage && <div>{errorMessage}</div>}
      <div className="mt-5 flex flex-col space-y-3">
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
                      <>
                        {type == 'PRO'
                          ? '$39 / month'
                          : '$59 / month'}
                      </>
                    ) : (
                      <>
                        {type == 'PRO'
                          ? '$29 / month'
                          : '$49 / month'}
                      </>
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
                  <>{type == 'PRO' ? '$39' : '$59'}</>
                ) : (
                  <>{type == 'PRO' ? '$348' : '$588'}</>
                )}
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-end items-end">
            <button
              type="submit"
              className="text-xs silka-medium text-white px-5 py-2 bg-[#FF623D] rounded hover:opacity-90"
              disabled={!stripe}
            >
              Upgrade to Pro{' '}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
