import Link from 'next/link';
import Router from 'next/router';
import { useState } from 'react';

export function SignUp() {
  const [email, setEmail] = useState('');

  return (
    <div className="flex flex-col justify-center items-center bg-[#FCFCFC]">
      <div className="w-11/12 lg:w-3/4 2xl:w-3/5 flex flex-col lg:flex-row lg:space-x-16 py-16 lg:py-24">
        <div className="w-full lg:w-1/2 flex flex-col space-y-2.5 my-auto">
          <h3 className="text-xl lg:text-2xl silka-semibold text-[#363636]">
            Get Started with Disperse
          </h3>
          <p className="text-sm lg:text-base silka-regular text-[#363636]">
            The easiest way to manage and post your content on all
            social platforms.
          </p>
        </div>
        <div className="w-full mt-6 lg:mt-0 lg:w-1/2 my-auto flex flex-col space-y-3">
          <form className="flex flex-row space-x-3">
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              className="flex-1 rounded border bg-[#FCFCFC] border-gray-300 focus:border-[#FF623D] focus:ring-0 text-sm silka-regular"
              placeholder="Enter your email"
            />
            <Link href={'/signup?email=' + email} legacyBehavior>
              <button
                type="submit"
                className="px-5 py-1 text-sm silka-medium text-white bg-[#FF623D] rounded"
              >
                Get Started
              </button>
            </Link>
          </form>
          <Link
            href="/contact-sales"
            className="underline text-[#FF623D] hover:opacity-80 underline-offset-2 text-start text-xs silka-medium w-full">
            
              or book a demo
            
          </Link>
        </div>
      </div>
    </div>
  );
}
