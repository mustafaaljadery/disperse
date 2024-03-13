import Container from '../components/Container';
import Link from 'next/link';
import Image from 'next/image';
import FiveStarImage from '../public/images/5-star.png';
import AxelImage from '../public/images/axel-logo.png';
import SheinImage from '../public/images/shien-logo.png';
import USCImage from '../public/images/usc-logo.png';
import UFCImage from '../public/images/ufc-logo.png';
import LVHMImage from '../public/images/lvmh-logo.png';
import CreatorUpload from '../public/images/creator-upload.png';
import BusinessCustomer from '../public/images/business-customer.png';
import EnterpriseCustomer from '../public/images/enterprise-customers.png';

export default function Enterprise() {
  return (
    <Container
      title="Disperse- Content creation for enterprise teams"
      description="Disperse is the leading content creation platform for enterprise teams."
    >
      <div className="flex flex-col justify-center items-center w-full">
        <div className="w-[90%] md:w-3/4 xl:w-3/5 py-20 md:py-28 flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center md:flex-row space-y-2 md:space-y-0 md:space-x-3">
            <Image
              src={FiveStarImage}
              className="w-[60px] h-fit my-auto"
              alt="5 Star Rating"
            />
            <span className="text-center silka-bold text-[#FF623D] my-auto text-[11px] md:text-sm">
              4.82 STARS &middot; USED BY THE LARGEST ENTERPRISES
            </span>
          </div>
          <h1 className="text-center mt-6 silka-bold text-4xl md:text-5xl text-[#363636]">
            A Workflow Built For Scale
          </h1>
          <p className="text-center mt-6 silka-regula text-xs md:text-sm text-gray-500">
            The most productive way to manage and grow your socials.
          </p>
          <div className="flex flex-row mt-10 space-x-4 md:space-x-6 justify-between items-between">
            <Link href="/signup" legacyBehavior>
              <button className="bg-[#FF623D] h-fit my-auto px-5 py-2 rounded text-xs md:text-sm silka-medium text-white border border-[#FF623D] transition-all delay-100 ease-in-out hover:opacity-90">
                Get Started Free
              </button>
            </Link>
            <a
              href="https://calendly.com/trydisperse/30min"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="px-5 py-2 border h-fit my-auto border-[#FF623D] rounded text-[#FF623D] silka-medium text-xs md:text-sm transition-all delay-100 ease-in-out hover:opacity-80">
                Book a Demo
              </button>
            </a>
          </div>
        </div>
        <div className="bg-[#F7E7E3] py-8 xl:py-10 w-full flex flex-col justify-center items-center">
          <div className="w-[90%] md:w-3/4 xl:w-1/2 flex flex-row">
            <div className="w-1/5 flex flex-col justify-center items-center my-auto">
              <Image
                className="max-h-[11px] w-fit md:max-h-[12px] lg:max-h-[16px]"
                src={AxelImage}
                alt="Image of the Axel Springer Logo"
              />
            </div>
            <div className="w-1/5 flex flex-col justify-center items-center my-auto">
              <Image
                className="max-h-[11px] w-fit md:max-h-[12px] lg:max-h-[16px]"
                src={SheinImage}
                alt="Image of the Shein Logo"
              />
            </div>
            <div className="w-1/5 flex flex-col justify-center items-center my-auto">
              <Image
                className="max-h-[21px] w-fit md:max-h-[22px]"
                src={USCImage}
                alt="Image of the USC Logo"
              />
            </div>
            <div className="w-1/5 flex flex-col justify-center items-center my-auto">
              <Image
                className="max-h-[11px] w-fit md:max-h-[12px] lg:max-h-[18px]"
                src={UFCImage}
                alt="Image of the UFC Logo"
              />
            </div>
            <div className="w-1/5 flex flex-col justify-center items-center my-auto">
              <Image
                className="max-h-[9px] w-fit md:max-h-[10px] lg:max-h-[16px]"
                src={LVHMImage}
                alt="PNG Image of the LVHM Logo"
              />
            </div>
          </div>
        </div>
        <div className="py-20 md:py-28 bg-[#F9F9F9] w-full flex flex-col justify-center items-center">
          <div className="w-[90%] md:w-3/4 xl:w-3/5 flex flex-col md:flex-row md:space-x-20">
            <div className="w-full md:w-1/2 my-auto">
              <Image
                alt="Talk to Your Customers"
                src={EnterpriseCustomer}
              />
            </div>
            <div className="w-full md:w-1/2 flex flex-col mt-8 md:my-auto">
              <div className="flex flex-row space-x-2">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="my-auto"
                >
                  <path
                    d="M8.69667 0.0403541C8.90859 0.131038 9.03106 0.354857 8.99316 0.582235L8.0902 6.00001H12.5C12.6893 6.00001 12.8625 6.10701 12.9472 6.27641C13.0319 6.4458 13.0136 6.6485 12.8999 6.80001L6.89997 14.8C6.76167 14.9844 6.51521 15.0503 6.30328 14.9597C6.09135 14.869 5.96888 14.6452 6.00678 14.4178L6.90974 9H2.49999C2.31061 9 2.13748 8.893 2.05278 8.72361C1.96809 8.55422 1.98636 8.35151 2.09999 8.2L8.09997 0.200038C8.23828 0.0156255 8.48474 -0.0503301 8.69667 0.0403541ZM3.49999 8.00001H7.49997C7.64695 8.00001 7.78648 8.06467 7.88148 8.17682C7.97648 8.28896 8.01733 8.43723 7.99317 8.5822L7.33027 12.5596L11.5 7.00001H7.49997C7.353 7.00001 7.21347 6.93534 7.11846 6.8232C7.02346 6.71105 6.98261 6.56279 7.00678 6.41781L7.66968 2.44042L3.49999 8.00001Z"
                    fill="#FF623D"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <p className="silka-bold my-auto text-[#FF623D] text-xs">
                  INTERACT
                </p>
              </div>
              <h2 className="mt-4 text-3xl xl:text-4xl silka-semibold text-[#363636]">
                Talk To Customers
              </h2>
              <p className="mt-5 text-xs xl:text-sm silka-regular text-gray-500">
                Talk with your customers right from your Disperse
                dashboard to provide support, talk about new features,
                and build a community.
              </p>
              <Link
                href="/signup"
                className="mt-10 flex flex-row space-x-1.5 hover:opacity-80"
              >
                <p className="text-[11px] xl:text-xs my-auto silka-semibold text-[#363636]">
                  Get Started with Disperse
                </p>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="my-auto"
                >
                  <path
                    d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                    fill="#363636"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
        <div className="py-16 bg-black flex w-full flex-col justify-center items-center">
          <div className="w-[90%] md:w-[80%] xl:w-3/5 flex flex-col md:flex-row">
            <div className="w-full md:w-[30%] flex flex-col my-auto">
              <p className="text-white text-xs md:text-[11px] xl:text-xs silka-bold">
                BECOME A PARTNER
              </p>
              <h2 className="mt-4 text-2xl md:text-xl xl:text-2xl silka-bold text-white">
                Disperse partnerships range from product to marketing
                <span className="text-[#FF623D]">.</span>
              </h2>
            </div>
            <div className="flex-1" />
            <div className="w-full md:w-1/2 flex flex-col mt-6 md:my-auto">
              <p className="text-sm xl:text-lg silka-regular text-gray-100">
                Become a Disperse partners and see how your business
                can integrate with Disperse, and vice versa.
              </p>
              <Link
                href="/contact"
                className="mt-4 text-sm md:text-xs xl:text-sm silka-semibold text-white underline underline-offset-2 transition-all ease-in-out delay-100 hover:opacity-80"
              >
                CONTACT US
              </Link>
            </div>
          </div>
        </div>
        <div className="py-20 md:py-24 w-full bg-[#FF623D] flex flex-col justify-center items-center">
          <div className="flex flex-col md:flex-row w-[90%] md:w-3/5 md:space-x-12">
            <div className="w-full md:w-1/2 my-auto flex flex-col">
              <div className="flex flex-row space-x-2">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="my-auto"
                >
                  <path
                    d="M13.9 0.499976C13.9 0.279062 13.7209 0.0999756 13.5 0.0999756C13.2791 0.0999756 13.1 0.279062 13.1 0.499976V1.09998H12.5C12.2791 1.09998 12.1 1.27906 12.1 1.49998C12.1 1.72089 12.2791 1.89998 12.5 1.89998H13.1V2.49998C13.1 2.72089 13.2791 2.89998 13.5 2.89998C13.7209 2.89998 13.9 2.72089 13.9 2.49998V1.89998H14.5C14.7209 1.89998 14.9 1.72089 14.9 1.49998C14.9 1.27906 14.7209 1.09998 14.5 1.09998H13.9V0.499976ZM11.8536 3.14642C12.0488 3.34168 12.0488 3.65826 11.8536 3.85353L10.8536 4.85353C10.6583 5.04879 10.3417 5.04879 10.1465 4.85353C9.9512 4.65827 9.9512 4.34169 10.1465 4.14642L11.1464 3.14643C11.3417 2.95116 11.6583 2.95116 11.8536 3.14642ZM9.85357 5.14642C10.0488 5.34168 10.0488 5.65827 9.85357 5.85353L2.85355 12.8535C2.65829 13.0488 2.34171 13.0488 2.14645 12.8535C1.95118 12.6583 1.95118 12.3417 2.14645 12.1464L9.14646 5.14642C9.34172 4.95116 9.65831 4.95116 9.85357 5.14642ZM13.5 5.09998C13.7209 5.09998 13.9 5.27906 13.9 5.49998V6.09998H14.5C14.7209 6.09998 14.9 6.27906 14.9 6.49998C14.9 6.72089 14.7209 6.89998 14.5 6.89998H13.9V7.49998C13.9 7.72089 13.7209 7.89998 13.5 7.89998C13.2791 7.89998 13.1 7.72089 13.1 7.49998V6.89998H12.5C12.2791 6.89998 12.1 6.72089 12.1 6.49998C12.1 6.27906 12.2791 6.09998 12.5 6.09998H13.1V5.49998C13.1 5.27906 13.2791 5.09998 13.5 5.09998ZM8.90002 0.499976C8.90002 0.279062 8.72093 0.0999756 8.50002 0.0999756C8.2791 0.0999756 8.10002 0.279062 8.10002 0.499976V1.09998H7.50002C7.2791 1.09998 7.10002 1.27906 7.10002 1.49998C7.10002 1.72089 7.2791 1.89998 7.50002 1.89998H8.10002V2.49998C8.10002 2.72089 8.2791 2.89998 8.50002 2.89998C8.72093 2.89998 8.90002 2.72089 8.90002 2.49998V1.89998H9.50002C9.72093 1.89998 9.90002 1.72089 9.90002 1.49998C9.90002 1.27906 9.72093 1.09998 9.50002 1.09998H8.90002V0.499976Z"
                    fill="white"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <p className="silka-bold my-auto text-white text-[11px] md:text-xs">
                  CONTENT PRODUCTION
                </p>
              </div>
              <h2 className="mt-4 text-3xl xl:text-4xl silka-bold text-white">
                Quickly Upload Content
              </h2>
              <p className="mt-5 text-xs xl:text-sm silka-regular text-gray-100">
                Upload content from any device instantly to your
                Disperse dashboard.
              </p>
              <Link
                href="/signup"
                className="mt-6 md:mt-10 flex flex-row space-x-1.5 hover:opacity-90"
              >
                <p className="text-xs md:text-[11px] xl:text-xs my-auto silka-semibold text-white">
                  Get Started For Free
                </p>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="my-auto"
                >
                  <path
                    d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                    fill="white"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Link>
            </div>
            <div className="w-full md:w-1/2 mt-8 md:my-auto flex flex-col justify-center items-center">
              <Image
                src={CreatorUpload}
                className="max-h-[250px] w-fit"
                alt="Cloud Upload Content"
              />
            </div>
          </div>
        </div>
        <div className="py-20 md:py-32 flex flex-col justify-center items-center w-[90%] md:w-3/5">
          <Image
            src={BusinessCustomer}
            className="max-h-[400px] w-fit md:max-h-[500px]"
            alt="Talk to Your Customers"
          />
          <h2 className="mt-10 text-3xl md:text-4xl silka-bold text-[#363636] text-center">
            Community Building
          </h2>
          <p className="mt-6 text-sm md:text-base text-center silka-regular text-gray-400 w-full md:w-3/5">
            Interact with your audience for them to truly understand
            they are valued as customers and not just a subject to
            some marketing.
          </p>
        </div>
      </div>
    </Container>
  );
}
