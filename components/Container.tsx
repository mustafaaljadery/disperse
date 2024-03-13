import { Header } from './HeaderComponent';
import { Footer } from './FooterComponent';
import Head from 'next/head';
import { useRouter } from 'next/router';

interface Props {
  title?: string;
  description?: string;
}

export default function Container(props: any) {
  const { children, ...customMeta } = props;
  const router = useRouter();

  const meta = {
    title: 'Disperse - Create & Manage Social Media Content',
    description:
      'Disperse is a content automation platform for social media virality. Disperse allows you to automatically repurpose your content to multiple social platforms.',
    image: '/disperse-meta.png',
    type: 'website',
    ...customMeta,
  };

  return (
    <>
      <Head>
        <title>{meta?.title}</title>
        <meta name="robots" content="follow, index" />
        <meta name="description" content={meta?.description} />
        <meta
          property="og:url"
          content={`https://www.trydisperse.com${router.asPath}`}
        />
        <link
          rel="canonical"
          href={`https://www.trydisperse.com${router.asPath}`}
        />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Disperse" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@trydisperse" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        {meta.date && (
          <meta
            property="article:published_time"
            content={meta.date}
          />
        )}
      </Head>
      <Header />
      <main className="w-full">{children}</main>
      <Footer />
    </>
  );
}
