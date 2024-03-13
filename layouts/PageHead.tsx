import Head from 'next/head';
import { useRouter } from 'next/router';

interface PageHeadProps {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website';
  children: JSX.Element;
}

export function PageHead({
  title,
  description,
  image,
  type,
  children,
}: PageHeadProps) {
  const meta = {
    title: title || 'Disperse - Create Once, Distribute Everywhere',
    description:
      description ||
      'Disperse is a content automation platform for social media virality. Disperse allows you to automatically repurpose your content to multiple social platforms. ',
    image: image || '/disperse-meta.png',
    type: type || 'website',
  };

  const router = useRouter();

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
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
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{children}</main>
    </>
  );
}
