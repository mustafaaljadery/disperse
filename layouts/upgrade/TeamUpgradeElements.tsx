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
import { usePostHog } from 'posthog-js/react';
import { merseConversion } from '../../components/utils/MerseConversion';

interface Props {
  userName: string;
  billingInterval: any;
  email: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  workspaceId: string;
}

export function TeamUpgradeElements({
  userName,
  billingInterval,
  email,
  setIsOpen,
  workspaceId,
}: Props) {
  const stripe = useStripe();
  const elements = useElements();
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

    await stripe!
      .confirmPayment({
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
          setIsOpen(false);
          const result = await axios.post(
            `${apiUrl()}workspace/update/teamworkspaceplan`,
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
            merseConversion(billingInterval == 'monthly' ? 49 : 468);
            //@ts-ignore
            window.dataLayer.push({
              event:
                billingInterval == 'monthly'
                  ? 'purchase-team-monthly'
                  : 'purchase-team-annual',
            });
            toast.success('Successfully Upgraded to Team!', {
              className: 'text-sm silka-medium text-gray-900',
            });
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
    /*
    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
    */
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
                      <>$49 / month</>
                    ) : (
                      <>$39 / month</>
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
                {billingInterval == 'monthly' ? <>$49</> : <>$468</>}
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
