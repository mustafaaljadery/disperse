import { useState } from 'react';
import { DisperseLogoMobile } from '../logos/DisperseLogo';
import styles from '../../styles/mobile-menu.module.css';
import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ViewIconSmall } from '../icons/ViewIcon';

export default function MobileMenu() {
  const [isMenuMounted, setIsMenuMounted] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  const router = useRouter();

  function toggleMenu() {
    if (isMenuMounted) {
      setIsMenuMounted(false);
      document.body.style.overflow = '';
    } else {
      setIsMenuMounted(true);
      document.body.style.overflow = 'hidden';
    }
  }

  return <>
    <div
      className={
        'flex flex-row justify-between items-between py-3 ' +
        (isMenuMounted ? 'border-b' : '')
      }
    >
      <Link href="/" legacyBehavior>
        <div className="flex flex-row space-x-3 relative h-10">
          <DisperseLogoMobile />
          <Link href="/" className="silka-semibold my-auto text-lg">
            
              Disperse
            
          </Link>
        </div>
      </Link>

      <button type="button" className={cn()} onClick={toggleMenu}>
        {isMenuMounted ? (
          <svg
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.2094 0.196687L8.80497 6.60109C8.54272 6.86334 8.12741 6.86334 7.88693 6.60109L1.48253 0.196687C1.22028 -0.0655623 0.80497 -0.0655623 0.564492 0.196687C0.302243 0.458936 0.302243 0.874247 0.564492 1.11472L6.96889 7.51912C7.23114 7.78137 7.23114 8.19668 6.96889 8.43716L0.542634 14.8634C0.280385 15.1257 0.280385 15.541 0.542634 15.7815C0.804884 16.0437 1.22019 16.0437 1.46067 15.7815L7.86507 9.37705C8.12732 9.11481 8.54263 9.11481 8.78311 9.37705L15.2094 15.8033C15.4716 16.0656 15.8869 16.0656 16.1274 15.8033C16.3897 15.5411 16.3897 15.1258 16.1274 14.8853L9.74486 8.45902C9.48261 8.19677 9.48261 7.78146 9.74486 7.54098L16.1493 1.13658C16.4115 0.874332 16.4115 0.459022 16.1493 0.218545C15.887 -0.0438567 15.4717 -0.0438567 15.2094 0.196589L15.2094 0.196687Z"
              fill="black"
            />
          </svg>
        ) : (
          <svg
            width="22"
            height="24"
            viewBox="0 0 22 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.4375 9H18.5625M3.4375 15.75H18.5625"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    </div>
    {isMenuMounted && (
      <div className="flex flex-col">
        <ul
          className={cn(
            styles.menu,
            'flex flex-col px-4 items-center absolute bg-white',
            isMenuMounted && styles.menuRendered
          )}
        >
          <div className="w-full border-b border-gray-300">
            <button
              onClick={(e) => {
                e.preventDefault();
                setProductOpen(!productOpen);
              }}
              className="flex flex-row justify-between w-full items-between"
            >
              <a className="flex silka-semibold w-full text-lg py-4">
                Product
              </a>
              <ViewIconSmall
                className={
                  'my-auto mr-1 ' +
                  (productOpen ? 'transition-all rotate-90' : '')
                }
              />
            </button>
            {productOpen ? (
              <div className="pb-4 pt-2 flex flex-col space-y-4 w-full">
                <Link href="/" className="text-start w-fit silka-medium text-[#515151]">
                  
                    Home
                  
                </Link>
                <Link
                  href="/integrations"
                  className="text-start w-fit silka-medium text-[#515151]">
                  
                    Integrations
                  
                </Link>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="w-full border-b border-gray-300">
            <button
              onClick={(e) => {
                e.preventDefault();
                setSolutionsOpen(!solutionsOpen);
              }}
              className="flex flex-row justify-between w-full items-between"
            >
              <a className="flex silka-semibold w-full text-lg pb-4">
                Solutions
              </a>
              <ViewIconSmall
                className={
                  'my-auto mr-1 ' +
                  (solutionsOpen ? 'transition-all rotate-90' : '')
                }
              />
            </button>
            {solutionsOpen ? (
              <div className="pb-4 pt-2 flex flex-col space-y-4 w-full">
                <Link href="/creator" className="text-start w-fit silka-medium text-[#515151]">
                  
                    Creator
                  
                </Link>
                <Link href="/business" className="text-start w-fit silka-medium text-[#515151]">
                  
                    Small Business
                  
                </Link>
                <Link
                  href="/enterprise"
                  className="text-start w-fit silka-medium text-[#515151]">
                  
                    Enterprise
                  
                </Link>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="w-full border-b border-gray-300">
            <button
              onClick={(e) => {
                e.preventDefault();
                setResourcesOpen(!resourcesOpen);
              }}
              className="flex flex-row justify-between w-full items-between"
            >
              <a className="flex silka-semibold w-full text-lg pb-4">
                Resources
              </a>
              <ViewIconSmall
                className={
                  'my-auto mr-1 ' +
                  (resourcesOpen ? 'transition-all rotate-90' : '')
                }
              />
            </button>
            {resourcesOpen ? (
              <div className="pb-4 pt-2 flex flex-col space-y-4 w-full">
                <Link href="/blog" className="text-start w-fit silka-medium text-[#515151]">
                  
                    Blog
                  
                </Link>
                <Link href="/guide" className="text-start w-fit silka-medium text-[#515151]">
                  
                    Guide
                  
                </Link>
                <Link href="/contact" className="text-start w-fit silka-medium text-[#515151]">
                  
                    Contact
                  
                </Link>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="w-full border-b border-gray-300">
            <button className="flex flex-row justify-between w-full items-between">
              <Link href="/pricing" className="flex silka-semibold w-full text-lg pb-4">
                
                  Pricing
                
              </Link>
            </button>
          </div>
          <div className="w-full">
            <button
              onClick={(e) => {
                e.preventDefault();
                router.push('/signup');
              }}
              className="w-full py-2 bg-[#FF623D] hover:opacity-90 text-white rounded-lg silka-bold mt-6"
            >
              Sign up
            </button>
          </div>
          <div className="w-full">
            <button
              onClick={(e) => {
                e.preventDefault();
                router.push('/signin');
              }}
              className="w-full py-2 bg-[#FDDDD6] hover:opacity-90 text-[#FF623D] rounded-lg silka-bold"
            >
              Log in
            </button>
          </div>
        </ul>
      </div>
    )}
  </>;
}
