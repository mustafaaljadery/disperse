import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import axiosRetry from 'axios-retry';

import { useEffect, useState } from 'react';
import { apiUrl } from '../../../utils/apiUrl';
import * as DialogPrimitive from '@radix-ui/react-dialog';

interface StripePaymentProps {
  userId: string;
}
const stripePromise = loadStripe(
  'pk_live_51M6JnIKq4w9CjH7gITYJVypCr6ElfAH6sgcmWxZNG178QXOavV524Yt0uenoZq6QGDxDst5GavhjxyqMbJSMy2c50033gQqzPZ'
);

async function getClientSecret(userId: string) {
  try {
    axiosRetry(axios, { retries: 3 });

    const result = await axios.get(
      `${apiUrl()}stripe/read/clientsecret`,
      {
        params: { userId: userId },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

export function StripePayment({ userId }: StripePaymentProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    getClientSecret(userId).then((value) => {
      setClientSecret(value.client_secret);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div></div>;
  }

  const options = {
    clientSecret: clientSecret,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <MyComponent />
    </Elements>
  );
}

function MyComponent() {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<any>(null);

  async function handleSubmit() {
    try {
      if (!stripe || !elements) {
        // Stripe.js has not yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }

      const { error } = await stripe.confirmSetup({
        //`Elements` instance that was used to create the Payment Element
        elements,
        confirmParams: {
          return_url:
            'https://trydisperse.com/dashboard/settings/billing',
        },
      });

      if (error) {
        setErrorMessage(String(error.message));
      } else {
      }
    } catch (e) {}
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="w-full"
    >
      <PaymentElement />
      {errorMessage && <div>{errorMessage}</div>}
      <div className="mt-10 flex flex-row space-x-5 justify-end">
        <button
          className="text-xs silka-medium text-white px-4 py-1.5 rounded bg-[#FF623D] hover:opacity-90"
          disabled={!stripe}
        >
          Add Card
        </button>
        <DialogPrimitive.Close>
          <button className="text-xs silka-medium text-gray-700 px-4 py-1.5 rounded hover:opacity-90 border">
            Cancel
          </button>
        </DialogPrimitive.Close>
      </div>
    </form>
  );
}
