import Link from 'next/link';
import { SetStateAction, Dispatch } from 'react';

interface Props {
  emailGiven: boolean;
  setEmailGiven: Dispatch<SetStateAction<boolean>>;
}

export function CreateAnAccount({
  emailGiven,
  setEmailGiven,
}: Props) {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-2/5 flex flex-col justify-center items-center h-[100vh]">
        <h2 className="text-4xl silka-semibold">Create an account</h2>
        <form className="flex flex-col">
          <label></label>
          <button
            onClick={() => {
              setEmailGiven(true);
            }}
          >
            Hello world
          </button>
        </form>
        <div className="flex flex-row space-x-4 w-full">
          <div className="w-1/2 my-auto">
            <hr />
          </div>
          <p className="my-auto silka-medium text-sm text-[#383838]">
            or
          </p>
          <div className="w-1/2 my-auto">
            <hr className="boder-[#CACACA]" />
          </div>
        </div>
        <div></div>
        <p className="text-center">
          Have an account?{' '}
          <Link href="/signin" className="underline underline-offset-2">
            Log in
          </Link>
        </p>
        <p className="silka-regular text-sm text-center w-full text-[#555555] mt-24">
          By signing up, you agree to the{' '}
          <Link href="/terms-of-service" className="underline underline-offset-2">
            
              Terms of Service
            
          </Link>
          , and the{' '}
          <Link href="/privacy-policy" className="underline underline-offset-2">
            
              Privacy Policy
            
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
