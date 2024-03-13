import { useState, useEffect } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { apiUrl } from '../../utils/apiUrl';

interface Props {
  userId: string;
}

async function getUnpaidData(userId: string) {
  try {
    const result = await axios.get(`${apiUrl()}referrals/unpaid`, {
      params: {
        userId: userId,
      },
    });
    console.log('value', result.data);
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

async function handleSubmit(userId: string, method: string) {
  try {
    const result = await axios.post(
      `${apiUrl()}referrals/payout`,
      null,
      {
        params: {
          userId: userId,
          method: method,
        },
      }
    );
    toast.success(
      'Successfully requested, we will contact you via email in the next 3 business days for exact payment details.',
      {
        className: 'text-sm silka-medium text-gray-900',
      }
    );
    return result.data;
  } catch (e) {
    toast.error('Something went wrong, please try again!', {
      className: 'text-sm silka-medium text-gray-900',
    });
    console.log(e);
  }
}

const payments = [
  {
    name: 'Venmo',
    image: '/payments/venmo.svg',
    alt: 'Image of Venmo Logo',
  },
  {
    name: 'PayPal',
    image: '/payments/paypal.svg',
    alt: 'Image of PayPal Logo',
  },
  {
    name: 'Zelle',
    image: '/payments/zelle.svg',
    alt: 'Image of Zelle Logo',
  },
  {
    name: 'CashApp',
    image: '/payments/cash-app.svg',
    alt: 'Image of CashApp Logo',
  },
  {
    name: 'Ethereum',
    image: '/payments/eth.svg',
    alt: "Image of Ethereum's Logo",
  },
  {
    name: 'Bitcoin',
    image: '/payments/btc.svg',
    alt: 'Image of Bitcoin Logo',
  },
  {
    name: 'AliPay',
    image: '/payments/ali-pay.svg',
    alt: 'Image of AliPay Logo',
  },
];

interface ComponentProps {
  image: string;
  alt: string;
  name: string;
  selectedPayment: string;
  setSelectedPayment: any;
}

function Component({
  image,
  alt,
  name,
  selectedPayment,
  setSelectedPayment,
}: ComponentProps) {
  return (
    <div className="p-2">
      <button
        onClick={() => {
          setSelectedPayment(name);
        }}
        className={name == selectedPayment ? '' : 'opacity-60'}
      >
        <Image
          className="rounded"
          height={300}
          width={96}
          alt={alt}
          src={image}
        />
      </button>
    </div>
  );
}

export function RequestPayout({ userId }: Props) {
  const [selectedPayment, setSelectedPayment] = useState('');
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUnpaidData(userId).then((data) => {
      setAmount(data.unpaid);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-col space-y-3">
        <h2 className="silka-semibold text-sm text-[#363636]">
          Select Payment
        </h2>
        <div className="flex w-full flex-row flex-wrap">
          {payments.map((payment) => (
            <Component
              key={payment.alt}
              image={payment.image}
              alt={payment.alt}
              name={payment.name}
              selectedPayment={selectedPayment}
              setSelectedPayment={setSelectedPayment}
            />
          ))}
        </div>
      </div>
      <div className="mt-8 w-full flex flex-row justify-between items-between">
        <div className="flex flex-col space-y-1.5">
          <p className="text-sm silka-semibold text-gray-600">
            Amount to be payed out:
          </p>
          {isLoading ? (
            <div className="h-8 w-16 rounded bg-gray-200 animate-pulse" />
          ) : (
            <span className="text-3xl silka-semibold text-[#363636]">
              ${amount}
            </span>
          )}
        </div>
        <div className="my-auto">
          <button
            onClick={() => {
              if (selectedPayment == '') {
                toast.error('Please select a payment method!', {
                  className: 'text-gray-900 text-sm silka-medium',
                });
                return;
              } else if (amount == 0) {
                toast.error('Payout must be over $1!', {
                  className: 'text-gray-900 text-sm silka-medium',
                });
                return;
              } else {
                handleSubmit(userId, selectedPayment);
              }
            }}
            className="bg-[#FF623D] text-[11px] md:text-xs silka-medium text-white px-3 md:px-4 py-1 md:py-1.5 rounded"
          >
            Request Payout
          </button>
        </div>
      </div>
    </div>
  );
}
