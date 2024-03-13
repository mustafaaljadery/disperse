import { DisperseLogo } from '../logos/DisperseLogo';
import Link from 'next/link';
import { useState, Dispatch, SetStateAction } from 'react';

interface Props {
  emailGiven: boolean;
  setEmailGiven: Dispatch<SetStateAction<boolean>>;
}

export function PasswordField() {
  return (
    <>
      <input type="password" placeholder="Password" />
    </>
  );
}

export function SignIn({ emailGiven, setEmailGiven }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-2/5 h-[100vh] flex flex-col justify-center items-center">
        <DisperseLogo />
        <h1></h1>
        <div></div>
        <div className="w-full flex flex-row space-x-5 my-16">
          <hr className="my-auto w-1/2" />
          <p className="text-sm my-auto silka-medium">or</p>
          <hr className="my-auto w-1/2" />
        </div>
        <form className="flex flex-col space-y-4">
          <input
            required
            type="email"
            placeholder="Email address"
            className=""
          />
          {emailGiven ? <PasswordField /> : <></>}
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              if (!emailGiven) {
                setEmailGiven(true);
              } else {
              }
            }}
          >
            Sign in
          </button>
        </form>
        <Link href="/forgot-password">

        </Link>
      </div>
    </div>
  );
}
