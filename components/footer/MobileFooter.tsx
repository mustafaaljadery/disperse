import { DisperseLogoSmall } from '../logos/DisperseLogo';
import Link from 'next/link';
import { TwitterLogo, TwitterLogoMedium } from '../logos/TwitterLogo';

export function MobileFooter() {
  return (
    <footer className="w-full flex flex-col justify-center items-center">
      <div className="w-11/12 flex flex-col">
        <hr />
        <Link href="/" legacyBehavior>
          <div className="mt-10 flex flex-row space-x-3">
            <DisperseLogoSmall />
            <Link href="/" className="text-lg silka-semibold my-auto">
              
                Disperse
              
            </Link>
          </div>
        </Link>
        <div className="flex flex-row space-x-5 mt-10">
          <div className="w-1/2 flex flex-col text-sm space-y-2.5">
            <p className="silka-semibold">PRODUCT</p>
            <Link href="/" className="silka-regular">
              Home
            </Link>
            <Link href="/featuers" className="silka-regular">
              Features
            </Link>
            <Link href="/integrations" className="silka-regular">
              Integrations
            </Link>
          </div>
          <div className="w-1/2 flex flex-col text-sm space-y-2.5">
            <p className="silka-semibold">SOLUTIONS</p>
            <Link href="/creator" className="silka-regular">
              Creator
            </Link>
            <Link href="/business" className="silka-regular">
              Small Business
            </Link>
            <Link href="/enterprise" className="silka-regular">
              Enterprise
            </Link>
          </div>
        </div>
        <div className="flex flex-row space-x-5 mt-12">
          <div className="w-1/2 flex flex-col text-sm space-y-2.5">
            <p className="silka-semibold">RESOURCES</p>
            <Link href="/blog" className="silka-reuglar">
              Blog
            </Link>
            <Link href="/guide" className="silka-regular">
              Guide
            </Link>
            <Link href="/contact" className="silka-regular">
              Contact
            </Link>
          </div>
          <div className="w-1/2 flex flex-col text-sm space-y-2.5">
            <p className="silka-semibold">LEGAL</p>
            <Link href="/terms-of-service" className="silka-regular">
              Terms of Service
            </Link>
            <Link href="/privacy-policy" className="silka-regular">
              Privacy Policy
            </Link>
            <Link href="/cookie-policy" className="silka-regular">
              Cookie Policy
            </Link>
          </div>
        </div>
        <div className="flex flex-col w-full mt-12 mb-8">
          <div className="flex flex-row space-x-12">
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="silka-regular text-sm underline underline-offset-2"
            >
              Twitter
            </a>
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="silka-regular text-sm underline underline-offset-2"
            >
              Linkedin
            </a>
          </div>
          <p className="text-sm text-[#ADADAD] mt-8 silka-regular">
            © 2022 Disperse, LLC.
          </p>
        </div>
      </div>
    </footer>
  );
}
