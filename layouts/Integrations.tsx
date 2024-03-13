import Container from '../components/Container';
import Link from 'next/link';
import { LeftArrowSmall } from '../components/icons/LeftArrow';
import { useRouter } from 'next/router';

function GetStarted() {
  return (
    <div className="flex flex-col justify-center items-center w-full bg-[#F9F9F9] mb-20">
      <div className="w-11/12 lg:w-3/5 flex flex-col justify-center items-center py-16">
        <h2 className="w-5/6 lg:w-3/4 text-2xl lg:text-4xl text-center silka-medium">
          Get started with Disperse&apos;s powerful tools to
          productize your social presence
        </h2>
        <div className="flex flex-row space-x-6 lg:space-x-12 justify-center items-center mt-8">
          <Link href="/signup" legacyBehavior>
            <div className="bg-black px-4 lg:px-6 py-1.5 rounded-lg hover:opacity-90">
              <Link href="/signup" className="text-white silka-semibold text-sm lg:text-base">
                
                  GET STARTED
                
              </Link>
            </div>
          </Link>
          <Link
            href="/contact-sales"
            className="silka-semibold hover:opacity-90 text-sm lg:text-base">
            
              CONTACT SALES
            
          </Link>
        </div>
        <p className="text-center text-xs lg:text-sm text-[#AD301F] silka-medium mt-6">
          No Credit Card Required!
        </p>
      </div>
    </div>
  );
}

interface Props {
  image: string;
  title: string;
  subtitle: string;
  builtBy: string;
  website: string;
  category: string;
  docs: string;
  contact: string;
  overview: string;
  howItWorks: string;
  additionalInformation: string;
}

export function IntegrationsLayout({
  image,
  title,
  subtitle,
  builtBy,
  website,
  category,
  docs,
  contact,
  overview,
  howItWorks,
  additionalInformation,
}: Props) {
  const router = useRouter();
  return (
    <Container title={title + ' · Disperse Integration'}>
      <div className="flex flex-col justify-center items-center">
        <div className="w-11/12 lg:w-3/5 flex flex-col mb-24 lg:mb-32">
          <div className="mt-12">
            <Link href="/integrations" legacyBehavior>
              <div className="flex flex-row space-x-2">
                <LeftArrowSmall />
                <Link href="/integrations" className="silka-medium hover:opacity-80">
                  
                    Browse Integrations
                  
                </Link>
              </div>
            </Link>
          </div>
          <div className="w-full mt-10 lg:mt-12 flex flex-row flex-wrap justify-center items-center lg:flex-nowrap">
            <div className="lg:w-1/6 w-1/5 flex flex-col justify-center items-center">
              <img src={image} />
            </div>
            <div className="lg:w-2/3 px-4 lg:px-0 w-4/5 flex flex-col lg:flex-row space-x-7 justify-between items-between my-auto">
              <div className="flex flex-col space-y-2 lg:space-y-4">
                <h1 className="text-3xl lg:text-5xl silka-semibold">
                  {title}
                </h1>
                <p className="text-sm lg:text-lg silka-medium text-[#454545]">
                  {subtitle}
                </p>
              </div>
            </div>
            <div className="h-full w-1/2 lg:w-1/6">
              <button
                onClick={() => {
                  router.push('/signup');
                }}
                className="mx-4 lg:mx-0 mt-6 py-1.5 px-5 rounded lg:mt-0 bg-black text-white silka-medium my-auto hover:opacity-90"
              >
                Add Integration
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-end items-end mt-10 lg:mt-12 w-full">
            <div className="flex flex-row flex-wrap lg:flex-nowrap lg:space-x-10 w-full lg:w-5/6">
              <div className="flex flex-col space-y-2 w-1/3 lg:w-1/5 px-2 py-2 lg:py-0 lg:px-0">
                <p className="silka-medium">Built by</p>
                <p className="silka-regular text-sm">{builtBy}</p>
              </div>
              <div className="flex flex-col space-y-2 w-1/3 lg:w-1/5 px-2 py-2 lg:py-0 lg:px-0">
                <p className="silka-medium">Website</p>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={website}
                  className="silka-regular underline text-sm underline-offset-2"
                >
                  {title}
                </a>
              </div>
              <div className="flex flex-col space-y-2 w-1/3 lg:w-1/5 px-2 py-2 lg:py-0 lg:px-0">
                <p className="silka-medium">Category</p>
                <p className="silka-regular text-sm">{category}</p>
              </div>
              <div className="flex flex-col space-y-2 w-1/3 lg:w-1/5 px-2 py-2 lg:py-0 lg:px-0">
                <p className="silka-medium">Docs</p>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={docs}
                  className="underline underline-offset-2 silka-regular text-sm"
                >
                  {title + ' Docs'}
                </a>
              </div>
              <div className="flex flex-col space-y-2 w-1/3 lg:w-1/5 px-2 py-2 lg:py-0 lg:px-0">
                <p className="silka-medium">Contact</p>
                <p className="silka-regular text-sm">{contact}</p>
              </div>
            </div>
            <div className="flex flex-col lg:w-5/6">
              <h2 className="mt-12 lg:mt-16 text-2xl lg:text-3xl silka-semibold text-[#4E4E4E]">
                Overview
              </h2>
              <p className="mt-4 lg:mt-8 silka-regular lg:text-lg">
                {overview}
              </p>
              <h2 className="mt-12 lg:mt-16 text-2xl lg:text-3xl silka-semibold text-[#4E4E4E]">
                How it Works
              </h2>
              <p className="mt-4 lg:mt-8 silka-regular lg:text-lg">
                {howItWorks}
              </p>
              <h2 className="mt-12 lg:mt-16 text-2xl lg:text-3xl silka-semibold text-[#4E4E4E]">
                Additional Information
              </h2>
              <p className="mt-4 lg:mt-8 silka-regular lg:text-lg">
                {additionalInformation}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full">
          <GetStarted />
        </div>
      </div>
    </Container>
  );
}
