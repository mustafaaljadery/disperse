import { Dispatch, SetStateAction } from 'react';
import FadeDown from '../../components/animations/FadeDown';
import {
  DisperseLogoNormal,
  DisperseLogoSmall,
} from '../../components/logos/DisperseLogo';

interface ErrorMessageProps {
  message: string;
  setErrorOpen: Dispatch<SetStateAction<boolean>>;
}

function ErrorMessage({ setErrorOpen, message }: ErrorMessageProps) {
  return (
    <div className="flex flex-row justify-between items-between w-full bg-[#F9DAD8] border rounded-lg border-[#DF4D47] px-4 py-2 lg:py-2.5">
      <div className="flex flex-row space-x-2">
        <svg
          width="20"
          height="20"
          viewBox="0 0 8 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="my-auto"
        >
          <g clipPath="url(#clip0_491_2)">
            <path
              d="M4.00067 7.17818C5.84 7.17818 7.33333 5.68485 7.33333 3.84552C7.33333 2.00618 5.84 0.513184 4.00067 0.513184C2.16167 0.513184 0.668335 2.00618 0.668335 3.84552C0.668335 5.68485 2.16167 7.17818 4.00067 7.17818ZM4.00067 6.67818C2.43733 6.67818 1.16833 5.40885 1.16833 3.84552C1.16833 2.28218 2.43733 1.01318 4.00067 1.01318C5.564 1.01318 6.83333 2.28218 6.83333 3.84552C6.83333 5.40885 5.564 6.67818 4.00067 6.67818ZM4.00067 4.51152C3.86267 4.51152 3.75067 4.39952 3.75067 4.26152V2.42818C3.75067 2.29018 3.86267 2.17818 4.00067 2.17818C4.13867 2.17818 4.25067 2.29018 4.25067 2.42818V4.26152C4.25067 4.39952 4.13867 4.51152 4.00067 4.51152ZM4 5.51152C4.184 5.51152 4.33333 5.36218 4.33333 5.17818C4.33333 4.99418 4.184 4.84485 4 4.84485C3.816 4.84485 3.66667 4.99418 3.66667 5.17818C3.66667 5.36218 3.816 5.51152 4 5.51152Z"
              fill="#DF4D47"
            />
          </g>
          <defs>
            <clipPath id="clip0_491_2">
              <rect width="8" height="8" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <p className="silka-medium my-auto text-xs md:text-sm text-[#DF4D47]">
          {message}
        </p>
      </div>
      <button
        onClick={() => {
          setErrorOpen(false);
        }}
      >
        <svg
          width="10"
          height="10"
          viewBox="0 0 8 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="my-auto"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4 3.46511L6.8595 0.605105C6.9325 0.532105 7.029 0.495605 7.125 0.495605C7.327 0.495605 7.5 0.657605 7.5 0.870105C7.5 0.966605 7.4635 1.06261 7.3905 1.13611L4.5305 3.99561L7.39 6.8551C7.4635 6.9286 7.5 7.0246 7.5 7.1206C7.5 7.3341 7.3255 7.4956 7.125 7.4956C7.029 7.4956 6.9325 7.45911 6.8595 7.38611L4 4.52661L1.1405 7.38611C1.0675 7.45911 0.971 7.4956 0.875 7.4956C0.6745 7.4956 0.5 7.3341 0.5 7.1206C0.5 7.0246 0.5365 6.9286 0.61 6.8551L3.4695 3.99561L0.6095 1.13611C0.5365 1.06261 0.5 0.966605 0.5 0.870105C0.5 0.657605 0.673 0.495605 0.875 0.495605C0.971 0.495605 1.0675 0.532105 1.1405 0.605105L4 3.46511Z"
            fill="#DF4D47"
          />
        </svg>
      </button>
    </div>
  );
}

export default function ResetPassword() {
  return (
    <div className="flex flex-col jusitfy-center items-center">
      <div className="w-[90%] md:w-2/5 lg:w-1/5 flex flex-col justify-center items-center h-[100vh] px-4">
        <FadeDown delayValue={0.2}>
          <div className="flex flex-col justify-center items-center">
            <div className="hidden md:block">
              <DisperseLogoNormal />
            </div>
            <div className="block md:hidden">
              <DisperseLogoSmall />
            </div>
            <h1></h1>
          </div>
        </FadeDown>
      </div>
    </div>
  );
}
