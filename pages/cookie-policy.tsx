import Container from '../components/Container';
import Link from 'next/link';

export default function CookiePolicy() {
  return (
    <Container
      title="Disperse Cookie Policy - Disperse"
      description="Learn more about Disperse's Cookie Policy, effective May 1, 2023."
    >
      <div className="flex flex-col justify-center items-center">
        <div className="w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2">
          <>
            <h1 className="mt-12 md:mt-20 lg:mt-24 text-4xl md:text-5xl silka-medium">
              Cookie Policy
            </h1>
            <p className="silka-regular mt-4 md:mt-6 text-sm md:text-base">
              <span className="silka-medium">Effective:</span> May 1,
              2023
            </p>
          </>
          <>
            <h2
              id="Cookies Introduction"
              className="mt-10 md:mt-16 lg:mt-20 text-2xl md:text-3xl silka-medium"
            >
              Cookies Introduction
            </h2>
            <p className="mt-4 md:mt-6 text-sm md:text-base silka-regular">
              The Cookies policy explains how Disperse LCC. (
              <span className="silka-medium">”Disperse”</span>,{' '}
              <span className="silka-medium">“we</span>,”{' '}
              <span className="silka-medium">“our,”</span>{' '}
              <span className="silka-medium">“us”</span>) uses cookies
              pixel tags, local storage, and other similar
              technologies to recognize you when you visit our public
              website 
              <Link href="/" className="underline">
                www.trydisperse.com
              </Link>
              (the <span className="silka-medium">“Website”</span>),
              and Disperse’s online software-as-a-service platform
              including any third-party extensions that work with
              Disperse. It explains what these technologies are and
              why we use them, as well as your rights to control our
              use of them.
            </p>
            <h2
              id="What are Cookies"
              className="mt-10 md:mt-16 lg:mt-20 text-2xl md:text-3xl silka-medium"
            >
              What are Cookies?
            </h2>
            <p className="mt-4 md:mt-6 text-sm md:text-base silka-regular">
              Cookies are files created by websites you visit. They
              make your online experience easier by saving browsing
              information. With cookies, sites can keep you signed in,
              remember your site preferences, and give you locally
              relevant content.
            </p>
            <h2
              id="Two Types of Cookies"
              className="mt-10 md:mt-16 lg:mt-20 text-2xl md:text-3xl silka-medium"
            >
              Two Types of Cookies
            </h2>
            <ul className="mt-4 md:mt-6 text-sm md:text-base silka-regular list-disc">
              <li className="ml-7 lg:ml-10">
                <span className="silka-semibold">First-party:</span>{' '}
                Created by the site your visit.
              </li>
              <li className="ml-7 lg:ml-10 mt-2">
                <span className="silka-semibold">Third-party:</span>{' '}
                Created by other sites. These sites own some of the
                content you may see on the first-party’s site.
              </li>
            </ul>
            <h2
              id="How Does Disperse Use Cookies"
              className="mt-10 md:mt-16 lg:mt-20 text-2xl md:text-3xl silka-medium"
            >
              How Does Dispserse Use Cookies?
            </h2>
            <p className="mt-4 md:mt-6 text-sm md:text-base silka-regular">
              We use cookies for several reasons. From
              application-critical cookies, where the user experience
              would be heavily undermined without them, to improved
              user functionality.
            </p>
            <h2
              id="Different Types of Cookies"
              className="mt-10 md:mt-16 lg:mt-20 text-2xl md:text-3xl silka-medium"
            >
              Different Types of Cookies
            </h2>
            <ul className="mt-4 md:mt-6 text-sm md:text-lg silka-regular list-disc">
              <li className="ml-7 lg:ml-10">
                <span className="silka-semibold">
                  Strictly necessary cookies:
                </span>{' '}
                These cookies are essential to provide users with the
                services provided by Disperse. Since these cookies are
                critical, we cannot provide the option to switch these
                cookies off. If your browser blocks these cookies, the
                services provided by Disperse may not function
                properly.
              </li>
              <li className="ml-7 lg:ml-10 mt-2">
                <span className="silka-semibold">
                  Functional cookies:
                </span>{' '}
                These types of cookies allow users to provide better
                functionality and personalization to the user
                experience. They may be set by either Disperse or
                third-party providers that have been added to enhance
                the experience of Disperse.
              </li>
              <li className="ml-7 lg:ml-10 mt-2">
                <span className="silka-semibold">
                  Analytics cookies:
                </span>{' '}
                These cookies allow us to count visits and traffic
                sources so we can measure and improve the performance
                and functionality of our site.
              </li>
              <li className="ml-7 lg:ml-10 mt-2">
                <span className="silka-semibold">
                  Marketing cookies:
                </span>{' '}
                These types of cookies are set by advertising partners
                to show relevant ads on their platforms. Typically,
                they do not store personal information but rather
                uniquely identifying information.
              </li>
            </ul>
            <h2
              id="How Can I Control Cookies"
              className="mt-10 md:mt-16 lg:mt-20 text-2xl md:text-3xl silka-medium"
            >
              How Can I Control Cookies?
            </h2>
            <p className="mt-4 md:mt-6 text-sm md:text-base silka-regular list-disc">
              You have the right to decide whether to accept or reject
              cookies. Disperse provides settings for opting out of
              not critical cookies that won&apos;t affect site
              functionality. <br /> <br /> Many advertising networks
              have the option to opt out of target advertising which
              does not utilize cookies.
            </p>
            <h2
              id="Where Can I Learn More"
              className="mt-10 md:mt-16 lg:mt-20 text-2xl md:text-3xl silka-medium"
            >
              Where Can I Learn More?
            </h2>
            <p className="mt-4 md:mt-6 text-sm md:text-base silka-regular list-disc mb-32">
              If you have any questions about our use of Cookies,
              please use{' '}
              <Link
                href="/contact"
                className="underline underline-offset-2"
              >
                Contact Us
              </Link>
              .
            </p>
          </>
        </div>
      </div>
    </Container>
  );
}
