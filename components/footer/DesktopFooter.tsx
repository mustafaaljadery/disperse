import Link from 'next/link';
import { DisperseLogoSmall } from '../logos/DisperseLogo';

export function DesktopFooter() {
  return (
    <footer className="w-full flex flex-col justify-center items-center">
      <div className="w-3/5 flex flex-col pt-24 pb-16">
        <Link href="/" legacyBehavior>
          <div className="flex flex-row space-x-5 hover:opacity-80">
            <DisperseLogoSmall />
            <Link href="/" className="my-auto silka-bold text-2xl">
              Disperse
            </Link>
          </div>
        </Link>
        <div className="flex flex-row space-x-12 mt-16 w-full">
          <div className="flex flex-col space-y-3 w-1/4">
            <p className="silka-semibold">PRODUCT</p>
            <Link href="/" className="silka-medium text-[#343434] hover:opacity-80">
              
                Home
              
            </Link>
            <Link href="/features" className="silka-medium text-[#343434] hover:opacity-80">
              
                Features
              
            </Link>
            <Link
              href="/integrations"
              className="silka-medium text-[#343434] hover:opacity-80">
              
                Integrations
              
            </Link>
          </div>
          <div className="flex flex-col space-y-3 w-1/4">
            <p className="silka-semibold">SOLUTIONS</p>
            <Link href="/creator" className="silka-medium text-[#343434] hover:opacity-80">
              
                Creator
              
            </Link>
            <Link href="/business" className="silka-medium text-[#343434] hover:opacity-80">
              
                Small Business
              
            </Link>
            <Link
              href="/enterprise"
              className="silka-medium text-[#343434] hover:opacity-80">
              
                Enterprise
              
            </Link>
          </div>
          <div className="flex flex-col space-y-3 w-1/4">
            <p className="silka-semibold">RESOURCES</p>
            <Link href="/blog" className="silka-medium text-[#343434] hover:opacity-80">
              
                Blog
              
            </Link>
            <Link href="/contact" className="silka-medium text-[#343434] hover:opacity-80">
              
                Contact
              
            </Link>
          </div>
          <div className="flex flex-col space-y-3 w-1/4">
            <p className="silka-semibold">LEGAL</p>
            <Link
              href="/terms-of-service"
              className="silka-medium text-[#343434] hover:opacity-80">
              
                Terms of Service
              
            </Link>
            <Link
              href="/privacy-policy"
              className="silka-medium text-[#343434] hover:opacity-80">
              
                Privacy Policy
              
            </Link>
            <Link
              href="/cookie-policy"
              className="silka-medium text-[#343434] hover:opacity-80">
              
                Coookie Policy
              
            </Link>
          </div>
        </div>
        <div className="mt-20 flex flex-row justify-between items-between">
          <p className="text-lg silka-medium">
            © 2022 Disperse, LLC.
          </p>
          <div className="flex flex-row space-x-12">
            <a
              href="https://twitter.com/trydisperse"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="my-auto hover:opacity-80 mt-0.5"
              >
                <g clipPath="url(#clip0_192_1128)">
                  <path
                    d="M20 3.79721C19.2642 4.12388 18.4733 4.34388 17.6433 4.44305C18.4908 3.93555 19.1417 3.13138 19.4475 2.17305C18.655 2.64305 17.7767 2.98471 16.8417 3.16888C16.0942 2.37138 15.0267 1.87305 13.8467 1.87305C11.1975 1.87305 9.25083 4.34471 9.84917 6.91055C6.44 6.73971 3.41667 5.10638 1.3925 2.62388C0.3175 4.46805 0.835 6.88055 2.66167 8.10221C1.99 8.08055 1.35667 7.89638 0.804167 7.58888C0.759167 9.48971 2.12167 11.268 4.095 11.6639C3.5175 11.8205 2.885 11.8572 2.24167 11.7339C2.76333 13.3639 4.27833 14.5497 6.075 14.583C4.35 15.9355 2.17667 16.5397 0 16.283C1.81583 17.4472 3.97333 18.1264 6.29 18.1264C13.9083 18.1264 18.2125 11.6922 17.9525 5.92138C18.7542 5.34221 19.45 4.61971 20 3.79721Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_192_1128">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/company/trydisperse/"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="my-auto hover:opacity-80"
              >
                <g clipPath="url(#clip0_192_1125)">
                  <path
                    d="M4.15 2.91634C4.15 4.06717 3.225 4.99967 2.08333 4.99967C0.941667 4.99967 0.0166667 4.06717 0.0166667 2.91634C0.0166667 1.76634 0.941667 0.833008 2.08333 0.833008C3.225 0.833008 4.15 1.76634 4.15 2.91634ZM4.16667 6.66634H0V19.9997H4.16667V6.66634ZM10.8183 6.66634H6.67833V19.9997H10.8192V13.0005C10.8192 9.10884 15.8433 8.79051 15.8433 13.0005V19.9997H20V11.5572C20 4.99051 12.565 5.22967 10.8183 8.46217V6.66634Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_192_1125">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
