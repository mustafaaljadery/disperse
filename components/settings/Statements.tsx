import axios from 'axios';
import axiosRetry from 'axios-retry';
import { useEffect, useState } from 'react';
import { apiUrl } from '../../utils/apiUrl';
import Link from 'next/link';

interface StatementsProps {
  userId: string;
}

interface StatementComponentProps {
  value: any;
}

async function getStatements(userId: string) {
  axiosRetry(axios, { retries: 3 });

  try {
    const result = await axios.get(
      `${apiUrl()}user/read/statements`,
      {
        params: { userId: userId },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

function StatementComponent({ value }: StatementComponentProps) {
  return (
    <div className="flex flex-col">
      <div className="py-4 flex flex-row w-full">
        <div className="flex flex-col justify-start items-start w-1/2">
          <p className="my-auto silka-medium text-gray-900 text-sm">
            {value[0]}
          </p>
        </div>
        <div className="flex flex-col justify-start items-start w-1/4">
          <p className="my-auto silka-regular text-gray-500 text-sm">
            ${value[1]}
          </p>
        </div>
        <div className="flex flex-col justify-center items-center w-1/4">
          <Link href={'/dashboard/settings/billing/' + value[0]} legacyBehavior>
            <button className="text-xs silka-medium text-gray-800 border py-1 px-3 rounded hover:bg-gray-50 my-auto">
              View Details
            </button>
          </Link>
        </div>
      </div>
      <hr className="w-full" />
    </div>
  );
}

export function Statements({ userId }: StatementsProps) {
  const [statementData, setStatementData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  axiosRetry(axios, { retries: 3 });

  useEffect(() => {
    getStatements(userId).then((value) => {
      setStatementData(value);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col mt-12">
        <h2 className="silka-semibold text-xs text-gray-500">
          STATEMENTS
        </h2>
        <div className="mt-3 flex flex-row">
          <p className="w-1/2 text-xs silka-regular text-gray-500">
            Month
          </p>
          <p className="w-1/4 text-xs silka-regular text-gray-500">
            Amount
          </p>
        </div>
        <div className="mt-4 flex flex-col space-y-3">
          <div className="flex flex-row">
            <div className="flex flex-col justify-start items-start w-1/2">
              <div className="w-44 h-6 rounded bg-gray-100 animate-pulse" />
            </div>
            <div className="flex flex-col justify-start items-start w-1/4">
              <div className="w-32 h-6 rounded bg-gray-100 animate-pulse" />
            </div>
            <div className="flex flex-col justify-end items-end w-1/4">
              <div className="w-24 h-6 rounded bg-gray-100 animate-pulse" />
            </div>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-col justify-start items-start w-1/2">
              <div className="w-44 h-6 rounded bg-gray-100 animate-pulse" />
            </div>
            <div className="flex flex-col justify-start items-start w-1/4">
              <div className="w-32 h-6 rounded bg-gray-100 animate-pulse" />
            </div>
            <div className="flex flex-col justify-end items-end w-1/4">
              <div className="w-24 h-6 rounded bg-gray-100 animate-pulse" />
            </div>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-col justify-start items-start w-1/2">
              <div className="w-44 h-6 rounded bg-gray-100 animate-pulse" />
            </div>
            <div className="flex flex-col justify-start items-start w-1/4">
              <div className="w-32 h-6 rounded bg-gray-100 animate-pulse" />
            </div>
            <div className="flex flex-col justify-end items-end w-1/4">
              <div className="w-24 h-6 rounded bg-gray-100 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col mt-12">
      <h3 className="silka-semibold text-xs text-gray-500">
        STATEMENTS
      </h3>
      <div className="mt-3 flex flex-row">
        <p className="w-1/2 text-xs silka-regular text-gray-500">
          Month
        </p>
        <p className="w-1/4 text-xs silka-regular text-gray-500">
          Amount
        </p>
      </div>
      <div>
        {statementData.map((value: any, index: number) => {
          return <StatementComponent key={index} value={value} />;
        })}
      </div>
    </div>
  );
}
