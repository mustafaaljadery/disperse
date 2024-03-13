import '../styles/globals.css';
import { Session } from 'next-auth';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from '../layouts/ErrorBoundary';
import 'reactflow/dist/style.css';
import { useRouter } from 'next/router';
import { PostHogProvider } from 'posthog-js/react';
import posthog from 'posthog-js';
import Script from 'next/script';
import dynamic from 'next/dynamic';
import { ChakraProvider } from '@chakra-ui/react';
import * as FullStory from '@fullstory/browser';

const CrispWithNoSSR = dynamic(
  () => import('../components/crisp/index'),
  { ssr: false }
);

// Check that PostHog is client-side (used to handle Next.js SSR)
if (typeof window !== 'undefined') {
  posthog.init('phc_2c41yYmBmxzlHBCaEkwhkU2uRUEXgdR94P0NEwX7vGi', {
    api_host:
      process.env.NEXT_PUBLIC_POSTHOG_HOST ||
      'https://app.posthog.com',
    // Enable debug mode in development
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.debug();
    },
  });
}

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  const router = useRouter();

  useEffect(() => {
    // Track page views
    const handleRouteChange = () => posthog?.capture('$pageview');
    router.events.on('routeChangeComplete', handleRouteChange);
    FullStory.init({ orgId: 'o-1NWEV4-na1' });

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  return (
    <>
      <PostHogProvider client={posthog}>
        <ErrorBoundary>
          <SessionProvider session={session}>
            <ChakraProvider>
              <Component {...pageProps} />
              <Toaster />
              <Script
                id="mersejs"
                type="text/javascript"
                src="https://www.trymerse.com/script.js"
                data-code="a650e0ce-1223-47ab-9a9a-74f42c7c2e4f"
              />
            </ChakraProvider>
          </SessionProvider>
        </ErrorBoundary>
      </PostHogProvider>
      <CrispWithNoSSR />
    </>
  );
}

export default MyApp;
