import Link from 'next/link';

export function Footer() {
  return (
    <footer className="flex flex-col">
      <div className="bg-black w-full py-20 md:py-24 flex flex-col justify-center items-center">
        <div className="w-[90%] xl:w-[70%] flex flex-row flex-wrap">
          <div className="w-full md:w-1/3">
            <p className="text-white text-2xl pr-4 silka-bold">
              Create & Manage Social Media Content
              <span className="text-[#FF623D]">.</span>
            </p>
          </div>
          <div className="w-1/2 md:w-1/6 flex flex-col space-y-6 p-2 md:p-0 mt-10 md:mt-0">
            <Link
              href="/"
              className="text-sm xl:text-base silka-medium text-white transition-all delay-100 ease-in-out hover:text-gray-300 hover:underline hover:underline-offset-2"
            >
              Home
            </Link>
            <Link
              href="/integrations"
              className="text-sm xl:text-base silka-medium text-white transition-all delay-100 ease-in-out hover:text-gray-300 hover:underline hover:underline-offset-2"
            >
              Integrations
            </Link>
          </div>
          <div className="w-1/2 md:w-1/6 flex flex-col space-y-6 p-2 md:p-0 mt-10 md:mt-0">
            <Link
              href="/creator"
              className="text-sm xl:text-base silka-medium text-white transition-all delay-100 ease-in-out hover:text-gray-300 hover:underline hover:underline-offset-2"
            >
              Creator
            </Link>
            <Link
              href="/business"
              className="text-sm xl:text-base silka-medium text-white transition-all delay-100 ease-in-out hover:text-gray-300 hover:underline hover:underline-offset-2"
            >
              Business
            </Link>
            <Link
              href="/enterprise"
              className="text-sm xl:text-base silka-medium text-white transition-all delay-100 ease-in-out hover:text-gray-300 hover:underline hover:underline-offset-2"
            >
              Enterprise
            </Link>
          </div>
          <div className="w-1/2 md:w-1/6 flex flex-col space-y-6 p-2 md:p-0 mt-10 md:mt-0">
            <Link
              href="/blog"
              className="text-sm xl:text-base silka-medium text-white transition-all delay-100 ease-in-out hover:text-gray-300 hover:underline hover:underline-offset-2"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="text-sm xl:text-base silka-medium text-white transition-all delay-100 ease-in-out hover:text-gray-300 hover:underline hover:underline-offset-2"
            >
              Contact
            </Link>
          </div>
          <div className="w-1/2 md:w-1/6 flex flex-col space-y-6 p-2 md:p-0 mt-10 md:mt-0">
            <Link
              href="/terms-of-service"
              className="text-sm xl:text-base silka-medium text-white transition-all delay-100 ease-in-out hover:text-gray-300 hover:underline hover:underline-offset-2"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy-policy"
              className="text-sm xl:text-base silka-medium text-white transition-all delay-100 ease-in-out hover:text-gray-300 hover:underline hover:underline-offset-2"
            >
              Privacy Policy
            </Link>
            <Link
              href="/cookie-policy"
              className="text-sm xl:text-base silka-medium text-white transition-all delay-100 ease-in-out hover:text-gray-300 hover:underline hover:underline-offset-2"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
      <div className="py-5 w-full flex flex-col bg-black justify-center items-center">
        <div className="w-[90%] xl:w-[70%] flex flex-row justify-between items-between">
          <div className="flex flex-row space-x-3 my-auto">
            <Link
              href="/sitemap"
              className="silka-medium text-white text-[11px] md:text-sm transition-all ease-in-out delay-100 hover:underline hover:opacity-80 hover:underline-offset-2"
            >
              Site Map
            </Link>
          </div>
          <div className="flex flex-row space-x-5 md:space-x-7 my-auto">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/company/trydisperse/"
              aria-label="Linkedin Logo"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                className="my-auto transition-all ease-in-out delay-100 hover:opacity-80"
              >
                <path
                  fill="white"
                  d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"
                />
              </svg>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/trydisperse"
              aria-label="Twitter Logo"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                className="my-auto mt-0.5 md:mt-1"
              >
                <path
                  fill="white"
                  d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                />
              </svg>
            </a>
          </div>
          <div className="my-auto">
            <p className="my-auto text-[11px] md:text-sm text-white silka-medium">
              © Disperse Social LLC
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
